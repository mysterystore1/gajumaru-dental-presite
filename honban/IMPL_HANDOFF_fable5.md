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

## 要判断（実装前に Opus / オーナーに一言確認）

- **ふきだし化**（部品6・dental-anxietyの内心セリフ）：「箱で囲わない」方針の境界。"発話の記号"ならアリだが、実装前に確認。
- **CTA帯リッチ化**（仕上げ）：方向は良い。ただし**電話番号の大型化は実NAP確定後**。枠だけ先行は可。
- **「がじゅまる＝家族を守る木」の由来をサイトに明記**（Top5の5番）：広告ガイドライン非抵触の差別化資産。文言は院長の言葉が理想→取材待ちか、（仮）で先行か要判断。

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
