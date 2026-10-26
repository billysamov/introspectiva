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

  useEffect(() => {
    document.documentElement.setAttribute("data-motion", paused ? "paused" : "active");
    if (paused) {
      ScrollTrigger.getAll().forEach((t) => t.disable());
      return;
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
    if (heroArtEl && window.matchMedia("(hover: hover)").matches) {
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
    }

    const refresh = () => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const images = root.current?.querySelectorAll("img");
    images?.forEach((img) => img.addEventListener("load", refresh));
    document.fonts.ready.then(refresh);
    refresh();

    return () => {
      if (onMouseMove) window.removeEventListener("mousemove", onMouseMove);
      images?.forEach((img) => img.removeEventListener("load", refresh));
      ctx.revert();
    };
  }, [path, paused]);

  return (
    <MotionSettings.Provider value={{ paused }}>
      <div ref={root}>
        <div className="reading-progress" aria-hidden="true" />
        {children}
        <button
          className="motion-toggle"
          onClick={() => setPaused(!paused)}
          aria-label={paused ? "Activar animaciones" : "Pausar animaciones"}
          aria-pressed={paused}
          title={paused ? "Activar animaciones" : "Pausar animaciones"}
        >
          {paused ? <Play size={13} /> : <Pause size={13} />}
          <span>Motion {paused ? "off" : "on"}</span>
        </button>
      </div>
    </MotionSettings.Provider>
  );
}
