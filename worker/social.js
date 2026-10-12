/**
 * Carron social publishing — Instagram (Business/Creator) + Facebook Page.
 *
 * The content queue is a plain static asset in the repo: public/social/queue.json,
 * served at https://carron.co.za/social/queue.json. Approval is
 * therefore a git change: a post publishes only once `"approved": true` is
 * committed and deployed. D1 holds the *state* (what has gone out, with the
 * returned Instagram/Facebook ids) so a post can never be published twice, no
 * matter how often the cron fires.
 *
 * A Cloudflare cron trigger calls runScheduled() a few times a day; it takes at
 * most one due post per firing, publishes it to Instagram, mirrors the same
 * image(s) to the Facebook Page, and emails the owner either way.
 *
 * Secrets / vars (Cloudflare → Worker → Settings → Variables):
 *   META_PAGE_TOKEN   (secret) long-lived Facebook Page access token
 *   META_IG_USER_ID   Instagram Business account id (not the @handle)
 *   META_FB_PAGE_ID   Facebook Page id
 *   META_API_VERSION  optional, e.g. "v26.0" — bump as Meta deprecates versions
 *   SOCIAL_LIVE       must be "true" (or True/yes/1) before anything is published
 *   ADMIN_KEY         (secret) already used elsewhere; gates the admin routes
 *
 * Admin routes (all require ?key=<ADMIN_KEY>, all return JSON):
 *   GET /api/social/status           what is queued, due, published, failed
 *   GET /api/social/check            verifies the token/ids/permissions
 *   GET /api/social/run              publishes anything due now (same as cron)
 *   GET /api/social/run?dry=1        says what it would publish, posts nothing
 *   GET /api/social/run?id=<id>      publishes one post now, ignoring its schedule
 *   GET /api/social/mirror?id=<id>   re-runs only the Facebook half after a mirror failure
 */

const DEFAULT_API_VERSION = "v26.0";
const SITE = "https://carron.co.za";
const QUEUE_URL = SITE + "/social/queue.json";
const MAX_ATTEMPTS = 3; // give up on a post after this many failures
const IG_STATUS_TRIES = 12; // container processing poll (~24s worst case)

/* ------------------------------------------------------------------ routes */

export async function handleSocial(request, env, action) {
  const url = new URL(request.url);
  if (!env.ADMIN_KEY || url.searchParams.get("key") !== env.ADMIN_KEY)
    return new Response("Not found", { status: 404 });

  if (action === "status") return json(await status(env));
  if (action === "check") return json(await checkCredentials(env));
  if (action === "mirror") return json(await mirrorToFacebook(env, url.searchParams.get("id")));
  if (action === "run")
    return json(await publishDue(env, {
      dry: url.searchParams.get("dry") === "1",
      only: url.searchParams.get("id") || null,
      force: !!url.searchParams.get("id"),
    }));
  return json({ ok: false, error: "unknown action" }, 400);
}

/** Cloudflare cron entry point. Never throws — a failure must not retry-storm. */
export async function runScheduled(env) {
  try {
    const r = await publishDue(env, {});
    if (r.published.length || r.failed.length) await notify(env, r);
    return r;
  } catch (e) {
    return { ok: false, error: String((e && e.message) || e) };
  }
}

/* ------------------------------------------------------------------ the queue */

async function loadQueue(env) {
  // Served from our own static assets, so this is an internal fetch (no egress).
  const res = await env.ASSETS.fetch(new Request(QUEUE_URL));
  if (!res.ok) throw new Error("queue.json not deployed (" + res.status + ")");
  const q = await res.json();
  const posts = Array.isArray(q && q.posts) ? q.posts : [];
  return posts.filter((p) => p && p.id);
}

/** Posts that are approved, scheduled for now-or-earlier, and not yet done. */
function dueNow(posts, state, now) {
  return posts
    .filter((p) => {
      const st = state[p.id];
      if (st && (st.status === "published" || st.attempts >= MAX_ATTEMPTS)) return false;
      if (p.approved !== true) return false;
      return Date.parse(p.scheduled || "") <= now;
    })
    .sort((a, b) => Date.parse(a.scheduled) - Date.parse(b.scheduled));
}

/* ------------------------------------------------------------------ publishing */

