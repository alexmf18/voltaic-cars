---
name: Voltaic Cars
description: Every car presented as a logged run in the wind tunnel; air draws the car, the data is pinned to the image.
colors:
  test-lamp-amber: "#ff8a1f"
  test-lamp-amber-hi: "#ffa64f"
  amber-ink: "#1a0d00"
  tunnel-ink: "#0c0d0f"
  graphite: "#16181b"
  graphite-2: "#1f2226"
  smoke: "#e9e6df"
  smoke-2: "#b9b5ac"
  smoke-3: "#8f8b83"
  rule: "rgba(233, 230, 223, 0.14)"
  rule-strong: "rgba(233, 230, 223, 0.34)"
  danger: "#ff7a66"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.6rem, 6.3vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2rem, 4.4vw, 3.9rem)"
    fontWeight: 760
    lineHeight: 0.98
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 118"
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.3rem, 1.6vw, 1.6rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 112"
  body:
    fontFamily: "Geist, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  tag:
    fontFamily: "Geist, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 500
    letterSpacing: "0"
  data:
    fontFamily: "Martian Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.72rem"
    fontWeight: 400
    letterSpacing: "0.06em"
    fontFeature: "'tnum' 1"
rounded:
  none: "0px"
spacing:
  gutter: "clamp(1.25rem, 4vw, 3rem)"
  section: "clamp(4.5rem, 10vw, 9rem)"
  container-max: "1440px"
  header-h: "68px"
components:
  button-primary:
    backgroundColor: "{colors.test-lamp-amber}"
    textColor: "{colors.amber-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0.95rem 1.35rem"
  button-primary-hover:
    backgroundColor: "{colors.test-lamp-amber-hi}"
    textColor: "{colors.amber-ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.smoke}"
    rounded: "{rounded.none}"
    padding: "0.95rem 1.35rem"
  input:
    backgroundColor: "{colors.tunnel-ink}"
    textColor: "{colors.smoke}"
    rounded: "{rounded.none}"
    padding: "0.85rem 0.95rem"
  form-panel:
    backgroundColor: "{colors.graphite}"
    rounded: "{rounded.none}"
    padding: "clamp(1.75rem, 4vw, 3rem)"
  header:
    backgroundColor: "{colors.tunnel-ink}"
    height: "{spacing.header-h}"
  footer:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.smoke-2}"
---

# Design System: Voltaic Cars

## Overview

**Creative North Star: "The Wind Tunnel Test Record"**

Every Voltaic is shown as a run in the tunnel. The ground is matte tunnel black; air is drawn as thin smoke streamlines that flow left to right and bend around the car and the cursor; measurements are pinned to points on the photograph with leader lines and logged in ruled test sheets. The visitor reads the cars the way an engineer reads a run: photograph, three pinned numbers, the log, the comparison, then their own run (the test drive).

The world is dark, flat and ruled. Everything is drawn with 1px smoke hairlines on square corners; there are no shadows, glows or decorative gradients, and depth comes only from flat layers overlapping (photograph, smoke canvas, type). One warm colour exists, test-lamp amber, and it means "act here". The car's blue lives only inside the photographs. Headlines are expanded heavy Archivo set to full measure; numbers are set big in Archivo too, while their units, run IDs and conditions are whispered in Martian Mono.

**Key Characteristics:**
- Matte black ground with graphite bands; smoke-white type in three steps.
- Amber is the single action colour: buttons, focus, caret, selection, hover underline, brand mark.
- Square corners and 1px hairline rules everywhere; tables, specs, logs and price columns are ruled, not boxed.
- Leader-line pins annotate photographs at real points on the car.
- Motion is air: smoke streamlines, pins drawing in once, one smoke line tracking scroll.

## Colors

A near-monochrome tunnel palette of black, graphite and warm smoke, punctured by a single test-lamp amber.

### Primary
- **Test-Lamp Amber** (test-lamp-amber): the only action colour. Primary button fill, `:focus-visible` outline (2px, 3px offset), text caret, `::selection` fill, the nav link underline, hover border on icon buttons and the link underline on hover, input focus border, checkbox accent, the brand bolt and the favicon bolt.
- **Lamp Hot** (test-lamp-amber-hi): primary button hover only.
- **Amber Ink** (amber-ink): text on amber surfaces (button labels, selection, skip link).

### Neutral
- **Tunnel Ink** (tunnel-ink): page ground, header, inputs, icon-button fills, pin dots.
- **Graphite** (graphite): banded sections, featured price column and table column, form panel, footer, image placeholders.
- **Graphite Deep** (graphite-2): scrollbar thumb and the footer wordmark (a tone barely off graphite, deliberately near-invisible).
- **Smoke** (smoke): headings, primary text, pin lines and dots, the smoke streamlines (drawn in the same rgb at low alpha).
- **Smoke Mid** (smoke-2): ledes, prose, tags, secondary text, nav links at rest.
- **Smoke Low** (smoke-3): data labels, run IDs, placeholders, legal footer text.
- **Rule** (rule): the default 1px hairline between rows, columns and sections.
- **Rule Strong** (rule-strong): ghost-button and input borders, the log's top rule, pin label stems, the resting link underline.

