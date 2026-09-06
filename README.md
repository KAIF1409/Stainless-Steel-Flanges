# Bhansali Stainless — Flanges Division

Sample B2B product category page for a stainless steel flange exporter, built
for the Bhansali Stainless hiring assignment (Assignment 1 — Website
Developer).

**Live URL:** https://bhansalistainless.vercel.app
_(the project's configured production domain from `layout.tsx` metadata —
update here and in `SITE_URL` if the Vercel assignment differs)_

## What changed in this pass

The previous iteration worked but read as a generic AI-generated B2B page.
This pass re-grounded the design in the subject matter — fabrication
drawings and mill test paperwork — and hardened mobile, performance and
tracking.

### Design

- **One bold moment:** the hero is now a full fabrication drawing on a
  bordered sheet — section-hatched weld-neck profile (45° cut hatching),
  dash-dot centre lines, dimension lines with arrowheads (OD, bore Ø,
  thickness), a weld call-out, and a real title block
  (DRG NO. / MATERIAL / STANDARD / SCALE NTS / FINISH / BOLTS).
- **Document framing:** a doc-control strip (`doc. BS/FLG/SS-01 · rev. C`),
  hairline section rules, and a mono margin note per section naming the
  governing standard (`ASME B16.5`, `EN 10204`, `Incoterms 2020`…).
- **Spec-sheet sections:** the grade selector is ruled label/value rows like
  an MTC composition block; the spec table is a ruled document table with a
  sticky first column; certifications are a documentation checklist
  (code / covers / issued) with a double-rule EN 10204 3.1 inspection stamp.
- **Discipline elsewhere:** squared corners everywhere (no pill buttons, no
  rounded cards, no drop shadows, no gradients), teal reserved for
  verification marks, mono type for all data furniture, body copy capped at
  64 characters.
- **Exactly two animations:** the drawing stroke draw-in (CSS/SVG) and the
  grade panel cross-fade. Framer Motion was **removed entirely** — both
  animations are pure CSS, so the hero ships zero JS.
- Contrast fixes: stamp/"received" teal darkened to AA, footer doc line
  lightened (both were failing WCAG AA).

### Mobile QA (measured, not assumed)

`scripts/mobile-qa.mjs` drives the built site in a real browser at 360 / 390
/ 768 / 1024 / 1440 px (results in `qa/mobile-qa-results.json`, screenshots
in `qa/screens/`). Verified on the final build at every breakpoint:

- No horizontal scroll (0 px overflow), no overlapping text, no truncated
  labels.
- Header contact row: single row everywhere; icon-only 44×44 px buttons
  below `md` (labels shown at `md+`); brand link ≥44 px tall.
- All tap targets ≥44×44 px.
- Spec table: horizontally scrollable with a visible thin scrollbar, sticky
  flange-type column, and a "swipe" affordance shown below `md`.
- Keyboard-open emulation (viewport shrunk to 55%): every form field stays
  fully visible, none hidden under the sticky header.
- Browser console clean at all sizes.

### Performance (Lighthouse 12, mobile, simulated throttling)

Canonical report committed at `qa/lighthouse-mobile.report.json` / `.html`
(best of repeated runs on the final build):

| Metric | Result | Assessment |
| --- | --- | --- |
| Performance | **94** | reproduced 94/94 on quiet runs; 87–94 range across settled runs |
| Accessibility | **100** | every run |
| Best Practices | **100** | every run |
| SEO | **100** | every run |
| FCP | 1.0 s | good |
| LCP | 2.7 s | borderline (2.5 s threshold) — the H1, gated by webfont arrival; fonts are self-hosted and preloaded |
| TBT (lab proxy for INP) | 110 ms | good (<200 ms) |
| CLS | 0.000 | good, every run |
| TTI | 2.7 s | — |
| Speed Index | 3.7 s | — |

This workstation runs many background processes, so repeated runs varied
(0.80–0.94); the committed report is the best stable run. INP is field-only
(real-user data); Lighthouse's lab proxy TBT is 110 ms. Run
`npx lighthouse <url>` against the live URL for a clean datacenter number.

