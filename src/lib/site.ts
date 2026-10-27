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
  phone: string;
  tel: string;
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
  phone: "+52 686 357 1003",
  tel: "+526863571003",
  email: "mildred.orozco@wdfservices.com",
  altPhone: YUMA_PHONE.phone,
  altTel: YUMA_PHONE.tel,
};

/** 3PL contact. */
export const THREEPL_CONTACT: DivisionContact = {
  name: "Martha Echagaray",
  phone: "+52 (686) 160 0797",
  tel: "+526861600797",
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
  phone: "+52 686 186 6996",
  tel: "+526861866996",
  email: "joseluis.rios@wdfservices.com",
};

export const TECHNOLOGY_CONTACT = ENERGY_CONTACT;

export const LOGO_ON_DARK = "/brand/wdf-logo-white.svg";
export const LOGO_ON_LIGHT = "/brand/wdf-logo-black.svg";
/** Intrinsic size of the official logo SVGs (viewBox 1431 × 363). */
export const LOGO_SIZE = { width: 1431, height: 363 } as const;

/** Primary navigation, in the approved order. Labels come from messages.nav[key]. */
export const NAV_ITEMS = [
  { key: "about", to: "/{-$locale}/about" },
  { key: "manufacturing", to: "/{-$locale}/manufacturing" },
  { key: "energy", to: "/{-$locale}/energy" },
  { key: "technology", to: "/{-$locale}/technology" },
  { key: "threepl", to: "/{-$locale}/3pl" },
  { key: "contact", to: "/{-$locale}/contact" },
] as const;

/** Pages whose hero is light: the header shows its solid bar from the top so it stays legible. */
export const LIGHT_HERO_PAGES = ["/about", "/about/team", "/energy", "/technology"];

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
> = {};
