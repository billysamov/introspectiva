import type { ReactNode } from "react";
import { HeroBackdrop, type HeroVariant } from "./hero-backdrop";
import styles from "./hero-section.module.css";

export function HeroSection({ children, variant = "work", image, tone, quiet = false, className = "" }: {
  children: ReactNode;
  variant?: HeroVariant;
  image?: string;
  tone?: "blue" | "violet" | "teal" | "amber" | "rose";
  quiet?: boolean;
  className?: string;
}) {
  return <section className={`${styles.section} ${className}`} data-hero={variant}>
    <HeroBackdrop variant={variant} image={image} tone={tone} quiet={quiet}/>
    {children}
  </section>;
}
