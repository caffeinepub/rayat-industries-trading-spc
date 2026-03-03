# RAYAT Industries Trading SPC

## Current State
Single-page React website with sections: Hero, About, Sectors (4 cards), Why Us, Contact, Footer.
- Navbar has 4 links: About, Sectors, Why Us, Contact
- Uses teal (#1a7a6e) as primary header/navbar color
- Logo image includes both the emblem AND warm sandy background baked in
- Font: Segoe UI / Helvetica Neue (generic sans-serif)
- No multi-page routing — everything is a single scrollable page

## Requested Changes (Diff)

### Add
- **Multi-page routing** (React Router or hash-based) with dedicated full pages for:
  1. **Home** — existing single-page content (Hero, About, Sectors, Why Us, Contact)
  2. **Labour & Manpower** — page covering workforce supply, recruitment, visa processing, skilled/unskilled labour categories
  3. **Services** — detailed services page: construction supplies, agriculture trading, industrial supplies, general trading, logistics
  4. **Our Portfolio** — showcase of completed projects with image grid
  5. **Our Team** — team page with leadership profiles
  6. **News & Updates** — company news/press releases page
  7. **Contact** — dedicated full contact page (extracted from home)
- **Logo watermark** — use newly generated transparent-background logo `/assets/generated/rayat-logo-transparent.dim_400x400-transparent.png` as a subtle watermark overlay in hero sections and page banners
- **Brand background color** — the warm sandy gold color from the logo image (oklch ~0.82 0.06 78, approx #c8a96e range) applied to the navbar/header panel instead of dull teal green. The teal remains for accents and section backgrounds.
- **Elite premium font** — Replace Segoe UI with Google Fonts: "Cormorant Garamond" (display/headings — ultra-elegant serif) + "Inter" (body text — clean professional). Import via @import in index.css.
- **Updated Navbar** — expanded navigation links for all new pages, active page highlighting
- **Footer** updated with all page links

### Modify
- Navbar background: change from bg-brand-teal to brand sandy-gold color derived from logo background
- All page headers/hero banners: add transparent logo as watermark (10-15% opacity, large centered behind text)
- Typography: headings use Cormorant Garamond, body uses Inter
- Sectors section cards: each links to its respective detailed page

### Remove
- Nothing removed — all existing sections preserved and enhanced

## Implementation Plan
1. Add Google Fonts import (Cormorant Garamond + Inter) to index.css and update tailwind.config.js fontFamily
2. Update CSS variables: add brand-sand-gold token for the sandy/gold navbar color
3. Update Navbar: change background to sandy-gold, expand nav links to include all 7 pages
4. Add React Router (already in project? if not use useState-based routing for hash navigation)
5. Create page components: LabourPage, ServicesPage, PortfolioPage, TeamPage, NewsPage, ContactPage
6. Update App.tsx for multi-page rendering with active page state
7. Add logo watermark to hero/banner sections of all pages
8. Update Footer with all page links
9. Generate additional images for portfolio projects, team members
