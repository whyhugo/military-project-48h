// A7：把 .cache/print/handbook.html 輸出成 A4 橫式 output/handbook.pdf。先跑 scripts/build.mjs。
// 需要本機 Chrome；路徑可用 CHROME_PATH 指定。
import { existsSync, mkdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const root = new URL("..", import.meta.url);
const src = new URL(".cache/print/handbook.html", root);
const out = new URL("output/handbook.pdf", root);
const chrome = [process.env.CHROME_PATH, "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome", "/usr/bin/chromium"].find((p) => p && existsSync(p));
if (!existsSync(src)) throw new Error("找不到 .cache/print/handbook.html，先跑 node scripts/build.mjs");
if (!chrome) throw new Error("找不到 Chrome，請設定 CHROME_PATH");

const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: process.env.CI ? ["--no-sandbox"] : [] });
const page = await browser.newPage();
await page.goto(src.href, { waitUntil: "networkidle0", timeout: 120000 });
await page.evaluate(() => document.fonts.ready);
const fonts = await page.evaluate(() => [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family));
mkdirSync(new URL("output/", root), { recursive: true });
await page.pdf({ path: fileURLToPath(out), width: "297mm", height: "210mm", printBackground: true, preferCSSPageSize: true });
await browser.close();

const mb = statSync(out).size / 1024 / 1024;
console.log(`✓ output/handbook.pdf ${mb.toFixed(2)} MB（字體：${[...new Set(fonts)].join("、") || "未載入 Google Fonts，改用系統字體"}）`);
if (mb >= 20) { console.error("✗ PDF 超過 20 MB"); process.exit(1); }
