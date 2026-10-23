"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight, CircleCheck, Command, LayoutGrid, MousePointer2, Pause, Play, Plus, Search, ShoppingBag, SlidersHorizontal, Sparkles } from "lucide-react";
import { useMotionSettings } from "./motion";
import { BrandMark } from "./brand";
import styles from "./service-demo.module.css";

export const demoContent: Record<string, { title: string; description: string; phases: string[] }> = {
  "diseno-web": {
    title: "De la estructura a una web con carácter.",
    description: "Observa cómo una estructura inicial se convierte en una interfaz visual y se adapta a una pantalla móvil.",
    phases: ["Estructura", "Diseño visual", "Responsive"],
  },
  ecommerce: {
    title: "Una compra que fluye, de principio a fin.",
    description: "Descubrir un producto, añadirlo al carrito y confirmar un pedido: un recorrido de compra que hace fácil cada paso.",
    phases: ["Descubrir", "Elegir", "Confirmar"],
  },
  "sistemas-a-medida": {
    title: "Un proceso conectado. Todo en su sitio.",
    description: "Una solicitud entra, avanza entre etapas y se convierte en una tarea completada, con el equipo viendo la misma información.",
    phases: ["Recibir", "Organizar", "Resolver"],
  },
  "identidad-digital": {
    title: "Una identidad. Distintas formas de expresarla.",
    description: "Símbolo, color y tipografía se combinan en un sistema visual que mantiene su personalidad en cada formato.",
    phases: ["Símbolo", "Sistema visual", "Aplicaciones"],
  },
};

function BrowserBar({ name }: { name: string }) {
  return <div className={styles.browserBar}><div><i/><i/><i/></div><span>{name} / concepto</span><ArrowUpRight/></div>;
}

function WebScene({ priority }: { priority: boolean }) {
  return <div className={styles.webStage} aria-hidden="true">
    <div className={styles.webBrowser} data-web-browser>
      <BrowserBar name="forma.studio"/>
      <div className={styles.webDesign} data-web-design>
        <div className={styles.webNav}><strong>FORMA<span>®</span></strong><span>Estudio&nbsp;&nbsp;&nbsp; Proyectos&nbsp;&nbsp;&nbsp; Contacto ↗</span></div>
        <div className={styles.architecture}><Image src="/images/service-architecture.png" priority={priority} fill sizes="(max-width: 700px) 90vw, 50vw" alt=""/><div className={styles.architectureCopy}><small>ARQUITECTURA CON INTENCIÓN</small><h3>Espacios para<br/>vivir distinto.</h3><span>Explorar proyectos <ArrowUpRight/></span></div></div>
        <div className={styles.webBottom}><span>Menos ruido.<br/><b>Más esencia.</b></span><p>Diseñamos espacios que conectan<br/>con tu forma de habitar.</p><ArrowUpRight/></div>
      </div>
      <div className={styles.wireframe} data-wireframe><div className={styles.wireNav}><b/><span/><span/><span/></div><div className={styles.wireHero}><div><i/><i/><i/><b/></div><span>↗</span></div><div className={styles.wireFooter}><span/><span/><span/></div><small>WIREFRAME / ESTRUCTURA</small></div>
    </div>
    <div className={styles.webPhone} data-web-phone><div className={styles.phoneSpeaker}/><div className={styles.phoneBrand}>FORMA® <span>☰</span></div><div className={styles.phoneImage}><Image src="/images/service-architecture.png" fill sizes="180px" alt=""/><span>Espacios para<br/>vivir distinto.</span></div><p>Arquitectura<br/>con intención. ↗</p></div>
    <div className={styles.floatingTag} data-web-tag><CircleCheck/> Diseñado para cada pantalla</div>
    <div className={styles.demoCursor} data-demo-cursor><MousePointer2/><span>Introspectiva</span></div>
  </div>;
}

