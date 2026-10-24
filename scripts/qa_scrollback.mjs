// 檢查往上捲時，光層會不會閃出不屬於目前或上一段的亮色（例如米白閃現在夜藍段落上）。
import { existsSync } from "node:fs";
import puppeteer from "puppeteer-core";

const file = new URL("../web/index.html", import.meta.url).href + "#cover";
const chrome = [process.env.CHROME_PATH, "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome"].find((p) => p && existsSync(p));
const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: process.env.CI ? ["--no-sandbox"] : [] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(file, { waitUntil: "load" });
const bad = await page.evaluate(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const layers = [...document.querySelectorAll(".ground__layer")];
  // 先往下捲到底，再以不同速度往上捲回封面
  for (let y = 0; y < document.body.scrollHeight; y += 300) { scrollTo(0, y); await sleep(30); }
  await sleep(1500);
  const problems = [];
  let last = document.documentElement.dataset.now, before = last;
  for (const step of [90, 400, 1200]) {
    for (let y = document.body.scrollHeight; y > 0; y -= step) {
      scrollTo(0, y);
      await sleep(40);
      // 畫面上真正看得到的是 z-index 最高、不透明度最高的那一層
      const visible = layers
        .map((l, i) => ({ l: l.dataset.layer, o: +getComputedStyle(l).opacity, z: +getComputedStyle(l).zIndex || 0, i }))
        .filter((v) => v.o > 0.4)
        .sort((a, b) => b.z - a.z || b.i - a.i)[0];
      const want = document.documentElement.dataset.now;
      if (want !== last) { before = last; last = want; }
      // 交叉淡入期間看得到上一段的光是正常的；其他段落的光出現才是閃現
      if (visible && visible.l !== want && visible.l !== before) problems.push(`${step}px 步進 y=${y}：應為 ${want}（上一段 ${before}），畫面是 ${visible.l}`);
    }
    for (let y = 0; y < document.body.scrollHeight; y += 300) { scrollTo(0, y); await sleep(30); }
    await sleep(1500);
  }
  return problems;
});
await browser.close();
console.log(bad.length ? `✗ 往上捲時光層錯誤 ${bad.length} 次\n${bad.slice(0, 12).join("\n")}` : "✓ 往上捲時光層都正確");
process.exit(bad.length ? 1 : 0);
