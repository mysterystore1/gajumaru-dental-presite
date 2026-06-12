# IMPLEMENTATION HANDOFF: honban 改善実装（Fable5 実装担当向け）

> Fable5 の独立レビュー（[REVIEW_RESULT_fable5.md](REVIEW_RESULT_fable5.md) / 依頼書 [REVIEW_HANDOFF_fable5.md](REVIEW_HANDOFF_fable5.md)）を、
> 別セッションの Opus が **実コードで検証・統合した実装指示**。レビュー本文のコード例はそちらを参照。
> 本書は「やる順番・**Opusが確認した正確な行番号**・方針制約・進め方」を確定する。

## 0. 大前提（厳守）

- **触る前に `git pull --ff-only origin main`／離れる前に `commit && push`**。main push は1〜2分で本番反映＝push前に内容確認。
- **1タスク＝1コミット**（`type(scope): 要約` 日本語）。まとめて大改修しない。**最小差分**。
- **各変更後に実機確認**：preview もしくは headless Chrome。CSSが古く見えたら Ctrl+Shift+R。
- **方針の絶対制約**（破ったら差し戻し）:
  - 世界観 **暖色×木（ガジュマル）**。青・海系は不可（同町競合と被る）。色提案はテラコッタ域内。
  - 情報は **罫線＋余白**で区切る。**情報ブロックを箱（背景＋影＋border＋角丸カード）で囲わない**。※写真の器・セクション境界は例外。
  - 実写真・実NAP・院長の言葉は**未確定の（仮）**。プレースホルダの"中身"は変えない。見せ方だけ。
  - **医療広告ガイドライン**：症例・ビフォーアフター・患者の声・体験談・実績数値の捏造は不可。
  - **フレームワーク/ビルドツールを入れない**（素のHTML/CSS/JS）。
- **引き算のパス（最重要）**：Fable5自身の警告どおり「1セクションに英字敷き＋波＋ドット＋バッジを同居させない」。装飾を入れたら必ず1周して2つ削る。**1セクション1あしらい**。
- **各Phase完了ごとに push → Opus セッションに「Phase N 完了・何をやったか」を報告 → Opus がレビュー（受領側検証）→ 次Phase**。勝手に最後まで突っ走らない。

---

## Phase 1 — バグ修正（最優先・**全てOpusが実コードで確認済み**・行番号確定）

| # | 対象 | 確認済みの現状 | 直し方 |
|---|---|---|---|
| 1a | `css/style.css:654-655` | hero overlay が `rgba(30,40,35,…)`＝**緑がかった冷色** | 暖色の焦げ茶 `rgba(46,32,22,…)` へ。方向性グラデ化（REVIEW §H-6 のコード） |
| 1b | `css/style.css:787` | `.open-house__row` border が `rgba(107,158,125,.2)`＝**緑残骸** | `var(--color-border)` 系へ（※`.open-house` 自体がdead CSSの可能性→1eと合わせ判断） |
| 1c | `css/style.css:1178` | フォーム focus の box-shadow が `rgba(107,158,125,.15)`＝**緑残骸** | `rgba(197,106,56,.16)`（terracotta）へ。border-color も `var(--color-primary)` |
| 1d | `css/style.css:147` 付近 `.section__title` | **font-family 未指定＝Noto Sansになっている**（Zen Maru未適用）★テンプレ臭の主因 | `font-family: var(--font-display)` ＋ `font-feature-settings:"palt"` ＋ `letter-spacing:.06em` |
| 1e | `css/style.css` 末尾 | **`prefers-reduced-motion` が0件** | REVIEW §M-1 のブロックを追加（scroll-behavior と全transition/animationを無効化） |
| 1f | `index.html:198` | `.carousel__dots` に `aria-hidden="true"`＝中のbuttonがWCAG違反 | `aria-hidden` 除去＋ `role="group" aria-label="スライド選択"`。dotのaria-labelは既存 |
| 1g | 予約セクション「WEB予約（準備中）」 | `pointer-events:none` の `<a>` は**Tabで止まる/Enterでページ先頭へ飛ぶ** | `<a>`→`<span aria-disabled="true">` 化（or `<button disabled>`）。`_partials.html` を直して全ページ反映 |
| 1h | モバイル `.floating-actions` | `.mobile-bar`（固定フッター）と座標が重なり**TOPボタンがCTAに被る** | `@media(max-width:767px)` で `bottom: calc(64px + env(safe-area-inset-bottom) + 10px)`（REVIEW §H-3） |
| 1i | 全ページ `og:image` | `images/hero-director.png` が**2.3MB**・honban外パス | 1200×630の軽量jpg（<300KB）を `images/og-image.jpg` に書き出し、全ページの `og:image` を差替。※実写確定までは現ヒーローから書き出した仮版でよい |

