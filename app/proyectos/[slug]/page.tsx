import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/content";
import { Eyebrow, ContactCta } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { HeroSection } from "@/components/hero-section";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  return pageMetadata(p.name, p.summary, `/proyectos/${slug}`, p.image);
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  const externalUrl = "externalUrl" in p ? (p.externalUrl as string | undefined) : undefined;
  const coverSrc = "coverImage" in p && typeof p.coverImage === "string" ? p.coverImage : p.image;

  return (
    <>
      <HeroSection variant="case" image={p.image} tone={slug === "servitotales" ? "rose" : slug === "florentin" ? "teal" : slug === "d-gali-home" ? "amber" : "blue"}>
      <div className="wrap project-detail-intro page-enter">
        <Link className="back-link" href="/proyectos">
          <ArrowLeft size={16} /> Todos los proyectos
        </Link>
        <Eyebrow>{p.category} · {p.sector}</Eyebrow>
        <h1>
          {p.name}
          <span>↗</span>
        </h1>
        <p>{p.summary}</p>
        <div className="tags">{p.scope.map((s) => <span key={s}>{s}</span>)}</div>
        {externalUrl && (
          <div style={{ marginTop: "28px" }}>
            <a className="button" href={externalUrl} target="_blank" rel="noopener noreferrer">
              Visitar sitio web oficial <ArrowUpRight size={18} />
            </a>
          </div>
        )}
      </div>
      </HeroSection>

      <div className={`wrap case-cover project-${p.color}`}>
        <div className="case-image">
          <Image src={coverSrc} alt={`Diseño de la web de ${p.name}`} fill priority sizes="90vw" />
        </div>
        <span>{p.label}</span>
      </div>

      <section className="wrap case-story section">
        <div>
          <Eyebrow>LA PERSPECTIVA</Eyebrow>
          <h2>{p.label}</h2>
          <p className="case-note">{p.note}</p>
          {externalUrl && (
            <div style={{ marginTop: "24px" }}>
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "var(--blue, #378fff)",
                  fontSize: "12px",
                  fontWeight: 500,
                }}
              >
                Abrir plataforma en vivo ({externalUrl}) <ArrowUpRight size={14} />
              </a>
            </div>
          )}
        </div>
        <div>
          <article data-reveal>
            <span>01 / EL CONTEXTO</span>
            <h3>Un punto de partida.</h3>
            <p>{p.challenge}</p>
          </article>
          <article data-reveal>
            <span>02 / EL ENFOQUE</span>
            <h3>Una respuesta con intención.</h3>
            <p>{p.approach}</p>
          </article>
          <article data-reveal>
            <span>03 / EL ALCANCE</span>
            <h3>Lo que toma forma.</h3>
            <ul>{p.scope.map((s) => <li key={s}>{s}</li>)}</ul>
          </article>
        </div>
      </section>

      <Link href={`/proyectos/${next.slug}`} className="next-project wrap">
        <div>
          <Eyebrow>SIGUIENTE PROYECTO</Eyebrow>
          <h2>{next.name}</h2>
        </div>
        <ArrowUpRight />
      </Link>
      <ContactCta />
    </>
  );
}
