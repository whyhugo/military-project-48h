---
name: 平常的一天，不平常的 48 小時
description: 《斷線 48 小時》AI 圖文策展手冊：一間停電 48 小時的房間，唯一會變的是光。
colors:
  brand-night: "oklch(28.8% 0.050 265.9)"
  brand-candle: "oklch(78.5% 0.129 63.9)"
  brand-cream: "oklch(95.4% 0.014 78.3)"
  brand-fog: "oklch(64.9% 0.015 262.4)"
  brand-hope: "oklch(66.7% 0.082 150.3)"
  ground-void: "oklch(17.5% 0.032 266)"
  ground-night: "oklch(23% 0.046 266)"
  ground-overcast: "oklch(38.5% 0.030 252)"
  paper-2: "oklch(25.5% 0.046 266)"
  paper-3: "oklch(33% 0.044 265)"
  ink-2: "oklch(88% 0.014 78)"
  muted: "oklch(78% 0.013 262)"
  focus: "oklch(80% 0.18 64)"
  accent-hover: "oklch(83% 0.13 66)"
  accent-press: "oklch(74% 0.13 62)"
  overcast-paper-2: "oklch(34% 0.028 252)"
  overcast-muted: "oklch(84% 0.012 252)"
  dawn-ink-2: "oklch(34% 0.04 265)"
  dawn-muted: "oklch(45% 0.016 262)"
  dawn-paper-2: "oklch(91.5% 0.016 78)"
  dawn-hope: "oklch(44% 0.08 150)"
  dawn-focus: "oklch(56% 0.18 58)"
  dawn-ember: "oklch(52% 0.12 58)"
typography:
  display:
    fontFamily: "\"Noto Serif TC\", \"Noto Serif CJK TC\", \"Songti TC\", ui-serif, serif"
    fontSize: "clamp(2.75rem, 7.2vw, 7.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "\"Noto Serif TC\", \"Noto Serif CJK TC\", \"Songti TC\", ui-serif, serif"
    fontSize: "clamp(3rem, 5vw + 1rem, 6rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontFeature: "tnum"
  section:
    fontFamily: "\"Noto Serif TC\", \"Noto Serif CJK TC\", \"Songti TC\", ui-serif, serif"
    fontSize: "clamp(2rem, 2.5vw + 1rem, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0"
  title:
    fontFamily: "\"Noto Serif TC\", \"Noto Serif CJK TC\", \"Songti TC\", ui-serif, serif"
    fontSize: "clamp(1.25rem, 0.75vw + 0.875rem, 1.625rem)"
    fontWeight: 700
    lineHeight: 1.4
  clock:
    fontFamily: "\"Noto Serif TC\", \"Noto Serif CJK TC\", \"Songti TC\", ui-serif, serif"
    fontSize: "clamp(1.75rem, 1.2vw + 1.25rem, 2.25rem)"
    fontWeight: 700
    lineHeight: 1
    fontFeature: "tnum"
  lead:
    fontFamily: "\"Noto Sans TC\", \"Noto Sans CJK TC\", \"PingFang TC\", ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 0.35vw + 1rem, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.95
  body:
    fontFamily: "\"Noto Sans TC\", \"Noto Sans CJK TC\", \"PingFang TC\", ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: "0.01em"
  label:
    fontFamily: "\"Noto Sans TC\", \"Noto Sans CJK TC\", \"PingFang TC\", ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  pill: "999px"
  cursor: "2px"
spacing:
  3xs: "2px"
  2xs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  2xl: "64px"
  3xl: "96px"
  4xl: "144px"
  section-gap-s: "120px"
  section-gap: "160px"
  gutter: "64px"
  rail-w: "184px"
  container: "1180px"
components:
  link-start:
    textColor: "{colors.brand-candle}"
    typography: "{typography.title}"
    height: "48px"
  link-start-hover:
    textColor: "{colors.accent-hover}"
  link-start-active:
    textColor: "{colors.accent-press}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.brand-cream}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  ai-tag:
    backgroundColor: "{colors.ground-void}"
    textColor: "{colors.brand-cream}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  rail-clock:
    textColor: "{colors.brand-candle}"
    typography: "{typography.clock}"
  rail-stop:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    height: "28px"
  rail-stop-current:
    textColor: "{colors.brand-cream}"
  scene-time:
    textColor: "{colors.brand-candle}"
    typography: "{typography.headline}"
  scene-time-dawn:
    textColor: "{colors.dawn-ember}"
    typography: "{typography.headline}"
  timetable-row:
    textColor: "{colors.brand-cream}"
    typography: "{typography.title}"
    padding: "16px 0"
