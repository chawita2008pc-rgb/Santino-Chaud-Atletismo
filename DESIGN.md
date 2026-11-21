---
name: Santino Chaud Atletismo
description: Personal page and sponsorship dossier of an 18-year-old Argentine sprinter and jumper, told in drenched color fields and one stretchable typeface.
colors:
  ink: "#0b1217"
  ink-2: "#141f27"
  paper: "#eef1f3"
  paper-2: "#dfe5e9"
  celeste: "#74acdf"
  celeste-deep: "#1f5d93"
  mist: "#9fb2c0"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 8vw, 7.5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 125"
  figures:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 10vw, 9.5rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.04em"
    fontFeature: "'tnum' 1"
    fontVariation: "'wdth' 112"
  lead:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 3.1vw, 3.1rem)"
    fontWeight: 500
    lineHeight: 1.18
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 100"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 100"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.375
    fontVariation: "'wdth' 100"
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    letterSpacing: "0.01em"
    fontVariation: "'wdth' 100"
rounded:
  none: "0px"
spacing:
  gutter: "20px"
  gutter-wide: "40px"
  grid-gap: "40px"
  row: "20px"
  section: "96px"
  section-wide: "144px"
  container: "1600px"
components:
  field-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "96px 20px"
  field-celeste:
    backgroundColor: "{colors.celeste}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "96px 20px"
  field-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "96px 20px"
  media-slot-dark:
    backgroundColor: "{colors.ink-2}"
    textColor: "{colors.mist}"
    rounded: "{rounded.none}"
    padding: "16px"
  media-slot-light:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "16px"
  table-row-own:
    backgroundColor: "{colors.celeste}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  menu-overlay:
    backgroundColor: "{colors.celeste}"
    textColor: "{colors.ink}"
    typography: "{typography.display}"
---

# Design System: Santino Chaud Atletismo

## Overview

**Creative North Star: "The Stretched Name"**

The whole system is one typeface pulled to full width and three colors poured edge to edge. Archivo's width axis does the work other sites hand to a second family: the name, the section titles and every mark are set expanded and heavy (width 125, weight 800), so they read like a bib number or a stadium board; everything a sponsor actually reads drops back to normal width. Color is never sprinkled. Each section is a single drenched field of blue-black ink, cool paper or celeste argentino, and the page is read as a sequence of those fields.

Media is the other half. Frames are square-cornered, giant and often full-bleed; they open from an inset to full bleed (the hero on load, the mid-page video band on scroll) and drift with parallax. Structure comes from hairline rules between rows, never from boxes. Motion is scroll-authored and slow-settling: expo-out easing, words that light up as they are read, marks that count up from zero, a trajectory that travels sideways while the section is pinned.

The density is low and the scale is high. A section usually holds one enormous title, one block of text and one list or frame, with 96 to 144px of field above and below.

**Key Characteristics:**
- One family (Archivo), its width axis as the hierarchy: 125 for display, 112 for figures, 100 for reading.
- Three whole-field colors (ink, paper, celeste), alternating by section; celeste is a field, not an accent dot.
- Square media frames, hairline row rules, no cards, no shadows.
- Scroll-bound motion: frame expansion, word-fill, count-up, pinned horizontal track.
- Sentence-case labels only; no uppercase tracking, no eyebrows.

## Colors

A cold, Argentine palette: near-black with a blue cast, a blue-grey paper, and the flag's sky blue used at full strength as a surface.

### Primary
- **Celeste Argentino** (celeste): Santino's color by owner decision. Used as an entire section field ("Mis marcas", "Qué necesito"), as the full-screen menu overlay, as the fill of his own row in the comparison tables, as the colour of dates and goal figures on ink, and for selection and focus rings. On celeste, text is always ink.
- **Deep Celeste** (celeste-deep): Units set beside marks on a celeste field ("s", "m"). The darker step that keeps a secondary token legible on celeste without introducing a new hue.

### Neutral
- **Track Ink** (ink): Page base and the dominant field (portada, trayectoria, superación, objetivos, cierre). Text on it is paper.
- **Ink Raised** (ink-2): Empty media slots on dark fields; the only tonal step above ink.
- **Cool Paper** (paper): Light fields (sobre mí, comparativa, galería) and all text on ink.
- **Paper Shade** (paper-2): Empty media slots on paper fields.
- **Mist** (mist): Secondary text on ink (section bajadas, placeholder labels in dark slots).

