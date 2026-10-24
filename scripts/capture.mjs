// 截取網頁手冊的整頁畫面（桌機與手機），供設計審查使用。
// 用法：node scripts/capture.mjs <url> <輸出資料夾>
import puppeteer from "puppeteer-core";
import sharp from "sharp";

const [url = "http://localhost:4848/index.html", out = ".impeccable/review"] = process.argv.slice(2);
const chrome = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: process.env.CI ? ["--no-sandbox"] : [] });

for (const [name, w, h, mobile] of [["desktop", 1440, 900, false], ["mobile", 390, 844, true]]) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
  // 減少動態：跳過開場、圖片直接是點亮後的狀態
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    for (let y = 0; y < document.body.scrollHeight; y += innerHeight / 2) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
    scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: `${out}/${name}-fold.png` });
  // 整頁截圖時，固定的光層只會顯示一種顏色；改由各段落自己畫地色
  await page.addStyleTag({ content: ".js [data-light]:not(.ground__layer){background:var(--ground)!important}.ground{display:none!important}" });
  await page.screenshot({ path: `${out}/${name}.png`, fullPage: true });
  await page.close();
  // 切成數段，方便逐段檢視
  const full = sharp(`${out}/${name}.png`);
  const { height } = await full.metadata();
  const step = mobile ? 2400 : 1800;
  for (let i = 0, top = 0; top < height; i++, top += step) {
    await sharp(`${out}/${name}.png`).extract({ left: 0, top, width: w, height: Math.min(step, height - top) }).toFile(`${out}/${name}-part${i + 1}.png`);
  }
}
await browser.close();
console.log(`✓ screenshots in ${out}`);
