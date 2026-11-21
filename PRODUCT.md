# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
The owner or boss of a company who could sponsor Santino. They read the page on their own time, often sent a link, and decide whether this young athlete is worth backing. They must come away moved by who Santino is and what he does: the emotional story carries the decision, the numbers back it up.

## Product Purpose
Personal page and sponsorship dossier for Santino Chaud, 18, sprinter and jumper from Pilar, Buenos Aires. It tells his story (gym in 2023, school records, three straight "champion" trophies, injuries in 2026 and the comeback), shows his official marks, compares him with the 2026 U20 Argentine Championship finals, states his 2027 goals and lists what he needs to train professionally. Success: a company leader finishes the page wanting to back him.

## Positioning
A real kid who got to national U20 final level with no coach, no nutrition plan and no recovery, through injuries and illness. The page sells the person and the trajectory, not a polished pro athlete.

## Operating Context
Shared as a link (WhatsApp, mail, in person) and read on phone or desktop. Spanish (Argentina, voseo). Built with React + Vite + Tailwind v4, GSAP and Lenis; content lives in `src/content.ts`.

## Capabilities and Constraints
- No contact section and no contact links anywhere on the page (removed by the owner, Nov 2026). No "Quiero apoyarte" button.
- The former "Apoyame" section is titled "Qué necesito" and lists needs only; the "Qué ofrezco" list is removed.
- Sections, in order: portada, sobre mí (without the UBA sentence), los sports (school, house Lions, 24 medals in 9 disciplines, the champion 2024–2026), marcas, trayectoria, lo que me tocó superar, full-bleed video, dónde estoy hoy (comparativa), objetivos 2027, qué necesito, galería. The owner removed the UBA sentence and the hero "Mi historia" button (Nov 2026).

## Brand Commitments
- Craft reference chosen by the owner: landonorris.com (giant photos/videos, premium motion, enormous type). It sets the bar, never its identity: no lime, no helmet, no signature copied.
- Santino's color is celeste argentino (owner decision, Nov 2026).
- The page must not look AI-generated or templated.

## Evidence on Hand
- Official marks: 60 m 6,99 s · 100 m 11,1 s · 200 m 22,8 s · largo 6,42 m · triple 13,30 m (electronic timing).
- Comparison tables from the 2026 U20 Argentine Championship (World Athletics source).
- Photos and videos: 15 real files supplied by the owner (Nov 2026) live in `public/media/`, placed top to bottom in the order the owner gave (hero video first). Metadata (incl. GPS) stripped. Never fill a slot with stock or invented imagery.
- No testimonials, press, or sponsor logos exist; never fabricate them.

## Product Principles
1. Emotion first, proof second: the story moves, the marks confirm.
2. His own voice: first person, plain words, nothing that sounds like marketing copy.
3. Honest about the hard parts: injuries and missing support are the case, not something to hide.
4. Nothing invented: every number and fact comes from `src/content.ts`.