Secondary text on paper and celeste is ink at reduced opacity (70 to 80%), never a new grey.

### Named Rules
**The Whole Field Rule.** A color is applied to a full-width section or a full row, or to large type on ink (dates, goal figures, the comeback line), never to a small chip, badge or underline. If celeste appears, it fills something or it is set big.

**The Three Field Rule.** Every surface is ink, paper or celeste. Adjacent sections alternate fields; the only seam between two same-field sections is a hairline (paper at 10%).

## Typography

**Display Font:** Archivo, width 125 (with ui-sans-serif, system-ui)
**Body Font:** Archivo, width 100
**Figures:** Archivo, width 112, tabular numerals

**Character:** A single grotesque that changes posture instead of changing family: stretched and black for the name and the marks, upright and plain for his own words. Loaded from Google Fonts with the variable range wdth 62..125, wght 400..900.

### Hierarchy
- **Display** (800, width 125, clamp(3rem, 8vw, 7.5rem) for section titles, up to 18vw/166px for the hero name, 0.95, -0.03em): Hero name, section titles, the closing phrase, menu links, goal figures. Large-scale steps used in the build: hero 18vw (10.4vw at lg, capped 166px), closing clamp(3rem, 10.5vw, 10rem), "Qué necesito" clamp(3.5rem, 10vw, 9.5rem), section clamp(3rem, 8vw, 7.5rem), sub-titles clamp(1.9rem, 3vw, 2.75rem).
- **Figures** (700, width 112, tabular, -0.04em, 0.9): Official marks at clamp(3.25rem, 10vw, 9.5rem) and table marks at clamp(1.75rem, 2.6vw, 2.5rem). Decimal comma (es-AR). Units sit at 0.38em, weight 600, normal tracking.
- **Lead** (500, clamp(1.6rem, 3.1vw, 3.1rem), 1.18, -0.02em): Large first-person story text, scrubbed word by word. A lighter variant (400, clamp(1.35rem, 2.2vw, 2.1rem), 1.32) carries the longer injury story.
- **Title** (700, clamp(1.6rem, 3vw, 2.75rem), 1.05, about -0.02em): Trajectory dates, need items. Normal width, so it reads as content, not as a headline.
- **Body** (400, 18 to 24px, snug): Descriptions, bajadas, captions under titles. Measure held at 30 to 40ch for side copy, 75ch for footnotes.
- **Label** (500, 0.875rem, 0.01em, sentence case): Table heads, source notes, placeholder captions, footer line.

### Named Rules
**The Width Axis Rule.** Hierarchy is expressed by width before size: display is always width 125, figures 112, reading text 100. Never introduce a second family or an intermediate width for emphasis.

**The No Eyebrow Rule.** Labels are small and sentence-case, and they sit beside or below what they describe. No uppercase tracked kicker above a title.

## Layout

A single centered container (max 1600px) with 20px side gutters, 40px from 640px up. Inside it, a 12-column grid at 1024px with 40px gaps: title in 3 columns and text in 9 (sobre mí), frame in 5 and story in 7 with the frame sticky (superación), title 7 and copy 5 (qué necesito). Lists of marks and goals use a two-track row: label left, giant figure right, baseline-aligned.

Section rhythm is generous and fixed: 96px vertical padding on mobile, 128 to 144px on desktop (80 to 112px for the marks field). Title-to-content gaps run 40 to 80px. Media breaks the container: the hero is 100svh full-bleed and the video band is 85svh full-bleed.

The trajectory is a horizontal track pinned at 1024px and above, cards at min(30vw, 460px) with 4vw gaps; below that, or under reduced motion, it becomes a vertical stack or a grid. The gallery is a dense 2-column grid (rows 44vw) that becomes 4 columns (rows min(19vw, 300px)), with full, tall and wide spans.

## Elevation & Depth

Flat. There are no box-shadows anywhere. Depth comes from three things only: full-bleed media behind type, a single bottom scrim on the hero (ink at 85% fading to transparent over two thirds of the height) that keeps the name legible over a photo, and motion (parallax, clip-path reveals). The fixed header uses `mix-blend-difference` in white so it stays legible over every field without a bar.

