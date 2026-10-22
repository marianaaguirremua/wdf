# WDF — Corporate Website

Source for the WDF corporate website at [wdfgroup.us](https://wdfgroup.us).

Division sites are maintained in separate repositories (e.g. Manufacturing at
`manufacturing.wdfgroup.us`) and are not modified from here.

Development happens on feature branches; `main` is only updated with approved work.

## Stack

TanStack Start (React 19) + Tailwind CSS 4, built by Vite/Nitro for Cloudflare Workers —
the same stack as the WDF Manufacturing site.

```sh
bun install
bun run dev        # local preview at http://localhost:5173 (EN) and /es (ES)
bun run typecheck && bun run lint && bun run test
bun run build      # Cloudflare Worker output in .output/
```

## Structure

- `src/i18n/` — locale registry (`config.ts`) and messages (`messages/en.ts`, `messages/es.ts`).
  English is served unprefixed (`/about`), Spanish under `/es` (`/es/about`). Add a language by
  registering it in `config.ts` and adding a messages file of the same shape.
- `src/routes/{-$locale}/` — one route file per page, shared by every language.
- `src/lib/seo.ts` — per-page title, description, canonical, hreflang, Open Graph and robots.
- `src/lib/site.ts` — site URL, navigation order, logo paths and the draft-copy marker switch.
- `public/brand/` — official WDF logos copied unaltered from the Manufacturing repository
  (`wdf-logo-white.svg` on dark backgrounds, `wdf-logo-black.svg` on light). Never edit them.

## Content rules

- Copy marked as draft renders a visible "Draft" tag until approved; set
  `VITE_DRAFT_MARKERS=off` once the copy is approved.
- Placeholder pages are `noindex` and excluded from `public/sitemap.xml`.
- Do not publish statistics, clients, certifications, history, capabilities or contact details
  until they are verified (a test guards against emails, phone numbers and ISO claims).