async function publishDue(env, { dry = false, only = null, force = false }) {
  await ensureSocialPosts(env);
  const posts = await loadQueue(env);
  const state = await readState(env);
  const now = Date.now();

  let batch;
  if (only) {
    const p = posts.find((x) => x.id === only);
    if (!p) return { ok: false, error: "no queued post with id " + only };
    const st = state[p.id];
    if (st && st.status === "published" && !dry)
      return { ok: false, error: "already published", post: p.id, ig: st.ig_id, fb: st.fb_id };
    if (p.approved !== true && !force)
      return { ok: false, error: "post is not approved", post: p.id };
    batch = [p];
  } else {
    batch = dueNow(posts, state, now).slice(0, 1); // one post per firing
  }

  const live = isLive(env);
  const out = {
    ok: true, live, dry, now: new Date(now).toISOString(),
    published: [], failed: [], skipped: [],
  };

  for (const post of batch) {
    const images = (post.images || []).map(absolute);
    if (!images.length) { out.failed.push({ id: post.id, error: "no images" }); continue; }
    if (dry || !live) {
      out.skipped.push({
        id: post.id,
        reason: dry ? "dry run" : "SOCIAL_LIVE is not true",
        scheduled: post.scheduled, images,
        ig_caption: igCaption(post), fb_message: fbMessage(post),
      });
      continue;
    }
    try {
      const ig = await igPublish(env, post, images);
      let fb = null, fbError = null;
      try {
        fb = await fbPublish(env, post, images);
      } catch (e) {
        fbError = String((e && e.message) || e); // IG is already out — don't fail the post
      }
      await recordState(env, post, { status: "published", ig_id: ig, fb_id: fb, error: fbError });
      out.published.push({ id: post.id, ig_id: ig, fb_id: fb, fb_error: fbError });
    } catch (e) {
      const error = String((e && e.message) || e);
      await recordState(env, post, { status: "failed", error });
      out.failed.push({ id: post.id, error });
    }
  }
  return out;
}

/* Instagram: build a container (or one per carousel slide), wait for it to
   finish processing, then publish. Returns the published media id. */
async function igPublish(env, post, images) {
  const ig = required(env.META_IG_USER_ID, "META_IG_USER_ID");
  const caption = igCaption(post);

  let creationId;
  if (images.length > 1) {
    const children = [];
    for (const image_url of images.slice(0, 10)) {
      const c = await graph(env, ig + "/media", { image_url, is_carousel_item: "true" });
      await igWaitReady(env, c.id);
      children.push(c.id);
    }
    const c = await graph(env, ig + "/media", {
      media_type: "CAROUSEL", children: children.join(","), caption,
    });
    creationId = c.id;
  } else {
    const c = await graph(env, ig + "/media", { image_url: images[0], caption });
    creationId = c.id;
  }
  await igWaitReady(env, creationId);
  const pub = await graph(env, ig + "/media_publish", { creation_id: creationId });
  return pub.id;
}

async function igWaitReady(env, containerId) {
  for (let i = 0; i < IG_STATUS_TRIES; i++) {
    const s = await graph(env, containerId, { fields: "status_code,status" }, "GET");
    if (s.status_code === "FINISHED") return;
    if (s.status_code === "ERROR" || s.status_code === "EXPIRED")
      throw new Error("Instagram rejected the image: " + (s.status || s.status_code));
    await sleep(2000);
  }
  throw new Error("Instagram container still processing after " + IG_STATUS_TRIES * 2 + "s");
}

/* Publishing TO a Page needs the PAGE's own access token, not the user/system-user
   token that Instagram publishing uses. Posting with the wrong one fails with a
   misleading "publish_actions ... has been deprecated" (#200). So we exchange for
   the Page token first — it is derived from META_PAGE_TOKEN and needs no extra
   secret. */
async function pageAccessToken(env) {
  const page = required(env.META_FB_PAGE_ID, "META_FB_PAGE_ID");
  const r = await graph(env, page, { fields: "access_token" }, "GET");
  if (!r.access_token)
    throw new Error("no Page access token for " + page + " — check the token's user administers the Page");
  return r.access_token;
}

/* Facebook Page: one image → /photos (published immediately). Several images →
   upload each unpublished, then one feed post carrying them all. */
async function fbPublish(env, post, images) {
  const page = required(env.META_FB_PAGE_ID, "META_FB_PAGE_ID");
  const message = fbMessage(post);
  const tok = await pageAccessToken(env);

  if (images.length === 1) {
    const r = await graph(env, page + "/photos", { url: images[0], message, published: "true" }, "POST", tok);
    return r.post_id || r.id;
  }
  const params = { message, published: "true" };
  let i = 0;
  for (const url of images.slice(0, 10)) {
    const up = await graph(env, page + "/photos", { url, published: "false" }, "POST", tok);
    params["attached_media[" + i++ + "]"] = JSON.stringify({ media_fbid: up.id });
  }
  const r = await graph(env, page + "/feed", params, "POST", tok);
  return r.id;
}

/** Re-run only the Facebook half for a post Instagram already carries. Used when
    the mirror failed on its own — the post stays published, fb_id gets filled in. */
