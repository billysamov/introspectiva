import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro, Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Privacidad", "Información sobre los datos del formulario de contacto de Introspectiva Studio, su finalidad y cómo consultar sobre ellos.", "/privacidad");

const whatsappUrl = "https://wa.me/51922394336";

export default function Privacy() {
  return <>
    <PageIntro variant="legal" eyebrow="TU INFORMACIÓN, CON CLARIDAD" title="Una conversación" accent="con confianza." description="Aquí explicamos qué información solicita este sitio y cómo se utiliza cuando nos cuentas tu proyecto."/>
    <section className="wrap privacy-layout section">
      <aside className="privacy-aside"><Eyebrow>AVISO DE PRIVACIDAD</Eyebrow><p>Versión del formulario: contact-v1<br/>Actualizado: 23 de octubre de 2026</p><Link href="/contacto" className="text-link">Volver al contacto <ArrowUpRight size={17}/></Link></aside>
      <div className="privacy-copy">
        <article><span>01</span><h2>Quién recibe tu consulta</h2><p>Este sitio presenta los servicios de Introspectiva Studio. El equipo del estudio utiliza la información que compartes para conocer tu proyecto y responderte. Puedes comunicarte con nosotros a través del <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp publicado en este sitio</a>.</p></article>
        <article><span>02</span><h2>Qué datos solicitamos</h2><p>El formulario pide tu nombre, correo electrónico, servicio de interés y una descripción del proyecto. El nombre de tu empresa y la inversión estimada son opcionales. También registra tu consentimiento y la fecha de la consulta.</p><p>Para reducir envíos automatizados, el servidor genera identificadores protegidos a partir del correo y, en Vercel, de la dirección IP. La aplicación no guarda la IP original en su base de datos. No incluyas contraseñas, documentos de identidad, datos financieros ni otra información sensible en el mensaje.</p></article>
        <article><span>03</span><h2>Para qué los usamos</h2><p>Usamos los datos para evaluar lo que necesitas, responder tu consulta y preparar una propuesta si corresponde. El consentimiento del formulario se refiere a esa conversación; no te incorpora a una lista de publicidad ni activa una suscripción comercial.</p></article>
        <article><span>04</span><h2>Dónde se procesa la información</h2><p>Esta versión del sitio está preparada para alojarse en Vercel y guardar las consultas en Supabase. Cuando la conexión esté activa, estos proveedores procesarán los datos necesarios para ofrecer el alojamiento y la base de datos. Si el formulario no puede confirmar el guardado, mostrará un error y ofrecerá el contacto por WhatsApp.</p><p>Vercel y Supabase pueden generar registros técnicos de infraestructura según la configuración de sus servicios. Si eliges WhatsApp, continuarás en una plataforma externa con sus propias condiciones y política de privacidad.</p></article>
        <article><span>05</span><h2>Conservación y consultas sobre tus datos</h2><p>La configuración inicial no elimina automáticamente las consultas recibidas. Puedes pedir al estudio información sobre tu consulta, corregir tus datos o solicitar su eliminación a través del canal de contacto. Para atender una solicitud podemos necesitar confirmar que eres la persona que realizó el envío.</p><p>Los identificadores utilizados para limitar envíos dejan de ser útiles después de 24 horas y se limpian cuando llega una nueva solicitud al formulario.</p></article>
        <article><span>06</span><h2>Cookies y medición</h2><p>Esta implementación no incorpora herramientas de publicidad, píxeles de marketing ni analítica de terceros. Tampoco necesita una cuenta de usuario para visitar las páginas o enviar una consulta. Si se añaden servicios que cambien ese tratamiento, deberá actualizarse esta información.</p></article>
        <article><span>07</span><h2>Hablemos también de privacidad</h2><p>Si tienes una duda sobre la información que compartiste, escríbenos por el canal oficial. Evita enviar datos sensibles en una conversación de contacto.</p><a href={whatsappUrl} className="button button-secondary" target="_blank" rel="noopener noreferrer">Consultar por WhatsApp <ArrowUpRight size={18}/><span className="sr-only">Se abre en otra pestaña</span></a></article>
      </div>
    </section>
  </>;
}
