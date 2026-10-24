# A8 整合檢查報告

檢查日期：2026-10-24　檢查對象：`web/index.html`、`output/handbook.pdf`（11 頁，4.46 MB）

自動檢查可重跑：`mise run qa`（`scripts/check.mjs`、`scripts/qa_content.py`、`scripts/qa_offline.mjs`）。

| # | 檢查項目（brief 第 6 節） | 結果 | 依據 |
| --- | --- | --- | --- |
| 1 | 旁白第一人稱 100–150 字；策展註解 50–80 字 | ✅ | `check.mjs`（含標點、不含空白）：旁白 100–117 字、註解 64–73 字，6 幕旁白皆以「我」敘事。第 4 幕旁白剛好 100 字，在下限。 |
| 2 | 每幕至少 1 個能打開的可信來源 | ✅ | 3 個來源皆可開啟：國防部指引 PDF（HTTP 200）、台灣事實查核中心文章（HTTP 200）、Cofacts（curl 被擋回 403，瀏覽器開啟正常）。每幕都引用國防部指引並附頁碼。 |
| 3 | 沒有指名任何國家、沒有恐嚇語氣 | ✅ | `check.mjs` 禁用詞掃描（國名、敵軍、入侵、飛彈等）通過；人工通讀旁白、註解、前言、反思、聲明，危機原因維持「原因不明」，語氣以「可以先準備什麼」收尾。 |
| 4 | 個人反思與 `reflection.md` 一致 | ✅ | 網頁與 PDF 都直接由 `reflection.md` 產生；`qa_content.py` 逐字比對 4 段全部相符，內容未改寫。 |
| 5 | AI 使用聲明：工具、用途、prompt 範例 | ✅ | `content/ai-statement.md`：Gemini（生圖）、Claude（文字、查核、提示詞、動畫、排版、品管），附 Gemini 與 Claude 提示詞範例各 1 則。檔內留有 1 則 TODO 註解請學生確認分工（不會顯示在網頁與 PDF）。 |
| 6 | 6 張圖主角一致；無武器、軍人、國旗、亂碼 | ✅ | 見 `visual/process-log.md`。第 3 幕已重生（初版有類似超商品牌的條紋與偽文字）；第 5 幕寫字板上有極小的偽文字，網頁與 PDF 尺寸下幾乎不可辨。 |
| 7 | 網頁、PDF、動畫色票與字體一致 | ✅ | 網頁與 PDF 共用 `web/src/tokens.css`（brief 五色換算為 OKLCH），字體同為 Noto Serif TC／Noto Sans TC；PDF 已嵌入兩套字體。開場動畫只用 brief 色票與夜藍的深淺變化（#0E1424、#161F33、#2A3656、#2B3A5C），內嵌後文字改用同一組字體變數。 |
| 8 | `index.html` 單檔離線可開、手機可讀、開場動畫可略過 | ✅ | `qa_offline.mjs` 在斷網下以 file:// 開啟：桌機 1440 與手機 375 都通過，圖片 6/6、alt 6/6、「AI 生成」標註 6/6、無橫向捲動、無 JS 錯誤，開場會播放且「略過開場」有效（也可按 Esc），10 秒後自動進入。唯一外部資源是 Google Fonts，離線時退回系統字體（學生已同意）。 |
| 9 | PDF 與網頁內容一致、圖片清晰、小於 20 MB | ✅ | `qa_content.py`：36/36 段文字（6 幕旁白、註解，前言、反思、聲明）在網頁與 PDF 中逐字相符。PDF 4.46 MB；圖片為 1920 px JPEG，印在 188 mm 寬約 260 dpi。 |
| 10 | 繳交包：`index.html`、`handbook.pdf` | ✅ | `output/submission/index.html`（2.16 MB）、`output/submission/handbook.pdf`（4.46 MB），兩檔放在一起時網頁頁尾的「下載 PDF 版」連結可直接開啟。 |

## A8 期間的修正

- 第 4 幕 `image_alt` 原寫兩人「站在」診所前，圖中室友是坐著，已改為相符的描述（無障礙替代文字要和圖一致）。
- 封面與頁尾署名改為「國立臺灣師範大學 王修佑」。

## 留給學生確認

- `content/ai-statement.md` 的 TODO 註解：確認 A1–A3、A5 皆由 Claude 完成；若有自己寫或改的段落，補進「我自己負責的部分」，再跑 `mise run build`。
- 第 3 幕圖中是 3 瓶水，旁白寫「兩瓶水」，數量略有出入；要完全一致需再重生一次。