> 1b/1e（dead CSS）：`.open-house` 系・LINE残骸など未使用CSSが約80行あるとの指摘（REVIEW Low）。**削除は"未使用と確認できたものだけ"**。grepで参照ゼロを確認してから。不安なら残す。

---

## Phase 2 — 視覚クオリティ底上げ（低工数・高効果・方針整合）

REVIEWの「CSS技法集 §4」「装飾キット部品1-3」が該当。**各部品のコード例はREVIEW_RESULT参照**。

| # | 施策 | 参照 | 注意 |
|---|---|---|---|
| 2a | `clamp()` 流体タイポ＋寸法トークン（`:root` に `--fs-*`,`--space-section`） | §4-2 | 既存の2段ブレークポイントを置換 |
| 2b | **見出し eyebrow（英字を薄く敷く）** `data-en` 属性＋`::before` | 部品1 / レシピ1 | 全 `.section__title`。バイリンガルnavと意匠を揃える |
| 2c | **トップ診療カードに `svc-*.svg` アイコン＋hover** | §H-1（最弱セクション） | svcアイコンは既存（services.htmlで使用中）。`index.html` の `.service-card` に追加 |
| 2d | ヒーロー：コピー主役化＋折返し修正（`word-break:auto-phrase`/`text-wrap:balance`） | §M-5 | 暖色オーバーレイ(1a)と連動。開院日付は eyebrow 扱いへ。**コピーは（仮）の範囲で** |
| 2e | **写真のアーチ窓＋ずらし罫線枠**（院長写真 greeting/doctor-message/about） | 部品2 / レシピ2 | **ブロブ型は不採用**（Fable5が後で「事故りやすい・アーチ推奨」と自己修正済）。アーチのみ |
| 2f | **section divider（浅い波SVG）** 白→altの境界のみ | 部品3 / レシピ3 | 浅く(20〜44px)。**全境界に入れない**。fillは次セクション背景色 |
| 2g | fade-in の stagger（`--i` 遅延） | §4-7 | 控えめ（90ms刻み程度） |
| 2h | マーカー風アンダーライン | §4-6 | dental-anxiety のキーワード**少数**のみ |

> 2の中でも投資対効果順は **2b → 2f → 2e → 2c → 2d**（REVIEW Top5準拠）。1つ入れるごとに実機確認。

---

## Phase 3 — 文言（取材不要分のみ）

| # | 対象 | 直し方 |
|---|---|---|
| 3a | `services.html:176, :208` | **SEOキーワード文中挿入を撤去**（「辻堂で〜お探しの方に/は」）。before/after は §M-6。地名はtitle/meta/見出しに既出 |
| 3b | トップ features・院長挨拶の常套句（§M-7） | 「環境を整えています」等の空句を**構造だけ具体形に＋（※確定後差替）でTODO化**。挨拶第1段落の経歴定型は「なぜ辻堂か／なぜガジュマルか」1点に絞る案（取材項目→INTERVIEW_GUIDE.md追記） |
| 3c | `js/main.js` EN副ラベル（§M-8） | `Medical`→`Services`、`Anxiety`→`First Step` 等、和製英語/不自然を修正 |

---

## Phase 4 — 受領検証後の次フェーズ（Opus検証済み・優先順）

> **Phase 1〜3 は受領側検証（実コード＋本番実機）で差し戻しゼロ・承認済み**（緑残骸0/箱化なし/青混入0/折返し正常）。
> 実装側の自律判断（キッズ例文不採用・ずらしを罫線枠に・「かかりつけ」採用）も妥当と確認。以下、次の優先順。

### 4-1. H-2 no-js / IntersectionObserver失効フォールバック（**実害・最優先**）
- 問題（実装側が発見）：長寿命タブでIOが失効し fade-in 停止／JS無効・失敗時は `.fade-in{opacity:0}` のまま**本文が永久に不可視**。SEOクローラのレンダ失敗時も本文消失リスク。
- 方針:
  - `<html class="no-js">` ＋ `<head>` 先頭の即時 `<script>` で `documentElement.className='js'` に置換。
  - CSS反転：初期非表示を **`.js .fade-in` に限定**。`.no-js .fade-in`（JS無効/失敗）は**常時表示**。
  - IO失効対策：表示したら `observer.unobserve(el)`（表示済みは失効の影響を受けない）。加えて `visibilitychange`（タブ復帰）で未表示要素を再チェック、または「一定数以上 hidden が残れば全表示」のフォールバック。**過剰実装はしない**。
  - 検証：DevToolsでJS無効化→全9ページの本文が見えること。