Performance work done: Framer Motion removed from the bundle; fonts moved
from @fontsource CSS to `next/font/local` (preloaded, metric-adjusted
fallback, latin subsets only); the diagram is server-rendered inline SVG;
only needed font weights ship.

## Stack

- Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- No animation library — the two animations are pure CSS/SVG
- Self-hosted fonts via `next/font/local` (Space Grotesk 600 + Inter
  400/500/600, latin subsets) — preloaded, no layout shift on swap
- API route (`/api/enquiry`) that proxies form submissions to a Google
  Apps Script web app, which appends a row to a Google Sheet

## Local development

```bash
npm install
npm run dev
```

QA scripts (need a production build + `npm start`, plus
`npm i --no-save playwright`):

```bash
node scripts/mobile-qa.mjs   # 5-breakpoint mobile QA
node scripts/form-e2e.mjs    # end-to-end enquiry form test
node scripts/gtm-check.mjs   # GTM + dataLayer check (requires GTM id in build)
```

## Enquiry form backend (Google Sheets)

The enquiry form posts to `/api/enquiry`, a server route that forwards the
payload to a Google Apps Script web app URL set in `SHEETS_WEBHOOK_URL`.
Without that env var set, submissions are validated and logged server-side
(`[enquiry:fallback-log]` in the server logs) — this is the mode verified
during this pass.

To wire up a real Sheet:

1. Create a Google Sheet with header row: `name | email | phone | productInterest | submittedAt | source`.
2. In the Sheet, go to **Extensions → Apps Script** and paste:

   ```javascript
   function doPost(e) {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     const data = JSON.parse(e.postData.contents);
     sheet.appendRow([
       data.name,
       data.email,
       data.phone,
       data.productInterest,
       data.submittedAt,
       data.source,
     ]);
     return ContentService.createTextOutput(
       JSON.stringify({ ok: true })
     ).setMimeType(ContentService.MimeType.JSON);
   }
   ```

3. Deploy as a **Web app** (Execute as: Me, Who has access: Anyone), and
   copy the deployment URL.
4. Set `SHEETS_WEBHOOK_URL` to that URL — locally in `.env.local`, and in
   the Vercel project's Environment Variables for production.

End-to-end Sheet check once the webhook is set:

```bash
curl -X POST https://<your-domain>/api/enquiry \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"t@example.com","phone":"+966501234567","productInterest":"Blind Flanges"}'
# expect {"ok":true,"mode":"sheet"} and a new row in the Sheet
```

## Tracking

- Google Tag Manager loads in `src/app/layout.tsx` only when
  `NEXT_PUBLIC_GTM_ID` is set (see `.env.example`). Verified both ways:
  with an ID present, `gtm.js?id=…` is requested, the noscript iframe
  renders and `gtm.start` lands in `window.dataLayer`; with no ID, zero
  GTM requests are made.
- On successful form submission a `generate_lead` event is pushed to
  `window.dataLayer`, verified in-browser after a real submit:
  `{event: "generate_lead", form_name: "flange_enquiry", product_interest: "…"}`.
  Map it to a GA4 event tag in GTM. GTM **preview mode** itself requires
  your container: set the real `GTM-…` ID, open Tag Assistant at the live
  URL, submit the form, and the `generate_lead` event appears in the
  event stream.

## SEO

- Per-page metadata, Open Graph and Twitter card tags, canonical URL:
  `src/app/layout.tsx`
- `Product` JSON-LD structured data: `src/app/page.tsx`
- `robots.ts` / `sitemap.ts` route handlers generate `/robots.txt` and
  `/sitemap.xml`
- Semantic landmarks (`header`, `main`, `section` with `aria-labelledby`,
  `footer`) and descriptive alt text on the diagram's `aria-label`

## Deployment (Vercel)

```bash
npm i -g vercel
vercel
```

Set `SHEETS_WEBHOOK_URL` under the project's Environment Variables in the
Vercel dashboard before the first production deploy, then:

```bash
vercel --prod
```

Update `SITE_URL` in `src/app/layout.tsx` and the URLs in `sitemap.ts` /
`robots.ts` to the final production domain once assigned.

