# Cinematic Landscaper Template — Architecture

## Overview
Next.js 15 single-page app with GSAP scroll-driven cinematic animation. Designed for UK service businesses. All client data lives in `src/config/client.ts` — one file change per deployment.

## Tech Stack
- Next.js 15 (App Router, React 19)
- GSAP + ScrollTrigger (scroll-linked frame animation)
- Tailwind CSS 4 (via PostCSS)
- Phosphor Icons (icon library)
- framer-motion (installed, currently unused — reserved for future features)

## Directory Structure
```
src/
  app/
    layout.tsx          — Root layout (fonts: Playfair Display + Space Grotesk, metadata from client.ts)
    page.tsx            — Entry point, renders HomeClient
    globals.css         — All styles (glass-card, pill-badge, animations, responsive breakpoints)
    api/contact/
      route.ts          — POST handler for contact form → forwards to webhookUrl in client.ts
  components/
    HomeClient.tsx      — Main page orchestrator. Mounts all sections in order.
    Header.tsx          — Sticky nav bar (transparent → solid on scroll via GSAP)
    HeroOverlay.tsx     — Fixed hero with tagline, fades out on scroll via GSAP
    CinematicCanvas.tsx — Core scroll animation: 181 frames (desktop) + 181 (mobile), preloaded, scroll-scrubbed
    CinematicCaptions.tsx — Text overlays tied to scroll position during cinematic sequence
    AboutSection.tsx    — "About us" with Google rating card. Text configurable via client.ts copy object
    ServicesSection.tsx — Service cards grid with Phosphor icons. Data from client.ts services array
    TransformationGrid.tsx — 3x3 bento grid of before/after image pairs with hover reveal
    ReviewsSection.tsx  — Google reviews carousel. Data from client.ts reviews array
    PortfolioSection.tsx — Optional gallery grid with lightbox. Renders only if client.ts has portfolio array
    FAQSection.tsx      — Accordion FAQ with JSON-LD structured data for Google. Customisable or uses defaults
    ContactSection.tsx  — Contact form (name, email, phone, message). POSTs to /api/contact
    CookieConsent.tsx   — GDPR banner. localStorage persistence, accept/decline
    FireflyParticles.tsx — Floating particle effect overlay (ambient)
    ScrollReveal.tsx    — Intersection Observer wrapper for fade-in-on-scroll sections
    Footer.tsx          — Footer with business info
  config/
    client.ts           — SINGLE SOURCE OF TRUTH. All business data, reviews, services, SEO config
```

## Component Render Order (HomeClient.tsx)
1. Header (sticky)
2. Grain overlay (texture)
3. FireflyParticles (ambient)
4. Loading screen (progress bar while frames preload)
5. HeroOverlay (fixed, fades on scroll)
6. Scroll progress bar
7. CinematicCaptions (scroll-linked text)
8. CinematicCanvas (scroll-linked frame animation)
9. Cinematic end fade
10. AboutSection
11. ServicesSection
12. TransformationGrid
13. ReviewsSection
14. PortfolioSection (conditional — only if client.ts has portfolio)
15. FAQSection
16. ContactSection
17. Footer
18. CookieConsent (fixed bottom)

## client.ts Schema
Key fields:
- `name`, `tagline`, `description`, `category` — business identity
- `city`, `county`, `postcode`, `basedIn` — location
- `founderName`, `founderSurname`, `founderRole` — people
- `phone`, `email`, `website`, `address` — contact
- `googleRating`, `reviewCount` — social proof
- `services[]` — {title, description, icon} array
- `reviews[]` — {name, rating, text, date, badge?} array
- `transformations[]` — {before, after, label} image pairs
- `cinematic{}` — frame animation config (frameCount, dirs, speed)
- `seo{}` — {title, description} for metadata
- `copy{}` — optional text overrides (aboutHeading, aboutBody)
- `portfolio[]` — optional {src, alt, caption} array for gallery
- `faqs[]` — optional FAQ overrides
- `webhookUrl` — optional webhook for contact form submissions

## Animation System
- GSAP ScrollTrigger drives all scroll animations
- CinematicCanvas: preloads 181 JPG frames, draws to canvas on scroll
- Desktop frames in /public/frames/, mobile in /public/frames-mobile/
- HeroOverlay fades out at 8% scroll progress
- ScrollReveal uses IntersectionObserver for section fade-ins
- Header transitions from transparent to solid background on scroll

## Build & Deploy
- `npm run build` — Next.js production build
- `vercel --prod --yes` — deploy to Vercel
- Only client.ts changes per site — all other files are template defaults
- Bundle: ~22kB first load JS

## Known Issues
- ServicesSection iconMap must be `Record<string, any>` (not React.ElementType) to avoid TS error
- Slugs >40 chars get truncated by Vercel auto-aliasing — need manual `vercel alias`
- framer-motion installed but unused — tree-shaken, no bundle impact
