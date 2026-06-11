# GENERATION_BRIEF — 生成イラスト素材ブリーフ（Codex丸投げ用）

> 2026-06-11 作成。辻堂がじゅまる歯科 本番(honban)の「のっぺりLP感」解消のため、各セクションに置く**イラスト素材**を生成する指示書。
> **分担**: 生成=Codex（or 画像AI）／加工・配置・検証・push=Claude Code。
> Codexは生成して `honban/images/_incoming/` に**指定ファイル名**で保存するだけでよい。以降はClaude Codeが `apply_image.py` で加工し各ページへ配置する。

## 進め方（Codex側の手順）
1. 下の各画像を、**共通スタイルガイド**を厳守して生成（1画像=1ファイル）。
2. `honban/images/_incoming/<指定ファイル名>.png` として保存（PNG・正方形・1024px以上推奨）。
3. 保存し終えたら「batch1完了」等を伝える。加工・配置・pushはClaude Codeが行う（Codexはコード変更・配置をしない）。

## 共通スタイルガイド（全画像で厳守＝統一感が命）
- **タイプ**: フラットで温かみのあるイラスト（微かな紙テクスチャ可）。写真ではない。線は細め一定。
- **パレット**: テラコッタ #C56A38 / アプリコット #E0884A / クリーム #F7E8DB / 深い茶 #9C5026 / 生成り #FBF8F3。差し色に落ち着いたガジュマルの葉色（くすんだ緑 #7C8A5A）少量可。
- **世界観**: 穏やか・やさしい・町医者・家族・ガジュマル（ガジュマル＝南国の木。葉や気根のモチーフを世界観として）。
- **構図**: 主題を中央に、余白たっぷり。**背景にクリーム色(#F7E8DB系)を敷き込んだ正方形タイル**として自己完結させる（透過不要）。
- **禁止**: 文字・ロゴ一切なし／**リアルな人間の顔・手は描かない**（人物は簡略なシルエット/顔なしまで）／**リアルな歯・口腔のクローズアップは描かない**（AI破綻の原因）。
- **比率**: 正方形 1:1。全画像で同じタッチ・同じ線の太さ・同じ彩度に揃える。

---

## Batch 1（最優先）: 当院の特徴 3枚

### 1. feature-family.png
- 用途: index「当院の特徴 01 家族で通いやすい環境」
- プロンプト案: *Warm flat illustration of a cozy, welcoming family-friendly dental waiting space. Soft rounded armchairs, a potted gajumaru (banyan) tree, a window with gentle light, a low table with picture books. Optional simple faceless figures suggesting a parent and child. Terracotta, apricot and cream palette. Calm, friendly, reassuring. Cream background baked in. No text, no realistic faces, square 1:1.*

### 2. feature-consult.png
- 用途: index「当院の特徴 02 相談しやすい診療」
- プロンプト案: *Warm flat illustration symbolizing easy, trusting consultation. Two soft chairs facing each other with a small round table, gentle speech-bubble motifs, a gajumaru leaf accent. Terracotta, apricot and cream palette. Calm and approachable. Cream background baked in. No text, no realistic faces, square 1:1.*

### 3. feature-access.png
- 用途: index「当院の特徴 03 通いやすい立地」
- プロンプト案: *Warm flat illustration of a friendly neighborhood dental clinic exterior near a train station. A small warm-toned building with a large gajumaru tree beside it, a simple street, a stylized station sign with no readable text, soft sky. Terracotta, apricot and cream palette. Inviting, walkable feeling. Cream background baked in. No text, square 1:1.*

---

## Batch 2（任意・診療アイコンの格上げ）: 診療案内 5枚
※現在は手描きSVG。生成イラストに差し替えたい場合のみ。同じスタイルガイドで、各「歯」を主役にしたシンプルなイラスト（顔・リアル歯クローズアップ禁止は同様。歯はやさしいシンボル的表現で）。

### 4. svc-general.png — 一般歯科
*Single friendly stylized tooth, calm and clean, gentle shield or heart motif suggesting careful minimal treatment. Same warm palette, cream background, no text, 1:1.*

### 5. svc-pediatric.png — 小児歯科
*Friendly stylized small tooth with a playful star or balloon motif, child-friendly and gentle. Same warm palette, cream background, no text, 1:1.*

### 6. svc-prevention.png — 予防歯科
*Stylized tooth with a toothbrush and a small sparkle, suggesting cleanliness and prevention. Same warm palette, cream background, no text, 1:1.*

### 7. svc-perio.png — 歯周病治療
*Stylized tooth with healthy highlighted gums (soft, not realistic), suggesting gum care. Same warm palette, cream background, no text, 1:1.*

### 8. svc-whitening.png — ホワイトニング
*Bright stylized tooth with gentle sparkles suggesting natural brightness. Same warm palette, cream background, no text, 1:1.*

---

## 加工・配置（Claude Code側・参考）
保存後、Claude Codeが以下を実行（Codexは不要）:
```
python honban/_tools/apply_image.py honban/images/_incoming/feature-family.png  feat-family
python honban/_tools/apply_image.py honban/images/_incoming/feature-consult.png feat-consult
python honban/_tools/apply_image.py honban/images/_incoming/feature-access.png  feat-access
# batch2を作った場合
python honban/_tools/apply_image.py honban/images/_incoming/svc-general.png    svc-general
# ... svc-pediatric / svc-prevention / svc-perio / svc-whitening 同様
```
→ webp化・サイズ統一して `honban/images/` へ。その後 index/services のマークアップ・CSSへ配置し、実機確認してpush。
スロット定義は `honban/_tools/apply_image.py` の SPECS 参照。
