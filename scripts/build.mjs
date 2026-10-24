// 從 content/ 產生單一檔案的網頁手冊 web/index.html（圖片、動畫、腳本全部內嵌）。
// 用法：node scripts/build.mjs
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { marked } from "marked";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const root = new URL("..", import.meta.url);
const path = (p) => new URL(p, root);
const read = (p) => readFileSync(path(p), "utf8");
const readPkg = (p) => readFileSync(require.resolve(p), "utf8");

const data = JSON.parse(read("content/scenes.json"));
const scenes = data.scenes;

// 每幕的光與構圖：地色、光源跟著劇情走，圖的大小與位置跟著光變
const STAGE = {
  "scene-01": { light: "phone", layout: "inset-right" },  // 00:00 手機螢幕的冷光
  "scene-02": { light: "deep", layout: "side" },          // 03:00 最暗的時刻，圖退到黑暗裡
  "scene-03": { light: "overcast", layout: "wide" },      // 08:00 陰天清晨
  "scene-04": { light: "overcast", layout: "inset-left" }, // 14:00 陰天午後
  "scene-05": { light: "lantern", layout: "wide" },       // 20:00 露營燈
  "scene-06": { light: "dawn", layout: "bleed" },         // 48:00 燈亮了
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const hourOf = (t) => Number(t.split(":")[0]) + Number(t.split(":")[1]) / 60;

// 連結文字的最後兩個字和外部連結圖示綁在一起，避免圖示單獨換行
const linkText = (title) => {
  const chars = [...title];
  return `${esc(chars.slice(0, -2).join(""))}<span class="nowrap">${esc(chars.slice(-2).join(""))}${icon("external-link")}</span>`;
};

// Lucide 圖示，內嵌為 SVG
function icon(name) {
  const svg = readPkg(`lucide-static/icons/${name}.svg`)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\s(width|height)="24"/g, "")
    .replace(/class="[^"]*"/, `class="icon icon-${name}"`)
    .replace("<svg", '<svg aria-hidden="true" focusable="false"');
  return svg.trim().replace(/\n\s*/g, "");
}

// 水彩圖四周的白色紙邊：找出畫面實際上色的範圍，再往內裁掉不規則的毛邊，
// 讓 6 張圖都是乾淨的矩形（第 3 幕本來就沒有紙邊）。
async function cropPaperMargin(input) {
  const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const light = (x, y) => {
    const i = (y * w + x) * 3;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    return r > 225 && g > 220 && b > 205;
  };
  const colLight = (x) => { let n = 0; for (let y = 0; y < h; y += 4) n += light(x, y); return n / Math.ceil(h / 4); };
  const rowLight = (y) => { let n = 0; for (let x = 0; x < w; x += 4) n += light(x, y); return n / Math.ceil(w / 4); };
  let left = 0, right = w - 1, top = 0, bottom = h - 1;
  while (left < w / 4 && colLight(left) > 0.35) left++;
  while (right > (w * 3) / 4 && colLight(right) > 0.35) right--;
  while (top < h / 4 && rowLight(top) > 0.35) top++;
  while (bottom > (h * 3) / 4 && rowLight(bottom) > 0.35) bottom--;
  const hadMargin = left + (w - 1 - right) + top + (h - 1 - bottom) > 8;
  // 毛邊大約深入 2%，再往內裁一點
  const inset = hadMargin ? Math.round(w * 0.022) : 0;
  const box = { left: left + inset, top: top + inset, width: right - left + 1 - inset * 2, height: bottom - top + 1 - inset * 2 };
  const plate = sharp(input).extract(box).resize(1920, 1072, { fit: "cover" });
  const buffer = await plate.clone().webp({ quality: 80 }).toBuffer();
  // PDF 用 JPEG：Chrome 會原樣嵌入 JPEG，WebP 則會被轉成無損格式，檔案大很多
  const jpeg = await plate.clone().jpeg({ quality: 84, mozjpeg: true }).toBuffer();
  return { buffer, jpeg, cropped: hadMargin };
}

