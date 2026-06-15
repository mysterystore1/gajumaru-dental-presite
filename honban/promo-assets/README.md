# promo-assets — チラシ/名刺 制作用アセット

`png/` ＝サイトの手描きSVGを**透過PNG（幅1000px・印刷/Canva貼付用）に書き出したもの**。
Canva無料プランはSVGアップ不可のため、このPNGを「アップロード」から入れる。
（CanvaがProなら `honban/images/*.svg` をそのまま使ってOK＝PNGは不要）。

再生成：`@resvg/resvg-js`（リポ外 `C:\work\projects\.svg2png-tmp\convert.mjs`）。元SVGを直せば再実行で更新。

## アイコン対応表（Canva組版指示書 `CREATIVE_FLYER_CANVA_SPEC.md` と対応）

### 9診療アイコン（§4）
| PNG | 診療 |
|---|---|
| svc-general.png | 一般歯科 |
| svc-pediatric.png | 小児歯科 |
| svc-prevention.png | 予防歯科 |
| svc-perio.png | 歯周病治療 |
| svc-whitening.png | ホワイトニング（自費） |
| svc-maternity.png | マタニティ歯科 |
| svc-mouthguard.png | スポーツマウスガード（自費） |
| svc-ortho.png | マウスピース矯正（自費） |
| svc-implant.png | インプラント（自費） |

### 3つの方針カード用アイコン（§3・候補）
| PNG | 用途候補 |
|---|---|
| icon-door.png | 01 まず、お話を聞きます |
| icon-yen.png | 02 保険診療を基本に |
| icon-home.png | 03 家族みんなのかかりつけに |
| icon-calendar.png | 予約優先制の注記 |
| icon-shield.png / icon-sprout.png / icon-child.png | 予備 |

### 装飾（飾り・四隅/区切り）
| PNG | 内容 |
|---|---|
| deco-leaves.png | 葉（見出し脇・フッター・四隅） |
| deco-roots.png | 気根カーテン（ヒーロー） |
| deco-bird.png | 小鳥 |
| deco-cat-yawn.png | あくび猫（がじゅまる由来の子猫） |
| deco-pawprints.png | 足あと（アクセス周り） |

> ロゴは既にPNG有り：`honban/images/logo-icon.png`（歯＋猫マーク）／`logo-mark.png`（透過マーク）。
