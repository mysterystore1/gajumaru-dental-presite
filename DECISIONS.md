# DECISIONS — gajumaru-dental-presite

確定した判断のみ記録。形式: `[DEC-XXX]` Date / Decision / Reason / Impact。
却下案・保留も残す（後で「なぜそうしたか」を思い出せるように）。

## [DEC-001] 独自ドメイン gajumaru-dental.com 採用
- Date: 2026-06-09
- Decision: 公開を `github.io` から独自ドメイン `gajumaru-dental.com` に切り替え（CNAME 設定）
- Reason: 本番ブランディング（※詳細な理由があれば追記）
- Impact: 公開URLが変更。ドメインレジストラ側の DNS 設定（A レコード/CNAME を GitHub Pages へ向ける）が別途必要。OGP/canonical の絶対URL確認要

## [DEC-002] 静的サイト構成を維持（ビルドツール非採用）
- Date: 2026-06-09
- Decision: プレサイトは素の HTML/CSS/JS のまま運用（Astro 等は本番 kuwara-dental-v2 のみ）
- Reason: プレサイトは小規模・短命。ビルド不要で誰でも `index.html` を開けば編集・確認できる
- Impact: Node 不要。GitHub Pages へ push するだけでデプロイ完了

## [DEC-003] 本番サイトはプレサイトを育てる方式に（Astro版 kuwara-dental-v2 は退役）
- Date: 2026-06-09
- Decision: 辻堂がじゅまる歯科の本番サイトを、別の Astro 実装（kuwara-dental-v2 / 新美クリニック流用）で作るのをやめ、このプレサイトリポ（gajumaru-dental-presite）のデザイン・トンマナをベースに、同リポをページ追加して本番へ育てる
- Reason: 公開URL `gajumaru-dental.com`（CNAME設定済み）をそのまま使いたい。プレサイトのデザインが良く流用したい。リポ統合で管理がシンプル（ドメイン移行・新規セットアップ不要）
- Impact: kuwara-dental-v2（Astro/18ページ・新美クリニック）は退役（参照用に残す）。本番も静的 HTML/CSS/JS で構築。リポ名は `-presite` のままだが公開URLとは無関係（必要なら `gajumaru-dental` に rename 可、URLは自動リダイレクト）

## [DEC-004] 本番マルチページ化の構成（フラットURL + 共通部品コピー方式）
- Date: 2026-06-10
- Decision: 1ページ構成のプレサイトを9ページ前後のマルチページ本番サイトへ拡張する。(1) URL構成は**ルート直下フラット**（`dental-anxiety.html` / `services.html` 等。サブディレクトリ非採用）。(2) ヘッダー/フッター/モバイルバーの共通部品は Node無しのため**各ページにコピー複製**し、`_partials.html`（SSOTメモ）を正本として変更時は全ページへ手動反映。(3) 全データ仮で骨組み構築 → 実データ後日差し替え（仮テキストは「（仮）」明示、NAPは一括置換可能な固定文字列、仮画像はSVGプレースホルダー + `IMAGE_TODO.md` 台帳運用）。(4) 文言トーンは `c:\work\tasks\codex-dental-copy-audit.md` を正本とし、地名は辻堂にローカライズ。
- Reason: 静的維持(DEC-002)のままMEO/SEOを強化したい。フラットURLは相対パスが単純でURLが短くMEO有利。共通部品コピーは `file://` 直開きでも崩れずデプロイ依存ゼロ（JS fetch注入案はCORS/ちらつき/MEO不利で不採用、ビルド導入案はDEC-002違反で不採用）。
- Impact: ページ追加ごとに共通部品の同期が必要（変更時は `_partials.html` 起点で全ページ反映をルール化）。実NAP・院内写真・EPARK/LINE実URL・JSON-LD telephone は確定後に一括差し替え（誤情報をMEOに出さないため確定まで未記載）。
- 却下案: サブディレクトリ構成 / JS fetch によるインクルード / ビルドツール導入（Astro等）

## [DEC-005] プレサイトと本番をサブディレクトリ分離（メイン=プレサイト維持）
- Date: 2026-06-10
- Decision: DEC-003（プレサイトを育てる）を見直し。開業（2026年9月）までルート `gajumaru-dental.com` は**プレサイト**を維持し、**本番は `/honban/` サブディレクトリ**で制作する。本番完成・開業時にルートへ昇格し、プレサイトを退役する。
- Reason: 本番制作物が公開中プレサイトに混在するのを避けたい。開業前はプレサイトを公開し、本番はステージング的に別パスで作る（開業前の定石）。サブドメインでなくサブディレクトリ採用＝DNS不要・同一リポ・git 管理一本で簡単。
- Impact: ルート=プレサイト（緑茶・本番化前に復元）、`/honban/`=本番（青系マルチページ）。本番は制作中につき robots `noindex` を付与し SEO はプレサイトのみ対象（重複・未完成のインデックス回避）。canonical/OGP の URL は開業時のルート昇格で一括調整。
- 却下案: サブドメイン（別リポ+DNS で手間） / 本番をメインに（開業前の集患対象はプレサイト）

## [DEC-006] 開業時の本番昇格手順（/honban/ → ルート）
- Date: 2026-06-10
- Decision: 開業（2026年9月予定）時、本番（honban/）をルートへ昇格しプレサイトを退役。手順: (1) honban/ 直下の全ファイルをルートへ移動（git mv）、プレサイト同名(index.html/css/js/images)は上書き=退役(git履歴に残る) (2) 全ページの robots noindex meta を削除(検索解禁) (3) canonical/og:url の /honban/ を除去しルートURLに統一 (4) 内部リンクは相対パスのまま(honban内完結でルートでも有効) (5) honban/ 消滅、gajumaru-dental.com/ が本番に
- Reason: DEC-005のサブディレクトリ分離はこの昇格を前提とした設計。サブディレクトリなのでDNS変更不要・フォルダ移動だけで完結
- Impact: 旧 /honban/ は noindex で検索未登録=リダイレクト不要・SEOロスなし。プレサイトはgit履歴に保全。CNAME(ルート)不変。昇格前に実データ(NAP/料金/実写真)差し替えを完了しておくこと
