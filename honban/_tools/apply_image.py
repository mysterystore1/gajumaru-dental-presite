#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
GPT等で生成した画像を、サイトの正しいファイル名・サイズ・形式(webp)へ自動変換して配置する。
使い方: python apply_image.py <元画像パス> <slot>
slot 一覧は SPECS 参照。cover方式で指定サイズにトリミング、webp化して honban/images/ に保存。
"""
import sys, os
from PIL import Image, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
IMAGES = os.path.normpath(os.path.join(HERE, "..", "images"))

# slot -> (出力ファイル名, 幅, 高さ)
SPECS = {
    "hero":       ("hero-director.webp",     1672, 941),   # index ヒーロー(院内イメージ・横長)
    "director":   ("director-profile.webp",   997, 1577),  # 院長ポートレート(縦・index/anxiety/about共用)
    "exterior":   ("facility-exterior.webp",  1000, 625),  # facility 外観
    "reception":  ("facility-reception.webp", 1000, 625),  # facility 受付
    "waiting":    ("facility-waiting.webp",   1000, 625),  # facility 待合室
    "treatment":  ("facility-treatment.webp", 1000, 625),  # facility 診療室
    "counseling": ("facility-counseling.webp",1000, 625),  # facility カウンセリング
    "equipment":  ("facility-equipment.webp", 1000, 625),  # facility 設備
}

def main():
    if len(sys.argv) != 3 or sys.argv[2] not in SPECS:
        print("usage: apply_image.py <src> <slot>")
        print("slots:", ", ".join(SPECS))
        sys.exit(1)
    src, slot = sys.argv[1], sys.argv[2]
    fname, w, h = SPECS[slot]
    img = Image.open(src).convert("RGB")
    fitted = ImageOps.fit(img, (w, h), method=Image.LANCZOS)  # cover-crop
    out = os.path.join(IMAGES, fname)
    fitted.save(out, "WEBP", quality=82, method=6)
    kb = os.path.getsize(out) // 1024
    print(f"OK {slot} -> images/{fname} ({w}x{h}, {kb}KB)")

if __name__ == "__main__":
    main()
