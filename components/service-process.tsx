"use client";

import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowDownRight, ArrowRight, FileText, MessageSquare, Plus } from "lucide-react";
import { getServiceWorkflow } from "@/lib/service-workflows";
import { useMotionSettings } from "@/components/motion";
import styles from "./service-process.module.css";

export function ServiceProcess({ slug }: { slug: string }) {
  const workflow = getServiceWorkflow(slug);
  const [selected, setSelected] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const { paused } = useMotionSettings();

  useEffect(() => {
    if (!panelRef.current || paused) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(panelRef.current, { y: 12, opacity: 0.5 }, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        clearProps: "transform,opacity",
      });
    });
    return () => media.revert();
  }, [selected, paused, slug]);

  if (!workflow) return null;
  const step = workflow.steps[selected];
  const number = String(selected + 1).padStart(2, "0");

  return (
    <section className={styles.section} aria-labelledby={`${id}-title`} id="proceso">
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}><span>/03</span> CÓMO LO HACEMOS</p>
          <h2 id={`${id}-title`}>Un proceso claro.<br/><span>Decisiones compartidas.</span></h2>
        </div>
        <p className={styles.introduction}>{workflow.introduction}</p>
      </div>

      <div className={styles.workspace}>
        <div className={styles.navigation}>
          <p className={styles.navigationLabel}>EXPLORA LAS ETAPAS <ArrowDownRight size={16} aria-hidden="true"/></p>
          <ol className={styles.steps} aria-label="Etapas del proceso de trabajo">
            {workflow.steps.map((item, index) => (
              <li key={item.label}>
                <button
                  className={`${styles.step} ${selected === index ? styles.selected : ""}`}
                  type="button"
                  data-sound="select"
                  aria-pressed={selected === index}
                  aria-controls={`${id}-panel`}
                  onClick={() => setSelected(index)}
                >
                  <span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <span>{item.label}</span>
                  <ArrowRight size={18} aria-hidden="true"/>
                </button>
              </li>
            ))}
          </ol>
          <p className={styles.navigationNote}>Avanzamos con tu feedback.<br/>Cada fase tiene un entregable concreto.</p>
        </div>

        <div className={styles.panel} id={`${id}-panel`} role="region" aria-label="Detalle de la etapa seleccionada" aria-live="polite" aria-atomic="true">
          <div className={styles.panelTop}>
            <span><i aria-hidden="true"/> PROCESO DE TRABAJO</span>
            <span>{number} <span className={styles.panelSlash}>/</span> 05</span>
          </div>
          <div ref={panelRef} className={styles.panelContent}>
            <div className={styles.stageHeading}>
              <p className={styles.stageLabel}>ETAPA {number} · {step.label}</p>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
            <div className={styles.stageDetails}>
              <div className={styles.activity}>
                <h4>Qué hacemos</h4>
                <ul>{step.activities.map((activity) => <li key={activity}><Plus size={12} aria-hidden="true"/><span>{activity}</span></li>)}</ul>
              </div>
              <div className={styles.deliverable}>
                <div className={styles.documentHeader}><FileText size={20} aria-hidden="true"/><span>EL ENTREGABLE</span><span className={styles.documentNumber}>{number}</span></div>
                <h4>{step.deliverable}</h4>
                <p>Lo que revisamos juntos</p>
                <ul>{step.review.map((item) => <li key={item}><span aria-hidden="true"/>{item}</li>)}</ul>
              </div>
            </div>
            <div className={styles.collaboration}>
              <MessageSquare size={18} aria-hidden="true"/>
              <div><h4>Tu participación</h4><p>{step.collaboration}</p></div>
            </div>
          </div>
          <div className={styles.panelBottom} aria-hidden="true">
            <span>ESTRATEGIA + DISEÑO + TECNOLOGÍA</span>
            <div>{workflow.steps.map((item, index) => <i className={selected === index ? styles.currentTick : ""} key={item.label}/>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
