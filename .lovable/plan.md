

# WAYMAKER by Naavan Sandhu — Premium Scrollytelling Landing Page

## Overview

Build an Awwwards-level, cinematic scrollytelling landing page for Naavan Sandhu's fashion/lifestyle brand **WAYMAKER**. The core mechanic: an HTML5 Canvas plays a product explosion/assembly image sequence driven by scroll position, synchronized with premium copywriting and storytelling sections.

## Prerequisites

Before implementation begins, the uploaded ZIP of JPG frames must be extracted and placed into `public/frames/` (e.g., `frame-001.jpg` through `frame-N.jpg`). The frame count and background color will be sampled from the actual images.

## Architecture

```text
src/
├── pages/
│   └── Index.tsx              ← Main scrollytelling page
├── components/
│   ├── Navbar.tsx             ← Apple-style glassmorphism nav
│   ├── ScrollCanvas.tsx       ← Sticky canvas + frame playback
│   ├── HeroSection.tsx        ← 0-15% scroll content overlay
│   ├── EngineeringSection.tsx ← 15-40% scroll content
│   ├── FeatureSection.tsx     ← 40-65% scroll content
│   ├── CraftSection.tsx       ← 65-85% scroll content
│   └── CTASection.tsx         ← 85-100% reassembly + CTA
├── hooks/
│   └── useScrollProgress.ts   ← Custom hook for scroll %
public/
└── frames/
    └── frame-001.jpg ... frame-N.jpg
```

## Implementation Steps

### 1. Extract frames and set up assets
- Unzip JPG frames into `public/frames/` with sequential naming
- Sample the background color from frame edges to ensure seamless blending
- Determine total frame count

### 2. Update design system (index.css + tailwind.config.ts)
- Set dark-mode palette: background `#050505`, secondary `#0A0A0C`
- Add WAYMAKER brand accents (deep blue `#0050FF`, electric cyan `#00D6FF`)
- Add custom keyframes: `fade-in-up`, `fade-in-left`, `fade-in-right` for scroll-triggered text
- Import Inter font via Google Fonts in `index.html`

### 3. Build `useScrollProgress` hook
- Tracks scroll position within a ref container
- Returns a 0-1 progress value
- Maps progress to frame index for canvas rendering
- Debounced/RAF-optimized for smooth 60fps playback

### 4. Build `ScrollCanvas` component
- Sticky `<canvas>` element, full viewport width/height
- Preloads all frame images into an array on mount
- On scroll progress change, draws the corresponding frame to canvas
- Canvas background matches frame background color exactly
- Uses `requestAnimationFrame` for smooth rendering

### 5. Build `Navbar` component
- Fixed position, slim height
- Left: "WAYMAKER" wordmark
- Center: "Overview", "Craft", "Technology", "Collection", "Shop"
- Right: gradient CTA button "Discover WAYMAKER"
- Starts transparent, fades to glassmorphism (`backdrop-blur`, semi-transparent `#050505`) after ~50px scroll
- Smooth opacity transition

### 6. Build overlay content sections
Each section fades in/out based on scroll progress ranges, positioned absolutely over the canvas:

- **HeroSection (0-15%)**: Centered. Large headline "WAYMAKER", subtitle "Built Different." by Naavan Sandhu. Fashion/lifestyle brand tone.
- **EngineeringSection (15-40%)**: Left-aligned. "Precision in every thread." with subcopy about craftsmanship, materials, construction.
- **FeatureSection (40-65%)**: Right-aligned. "Engineered for the bold." with key product features.
- **CraftSection (65-85%)**: Left/centered. "Where vision meets craft." with detail about design philosophy.
- **CTASection (85-100%)**: Centered. "Make Your Way." with CTA buttons "Shop the Collection" and "Explore WAYMAKER".

### 7. Assemble Index page
- Outer container with `height: 500vh` (scrollable length)
- Sticky inner container with canvas + overlaid text sections
- Navbar fixed on top
- All sections respond to the single scroll progress value

### 8. Polish and details
- Subtle radial gradient glows behind hero text
- Gradient text on main headings (white to cyan)
- Smooth eased transitions on all text appearances (opacity + translateY)
- Remove `App.css` defaults (max-width, padding constraints)
- Ensure mobile responsiveness with scaled typography and adjusted layouts

## Technical Notes

- **No external animation library needed** — pure CSS transitions triggered by scroll progress via React state
- **Canvas approach** for frame sequence is performant; images preloaded into memory
- **Scroll progress** calculated as `scrollTop / (scrollHeight - clientHeight)` within the container
- All text overlays use `pointer-events-none` so scroll passes through
- Frame images served from `public/frames/` for direct URL access without bundling

## Copywriting Tone

Adapted from Sony/Apple luxury tech to **fashion/lifestyle**: confident, minimal, aspirational. Short sentences. "Built Different." not "Engineered for silence." The brand voice is bold, streetwear-meets-luxury.

