# Introspectiva Studio

Rediseño multipágina de Introspectiva Studio. Next.js 16, React 19, TypeScript y GSAP; preparado para Vercel y PostgreSQL en Supabase.

## Ejecutar

Requiere Node.js 22 o superior.

```sh
npm ci
npm run dev
```

Abrir http://127.0.0.1:3000. Para una compilación de producción:

```sh
npm test
npm run build
npm start
```

## Sitio

- Inicio, presentación del estudio y acceso a contenidos.
- Servicios, cuatro páginas de detalle con alcance, proceso y preguntas frecuentes.
- Proyectos, filtros y tres fichas individuales.
- El estudio, filosofía y método de trabajo.
- Contacto, formulario validado y WhatsApp oficial.
- Privacidad, sitemap, robots y página 404.

El contenido se edita en `lib/content.ts`. Los componentes visuales están en `components/`, las rutas en `app/` y los recursos en `public/images/`.

GSAP controla entradas de página, revelado de títulos y secciones, marquesina y progreso de lectura. Incluye pausa manual, limpieza al cambiar de ruta y respeto a `prefers-reduced-motion`. Las fuentes se alojan localmente mediante Fontsource. Las imágenes usan la optimización de Next.js.

## Supabase y Vercel

La web funciona localmente sin credenciales. El guardado de consultas requiere ejecutar la migración SQL y configurar las variables privadas: ver [guía de despliegue](docs/DEPLOYMENT.md) y `.env.example`.

Sin conexión, el formulario muestra un error recuperable y ofrece WhatsApp; no simula un envío exitoso. La base contiene consultas, consentimiento y límites de envío; no incluye un CMS ni un panel de administración. El contenido editorial permanece en el proyecto.

## Documentación

- [Auditoría, enfoque comercial y estrategia multipágina](docs/AUDITORIA-Y-ESTRATEGIA.md)
- [Despliegue y configuración de datos](docs/DEPLOYMENT.md)
- [Origen de imágenes y prompt de la pieza generada](docs/ASSETS.md)
- [Verificación y límites](docs/VERIFICACION.md)

Los precios, testimonios y métricas no verificadas de la web anterior no se trasladaron. Las capturas de proyectos se obtuvieron de la publicación original. La marca vectorial es una adaptación para interfaz del símbolo facilitado; los dos archivos originales se conservan intactos.
