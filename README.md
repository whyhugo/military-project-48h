# 《斷線 48 小時》全民國防導論期中作品

《平常的一天，不平常的 48 小時》：6 幕 AI 圖文策展手冊（網頁＋PDF）。執行計畫見 [brief.md](brief.md)。

## 環境

所有工具與快取都限制在專案內（`mise.toml` 的 `[env]` 把 npm、uv、Playwright 快取導到 `.cache/`）。

```bash
mise install                 # node、uv
npm ci                       # gsap、lucide-static、marked、sharp、puppeteer-core（皆裝在專案內）
mise run build               # 產生 web/index.html、output/handbook.pdf，打包 output/submission/ 與 dist/
mise run qa                  # A8 檢查：內容規則、網頁與 PDF 文字一致、斷網開啟（CI 也跑）
node scripts/capture.mjs     # 整頁截圖到 .impeccable/review/（需本機 Chrome）
```

網頁原始碼在 `web/src/`（`tokens.css` 色票與字級、`page.css` 版面、`app.js` 開場與時間軸），`web/index.html` 是建置產物，也是繳交檔。設計脈絡見 `PRODUCT.md` 與 `.impeccable/surfaces/web-index-html.md`。

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
| `output/` | PDF、繳交包 `submission/`、檢查報告 `qa-report.md` |

## 部署（Cloudflare Workers Builds）

`wrangler.jsonc` 是只發布靜態資產的 Worker，直接發布已 commit 的 `output/submission/`（`index.html`、`handbook.pdf`）。Cloudflare 的建置環境沒有 Chrome、產不出 PDF，所以**建置在本機做**：改內容後跑 `mise run build`，把 `output/submission/` 一起 commit。CI 會試跑 `wrangler deploy --dry-run` 確認設定有效。

在 Cloudflare 後台設定一次：

1. Workers & Pages → Create → Import a repository，連結 GitHub 並選 `whyhugo/military-project-48h`。
2. Project name 填 `military-project-48h`（要和 `wrangler.jsonc` 的 `name` 相同）。
3. Build command 留空；Deploy command 用預設的 `npx wrangler deploy`；Production branch 選 `main`。
4. （選用）開啟非 production 分支的建置，PR 會得到預覽版網址。

之後每次合併到 `main` 就會自動部署，網址是 `https://military-project-48h.<你的子網域>.workers.dev`。Node 版本由 `.node-version` 指定。
