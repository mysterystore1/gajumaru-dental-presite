# 開業チラシ AI生成プロンプト（確定マスター・GPT Image 2用）

> 結論：**GPT Image 2のポン出しが最高品質**（Canva AIの文字→デザインは品質不足＝不採用）。
> このプロンプトが「1枚目（採用版）」を再現する正本。英語指示＋日本語は固定文字列。作成 2026-06-15。
> 用途＝院長提示の"仮"／本番印刷は §仕上げ 参照。

---

## マスタープロンプト（コピペ）

```
A bold, eye-catching vertical A4 flyer for a new neighborhood family dental
clinic in Japan — designed to STAND OUT in a mailbox and be easy to read
for older residents (large type, high contrast). Lively real-flyer style,
clean and friendly, warm hand-drawn accents. NOT a quiet brochure, NOT a
fairytale; a polished Japanese clinic opening flyer.

PALETTE (high contrast, warm): cream base (#FFFDF9); a cheerful warm YELLOW
as the dominant eye-catching color; DEEP TERRACOTTA (#C5552B) filled bands
with WHITE text for all section headings; muted leaf-green (#7A9A6B) accent
only. Alternate section backgrounds so blocks separate clearly. FILLED
colored icons. Large bold legible rounded gothic Japanese font (Zen Maru
Gothic style). Render all Japanese text EXACTLY, no invented characters.

TOP HERO: a cheerful warm YELLOW two-story dental clinic building with a
banyan (gajumaru) tree and a happy THREE-GENERATION Japanese family
(grandparents, parents, young child) smiling in daylight.
- Headline (very large, terracotta): 「歯医者が苦手な方にこそ。」
- Sub: 「辻堂の、家族のかかりつけ歯科。」
- Terracotta starburst badge: 「2026年8月1日(土) 開院予定」
- Outlined tag: 「内覧会 開催予定」+ small 「日程は決まり次第お知らせします」

CALLOUT PILL ROW (yellow pills): 「駐車場あり」「土日も診療」「保険診療を基本に」「バス停すぐ」

CLINIC NAME (large terracotta): 「辻堂がじゅまる歯科」 with leaf motifs.

院長あいさつ BAND (terracotta header bar 「院長あいさつ」): left = a portrait
photo frame with a neutral grey silhouette labeled 「院長写真（準備中）」 (do NOT
generate a realistic face); right = 「院長　桑田 淳（くわた あつし）」 and
「子どもの頃、私自身が歯医者が苦手でした。だからこそ、苦手な方に寄り添える歯科でありたいと思っています。」

3 POLICY CARDS (each: terracotta header bar + white text + one flat colored
illustration, all in ONE consistent illustration style):
01 「まず、お話を聞きます」/「不安や疑問に丁寧にお答えします」
02 「保険診療を基本に」/「ご負担に配慮した治療を行います」
03 「家族みんなのかかりつけに」/「お子さまからご年配の方まで」

診療内容 (terracotta heading band, then yellow-outlined pills, 2 rows 5+4):
一般歯科 小児歯科 予防歯科 歯周病治療 ホワイトニング
マタニティ歯科 スポーツマウスガード マウスピース矯正 インプラント

BOTTOM INFO STRIP (3 columns, each terracotta header bar):
- 「ご予約・お問い合わせ」: large terracotta phone 「0466-XX-XXXX」;
  「受付時間 平日10:30-13:30 / 14:30-19:00　土日9:00-14:20」; a BLANK rounded
  square for a QR (do NOT draw a QR); 「〒251-0047 神奈川県藤沢市辻堂6丁目13-3」
- 「アクセス」: a simple clear map with a pin and 「辻堂駅」; 「辻堂駅から車で約3分」
  「バス停「高砂」から徒歩約1分」「駐車場2台あり」
- 「診療時間」: a clear table, columns 月 火 水 木 金 土 日 祝 (8 separate columns),
  rows 午前 / 午後. 午前: ◯ 休 ◯ ◯ ◯ ◯ ◯ 休 ; 午後: ◯ 休 ◯ ◯ ◯ △ △ 休.
  note: 「土日は9:00-14:20の通し診療　休診：火曜・祝日」

FOOTER: full-width terracotta band, white centered latin: gajumaru-dental.com

NO crypto, NO "barrier-free", NO open-house dates, NO "痛くない",
NO "No.1/最新/日本一", NO testimonials, NO before/after.
Vertical A4 portrait, highest resolution possible, bold print-flyer layout.
```

---

## 微調整（1行ずつ追い足し）
- 「もっと黄色を面で・元気に」／「文字をもっと大きく、年配向けに」
- 「ヒーローの建物を、もっと黄色い2階建ての実在感のある外観に」
- 「全体をもう少し落ち着いた暖色に」／「セクションの色帯のコントラストを強く」
- 「3つの方針のイラストを同じ絵柄で統一」

## 出した後の校正（AIは間違える・必須）
- 診療時間表の◯休△を1マス照合（火・祝=休／土日=午後△）
- 電話・住所・9診療名の誤字/欠落
- 誤字（過去に「お知らせ」→「お知ら定」化あり）

## 仕上げ（本番印刷にする時）
- **最高解像度で生成**（A4印刷は300dpi≈2480×3508px必要。低解像はボケる）。
- **QR＝本物**（`promo-assets/png/qr/qr-contact.png`／昇格前は`qr-top.png`）を空き枠に。
- **院長・建物・院内・家族＝実写**（撮影後）。AI生成人物は最終では使わない。
- 崩れた表/数字は `table-hours-a4.png`、地図は `map-access-a4.png` を上から貼って正確化（Canva等で）。
- 関連正本：構成=本セッションのモックアップ／文言=`CREATIVE_FLYER_CANVA_SPEC.md`。
