/**
 * Carron site Worker.
 *
 * Serves the static site (the ./out export, via the ASSETS binding) and provides:
 *   - POST /api/health-check : detailed Health Check row + unified leads row.
 *   - POST /api/lead         : a completion from any free tool → unified leads.
 *   - The R795 "Financial Priorities Diagnostic" paid flow (Paystack):
 *       POST /api/diagnostic/create   → create a pending order, return a checkout URL
 *       GET  /api/diagnostic/get      → the generated report, once the order is paid
 *       POST /api/diagnostic/webhook  → Paystack payment notification (signed)
 *       GET  /api/diagnostic/testpay  → dev-only bypass (active ONLY until PAYSTACK_SECRET is set)
 *
 * Payment/generation happen server-side (the paywall). The diagnostic engine
 * lives in ./diagnostic.js. Raw financial inputs are never stored — only the
 * computed summary the browser sends.
 */

import { generateDiagnostic, renderDiagnosticHTML } from "./diagnostic.js";

const ALLOWED_TOOLS = ["health-check", "90-day-test", "find-your-fit"];
const WEB3FORMS_KEY = "dc0870f4-27e1-4787-8fb0-ab76fdcc861f";
const DIAG_AMOUNT = 79500; // R795.00 in ZAR cents (Paystack subunit)
const DIAG_CURRENCY = "ZAR";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const p = url.pathname;

    if (p === "/api/health-check")
      return request.method === "POST" ? handleHealthCheck(request, env) : methodNotAllowed();
    if (p === "/api/lead")
      return request.method === "POST" ? handleLead(request, env) : methodNotAllowed();

    if (p === "/api/diagnostic/create")
      return request.method === "POST" ? diagCreate(request, env) : methodNotAllowed();
    if (p === "/api/diagnostic/get")
      return request.method === "GET" ? diagGet(request, env) : methodNotAllowed();
    if (p === "/api/diagnostic/webhook")
      return request.method === "POST" ? diagWebhook(request, env) : methodNotAllowed();
    if (p === "/api/diagnostic/testpay")
      return request.method === "GET" ? diagTestPay(request, env) : methodNotAllowed();

    // Everything else: serve the static site.
    return env.ASSETS.fetch(request);
  },
};

/* ---------------------------------------------------------------- leads / health check */

async function ensureLeads(env) {
  await env.DB.prepare(
    `CREATE TABLE IF NOT EXISTS leads (
       id INTEGER PRIMARY KEY AUTOINCREMENT, created_at TEXT NOT NULL, tool TEXT NOT NULL,
       name TEXT, email TEXT, result TEXT, detail TEXT, consent INTEGER, country TEXT )`
  ).run();
}

async function insertLead(env, request, f) {
  await ensureLeads(env);
  await env.DB.prepare(
    `INSERT INTO leads (created_at, tool, name, email, result, detail, consent, country)
     VALUES (?,?,?,?,?,?,?,?)`
  )
    .bind(
      new Date().toISOString(), str(f.tool, 40), str(f.name, 120), str(f.email, 200),
      str(f.result, 200), str(f.detail, 8000), f.consent ? 1 : 0, (request.cf && request.cf.country) || ""
    )
    .run();
}

async function handleLead(request, env) {
  try {
    const data = await request.json().catch(() => ({}));
    const email = str(data.email, 200), tool = str(data.tool, 40);
    if (!ALLOWED_TOOLS.includes(tool)) return json({ ok: false, error: "unknown tool" }, 400);
    if (!/.+@.+\..+/.test(email)) return json({ ok: false, error: "invalid email" }, 400);
    if (!data.consent) return json({ ok: false, error: "consent required" }, 400);
    await insertLead(env, request, { tool, name: data.name, email, result: data.result, detail: data.detail, consent: data.consent });
    return json({ ok: true });
  } catch (e) {
    return json({ ok: false, error: "server error" }, 500);
  }
}

