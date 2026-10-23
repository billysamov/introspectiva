export const site = {
  name: "Introspectiva Studio",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://introspectiva.digital",
  description: "Estudio de diseño y desarrollo digital en Lima, Perú. Sitios web, tiendas online y sistemas a medida: estrategia, diseño y tecnología con intención.",
};

export const services = [
  {
    slug: "diseno-web", formValue: "corporativa", number: "01", name: "Diseño & desarrollo web", short: "Una presencia a la altura de tu marca.",
    description: "Sitios web que cuentan quién eres, hacen fácil encontrar lo importante y convierten el interés en una conversación.",
    headline: "Tu negocio tiene mucho que decir. Hagamos que se vea.",
    detail: "Diseñamos sitios corporativos y páginas de campaña con una estructura clara, una identidad propia y una experiencia cuidada en cada pantalla. Empezamos por tu negocio y por lo que tus clientes necesitan encontrar.",
    tags: ["Estrategia digital", "UX/UI", "Desarrollo web"],
    includes: ["Arquitectura de información y recorrido del visitante", "Diseño visual original y adaptable a móviles", "Desarrollo con contenido indexable y SEO técnico", "Formularios, WhatsApp e integraciones acordadas", "Configuración del dominio y acompañamiento al lanzamiento"],
    audience: "Empresas de servicios, estudios, marcas personales y negocios que necesitan presentar su oferta con claridad.",
    outcome: "Una web que puedes compartir con confianza y una base preparada para seguir creciendo.",
    faq: [
      ["¿Será una web de una sola página?", "Definimos la estructura según tu negocio. Un sitio corporativo puede tener páginas independientes de servicios, proyectos, equipo y contacto. Una landing se reserva para una campaña con un objetivo específico."],
      ["¿Puedo actualizar el contenido?", "Sí. Si necesitas editarlo con frecuencia, incluimos un gestor de contenido dentro del alcance acordado. También entregamos instrucciones para el mantenimiento."],
      ["¿Incluye posicionamiento en Google?", "Incluye una base técnica: estructura semántica, metadatos, sitemap e imágenes optimizadas. Las posiciones dependen de competencia, contenido y trabajo continuo; no prometemos un puesto específico."],
    ],
  },
  {
    slug: "ecommerce", formValue: "ecommerce", number: "02", name: "Tiendas online", short: "Del primer vistazo a la próxima compra.",
    description: "Experiencias de compra claras y atractivas, con un catálogo fácil de explorar y una operación pensada para tu equipo.",
    headline: "Productos que enamoran. Una tienda que facilita elegir.",
    detail: "Conectamos el diseño de tu tienda con la realidad de tu operación. Organizamos el catálogo, simplificamos el recorrido de compra y elegimos las integraciones de pago y gestión que tu negocio necesita.",
    tags: ["eCommerce", "Catálogo digital", "Integraciones"],
    includes: ["Estructura de categorías y fichas de producto", "Diseño del catálogo, carrito y proceso de compra", "Integración de medios de pago según disponibilidad", "Configuración de envíos, inventario y promociones acordadas", "Capacitación para administrar productos y pedidos"],
    audience: "Marcas de productos, comercios y empresas B2B que quieren llevar su catálogo a una experiencia digital ordenada.",
    outcome: "Una tienda que ayuda a tus clientes a elegir y a tu equipo a gestionar las ventas.",
    faq: [
      ["¿Qué medios de pago puedo ofrecer?", "Elegimos la pasarela según tu país, tipo de negocio y plataforma. Sus comisiones y condiciones se revisan antes de contratar."],
      ["¿Cuántos productos puede tener mi tienda?", "Lo definimos en la propuesta, incluyendo carga inicial, variantes y necesidades de inventario. La solución se dimensiona a partir de tu catálogo real."],
      ["¿Puedo empezar con un catálogo sin pago online?", "Sí. Podemos preparar un catálogo con consultas por WhatsApp y planificar una siguiente etapa con carrito y pagos."],
    ],
  },
  {
    slug: "sistemas-a-medida", formValue: "sistema", number: "03", name: "Sistemas a medida", short: "Menos tareas repetidas. Más posibilidades.",
    description: "Herramientas digitales que conectan información, simplifican procesos y se adaptan a la forma en que trabajas.",
    headline: "Tu operación es única. Tu sistema también debería serlo.",
    detail: "Convertimos procesos dispersos en herramientas claras. Diseñamos portales de clientes, paneles de gestión y aplicaciones web a partir de un problema concreto, con entregas por etapas para validar lo que construimos.",
    tags: ["Aplicaciones web", "Automatización", "Bases de datos"],
    includes: ["Mapeo de procesos y definición de prioridades", "Prototipo de los flujos principales", "Desarrollo de módulos, roles y permisos acordados", "Integración de bases de datos y servicios externos", "Pruebas, documentación y plan de evolución"],
    audience: "Equipos que dependen de hojas de cálculo, tareas manuales o herramientas que ya no acompañan su operación.",
    outcome: "Una herramienta construida alrededor de tu proceso, con información centralizada y acceso según cada rol.",
    faq: [
      ["¿Pueden integrar herramientas que ya utilizo?", "Revisamos sus APIs, permisos y límites durante el diagnóstico. La integración se confirma en la propuesta técnica."],
      ["¿Tenemos que construir todo de una vez?", "No. Priorizamos un primer alcance útil y luego incorporamos mejoras según las necesidades y el uso del equipo."],
      ["¿Cómo protegen la información?", "Definimos permisos de acceso, validaciones de servidor y políticas de datos según el proyecto. El mantenimiento y las copias de seguridad se acuerdan antes de lanzar."],
    ],
  },
  {
    slug: "identidad-digital", formValue: "asesoria", number: "04", name: "Identidad & experiencia", short: "Una marca que se reconoce. Y se recuerda.",
    description: "Conectamos identidad visual, contenido y experiencia para que cada punto de contacto hable el mismo idioma.",
    headline: "Una buena experiencia empieza con una idea clara.",
    detail: "Damos forma a cómo se ve, se siente y se utiliza tu marca en digital. Trabajamos el diseño de interfaces y la dirección visual junto con nuestra colaboración creativa, manteniendo coherencia entre identidad y producto.",
    tags: ["Identidad visual", "Diseño UX/UI", "Motion"],
    includes: ["Exploración de marca y dirección visual", "Paleta, tipografía y criterios de composición", "Diseño de interfaces y prototipos navegables", "Sistema de componentes y estados de interacción", "Guías para aplicar la identidad en digital"],
    audience: "Marcas que están empezando, evolucionando o buscando una experiencia digital más coherente.",
    outcome: "Un lenguaje visual propio y una experiencia que hace más fácil entender, explorar y actuar.",
    faq: [
      ["¿Necesito cambiar mi logo?", "No necesariamente. Primero revisamos tu identidad y definimos qué conservar, mejorar o ampliar."],
      ["¿Puedo contratar solo el diseño?", "Sí. Podemos entregar diseño y prototipo con especificaciones para el equipo que realizará el desarrollo."],
      ["¿Incluyen animaciones?", "Definimos un sistema de movimiento para guiar la atención y dar personalidad, con alternativas para quienes prefieren reducir las animaciones."],
    ],
  },
];

