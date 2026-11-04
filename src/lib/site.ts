// Site-wide constants. Keep business facts out of here unless they are verified.

export const SITE_URL = "https://wdfgroup.us";
export const MANUFACTURING_URL = "https://manufacturing.wdfgroup.us";

/** Partner companies shown in the footer; logos are white on transparent for the dark footer. */
export const PARTNERS = [
  {
    name: "NESIS",
    href: "https://www.nesisautomation.com/inicio.html?lang=es",
    logo: "/partners/nesis-white.png",
    logoColor: "/partners/nesis.png",
    width: 654,
    height: 589,
    size: "h-12",
  },
  {
    name: "WDF Integrators",
    href: "https://wdfintegrators.com/",
    logo: "/partners/wdf-integrators-white.webp",
    logoColor: "/partners/wdf-integrators.webp",
    width: 480,
    height: 200,
    // Wide wordmark: a shorter box keeps it visually balanced with the stacked NESIS mark.
    size: "h-9",
  },
] as const;

/** Partners credited in the Energy and Technology heroes, with their full-colour logos. */
export const DIVISION_PARTNERS = [
  { ...PARTNERS[0], heroHeight: 240, heroWidth: 266, heroSize: "h-14" },
  { ...PARTNERS[1], heroHeight: 200, heroWidth: 480, heroSize: "h-10" },
] as const;
export const MANUFACTURING_CONTACT_URL = `${MANUFACTURING_URL}/contact`;

/** General inquiries, as published on manufacturing.wdfgroup.us/contact. */
export const CONTACT_EMAIL = "sales@wdfservices.com";

/** Direct contacts approved by the WDF team, shown at the end of each division page. */
export type DivisionContact = {
  name: string;
  /** Optional: some contacts are published with email only. */
  phone?: string;
  tel?: string;
  /** A second number, e.g. the Yuma office line. */
  altPhone?: string;
  altTel?: string;
  email?: string;
};

/** Yuma, Arizona office line, as shown on the Contact page and as an extra contact number. */
export const YUMA_PHONE = { phone: "+1 (928) 246-4860", tel: "+19282464860" } as const;

/** Manufacturing contact, shown on the Services page. */
export const MANUFACTURING_CONTACT: DivisionContact = {
  name: "Mildred Orozco",
  // Only the Yuma line is published for Mildred (WDF request, Nov 2026).
  phone: YUMA_PHONE.phone,
  tel: YUMA_PHONE.tel,
  email: "mildred.orozco@wdfservices.com",
};

/** 3PL contact. */
export const THREEPL_CONTACT: DivisionContact = {
  name: "Martha Echagaray",
  // Email only; no phone is published for Martha (WDF request, Nov 2026).
  email: "martha.echagaray@wdfservices.com",
};

/** 3PL locations shown on the 3PL page map and below its legend. */
export const THREEPL_LOCATIONS = {
  mexicali: { address: ["Calle Saturno 18, Alamitos", "21210 Mexicali, B.C."] },
  yuma: {
    address: ["2450 S Madison Ave", "Yuma, AZ 85364-8516"],
    phone: "+1 928-246-4860",
    tel: "+19282464860",
  },
} as const;

/** Energy contact; also the Technology contact. */
export const ENERGY_CONTACT: DivisionContact = {
  name: "Jose Luis Rios",
  // Email only; no phone is published for Jose Luis (WDF request, Nov 2026).
  email: "joseluis.rios@wdfservices.com",
};

export const TECHNOLOGY_CONTACT = ENERGY_CONTACT;

export const LOGO_ON_DARK = "/brand/wdf-logo-white.svg";
export const LOGO_ON_LIGHT = "/brand/wdf-logo-black.svg";
/** Intrinsic size of the official logo SVGs (viewBox 1431 × 363). */
export const LOGO_SIZE = { width: 1431, height: 363 } as const;

/**
 * The team page (/about/team) and its entry points on About. Hidden for now (Oct 2026): visitors
 * are routed to the contact form instead. Set to true to bring the page and its links back
 * (and re-add it to public/sitemap.xml).
 */
export const TEAM_PAGE_PUBLIC = false;

/** Primary navigation, in the approved order. Labels come from messages.nav[key]. */
export const NAV_ITEMS = [
  { key: "about", to: "/{-$locale}/about" },
  { key: "services", to: "/{-$locale}/services" },
  { key: "contact", to: "/{-$locale}/contact" },
] as const;

/** The division pages under Services, in menu order. */
export const SERVICE_ITEMS = [
  { key: "manufacturing", to: "/{-$locale}/services/manufacturing" },
  { key: "energy", to: "/{-$locale}/services/energy" },
  { key: "technology", to: "/{-$locale}/services/technology" },
  { key: "threepl", to: "/{-$locale}/services/3pl" },
] as const;

