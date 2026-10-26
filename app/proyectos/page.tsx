import { PageIntro, ContactCta } from "@/components/ui";
import { ProjectFilter } from "@/components/project-filter";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Proyectos — Diseño que cobra vida", "Explora el trabajo de Introspectiva Studio: tiendas online, experiencias corporativas y diseño digital.", "/proyectos");
export default function Projects(){return <><PageIntro variant="work" eyebrow="NUESTRO TRABAJO" title="De buenas ideas" accent="a experiencias reales." description="Marcas distintas. Retos distintos. La misma intención: crear algo que tenga sentido, se vea bien y funcione para las personas."/><ProjectFilter/><ContactCta/></>;}