### Semantic
- **Signal Red** (danger): invalid field borders and error messages only.

### Named Rules
**The One Lamp Rule.** Amber marks action and focus and nothing else. No amber headings, no amber data, no amber decoration; if it is amber, it can be pressed, typed into, or is the brand bolt.

**The Blue Stays In The Photo Rule.** The cars' blue is never sampled into the UI. Colour beyond black, smoke and amber comes only from photography.

## Typography

**Display Font:** Archivo variable (width 112 to 125, weight 700 to 800), falling back to Helvetica Neue, Arial
**Body Font:** Geist (400, 500, 600), falling back to system-ui
**Data Font:** Martian Mono (400), falling back to ui-monospace

**Character:** Expanded heavy Archivo reads like lettering on a test rig: wide, tight, loud. Geist carries the reading voice plainly. Martian Mono is the instrument readout, small, uppercase and tracked, used only where a machine would print.

### Hierarchy
- **Display** (Archivo 800, width 125%, clamp 2.6 to 6rem, line-height 0.94, -0.035em): page h1s and the closing "own run" line; spans the measure, balanced wrap.
- **Headline** (Archivo 760, width 118%, clamp 2 to 3.9rem, line-height 0.98, -0.03em): section h2s, left of a right-aligned lede.
- **Title** (Archivo 700, width 112%, clamp 1.3 to 1.6rem, line-height 1.15): h3s, price column names, fact terms.
- **Figures** (Archivo 700 to 800, width 112 to 118%, tabular figures): every measured value and price: pin values, spec values, log values, prices, comparison table model headers. Numbers are display type, not mono.
- **Body** (Geist 400, 1.0625rem, line-height 1.6): prose capped at 62ch, ledes at 46ch in smoke-2.
- **Tag** (Geist 500, 0.92rem, no tracking, sentence case): plain-language categories and notes (model type, "Más vendido", footer column titles, page-head notes).
- **Data** (Martian Mono 400, 0.72rem, 0.06em, uppercase, tabular): units, run IDs (V-01), figure numbers, spec and readout labels, log conditions, captions.

### Named Rules
**The Instrument Rule.** Martian Mono is for what an instrument would print: values' labels, units, run IDs, figure numbers, conditions. Categories, notes and anything a person would say are Geist tags, never mono.

**The Big Number Rule.** Measured values are set in Archivo with tabular figures; the mono label sits beside or below them small.

## Layout

A 1440px max container with a fluid gutter (1.25 to 3rem) and fluid section padding (4.5 to 9rem). Sections head with a two-column grid (headline 1.4fr, lede 1fr, bottom-aligned, lede pushed right). Content is organised as ruled sheets: spec rows in three columns split by vertical hairlines, a four-column run log (5.5rem ID, measurement, condition, note), three price columns divided by rules, a 12-column gallery grid with 4/6/8/12-span figures. Photographs run full bleed (tunnel hero, 21:9 plate, 16:9 run stage) and the copy overlaps their faded lower edge.

The header is fixed at 68px (60px under 600px). A fixed 12px smoke line runs down the left edge below the header as the scroll indicator.

Breakpoints: 1080px collapses two-column heads and bodies to one column, turns the model tabs into a horizontal ruled strip, stacks price columns, hides the log header; 860px swaps the nav for a full-screen ruled menu with large Archivo links, replaces hero pins with a compact readout row, hides pins on product and gallery images; 600px reflows the comparison table into per-row grids (row label spanning, three model values beneath), stacks the log, single-columns gallery and form.

## Elevation & Depth

Flat. There is no box-shadow, glow or decorative gradient anywhere in the system. Depth is made only by flat layers overlapping in z-order: photograph, then the smoke canvas, then pins and type. The one gradient in use is a mask on hero and run photographs (opaque to 72 to 78%, then transparent) so the image dissolves into the ink ground and the copy can overlap it. Tonal shift (ink to graphite) separates bands; nothing lifts.

### Named Rules
**The Overlap Rule.** To bring something forward, overlap it on a flat layer (run body pulled up over the stage by up to 4rem, copy over the masked photo); never shadow it.

**The Mask-Only Gradient Rule.** Gradients exist only as image masks fading photographs into the ground. Never as fills, glows or text effects.

## Shapes

Square everywhere: no border-radius on buttons, inputs, panels, figures, icon buttons or pin dots (the dot is an 8px square). Edges are 1px hairlines in rule or rule-strong. Structures are ruled, not boxed: rows divide with a bottom rule, columns with a left rule, and the outermost edges usually stay open. Icons are thin-stroke SVGs (1.5 to 1.75 stroke, no fill), and the brand mark is an authored solid lightning-bolt path.

## Components

### Buttons
- **Shape:** square (0px), 1px border slot always present.
- **Primary:** amber fill, amber-ink label, Geist 600 at 0.95rem, padding 0.95rem by 1.35rem; optional trailing arrow (18px, stroke 1.75) that slides 4px right on hover.
- **Hover / Focus:** fill steps to lamp hot; focus is the global 2px amber outline at 3px offset. Transitions 0.2s.
- **Ghost:** transparent, smoke label, rule-strong border; border goes full smoke on hover.
- **Text link:** smoke text with a 1px rule-strong underline at 0.35em offset; the underline turns amber on hover. Used as the secondary action beside a primary button.

