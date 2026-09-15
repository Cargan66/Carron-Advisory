/**
 * Carron site Worker.
 *
 * Serves the static site (the ./out export, via the ASSETS binding) and records
 * questionnaire completions to a Cloudflare D1 database:
 *   - POST /api/health-check : detailed Financial Health Check row (submissions
 *     table) PLUS a summary row in the unified `leads` table.
 *   - POST /api/lead         : a completion from any tool (90-Day Test, Find
 *     Your Fit, Health Check) into the unified `leads` table.
 *
 * Privacy: we store a SUMMARY only, with the user's consent. Raw financial
 * inputs (revenue, profit, cash, etc.) are never sent here or stored.
 */

const ALLOWED_TOOLS = ["health-check", "90-day-test", "find-your-fit"];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health-check") {
      if (request.method === "POST") return handleHealthCheck(request, env);
      return json({ ok: false, error: "method not allowed" }, 405);
    }

    if (url.pathname === "/api/lead") {
      if (request.method === "POST") return handleLead(request, env);
      return json({ ok: false, error: "method not allowed" }, 405);
    }

    // Everything else: serve the static site.
    return env.ASSETS.fetch(request);
  },
};

// Unified table for every tool completion (auto-created on first write).
async function ensureLeads(env) {
  await env.DB.prepare(
    `CREATE TABLE IF NOT EXISTS leads (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       created_at TEXT NOT NULL,
       tool       TEXT NOT NULL,   -- 'health-check' | '90-day-test' | 'find-your-fit'
       name       TEXT,
       email      TEXT,
       result     TEXT,            -- short headline result
       detail     TEXT,            -- JSON, tool-specific summary
       consent    INTEGER,
       country    TEXT
     )`
  ).run();
}

async function insertLead(env, request, fields) {
  await ensureLeads(env);
  await env.DB.prepare(
    `INSERT INTO leads (created_at, tool, name, email, result, detail, consent, country)
     VALUES (?,?,?,?,?,?,?,?)`
  )
    .bind(
      new Date().toISOString(),
      str(fields.tool, 40),
      str(fields.name, 120),
      str(fields.email, 200),
      str(fields.result, 200),
      str(fields.detail, 8000),
      fields.consent ? 1 : 0,
      (request.cf && request.cf.country) || ""
    )
    .run();
}

// Generic completion endpoint for the 90-Day Test and Find Your Fit.
async function handleLead(request, env) {
  try {
    const data = await request.json().catch(() => ({}));
    const email = str(data.email, 200);
    const tool = str(data.tool, 40);
    if (!ALLOWED_TOOLS.includes(tool)) return json({ ok: false, error: "unknown tool" }, 400);
    if (!/.+@.+\..+/.test(email)) return json({ ok: false, error: "invalid email" }, 400);
    if (!data.consent) return json({ ok: false, error: "consent required" }, 400);

    await insertLead(env, request, {
      tool,
      name: data.name,
      email,
      result: data.result,
      detail: data.detail,
      consent: data.consent,
    });
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
        new Date().toISOString(),
        str(data.sector, 80),
        int(data.score),
        str(data.band, 40),
        int(data.value_low),
        int(data.value_high),
        int(data.net_asset_value),
        str(data.ratios, 4000), // JSON string of computed ratios (no raw rands)
        str(data.name, 120),
        email,
        int(data.missing_count),
        data.consent ? 1 : 0,
        (request.cf && request.cf.country) || ""
      )
      .run();

    // Mirror a summary row into the unified leads table so all three tools'
    // completions can be seen in one place. Best-effort: never fail the request.
    try {
      await insertLead(env, request, {
        tool: "health-check",
        name: data.name,
        email,
        result: int(data.score) + "/100 — " + str(data.band, 40),
        detail: JSON.stringify({
          sector: str(data.sector, 80),
          value_low: int(data.value_low),
          value_high: int(data.value_high),
          net_asset_value: int(data.net_asset_value),
          missing_count: int(data.missing_count),
        }),
        consent: data.consent,
      });
    } catch (e) {
      /* leads mirror is non-critical */
    }

    return json({ ok: true });
  } catch (e) {
    return json({ ok: false, error: "server error" }, 500);
  }
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json" },
  });
}
function str(v, n) {
  return v == null ? "" : String(v).slice(0, n);
}
function int(v) {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : 0;
}
