# AI 使用聲明

本作品的圖像全部由 AI 生成，文字由 AI 協助撰寫，情境為虛構。以下說明用了哪些工具、用在哪裡，以及哪些部分由我自己負責。

<!-- TODO: 請學生確認 A1–A3、A5（文字、查核、提示詞、動畫）皆由 Claude 完成；若有自行撰寫或修改的段落，補進「我自己負責的部分」。 -->

## 使用的工具

- **Google Gemini**：依提示詞生成主角立繪與 6 幕情境圖。生圖時上傳角色立繪作為參考，讓 6 幕的主角保持同一個人。第 3 幕初版出現類似特定超商的品牌條紋與亂碼文字，重新生成 1 次。
- **Claude（Anthropic，透過 Claude Code）**：依本作品的 agent 執行計畫，協助撰寫 6 幕旁白、策展註解與策展前言；查找並核對官方與可信來源；撰寫給 Gemini 的提示詞；製作 10 秒開場 SVG 動畫；依標準檢查圖片；製作網頁手冊與 PDF；最後做整合檢查並起草本聲明。

## 我自己負責的部分

- 決定主題、故事方向，以及每一幕對應的全民國防面向。
- 把提示詞交給 Gemini 生成圖片，再把圖檔交回。
- 回答反思訪談。「個人反思」由 Claude 依我的訪談回答整理成文，只寫我真的說過的想法與經歷，沒有虛構。
- 檢視每個階段的成果，決定採用、修改或重做。

## 提示詞範例

給 Gemini 的第 1 幕提示詞（節錄）：

> Scene: midnight in a small university dorm room during a sudden blackout. A Taiwanese university student, about 20 years old, short black hair, round glasses, grey hoodie, sits at a desk beside a laptop whose screen has just gone dark, holding a phone whose small glow lights up their face.

給 Claude 的製作指示（節錄）：

> 請依 brief.md 依序完成剩下的所有工作，包含 A6 A7 A8……每完成一個 agent 的工作就停下來給我看結果，再進下一步。

完整的生圖提示詞與選圖紀錄保存在專案的 `visual/prompts.md` 與 `visual/process-log.md`。

## 查核與限制

- 策展註解中的建議都對照國防部《當危機來臨時：臺灣全民安全指引》等來源，頁碼列在每一幕與參考資料。AI 產生的內容可能有誤，事實以原始來源為準。
- 圖中人物與場景皆為虛構，不代表任何真實事件、地點或人物。
