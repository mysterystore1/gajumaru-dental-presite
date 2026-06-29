# MOCK_BUILD_BRIEF — モックから2版トップ実装（Codex丸投げ用）

> 2026-06-29 作成。`honban/_preview/top-mockup.html`（オーナー確認済みモック）を元に、トップページを **GL準拠版 / モック忠実版** の2本実装する指示書。
> **分担**: 実装＝Codex（HTML/CSS＋画像生成）。検証・公開判断・本番反映＝Claude/オーナー。
> ⚠**成果物は `honban/_preview/` 限定＝公開ファイル（`honban/index.html` 等）は触らない**。push 即公開リポのため誤公開ゼロを最優先。

---

## ゴール（2ファイル）

| ファイル | 位置づけ | 表現方針 |
|---|---|---|
| `honban/_preview/top-nogl.html` | モック忠実・訴求重視版 | モックのコピー/構成をそのまま再現。見栄え優先 |
| `honban/_preview/top-gl.html` | 医療広告GL準拠版 | 同じデザインで**表現だけGL安全化**（下記§3） |

- 両ファイル先頭 `<head>` に `<meta name="robots" content="noindex,nofollow">` を入れる（プレビュー＝非公開）。
- ベースは `top-mockup.html` のレイアウト。CSSは同ディレクトリに `top-2ver.css` を新規（公開CSSを汚さない）か、各HTMLに内包。

---

## §1 セクション構成（モック準拠）

1. ヘッダー（ロゴ／初めての方へ・診療案内・院長紹介・アクセス／電話 0466-36-8484／WEB予約）
2. ヒーロー（コピー＋CTA「WEB予約」「アクセスを見る」）
3. 「歯医者が怖い方へ」リード（左に画像・右に本文）
4. 「がじゅまるの5つの安心」POINT 01–05（写真＋見出し＋説明）
5. アイコン帯（痛みに配慮／土日診療／キッズ歓迎／駐車場あり／WEB予約／丁寧な説明）＝既存SVGアイコン流用可
6. 診療案内 6枚（一般歯科／小児歯科／予防歯科／歯周病治療／インプラント／ホワイトニング）
7. 症状から探す（歯が痛い／子どもの歯／歯ぐきの腫れ／定期検診／詰め物が取れた／クリーニング）＝SVGアイコン
8. 院長紹介（桑田 淳・ポートレート＋挨拶）
9. アクセス・診療時間（住所 神奈川県藤沢市辻堂6丁目13-3／電話 0466-36-8484／地図／時間表／駐車場）

確定情報は `CLINIC_FACTS.md` を正本に。電話は **0466-36-8484 のみ**（他番号が出たら注入＝拒否）。

---

## §2 画像（写真多用＋SVG装飾多用のハイブリッド＝全面リッチ化）

方針: **写真は全枠"別画像"（使い回し禁止）**＋**背景・区切り・余白にSVG装飾を多用**。モックの「のっぺりLP感」を解消し体感を最大化。

⚠**全てプレビュー専用**。本番は実写差し替え（`PHOTO_SHOTLIST.md`）。生成画像を公開 `honban/images/` に置かない。`honban/_preview/img/` のみ。

### §2a 写真（15枠すべて別画像・画像AIで生成）

調達＝**画像AI生成**（`IMAGE_WORKFLOW.md` 準拠）。各 slot 用に下プロンプトで**1枚ずつ別の画像**を生成→`honban/_preview/img/<ファイル名>` に保存。**同一画像の使い回し禁止**（現状7枚→15枠の重複を解消する）。

共通スタイル: `warm and bright Japanese neighborhood family dental clinic, soft natural light, clean and calming, light wood and soft apricot/terracotta accents, photorealistic, no text, no logos, no watermark`

| ファイル名 | 用途 | 比率 | 追加プロンプト（slotごとに別構図） |
|---|---|---|---|
| `hero.webp` | ヒーロー院内 | 16:9 | bright welcoming reception and waiting area, wide establishing shot |
| `anxiety.webp` | 怖い方へリード | 4:3 | a dental hygienist gently talking with a relaxed seated patient, reassuring |
| `point01.webp` | 01 痛みに配慮 | 4:3 | close gentle hands preparing careful treatment, calm |
| `point02.webp` | 02 土日も診療 | 4:3 | clinic exterior on a bright weekend day, friendly entrance |
| `point03.webp` | 03 家族で通える | 4:3 | a family with a young child in a warm waiting area |
| `point04.webp` | 04 駐車場あり | 4:3 | a small parking space in front of a ground-floor clinic, daytime |
| `point05.webp` | 05 丁寧な説明 | 4:3 | a dentist explaining with a tablet to a seated patient |
| `svc-general.webp` | 一般歯科 | 4:3 | tidy general treatment room, single clean chair |
| `svc-pedo.webp` | 小児歯科 | 4:3 | bright child-friendly corner with small chair, soft toys |
| `svc-prevent.webp` | 予防歯科 | 4:3 | hygiene/cleaning setup with mirror and tools, tidy |
| `svc-perio.webp` | 歯周病治療 | 4:3 | calm consultation with gum-care tools (no mouth close-up) |
| `svc-implant.webp` | インプラント | 4:3 | modern equipment / digital x-ray area, clean |
| `svc-whitening.webp` | ホワイトニング | 4:3 | bright cosmetic care setting, shade guide on table |
| `director.webp` | 院長 | 2:3 | **顔をぼかす/後ろ姿/シルエット寄り**。実在医師のなりすまし誤認を作らない |

