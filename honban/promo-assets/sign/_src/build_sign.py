# -*- coding: utf-8 -*-
"""辻堂がじゅまる歯科 看板マスター生成（アウトライン化・フォント非依存）。
猫=受領SVGのパス再利用(テラコッタ化)。和文/欧文=Zen Maru Gothicをパス化。生成りパネル。"""
import json
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.svgLib.path import parse_path

TC = "#C56A38"   # テラコッタ(主役)
BR = "#7A4A2A"   # 濃茶(欧文)
CR = "#FFFDF9"   # 生成り(パネル)
KL = "#EADFCF"   # キーライン(淡)
LF = "#7A9A6B"   # 葉

cat = json.load(open("cat.json", encoding="utf-8"))
CB = cat["bbox"]              # post-transform bbox [xmin,ymin,xmax,ymax]
CW, CH = CB[2]-CB[0], CB[3]-CB[1]
CATG = 'matrix(%s)' % ",".join(str(x) for x in cat["matrix"])

def font(weight):
    p = "node_modules/@expo-google-fonts/zen-maru-gothic/%s/ZenMaruGothic_%s.ttf" % (weight, weight)
    f = TTFont(p)
    return (f, f['head'].unitsPerEm, f.getBestCmap(), f.getGlyphSet(), f['hmtx'])

def bake_h(text, px, x0, base, fnt, ls=0.0, space=0.4):
    _, upm, cmap, gs, hmtx = fnt
    s = px/upm; pen = SVGPathPen(gs); x = x0
    for ch in text:
        if ch == ' ':
            x += px*space + px*ls; continue
        g = cmap[ord(ch)]
        gs[g].draw(TransformPen(pen, (s, 0, 0, -s, x, base)))
        x += hmtx[g][0]*s + px*ls
    return pen.getCommands(), x-x0

def bake_v(text, px, cx, y0, fnt, gap=1.02):
    _, upm, cmap, gs, hmtx = fnt
    s = px/upm; pen = SVGPathPen(gs); y = y0+px
    for ch in text:
        g = cmap[ord(ch)]; adv = hmtx[g][0]*s
        gs[g].draw(TransformPen(pen, (s, 0, 0, -s, cx-adv/2, y)))
        y += px*gap
    return pen.getCommands(), y-y0-px+px

def bounds(d):
    bp = BoundsPen(None); parse_path(d, bp); return bp.bounds

def cat_g(tx, ty, th, fill=TC):
    s = th/CH
    t = "translate(%.3f,%.3f) scale(%.5f) translate(%.3f,%.3f) %s" % (tx, ty, s, -CB[0], -CB[1], CATG)
    return '<g transform="%s" fill="%s"><path d="%s"/><path d="%s"/></g>' % (t, fill, cat["d67"], cat["d68"])

def svg(w, h, body, px_w=None):
    pw = px_w or w
    ph = pw*h/w
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %.1f %.1f" width="%.0f" height="%.0f">\n%s\n</svg>'
            % (w, h, pw, ph, body))

def panel(w, h, r=46):
    return ('<rect x="0" y="0" width="%.1f" height="%.1f" rx="%d" fill="%s"/>'
            '<rect x="6" y="6" width="%.1f" height="%.1f" rx="%d" fill="none" stroke="%s" stroke-width="3"/>'
            % (w, h, r, CR, w-12, h-12, r-4, KL))

# ---------- 横型 ----------
def build_h(weight="700Bold", JP=120):
    f = font(weight); fe = font("500Medium")
    jp0, jpw = bake_h("辻堂がじゅまる歯科", JP, 0, 0, f)
    jb = bounds(jp0)                         # 実バウンディング(baseline=0)
    e0, ew0 = bake_h("Tsujido Gajumaru Dental Clinic", 100, 0, 0, fe, ls=0.14)
    EN2 = 100*(jpw*0.96)/ew0                  # 欧文を和文幅にフィット
    e0, ew = bake_h("Tsujido Gajumaru Dental Clinic", EN2, 0, 0, fe, ls=0.14)
    eb = bounds(e0)
    G = JP*0.20                               # 和文と欧文の間
    jp_h, en_h = jb[3]-jb[1], eb[3]-eb[1]
    block_h = jp_h + G + en_h
    catH = JP*1.62; catW = catH/CH*CW
    padX, gapX, padY = 96, 64, 84
    H = max(catH, block_h) + padY*2
    textX = padX + catW + gapX
    W = textX + jpw + padX
    btop = (H - block_h)/2                     # ブロックを縦中央
    Yjp = btop - jb[1]                         # 和文baseline(視覚上端=btop)
    Yen = Yjp + jb[3] + G - eb[1]              # 欧文baseline
    cy = (H - catH)/2
    jp_d, _ = bake_h("辻堂がじゅまる歯科", JP, textX, Yjp, f)
    en_d, _ = bake_h("Tsujido Gajumaru Dental Clinic", EN2, textX, Yen, fe, ls=0.14)
    body = (panel(W, H)
            + cat_g(padX, cy, catH)
            + '<path d="%s" fill="%s"/>' % (jp_d, TC)
            + '<path d="%s" fill="%s"/>' % (en_d, BR))
    print("H=%.0f block_h=%.0f catH=%.0f Yjp=%.0f Yen=%.0f jp_visual_top=%.0f" % (
          H, block_h, catH, Yjp, Yen, Yjp+jb[1]))
    return svg(W, H, body, px_w=2400)

# ---------- 縦型 ----------
def build_v(weight="700Bold", JP=118):
    f = font(weight)
    padX, padY, gap = 66, 70, 44
    catH = JP*1.6; catW = catH/CH*CW
    colw = max(catW, JP)
    W = colw + padX*2
    cx = W/2
    cat_x = cx - catW/2
    stack_y = padY + catH + gap
    jp_d, used = bake_v("辻堂がじゅまる歯科", JP, cx, stack_y, f)
    jb = bounds(jp_d)
    H = jb[3] + padY
    body = (panel(W, H, r=40)
            + cat_g(cat_x, padY, catH)
            + '<path d="%s" fill="%s"/>' % (jp_d, TC))
    return svg(W, H, body, px_w=600)

open("sign_h.svg", "w", encoding="utf-8").write(build_h())
open("sign_v.svg", "w", encoding="utf-8").write(build_v())
print("wrote sign_h.svg, sign_v.svg")
# 寸法ログ
import re
for fn in ("sign_h.svg", "sign_v.svg"):
    vb = re.search(r'viewBox="([^"]+)"', open(fn, encoding="utf-8").read()).group(1)
    p = [float(x) for x in vb.split()]
    print(fn, "viewBox", [round(x) for x in p], "ratio %.2f:1" % (p[2]/p[3]))
