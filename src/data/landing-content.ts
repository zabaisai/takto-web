/**
 * Contenido de la landing.
 *
 * Todos los textos provienen del mockup aprobado
 * (`mockup/tehus-crm-landing.mockup.html`). No se añaden estadísticas,
 * clientes, testimonios, certificaciones ni precios que el mockup no declare.
 *
 * Los nombres de personas y empresas son deliberadamente ficticios.
 */

export const nav = [
  { href: "#producto", label: "Producto" },
  { href: "#funciones", label: "Funciones" },
  { href: "#whatsapp", label: "WhatsApp" },
  { href: "#empresas", label: "Empresas" },
  { href: "#seguridad", label: "Seguridad" },
  { href: "#faq", label: "Preguntas frecuentes" },
] as const;

export const cta = {
  primary: "Solicitar una demostración",
  primaryShort: "Solicitar demostración",
  secondary: "Ver cómo funciona",
  login: "Iniciar sesión",
} as const;

export const hero = {
  eyebrow: "CRM para equipos que venden por WhatsApp",
  title: {
    lead: "Convierte cada conversación en una ",
    highlight: "oportunidad de venta",
  },
  subtitle:
    "Centraliza WhatsApp, organiza tus clientes y ayuda a tu equipo comercial a hacer seguimiento desde un solo lugar.",
  note: "Configuración acompañada · Acceso por empresa · Soporte personalizado",
} as const;

export const valueStrip = [
  "Conversaciones organizadas",
  "Seguimiento comercial",
  "Asesores coordinados",
  "Información centralizada",
] as const;

export const problem = {
  eyebrow: "El problema",
  title: "Vender por WhatsApp no debería significar trabajar en desorden",
  items: [
    {
      number: "01",
      title: "Conversaciones repartidas entre teléfonos",
      body: "Cada asesor tiene su propio chat y la empresa no ve el historial completo.",
    },
    {
      number: "02",
      title: "Clientes sin seguimiento",
      body: "Un prospecto pregunta, nadie vuelve a escribirle y la venta se enfría.",
    },
    {
      number: "03",
      title: "Asesores sin claridad",
      body: "No saben a quién deben atender primero ni cuál es el siguiente paso.",
    },
    {
      number: "04",
      title: "Información difícil de consultar",
      body: "Los datos comerciales viven en notas, hojas de cálculo y memoria.",
    },
  ],
  statement: {
    lead: "Tehus CRM reúne el proceso comercial para que cada contacto, mensaje, tarea y oportunidad tenga un ",
    highlightA: "responsable",
    middle: " y un ",
    highlightB: "siguiente paso",
    tail: ".",
  },
  before: {
    label: "Antes",
    items: ["Chats dispersos", "Notas manuales", "Prospectos olvidados", "Poca visibilidad"],
  },
  after: {
    label: "Con Tehus CRM",
    items: [
      "Conversaciones centralizadas",
      "Clientes organizados",
      "Tareas programadas",
      "Seguimiento visible",
    ],
  },
} as const;

export const features = {
  eyebrow: "Ecosistema",
  title: "Todo el proceso comercial en un solo espacio de trabajo",
  intro:
    "Módulos que trabajan conectados: lo que pasa en una conversación se refleja en el cliente, la oportunidad y la tarea.",
  items: [
    {
      id: "conversaciones",
      title: "Conversaciones y WhatsApp Business",
      body: "Atiende desde el CRM con el número comercial de tu empresa y sin perder el historial.",
    },
    {
      id: "pipeline",
      title: "Pipeline, leads y oportunidades",
      body: "Cada negocio avanza por etapas visibles, con responsable y valor asociado.",
    },
    {
      id: "contactos",
      title: "Contactos y clientes",
      body: "Una ficha por cliente con datos, conversaciones, oportunidades y actividad.",
    },
    {
      id: "tareas",
      title: "Tareas y seguimiento",
      body: "Llamadas, mensajes y reuniones con fecha, responsable y recordatorio.",
    },
    {
      id: "cotizaciones",
      title: "Productos, cotizaciones y documentos",
      body: "Arma propuestas con tu catálogo y la identidad de tu empresa, listas para imprimir o enviar.",
    },
    {
      id: "usuarios",
      title: "Usuarios, asesores y administración",
      body: "Roles, permisos, asignación de clientes, actividad y sesiones activas por empresa.",
    },
  ],
} as const;

