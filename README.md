# NTH Therm – Hugo Static Site

Vollständig migrierte Website für nth-therm.com als Hugo-Projekt.  
Stack: Hugo (SSG) · Decap CMS · Formspree · Netlify.

---

## Projektstruktur

```
nth-therm/
├── hugo.toml              # Site-Konfiguration + Mehrsprachigkeit (DE/EN)
├── netlify.toml           # Netlify Deployment + Redirects + Security Headers
├── i18n/
│   ├── de.toml            # Deutsche UI-Strings
│   └── en.toml            # English UI strings
├── content/
│   ├── de/                # Deutsches Content
│   │   ├── _index.md      # Startseite
│   │   ├── industrieoefen/ (11 Produktseiten + Ofenprojekt)
│   │   ├── umweltsimulation/
│   │   ├── trocknungssysteme/ (Drymatic II)
│   │   ├── pyrolyseoefen/
│   │   ├── services/ (Wartung, Modernisierung)
│   │   ├── kontakt/ (Kontakt, Über uns)
│   │   ├── impressum.md
│   │   └── datenschutz.md
│   └── en/                # English content (vollständige Spiegelung)
│       ├── _index.md
│       ├── industrial-furnaces/ (11 product pages)
│       ├── climatic-chambers/
│       ├── heat-drying-systems/
│       ├── pyrolysis-furnaces/
│       ├── services/
│       ├── contact/
│       ├── imprint.md
│       └── privacy.md
├── layouts/
│   ├── _default/          # baseof.html, single.html, list.html
│   ├── partials/          # header, footer, schema, cookie-banner, contact-form
│   ├── home/              # list.html (Startseite)
│   ├── product/           # single.html (Produktseiten)
│   ├── service/           # single.html (Serviceseiten)
│   ├── contact/           # single.html (Kontaktseite + Formspree)
│   ├── about/             # single.html
│   ├── project-form/      # single.html (Ofenprojekt-Konfigurator)
│   └── legal/             # single.html (Impressum, Datenschutz)
├── static/
│   ├── css/               # main.css + animations.css
│   ├── js/                # main.js
│   ├── favicon.svg
│   └── admin/
│       ├── index.html     # Decap CMS Entry
│       └── config.yml     # CMS Collections-Konfiguration
└── i18n/
    ├── de.toml
    └── en.toml
```

---

## Lokales Setup

### Voraussetzungen
- Hugo **≥ 0.120.0** (Extended Version): https://gohugo.io/installation/
- Git
- Node.js (optional, nur für npm-basierte Build-Pipelines)

### Installation

```bash
# Repository klonen oder ZIP entpacken
cd nth-therm

# Hugo-Server starten (mit Live Reload)
hugo server -D

# → http://localhost:1313
```

### Production Build

```bash
hugo --minify
# Output: ./public/
```

---

## Deployment auf Netlify

1. Repository auf GitHub/GitLab pushen
2. Netlify → "New site from Git" → Repository auswählen
3. Build command: `hugo --minify`
4. Publish directory: `public`
5. Environment variable setzen: `HUGO_VERSION = 0.126.0`
6. **Netlify Identity aktivieren** (für Decap CMS)
7. **Git Gateway aktivieren** (Netlify Settings → Identity → Services)

### Decap CMS aktivieren

Nach dem Deployment:
1. `https://nth-therm.com/admin/` aufrufen
2. Mit Netlify Identity einloggen
3. Ersten Admin-User einladen unter Netlify → Identity → Invite users

---

## Formspree einrichten

1. Account auf https://formspree.io erstellen
2. Neues Formular anlegen
3. Form-ID kopieren (z.B. `xnqkjrvz`)
4. In `hugo.toml` ersetzen:
   ```toml
   formspreeEndpoint = "https://formspree.io/f/xnqkjrvz"
   ```

---

## Bilder einfügen

Bilder in `static/images/` ablegen. In Markdown referenzieren:
```markdown
![Alt Text](/images/herdwagenofen-iwo.jpg)
```

Empfohlene Bildgrößen:
- Produktbilder: **1200 × 750 px** (16:10, WebP preferred)
- Hero-Hintergrund: **1920 × 1080 px**
- Logo: **SVG** bevorzugt

---

## SEO-Checkliste nach Launch

- [ ] Google Search Console verifizieren
- [ ] Sitemap einreichen: `https://nth-therm.com/sitemap.xml`
- [ ] hreflang-Tags validieren: https://technicalseo.com/tools/hreflang/
- [ ] Schema validieren: https://validator.schema.org/
- [ ] Core Web Vitals prüfen: https://pagespeed.web.dev/
- [ ] Formspree-Test-Submission durchführen
- [ ] Cookie-Banner testen (DE + EN)
- [ ] 301-Redirects von alten Joomla-URLs testen
- [ ] Impressum und Datenschutzerklärung auf Aktualität prüfen

---

## Behobene Audit-Probleme

| Problem (Joomla-Alt-Site) | Lösung (Hugo-Migration) |
|---------------------------|------------------------|
| Identische Meta-Descriptions auf allen Seiten | Jede Seite hat individuelle `description` im Front Matter |
| Keine hreflang-Tags | Automatisch via `baseof.html` |
| Kein Schema-Markup | Organization, Product, FAQ, HowTo, BreadcrumbList |
| Kein Open Graph | Vollständig in `baseof.html` |
| EN-URLs mit deutschen Slugs | Saubere EN-Slugs (`/en/industrial-furnaces/`) |
| Privacy Shield-Verweis (ungültig seit 2020) | Aktualisiert auf EU-SCC + EU-US DPF |
| Copyright "© 2021" | Dynamisch via `{{ now.Year }}` |
| Schreibfehler "PC-Softwaree" | Korrigiert |
| "made in Europe" vs "made in Germany" | Konsistent "Made in Germany" |
| Kein Cookie-Banner | Implementiert mit Consent-Management |
| Kein CMS für Redaktion | Decap CMS (Git-basiert, kein Server) |

---

## Technologiepartner (Referenzen in Content)

| Partner | Produkte | URL |
|---------|----------|-----|
| Angelantoni Test Technologies / ACS | Klimaprüfkammern | acstestchambers.com |
| Pyrox bv (NL, gegr. 2012) | Pyrolyseöfen | pyroxovens.de |
| Drymatic / Restore Solutions AU | Trocknungssysteme | restoresolutions.com.au |
| Evocon | OEE-Software | evocon.com |
| Herkules-Resotec | Automatisierung | herkules-resotec.de |

---

© 2025 NTH Therm GmbH · Lerchenweg 11 · 76761 Rülzheim
