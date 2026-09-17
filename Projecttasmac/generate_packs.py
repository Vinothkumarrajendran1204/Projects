import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def get_font(name, size):
    for p in [f'C:/Windows/Fonts/{name}', f'C:/Windows/Fonts/{name.lower()}', name]:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

f_brand_serif = get_font('georgiab.ttf', 44)
f_brand_serif_sm = get_font('georgiab.ttf', 38)
f_brand_sans = get_font('arialbd.ttf', 46)
f_variant = get_font('arialbd.ttf', 26)
f_variant_lg = get_font('arialbd.ttf', 30)
f_sub = get_font('arialbd.ttf', 20)
f_detail = get_font('arial.ttf', 16)
f_detail_bold = get_font('arialbd.ttf', 15)
f_warning = get_font('arialbd.ttf', 18)
f_warning_sub = get_font('arialbd.ttf', 18)

def draw_centered_text(draw, text, font, center_x, y, fill, spacing=0):
    bbox = font.getbbox(text)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    if spacing == 0:
        draw.text((center_x - text_w / 2, y), text, font=font, fill=fill)
    else:
        total_w = sum(font.getbbox(c)[2] - font.getbbox(c)[0] + spacing for c in text) - spacing
        cur_x = center_x - total_w / 2
        for c in text:
            cw = font.getbbox(c)[2] - font.getbbox(c)[0]
            draw.text((cur_x, y), c, font=font, fill=fill)
            cur_x += cw + spacing
    return text_h

def draw_warning(draw, center_x=488, y_start=660):
    w1 = "Cigarette smoking is"
    w2 = "injurious to health"
    red = (215, 38, 56, 255)
    draw_centered_text(draw, w1, f_warning, center_x, y_start, red)
    draw_centered_text(draw, w2, f_warning_sub, center_x, y_start + 25, red)

def draw_crest_classic(draw, center_x, center_y, color):
    s = 16
    draw.polygon([
        (center_x, center_y + s),
        (center_x - s, center_y),
        (center_x - s, center_y - s * 0.7),
        (center_x + s, center_y - s * 0.7),
        (center_x + s, center_y)
    ], outline=color, width=2)
    draw.polygon([
        (center_x, center_y - 4),
        (center_x + 3, center_y + 3),
        (center_x - 4, center_y - 1),
        (center_x + 4, center_y - 1),
        (center_x - 3, center_y + 3)
    ], fill=color)
    draw.line([(center_x - s - 18, center_y), (center_x - s - 4, center_y)], fill=color, width=2)
    draw.line([(center_x + s + 4, center_y), (center_x + s + 18, center_y)], fill=color, width=2)

def draw_crest_goldflake(draw, center_x, center_y, color_gold, color_blue):
    r = 16
    draw.ellipse([center_x - r, center_y - r, center_x + r, center_y + r], outline=color_gold, width=2, fill=(255, 255, 255, 255))
    draw.ellipse([center_x - r + 3, center_y - r + 3, center_x + r - 3, center_y + r - 3], fill=color_blue)
    draw.polygon([
        (center_x, center_y - 8),
        (center_x + 2, center_y - 2),
        (center_x + 8, center_y - 2),
        (center_x + 3, center_y + 2),
        (center_x + 5, center_y + 8),
        (center_x, center_y + 4),
        (center_x - 5, center_y + 8),
        (center_x - 3, center_y + 2),
        (center_x - 8, center_y - 2),
        (center_x - 2, center_y - 2)
    ], fill=color_gold)

def apply_marlboro_chevron(base_img, mask_img, color_front):
    w, h = base_img.size
    
    # 2x supersampled layer for smooth antialiased chevron polygon
    scale = 2
    sw, sh = w * scale, h * scale
    chev_high = Image.new('L', (sw, sh), 0)
    dh = ImageDraw.Draw(chev_high)
    
    # Coordinates in 2x
    pts = [
        (240 * scale, 120 * scale),
        (665 * scale, 120 * scale),
        (654 * scale, 350 * scale),
        (488 * scale, 270 * scale),
        (324 * scale, 350 * scale),
        (240 * scale, 350 * scale)
    ]
    dh.polygon(pts, fill=255)
    
    # Downscale mask to original size with high quality antialiasing
    chev_alpha = chev_high.resize((w, h), Image.Resampling.LANCZOS)
    
    res = base_img.copy()
    for y in range(120, 365):
        for x in range(240, 665):
            alpha = chev_alpha.getpixel((x, y))
            m = mask_img.getpixel((x, y))
            if alpha > 0 and m > 120:
                t = (alpha / 255.0) * (m / 255.0)
                br, bg, bb = base_img.getpixel((x, y))
                lum = (br * 0.299 + bg * 0.587 + bb * 0.114) / 255.0
                nr = int(color_front[0] * lum)
                ng = int(color_front[1] * lum)
                nb = int(color_front[2] * lum)
                
                # Blend with original
                fr = int(br * (1 - t) + nr * t)
                fg = int(bg * (1 - t) + ng * t)
                fb = int(bb * (1 - t) + nb * t)
                res.putpixel((x, y), (fr, fg, fb))
                
    return res