### Named Rules
**The No Lift Rule.** Nothing floats. If an element needs separation, give it a hairline or a different field, not a shadow.

## Shapes

Square corners everywhere: media frames, table rows, fields, the menu overlay. Media frames take fixed ratios (4:3 to 16:11 for trajectory, 4:5 for the portrait) or fill their grid cell. Hairline rules (1px) are the structural line: ink at 25% on celeste, ink at 15% on paper, paper at 10 to 15% on ink, full ink under table heads. A list opens with a top rule on each row and closes with a bottom rule on the last.

There are no round forms: no pills, discs or rounded cards.

## Components

### Section Fields
- **Character:** The page is built from them; they replace cards.
- **Background:** ink, paper or celeste for the full width.
- **Internal Padding:** 96px by 20px on mobile, up to 144px by 40px on desktop.
- **Border:** none, except a 10% paper hairline between two consecutive ink fields.

### Rule Lists (marks, goals, needs)
- **Style:** Rows separated by hairlines, no background, no radius. Marks: event name (18 to 24px, 600) left, figure right. Goals: display figure in celeste left, body text right. Needs: title-weight item with a muted detail line.
- **Padding:** 16 to 32px vertical per row.

### Comparison Table
- **Style:** Full-width, collapsed, label-style head over a full ink rule, rows on 15% ink hairlines, figures right-aligned.
- **Own row:** Filled celeste with 16px inset on both ends, bold place label ("Xº, mi marca"). It is the only filled row.

### Media Frame
- **Style:** Square-cornered figure, image or video `object-cover`. Empty slots show ink-raised or paper-shade with a label describing the intended photo bottom-left and "Foto" / "Video" bottom-right; no stock imagery.
- **Behavior:** Reveals with a bottom-up clip curtain (1.3s expo-out). Gallery frames with a second photo swap on tap/hover (500ms opacity).

### Navigation
- **Header:** Fixed, 64px (80px from 640px), no background, white with difference blend. Wordmark in display at 18 to 20px; four text links (15px, 500, underline on hover) from 1024px; "Menú" with a two-bar glyph whose top bar shifts 4px on hover.
- **Menu overlay:** Full-screen celeste dialog, opened by a top-down clip (600ms expo-out). Links are display-size (clamp(2rem, 6vw, 4.5rem)) on hairline rows, staggered up from below; hover indents 16px. Escape closes; focus moves to "Cerrar".

### Scrub Text (signature)
Story paragraphs split into words that rise from 16% to full opacity as the paragraph crosses the viewport (start at 82%, end at 55%, scrub 0.4). Used only on first-person narrative.

### Frame Expansion (signature)
The hero frame opens from inset(14% 10%) to full bleed on load (1.2s expo-out) while the media scales from 1.2 and the name's letters rise in a 22ms stagger. The mid-page video band opens from inset(0 8%) to full bleed bound to scroll. On scroll the hero media drifts down 18% and the name lifts 40%.

Motion overall: GSAP with expo.out for entrances, linear for scrubbed effects, Lenis smooth scroll (1.1s). Every effect is skipped under `prefers-reduced-motion`, and the trajectory falls back to a static grid.

## Do's and Don'ts

### Do:
- **Do** set every headline and every number in Archivo at width 125 (display) or 112 (figures); keep reading text at width 100.
- **Do** give each section one whole field: ink (#0b1217), paper (#eef1f3) or celeste (#74acdf), alternating.
- **Do** separate rows with 1px hairlines at 15 to 25% opacity of the text color, top rule per row plus a closing bottom rule.
- **Do** keep media square-cornered and as large as the layout allows, with an empty labeled slot instead of a placeholder image when the real photo is missing.
- **Do** write numbers with a decimal comma and units at 0.38em beside the figure.
- **Do** provide a static fallback for every scroll effect under reduced motion.

### Don't:
- **Don't** use rounded cards, pill buttons or boxed stat tiles; the page has no round forms.
- **Don't** put uppercase tracked eyebrow labels above titles.
- **Don't** use celeste as a small accent (dots, badges, underlines, gradient bars); it fills a field or a row, or sets large type on ink.
- **Don't** add box-shadows or a solid header bar.
- **Don't** introduce a second typeface or a new grey; muted text is the base text color at lower opacity, or mist on ink.
- **Don't** fill media slots with stock or invented imagery.
