"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { validateContact } from "@/lib/contact";
import type { ContactErrors, ContactInput, ContactService } from "@/lib/contact";

type FormValues = Omit<ContactInput, "consent" | "service"> & { consent: boolean; service: ContactService | "" };
type FormStatus = "idle" | "sending" | "success" | "error";

const serviceOptions: [ContactService, string][] = [
  ["landing", "Landing page"],
  ["corporativa", "Diseño y desarrollo web"],
  ["ecommerce", "Tienda online"],
  ["sistema", "Sistema a medida"],
  ["asesoria", "Identidad, experiencia o asesoría"],
];

export function ContactForm({ initialService = "", whatsappUrl }: { initialService?: ContactService | ""; whatsappUrl: string }) {
  const [values, setValues] = useState<FormValues>({
    name: "", email: "", company: "", service: initialService, budget: "", message: "", consent: false, website: "",
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const submitting = useRef(false);

  function change(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const target = event.target;
    const name = target.name as keyof FormValues;
    const value = target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.value;
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
    if (status !== "sending") {
      setStatus("idle");
      setStatusMessage("");
    }
  }

  function focusFirstError(nextErrors: ContactErrors) {
    const first = Object.keys(nextErrors).find((key) => key !== "website");
    requestAnimationFrame(() => {
      const field = first ? formRef.current?.elements.namedItem(first) : null;
      if (field instanceof HTMLElement) field.focus();
      else statusRef.current?.focus();
    });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || status === "success") return;
    const validation = validateContact(values);
    if (!validation.success) {
      setErrors(validation.errors);
      setStatus("error");
      setStatusMessage("Revisa los campos indicados para que podamos responderte.");
      focusFirstError(validation.errors);
      return;
    }

    submitting.current = true;
    setErrors({});
    setStatus("sending");
    setStatusMessage("Estamos enviando tu consulta…");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
        signal: AbortSignal.timeout(15_000),
      });
      const payload: unknown = await response.json();
      const result = payload && typeof payload === "object" ? payload as Record<string, unknown> : {};
      const message = typeof result.message === "string" ? result.message : "No pudimos confirmar el envío. Puedes intentarlo de nuevo o escribirnos por WhatsApp.";
      if (response.status === 201 && result.ok === true) {
        setStatus("success");
        setStatusMessage(message);
        requestAnimationFrame(() => statusRef.current?.focus());
        return;
      }
      const nextErrors: ContactErrors = {};
      if (result.errors && typeof result.errors === "object") {
        for (const [key, value] of Object.entries(result.errors)) {
          if (key in values && typeof value === "string") nextErrors[key as keyof ContactInput] = value;
        }
      }
      setErrors(nextErrors);
      setStatus("error");
      setStatusMessage(message);
      focusFirstError(nextErrors);
    } catch {
      setStatus("error");
      setStatusMessage("No pudimos confirmar el envío. Tus datos siguen aquí: inténtalo de nuevo o conversemos por WhatsApp.");
      requestAnimationFrame(() => statusRef.current?.focus());
    } finally {
      submitting.current = false;
    }
  }

  const error = (name: keyof ContactInput) => errors[name]
    ? <span id={`${name}-error`} className="field-error">{errors[name]}</span> : null;
  const description = (name: keyof ContactInput, hint?: string) => [hint, errors[name] ? `${name}-error` : ""].filter(Boolean).join(" ") || undefined;

  return <form ref={formRef} className="contact-form" onSubmit={submit} noValidate aria-busy={status === "sending"}>
    <div className="form-heading"><h2>Cuéntanos tu idea.</h2><p>Los campos marcados con * son obligatorios.</p></div>
    <fieldset disabled={status === "sending"} style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
      <legend className="sr-only">Datos y detalles del proyecto</legend>
      <div className="form-grid">
        <div className="field"><label htmlFor="name">Tu nombre *</label><input id="name" name="name" autoComplete="name" value={values.name} onChange={change} minLength={2} maxLength={100} required placeholder="¿Cómo te llamas?" aria-invalid={Boolean(errors.name)} aria-describedby={description("name")}/>{error("name")}</div>
        <div className="field"><label htmlFor="email">Correo electrónico *</label><input id="email" name="email" type="email" autoComplete="email" inputMode="email" value={values.email} onChange={change} maxLength={254} required placeholder="tu@correo.com" aria-invalid={Boolean(errors.email)} aria-describedby={description("email")}/>{error("email")}</div>
        <div className="field field-full"><label htmlFor="company">Marca o empresa <span>(opcional)</span></label><input id="company" name="company" autoComplete="organization" value={values.company} onChange={change} maxLength={120} placeholder="El nombre detrás de la idea" aria-invalid={Boolean(errors.company)} aria-describedby={description("company")}/>{error("company")}</div>
        <div className="field"><label htmlFor="service">¿Qué tienes en mente? *</label><select id="service" name="service" value={values.service} onChange={change} required aria-invalid={Boolean(errors.service)} aria-describedby={description("service")}><option value="">Selecciona una opción</option>{serviceOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>{error("service")}</div>
        <div className="field"><label htmlFor="budget">Inversión estimada <span>(opcional)</span></label><select id="budget" name="budget" value={values.budget} onChange={change} aria-invalid={Boolean(errors.budget)} aria-describedby={description("budget")}><option value="">Aún por definir</option><option>Menos de S/ 1,000</option><option>S/ 1,000 – S/ 3,000</option><option>S/ 3,000 – S/ 6,000</option><option>Más de S/ 6,000</option><option>Necesito orientación</option></select>{error("budget")}</div>
        <div className="field field-full"><label htmlFor="message">Háblanos de tu proyecto *</label><textarea id="message" name="message" rows={5} value={values.message} onChange={change} minLength={20} maxLength={4000} required placeholder="Qué hace tu negocio, qué quieres mejorar y qué te gustaría construir…" aria-invalid={Boolean(errors.message)} aria-describedby={description("message", "message-help")}/><div className="field-hint" id="message-help"><span>Entre 20 y 4,000 caracteres. No incluyas información sensible.</span><span>{values.message.length}/4000</span></div>{error("message")}</div>
        <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}><label htmlFor="website">Deja este campo vacío</label><input id="website" name="website" autoComplete="off" tabIndex={-1} value={values.website} onChange={change}/></div>
        <div className="field field-full"><div className="checkbox-field"><input id="consent" name="consent" type="checkbox" checked={values.consent} onChange={change} required aria-invalid={Boolean(errors.consent)} aria-describedby={description("consent")}/><label htmlFor="consent">He leído el <Link href="/privacidad" target="_blank" rel="noopener noreferrer">aviso de privacidad <span className="sr-only">(se abre en otra pestaña)</span></Link> y autorizo el uso de mis datos para responder a esta consulta. *</label></div>{error("consent")}</div>
      </div>
    </fieldset>
    <div ref={statusRef} className={`form-status ${status === "error" ? "is-error" : status === "success" ? "is-success" : ""}`} role="status" aria-live="polite" aria-atomic="true" tabIndex={-1}>
      {status === "success" && <Check size={20} aria-hidden="true"/>}{statusMessage && <p>{statusMessage}</p>}
    </div>
    <button type="submit" className="button" disabled={status === "sending" || status === "success"}>{status === "sending" ? <>Enviando… <LoaderCircle size={19} aria-hidden="true"/></> : status === "success" ? <>Consulta recibida <Check size={19} aria-hidden="true"/></> : <>Hablemos de tu proyecto <ArrowUpRight size={19} aria-hidden="true"/></>}</button>
    {(status === "error" || status === "success") && <p className="form-alternative">También podemos conversar por <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp <span className="sr-only">(se abre en otra pestaña)</span></a>.</p>}
    <p className="form-footnote">La primera conversación nos ayuda a entender tu idea. El alcance y la inversión se acuerdan en una propuesta.</p>
  </form>;
}
