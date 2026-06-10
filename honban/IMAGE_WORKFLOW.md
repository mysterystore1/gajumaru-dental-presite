# 画像適用ワークフロー（AI横断・あなたの手作業ゼロ）

> GPT等で画像を生成 → **1フォルダに保存するだけ**。リネーム・移動・src書き換え・変換は全部Claudeがやる。

## ⚠ 最重要（整合性）
- ここで入れるGPT生成画像は**テスト/プレビュー用**。「見た目の確認」のためだけ。
- **本番公開前に必ず"実際の院内写真"と"本物の院長写真"に差し替える**。AI生成の院内/院長を本物として出すのは患者を誤認させる（医療サイトでNG）。院長の顔は特に実写必須。
- だからこのワークフローの出力は `_incoming` 経由のテスト適用であり、内覧会後の実写差し替え（`PHOTO_SHOTLIST.md`/`IMAGE_TODO.md`）が本番。

## やり方（3ステップ）
1. 下のプロンプトでGPT(DALL-E等)に画像生成
2. ダウンロードした画像を **`honban/images/_incoming/`** に保存（**ファイル名は何でもいい・複数まとめてOK**）
3. Claudeに「画像置いた」と言う → Claudeが中身を見て分類し、`apply_image.py` で正しい形式(webp)・サイズ・ファイル名に変換、`<img src>`も必要なら書き換え、commit/push

→ あなたはリネームも移動も書き換えもしない。

## GPT用プロンプト（slotごと・コピペ可）
共通スタイル: `warm and bright Japanese neighborhood family dental clinic, soft natural light, clean and calming, light wood and soft apricot/terracotta accents, photorealistic, no text, no logos, no watermark`

| slot | 用途 | 比率 | プロンプト（共通スタイルに足す） |
|---|---|---|---|
| hero | トップ ヒーロー（院内イメージ） | 16:9 横長 | `interior of the clinic — bright welcoming reception and waiting area, wide shot` |
| exterior | 院内紹介 外観 | 16:10 | `exterior storefront of a small ground-floor dental clinic, friendly entrance, daytime` |
| reception | 受付 | 16:10 | `reception counter with warm wood and a few plants, tidy` |
| waiting | 待合室 | 16:10 | `comfortable waiting room with soft chairs and plants, quiet` |
| treatment | 診療室 | 16:10 | `semi-private treatment room with a single clean dental chair` |
| counseling | カウンセリングルーム | 16:10 | `small private counseling room with a table and two chairs, calm` |
| equipment | 設備 | 16:10 | `clean modern dental equipment area, digital x-ray, tidy` |
| director | 院長ポートレート（※テストのみ・本番は実写） | 2:3 縦 | `friendly Japanese dentist in a white coat, warm gentle smile, soft clinic background, portrait` |

比率はGPT側で指定できればベスト（できなくてもClaude側でcover-cropするのでOK）。

## Claude側がやること（参考）
- `_incoming/` の各画像を Read で見て slot を判定
- `python honban/_tools/apply_image.py <画像> <slot>` で webp化＋リサイズ＋正規ファイル名で `honban/images/` に保存
- facility系は初回だけ `<img src>` を `clinic-*.svg` → `facility-*.webp` に変更（以後は同名上書きで差し替え不要）
- commit/push → 1〜2分でライブ反映
- 適用後 `_incoming/` は空にする
