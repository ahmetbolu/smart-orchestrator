---
name: frontend-ui-ux-pro
description: "Premium UI/UX design intelligence and frontend architecture guidelines."
version: 1.0.0
---

# Frontend & UI/UX Pro Max Guidelines

This skill is invoked whenever tasks relate to UI design, frontend architecture, or component styling.

## Core Directives

1. **Aesthetics & Glassmorphism:**
   - Never use generic flat colors (e.g., standard red/blue). Use harmonious, curated color palettes with HSL variables.
   - Implement subtle glassmorphism effects (backdrop-blur, semi-transparent backgrounds) for floating elements and modals.

2. **Typography & Spacing:**
   - Use modern typography (e.g., Inter, Outfit) and avoid browser defaults.
   - Strictly adhere to a 4pt/8pt spacing grid system (`p-2`, `p-4`, `p-8` in Tailwind).

3. **Micro-Animations:**
   - Add micro-animations using Framer Motion or Tailwind transitions (`transition-all duration-300 ease-in-out`) for hover, active, and focus states on interactive elements.

4. **Component Architecture (React/Next.js):**
   - Isolate UI components. Prevent one component's re-render from affecting the entire layout.
   - Use React Error Boundaries and Skeleton loaders to prevent layout shifts and blank screens during data fetching.
   - Ensure mobile-first responsiveness using Tailwind's `sm:`, `md:`, `lg:` prefixes.
