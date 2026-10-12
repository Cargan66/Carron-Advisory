"""Render Carron social cards (1080x1080) from public/social/queue.json.

One image per slide, in the site's "Signal & Noise" palette: deep emerald
ground, gold hairlines and instrument-circle arcs, bone text, logo lock-up in
the footer. Single-slide posts become one card; posts with several slides become
an Instagram carousel (slide 1 hooks, the last slide carries the call to action).

    python scripts/social_cards.py              # render every post
    python scripts/social_cards.py ins-cost-01  # render just these ids

Backgrounds must be PHOTOGRAPHS from public/images/ — never the article cover
images (afford-to-grow.png, sell-your-business.png, the og-*.png share images and
friends). Those already carry headline type, and setting our copy over them gives
two competing headlines on one card.

Images land in public/social/cards/<post-id>-<n>.jpg and are referenced from the
queue's "images" array, so they deploy with the site and Instagram can fetch
them over HTTPS (the Graph API will not accept a local file).
"""

import json
import os
import sys
from PIL import Image, ImageDraw, ImageEnhance, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QUEUE = os.path.join(ROOT, "public", "social", "queue.json")
OUTDIR = os.path.join(ROOT, "public", "social", "cards")
LOGO = os.path.join(ROOT, "public", "images", "carron-logo-horizontal-white.png")
IMGDIR = os.path.join(ROOT, "public", "images")

SIZE = 1080
PAD = 92

# Brand palette (tailwind.config.ts)
EMERALD_TOP = (15, 61, 42)
EMERALD_MID = (11, 46, 32)
EMERALD_DEEP = (8, 37, 26)
GOLD = (212, 175, 55)
GOLD_LIGHT = (232, 199, 102)
BONE = (239, 233, 218)
BONE_MUTED = (200, 194, 180)
BONE_DIM = (154, 150, 134)

FONTS = "C:/Windows/Fonts/"
# Century Gothic is the closest system match to the site's Poppins.
F_DISPLAY = FONTS + "GOTHICB.TTF"
F_DISPLAY_LIGHT = FONTS + "GOTHIC.TTF"
F_BODY = FONTS + "segoeui.ttf"
F_BODY_BOLD = FONTS + "segoeuib.ttf"


def font(path, size):
    return ImageFont.truetype(path, size)


def text_w(draw, s, f, tracking=0):
    w = draw.textlength(s, font=f)
    return w + tracking * max(len(s) - 1, 0)


def draw_tracked(draw, xy, s, f, fill, tracking=0, anchor_right=None):
    """Draw text with manual letter-spacing (PIL has none)."""
    x, y = xy
    if anchor_right is not None:
        x = anchor_right - text_w(draw, s, f, tracking)
    for ch in s:
        draw.text((x, y), ch, font=f, fill=fill)
        x += draw.textlength(ch, font=f) + tracking
    return x