export const projects = [
  { slug: "d-gali-home", name: "D Gali Home", category: "eCommerce", sector: "Regalos & juguetes", color: "peach", image: "/images/gali-project.jpeg", label: "Una experiencia para regalar.", summary: "Un escaparate digital para descubrir regalos, juguetes y detalles que acompañan momentos especiales.", challenge: "Presentar una oferta estacional de regalos y juguetes de forma atractiva, facilitando que el visitante explore y encuentre una opción para cada ocasión.", approach: "El proyecto combina una presentación visual del catálogo con una estructura de comercio electrónico. La selección de productos ocupa el centro de la experiencia.", scope: ["Tienda online", "Presentación de catálogo", "Experiencia de compra"], note: "Proyecto incluido en el portafolio público de Introspectiva Studio. Las capturas corresponden a esa publicación." },
  { slug: "siis-ingenieria", name: "SIIS Ingeniería", category: "Web corporativa", sector: "Tecnología & telecomunicaciones", color: "ice", image: "/images/siis-project.jpeg", label: "La tecnología, más cerca.", summary: "Una presencia digital para acercar equipos y soluciones de fibra óptica a un público empresarial.", challenge: "Organizar una oferta técnica de equipos y fibra óptica para que empresas y profesionales puedan conocer los productos y encontrar información relevante.", approach: "Una experiencia de catálogo corporativo orientada al contexto B2B, con una presentación clara de la oferta y puntos de contacto para continuar la conversación comercial.", scope: ["Catálogo B2B", "Diseño de interfaz", "Presencia corporativa"], note: "Proyecto incluido en el portafolio público de Introspectiva Studio. Las capturas corresponden a esa publicación." },
  { slug: "introspectiva-studio", name: "Introspectiva Studio", category: "Diseño web", sector: "Estudio digital", color: "blue", image: "/images/hero-sculpture.png", label: "Mirar dentro para ir más allá.", summary: "La evolución de nuestra propia presencia: estrategia, diseño y tecnología en un sitio con identidad.", challenge: "Pasar de una única página comercial a un sitio completo que permita conocer los servicios, explorar proyectos y comprender cómo trabaja el estudio.", approach: "Una arquitectura con páginas independientes, dirección visual editorial, movimiento con GSAP y un flujo de contacto preparado para guardar consultas en Supabase.", scope: ["Estrategia de contenido", "Diseño UX/UI", "Next.js & GSAP"], note: "Proyecto propio. Rediseño del sitio de Introspectiva Studio." },
];