async function handleHealthCheck(request, env) {
  try {
    const data = await request.json().catch(() => ({}));
    const email = str(data.email, 200);
    if (!/.+@.+\..+/.test(email)) return json({ ok: false, error: "invalid email" }, 400);
    if (!data.consent) return json({ ok: false, error: "consent required" }, 400);

    await env.DB.prepare(
      `INSERT INTO submissions
        (created_at, sector, score, band, value_low, value_high, net_asset_value,
         ratios, name, email, missing_count, consent, country)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`
    )
      .bind(
        new Date().toISOString(), str(data.sector, 80), int(data.score), str(data.band, 40),
        int(data.value_low), int(data.value_high), int(data.net_asset_value), str(data.ratios, 4000),
        str(data.name, 120), email, int(data.missing_count), data.consent ? 1 : 0,
        (request.cf && request.cf.country) || ""
      )
      .run();

    try {
      await insertLead(env, request, {
        tool: "health-check", name: data.name, email,
        result: int(data.score) + "/100 — " + str(data.band, 40),
        detail: JSON.stringify({
          sector: str(data.sector, 80), value_low: int(data.value_low),
          value_high: int(data.value_high), net_asset_value: int(data.net_asset_value),
          missing_count: int(data.missing_count),
        }),
        consent: data.consent,
      });
    } catch (e) { /* leads mirror is non-critical */ }

    return json({ ok: true });
  } catch (e) {
    return json({ ok: false, error: "server error" }, 500);
  }
}

/* ---------------------------------------------------------------- R795 diagnostic (paid) */

async function ensureOrders(env) {
  await env.DB.prepare(
    `CREATE TABLE IF NOT EXISTS orders (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       reference TEXT UNIQUE NOT NULL,
       created_at TEXT NOT NULL,
       email TEXT,
       amount INTEGER,
       status TEXT NOT NULL,      -- 'pending' | 'paid'
       paid_at TEXT,
       data TEXT,                 -- JSON: the Health Check summary (for generation)
       report TEXT,               -- JSON: { report, html, meta } once paid
       country TEXT )`
  ).run();
}

// POST /api/diagnostic/create  { email, summary } → { reference, authorization_url }
async function diagCreate(request, env) {
  try {
    await ensureOrders(env);
    const body = await request.json().catch(() => ({}));
    const email = str(body.email, 200);
    const summary = body.summary;
    if (!/.+@.+\..+/.test(email)) return json({ ok: false, error: "invalid email" }, 400);
    if (!summary || !Array.isArray(summary.ratios) || summary.ratios.length < 3)
      return json({ ok: false, error: "run the health check first" }, 400);

    const reference = "cba_" + crypto.randomUUID().replace(/-/g, "");
    const origin = new URL(request.url).origin;

    await env.DB.prepare(
      `INSERT INTO orders (reference, created_at, email, amount, status, data, country)
       VALUES (?,?,?,?,?,?,?)`
    )
      .bind(reference, new Date().toISOString(), email, DIAG_AMOUNT, "pending",
        JSON.stringify(summary), (request.cf && request.cf.country) || "")
      .run();

    if (env.PAYSTACK_SECRET) {
      const data = await paystackInit(env, {
        email, amount: DIAG_AMOUNT, reference,
        callback_url: origin + "/diagnostic-result/",
      });
      return json({ ok: true, reference, authorization_url: data.authorization_url });
    }
    // Bypass mode (no Paystack configured yet): a local "pay" link for testing the flow.
    return json({
      ok: true, reference,
      authorization_url: origin + "/api/diagnostic/testpay?reference=" + reference,
      test: true,
    });
  } catch (e) {
    return json({ ok: false, error: "server error" }, 500);
  }
}

// GET /api/diagnostic/get?reference=… → { status, report, html, meta }
async function diagGet(request, env) {
  try {
    await ensureOrders(env);
    const reference = new URL(request.url).searchParams.get("reference") || "";
    if (!reference) return json({ status: "unknown" }, 400);
    let order = await getOrder(env, reference);
    if (!order) return json({ status: "unknown" }, 404);

    if (order.status !== "paid" && env.PAYSTACK_SECRET) {
      // Webhook may lag — verify directly with Paystack on read.
      if (await paystackVerify(env, reference)) {
        await fulfil(env, order);
        order = await getOrder(env, reference);
      }
    }
    if (order.status === "paid" && order.report) {
      const stored = JSON.parse(order.report);
      return json({ status: "paid", ...stored });
    }
    return json({ status: "pending" });
  } catch (e) {
    return json({ status: "error" }, 500);
  }
}