def wrap(draw, s, f, max_w):
    words, lines, cur = s.split(), [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if draw.textlength(trial, font=f) <= max_w or not cur:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def fit_lines(draw, s, path, max_w, max_h, hi, lo, leading=1.16):
    """Largest size at which `s` wraps inside the box. Returns (font, lines)."""
    for size in range(hi, lo - 1, -2):
        f = font(path, size)
        lines = wrap(draw, s, f, max_w)
        if len(lines) * size * leading <= max_h:
            return f, lines
    f = font(path, lo)
    return f, wrap(draw, s, f, max_w)


def photo_ground(bg_name):
    """Cover-crop the photograph to the square, then grade it to brand:
    a darkening emerald wash over the whole frame so the top stays readable,
    and a deep gradient rising from the bottom where the copy sits."""
    src = Image.open(os.path.join(IMGDIR, bg_name)).convert("RGB")
    w, h = src.size
    side = min(w, h)
    # centre crop, biased slightly above centre — faces and subjects sit high
    left = (w - side) // 2
    top = max(0, int((h - side) * 0.38))
    img = src.crop((left, top, left + side, top + side)).resize((SIZE, SIZE), Image.LANCZOS)

    # Brand wash: multiply toward emerald so any photograph reads as ours.
    wash = Image.new("RGB", (SIZE, SIZE), EMERALD_MID)
    img = Image.blend(img, wash, 0.42)
    img = ImageEnhance.Color(img).enhance(0.78)      # pull saturation back
    img = ImageEnhance.Brightness(img).enhance(0.94)
    return img


def scrim(img, top_y):
    """Deep emerald gradient from `top_y` to the foot of the card, so the copy
    sits on near-solid colour while the upper frame keeps the photograph."""
    layer = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    span = max(SIZE - top_y, 1)
    for y in range(max(top_y, 0), SIZE):
        t = (y - top_y) / span
        a = int(252 * (t ** 0.72))                   # ease in, near-solid at the foot
        d.line([(0, y), (SIZE, y)], fill=EMERALD_DEEP + (min(a, 250),))
    return Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")


def footer(img, d, slide_no=None, slide_total=None):
    y = SIZE - PAD - 72
    d.line([(PAD, y), (SIZE - PAD, y)], fill=(58, 92, 74), width=2)  # muted hairline

    logo = Image.open(LOGO).convert("RGBA")
    h = 46
    logo = logo.resize((round(logo.width * h / logo.height), h), Image.LANCZOS)
    img.paste(logo, (PAD, y + 26), logo)

    f = font(F_BODY, 26)
    draw_tracked(d, (0, y + 32), "carron.co.za", f, BONE_DIM, tracking=1.2,
                 anchor_right=SIZE - PAD)

    if slide_total and slide_total > 1:
        fs = font(F_DISPLAY, 24)
        label = "%d / %d" % (slide_no, slide_total)
        draw_tracked(d, (0, PAD - 4), label, fs, GOLD, tracking=2, anchor_right=SIZE - PAD)


def render_slide(slide, n, total, out_path):
    """Photograph, graded to brand, with the copy anchored to the foot of the card."""
    img = photo_ground(slide["bg"])
    measure = ImageDraw.Draw(img)
    box_w = SIZE - 2 * PAD

    eyebrow = (slide.get("eyebrow") or "").upper()
    headline = slide.get("headline") or ""
    body = slide.get("body") or ""
    cta = slide.get("cta") or ""

    # --- measure the block, bottom up
    h_eyebrow = 100 if eyebrow else 0
    bf = font(F_BODY, 34)
    body_lines = wrap(measure, body, bf, box_w) if body else []
    h_body = len(body_lines) * 48 + (22 if body_lines else 0)
    h_cta = 106 if cta else 0

    foot = SIZE - PAD - 72            # the hairline rule
    bottom = foot - 44                # copy stops above it
    ceiling = PAD + (46 if total > 1 else 0)
    avail = bottom - ceiling - h_eyebrow - h_body - h_cta

    hf, h_lines = fit_lines(
        measure, headline, F_DISPLAY, box_w, avail,
        84 if len(headline) < 70 else 68, 38,
    )
    lead = hf.size * 1.17
    h_head = len(h_lines) * lead + 18
    block = h_eyebrow + h_head + h_body + h_cta
    y = bottom - block

    # --- grade, then draw over it
    img = scrim(img, int(y - 190))
    d = ImageDraw.Draw(img)

    if eyebrow:
        draw_tracked(d, (PAD, y), eyebrow, font(F_DISPLAY, 25), GOLD, tracking=4.5)
        y += 46
        d.line([(PAD, y), (PAD + 78, y)], fill=GOLD, width=3)
        y += 54

    for line in h_lines:
        d.text((PAD, y), line, font=hf, fill=BONE)
        y += lead
    y += 18

    for line in body_lines:
        d.text((PAD, y), line, font=bf, fill=BONE_MUTED)
        y += 48
    if body_lines:
        y += 22

    if cta:
        cf = font(F_BODY_BOLD, 32)
        pad_x, pad_y = 34, 22
        w = text_w(d, cta, cf, 1.0) + pad_x * 2
        h = 32 + pad_y * 2
        d.rounded_rectangle([PAD, y, PAD + w, y + h], radius=8, fill=GOLD)
        draw_tracked(d, (PAD + pad_x, y + pad_y - 3), cta, cf, EMERALD_DEEP, tracking=1.0)

    footer(img, d, n, total)
    img.save(out_path, "JPEG", quality=92, optimize=True, progressive=True)
    return out_path


def main():
    want = set(sys.argv[1:])
    os.makedirs(OUTDIR, exist_ok=True)
    with open(QUEUE, encoding="utf-8") as fh:
        queue = json.load(fh)

    made = 0
    for post in queue.get("posts", []):
        if want and post["id"] not in want:
            continue
        if post.get("artwork") == "supplied":
            print("-- %s: supplied artwork, left alone" % post["id"])
            continue
        slides = post.get("slides") or []
        if not slides:
            print("!! %s has no slides" % post["id"])
            continue
        for i, slide in enumerate(slides, 1):
            name = "%s-%d.jpg" % (post["id"], i)
            render_slide(slide, i, len(slides), os.path.join(OUTDIR, name))
            made += 1
        expected = ["/social/cards/%s-%d.jpg" % (post["id"], i) for i in range(1, len(slides) + 1)]
        if post.get("images") != expected:
            print("!! %s: queue 'images' does not match rendered files" % post["id"])
            print("   expected: %s" % json.dumps(expected))
    print("rendered %d card(s) into public/social/cards/" % made)


if __name__ == "__main__":
    main()