export const processSteps = [
  { number: "01", title: "Miramos dentro.", text: "Escuchamos tu idea, entendemos tu negocio y encontramos el problema que vale la pena resolver.", detail: "Objetivos · Audiencia · Alcance" },
  { number: "02", title: "Le damos forma.", text: "Organizamos el contenido y diseñamos una experiencia que conecta tu identidad con las necesidades de tus clientes.", detail: "Estrategia · Diseño · Prototipo" },
  { number: "03", title: "Lo hacemos real.", text: "Construimos, probamos y afinamos cada detalle. Te involucramos en los momentos clave para avanzar con claridad.", detail: "Desarrollo · Pruebas · Ajustes" },
  { number: "04", title: "Seguimos adelante.", text: "Lanzamos tu proyecto, entregamos los accesos y definimos contigo el siguiente paso para mantenerlo y hacerlo crecer.", detail: "Lanzamiento · Entrega · Evolución" },
];

export const commonFaq = [
  ["¿Por dónde empezamos?", "Con una conversación sobre tu negocio, tus objetivos y lo que necesitas resolver. A partir de eso preparamos una propuesta con alcance, entregables, inversión y calendario."],
  ["¿Cuánto cuesta un proyecto?", "Depende de la estructura, las funcionalidades y el contenido. La propuesta detalla qué incluye el proyecto y separa los costos recurrentes, como dominio, hosting o servicios externos."],
  ["¿Cuánto tiempo toma?", "Definimos el calendario después de revisar el alcance y los materiales disponibles. Las fechas y las etapas de revisión quedan en la propuesta, para que sepas qué esperar."],
  ["¿Trabajan con clientes fuera de Lima?", "Sí. Podemos llevar el proyecto de forma remota, con reuniones de seguimiento y entregas digitales."],
  ["¿Qué pasa después del lanzamiento?", "Entregamos los accesos y la documentación acordada. Si necesitas soporte o mejoras continuas, definimos un plan con responsabilidades y condiciones claras."],
];