export const whatsapp = {
  eyebrow: "WhatsApp Business",
  title: "Tu WhatsApp Business, ahora conectado con todo tu proceso comercial",
  body: "Conecta el número de tu empresa mediante el proceso oficial de Meta y permite que tu equipo atienda, organice y haga seguimiento sin perder el contexto de cada cliente.",
  items: [
    "Conserva el número comercial cuando la modalidad de conexión lo permita",
    "Organiza todas las conversaciones desde el CRM",
    "Asigna clientes a asesores y consulta el historial",
    "Relaciona conversaciones con contactos y oportunidades",
    "Recibe notificaciones de lo que necesita respuesta",
    "Mantén el control administrativo del canal",
  ],
  ctaPrimary: "Conectar mi empresa",
  ctaSecondary: "Ver cómo funciona",
  disclaimer:
    "La disponibilidad de determinadas funciones depende de la configuración y aprobación de la cuenta de WhatsApp Business en Meta.",
} as const;

export const conversations = {
  eyebrow: "Conversaciones",
  title: "Todas las conversaciones con contexto",
  body: "Cada asesor puede entender quién es el cliente, qué necesita y cuál debe ser el siguiente paso sin buscar información en diferentes herramientas.",
} as const;

export const contacts = {
  eyebrow: "Contactos",
  title: "Una ficha por cliente, con todo lo que el equipo necesita saber",
  body: "Datos de la empresa, personas de contacto, conversaciones, oportunidades, cotizaciones y actividad reciente reunidos en un mismo lugar y asignados a un responsable.",
  items: [
    "Datos comerciales de la empresa y de cada persona de contacto",
    "Historial de conversaciones asociado al cliente",
    "Oportunidades y cotizaciones relacionadas",
    "Asesor responsable y actividad registrada",
  ],
} as const;

export const pipeline = {
  eyebrow: "Pipeline",
  title: "Visualiza cada oportunidad de principio a fin",
  items: [
    "Mueve oportunidades entre etapas",
    "Asigna responsables",
    "Consulta valor y avance",
    "Identifica negocios detenidos",
  ],
} as const;

export const tasks = {
  eyebrow: "Tareas y seguimiento",
  title: "Que ningún cliente vuelva a quedarse sin respuesta",
  body: "El equipo abre el CRM y sabe qué hacer hoy: a quién llamar, qué mensaje enviar, cuál cotización falta y qué quedó pendiente de ayer.",
  chips: [
    "Llamada pendiente",
    "Mensaje de seguimiento",
    "Reunión",
    "Cotización por enviar",
  ],
} as const;

export const quotes = {
  eyebrow: "Cotizaciones",
  title: "Del interés a una propuesta comercial organizada",
  body: "Crea propuestas con la información e identidad de cada empresa y mantenlas relacionadas con el cliente y la oportunidad.",
  steps: [
    "Selecciona productos y cantidades de tu catálogo",
    "Se aplican los datos comerciales y fiscales de tu empresa",
    "Genera el documento con vista para impresión",
    "Sigue el estado de la cotización desde la oportunidad",
  ],
} as const;

export const team = {
  eyebrow: "Control del equipo",
  title: "Visibilidad para administrar sin perder cercanía",
  body: "Cada persona ve lo que le corresponde. El administrador ve el panorama completo de su empresa: usuarios, asignaciones, actividad y sesiones abiertas.",
  roles: [
    {
      code: "SUPER_ADMIN",
      title: "Plataforma",
      body: "Administra la plataforma y las empresas que operan en ella.",
      tone: "dark" as const,
    },
    {
      code: "ADMIN",
      title: "Empresa",
      body: "Administra su empresa: asesores, configuración e información comercial.",
      tone: "light" as const,
    },
    {
      code: "ASESOR",
      title: "Atención",
      body: "Atiende clientes y gestiona el trabajo asignado según sus permisos.",
      tone: "light" as const,
    },
  ],
} as const;

export const notifications = {
  eyebrow: "Notificaciones",
  title: "Lo importante aparece cuando necesitas atenderlo",
  body: "Avisos dentro del CRM para conversaciones nuevas, tareas próximas o vencidas y cambios en oportunidades. Cada usuario elige qué quiere recibir.",
  preferences: [
    { label: "Conversaciones nuevas", enabled: true },
    { label: "Tareas próximas y vencidas", enabled: true },
    { label: "Cambios en oportunidades", enabled: false },
  ],
} as const;

