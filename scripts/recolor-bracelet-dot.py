"""Recolour the dark dot in the blue half of the signature pearl to Cameo Pink (#E5BCBC).

Works on a background-removed WebP (RGBA), such as public/images/shop/bracelets/bracelet-1.webp.
How it finds the dot, without hard-coded coordinates:
  1. the blue half of the pearl is found by colour (light blue: blue and green clearly above red);
  2. the dot is a small dark hole completely surrounded by that blue, so: fill the holes of the blue mask,
     keep the holes that are small and dark;
  3. those pixels get the pink colour, with a soft edge so no dark ring is left.
Run with /tmp/imgenv/bin/python:
  /tmp/imgenv/bin/python scripts/recolor-bracelet-dot.py src.webp dst.webp [dark_max] [area_max]
The script prints what it found. If it says "no dot found", raise dark_max (default 120) or area_max (default 4000).
"""
import sys

import numpy as np
from PIL import Image
from scipy import ndimage as ndi

src, dst = sys.argv[1], sys.argv[2]
DARK_MAX = float(sys.argv[3]) if len(sys.argv) > 3 else 120.0   # luminance below this counts as dark
AREA_MAX = int(sys.argv[4]) if len(sys.argv) > 4 else 4000      # larger holes are not the dot
CAMEO = np.array([0xE5, 0xBC, 0xBC], dtype=np.float32)

image = Image.open(src).convert('RGBA')
rgba = np.asarray(image).astype(np.float32)
rgb, alpha = rgba[..., :3], rgba[..., 3]
r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
luminance = 0.299 * r + 0.587 * g + 0.114 * b

# The blue half: noticeably bluer and greener than red, and bright enough not to be the dark dot.
blue = (b > r + 12) & (g > r + 8) & (luminance > 140) & (alpha > 200)
blue = ndi.binary_opening(blue, iterations=1)
closed = ndi.binary_closing(blue, structure=np.ones((3, 3)), iterations=2)
holes = ndi.binary_fill_holes(closed) & ~closed

labels, count = ndi.label(holes)
dot = np.zeros_like(holes)
for index in range(1, count + 1):
    part = labels == index
    area = int(part.sum())
    if area > AREA_MAX or area < 12:
        continue
    mean_lum = float(luminance[part].mean())
    ys, xs = np.where(part)
    print(f'hole {index}: area {area}, mean luminance {mean_lum:.0f}, centre ({int(xs.mean())}, {int(ys.mean())})')
    if mean_lum < DARK_MAX:
        dot |= part

if not dot.any():
    sys.exit('no dot found: raise dark_max or area_max')

# Grow a little so the dark rim of the dot goes too, then feather the edge.
dot = ndi.binary_dilation(dot, iterations=2)
weight = np.clip(ndi.gaussian_filter(dot.astype(np.float32), 1.2) * 1.4, 0, 1)[..., None]
# Keep a little of the original shading (the glaze) by scaling the pink with the local brightness around the dot.
ring = ndi.binary_dilation(dot, iterations=6) & ~dot & (alpha > 200)
shade = float(luminance[ring].mean() / luminance[ring].max()) if ring.any() else 1.0
pink = np.clip(CAMEO * min(1.0, shade + 0.1), 0, 255)
rgb = rgb * (1 - weight) + pink * weight

result = np.dstack([rgb, alpha]).clip(0, 255).astype(np.uint8)
Image.fromarray(result, 'RGBA').save(dst, 'WEBP', quality=88, method=6)
print('wrote', dst)
