# NovaStars Art Bible v1.0
## Visual Style, Illustration & Environmental Art Guide for NovaStars Studio

---

## 1. Executive Summary & Art Vision

The **NovaStars Art Bible v1.0** establishes the definitive artistic direction for all 2D visual assets, character art, environment illustrations, lighting models, materials, and UI iconography across the NovaStars platform.

* **Core Art Directive:** Create a vibrant, warm, tactile fantasy world that feels like an interactive picture book come to life.
* **Governance & Inheritance:** Inherits 100% of Design DNA from *NovaStars Design System v1.0*. Sharp 90-degree edges are strictly forbidden. All forms follow squircle geometry, soft rounded outlines, and 3D tactile volume.
* **Zero Implementation Code:** This document contains pure artistic specifications, color swatches, proportion charts, lighting rules, and material definitions.

---

## 2. Character Art Direction & Style Guide

NovaStars features three primary characters: **Su** (Lead Hero, 7-year-old girl), **Kem** (Co-Hero, 6-year-old boy), and **Sao Nova** (Starlight Mentor Guardian).

```
 ┌────────────────────────┐  ┌────────────────────────┐  ┌────────────────────────┐
 │        BE SU 👧        │  │       BE KEM 👦        │  │     SAO NOVA 🌟        │
 ├────────────────────────┤  ├────────────────────────┤  ├────────────────────────┤
 │ • 7-year-old girl      │  │ • 6-year-old boy       │  │ • Starlight Guardian   │
 │ • Curious & Energetic  │  │ • Clever & Thoughtful  │  │ • Wise & Warm Mentor   │
 │ • Yellow/Amber Outfit  │  │ • Cyan/Blue Outfit     │  │ • Golden Glowing Aura  │
 │ • Head Ratio: 1:2.5    │  │ • Head Ratio: 1:2.5    │  │ • Floating Star Form   │
 └────────────────────────┘  └────────────────────────┘  └────────────────────────┘
```

### 2.1 Character Proportions & Anatomy Rules
* **Head-to-Body Ratio:** 1 : 2.5 (Oversized head to amplify facial emotional expression readability for young children).
* **Line Art Weight:** 3.5px solid rounded stroke outline (`#1E1B4B` Cosmic Midnight).
* **Face & Eye Anatomy:** Oversized round expressive eyes with clear directional highlights (iris shine). Pupils tilt toward active UI elements to guide child gaze tracking.
* **Hand & Feet Styling:** Soft rounded mittens/shoes without complex digit rendering to preserve clean silhouette clarity.

### 2.2 Character Expression Chart

| Expression State | Eyebrow Angle | Eye Shape | Mouth Shape | Associated UI Trigger |
| :--- | :--- | :--- | :--- | :--- |
| **Happy / Neutral** | Soft arched curve | Large circle with dual top shine dots | Wide open smile (`U` shape) | Default screen resting state |
| **Curious / Thinking**| One brow raised +5px | Slightly narrowed squint (80% height)| Small offset `o` shape | Scenario decision prompt |
| **Excited / Celebrating**| High raised (+8px) | Star-eyed (`✨` pupil overlay) | Wide open `D` smile with pink tongue | Star earned, Stage complete |
| **Encouraging Warmth**| Gentle inward slope | Soft crescent curve (`^^`) | Gentle smile with blush cheeks | Exploratory detour, retry hint |

### 2.3 Character Color Palettes

* **Su (Bé Su):**
  - Skin Tone: Warm Peach `#FDE68A`
  - Hair: Warm Chestnut `#78350F`
  - Outfit Main: Starlight Amber `#F59E0B`
  - Outfit Accent: Supernova Pink `#EC4899`
* **Kem (Bé Kem):**
  - Skin Tone: Soft Beige `#FEF3C7`
  - Hair: Dark Indigo `#1E1B4B`
  - Outfit Main: Nebula Blue `#3B82F6`
  - Outfit Accent: Hero Emerald `#10B981`
* **Sao Nova (Starlight Guardian):**
  - Core Body: Golden Glow Gradient (`#FEF08A` to `#F59E0B`)
  - Aura Outline: Soft Radial Starlight Halo (`rgba(253, 224, 71, 0.45)`)
  - Crown Star: Pure White `#FFFFFF` with sparkle rays

