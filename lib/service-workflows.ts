export type ServiceWorkflowSlug = "diseno-web" | "ecommerce" | "sistemas-a-medida" | "identidad-digital";

export type WorkflowStep = {
  label: string;
  title: string;
  description: string;
  activities: string[];
  deliverable: string;
  review: string[];
  collaboration: string;
};

export type ServiceWorkflow = {
  introduction: string;
  steps: WorkflowStep[];
};

export const serviceWorkflows: Record<ServiceWorkflowSlug, ServiceWorkflow> = {
  "diseno-web": {
    introduction: "De la primera conversación a una web lista para recibir visitas. En cada etapa sabes qué estamos construyendo, qué revisamos contigo y qué viene después.",
    steps: [
      {
        label: "Descubrir",
        title: "Primero, entendemos tu negocio.",
        description: "Definimos qué debe resolver la web, a quién se dirige y cómo acompaña la decisión de tus clientes.",
        activities: ["Revisión de la presencia actual y los referentes", "Objetivos, audiencias y prioridades del proyecto", "Inventario de contenido y funcionalidades necesarias"],
        deliverable: "Brief y alcance del sitio",
        review: ["Objetivo principal de la web", "Páginas y funciones incluidas", "Materiales y responsabilidades"],
        collaboration: "Nos cuentas cómo funciona tu negocio y revisamos juntos las prioridades antes de diseñar.",
      },
      {
        label: "Estructurar",
        title: "Cada página tiene una razón de ser.",
        description: "Organizamos la información para que tus visitantes entiendan tu propuesta y encuentren su siguiente paso.",
        activities: ["Mapa de páginas y navegación", "Jerarquía de mensajes y llamadas a la acción", "Wireframes de las pantallas principales"],
        deliverable: "Mapa web y estructura de contenido",
        review: ["Recorridos entre páginas", "Contenido de cada sección", "Puntos de contacto visibles"],
        collaboration: "Validas la estructura y compartes la información que debe estar presente en cada página.",
      },
      {
        label: "Diseñar",
        title: "Tu identidad, en cada interacción.",
        description: "Damos forma a una experiencia propia, con tipografía, imágenes y movimiento al servicio de tu mensaje.",
        activities: ["Dirección visual y diseño de interfaces", "Adaptación de pantallas a móvil y escritorio", "Prototipo de navegación y estados de interacción"],
        deliverable: "Prototipo navegable de la web",
        review: ["Diseño de las páginas clave", "Comportamiento en móvil", "Formularios y navegación"],
        collaboration: "Recorres el prototipo y reunimos tus comentarios antes de pasar a desarrollo.",
      },
      {
        label: "Construir",
        title: "El diseño se convierte en una web real.",
        description: "Desarrollamos las páginas y sus conexiones, cuidando el rendimiento, la accesibilidad y la experiencia en distintos dispositivos.",
        activities: ["Desarrollo de páginas y componentes", "Formularios e integraciones acordadas", "Pruebas de navegación, contenido y adaptación"],
        deliverable: "Web funcional en un entorno de revisión",
        review: ["Páginas e interacciones operativas", "Envío y recepción de formularios", "Revisión de accesibilidad y rendimiento"],
        collaboration: "Exploras una versión real de la web y validas el contenido y los recorridos principales.",
      },
      {
        label: "Lanzar",
        title: "Publicamos. Y dejamos todo en orden.",
        description: "Coordinamos la salida a producción y entregamos lo necesario para que tengas claridad sobre la gestión de tu sitio.",
        activities: ["Configuración de dominio y publicación", "Verificación de enlaces, metadatos y formularios", "Entrega de accesos y guía de gestión"],
        deliverable: "Sitio publicado y documentación de entrega",
        review: ["Dominio y conexiones revisados", "Accesos y responsables definidos", "Siguientes mejoras priorizadas"],
        collaboration: "Apruebas la publicación, recibes los accesos y acordamos el mantenimiento que necesites.",
      },
    ],
  },
  ecommerce: {
    introduction: "Una tienda necesita una buena experiencia de compra y una operación ordenada. Diseñamos ambas, con revisiones concretas desde el catálogo hasta el primer pedido de prueba.",
    steps: [
      {
        label: "Diagnosticar",
        title: "La tienda empieza en tu operación.",
        description: "Entendemos qué vendes, cómo lo gestionas y qué necesita saber una persona antes de comprar.",
        activities: ["Revisión de productos, variantes y categorías", "Definición de inventario, envíos y atención", "Evaluación de plataforma y pasarelas disponibles"],
        deliverable: "Plan comercial y funcional de la tienda",
        review: ["Catálogo y alcance inicial", "Reglas de venta y envío", "Integraciones y costos externos"],
        collaboration: "Compartes tu catálogo y validamos las condiciones de venta y la operación del negocio.",
      },
      {
        label: "Organizar",
        title: "Hacemos más fácil encontrar y elegir.",
        description: "Convertimos el catálogo en una estructura comprensible, con información útil para comparar productos.",
        activities: ["Categorías, filtros y navegación", "Estructura de fichas y variantes", "Organización de fotografías y descripciones"],
        deliverable: "Arquitectura del catálogo y ficha modelo",
        review: ["Categorías y atributos", "Información de producto", "Materiales para la carga inicial"],
        collaboration: "Revisas una selección representativa de productos y completas la información comercial.",
      },
      {
        label: "Diseñar",
        title: "Un recorrido de compra sin dudas.",
        description: "Diseñamos la exploración del catálogo, el carrito y los pasos de compra para mostrar lo importante en cada momento.",
        activities: ["Diseño de catálogo y páginas de producto", "Flujos de carrito, compra y confirmación", "Estados vacíos, errores y vista móvil"],
        deliverable: "Prototipo del recorrido de compra",
        review: ["Selección de productos y variantes", "Costos y condiciones visibles", "Compra desde el móvil"],
        collaboration: "Simulas una compra en el prototipo y validamos los mensajes y las reglas de negocio.",
      },
      {
        label: "Conectar",
        title: "Conectamos la experiencia con la gestión.",
        description: "Implementamos el catálogo y las integraciones acordadas para conectar la compra con el trabajo de tu equipo.",
        activities: ["Carga inicial y configuración de productos", "Integración de pagos y métodos de envío", "Configuración de pedidos y notificaciones"],
        deliverable: "Tienda operativa en entorno de prueba",
        review: ["Catálogo y stock configurados", "Estados de pago y pedido", "Notificaciones y gestión interna"],
        collaboration: "Facilitas las cuentas necesarias y comprobamos cómo tu equipo recibirá y atenderá cada pedido.",
      },
      {
        label: "Validar y abrir",
        title: "Ensayamos la compra antes de abrir.",
        description: "Probamos el recorrido completo y preparamos al equipo para administrar la tienda con una guía clara.",
        activities: ["Pedidos de prueba y escenarios de error", "Revisión de contenido y condiciones comerciales", "Capacitación y publicación de la tienda"],
        deliverable: "Tienda publicada y guía de operación",
        review: ["Compra de prueba verificada", "Gestión de productos y pedidos", "Accesos y soporte acordados"],
        collaboration: "Participas en una prueba de compra y en la entrega para aprender a gestionar el día a día.",
      },
    ],
  },
  "sistemas-a-medida": {
    introduction: "Partimos de un proceso real y lo convertimos en una herramienta útil. Trabajamos por etapas para contrastar las decisiones con las personas que van a usar el sistema.",
    steps: [
      {
        label: "Entender",
        title: "Observamos cómo trabaja tu equipo.",
        description: "Mapeamos el proceso actual, los puntos de fricción y la información que hoy está dispersa.",
        activities: ["Conversaciones con las personas usuarias", "Mapa del proceso y fuentes de información", "Priorización del primer alcance útil"],
        deliverable: "Mapa de procesos y alcance priorizado",
        review: ["Problemas y casos de uso", "Usuarios y responsabilidades", "Funciones de la primera versión"],
        collaboration: "Nos muestras el proceso actual y elegimos juntos qué problema resolver primero.",
      },
      {
        label: "Modelar",
        title: "Damos estructura a los datos y las reglas.",
        description: "Definimos qué información necesita el sistema, cómo se relaciona y quién puede acceder a ella.",
        activities: ["Modelo de datos y reglas de negocio", "Matriz de roles y permisos", "Revisión de APIs e integraciones existentes"],
        deliverable: "Especificación funcional y modelo de datos",
        review: ["Relaciones y validaciones de datos", "Accesos por rol", "Límites de las integraciones"],
        collaboration: "Validas las reglas con tu equipo y confirmas qué datos necesita consultar o modificar cada rol.",
      },
      {
        label: "Prototipar",
        title: "Probamos el flujo antes de construirlo.",
        description: "Diseñamos las pantallas alrededor de tareas concretas para revisar cómo se utilizará el sistema en la práctica.",
        activities: ["Diseño de paneles, formularios y estados", "Prototipo de los recorridos prioritarios", "Revisión con personas del equipo operativo"],
        deliverable: "Prototipo de los flujos principales",
        review: ["Tareas de cada tipo de usuario", "Estados de éxito, vacío y error", "Información para tomar decisiones"],
        collaboration: "Tu equipo recorre situaciones reales y nos ayuda a detectar pasos confusos o innecesarios.",
      },
      {
        label: "Desarrollar",
        title: "Construimos módulos que puedes revisar.",
        description: "Implementamos la aplicación por partes, conectando la interfaz con los datos y las reglas definidas.",
        activities: ["Desarrollo de módulos e integraciones", "Autenticación, permisos y validaciones", "Pruebas funcionales de cada entrega"],
        deliverable: "Versión funcional en entorno de revisión",
        review: ["Operaciones y reglas implementadas", "Restricciones de acceso verificadas", "Integraciones y manejo de errores"],
        collaboration: "Revisas las entregas con casos de tu operación y confirmamos los criterios de aceptación.",
      },
      {
        label: "Implementar",
        title: "Acompañamos el paso al uso real.",
        description: "Preparamos la puesta en marcha, documentamos la operación y definimos una ruta de evolución del sistema.",
        activities: ["Pruebas de aceptación con el equipo", "Preparación de datos y puesta en producción", "Documentación, formación y próximas mejoras"],
        deliverable: "Sistema publicado y guía de operación",
        review: ["Casos de uso aceptados", "Accesos y operación documentados", "Mantenimiento y respaldo acordados"],
        collaboration: "Designas responsables de operación, validas la puesta en marcha y priorizamos la siguiente etapa.",
      },
    ],
  },
  "identidad-digital": {
    introduction: "Construimos un lenguaje visual que se pueda reconocer, utilizar y mantener. Cada etapa conecta la idea de marca con decisiones concretas de diseño e interacción.",
    steps: [
      {
        label: "Explorar",
        title: "Encontramos lo que hace propia a tu marca.",
        description: "Escuchamos tu visión y revisamos cómo se expresa hoy la marca en sus distintos puntos de contacto.",
        activities: ["Conversación sobre posicionamiento y audiencia", "Auditoría de identidad y experiencia actual", "Referentes y oportunidades de diferenciación"],
        deliverable: "Diagnóstico y principios de marca",
        review: ["Personalidad y atributos", "Elementos que conviene conservar", "Necesidades de la experiencia digital"],
        collaboration: "Compartes la historia de tu marca y contrastamos cómo quieres que se perciba.",
      },
      {
        label: "Dirigir",
        title: "Una dirección visual con intención.",
        description: "Exploramos un lenguaje de color, tipografía e imagen coherente con la personalidad y el contexto de tu marca.",
        activities: ["Territorios visuales y moodboards", "Selección de paleta y tipografía", "Criterios para fotografía, ilustración y composición"],
        deliverable: "Dirección de arte y propuesta visual",
        review: ["Concepto visual y referencias", "Combinaciones de color y tipografía", "Aplicaciones iniciales de la identidad"],
        collaboration: "Revisamos las propuestas y elegimos una dirección con criterios compartidos.",
      },
      {
        label: "Diseñar",
        title: "La identidad se convierte en experiencia.",
        description: "Llevamos la dirección visual a pantallas y recorridos que conectan la marca con las necesidades de sus usuarios.",
        activities: ["Diseño de interfaces prioritarias", "Jerarquía de mensajes y contenido", "Prototipo de navegación e interacción"],
        deliverable: "Diseño de interfaces y prototipo navegable",
        review: ["Pantallas clave en contexto", "Legibilidad y jerarquía visual", "Recorridos principales"],
        collaboration: "Exploras el prototipo y revisamos cómo se siente y se utiliza la marca en situaciones reales.",
      },
      {
        label: "Sistematizar",
        title: "Diseñamos para mantener la coherencia.",
        description: "Convertimos las decisiones visuales en componentes y reglas reutilizables para que la experiencia pueda crecer.",
        activities: ["Biblioteca de componentes y variantes", "Estados, espaciados y criterios de accesibilidad", "Principios de movimiento y alternativas estáticas"],
        deliverable: "Sistema visual y biblioteca de componentes",
        review: ["Componentes y sus estados", "Reglas de composición", "Uso de movimiento y contraste"],
        collaboration: "Revisamos las aplicaciones frecuentes y confirmamos qué necesita tu equipo para trabajar con el sistema.",
      },
      {
        label: "Entregar",
        title: "Una identidad que tu equipo puede usar.",
        description: "Preparamos los archivos y las indicaciones para que el diseño se aplique de forma consistente en los canales acordados.",
        activities: ["Organización de archivos y recursos", "Guía de aplicación y especificaciones", "Sesión de entrega con tu equipo"],
        deliverable: "Guía digital y archivos de diseño organizados",
        review: ["Recursos y formatos de entrega", "Ejemplos de aplicación", "Criterios para nuevas piezas"],
        collaboration: "Recibes los materiales y resolvemos las dudas de tu equipo o de quienes implementarán el diseño.",
      },
    ],
  },
};

export function getServiceWorkflow(slug: string): ServiceWorkflow | undefined {
  return Object.prototype.hasOwnProperty.call(serviceWorkflows, slug)
    ? serviceWorkflows[slug as ServiceWorkflowSlug]
    : undefined;
}
