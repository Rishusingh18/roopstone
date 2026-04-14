# Design System Strategy: The Stone Curator

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Architectural Monolith."** 

This system does not treat a digital interface as a collection of pixels, but as a curated gallery of carved stone. It draws inspiration from the stillness of a sculpture garden and the precision of classical stonemasonry. To achieve a high-end, bespoke feel, we move away from "standard" web layouts. We embrace intentional asymmetry, generous white space (mimicking the monumental scale of architecture), and a "layered-not-lined" approach.

Instead of rigid grids, elements should feel like they are floating or inset into a solid surface. Overlapping imagery and typography create a sense of three-dimensional space, while the high-contrast serif typography acts as an authoritative, poetic voice.

## 2. Colors
Our palette is a study in tonal warmth, moving away from harsh pure whites and cold grays.

### The Palette
- **Primary (`#77592c`):** Our bronze/gold accent. Used for calls to action and key narrative highlights.
- **Surface & Backgrounds (`#fff9ea`, `#f4eede`):** The "Cream and Sand" foundation. These evoke the texture of polished marble and limestone.
- **On-Surface (`#1e1c12`):** A deep charcoal, softer than pure black, providing premium legibility without visual fatigue.

### The "No-Line" Rule
**Explicit Instruction:** Use of 1px solid borders for sectioning or containment is strictly prohibited. 
Boundaries must be defined through background color shifts. For example, a `surface-container-low` section should sit against a `background` page to create a soft, structural break. This mimics the way different stone slabs meet in architecture—through change in texture and depth, not artificial lines.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. 
- Use the `surface-container` tiers (Lowest to Highest) to create "nested" depth. 
- A card should be `surface-container-lowest` (pure white) placed on a `surface-container-low` (sand-beige) section. This creates a soft "lift" that feels organic and premium.

### Signature Textures & Glassmorphism
- **The Glass Rule:** For floating navigation or modal overlays, use `surface` colors at 70% opacity with a `backdrop-blur` of 20px. This allows the artisanal stone textures behind the UI to bleed through, softening the interface.
- **Gradients:** Use subtle linear gradients from `primary` to `primary-container` on buttons to give them a metallic, bronze-like luster that flat colors cannot replicate.

## 3. Typography
The typography is an interplay between the ancient and the modern.

- **Display & Headlines (Noto Serif / Cinzel):** Our "Stately Serif." These levels (`display-lg` to `headline-sm`) are designed to look like engraved stone. Use generous letter spacing (0.05em) for a more editorial, airy feel.
- **Body & Titles (Manrope / Jost):** Our "Clean Sans-Serif." These provide a functional contrast to the decorative serif. They are modern, geometric, and highly readable.
- **The Hierarchy Strategy:** Large display text should feel like a headline in a luxury magazine. Pair `display-md` headlines with small `label-md` uppercase sub-headers to create an immediate sense of hierarchy and sophistication.

## 4. Elevation & Depth
In "The Architectural Monolith," depth is quiet. We prioritize Tonal Layering over shadows.

- **The Layering Principle:** Stack surfaces. For example, a `surface-container-highest` navigation bar over a `surface-container` body creates natural separation.
- **Ambient Shadows:** When a "floating" effect is necessary (e.g., a primary button or a modal), use "Ambient Shadows." 
    - **Specs:** Blur: 40px, Y: 12px, Opacity: 6% of the `on-surface` color. 
    - **Shadow Color:** Never use pure black; always tint the shadow with the `on-surface` value to maintain the warm, neutral atmosphere.
- **The "Ghost Border" Fallback:** If accessibility requires a border, use `outline-variant` at **15% opacity**. It should be felt rather than seen.

## 5. Components

### Buttons
- **Primary:** High-contrast `primary` background with `on-primary` text. Use the `md` (0.75rem) roundedness to keep it feeling architectural but approachable.
- **Secondary:** Use a "Glass" approach. `surface-variant` at 40% opacity with a subtle `backdrop-blur`.

### Input Fields
- **Styling:** Forbid traditional boxes. Use a `surface-container-highest` background with a `bottom-border` only, or a fully rounded "pill" shape as seen in the "Notify Me" reference.
- **Focus State:** Transition the background to `surface-container-lowest` and increase the `on-surface` opacity.

### Cards & Lists
- **The "No Divider" Rule:** Forbid divider lines. Separate list items using `vertical white space` (minimum 24px) or subtle background shifts between items.
- **Imagery:** Cards should feature "Full Bleed" imagery with text overlays using the Glassmorphism rule to ensure readability.

### Custom Component: The "Gallery Tile"
For an artisanal brand, use asymmetrical tiles. A Gallery Tile should be a tall rectangle with a `xl` corner radius on only the top-left and bottom-right corners, mimicking a custom-cut stone.

## 6. Do's and Don'ts

### Do:
- **Do** embrace white space. If a section feels crowded, double the padding. High-end brands "waste" space to show they can afford it.
- **Do** use `notoSerif` for storytelling and `manrope` for utility.
- **Do** use subtle background transitions to guide the eye down the page.

### Don't:
- **Don't** use 100% opaque, high-contrast borders. It breaks the "monolithic" feel.
- **Don't** use standard "drop shadows." They look digital and cheap. Stick to tonal layering and ambient blurs.
- **Don't** use bright, saturated colors outside the `primary` bronze/gold range. The palette must remain serene and stone-like.
- **Don't** use center-alignment for everything. Use "Weighted Asymmetry"—place a large image on the left and a small, perfectly typeset block of text on the right.