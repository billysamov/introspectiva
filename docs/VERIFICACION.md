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

La entrega incluye 13 páginas públicas más la página 404, los recursos de SEO y una API de contacto. La base de datos propuesta guarda consultas; no hay CMS ni panel administrativo incluido.