async function mirrorToFacebook(env, id) {
  if (!id) return { ok: false, error: "no id" };
  await ensureSocialPosts(env);
  const post = (await loadQueue(env)).find((p) => p.id === id);
  if (!post) return { ok: false, error: "no queued post with id " + id };
  const state = (await readState(env))[id];
  if (!state || state.status !== "published")
    return { ok: false, error: "post has not been published yet — use run" };
  if (state.fb_id) return { ok: false, error: "already on Facebook", fb_id: state.fb_id };
  if (!isLive(env)) return { ok: false, error: "SOCIAL_LIVE is not true" };
  try {
    const fb = await fbPublish(env, post, (post.images || []).map(absolute));
    await recordState(env, post, { status: "published", ig_id: state.ig_id, fb_id: fb });
    return { ok: true, id, fb_id: fb };
  } catch (e) {
    return { ok: false, id, error: String((e && e.message) || e) };
  }
}

/* ------------------------------------------------------------------ captions */

/* Instagram ignores links in captions, so IG points at the bio; Facebook gets
   the real URL. Hashtags are appended to both (IG caption limit is 2,200). */
function igCaption(post) {
  const parts = [String(post.caption || "").trim()];
  if (post.cta) parts.push(post.cta);
  // Instagram captions cannot carry a clickable link, so give a short address
  // people can actually type, and point at the one link that is clickable.
  if (post.shortUrl) parts.push(post.shortUrl + "  ·  link in bio");
  else if (post.url) parts.push("Full piece — link in bio.");
  const tags = (post.hashtags || []).join(" ");
  if (tags) parts.push(tags);
  return parts.filter(Boolean).join("\n\n").slice(0, 2200);
}

function fbMessage(post) {
  const parts = [String(post.caption || "").trim()];
  if (post.cta) parts.push(post.cta);
  if (post.url) parts.push(absolute(post.url));
  const tags = (post.hashtags || []).slice(0, 5).join(" "); // FB rewards fewer
  if (tags) parts.push(tags);
  return parts.filter(Boolean).join("\n\n");
}

/* ------------------------------------------------------------------ Graph API */

async function graph(env, path, params, method = "POST", asToken) {
  const token = asToken || required(env.META_PAGE_TOKEN, "META_PAGE_TOKEN");
  const v = env.META_API_VERSION || DEFAULT_API_VERSION;
  const base = "https://graph.facebook.com/" + v + "/" + path;
  const body = new URLSearchParams({ ...params, access_token: token });

  const res = method === "GET"
    ? await fetch(base + "?" + body.toString())
    : await fetch(base, { method: "POST", body });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.error) {
    const e = data.error || {};
    throw new Error(
      "Graph " + res.status + ": " + (e.message || "unknown") +
      (e.code ? " (code " + e.code + (e.error_subcode ? "/" + e.error_subcode : "") + ")" : "")
    );
  }
  return data;
}

/** Confirms the token, ids and permissions are usable — before the first post. */
async function checkCredentials(env) {
  const out = {
    ok: true,
    api_version: env.META_API_VERSION || DEFAULT_API_VERSION,
    live: isLive(env),
  };
  for (const name of ["META_PAGE_TOKEN", "META_IG_USER_ID", "META_FB_PAGE_ID"])
    if (!env[name]) { out.ok = false; out["missing_" + name] = true; }
  if (!out.ok) return out;

  try {
    const page = await graph(env, env.META_FB_PAGE_ID, { fields: "name,id" }, "GET");
    out.facebook_page = page.name;
  } catch (e) { out.ok = false; out.facebook_error = String(e.message || e); }
  try {
    const ig = await graph(env, env.META_IG_USER_ID, { fields: "username,name" }, "GET");
    out.instagram = "@" + ig.username;
  } catch (e) { out.ok = false; out.instagram_error = String(e.message || e); }
  try {
    await pageAccessToken(env);
    out.page_token = "derivable";
  } catch (e) { out.ok = false; out.page_token_error = String(e.message || e); }
  try {
    const me = await graph(env, "me/permissions", {}, "GET");
    const granted = (me.data || []).filter((p) => p.status === "granted").map((p) => p.permission);
    out.permissions = granted;
    // Meta's console labels the publishing permission "instagram_content_publishing"
    // while the API grants "instagram_content_publish" — accept either spelling.
    const need = [
      ["instagram_basic"],
      ["instagram_content_publish", "instagram_content_publishing"],
      ["pages_manage_posts"],
      ["pages_read_engagement"],
    ];
    out.missing_permissions = need
      .filter((names) => !names.some((n) => granted.includes(n)))
      .map((names) => names[0]);
  } catch (e) { out.permissions_error = String(e.message || e); }
  return out;
}

/* ------------------------------------------------------------------ state (D1) */

