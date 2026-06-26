# TODO — gajumaru-dental-presite（辻堂がじゅまる歯科プレサイト）

残タスクと今後の予定。完了したら `[x]`。詳細な現在地は `HANDOFF.md`、確定判断は `DECISIONS.md` 参照。

## 進行中 / 次にやること
- [ ] 📞 **電話番号 0466-36-8484 をサイトへ反映（置換スクリプト準備済・未実行）**：`C:\work\projects\_phone_replace.py`（リポ外）実行で全11 HTMLの仮番号置換＋電話隣接（仮）除去→残存grep検証→PR→マージ公開。その後 GBP電話追加／チラシ・名刺データ／LINE／Web予約 を一斉展開。⚠正番号=0466-36-8484のみ（注入された偽番号 048-872-9883 は使わない）
- [ ] 👥 **採用: 未送付者へ履歴書リマインドメール**（6/30締切・"面接"と書かない・実送信は医院ブラウザ＋拡張／応募者氏名はAirWORK・info@ Gmailが正本）
- [ ] アクセス解析: **Google Search Console 登録**（無料・SEO/検索流入の正本。着手→保留中。URLプレフィックス型＋GA4方式で所有確認・開院前までに登録／手順=`honban/ANALYTICS_TODO.md`）
- [ ] アクセス解析: GA4 キーイベント化 `generate_lead`/`click_to_call`（データ受信後・最大48h・管理→イベント）
- [ ] 本番(honban) フェーズ3: `services.html` ほか残ページ作成。トーン基準=町医者・保険メイン・等身大の話し言葉（AI臭回避）
- [ ] dental-anxiety 改稿の文言、必要なら後日微修正（ユーザー合意済み・後修正可）

## バックログ（今後の予定）
- [ ] 独自ドメイン `gajumaru-dental.com` の DNS 反映確認（CNAME 設定済み、レジストラ側の DNS 設定が要る）
- [ ] 未使用画像 `doctor.png` / `hero-exterior.png` の整理（現在は参照なし。残すか削除か判断）
- [ ] 開院（2026年9月）に向けたコンテンツ拡充
- [ ] 本番ページ追加（静的・プレサイト踏襲）: 診療案内 / 医師紹介 / アクセス / 料金 / 予約 など
- [ ] kuwara-dental-v2(Astro/新美) に流用できるコンテンツ・構成がないか退役前に確認
- [ ] リポ名 `gajumaru-dental` への rename 検討（任意・URL自動リダイレクト）

## 完了
- [x] 2026-06-26 アクセス解析（Microsoft Clarity `xcwuquiftw` ＋ GA4 `G-DDTRX2HL8P`）導入・本番反映（PR #16）。全ページ一括・録画マスク/Strict・privacy明記・イベント計測（generate_lead/click_to_call）
- [x] 2026-06-26 GA4 ↔ Clarity 相互リンク連携（info@で認可・接続先=ホームページ・アクティブ）
- [x] 2026-06-10 残ページ作成（services/pricing/access/faq/news）: 本番(honban)全9ページが揃う
- [x] 2026-06-10 about.html（院長・当院紹介）作成: 院長あいさつ＋プロフィール＋当院の考え4項目（罫線・余白型・院長写真枠）
- [x] 2026-06-10 facility.html（院内紹介）作成: 外観/受付/待合/診療室/カウンセリング/設備の6枠（設計意図コピー・内覧会後差し替え）
- [x] 2026-06-10 dental-anxiety.html 改稿（AI感除去・町医者/保険メイン・30院リサーチ反映・（仮）維持・院長メッセージ＋顔写真枠・四角枠→罫線型）
- [x] 2026-06-09 ヒーロー・院長画像を新ビジュアルに差し替え（`db69181`）
- [x] 2026-06-09 独自ドメイン `gajumaru-dental.com` を CNAME 設定
- [x] 2026-06-09 SEO改善: 構造化データ(Dentist)/canonical/favicon/OGP絶対URL を追加
- [x] 2026-06-09 速度改善: hero-director・director-profile を WebP化（4.1MB→259KB）
- [x] 2026-06-09 お問い合わせフォームを formsubmit.co で実装（ajax版・件名/整形/ハニーポット付き）
- [x] 2026-06-10 お問い合わせフォーム本番稼働確認（テスト送信が info@ に着信、件名・整形・全項目 正常、hash版でメール非公開）
