// English copy (default locale). `es.ts` must mirror this shape exactly (enforced by type + test).
//
// Content rules for Phase 1:
// - Manufacturing copy (including the whole Services page) is quoted verbatim from the
//   approved manufacturing.wdfgroup.us site.
// - Energy and 3PL copy is quoted from the approved WDF Energy and WDF 3PL pages
//   (wdfintegrators.com/home/energy and /home/3pl).
// - Copy listed under `draft` sections is a creative proposal pending approval and renders
//   with a visible "Draft" marker until DRAFT_MARKERS is turned off (see src/lib/site.ts).
// - No statistics, clients, certifications, history or contact details (approved contacts
//   live in src/lib/site.ts), and no capabilities
//   beyond those approved on the Manufacturing site.

const en = {
  meta: {
    siteName: "WDF",
    home: {
      title: "WDF | Industrial Solutions Across North America",
      description:
        "WDF brings together manufacturing, energy, and third-party logistics divisions serving industry across North America.",
    },
    about: { title: "About | WDF", description: "About WDF. This page is being prepared." },
    services: {
      title: "Services | WDF",
      description:
        "WDF integrates engineering, supply chain, precision manufacturing, finishing, assembly, testing and logistics from the U.S.–Mexico border.",
    },
    energy: {
      title: "Energy | WDF",
      description:
        "WDF Energy: engineering, equipment and integration for substations, energy storage, control rooms and industrial electrical infrastructure.",
    },
    threepl: {
      title: "3PL | WDF",
      description:
        "WDF 3PL: storage, handling, inventory and U.S.–Mexico cross-border coordination, with defined ownership and conditions for each operation.",
    },
    contact: { title: "Contact | WDF", description: "Contact WDF. This page is being prepared." },
    notFound: { title: "Page not found | WDF" },
  },
  nav: {
    about: "About",
    services: "Services",
    energy: "Energy",
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
    body: "WDF brings manufacturing, energy, and third-party logistics together under one corporate identity. Each division serves its own discipline; together they form a single point of contact for industrial partners.",
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
    energy: {
      name: "Energy",
      kicker: "Infrastructure for what comes next.",
      body: "Engineering, equipment and integration for substations, energy storage, control rooms and industrial electrical infrastructure.",
      tags: ["Substations & grid", "BESS infrastructure", "Control shelters & E-houses"],
      cta: "Learn more",
    },
    threepl: {
      name: "3PL",
      kicker: "Third-party logistics",
      body: "Storage, handling, inventory and cross-border coordination, with defined ownership and conditions for each operation.",
      tags: ["Warehousing & inventory", "Customs documentation & crossing", "IMMEX & shelter"],
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
    tagline: "Manufacturing · Energy · 3PL",
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
      body: "Storage, handling, inventory and cross-border coordination, with defined ownership and conditions for each operation.",
      tags: ["US ↔ MX", "Warehousing", "Cross-border"],
      primary: "Contact WDF",
      drawingLabel: "U.S.–Mexico cross-border flow — decorative",
    },
    capabilities: {
      eyebrow: "01 · Capabilities",
      title: "A scope configured for your project.",
      body: "We select services and deliverables around the technical need, timeline and required resources.",
      items: [
        {
          title: "Warehousing & inventory",
          body: "Space, locations, identification, counts and reporting matched to product and volume.",
        },
        {
          title: "Loading, unloading & handling",
          body: "Receiving, visual condition checks and handling with equipment sized for the goods.",
        },
        {
          title: "Fulfillment & distribution",
          body: "Picking, packing, consolidation, cross-docking and delivery or returns coordination.",
        },
        {
          title: "Customs documentation & crossing",
          body: "Shipment-file coordination with the importer/exporter and authorized customs representatives.",
        },
        {
          title: "IMMEX & shelter",
          body: "Assessment of the authorized model applicable to the goods, company and activity.",
        },
        {
          title: "People & continuity",
          body: "Operating-team design and assessment of employment transitions with specialists.",
        },
      ],
    },
    deliverables: {
      eyebrow: "02 · Deliverables & responsibilities",
      title: "Capability becomes a defined package.",
      items: [
        "Flow map & operating profile",
        "Resources, locations & owners",
        "Procedures & service levels",
        "Inventory & movement reporting",
      ],
      note: "Facilities, availability, IMMEX holder, customs regime, employer and third-party services are verified and documented per project.",
    },
    process: {
      eyebrow: "03 · How we work",
      title: "A clear path. From scope to delivery.",
      body: "Every project is built around deliverables, owners and verification points.",
      steps: [
        { title: "Understand", body: "Requirements, flow, product, site and constraints." },
        { title: "Define", body: "Engineering, resources, scope, cost and responsibilities." },
        { title: "Execute", body: "Sourcing, fabrication, integration and follow-up." },
        {
          title: "Verify & deliver",
          body: "Testing, evidence, documentation and agreed acceptance.",
        },
      ],
    },
    connect: {
      eyebrow: "04 · Connect capabilities",
      title: "This pillar works with the others.",
      manufacturing: "From engineering to manufacturing.",
      energy: "Infrastructure for what comes next.",
    },
    cta: {
      eyebrow: "05 · Your next project",
      title: "What do you need to move, store or connect?",
      body: "Tell us the goal, location and timeline. We will define the right combination of capabilities and scope together.",
      primary: "Contact WDF",
      contact: "Direct contact",
    },
  },
  energy: {
    hero: {
      eyebrow: "Energy · WDF",
      title: ["Infrastructure for", "what comes next."],
      body: "Engineering, equipment and integration for substations, energy storage, control rooms and industrial electrical infrastructure.",
      tags: ["Substations", "BESS", "Control shelters"],
      primary: "Contact WDF",
      drawingLabel: "Single-line diagram of a substation — decorative",
    },
    capabilities: {
      eyebrow: "01 · Capabilities",
      title: "A scope configured for your project.",
      body: "We select services and deliverables around the technical need, timeline and required resources.",
      items: [
        {
          title: "Substations & grid",
          body: "Technical definition, HV/MV equipment, protection, auxiliaries and civil/electrical interface coordination.",
        },
        {
          title: "BESS infrastructure",
          body: "Distribution, monitoring, controls, communications and auxiliary systems surrounding energy storage.",
        },
        {
          title: "Control shelters & E-houses",
          body: "Enclosures, layout, panels, AC/DC, HVAC, lighting, cable entries and documentation.",
        },
        {
          title: "Equipment & electrical packages",
          body: "Transformers, breakers, disconnectors, switchgear and protection-and-control packages.",
        },
        {
          title: "Renewables & interconnection",
          body: "Balance of plant, structures, electrical collection, gen-tie and grid-connection coordination.",
        },
        {
          title: "Field support",
          body: "Technical field services in Mexico, with U.S. installation and commissioning scope defined per project.",
        },
      ],
    },
    deliverables: {
      eyebrow: "02 · Deliverables & responsibilities",
      title: "Capability becomes a defined package.",
      items: [
        "Engineering, calculations, drawings & BOM",
        "Equipment packages & submittals",
        "Integration, FAT & documentation",
        "Logistics & delivery coordination",
      ],
      note: "Manufacturer, ratings, standards, warranty, installation and testing are defined in the specific proposal.",
    },
    process: {
      eyebrow: "03 · How we work",
      title: "A clear path. From scope to delivery.",
      body: "Every project is built around deliverables, owners and verification points.",
      steps: [
        { title: "Understand", body: "Requirements, flow, product, site and constraints." },
        { title: "Define", body: "Engineering, resources, scope, cost and responsibilities." },
        { title: "Execute", body: "Sourcing, fabrication, integration and follow-up." },
        {
          title: "Verify & deliver",
          body: "Testing, evidence, documentation and agreed acceptance.",
        },
      ],
    },
    connect: {
      eyebrow: "04 · Connect capabilities",
      title: "This pillar works with the others.",
      manufacturing: "From engineering to manufacturing.",
      threepl: "Two countries. One connected operation.",
    },
    cta: {
      eyebrow: "05 · Your next project",
      title: "What infrastructure does your project need?",
      body: "Tell us the goal, location and timeline. We will define the right combination of capabilities and scope together.",
      primary: "Contact WDF",
      contact: "Direct contact",
    },
  },
  placeholder: {
    status: "In preparation",
    body: "This page is being prepared. Content will be published once it has been approved.",
    back: "Back to home",
    pages: {
      about: { eyebrow: "About", title: "About WDF" },
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
