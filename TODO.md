# TODO — gajumaru-dental-presite（辻堂がじゅまる歯科プレサイト）

残タスクと今後の予定。完了したら `[x]`。詳細な現在地は `HANDOFF.md`、確定判断は `DECISIONS.md` 参照。

## 進行中 / 次にやること
- [ ] お問い合わせフォーム有効化: formsubmit.co で実装済み → 公開後にテスト送信して info@ の確認メールを承認。有効化後、hash版エンドポイントへ差し替えてメール非公開化
- [ ] 本番サイト化（DEC-003）: 追加ページの構成を決める（プレサイトのデザイン・トンマナを踏襲）

## バックログ（今後の予定）
- [ ] 独自ドメイン `gajumaru-dental.com` の DNS 反映確認（CNAME 設定済み、レジストラ側の DNS 設定が要る）
- [ ] 未使用画像 `doctor.png` / `hero-exterior.png` の整理（現在は参照なし。残すか削除か判断）
- [ ] 開院（2026年9月）に向けたコンテンツ拡充
- [ ] 本番ページ追加（静的・プレサイト踏襲）: 診療案内 / 医師紹介 / アクセス / 料金 / 予約 など
- [ ] kuwara-dental-v2(Astro/新美) に流用できるコンテンツ・構成がないか退役前に確認
- [ ] リポ名 `gajumaru-dental` への rename 検討（任意・URL自動リダイレクト）

## 完了
- [x] 2026-06-09 ヒーロー・院長画像を新ビジュアルに差し替え（`db69181`）
- [x] 2026-06-09 独自ドメイン `gajumaru-dental.com` を CNAME 設定
- [x] 2026-06-09 SEO改善: 構造化データ(Dentist)/canonical/favicon/OGP絶対URL を追加
- [x] 2026-06-09 速度改善: hero-director・director-profile を WebP化（4.1MB→259KB）
- [x] 2026-06-09 お問い合わせフォームを formsubmit.co で実装（ajax版・件名/整形/ハニーポット付き、要有効化）
