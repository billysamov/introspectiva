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
  return (
    <div className={styles.webStage} aria-hidden="true">
      <div className={styles.webBrowser} data-web-browser>
        <BrowserBar name="forma.studio"/>
        <div className={styles.webDesign} data-web-design>
          <div className={styles.webNav}><strong>FORMA<span>®</span></strong><span>Estudio&nbsp;&nbsp;&nbsp; Proyectos&nbsp;&nbsp;&nbsp; Contacto ↗</span></div>
          <div className={styles.architecture}>
            <Image src="/images/service-architecture.png" priority={priority} fill sizes="(max-width: 700px) 90vw, 50vw" alt=""/>
            <div className={styles.architectureCopy}>
              <small>ARQUITECTURA CON INTENCIÓN</small>
              <h3>Espacios para<br/>vivir distinto.</h3>
              <span>Explorar proyectos <ArrowUpRight/></span>
            </div>
          </div>
          <div className={styles.webBottom}>
            <span>Menos ruido.<br/><b>Más esencia.</b></span>
            <p>Diseñamos espacios que conectan<br/>con tu forma de habitar.</p>
            <ArrowUpRight/>
          </div>
        </div>
        <div className={styles.wireframe} data-wireframe>
          <div className={styles.wireNav}><b/><span/><span/><span/></div>
          <div className={styles.wireHero}><div><i/><i/><i/><b/></div><span>↗</span></div>
          <div className={styles.wireFooter}><span/><span/><span/></div>
          <small>WIREFRAME / ESTRUCTURA</small>
        </div>
      </div>
      <div className={styles.webPhone} data-web-phone>
        <div className={styles.phoneSpeaker}/>
        <div className={styles.phoneBrand}>FORMA® <span>☰</span></div>
        <div className={styles.phoneImage}>
          <Image src="/images/service-architecture.png" fill sizes="180px" alt=""/>
          <span>Espacios para<br/>vivir distinto.</span>
        </div>
        <p>Arquitectura<br/>con intención. ↗</p>
      </div>
      <div className={styles.floatingTag} data-web-tag><CircleCheck/> Diseñado para cada pantalla</div>
      <div className={styles.demoCursor} data-demo-cursor><MousePointer2/><span>Introspectiva</span></div>
    </div>
  );
}

function ShopScene({ priority }: { priority: boolean }) {
  return (
    <div className={styles.shopStage} aria-hidden="true">
      <div className={styles.shopBrowser}>
        <BrowserBar name="sono.store"/>
        <div className={styles.shopNav}>
          <strong>sono<span>®</span></strong>
          <span>Sonido que va contigo.</span>
          <ShoppingBag/>
        </div>
        <div className={styles.productView}>
          <div className={styles.productPhoto}>
            <Image src="/images/service-headphones.png" priority={priority} fill sizes="(max-width:700px) 65vw, 35vw" alt=""/>
            <span>DISEÑADO PARA ESCUCHAR.</span>
          </div>
          <div className={styles.productDetails}>
            <small>SONO / STUDIO SERIES</small>
            <h3>Tu mundo.<br/>Otro sonido.</h3>
            <p>Auriculares Studio 01</p>
            <div className={styles.productSwatches}><i/><i/><i/></div>
            <strong>S/ 390<span>Precio de demostración</span></strong>
            <div className={styles.addToBag} data-shop-button>Añadir al carrito <Plus/></div>
            <small>Envío y devolución / ejemplo</small>
          </div>
        </div>
        <div className={styles.shopFooter}>
          <span>SONIDO ENVOLVENTE</span>
          <span>DISEÑO ESENCIAL</span>
          <span>HECHO PARA TU RITMO</span>
        </div>
      </div>
      <div className={styles.cartPanel} data-cart>
        <span className={styles.cartHeading}>Tu selección <ShoppingBag/></span>
        <div className={styles.cartProduct}>
          <div><Image src="/images/service-headphones.png" fill sizes="120px" alt=""/></div>
          <span>Studio 01<small>Azul cobalto · 1 unidad</small><b>S/ 390</b></span>
        </div>
        <div className={styles.cartTotal}><span>Total de ejemplo</span><strong>S/ 390</strong></div>
        <span className={styles.cartConfirm}>Continuar con el pedido <ArrowUpRight/></span>
      </div>
      <div className={styles.orderSuccess} data-order-success>
        <CircleCheck/>
        <strong>Todo listo.</strong>
        <span>Así se siente una compra sencilla.</span>
        <small>PEDIDO DE DEMOSTRACIÓN</small>
      </div>
      <div className={styles.demoCursor} data-demo-cursor><MousePointer2/><span>Cliente</span></div>
    </div>
  );
}

