import Link from "next/link";
import { ArrowUpRight, ArrowRight, ArrowDown } from "lucide-react";
import { services, commonFaq, processSteps } from "@/lib/content";
import { PageIntro, Eyebrow, ContactCta, Faq } from "@/components/ui";
import { ServiceDemo } from "@/components/service-demo";
import { servicePresentation } from "@/lib/service-presentation";
import { pageMetadata } from "@/lib/metadata";
import styles from "./services.module.css";

export const metadata = pageMetadata("Servicios de diseño y desarrollo digital", "Diseño web, tiendas online, sistemas a medida e identidad digital. Explora demostraciones y conoce cómo trabajamos.", "/servicios");
export default function Services() {
  return <>
    <PageIntro eyebrow="NUESTRAS CAPACIDADES" title="Ideas con dirección." accent="Trabajo que se ve." description="Explora lo que podemos construir, mira cómo funciona y conoce el proceso que hay detrás. Diseño, desarrollo y estrategia, conectados con tu negocio."/>
    <div className={`wrap ${styles.serviceDirectory}`}><span>ENCUENTRA TU SIGUIENTE PASO</span><nav aria-label="Explorar servicios">{services.map(s=><a key={s.slug} href={`#${s.slug}`}><span>{s.number}</span>{s.name}<ArrowDown size={13}/></a>)}</nav></div>
    <section className={`wrap ${styles.serviceShowcases}`} aria-label="Nuestros servicios">
      {services.map(service=><article key={service.slug} id={service.slug} className={styles.showcase}>
        <div className={styles.showcaseCopy} data-reveal><Eyebrow number={service.number}>UNA SOLUCIÓN CON INTENCIÓN</Eyebrow><h2>{service.name}</h2><p>{service.description}</p><ul>{servicePresentation[service.slug].capabilities.map(capability=><li key={capability.title}><ArrowRight size={14}/>{capability.title}</li>)}</ul><div className="tags">{service.tags.map(tag=><span key={tag}>{tag}</span>)}</div><Link className="button button-secondary" href={`/servicios/${service.slug}`}>Explorar servicio y proceso <ArrowUpRight size={18}/></Link></div>
        <ServiceDemo slug={service.slug} compact/>
      </article>)}
    </section>
    <section className={`section ${styles.overviewProcess}`}><div className="wrap"><div className="section-heading"><div><Eyebrow>EL PUNTO DE PARTIDA</Eyebrow><h2>Una idea compartida.<br/>Un camino claro.</h2></div><p>Cada servicio tiene su propio proceso.<br/>Estas son las bases de nuestra forma de trabajar.</p></div><div className="process-grid">{processSteps.map(step=><article key={step.number} data-reveal><span className="process-number">{step.number}</span><h3>{step.title}</h3><p>{step.text}</p><small>{step.detail}</small></article>)}</div></div></section>
    <section className="wrap section faq-section"><div data-reveal><Eyebrow>ANTES DE EMPEZAR</Eyebrow><h2>Claridad desde<br/>el primer paso.</h2><p>Un buen proyecto también se construye<br/>con expectativas claras.</p></div><Faq items={commonFaq}/></section>
    <ContactCta/>
  </>;
}