export const companies = {
  eyebrow: "Personalización",
  title: "Un CRM que también se siente parte de tu empresa",
  body: "Nombre, logotipo, colores, datos comerciales y fiscales, moneda, identidad de las cotizaciones y el pipeline inicial: cada empresa configura su propio espacio.",
  disclaimer: "Ejemplos ilustrativos. Las empresas mostradas son ficticias.",
  samples: [
    { name: "Distribuidora Ejemplo", color: "#B7790B", label: "Ámbar · COP", fill: 72 },
    { name: "Clínica Ejemplo", color: "#1F5C8B", label: "Azul · COP", fill: 64 },
    { name: "Agroservicios Ejemplo", color: "#2F6B4F", label: "Verde · COP", fill: 80 },
  ],
  onboardingTitle: "Incorporación guiada de tu empresa",
  onboarding: [
    "Código de invitación",
    "Datos de la empresa",
    "Identidad visual",
    "Configuración comercial",
    "Pipeline",
    "Administrador",
    "Asesores",
    "Confirmación",
  ],
} as const;

export const security = {
  eyebrow: "Seguridad",
  title: "La información de cada empresa permanece separada",
  body: "Cada empresa trabaja en su propio espacio y cada usuario accede solo a lo que su rol permite.",
  items: [
    {
      title: "Acceso por rol y permisos",
      body: "Cada persona ve lo que necesita para su trabajo.",
    },
    {
      title: "Separación entre empresas",
      body: "La información de una empresa no se cruza con otra.",
    },
    {
      title: "Sesiones controladas",
      body: "El administrador revisa y revoca accesos cuando lo necesita.",
    },
    {
      title: "Protección de credenciales",
      body: "Las contraseñas no se almacenan en texto legible.",
    },
    {
      title: "Registro de actividad",
      body: "Queda trazabilidad de las acciones relevantes.",
    },
    {
      title: "Conexiones oficiales",
      body: "La integración con WhatsApp usa los canales oficiales del proveedor.",
    },
  ],
} as const;

export const process = {
  eyebrow: "Cómo comenzar",
  title: "Implementación acompañada, paso a paso",
  steps: [
    {
      step: "Paso 01",
      title: "Solicitas una demostración",
      body: "Agendamos una sesión para mostrarte el CRM funcionando.",
    },
    {
      step: "Paso 02",
      title: "Conocemos tu proceso comercial",
      body: "Revisamos cómo vende tu equipo hoy y qué necesita ordenar.",
    },
    {
      step: "Paso 03",
      title: "Configuramos el espacio y los usuarios",
      body: "Identidad, pipeline, asesores y conexión de WhatsApp Business.",
    },
    {
      step: "Paso 04",
      title: "Tu equipo empieza a trabajar con orden",
      body: "Con acompañamiento durante los primeros días de uso.",
    },
  ],
} as const;

export const demo = {
  eyebrow: "Demostración",
  title: "Veamos Tehus CRM con el proceso de tu empresa",
  body: "Cuéntanos cómo vende tu equipo y preparamos una demostración enfocada en tu caso. Sin compromiso.",
  bullets: [
    "Sesión guiada de aproximadamente 30 minutos",
    "Revisión de la conexión de WhatsApp Business en tu caso",
    "Propuesta de configuración para tu equipo",
  ],
  secondaryCta: "Hablar con un asesor",
  footnote: "Te responderemos con horarios disponibles para la demostración.",
} as const;

