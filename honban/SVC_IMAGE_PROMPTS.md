# SVC_IMAGE_PROMPTS — 診療案内カード画像（AI生成・実写トーン）

> 2026-06-26 作成。トップ／services.html の「診療案内」9枠のライン画アイコンを
> **AI生成のリアル系画像（実写トーン）**に差し替えるための生成指示書。
> 生成＝オーナー（GPT/DALL-E 等）。加工・配置・push＝Claude Code。
>
> **レイアウト試作（桑田レビュー用・noindex）**: `honban/_preview/services-photocards.html`
> 　案A＝3列写真カード（トップ向け）／案B＝左右交互大判（詳細ページ向け・TMDC/カバサワ型）。
> 　参考＝両サイトとも辻堂の競合だが青系。**がじゅまるは暖色ベース維持**（DEC-011）で構成のみ取り込み。

## ⚠ 医療広告ガイドライン（必読・全プロンプト共通の禁止）
前セッション方針では診療案内のAI生成は「当院誤認＋効果誇大」でNG判定だった。
オーナー判断で実施するため、**誤認・誇大を生む要素を生成段階で排除する**。

- **実在の患者・スタッフと誤認させない** → 識別できる顔は出さない（後ろ姿・手元・シルエット・物のみ）。
- **ビフォーアフター禁止**（治療効果の比較表現は薬機法・医療広告GL違反）。
- **不自然に白い歯・光る歯を出さない**（＝効果暗示。特にホワイトニング枠）。
- **口腔内クローズアップを出さない**（AI破綻の温床＋生々しさ＝離脱）。
- **文字・ロゴ・院名・ウォーターマークなし**。
- 生成画像は「イメージ」。**院長・院内の実写が要る箇所には使わない**（ここは診療シンボルのみ）。

## 共通スタイル（全プロンプトに前置き）
```
photorealistic, warm and bright Japanese neighborhood family dental clinic, soft natural daylight, clean calming atmosphere, light wood and soft apricot/terracotta accents, cream background, shallow depth of field, square 1:1 composition, no text, no logos, no watermark, no before/after comparison, no unnaturally white or glowing teeth, no close-up of mouth or oral cavity, no identifiable patient or staff faces (use objects, hands, back views or silhouettes only)
```

## 生成手順（オーナー）
1. 下表の各プロンプト（共通スタイル＋個別）で1枠ずつ生成（正方形・1024px以上推奨・PNG）。
2. ダウンロードした画像を **`honban/images/_incoming/`** に保存（**ファイル名は `svc-general` 等のスロット名にすると確実**。違っても可）。
3. Claudeに「画像置いた」と伝える → `apply_image.py` で 600×600 webp 化＋配置、`<img src>` を `.svg`→`.webp` に差し替え、commit/push。

---

## 枠別プロンプト（共通スタイルに足す）

| slot | 診療 | 個別プロンプト | GL注意 |
|---|---|---|---|
| `svc-general` | 一般歯科 | `a clean single dental treatment chair beside a bright window with light wood interior, tidy instrument tray in soft focus, no people` | — |
| `svc-pediatric` | 小児歯科 | `a cozy kid-friendly clinic corner: small soft chair, picture books on a low table, a few plush toys, warm light, no children's faces` | 子供の顔は出さない |
| `svc-prevention` | 予防歯科 | `neatly arranged dental cleaning tools and a small mirror on a clean tray, a fresh toothbrush, bright hygienic feel, no people` | — |
| `svc-perio` | 歯周病治療 | `a calm clinical scene: gloved dentist hands arranging examination instruments on a tidy tray, soft natural light, no mouth, no oral close-up` | 口腔内NG・手元のみ |
| `svc-whitening` | ホワイトニング | `a calm minimalist clinic vignette suggesting freshness and care: a folded clean white towel, a glass of water and a small clinical tool on light wood, no teeth, no faces` | **歯を出さない・効果暗示NG** |
| `svc-maternity` | マタニティ歯科 | `a gentle reassuring scene of prenatal care: a softly lit calm room with a comfortable chair and plants, a faceless silhouette suggesting an expectant mother resting a hand on her belly, no face` | 顔なし・シルエット |
| `svc-mouthguard` | スポーツマウスガード | `a clean custom sports mouthguard resting on a light wood surface next to simple sports gear, bright product-style lighting, no people` | — |
| `svc-ortho` | マウスピース矯正 | `a pair of clear orthodontic aligner trays in an open case on a clean light surface, soft natural light, product-style, no mouth, no teeth close-up` | 口腔内NG |
| `svc-implant` | インプラント | `a clean dental implant educational model and a small structural diagram object on a tidy desk, soft clinical light, no oral cavity, no people` | 「対応予定」枠・模型のみ |

---

## 対象ファイル（Claude が差し替える箇所）
- `honban/index.html` 200〜250行付近 `service-cards`（`<img class="service-card__icon" src="images/svc-*.svg">` ×9）
- `honban/services.html` 同種の一覧（要確認）
- CSS: `.service-card__icon`（64×64ライン画前提）→ 実写カード用の `.service-card__photo` スタイルに切替（`style.css`）
- 差し替えは `.svg`→`.webp`（同名）。9枚そろってから一括 commit/push。

## ロールバック
ライン画SVG（`honban/images/svc-*.svg`）は残す。`<img src>` を `.svg` に戻すだけで原状復帰。
