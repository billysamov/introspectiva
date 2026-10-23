# Introspectiva Studio: auditoría y estrategia de rediseño

Fecha de revisión: 23 de octubre de 2026. Sitio revisado: [introspectiva.digital](https://introspectiva.digital/).

El objetivo del rediseño es convertir la presencia actual en un **sitio web multipágina** que permita conocer al estudio, comparar servicios, explorar proyectos y comenzar una conversación informada. La portada debe ser la entrada a ese sistema; cada contenido importante tendrá una URL propia.

## Alcance y evidencia

Esta revisión se basa en el contenido público accesible del sitio y los dos archivos de identidad proporcionados. Se contrastó la propuesta técnica con documentación oficial. No se ejecutó una auditoría de campo de rendimiento, SEO, analítica ni accesibilidad sobre el sitio anterior. Por ello, este documento no atribuye puntuaciones Lighthouse, tasas de conversión ni incumplimientos técnicos que no hayan sido comprobados.

### Hallazgos del sitio actual

| Aspecto | Evidencia observada | Consecuencia para el rediseño |
| --- | --- | --- |
| Enfoque | Estudio en Lima que ofrece landing pages, webs corporativas, comercio electrónico y aplicaciones. | Articular una propuesta común de diseño y desarrollo. |
| Fortalezas | Oferta reconocible, portafolio, proceso guiado y contacto por WhatsApp. | Conservar estos accesos y darles mayor profundidad. |
| Confianza | Se anuncian 10x de rendimiento, reducción del 30%, retención del 94,2% y posiciones Top 5 sin metodología visible. | Sustituir garantías por entregables comprobables. |
| Consistencia | El plazo de landing varía entre 3–5 días, 2–4 días y una hoja de ruta de 2–3 semanas. | Mantener una única fuente de contenido. |
| Identidad del equipo | La misma sección presenta Ariana G. y Ariana A. | Confirmar el nombre antes de publicar perfiles. |
| Profundidad | Los servicios, detalles comerciales y proyectos se concentran en la página principal. | Crear páginas enlazables con objetivos propios. |
| Casos | Se muestran D Gali Home, SIIS Ingeniería e Introspectiva, acompañados de cifras promocionales. | Conservar referencias verificables; validar resultados y testimonios. |

Fuente de los hallazgos: [sitio público actual](https://introspectiva.digital/). La ausencia de evidencia visible no demuestra que una afirmación sea falsa; indica que no debe reutilizarse como resultado confirmado.

## Posicionamiento recomendado

**Introspectiva es un estudio de diseño y desarrollo digital que transforma necesidades de negocio en experiencias web claras, útiles y cuidadas.**

La oportunidad está en hacer visible la unión entre criterio de diseño y capacidad de ejecución. Una empresa que busca una web quiere entender qué puede resolver, qué recibirá, cómo se trabajará y quién estará a cargo. Las tecnologías deben respaldar esa respuesta, sin ocupar el lugar de la propuesta comercial.

Públicos prioritarios propuestos:

- Empresas de servicios que necesitan explicar mejor su oferta y recibir consultas pertinentes.
- Marcas que necesitan un catálogo o una tienda fácil de recorrer y administrar.
- Equipos con tareas repetitivas que pueden resolverse mediante una plataforma a medida.
- Negocios con una web existente que requiere una revisión integral de contenido, diseño y funcionamiento.

Estos segmentos son una hipótesis estratégica para ordenar el mensaje. Deben contrastarse con los clientes reales, los proyectos más rentables y la capacidad del equipo.

### Texto de portada propuesto

**Etiqueta:** Estudio de diseño y desarrollo digital · Lima, Perú

**Titular:** Diseño con intención. Tecnología que hace avanzar tu negocio.

**Descripción:** Creamos sitios web, tiendas online y plataformas a medida que conectan tu marca con las personas y simplifican tu operación. Del primer mapa a la puesta en marcha, cada decisión tiene un propósito.

**Acción principal:** Explorar proyectos

**Acción secundaria:** Hablemos de tu proyecto

**Mensaje de estudio:** Antes de diseñar una pantalla, entendemos qué necesita lograr tu negocio. Unimos estrategia, identidad y desarrollo para construir una experiencia coherente de principio a fin.

Evitar números decorativos, contadores sin una fuente comprobable y afirmaciones de liderazgo que el contenido no pueda demostrar. La calidad de los proyectos, la claridad del proceso y el detalle de la entrega deben construir la confianza.

## Arquitectura multipágina

| Ruta | Función | Contenido principal | Siguiente paso |
| --- | --- | --- | --- |
| `/` | Presentar el estudio y orientar la exploración. | Propuesta breve, selección visual de proyectos, capacidades y presentación del estudio. | Proyectos o contacto. |
| `/servicios` | Ayudar a identificar la solución adecuada. | Catálogo de servicios, necesidades que resuelven y comparación sencilla. | Página de servicio. |
| `/servicios/[slug]` | Explicar un servicio en profundidad. | Para quién es, alcance orientativo, entregables, proceso, preguntas frecuentes y casos relacionados. | Contacto con servicio preseleccionado. |
| `/proyectos` | Mostrar el trabajo de forma explorable. | Proyectos con imágenes, categoría y descripción breve; filtros accesibles. | Caso completo. |
| `/proyectos/[slug]` | Demostrar criterio y ejecución. | Contexto, reto, decisiones, pantallas, alcance real y enlace externo cuando corresponda. | Proyecto relacionado o contacto. |
| `/estudio` | Explicar quién trabaja y cómo. | Enfoque, principios, proceso, colaboración y perfiles confirmados. | Contacto. |
| `/contacto` | Recoger un encargo inicial. | Formulario breve, expectativas de la conversación y contacto directo. | Confirmación real del envío. |
| `/privacidad` | Explicar el tratamiento de datos. | Responsable, finalidad del formulario, canales de contacto y política validada para la operación real. | Volver al formulario. |

La navegación principal debe mantener Servicios, Proyectos, Estudio y Contacto visibles. El logotipo regresa al inicio. En móvil, el menú tendrá un botón con nombre accesible, estado expandido, cierre claro y manejo de foco. Las páginas internas deben mostrar su ubicación y permitir volver a la categoría.

Los filtros de proyectos son un complemento: los enlaces a cada caso deben funcionar sin depender de una animación o de abrir un modal. Una URL debe seguir siendo útil al compartirla, recargarla y acceder desde un buscador.

## Contenido de servicios

Las siguientes descripciones son propuestas nuevas; los alcances definitivos se acuerdan en cada proyecto.

### Sitios web corporativos

**Una web que explica tu valor y acompaña el crecimiento de tu empresa.**

Organizamos tu oferta, diseñamos una experiencia coherente con tu marca y desarrollamos páginas que tus clientes puedan recorrer con claridad. Pensada para empresas que necesitan presentar servicios, demostrar experiencia y recibir consultas.

Entregables orientativos: arquitectura de información, dirección visual, diseño adaptable, páginas de servicios, integración de formularios, metadatos y guía de entrega. Acordar por escrito el número de páginas, la preparación de textos, las integraciones y el mantenimiento.

### Comercio electrónico

**De descubrir un producto a completar una compra, con un recorrido claro.**

Diseñamos tiendas que facilitan explorar el catálogo, entender cada producto y avanzar hacia el pago. La solución se define alrededor de la operación: productos, stock, envíos, pagos y administración.

Entregables orientativos: catálogo, ficha de producto, carrito, integración de pagos y configuración del proceso de compra. Confirmar pasarela, moneda, reglas de envío, impuestos, carga inicial y responsabilidades antes de cotizar.

### Aplicaciones y sistemas a medida

**Herramientas digitales para que tu equipo trabaje con más claridad.**

Convertimos procesos concretos en plataformas útiles: portales, paneles de gestión, flujos de aprobación e integraciones. Comenzamos por la tarea que debe mejorar y definimos una primera versión con un alcance manejable.

Entregables orientativos: definición funcional, modelo de datos, interfaz, permisos, desarrollo y pruebas del flujo acordado. No prometer un ERP completo, un SLA o un nivel de seguridad específico sin un alcance contractual y validación técnica.

### Experiencias de campaña

**Una experiencia enfocada para presentar una oferta o un lanzamiento.**

Una landing puede permanecer como servicio comercial del estudio. Su página de servicio debe explicar cuándo sirve y qué contiene. Esto es compatible con que la propia web de Introspectiva sea multipágina.

## Proyectos y credibilidad

Cada caso debe responder cuatro preguntas: qué contexto existía, qué se necesitaba resolver, qué decisiones tomó el estudio y qué se entregó. Separar claramente el trabajo publicado de cualquier concepto visual creado para ilustrar capacidades.

Una estructura útil para cada caso:

1. Nombre, sector, tipo de proyecto y rol del estudio confirmado.
2. Imagen principal que muestre el producto real.
3. Contexto y reto, con lenguaje específico y sin atribuir necesidades al cliente que no estén documentadas.
4. Decisiones de diseño y desarrollo comprobables en el trabajo.
5. Galería adaptable con pies de imagen y textos alternativos pertinentes.
6. Alcance entregado; resultados solamente cuando exista una medición verificable.
7. Enlace al sitio, si sigue disponible, y un proyecto relacionado.

No incorporar logos de clientes nuevos, testimonios nuevos, porcentajes ni nombres de equipo supuestos. Los materiales conceptuales deben rotularse como tales; no pueden confundirse con capturas de proyectos ya realizados.

## Dirección visual

La identidad adjunta sugiere conservar el contraste negro/blanco, el azul y la idea de avance del símbolo. La renovación puede apoyarse en una composición editorial: titulares expresivos, márgenes generosos, líneas finas, imágenes grandes y una jerarquía consistente.

Propuesta de sistema:

- Fondo oscuro profundo y superficies claras para alternar el ritmo de lectura.
- Azul de marca para señalización, detalles y acciones, con contraste comprobado en cada combinación.
- Tipografía con carácter en titulares y lectura cómoda en párrafos; limitar las familias y pesos cargados.
- Rejilla flexible y componentes con espacio suficiente; evitar reducir una composición de escritorio hasta volverla ilegible en móvil.
- Fotografías editoriales para ambientar el estudio y capturas reales para demostrar el producto. Evitar imágenes genéricas que aparenten representar al equipo.
- Logotipo legible a tamaños pequeños; conservar los originales y producir variantes web sin alterar su reconocimiento.

El diseño debe comunicar un estudio de autor capaz de ejecutar proyectos completos. La variedad visual debe surgir de imágenes, escala y composición, sin convertir cada bloque en una tarjeta intercambiable.

## GSAP y transiciones

Se propone usar GSAP de forma amplia y coherente: una coreografía reconocible en todo el sitio, con un propósito para cada efecto.

| Interacción | Propuesta | Condición de uso |
| --- | --- | --- |
| Entrada de página | Secuencia breve de titular, descripción e imagen. | Sin bloquear enlaces ni esperar a una introducción obligatoria. |
| Lectura al desplazar | Aparición escalonada de contenido y revelado de imágenes. | El contenido debe permanecer disponible si falla JavaScript. |
| Proyectos | Desplazamiento suave de la imagen al entrar en una tarjeta y transición del indicador. | Aplicar también un estado de foco claro; reducir en pantallas táctiles. |
| Galerías | Movimiento sutil de profundidad o máscara en escritorio. | Desactivar paralaje con movimiento reducido. |
| Menú móvil | Apertura y cierre coordinados. | Mantener semántica, foco y cierre por teclado. |
| Cambio de ruta | Transición breve de entrada con continuidad visual. | No interceptar el historial ni retrasar la navegación por una animación decorativa. |

Usar `gsap.matchMedia()` para adaptar los efectos a tamaño de pantalla y `prefers-reduced-motion`. La API permite revertir las animaciones cuando una condición deja de cumplirse. En React, `useGSAP()` o un contexto con limpieza explícita evita conservar animaciones y ScrollTriggers al abandonar una página. Fuentes: [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/) y [GSAP con React](https://gsap.com/resources/React/).

Con movimiento reducido, eliminar desplazamientos grandes, giros, paralaje y animación ligada al scroll; mostrar el estado final de inmediato. Mantener desplazamiento nativo y acceso directo a la información. El criterio WCAG 2.3.3 recomienda permitir desactivar animaciones no esenciales iniciadas por interacciones; es un criterio AAA específico, no una declaración de cumplimiento integral del sitio. Fuente: [W3C: Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html).

## Base técnica propuesta

**Next.js App Router + TypeScript, despliegue en Vercel y PostgreSQL en Supabase.** Elegir versiones estables compatibles y fijarlas mediante el archivo de dependencias; la novedad de una versión no sustituye las pruebas del proyecto.

Las páginas editoriales y su contenido pueden renderizarse en el servidor. Reservar los componentes cliente para menú, filtros, formulario y animaciones. Esta separación permite reducir JavaScript en el navegador y mantener secretos del lado servidor. Fuente: [Next.js: Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components).

Vercel ofrece integración específica con Next.js y sus mecanismos de renderizado y optimización. Usar despliegues de revisión antes de la promoción a producción y mantener las variables de entorno separadas por ambiente. Fuente: [Next.js en Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs).

### Datos y formulario

El primer uso útil de Supabase es almacenar solicitudes de contacto. El catálogo editorial puede permanecer inicialmente versionado en el proyecto; si el equipo requiere editarlo sin desarrollar, se puede añadir una interfaz de administración y tablas de servicios/proyectos con publicación explícita.

Flujo recomendado: formulario → validación servidor → controles contra abuso → inserción en Supabase → confirmación. El mensaje de éxito debe aparecer únicamente cuando la inserción haya concluido. Si la base de datos no está configurada o la inserción falla, mostrar un estado de error útil y conservar el texto del usuario.

Datos mínimos propuestos: nombre, correo, servicio de interés, descripción, fecha de creación y consentimiento cuando corresponda. Evitar solicitar información que no sea necesaria para evaluar el encargo. El teléfono puede ser opcional.

Activar Row Level Security y definir políticas deliberadas. Las solicitudes no deben poder consultarse de forma pública. Las claves privilegiadas deben quedar en variables de entorno exclusivas del servidor. Supabase documenta RLS como el control de acceso por fila y advierte que las claves que evitan estas políticas no deben exponerse al cliente. Fuente: [Supabase: Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security).

La conexión a una cuenta Supabase real, la ejecución de migraciones y el despliegue productivo requieren configuración del proyecto y credenciales autorizadas. Preparar archivos y esquema no equivale a haber conectado o publicado esos servicios.

### Imágenes, buscadores y rendimiento

Usar imágenes con dimensiones reservadas y variantes apropiadas al dispositivo; priorizar únicamente el recurso visual principal. `next/image` aporta optimización de tamaños, estabilidad visual y carga diferida. Fuente: [Next.js: Image Optimization](https://nextjs.org/docs/app/getting-started/images).

Cada página necesita título, descripción, encabezado principal y URL canónica propios; los servicios y proyectos no deben compartir metadatos genéricos. Añadir sitemap, robots y estados 404. Utilizar datos estructurados únicamente para información real.

Objetivos para validar después de desplegar: LCP ≤ 2,5 s, INP ≤ 200 ms y CLS ≤ 0,1 en el percentil 75, separados por móvil y escritorio. Son objetivos de calidad, no resultados obtenidos. La evaluación debe combinar pruebas controladas y datos de usuarios cuando existan. Fuente: [Google: Web Vitals](https://web.dev/articles/vitals).

## Criterios de aceptación

- Todas las rutas principales se pueden abrir directamente, recargar y compartir.
- Cada servicio y proyecto tiene contenido específico, no una copia de la portada.
- El recorrido completo funciona con teclado, foco visible y nombres de controles claros.
- Los estados de movimiento reducido muestran toda la información.
- El contenido se adapta a móvil sin desbordamientos horizontales involuntarios.
- La navegación atrás/adelante funciona después de explorar páginas internas.
- El formulario distingue validación, envío, éxito real y error recuperable.
- Las solicitudes privadas no son legibles por un visitante anónimo.
- Las imágenes cargan sin deformarse, con textos alternativos adecuados.
- No se publican afirmaciones cuantitativas, perfiles ni testimonios sin verificar.
- La compilación de producción y la revisión visual de las rutas terminan antes del despliegue final.

## Prioridad editorial antes de publicar

Confirmar la identidad del equipo, las condiciones de soporte, el alcance real de los servicios y los materiales de los proyectos. Seleccionar imágenes finales con derechos de uso y redactar la política de privacidad conforme a la operación efectiva. A continuación, validar el formulario conectado, los enlaces, la navegación móvil y los metadatos en el ambiente de revisión.
