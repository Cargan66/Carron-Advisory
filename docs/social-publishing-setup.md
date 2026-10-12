# Automated Instagram + Facebook publishing — setup and running it

Carron posts to Instagram (`@carronadvisory`) and mirrors each post to the
Facebook Page (`Carron Business Advisory`, id `61594832251843`) from a content
queue in this repo. Nothing third-party is involved: the site's own Cloudflare
Worker calls Meta's Graph API on a cron trigger.

```
public/social/queue.json   content + schedule + the approval flag  (git = approval)
public/social/cards/*.jpg  the 1080×1080 images, rendered from the queue
scripts/social_cards.py    renders the cards in the brand palette
worker/social.js           publishes to Instagram, then mirrors to Facebook
D1 social_posts            what actually went out — stops any double-posting
```

**Why this shape.** Instagram has no official "schedule a post" API for third
parties, and automation tools that drive the Instagram *app* get accounts
restricted. The sanctioned route is the Instagram Graph API, which requires the
image to already be live on a public HTTPS URL. carron.co.za is already a
Cloudflare static site with a Worker and a D1 database, so it can host the
images and do the publishing itself — no Buffer/Later subscription, no third
party holding a token to the brand accounts.

---

## The ids (confirmed in Meta Business Suite, 12 Oct 2026)

| | |
|---|---|
| Business portfolio | `1455522220968718` (Carron Business Advisory) |
| Facebook Page id | `61594832251843` |
| Instagram account id | `17841410048614355` (`@carronadvisory`) |

## Part 1 — things only you can do (needs your Facebook login)

**All of this is on the laptop.** The phone is not needed.

### 1. Instagram as a Business account, linked to the Page — ALREADY DONE

Verified in Business Suite: `@carronadvisory` is a professional Instagram
account, it sits inside the Carron Business Advisory business portfolio, and its
*Connected assets* tab shows the Carron Business Advisory Facebook Page. Nothing
to do here.

> Your Page being administered from your personal Facebook profile is **normal
> and required** — every Facebook Page is owned by a personal profile. It does
> not expose your private profile to visitors and it does not block any of this.

### 2. Create a Meta app

