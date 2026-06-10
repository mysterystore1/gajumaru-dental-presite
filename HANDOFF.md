# HANDOFF — gajumaru-dental-presite（辻堂がじゅまる歯科プレサイト）

> **PC間・セッション間のコンテキスト正本。チャット履歴は引き継がれない。**
> 作業の最後に必ずこのファイルを更新して push すること。
> 作業の最初に必ずこのファイルと `git log -5` を読むこと。

## 概要
- 辻堂がじゅまる歯科 開業前プレサイト（2026年9月開院予定）
- 静的サイト（HTML / CSS / JS、**Node不要**）
- 公開: https://gajumaru-dental.com/ （独自ドメイン・CNAME設定済み）。github.io でも到達可。`main` push で1〜2分後に反映
- 独立リポジトリ（work-root とは別管理）

## 現在地（最終更新: 2026-06-10 / 本番マルチページ化フェーズ0-2 完了）
- 最新コミット `95d0a81`: 本番マルチページ化フェーズ0-2（基盤・共通化＋トップ発展＋ためらう方へ）。詳細は下記「本番マルチページ化 進捗」
- 過去 `db69181`: ヒーロー背景を院内イメージ(`hero-director.png`)に、院長写真を `director-profile.png` に差し替え。`og:image` も更新
- 旧画像 `doctor.png` / `hero-exterior.png` は最適化済みだが現在は未使用
- 2026-06-09: 独自ドメイン `gajumaru-dental.com` を CNAME 設定（GitHub web 経由）。DNS 反映状況は要確認
- 2026-06-09 方針転換(DEC-003): 本番サイトはこのプレサイトリポを育てて作る。Astro版 kuwara-dental-v2(新美クリニック)は退役。URL `gajumaru-dental.com` 維持
- 2026-06-09 SEO・速度改善: JSON-LD(Dentist)/canonical/favicon/OGP絶対URL を追加。hero-director・director-profile を WebP化(4.1MB→259KB、img src のみ変更でCSS不変)。OGP用にPNGは保持
- 2026-06-10 フォーム本番稼働: formsubmit.co ajax+hash版(774345...)。ACTIVATE済・テスト送信が info@ 着信確認。件名/整形/ハニーポット/メール非公開 すべて正常

## 本番マルチページ化 進捗（2026-06-10）
- 計画: `PLAN.md`（21タスク/6フェーズ）。構成方針: `DECISIONS.md` の DEC-004（フラットURL + 共通部品コピー方式）
- **フェーズ0-2 完了・push済**（`95d0a81`）。Pages 反映済み想定。ユーザー方向確認待ちのチェックポイント
  - Task1: `_partials.html`（共通部品SSOT）/ `PAGE_TEMPLATE.html`（雛形）作成。9ページ・フラットURL（dental-anxiety.html 等）
  - Task2: 予約導線 `.reserve`（EPARK/LINE=data-todo / 電話 / フォーム）。css 追加
  - Task3: `IMAGE_TODO.md`（画像差し替え台帳・全15枠）
  - Task4-6: `index.html` をマルチページ対応（ナビ9項目化）。ためらう方へ誘導バナー / 5診療カード / お知らせ抜粋 / 予約導線 を追加
  - Task7-8: `dental-anxiety.html` 新規（最重要）。文言正本「歯医者が怖い方へ」を辻堂ローカライズ実装。JSON-LD(MedicalWebPage)
- **残: フェーズ3-6（Task9-21）**= services / about / facility / pricing / access / faq / news 各ページ + SEO/MEO仕上げ + 横断QA + ドキュメント更新
- 共通部品変更時は `_partials.html` を直してから全ページ反映（最重要ルール）

## 既知の制約・注意（本番化）
- 全データ仮: テキスト「（仮）」、NAP固定文字列（医院名/住所/電話/tel:link の4つを一括置換可）、画像はSVG/CSSプレースホルダー
- 実NAP・院内写真（約2週間後）・EPARK/LINE実URL・JSON-LD telephone は確定後に一括差し替え（誤情報をMEOに出さないため未記載）
- preview MCP sandbox は IntersectionObserver(fade-in)発火・screenshot・外部Maps/fonts が不可（環境制約）。検証は HTTP 200 + computed style + DOM で実施。fade-in は本番ブラウザで動作（main.js 不変・index.html と同一機構）

## 次の一手
- ユーザーがフェーズ0-2の方向OK → フェーズ3（Task9-10: services.html）から再開。NG → 該当ページを修正

## 注意・前提
- **2台運用の鉄則**: 触る前に `git pull` / 離れる前に `git commit && git push`。同じファイルを両PCで同時に触らない
- `main` への push は即 公開Pages に反映。院長写真など個人情報を含むため push 前に内容確認
- push 時のみ GitHub 認証が必要（ブラウザ認証で可）
- GitHub web UI から直接 push される場合あり（CNAME 等のドメイン操作）。**触る前の `git pull` は必須**

## 動かし方
- プレビュー: `index.html` をブラウザで直接開く（ビルド不要）
- デプロイ: `main` に push → 1〜2分で Pages 反映
