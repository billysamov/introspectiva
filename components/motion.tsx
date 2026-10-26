"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Pause, Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MotionSettings = createContext({ paused: false });
export const useMotionSettings = () => useContext(MotionSettings);

export function Motion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const path = usePathname();
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    // Check the media query immediately so the first effect cannot animate
    // before React has received the user's system preference.
    const stopped = paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.setAttribute("data-motion", stopped ? "paused" : "active");
    if (stopped) {
      return () => document.documentElement.removeAttribute("data-motion");
    }

    const ctx = gsap.context(() => {
      const entrance = gsap.utils.toArray<HTMLElement>(".page-enter");
      const heroLines = gsap.utils.toArray<HTMLElement>(".hero-line > span");
      const heroArt = gsap.utils.toArray<HTMLElement>(".hero-art");

      if (entrance.length) {
        gsap.from(entrance, {
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          clearProps: "all",
        });
      }

      if (heroLines.length) {
        gsap.from(heroLines, {
          yPercent: 115,
          rotate: 2,
          duration: 1.1,
          stagger: 0.12,
          ease: "power4.out",
          delay: 0.1,
          clearProps: "transform",
        });
      }

      if (heroArt.length) {
        gsap.from(heroArt, {
          scale: 1.08,
          opacity: 0,
          duration: 1.4,
          ease: "power3.out",
          delay: 0.1,
          clearProps: "transform,opacity",
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 35,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 95%",
            once: true,
          },
          clearProps: "all",
        });
      });

      gsap.utils.toArray<HTMLElement>(".hero-art img, .manifesto-image img").forEach((element) => {
        gsap.fromTo(
          element,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: element.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });

      gsap.to(".reading-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
      });
    }, root);

    // Interactive mouse parallax for hero
    const heroArtEl = root.current?.querySelector<HTMLElement>(".hero-art");
    const heroCopyEl = root.current?.querySelector<HTMLElement>(".hero-copy");

    let onMouseMove: ((e: MouseEvent) => void) | undefined;
    ctx.add(() => {
      if (!heroArtEl || !window.matchMedia("(hover: hover)").matches) return;
      const xArt = gsap.quickTo(heroArtEl, "x", { duration: 0.6, ease: "power2.out" });
      const yArt = gsap.quickTo(heroArtEl, "y", { duration: 0.6, ease: "power2.out" });
      const xCopy = heroCopyEl ? gsap.quickTo(heroCopyEl, "x", { duration: 0.8, ease: "power2.out" }) : null;
      const yCopy = heroCopyEl ? gsap.quickTo(heroCopyEl, "y", { duration: 0.8, ease: "power2.out" }) : null;

      onMouseMove = (e: MouseEvent) => {
        const nx = (e.clientX / window.innerWidth) - 0.5;
        const ny = (e.clientY / window.innerHeight) - 0.5;
        xArt(nx * 24);
        yArt(ny * 16);
        if (xCopy && yCopy) {
          xCopy(nx * -10);
          yCopy(ny * -6);
        }
      };
      window.addEventListener("mousemove", onMouseMove);
    });

    let disposed = false;
    let refreshFrame = 0;
    const refresh = () => {
      if (disposed) return;
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => {
        if (!disposed) ScrollTrigger.refresh();
      });
    };

    const images = root.current?.querySelectorAll("img");
    images?.forEach((img) => img.addEventListener("load", refresh));
    document.fonts.ready.then(refresh);
    refresh();

    return () => {
      disposed = true;
      cancelAnimationFrame(refreshFrame);
      if (onMouseMove) window.removeEventListener("mousemove", onMouseMove);
      images?.forEach((img) => img.removeEventListener("load", refresh));
      ctx.revert();
      document.documentElement.removeAttribute("data-motion");
    };
  }, [path, paused, reducedMotion]);

  const stopped = paused || reducedMotion;
  const motionLabel = reducedMotion
    ? "Movimiento reducido por la configuración del sistema"
    : paused ? "Activar animaciones" : "Pausar animaciones";

  return (
    <MotionSettings.Provider value={{ paused }}>
      <div ref={root}>
        <div className="reading-progress" aria-hidden="true" />
        {children}
        <button
          className="motion-toggle"
          onClick={() => setPaused((value) => !value)}
          aria-label={motionLabel}
          aria-pressed={stopped}
          disabled={reducedMotion}
          title={motionLabel}
        >
          {stopped ? <Play size={13} /> : <Pause size={13} />}
          <span>Motion {stopped ? "off" : "on"}</span>
        </button>
      </div>
    </MotionSettings.Provider>
  );
}
