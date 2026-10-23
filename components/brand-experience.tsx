"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Volume2, VolumeX } from "lucide-react";
import gsap from "gsap";
import { useMotionSettings } from "./motion";
import styles from "./brand-experience.module.css";

const INTRO_KEY = "introspectiva:intro:v1";
const SOUND_KEY = "introspectiva:sound:v1";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function AnimatedMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path data-logo-stroke="white-ring" pathLength="1" d="M13 25a23 23 0 0 1 31-14" stroke="currentColor" strokeWidth="5" />
      <path data-logo-stroke="blue-ring" pathLength="1" d="M52 19a23 23 0 1 1-39 25" stroke="#378fff" strokeWidth="5" />
      <circle data-logo-dot cx="49" cy="12" r="3.5" fill="#378fff" />
      <path data-logo-stroke="arrow" pathLength="1" d="m29 22 10 10-10 10" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path data-logo-stroke="dash" pathLength="1" d="M4 32h19" stroke="#378fff" strokeWidth="5.5" strokeLinecap="round" />
    </svg>
  );
}

function traceMark(mark: Element, duration = .55) {
  const strokes = mark.querySelectorAll("[data-logo-stroke]");
  const dot = mark.querySelector("[data-logo-dot]");
  const timeline = gsap.timeline();
  timeline.fromTo(strokes, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration, stagger: .055, ease: "power2.inOut" });
  timeline.fromTo(dot, { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: .25, ease: "back.out(1.5)" }, .25);
  return timeline;
}

function sessionIntroSeen() {
  try { return sessionStorage.getItem(INTRO_KEY) === "seen"; } catch { return false; }
}

function rememberIntro() {
  try { sessionStorage.setItem(INTRO_KEY, "seen"); } catch { /* Storage can be disabled. */ }
}

