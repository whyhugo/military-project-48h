---
version: 1
slug: "web-index-html"
primary_target: "web/index.html"
related_targets: []
---

## Scope

`web/index.html`，單頁捲動式圖文手冊。Mode: Read（策展手冊，逐幕細讀）。桌機為主、公開部署，手機可讀。

## Audience and job

授課老師逐幕細讀評分；公開讀者捲動瀏覽。讀者要能：知道現在讀到第幾小時、讀懂每幕主角的選擇與現實中的準備方法、打開來源。

## Constraints

brief 第 5 節結構與第 3 節色票、字體不變；開場動畫 10 秒自動進入並可略過；圖片 base64 內嵌；每張圖標「AI 生成」；頁尾聲明。

## Direction contract

THESIS: 這一頁是一間停電 48 小時的房間，唯一會變的是光。頁面沿時間前進，光源跟著劇情換：手機冷光、陰天灰光、露營燈、日出。拒絕「封面加 6 張等大卡片」的展覽模板。

OWN-WORLD: 地色從夜藍開始，第 3–4 幕轉成陰天石板藍灰，第 5 幕回到夜色，第 6 幕起整頁翻成米白（燈亮了）。燭光橘只給光源：時間軸游標、目前時刻、連結。希望綠只標「可以先準備的事」。標題與時刻用 Noto Serif TC 粗體、等寬數字；內文 Noto Sans TC。框線只用 1px 細線，沒有卡片。

STORY: 讀者先看到停電的開場，再讀前言與 6 個時刻的目錄；逐幕看圖、讀主角第一人稱的選擇、再讀策展註解與來源；最後燈亮，讀到學生本人的反思、AI 使用聲明與參考資料。

FIRST VIEWPORT: 開場 SVG 全螢幕，右下「略過」與 10 秒進度細線。進入後封面：夜藍地，左側固定時間軸（00 到 48 小時刻度，6 個幕次點，橘色游標在 00:00），主欄大字片名兩行，一句說明，一個「從 00:00 開始讀」連結。

FORM: 自擬清單第 6 案「停電房間裡的光」，並以挑戰者「daylight section」的紀律加強：每段光對應精確時刻、時刻以等寬數字排、時間軸是整頁的剖面。seed:a55539dec63eced6

SIGNATURE: 左側時間軸隨捲動 scrub，游標與時刻讀數在幕與幕之間連續推進（03:00 → 08:00），點刻度可跳到該幕；每幕圖片進入視窗時從暗處被「點亮」。

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Contract amendments (2026-10-24, after finish review round 1)

- GROUND: 封面、前言、第 1 幕、第 5 幕用夜藍 #1F2A44；第 2 幕（03:00，故事最暗的時刻）刻意比夜藍深一階（oklch 23%）；第 3–4 幕陰天石板灰；第 6 幕以後米白。
- LIGHT: 每個光源畫成一層柔光，固定在地色層、不做動畫：00:00 手機冷光、03:00 較弱的手機冷光、20:00 露營燈暖光、48:00 日出暖光。
- COMPOSITION: 6 幕依光改變構圖，分別是圖靠右、圖縮小退進黑暗（旁白並排）、全寬、圖靠左、全寬、出血到版心外。
- 封面片名兩行都用米白；「從 00:00 開始讀」是燭光橘文字連結，不是實心按鈕。
- 圖片：建置時裁掉水彩紙邊，6 張統一為 1920 × 1072 的乾淨矩形。
