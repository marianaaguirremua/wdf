// Site-wide constants. Keep business facts out of here unless they are verified.

export const SITE_URL = "https://wdfgroup.us";
export const MANUFACTURING_URL = "https://manufacturing.wdfgroup.us";
export const MANUFACTURING_CONTACT_URL = `${MANUFACTURING_URL}/contact`;

/** Direct contacts approved by the WDF team, shown at the end of each division page. */
export type DivisionContact = { name: string; phone: string; tel: string; email?: string };

/** Manufacturing contact, shown on the Services page. */
export const MANUFACTURING_CONTACT: DivisionContact = {
  name: "Mildred Orozco",
  phone: "+52 686 357 1003",
  tel: "+526863571003",
  email: "mildred.orozco@wdfservices.com",
};

/** 3PL contact. */
export const THREEPL_CONTACT: DivisionContact = {
  name: "Martha Echagaray",
  phone: "+52 (686) 160 0797",
  tel: "+526861600797",
};

/** Energy contact; also the Technology contact. */
export const ENERGY_CONTACT: DivisionContact = {
  name: "Jose Luis Rios",
  phone: "+52 686 186 6996",
  tel: "+526861866996",
  email: "joseluis.rios@wdfservices.com",
};

export const TECHNOLOGY_CONTACT = ENERGY_CONTACT;

export const LOGO_ON_DARK = "/brand/wdf-logo-white.svg";
export const LOGO_ON_LIGHT = "/brand/wdf-logo-black.svg";
/** Intrinsic size of the official logo SVGs (viewBox 1431 × 363). */
export const LOGO_SIZE = { width: 1431, height: 363 } as const;

/**
 * Shows "Draft" markers on proposed copy that has not been approved yet. On by default so
 * unapproved copy can never ship unmarked; set VITE_DRAFT_MARKERS=off once copy is approved.
 */
export const DRAFT_MARKERS = import.meta.env["VITE_DRAFT_MARKERS"] !== "off";

/** Primary navigation, in the approved order. Labels come from messages.nav[key]. */
export const NAV_ITEMS = [
  { key: "about", to: "/{-$locale}/about" },
  { key: "services", to: "/{-$locale}/services" },
  { key: "energy", to: "/{-$locale}/energy" },
  { key: "technology", to: "/{-$locale}/technology" },
  { key: "threepl", to: "/{-$locale}/3pl" },
  { key: "contact", to: "/{-$locale}/contact" },
] as const;

/** Pages whose hero is light: the header shows its solid bar from the top so it stays legible. */
export const LIGHT_HERO_PAGES = ["/about", "/about/leadership", "/energy", "/technology"];

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
export const HERO_VIDEO: HeroVideo | null = null;
