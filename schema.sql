-- Carron Financial Health Check — submission log (D1).
-- Summary fields only: NO raw financial inputs are stored.
CREATE TABLE IF NOT EXISTS submissions (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at      TEXT    NOT NULL,      -- ISO timestamp (server-set)
  sector          TEXT,                  -- e.g. "Retail & wholesale"
  score           INTEGER,               -- 0..100
  band            TEXT,                  -- "Financially Healthy" etc.
  value_low       INTEGER,               -- indicative value range, low (ZAR)
  value_high      INTEGER,               -- indicative value range, high (ZAR)
  net_asset_value INTEGER,               -- ZAR
  ratios          TEXT,                  -- JSON: [{name,val,status,bench}]
  name            TEXT,
  email           TEXT,
  missing_count   INTEGER,               -- how many of 10 inputs were blank
  consent         INTEGER,               -- 1 = consented to store/contact
  country         TEXT                   -- Cloudflare cf.country (coarse)
);

CREATE INDEX IF NOT EXISTS idx_submissions_created ON submissions (created_at);
CREATE INDEX IF NOT EXISTS idx_submissions_email   ON submissions (email);

-- Unified completions log for ALL three tools (Health Check, 90-Day Test,
-- Find Your Fit). The Worker auto-creates this on first write; it is listed
-- here for reference. Summary fields only, stored with the user's consent.
CREATE TABLE IF NOT EXISTS leads (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT    NOT NULL,
  tool       TEXT    NOT NULL,   -- 'health-check' | '90-day-test' | 'find-your-fit'
  name       TEXT,
  email      TEXT,
  result     TEXT,               -- short headline result (score/band/tier)
  detail     TEXT,               -- JSON, tool-specific summary
  consent    INTEGER,
  country    TEXT
);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads (created_at);
CREATE INDEX IF NOT EXISTS idx_leads_tool    ON leads (tool);
CREATE INDEX IF NOT EXISTS idx_leads_email   ON leads (email);

-- Instagram/Facebook publishing state. The Worker auto-creates this on first
-- run; it is listed here for reference. Content lives in public/social/queue.json
-- (git-approved); this table records only what was actually published, so a
-- post can never go out twice.
CREATE TABLE IF NOT EXISTS social_posts (
  post_id      TEXT PRIMARY KEY,   -- matches `id` in queue.json
  status       TEXT NOT NULL,      -- 'published' | 'failed'
  ig_id        TEXT,               -- Instagram media id
  fb_id        TEXT,               -- Facebook post id
  attempts     INTEGER NOT NULL DEFAULT 0,
  error        TEXT,
  scheduled_at TEXT,
  published_at TEXT,
  updated_at   TEXT NOT NULL
);
