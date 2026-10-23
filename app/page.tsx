import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Asterisk } from "lucide-react";
import { Button, ContactCta, Eyebrow, ProjectCard, TextLink } from "@/components/ui";
import { services, projects, site } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Introspectiva Studio — Diseño que mira más allá", site.description, "/");
export default function Home() {
  return <>
    <section className="home-hero wrap">
      <div className="hero-meta page-enter"><span><i className="status-dot"/>ESTUDIO DIGITAL INDEPENDIENTE</span><span>LIMA, PERÚ · PARA EL MUNDO ↗</span></div>
      <div className="hero-grid"><div className="hero-copy"><h1 aria-label="Miramos dentro. Creamos hacia adelante."><span className="hero-line"><span>Miramos dentro.</span></span><span className="hero-line"><span>Creamos hacia</span></span><span className="hero-line"><span className="text-blue">adelante.</span></span></h1><div className="hero-description page-enter"><span className="hero-cross">✳</span><p>Estrategia, diseño y tecnología para que tu negocio<br className="desktop-break"/> se vea mejor. Y funcione mejor.</p></div><div className="hero-actions page-enter"><Button href="/proyectos">Explora nuestro trabajo</Button><Link href="/estudio" className="quiet-link">Conoce el estudio <ArrowUpRight size={16}/></Link></div></div><div className="hero-art"><Image src="/images/hero-sculpture.png" alt="Escultura de una cinta azul y metálica que avanza: una exploración visual de Introspectiva" fill priority sizes="(max-width: 700px) 100vw, 55vw"/><div className="art-topline"><span>UNA NUEVA PERSPECTIVA</span><span>↗ 2026</span></div><div className="art-caption"><span>DE LA IDEA<br/>A LO EXTRAORDINARIO.</span><span className="art-orbit">↗</span></div></div></div>
      <div className="hero-bottom"><span>BUEN DISEÑO. CÓDIGO SÓLIDO. VISIÓN COMPARTIDA.</span><a href="#seleccion" aria-label="Explorar proyectos seleccionados">DESLIZA PARA EXPLORAR <ArrowDown size={15}/></a></div>
    </section>
    <div className="marquee" aria-label="Estrategia, diseño, desarrollo y nuevas perspectivas"><div className="marquee-track" aria-hidden="true">{[0,1].map(k => <div className="marquee-group" key={k}><span>ESTRATEGIA</span><Asterisk/><span>DISEÑO QUE CONECTA</span><Asterisk/><span>DESARROLLO QUE IMPULSA</span><Asterisk/><span>NUEVAS PERSPECTIVAS</span><Asterisk/></div>)}</div></div>
    <section className="selected-work wrap section" id="seleccion"><div className="section-heading" data-reveal><div><Eyebrow number="01">PROYECTOS SELECCIONADOS</Eyebrow><h2>Ideas que ya<br/><span className="muted">cobran vida.</span></h2></div><div className="section-aside"><p>Cada negocio tiene su historia.<br/>Así ayudamos a contarla en digital.</p><TextLink href="/proyectos">Todos los proyectos</TextLink></div></div><div className="project-grid">{projects.slice(0,2).map((p,i)=><ProjectCard key={p.slug} project={p} index={i}/>)}</div></section>
    <section className="services-preview section"><div className="wrap"><div className="section-heading" data-reveal><div><Eyebrow number="02">LO QUE HACEMOS</Eyebrow><h2>Diseñamos el siguiente<br/>paso de tu negocio.</h2></div><TextLink href="/servicios">Explora nuestros servicios</TextLink></div><div className="service-rows">{services.map(s=><Link className="service-row" href={`/servicios/${s.slug}`} key={s.slug} data-reveal><span className="service-number">{s.number}</span><h3>{s.name}</h3><p>{s.short}</p><span className="row-arrow"><ArrowUpRight/></span></Link>)}</div></div></section>
    <section className="studio-preview wrap section"><div className="studio-graphic" aria-hidden="true" data-reveal><span>i.</span><div className="studio-graphic-bottom"><span>INTROSPECCIÓN<br/>PARA CREAR.</span><Asterisk size={44}/></div></div><div className="studio-preview-copy" data-reveal><Eyebrow number="03">EL ESTUDIO</Eyebrow><h2>Antes de crear,<br/>entendemos.</h2><p>Creemos que el mejor trabajo digital empieza con una buena pregunta. Miramos dentro de tu negocio para descubrir lo que lo hace único y llevarlo más lejos.</p><p>Somos Introspectiva: un estudio que une pensamiento estratégico, sensibilidad visual y desarrollo a medida.</p><Button href="/estudio" secondary>Así vemos las cosas</Button></div></section>
    <ContactCta/>
  </>;
}