### Pins (signature)
Leader-line annotations fixed to a point on the car. An 8px square ink dot with a smoke border marks the point; a 1px smoke line (96px default, 56px short, 150px long) rises from it; the label sits at the top with a rule-strong stem, Archivo value over a mono name. Variants: flip (label to the left, right-aligned), side (horizontal leader, label to the right). Positions are given as fractions of the photograph and placed by object-fit cover math so they stay on the car at any crop. On first placement the line draws in (0.9s) and the label rises 6px (0.7s), staggered 0.18s per pin, once. Under 860px pins hide and the readout takes over.

### Readout
The narrow-screen replacement for hero pins: a ruled three (or two) column definition row, mono label above an Archivo value, columns split by hairlines.

### Specs
Three-column definition sheet ruled top and bottom with vertical hairlines between cells; mono labels, Archivo values (clamp 1.3 to 1.9rem). Wide variant: two columns, every cell bottom-ruled.

### Run Log
A ruled test sheet: rule-strong top edge, a mono header row (Ensayo, Medición, Condición, Resultado), then one measurement per row: mono run ID, a big Archivo value, a mono condition in smoke-2, and a Geist title and note. Rows bottom-ruled, 1.5rem vertical padding.

### Plate
A full-bleed photograph band (21:9, 4:3 on phones) followed by a mono caption strip inside the container, split left and right and bottom-ruled.

### Page Head and Closer
Inner page heads and the closing call-to-action host a quiet smoke canvas behind type; display h1, then a row with a tag left and a lede right. The closer pairs a display line with a lede, a primary button and a text link.

### Pricing
Three ruled columns, the featured one on graphite with a Geist tag flag; Archivo price, finance line, a ruled feature list, a full-width button. The comparison table is right-aligned mono values under Archivo model headers, featured column on graphite, header rule strong; under 600px each row reflows into a grid.

### Gallery and Lightbox
Figures in a 12-column grid, graphite placeholder, image scales 1.035 on hover or focus over 0.9s; caption below with a mono figure number and a Geist note. The lightbox is a near-opaque ink veil with square 48px ink icon buttons bordered rule-strong, amber border on hover.

### Inputs / Fields
- **Style:** ink fill, 1px rule-strong border, square, padding 0.85 by 0.95rem, Geist 1rem; Geist 500 label above in smoke.
- **Hover / Focus:** border to smoke-3 on hover, amber on focus (no outline ring).
- **Error:** signal-red border and a 0.84rem red message below. Selects carry an authored thin chevron. Forms sit in a graphite panel with a rule-strong top edge.

### Navigation
Fixed ink header with a bottom rule: brand (amber bolt, Archivo 800 expanded wordmark, mono "CARS") left, Geist 500 links in smoke-2 right with a compact primary button. Hover and active turn smoke and draw a 1px amber underline from the left (0.35s). Under 860px a three-line toggle opens a full-screen ink menu of ruled Archivo links at 1.6rem with a full-width primary button.

### Contact Channels
Ruled rows with a 20px thin-stroke icon in smoke-2, a Geist 600 title and smoke-2 text; links underline in rule-strong and turn amber on hover.

### Footer
Graphite band with a rule above: brand and blurb, three link columns headed by Geist tags, square 40px social buttons bordered in rule (amber on hover), a bottom row of smoke-3 legal links, and an oversized expanded Archivo wordmark in graphite-2.

### Motion
Smoke streamlines on a canvas: 1px lines of smoke at low alpha, dashed segments flowing left to right; in the hero they deflect around the car's obstacle ellipse and bend away from the cursor, and thin out below the photograph so copy stays legible; page heads and the closer run a quieter variant. A fixed smoke line on the left traces scroll progress. Pins draw in once. Easing is cubic-bezier(0.16, 1, 0.3, 1). Under reduced motion the canvas renders one static frame, pins and counters appear at rest, and transitions collapse.

## Do's and Don'ts

### Do:
- **Do** keep amber for action and focus only: primary buttons, focus outline, caret, selection, hover underline, the brand bolt.
- **Do** rule structures with 1px hairlines (rule for rows and columns, rule-strong for edges that take input or open a sheet).
- **Do** set every measured value in expanded Archivo with tabular figures and put its unit or label in Martian Mono.
- **Do** annotate photographs with leader-line pins placed on real points of the car, and give narrow screens a ruled readout instead.
- **Do** bring layers forward by overlapping flat planes over masked photographs.
- **Do** render the smoke as a single static frame under prefers-reduced-motion.

### Don't:
- **Don't** round corners; every surface, control and dot is square.
- **Don't** use box-shadows, glows, or gradient fills; the only gradient is the photograph fade mask.
- **Don't** use amber for headings, data, decoration or category labels.
- **Don't** set categories, notes or plain-language labels in Martian Mono; those are Geist tags.
- **Don't** sample the cars' blue into the interface.
- **Don't** box content in bordered cards; divide it with rules.
