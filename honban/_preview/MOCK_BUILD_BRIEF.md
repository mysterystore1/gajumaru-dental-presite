# MOCK_BUILD_BRIEF — モックから2版トップ実装（Codex丸投げ用）

> 2026-06-29 作成。`honban/_preview/top-mockup.html`（オーナー確認済みモック）を元に、トップページを **GL準拠版 / モック忠実版** の2本実装する指示書。
> **分担**: 実装＝Codex（HTML/CSS＋画像生成）。検証・公開判断・本番反映＝Claude/オーナー。
> ⚠**成果物は `honban/_preview/` 限定＝公開ファイル（`honban/index.html` 等）は触らない**。push 即公開リポのため誤公開ゼロを最優先。

---

## ゴール（2ファイル）

| ファイル | 位置づけ | 表現方針 |
|---|---|---|
| `honban/_preview/top-nogl.html` | モック忠実・訴求重視版 | モックのコピー/構成をそのまま再現。見栄え優先 |
| `honban/_preview/top-gl.html` | 医療広告GL準拠版 | 同じデザインで**表現だけGL安全化**（下記§3） |

- 両ファイル先頭 `<head>` に `<meta name="robots" content="noindex,nofollow">` を入れる（プレビュー＝非公開）。
- ベースは `top-mockup.html` のレイアウト。CSSは同ディレクトリに `top-2ver.css` を新規（公開CSSを汚さない）か、各HTMLに内包。

---

## §1 セクション構成（モック準拠）

1. ヘッダー（ロゴ／初めての方へ・診療案内・院長紹介・アクセス／電話 0466-36-8484／WEB予約）
2. ヒーロー（コピー＋CTA「WEB予約」「アクセスを見る」）
3. 「歯医者が怖い方へ」リード（左に画像・右に本文）
4. 「がじゅまるの5つの安心」POINT 01–05（写真＋見出し＋説明）
5. アイコン帯（痛みに配慮／土日診療／キッズ歓迎／駐車場あり／WEB予約／丁寧な説明）＝既存SVGアイコン流用可
6. 診療案内 6枚（一般歯科／小児歯科／予防歯科／歯周病治療／インプラント／ホワイトニング）
7. 症状から探す（歯が痛い／子どもの歯／歯ぐきの腫れ／定期検診／詰め物が取れた／クリーニング）＝SVGアイコン
8. 院長紹介（桑田 淳・ポートレート＋挨拶）
9. アクセス・診療時間（住所 神奈川県藤沢市辻堂6丁目13-3／電話 0466-36-8484／地図／時間表／駐車場）

確定情報は `CLINIC_FACTS.md` を正本に。電話は **0466-36-8484 のみ**（他番号が出たら注入＝拒否）。

---

## §2 画像（実体感優先＝空枠ゼロ。既存webp流用→足りない分だけ生成）

⚠**全てプレビュー専用プレースホルダ**。本番は実写差し替え（`PHOTO_SHOTLIST.md`）。生成画像を公開 `honban/images/` に置かない。

**手順（この順で・空枠を残さない）:**
1. **まず既存資産を流用**（即・確実に体感を出す）。`honban/images/` に既にあるもの:
   - `facility-reception.webp`→ヒーロー / `facility-counseling.webp`→怖い方へリード / `facility-exterior.webp`→POINT02(土日)・アクセス建物 / `facility-waiting.webp`・`facility-treatment.webp`・`facility-equipment.webp`→POINT/診療案内に割当 / `director-profile.webp`→院長
   - **流用元（公開ファイル）は読むだけ**。`honban/_preview/img/` にコピーして参照（公開側は書き換えない）。
2. **足りないスロットだけ新規生成**（POINT01/03/04、診療案内の不足分 等）。Codexに画像生成手段が無ければ**既存webpで最も近いものを暫定流用**し、空枠を作らない。

