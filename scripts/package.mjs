// A8：把繳交檔複製到 output/submission/。Cloudflare Workers 直接發布這個資料夾（見 wrangler.jsonc）。
import { copyFileSync, mkdirSync, rmSync, statSync } from "node:fs";

const root = new URL("..", import.meta.url);
const files = [["web/index.html", "index.html"], ["output/handbook.pdf", "handbook.pdf"]];
for (const dir of ["output/submission/"]) {
  rmSync(new URL(dir, root), { recursive: true, force: true });
  mkdirSync(new URL(dir, root), { recursive: true });
  for (const [from, to] of files) copyFileSync(new URL(from, root), new URL(dir + to, root));
}
for (const [, to] of files) {
  const mb = statSync(new URL(`output/submission/${to}`, root)).size / 1024 / 1024;
  console.log(`✓ output/submission/${to} ${mb.toFixed(2)} MB`);
}