---

# Design System: 平常的一天，不平常的 48 小時

## Overview

**Creative North Star: "停電房間裡的光"**

整個系統是一間停電 48 小時的房間，而房間裡唯一會變的是光。頁面沿著時間往下走，地色跟著劇情裡的光源換：從夜藍開始，最暗的 03:00 再沉一階，08:00 與 14:00 轉成陰天的石板藍灰，20:00 回到夜色並亮起露營燈，48:00 燈亮了，整頁翻成米白。光不是裝飾，是敘事本身；每一層柔光都對應旁白裡說出來的那盞燈。

版面是策展手冊式的閱讀節奏：大量留白、慢速、一幕一個時刻。時刻用 Noto Serif TC 粗體大字與等寬數字排出，作為每幕的開頭；第一人稱旁白是主角，策展註解與來源退到 1px 細線下的側欄。左側固定時間軸是整頁的剖面，游標隨捲動在 00:00 到 48:00 之間連續推進。沒有卡片、沒有陰影、沒有實心色塊容器，結構只靠細線、間距與地色變化。

燭光橘是稀有的：它只屬於「光源」與「時間」——時間軸、目前時刻、每幕的時刻大字、目錄時刻、「從 00:00 開始讀」連結，以及連結底線。所有段落文字保持米白（日光段保持夜藍）。

**Key Characteristics:**
- 地色即敘事：每段以 `data-light` 宣告光線（void／dusk／phone／deep／lantern／overcast／dawn／day），固定底層交叉淡入。
- 燭光橘只標光源與時間，從不用在段落文字或大面積底色。
- Noto Serif TC 700 負責標題與一切時刻；Noto Sans TC 負責內文；所有時刻用等寬數字。
- 只用 1px 細線分隔，沒有卡片、沒有陰影。
- 每幕在 12 欄格線上依光改變構圖，圖不等大。
- 6 張 Gemini 水彩圖統一 1920 × 1072，進入視窗時從暗處被「點亮」。

## Colors

色票由 brief 第 3 節指定（夜藍、燭光橘、米白、霧灰、希望綠），在程式中以 OKLCH 為正本；其餘顏色都是這五色在不同光線下的推導。

### Primary
- **燭光橘 Candle**（`brand-candle`）：光源色。時間軸讀數、填充線、游標與目前幕次點；每幕時刻大字；目錄時刻；「從 00:00 開始讀」連結；所有連結的底線色；開場進度細線。懸停變亮為 `accent-hover`，按下變深為 `accent-press`。
- **餘燼橘 Ember**（`dawn-ember`）：燭光橘在米白地上的版本，用於日光段的時刻大字與時間軸讀數，確保在淺地上可讀。

### Secondary
- **希望綠 Hope**（`brand-hope`）：只標「可以先準備的事」，即策展註解標頭的燈泡圖示。日光段改用較深的 `dawn-hope`。

### Neutral
- **夜藍 Night**（`brand-night`）：預設地色（封面、前言、00:00、14:00、20:00），也是日光段的墨色。
- **深夜 Night Deep**（`ground-night`）：03:00 專用，比夜藍深一階，是故事最暗的時刻。
- **虛空 Void**（`ground-void`）：開場動畫地色、手機版時間軸背板（88% 混透明）、AI 標籤底（78% 混透明）、時間軸刻度點的填色。
- **陰天石板 Overcast**（`ground-overcast`）：08:00 與 14:00 的地色，搭配 `overcast-paper-2` 與 `overcast-muted`。
- **米白 Cream**（`brand-cream`）：夜段的墨色；48:00 之後的地色（`ground-dawn`）。次要墨色 `ink-2` 用於封面說明與註解內文。
- **霧灰 Fog**（`brand-fog`）：所有 1px 細線的顏色，常以 50–60% 混透明作次級分隔。
- **褪灰 Muted**（`muted`）：說明文字、來源附註、時間軸未到的刻度、版記。日光段改用 `dawn-muted`。
- 圖片佔位漸層用 `paper-2` → `paper-3`（160°）。

### Named Rules
**光源色規則（The Light Source Rule）。** 燭光橘只給光源與時間：時間軸、時刻、開始閱讀連結、連結底線。任何段落文字、標題、底色都不用燭光橘。

**一光一地規則（One Light, One Ground Rule）。** 每段只宣告一種 `data-light`；地色由光決定，不由元件決定。新段落要先問「此刻房間裡是什麼光」，再選地色。

