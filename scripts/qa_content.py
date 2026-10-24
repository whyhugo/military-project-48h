"""A8 檢查：網頁與 PDF 是否包含與內容檔完全相同的文字。
用法：uv run --no-project --with pypdfium2 python -I scripts/qa_content.py
"""
import html
import json
import re
import sys
from pathlib import Path

import pypdfium2 as pdfium

root = Path(__file__).resolve().parent.parent
squash = lambda t: re.sub(r"\s+", "", t)


def md_paragraphs(path):
    text = (root / path).read_text(encoding="utf-8")
    text = re.sub(r"<!--.*?-->", "", text, flags=re.S)
    out = []
    for block in re.split(r"\n\s*\n", text):
        block = block.strip()
        if not block or block.startswith("#"):
            continue
        block = re.sub(r"^[-*>]\s*", "", block, flags=re.M)
        block = re.sub(r"[*_`]", "", block)
        out.append(squash(block))
    return out


scenes = json.loads((root / "content/scenes.json").read_text(encoding="utf-8"))["scenes"]
expected = {}
for s in scenes:
    expected[f"{s['id']} 旁白"] = squash(s["narration"])
    expected[f"{s['id']} 註解"] = squash(s["curator_note"])
    expected[f"{s['id']} 替代文字"] = squash(s["image_alt"])
for name in ["intro", "reflection", "ai-statement"]:
    for i, p in enumerate(md_paragraphs(f"content/{name}.md")):
        expected[f"{name}.md 第 {i + 1} 段"] = p

web = html.unescape(re.sub(r"<[^>]+>", "", (root / "web/index.html").read_text(encoding="utf-8")))
web_alts = "".join(html.unescape(a) for a in re.findall(r'alt="([^"]*)"', (root / "web/index.html").read_text(encoding="utf-8")))
web = squash(web + web_alts)

pdf = pdfium.PdfDocument(str(root / "output/handbook.pdf"))
pdf_text = squash("".join(pdf[i].get_textpage().get_text_range() for i in range(len(pdf))))

failed = 0
for label, text in expected.items():
    in_web = text in web
    # PDF 的替代文字不會出現在文字層，略過
    in_pdf = text in pdf_text or "替代文字" in label
    if not (in_web and in_pdf):
        failed += 1
        print(f"✗ {label}：網頁 {'有' if in_web else '缺'}、PDF {'有' if in_pdf else '缺'}")
print(f"{'✓' if not failed else '✗'} 內容一致性：{len(expected) - failed}/{len(expected)} 段文字在網頁與 PDF 中逐字相符（PDF {len(pdf)} 頁）")
sys.exit(1 if failed else 0)
