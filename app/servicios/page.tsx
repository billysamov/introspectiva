import Link from "next/link";
import { ArrowUpRight, Globe2, ShoppingBag, Workflow, PenTool } from "lucide-react";
import { services, commonFaq } from "@/lib/content";
import { PageIntro, Eyebrow, ContactCta, Faq } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Servicios de diseño y desarrollo digital", "Diseño web, tiendas online, sistemas a medida e identidad digital. Explora cómo podemos ayudar a tu negocio.", "/servicios");
const icons = [Globe2, ShoppingBag, Workflow, PenTool];
export default function Services() {
  return <><PageIntro eyebrow="NUESTRAS CAPACIDADES" title="Una idea. Muchas" accent="posibilidades." description="De la primera presencia digital a la herramienta que transforma tu operación. Encontramos contigo la solución que tiene sentido para tu negocio."/><section className="services-grid wrap">{services.map((s,i)=>{const Icon=icons[i];return <Link href={`/servicios/${s.slug}`} key={s.slug} className={`service-panel service-panel-${i}`} data-reveal><div className="service-panel-top"><span>/{s.number}</span><Icon size={38} strokeWidth={1.2}/></div><h2>{s.name}</h2><p>{s.description}</p><div className="tags">{s.tags.map(t=><span key={t}>{t}</span>)}</div><span className="service-panel-link">Conocer el servicio <ArrowUpRight/></span></Link>;})}</section><section className="wrap section faq-section"><div data-reveal><Eyebrow>ANTES DE EMPEZAR</Eyebrow><h2>Claridad desde<br/>el primer paso.</h2><p>Un buen proyecto también se construye<br/>con expectativas claras.</p></div><Faq items={commonFaq}/></section><ContactCta/></>;
}
