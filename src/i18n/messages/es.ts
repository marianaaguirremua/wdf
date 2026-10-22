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
        "WDF integra ingeniería, cadena de suministro, manufactura de precisión, acabados, ensamble, pruebas y logística desde la frontera entre EE. UU. y México.",
    },
    integration: {
      title: "Integración | WDF",
      description: "División de integración industrial de WDF. Próximamente.",
    },
    threepl: {
      title: "3PL | WDF",
      description:
        "WDF 3PL: almacenamiento, maniobras, inventarios y coordinación transfronteriza entre EE. UU. y México, con responsables y condiciones definidos para cada operación.",
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
    pauseVideo: "Pausar video de fondo",
    playVideo: "Reproducir video de fondo",
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
  services: {
    hero: {
      eyebrow: "Servicios · WDF Manufactura",
      pre: "La manufactura es nuestra base.",
      accent: "La integración es nuestro valor.",
      sub: "Manufactura de precisión. Experiencia integrada.",
      body: "WDF combina manufactura de precisión, ingeniería e integración industrial para ayudar a las empresas a crecer de forma más inteligente. Estratégicamente ubicados en la frontera entre EE. UU. y México.",
      primary: "Solicite una cotización",
      secondary: "Visitar WDF Manufactura",
      index: "Lo que integramos",
    },
    capabilities: {
      eyebrow: "01 · Lo que integramos",
      title: "Lo que integramos",
      hub: "Un solo socio que coordina ingeniería, cadena de suministro, manufactura, acabados, ensamble, pruebas y logística — internamente y mediante procesos externos coordinados.",
      items: [
        {
          title: "Ingeniería y comprensión del producto",
          processes: [
            "Ingeniería inversa",
            "análisis dimensional",
            "soporte CAD",
            "comprensión funcional",
            "definición de procesos",
            "soporte de diseño para manufactura",
          ],
        },
        {
          title: "Gestión de la cadena de suministro",
          processes: [
            "Materias primas",
            "componentes comprados",
            "fundiciones",
            "forjas",
            "procesos externos",
            "coordinación de proveedores",
            "logística de entrada",
          ],
        },
        {
          title: "Capacidades de manufactura",
          processes: [
            "Maquinado CNC",
            "torneado",
            "fresado de 3, 4 y 5 ejes",
            "conformado",
            "soldadura",
            "herramentales y fixtures",
          ],
        },
        {
          title: "Procesos externos y acabados",
          processes: [
            "Zincado",
            "cromado",
            "anodizado",
            "pintura en polvo",
            "pintura",
            "tratamiento térmico",
            "rectificado",
            "pulido",
            "pasivado",
            "marcado láser",
            "recubrimientos especiales",
          ],
        },
        {
          title: "Ensamble e integración de producto",
          processes: [
            "Subensambles",
            "ensambles mecánicos",
            "ensamble de producto completo",
            "integración de componentes",
          ],
        },
        {
          title: "Pruebas y validación",
          processes: [
            "Inspección dimensional",
            "pruebas funcionales",
            "control de calidad",
            "documentación",
            "validación",
          ],
        },
        {
          title: "Empaque y logística",
          processes: [
            "Empaque",
            "etiquetado",
            "almacenaje",
            "coordinación de entradas / salidas",
            "soporte IMMEX",
            "distribución final",
          ],
        },
      ],
    },
    support: {
      eyebrow: "02 · Soporte de manufactura",
      title: "Capacidad de manufactura cuando la necesita.",
      items: [
        {
          title: "Capacidad adicional",
          body: "Soporte cuando los recursos internos de manufactura están limitados.",
        },
        {
          title: "Excedente de producción",
          body: "Recursos de manufactura adicionales durante picos de producción.",
        },
        {
          title: "Producción de bajo volumen",
          body: "Soporte flexible para requerimientos especializados o de menor volumen.",
        },
        {
          title: "Producción de alta mezcla",
          body: "Soporte de manufactura para múltiples números de parte y requerimientos cambiantes.",
        },
        {
          title: "Componentes a la medida",
          body: "Manufactura basada en planos y especificaciones del cliente.",
        },
        {
          title: "Soporte de ingeniería",
          body: "Conectamos los requerimientos de ingeniería con la producción.",
        },
        {
          title: "Sustitución de importaciones",
          body: "Somos expertos en mitigar el impacto de los aranceles en las cadenas de suministro de Norteamérica.",
        },
      ],
    },
    industries: {
      eyebrow: "03 · Industrias",
      title: "Hecho para entornos industriales.",
      items: [
        "Automotriz",
        "Aeroespacial",
        "Electrónica",
        "Médica",
        "Energía — Petróleo y gas",
        "Metalmecánica",
      ],
    },
    cta: {
      eyebrow: "04 · Solicitud de cotización",
      title: "¿Necesita soporte de manufactura?",
      body: "Hablemos de su próxima pieza, proyecto o requerimiento de producción.",
      primary: "Solicitar cotización",
      secondary: "Contactar a WDF",
    },
  },
  threepl: {
    hero: {
      eyebrow: "3PL · WDF",
      title: ["Dos países.", "Una operación conectada."],
      body: "Almacenamiento, maniobras, inventarios y coordinación transfronteriza, con responsables y condiciones definidos para cada operación.",
      tags: ["US ↔ MX", "Warehousing", "Cross-border"],
      primary: "Contactar a WDF",
      drawingLabel: "Flujo transfronterizo entre EE. UU. y México — decorativo",
    },
    capabilities: {
      eyebrow: "01 · Capacidades",
      title: "Un alcance que se configura para tu proyecto.",
      body: "Seleccionamos los servicios y entregables a partir de la necesidad técnica, el calendario y los recursos requeridos.",
      items: [
        {
          title: "Almacenamiento e inventario",
          body: "Espacio, ubicaciones, identificación, conteos y reportes acordados según producto y volumen.",
        },
        {
          title: "Carga, descarga y maniobras",
          body: "Recepción, inspección aparente y maniobras con equipo dimensionado para la mercancía.",
        },
        {
          title: "Preparación y distribución",
          body: "Surtido, empaque, consolidación, cross-dock y coordinación de entrega o retorno.",
        },
        {
          title: "Pedimentos y cruce",
          body: "Coordinación del expediente con el importador/exportador y representantes aduanales autorizados.",
        },
        {
          title: "IMMEX y shelter",
          body: "Evaluación del modelo autorizado que corresponda al producto, la empresa y la actividad.",
        },
        {
          title: "Personal y continuidad",
          body: "Diseño de la organización operativa y evaluación de transiciones laborales con especialistas.",
        },
      ],
    },
    deliverables: {
      eyebrow: "02 · Entregables y responsabilidades",
      title: "La capacidad se convierte en un paquete definido.",
      items: [
        "Mapa de flujo y ficha operativa",
        "Recursos, ubicaciones y responsables",
        "Procedimientos y niveles de servicio",
        "Reportes de inventario y movimientos",
      ],
      note: "Instalaciones, disponibilidad, titular IMMEX, régimen aduanero, patrón y servicios de terceros se validan y documentan por proyecto.",
    },
    process: {
      eyebrow: "03 · Cómo trabajamos",
      title: "Una ruta clara. De principio a entrega.",
      body: "Cada proyecto se construye sobre entregables, responsables y puntos de verificación.",
      steps: [
        { title: "Entender", body: "Requerimientos, flujo, producto, sitio y restricciones." },
        { title: "Definir", body: "Ingeniería, recursos, alcance, costo y responsabilidades." },
        { title: "Ejecutar", body: "Abastecimiento, fabricación, integración y seguimiento." },
        {
          title: "Verificar y entregar",
          body: "Pruebas, evidencia, documentación y aceptación acordada.",
        },
      ],
    },
    connect: {
      eyebrow: "04 · Conecta capacidades",
      title: "Este pilar trabaja con los demás.",
      manufacturing: "De la ingeniería a la fabricación.",
    },
    cta: {
      eyebrow: "05 · Tu siguiente proyecto",
      title: "¿Qué necesitas mover, guardar o conectar?",
      body: "Cuéntanos el objetivo, el lugar y el calendario. Definimos contigo la combinación de capacidades y el alcance de trabajo.",
      primary: "Contactar a WDF",
    },
  },
  placeholder: {
    status: "En preparación",
    body: "Esta página está en preparación. El contenido se publicará una vez aprobado.",
    back: "Volver al inicio",
    pages: {
      about: { eyebrow: "Nosotros", title: "Acerca de WDF" },
      integration: { eyebrow: "Integración", title: "Integración" },
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
