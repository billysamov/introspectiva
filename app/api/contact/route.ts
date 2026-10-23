import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { validateContact } from "../../../lib/contact.ts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16_384;
const UNAVAILABLE = "El formulario no está disponible en este momento. Escríbenos por WhatsApp para conversar sobre tu proyecto.";

function reply(status: number, payload: Record<string, unknown>, headers: Record<string, string> = {}) {
  return Response.json(payload, {
    status,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", ...headers },
  });
}

async function readBody(request: Request): Promise<unknown> {
  const length = Number(request.headers.get("content-length"));
  if (Number.isFinite(length) && length > MAX_BODY_BYTES) throw new RangeError("body_too_large");
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError("empty_body");
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new RangeError("body_too_large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const buffer = new Uint8Array(bytes);
  let offset = 0;
  for (const chunk of chunks) {
    buffer.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(buffer));
}

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const allowedOrigins = new Set([requestUrl.origin]);
  // Next may normalize a local 127.0.0.1 listener to localhost internally.
  // Only alias loopback hosts, keeping the exact scheme and port, outside Vercel.
  if (process.env.VERCEL !== "1" && ["localhost", "127.0.0.1"].includes(requestUrl.hostname)) {
    for (const hostname of ["localhost", "127.0.0.1"]) {
      const localUrl = new URL(requestUrl.origin);
      localUrl.hostname = hostname;
      allowedOrigins.add(localUrl.origin);
    }
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    try {
      allowedOrigins.add(new URL(process.env.NEXT_PUBLIC_SITE_URL).origin);
    } catch {
      return reply(503, { ok: false, message: UNAVAILABLE });
    }
  }
  // Vercel provides the deployment hostname as a trusted environment variable.
  // Do not derive extra origins from client-controlled Host/forwarded headers.
  if (process.env.VERCEL === "1" && process.env.VERCEL_URL) {
    try {
      const previewUrl = new URL(`https://${process.env.VERCEL_URL}`);
      if (previewUrl.host !== process.env.VERCEL_URL) throw new Error("invalid_deployment_host");
      allowedOrigins.add(previewUrl.origin);
    } catch {
      return reply(503, { ok: false, message: UNAVAILABLE });
    }
  }
  const origin = request.headers.get("origin");
  if (!origin || !allowedOrigins.has(origin) || request.headers.get("sec-fetch-site") === "cross-site") {
    return reply(403, { ok: false, message: "Envía tu consulta desde el formulario de nuestra web." });
  }
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return reply(415, { ok: false, message: "El formato del envío no es válido." });
  }

  let body: unknown;
  try {
    body = await readBody(request);
  } catch (error) {
    return reply(error instanceof RangeError ? 413 : 400, {
      ok: false,
      message: error instanceof RangeError ? "El mensaje es demasiado extenso." : "No pudimos leer el formulario. Inténtalo de nuevo.",
    });
  }
  const result = validateContact(body);
  if (!result.success) {
    return reply(422, { ok: false, message: "Revisa los campos indicados.", errors: result.errors });
  }

  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  const hashSecret = process.env.CONTACT_HASH_SECRET;
  if (!supabaseUrl || !secretKey || !hashSecret || hashSecret.length < 32) {
    return reply(503, { ok: false, message: UNAVAILABLE });
  }
  try {
    const parsedUrl = new URL(supabaseUrl);
    if (parsedUrl.protocol !== "https:" && !(process.env.NODE_ENV !== "production" && ["localhost", "127.0.0.1"].includes(parsedUrl.hostname))) {
      return reply(503, { ok: false, message: UNAVAILABLE });
    }
  } catch {
    return reply(503, { ok: false, message: UNAVAILABLE });
  }

  // Vercel overwrites this header. Never trust arbitrary forwarded headers outside Vercel.
  const forwardedIp = process.env.VERCEL === "1"
    ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim()
    : undefined;
  const ip = forwardedIp && isIP(forwardedIp) ? forwardedIp : null;
  if (process.env.VERCEL === "1" && !ip) {
    return reply(503, { ok: false, message: UNAVAILABLE });
  }
  const hash = (kind: string, value: string) => createHmac("sha256", hashSecret).update(`${kind}:${value}`).digest("hex");
  const data = result.data;
  const headers: Record<string, string> = { "Content-Type": "application/json", apikey: secretKey };
  // New sb_secret keys are not JWTs. Only legacy service_role JWTs use Bearer.
  if (!secretKey.startsWith("sb_secret_")) headers.Authorization = `Bearer ${secretKey}`;

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/submit_contact_request`, {
      method: "POST",
      headers,
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({
        p_name: data.name,
        p_email: data.email,
        p_company: data.company || null,
        p_service: data.service,
        p_budget: data.budget || null,
        p_message: data.message,
        p_consent: data.consent,
        p_email_hash: hash("email", data.email),
        p_ip_hash: ip ? hash("ip", ip) : null,
      }),
    });
    if (!response.ok) return reply(503, { ok: false, message: UNAVAILABLE });
    const saved: unknown = await response.json();
    if (!saved || typeof saved !== "object") return reply(503, { ok: false, message: UNAVAILABLE });
    const receipt = saved as Record<string, unknown>;
    if (receipt.status === "rate_limited") {
      const retryAfter = typeof receipt.retry_after === "number" && Number.isFinite(receipt.retry_after)
        ? Math.min(86400, Math.max(1, Math.ceil(receipt.retry_after))) : 3600;
      return reply(429, { ok: false, message: "Ya recibimos varias consultas. Espera un poco o conversemos por WhatsApp." }, { "Retry-After": String(retryAfter) });
    }
    if (receipt.status !== "accepted" || typeof receipt.id !== "string") {
      return reply(503, { ok: false, message: UNAVAILABLE });
    }
    return reply(201, { ok: true, message: "Recibimos tu proyecto. Te responderemos al correo que nos compartiste." });
  } catch {
    // Do not log contact data, API keys, raw IPs, or upstream response bodies.
    return reply(503, { ok: false, message: UNAVAILABLE });
  }
}
