# IMAGE_TODO — 画像差し替え台帳（辻堂がじゅまる歯科）

本番写真が必要な全箇所の1枚マップ。**院内写真は約2週間後（内覧会後）に到着予定。**
到着したらこの表だけを見れば差し替えできる。差し替えは原則 `<img>` の `src` のみ変更
（`alt` は本番想定文言を先に入れてあるので原則そのまま）。

## 凡例
- **状態**: 仮 = SVG/CSSプレースホルダー or 流用画像。実 = 本番画像入り。
- **差し替え目印**: HTML内でその画像を一意に特定できる検索キーワード。
- 仮画像の正体: `images/clinic-reception.svg`（待合室）/ `images/clinic-room.svg`（診療室）/
  `images/director-profile.webp`（院長・既存流用）/ `images/hero-director.webp`（院内イメージ・既存流用）。
  不足分は同系統の SVG or CSS グレーボックス（`.img-placeholder`）。

---

## トップ（index.html）

| # | 用途 | 現在の仮ファイル | 差し替え目印（HTML検索） | alt 本番想定 | 状態 |
|---|------|----------------|----------------------|-------------|------|
| 1 | ヒーロー背景（院内/外観イメージ） | `images/hero-director.webp` | `class="hero__bg"` | 辻堂がじゅまる歯科の院内 | 仮（流用） |
| 2 | 院長写真（ごあいさつ） | `images/director-profile.webp` | `class="greeting__photo"` 内 `<img>` | 院長 桑田 淳 | 仮（流用・要本番ポートレート） |

## 通院をためらう方へ（dental-anxiety.html）

| # | 用途 | 現在の仮ファイル | 差し替え目印 | alt 本番想定 | 状態 |
|---|------|----------------|------------|-------------|------|
| 3 | ヒーロー（共感ビジュアル・任意） | CSSグレーボックス | `class="page-hero"` | （装飾・alt空でも可） | 仮（CSS） |
| 3b | 院長ポートレート（院長メッセージ） | `images/director-profile.webp` | `data-img="anxiety-director"` 内 `<img>` | 院長 桑田 淳 | 仮（流用・要本番ポートレート） |

## 診療案内（services.html）

| # | 用途 | 現在の仮ファイル | 差し替え目印 | alt 本番想定 | 状態 |
|---|------|----------------|------------|-------------|------|
| 4 | 各診療イメージ（任意・5枠） | CSSグレーボックス | `class="service__media"` ×5 | 一般歯科/小児歯科/予防歯科/歯周病治療/ホワイトニングの治療風景 | 仮（CSS・写真到着後に検討） |

## 院長・当院紹介（about.html）

| # | 用途 | 現在の仮ファイル | 差し替え目印 | alt 本番想定 | 状態 |
|---|------|----------------|------------|-------------|------|
| 5 | 院長ポートレート | `images/director-profile.webp` | `data-img="about-director"` 内 `<img>` | 院長 桑田 淳 | 仮（流用・要本番ポートレート） |

## 院内紹介（facility.html）★写真到着で最優先差し替え（ページ作成済・枠稼働中）

> ※ キッズスペースは無し（医院に存在しない）。facilityに枠を作らないこと。

| # | 用途 | 現在の仮ファイル | 差し替え目印 | alt 本番想定 | 状態 |
|---|------|----------------|------------|-------------|------|
| 5b | 外観（院内紹介 冒頭） | `images/hero-exterior.svg` | `data-img="facility-exterior"` | 辻堂がじゅまる歯科の外観 | 仮（SVG） |
| 6 | 受付 | `images/clinic-reception.svg` | `data-img="reception"` | 辻堂がじゅまる歯科の受付 | 仮（SVG） |
| 7 | 待合室 | `images/clinic-reception.svg` | `data-img="waiting"` | 明るく静かな待合室 | 仮（SVG） |
| 8 | 診療室 | `images/clinic-room.svg` | `data-img="treatment"` | 半個室の診療室 | 仮（SVG） |
| 9 | カウンセリングルーム | `images/clinic-room.svg` | `data-img="counseling"` | 個室のカウンセリングルーム | 仮（SVG） |
| 10 | 設備（レントゲン等） | `images/clinic-room.svg` | `data-img="equipment"` | 被ばく量の少ないレントゲン | 仮（SVG） |

## アクセス（access.html）

| # | 用途 | 現在の仮ファイル | 差し替え目印 | alt 本番想定 | 状態 |
|---|------|----------------|------------|-------------|------|
| 11 | 外観（道順用・任意） | CSSグレーボックス | `data-img="exterior"` | 辻堂がじゅまる歯科の外観 | 仮（CSS・本番写真後） |
| 12 | 地図（Google Maps iframe） | 仮位置 iframe（辻堂駅） | `class="access__map"` 内 iframe | （iframe・正式住所確定後に差し替え） | 仮（iframe） |

---

## 共通・その他

| # | 用途 | 現在のファイル | 差し替え目印 | 備考 | 状態 |
|---|------|--------------|------------|------|------|
| 13 | ロゴ（ヘッダー） | `images/logo.jpg` | `class="header__logo-img"` | 確定ロゴ（差し替え不要見込み） | 実 |
| 14 | ファビコン / Apple touch | `images/logo-icon.png` | `rel="icon"` / `apple-touch-icon` | 確定（差し替え不要見込み） | 実 |
| 15 | OGP画像（全ページ共通） | `images/hero-director.png` | `property="og:image"` | 本番ヒーロー確定後に差し替え検討 | 仮（流用） |

---

## 差し替え後にやること
- `og:image`（#15）を本番ヒーローに更新したら全ページの OGP を統一。
- 院長ポートレート（#2 / #3b / #5）は同一画像。差し替え時は3ページとも更新。
- 地図（#12）正式住所確定後、iframe `src` を実住所に変更し、`.access__map-note`（仮位置注記）を削除。
- 差し替え完了した行は「状態」を「実」に更新。
