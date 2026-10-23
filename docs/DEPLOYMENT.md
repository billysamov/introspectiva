# Despliegue en Vercel y Supabase

El proyecto usa Next.js App Router. El formulario se envía a una ruta de servidor de Next.js; esta guarda la consulta en PostgreSQL mediante la Data API de Supabase. No requiere instalar `supabase-js` en el navegador. Las claves privadas nunca llevan el prefijo `NEXT_PUBLIC_`.

## 1. Preparar Supabase

1. Crea un proyecto de Supabase en la región adecuada para tus usuarios y tu despliegue de Vercel.
2. Abre **SQL Editor** y ejecuta una vez el contenido completo de `supabase/migrations/202610230001_contact_requests.sql`. Si ya utilizas Supabase CLI y migraciones, incorpora este archivo a ese flujo y ejecuta `supabase db push` sobre el proyecto correcto.
3. Copia la URL del proyecto y una clave secreta `sb_secret_…` desde **Connect / API keys**. El servidor acepta una clave `service_role` antigua como alternativa mediante `SUPABASE_SERVICE_ROLE_KEY`; se recomienda la nueva clave secreta.
4. Comprueba en Table Editor que existe `public.contact_requests` y que RLS está activo. No agregues políticas públicas de lectura o escritura. El formulario usa únicamente la función `submit_contact_request`, ejecutable por `service_role`.

La tabla privada `private.contact_rate_events` guarda HMAC del correo y de la IP para limitar envíos. La IP original no se guarda en la base de datos de esta aplicación. Los datos de contacto sí se conservan para responder al proyecto.

## 2. Variables de entorno

Copia `.env.example` a `.env.local` para desarrollo y completa:

| Variable | Alcance | Valor |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Público | URL canónica completa, por ejemplo `https://introspectiva.digital` |
| `SUPABASE_URL` | Servidor | URL HTTPS de tu proyecto de Supabase |
| `SUPABASE_SECRET_KEY` | Servidor | Clave secreta `sb_secret_…` |
| `CONTACT_HASH_SECRET` | Servidor | Secreto aleatorio de al menos 32 caracteres |

Genera el último valor localmente con `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`. Usa el mismo valor en todas las instancias de un entorno; cambiarlo reinicia de hecho las identidades del limitador. Nunca lo guardes en Git ni lo incluyas en capturas de pantalla. Separa el proyecto y los secretos de producción de los de pruebas si vas a probar envíos repetidos.

## 3. Vercel

1. Sube el proyecto a tu repositorio y crea/importa el proyecto en Vercel. Selecciona **Next.js** como framework y Node.js 24.x si está disponible en tu proyecto, o la versión compatible indicada en `package.json`.
2. Configura las variables anteriores en **Settings → Environment Variables** para los entornos que vayas a usar. Los previews deben tener su propia configuración si quieres probar persistencia.
3. Ejecuta localmente `npm run build` y `node --experimental-strip-types --test tests/contact.test.ts` antes de desplegar.
4. Despliega y revisa la vista previa. Configura `introspectiva.digital` y su redirección de `www` en Domains, y sigue exactamente los registros DNS que indique Vercel.
5. Desde el dominio desplegado, realiza un envío real con un correo tuyo y comprueba la nueva fila en `contact_requests`. Verifica también móvil, consentimiento, errores y navegación por teclado antes de cambiar el dominio de producción.

El origen de cada preview se acepta si coincide con el origen de la petición o con la URL HTTPS de `VERCEL_URL`, variable que Vercel establece para el despliegue. Además se acepta el dominio de `NEXT_PUBLIC_SITE_URL`. En una ejecución local, si Next.js normaliza la URL interna a `localhost`, también se acepta `127.0.0.1` con el mismo protocolo y puerto (y viceversa); esta excepción no se aplica en Vercel. La API no obtiene orígenes adicionales de encabezados `Host` o `X-Forwarded-Host`. Exige un encabezado `Origin` válido y JSON; las pruebas con curl deben incluir ambos. Los cambios de variables de entorno requieren un nuevo despliegue.

## Comportamiento del formulario

`POST /api/contact` recibe JSON:

