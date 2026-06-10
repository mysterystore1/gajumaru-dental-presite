# HANDOFF — gajumaru-dental-presite（辻堂がじゅまる歯科）

> **PC間・セッション間のコンテキスト正本。チャット履歴は引き継がれない。**
> 作業の最初に必ずこのファイルと `git log -5` を読む。最後に必ず更新して push。

## リポ構造（最重要・2026-06-10 分離 DEC-005）
このリポは**プレサイトと本番の2つ**を持つ:
- **ルート直下 = プレサイト**（公開中・現役）。緑茶の温かみ系デザイン。開業告知＋問い合わせ。`gajumaru-dental.com/` で公開。SEO改善・フォーム稼働済み。**検索インデックス対象**。
- **`honban/` = 本番サイト**（制作中）。青系のクリーンな歯科デザイン・マルチページ。`gajumaru-dental.com/honban/` で見られるが **robots noindex**（検索に出さない）。開業(2026年9月)時にルートへ昇格し、プレサイトを退役する予定。

→ プレサイトと本番は **css/js/images を別々に持つ**（`honban/` 内に独立コピー）。本番の共通部品の正本は `honban/_partials.html`。

## 概要
- 辻堂がじゅまる歯科（2026年9月開院予定）
- 静的サイト（HTML/CSS/JS、**Node不要**）
- 公開: https://gajumaru-dental.com/ （独自ドメイン・CNAME）。`main` push で1〜2分後に反映
- 独立リポジトリ（work-root とは別管理）

## 現在地（最終更新: 2026-06-10）
- 最新 `b6b7125`: 本番(honban)の診療カード文言を一般的な診療説明に修正（ごり押し感を解消）
- `b362482`: プレサイトと本番を分離（DEC-005）。ルート=プレサイト復元(緑茶)、honban=本番(青系)
- `b66d698`: 配色を水色・青系(一般的な歯科の王道)に。※この青系は **honban のみ**（ルートのプレサイトは緑茶のまま）
- 本番(honban)の出来: トップ(index) + dental-anxiety.html 完成。診療カードは一般化済み

## 本番(honban) 進捗・残作業
- 計画: `PLAN.md`（6フェーズ/21タスク）。構成方針: DEC-004(フラットURL+共通部品コピー)、DEC-005(プレサイト/本番分離)
- 完了: フェーズ0-2（基盤・共通化 / トップ発展 / 通院をためらう方へ）+ 配色青系化 + 診療カード文言一般化
- **残: フェーズ3-6** = services / about / facility / pricing / access / faq / news 各ページ + SEO/MEO仕上げ + 横断QA
- 共通部品変更時は `honban/_partials.html` を直してから honban 全ページへ反映（最重要ルール）

## 次の一手（★ユーザー確認待ち）
1. **「通院をためらう方へ」(`honban/dental-anxiety.html`) のトーン**: コンセプトページとして寄り添い表現（「怖い方へ」「痛かったら止めます」）を強めに残してある。**和らげるか / このまま残すか、ユーザー確認待ち**
2. 上記OK後、**フェーズ3（`honban/services.html` ほか残ページ作成）**へ。トーンは「診療カード(一般化済み)」を基準に揃える

## 既知の制約・注意
- 全データ仮: テキスト「（仮）」、NAP固定文字列(医院名/住所/電話/tel:linkの4つ一括置換可)、画像はSVG/CSSプレースホルダー
- 実NAP・院内写真(約2週間後)・EPARK/LINE実URL・JSON-LD telephone は確定後に一括差し替え(誤情報をMEOに出さないため未記載)
- honban の canonical/OGP URL は現在ルート(gajumaru-dental.com/)を指す箇所あり。開業時のルート昇格で一括調整

## 注意・前提（2台運用）
- 触る前に `git pull` / 離れる前に `git commit && git push`。同じファイルを両PCで同時に触らない
- `main` push は即 公開Pages 反映。push 前に内容確認
- push 時のみ GitHub 認証（ブラウザ認証で可）
- GitHub web から直接 push される場合あり(CNAME等)。**触る前の `git pull` 必須**

## 動かし方
- プレビュー: プレサイトは `index.html`、本番は `honban/index.html` をブラウザで直接開く（ビルド不要）
- デプロイ: `main` に push → 1〜2分で Pages 反映