function SystemScene() {
  return (
    <div className={styles.systemStage} aria-hidden="true">
      <div className={styles.systemBrowser}>
        <BrowserBar name="nexo.workspace"/>
        <div className={styles.dashboard}>
          <div className={styles.dashboardSidebar}>
            <Command/><span className={styles.sidebarActive}><LayoutGrid/></span>
            <Search/><SlidersHorizontal/><i>N</i>
          </div>
          <div className={styles.dashboardMain}>
            <div className={styles.dashboardHeader}>
              <div><small>TU EQUIPO, CONECTADO</small><h3>Todo avanza.</h3></div>
              <span>+ Nueva tarea</span>
            </div>
            <div className={styles.dashboardStats}>
              <span>Solicitudes<b>12</b></span>
              <span>En proceso<b>04</b></span>
              <span>Completadas<b>08</b></span>
            </div>
            <div className={styles.board}>
              <div className={styles.boardLane}>
                <h4><i/> Por revisar <span>02</span></h4>
                <div className={styles.taskCard} data-task>
                  <small>OPERACIONES · #014</small>
                  <strong>Preparar propuesta</strong>
                  <p>Cliente: Estudio Norte</p>
                  <div><span>Prioridad media</span><i>AS</i></div>
                </div>
                <div className={`${styles.taskCard} ${styles.ghostTask}`}>
                  <small>COMERCIAL · #012</small>
                  <strong>Revisar materiales</strong>
                  <p>Información centralizada</p>
                  <div><span>Esta semana</span><i>MR</i></div>
                </div>
              </div>
              <div className={styles.boardLane}>
                <h4><i/> En progreso <span>01</span></h4>
                <div className={styles.lanePlaceholder}>En equipo,<br/>todo encuentra su lugar.</div>
              </div>
              <div className={styles.boardLane}>
                <h4><i/> Completado <span>08</span></h4>
                <div className={styles.completeStamp} data-system-done>
                  <CircleCheck/><span>Propuesta enviada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.systemToast} data-system-toast>
        <CircleCheck/>
        <span><b>Proceso completado</b>El equipo ya tiene la actualización.</span>
      </div>
      <div className={styles.demoCursor} data-demo-cursor><MousePointer2/><span>Equipo</span></div>
    </div>
  );
}

