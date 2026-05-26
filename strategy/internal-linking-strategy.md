# Internal Cross-Linking Strategy — NTH Therm GmbH Website

**Document type:** SEO & UX recommendation  
**Scope:** nth-therm Hugo static site (DE + EN, 83 content pages)  
**Date:** 2026-05-26  
**Status:** Recommendation — awaiting implementation

---

## 1. Executive Summary

The site is fully bilingual (43 DE + 40 EN pages), structurally sound, and has good topical breadth across three content pillars — **Products**, **Applications**, and **Industries**. Navigation and footer already provide global link coverage.

The core weakness is that internal linking flows overwhelmingly in **one direction**: Industries → Products, and Industries → Applications. The reverse connections are absent or thin, meaning product pages and application pages receive few internal signals despite being the highest-intent destination pages for buyers.

The recommendation is a **hub-and-spoke mesh** that adds return links back from Products to Applications and Industries, links Applications laterally to Industries, and connects Service pages into the product graph. This raises the internal PageRank of product pages, strengthens topical authority clusters around key processes, and gives visitors more clear next steps at every decision point.

Estimated page additions needed to implement: **0 new pages**. All links below are additions to existing front-matter blocks or body content in existing `.md` files.

---

## 2. Current State — What Is Already Working

| Link direction | Where implemented | Verdict |
|---|---|---|
| Home → 4 product teasers | `_index.md` (both languages) | ✓ Good |
| Nav → all main sections | `header.html` | ✓ Good |
| Footer → product / industry / application / service | `footer.html` | ✓ Good |
| Industry page → Products (sidebar) | Front matter `products[]` array | ✓ Good |
| Industry page → Applications (sidebar) | Front matter `applications[]` array | ✓ Good |
| Application page → Recommended furnaces (sidebar) | Front matter `products[]` array | ✓ Good — but links exist only as names in some, not all |
| Product page → Contact (CTA with pre-filled param) | Front matter `cta.url` | ✓ Good |
| Section index → Configurator CTA | `section-furnaces.html` layout | ✓ Good |

---

## 3. Gap Analysis — What Is Missing

### 3.1 Product pages have no outbound contextual links

Each of the 11 product pages (e.g. Kammerofen ICF, Rohrofen TH1, Durchlaufofen) links **only** to the contact form. There are no links to:
- Applications the furnace is used for
- Industries that typically buy this furnace
- Related or complementary product pages

From a search-engine perspective, product pages currently have high incoming link weight (nav, footer, industry sidebars, homepage teasers) but contribute nothing back to the topic graph.

### 3.2 Application pages do not link to Industries

The 7 application pages (Anlassen, Härten, Glühen, etc.) include a recommended-products sidebar but **no industry links**. A visitor reading about "Sintering" cannot navigate directly to "Aerospace" or "Medical Technology", even though those are primary demand sectors for that process.

### 3.3 Application pages reference products by name only — not as hyperlinks in body text

Several application pages mention specific furnace model names in body copy (e.g. "ICF-Kammerofen" in the Sintern page) without linking them. These are missed contextual links in the most relevant editorial context on the site.

### 3.4 Service pages are isolated from the product graph

The 4 service pages (Wartung, Modernisierung, Inbetriebnahme, Fernwartung) each link only to the contact form. No service page links to:
- Products that the service applies to
- Industries that commonly need the service
- Related services (e.g. commissioning → maintenance as logical continuation)

### 3.5 Industry pages do not link to Services

Industry pages link to products and applications but omit services entirely, even though industries like Automotive and Aerospace are prime candidates for maintenance contracts and refurbishment.

### 3.6 Thin single-page product categories are poorly integrated

Pyrolysis, Drymatic (heat drying), and Climatic Chambers are each a single landing page. None of them link to:
- The Applications section where their use case is closest (e.g. Drymatic → Trocknen/Drying)
- Relevant industry pages (e.g. Climatic Chambers → Automotive, Aerospace, Electronics)

### 3.7 About / Über uns page has no outbound product or service links

The "About NTH Therm" page (about-us / ueber-uns) describes the company story and partner network but links nowhere into the product or service catalogue, missing an opportunity to pass trust signals from the about page to high-value commercial pages.

### 3.8 Related-product linking is entirely absent

