"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Pause, Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Motion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const path = usePathname();
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      if (paused) return;
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".page-enter", { y: 18, opacity: 0, duration: .65, ease: "power3.out", clearProps: "all" });
        gsap.from(".hero-line > span", { yPercent: 112, rotate: 2, duration: 1.15, stagger: .12, ease: "power4.out", delay: .12, clearProps: "transform" });
        gsap.from(".hero-art", { scale: 1.1, opacity: 0, duration: 1.5, ease: "power3.out", delay: .1, clearProps: "transform,opacity" });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.from(element, { y: 38, opacity: 0, duration: .8, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 94%", once: true }, clearProps: "all" });
        });
        gsap.utils.toArray<HTMLElement>(".hero-art img, .manifesto-image img").forEach((element) => gsap.fromTo(element, { yPercent: -3 }, { yPercent: 3, ease: "none", scrollTrigger: { trigger: element.parentElement, start: "top bottom", end: "bottom top", scrub: 1 } }));
        gsap.utils.toArray<HTMLElement>(".marquee-track").forEach((element) => gsap.to(element, { xPercent: -50, duration: 30, ease: "none", repeat: -1 }));
        gsap.to(".reading-progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: .2 } });
      });
    }, root);
    const refresh = () => ScrollTrigger.refresh();
    const images = root.current?.querySelectorAll("img");
    images?.forEach(img => img.addEventListener("load", refresh));
    document.fonts.ready.then(refresh);
    return () => { images?.forEach(img => img.removeEventListener("load", refresh)); media.revert(); ctx.revert(); };
  }, [path, paused]);
  return <div ref={root}><div className="reading-progress" aria-hidden="true"/>{children}<button className="motion-toggle" onClick={() => setPaused(!paused)} aria-label={paused ? "Activar animaciones" : "Pausar animaciones"} aria-pressed={paused} title={paused ? "Activar animaciones" : "Pausar animaciones"}>{paused ? <Play size={13}/> : <Pause size={13}/>}<span>Motion {paused ? "off" : "on"}</span></button></div>;
}
