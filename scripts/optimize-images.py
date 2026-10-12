"""Create web-sized assets without changing the original images.

Requires Pillow with WebP support. Run from any directory:
    python3 scripts/optimize-images.py
"""

import json
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / 'image' / 'optimized'
OUTPUT.mkdir(exist_ok=True)
manifest = {}


def save_webp(image, name, quality=88):
    path = OUTPUT / name
    # Keep the source colour profile, including Display P3 photos.
    options = {'icc_profile': image.info['icc_profile']} if image.info.get('icc_profile') else {}
    image.save(path, 'WEBP', quality=quality, method=6, **options)
    return {
        'src': str(path.relative_to(ROOT)),
        'width': image.width,
        'height': image.height,
        'bytes': path.stat().st_size,
    }


def resized(image, width):
    width = min(width, image.width)
    height = round(image.height * width / image.width)
    return image.resize((width, height), Image.Resampling.LANCZOS)


for name in ['HERO.jpeg', 'About.jpeg'] + [f'mockup{i:02}.png' for i in range(1, 9)]:
    source = ROOT / 'image' / name
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original)
        widths = [1280, 1920, 2560] if name == 'HERO.jpeg' else [600, 960, 1600]
        if name == 'About.jpeg':
            widths = [384, 768]
        variants = [save_webp(resized(image, width), f'{source.stem}-{width}.webp') for width in widths]
        manifest[name] = {'original_bytes': source.stat().st_size, 'variants': variants}


for source in sorted((ROOT / 'image').glob('work*_design*.png')):
    with Image.open(source) as original:
        image = resized(original, 1200)
        parts = []
        # Each part can load independently and stays within WebP's dimension limit.
        for index, top in enumerate(range(0, image.height, 2400), start=1):
            part = image.crop((0, top, image.width, min(top + 2400, image.height)))
            parts.append(save_webp(part, f'{source.stem}-part{index:02}.webp', quality=92))
        manifest[source.name] = {'original_bytes': source.stat().st_size, 'parts': parts}


(OUTPUT / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
original_bytes = sum(item['original_bytes'] for item in manifest.values())
web_bytes = sum(asset['bytes'] for item in manifest.values() for asset in item.get('parts', item.get('variants', [])))
print(f'Original referenced assets: {original_bytes / 1024 / 1024:.2f} MiB')
print(f'All generated variants and parts: {web_bytes / 1024 / 1024:.2f} MiB')