// 圖片：去掉紙邊、統一成 1920 × 1072 的 WebP 後以 base64 內嵌
async function embedImage(file) {
  const { buffer, jpeg, cropped } = await cropPaperMargin(readFileSync(path(file)));
  return { src: `data:image/webp;base64,${buffer.toString("base64")}`, printSrc: `data:image/jpeg;base64,${jpeg.toString("base64")}`, bytes: buffer.length, cropped };
}

// 開場 SVG：把它內部的 class、id、keyframes 加上前綴，避免和頁面樣式互相干擾
function introSvg() {
  let svg = read("motion/intro.svg");
  const classes = ["sky", "flash", "hero", "halo", "nosvc", "t1", "t2", "t3", "ui"];
  const frames = ["flick", "cut", "dim", "flash", "fadein", "appear", "pulse", "bar"];
  for (const k of frames) svg = svg.replace(new RegExp(`(@keyframes |animation:)${k}\\b`, "g"), `$1iv-k-${k}`);
  for (const c of classes) svg = svg.replace(new RegExp(`\\.${c}\\{`, "g"), `.iv-${c}{`);
  svg = svg.replace(/class="([^"]+)"/g, (_, list) => `class="${list.split(/\s+/).map((c) => (classes.includes(c) ? `iv-${c}` : c)).join(" ")}"`);
  for (const id of ["glow", "sky"]) {
    svg = svg.replace(new RegExp(`id="${id}"`, "g"), `id="iv-${id}"`).replace(new RegExp(`url\\(#${id}\\)`, "g"), `url(#iv-${id})`);
  }
  svg = svg.replace(/\btext\{/g, "#intro-svg text{").replace(/\.iv-ui\{/g, "#intro-svg .iv-ui{");
  svg = svg.replace(/font-family:"Noto Serif TC"[^}]*\}/, "font-family:var(--font-display)}").replace(/font-family:"Noto Sans TC"[^}]*\}/, "font-family:var(--font-body)}");
  svg = svg.replace(/^<\?xml[^>]*>\s*/, "").replace("<svg ", '<svg id="intro-svg" ');
  return svg;
}

