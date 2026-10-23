import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "./brand";
export function Footer() {
  return <footer className="site-footer"><div className="wrap footer-top"><div><Brand footer/><p>Miramos dentro.<br/>Creamos hacia adelante.</p></div><div className="footer-links"><span>EXPLORA</span><Link href="/proyectos">Proyectos <ArrowUpRight size={14}/></Link><Link href="/servicios">Servicios <ArrowUpRight size={14}/></Link><Link href="/estudio">El estudio <ArrowUpRight size={14}/></Link></div><div className="footer-links"><span>CONECTEMOS</span><Link href="/contacto">Cuéntanos tu idea <ArrowUpRight size={14}/></Link><span className="footer-location">Lima, Perú<br/>Trabajamos sin fronteras.</span></div><div className="footer-note"><span className="status-dot"/>Diseño con intención.<br/><span>Tecnología con propósito.</span></div></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} Introspectiva Studio</span><span>Hecho con perspectiva, desde Perú.</span><Link href="/privacidad">Privacidad</Link></div></footer>;
}