function ShopScene({ priority }: { priority: boolean }) {
  return <div className={styles.shopStage} aria-hidden="true"><div className={styles.shopBrowser}><BrowserBar name="sono.store"/><div className={styles.shopNav}><strong>sono<span>®</span></strong><span>Sonido que va contigo.</span><ShoppingBag/></div><div className={styles.productView}><div className={styles.productPhoto}><Image src="/images/service-headphones.png" priority={priority} fill sizes="(max-width:700px) 65vw, 35vw" alt=""/><span>DISEÑADO PARA ESCUCHAR.</span></div><div className={styles.productDetails}><small>SONO / STUDIO SERIES</small><h3>Tu mundo.<br/>Otro sonido.</h3><p>Auriculares Studio 01</p><div className={styles.productSwatches}><i/><i/><i/></div><strong>S/ 390<span>Precio de demostración</span></strong><div className={styles.addToBag} data-shop-button>Añadir al carrito <Plus/></div><small>Envío y devolución / ejemplo</small></div></div><div className={styles.shopFooter}><span>SONIDO ENVOLVENTE</span><span>DISEÑO ESENCIAL</span><span>HECHO PARA TU RITMO</span></div></div><div className={styles.cartPanel} data-cart><span className={styles.cartHeading}>Tu selección <ShoppingBag/></span><div className={styles.cartProduct}><div><Image src="/images/service-headphones.png" fill sizes="120px" alt=""/></div><span>Studio 01<small>Azul cobalto · 1 unidad</small><b>S/ 390</b></span></div><div className={styles.cartTotal}><span>Total de ejemplo</span><strong>S/ 390</strong></div><span className={styles.cartConfirm}>Continuar con el pedido <ArrowUpRight/></span></div><div className={styles.orderSuccess} data-order-success><CircleCheck/><strong>Todo listo.</strong><span>Así se siente una compra sencilla.</span><small>PEDIDO DE DEMOSTRACIÓN</small></div><div className={styles.demoCursor} data-demo-cursor><MousePointer2/><span>Cliente</span></div></div>;
}

function SystemScene() {
  return <div className={styles.systemStage} aria-hidden="true"><div className={styles.systemBrowser}><BrowserBar name="nexo.workspace"/><div className={styles.dashboard}><div className={styles.dashboardSidebar}><Command/><span className={styles.sidebarActive}><LayoutGrid/></span><Search/><SlidersHorizontal/><i>N</i></div><div className={styles.dashboardMain}><div className={styles.dashboardHeader}><div><small>TU EQUIPO, CONECTADO</small><h3>Todo avanza.</h3></div><span>+ Nueva tarea</span></div><div className={styles.dashboardStats}><span>Solicitudes<b>12</b></span><span>En proceso<b>04</b></span><span>Completadas<b>08</b></span></div><div className={styles.board}><div className={styles.boardLane}><h4><i/> Por revisar <span>02</span></h4><div className={styles.taskCard} data-task><small>OPERACIONES · #014</small><strong>Preparar propuesta</strong><p>Cliente: Estudio Norte</p><div><span>Prioridad media</span><i>AS</i></div></div><div className={`${styles.taskCard} ${styles.ghostTask}`}><small>COMERCIAL · #012</small><strong>Revisar materiales</strong><p>Información centralizada</p><div><span>Esta semana</span><i>MR</i></div></div></div><div className={styles.boardLane}><h4><i/> En progreso <span>01</span></h4><div className={styles.lanePlaceholder}>En equipo,<br/>todo encuentra su lugar.</div></div><div className={styles.boardLane}><h4><i/> Completado <span>08</span></h4><div className={styles.completeStamp} data-system-done><CircleCheck/><span>Propuesta enviada</span></div></div></div></div></div></div><div className={styles.systemToast} data-system-toast><CircleCheck/><span><b>Proceso completado</b>El equipo ya tiene la actualización.</span></div><div className={styles.demoCursor} data-demo-cursor><MousePointer2/><span>Equipo</span></div></div>;
}

