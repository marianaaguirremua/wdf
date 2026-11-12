(() => {
  const stage = document.getElementById("stage");

  // /tv/all: pull the slides of the other displays into this page, keeping each
  // slide's header label, footer address and colour. Sources stay the single copy.
  async function compose(names) {
    const footer = stage.querySelector(".chrome-bottom");
    for (const name of names) {
      try {
        const res = await fetch(`/tv/${name}/`, { cache: "no-cache" });
        if (!res.ok) continue;
        const doc = new DOMParser().parseFromString(await res.text(), "text/html");
        const label = doc.querySelector(".chrome-top .div")?.innerHTML ?? "";
        const url = doc.querySelector(".chrome-bottom .url")?.textContent ?? "";
        const accent = (doc.body.className.match(/accent-(\w+)/) || [])[1] || "terracotta";
        for (const sec of doc.querySelectorAll("section.slide")) {
          const node = document.importNode(sec, true);
          Object.assign(node.dataset, { chapter: name, label, url, accent });
          stage.insertBefore(node, footer);
        }
      } catch {
        // skip a display that cannot be loaded; the others still play
      }
    }
  }

  const names = (stage.dataset.compose || "").split(",").filter(Boolean);
  (names.length ? compose(names) : Promise.resolve()).then(run);

  function run() {
    const slides = [...document.querySelectorAll(".slide")];
    if (!slides.length) return;
    const barsEl = document.getElementById("bars");
    const cur = document.getElementById("cur");
    const params = new URLSearchParams(location.search);
    const speed = Math.max(0.1, parseFloat(params.get("speed")) || 1); // ?speed=1.5 → slower
    let i = Math.min(slides.length, Math.max(1, parseInt(params.get("slide")) || 1)) - 1;
    let paused = params.has("pause");
    let start = 0,
      elapsed = 0,
      raf;

    document.getElementById("tot").textContent = String(slides.length).padStart(2, "0");
    const chapterOf = (n) => slides[n].dataset.chapter;
    const chapters = [...new Set(slides.map((s) => s.dataset.chapter).filter(Boolean))];
    const units = chapters.length ? chapters : slides.map((_, k) => k);
    const bars = units.map((u) => {
      const b = document.createElement("div");
      b.className = "bar";
      b.innerHTML = "<i></i>";
      if (chapters.length)
        b.style.flex = String(slides.filter((s) => s.dataset.chapter === u).length);
      barsEl.appendChild(b);
      return b;
    });
    // which bar a slide belongs to, and how far through that bar it starts / ends
    function barPos(n, p) {
      if (!chapters.length) return { b: n, f: p };
      const ch = chapterOf(n);
      const idx = slides.filter((s, k) => k < n && s.dataset.chapter === ch).length;
      const count = slides.filter((s) => s.dataset.chapter === ch).length;
      return { b: chapters.indexOf(ch), f: (idx + p) / count };
    }
    const topLabel = document.querySelector(".chrome-top .div");
    const footUrl = document.querySelector(".chrome-bottom .url");

    // Fit 1920×1080 stage into any screen
    function fit() {
      const s = Math.min(innerWidth / 1920, innerHeight / 1080);
      stage.style.transform = `scale(${s}) translate(-50%, -50%)`;
    }
    addEventListener("resize", fit);
    fit();

    const dur = (n) => (parseInt(slides[n].dataset.duration) || 12000) * speed;

    function show(n) {
      slides[i].classList.remove("active");
      i = (n + slides.length) % slides.length;
      // restart CSS animations on re-entry
      const s = slides[i];
      s.classList.remove("active");
      void s.offsetWidth;
      s.style.setProperty("--dur", dur(i) / 1000 + 4 + "s");
      s.classList.add("active");
      cur.textContent = String(i + 1).padStart(2, "0");
      if (s.dataset.label) {
        topLabel.innerHTML = s.dataset.label;
        footUrl.textContent = s.dataset.url;
        document.body.className = document.body.className.replace(/\baccent-\w+/g, "").trim();
        document.body.classList.add("accent-" + s.dataset.accent);
      }
      const { b: cb, f: cf } = barPos(i, 0);
      bars.forEach((b, k) => {
        b.classList.toggle("done", k < cb);
        b.firstChild.style.width = k < cb ? "100%" : k === cb ? cf * 100 + "%" : "0";
      });
      elapsed = 0;
      start = performance.now();
    }

    function tick(now) {
      if (!paused) {
        const p = Math.min(1, (elapsed + now - start) / dur(i));
        const { b, f } = barPos(i, p);
        bars[b].firstChild.style.width = f * 100 + "%";
        if (p >= 1) show(i + 1);
      }
      raf = requestAnimationFrame(tick);
    }

    function togglePause() {
      if (paused) {
        start = performance.now();
      } else {
        elapsed += performance.now() - start;
      }
      paused = !paused;
      document.body.classList.toggle("paused", paused);
      document
        .querySelectorAll(".slide.active *")
        .forEach((el) => (el.style.animationPlayState = paused ? "paused" : ""));
    }

    // Clock
    function clock() {
      const d = new Date();
      document.getElementById("clock-t").textContent = d.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      document.getElementById("clock-d").textContent = d.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
    }
    clock();
    setInterval(clock, 10000);

    // Controls
    const hint = document.getElementById("hint");
    let idleT;
    function wake() {
      document.body.classList.remove("idle");
      hint.classList.add("show");
      clearTimeout(idleT);
      idleT = setTimeout(() => {
        document.body.classList.add("idle");
        hint.classList.remove("show");
      }, 3000);
    }
    addEventListener("mousemove", wake);
    addEventListener("keydown", (e) => {
      wake();
      if (e.key === "ArrowRight" || e.key === "PageDown") show(i + 1);
      else if (e.key === "ArrowLeft" || e.key === "PageUp") show(i - 1);
      else if (e.key === " " || e.key === "Enter" || e.key === "MediaPlayPause") {
        e.preventDefault();
        togglePause();
      } else if (e.key === "f" || e.key === "F") {
        document.fullscreenElement
          ? document.exitFullscreen()
          : document.documentElement.requestFullscreen?.();
      } else if (/^[1-9]$/.test(e.key)) {
        const k = +e.key - 1;
        if (!chapters.length) show(k);
        else if (chapters[k]) show(slides.findIndex((s) => s.dataset.chapter === chapters[k]));
      }
    });
    addEventListener("click", (e) => {
      if (e.clientX > innerWidth / 2) show(i + 1);
      else show(i - 1);
    });
    // Hide the cursor after a moment; the hint only shows once someone interacts.
    idleT = setTimeout(() => document.body.classList.add("idle"), 3000);

    // Keep the screen awake where supported
    const lock = () => navigator.wakeLock?.request("screen").catch(() => {});
    lock();
    document.addEventListener(
      "visibilitychange",
      () => document.visibilityState === "visible" && lock(),
    );

    // Daily reload so content updates are picked up on unattended screens
    setTimeout(() => location.reload(), 24 * 3600 * 1000);

    if (paused) document.body.classList.add("paused");
    show(i);
    raf = requestAnimationFrame(tick);
  }
})();