No product page links to any other product page. A buyer comparing IWO vs. IWF (both bogie-hearth variants) has no way to navigate between them without going back to the section index. "See also" or "similar furnaces" links between close variants would reduce bounce and signal topical depth.

---

## 4. Strategic Recommendations

### 4.1 Principle: Build a bidirectional mesh between the three content pillars

```
        Products
       ↗  ↑  ↖
      ↙   |   ↘
Applications ↔ Industries
      ↘   |   ↗
       ↘  ↓  ↙
        Services
```

Every cluster should link into every other cluster. The current structure is a one-way tree; the target is a mesh where authority circulates through the whole site.

### 4.2 Priority 1 — Add Application + Industry links to every Product page

This is the highest-impact change. Product pages are the buy-intent destination; they currently receive many links but emit none back into the topic graph.

Add to each product's front matter:
- `related_applications` — list of application pages this furnace covers
- `related_industries` — list of industry pages where it is commonly used

Render these as a "Typical Applications" and "Industries We Serve" sidebar card in `product/single.html` and `_default/product.html`. Use the existing `sidebar-card` pattern already used for the products sidebar on industry pages.

**Concrete mapping per product:**

| Product (DE slug) | Link to Applications | Link to Industries |
|---|---|---|
| herdwagenoefen-iwo | anlassen, gluehen, vorwaermen | automotive, werkzeug-maschinenbau |
| herdwagenoefen-iwf | anlassen, gluehen, vorwaermen, haerten | automotive, luft-und-raumfahrt, werkzeug-maschinenbau |
| kammeroefen-ico | anlassen, gluehen, trocknen, vorwaermen | automotive, werkzeug-maschinenbau, forschung-entwicklung |
| kammeroefen-icf | gluehen, haerten, sintern, karburieren | automotive, luft-und-raumfahrt, energie-neue-materialien, medizin-labortechnik, forschung-entwicklung |
| karburierungsoefen | karburieren, haerten | automotive, werkzeug-maschinenbau |
| haubenoefen | gluehen, sintern | luft-und-raumfahrt, energie-neue-materialien |
| abschreckoefen | haerten, karburieren | automotive, werkzeug-maschinenbau |
| multifunktionskammerofen-irf | anlassen, gluehen, sintern | forschung-entwicklung, werkzeug-maschinenbau |
| laboroefen-ibf | sintern, gluehen | medizin-labortechnik, forschung-entwicklung, elektronik-emobilitaet |
| rohroefen-th1 | sintern, gluehen | luft-und-raumfahrt, energie-neue-materialien, medizin-labortechnik, forschung-entwicklung |
| durchlaufoefen | anlassen, trocknen, vorwaermen | automotive, elektronik-emobilitaet |

Apply the same mapping in EN using the equivalent slugs.

### 4.3 Priority 2 — Add Industry links to every Application page

The 7 application pages already have a products sidebar. Add a matching "Sectors that use this process" sidebar card, linking to 2–4 industry pages.

**Concrete mapping:**

| Application | Link to Industries |
|---|---|
| Anlassen / Tempering | automotive, werkzeug-maschinenbau, elektronik-emobilitaet |
| Glühen / Annealing | luft-und-raumfahrt, werkzeug-maschinenbau, energie-neue-materialien |
| Härten / Hardening | automotive, werkzeug-maschinenbau |
| Karburieren / Carburising | automotive, werkzeug-maschinenbau |
| Sintern / Sintering | luft-und-raumfahrt, medizin-labortechnik, energie-neue-materialien, forschung-entwicklung |
| Trocknen / Drying | elektronik-emobilitaet, medizin-labortechnik |
| Vorwärmen / Preheating | automotive, luft-und-raumfahrt, werkzeug-maschinenbau |

Implementation: add `related_industries` array to the front matter of each application page. Render it in `application/single.html` sidebar (same pattern as products sidebar).

### 4.4 Priority 3 — Hyperlink product names in Application page body text

Application pages mention specific furnace models by name in body copy. Convert these bare mentions to linked text. This creates contextual editorial links, which carry stronger semantic weight than sidebar widgets.

