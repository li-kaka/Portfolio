from pathlib import Path
from PIL import Image, ImageOps
import json,re
p=Path(__file__).resolve().parent.parent;out=p/'image/optimized';rows=[]
assets=[(p/'image'/f, f'about-{key}{"-v2" if key == "photography" else ""}-960.webp',960) for key,f in [('snowboarding','About_snowboarding.JPG'),('cats','About_cats.JPG'),('cooking','About_cooking.JPG'),('photography','About_photography.jpg'),('travel','About_travel.JPG'),('music','About_music.jpg')]]
assets += [(out/'personal-cloud-sky.png','personal-cloud-sky.webp',1672),(out/'personal-cloud-layer.png','personal-cloud-layer.webp',1600)]
for src,name,width in assets:
 with Image.open(src) as original:
  im=ImageOps.exif_transpose(original);im.thumbnail((width,width*3),Image.Resampling.LANCZOS)
  im.save(out/name,'WEBP',quality=84,method=6)
 rows.append({'source':str(src.relative_to(p)),'output':'image/optimized/'+name,'before':src.stat().st_size,'after':(out/name).stat().st_size,'width':im.width,'height':im.height})
(out/'review-assets-manifest.json').write_text(json.dumps(rows,indent=2))
print('Exported personal cloud and About derivatives.')
