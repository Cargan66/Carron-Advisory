/**
 * Carron site Worker.
 *
 * Serves the static site (the ./out export, via the ASSETS binding) and adds a
 * single dynamic endpoint that records Financial Health Check submissions to a
 * Cloudflare D1 database.
 *
 * Privacy: we store a SUMMARY only — sector, score, band, indicative value
 * range, net-asset value, the computed ratios, and the lead's name/email with
 * their consent. The raw financial inputs (revenue, profit, cash, etc.) are
 * NEVER sent here or stored.
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health-check") {
      if (request.method === "POST") return handleSubmit(request, env);
      return json({ ok: false, error: "method not allowed" }, 405);
    }

    // Everything else: serve the static site.
    return env.ASSETS.fetch(request);
  },
};

async function handleSubmit(request, env) {
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