def make_pack_classic_regular():
    img = Image.open('base_template.png').convert('RGB')
    draw = ImageDraw.Draw(img)
    cx = 488

    # Brand
    draw_centered_text(draw, "CLASSIC", f_brand_serif, cx, 370, (15, 23, 42), spacing=3)
    
    # Elegant gold divider
    draw.line([(cx - 70, 428), (cx + 70, 428)], fill=(180, 83, 9), width=2)
    
    # Variant
    draw_centered_text(draw, "REGULAR", f_variant, cx, 442, (75, 85, 99), spacing=2)

    # Crest
    draw_crest_classic(draw, cx, 510, (180, 83, 9))

    # Features
    draw_centered_text(draw, "RICH TASTE", f_sub, cx, 550, (100, 116, 139), spacing=1)
    draw_centered_text(draw, "84MM 20N • KING SIZE", f_detail_bold, cx, 584, (148, 163, 184))
    draw_centered_text(draw, "TOASTED VIRGINIA BLEND", f_detail, cx, 608, (148, 163, 184))

    draw_warning(draw, cx, 660)
    return img

def make_pack_gold_flake_kings():
    img = Image.open('base_template.png').convert('RGB')
    draw = ImageDraw.Draw(img)
    cx = 488

    # Brand in gold
    draw_centered_text(draw, "GOLD FLAKE", f_brand_serif_sm, cx, 365, (180, 83, 9), spacing=2)
    
    # Royal blue ribbon pill for Kings Blue
    pill_w = 190
    pill_h = 36
    pill_y = 425
    draw.rounded_rectangle([cx - pill_w/2, pill_y, cx + pill_w/2, pill_y + pill_h], radius=6, fill=(30, 58, 138), outline=(217, 119, 6), width=2)
    draw_centered_text(draw, "KINGS BLUE", f_sub, cx, pill_y + 8, (255, 255, 255), spacing=2)

    # Crest
    draw_crest_goldflake(draw, cx, 502, (217, 119, 6), (30, 58, 138))

    # Features
    draw_centered_text(draw, "HONEYDEW BLEND", f_sub, cx, 545, (71, 85, 105), spacing=1)
    draw_centered_text(draw, "KING SIZE • 20 FILTER STICKS", f_detail_bold, cx, 580, (148, 163, 184))
    draw_centered_text(draw, "GOLDEN VIRGINIA TOBACCO", f_detail, cx, 606, (148, 163, 184))

    draw_warning(draw, cx, 660)
    return img

def make_pack_marlboro_red():
    base = Image.open('base_template.png').convert('RGB')
    mask = Image.open('pack_mask.png').convert('L')
    img = apply_marlboro_chevron(base, mask, color_front=(215, 25, 45))

    draw = ImageDraw.Draw(img)
    cx = 488

    # Brand text in the opening of chevron
    draw_centered_text(draw, "Marlboro", f_brand_sans, cx, 375, (17, 24, 39))

    # Red Variant Badge
    draw_centered_text(draw, "RED", f_variant_lg, cx, 442, (205, 22, 40), spacing=3)
    draw_centered_text(draw, "PREMIUM KINGS", f_sub, cx, 480, (75, 85, 99), spacing=1)

    # Mini crest
    draw_crest_classic(draw, cx, 532, (180, 83, 9))

    draw_centered_text(draw, "SELECTED FINE TOBACCOS", f_detail_bold, cx, 575, (100, 116, 139))
    draw_centered_text(draw, "20 CLASS A CIGARETTES", f_detail, cx, 604, (148, 163, 184))

    draw_warning(draw, cx, 660)
    return img

