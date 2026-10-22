import type { Messages } from "./en";

// Spanish copy. Manufacturing strings are quoted from the approved Spanish version of
// manufacturing.wdfgroup.us; everything else mirrors en.ts and follows the same content rules.

const es: Messages = {
  meta: {
    siteName: "WDF",
    home: {
      title: "WDF | Soluciones industriales en Norteamérica",
      description:
        "WDF reúne divisiones de manufactura, integración industrial y logística de terceros (3PL) al servicio de la industria en Norteamérica.",
    },
    about: {
      title: "Nosotros | WDF",
      description: "Acerca de WDF. Esta página está en preparación.",
    },
    services: {
      title: "Servicios | WDF",
      description:
        "Servicios de WDF. Nuestra división de Manufactura está disponible en manufacturing.wdfgroup.us.",
    },
    integration: {
      title: "Integración | WDF",
      description: "División de integración industrial de WDF. Próximamente.",
    },
    threepl: {
      title: "3PL | WDF",
      description: "División de logística de terceros de WDF. Próximamente.",
    },
    contact: {
      title: "Contacto | WDF",
      description: "Contacto de WDF. Esta página está en preparación.",
    },
    notFound: { title: "Página no encontrada | WDF" },
  },
  nav: {
    about: "Nosotros",
    services: "Servicios",
    integration: "Integración",
    threepl: "3PL",
    contact: "Contacto",
    home: "WDF — Inicio",
    primary: "Principal",
    menu: "Menú",
    open: "Abrir menú",
    close: "Cerrar menú",
    language: "Idioma",
    skip: "Ir al contenido",
  },
  draft: {
    label: "Borrador",
    title: "Texto en borrador — pendiente de aprobación",
  },
  hero: {
    eyebrow: "WDF · Norteamérica",
    title: "Ingeniería de posibilidades industriales.",
    sub: "Conectamos manufactura, ingeniería y soluciones industriales en Norteamérica.",
    primary: "Conozca nuestras divisiones",
    secondary: "Contactar a WDF",
    index: "Divisiones",
    drawingLabel: "Dibujo técnico — decorativo",
  },
  intro: {
    eyebrow: "01 · WDF",
    title: "Una empresa. Tres divisiones industriales.",
    body: "WDF reúne manufactura, integración industrial y logística de terceros bajo una sola identidad corporativa. Cada división atiende su propia disciplina; juntas forman un solo punto de contacto para sus socios industriales.",
  },
  divisions: {
    eyebrow: "02 · Divisiones",
    title: "Nuestras divisiones.",
    comingSoon: "Próximamente",
    online: "En línea",
    manufacturing: {
      name: "Manufactura",
      kicker: "Manufactura de precisión. Experiencia integrada.",
      body: "WDF combina manufactura de precisión, ingeniería e integración industrial para ayudar a las empresas a crecer de forma más inteligente.",
      tags: [
        "Capacidades de manufactura",
        "Ensamble e integración de producto",
        "Pruebas y validación",
      ],
      cta: "Visitar WDF Manufactura",
    },
    integration: {
      name: "Integración",
      kicker: "Integración industrial",
      body: "La información sobre la división de integración industrial de WDF se publicará próximamente.",
      cta: "Más información",
    },
    threepl: {
      name: "3PL",
      kicker: "Logística de terceros",
      body: "La información sobre la división de logística de terceros de WDF se publicará próximamente.",
      cta: "Más información",
    },
  },
  reach: {
    eyebrow: "03 · Norteamérica",
    title: "Hecho para la industria de Norteamérica.",
    body: "Estratégicamente ubicados en la frontera entre EE. UU. y México.",
    mapLabel: "Mapa de Norteamérica que resalta la frontera entre EE. UU. y México",
    legend: "Frontera EE. UU.–México",
    countries: ["Canadá", "Estados Unidos", "México"],
  },
  cta: {
    eyebrow: "04 · Contacto",
    title: "Hablemos de su próximo proyecto industrial.",
    body: "Los canales de contacto corporativo se están definiendo. Los requerimientos de manufactura pueden enviarse hoy a través de WDF Manufactura.",
    primary: "Contactar a WDF",
    secondary: "Solicitar una cotización de manufactura",
  },
  footer: {
    tagline: "Manufactura · Integración · 3PL",
    company: "Empresa",
    divisions: "Divisiones",
    manufacturing: "Manufactura",
    rights: "Todos los derechos reservados.",
    external: "se abre en una pestaña nueva",
  },
  placeholder: {
    status: "En preparación",
    body: "Esta página está en preparación. El contenido se publicará una vez aprobado.",
    back: "Volver al inicio",
    pages: {
      about: { eyebrow: "Nosotros", title: "Acerca de WDF" },
      services: {
        eyebrow: "Servicios",
        title: "Servicios",
        note: "Nuestra división de Manufactura ya está en línea.",
        link: "Visitar manufacturing.wdfgroup.us",
      },
      integration: { eyebrow: "Integración", title: "Integración" },
      threepl: { eyebrow: "3PL", title: "3PL" },
      contact: {
        eyebrow: "Contacto",
        title: "Contacto WDF",
        note: "¿Tiene un requerimiento de manufactura?",
        link: "Solicitar una cotización a WDF Manufactura",
      },
    },
  },
  notFound: {
    title: "Página no encontrada",
    body: "La página que busca no existe o fue movida.",
    back: "Volver al inicio",
  },
};

export default es;
