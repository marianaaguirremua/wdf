# WDF — Corporate Website

Source for the WDF corporate website at [wdfgroup.us](https://wdfgroup.us).

Division sites are maintained in separate repositories (e.g. Manufacturing at
`manufacturing.wdfgroup.us`) and are not modified from here.

Development happens on feature branches; `main` is only updated with approved work.

## TV display — 3PL (`tv/`)

`tv/index.html` is a self-contained, auto-advancing slideshow of the
[3PL services](https://wdfgroup.us/services/3pl) content, built for lobby and
office screens. It renders on a fixed 1920×1080 stage that scales to any display.

- **Run:** open `tv/index.html` in a browser (or serve the `tv/` folder) and press `F` for fullscreen.
- **Controls:** `←` / `→` previous/next, `Space` pause, `1`–`9` jump to a slide, click left/right half.
- **URL options:** `?slide=5` start on a slide · `?speed=1.5` 50% slower · `?pause` start paused.
- **Edit content:** each `<section class="slide">` is one slide; `data-duration` is its time on screen in ms.
- Images, logo and the QR code (→ wdfgroup.us/services/3pl) live in `tv/assets/`.