**燈亮翻轉規則（Lights-On Inversion Rule）。** 進入 `dawn`／`day` 時，墨與地整組對調（墨變夜藍、地變米白），並同時切換 muted、hope、focus、shade、時刻色為 dawn 變體；不可只換背景。

## Typography

**Display Font:** Noto Serif TC（備援 Noto Serif CJK TC、Songti TC、ui-serif）
**Body Font:** Noto Sans TC（備援 Noto Sans CJK TC、PingFang TC、system-ui）

**Character:** 粗宋體的時刻與標題像手冊上的鉛字標記，沉靜而確定；黑體內文行距寬鬆（1.8–1.95），給中文長段落呼吸空間。

### Hierarchy
- **Display**（700、`--text-cover`、行高 1.1、-0.01em）：只用於封面兩行片名，寬螢幕不斷行。
- **Headline／時刻**（700、`--text-time`、行高 1、-0.02em、等寬數字）：每幕開頭的時刻大字，燭光橘（日光段為餘燼橘）。標題緊接其下，同為 section 尺寸。
- **Section**（700、`--text-section`、行高 1.2–1.25）：幕標題、前言與結尾段標題。
- **Title**（700、`--text-title`、行高 1.4）：目錄條目標題、目錄標頭；`--text-xl` 用於目錄時刻與開始閱讀連結。
- **Clock**（700、`--text-clock`、行高 1、等寬數字）：時間軸讀數；手機版降為 `--text-xl`。
- **Lead**（400、`--text-lead`、行高 1.95、最寬 30em）：每幕第一人稱旁白與封面說明；反思段行高 1.9。
- **Body**（400、1.0625rem、行高 1.8、字距 0.01em）：內文、註解；prose 最寬 34em。
- **Label**（400、`--text-sm` 0.875rem）：幕次與面向的 dl 資料、來源附註、時間軸刻度（刻度改用 Serif 700）、版記。AI 標籤用 `--text-xs`。

### Named Rules
**等寬時刻規則（Tabular Time Rule）。** 所有時刻（00:00–48:00）一律 Noto Serif TC 700 加 `tabular-nums`，讓游標推進時數字不跳動。

**旁白為主規則（Narration Leads Rule）。** 每幕的閱讀順序是時刻 → 標題 → 圖 → 旁白；旁白用 lead 尺寸，註解與來源用 body 以下尺寸，退到細線下的側欄。

## Layout

- **骨架：** 版心 `--container` 1180px，左右 `--gutter`（64px → 60rem 以下 24px → 40rem 以下 16px）。桌機（≥72rem）頁面左側讓出 `--rail-w` 184px 給固定時間軸；72rem 以下時間軸改為頂部時刻列，頁面上方留 72px。
- **幕的構圖：** ≥60rem 時每幕是 12 欄格線（欄距 `--gap-columns` 40px），時刻標題列橫跨全寬，右側靠右對齊幕次資料。圖的位置隨光改變：00:00 圖靠右（3 / -1），03:00 圖縮小退到 1 / 8、旁白並排於 9 / -1，08:00 與 20:00 全寬，14:00 圖靠左（1 / 11），48:00 出血到版心外（負 gutter，≥110rem 再多 64px）。旁白佔 1 / 8、側欄佔 9 / -1；`--flip` 對調為旁白 6 / -1、側欄 1 / 5。
- **前言與結尾：** 前言 6fr / 5fr 兩欄（標題與目錄）；結尾 4fr / 8fr（標題與內文），欄距 96px。
- **節奏：** 幕上下 `--section-gap-s` 120px，相鄰幕上方 `--section-gap` 160px；60rem 以下降為 80 / 96px，40rem 以下 56 / 72px。元件內部用 4 的倍數間距尺（8／12／16／24／40／64）。

### Named Rules
**構圖隨光規則（Composition Follows Light Rule）。** 不做等大卡片網格；每幕圖的大小與位置由該時刻的光決定，最暗時圖最小，燈亮時圖最大。

## Elevation & Depth

完全扁平，`--shadow-card: none`。深度來自三件事：地色的明暗層級（void < night < dusk < overcast < dawn）、固定在地色層的柔光（radial-gradient），以及圖片從暗處被點亮的濾鏡。唯一的模糊是手機版頂部時間軸的 `backdrop-filter: blur(8px)`。

### 柔光語彙
- **手機冷光**（`--glow-phone`）：00:00，冷藍橢圓光 20%，位於畫面中右。
- **弱手機冷光**（`--glow-phone-dim`）：03:00，11%，偏左。
- **露營燈**（`--glow-lantern`）：20:00，燭光橘 30%，偏下。
- **日出**（`--glow-sunrise`）：48:00，暖黃 55%，從左上灑入。