---

## 3. Environment & World Art Direction

The setting of NovaStars is the **Cosmic Archipelago** (Quần Đảo Ngôi Sao)—a series of floating sky islands floating in a warm indigo cosmic sea.

```
                   ┌────────────────────────────────────────┐
                   │    FLOATING ISLAND ART ARCHITECTURE    │
                   └───────────────────┬────────────────────┘
                                       │
         ┌──────────────────┬──────────┴──────────┬──────────────────┐
         ▼                  ▼                     ▼                  ▼
┌─────────────────┐┌─────────────────┐  ┌─────────────────┐┌─────────────────┐
│ SKY BACKGROUND  ││ TERRAIN BLOCKS  │  │ WINDING PATHS   ││  LANDMARKS &    │
│    GRADIENTS    ││  & VEGETATION   │  │   & NODES       ││   DECORATIONS   │
├─────────────────┤├─────────────────┤  ├─────────────────┤├─────────────────┤
│ Soft Cosmic Sky ││ Pastel Green /  │  │ Dotted Star Path││ Crystal Caves,  │
│ Soft Floating   ││ Cyan Floating   │  │ 3D Star Node    ││ Star Tree, Boss │
│ Nebula Clouds   ││ Island Islands  │  │ Badges          ││ Lair Lair Peak  │
└─────────────────┘└─────────────────┘  └─────────────────┘└─────────────────┘
```

### 3.1 Floating Island 1: Đảo Dũng Cảm (Island of Courage)
* **Terrain Visuals:** Pastel emerald green grass tops (`#A7F3D0` to `#10B981`) resting on soft cyan rocky island undersides (`#93C5FD`).
* **Environmental Landmarks:**
  - **Star Greeting Plaza (Node 1):** Bright golden sunlit clearing with a glowing star stone monument.
  - **Boundary Cave (Node 2):** Friendly crystal cave entrance with glowing purple gems.
  - **Dragon Peak Lair (Boss Lair):** Floating dark indigo peak wrapped in golden star chains.
* **Cloud Architecture:** Puffy, rounded cumulus clouds with 20% opacity white gradients floating in background layers to give depth perception.

---

## 4. Lighting, Shading & Material System

NovaStars uses a stylized 2.5D lighting model combining flat vector line art with soft ambient shading and 3D bevel volume.

### 4.1 Lighting Rules
* **Light Source Position:** Fixed Top-Left at 45 degrees (`-45deg` angle).
* **Top Highlight Spec:** White inner stroke (`rgba(255, 255, 255, 0.4)`) along the top and left edges of all buttons and cards.
* **Bottom Shadow Spec:** Dark bevel offset (`rgba(15, 23, 42, 0.15)`) along the bottom edge, creating tangible physical depth.

### 4.2 Material Definitions

| Material Class | Surface Texture | Reflection Characteristic | Visual Behavior |
| :--- | :--- | :--- | :--- |
| **Toy Plastic / Rubber** | Smooth, matte finish | Soft top highlight curve | 3D buttons, HUD pills, Action cards |
| **Glassmorphism** | Semi-transparent (90%) | 16px background blur | Headers, bottom navigation, floating popups |
| **Parchment Scroll** | Warm off-white (`#FFFBEB`) | Soft inner border stroke | Storybook dialogues, mission briefings |
| **Starlight Gold** | High saturation gradient | Sparkling particle emissions | Star trophies, reward XP badges, Sao Nova |

---

## 5. Visual Language & Iconography

* **Icon Style:** Oversized, thick 3D icons with rounded terminals and soft drop shadows.
* **Icon Metaphors:**
  - `⭐` (Star): Primary currency & mastery proof.
  - `⚡` (XP Spark): Energy, learning effort, and progress.
  - `🔥` (Streak Flame): Daily learning momentum.
  - `🏅` (Medal): Real-world competency achievement badge.
  - `🛡️` (Shield): Self-protection & boundary setting skill.
  - `📖` (Hero Journal): Personal reflection book.

---
*End of NovaStars Art Bible v1.0*
