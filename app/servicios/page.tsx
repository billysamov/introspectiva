import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, ArrowDown } from "lucide-react";
import { services, commonFaq, processSteps, liveClientProjects } from "@/lib/content";
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

    {/* Proyectos y Casos en Producción */}
    <section className={`wrap section ${styles.liveCasesSection}`} aria-label="Proyectos en producción">
      <div className="section-heading" data-reveal>
        <div>
          <Eyebrow number="02">EN PRODUCCIÓN</Eyebrow>
          <h2>Proyectos activos.<br/><span className="text-blue">Trabajo en vivo.</span></h2>
        </div>
        <p>Plataformas digitales diseñadas y desarrolladas por Introspectiva Studio que hoy operan y conectan con usuarios y clientes reales.</p>
      </div>
      <div className={styles.liveCasesGrid}>
        {liveClientProjects.map(project => (
          <article key={project.slug} className={styles.liveCaseCard} data-reveal>
            <div className={styles.liveCaseMedia}>
              <Image src={project.image} alt={project.title} fill sizes="(max-width: 700px) 95vw, 45vw" className={styles.liveCaseImg} />
              <span className={styles.liveCaseTag}>{project.tags[0]}</span>
            </div>
            <div className={styles.liveCaseContent}>
              <div className={styles.liveCaseMeta}>
                <span>{project.name}</span>
                <span className={styles.liveCaseStatus}><span className={styles.pulseDot} /> En línea</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tags" style={{ marginBottom: "16px" }}>
                {project.tags.map(t => <span key={t}>{t}</span>)}
              </div>
              <div className={styles.liveCaseActions}>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="button button-light">
                  Visitar sitio web <ArrowUpRight size={16} />
                </a>
                <Link href={`/proyectos/${project.slug}`} className={styles.liveCaseDetailLink}>
                  Ver caso de estudio <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>

    <section className={`section ${styles.overviewProcess}`}><div className="wrap"><div className="section-heading"><div><Eyebrow>EL PUNTO DE PARTIDA</Eyebrow><h2>Una idea compartida.<br/>Un camino claro.</h2></div><p>Cada servicio tiene su propio proceso.<br/>Estas son las bases de nuestra forma de trabajar.</p></div><div className="process-grid">{processSteps.map(step=><article key={step.number} data-reveal><span className="process-number">{step.number}</span><h3>{step.title}</h3><p>{step.text}</p><small>{step.detail}</small></article>)}</div></div></section>
    <section className="wrap section faq-section"><div data-reveal><Eyebrow>ANTES DE EMPEZAR</Eyebrow><h2>Claridad desde<br/>el primer paso.</h2><p>Un buen proyecto también se construye<br/>con expectativas claras.</p></div><Faq items={commonFaq}/></section>
    <ContactCta/>
  </>;
}
