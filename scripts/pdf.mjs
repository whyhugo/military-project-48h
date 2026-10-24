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
// 封面是開場動畫的最後一格：CSS 動畫由 print.css 歸零，SMIL 的變暗遮罩要另外把 SVG 時間軸跳到 10 秒
const cover = await page.evaluate(() => {
  const svg = document.getElementById("intro-svg");
  svg.pauseAnimations();
  svg.setCurrentTime(10);
  const overlay = svg.querySelector("rect > animate[attributeName='opacity']")?.parentElement;
  return {
    titles: [...svg.querySelectorAll(".iv-t1, .iv-t2, .iv-t3")].map((el) => Number(getComputedStyle(el).opacity)),
    overlay: overlay ? Number(getComputedStyle(overlay).opacity) : null,
  };
});
if (cover.titles.some((o) => o < 1) || (cover.overlay !== null && cover.overlay < 0.5)) {
  throw new Error(`封面不是開場的最後一格：片名不透明度 ${cover.titles.join("、")}，遮罩 ${cover.overlay}`);
}
const fonts = await page.evaluate(() => [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family));
mkdirSync(new URL("output/", root), { recursive: true });
await page.pdf({ path: fileURLToPath(out), width: "297mm", height: "210mm", printBackground: true, preferCSSPageSize: true });
await browser.close();

const mb = statSync(out).size / 1024 / 1024;
console.log(`✓ output/handbook.pdf ${mb.toFixed(2)} MB（字體：${[...new Set(fonts)].join("、") || "未載入 Google Fonts，改用系統字體"}）`);
if (mb >= 20) { console.error("✗ PDF 超過 20 MB"); process.exit(1); }
