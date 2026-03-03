# RAYAT Industries Trading SPC

## Current State
A multi-page React SPA for RAYAT Industries Trading SPC with pages: Home, Labour & Manpower, Services, Portfolio, Our Team, News, Contact, and 4 Trading Division sub-pages. The site has a navbar, hero section, about section, sectors cards, why-us section, and footer. All location references currently say Bahrain. The navbar order is: Home, Services, Labour & Manpower, Portfolio, Our Team, News, Trading, Contact. Footer has a "Built with caffeine.ai" link. The About section has an "Established in / Bahrain" badge overlay.

## Requested Changes (Diff)

### Add
- Larger fonts with text-shadow effects on the home page hero/main panel
- Highlighted, bolder fonts on sector cards
- Enhanced card animation (glow/lift effect with border highlight on hover)
- New dock/crane container image for the About section (replacing the current about-us image)

### Modify
- All location references (Bahrain, Bahraini, Manama, Kingdom of Bahrain, Bahrain Bay, Seef Mall, etc.) changed to Oman equivalents (Muscat, Sultanate of Oman, Omani, etc.)
- Navbar order changed to: Home, Portfolio, Services, Trading (dropdown), Contact
- Remove "Established in" text from all "Established" badge overlays (keep just the location or remove entirely)
- Hero main panel: bigger font sizes, stronger text-shadow, more visual weight
- Sector cards: font-bold/larger titles, highlighted color on title text
- Cards across sectors: richer hover animation (scale + glow + border color transition)

### Remove
- Labour & Manpower page from navbar (hide from nav, keep page accessible if linked)
- News page from navbar (remove from nav)
- Our Team page from navbar (remove from nav)
- "Labour & Manpower" nav link
- "Our Team" nav link  
- "News" nav link
- Footer quick links for Labour, News, Our Team should also be removed
- HomeContactCTA secondary button linking to Labour page
- "Built with caffeine.ai" link in footer
- "Established in" label text in the About section badge

## Implementation Plan
1. Generate a new dock/crane container image for About section
2. Update Navbar: reorder to Home, Portfolio, Services, Trading, Contact; remove Labour, News, Our Team links
3. Update HomePage HeroSection: increase font sizes, add stronger text-shadow classes
4. Update SectorsSection cards: larger/bolder/highlighted title fonts, enhanced hover animation (glow, border highlight, scale)
5. Update AboutSection: replace image src with new dock image, remove "Established in" text from badge, change "Bahrain" → "Oman" in content
6. Find and replace all location references (Bahrain → Oman, Bahraini → Omani, Manama → Muscat, Kingdom of Bahrain → Sultanate of Oman, etc.) throughout entire App.tsx
7. Update Footer: remove Labour, News, Our Team links; remove "Built with caffeine.ai" link; update location to Oman
8. Remove HomeContactCTA Labour & Manpower secondary button
9. Update portfolio projects: replace Bahrain-specific project names with Oman equivalents
10. Update contact page: change address/map to Muscat, Oman