async function ensureSocialPosts(env) {
  await env.DB.prepare(
    "CREATE TABLE IF NOT EXISTS social_posts (" +
    "post_id TEXT PRIMARY KEY," +
    "status TEXT NOT NULL," + // 'published' | 'failed'
    "ig_id TEXT, fb_id TEXT," +
    "attempts INTEGER NOT NULL DEFAULT 0," +
    "error TEXT," +
    "scheduled_at TEXT, published_at TEXT, updated_at TEXT NOT NULL)"
  ).run();
}

async function readState(env) {
  const rs = await env.DB.prepare("SELECT * FROM social_posts").all().catch(() => ({ results: [] }));
  const map = {};
  for (const r of rs.results || []) map[r.post_id] = r;
  return map;
}

async function recordState(env, post, { status, ig_id = null, fb_id = null, error = null }) {
  const now = new Date().toISOString();
  await env.DB.prepare(
    "INSERT INTO social_posts (post_id,status,ig_id,fb_id,attempts,error,scheduled_at,published_at,updated_at) " +
    "VALUES (?1,?2,?3,?4,1,?5,?6,?7,?8) ON CONFLICT(post_id) DO UPDATE SET " +
    "status=?2, ig_id=COALESCE(?3,ig_id), fb_id=COALESCE(?4,fb_id), attempts=attempts+1, " +
    "error=?5, published_at=COALESCE(?7,published_at), updated_at=?8"
  ).bind(
    post.id, status, ig_id, fb_id, error, post.scheduled || null,
    status === "published" ? now : null, now
  ).run().catch(() => {});
}

async function status(env) {
  await ensureSocialPosts(env);
  const posts = await loadQueue(env);
  const state = await readState(env);
  const now = Date.now();
  return {
    ok: true,
    live: isLive(env),
    now: new Date(now).toISOString(),
    counts: {
      queued: posts.length,
      approved: posts.filter((p) => p.approved === true).length,
      awaiting_approval: posts.filter((p) => p.approved !== true).length,
      due_now: dueNow(posts, state, now).length,
      published: Object.values(state).filter((s) => s.status === "published").length,
      failed: Object.values(state).filter((s) => s.status === "failed").length,
    },
    next_up: dueNow(posts, state, now).slice(0, 3)
      .map((p) => ({ id: p.id, scheduled: p.scheduled, title: p.title })),
    upcoming: posts
      .filter((p) => !state[p.id] && Date.parse(p.scheduled || "") > now)
      .sort((a, b) => Date.parse(a.scheduled) - Date.parse(b.scheduled))
      .slice(0, 8)
      .map((p) => ({ id: p.id, scheduled: p.scheduled, title: p.title, approved: p.approved === true })),
    recent: Object.values(state)
      .sort((a, b) => String(b.updated_at).localeCompare(String(a.updated_at)))
      .slice(0, 10)
      .map((s) => ({
        id: s.post_id, status: s.status, ig_id: s.ig_id, fb_id: s.fb_id,
        error: s.error, at: s.updated_at,
      })),
  };
}

/* ------------------------------------------------------------------ notify */

async function notify(env, result) {
  if (!env.RESEND_API_KEY) return;
  const from = env.REPORTS_FROM || "Carron reports <reports@carron.co.za>";
  const to = env.REPORTS_TO || "info@carron.co.za";
  const ok = result.published.length, bad = result.failed.length;
  const subject = bad ? "Social post FAILED (" + bad + ")" : "Posted to Instagram + Facebook";
  const lines = []
    .concat(result.published.map((p) =>
      "<li>" + esc(p.id) + " — Instagram " + esc(p.ig_id || "?") +
      (p.fb_id ? ", Facebook " + esc(p.fb_id) : "") +
      (p.fb_error ? " <b>(Facebook failed: " + esc(p.fb_error) + ")</b>" : "") + "</li>"))
    .concat(result.failed.map((p) =>
      "<li><b>" + esc(p.id) + " failed:</b> " + esc(p.error) + "</li>"));
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: "Bearer " + env.RESEND_API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({
      from, to, subject,
      html: "<p>" + ok + " published, " + bad + " failed.</p><ul>" + lines.join("") + "</ul>",
    }),
  }).catch(() => {});
}

/* ------------------------------------------------------------------ helpers */

/** The publishing kill switch. Tolerant of True/TRUE/yes/1 — a capital letter
    must not silently leave the system switched off. */
function isLive(env) {
  return ["true", "1", "yes", "on"].includes(String(env.SOCIAL_LIVE || "").trim().toLowerCase());
}

function absolute(path) {
  const s = String(path || "");
  return /^https?:\/\//.test(s) ? s : SITE + (s.startsWith("/") ? s : "/" + s);
}
function required(v, name) {
  if (!v) throw new Error(name + " is not set on the Worker");
  return v;
}
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
function esc(v) {
  return String(v == null ? "" : v).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
}
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj, null, 2), {
    status,
    headers: { "content-type": "application/json" },
  });
}
