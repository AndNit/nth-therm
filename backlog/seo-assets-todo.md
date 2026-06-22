# SEO / AEO / GEO — Assets & Decisions To Supply

The SEO/AEO/GEO optimization pass wired up structure with clearly-marked placeholders.
Replace the items below with real values to fully activate everything. Each entry says
**where** it lives and **why** it matters.

## 1. Social share image (og:image) — ⚠️ required for social/AI link previews
- **File:** add `static/images/og-default.jpg` (1200×630, < 1 MB, JPEG or PNG).
- **Wired in:** `hugo.toml` → `[params].ogImage = "images/og-default.jpg"`.
- **Why:** `og:image` / `twitter:image` are emitted site-wide (`layouts/_default/baseof.html`
  via `partials/social-image.html`). Product pages already use their own product photo;
  the default image is the fallback for the homepage and all non-product pages. Until the
  file exists, those pages reference a 404 image.

## 2. Social / authoritative profile URLs (schema `sameAs`)
- **Where:** `hugo.toml` → `[params].socialProfiles` (currently a placeholder LinkedIn URL).
- **Why:** emitted as Organization `sameAs` in `partials/schema.html` — a trust/disambiguation
  signal used by Google and AI engines. Add real LinkedIn, and any YouTube / Xing / industry
  directory / Wikidata profiles.

## 3. Real Formspree form ID — ⚠️ forms currently inert
- **Where:** `hugo.toml` → `[params].formspreeEndpoint` (still `…/YOUR_FORM_ID`).
- **Why:** all contact/quote forms POST here. Until set, submissions fail. The CSP in
  `netlify.toml` already allows `https://formspree.io` for `form-action`/`connect-src`.

## 4. Logo (optional vector)
- **Current:** schema/manifest/og use `static/images/nth-therm-logo.png` (exists, valid).
- **Optional:** if a clean `nth-therm-logo.svg` becomes available, swap the `logo`/`image`
  references in `partials/schema.html` and `static/site.webmanifest`.

## 5. Apple touch icon (optional, recommended)
- **Add:** `static/images/apple-touch-icon.png` (180×180) and point the
  `<link rel="apple-touch-icon">` in `baseof.html` at it (currently reuses the logo PNG).

## 6. Content-Security-Policy — validate on a deploy preview
- **Where:** `netlify.toml` `/*` and `/admin/*` header blocks.
- **Now:** `script-src`/`style-src` use `'unsafe-inline'` because JSON-LD is inline and
  templates use inline `style=""` attributes.
- **To do:** (a) confirm the contact form + Google Fonts + (consent) still work on a Netlify
  deploy preview; (b) confirm the Decap CMS at `/admin/` loads (it has its own looser CSP);
  (c) optionally tighten by moving to hashed/nonce'd inline scripts and removing
  `'unsafe-inline'` from `script-src`.

## 7. Confirm production domain in robots.txt
- **Where:** `static/robots.txt` → `Sitemap: https://nth-therm.com/sitemap.xml`.
- **Why:** hardcoded absolute URL. Verify it matches the live canonical host.

## 8. Decap CMS media folder change — inform editors
- **Changed:** `static/admin/config.yml` `media_folder` is now `assets/images` (was
  `static/images`) so uploads get responsive WebP processing; `public_folder` stays `/images`.
- **Note:** company **logos** intentionally remain in `static/images/`. New *content* image
  uploads via the CMS will land in `assets/images/` and be optimized automatically.

## 9. Nice-to-have follow-ups (not blocking)
- `static/css/animations.css` is served with the long `immutable` cache header but is **not**
  fingerprinted — edits won't bust caches for up to a year. Either fingerprint it via the
  Hugo pipeline or drop it from the `/css/*` immutable rule if it changes often.
- Consider self-hosting the Barlow fonts (removes the Google Fonts round-trip **and** the
  current behaviour where non-consenting visitors never see the brand font). This changes the
  consent story and CSP `font-src`/`style-src`, so do it deliberately.
- No on-site search exists, so the `WebSite` schema intentionally omits a `SearchAction`
  (a sitelinks searchbox). Add one only if/when a real search results URL exists.
