# Biztech Solutions — Static HTML/CSS Build

A complete static conversion of the Biztech Solutions website. No React, no build step — just open the files or upload to any web host.

## Files

```
static-html/
├── index.html                  # Home
├── gem-services.html           # GeM Portal Services
├── gem-training.html           # GeM Training (standalone landing)
├── certifications.html         # Certifications (with filter, search & modal)
├── software-services.html      # Software & Digital Services
├── about.html                  # About Us
├── contact.html                # Contact + Google Map
└── assets/
    ├── css/styles.css          # All styles (design tokens, layout, components)
    └── js/main.js              # Mobile menu, filters, modal, FAQ, forms
```

## How to run

**Option 1 — Open directly**
Just double-click `index.html`. Everything works locally (icons load via CDN; the map loads live from Google).

**Option 2 — Any static host**
Upload the whole `static-html/` folder to:
- Netlify / Vercel / Cloudflare Pages (drag-and-drop)
- GitHub Pages
- Any cPanel / shared hosting (`public_html`)
- Amazon S3 static-site hosting

No build step, no dependencies to install.

## What works

- **7 fully responsive pages** — mobile-first, works on phones, tablets, desktops.
- **Sticky floating WhatsApp + Call buttons** on every page.
- **Mobile hamburger menu** with slide-down navigation.
- **Certifications page**: category filter chips, live text search, click-to-open detail modal.
- **GeM Training FAQ**: click-to-expand accordion (11 questions).
- **Consultation forms** on GeM Services and Contact pages: submit opens a pre-filled WhatsApp message to +91 8770159684 (no server needed).
- **Google Maps embed** on the Contact page.
- **Local Business schema (JSON-LD)** on the Contact page for SEO.
- **Auto-updating year** in every footer.

## External dependencies (loaded from CDN)

Only two, both from public CDNs:
- Google Fonts (Outfit + Manrope)
- Lucide Icons (`https://unpkg.com/lucide@latest`)

Both are optional — the site degrades gracefully if they fail.

## Customising

- **Colors, fonts, spacing** → all defined as CSS variables at the top of `assets/css/styles.css` (`:root { ... }`).
- **Phone / WhatsApp / Email** → search & replace `8770159684` and `biztechgemservice@gmail.com` across the HTML files.
- **Logo** → replace the CDN URL in each `<img src="…">` with your own hosted logo file.
- **Testimonials / copy** → each page has plain HTML — edit directly.

## Notes

- The contact form is client-side only. If you want real email delivery, wire the form to a service like Formspree, Web3Forms, or your own backend endpoint (see `assets/js/main.js` → `data-consult-form`).
- Google Maps iframe uses a public search URL, so no API key is required.
