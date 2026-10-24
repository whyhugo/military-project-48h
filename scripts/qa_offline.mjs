// A8 檢查：斷網時直接開 web/index.html（file://），確認圖片、腳本、開場略過都正常。
import { existsSync } from "node:fs";
import puppeteer from "puppeteer-core";

const file = new URL("../web/index.html", import.meta.url).href;
const chrome = [process.env.CHROME_PATH, "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome"].find((p) => p && existsSync(p));
const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: process.env.CI ? ["--no-sandbox"] : [] });
const results = [];
for (const [name, w, h, mobile] of [["桌機", 1440, 900, false], ["手機", 375, 812, true]]) {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setRequestInterception(true);
  page.on("request", (r) => (/^https?:/.test(r.url()) ? r.abort() : r.continue()));
  await page.setViewport({ width: w, height: h, isMobile: mobile, hasTouch: mobile });
  await page.goto(file, { waitUntil: "load" });
  const before = await page.evaluate(() => document.documentElement.classList.contains("intro-open"));
  await page.click("#intro-skip");
  await new Promise((r) => setTimeout(r, 1000));
  const r = await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += innerHeight) { scrollTo(0, y); await new Promise((res) => setTimeout(res, 40)); }
    const imgs = [...document.querySelectorAll(".scene__figure img")];
    await Promise.all(imgs.map((i) => { i.loading = "eager"; return i.decode().catch(() => {}); }));
    return {
      introClosed: !document.documentElement.classList.contains("intro-open"),
      images: imgs.filter((i) => i.complete && i.naturalWidth > 0).length,
      alts: imgs.filter((i) => i.alt.length > 10).length,
      aiTags: document.querySelectorAll(".scene__figure .ai-tag").length,
      overflow: document.documentElement.scrollWidth > innerWidth,
      footer: document.querySelector(".colophon")?.textContent.includes("本作品圖像由 AI 生成，情境為虛構"),
      clock: document.querySelector(".rail__clock")?.textContent,
    };
  });
  results.push({ name, introShown: before, ...r, errors });
  await page.close();
}
await browser.close();
let ok = true;
for (const r of results) {
  const pass = r.introShown && r.introClosed && r.images === 6 && r.alts === 6 && r.aiTags === 6 && !r.overflow && r.footer && !r.errors.length;
  ok &&= pass;
  console.log(`${pass ? "✓" : "✗"} 離線・${r.name}：開場${r.introShown ? "有播放" : "未播放"}、略過${r.introClosed ? "成功" : "失敗"}、圖片 ${r.images}/6、alt ${r.alts}/6、AI 標註 ${r.aiTags}/6、橫向捲動${r.overflow ? "有" : "無"}、頁尾聲明${r.footer ? "有" : "缺"}、捲到底時鐘 ${r.clock}、JS 錯誤 ${r.errors.length}`);
}
process.exit(ok ? 0 : 1);
