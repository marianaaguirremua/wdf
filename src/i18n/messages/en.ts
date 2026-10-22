// English copy (default locale). `es.ts` must mirror this shape exactly (enforced by type + test).
//
// Content rules for Phase 1:
// - Manufacturing copy (including the whole Services page) is quoted verbatim from the
//   approved manufacturing.wdfgroup.us site.
// - Integration and 3PL show only their names and neutral "coming soon" copy.
// - Copy listed under `draft` sections is a creative proposal pending approval and renders
//   with a visible "Draft" marker until DRAFT_MARKERS is turned off (see src/lib/site.ts).
// - No statistics, clients, certifications, history or contact details, and no capabilities
//   beyond those approved on the Manufacturing site.

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
        "WDF integrates engineering, supply chain, precision manufacturing, finishing, assembly, testing and logistics from the U.S.–Mexico border.",
    },
    integration: {
      title: "Integration | WDF",
      description: "WDF industrial integration division. Coming soon.",
    },
    threepl: {
      title: "3PL | WDF",
      description:
        "WDF 3PL: warehousing, material handling, inventory and U.S.–Mexico cross-border coordination, with responsibilities and conditions defined for each operation.",
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
  services: {
    hero: {
      eyebrow: "Services · WDF Manufacturing",
      pre: "Manufacturing is our foundation.",
      accent: "Integration is our value.",
      sub: "Precision Manufacturing. Integrated Expertise.",
      body: "WDF combines precision manufacturing, engineering, and industrial integration to help businesses scale smarter. Strategically positioned along the U.S.–Mexico border.",
      primary: "Request a Quote",
      secondary: "Visit WDF Manufacturing",
      index: "What we integrate",
    },
    capabilities: {
      eyebrow: "01 · What We Integrate",
      title: "What We Integrate",
      hub: "One partner coordinating engineering, supply chain, manufacturing, finishing, assembly, testing and logistics — in-house and through coordinated external processes.",
      items: [
        {
          title: "Engineering & Product Understanding",
          processes: [
            "Reverse engineering",
            "dimensional analysis",
            "CAD support",
            "functional understanding",
            "process definition",
            "design-for-manufacturing support",
          ],
        },
        {
          title: "Supply Chain Management",
          processes: [
            "Raw materials",
            "purchased components",
            "castings",
            "forgings",
            "external processes",
            "supplier coordination",
            "inbound logistics",
          ],
        },
        {
          title: "Manufacturing Capabilities",
          processes: [
            "CNC machining",
            "turning",
            "3-, 4- and 5-axis milling",
            "forming",
            "welding",
            "tooling and fixtures",
          ],
        },
        {
          title: "External Processes & Finishing",
          processes: [
            "Zinc plating",
            "chrome plating",
            "anodizing",
            "powder coating",
            "painting",
            "heat treatment",
            "grinding",
            "polishing",
            "passivation",
            "laser marking",
            "specialty coatings",
          ],
        },
        {
          title: "Assembly & Product Integration",
          processes: [
            "Subassemblies",
            "mechanical assemblies",
            "complete product assembly",
            "component integration",
          ],
        },
        {
          title: "Testing & Validation",
          processes: [
            "Dimensional inspection",
            "functional testing",
            "quality control",
            "documentation",
            "validation",
          ],
        },
        {
          title: "Packaging & Logistics",
          processes: [
            "Packaging",
            "labeling",
            "warehousing",
            "inbound / outbound coordination",
            "IMMEX support",
            "final distribution",
          ],
        },
      ],
    },
    support: {
      eyebrow: "02 · Manufacturing Support",
      title: "Manufacturing Capacity When You Need It.",
      items: [
        {
          title: "Additional Capacity",
          body: "Support when internal manufacturing resources are constrained.",
        },
        {
          title: "Production Overflow",
          body: "Additional manufacturing resources during production peaks.",
        },
        {
          title: "Low-Volume Production",
          body: "Flexible support for specialized or smaller production requirements.",
        },
        {
          title: "High-Mix Production",
          body: "Manufacturing support for multiple part numbers and changing requirements.",
        },
        {
          title: "Custom Components",
          body: "Manufacturing based on customer drawings and specifications.",
        },
        {
          title: "Engineering Support",
          body: "Helping bridge the gap between engineering requirements and production.",
        },
        {
          title: "Import Substitution",
          body: "We are experts in mitigating tariff impact to supply chains in North America.",
        },
      ],
    },
    industries: {
      eyebrow: "03 · Industries",
      title: "Built for Industrial Environments.",
      items: [
        "Automotive",
        "Aerospace",
        "Electronics",
        "Medical",
        "Energy — Oil & Gas",
        "Metalmechanic",
      ],
    },
    cta: {
      eyebrow: "04 · Request for Quote",
      title: "Need Manufacturing Support?",
      body: "Let's talk about your next part, project or production requirement.",
      primary: "Request a Quote",
      secondary: "Contact WDF",
    },
  },
  threepl: {
    hero: {
      eyebrow: "3PL · WDF",
      title: ["Two countries.", "One connected operation."],
      body: "Warehousing, material handling, inventory and cross-border coordination, with responsibilities and conditions defined for each operation.",
      tags: ["US ↔ MX", "Warehousing", "Cross-border"],
      primary: "Contact WDF",
      drawingLabel: "U.S.–Mexico cross-border flow — decorative",
    },
    capabilities: {
      eyebrow: "01 · Capabilities",
      title: "A scope configured for your project.",
      body: "We select the services and deliverables based on the technical need, the schedule and the resources required.",
      items: [
        {
          title: "Warehousing & inventory",
          body: "Space, locations, identification, counts and reports agreed according to product and volume.",
        },
        {
          title: "Loading, unloading & handling",
          body: "Receiving, visual inspection and handling with equipment sized for the goods.",
        },
        {
          title: "Picking & distribution",
          body: "Picking, packing, consolidation, cross-dock and coordination of delivery or returns.",
        },
        {
          title: "Customs entries & crossing",
          body: "Coordination of the file with the importer/exporter and authorized customs brokers.",
        },
        {
          title: "IMMEX & shelter",
          body: "Evaluation of the authorized model that fits the product, the company and the activity.",
        },
        {
          title: "Staffing & continuity",
          body: "Design of the operating organization and evaluation of labor transitions with specialists.",
        },
      ],
    },
    deliverables: {
      eyebrow: "02 · Deliverables & responsibilities",
      title: "Capacity becomes a defined package.",
      items: [
        "Flow map and operating sheet",
        "Resources, locations and owners",
        "Procedures and service levels",
        "Inventory and movement reports",
      ],
      note: "Facilities, availability, IMMEX holder, customs regime, employer of record and third-party services are validated and documented for each project.",
    },
    process: {
      eyebrow: "03 · How we work",
      title: "A clear route. From start to delivery.",
      body: "Every project is built on deliverables, owners and checkpoints.",
      steps: [
        { title: "Understand", body: "Requirements, flow, product, site and constraints." },
        { title: "Define", body: "Engineering, resources, scope, cost and responsibilities." },
        { title: "Execute", body: "Sourcing, manufacturing, integration and follow-up." },
        {
          title: "Verify & deliver",
          body: "Testing, evidence, documentation and agreed acceptance.",
        },
      ],
    },
    connect: {
      eyebrow: "04 · Connected capabilities",
      title: "This division works with the others.",
      manufacturing: "From engineering to manufacturing.",
    },
    cta: {
      eyebrow: "05 · Your next project",
      title: "What do you need to move, store or connect?",
      body: "Tell us the goal, the place and the schedule. Together we define the combination of capabilities and the scope of work.",
      primary: "Contact WDF",
    },
  },
  placeholder: {
    status: "In preparation",
    body: "This page is being prepared. Content will be published once it has been approved.",
    back: "Back to home",
    pages: {
      about: { eyebrow: "About", title: "About WDF" },
      integration: { eyebrow: "Integration", title: "Integration" },
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
