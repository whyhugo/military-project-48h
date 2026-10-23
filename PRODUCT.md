# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Node 腳本（`scripts/build.mjs`）從 `content/` 的 JSON 與 Markdown 產生單一 HTML 檔 `web/index.html`，純 HTML／CSS／JS，GSAP 內嵌。PDF 由同一份資料產生。字體連 Google Fonts（Noto Serif TC、Noto Sans TC）；圖示用 Lucide，建置時內嵌為 SVG。之後部署到 Cloudflare Workers（靜態資產）。

## Users

- 主要：「全民國防導論」授課老師，在桌機上逐幕細讀、評分。評分重視個人反思、觀察與實際連結，不看標準答案。
- 次要：網頁公開部署後的一般讀者與同學，可能在手機上捲動瀏覽。

## Product Purpose

《平常的一天，不平常的 48 小時》是一份 AI 圖文策展手冊（期中 v1.0，2026-10-30 繳交）。它用一位大學生在原因不明的大規模停電與斷網中度過的 48 小時，把全民國防的非武裝面向（心理防衛、資訊辨識、物資整備、醫療急救、社區互助）變成具體畫面，並讓讀者反問自己：危機來臨時，我準備好了嗎？

成功的樣子：讀者讀完 6 幕，能說出一件自己平時可以先準備的事；老師看得出學生本人的反思與觀察。

## Positioning

不是國防宣導，也不是戰爭想像。主角是學生本人的分身，選擇不一定正確（第 2 幕差點轉傳假訊息），策展註解再對照國防部《全民安全指引》說明現實中該怎麼做。

## Operating Context

- 6 幕依時間推進：00:00、03:00、08:00、14:00、20:00、48:00。
- 每幕：時間、標題、AI 生成圖、第一人稱旁白（100–150 字）、策展註解（50–80 字）、來源連結。
- 期末 v2.0（2026-12-18）會升級為互動決策遊戲，`scenes.json` 已預留 `choices`。

## Capabilities and Constraints

- 單一 HTML 檔、圖片 base64 內嵌，離線可開（字體離線時退回系統字體，已由學生同意）。
- 開場：嵌入 `motion/intro.svg`，10 秒後自動進入，有「略過」按鈕。
- 每張圖 `alt` 用 `image_alt`，角落標註「AI 生成」。
- 頁尾：本作品圖像由 AI 生成，情境為虛構。
- 不畫寫實戰爭；不出現特定國家軍隊、國旗、武器；危機原因保持模糊，不指名任何國家；不做恐懼行銷。

## Brand Commitments

- 作品名：《平常的一天，不平常的 48 小時》；系列名《斷線 48 小時》。
- 色票（brief 第 3 節，必須使用）：夜藍 #1F2A44、燭光橘 #F2A65A、米白 #F5EFE6、霧灰 #8A8F98、希望綠 #6FA37A。
- 字體：標題 Noto Serif TC，內文 Noto Sans TC。
- 基調：「準備好就不慌」。

## Evidence on Hand

- `content/scenes.json`：6 幕全文、圖片路徑、替代文字、來源。
- `content/intro.md`：策展前言。`content/reflection.md`：個人反思（依學生訪談定稿，不可改寫）。
- `research/sources.md`：來源查核；主要依據國防部《當危機來臨時：臺灣全民安全指引》。
- `visual/images/`：Gemini 生成的角色圖與 6 幕圖（2752 × 1536）。
- `motion/intro.svg`：10 秒開場動畫。
- 沒有：數據、引言、推薦、合作單位標誌。不得編造。

## Product Principles

1. 準備好就不慌：每一幕都落在「可以先做的一件事」，不渲染恐懼。
2. 真實的學生視角：反思只寫學生說過的話，主角可以犯錯。
3. 有出處：每個建議都對應可打開的可信來源。
4. AI 透明：所有 AI 生成的圖與文都標註。

## Accessibility & Inclusion

圖片皆有中文替代文字；開場動畫可略過；尊重 `prefers-reduced-motion`；手機寬度可正常閱讀。
