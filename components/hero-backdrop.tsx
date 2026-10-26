"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useMotionSettings } from "./motion";
import styles from "./hero-backdrop.module.css";

export type HeroVariant =
  | "home"
  | "work"
  | "services"
  | "studio"
  | "contact"
  | "legal"
  | "web"
  | "shop"
  | "systems"
  | "identity"
  | "case";

export type HeroTone = "blue" | "violet" | "teal" | "amber" | "rose";

export type HeroBackdropProps = {
  variant?: HeroVariant;
  image?: string;
  tone?: HeroTone;
  quiet?: boolean;
};

const defaults: Record<HeroVariant, { image?: string; tone: HeroTone }> = {
  home: { tone: "blue" },
  work: { image: "/images/hero-sculpture.png", tone: "violet" },
  services: { image: "/images/service-architecture.png", tone: "blue" },
  studio: { image: "/images/hero-sculpture.png", tone: "violet" },
  contact: { image: "/images/service-architecture.png", tone: "teal" },
  legal: { tone: "blue" },
  web: { image: "/images/service-architecture.png", tone: "blue" },
  shop: { image: "/images/service-headphones.png", tone: "violet" },
  systems: { tone: "teal" },
  identity: { image: "/images/hero-sculpture.png", tone: "rose" },
  case: { tone: "blue" },
};

/** Decorative layer; the parent hero establishes an isolated stacking context. */
export function HeroBackdrop({ variant = "home", image, tone, quiet = false }: HeroBackdropProps) {
  const root = useRef<HTMLDivElement>(null);
  const { paused } = useMotionSettings();
  const pausedRef = useRef(paused);
  const syncPlayback = useRef<(() => void) | null>(null);
  const source = image ?? defaults[variant].image;
  const staticOnly = quiet || variant === "legal";

  useEffect(() => {
    pausedRef.current = paused;
    syncPlayback.current?.();
  }, [paused]);

  useEffect(() => {
    const element = root.current;
    if (!element || staticOnly) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let timeline: gsap.core.Timeline | undefined;

    const context = gsap.context(() => {
      timeline = gsap.timeline({ paused: true, repeat: -1, yoyo: true, defaults: { duration: 16, ease: "sine.inOut" } });
      timeline
        .to("[data-hero-glow='primary']", { xPercent: 8, yPercent: -7, scale: 1.07 }, 0)
        .to("[data-hero-glow='secondary']", { xPercent: -12, yPercent: 12, scale: 1.1 }, 0)
        .to("[data-hero-orbit]", { rotation: 14, scale: 1.035 }, 0);
      if (source) timeline.to("[data-hero-image]", { scale: 1.045, xPercent: -1 }, 0);
    }, element);

    const sync = () => {
      if (!timeline) return;
      if (reducedMotion.matches) {
        timeline.pause(0);
        return;
      }
      timeline.paused(pausedRef.current || !visible || document.hidden);
    };

    syncPlayback.current = sync;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0 });
    observer.observe(element);
    reducedMotion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      syncPlayback.current = null;
      context.revert();
    };
  }, [source, variant, staticOnly]);

  return (
    <div
      ref={root}
      className={styles.backdrop}
      data-hero-backdrop
      data-variant={variant}
      data-tone={tone ?? defaults[variant].tone}
      data-quiet={staticOnly ? "true" : undefined}
      data-has-image={source ? "true" : undefined}
      aria-hidden="true"
    >
      <div className={styles.colorField} />
      {source && (
        <div className={styles.imageLayer} data-hero-image>
          <Image src={source} alt="" fill sizes="(max-width: 700px) 100vw, 75vw" className={styles.image} />
        </div>
      )}
      <div className={styles.primaryGlow} data-hero-glow="primary" />
      <div className={styles.secondaryGlow} data-hero-glow="secondary" />
      <div className={styles.grid} />
      <div className={styles.orbit} data-hero-orbit><span /></div>
      <div className={styles.veil} />
    </div>
  );
}
