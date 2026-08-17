# Project Kurukshetra — Website

A cinematic, scroll-driven landing site for Project Kurukshetra: a PvP game and its custom game engine. Built with React 19, TypeScript, Vite, Tailwind CSS v4, GSAP (ScrollTrigger) and Lenis for smooth scrolling.

This codebase was rebuilt to be fully independent of Figma — all Figma Make tooling (`.figma/`, HTML placeholder slots, dev-only Vite plugins) has been removed. It is a standard, deployable Vite + React project.

## Getting started

```bash
npm install
npm run dev       # start local dev server at http://localhost:5173
npm run build     # production build to dist/
npm run preview   # preview the production build
```

## Structure

```
index.html                 – standard HTML entry (no Figma placeholders)
vite.config.ts              – plain Vite config (React + Tailwind plugins only)
src/
  main.tsx                  – React root
  App.tsx                   – page composition + Lenis/GSAP scroll setup
  index.css                 – design tokens, fonts, keyframes, utility classes
  components/
    Navbar.tsx
    Hero.tsx
    EngineSection.tsx
    CodeToWorld.tsx
    BattlefieldSection.tsx
    TeamSection.tsx
    TechArtSection.tsx
    FinalSection.tsx
```

Every visual is built from real HTML/CSS/SVG — there are no external image assets, so nothing to go missing or 404.

## Notes

- Scroll animation is driven by GSAP's ScrollTrigger, synced to Lenis's smooth-scroll `raf` loop (see `App.tsx`).
- Animations favor `transform`/`opacity` (GPU-friendly) rather than layout-triggering properties.
- Color tokens, fonts, and shared keyframes live in `src/index.css` as CSS variables/utility classes.