export const faq = {
  eyebrow: "Preguntas frecuentes",
  title: "Respuestas claras antes de empezar",
  items: [
    {
      q: "¿Tehus CRM reemplaza WhatsApp Business?",
      a: "No. Lo complementa: tu empresa sigue usando su cuenta de WhatsApp Business y el CRM organiza esas conversaciones junto con clientes, oportunidades y tareas.",
    },
    {
      q: "¿Puedo conservar mi número actual?",
      a: "Dependiendo de la elegibilidad del número y de las opciones habilitadas por Meta, es posible utilizar modalidades que permiten conservar el número en WhatsApp Business. Durante la configuración verificamos cada caso.",
    },
    {
      q: "¿Cuántos asesores pueden utilizar el CRM?",
      a: "Se configura según el tamaño de tu equipo comercial. En la demostración definimos cuántos usuarios necesita tu empresa y cómo se organizarán.",
    },
    {
      q: "¿Cada empresa tiene su propio espacio?",
      a: "Sí. Cada empresa trabaja en su propio espacio, con sus usuarios, su información comercial y su configuración; los datos no se comparten entre empresas.",
    },
    {
      q: "¿Puedo personalizar el CRM con mi marca?",
      a: "Puedes configurar nombre, logotipo, colores principal y secundario, datos comerciales y fiscales, moneda y la identidad de tus cotizaciones.",
    },
    {
      q: "¿Cómo se protegen los datos?",
      a: "Con acceso por roles y permisos, separación de la información entre empresas, control de sesiones, protección de credenciales y registro de actividad.",
    },
    {
      q: "¿Puedo administrar permisos de mi equipo?",
      a: "Sí. El administrador de la empresa define qué puede ver y hacer cada asesor, asigna clientes y puede revocar accesos cuando lo necesite.",
    },
    {
      q: "¿Necesito conocimientos técnicos?",
      a: "No. La configuración inicial es acompañada y el uso diario está pensado para equipos comerciales, no para perfiles técnicos.",
    },
    {
      q: "¿La conexión con WhatsApp depende de Meta?",
      a: "Sí. La conexión se realiza por los canales oficiales, y la disponibilidad de algunas funciones depende de la configuración y aprobación de la cuenta de WhatsApp Business en Meta.",
    },
    {
      q: "¿Cómo solicito una demostración?",
      a: "Completa el formulario de esta página con los datos de tu empresa y te contactamos para agendar la sesión.",
    },
  ],
} as const;

export const finalCta = {
  title:
    "Tu equipo ya tiene conversaciones. Ahora necesita un sistema para convertirlas en ventas.",
  body: "Conoce cómo Tehus CRM puede adaptarse al proceso comercial de tu empresa.",
  primary: "Solicitar una demostración",
  secondary: "Hablar con un asesor",
} as const;

export const footer = {
  tagline: "CRM comercial para equipos que venden por WhatsApp. Colombia.",
  contactPending: "Correo de contacto: pendiente de confirmar",
  whatsappPending: "WhatsApp comercial: pendiente de confirmar",
  columns: [
    {
      title: "Producto",
      links: [
        { href: "/#funciones", label: "Funciones" },
        { href: "/#whatsapp", label: "WhatsApp" },
        { href: "/#empresas", label: "Personalización" },
        { href: "/#seguridad", label: "Seguridad" },
      ],
    },
    {
      title: "Empresa",
      links: [
        { href: "/#producto", label: "Nosotros" },
        { href: "/#demo", label: "Contacto" },
        { href: "/#demo", label: "Solicitar demostración" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "/privacidad", label: "Política de privacidad" },
        { href: "/terminos", label: "Términos y condiciones" },
        { href: "/tratamiento-datos", label: "Política de tratamiento de datos" },
      ],
    },
  ],
  copyright: "© 2026 Tehus CRM. Todos los derechos reservados.",
  trademark:
    "WhatsApp es una marca de Meta Platforms, Inc. Tehus CRM no está afiliado a Meta.",
} as const;

/**
 * Datos demostrativos de los mockups de producto.
 * Personas y empresas ficticias. Sin correos, teléfonos ni identificadores reales.
 */