function IdentityScene() {
  return <div className={styles.identityStage} aria-hidden="true"><div className={styles.identityGrid}><div className={styles.identityMark}><span>01 / EL SÍMBOLO</span><div data-identity-mark><BrandMark/></div><small>Una idea que avanza.</small><div className={styles.logoGuides}/></div><div className={styles.identityTypography}><span>02 / LA VOZ VISUAL</span><strong data-identity-type>Aa<span>Introspectiva.</span></strong><small>CLARIDAD · CARÁCTER · DIRECCIÓN</small></div><div className={styles.identityPalette}><span>03 / EL COLOR</span><div>{["#2465F5", "#080B10", "#F2F2ED", "#A7C6FF"].map(color=><div key={color} data-swatch style={{background:color}}><small>{color}</small></div>)}</div></div><div className={styles.identityApplication}><span>04 / EN CONTEXTO</span><div className={styles.brandCard} data-brand-card><BrandMark/><strong>Miramos dentro.<br/>Creamos hacia<br/><span>adelante.</span></strong><small>INTROSPECTIVA STUDIO ↗</small></div><div className={styles.miniBrandCard} data-mini-card><BrandMark/><span>i.</span></div></div></div><div className={styles.identityBadge} data-identity-badge><Sparkles/> Un sistema. Muchas posibilidades.</div></div>;
}

