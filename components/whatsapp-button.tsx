import { whatsappUrl } from "@/lib/contact-channels";
import styles from "./whatsapp-button.module.css";

export function WhatsAppButton() {
  return <a className={styles.button} href={whatsappUrl} target="_blank" rel="noopener noreferrer" data-sound="contact" aria-label="Escribir a Introspectiva por WhatsApp (se abre en otra pestaña)">
    <svg viewBox="0 0 32 32" aria-hidden="true" fill="none">
      <path d="M27 15.6a11 11 0 0 1-16.4 9.6L5 27l1.8-5.4A11 11 0 1 1 27 15.6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="m12 9.6 1.8 3.7-1.2 1.4a9.3 9.3 0 0 0 4.8 4.5l1.3-1.6 3.6 1.7c-.3 2-1.6 3-3.3 2.6-5.9-1.3-9.1-4.6-10.2-9.5-.3-1.5 1.2-2.8 3.2-2.8Z" fill="currentColor"/>
    </svg>
    <span>Hablemos por<strong>WhatsApp</strong></span>
    <span className={styles.arrow} aria-hidden="true">↗</span>
  </a>;
}