Examples:
- Anlassen body: mentions "Kammeroefen ICO/ICF", "IWF/IWO", "Durchlauföfen" → add `<a href>` to each
- Härten body: mentions "ICF-Kammerofen", "Karburierungsöfen", "Abschrecköfen" → link each
- Sintern body: mentions "ICF-Kammerofen", "Rohröfen TH1", "Durchlauföfen" → link each

These edits live in the `.md` body text. Keep one link per mention per page (avoid linking the same target twice).

### 4.5 Priority 4 — Integrate Service pages into the product and industry graph

**Service → Products:** Each service page should list the product categories it applies to and link them. Example: "Wartung & DGUV-3" applies to all furnace types → add "Products covered" block linking to the industrial furnaces index page plus any product-specific service notes.

**Service → Related services:** After each service page CTA, add a compact "Other Services" list linking to the 3 sibling service pages. This creates a closed loop within the services section.

**Industry → Service (via sidebar):** Add a "Services for this sector" sidebar card to industry pages, linking to the 1–2 most relevant service pages per industry. Example:
- Automotive → Wartung, Modernisierung
- Luft- und Raumfahrt → Inbetriebnahme, Wartung
- Elektronik → Fernwartung, Inbetriebnahme

### 4.6 Priority 5 — Add contextual links to the three thin single-page categories

**Pyrolysis (pyrolyseoefen / pyrolysis-furnaces):**
- Add sidebar: "Industries" → energie-neue-materialien, elektronik-emobilitaet
- Add body link: mention of thermal cleaning → link Wartung/Maintenance service
- Add related category link: "Also relevant: Industrial Furnaces" → industrieoefen index

**Drymatic (trocknungssysteme / heat-drying-systems):**
- Add sidebar: "Applications" → trocknen/drying (the matching application page)
- Add sidebar: "Industries" → elektronik-emobilitaet, medizin-labortechnik
- Cross-promote: link from the `trocknen` application page to this category page (currently missing)

**Climatic Chambers (umweltsimulation / climatic-chambers):**
- Add sidebar: "Industries" → automotive, luft-und-raumfahrt, elektronik-emobilitaet, medizin-labortechnik, forschung-entwicklung
- Add footer link inside body: "See also: Heat Drying Systems" (complementary environmental testing product)

### 4.7 Priority 6 — About page contextual links

The About / Über uns page is a trust page that ranks for branded queries. Add one contextual block near the end: "Our Product Range" with links to the four main category index pages (industrial furnaces, climatic chambers, drying systems, pyrolysis). This passes authority from the trust page to the commercial pages.

### 4.8 Priority 7 — Related product links on product pages

Add a "Related furnaces" mini-list (2–3 items) at the bottom of each product page sidebar:

| Viewing this page | Suggest also |
|---|---|
| IWO (light bogie hearth) | IWF (heavy loads), Durchlaufofen |
| IWF (heavy bogie hearth) | IWO, Kammerofen ICO |
| ICO (chamber, forced air) | ICF (high temp), IWF |
| ICF (chamber, 1300 °C) | ICO, Rohrofen TH1, Karburierungsofen |
| Karburierungsofen | Abschreckofen, ICF |
| Abschreckofen | Karburierungsofen, ICF |
| IRF (multi-door) | ICF, Laborofen IBF |
| IBF (lab / table-top) | TH1, IRF |
| TH1 (tube furnace) | IBF, ICF |
| Durchlaufofen | IWO, ICO |
| Haubenofen | ICF, Glühen application |

---

## 5. Implementation Plan

### Phase 1 — Front Matter Updates (no layout changes required)

Extend front matter of product pages, application pages, and industry pages with the new `related_applications`, `related_industries`, `related_services`, and `related_products` arrays listed in Section 4.

**Files to edit (DE):** 11 product `.md` files, 7 application `.md` files, 7 industry `.md` files, 4 service `.md` files, 3 single-page category `_index.md` files = **32 files**  
**Files to edit (EN):** same 32 counterparts  
**Total:** ~64 front-matter edits

Suggested front matter schema extension (add to existing product front matter):

```yaml
related_applications:
  - name: "Anlassen"
    url: "/anwendungen/anlassen/"
  - name: "Glühen"
    url: "/anwendungen/gluehen/"

related_industries:
  - name: "Automobilindustrie"
    url: "/branchen/automotive/"
  - name: "Werkzeug- & Maschinenbau"
    url: "/branchen/werkzeug-maschinenbau/"

related_products:
  - name: "Herdwagenofen IWF"
    url: "/industrieoefen/herdwagenoefen-iwf/"
```

