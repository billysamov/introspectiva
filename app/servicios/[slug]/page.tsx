import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, ArrowUpRight, ArrowDown } from "lucide-react";
import { services } from "@/lib/content";
import { servicePresentation } from "@/lib/service-presentation";
import { Button, Eyebrow, Faq, ContactCta, TextLink } from "@/components/ui";
import { ServiceDemo } from "@/components/service-demo";
import { ServiceProcess } from "@/components/service-process";
import { pageMetadata } from "@/lib/metadata";
import styles from "../services.module.css";

export function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);
  if (!service) notFound();
  return pageMetadata(service.name, service.description, `/servicios/${slug}`);
}
export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);
  if (!service) notFound();
  const presentation = servicePresentation[slug];
  return <>
    <section className={`wrap ${styles.detailHero}`}>
      <Link className="back-link" href="/servicios"><ArrowLeft size={16}/> Todos los servicios</Link>
      <div className={styles.heroGrid}>
        <div className="page-enter">
          <Eyebrow number={service.number}>{service.name}</Eyebrow>
          <h1>{presentation.headline}</h1>
          <p className={styles.heroDescription}>{service.detail}</p>
          <div className={styles.heroActions}>
            <Button href={`/contacto?servicio=${service.formValue}`}>Hablemos de tu proyecto</Button>
            <a href="#proceso" className={styles.processLink}>Así trabajamos <ArrowDown size={15}/></a>
          </div>
        </div>
        <div className={styles.heroDemo}><ServiceDemo key={slug} slug={slug}/></div>
      </div>
      <div className={styles.heroFoot}><span>{service.short}</span><span>ESTRATEGIA → DISEÑO → DESARROLLO</span></div>
    </section>
    <section className={`wrap section ${styles.capabilities}`}>
      <div className={styles.capabilityIntro} data-reveal><Eyebrow number="01">LO QUE CAMBIA PARA TU NEGOCIO</Eyebrow><h2>{presentation.focus}</h2></div>
      <div className={styles.capabilityGrid}>{presentation.capabilities.map((item, i) => <article key={item.title} data-reveal><span>0{i + 1}<ArrowUpRight size={18}/></span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    </section>
    <section className="service-deliverables">
      <div className="wrap deliverables-grid">
        <div data-reveal><Eyebrow number="02">DEL CONCEPTO A LA ENTREGA</Eyebrow><h2>Lo que construimos<br/>contigo.</h2><p>{service.outcome}</p><div className="tags">{service.tags.map(t => <span key={t}>{t}</span>)}</div></div>
        <div className="deliverables-list">{service.includes.map((item,i) => <div key={item} data-reveal><span>0{i+1}</span><p>{item}</p><Check size={20}/></div>)}</div>
      </div>
    </section>
    <ServiceProcess key={slug} slug={slug}/>
    <section className={`wrap ${styles.referenceSection}`}>
      <div className={`${styles.referenceVisual} ${slug === "identidad-digital" ? styles.brandReference : ""}`}>
        <span>DEL ESTUDIO / {slug === "identidad-digital" ? "NUESTRA IDENTIDAD" : "REFERENCIA PUBLICADA"}</span>
        <div className={styles.referenceImage}><Image src={presentation.image} fill sizes="(max-width: 700px) 85vw, 45vw" alt={presentation.imageAlt}/></div>
        <small>{slug === "identidad-digital" ? "Introspectiva Studio" : slug === "sistemas-a-medida" ? "INTROEXP · Interfaz de acceso" : slug === "ecommerce" ? "D Gali Home · eCommerce" : "SIIS Ingeniería · Catálogo B2B"}</small>
      </div>
      <div data-reveal><Eyebrow number="04">IDEAS QUE TOMAN FORMA</Eyebrow><h2>{presentation.referenceTitle}</h2><p>{presentation.referenceText}</p><TextLink href={presentation.referenceHref}>{presentation.referenceCta}</TextLink></div>
    </section>
    <section className={`wrap ${styles.audience}`} data-reveal><Eyebrow>¿ES PARA TI?</Eyebrow><p>{service.audience}</p><span>Partimos de lo que necesitas. El alcance, la inversión y los tiempos se definen contigo antes de comenzar.</span></section>
    <section className="wrap section faq-section"><div><Eyebrow>HABLEMOS CON CLARIDAD</Eyebrow><h2>Quizá te estás<br/>preguntando…</h2></div><Faq items={service.faq}/></section>
    <div className="wrap other-services"><h3>También podemos ayudarte con</h3>{services.filter(v=>v.slug!==slug).map(v=><Link key={v.slug} href={`/servicios/${v.slug}`}>{v.name}<ArrowUpRight size={18}/></Link>)}</div>
    <ContactCta/>
  </>;
}
