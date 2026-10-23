export const servicePresentation: Record<string, {
  headline: string; focus: string;
  capabilities: { title: string; text: string }[];
  image: string; imageAlt: string; referenceTitle: string; referenceText: string;
  referenceHref: string; referenceCta: string;
}> = {
  "diseno-web": {
    headline: "Tu mejor versión. En cada pantalla.",
    focus: "Diseñamos sitios completos: cada página tiene un propósito y cada interacción, una razón de ser.",
    capabilities: [
      { title: "Contenido que orienta", text: "Organizamos servicios, proyectos y mensajes para que las personas encuentren lo que buscan sin dar vueltas." },
      { title: "Una experiencia propia", text: "Diseñamos desde tu identidad, con interfaces claras y movimiento que acompaña el contenido." },
      { title: "Una base para crecer", text: "Construimos una web adaptable, con SEO técnico e integraciones definidas alrededor de tu negocio." },
    ],
    image: "/images/siis-project.jpeg", imageAlt: "Captura publicada de la web de SIIS Ingeniería",
    referenceTitle: "Información técnica, presentada con claridad.",
    referenceText: "SIIS Ingeniería reúne su oferta de equipos y fibra óptica en una experiencia de catálogo orientada a empresas.",
    referenceHref: "/proyectos/siis-ingenieria", referenceCta: "Explorar SIIS Ingeniería",
  },
  ecommerce: {
    headline: "Una tienda que invita a elegir.",
    focus: "Conectamos la experiencia de compra con tu catálogo, tus pagos y la forma en que gestionas cada pedido.",
    capabilities: [
      { title: "Productos que se entienden", text: "Categorías, imágenes y fichas que ayudan a comparar opciones y tomar una decisión." },
      { title: "Menos pasos para comprar", text: "Diseñamos carrito y checkout para que precio, envío y siguiente paso estén siempre claros." },
      { title: "La operación, conectada", text: "Definimos inventario, pedidos y medios de pago según la plataforma y las necesidades de tu equipo." },
    ],
    image: "/images/gali-project.jpeg", imageAlt: "Captura publicada del catálogo de D Gali Home",
    referenceTitle: "Una tienda llena de pequeños descubrimientos.",
    referenceText: "D Gali Home presenta regalos y juguetes en un catálogo visual pensado para explorar productos y ocasiones.",
    referenceHref: "/proyectos/d-gali-home", referenceCta: "Explorar D Gali Home",
  },
  "sistemas-a-medida": {
    headline: "Tu operación, un paso adelante.",
    focus: "De un proceso manual a una herramienta útil. Construimos por etapas y validamos con las personas que la van a usar.",
    capabilities: [
      { title: "Procesos sin duplicación", text: "Identificamos tareas repetitivas y definimos un flujo con responsables, estados y reglas claras." },
      { title: "La información a mano", text: "Diseñamos paneles y vistas para que cada persona encuentre lo que necesita según su rol." },
      { title: "Permisos desde el inicio", text: "Planificamos accesos y validaciones antes de desarrollar, y verificamos los recorridos principales." },
    ],
    image: "/images/introexp-project.jpeg", imageAlt: "Pantalla de acceso del sistema INTROEXP publicada en la web anterior",
    referenceTitle: "Una puerta de entrada a tu operación.",
    referenceText: "La interfaz de acceso de INTROEXP forma parte de las referencias publicadas por el estudio. Un punto de partida para conversar sobre portales y sistemas internos.",
    referenceHref: "/contacto?servicio=sistema", referenceCta: "Hablemos de tu operación",
  },
  "identidad-digital": {
    headline: "Una identidad que se mueve contigo.",
    focus: "Símbolo, tipografía, color e interacción: un lenguaje coherente para todos los puntos de contacto digitales.",
    capabilities: [
      { title: "Una dirección reconocible", text: "Traducimos la personalidad de tu marca a criterios visuales que guían las decisiones de diseño." },
      { title: "Un sistema, muchas piezas", text: "Creamos componentes, estados y composiciones que funcionan juntos en distintos formatos." },
      { title: "Movimiento con personalidad", text: "Definimos entradas, transiciones y microinteracciones que refuerzan la identidad sin complicar su uso." },
    ],
    image: "/images/brand-original.jpeg", imageAlt: "Logo original de Introspectiva Studio, blanco y azul sobre negro",
    referenceTitle: "Nuestra identidad, llevada a la experiencia.",
    referenceText: "Partimos del símbolo de Introspectiva y lo extendemos a un lenguaje visual: azul, contraste, tipografía y una dirección que siempre avanza.",
    referenceHref: "/estudio", referenceCta: "Conocer nuestra perspectiva",
  },
};