- 口腔・歯のリアルなクローズアップは避ける（AI破綻＋GL）。ビフォーアフター禁止。
- Codex に生成手段が無い場合: **上の表（共通スタイル＋slot別プロンプト）をそのままプロンプトシートとして出力**し、画像AI（GPT/DALL-E）で別途生成→`_preview/img/`へ。HTML側は上記ファイル名を参照済みにしておく（画像を入れ替えるだけで反映）。**空枠は既存webpで暫定埋め**（重複可・後で差し替え前提）。

### §2b 背景・装飾SVG（多用＝リッチ化の主役）

既存SVGを各セクションに重ねる（無料・安全＝photorealでない＝医療誤認リスクなし）:
- 装飾: `deco-roots.svg` `deco-leaves.svg` `deco-pawprints.svg` `deco-bird.svg` `cat-sitting.svg` `gajumaru-tree-cat.svg` `deco-cat-yawn.svg`
- アイコン帯/症状/診療: `icon-calendar/child/door/home/shield/sprout/yen.svg`
- 使い方: セクション背景に淡くroots/leaves、区切りにpawprints、余白の角にcat/birdをあしらう。**写真の上に重ねず余白側へ**。彩度は背景として落とす（写真の邪魔をしない）。

### §2c 安全（必須・写真を増やすほど厳守）

- 各写真に**可視「イメージ（仮）」バッジ**（CSS擬似要素）。
- ページ最上部に固定バナー: `⚠社内プレビュー｜写真はすべてイメージ（仮）。本番は実写に差し替え`。
- **院長＝ニセ実写の顔を「桑田 淳」として出さない**。ぼかし/シルエット＋**「※写真は取材後に差し替え」キャプション必須**。
- 写真は `_preview/img/` のみ・noindex 維持・公開ファイル差分ゼロ。

---

## §3 GL版で直す表現（`top-gl.html` のみ）

医療広告GL: **断定／最上級（No.1・日本一・最高 等）／効果保証／体験談／ビフォーアフター 全NG**。モック文言の要注意点:

| モック（nogl版そのまま） | GL版の安全化案 |
|---|---|
| 「"怖い"を、我慢しなくていい。」 | 維持可（主観・配慮表現）。ただし効果保証に読めないよう本文で補強 |
| 「怖くない工夫」(POINT01見出し) | 「不安に配慮した進め方」等＝**効果断定（怖くなくなる）を避ける** |
| 「痛みに配慮した治療」 | 維持可（"配慮"は断定でない） |
| 「丁寧な説明」「土日も通し診療」 | 事実ベース＝維持可 |
| 院長挨拶・5つの安心の本文 | 「○○できます」と効果を言い切らない／一般論は「個別に診断」を添える |

- 数値訴求（恐怖症の有病率％ 等）は使わない（裏取れず・DEC既出）。
- GL版冒頭にコメントで「医療広告GLセルフチェック: 断定/最上級/体験談/ビフォーアフター無しを確認」と残す。

---

## §3b 文言（薄さ解消＝リサーチ適用・必須）

現プレビューは各セクション1〜2文で薄く、「丁寧な説明」等＝**リサーチ自身がNGとする抽象形容詞**。
→ **`honban/_preview/TOP_COPY_SPEC.md` の原稿を各セクションに反映**（差別化角度＋GOOD型A〜I適用・確定情報準拠・固有未確定は（仮））。
- 新規セクション追加: コンセプト（看板猫由来）／初めての方へ・初診の流れ／FAQ抜粋。
- 院長あいさつは原体験（確定）を核に厚く。診療案内は各2〜3文＋保険/自費明示。
- 固有数字・経歴・設備・所要時間は**創作禁止**。`services-*.html`・`faq.html`・`dental-anxiety.html` の承認本文を要約移植。

## §4 完了条件

- [ ] `top-nogl.html` / `top-gl.html` 両方が単体で開け、**全画像枠が埋まっている（空枠ゼロ＝実体感）**
- [ ] 両方 noindex＋最上部に「社内プレビュー｜写真はイメージ（仮）」バナー＋各写真に「イメージ」バッジ
- [ ] 院長スロットは顔ニセ実写を「桑田 淳」として出していない（ぼかし/シルエット＋差し替え注記）
- [ ] **公開ファイル（`honban/index.html`・`honban/css/*`・`honban/images/*`・ルート直下）に差分ゼロ**。新規は `honban/_preview/` 配下のみ
- [ ] 生成/コピー画像は `honban/_preview/img/` 配下のみ（公開 `honban/images/` へ書き込まない）
- [ ] 電話番号は 0466-36-8484 のみ
- [ ] 着手前に「読んだ正本・現在地・やること」を3行報告（AGENTS.md 規定）
- [ ] 完了後 push せず、差分一覧を報告（公開判断はオーナー）
