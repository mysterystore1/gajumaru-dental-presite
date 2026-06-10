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
