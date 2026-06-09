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