- 影響：`css/style.css` の `.fade-in` 系、全HTMLの `<html>` タグ（`_partials.html` 起点）、`main.js`。

### 4-2. JSON-LD の `image` を og-image.jpg に統一
- `index.html`（JSON-LDのある全ページ）の `"image"` を `https://gajumaru-dental.com/honban/images/og-image.jpg`（og:imageと同一）に。実写確定で一括差替前提。

### 4-3. ヒーロー白文字の視認性（軽微）
- 実機でコピーが明るい背景写真にやや溶けかけ。`.hero__overlay` の暖色グラデを下端+5〜10%濃く、or `.hero__title` 系に `text-shadow:0 1px 12px rgba(46,32,22,.35)`。**やりすぎない**。実写差替時に再確認。

### 4-4. オーナー確認済み・実装GO（確定仕様・2026-06-12）

**4-4a. 「がじゅまる」由来セクション（新規）**
- 配置：トップ `index.html` の「ごあいさつ」直後に新セクション。`about.html` 冒頭にも同セクション（同一文言・同じ見せ方）。
- 見せ方：**罫線＋余白型（箱化しない）**。eyebrow `data-en="Our Name"`、葉モチーフ1個まで、`section--alt`（生成り）背景可。
- 確定文言（**院長の実際の言葉で後差替の（仮）**。一字一句この通り）:
  - 見出し：`「がじゅまる」という名前のこと`
  - 本文（2段落）:
    > ガジュマルは、沖縄などで大きな木陰をつくる木です。太い根を地面にしっかり張って、何十年も同じ場所に立ち続けます。その木陰は、近所の人がひと休みしたり、子どもが遊んだりする場所になります。
    >
    > 私も、辻堂にそんなふうに根を張りたいと思っています。子どもからお年寄りまで、家族みんなが気軽に立ち寄れる歯医者に。そう思って、この名前をつけました。（仮）

**4-4b. ふきだし化（dental-anxiety の共感セクション1箇所のみ）**
- 対象：dental-anxiety の内心セリフ群（共感セクション。該当クラスをHTMLで確認して特定）。
- 見せ方：**罫線の吹き出し**（白背景・1.5px罫線・しっぽ付き／REVIEW_RESULT 部品6のCSS）。**箱塗りしない＝発話の記号**。控えめ。**他セクションへ展開しない**（1箇所限定）。

**4-4c. CTA帯リッチ化（`_partials.html` の reserve・全ページ共通）**
- 構成：上端に波divider → 見出し「ご予約・お問い合わせ」→ リード「相談だけでも大丈夫です。」→ 電話（仮番号＋受付時間）→ 既存ボタン群（電話/WEB予約準備中/フォーム）。
- 制約：**マスコット無し**（画像生成保留）。**電話番号の大型化は実NAP確定後**＝今は控えめ＋（仮）明示。葉モチーフ1個まで。**箱を乱立させない**（帯は背景色＋余白で。引き算：波＋葉＋ボタンで十分、ドット背景等は足さない）。

> 進め方：**4-1 → 4-2 → 4-3 → 4-4a → 4-4b → 4-4c** の順、1コミットずつ・実機確認。Phase完了で push → Opus へ報告 → 受領検証。

---

## 要判断 → すべて 4-4 で確定（オーナーGO・2026-06-12）

3件（ふきだし化／CTA帯リッチ化／がじゅまる由来）はオーナー承認済み。仕様・確定文言は **Phase 4-4** を参照。

## 保留（今はやらない）

- **マスコット／スポットイラスト**（部品7／レシピ8）：**画像生成は当面やらない方針**と衝突 → 保留。
- **ブロブ型写真マスク**：不採用（アーチ採用）。
- **プライバシーポリシーページ**：開院時必須。今は枠 or 後日。
- formsubmit.co 移行・予約システム：開院時に別途。

---

## 検証とコミット

- 各変更後：preview/headless で該当ページを確認（崩れ・コンソールエラー・モバイル幅）。
- コミット粒度：上表の1行＝1コミット目安。例 `fix(honban): フォームfocusの緑残骸をテラコッタに（DEC不要）`。
- **Phase完了ごとに push → Opusに報告**。Opusが受領側レビュー（鵜呑みにせず検証）→ 次Phaseへ。
- 触る前 `git pull`（Opus側もこのリポを触る可能性）。

---

*作成: 2026-06-12 / 実装担当: Fable5（別セッション）/ 統合・検証: Opus セッション。レビュー本文=REVIEW_RESULT_fable5.md*
