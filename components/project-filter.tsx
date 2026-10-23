"use client";
import { useState } from "react";
import { projects } from "@/lib/content";
import { ProjectCard } from "./ui";
export function ProjectFilter(){const [filter,setFilter]=useState("Todos");const options=["Todos",...new Set(projects.map(p=>p.category))];const filtered=filter==="Todos"?projects:projects.filter(p=>p.category===filter);return <section className="wrap portfolio-section"><div className="project-filters" role="group" aria-label="Filtrar proyectos">{options.map(o=><button key={o} aria-pressed={filter===o} onClick={()=>setFilter(o)}>{o}<span>{o==="Todos"?projects.length:projects.filter(p=>p.category===o).length}</span></button>)}</div><p className="sr-only" aria-live="polite">{filtered.length} proyectos mostrados</p><div className="project-grid" key={filter}>{filtered.map((p,i)=><ProjectCard project={p} index={i} key={p.slug}/>)}</div></section>;}