At [developers.facebook.com/apps](https://developers.facebook.com/apps) →
**Create app**:

- Use case: **Other** → type: **Business**
- Name: `Carron Publisher` (internal only — nobody sees it)
- Add the **Instagram** product, and **Facebook Login for Business**

Leave the app in **Development mode**. While you are an admin of both the app
and the Page, you can publish to your own accounts without submitting for App
Review. (If Meta ever prompts for Advanced Access on
`instagram_content_publish`, that needs Business Verification — tell me and
we'll work through it.)

### 3. Generate a long-lived Page access token

Open the **Graph API Explorer**
([developers.facebook.com/tools/explorer](https://developers.facebook.com/tools/explorer)),
pick the `Carron Publisher` app, and add these permissions:

```
instagram_basic   instagram_content_publish   pages_show_list
pages_read_engagement   pages_manage_posts   business_management
```

Click **Generate Access Token** and approve. Then, in the Explorer's URL bar,
run these three calls in order:

```
# a) swap the 1-hour token for a 60-day one
#    (app id + secret are on your app's Settings → Basic page)
GET /oauth/access_token
      ?grant_type=fb_exchange_token
      &client_id=<APP_ID>
      &client_secret=<APP_SECRET>
      &fb_exchange_token=<THE_TOKEN_FROM_THE_EXPLORER>

# b) with the long-lived token from (a) pasted into the Explorer, get the
#    Page token — Page tokens derived this way do not expire
GET /me/accounts
```

Keep one thing from this: the **`access_token`** for the Carron Page from (b).
That is the only secret in the whole setup.

### 4. Put them on the Worker

Cloudflare dashboard → **Workers & Pages** → `carron-advisory` → **Settings** →
**Variables and Secrets**:

| Name | Type | Value |
|---|---|---|
| `META_PAGE_TOKEN` | Secret | the Page token from 3(b) |
| `META_IG_USER_ID` | Text | `17841410048614355` |
| `META_FB_PAGE_ID` | Text | `61594832251843` |
| `SOCIAL_LIVE` | Text | `false` for now — `true` when you're ready |
| `META_API_VERSION` | Text | optional; e.g. `v23.0`. Set it if Meta deprecates that version |

`ADMIN_KEY` and `RESEND_API_KEY` are already set and are reused here (admin
access, and the "it posted" / "it failed" email to info@carron.co.za).

### 5. Verify before anything goes out

```
https://carron.co.za/api/social/check?key=<ADMIN_KEY>
```

You want `facebook_page: "Carron Business Advisory"`, `instagram:
"@carronadvisory"`, and `missing_permissions: []`. Anything else and the
response says exactly what is wrong.

---

## Part 2 — how posting then works

1. **I draft a batch.** Captions and card copy go into `public/social/queue.json`,
   images render from it into `public/social/cards/`.
2. **You read them** — the queue file is plain text, or ask me to print the
   batch in chat.
3. **You approve** by setting `"approved": true` on the posts you're happy with
   (say the word and I'll flip them), then the batch is pushed:
   `git push carron main`.
4. **The cron publishes them.** It fires 05:30 and 10:00 UTC on weekdays
   (07:30 and 12:00 SAST), takes at most one post whose `scheduled` time has
   arrived, posts it to Instagram, mirrors it to the Facebook Page, records the
   result in D1 and emails you.

A post with `"approved": false` is never published, no matter how old. A post
already recorded as published in D1 can never be published again, even if the
file is re-deployed.

### Controls

| | |
|---|---|
| See the queue and recent results | `/api/social/status?key=…` |
| Check credentials | `/api/social/check?key=…` |
| See what *would* post, without posting | `/api/social/run?key=…&dry=1` |
| Post something right now | `/api/social/run?key=…&id=<post id>` |
| Stop everything immediately | set `SOCIAL_LIVE` to `false` in Cloudflare |

`SOCIAL_LIVE=false` is the kill switch: the Worker still runs and still reports
what it would have done, but publishes nothing.

### Go-live sequence

1. `check` returns clean.
2. `run?dry=1` and read the captions it reports.
3. Set `SOCIAL_LIVE=true`, then `run?id=ins-cost-cutting` to publish one post
   by hand and look at it on both platforms.
4. If it looks right, approve the rest of the batch and let the cron take over.

---

## Maintenance

- **The token.** A Page token derived from a long-lived user token does not
  expire on a timer, but it dies if you change your Facebook password, remove
  the app, or Meta forces a re-auth. The symptom is a failure email saying
  `Graph 190`. Redo step 3 and update `META_PAGE_TOKEN` — five minutes.
- **API versions.** Meta retires a Graph API version roughly every two years.
  If posts start failing with a version error, set `META_API_VERSION` to the
  current one. No code change.
- **Rate limits.** Instagram allows 50 published posts per 24 hours. We publish
  at most 2 a day.
- **Image rules.** JPEG, publicly reachable over HTTPS, under 8 MB, aspect ratio
  between 4:5 and 1.91:1. The 1080×1080 cards sit comfortably inside all of that.

## Known trade-offs

- `queue.json` is a public file, so draft captions are technically readable
  before they're posted (`/social/` is excluded from robots.txt, so it won't be
  indexed). It is marketing copy that is about to be published anyway. If that
  ever matters, the queue moves into D1 and the admin routes read it from there.
- Instagram captions can't carry a clickable link, so IG posts say "link in
  bio" and Facebook gets the real URL. **Keep the Instagram bio link pointed at
  carron.co.za** — ideally rotate it to whatever the current post references.
- Reels and Stories are not wired up. Both are possible through the same API
  (Reels need a hosted MP4); feed posts and carousels cover the plan for now.
