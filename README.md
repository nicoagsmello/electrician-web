# Static Electrical Contractor Website

Generic, brand-skinnable static site modeled after the structure of Miller Electric (mecojax.com) and Puckett Electric (puckettelectric.com). No build step, no framework, no JS dependencies beyond a 30-line mobile-nav script.

## Layout

```
tools/website/
├── index.html          # Home
├── services.html       # 6 service lines, deep-linked from home/footer
├── about.html          # Story, values, stats, certifications
├── contact.html        # Form, direct lines, JSON-LD LocalBusiness
├── robots.txt
├── sitemap.xml
├── README.md
└── assets/
    ├── css/styles.css  # Single stylesheet, design tokens at top
    ├── js/main.js      # Mobile nav toggle + footer year
    └── img/            # Drop hero/og images here
```

## Local preview

Anything that serves static files works. Easiest:

```bash
cd P:/CODE/mini-me/tools/website
python -m http.server 8080
# then open http://localhost:8080
```

## Brand skinning

All visual decisions live in CSS custom properties at the top of `assets/css/styles.css`. The fastest way to rebrand:

1. **Name + logo**: search-and-replace `Voltline Electric` across the four `.html` files. Replace the inline SVG bolt favicon (look for `data:image/svg+xml,...` in each `<link rel="icon">`) with a real logo file.
2. **Colors**: edit `--color-primary`, `--color-primary-600`, `--color-primary-700`, `--color-accent`, `--color-accent-600`, and `--color-bg-dark` in `:root`. Everything else (buttons, hero, header, footer) inherits.
3. **Phone**: search for `(555) 010-0420` and `+15550100420` and replace with the real number.
4. **Address + email**: search for `123 Industrial Way`, `Anytown, ST 00000`, `info@example.com`.
5. **Domain**: search for `https://www.example.com` (canonical/OG/JSON-LD/sitemap/robots) and replace with the real domain.
6. **Form endpoint**: `contact.html` posts to a Formspree placeholder. Swap `https://formspree.io/f/REPLACE_ME` for a real endpoint, or wire up your own backend.
7. **Imagery**: the `.media` div is a CSS gradient placeholder. To use real photos, replace each `<div class="media" ...>` with `<img class="media" src="assets/img/whatever.jpg" alt="...">`.

## SEO checklist

- [x] Unique `<title>` and `<meta name="description">` per page
- [x] `<link rel="canonical">` per page
- [x] Open Graph tags on every page
- [x] Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- [x] JSON-LD `ElectricalContractor` schema on home + contact
- [x] `robots.txt` and `sitemap.xml`
- [x] `aria-current="page"` on the active nav link
- [x] Skip link for keyboard users
- [ ] Replace `og:image` placeholder with a real 1200x630 image at `assets/img/og-cover.jpg`
- [ ] Update domain in canonical URLs, OG URLs, JSON-LD, robots, sitemap

## Mobile responsiveness

- Mobile-first CSS, single breakpoint cluster (640 / 720 / 900 / 980 / 1200)
- Hamburger nav under 900px
- All grids collapse cleanly: 4-col -> 2-col -> 1-col
- Typography uses `clamp()` so headings scale fluidly
- Images use `aspect-ratio` so layout never reflows when they load

## Deployment

This is plain static HTML/CSS/JS. It runs on:

- Any S3 + CloudFront bucket
- Netlify / Vercel / Cloudflare Pages (drag-and-drop)
- A directory served by Caddy/Nginx
- GitHub Pages

No build step. The `assets/js/main.js` file is loaded with `defer` and is optional -- the site is fully usable without it (mobile users will just see the nav links collapsed under the Menu button when JS is off; that's a known minor degradation).

## Accessibility notes

- Colors meet WCAG AA contrast against the navy and the accent amber
- All interactive elements have visible focus states
- `prefers-reduced-motion` honored (animations disabled)
- Form inputs have explicit `<label>` associations
