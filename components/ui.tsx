import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Plus } from "lucide-react";
import { projects } from "@/lib/content";

export function Button({ href, children, light = false, secondary = false }: { href: string; children: React.ReactNode; light?: boolean; secondary?: boolean }) {
  return <Link className={`button ${light ? "button-light" : ""} ${secondary ? "button-secondary" : ""}`} href={href}>{children}<ArrowUpRight size={20}/></Link>;
}
export function Eyebrow({ children, number }: { children: React.ReactNode; number?: string }) { return <div className="eyebrow">{number && <span className="eyebrow-number">/{number}</span>}<span>{children}</span></div>; }
export function PageIntro({ eyebrow, title, accent, description }: { eyebrow: string; title: string; accent?: string; description: string }) {
  return <section className="page-intro page-enter wrap"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}{accent && <><br/><span className="text-blue">{accent}</span></>}</h1><p>{description}</p></section>;
}
export function ProjectCard({ project, index = 0 }: { project: typeof projects[number]; index?: number }) {
  const displayHost = "externalUrl" in project && project.externalUrl
    ? new URL(project.externalUrl as string).host
    : `${project.name.toLowerCase().replaceAll(" ", "")}.digital`;

  return <Link href={`/proyectos/${project.slug}`} className={`project-card project-${project.color}`} data-reveal><div className="project-visual"><span className="project-index">0{index + 1} / SELECTED WORK</span><div className="project-browser"><div className="browser-toolbar"><i/><i/><i/><span>{displayHost}</span></div><div className="project-image"><Image src={project.image} alt={`Vista del proyecto ${project.name}`} fill sizes="(max-width: 700px) 95vw, 50vw"/></div></div><span className="project-view"><ArrowUpRight size={23}/><span className="sr-only">Ver proyecto</span></span></div><div className="project-caption"><div><h3>{project.name}</h3><p>{project.sector}</p></div><span>{project.category}</span></div></Link>;
}
export function Faq({ items }: { items: string[][] }) { return <div className="faq-list">{items.map(([question, answer]) => <details key={question}><summary>{question}<Plus size={20}/></summary><p>{answer}</p></details>)}</div>; }
export function ContactCta() { return <section className="contact-cta wrap" data-reveal><Eyebrow>EL SIGUIENTE PASO ES CONTIGO</Eyebrow><div><h2>Las buenas ideas<br/>merecen <span>una gran web.</span></h2><Link className="round-cta" href="/contacto" aria-label="Cuéntanos tu proyecto"><ArrowUpRight/></Link></div><p>Cuéntanos qué tienes en mente. Le damos forma juntos.</p></section>; }
export function TextLink({ href, children }: { href: string; children: React.ReactNode }) { return <Link className="text-link" href={href}>{children}<ArrowRight size={18}/></Link>; }
