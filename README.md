# LegalSeal - Notary & Apostille Services HTML Template

A luxury-refined, high-end HTML template tailored for notary and apostille service businesses. Features an editorial-quality layout, built-in light/dark mode, comprehensive RTL support, and a complete suite of standard pages.

## Project Structure
- `index.html` - Homepage
- `home2.html` - Alternative Homepage layout
- `about.html` - About Us
- `services.html` - Notarization Services
- `apostille.html` - Apostille processing
- `documents.html` - Accepted Documents (with category filter)
- `fees.html` - Pricing Table
- `contact.html` - Contact & Booking Form
- `blog.html` & `blog-single.html` - Blog layouts
- `login.html`, `register.html` - Authentication
- `404.html`, `coming-soon.html` - Utilities
- `assets/css/` - CSS Styles (style.css, rtl.css)
- `assets/js/` - JS logic (main.js)

## Features
- Deep Teal (#0f766e) and Warm Gold (#c9a84c) color scheme.
- Persistent Light/Dark theme via `localStorage`.
- Full RTL Support via `<html dir="rtl">` and `rtl.css`.
- WCAG 2.1 AA Compliant HTML5 structure.
- Client-side form validation.
- Responsive, CSS-grid and Flexbox layout without frameworks.
- Variable fonts: Playfair Display + DM Sans.
- Lucide Icons (CDN).

## Development Instructions
- Do not override `--color-primary` in the dark theme.
- For RTL, toggle the `dir` attribute on the `<html>` tag to see the layout automatically adapt via logical CSS properties.