// Markdown 轉 HTML：去掉檔案自己的 H1，其餘標題降一級，接在段落的 H2 之下
const md = (p) => marked.parse(read(p).replace(/^#\s.*\n/, "").trim())
  .replace(/<(\/?)h([2-5])>/g, (_, slash, n) => `<${slash}h${Number(n) + 1}>`)
  .replace(/<!--[\s\S]*?-->\s*/g, "");

// 參考資料：合併各幕引用的來源
function collectSources() {
  const map = new Map();
  scenes.forEach((s, i) => {
    for (const src of s.sources) {
      if (!map.has(src.url)) map.set(src.url, { ...src, uses: [] });
      map.get(src.url).uses.push({ n: i + 1, pages: src.pages });
    }
  });
  return [...map.values()];
}

function sceneHtml(s, i, img) {
  const n = i + 1;
  const { light, layout } = STAGE[s.id];
  const sources = s.sources.map((src) => `
          <li><a href="${esc(src.url)}" target="_blank" rel="noopener">${linkText(src.title)}</a>${src.pages ? `<small>${esc(src.pages)}</small>` : ""}</li>`).join("");
  return `
  <section class="scene scene--${layout}${n % 2 === 0 ? " scene--flip" : ""}" id="${s.id}" data-light="${light}" data-hour="${hourOf(s.time)}" data-title="${esc(s.title)}" aria-labelledby="${s.id}-title">
    <div class="wrap scene__layout">
      <header class="scene__head">
        <h2 id="${s.id}-title"><time class="scene__time" datetime="PT${Math.floor(hourOf(s.time))}H">${esc(s.time)}</time><span class="scene__title">${esc(s.title)}</span></h2>
        <dl class="scene__pillar"><div><dt>幕次</dt><dd>第 ${n} 幕</dd></div><div><dt>全民國防面向</dt><dd>${esc(s.pillar)}</dd></div></dl>
      </header>
      <figure class="scene__figure">
        <img src="${img.src}" alt="${esc(s.image_alt)}" width="1920" height="1072" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
        <span class="ai-tag">AI 生成</span>
      </figure>
      <p class="scene__narration">${esc(s.narration)}</p>
      <div class="scene__aside">
          <section class="note" aria-labelledby="${s.id}-note">
            <div class="note__head">${icon("lightbulb")}<h3 id="${s.id}-note">策展註解</h3></div>
            <p>${esc(s.curator_note)}</p>
          </section>
          <section class="sources" aria-labelledby="${s.id}-src">
            <div class="sources__head">${icon("book-open")}<h3 id="${s.id}-src">來源</h3></div>
            <ul>${sources}
            </ul>
          </section>
      </div>
    </div>
  </section>`;
}

async function build() {
  const css = ["web/src/tokens.css", "web/src/base.css", "web/src/page.css"].map(read);
  // Hallmark 的版記（page.css 開頭的註解區塊）要在樣式表最前面
  const stampEnd = css[2].indexOf("\n\n");
  const stylesheet = [css[2].slice(0, stampEnd), css[0], css[1], css[2].slice(stampEnd)].join("\n");

  const images = [];
  for (const s of scenes) images.push(await embedImage(s.image));

  const intro = md("content/intro.md");
  const reflection = md("content/reflection.md");
  const statementPath = "content/ai-statement.md";
  const statement = existsSync(path(statementPath))
    ? md(statementPath)
    : `<p class="pending">AI 使用聲明撰寫中，繳交前補上。</p>`; // TODO: A8 撰寫 content/ai-statement.md
  const checked = (read("research/sources.md").match(/查核日期：(\S+)/) || [])[1];
  const refs = collectSources();

  const stops = scenes.map((s) => {
    const at = (hourOf(s.time) / 48) * 100;
    return `
        <li class="rail__stop" style="--at: ${at.toFixed(3)}%"><a href="#${s.id}"><span class="visually-hidden">第 ${scenes.indexOf(s) + 1} 幕 </span><time>${esc(s.time)}</time><span class="visually-hidden"> ${esc(s.title)}</span></a></li>`;
  }).join("");

  const timetable = scenes.map((s) => `
            <li><a href="#${s.id}"><time>${esc(s.time)}</time><strong>${esc(s.title)}</strong><small>${esc(s.pillar)}</small></a></li>`).join("");

  const refList = refs.map((r) => `
          <li><a href="${esc(r.url)}" target="_blank" rel="noopener">${linkText(r.title)}</a><small>引用於${r.uses.map((u) => `第 ${u.n} 幕${u.pages ? `（${esc(u.pages)}）` : ""}`).join("、")}</small><small>${esc(r.url)}</small></li>`).join("");

  const gsapJs = readPkg("gsap/dist/gsap.min.js");
  const stJs = readPkg("gsap/dist/ScrollTrigger.min.js");
  const appJs = read("web/src/app.js");

  const html = `<!doctype html>
<html lang="zh-Hant-TW">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(data.title)}｜斷線 48 小時</title>
<meta name="description" content="一位大學生在原因不明的停電與斷網中度過 48 小時：6 幕 AI 圖文策展，對照全民安全指引的準備方法。">
<meta name="color-scheme" content="dark light">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&family=Noto+Serif+TC:wght@700&display=swap">
<style>
${stylesheet}
</style>
</head>
<body>
<div class="ground" aria-hidden="true">${["dusk", "phone", "deep", "overcast", "lantern", "dawn", "day"].map((l) => `
  <div class="ground__layer" data-layer="${l}" data-light="${l}"></div>`).join("")}
</div>

<section class="intro" id="intro" data-light="void" aria-label="開場動畫">
  <div class="intro__frame">
${introSvg()}
  </div>
  <div class="intro__bar">
    <div class="intro__progress" aria-hidden="true"><span id="intro-progress"></span></div>
    <a class="btn btn--quiet" id="intro-skip" href="#cover">${icon("skip-forward")}略過開場</a>
  </div>
</section>

<nav class="rail" aria-label="時間軸">
  <p class="rail__clock" aria-hidden="true">00:00</p>
  <p class="rail__now" aria-hidden="true">停電之前</p>
  <div class="rail__track">
    <span class="rail__line" aria-hidden="true"></span>
    <span class="rail__fill" aria-hidden="true"></span>
    <span class="rail__cursor" aria-hidden="true"></span>
    <ol class="rail__stops">${stops}
    </ol>
  </div>
</nav>

<div class="page">
  <main>
    <header class="cover" id="cover" data-light="dusk">
      <div class="wrap">
        <div class="cover__main">
          <h1 id="cover-title" tabindex="-1"><span>平常的一天，</span><span>不平常的 48 小時</span></h1>
          <p class="cover__lede">一位大學生，在原因不明的停電與斷網裡度過 48 小時。</p>
          <p class="cover__actions"><a class="start" href="#scene-01">從 00:00 開始讀</a></p>
        </div>
        <p class="cover__byline">《斷線 48 小時》全民國防導論期中創作<br>國立臺灣師範大學 王修佑，2026 年 10 月</p>
      </div>
    </header>

    <section class="preface" id="preface" data-light="dusk" aria-labelledby="preface-title">
      <div class="wrap preface__grid">
        <div>
          <h2 id="preface-title">策展前言</h2>
          <div class="prose">${intro}</div>
        </div>
        <div>
          <h3 class="timetable__head">六個時刻</h3>
          <ol class="timetable">${timetable}
          </ol>
        </div>
      </div>
    </section>
${scenes.map((s, i) => sceneHtml(s, i, images[i])).join("\n")}

    <section class="closing" id="reflection" data-light="day" aria-labelledby="reflection-title">
      <div class="wrap closing__grid">
        <h2 id="reflection-title">個人反思</h2>
        <div class="prose">${reflection}</div>
      </div>
    </section>

    <section class="closing closing--quiet" id="ai-statement" data-light="day" aria-labelledby="ai-title">
      <div class="wrap closing__grid">
        <h2 id="ai-title">AI 使用聲明</h2>
        <div class="prose">${statement}</div>
      </div>
    </section>

    <section class="closing closing--quiet" id="references" data-light="day" aria-labelledby="refs-title">
      <div class="wrap closing__grid">
        <h2 id="refs-title">參考資料</h2>
        <div>
          <ol class="refs">${refList}
          </ol>
          ${checked ? `<p class="refs__checked">連結查核日期：${esc(checked)}</p>` : ""}
        </div>
      </div>
    </section>
  </main>

  <footer class="colophon" data-light="day">
    <div class="wrap">
      <div class="colophon__inner">
        <strong>本作品圖像由 AI 生成，情境為虛構。</strong>
        <p>${esc(data.title)}，《斷線 48 小時》全民國防導論期中創作（${esc(data.version)}），國立臺灣師範大學 王修佑。圖像：Google Gemini；文字協作：Claude。</p>
        <p>字體 Noto Serif TC、Noto Sans TC（SIL Open Font License），動畫 GSAP，圖示 Lucide。</p>
        <p><a href="handbook.pdf">下載 PDF 版（A4 橫式）</a></p>
      </div>
    </div>
  </footer>
</div>

<script>${gsapJs}</script>
<script>${stJs}</script>
<script>${appJs}</script>
</body>
</html>
`;

  mkdirSync(path("web"), { recursive: true });
  writeFileSync(path("web/index.html"), html);
  const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
  console.log(`✓ web/index.html ${kb(Buffer.byteLength(html))}（圖片 ${images.map((im) => `${kb(im.bytes)}${im.cropped ? "，已裁紙邊" : ""}`).join("、")}）`);

  const print = printHtml({ images, intro, reflection, statement, refs, checked });
  mkdirSync(path(".cache/print"), { recursive: true });
  writeFileSync(path(".cache/print/handbook.html"), print);
  console.log("✓ .cache/print/handbook.html（PDF 版面，交給 scripts/pdf.mjs 輸出）");
}

// ───────── A7：A4 橫式 PDF 的版面，內容與網頁相同 ─────────
function printHtml({ images, intro, reflection, statement, refs, checked }) {
  const total = scenes.length + 5;
  const folio = (n) => `<footer class="folio">本作品圖像由 AI 生成，情境為虛構。<span>${n} / ${total}</span></footer>`;
  const hours = scenes.map((s) => hourOf(s.time));

  const strip = (i) => `<div class="strip" aria-hidden="true"><b style="width: ${((hours[i] / 48) * 100).toFixed(2)}%"></b>${hours
    .map((h, j) => `<i class="${j < i ? "past" : j === i ? "now" : ""}" style="left: ${((h / 48) * 100).toFixed(2)}%"></i>`).join("")}</div>`;

  const sceneSheet = (s, i) => {
    const { light } = STAGE[s.id];
    const sources = s.sources.map((src) => `<li><a href="${esc(src.url)}">${linkText(src.title)}</a>${src.pages ? `<small>${esc(src.pages)}</small>` : ""}</li>`).join("");
    return `
<section class="sheet sheet--scene" data-light="${light}">
  <div class="body">
    ${strip(i)}
    <header class="s-head" style="grid-row: 2"><time>${esc(s.time)}</time><h2>${esc(s.title)}</h2></header>
    <figure><img src="${images[i].printSrc}" alt="${esc(s.image_alt)}"><span class="ai-tag">AI 生成</span></figure>
    <div class="s-text">
      <p class="s-meta">第 ${i + 1} 幕<br>全民國防面向　<b>${esc(s.pillar)}</b></p>
      <p class="narration">${esc(s.narration)}</p>
      <div class="note"><h3>${icon("lightbulb")}策展註解</h3><p>${esc(s.curator_note)}</p></div>
      <div class="sources"><h3>${icon("book-open")}來源</h3><ul>${sources}</ul></div>
    </div>
  </div>
  ${folio(i + 3)}
</section>`;
  };

  const css = ["web/src/tokens.css", "web/src/print.css"].map(read).join("\n");
  return `<!doctype html>
<html lang="zh-Hant-TW">
<head>
<meta charset="utf-8">
<title>${esc(data.title)}｜斷線 48 小時</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&family=Noto+Serif+TC:wght@700&display=block">
<style>
${css}
</style>
</head>
<body>
<section class="sheet sheet--cover" data-light="dusk">
  <div class="cover-art">${introSvg()}</div>
  <div class="cover-meta">
    <p>一位大學生，在原因不明的停電與斷網裡度過 48 小時。</p>
    <p>《斷線 48 小時》全民國防導論期中創作<br>國立臺灣師範大學 王修佑，2026 年 10 月</p>
  </div>
</section>

<section class="sheet sheet--preface" data-light="dusk">
  <div class="body">
    <div><h2>策展前言</h2><div class="prose">${intro}</div></div>
    <div><h3 class="toc-head">六個時刻</h3><ol class="timetable">${scenes.map((s, i) => `<li><time>${esc(s.time)}</time><strong>${esc(s.title)}</strong><small>第 ${i + 3} 頁，${esc(s.pillar)}</small></li>`).join("")}</ol></div>
  </div>
  ${folio(2)}
</section>
${scenes.map(sceneSheet).join("\n")}

<section class="sheet sheet--closing" data-light="day">
  <div class="body"><h2>個人反思</h2><div class="prose">${reflection}</div></div>
  ${folio(scenes.length + 3)}
</section>

<section class="sheet sheet--closing sheet--statement" data-light="day">
  <div class="body"><h2>AI 使用聲明</h2><div class="prose">${statement}</div></div>
  ${folio(scenes.length + 4)}
</section>

<section class="sheet sheet--closing" data-light="day">
  <div class="body">
    <h2>參考資料</h2>
    <div>
      <ol class="refs">${refs.map((r) => `<li><a href="${esc(r.url)}">${linkText(r.title)}</a><small>引用於${r.uses.map((u) => `第 ${u.n} 幕${u.pages ? `（${esc(u.pages)}）` : ""}`).join("、")}</small><small>${esc(r.url)}</small></li>`).join("")}</ol>
      <div class="colophon">
        <strong>本作品圖像由 AI 生成，情境為虛構。</strong>
        <span>${esc(data.title)}，《斷線 48 小時》全民國防導論期中創作（${esc(data.version)}），國立臺灣師範大學 王修佑。</span>
        <span>圖像：Google Gemini；文字協作：Claude。字體 Noto Serif TC、Noto Sans TC（SIL Open Font License），圖示 Lucide。${checked ? `連結查核日期：${esc(checked)}。` : ""}</span>
        <span>網頁版內容與本 PDF 相同，另含 10 秒開場動畫與捲動時間軸。</span>
      </div>
    </div>
  </div>
  ${folio(scenes.length + 5)}
</section>
</body>
</html>
`;
}

await build();
