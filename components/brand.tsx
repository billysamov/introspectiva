import Link from "next/link";

export function BrandMark({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M13 25a23 23 0 0 1 31-14" stroke="currentColor" strokeWidth="5"/><path d="M52 19a23 23 0 1 1-39 25" stroke="#378fff" strokeWidth="5"/><circle cx="49" cy="12" r="3.5" fill="#378fff"/><path d="m29 22 10 10-10 10" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 32h19" stroke="#378fff" strokeWidth="5.5" strokeLinecap="round"/></svg>;
}

export function Brand({ footer = false }: { footer?: boolean }) {
  return <Link className={`brand ${footer ? "brand-footer" : ""}`} href="/" aria-label="Introspectiva Studio — Inicio"><BrandMark/><span>introspectiva<span className="brand-sub">STUDIO®</span></span></Link>;
}
