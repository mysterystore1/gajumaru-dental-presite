# HANDOFF — gajumaru-dental-presite（辻堂がじゅまる歯科プレサイト）

> **PC間・セッション間のコンテキスト正本。チャット履歴は引き継がれない。**
> 作業の最後に必ずこのファイルを更新して push すること。
> 作業の最初に必ずこのファイルと `git log -5` を読むこと。

## 概要
- 辻堂がじゅまる歯科 開業前プレサイト（2026年9月開院予定）
- 静的サイト（HTML / CSS / JS、**Node不要**）
- 公開: https://gajumaru-dental.com/ （独自ドメイン・CNAME設定済み）。github.io でも到達可。`main` push で1〜2分後に反映
- 独立リポジトリ（work-root とは別管理）

## 現在地（最終更新: 2026-06-09 / メインPC）
- 最新コミット `db69181`: ヒーロー背景を院内イメージ(`hero-director.png`)に、院長写真を `director-profile.png` に差し替え。`og:image` も更新
- 旧画像 `doctor.png` / `hero-exterior.png` は最適化済みだが現在は未使用
- 2026-06-09: 独自ドメイン `gajumaru-dental.com` を CNAME 設定（GitHub web 経由）。DNS 反映状況は要確認
- 2026-06-09 方針転換(DEC-003): 本番サイトはこのプレサイトリポを育てて作る。Astro版 kuwara-dental-v2(新美クリニック)は退役。URL `gajumaru-dental.com` 維持
- 2026-06-09 SEO・速度改善: JSON-LD(Dentist)/canonical/favicon/OGP絶対URL を追加。hero-director・director-profile を WebP化(4.1MB→259KB、img src のみ変更でCSS不変)。OGP用にPNGは保持
- 2026-06-09 フォーム: formsubmit.co ajax+hash版(774345...)でメール非公開化済み。件名/整形/ハニーポット付き。★残: メールの ACTIVATE FORM クリック(有効化)＋着信テスト(ユーザー作業)

## 次の一手
- フォーム有効化（ユーザー作業）: メールの ACTIVATE FORM をクリック → 公開サイトで再テスト送信 → info@ に届けば完了
- 本番化の第一歩: 追加ページの構成を決める（診療案内 / 医師紹介 / アクセス / 予約 等）。プレサイトのデザイン・トンマナを踏襲

## 注意・前提
- **2台運用の鉄則**: 触る前に `git pull` / 離れる前に `git commit && git push`。同じファイルを両PCで同時に触らない
- `main` への push は即 公開Pages に反映。院長写真など個人情報を含むため push 前に内容確認
- push 時のみ GitHub 認証が必要（ブラウザ認証で可）
- GitHub web UI から直接 push される場合あり（CNAME 等のドメイン操作）。**触る前の `git pull` は必須**

## 動かし方
- プレビュー: `index.html` をブラウザで直接開く（ビルド不要）
- デプロイ: `main` に push → 1〜2分で Pages 反映