// POST /api/diagnostic/webhook  (Paystack, signed)
async function diagWebhook(request, env) {
  const raw = await request.text();
  if (!env.PAYSTACK_SECRET) return json({ ok: true }); // nothing to verify against yet
  const sig = request.headers.get("x-paystack-signature") || "";
  if (!(await verifySignature(env, raw, sig))) return json({ ok: false }, 401);
  try {
    const event = JSON.parse(raw);
    if (event.event === "charge.success" && event.data && event.data.reference) {
      const order = await getOrder(env, event.data.reference);
      if (order && order.status !== "paid") await fulfil(env, order);
    }
  } catch (e) { /* ignore malformed */ }
  return json({ ok: true });
}

// GET /api/diagnostic/testpay?reference=…  — DEV ONLY. Disabled once PAYSTACK_SECRET is set.
async function diagTestPay(request, env) {
  if (env.PAYSTACK_SECRET) return new Response("Not found", { status: 404 });
  await ensureOrders(env);
  const reference = new URL(request.url).searchParams.get("reference") || "";
  const order = await getOrder(env, reference);
  if (order && order.status !== "paid") await fulfil(env, order);
  return Response.redirect(new URL(request.url).origin + "/diagnostic-result/?reference=" + reference, 302);
}

async function getOrder(env, reference) {
  return env.DB.prepare("SELECT * FROM orders WHERE reference = ?").bind(reference).first();
}

// Generate the report, store it, mark paid, notify the owner.
async function fulfil(env, order) {
  const summary = JSON.parse(order.data || "{}");
  const report = generateDiagnostic(summary);
  const meta = {
    date: new Date().toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" }),
    name: order.email || "",
  };
  const html = renderDiagnosticHTML(report, meta);
  await env.DB.prepare("UPDATE orders SET status=?, paid_at=?, report=? WHERE reference=?")
    .bind("paid", new Date().toISOString(), JSON.stringify({ report, html, meta }), order.reference)
    .run();

  // Best-effort owner notification (a sale happened).
  try {
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: "R795 Diagnostic purchased — " + (order.email || ""),
        from_name: "Carron Diagnostic",
        email: order.email, sector: summary.sectorLabel, score: report.score + "/100",
        reference: order.reference, submitted: new Date().toISOString(),
      }),
    });
  } catch (e) { /* non-critical */ }

  // Record in the unified leads table too.
  try {
    await insertLeadRaw(env, {
      tool: "r795-diagnostic", email: order.email,
      result: report.score + "/100 — " + report.band,
      detail: JSON.stringify({ sector: summary.sectorLabel, reference: order.reference }),
      consent: 1, country: order.country || "",
    });
  } catch (e) { /* non-critical */ }
}

async function insertLeadRaw(env, f) {
  await ensureLeads(env);
  await env.DB.prepare(
    `INSERT INTO leads (created_at, tool, name, email, result, detail, consent, country)
     VALUES (?,?,?,?,?,?,?,?)`
  )
    .bind(new Date().toISOString(), str(f.tool, 40), "", str(f.email, 200),
      str(f.result, 200), str(f.detail, 8000), f.consent ? 1 : 0, str(f.country, 8))
    .run();
}

/* ---------------------------------------------------------------- Paystack helpers */

async function paystackInit(env, { email, amount, reference, callback_url }) {
  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: { Authorization: "Bearer " + env.PAYSTACK_SECRET, "Content-Type": "application/json" },
    body: JSON.stringify({ email, amount, currency: DIAG_CURRENCY, reference, callback_url }),
  });
  const j = await res.json();
  if (!j.status) throw new Error("paystack init failed");
  return j.data; // { authorization_url, access_code, reference }
}

async function paystackVerify(env, reference) {
  const res = await fetch(
    "https://api.paystack.co/transaction/verify/" + encodeURIComponent(reference),
    { headers: { Authorization: "Bearer " + env.PAYSTACK_SECRET } }
  );
  const j = await res.json().catch(() => ({}));
  return !!(j.status && j.data && j.data.status === "success");
}

async function verifySignature(env, rawBody, signatureHex) {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(env.PAYSTACK_SECRET),
    { name: "HMAC", hash: "SHA-512" }, false, ["sign"]
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(rawBody));
  const hex = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return hex === signatureHex;
}

/* ---------------------------------------------------------------- utils */

function methodNotAllowed() {
  return json({ ok: false, error: "method not allowed" }, 405);
}
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json" } });
}
function str(v, n) {
  return v == null ? "" : String(v).slice(0, n);
}
function int(v) {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : 0;
}
