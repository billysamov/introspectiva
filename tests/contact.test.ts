import assert from "node:assert/strict";
import { test } from "node:test";
import { POST } from "../app/api/contact/route.ts";
import { validateContact } from "../lib/contact.ts";

const valid = {
  name: "Ana Torres",
  email: "ana@example.com",
  company: "Estudio Norte",
  service: "corporativa",
  budget: "Por definir",
  message: "Necesitamos una web que explique nuestros servicios y permita pedir una propuesta.",
  consent: true,
  website: "",
};

function request(body: unknown = valid, headers: Record<string, string> = {}, url = "https://introspectiva.digital/api/contact") {
  return new Request(url, {
    method: "POST",
    headers: { origin: "https://introspectiva.digital", "content-type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

test("contact validation accepts Spanish names and normalizes surrounding whitespace", () => {
  const result = validateContact({ ...valid, name: "  María Núñez  ", email: "  MARIA+web@Example.COM  " });
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.name, "María Núñez");
    assert.equal(result.data.email, "maria+web@example.com");
  }
});

test("contact validation rejects malformed values, missing consent, and honeypot submissions", () => {
  for (const input of [
    null,
    [],
    { ...valid, name: "a" },
    { ...valid, name: 42 },
    { ...valid, email: "ana..x@example.com" },
    { ...valid, email: "ana@-example.com" },
    { ...valid, email: "ana@example..com" },
    { ...valid, email: "ana@example.com\r\nBcc: other@example.com" },
    { ...valid, company: "x".repeat(121) },
    { ...valid, message: "x".repeat(4001) },
    { ...valid, message: "Muy breve" },
    { ...valid, budget: { amount: 100 } },
    { ...valid, service: "unknown" },
    { ...valid, consent: "true" },
    { ...valid, consent: false },
    { ...valid, website: "https://spam.example" },
  ]) assert.equal(validateContact(input).success, false, JSON.stringify(input));
});

test("optional fields can be omitted", () => {
  const { company: _company, budget: _budget, website: _website, ...required } = valid;
  assert.equal(validateContact(required).success, true);
});

test("contact API verifies inputs, upstream acceptance, privacy, and failures", async (t) => {
  const originalFetch = globalThis.fetch;
  const envKeys = ["SUPABASE_URL", "SUPABASE_SECRET_KEY", "SUPABASE_SERVICE_ROLE_KEY", "CONTACT_HASH_SECRET", "NEXT_PUBLIC_SITE_URL", "VERCEL", "VERCEL_URL"];
  const originalEnv = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]));
  process.env.SUPABASE_URL = "https://example.supabase.co";
  process.env.SUPABASE_SECRET_KEY = "sb_secret_test_only";
  process.env.CONTACT_HASH_SECRET = "test-secret-that-is-at-least-32-characters";
  process.env.NEXT_PUBLIC_SITE_URL = "https://introspectiva.digital";
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  delete process.env.VERCEL;
  delete process.env.VERCEL_URL;

  try {
    await t.test("rejects cross-origin and missing Origin without calling the database", async () => {
      globalThis.fetch = async () => { throw new Error("Must not contact database"); };
      assert.equal((await POST(request(valid, { origin: "https://attacker.example" }))).status, 403);
      const missingOrigin = request();
      missingOrigin.headers.delete("origin");
      assert.equal((await POST(missingOrigin)).status, 403);
      assert.equal((await POST(request(valid, { "sec-fetch-site": "cross-site" }))).status, 403);
    });

    await t.test("accepts local loopback aliases only with matching protocol and port", async () => {
      globalThis.fetch = async () => Response.json({ status: "accepted", id: "local-lead" });
      assert.equal((await POST(request(valid, { origin: "http://127.0.0.1:3000" }, "http://localhost:3000/api/contact"))).status, 201);
      assert.equal((await POST(request(valid, { origin: "http://localhost:3000" }, "http://127.0.0.1:3000/api/contact"))).status, 201);
      for (const origin of ["http://127.0.0.1:3001", "https://127.0.0.1:3000", "http://attacker.example:3000", "http://127.0.0.1.attacker.example:3000"]) {
        assert.equal((await POST(request(valid, { origin }, "http://localhost:3000/api/contact"))).status, 403, origin);
      }
      assert.equal((await POST(request(valid, { origin: "http://127.0.0.1:3000" }, "http://other.example:3000/api/contact"))).status, 403);
      process.env.VERCEL = "1";
      assert.equal((await POST(request(valid, { origin: "http://127.0.0.1:3000" }, "http://localhost:3000/api/contact"))).status, 403);
      delete process.env.VERCEL;
    });

    await t.test("accepts Vercel's configured preview origin but not a spoofed Host header", async () => {
      process.env.VERCEL = "1";
      process.env.VERCEL_URL = "introspectiva-preview.vercel.app";
      globalThis.fetch = async () => Response.json({ status: "accepted", id: "preview-lead" });
      assert.equal((await POST(request(valid, {
        origin: "https://introspectiva-preview.vercel.app",
        "x-vercel-forwarded-for": "203.0.113.10",
        "sec-fetch-site": "same-origin",
      }, "http://localhost:3000/api/contact"))).status, 201);
      assert.equal((await POST(request(valid, {
        origin: "https://attacker.example", host: "attacker.example", "x-forwarded-host": "attacker.example",
      }, "http://localhost:3000/api/contact"))).status, 403);
      assert.equal((await POST(request(valid, { origin: "http://introspectiva-preview.vercel.app" }, "http://localhost:3000/api/contact"))).status, 403);
      delete process.env.VERCEL;
      // VERCEL_URL is only used when the process is actually on Vercel.
      assert.equal((await POST(request(valid, { origin: "https://introspectiva-preview.vercel.app" }, "http://localhost:3000/api/contact"))).status, 403);
      delete process.env.VERCEL_URL;
    });

    await t.test("rejects content type, malformed JSON, and oversized body before persistence", async () => {
      assert.equal((await POST(request(valid, { "content-type": "text/plain" }))).status, 415);
      assert.equal((await POST(request("{"))).status, 400);
      assert.equal((await POST(request(valid, { "content-length": "20000" }))).status, 413);
      assert.equal((await POST(request(JSON.stringify({ message: "x".repeat(17000) })))).status, 413);
      const response = await POST(request({ ...valid, consent: false }));
      assert.equal(response.status, 422);
      assert.ok((await response.json()).errors.consent);
    });

    await t.test("missing configuration never reports success", async () => {
      const key = process.env.SUPABASE_SECRET_KEY;
      delete process.env.SUPABASE_SECRET_KEY;
      const response = await POST(request());
      assert.equal(response.status, 503);
      assert.equal((await response.json()).ok, false);
      process.env.SUPABASE_SECRET_KEY = key;
    });

    await t.test("persists normalized data using a secret key and only HMAC IP identity", async () => {
      process.env.VERCEL = "1";
      let called = false;
      globalThis.fetch = async (input, init) => {
        called = true;
        assert.equal(input, "https://example.supabase.co/rest/v1/rpc/submit_contact_request");
        const headers = new Headers(init?.headers);
        assert.equal(headers.get("apikey"), "sb_secret_test_only");
        assert.equal(headers.get("authorization"), null);
        const payload = JSON.parse(String(init?.body));
        assert.equal(payload.p_email, "ana@example.com");
        assert.equal(payload.p_consent, true);
        assert.match(payload.p_email_hash, /^[a-f0-9]{64}$/);
        assert.match(payload.p_ip_hash, /^[a-f0-9]{64}$/);
        assert.ok(!String(init?.body).includes("203.0.113.10"));
        return Response.json({ status: "accepted", id: "00000000-0000-4000-a000-000000000001" });
      };
      const response = await POST(request(valid, { "x-vercel-forwarded-for": "203.0.113.10" }));
      assert.equal(response.status, 201);
      assert.equal((await response.json()).ok, true);
      assert.equal(called, true);
      delete process.env.VERCEL;
    });

    await t.test("does not trust spoofed proxy headers outside Vercel", async () => {
      globalThis.fetch = async (_input, init) => {
        assert.equal(JSON.parse(String(init?.body)).p_ip_hash, null);
        return Response.json({ status: "accepted", id: "lead-id" });
      };
      assert.equal((await POST(request(valid, { "x-forwarded-for": "203.0.113.10", "x-vercel-forwarded-for": "203.0.113.10" }))).status, 201);
    });

    await t.test("fails closed if trusted Vercel IP is missing", async () => {
      process.env.VERCEL = "1";
      assert.equal((await POST(request())).status, 503);
      delete process.env.VERCEL;
    });

    await t.test("maps the database rate limit to 429 with Retry-After", async () => {
      globalThis.fetch = async () => Response.json({ status: "rate_limited", retry_after: 120 });
      const response = await POST(request());
      assert.equal(response.status, 429);
      assert.equal(response.headers.get("retry-after"), "120");
      assert.equal((await response.json()).ok, false);
    });

    await t.test("network errors, rejected writes, and malformed receipts never report success", async () => {
      for (const fetcher of [
        async () => { throw new Error("Database unavailable"); },
        async () => new Response("private diagnostic", { status: 500 }),
        async () => Response.json({}),
        async () => Response.json({ status: "accepted" }),
      ]) {
        globalThis.fetch = fetcher;
        const response = await POST(request());
        assert.equal(response.status, 503);
        assert.equal((await response.json()).ok, false);
      }
    });
  } finally {
    globalThis.fetch = originalFetch;
    for (const key of envKeys) {
      if (originalEnv[key] === undefined) delete process.env[key];
      else process.env[key] = originalEnv[key];
    }
  }
});
