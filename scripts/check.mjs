// 內容檢查（brief 第 6 節中可自動化的項目）。CI 與本機共用：node scripts/check.mjs
import { readFileSync, existsSync } from "node:fs";

const root = new URL("..", import.meta.url);
const read = (p) => readFileSync(new URL(p, root), "utf8");
const errors = [];
const fail = (msg) => errors.push(msg);

// 字數：含標點、不含空白
const count = (t) => [...t.replace(/\s/g, "")].length;

const { scenes } = JSON.parse(read("content/scenes.json"));
if (scenes.length !== 6) fail(`scenes.json 應有 6 幕，實際 ${scenes.length}`);

// 不指名國家、不用恐嚇字眼
const banned = ["中國", "中共", "解放軍", "美國", "日本", "俄羅斯", "敵軍", "入侵", "轟炸", "飛彈", "戰爭爆發", "死亡", "末日"];
const textFiles = ["content/intro.md", "content/reflection.md", "content/ai-statement.md"];

for (const s of scenes) {
  const n = count(s.narration);
  const c = count(s.curator_note);
  if (n < 100 || n > 150) fail(`${s.id} 旁白 ${n} 字，應為 100–150`);
  if (c < 50 || c > 80) fail(`${s.id} 策展註解 ${c} 字，應為 50–80`);
  if (!/我/.test(s.narration)) fail(`${s.id} 旁白不是第一人稱`);
  if (!s.image_alt) fail(`${s.id} 缺 image_alt`);
  if (!existsSync(new URL(s.image, root))) fail(`${s.id} 找不到圖檔 ${s.image}`);
  if (!s.sources?.length) fail(`${s.id} 沒有來源`);
  for (const src of s.sources ?? []) {
    if (!/^https:\/\//.test(src.url)) fail(`${s.id} 來源不是 https：${src.url}`);
  }
  for (const w of banned) {
    if (`${s.narration}${s.curator_note}${s.title}`.includes(w)) fail(`${s.id} 出現禁用詞「${w}」`);
  }
}
for (const f of textFiles) {
  const t = read(f);
  for (const w of banned) if (t.includes(w)) fail(`${f} 出現禁用詞「${w}」`);
}

// AI 使用聲明：工具、用途、提示詞範例
const statement = existsSync(new URL("content/ai-statement.md", root)) ? read("content/ai-statement.md") : "";
if (!statement) fail("缺 content/ai-statement.md");
for (const w of ["Claude", "Gemini", "提示詞範例"]) if (statement && !statement.includes(w)) fail(`AI 使用聲明缺「${w}」`);

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log(`✓ 內容檢查通過（${scenes.length} 幕）`);
