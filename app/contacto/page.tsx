import { ArrowUpRight, MessageCircle, MoveUpRight } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageIntro, Eyebrow } from "@/components/ui";
import { CONTACT_SERVICES } from "@/lib/contact";
import type { ContactService } from "@/lib/contact";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Hablemos de tu proyecto", "Cuéntanos tu idea. Diseñamos contigo el siguiente paso: una web, una tienda online, un sistema o una nueva experiencia digital.", "/contacto");

// Official contact linked from https://introspectiva.digital/ on 2026-10-23.
const whatsappUrl = "https://wa.me/51922394336?text=Hola%2C%20quiero%20conversar%20sobre%20un%20proyecto%20digital.";

export default async function Contact({ searchParams }: { searchParams: Promise<{ servicio?: string | string[] }> }) {
  const query = await searchParams;
  const requested = typeof query.servicio === "string" ? query.servicio : "";
  const initialService = CONTACT_SERVICES.includes(requested as ContactService) ? requested as ContactService : "";

  return <>
    <PageIntro eyebrow="EMPECEMOS UNA CONVERSACIÓN" title="Tu próxima gran idea" accent="empieza aquí." description="No necesitas tenerlo todo resuelto. Cuéntanos dónde estás y a dónde quieres llegar; encontramos juntos el siguiente paso."/>
    <section className="contact-layout wrap section">
      <aside className="contact-details" data-reveal>
        <Eyebrow>DE TU IDEA A LO POSIBLE</Eyebrow>
        <h2>Primero,<br/>te escuchamos.</h2>
        <p>Una buena conversación es el inicio de un buen proyecto. Queremos conocer tu negocio, el reto que tienes delante y lo que esperas conseguir.</p>
        <div className="contact-info"><span>01 / ENTENDEMOS</span><p>Revisamos tu idea y aclaramos lo que necesitas.</p></div>
        <div className="contact-info"><span>02 / PROPONEMOS</span><p>Definimos una dirección, un alcance y una inversión.</p></div>
        <div className="contact-info"><span>03 / CONSTRUIMOS</span><p>Le damos forma con un proceso claro y cercano.</p></div>
        <div className="contact-direct"><MessageCircle size={26} strokeWidth={1.5} aria-hidden="true"/><h3>¿Prefieres escribirnos?</h3><p>Continúa la conversación en nuestro WhatsApp.</p><a className="text-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer">+51 922 394 336 <ArrowUpRight size={18} aria-hidden="true"/><span className="sr-only">Abrir WhatsApp en otra pestaña</span></a></div>
        <div className="contact-location"><MoveUpRight size={18} aria-hidden="true"/><span>Desde Lima, Perú.<br/>Abiertos a ideas de cualquier lugar.</span></div>
      </aside>
      <ContactForm key={initialService} initialService={initialService} whatsappUrl={whatsappUrl}/>
    </section>
  </>;
}