function IdentityScene() {
  return (
    <div className={styles.identityStage} aria-hidden="true">
      <div className={styles.identityGrid}>
        <div className={styles.identityMark}>
          <span>01 / EL SÍMBOLO</span>
          <div data-identity-mark><BrandMark/></div>
          <small>Una idea que avanza.</small>
          <div className={styles.logoGuides}/>
        </div>
        <div className={styles.identityTypography}>
          <span>02 / LA VOZ VISUAL</span>
          <strong data-identity-type>Aa<span>Introspectiva.</span></strong>
          <small>CLARIDAD · CARÁCTER · DIRECCIÓN</small>
        </div>
        <div className={styles.identityPalette}>
          <span>03 / EL COLOR</span>
          <div>
            {["#2465F5", "#080B10", "#F2F2ED", "#A7C6FF"].map(color => (
              <div key={color} data-swatch style={{ background: color }}>
                <small>{color}</small>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.identityApplication}>
          <span>04 / EN CONTEXTO</span>
          <div className={styles.brandCard} data-brand-card>
            <BrandMark/>
            <strong>Miramos dentro.<br/>Creamos hacia<br/><span>adelante.</span></strong>
            <small>INTROSPECTIVA STUDIO ↗</small>
          </div>
          <div className={styles.miniBrandCard} data-mini-card>
            <BrandMark/>
            <span>i.</span>
          </div>
        </div>
      </div>
      <div className={styles.identityBadge} data-identity-badge>
        <Sparkles/> Un sistema. Muchas posibilidades.
      </div>
    </div>
  );
}

export function ServiceDemo({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const content = demoContent[slug] || demoContent["diseno-web"];
  const root = useRef<HTMLElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const { paused } = useMotionSettings();
  const [localPaused, setLocalPaused] = useState(false);
  const [inView, setInView] = useState(true);

  // IntersectionObserver ensures performance without blocking initial play
  useEffect(() => {
    if (!root.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setInView(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "250px" }
    );
    observer.observe(root.current);
    return () => observer.disconnect();
  }, [slug]);

  // Create timeline and choreograph fluid loop
  useEffect(() => {
    if (!root.current) return;

    const context = gsap.context(() => {
      const cycleDuration = 7.5;
      const t = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.3,
        defaults: { ease: "power2.inOut" },
      });
      timeline.current = t;

      // Progress bar smoothly fills across the entire loop
      t.fromTo("[data-demo-progress]", { scaleX: 0 }, { scaleX: 1, duration: cycleDuration, ease: "none" }, 0);

      // Phase indicator highlight steps
      const phases = gsap.utils.toArray<HTMLElement>("[data-demo-phase]");
      const phaseStep = cycleDuration / Math.max(1, phases.length);
      phases.forEach((phase, i) => {
        t.set(phase, { opacity: 0.4 }, 0);
        t.to(phase, { opacity: 1, duration: 0.3 }, i * phaseStep);
        if (i < phases.length - 1) {
          t.to(phase, { opacity: 0.4, duration: 0.3 }, (i + 1) * phaseStep);
        }
      });

      if (slug === "diseno-web") {
        t.set("[data-wireframe]", { autoAlpha: 1 }, 0)
          .set("[data-web-design]", { opacity: 0 }, 0)
          .set("[data-web-phone], [data-web-tag]", { autoAlpha: 0, y: 30 }, 0)
          .set("[data-web-browser]", { scale: 1, xPercent: 0 }, 0)
          .set("[data-demo-cursor]", { left: "37%", top: "52%", autoAlpha: 1 }, 0)
          // Cursor glides towards wireframe action
          .to("[data-demo-cursor]", { left: "68%", top: "28%", duration: 1.1, ease: "power2.out" }, 0.2)
          // Wireframe transitions to full visual design
          .to("[data-wireframe]", { autoAlpha: 0, duration: 0.6 }, 1.8)
          .to("[data-web-design]", { opacity: 1, duration: 0.8 }, 1.8)
          // Cursor scrolls down to check content
          .to("[data-demo-cursor]", { left: "38%", top: "68%", duration: 1.1, ease: "power2.inOut" }, 2.7)
          // Responsive view: browser shrinks slightly and mobile phone slides in
          .to("[data-web-browser]", { scale: 0.86, xPercent: -6, duration: 0.9, ease: "power3.inOut" }, 4.1)
          .to("[data-web-phone]", { autoAlpha: 1, y: 0, duration: 0.85, ease: "back.out(1.4)" }, 4.3)
          .to("[data-web-tag]", { autoAlpha: 1, y: 0, duration: 0.6, ease: "back.out(1.2)" }, 4.7)
          .to("[data-demo-cursor]", { autoAlpha: 0, duration: 0.3 }, 5.2)
          // Reset to clean wireframe state for seamless loop
          .to("[data-web-phone], [data-web-tag]", { autoAlpha: 0, y: 20, duration: 0.5 }, 6.8)
          .to("[data-web-browser]", { scale: 1, xPercent: 0, duration: 0.6 }, 6.8)
          .to("[data-web-design]", { opacity: 0, duration: 0.5 }, 6.9)
          .to("[data-wireframe]", { autoAlpha: 1, duration: 0.5 }, 7.0);

      } else if (slug === "ecommerce") {
        t.set("[data-cart]", { autoAlpha: 0, x: 30 }, 0)
          .set("[data-order-success]", { autoAlpha: 0, scale: 0.92 }, 0)
          .set("[data-demo-cursor]", { left: "38%", top: "45%", autoAlpha: 1 }, 0)
          // Cursor glides towards "Añadir al carrito"
          .to("[data-demo-cursor]", { left: "75%", top: "67%", duration: 1.2, ease: "power2.out" }, 0.2)
          // Button click micro-bounce
          .to("[data-shop-button]", { scale: 0.94, duration: 0.15, yoyo: true, repeat: 1 }, 1.5)
          // Cart panel slides in
          .to("[data-cart]", { autoAlpha: 1, x: 0, duration: 0.7, ease: "power3.out" }, 1.8)
          // Cursor moves to checkout
          .to("[data-demo-cursor]", { left: "75%", top: "76%", duration: 1.0, ease: "power2.inOut" }, 2.7)
          // Cart slides away and confirmation modal pops up
          .to("[data-cart]", { autoAlpha: 0, x: 20, duration: 0.4 }, 4.2)
          .to("[data-order-success]", { autoAlpha: 1, scale: 1, duration: 0.75, ease: "back.out(1.3)" }, 4.5)
          .to("[data-demo-cursor]", { autoAlpha: 0, duration: 0.3 }, 4.5)
          // Reset for repeat
          .to("[data-order-success]", { autoAlpha: 0, scale: 0.95, duration: 0.5 }, 6.9);

      } else if (slug === "sistemas-a-medida") {
        t.set("[data-task]", { xPercent: 0, y: 0, scale: 1 }, 0)
          .set("[data-system-done], [data-system-toast]", { autoAlpha: 0, y: 15 }, 0)
          .set("[data-demo-cursor]", { left: "28%", top: "54%", autoAlpha: 1 }, 0)
          // Cursor grabs task card
          .to("[data-demo-cursor]", { left: "30%", top: "48%", duration: 0.6 }, 0.2)
          // Task card lifts and moves into "En progreso"
          .to("[data-task]", { xPercent: 112, y: -6, rotation: 2, scale: 1.03, duration: 1.1, ease: "power2.inOut" }, 1.1)
          .to("[data-demo-cursor]", { left: "53%", top: "48%", duration: 1.1, ease: "power2.inOut" }, 1.1)
          .to("[data-task]", { rotation: 0, y: 0, scale: 1, duration: 0.3 }, 2.3)
          // Task card moves into "Completado"
          .to("[data-task]", { xPercent: 224, y: -6, rotation: -2, scale: 1.03, duration: 1.1, ease: "power2.inOut" }, 3.2)
          .to("[data-demo-cursor]", { left: "78%", top: "48%", duration: 1.1, ease: "power2.inOut" }, 3.2)
          .to("[data-task]", { rotation: 0, y: 0, scale: 1, duration: 0.3 }, 4.4)
          // Process completed stamp and toast
          .to("[data-system-done]", { autoAlpha: 1, y: 0, duration: 0.5, ease: "back.out(1.2)" }, 4.6)
          .to("[data-system-toast]", { autoAlpha: 1, y: 0, duration: 0.6, ease: "back.out(1.2)" }, 4.9)
          .to("[data-demo-cursor]", { autoAlpha: 0, duration: 0.3 }, 4.9)
          // Reset
          .to("[data-system-done], [data-system-toast]", { autoAlpha: 0, y: 10, duration: 0.5 }, 6.8);

      } else {
        // identidad-digital
        t.set("[data-identity-badge]", { autoAlpha: 0, y: 12 }, 0)
          .set("[data-identity-mark]", { rotation: -75, scale: 0.7, opacity: 0.4 }, 0)
          .to("[data-identity-mark]", { rotation: 0, scale: 1, opacity: 1, duration: 1.4, ease: "power3.out" }, 0.1)
          .fromTo("[data-identity-type]", { y: 14, opacity: 0.2 }, { y: 0, opacity: 1, duration: 0.9, ease: "power2.out" }, 1.5)
          .fromTo("[data-swatch]", { scaleY: 0.1 }, { scaleY: 1, stagger: 0.15, duration: 0.8, ease: "power3.out" }, 2.5)
          .fromTo("[data-brand-card]", { rotation: -10, y: 22, opacity: 0.3 }, { rotation: -4, y: 0, opacity: 1, duration: 0.9, ease: "back.out(1.2)" }, 3.8)
          .fromTo("[data-mini-card]", { x: 25, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, 4.4)
          .to("[data-identity-badge]", { autoAlpha: 1, y: 0, duration: 0.6, ease: "back.out(1.4)" }, 5.0)
          // Reset
          .to("[data-identity-badge], [data-brand-card], [data-mini-card]", { opacity: 0.2, duration: 0.5 }, 6.8);
      }
    }, root);

    return () => {
      context.revert();
      timeline.current = null;
    };
  }, [slug]);

  // Synchronize playback with visibility and pause states
  useEffect(() => {
    const shouldPlay = !document.hidden && !paused && !localPaused && inView;
    if (timeline.current) {
      if (shouldPlay) {
        timeline.current.play();
      } else {
        timeline.current.pause();
      }
    }

    const onVisibility = () => {
      const active = !document.hidden && !paused && !localPaused && inView;
      if (timeline.current) {
        if (active) timeline.current.play();
        else timeline.current.pause();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [paused, localPaused, inView, slug]);

  const stopped = paused || localPaused;

  return (
    <figure ref={root} className={`${styles.demo} ${compact ? styles.compact : ""}`} aria-label={content.title}>
      <div className={styles.demoTop}>
        <span>
          <i />
          DEMO EN MOVIMIENTO
        </span>
        <button
          type="button"
          onClick={() => setLocalPaused(!localPaused)}
          disabled={paused}
          aria-pressed={stopped}
          aria-label={stopped ? "Reproducir demostración" : "Pausar demostración"}
          data-sound="click"
        >
          {stopped ? <Play size={12} /> : <Pause size={12} />}
          <span>{stopped ? "Pausado" : "En bucle"}</span>
        </button>
      </div>

      <div className={styles.canvas}>
        {slug === "ecommerce" ? (
          <ShopScene priority={!compact} />
        ) : slug === "sistemas-a-medida" ? (
          <SystemScene />
        ) : slug === "identidad-digital" ? (
          <IdentityScene />
        ) : (
          <WebScene priority={!compact} />
        )}
      </div>

      <div className={styles.demoPhases} aria-hidden="true">
        {content.phases.map((phase, i) => (
          <span key={phase} data-demo-phase>
            <i>0{i + 1}</i>
            {phase}
            {i < 2 && <span>→</span>}
          </span>
        ))}
      </div>

      <div className={styles.demoProgress} aria-hidden="true">
        <span data-demo-progress />
      </div>

      <figcaption>
        Concepto ilustrativo · {slug === "identidad-digital" ? "Exploración de nuestra identidad" : "Contenido y datos de demostración"}
        <span className="sr-only">. {content.description}</span>
      </figcaption>
    </figure>
  );
}
