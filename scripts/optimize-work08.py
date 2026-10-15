"""Export only the Portfolio case-study assets; retain the original PNGs."""
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / 'image' / 'optimized'
OUTPUT.mkdir(exist_ok=True)
manifest_path = OUTPUT / 'manifest.json'
manifest = json.loads(manifest_path.read_text())

def save(image, filename):
    path = OUTPUT / filename
    options = {'icc_profile': image.info['icc_profile']} if image.info.get('icc_profile') else {}
    image.save(path, 'WEBP', quality=92, method=6, **options)
    return {'src': str(path.relative_to(ROOT)), 'width': image.width,
            'height': image.height, 'bytes': path.stat().st_size}

source = ROOT / 'image' / 'mockup08.png'
with Image.open(source) as image:
    variants = []
    for width in [600, 960, 1600]:
        resized = image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
        variants.append(save(resized, f'mockup08-v3-{width}.webp'))
    manifest[source.name] = {'original_bytes': source.stat().st_size, 'variants': variants}

for name in ['work08_designcomp', 'work08_designcomp_work', 'work08_designcomp_mobile']:
    source = ROOT / 'image' / f'{name}.png'
    with Image.open(source) as image:
        width = min(1200, image.width)
        resized = image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
        parts = []
        for index, top in enumerate(range(0, resized.height, 2400), start=1):
            part = resized.crop((0, top, width, min(top + 2400, resized.height)))
            parts.append(save(part, f'{name}-part{index:02}.webp'))
        manifest[source.name] = {'original_bytes': source.stat().st_size, 'parts': parts}

manifest_path.write_text(json.dumps(manifest, indent=2) + '\n')
print('Exported mockup variants and desktop, overview, mobile design parts.')