/** Mount once inside Motion, alongside the site's persistent header and footer. */
export function BrandExperience() {
  const router = useRouter();
  const pathname = usePathname();
  const { paused } = useMotionSettings();
  const curtainRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const beaconRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const playToneRef = useRef<() => void>(() => {});
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const traceRef = useRef<gsap.core.Timeline | null>(null);
  const watchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const introRef = useRef(false);
  const pendingRouteRef = useRef<{ href: string; dispatched: boolean } | null>(null);
  // Scroll ownership outlives the visual watchdog when the destination is slow.
  const pendingScrollRef = useRef<string | null>(null);
  const previousPathRef = useRef(pathname);
  const pausedRef = useRef(paused);
  const soundRef = useRef(true);
  const lastToneRef = useRef(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [announcement, setAnnouncement] = useState("");

  // Mutable helpers keep document listeners and timers current without reinstalling them.
  const releaseRef = useRef<() => void>(() => {});
  const revealRef = useRef<() => void>(() => {});
  const navigateRef = useRef<() => void>(() => {});
  pausedRef.current = paused;

  releaseRef.current = () => {
    if (watchdogRef.current) clearTimeout(watchdogRef.current);
    watchdogRef.current = null;
    timelineRef.current?.kill();
    traceRef.current?.kill();
    timelineRef.current = null;
    traceRef.current = null;
    introRef.current = false;
    pendingRouteRef.current = null;
    if (curtainRef.current) gsap.set(curtainRef.current, { autoAlpha: 0, yPercent: 0, pointerEvents: "none" });
    if (beaconRef.current) gsap.set(beaconRef.current, { autoAlpha: 0 });
    setAnnouncement("");
  };

  navigateRef.current = () => {
    const pending = pendingRouteRef.current;
    if (!pending || pending.dispatched) return;
    pending.dispatched = true;
    pendingScrollRef.current = pending.href;
    router.push(pending.href, { scroll: false });
  };

  revealRef.current = () => {
    if (!curtainRef.current) return;
    timelineRef.current?.kill();
    if (pausedRef.current || window.matchMedia(REDUCED_MOTION).matches) {
      releaseRef.current();
      return;
    }
    timelineRef.current = gsap.timeline({ onComplete: () => releaseRef.current() });
    timelineRef.current.to(curtainRef.current, { yPercent: -100, duration: .48, ease: "power3.inOut", delay: .12 });
  };

  useLayoutEffect(() => {
    const curtain = curtainRef.current;
    const mark = markRef.current;
    if (!curtain || !mark || sessionIntroSeen()) return;
    if (pausedRef.current || window.matchMedia(REDUCED_MOTION).matches) {
      rememberIntro();
      return;
    }

    let alive = true;
    let readyTimer: ReturnType<typeof setTimeout> | undefined;
    const events = new AbortController();
    const startedAt = performance.now();
    introRef.current = true;
    setAnnouncement("Preparando Introspectiva Studio.");
    gsap.set(curtain, { autoAlpha: 1, yPercent: 0, pointerEvents: "auto" });
    traceRef.current = traceMark(mark);

    // Only critical images are awaited. Lazy content never delays entry.
    const criticalImages = Array.from(document.querySelectorAll<HTMLImageElement>(
      'img[fetchpriority="high"], img[loading="eager"], main img:not([loading="lazy"])',
    )).slice(0, 4);
    const imageReady = criticalImages.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise<void>(resolve => {
        img.addEventListener("load", () => resolve(), { once: true, signal: events.signal });
        img.addEventListener("error", () => resolve(), { once: true, signal: events.signal });
      });
    });

    Promise.all([document.fonts.ready, ...imageReady]).then(() => {
      if (!alive || !introRef.current) return;
      readyTimer = setTimeout(() => {
        if (!alive || !introRef.current) return;
        rememberIntro();
        revealRef.current();
      }, Math.max(0, 760 - (performance.now() - startedAt)));
    }).catch(() => {
      if (alive) { rememberIntro(); releaseRef.current(); }
    });

    // This deadline includes the exit animation: the page can never stay covered.
    watchdogRef.current = setTimeout(() => {
      rememberIntro();
      releaseRef.current();
    }, 2500);

    return () => {
      alive = false;
      events.abort();
      if (readyTimer) clearTimeout(readyTimer);
      releaseRef.current();
    };
  }, []);

  useEffect(() => {
    try {
      const enabled = localStorage.getItem(SOUND_KEY) !== "off";
      soundRef.current = enabled;
      setSoundEnabled(enabled);
    } catch { /* Use the in-memory preference when storage is unavailable. */ }

    const playTone = async () => {
      if (!soundRef.current || performance.now() - lastToneRef.current < 160) return;
      lastToneRef.current = performance.now();
      try {
        const context = audioRef.current ?? new AudioContext();
        audioRef.current = context;
        // Both creation and resume happen inside a trusted click, never on page load.
        if (context.state === "suspended") await context.resume();
        if (context.state !== "running" || !soundRef.current) return;
        const at = context.currentTime;
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(620, at);
        oscillator.frequency.exponentialRampToValueAtTime(880, at + .07);
        gain.gain.setValueAtTime(.0001, at);
        gain.gain.exponentialRampToValueAtTime(.045, at + .008);
        gain.gain.exponentialRampToValueAtTime(.0001, at + .13);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start(at);
        oscillator.stop(at + .14);
        oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
      } catch { /* Audio support must never prevent a button action. */ }
    };
    playToneRef.current = () => { void playTone(); };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const importantButton = target.closest<HTMLElement>(".button:not(.button-secondary), .header-cta, .round-cta, .desktop-nav a, .mobile-menu nav a, .menu-toggle, .project-card, .text-link, .service-row, .project-filters button, [data-sound]");
      if (event.isTrusted && importantButton && !importantButton.matches('[disabled], [aria-disabled="true"], [data-sound="off"]')) void playTone();

      // Keyboard, modified clicks, downloads and external links retain native behavior.
      if (event.defaultPrevented || event.button !== 0 || event.detail === 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (pausedRef.current || window.matchMedia(REDUCED_MOTION).matches || introRef.current) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self") || anchor.dataset.transition === "off" || anchor.getAttribute("aria-disabled") === "true") return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname || !/^https?:$/.test(url.protocol) || /\.[a-z0-9]{2,6}$/i.test(url.pathname)) return;
      if (!curtainRef.current || !markRef.current) return;
      event.preventDefault();
      if (pendingRouteRef.current) return;

      pendingRouteRef.current = { href: `${url.pathname}${url.search}${url.hash}`, dispatched: false };
      setAnnouncement("Abriendo sección.");
      gsap.set(curtainRef.current, { autoAlpha: 1, yPercent: 100, pointerEvents: "auto" });
      traceRef.current?.kill();
      traceRef.current = traceMark(markRef.current, .35);
      timelineRef.current?.kill();
      timelineRef.current = gsap.timeline({ onComplete: () => navigateRef.current() });
      timelineRef.current.to(curtainRef.current, { yPercent: 0, duration: .24, ease: "power2.inOut" });
      watchdogRef.current = setTimeout(() => {
        navigateRef.current();
        releaseRef.current();
      }, 1800);
    };

    const cancelCover = () => {
      if (introRef.current) rememberIntro();
      navigateRef.current();
      releaseRef.current();
    };
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") cancelCover(); };
    const onPopState = () => {
      pendingScrollRef.current = null;
      releaseRef.current();
    };
    const onVisibility = () => { if (document.hidden) cancelCover(); };
    const reduced = window.matchMedia(REDUCED_MOTION);
    const onReducedMotion = () => { if (reduced.matches) cancelCover(); };
    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKey);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("popstate", onPopState);
    reduced.addEventListener("change", onReducedMotion);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("popstate", onPopState);
      reduced.removeEventListener("change", onReducedMotion);
      pendingScrollRef.current = null;
      playToneRef.current = () => {};
      releaseRef.current();
      if (audioRef.current && audioRef.current.state !== "closed") void audioRef.current.close().catch(() => {});
      audioRef.current = null;
    };
  }, [router]);

  useLayoutEffect(() => {
    if (previousPathRef.current === pathname) return;
    previousPathRef.current = pathname;
    const scrollDestination = pendingScrollRef.current;
    pendingScrollRef.current = null;
    if (scrollDestination) {
      const destination = new URL(scrollDestination, window.location.origin);
      if (destination.pathname === pathname) {
        let targetId = destination.hash.slice(1);
        try { targetId = decodeURIComponent(targetId); } catch { /* Invalid escape sequences are treated literally. */ }
        const target = targetId ? document.getElementById(targetId) ?? document.getElementsByName(targetId)[0] : null;
        if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
        else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    }
    if (pausedRef.current || window.matchMedia(REDUCED_MOTION).matches) {
      releaseRef.current();
      return;
    }
    if (pendingRouteRef.current) {
      revealRef.current();
      return;
    }
    // Native keyboard, history and programmatic navigation get a small entry signature.
    const beacon = beaconRef.current;
    if (!beacon || introRef.current) return;
    timelineRef.current?.kill();
    traceRef.current?.kill();
    traceRef.current = traceMark(beacon, .3);
    timelineRef.current = gsap.timeline();
    timelineRef.current.fromTo(beacon, { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0, duration: .2 });
    timelineRef.current.to(beacon, { autoAlpha: 0, y: -5, duration: .25 }, "+=.55");
  }, [pathname]);

  useEffect(() => {
    if (!paused) return;
    if (introRef.current) rememberIntro();
    navigateRef.current();
    releaseRef.current();
  }, [paused]);

  const toggleSound = () => {
    const next = !soundRef.current;
    soundRef.current = next;
    setSoundEnabled(next);
    try { localStorage.setItem(SOUND_KEY, next ? "on" : "off"); } catch { /* Memory preference still works. */ }
    if (next) playToneRef.current();
  };

  return (
    <>
      <div className={styles.curtain} ref={curtainRef} aria-hidden="true" data-brand-curtain>
        <div className={styles.curtainGrid} />
        <div className={styles.identity}>
          <div className={styles.mark} ref={markRef}><AnimatedMark /></div>
          <span className={styles.wordmark}>introspectiva<span>STUDIO®</span></span>
        </div>
        <span className={styles.caption}>UNA NUEVA PERSPECTIVA DIGITAL</span>
        <span className={styles.curtainLine} />
      </div>
      <div ref={beaconRef} className={styles.routeBeacon} aria-hidden="true"><AnimatedMark /></div>
      <span className={styles.srOnly} role="status" aria-live="polite" aria-atomic="true">{announcement}</span>
      <button className={styles.soundToggle} type="button" onClick={toggleSound} aria-label={soundEnabled ? "Silenciar sonidos de interacción" : "Activar sonidos de interacción"} aria-pressed={soundEnabled} title={soundEnabled ? "Silenciar sonidos" : "Activar sonidos"} data-sound="off">
        {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
        <span>Sonido {soundEnabled ? "on" : "off"}</span>
      </button>
    </>
  );
}
