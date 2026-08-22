"""
ASANYX Analytics — Logo & Brand Kit generator (v2)

Extract the new signature horizontal logo from the 4K brand wallpapers,
produce the mark, favicons, plus 6 color variations (Signature/Gold/Violet/
Emerald/Rose/Monochrome) by programmatically recoloring the mark using the
official palette from asanyx_brand_colors.json.

Also copy the two 4K wallpapers to /public/brand/wallpapers/.
"""
import os
from PIL import Image

SRC_LIGHT = "/tmp/brandkit_v2/wallpaper_light.webp"
SRC_DARK  = "/tmp/brandkit_v2/wallpaper_dark.webp"
OUT       = "/app/public/brand/logos"
OUT_WP    = "/app/public/brand/wallpapers"
os.makedirs(OUT, exist_ok=True)
os.makedirs(OUT_WP, exist_ok=True)

# Clean the previous (v1 misaligned) files first
for f in os.listdir(OUT):
    os.remove(f"{OUT}/{f}")

# Copy wallpapers verbatim
for src, name in [(SRC_LIGHT, "asanyx-wallpaper-light-4k.webp"),
                  (SRC_DARK,  "asanyx-wallpaper-dark-4k.webp")]:
    with open(src, "rb") as f_in, open(f"{OUT_WP}/{name}", "wb") as f_out:
        f_out.write(f_in.read())

# Brand palette from the official JSON
PALETTE = {
    "signature":  (17, 87, 199),     # Asanyx Blue #1257C7 (primary mark)
    "navy":       (11, 42, 107),     # #0B2A6B
    "cyan":       (18, 182, 232),    # #12B6E8
    "gold":       (184, 134, 11),    # #B8860B
    "violet":     (124, 58, 237),    # #7C3AED
    "emerald":    (5, 150, 105),     # #059669
    "rose":       (225, 29, 72),     # #E11D48
    "monochrome": (113, 113, 122),   # #71717A
    "ink":        (11, 27, 58),      # #0B1B3A
    "midnight":   (6, 11, 26),       # #060B1A
    "paper":      (247, 249, 252),   # #F7F9FC
    "white":      (255, 255, 255),
}

# ---------- helpers ----------

def crop_norm(im, x0, y0, x1, y1):
    W, H = im.size
    return im.crop((int(W * x0), int(H * y0), int(W * x1), int(H * y1)))


def to_transparent_light(rgb_img, threshold=245):
    """Turn near-white pixels transparent. Also removes faint grey ghost watermark."""
    im = rgb_img.convert("RGBA")
    px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            if r >= threshold and g >= threshold and b >= threshold:
                px[x, y] = (255, 255, 255, 0)
            else:
                # Also fade greyish (low-saturation) light pixels toward transparency
                # so any faint watermark bleed disappears cleanly.
                mn = min(r, g, b); mx = max(r, g, b)
                sat = 0 if mx == 0 else (mx - mn) / mx
                lum = (r + g + b) / (3 * 255)
                if lum > 0.82 and sat < 0.10:
                    px[x, y] = (255, 255, 255, 0)
    return im


def tight_crop(rgba):
    bbox = rgba.getbbox()
    return rgba.crop(bbox) if bbox else rgba


def paste_on(rgba, bg_rgb, pad_ratio=0.08):
    w, h = rgba.size
    pad = int(max(w, h) * pad_ratio)
    canvas = Image.new("RGB", (w + 2 * pad, h + 2 * pad), bg_rgb)
    canvas.paste(rgba, (pad, pad), rgba)
    return canvas