export const demoData = {
  conversations: [
    {
      initials: "MG",
      name: "María Gómez",
      time: "10:24",
      preview: "¿Me confirmas el precio de las 20 sillas?",
      agent: "Camilo R.",
      state: "Abierta",
    },
    {
      initials: "JT",
      name: "Jorge Torres",
      time: "09:58",
      preview: "Quedo atento a la cotización",
      agent: null,
      state: "Sin asignar",
    },
    {
      initials: "AL",
      name: "Ana López",
      time: "Ayer",
      preview: "Gracias, lo reviso con el equipo",
      agent: "Laura M.",
      state: null,
    },
  ],
  thread: [
    { from: "cliente" as const, text: "Hola, ¿tienen sillas ejecutivas disponibles?" },
    { from: "empresa" as const, text: "¡Claro! Te comparto opciones y precios." },
    { from: "cliente" as const, text: "¿Me confirmas el precio de las 20 sillas?" },
  ],
  account: {
    company: "Distribuciones del Valle",
    contact: "Contacto: María Gómez · Compras",
    since: "Cliente desde marzo",
  },
  opportunity: {
    name: "Dotación oficina · 20 sillas",
    value: "$ 8.400.000",
    stage: "Cotización",
  },
  nextTask: "Enviar cotización · hoy 4:00 p.m.",
  history: [
    "Conversación asignada a Camilo R.",
    "Oportunidad creada",
    "Cotización en preparación",
  ],
  pipelineColumns: [
    {
      name: "Nuevo lead",
      count: 4,
      highlight: false,
      cards: [
        { name: "Oficinas Andes", value: "$ 2.100.000" },
        { name: "Hotel Marena", value: "$ 5.600.000" },
      ],
    },
    {
      name: "Calificado",
      count: 3,
      highlight: false,
      cards: [{ name: "Café Bourbon", value: "$ 3.250.000", agent: "Laura M." }],
    },
    {
      name: "Cotización",
      count: 2,
      highlight: true,
      cards: [
        {
          name: "Distribuciones del Valle",
          value: "$ 8.400.000",
          agent: "Camilo R.",
          tag: "Tarea hoy",
          featured: true,
        },
      ],
    },
    {
      name: "Negociación",
      count: 2,
      highlight: false,
      cards: [
        { name: "Clínica Sauce", value: "$ 12.900.000", warning: "Sin movimiento 6 días" },
      ],
    },
    {
      name: "Cerrado ganado",
      count: 5,
      highlight: false,
      cards: [{ name: "Grupo Tarraza", value: "$ 6.750.000", won: true }],
    },
    {
      name: "Cerrado perdido",
      count: 1,
      highlight: false,
      cards: [{ name: "Textiles Norte", note: "Motivo registrado", lost: true }],
    },
  ],
  tasks: [
    {
      title: "Llamar a Jorge Torres",
      meta: "Vencida ayer · Camilo R.",
      state: "overdue" as const,
    },
    {
      title: "Enviar cotización · Distribuciones del Valle",
      meta: "Hoy 4:00 p.m.",
      state: "today" as const,
    },
    {
      title: "Mensaje de seguimiento · Café Bourbon",
      meta: "Mañana 9:00 a.m.",
      state: "upcoming" as const,
    },
    {
      title: "Reunión con Hotel Marena",
      meta: "Completada 8:30 a.m.",
      state: "done" as const,
    },
  ],
  quote: {
    company: "Distribuidora Ejemplo S.A.S.",
    fiscalNote: "NIT y datos fiscales de la empresa",
    number: "COT-0184",
    status: "Enviada",
    lines: [
      { product: "Silla ejecutiva Roble", qty: "20", amount: "$8.400.000" },
      { product: "Instalación en sitio", qty: "1", amount: "$380.000" },
    ],
    total: "$ 8.780.000",
    relatedLabel: "Relacionada con la oportunidad",
    related: "Dotación oficina · 20 sillas",
  },
  users: [
    {
      initials: "CR",
      name: "Camilo Restrepo",
      meta: "Asesor · 12 clientes asignados",
      badge: "Sesión activa",
      tone: "active" as const,
    },
    {
      initials: "LM",
      name: "Laura Mejía",
      meta: "Asesor · 9 clientes asignados",
      badge: "Hace 2 h",
      tone: "idle" as const,
    },
    {
      initials: "DA",
      name: "Diana Arias",
      meta: "Administrador",
      badge: "Permisos",
      tone: "admin" as const,
    },
  ],
  activity: [
    { title: "Oportunidad asignada a Camilo R.", meta: "Hoy 10:26 a.m.", current: true },
    { title: "Inicio de sesión · navegador de escritorio", meta: "Hoy 8:02 a.m.", current: false },
    { title: "Cotización COT-0184 enviada", meta: "Ayer 5:41 p.m.", current: false },
  ],
  notifications: [
    {
      title: "Nueva conversación de María Gómez",
      meta: "WhatsApp Business · hace 2 min",
      tone: "wa" as const,
      unread: true,
    },
    {
      title: "Tarea vencida: llamar a Jorge Torres",
      meta: "Ayer 3:00 p.m.",
      tone: "danger" as const,
      unread: false,
    },
    {
      title: "Tarea próxima: enviar cotización",
      meta: "Hoy 4:00 p.m.",
      tone: "brand" as const,
      unread: false,
    },
    {
      title: "Oportunidad asignada a Camilo R.",
      meta: "Hoy 10:26 a.m.",
      tone: "muted" as const,
      unread: false,
    },
  ],
} as const;
