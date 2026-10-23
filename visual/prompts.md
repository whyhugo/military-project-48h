# 視覺提示詞（A3）

給 A0 轉介到 Gemini 使用。共 7 段：先做角色立繪，再做 6 幕。

## 使用步驟

1. 先貼「第 0 段：角色立繪」，生成 3–4 張，挑一張最順眼的，存成 `character.png`。
2. 之後每一幕：**上傳 `character.png` 當參考圖**，再貼該幕的完整 prompt，並加一句「請參考上傳圖片中的人物外型，保持同一個角色」。
3. 每幕生成至少 3 版，全部下載，依命名規則存檔：
   - `scene-01-v1.png`、`scene-01-v2.png`、`scene-01-v3.png` …
   - 選圖由 Claude Code 處理，你不用挑。
4. 若 Gemini 在圖中畫出文字或亂碼，追加一句「Remove all text and letters from the image」重新生成。
5. 全部圖片放進 `visual/images/`，交回 Claude Code。

每段 prompt 都已經包含角色、畫風與負面描述，**整段直接複製貼上即可**。

---

## 第 0 段：角色立繪（character.png）

```
Character reference sheet of a Taiwanese university student, about 20 years old, short black hair, round glasses, wearing a grey hoodie and carrying a black backpack, calm but slightly worried expression. Full body, front view and three-quarter view side by side, standing against a plain warm cream background.
Style: warm watercolor picture-book illustration, soft lighting, muted low-saturation palette with deep navy and candle-orange accents, gentle and hopeful mood, 16:9 wide composition, no text, no letters, no logos.
Avoid: no weapons, no soldiers, no military vehicles, no flags, no explosions, no blood, no injuries shown graphically, no real landmarks, no text.
```

---

## 第 1 幕 00:00 燈，全滅了

中文說明：深夜宿舍突然停電，主角坐在書桌前，只有手機照亮臉。

```
Scene: midnight in a small university dorm room during a sudden blackout. A Taiwanese university student, about 20 years old, short black hair, round glasses, grey hoodie, sits at a desk beside a laptop whose screen has just gone dark, holding a phone whose small glow lights up their face. A roommate's silhouette sits on a bunk bed in the background. The room is almost completely dark except for the phone light.
Style: warm watercolor picture-book illustration, soft lighting, muted low-saturation palette with deep navy and candle-orange accents, gentle and hopeful mood, 16:9 wide composition, no text, no letters, no logos.
Avoid: no weapons, no soldiers, no military vehicles, no flags, no explosions, no blood, no injuries shown graphically, no real landmarks, no text.
```

## 第 2 幕 03:00 一則來源不明的緊急通知

中文說明：凌晨主角裹著棉被盯著手機，拇指停在螢幕上，猶豫要不要轉傳。

```
Scene: 3 a.m. in a dark dorm room. A Taiwanese university student, about 20 years old, short black hair, round glasses, grey hoodie, sits on a bed wrapped in a blanket, staring anxiously at a glowing phone that shows a chat app with blank message bubbles (no readable text). Their thumb hovers just above the screen, hesitating. Cold blue phone light on the face, the rest of the room in deep navy shadow, tense and quiet mood.
Style: warm watercolor picture-book illustration, soft lighting, muted low-saturation palette with deep navy and candle-orange accents, gentle and hopeful mood, 16:9 wide composition, no text, no letters, no logos.
Avoid: no weapons, no soldiers, no military vehicles, no flags, no explosions, no blood, no injuries shown graphically, no real landmarks, no text.
```

## 第 3 幕 08:00 架上的最後一箱水

中文說明：清晨超商外大排長龍，貨架幾乎空了，主角拿著兩瓶水，回頭看抱小孩的婦人。

```
Scene: early morning outside a small Taiwanese convenience store under a covered arcade walkway, with a long queue of ordinary people of different ages. Through the store window, shelves of bottled water and instant noodles are almost empty. A Taiwanese university student, about 20 years old, short black hair, round glasses, grey hoodie, holds two bottles of water and three packs of instant noodles, glancing back at a mother holding a small child in the queue behind them. Soft grey morning light. All shop signs are blank.
Style: warm watercolor picture-book illustration, soft lighting, muted low-saturation palette with deep navy and candle-orange accents, gentle and hopeful mood, 16:9 wide composition, no text, no letters, no logos.
Avoid: no weapons, no soldiers, no military vehicles, no flags, no explosions, no blood, no injuries shown graphically, no real landmarks, no text.
```

## 第 4 幕 14:00 關著門的診所

中文說明：主角和按著手臂的室友站在拉下鐵門的診所前，手裡拿著幾乎空的急救盒。

```
Scene: an overcast afternoon on a quiet Taiwanese street. A Taiwanese university student, about 20 years old, short black hair, round glasses, grey hoodie, stands with a roommate in front of a small neighborhood clinic whose metal roll-up shutter is closed. The roommate presses a folded cloth against their forearm (no visible blood or wound). The student holds a small, nearly empty first-aid box and looks worried. The clinic sign is blank.
Style: warm watercolor picture-book illustration, soft lighting, muted low-saturation palette with deep navy and candle-orange accents, gentle and hopeful mood, 16:9 wide composition, no text, no letters, no logos.
Avoid: no weapons, no soldiers, no military vehicles, no flags, no explosions, no blood, no injuries shown graphically, no real landmarks, no text.
```

## 第 5 幕 20:00 里辦公處前的燈光

中文說明：夜晚里辦公處前點著露營燈，鄰居分裝物資，阿伯把寫字板遞給主角。

```
Scene: evening in front of a small neighborhood community office in Taiwan, lit by several camping lanterns. Neighbors of different ages sort bottled water, folded blankets and batteries into neat piles on folding tables. A friendly elderly man hands a clipboard to a Taiwanese university student, about 20 years old, short black hair, round glasses, grey hoodie, who looks surprised but ready to help. Warm candle-orange lantern glow against a deep navy evening sky, cooperative and hopeful mood.
Style: warm watercolor picture-book illustration, soft lighting, muted low-saturation palette with deep navy and candle-orange accents, gentle and hopeful mood, 16:9 wide composition, no text, no letters, no logos.
Avoid: no weapons, no soldiers, no military vehicles, no flags, no explosions, no blood, no injuries shown graphically, no real landmarks, no text.
```

## 第 6 幕 48:00 燈亮了以後

中文說明：清晨電力恢復，主角站在宿舍窗邊看著跳出許多通知的手機，神情放鬆。

```
Scene: early morning in a dorm room as the power comes back on. A Taiwanese university student, about 20 years old, short black hair, round glasses, grey hoodie, stands by the window holding a phone covered in notification badges (no readable text), with a relieved and thoughtful expression. Soft sunrise light streams in and mixes with warm indoor light; small green plants on the windowsill. Calm, reflective, hopeful mood.
Style: warm watercolor picture-book illustration, soft lighting, muted low-saturation palette with deep navy and candle-orange accents, gentle and hopeful mood, 16:9 wide composition, no text, no letters, no logos.
Avoid: no weapons, no soldiers, no military vehicles, no flags, no explosions, no blood, no injuries shown graphically, no real landmarks, no text.
```