```json
{
  "name": "Ana Torres",
  "email": "ana@example.com",
  "company": "Estudio Norte",
  "service": "corporativa",
  "budget": "Por definir",
  "message": "Buscamos una web para presentar nuestros servicios y recibir consultas.",
  "consent": true,
  "website": ""
}
```

Los servicios válidos son `landing`, `corporativa`, `ecommerce`, `sistema` y `asesoria`. `company`, `budget` y `website` son opcionales; `website` es una trampa de spam y debe quedar vacío. La respuesta contiene `ok`, `message` y, cuando corresponde, errores por campo en `errors`.

| Código HTTP | Significado |
| --- | --- |
| 201 | Supabase confirmó que la consulta quedó guardada |
| 400 / 413 / 415 | JSON inválido, más de 16 KiB o formato incorrecto |
| 403 | Origen no permitido o ausente |
| 422 | Datos inválidos, falta consentimiento o trampa antispam activada |
| 429 | Límite temporal alcanzado; incluye `Retry-After` |
| 503 | Configuración incompleta o base de datos no disponible; mostrar la alternativa de WhatsApp |

El servidor no devuelve un éxito cuando faltan credenciales. El usuario conserva el formulario y puede usar el enlace de WhatsApp de la interfaz. Una confirmación significa **guardado en Supabase**: no se envía un correo automático ni se notifica a un CRM. El equipo debe consultar la tabla y responder; una integración de notificaciones se puede agregar después con su proveedor y credenciales.

## Límites, acceso y datos

- El límite es de **3 envíos aceptados por correo en 24 horas** y **5 por IP en una hora**. Se calcula en PostgreSQL y usa bloqueos transaccionales: funciona entre distintas instancias de Vercel. La inserción de la consulta y del evento del límite ocurre en una misma transacción.
- En Vercel se usa `x-vercel-forwarded-for`, un encabezado controlado por la plataforma. Fuera de Vercel se aplica solo el límite por correo para no confiar en IPs que el cliente pueda falsificar. Adaptar un despliegue en otro proveedor exige definir su proxy de confianza.
- El límite por IP puede afectar a equipos que comparten una red. El correo se normaliza a minúsculas; no se intenta eliminar alias específicos de cada proveedor. El honeypot y los límites no sustituyen una protección antiabuso completa. Si hay abuso real, configura el Firewall de Vercel o añade un CAPTCHA verificado en el servidor.
- Los eventos de límite de más de 24 horas se limpian cuando llega un nuevo envío. Si necesitas una eliminación puntual aunque no haya tráfico, programa una tarea en Supabase Cron para `delete from private.contact_rate_events where created_at < now() - interval '24 hours';`.
- Define un período de conservación de consultas y un responsable de su eliminación antes de publicar. El código no elimina automáticamente prospectos. Revisa que el aviso de privacidad explique el formulario, el uso para responder y los proveedores. `consent_version = 'contact-v1'` identifica la versión inicial del consentimiento.
- No hay panel de administración público. Supabase Dashboard permite revisar consultas y cambiar su estado entre `new`, `contacted`, `qualified` y `closed`. No publiques claves de servicio para construir un panel en el cliente.
- La ruta no registra mensajes, correos ni IPs en sus logs. Vercel y Supabase pueden conservar sus propios registros de infraestructura conforme a la configuración de cada cuenta.

## Verificación pendiente del entorno real

Las pruebas automatizadas locales cubren validación, rechazo de orígenes, tamaño del cuerpo, ausencia de secretos, formato de llamada a Supabase, hashes y respuestas de error. Simulan la Data API. Una cuenta real de Supabase es necesaria para probar la migración, las políticas y el límite bajo concurrencia. El proyecto no crea cuentas, no configura DNS ni publica automáticamente.

Fuentes oficiales consultadas: [claves de API de Supabase](https://supabase.com/docs/guides/getting-started/api-keys), [funciones de base de datos y privilegios](https://supabase.com/docs/guides/database/functions), [seguridad de la Data API](https://supabase.com/docs/guides/api/securing-your-api), [encabezados de Vercel](https://vercel.com/docs/headers/request-headers).
