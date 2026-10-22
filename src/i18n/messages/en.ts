// English copy (default locale). `es.ts` must mirror this shape exactly (enforced by type + test).
//
// Content rules for Phase 1:
// - Manufacturing copy is quoted from the approved manufacturing.wdfgroup.us site.
// - Integration and 3PL show only their names and neutral "coming soon" copy.
// - Copy listed under `draft` sections is a creative proposal pending approval and renders
//   with a visible "Draft" marker until DRAFT_MARKERS is turned off (see src/lib/site.ts).
// - No statistics, clients, certifications, history, capabilities or contact details.

const en = {
  meta: {
    siteName: "WDF",
    home: {
      title: "WDF | Industrial Solutions Across North America",
      description:
        "WDF brings together manufacturing, industrial integration, and third-party logistics divisions serving industry across North America.",
    },
    about: { title: "About | WDF", description: "About WDF. This page is being prepared." },
    services: {
      title: "Services | WDF",
      description:
        "WDF services. Our Manufacturing division is online at manufacturing.wdfgroup.us.",
    },
    integration: {
      title: "Integration | WDF",
      description: "WDF industrial integration division. Coming soon.",
    },
    threepl: {
      title: "3PL | WDF",
      description: "WDF third-party logistics division. Coming soon.",
    },
    contact: { title: "Contact | WDF", description: "Contact WDF. This page is being prepared." },
    notFound: { title: "Page not found | WDF" },
  },
  nav: {
    about: "About",
    services: "Services",
    integration: "Integration",
    threepl: "3PL",
    contact: "Contact",
    home: "WDF — Home",
    primary: "Primary",
    menu: "Menu",
    open: "Open menu",
    close: "Close menu",
    language: "Language",
    skip: "Skip to content",
  },
  draft: {
    label: "Draft",
    title: "Draft copy — pending approval",
  },
  hero: {
    eyebrow: "WDF · North America",
    title: "Engineering Industrial Possibilities.",
    sub: "Connecting manufacturing, engineering, and industrial solutions across North America.",
    primary: "Explore our divisions",
    secondary: "Contact WDF",
    index: "Divisions",
    drawingLabel: "Technical drawing — decorative",
    pauseVideo: "Pause background video",
    playVideo: "Play background video",
  },
  intro: {
    eyebrow: "01 · WDF",
    title: "One company. Three industrial divisions.",
    body: "WDF brings manufacturing, industrial integration, and third-party logistics together under one corporate identity. Each division serves its own discipline; together they form a single point of contact for industrial partners.",
  },
  divisions: {
    eyebrow: "02 · Divisions",
    title: "Our divisions.",
    comingSoon: "Coming soon",
    online: "Online",
    manufacturing: {
      name: "Manufacturing",
      kicker: "Precision Manufacturing. Integrated Expertise.",
      body: "WDF combines precision manufacturing, engineering, and industrial integration to help businesses scale smarter.",
      tags: [
        "Manufacturing Capabilities",
        "Assembly & Product Integration",
        "Testing & Validation",
      ],
      cta: "Visit WDF Manufacturing",
    },
    integration: {
      name: "Integration",
      kicker: "Industrial integration",
      body: "Information about WDF's industrial integration division will be published soon.",
      cta: "Learn more",
    },
    threepl: {
      name: "3PL",
      kicker: "Third-party logistics",
      body: "Information about WDF's third-party logistics division will be published soon.",
      cta: "Learn more",
    },
  },
  reach: {
    eyebrow: "03 · North America",
    title: "Built for North American industry.",
    body: "Strategically positioned along the U.S.–Mexico border.",
    mapLabel: "Map of North America highlighting the U.S.–Mexico border",
    legend: "U.S.–Mexico border",
    countries: ["Canada", "United States", "Mexico"],
  },
  cta: {
    eyebrow: "04 · Contact",
    title: "Let's talk about your next industrial project.",
    body: "Corporate contact channels are being finalized. Manufacturing requirements can be submitted today through WDF Manufacturing.",
    primary: "Contact WDF",
    secondary: "Request a manufacturing quote",
  },
  footer: {
    tagline: "Manufacturing · Integration · 3PL",
    company: "Company",
    divisions: "Divisions",
    manufacturing: "Manufacturing",
    rights: "All rights reserved.",
    external: "opens in a new tab",
  },
  placeholder: {
    status: "In preparation",
    body: "This page is being prepared. Content will be published once it has been approved.",
    back: "Back to home",
    pages: {
      about: { eyebrow: "About", title: "About WDF" },
      services: {
        eyebrow: "Services",
        title: "Services",
        note: "Our Manufacturing division is online today.",
        link: "Visit manufacturing.wdfgroup.us",
      },
      integration: { eyebrow: "Integration", title: "Integration" },
      threepl: { eyebrow: "3PL", title: "3PL" },
      contact: {
        eyebrow: "Contact",
        title: "Contact WDF",
        note: "Have a manufacturing requirement?",
        link: "Request a quote from WDF Manufacturing",
      },
    },
  },
  notFound: {
    title: "Page not found",
    body: "The page you're looking for doesn't exist or has been moved.",
    back: "Back to home",
  },
};

export default en;
export type Messages = typeof en;
