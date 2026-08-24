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