/** Pages whose hero is light: the header shows its solid bar from the top so it stays legible. */
export const LIGHT_HERO_PAGES = [
  "/",
  "/services",
  "/services/manufacturing",
  "/services/3pl",
  "/about",
  "/about/team",
  "/services/energy",
  "/services/technology",
];

/**
 * Optional hero background video (e.g. a Higgsfield export). Put the files in public/media/
 * and fill this in; while it is null the hero shows the animated technical drawing instead.
 * Recommended: 8–15 s seamless loop, no audio, dark/low-contrast footage, H.264 MP4
 * (1920×1080, ≤ 6 MB) plus an optional WebM and a 720p mobile MP4, and a JPG/WebP poster
 * taken from the first frame.
 */
export type HeroVideo = {
  mp4: string;
  webm?: string;
  /** Lighter file served to screens ≤ 767px wide. */
  mobileMp4?: string;
  poster: string;
};
/** General WDF services presentation (WDFServices2026.mp4, re-encoded for the web), on the 3PL page. */
export const SERVICES_VIDEO = {
  sources: [
    // H.264/AAC (9.1 MB) for most browsers; VP9/Opus (12.2 MB) where H.264 is unavailable.
    { src: "/media/3pl/wdf-services-2026.mp4", type: 'video/mp4; codecs="avc1.64001f, mp4a.40.2"' },
    { src: "/media/3pl/wdf-services-2026.webm", type: 'video/webm; codecs="vp9, opus"' },
  ],
  poster: "/media/3pl/wdf-services-2026-poster.webp",
  width: 848,
  height: 478,
} as const;

export const HERO_VIDEO: HeroVideo | null = null;

/**
 * Photos for the home page Industries carousel, keyed like `industries.items[].key`. Tiles
 * without an entry show their line illustration. Add files under /public/media/industries/.
 */
export const INDUSTRY_PHOTOS: Partial<
  Record<string, { src: string; width: number; height: number }>
> = {
  // Photos supplied by the WDF team (Oct 2026), cut to the tiles' 4:5 frame.
  automotive: { src: "/media/industries/automotive.webp", width: 800, height: 1000 },
  aerospace: { src: "/media/industries/aerospace.webp", width: 800, height: 1000 },
  electronics: { src: "/media/industries/electronics.webp", width: 800, height: 1000 },
  medical: { src: "/media/industries/medical.webp", width: 800, height: 1000 },
  oilGas: { src: "/media/industries/oilGas.webp", width: 800, height: 1000 },
  metalmechanic: { src: "/media/industries/metalmechanic.webp", width: 564, height: 705 },
};

/** A photo file for a frame on the site; `position` is an optional CSS object-position. */
export type Photo = { src: string; width: number; height: number; position?: string };

/**
 * Photos for the division pages, keyed by frame. Frames without an entry stay empty (gray).
 * Add files under /public/media/<division>/.
 * - Manufacturing: "manufacturing-hero", "manufacturing-integrate", "manufacturing-support"
 * - Energy: "energy-hero", "energy-capability-1" … "energy-capability-6", "energy-deliverables"
 * - Technology: "technology-hero", "technology-capability-1" … "technology-capability-6",
 *   "technology-deliverables"
 */
