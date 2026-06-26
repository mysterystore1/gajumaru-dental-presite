# -*- coding: utf-8 -*-
import glob, json, re, sys
from fontTools.svgLib.path import parse_path
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Identity

cands = glob.glob(r"C:\Users\taikan\Downloads\YahooJapanMail_2026_06_16\logo_horizontal*.svg")
print("source:", cands)
src = open(cands[0], encoding="utf-8").read()

# g1 transform matrix
m = re.search(r'id="g1"\s+transform="matrix\(([^)]+)\)"', src)
mat = [float(x) for x in m.group(1).split(",")]
print("g1 matrix:", mat)

# path67 / path68 d
def get_d(pid):
    mm = re.search(r'd="([^"]+)"\s+id="%s"' % pid, src)
    return mm.group(1)
d67 = get_d("path67"); d68 = get_d("path68")
print("len d67/d68:", len(d67), len(d68))

# combined bbox after g1 transform
tr = (mat[0],mat[1],mat[2],mat[3],mat[4],mat[5])
bp = BoundsPen(None)
tp = TransformPen(bp, tr)
parse_path(d67, tp); parse_path(d68, tp)
print("cat bbox (post-transform):", [round(v,2) for v in bp.bounds])

json.dump({"matrix":mat,"d67":d67,"d68":d68,"bbox":bp.bounds}, open("cat.json","w"), ensure_ascii=False)
print("saved cat.json")
