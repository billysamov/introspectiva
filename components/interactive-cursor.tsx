"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./interactive-cursor.module.css";

export function InteractiveCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const xDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    let active = false;

    const onMove = (e: MouseEvent) => {
      if (!active) {
        active = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const onHoverEnter = () => {
      gsap.to(ring, { scale: 1.8, borderColor: "rgba(66, 134, 255, 0.9)", backgroundColor: "rgba(66, 134, 255, 0.12)", duration: 0.25 });
      gsap.to(dot, { scale: 0.5, duration: 0.2 });
    };

    const onHoverLeave = () => {
      gsap.to(ring, { scale: 1, borderColor: "rgba(160, 180, 220, 0.45)", backgroundColor: "transparent", duration: 0.25 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const onLeave = () => {
      active = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    const interactiveSelector = "a, button, [role='button'], input, textarea, select, .project-card, .service-row";
    const addListeners = () => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener("mouseenter", onHoverEnter);
        el.addEventListener("mouseleave", onHoverLeave);
      });
    };

    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      observer.disconnect();
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.removeEventListener("mouseenter", onHoverEnter);
        el.removeEventListener("mouseleave", onHoverLeave);
      });
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className={styles.cursorDot} aria-hidden="true" />
      <div ref={ringRef} className={styles.cursorRing} aria-hidden="true" />
    </>
  );
}
