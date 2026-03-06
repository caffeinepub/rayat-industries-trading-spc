# RAYAT Industries

## Current State
Full multi-page React website for RAYAT Industries. The hero section features a large "RAYAT" text using Cinzel font with transparent fill, gold WebkitTextStroke, and heavy white glow drop-shadow filters making it look very modern/outlined. Trading divisions include Solar, FMCG, Networking, Construction Materials, Safety & PPE — no Tyres & Adhesives division. Portfolio and Services pages have no tyres/adhesives content.

## Requested Changes (Diff)

### Add
- New trading division: **Tyres & Adhesives** — full page with products (automotive tyres, truck tyres, off-road/industrial tyres, adhesives, sealants, specialty bonding products)
- Tyres & Adhesives entry in the Trading Divisions overview page
- Tyres & Adhesives entry in the navbar Trading dropdown
- 2 portfolio projects for Tyres & Adhesives
- 1 upcoming project for Tyres & Adhesives
- Tyres & Adhesives service card on the Services page
- Tyres & Adhesives sector card on the home page sectors grid
- Generated image for Tyres & Adhesives hero/section
- "tyres-adhesives" page type

### Modify
- **RAYAT hero text**: Remove the outlined/transparent fill treatment. Replace with a solid, warm-white or rich cream text in **Playfair Display** (already loaded) — bold, elegant, classic serif. No WebkitTextStroke, no transparent color. Keep size and position. Use a strong but natural drop-shadow for readability over the video background. The "industries" subtext below RAYAT should also update to match (same font family, muted gold color, clean).
- Trading overview page: add Tyres & Adhesives card
- Navbar Trading dropdown: add Tyres & Adhesives link
- Mobile navbar: add Tyres & Adhesives link
- Footer quick links: add Tyres & Adhesives
- PortfolioFilter type: add "Tyres" filter
- sectorColors: add Tyres entry
- Portfolio filter tabs: add "Tyres" tab
- Upcoming projects: add 1 tyres/adhesives entry

### Remove
- Nothing removed

## Implementation Plan
1. Generate image for Tyres & Adhesives division hero
2. Update RAYAT hero text styling in HeroSection — change font to Playfair Display, solid cream/white fill, remove stroke/transparent treatment, use natural text-shadow
3. Update "industries" subtext styling to match (Playfair Display, gold, no stroke)
4. Add `"tyres-adhesives"` to the `Page` type
5. Add TyresAdhesivesDivisionPage component (full page like SolarDivisionPage)
6. Add Tyres & Adhesives to tradingSubLinks in Navbar
7. Add Tyres & Adhesives to TradingDivisionsPage divisions list
8. Add Tyres & Adhesives service to services array
9. Add Tyres & Adhesives sector to getSectors()
10. Add 2 portfolio projects + 1 upcoming project
11. Add PortfolioFilter "Tyres", sectorColors entry, filter tab
12. Add page routing in App Root
13. Add footer quick link