export const PAGE_PHOTOS: Partial<Record<string, Photo>> = {
  // Supplied by the WDF team (Nov 2026). `position` keeps the subject in frame at every size.
  "manufacturing-hero": {
    src: "/media/manufacturing/hero.webp",
    width: 1600,
    height: 1067,
    position: "58% 55%",
  },
  "manufacturing-integrate": {
    src: "/media/manufacturing/integrate.webp",
    width: 1000,
    height: 1499,
    position: "72% 62%",
  },
  "manufacturing-support": {
    src: "/media/manufacturing/support.webp",
    width: 1920,
    height: 1280,
    position: "50% 55%",
  },
  "energy-hero": { src: "/media/energy/hero.webp", width: 1600, height: 1066, position: "74% 50%" },
  "energy-capability-1": { src: "/media/energy/substations.webp", width: 1400, height: 933 },
  "energy-capability-3": {
    src: "/media/energy/control-shelters.webp",
    width: 653,
    height: 500,
    position: "50% 60%",
  },
  "energy-capability-2": { src: "/media/energy/bess.webp", width: 1400, height: 1050 },
  "energy-capability-4": { src: "/media/energy/control-panel.webp", width: 1400, height: 933 },
  "energy-capability-5": {
    src: "/media/energy/renewables.webp",
    width: 1400,
    height: 934,
    position: "55% 70%",
  },
  "energy-capability-6": {
    src: "/media/energy/field-support.webp",
    width: 1200,
    height: 800,
    position: "50% 70%",
  },
  "energy-deliverables": {
    src: "/media/energy/deliverables.webp",
    width: 1000,
    height: 1500,
    position: "60% 50%",
  },
  "technology-hero": {
    src: "/media/technology/hero.webp",
    width: 1600,
    height: 1067,
    position: "46% 60%",
  },
  "technology-capability-1": {
    src: "/media/technology/automation.webp",
    width: 1400,
    height: 933,
    position: "40% 55%",
  },
  "technology-capability-2": { src: "/media/technology/plc.webp", width: 1400, height: 933 },
  "technology-capability-3": {
    src: "/media/technology/scada.webp",
    width: 1400,
    height: 933,
    position: "75% 40%",
  },
  "technology-capability-4": { src: "/media/technology/networks.webp", width: 1400, height: 937 },
  "technology-capability-5": {
    src: "/media/technology/robotics.webp",
    width: 1400,
    height: 878,
    position: "40% 50%",
  },
  "technology-capability-6": { src: "/media/technology/testing.webp", width: 1400, height: 906 },
  "technology-deliverables": {
    src: "/media/technology/deliverables.webp",
    width: 1920,
    height: 1273,
    position: "50% 45%",
  },
};

/** A logo for the "companies we have worked with" strip; `size` is its rendered height. */
export type ClientLogo = { name: string; src: string; width: number; height: number; size: string };

/**
 * Companies WDF has worked with, as WDF provided them (Nov 2026), shown on Technology and Energy. Logos are
 * the companies' own marks (backgrounds made transparent), shown at one optical height. Up to
 * eight fit on one row on desktop; add new files under /public/clients/.
 */
export const CLIENT_LOGOS: readonly ClientLogo[] = [
  { name: "Siemens", src: "/clients/siemens.png", width: 468, height: 76, size: "1.15rem" },
  {
    name: "Allen-Bradley",
    src: "/clients/allen-bradley.png",
    width: 293,
    height: 65,
    size: "1.9rem",
  },
  { name: "Keyence", src: "/clients/keyence.png", width: 491, height: 84, size: "1.15rem" },
  { name: "SICK", src: "/clients/sick.png", width: 206, height: 66, size: "1.5rem" },
  { name: "Rittal", src: "/clients/rittal.png", width: 85, height: 120, size: "2.5rem" },
  {
    name: "Schweitzer Engineering Laboratories",
    src: "/clients/sel.png",
    width: 514,
    height: 120,
    size: "1.9rem",
  },
  {
    name: "Phoenix Contact",
    src: "/clients/phoenix-contact.png",
    width: 452,
    height: 120,
    size: "1.8rem",
  },
  { name: "ABB", src: "/clients/abb.png", width: 316, height: 120, size: "1.5rem" },
];

/**
 * Photos for the service cards on the Services page, keyed by service: "manufacturing-3d-printing",
 * "manufacturing-1" … "manufacturing-7", "energy-1" … "energy-6", "technology-1" … "technology-6",
 * "threepl-1" … "threepl-6" (numbers follow the order on each division page). Each reuses the
 * photo of that service on its division page where there is one; cards without an entry show an
 * empty 4:3 frame. Declared after PAGE_PHOTOS and INDUSTRY_PHOTOS, which it reads.
 */
export const SERVICE_PHOTOS: Partial<Record<string, Photo>> = {
  "manufacturing-3d-printing": {
    src: "/media/services/3d-printing.webp",
    width: 1000,
    height: 667,
    position: "40% 55%",
  },
  "manufacturing-1": PAGE_PHOTOS["manufacturing-hero"], // engineer at the test bench
  "manufacturing-2": PAGE_PHOTOS["manufacturing-support"], // plant floor and materials
  "manufacturing-3": INDUSTRY_PHOTOS["metalmechanic"], // welding
  "manufacturing-5": PAGE_PHOTOS["manufacturing-integrate"], // assembly line
  ...Object.fromEntries(
    [1, 2, 3, 4, 5, 6].flatMap((i) => [
      [`energy-${i}`, PAGE_PHOTOS[`energy-capability-${i}`]],
      [`technology-${i}`, PAGE_PHOTOS[`technology-capability-${i}`]],
    ]),
  ),
  // Its division-page photo is the 3D printer, already on the 3D Printing card beside it.
  "technology-1": PAGE_PHOTOS["technology-hero"],
  "threepl-1": { src: "/media/divisions/threepl.webp", width: 960, height: 720 }, // warehouse racks
};
