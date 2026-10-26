# Verificación — 23 de octubre de 2026

## Completado

- Compilación optimizada de Next.js con comprobación TypeScript: correcta.
- 14 pruebas automáticas del formulario y API: correctas. Cubren validación, consentimiento, honeypot, origen, alias locales, tamaño, fallo de configuración, respuestas de Supabase simuladas, rate limit, privacidad de IP y cabeceras de Vercel.
- Revisión en el navegador de la portada, navegación a servicios, detalle de eCommerce y preselección del servicio en contacto.
- Errores de validación accesibles y foco en el primer campo incorrecto.
- Envío local con datos de prueba: respuesta de indisponibilidad cuando no hay Supabase; datos conservados y WhatsApp visible. No se envió ningún mensaje por WhatsApp.
- Menú móvil: apertura, nombre accesible, navegación y cierre comprobados.
- Filtro de proyectos: selección de Web corporativa reduce la lista a SIIS Ingeniería.
- Revisión visual de portada a 390 px, y comprobación de ancho mínimo a 320 px. Se ajustó la cabecera y el título para evitar desbordamiento permanente.
- Movimiento GSAP con limpieza por cambio de ruta y preferencia de movimiento reducido revisado en código. Control manual de pausa disponible.
- Imágenes originales y pieza generada guardadas dentro del proyecto; fuentes locales.
- Metadatos independientes (title, description, canonical, Open Graph y Twitter), robots y sitemap.

## Pendiente para producción

- Crear o conectar los proyectos de Vercel y Supabase, ejecutar la migración y configurar variables privadas.
- Probar una inserción real, RLS y límites concurrentes contra PostgreSQL/Supabase. Las pruebas actuales simulan el servicio remoto; no sustituyen esta integración.
- Verificar el dominio y sus redirecciones antes de reemplazar la web existente.
- Confirmar alcance comercial, condiciones de soporte, atribución de proyectos y datos del responsable del tratamiento antes de publicar.
- Medir Core Web Vitals con la web desplegada y tráfico real. No se atribuyen puntuaciones Lighthouse ni garantías de velocidad/conversión que no se hayan medido.

La entrega incluye 15 páginas públicas más la página 404, los recursos de SEO y una API de contacto. La base de datos propuesta guarda consultas; no hay CMS ni panel administrativo incluido.

## Ampliación de servicios y experiencia de marca

- Compilación final `npm run build`: correcta, incluidas las cuatro rutas de servicios.
- Catálogo general y detalles de diseño web, tienda online, identidad y sistemas visitados en navegador.
- Demostraciones GSAP en bucle con imágenes locales. Pausa individual y global comprobadas: el progreso conserva la misma transformación entre dos observaciones mientras está pausado.
- Proceso de cinco etapas: selección de Diseñar actualiza título, actividades, entregable, revisión y participación del cliente.
- Precarga vectorial observada al entrar; desaparece y deja la página disponible. Repetición por sesión, límites de espera, Escape y movimiento reducido revisados en código.
- Transición entre rutas comprobada. Se corrigió la conservación involuntaria de scroll: un enlace desde el final de un servicio llega a la nueva ruta con `scrollY: 0` y cortina oculta.
- Preferencia de sonido: silenciar, recargar y restaurar sonido comprobados en la interfaz. Síntesis y activación tras clic revisadas en código; no se realizó una evaluación auditiva del tono.
- Vista móvil de tienda online revisada a 390 y 320 px, sin desbordamiento horizontal. Vista de escritorio y panel del proceso revisados visualmente.
- No aparecen errores de consola en la captura final. Se evitaron avisos de GSAP al buscar elementos exclusivos de la portada en otras rutas.
- SVG del símbolo y logo completo disponibles en `public/`; el texto del logo completo está convertido a curvas.
- Capturas: `preview-services-desktop.png`, `preview-services-process.png`, `preview-services-mobile.png`.

## Referencia externa: Servitotales

Se visitaron la portada, `/epp` y `/contacto` de https://www.servitotales.com/. Es una web B2B multipágina de EPP, suministros y maquinaria, orientada a cotizaciones. No se modificó la web ni se envió ningún formulario.

