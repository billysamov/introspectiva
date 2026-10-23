"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "./brand";

const links = [["/proyectos", "Proyectos"], ["/servicios", "Servicios"], ["/estudio", "El estudio"]];
export function Header() {
  const path = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  function close() { dialog.current?.close(); setOpen(false); trigger.current?.focus(); }
  useEffect(() => { dialog.current?.close(); setOpen(false); }, [path]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  return <header className="site-header"><div className="header-inner"><Brand/><nav className="desktop-nav" aria-label="Navegación principal">{links.map(([href, label]) => <Link key={href} href={href} className={path.startsWith(href) ? "active" : ""} aria-current={path.startsWith(href) ? "page" : undefined}>{label}<span/></Link>)}</nav><Link href="/contacto" className="header-cta">Hablemos <ArrowUpRight size={17}/></Link><button ref={trigger} className="menu-toggle" aria-label="Abrir menú" aria-expanded={open} aria-controls="mobile-menu" onClick={() => { dialog.current?.showModal(); setOpen(true); }}><Menu/></button></div><dialog id="mobile-menu" aria-label="Navegación principal" ref={dialog} className="mobile-menu" onCancel={close} onClose={() => setOpen(false)}><div className="mobile-menu-top"><Brand/><button onClick={close} aria-label="Cerrar menú"><X/></button></div><nav aria-label="Navegación móvil">{[["/", "Inicio"], ...links, ["/contacto", "Hablemos"]].map(([href, label], i) => <Link onClick={close} href={href} key={href}><span>0{i + 1}</span>{label}<ArrowUpRight/></Link>)}</nav><p>Lima, Perú · Ideas sin fronteras.</p></dialog></header>;
}
