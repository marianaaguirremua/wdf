// Site-wide constants. Keep business facts out of here unless they are verified.

export const SITE_URL = "https://wdfgroup.us";
export const MANUFACTURING_URL = "https://manufacturing.wdfgroup.us";
export const MANUFACTURING_CONTACT_URL = `${MANUFACTURING_URL}/contact`;

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
  { key: "integration", to: "/{-$locale}/integration" },
  { key: "threepl", to: "/{-$locale}/3pl" },
  { key: "contact", to: "/{-$locale}/contact" },
] as const;