Hallazgo reproducible en `/contacto` a 390 px: el enlace Cotizar ocupa aproximadamente x=328–408 px y el botón Abrir Menú x=416–458 px. Ambos rebasan el área visible; la página oculta el desbordamiento. Evidencia: `servitotales-mobile-review.png`. El catálogo de EPP muestra cinco familias con imágenes y enlaces de cotización por producto; no se observó buscador ni filtros en esa página. No se midió rendimiento ni se validaron certificaciones o promesas de disponibilidad de la empresa.

## WhatsApp global y ampliación de sonidos

- Compilación optimizada y TypeScript correctos tras agregar `WhatsAppButton` al layout.
- Enlace global comprobado en el detalle de Diseño web: número oficial +51 922 394 336, saludo genérico y apertura en nueva pestaña. No se abrió ni envió una conversación externa.
- Botón revisado visualmente a 390 px, con separación del control de sonido: `preview-whatsapp-mobile.png`.
- Sonido extendido a navegación, apertura del menú, tarjetas/filtros de proyectos, enlaces para explorar servicios y etapas del proceso. Reanudación de AudioContext esperada antes de sintetizar el tono.
- Silenciar y volver a activar comprobados en navegador; al activar está programada una muestra. La etapa Diseñar cambia correctamente con `data-sound` presente. No se verificó el audio mediante escucha o captura.
- Sin errores de consola en la revisión de la página actualizada.

## Referencia externa: Florentin

Se visitaron https://proyecto-florentin.vercel.app/ y `/clases`. Es una web multipágina de clases de francés, recursos y artículos, con enlace al portal de alumnos. Su pie declara operación por Introspectiva Studio. No se accedió a cuentas privadas ni se comprobaron pagos o reservas.

- Inicio: aparece el mensaje público `Sin video configurado` en la sección del método.
- `/clases`: se confirmaron dos tarjetas `Intensivo (Pack 12 Clases)` con igual descripción y precios de 170,00 € y 299,90 €.
- Se observaron textos mezclados e incompletos como `Preparación aux exámenes` y `carte de motivacion o entreviste profesional`.
- Fortalezas: oferta educativa específica, presentación del profesor, diagnóstico gratuito y páginas diferenciadas para clases, recursos y contenidos. No se verificaron las cifras de alumnos, testimonios ni credenciales anunciadas.

## Proyectos y fondos de cabecera — 26 de octubre de 2026

- Integrada la versión existente en GitHub antes de continuar, preservando su historial y las capturas de Servitotales y Florentin. Ambos proyectos aparecen primero en el catálogo y en la selección de inicio, con ficha independiente y enlaces a las URLs facilitadas por el usuario.
- Revisado el contenido para describir la experiencia pública observada, sin atribuir métricas, certificaciones ni funciones privadas no verificadas.
- Todas las cabeceras incorporan `HeroSection`: degradados, imágenes o capturas propias de cada proyecto y movimiento decorativo GSAP. Privacidad y 404 permanecen estáticas.
- `npm run build`: correcto, con comprobación TypeScript y generación de las rutas estáticas. Las 15 páginas públicas respondieron HTTP 200 y contienen su variante de cabecera.
- Portafolio, fichas de Servitotales y Florentin y detalle de diseño web revisados en navegador. Los enlaces externos apuntan a las URLs solicitadas. Navegación interna a la ficha de Servitotales con `scrollY: 0`.
- Florentin revisado visualmente a 390 px; Florentin y Diseño web comprobados a 320 px, sin desbordamiento horizontal.
- Pausa global comprobada: las cuatro transformaciones del fondo conservan exactamente los mismos valores entre observaciones. La demostración de servicio también indica pausa; reactivación por teclado comprobada.
- Movimiento reducido, pausa fuera de pantalla, pestaña oculta y limpieza de efectos revisados en código. Sin errores de consola en las páginas observadas.
- Capturas: `preview-projects-heroes.png` y `preview-florentin-hero-mobile.png`.
- La comprobación es local. No verifica un despliegue nuevo en Vercel ni una conexión real con Supabase.