### Phase 2 — Layout Updates (render the new front matter)

Update the following layout templates to render the new arrays as sidebar cards:

| Layout file | Change needed |
|---|---|
| `layouts/product/single.html` | Add "Applications" and "Industries" sidebar cards; add "Related furnaces" card |
| `layouts/_default/product.html` | Same as above (duplicate layout) |
| `layouts/application/single.html` | Add "Industries" sidebar card; existing products card stays |
| `layouts/industry/single.html` | Add "Services" sidebar card |
| `layouts/service/single.html` | Add "Products" and "Other Services" blocks |
| `layouts/_default/service.html` | Same as above |

All new cards use the existing `sidebar-card` CSS class — no new styles needed.

### Phase 3 — Body text link edits

Edit the markdown body content of application pages to hyperlink bare product-name mentions. Affects approximately 7 pages per language = 14 file edits. These are surgical inline replacements, not structural changes.

### Phase 4 — Single-page category enrichment

Add sidebar content blocks to pyrolysis, drymatic, and climatic-chambers `_index.md` files (DE + EN, 6 files) and update the `landingpage/list.html` layout to render them if a `related_links` front matter array is present.

---

## 6. Link Graph — Full Mapping Reference

The table below lists every recommended new link by page type. "DE path" is the source page; the targets are listed as DE slugs. Apply equivalent EN slugs for the EN pages.

### Product → Application links (11 pages × avg 3 links = ~33 new links per language)

```
herdwagenoefen-iwo → anlassen, gluehen, vorwaermen
herdwagenoefen-iwf → anlassen, gluehen, vorwaermen, haerten
kammeroefen-ico    → anlassen, gluehen, trocknen, vorwaermen
kammeroefen-icf    → gluehen, haerten, sintern, karburieren
karburierungsoefen → karburieren, haerten
haubenoefen        → gluehen, sintern
abschreckoefen     → haerten, karburieren
multifunktionskammerofen-irf → anlassen, gluehen, sintern
laboroefen-ibf     → sintern, gluehen
rohroefen-th1      → sintern, gluehen
durchlaufoefen     → anlassen, trocknen, vorwaermen
```

### Product → Industry links (11 pages × avg 3 links = ~33 new links per language)

```
herdwagenoefen-iwo → automotive, werkzeug-maschinenbau
herdwagenoefen-iwf → automotive, luft-und-raumfahrt, werkzeug-maschinenbau
kammeroefen-ico    → automotive, werkzeug-maschinenbau, forschung-entwicklung
kammeroefen-icf    → automotive, luft-und-raumfahrt, energie-neue-materialien,
                      medizin-labortechnik, forschung-entwicklung
karburierungsoefen → automotive, werkzeug-maschinenbau
haubenoefen        → luft-und-raumfahrt, energie-neue-materialien
abschreckoefen     → automotive, werkzeug-maschinenbau
multifunktionskammerofen-irf → forschung-entwicklung, werkzeug-maschinenbau
laboroefen-ibf     → medizin-labortechnik, forschung-entwicklung, elektronik-emobilitaet
rohroefen-th1      → luft-und-raumfahrt, energie-neue-materialien,
                      medizin-labortechnik, forschung-entwicklung
durchlaufoefen     → automotive, elektronik-emobilitaet
```

### Product → Related Product links

```
herdwagenoefen-iwo → herdwagenoefen-iwf, durchlaufoefen
herdwagenoefen-iwf → herdwagenoefen-iwo, kammeroefen-ico
kammeroefen-ico    → kammeroefen-icf, herdwagenoefen-iwf
kammeroefen-icf    → kammeroefen-ico, rohroefen-th1, karburierungsoefen
karburierungsoefen → abschreckoefen, kammeroefen-icf
haubenoefen        → kammeroefen-icf, multifunktionskammerofen-irf
abschreckoefen     → karburierungsoefen, kammeroefen-icf
multifunktionskammerofen-irf → kammeroefen-icf, laboroefen-ibf
laboroefen-ibf     → rohroefen-th1, multifunktionskammerofen-irf
rohroefen-th1      → laboroefen-ibf, kammeroefen-icf
durchlaufoefen     → herdwagenoefen-iwo, kammeroefen-ico
```