export function ServiceDemo({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const content = demoContent[slug] || demoContent["diseno-web"];
  const root = useRef<HTMLElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const { paused } = useMotionSettings();
  const [localPaused, setLocalPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .12 });
    if (root.current) observer.observe(root.current);
    return () => { preference.removeEventListener("change", update); observer.disconnect(); };
  }, []);

  useEffect(() => {
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const t = gsap.timeline({ repeat: -1, repeatDelay: .8, paused: true, defaults: { duration: .8, ease: "power2.inOut" } });
        timeline.current = t;
        t.fromTo("[data-demo-progress]", { scaleX: 0 }, { scaleX: 1, duration: 9.4, ease: "none" }, 0);
        const phases = gsap.utils.toArray<HTMLElement>("[data-demo-phase]");
        phases.forEach((phase, i) => {
          t.set(phase, { opacity: .4 }, 0);
          t.to(phase, { opacity: 1, duration: .35 }, i * 3.1);
          if (i < 2) t.to(phase, { opacity: .4, duration: .35 }, (i + 1) * 3.1);
        });
        if (slug === "diseno-web") {
          t.set("[data-wireframe]", { autoAlpha: 1 }, 0)
            .set("[data-web-design]", { opacity: 0 }, 0)
            .set("[data-web-phone], [data-web-tag]", { autoAlpha: 0, y: 35 }, 0)
            .set("[data-web-browser]", { scale: 1, xPercent: 0 }, 0)
            .set("[data-demo-cursor]", { left: "37%", top: "52%", autoAlpha: 1 }, 0)
            .to("[data-demo-cursor]", { left: "65%", top: "30%", duration: 1.4 }, .7)
            .to("[data-wireframe]", { autoAlpha: 0 }, 2.6)
            .to("[data-web-design]", { opacity: 1, duration: 1.1 }, 2.6)
            .to("[data-demo-cursor]", { left: "35%", top: "66%", duration: 1.3 }, 3.6)
            .to("[data-web-browser]", { scale: .85, xPercent: -5 }, 5.9)
            .to("[data-web-phone]", { autoAlpha: 1, y: 0, duration: 1.1, ease: "back.out(1.2)" }, 6.1)
            .to("[data-web-tag]", { autoAlpha: 1, y: 0 }, 6.6)
            .to("[data-demo-cursor]", { autoAlpha: 0 }, 6.7);
        } else if (slug === "ecommerce") {
          t.set("[data-cart]", { autoAlpha: 0, x: 35 }, 0)
            .set("[data-order-success]", { autoAlpha: 0, scale: .92 }, 0)
            .set("[data-demo-cursor]", { left: "40%", top: "47%", autoAlpha: 1 }, 0)
            .to("[data-demo-cursor]", { left: "76%", top: "66%", duration: 1.8 }, .8)
            .to("[data-shop-button]", { scale: .95, duration: .16, yoyo: true, repeat: 1 }, 2.7)
            .to("[data-cart]", { autoAlpha: 1, x: 0 }, 3.1)
            .to("[data-demo-cursor]", { left: "76%", top: "75%", duration: 1.2 }, 4.2)
            .to("[data-cart]", { autoAlpha: 0, x: 20 }, 6)
            .to("[data-order-success]", { autoAlpha: 1, scale: 1 }, 6.4)
            .to("[data-demo-cursor]", { autoAlpha: 0 }, 6.3);
        } else if (slug === "sistemas-a-medida") {
          t.set("[data-task]", { xPercent: 0, y: 0 }, 0)
            .set("[data-system-done], [data-system-toast]", { autoAlpha: 0, y: 15 }, 0)
            .set("[data-demo-cursor]", { left: "30%", top: "55%", autoAlpha: 1 }, 0)
            .to("[data-task]", { xPercent: 110, y: -7, rotation: 2, duration: 1.2 }, 2.8)
            .to("[data-demo-cursor]", { left: "54%", top: "52%", duration: 1.2 }, 2.8)
            .to("[data-task]", { rotation: 0, y: 0, duration: .3 }, 4)
            .to("[data-task]", { xPercent: 220, y: -7, rotation: -2, duration: 1.2 }, 5.7)
            .to("[data-demo-cursor]", { left: "80%", top: "52%", duration: 1.2 }, 5.7)
            .to("[data-task]", { rotation: 0, y: 0, duration: .3 }, 6.9)
            .to("[data-system-done], [data-system-toast]", { autoAlpha: 1, y: 0, stagger: .2 }, 7)
            .to("[data-demo-cursor]", { autoAlpha: 0 }, 7.2);
        } else {
          t.set("[data-identity-badge]", { autoAlpha: 0, y: 12 }, 0)
            .fromTo("[data-identity-mark]", { rotation: -90, scale: .6, opacity: .3 }, { rotation: 0, scale: 1, opacity: 1, duration: 1.8, ease: "power3.out" }, .2)
            .fromTo("[data-identity-type]", { y: 12, opacity: .25 }, { y: 0, opacity: 1, duration: 1 }, 2)
            .fromTo("[data-swatch]", { scaleY: .1 }, { scaleY: 1, stagger: .2, duration: .9, ease: "power3.out" }, 3.2)
            .fromTo("[data-brand-card]", { rotation: -8, y: 25, opacity: .4 }, { rotation: -4, y: 0, opacity: 1 }, 5.7)
            .fromTo("[data-mini-card]", { x: 30, opacity: 0 }, { x: 0, opacity: 1 }, 6.4)
            .to("[data-identity-badge]", { autoAlpha: 1, y: 0 }, 7.2);
        }
        return () => { timeline.current = null; };
      });
    }, root);
    return () => { media.revert(); context.revert(); timeline.current = null; };
  }, [slug]);

  useEffect(() => {
    const visibility = () => timeline.current?.paused(document.hidden || paused || localPaused || reduced || !inView);
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, [paused, localPaused, reduced, inView, slug]);

  const stopped = paused || localPaused || reduced;
  return <figure ref={root} className={`${styles.demo} ${compact ? styles.compact : ""}`} aria-label={content.title}>
    <div className={styles.demoTop}><span><i/>DEMO EN MOVIMIENTO</span><button type="button" onClick={() => setLocalPaused(!localPaused)} disabled={paused || reduced} aria-pressed={stopped} aria-label={stopped ? "Reproducir demostración" : "Pausar demostración"}>{stopped ? <Play/> : <Pause/>}<span>{reduced ? "Vista estática" : stopped ? "Pausado" : "En bucle"}</span></button></div>
    <div className={styles.canvas}>{slug === "ecommerce" ? <ShopScene priority={!compact}/> : slug === "sistemas-a-medida" ? <SystemScene/> : slug === "identidad-digital" ? <IdentityScene/> : <WebScene priority={!compact}/>}</div>
    <div className={styles.demoPhases} aria-hidden="true">{content.phases.map((phase,i)=><span key={phase} data-demo-phase><i>0{i+1}</i>{phase}{i<2 && <span>→</span>}</span>)}</div><div className={styles.demoProgress} aria-hidden="true"><span data-demo-progress/></div>
    <figcaption>Concepto ilustrativo · {slug === "identidad-digital" ? "Exploración de nuestra identidad" : "Contenido y datos de demostración"}<span className="sr-only">. {content.description}</span></figcaption>
  </figure>;
}
