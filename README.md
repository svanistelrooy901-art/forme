# FORME. — Wear Your Identity

Premium minimalist fashion e-commerce **concept presentation**.

## Demo features

- Editorial landing page and new-arrivals showcase
- Eight fictional products, MYR pricing, category filters
- Product detail, size and colour variants
- Persistent shopping bag with quantity controls
- Shipping threshold (free at RM350)
- Mock checkout form and confirmation

**No real orders or payments.** The checkout is entirely simulated; no personal information is transmitted or saved by the website.

## Preview locally

Open `index.html` in a modern browser. No package installation, server, database, or API keys are required.

## Test

Run `node tests/smoke.cjs` (Node.js 22). GitHub Actions runs the same smoke tests on pushes and pull requests.

## Optional Cloudflare deployment (not configured)

This is a static site. When ready, Cloudflare Pages can publish the repository with **no build command** and output directory `/`. Do not connect it until deployment is approved.

## Limitations

- Images are third-party Unsplash URLs and require internet access; image availability and licensing should be reviewed before commercial use.
- No backend, inventory tracking, real checkout, tax calculation, accessibility certification, or production commerce security assessment.
- Concept products and prices are fictional.