### Application → Industry links (7 pages × avg 3 links = ~21 new links per language)

```
anlassen           → automotive, werkzeug-maschinenbau, elektronik-emobilitaet
gluehen            → luft-und-raumfahrt, werkzeug-maschinenbau, energie-neue-materialien
haerten            → automotive, werkzeug-maschinenbau
karburieren        → automotive, werkzeug-maschinenbau
sintern            → luft-und-raumfahrt, medizin-labortechnik,
                      energie-neue-materialien, forschung-entwicklung
trocknen           → elektronik-emobilitaet, medizin-labortechnik
vorwaermen         → automotive, luft-und-raumfahrt, werkzeug-maschinenbau
```

### Industry → Service links (7 pages × avg 2 links = ~14 new links per language)

```
automotive              → wartung, modernisierung
luft-und-raumfahrt      → inbetriebnahme, wartung
werkzeug-maschinenbau   → wartung, modernisierung
elektronik-emobilitaet  → fernwartung-ersatzteile, inbetriebnahme
medizin-labortechnik    → inbetriebnahme, wartung
energie-neue-materialien → wartung, modernisierung
forschung-entwicklung   → inbetriebnahme, fernwartung-ersatzteile
```

### Service internal cross-links (each page links to 3 sibling services)

All 4 service pages: link to the other 3 in an "Other Services" block.

### Thin category → cross-links

```
pyrolyseoefen       → energie-neue-materialien, elektronik-emobilitaet (industries)
                    → wartung (services, via body text mention)
                    → industrieoefen (related category)
trocknungssysteme   → trocknen (application)
                    → elektronik-emobilitaet, medizin-labortechnik (industries)
umweltsimulation    → automotive, luft-und-raumfahrt, elektronik-emobilitaet,
                      medizin-labortechnik, forschung-entwicklung (industries)
                    → trocknungssysteme (related category)
```

---

## 7. SEO Rationale

### Why this matters for page performance

**PageRank / Internal authority:** Search engines use internal link structure to infer which pages are important. Currently, industry and navigation pages "spend" authority on product pages, but product pages recycle none of it back. Adding return links from products into the topic graph increases the authority flowing through the whole cluster, benefiting every page.

**Topical authority:** Google's Helpful Content and E-E-A-T signals reward sites that demonstrate deep subject-matter coverage. A mesh of links between Products ↔ Applications ↔ Industries signals that NTH Therm covers industrial heat treatment comprehensively, not just as a product catalogue.

**User journey depth:** A visitor landing on "Chamber Furnace ICF" via paid or organic search currently has two choices: contact or go back. With application and industry links, they can explore the process (hardening, sintering) or their sector (aerospace, automotive), both of which reinforce intent and extend session duration — a positive engagement signal.

**Crawl efficiency:** A mesh structure means the Googlebot can reach every page within 2–3 clicks from any starting point. The current tree structure means some pages (service pages, application pages) are only reachable from nav/footer, not from contextually related content — making crawl paths fragile.

**Anchor text diversity:** The recommended links use descriptive anchor text tied to product names and process terms (e.g. "Anlassen", "Kammerofen ICF"), which reinforces keyword associations for those destination pages.

### Expected outcomes

| Metric | Expected direction | Timeframe |
|---|---|---|
| Crawl coverage of product and application pages | ↑ | 4–8 weeks post-implementation |
| Internal PageRank distribution (measured via crawl tools) | More balanced | 4–8 weeks |
| Organic impressions for process-level queries (sintering furnace, carburising furnace, etc.) | ↑ | 3–6 months |
| Average pages per session | ↑ | Immediate |
| Bounce rate on product pages | ↓ | Immediate |
| Contact form conversions | ↑ (indirectly) | 1–3 months |

---

## 8. What Not to Do