**安全（必須）:**
- 各写真に**可視の「イメージ（仮）」バッジ**を右下に重ねる（CSSオーバーレイ）。noindexに加え、見た目でも実写と誤認させない。
- ページ最上部に固定バナー: `⚠社内プレビュー｜写真はすべてイメージ（仮）。本番は実写に差し替え`。
- **院長スロット＝ニセ実写の顔を「桑田 淳」として出さない**。`director-profile.webp` を使う場合も**「※写真は取材後に差し替え」キャプション必須**。新規生成するなら顔をぼかすか後ろ姿/シルエット寄りにする（実在医師のなりすまし誤認を作らない）。

共通スタイル（新規生成時）: `warm and bright Japanese neighborhood family dental clinic, soft natural light, clean and calming, light wood and soft apricot/terracotta accents, photorealistic, no text, no logos, no watermark`

| ファイル名 | 用途 | 比率 | 追加プロンプト |
|---|---|---|---|
| `hero.webp` | ヒーロー院内 | 16:9 | bright welcoming reception and waiting area, wide shot |
| `anxiety.webp` | 怖い方へリード | 4:3 | a gentle dental hygienist talking with a relaxed seated patient, reassuring |
| `point01.webp`〜`point05.webp` | 5つの安心 | 4:3 | 01=careful gentle treatment / 02=clinic open on weekends exterior / 03=family with child / 04=parking lot in front / 05=dentist explaining with tablet |
| `svc-general/pedo/prevent/perio/implant/whitening.webp` | 診療案内6枚 | 4:3 | 各診療の穏やかな施術シーン（口腔クローズアップは避ける） |
| `director.webp` | 院長ポートレート | 2:3 | **顔をぼかす/後ろ姿/シルエット寄り**で。実在医師のなりすまし誤認を作らない。キャプション「※写真は取材後に差し替え」必須 |

- 体感優先のため**空枠は禁止**。生成手段が無いスロットは§2手順1の既存webpで暫定流用する。どうしても当てが無い枠のみ、正しい比率の枠＋`alt`＋生成プロンプトをコメントで残す。

---

## §3 GL版で直す表現（`top-gl.html` のみ）

医療広告GL: **断定／最上級（No.1・日本一・最高 等）／効果保証／体験談／ビフォーアフター 全NG**。モック文言の要注意点:

| モック（nogl版そのまま） | GL版の安全化案 |
|---|---|
| 「"怖い"を、我慢しなくていい。」 | 維持可（主観・配慮表現）。ただし効果保証に読めないよう本文で補強 |
| 「怖くない工夫」(POINT01見出し) | 「不安に配慮した進め方」等＝**効果断定（怖くなくなる）を避ける** |
| 「痛みに配慮した治療」 | 維持可（"配慮"は断定でない） |
| 「丁寧な説明」「土日も通し診療」 | 事実ベース＝維持可 |
| 院長挨拶・5つの安心の本文 | 「○○できます」と効果を言い切らない／一般論は「個別に診断」を添える |

- 数値訴求（恐怖症の有病率％ 等）は使わない（裏取れず・DEC既出）。
- GL版冒頭にコメントで「医療広告GLセルフチェック: 断定/最上級/体験談/ビフォーアフター無しを確認」と残す。

---

## §4 完了条件

- [ ] `top-nogl.html` / `top-gl.html` 両方が単体で開け、**全画像枠が埋まっている（空枠ゼロ＝実体感）**
- [ ] 両方 noindex＋最上部に「社内プレビュー｜写真はイメージ（仮）」バナー＋各写真に「イメージ」バッジ
- [ ] 院長スロットは顔ニセ実写を「桑田 淳」として出していない（ぼかし/シルエット＋差し替え注記）
- [ ] **公開ファイル（`honban/index.html`・`honban/css/*`・`honban/images/*`・ルート直下）に差分ゼロ**。新規は `honban/_preview/` 配下のみ
- [ ] 生成/コピー画像は `honban/_preview/img/` 配下のみ（公開 `honban/images/` へ書き込まない）
- [ ] 電話番号は 0466-36-8484 のみ
- [ ] 着手前に「読んだ正本・現在地・やること」を3行報告（AGENTS.md 規定）
- [ ] 完了後 push せず、差分一覧を報告（公開判断はオーナー）