def make_pack_classic_milds():
    img = Image.open('base_template.png').convert('RGB')
    draw = ImageDraw.Draw(img)
    cx = 488

    # Brand
    draw_centered_text(draw, "CLASSIC", f_brand_serif, cx, 365, (15, 23, 42), spacing=3)
    
    # Cyan / Sky Blue accent band
    band_w = 170
    band_h = 36
    band_y = 425
    draw.rounded_rectangle([cx - band_w/2, band_y, cx + band_w/2, band_y + band_h], radius=6, fill=(2, 132, 199), outline=(56, 189, 248), width=2)
    draw_centered_text(draw, "MILDS", f_sub, cx, band_y + 8, (255, 255, 255), spacing=3)

    # Silver/Cyan crest
    draw_crest_classic(draw, cx, 502, (2, 132, 199))

    # Features
    draw_centered_text(draw, "SMOOTH FILTER", f_sub, cx, 545, (71, 85, 105), spacing=1)
    draw_centered_text(draw, "CHARCOAL ACTIVE • 20 STICKS", f_detail_bold, cx, 580, (148, 163, 184))
    draw_centered_text(draw, "LOW TAR BALANCED BLEND", f_detail, cx, 606, (148, 163, 184))

    draw_warning(draw, cx, 660)
    return img

def make_pack_gold_flake_lights():
    img = Image.open('base_template.png').convert('RGB')
    draw = ImageDraw.Draw(img)
    cx = 488

    # Brand in gold
    draw_centered_text(draw, "GOLD FLAKE", f_brand_serif_sm, cx, 365, (180, 83, 9), spacing=2)
    
    # Warm amber / gold ribbon
    band_w = 170
    band_h = 36
    band_y = 425
    draw.rounded_rectangle([cx - band_w/2, band_y, cx + band_w/2, band_y + band_h], radius=6, fill=(245, 158, 11), outline=(217, 119, 6), width=2)
    draw_centered_text(draw, "LIGHTS", f_sub, cx, band_y + 8, (255, 255, 255), spacing=3)

    # Gold roundel crest
    draw_crest_goldflake(draw, cx, 502, (217, 119, 6), (245, 158, 11))

    # Features
    draw_centered_text(draw, "FINE VIRGINIA", f_sub, cx, 545, (71, 85, 105), spacing=1)
    draw_centered_text(draw, "MICRO-VENTILATED • 20 STICKS", f_detail_bold, cx, 580, (148, 163, 184))
    draw_centered_text(draw, "SMOOTH REDUCED TAR BLEND", f_detail, cx, 606, (148, 163, 184))

    draw_warning(draw, cx, 660)
    return img

def make_pack_marlboro_gold():
    base = Image.open('base_template.png').convert('RGB')
    mask = Image.open('pack_mask.png').convert('L')
    img = apply_marlboro_chevron(base, mask, color_front=(200, 162, 90))

    draw = ImageDraw.Draw(img)
    cx = 488

    # Brand text in chevron opening
    draw_centered_text(draw, "Marlboro", f_brand_sans, cx, 375, (17, 24, 39))

    # Gold Variant Badge
    draw_centered_text(draw, "GOLD", f_variant_lg, cx, 442, (180, 140, 60), spacing=3)
    draw_centered_text(draw, "LIGHTS", f_sub, cx, 480, (100, 116, 139), spacing=2)

    # Mini coat of arms / emblem
    draw_crest_classic(draw, cx, 532, (180, 140, 60))

    draw_centered_text(draw, "SMOOTH FLAVOR", f_detail_bold, cx, 575, (100, 116, 139))
    draw_centered_text(draw, "20 CLASS A CIGARETTES", f_detail, cx, 604, (148, 163, 184))

    draw_warning(draw, cx, 660)
    return img

if __name__ == '__main__':
    out_dir = os.path.join('images', 'products')
    os.makedirs(out_dir, exist_ok=True)

    packs = [
        ("classic-regular.jpg", make_pack_classic_regular()),
        ("gold-flake-kings.jpg", make_pack_gold_flake_kings()),
        ("marlboro-red.jpg", make_pack_marlboro_red()),
        ("classic-milds.jpg", make_pack_classic_milds()),
        ("gold-flake-lights.jpg", make_pack_gold_flake_lights()),
        ("marlboro-gold.jpg", make_pack_marlboro_gold()),
    ]

    for filename, img in packs:
        path = os.path.join(out_dir, filename)
        img.save(path, "JPEG", quality=95)
        print(f"Generated: {path}")
