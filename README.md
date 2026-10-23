# 《斷線 48 小時》全民國防導論期中作品

《平常的一天，不平常的 48 小時》：6 幕 AI 圖文策展手冊（網頁＋PDF）。執行計畫見 [brief.md](brief.md)。

## 環境

所有工具與快取都限制在專案內（`mise.toml` 的 `[env]` 把 npm、uv、Playwright 快取導到 `.cache/`）。

```bash
mise install                 # node、uv
mise run build               # 產生 web/index.html 與 output/handbook.pdf
node scripts/check.mjs       # 內容檢查（CI 也跑這個）
```

設計用的 agent skills 不進版控，依 `skills-lock.json` 與下列指令在專案內還原：

```bash
npx skills add https://github.com/greensock/gsap-skills --skill '*' --agent claude-code -y
npx skills add nutlope/hallmark --skill '*' --agent claude-code -y
npx impeccable install --project --providers=claude -y
```

## 目錄

| 路徑 | 內容 |
| --- | --- |
| `content/` | 6 幕文字（`scenes.json`）、前言、個人反思、AI 使用聲明 |
| `research/` | 來源查核 |
| `visual/` | 提示詞、原圖、選圖紀錄 |
| `motion/` | 10 秒 SVG 開場動畫 |
| `web/` | 網頁手冊（單檔、離線可開） |
| `output/` | PDF 與繳交包 |