def square_pad_transparent(rgba, pad_ratio=0.10):
    w, h = rgba.size
    side = max(w, h)
    pad = int(side * pad_ratio)
    canvas = Image.new("RGBA", (side + 2 * pad, side + 2 * pad), (0, 0, 0, 0))
    canvas.paste(rgba, (pad + (side - w) // 2, pad + (side - h) // 2), rgba)
    return canvas


def recolour(rgba, target_rgb):
    """Recolour every non-transparent pixel to target_rgb, preserving luminance."""
    im = rgba.copy()
    px = im.load()
    tr, tg, tb = target_rgb
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            lum = (r + g + b) / (3 * 255)
            f = 0.55 + 0.45 * lum  # keeps shading detail
            px[x, y] = (
                max(0, min(255, int(tr * f))),
                max(0, min(255, int(tg * f))),
                max(0, min(255, int(tb * f))),
                a,
            )
    return im


# ---------- Load source ----------
im_light = Image.open(SRC_LIGHT).convert("RGB")
W, H = im_light.size
print("source size:", W, H)

# ============================================================
# 1) HORIZONTAL LOGO (mark + wordmark + tagline)
# ============================================================
# Centered logo, x∈[575, 1600], y∈[350, 620]. Skip left ghost watermark.
horiz_raw = crop_norm(im_light, 0.288, 0.311, 0.800, 0.560)
horiz_rgba = tight_crop(to_transparent_light(horiz_raw, threshold=238))
horiz_rgba.save(f"{OUT}/asanyx-logo-horizontal-color.png")

# On white / on dark composites
paste_on(horiz_rgba, PALETTE["white"], 0.06).save(
    f"{OUT}/asanyx-logo-horizontal-on-white.png")
paste_on(horiz_rgba, PALETTE["midnight"], 0.08).save(
    f"{OUT}/asanyx-logo-horizontal-on-dark.png")

# Monochrome (ink)
mono_horiz = recolour(horiz_rgba, PALETTE["ink"])
paste_on(mono_horiz, PALETTE["white"], 0.06).save(
    f"{OUT}/asanyx-logo-horizontal-mono-black.png")

# ============================================================
# 2) MARK (signature — the "A|S" only)
# ============================================================
# Tighter mark bounds derived from saturation-based detection.
# Mark lives at x∈[695, 900] (A + bar chart + overlapping S), y∈[330, 630].
mark_raw = crop_norm(im_light, 0.345, 0.293, 0.460, 0.575)
mark_rgba = tight_crop(to_transparent_light(mark_raw, threshold=238))
mark_rgba = square_pad_transparent(mark_rgba, 0.08)
mark_rgba.save(f"{OUT}/asanyx-mark-color.png")
paste_on(mark_rgba, PALETTE["white"],    0.10).save(f"{OUT}/asanyx-mark-on-white.png")
paste_on(mark_rgba, PALETTE["midnight"], 0.14).save(f"{OUT}/asanyx-mark-on-dark.png")

# Favicons
fav = paste_on(mark_rgba, PALETTE["white"], 0.12)
fav.resize((512, 512), Image.LANCZOS).save(f"{OUT}/asanyx-favicon-512.png")
fav.resize((256, 256), Image.LANCZOS).save(f"{OUT}/asanyx-favicon-256.png")
fav.resize((32, 32),   Image.LANCZOS).save(f"{OUT}/asanyx-favicon-32.png")

# ============================================================
# 3) Six color variations of the mark (from official palette)
# ============================================================
VARIANTS = [
    ("signature",  PALETTE["signature"]),
    ("gold",       PALETTE["gold"]),
    ("violet",     PALETTE["violet"]),
    ("emerald",    PALETTE["emerald"]),
    ("rose",       PALETTE["rose"]),
    ("monochrome", PALETTE["monochrome"]),
]

for name, color in VARIANTS:
    coloured = recolour(mark_rgba, color)
    coloured.save(f"{OUT}/asanyx-mark-{name}.png")
    # on-white composites for social/profile picture use
    paste_on(coloured, PALETTE["white"],    0.12).save(f"{OUT}/asanyx-mark-{name}-on-white.png")
    paste_on(coloured, PALETTE["midnight"], 0.15).save(f"{OUT}/asanyx-mark-{name}-on-dark.png")

print("\nGenerated logo files:")
for f in sorted(os.listdir(OUT)):
    path = f"{OUT}/{f}"
    print(f"  {f}  ({os.path.getsize(path)/1024:.1f} KB)")

print("\nWallpapers:")
for f in sorted(os.listdir(OUT_WP)):
    print(f"  {f}  ({os.path.getsize(f'{OUT_WP}/{f}')/1024:.1f} KB)")
