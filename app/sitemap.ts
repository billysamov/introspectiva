import type { MetadataRoute } from "next";
import { site, services, projects } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap{return ["", "/servicios", "/proyectos", "/estudio", "/contacto", "/privacidad", ...services.map(s=>`/servicios/${s.slug}`), ...projects.map(p=>`/proyectos/${p.slug}`)].map(path=>({url:`${site.url}${path}`,changeFrequency:path?"monthly":"weekly",priority:path?0.7:1}));}