- **Do not over-link.** Each page should add no more than 6–8 new internal links from this strategy. Links are most useful when they are selective and contextually meaningful.
- **Do not duplicate links.** If the nav already links to a page, avoid adding another link to it in the sidebar on the same page — it wastes link equity and creates visual noise.
- **Do not create reciprocal pairs for SEO only.** Only add A→B and B→A if both directions are genuinely useful to a reader. The "Related furnaces" pairs above were chosen on this basis.
- **Do not add links to legal pages (Impressum / Datenschutz)** from content pages. Those pages should receive no additional internal authority.
- **Do not link the project configurator form** from every page. It already has dedicated CTAs and prominent nav placement. Over-linking it devalues its CTA role.

---

## 9. File Checklist — Implementation Tracking

Use this checklist when implementing. Check each item as complete.

### Layout changes (Phase 2)
- [ ] `layouts/product/single.html` — add related_applications sidebar card
- [ ] `layouts/product/single.html` — add related_industries sidebar card
- [ ] `layouts/product/single.html` — add related_products sidebar card
- [ ] `layouts/_default/product.html` — mirror all three cards above
- [ ] `layouts/application/single.html` — add related_industries sidebar card
- [ ] `layouts/industry/single.html` — add related_services sidebar card
- [ ] `layouts/service/single.html` — add other_services block
- [ ] `layouts/_default/service.html` — mirror other_services block
- [ ] `layouts/landingpage/list.html` — add related_links block (for thin categories)

### DE content front matter (Phase 1 + Phase 3)
- [ ] `industrieoefen/herdwagenoefen-iwo.md` — add related_applications, related_industries, related_products
- [ ] `industrieoefen/herdwagenoefen-iwf.md` — add related_applications, related_industries, related_products
- [ ] `industrieoefen/kammeroefen-ico.md` — add related_applications, related_industries, related_products
- [ ] `industrieoefen/kammeroefen-icf.md` — add related_applications, related_industries, related_products
- [ ] `industrieoefen/karburierungsoefen.md` — add related_applications, related_industries, related_products
- [ ] `industrieoefen/haubenoefen.md` — add related_applications, related_industries, related_products
- [ ] `industrieoefen/abschreckoefen.md` — add related_applications, related_industries, related_products
- [ ] `industrieoefen/multifunktionskammerofen-irf.md` — add all related arrays
- [ ] `industrieoefen/laboroefen-ibf.md` — add all related arrays
- [ ] `industrieoefen/rohroefen-th1.md` — add all related arrays
- [ ] `industrieoefen/durchlaufoefen.md` — add all related arrays
- [ ] `anwendungen/anlassen.md` — add related_industries; hyperlink product names in body
- [ ] `anwendungen/gluehen.md` — add related_industries; hyperlink product names in body
- [ ] `anwendungen/haerten.md` — add related_industries; hyperlink product names in body
- [ ] `anwendungen/karburieren.md` — add related_industries; hyperlink product names in body
- [ ] `anwendungen/sintern.md` — add related_industries; hyperlink product names in body
- [ ] `anwendungen/trocknen.md` — add related_industries; hyperlink product names in body
- [ ] `anwendungen/vorwaermen.md` — add related_industries; hyperlink product names in body
- [ ] `branchen/automotive.md` — add related_services
- [ ] `branchen/luft-und-raumfahrt.md` — add related_services
- [ ] `branchen/werkzeug-maschinenbau.md` — add related_services
- [ ] `branchen/elektronik-emobilitaet.md` — add related_services
- [ ] `branchen/medizin-labortechnik.md` — add related_services
- [ ] `branchen/energie-neue-materialien.md` — add related_services
- [ ] `branchen/forschung-entwicklung.md` — add related_services
- [ ] `services/wartung.md` — add other_services links
- [ ] `services/modernisierung.md` — add other_services links
- [ ] `services/inbetriebnahme.md` — add other_services links
- [ ] `services/fernwartung-ersatzteile.md` — add other_services links
- [ ] `pyrolyseoefen/_index.md` — add related_industries, related category link
- [ ] `trocknungssysteme/_index.md` — add related_applications, related_industries
- [ ] `umweltsimulation/_index.md` — add related_industries, related category link
- [ ] `kontakt/ueber-uns.md` — add product range link block

### EN content front matter (mirror of DE, Phase 1 + Phase 3)
- [ ] Mirror all 32 DE content edits in their EN counterparts using EN slugs

---

*End of document. Next step: begin Phase 2 layout changes, which unblock all content edits.*
