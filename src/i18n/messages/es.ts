import type { Messages } from "./en";

// Spanish copy. Manufacturing strings are quoted from the approved Spanish version of
// manufacturing.wdfgroup.us; everything else mirrors en.ts and follows the same content rules.

const es: Messages = {
  meta: {
    siteName: "WDF",
    home: {
      title: "WDF | Soluciones industriales en Norteamérica",
      description:
        "WDF reúne divisiones de manufactura, energía y logística de terceros (3PL) al servicio de la industria en Norteamérica.",
    },
    about: {
      title: "Nosotros | WDF",
      description:
        "Nosotros: manufactura, energía, tecnología y logística de terceros bajo una sola identidad corporativa, y el equipo de liderazgo de WDF.",
    },
    leadership: {
      title: "Equipo de liderazgo | WDF",
      description:
        "El equipo de liderazgo de WDF, con teléfono y correo directo de cada persona: un equipo para conectar estrategia, ingeniería y seguimiento al cliente.",
    },
    manufacturing: {
      title: "Manufactura | WDF",
      description:
        "WDF integra ingeniería, cadena de suministro, manufactura de precisión, acabados, ensamble, pruebas y logística desde la frontera entre EE. UU. y México.",
    },
    energy: {
      title: "Energía | WDF",
      description:
        "WDF Energy: ingeniería, equipos e integración para subestaciones, almacenamiento de energía, salas de control e infraestructura eléctrica industrial.",
    },
    technology: {
      title: "Tecnología | WDF",
      description:
        "WDF Technology: automatización, controles y comunicaciones para conectar equipos, procesos y datos con una ejecución industrial disciplinada.",
    },
    threepl: {
      title: "3PL | WDF",
      description:
        "WDF 3PL: almacenamiento, maniobras, inventarios y coordinación transfronteriza entre EE. UU. y México, con responsables y condiciones definidos para cada operación.",
    },
    contact: {
      title: "Contacto | WDF",
      description:
        "Contacte a WDF sobre su proyecto: manufactura, energía, tecnología o 3PL. Seleccione las divisiones que necesita y envíe sus requerimientos.",
    },
    notFound: { title: "Página no encontrada | WDF" },
  },
  nav: {
    about: "Nosotros",
    manufacturing: "Manufactura",
    energy: "Energía",
    technology: "Tecnología",
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
    title: "Una empresa. Cuatro divisiones industriales.",
    body: "WDF reúne manufactura, energía, tecnología y logística de terceros bajo una sola identidad corporativa. Cada división atiende su propia disciplina; juntas forman un solo punto de contacto para sus socios industriales.",
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
      cta: "Más información",
    },
    energy: {
      name: "Energía",
      kicker: "Infraestructura para lo que viene.",
      body: "Ingeniería, equipos e integración para subestaciones, almacenamiento de energía, salas de control e infraestructura eléctrica industrial.",
      tags: ["Subestaciones y red", "Infraestructura BESS", "Control shelters y E-houses"],
      cta: "Más información",
    },
    technology: {
      name: "Tecnología",
      kicker: "Sistemas que entienden su operación.",
      body: "Automatización, controles y comunicaciones para conectar equipos, procesos y datos con una ejecución industrial disciplinada.",
      tags: ["Automation", "SCADA / PLC / DCS", "Robotics"],
      cta: "Más información",
    },
    threepl: {
      name: "3PL",
      kicker: "Logística de terceros",
      body: "Almacenamiento, maniobras, inventarios y coordinación transfronteriza, con responsables y condiciones definidos para cada operación.",
      tags: ["Almacenamiento e inventario", "Pedimentos y cruce", "IMMEX y shelter"],
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
    tagline: "Manufactura · Energía · Tecnología · 3PL",
    company: "Empresa",
    divisions: "Divisiones",
    manufacturing: "Manufactura",
    rights: "Todos los derechos reservados.",
    external: "se abre en una pestaña nueva",
    partners: "Empresas aliadas",
    partneredWith: "En alianza con",
  },
  services: {
    hero: {
      eyebrow: "Manufactura · WDF",
      pre: "La manufactura es nuestra base.",
      accent: "La integración es nuestro valor.",
      sub: "Manufactura de precisión. Experiencia integrada.",
      body: "WDF combina manufactura de precisión, ingeniería e integración industrial para ayudar a las empresas a crecer de forma más inteligente. Estratégicamente ubicados en la frontera entre EE. UU. y México.",
      primary: "Solicite una cotización",
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
            "moldeo por inyección de plástico",
            "estampado de metales",
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
      contact: "Contacto directo",
    },
  },
  threepl: {
    hero: {
      eyebrow: "3PL · Logística transfronteriza",
      title: ["Establezca su empresa en Estados Unidos,", "con apoyo local desde el inicio."],
      body: "Los servicios 3PL (logística de terceros) de WDF parten de **Yuma, Arizona**, en el suroeste de Estados Unidos, cerca de California. Desde ahí coordinamos almacenamiento, inventarios, preparación de pedidos y flujos transfronterizos con nuestro equipo en **Mexicali, Baja California, México**, y conectamos su carga con los puertos, transportistas y cruces que unen Norteamérica con cadenas de suministro de **todo el mundo**.",
      legend: {
        flow: [
          { term: "Proveedores y puertos globales", text: "donde se origina la carga" },
          { term: "Frontera EE. UU.–México", text: "se cruza como un solo flujo conectado" },
          { term: "Yuma y clientes en EE. UU.", text: "entrega del lado estadounidense" },
        ],
        lines: [
          { term: "Una operación", text: "enlazada a través de la frontera" },
          { term: "Puertos y rutas comerciales", text: "rutas con las que nos conectamos" },
          { term: "Puerto marítimo", text: "no es una instalación de WDF" },
        ],
      },
      places: { mexicali: "Mexicali, B.C.", yuma: "Yuma, AZ" },
      primary: "Hable con nuestro equipo 3PL",
      map: {
        label:
          "Mapa de la región fronteriza EE. UU.–México con el centro de WDF en Mexicali, la oficina en Yuma y los puertos y rutas comerciales con los que se conectan.",
        unitedStates: "Estados Unidos",
        mexico: "México",
        california: "California",
        arizona: "Arizona",
        bajaCalifornia: "Baja California",
        sonora: "Sonora",
        pacific: "Océano Pacífico",
        gulf: "Golfo de California",
        border: "Frontera EE. UU. / MX",
        yuma: { region: "EE. UU. · Arizona", name: "Yuma", role: "Oficina en EE. UU." },
        mexicali: {
          region: "MX · Baja California",
          name: "Mexicali",
          role: "Centro de 3PL y manufactura",
        },
        ports: {
          name: "Puertos de L.A. y Long Beach",
          detail: "Cadenas de suministro transpacíficas",
        },
        interiorUS: { name: "Mercados del interior de EE. UU.", detail: "Corredores I-8 / I-10" },
        interiorMX: { name: "Interior de México", detail: "Carretera Federal 2" },
        ensenada: "Puerto de Ensenada",
      },
      flow: [
        "Proveedores y puertos globales",
        "Centro 3PL Mexicali",
        "Frontera EE. UU. ↔ MX",
        "Yuma y clientes en EE. UU.",
      ],
      note: "Los pines marcan ubicaciones de WDF. Las rutas punteadas muestran puertos y rutas comerciales con los que nos conectamos; no son instalaciones de WDF.",
    },
    expansion: {
      eyebrow: "Suroeste de EE. UU. · Servicios de ingeniería y soluciones integrales",
      title: ["Dos países.", "Una operación conectada."],
      body: [
        "WDF ayuda a empresas internacionales a planear, establecer y hacer crecer operaciones en el suroeste de Estados Unidos, a partir de nuestra oficina en Yuma, Arizona. Las empresas del grupo en ambos lados de la frontera trabajan con una estructura contractual definida para cada operación.",
        "En Estados Unidos, WDF Services LLC atiende la relación comercial y la coordinación: definición del alcance, proveedores, transporte y entrega en EE. UU. conforme al contrato acordado.",
        "En México, Integrators WDF México, S. de R.L. de C.V. coordina la ejecución local, el soporte industrial y los servicios específicos de cada proyecto.",
        "Antes del primer movimiento identificamos, en cada país, a la entidad contratante, al propietario de la mercancía, al importador/exportador, al patrón y al representante aduanal.",
      ],
      primary: "Hable de su expansión a EE. UU.",
    },
    whyYuma: {
      eyebrow: "¿Por qué Yuma, Arizona?",
      title: "Una ubicación en EE. UU. cerca de California y México.",
      body: [
        "Yuma está en el suroeste de Arizona, junto a California en Estados Unidos y cerca de Baja California y Sonora en México. Acerca su negocio a clientes en EE. UU. y a recursos de manufactura transfronterizos.",
        "Desde Yuma, WDF le ayuda a evaluar cómo los proveedores regionales, la logística, los servicios técnicos y los requisitos de operación se ajustan a sus planes de expansión, para que tome decisiones informadas antes de comprometer recursos.",
      ],
      diagram: {
        label: "Yuma, Arizona, se ubica entre California y Mexicali, Baja California, México.",
        california: "California, EE. UU.",
        yuma: "Yuma, Arizona",
        yumaRole: "Oficina de WDF",
        mexico: "Mexicali, B.C., México",
      },
    },
    plant: {
      title: ["Ingeniería, manufactura y energía,", "trabajando en conjunto."],
      alt: "Ilustración isométrica de una planta de WDF: ingenieros en un centro de maquinado, un torno CNC y una estación de inspección producen piezas que avanzan por una banda transportadora hacia un área de integración con tableros eléctricos, un transformador de subestación y contenedores de almacenamiento de energía en baterías, unidos por una red ámbar de energía y trabajo en equipo.",
    },
    establish: {
      eyebrow: "Cómo le ayudamos a establecerse",
      title: [
        "Entienda los requisitos.",
        "Conozca a las personas indicadas.",
        "Planee su operación.",
      ],
      steps: [
        {
          title: "Evalúe su oportunidad",
          body: "Defina sus objetivos, necesidades técnicas, requisitos de ubicación y costos de operación esperados.",
        },
        {
          title: "Conecte con recursos regionales",
          body: "Identifique proveedores, prestadores de servicios y contactos de negocio relevantes para su proyecto.",
        },
        {
          title: "Coordine los requisitos de instalación",
          body: "Organice los pasos, la documentación y la participación de especialistas que requiere la operación propuesta.",
        },
        {
          title: "Integre su operación",
          body: "Coordine ingeniería, manufactura, logística y soporte diario con un alcance, presupuesto y responsabilidades acordados.",
        },
      ],
      primary: "Cuéntenos qué quiere construir",
    },
    capabilities: {
      eyebrow: "01 · Servicios logísticos",
      crossTag: "MX ⇄ US",
      title: "Un alcance que se configura para su proyecto.",
      body: "Servicios de logística de terceros diseñados en torno a su producto, volumen y compromiso de entrega, para una operación recurrente, capacidad por temporada o un proyecto específico. Los recursos y niveles de servicio se acuerdan por escrito.",
      items: [
        {
          title: "Almacenamiento e inventario",
          body: "Recepción, acomodo y almacenaje por ubicación, segregación y límites de estiba; trazabilidad por SKU, lote o número de serie, con conteos cíclicos y conciliación.",
        },
        {
          title: "Carga, descarga y maniobras",
          body: "Citas con aviso previo, descarga con equipo adecuado a la carga, y conteo e inspección con registro de diferencias. Grúas, izajes, cargas sobredimensionadas y materiales regulados se evalúan y cotizan por separado.",
        },
        {
          title: "Preparación y distribución",
          body: "Liberación de pedidos, surtido, verificación, empaque y etiquetado; cross-dock, consolidación de carga, prueba de entrega y devoluciones autorizadas.",
        },
        {
          title: "Pedimentos y cruce",
          body: "Expediente del embarque y seguimiento de hitos con el importador/exportador y los representantes aduanales autorizados de cada país, quienes conservan la responsabilidad del despacho y sus obligaciones.",
        },
        {
          title: "IMMEX y shelter",
          body: "Evaluación del programa IMMEX o de un modelo shelter con el titular del programa y sus asesores, según la empresa, la actividad, la mercancía y el domicilio autorizado.",
        },
        {
          title: "Personal y continuidad",
          body: "Personal, turnos, supervisión y capacitación de acuerdo con el nivel de servicio contratado; las sustituciones patronales se evalúan con asesores laborales.",
        },
      ],
    },
    deliverables: {
      eyebrow: "02 · Entregables y responsabilidades",
      title: "La capacidad se convierte en un paquete definido.",
      items: [
        "Mapa de flujo y ficha operativa",
        "Matriz de responsabilidades",
        "Procedimientos y niveles de servicio (SLA)",
        "Indicadores y reportes",
      ],
      note: "Los indicadores se definen con usted en el SLA, como exactitud de inventario, entregas a tiempo, tiempo de recepción y excepciones. Instalaciones, espacio, seguros, titular IMMEX, régimen aduanero, patrón y servicios de terceros se validan y documentan por proyecto.",
    },
    process: {
      eyebrow: "03 · Cómo trabajamos",
      title: "Una ruta clara. De principio a entrega.",
      body: "El calendario depende de las instalaciones, autorizaciones, recursos y sus aprobaciones.",
      steps: [
        {
          title: "Diagnóstico",
          body: "Perfil operativo, producto, flujos, volúmenes y restricciones.",
        },
        {
          title: "Diseño",
          body: "Distribución del espacio, recursos, responsabilidades y modelo de contrato.",
        },
        {
          title: "Validación",
          body: "Revisión técnica, aduanera, fiscal, laboral y de seguros con especialistas.",
        },
        { title: "Preparación", body: "Sitio, equipo, sistemas, personal y procedimientos." },
      ],
    },
    connect: {
      eyebrow: "04 · Conecte capacidades",
      title: "Este pilar trabaja con los demás.",
      body: "La logística es una de las áreas de servicio de WDF. Cuando su proyecto también requiere ingeniería, infraestructura eléctrica, automatización o manufactura, coordinamos esas divisiones en torno a un mismo plan, cada una con su propio alcance.",
      video: {
        title: "Panorama de los servicios de WDF",
        description:
          "Presentación general de los servicios industriales de WDF. 2\u00a0min 56\u00a0s; textos en pantalla en inglés.",
        play: "Reproducir el video de los servicios de WDF (2\u00a0min 56\u00a0s)",
      },
    },
    cta: {
      eyebrow: "05 · Su siguiente proyecto",
      title: "¿Qué necesita mover, guardar o conectar?",
      body: "Cuéntenos qué necesita mover, a dónde debe llegar y cuándo: producto y flujo, volumen y frecuencia, y el modelo operativo a evaluar, ya sea 3PL, cruce fronterizo, personal, IMMEX o shelter.",
      note: "Soluciones por proyecto. Disponibilidad, autorizaciones, responsabilidades, términos y alcance sujetos a validación y contrato.",
      primary: "Solicite una evaluación",
      contact: "Contacto directo",
    },
  },
  energy: {
    hero: {
      eyebrow: "Energía · WDF",
      title: ["Infraestructura para", "lo que viene."],
      body: "Ingeniería, equipos e integración para subestaciones, almacenamiento de energía, salas de control e infraestructura eléctrica industrial.",
      tags: ["Substations", "BESS", "Control shelters"],
      primary: "Contactar a WDF",
      drawingLabel: "Diagrama unifilar de una subestación — decorativo",
    },
    capabilities: {
      eyebrow: "01 · Capacidades",
      title: "Un alcance que se configura para su proyecto.",
      body: "Seleccionamos los servicios y entregables a partir de la necesidad técnica, el calendario y los recursos requeridos.",
      items: [
        {
          title: "Subestaciones y red",
          body: "Definición técnica, equipos HV/MV, protecciones, auxiliares y coordinación de interfaces civiles y eléctricas.",
        },
        {
          title: "Infraestructura BESS",
          body: "Distribución, monitoreo, controles, comunicaciones y sistemas auxiliares alrededor del almacenamiento.",
        },
        {
          title: "Control shelters y E-houses",
          body: "Envolventes, layout, paneles, AC/DC, HVAC, iluminación, entradas de cable y documentación.",
        },
        {
          title: "Equipos y paquetes eléctricos",
          body: "Transformadores, interruptores, seccionadores, switchgear y paquetes de protección y control.",
        },
        {
          title: "Renovables e interconexión",
          body: "Balance de planta, estructuras, colección eléctrica, gen-tie y coordinación de conexión a la red.",
        },
        {
          title: "Soporte de campo",
          body: "Servicios técnicos en México y definición por proyecto del alcance de instalación y commissioning en EE. UU.",
        },
      ],
    },
    deliverables: {
      eyebrow: "02 · Entregables y responsabilidades",
      title: "La capacidad se convierte en un paquete definido.",
      items: [
        "Ingeniería, cálculos, planos y BOM",
        "Paquetes de equipos y submittals",
        "Integración, FAT y documentación",
        "Logística y coordinación de entrega",
      ],
      note: "Fabricante, ratings, normas, garantías, instalación y pruebas se definen en la propuesta específica.",
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
      eyebrow: "04 · Conecte capacidades",
      title: "Este pilar trabaja con los demás.",
    },
    cta: {
      eyebrow: "05 · Su siguiente proyecto",
      title: "¿Qué infraestructura necesita su proyecto?",
      body: "Cuéntenos el objetivo, el lugar y el calendario. Definimos con usted la combinación de capacidades y el alcance de trabajo.",
      primary: "Contactar a WDF",
      contact: "Contacto directo",
    },
  },
  technology: {
    hero: {
      eyebrow: "Tecnología · WDF",
      title: ["Sistemas que entienden", "su operación."],
      body: "Automatización, controles y comunicaciones para conectar equipos, procesos y datos con una ejecución industrial disciplinada.",
      tags: ["Automation", "SCADA / PLC / DCS", "Robotics"],
      primary: "Contactar a WDF",
      drawingLabel: "Red de control que conecta un PLC con sus dispositivos de campo — decorativo",
    },
    capabilities: {
      eyebrow: "01 · Capacidades",
      title: "Un alcance que se configura para su proyecto.",
      body: "Seleccionamos los servicios y entregables a partir de la necesidad técnica, el calendario y los recursos requeridos.",
      items: [
        {
          title: "Automatización industrial",
          body: "Lógica de control, secuencias, interlocks y modernización de sistemas existentes.",
        },
        {
          title: "PLC, DCS y HMI",
          body: "Programación, migración, visualización y pruebas según los requisitos de operación.",
        },
        {
          title: "SCADA y telemetría",
          body: "RTU, adquisición de datos, supervisión, historian y visibilidad operativa.",
        },
        {
          title: "Redes y comunicaciones",
          body: "Integración de redes industriales e interfaces de información entre sistemas.",
        },
        {
          title: "Robótica e integración",
          body: "Coordinación de robots, dispositivos, estaciones y controles dentro del proceso productivo.",
        },
        {
          title: "Pruebas y puesta en servicio",
          body: "Simulación, FAT/SAT, cierre de pendientes, documentación y transferencia al equipo operativo.",
        },
      ],
    },
    deliverables: {
      eyebrow: "02 · Entregables y responsabilidades",
      title: "La capacidad se convierte en un paquete definido.",
      items: [
        "Arquitectura y descripción funcional",
        "Programas, interfaces y respaldos",
        "Protocolos FAT/SAT y evidencia",
        "Documentación y capacitación",
      ],
      note: "Las plataformas, licencias, interfaces y criterios de aceptación se definen con el cliente. La ciberseguridad y los accesos remotos requieren un alcance específico.",
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
      eyebrow: "04 · Conecte capacidades",
      title: "Este pilar trabaja con los demás.",
    },
    cta: {
      eyebrow: "05 · Su siguiente proyecto",
      title: "¿Qué proceso necesita automatizar o modernizar?",
      body: "Cuéntenos el objetivo, el lugar y el calendario. Definimos con usted la combinación de capacidades y el alcance de trabajo.",
      primary: "Contactar a WDF",
      contact: "Contacto directo",
    },
  },
  divisionLines: {
    manufacturing: "De la ingeniería a la fabricación.",
    energy: "Infraestructura para lo que viene.",
    technology: "Sistemas que entienden su operación.",
    threepl: "Dos países. Una operación conectada.",
  },
  about: {
    hero: {
      eyebrow: "WDF Group · México / Estados Unidos",
      title: ["Cuatro pilares.", "Una capacidad conectada."],
      body: "Fabricamos, movemos, energizamos y automatizamos. Conectamos capacidades industriales para llevar su proyecto de la definición a la ejecución.",
      primary: "Conozca al equipo",
      secondary: "Contactar a WDF",
      divisions: "Nuestras divisiones",
    },
    team: {
      eyebrow: "01 · Liderazgo y contacto directo",
      title: "Del objetivo comercial a la definición técnica.",
      body: "Un equipo para conectar estrategia, ingeniería y seguimiento al cliente.",
      cta: "Conozca a nuestro equipo de liderazgo",
      visualLabel:
        "Ilustración: un equipo sube una viga por una escalera de bloques, cada persona impulsa a la siguiente, hasta que una llega a la cima junto a un sol naciente.",
    },
    ctaEyebrow: "02 · Contacto",
    leadership: {
      eyebrow: "Nosotros · Liderazgo y contacto directo",
      title: "Conozca a nuestro equipo de liderazgo.",
      body: "Un equipo para conectar estrategia, ingeniería y seguimiento al cliente.",
      back: "Volver a Nosotros",
      call: "Llamar",
      email: "Correo",
    },
  },
  contact: {
    eyebrow: "Contacto",
    back: "Regresar",
    title: "Hablemos de su proyecto.",
    body: "Cuéntenos lo que necesita. Seleccione todas las divisiones que involucra su proyecto y el equipo de WDF revisará sus requerimientos y le dará seguimiento.",
    info: {
      headquarters: "Oficinas centrales y operaciones",
      usOffice: "Oficina en EE. UU.",
      email: "Consultas directas",
      phone: "Teléfono · Yuma, AZ",
    },
    form: {
      title: "Recepción de proyectos y RFQ",
      sub: "Datos de contacto y requerimientos del proyecto",
      name: "Nombre",
      company: "Empresa",
      email: "Correo electrónico",
      phone: "Teléfono",
      divisions: "Divisiones requeridas",
      divisionsHint: "Seleccione todas las que apliquen.",
      divisionsRequired: "Seleccione al menos una división.",
      description: "Descripción del proyecto / pieza",
      placeholder: "Alcance, ubicación, pieza, proceso o material si lo conoce…",
      quantity: "Cantidad estimada",
      date: "Fecha objetivo",
      submit: "Enviar solicitud",
      sending: "Enviando…",
      error: "No pudimos enviar su solicitud. Revise sus datos e inténtelo de nuevo.",
      received: "Solicitud recibida",
      thanks: "Gracias.",
      follow: "El equipo de WDF revisará sus requerimientos y le dará seguimiento en breve.",
      cadTitle: "¿Tiene planos o archivos CAD?",
      cadBody:
        "Envíe el formulario y el equipo de WDF le responderá con instrucciones para compartir sus planos y especificaciones.",
    },
  },
  notFound: {
    title: "Página no encontrada",
    body: "La página que busca no existe o fue movida.",
    back: "Volver al inicio",
  },
};

export default es;
