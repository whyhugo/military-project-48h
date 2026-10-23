// 《平常的一天，不平常的 48 小時》網頁手冊的互動：開場動畫、時間軸、光的轉換。
// 沒有 JS 時頁面照樣完整可讀；這裡只負責加上動態。
(() => {
  const root = document.documentElement;
  root.classList.add("js");
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const TOTAL_HOURS = 48;
  const INTRO_SECONDS = 10;

  // ───────── 開場：10 秒後自動進入，可略過 ─────────
  const intro = document.getElementById("intro");
  const skip = document.getElementById("intro-skip");
  const startedOnAnchor = location.hash && location.hash !== "#intro";

  function closeIntro({ instant = false } = {}) {
    if (!root.classList.contains("intro-open")) return;
    introTimeline?.kill();
    const done = () => {
      root.classList.remove("intro-open");
      intro.setAttribute("hidden", "");
      intro.setAttribute("aria-hidden", "true");
      ScrollTrigger.refresh();
      document.getElementById("cover-title")?.focus({ preventScroll: true });
    };
    if (instant || reduceMotion) return done();
    gsap.to(intro, { opacity: 0, duration: 0.6, ease: "power2.in", onComplete: done });
  }

  let introTimeline = null;
  if (intro && !reduceMotion && !startedOnAnchor) {
    root.classList.add("intro-open");
    window.scrollTo(0, 0);
    introTimeline = gsap.timeline({ onComplete: () => closeIntro() });
    introTimeline.to("#intro-progress", { scaleX: 1, duration: INTRO_SECONDS, ease: "none" });
    skip?.addEventListener("click", (e) => { e.preventDefault(); closeIntro(); });
    addEventListener("keydown", (e) => { if (e.key === "Escape") closeIntro(); });
    skip?.focus({ preventScroll: true });
  } else if (intro) {
    // 從錨點進來，或偏好減少動態：直接進入封面，不播開場
    intro.setAttribute("hidden", "");
  }

  // ───────── 光：段落進入視窗中段時，換成它的地色 ─────────
  const ground = document.querySelector(".ground");
  const layers = {};
  ground?.querySelectorAll(".ground__layer").forEach((el) => { layers[el.dataset.layer] = el; });
  let currentLight = null;

  function setLight(light) {
    if (!light || light === currentLight) return;
    const prev = layers[currentLight];
    const next = layers[light];
    currentLight = light;
    root.dataset.now = light;
    if (!next) return;
    gsap.killTweensOf(Object.values(layers));
    if (reduceMotion || !prev) {
      Object.values(layers).forEach((el) => gsap.set(el, { opacity: el === next ? 1 : 0 }));
      return;
    }
    gsap.set(next, { zIndex: 2 });
    gsap.set(prev, { zIndex: 1 });
    gsap.fromTo(next, { opacity: 0 }, { opacity: 1, duration: 1.1, ease: "power2.out", onComplete: () => {
      Object.values(layers).forEach((el) => { if (el !== next) gsap.set(el, { opacity: 0 }); });
    } });
  }

  const lit = gsap.utils.toArray(".page [data-light]");
  // 起始的光：視窗 55% 高度所在的那一段（重新整理或從錨點進來時不一定是封面）
  const startY = innerHeight * 0.55;
  const first = lit.filter((el) => el.getBoundingClientRect().top <= startY).pop() || lit[0];
  setLight(first?.dataset.light);
  lit.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top 55%",
      end: "bottom 55%",
      onToggle: (self) => { if (self.isActive) setLight(section.dataset.light); },
    });
  });

  // ───────── 時間軸：捲動位置換算成 00:00 到 48:00 ─────────
  const rail = document.querySelector(".rail");
  const clock = rail?.querySelector(".rail__clock");
  const now = rail?.querySelector(".rail__now");
  const track = rail?.querySelector(".rail__track");
  const cursor = rail?.querySelector(".rail__cursor");
  const fill = rail?.querySelector(".rail__fill");
  const stops = gsap.utils.toArray(".rail__stop");
  const scenes = gsap.utils.toArray(".scene");
  const desktop = matchMedia("(min-width: 72rem)");

  const fmt = (h) => {
    const total = Math.round(h * 60);
    const hh = Math.floor(total / 60);
    const mm = total % 60;
    return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
  };

  // 每一幕的錨點：幕的頂端到達視窗 45% 時，時鐘正好是該幕的時刻
  let anchors = [];
  function measure() {
    const y = (el) => el.getBoundingClientRect().top + scrollY - innerHeight * 0.45;
    anchors = scenes.map((el) => ({ y: y(el), h: Number(el.dataset.hour), el }));
  }

  function hoursAt(scrollY) {
    if (!anchors.length) return 0;
    if (scrollY <= anchors[0].y) return 0;
    for (let i = 0; i < anchors.length - 1; i++) {
      const a = anchors[i];
      const b = anchors[i + 1];
      if (scrollY < b.y) return gsap.utils.mapRange(a.y, b.y, a.h, b.h, scrollY);
    }
    return TOTAL_HOURS;
  }

  let shown = -1;
  let activeIndex = -2;
  const moveCursor = cursor ? {
    v: gsap.quickSetter(cursor, "y", "px"),
    h: gsap.quickSetter(cursor, "x", "px"),
  } : null;

  function render() {
    if (!rail) return;
    const h = hoursAt(scrollY);
    const p = h / TOTAL_HOURS;
    const minutes = Math.round(h * 60);
    if (minutes !== shown) {
      shown = minutes;
      clock.textContent = fmt(h);
    }
    if (desktop.matches) {
      moveCursor.h(0);
      moveCursor.v(p * track.clientHeight);
      gsap.set(fill, { scaleY: p, scaleX: 1 });
    } else {
      moveCursor.v(0);
      moveCursor.h(p * track.clientWidth);
      gsap.set(fill, { scaleX: p, scaleY: 1 });
    }
    let idx = -1;
    anchors.forEach((a, i) => { if (scrollY >= a.y - 1) idx = i; });
    if (idx !== activeIndex) {
      activeIndex = idx;
      stops.forEach((li, i) => {
        const a = li.querySelector("a");
        li.classList.toggle("is-past", i < idx);
        li.classList.toggle("is-now", idx < 0 && i === 0);
        if (i === idx) a.setAttribute("aria-current", "step");
        else a.removeAttribute("aria-current");
      });
      now.textContent = idx >= 0 ? scenes[idx].dataset.title : "停電之前";
    }
  }

  if (rail) {
    measure();
    render();
    ScrollTrigger.addEventListener("refresh", () => { measure(); render(); });
    ScrollTrigger.create({ start: 0, end: "max", onUpdate: render });
  }

  // ───────── 圖：進入視窗時從暗處被點亮 ─────────
  if (!reduceMotion) {
    gsap.utils.toArray(".scene__figure img").forEach((img) => {
      gsap.fromTo(img, { filter: "brightness(0.28) saturate(0.6)" }, {
        filter: "brightness(1) saturate(1)",
        ease: "none",
        scrollTrigger: { trigger: img, start: "top 92%", end: "center 58%", scrub: 0.6 },
      });
    });
  }

  addEventListener("load", () => ScrollTrigger.refresh());
})();