### Named Rules
**光有出處規則（Every Glow Has a Lamp Rule）。** 柔光只在旁白點名的光源出現，固定於該幕的地色層，不做動畫、不作裝飾背景。

**無陰影規則（No Shadow Rule）。** 不用 box-shadow 堆疊層次；唯一的 inset 1px 是安靜按鈕的描邊。

## Shapes

直角為主。圖片是乾淨的 1920 × 1072 矩形，不加圓角、不加框；分隔一律 1px 霧灰細線（`--rule-hair`）。圓形只出現在時間軸刻度點（9px，手機 7px，1.5px 描邊）；膠囊形（999px）只給安靜按鈕與 AI 標籤；時間軸游標是 2px 圓角的短棒（桌機 17 × 3px 橫棒、手機 3 × 11px 直棒）。

## Components

### 開始閱讀連結
燭光橘文字連結，而非實心按鈕。Noto Serif TC 700、`--text-xl`、最小高度 48px、1px 底線偏移 0.35em；懸停底線加粗為 2px 並轉 `accent-hover`，按下轉 `accent-press`。

### 安靜按鈕
- **Shape:** 膠囊（999px），高 48px，左右 24px。
- **Style:** 透明底、米白字、`inset 0 0 0 1px` 霧灰描邊，Noto Sans TC 700。
- **Hover / Active:** 墨色 10% / 16% 混透明底；聚焦為 2px 墨色外框、偏移 3px。
- 目前用於開場「略過」。

### 連結
繼承文字色，1px 燭光橘底線、偏移 0.28em；懸停底線 2px，按下文字轉燭光橘。外部連結尾隨 0.9em 的 Lucide external-link 內嵌 SVG（褪灰）。

### 時間軸（Signature）
桌機固定於左側 184px：上方 Serif 時刻讀數（燭光橘）與一行目前狀態（褪灰，`--text-sm`），下方 1px 霧灰直線（60% 不透明）、燭光橘填充線隨捲動 scaleY、燭光橘游標連續推進。6 個幕次刻度以 `--at` 依實際時間定位：未到為空心圓、已過為實心、目前為燭光橘實心。手機版改為頂部橫列，void 88% 半透明背板加 8px 模糊，刻度文字隱藏只留點。日光段整組換成夜藍墨與餘燼橘讀數、米白背板。

### 幕標頭
時刻大字（headline）疊在幕標題之上，右側為 dl 資料（「幕次」「全民國防面向」），桌機靠右對齊、褪灰標籤配墨色值。

### 目錄
上下 1px 細線的清單；每列兩欄（5.5em 時刻 ／ 標題 + 說明），時刻為燭光橘 Serif，懸停標題加燭光橘底線。

### 策展註解與來源
上方 1px 霧灰細線，標頭為 Lucide 圖示（註解用希望綠燈泡、來源用褪灰書本）加 body 粗體小標；註解內文用 `ink-2`。

### AI 生成標籤
疊在圖右上（5% / 3.5%）的膠囊：void 78% 半透明底、米白字、`--text-xs`、4 × 12px 內距。每張 AI 圖都必須有。

### 圖片點亮
圖片進入視窗時以 scrub 從 `brightness(0.28) saturate(0.6)` 過渡到原色（top 92% → center 58%）；地色層切換時以 1.1s power2.out 交叉淡入。`prefers-reduced-motion` 下保留最終畫面。

## Do's and Don'ts

### Do:
- **Do** 每個新段落先宣告 `data-light`，讓地色與墨色由光線決定。
- **Do** 把燭光橘限定在時間軸、時刻、開始閱讀連結與連結底線；米白地上改用 `dawn-ember`。
- **Do** 所有時刻用 Noto Serif TC 700 加等寬數字。
- **Do** 用 1px 霧灰細線（必要時 50–60% 混透明）分隔註解、來源、目錄與版記。
- **Do** 讓每幕的圖依光改變大小與位置，並在每張 AI 圖右上加「AI 生成」標籤。
- **Do** 讓柔光固定在地色層，對應旁白點名的光源。

### Don't:
- **Don't** 做「封面加 6 張等大卡片」的展覽模板，也不要把內容放進有底色或陰影的卡片。
- **Don't** 把燭光橘用在段落文字、標題或大面積底色。
- **Don't** 加 box-shadow 或硬邊偏移陰影；深度只來自地色與柔光。
- **Don't** 讓柔光動起來，或在沒有光源的幕加光暈。
- **Don't** 只換背景就進入日光段；墨、muted、hope、focus 要整組翻轉。
