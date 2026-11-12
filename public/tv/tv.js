(() => {
  const stage = document.getElementById("stage");
  const slides = [...document.querySelectorAll(".slide")];
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
  const bars = slides.map(() => {
    const b = document.createElement("div");
    b.className = "bar";
    b.innerHTML = "<i></i>";
    barsEl.appendChild(b);
    return b;
  });

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
    bars.forEach((b, k) => {
      b.classList.toggle("done", k < i);
      b.firstChild.style.width = k < i ? "100%" : "0";
    });
    elapsed = 0;
    start = performance.now();
  }

  function tick(now) {
    if (!paused) {
      const p = Math.min(1, (elapsed + now - start) / dur(i));
      bars[i].firstChild.style.width = p * 100 + "%";
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
    } else if (/^[1-9]$/.test(e.key)) show(+e.key - 1);
  });
  addEventListener("click", (e) => {
    if (e.clientX > innerWidth / 2) show(i + 1);
    else show(i - 1);
  });
  wake();

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
})();
