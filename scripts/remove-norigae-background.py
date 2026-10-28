"""Remove the studio background from the Norigae photographs, by colour rather than by brightness.

The background, and the soft drop shadow beside the piece, are nearly grey. The pastel pieces always carry some colour, even in their
palest highlights. So the alpha comes from how far a pixel is from the grey axis (chroma), not from how far it is from white:
  1. chroma -> alpha with a soft ramp, which also keeps thin tassel threads soft;
  2. small holes in the piece (white glints on the bead, a pale satin highlight) are filled back in as object;
  3. large holes (the inside of the cord loop) stay transparent;
  4. colour of the soft edge pixels is taken from the nearest solid pixel, so there is no white fringe.
Run with /tmp/imgenv/bin/python. Writes WebP with alpha, cropped to the piece.
"""
import sys

import numpy as np
from PIL import Image
from scipy import ndimage as ndi

src, dst = sys.argv[1], sys.argv[2]
LOW = float(sys.argv[3]) if len(sys.argv) > 3 else 7.0     # chroma at or below this is background
HIGH = float(sys.argv[4]) if len(sys.argv) > 4 else 20.0   # chroma at or above this is solid
HOLE_MAX = int(sys.argv[5]) if len(sys.argv) > 5 else 3000  # holes smaller than this (in pixels) are filled
BEAD_TOP = float(sys.argv[6]) if len(sys.argv) > 6 else 0.50   # band (fraction of the original height) where the bead sits:
BEAD_BOTTOM = float(sys.argv[7]) if len(sys.argv) > 7 else 0.60  # every hole in it is a glint on the bead, so it is filled
CUT = float(sys.argv[8]) if len(sys.argv) > 8 else 0.0         # faint alpha below this is the shadow haze: cut it, rescale the rest

rgb = np.asarray(Image.open(src).convert('RGB')).astype(np.float32)
h, w, _ = rgb.shape

r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
chroma = np.sqrt(((r - g) ** 2 + (g - b) ** 2 + (b - r) ** 2) / 2.0)
# Smooth a little so JPEG noise on the flat background does not speckle the mask.
chroma = ndi.gaussian_filter(chroma, 0.8)

alpha = np.clip((chroma - LOW) / (HIGH - LOW), 0, 1)
alpha = np.clip((alpha - CUT) / (1 - CUT), 0, 1)

# Solid part and its holes. Work on the mask after a closing, so glints and satin highlights that are surrounded by the piece count as inside.
solid = alpha > 0.5
closed = ndi.binary_closing(solid, structure=np.ones((3, 3)), iterations=4)
filled = ndi.binary_fill_holes(closed)
holes = filled & ~closed
labels, n = ndi.label(holes)
keep_open = np.zeros_like(solid)
if n:
    sizes = ndi.sum(holes, labels, index=np.arange(1, n + 1))
    for index, size in enumerate(sizes, start=1):
        cy = ndi.center_of_mass(holes, labels, index)[0] / h
        in_bead_band = BEAD_TOP <= cy <= BEAD_BOTTOM
        if size > HOLE_MAX and not in_bead_band:
            keep_open |= labels == index          # a real opening, such as the inside of the cord loop
inside = closed | (filled & ~keep_open)
# Everything inside the piece is solid, except the real openings and the thin gaps between tassel threads at the edge.
interior = ndi.binary_erosion(inside, iterations=3)
alpha[interior & ~keep_open] = 1.0
# The loops of the knot have small openings too (about 1 000 px): those are real, so they are only closed when pale AND tiny.
# The bead is round and glossy: its pale glints, and the thin line between its two colour halves, can read as grey. Inside the bead
# band, fill the *ellipse* that the bead's widest rows describe (a bead is round), so it is always one solid disc with a clean edge.
from PIL import ImageDraw
band_rows = slice(int(BEAD_TOP * h), int(BEAD_BOTTOM * h))
solid_now = alpha > 0.5
widths = solid_now[band_rows].sum(axis=1)
if (widths > 0).any():
    cord = np.percentile(widths[widths > 0], 20)   # the cord, not the knot above the bead
    rows = np.where(widths > cord * 1.25)[0] + band_rows.start
else:
    rows = np.array([])
if rows.size > 20:
    top, bottom = rows.min(), rows.max()
    xs_all = [np.where(solid_now[y])[0] for y in rows]
    # A bead is as wide as it is tall: take the centre from the solid rows and the width from the height.
    left = int(np.percentile([x.min() for x in xs_all], 10))
    right = int(np.percentile([x.max() for x in xs_all], 90))
    radius_x = (right - left) / 2
    centre_y = (top + bottom) / 2
    # The top and bottom of a bead are narrow, so few rows pass the width test: never let the bead be flatter than 90 % of round.
    radius_y = max((bottom - top) / 2, 0.9 * radius_x)
    top, bottom = int(centre_y - radius_y), int(centre_y + radius_y)
    mask = Image.new('L', (w, h), 0)
    ImageDraw.Draw(mask).ellipse([left, top, right, bottom], fill=255)
    alpha[np.asarray(mask) > 0] = 1.0
    print('bead ellipse', (left, top, right, bottom))
else:
    print('bead not found in band')

# Specks of background colour noise away from the piece: keep only the largest connected body.
body = alpha > 0.05
body_labels, bn = ndi.label(ndi.binary_dilation(body, iterations=6))
if bn > 1:
    sizes = ndi.sum(np.ones_like(body_labels), body_labels, index=np.arange(1, bn + 1))
    keep = 1 + int(np.argmax(sizes))
    alpha[body_labels != keep] = 0.0

# Edge colour from the nearest solid pixel, so soft edges carry the colour of the piece, not of the white sweep.
solid_core = alpha > 0.98
_, (iy, ix) = ndi.distance_transform_edt(~solid_core, return_indices=True)
nearest = rgb[iy, ix]
partial = (alpha <= 0.98)[..., None]
colour = np.where(partial, nearest, rgb)

rgba = np.dstack([colour, alpha * 255]).clip(0, 255).astype(np.uint8)
result = Image.fromarray(rgba, 'RGBA')

ys, xs = np.where(alpha > 0.05)
pad = 24
box = (max(xs.min() - pad, 0), max(ys.min() - pad, 0), min(xs.max() + pad, w), min(ys.max() + pad, h))
result = result.crop(box)
print('cropped to', result.size, 'from', (w, h))
result.save(dst, 'WEBP', quality=88, method=6)
print('wrote', dst)
