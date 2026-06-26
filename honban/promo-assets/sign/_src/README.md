# 看板マスター 再生成手順

辻堂がじゅまる歯科 看板ロゴ（縦・横）。**文字はアウトライン化済＝フォント非依存**で看板屋の環境でも崩れない。

## 成果物（親ディレクトリ）
- `sign-horizontal.svg` / `sign-vertical.svg` … 入稿用ベクター（テキスト=パス化済）
- `sign-*-preview.png` … 確認用ラスタ
- `sign-wall-preview.png` … オレンジ外壁での視認性シミュ

## 設計
- 猫＝受領SVG(`logo_horizontal＿v２.svg`)のパス再利用→テラコッタ化・等倍正規化（`cat.json`に抽出）
- 和文/欧文＝Zen Maru Gothic 700Bold/500Medium を fontTools でグリフ→パス化
- 色: テラコッタ `#C56A38` / 生成り `#FFFDF9` / 濃茶(欧文) `#7A4A2A` / キーライン `#EADFCF`
- 印刷CMYK目安: テラコッタ ≒ C0 M47 Y72 K23（最終は看板屋で色校正）

## 再生成（別PC）
1. このPCにツールは git で来ない。`npm i @expo-google-fonts/zen-maru-gothic`（TTF取得）
2. `python -X utf8 extract_cat.py`（cat.json再生成・元SVG要）→ 既存cat.jsonがあれば不要
3. `python -X utf8 build_sign.py` → sign_h.svg / sign_v.svg
4. PNG化: `chrome --headless=new --default-background-color=00000000 --screenshot=out.png --window-size=W,H file.svg`
