export const CONTACT_SERVICES = [
  "landing",
  "corporativa",
  "ecommerce",
  "sistema",
  "asesoria",
] as const;

export type ContactService = (typeof CONTACT_SERVICES)[number];

export interface ContactInput {
  name: string;
  email: string;
  company: string;
  service: ContactService;
  budget: string;
  message: string;
  consent: true;
  website: string;
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;
export type ContactValidation =
  | { success: true; data: ContactInput }
  | { success: false; errors: ContactErrors };

/** Shared, dependency-free validation. Server validation is always authoritative. */
export function validateContact(value: unknown): ContactValidation {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { success: false, errors: { message: "Revisa los datos del formulario." } };
  }

  const input = value as Record<string, unknown>;
  const errors: ContactErrors = {};
  const text = (key: keyof ContactInput, min: number, max: number, optional = false) => {
    const raw = input[key];
    if (optional && (raw === undefined || raw === "")) return "";
    if (typeof raw !== "string") {
      errors[key] = "Completa este campo con texto válido.";
      return "";
    }
    const normalized = raw.trim();
    // Allow line breaks in the brief, but reject non-printable control characters.
    const invalidControls = key === "message" ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/ : /[\u0000-\u001F\u007F]/;
    if (invalidControls.test(normalized) || normalized.length < min || normalized.length > max) {
      errors[key] = min > 0
        ? `Escribe entre ${min} y ${max} caracteres.`
        : `Usa un máximo de ${max} caracteres.`;
    }
    return normalized;
  };

  const name = text("name", 2, 100);
  const email = text("email", 3, 254).toLowerCase();
  const company = text("company", 0, 120, true);
  const budget = text("budget", 0, 80, true);
  const message = text("message", 20, 4000);
  const website = text("website", 0, 500, true);
  const emailParts = email.split("@");
  const local = emailParts[0] ?? "";
  const domain = emailParts[1] ?? "";
  const validEmail = emailParts.length === 2 && local.length <= 64 &&
    /^[a-z0-9!#$%&'*+\-/=?^_`{|}~]+(?:\.[a-z0-9!#$%&'*+\-/=?^_`{|}~]+)*$/i.test(local) &&
    domain.includes(".") && domain.split(".").every((part) =>
      part.length <= 63 && /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(part));
  if (!validEmail) errors.email = "Escribe un correo electrónico válido.";
  if (!CONTACT_SERVICES.includes(input.service as ContactService)) {
    errors.service = "Selecciona el tipo de proyecto.";
  }
  if (input.consent !== true) {
    errors.consent = "Necesitamos tu consentimiento para responder a tu consulta.";
  }
  if (website) errors.website = "No pudimos validar el envío.";

  if (Object.keys(errors).length) return { success: false, errors };
  return {
    success: true,
    data: { name, email, company, service: input.service as ContactService, budget, message, consent: true, website },
  };
}
