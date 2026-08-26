# NovaStars Design System v1.0
## Production Foundation for NovaStars Children's Competency Learning Platform

---

## Document Control & Governance

* **Document Version:** 1.0.0
* **Status:** Approved Single Source of Truth (SSOT)
* **Target Audience:** Product Designers, UI/UX Directors, Game Artists, Flutter Engineers
* **Governance Rule:** This document defines canonical design specifications, component anatomies, layout rules, and token scales. **Zero implementation code (HTML/CSS/JS/Dart) is contained in this design system document** to guarantee maintainability and separation of concerns.

---

## 1. NovaStars Design DNA

NovaStars is an adventure-learning platform for children aged 6–10. While inspired by the child-centric UX philosophy of *Toca Life World* (tactile invitation, open agency, low cognitive friction, non-punitive safety), NovaStars possesses its own distinct visual identity, story world, and emotional resonance.

```
                  ┌─────────────────────────────────────────┐
                  │          NOVASTARS DESIGN DNA           │
                  └────────────────────┬────────────────────┘
                                       │
         ┌──────────────────┬──────────┴─────────┬──────────────────┐
         ▼                  ▼                    ▼                  ▼
┌─────────────────┐┌─────────────────┐┌─────────────────┐┌─────────────────┐
│   EMOTIONAL     ││ WORLD-BUILDING  ││ SHAPE LANGUAGE  ││ REWARD & SAFETY │
│  PERSONALITY    ││    LANGUAGE     ││   & TACTILITY   ││   PHILOSOPHY    │
├─────────────────┤├─────────────────┤├─────────────────┤├─────────────────┤
│ • Warm          ││ • Cosmic         ││ • Squircles     ││ • Self-Efficacy │
│ • Curious       ││   Archipelago   ││ • 3D Volume     ││ • Non-Punitive  │
│ • Brave         ││ • Starlight     ││ • Soft Radii    ││ • Small Win     │
│ • Empowering    ││   Magic         ││   (16–32px)     ││   Loops         │
└─────────────────┘└─────────────────┘└─────────────────┘└─────────────────┘
```

### 1.1 Emotional Personality
* **Warm & Encouraging:** Every visual element feels welcoming and non-judgmental. The UI acts as a gentle mentor companion, encouraging curiosity rather than testing academic performance.
* **Curious & Adventurous:** The visual environment feels alive with hidden details, magical star shimmer, and inviting paths that entice children to explore.
* **Empowering & Heroic:** Children do not view themselves as "students taking a course"; they view themselves as "Hero Cadets" unlocking life skills to heal the Cosmic Archipelago.

### 1.2 World-Building Language
* **The Cosmic Archipelago:** The learning world consists of floating magical islands (Đảo Dũng Cảm, Đảo Cảm Xúc, Đảo Bè Bạn). Each island represents a major competency domain.
* **Starlight Magic:** Star energy (Sao Nova) represents clarity, confidence, and positive choices. Visual effects draw on soft warm lighting, golden star dust, and cosmic sky gradients.
* **The Hero Guild:** Characters Su (an enthusiastic 7-year-old girl), Kem (a clever 6-year-old boy), and Sao Nova (the starlight guardian) form the core cast.

### 1.3 Shape Language & Tactile Volume
* **Squircle & Superellipse Geometry:** Sharp 90-degree corners are strictly forbidden. All containers, buttons, and cards use rounded superellipse geometry with corner radii scaled from 16px to 32px.
* **Tactile 3D Presence:** Reject flat minimalism. Components possess physical volume through double-layered 3D bevels (4px–6px bottom offsets) and soft ambient shadows, making them feel like physical rubbery toys.

### 1.4 Illustration & Character Direction
* **Proportions & Readability:** Characters have large, expressive heads (1:2.5 body ratio), oversized expressive eyes, and clear directional gazes that visually point children toward primary targets.
* **Emotional Expressiveness:** Character avatars shift expressions dynamically (Curious, Excited, Surprised, Thinking, Celebrating) to validate the child's actions in real time.

### 1.5 Reward Philosophy
* **Self-Efficacy Validation:** Rewards (XP ticks, Star pops, Badges) celebrate internal effort ("You tried a brave choice!") rather than competitive ranking.
* **Non-Punitive Guidance:** Incorrect or sub-optimal choices trigger friendly character thought bubbles ("Let's try another star path! 🌟") instead of error popups or harsh penalty indicators.

---

## 2. Design Tokens (Abstract Values)

Design Tokens represent the atomic values of the NovaStars visual identity.

### 2.1 Elevation & 3D Bevel Tokens

| Token Name | Abstract Value | Bevel Shadow Offset | Application Scope |
| :--- | :--- | :--- | :--- |
| `elevation.flat` | 0dp | 0dp | Flat background containers, inner slots |
| `elevation.subtle` | 2dp | 2dp | Small badges, list item separators |
| `elevation.card` | 4dp | 4dp | Standard content cards, story bubbles |
| `elevation.button` | 6dp | 6dp (Pressed: 2dp) | Primary, Secondary, and Accent 3D Buttons |
| `elevation.modal` | 12dp | 8dp | Storybook popups, Celebration overlays |

### 2.2 Opacity & Surface Tokens

| Token Name | Opacity Value | Blur Radius | Application Scope |
| :--- | :--- | :--- | :--- |
| `surface.opaque` | 100% (1.00) | 0dp | Standard card background |
| `surface.glass.light` | 90% (0.90) | 16dp | App header, bottom navigation bar |
| `surface.glass.dark` | 80% (0.80) | 12dp | Boss battle arena card, night sky containers |
| `overlay.backdrop` | 75% (0.75) | 10dp | Modal backdrop dimming layer |

---

## 3. Typography System

The NovaStars typography system prioritizes high legibility for young readers (ages 6–10), generous line heights, rounded terminals, and clear visual hierarchy.

```
               ┌─────────────────────────────────────────────┐
               │         TYPOGRAPHY HIERARCHY SCALE          │
               └──────────────────────┬──────────────────────┘
                                      │
   ┌───────────────────┬──────────────┼──────────────┬───────────────────┐
   ▼                   ▼              ▼              ▼                   ▼
┌──────────────┐┌─────────────┐┌────────────┐┌──────────────┐┌───────────────┐
│ DISPLAY 32pt ││ HEADING 24pt││ TITLE 20pt ││  BODY 16pt   ││ CAPTION 13pt  │
├──────────────┤├─────────────┤├────────────┤├──────────────┤├───────────────┤
│ Splash Title ││ Modal Title ││ Card Header││ Story Text   ││ Secondary     │
│ Victory Pop  ││ Screen Title││ Option Text││ Quest Details││ Node Labels   │
└──────────────┘└─────────────┘└────────────┘└──────────────┘└───────────────┘
```

### 3.1 Font Family Pairing
* **Primary Display Font (Headers, Titles, Buttons):** `Fredoka` or `Nunito Black` (Weight 800–900). Rounded display font with playful personality and high punchiness.
* **Body Font (Reading Content, Dialogues, Prompts):** `Nunito` (Weight 700 Bold). Extremely legible rounded sans-serif with high x-height for early readers.

### 3.2 Canonical Typography Scale

| Style Level | Font Size | Weight | Line Height | Letter Spacing | Target Use Cases |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | 32pt (40px) | 800 (ExtraBold) | 1.20 | +0.5px | Victory titles, Splash logo, Star celebrations |
| **Heading** | 24pt (30px) | 800 (ExtraBold) | 1.25 | 0.0px | Screen titles, Modal headers, Boss names |
| **Title** | 20pt (25px) | 800 (ExtraBold) | 1.30 | 0.0px | Card headings, Question prompts, Section headers |
| **Body** | 16pt (20px) | 700 (Bold) | 1.55 | +0.2px | Dialogue text, Scenario stories, Guidance notes |
| **Button** | 18pt (22px) | 800 (ExtraBold) | 1.20 | +0.4px | Primary 3D CTA buttons, Modal action buttons |
| **HUD / Counter**| 15pt (19px) | 800 (ExtraBold) | 1.10 | 0.0px | XP counter, Star counter, Streak numbers |
| **Badge** | 13pt (16px) | 800 (ExtraBold) | 1.15 | +0.3px | Status pills, Node tags, Small reward badges |
| **Caption** | 13pt (16px) | 600 (SemiBold) | 1.40 | 0.0px | Helper text, Subtitles, Unlocked progress text |

---

## 4. Spacing & Layout System

NovaStars uses a strict **8pt Grid System** to ensure layout consistency across tablet and mobile form factors.

### 4.1 Canonical Spacing Scale

```
 4pt    8pt    12pt    16pt      24pt        32pt          48pt
 [ ]   [  ]   [   ]   [    ]   [      ]   [        ]   [            ]
 Micro Mini   Tight   Default  Container   Section      Screen Margin
```

* **`space.4` (4pt):** Micro gaps (icon to text in badge, internal padding of small chips).
* **`space.8` (8pt):** Mini gaps (between HUD badges, stack items inside cards).
* **`space.12` (12pt):** Tight gaps (between list choices, option grid spacing).
* **`space.16` (16pt):** Default container padding (inner card padding, standard vertical gaps).
* **`space.24` (24pt):** Container margin & Section spacing (gap between major screen blocks).
* **`space.32` (32pt):** Major section dividers (distance between map nodes, modal vertical padding).
* **`space.48` (48pt):** Screen boundary margins on large devices, floating CTA bottom offset.

### 4.2 Touch Target Rules
* **Primary Action Buttons:** Minimum width 200dp, height 56dp (Web 60px).
* **Option & Grid Cards:** Minimum height 60dp, full-width touch area.
* **Map Nodes & Floating Icons:** Minimum size 56x56dp with 12dp touch hit slop extensions around visual boundaries.

---

## 5. Color System

The NovaStars color system delivers warm contrast, emotional safety, and vibrant child-appeal.

### 5.1 Palette Specifications

```
  COSMIC INDIGO       NEBULA BLUE       STARLIGHT AMBER     HERO EMERALD       SUNSET ORANGE
    #1E1B4B             #3B82F6             #F59E0B           #10B981            #F97316
 ┌─────────────┐     ┌─────────────┐     ┌─────────────┐   ┌─────────────┐    ┌─────────────┐
 │ Primary Background││ Primary Action│  │ Star / CTA  │   │ Success     │    │ Streak Flame│
 └─────────────┘     └─────────────┘     └─────────────┘   └─────────────┘    └─────────────┘
```

### 5.2 Token Definition Table

| Token Name | Hex Value | Primary Role | 3D Bevel Shadow Hex |
| :--- | :--- | :--- | :--- |
| `color.brand.cosmic-indigo` | `#1E1B4B` | Primary Night Background, Boss Header | `#0F172A` |
| `color.brand.nebula-blue` | `#3B82F6` | Primary CTAs, Story Bubbles | `#1D4ED8` |
| `color.brand.nebula-blue-dark`| `#1D4ED8` | Pressed Button Bevel, Heavy Headings | `#1E40AF` |
| `color.brand.starlight-amber`| `#F59E0B` | Stars, XP Badges, Primary Achievement CTAs | `#D97706` |
| `color.brand.hero-emerald` | `#10B981` | Success States, Victory Actions, Progress | `#047857` |
| `color.brand.sunset-orange` | `#F97316` | Streaks, Attention Focus, Exploratory Detours| `#C2410C` |
| `color.brand.supernova-pink`| `#EC4899` | Kem's Accents, Special Rewards | `#BE185D` |
| `color.brand.galaxy-purple` | `#8B5CF6` | Sao Nova Magic, Reflection Stages | `#6D28D9` |
| `color.surface.card` | `#FFFFFF` | Primary Card Container Surface | `#CBD5E1` |
| `color.surface.offwhite` | `#F8FAFC` | Screen Background Surface | `#E2E8F0` |
| `color.text.dark` | `#1E293B` | High-contrast Primary Text | N/A |
| `color.text.muted` | `#64748B` | Secondary Text, Captions | N/A |

### 5.3 Non-Punitive Color Rules
* **Strict Prohibition:** Red (`#EF4444`) is **NEVER** used to indicate failure, wrong quiz choices, or penalty states.
* **Exploratory State Color:** Sub-optimal choices trigger warm Sunset Amber/Orange (`#F97316`), communicating "Exploratory detour—try another star path!" rather than a negative failure.

---

## 6. Motion System

Motion in NovaStars is deliberate, physical, and governed by **Nintendo's Focus Principle**.

### 6.1 Nintendo's Attention Focus Principle
> **Rule:** On any screen at any given moment, there shall be **ONLY ONE primary attention animation**.

```
    INCORRECT (Visual Chaos)                    CORRECT (Nintendo Focus)
 ┌──────────────────────────────┐            ┌──────────────────────────────┐
 │ 🌟 (Bouncing Star)           │            │ 🌟 (Static Header Badge)     │
 │ 👧 (Breathing Avatar)         │            │ 👧 (Static Character)        │
 │ ⚡ (Pulsing XP Badge)        │            │ ⚡ (Static XP Badge)         │
 │ 🗺️ [PULSING PRIMARY CTA] ⭐  │            │ 🗺️ [PULSING PRIMARY CTA] ⭐  │
 └──────────────────────────────┘            └──────────────────────────────┘
```

* **Primary CTA:** Pulsing/breathing motion is reserved strictly for the single primary call-to-action (e.g., "Tiếp Tục Phiêu Lưu" or "Bắt Đầu Sứ Mệnh").
* **Secondary Elements:** Secondary avatars, HUD badges, and cards remain static until touched.

### 6.2 Motion Timing Scale

| Motion Class | Duration | Curve Specification | Target Usage |
| :--- | :--- | :--- | :--- |
| `motion.instant` | 120ms | Linear | Touch down compression, immediate bevel shift |
| `motion.standard` | 280ms | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Button spring release, card selection bounce |
| `motion.cushion` | 450ms | `cubic-bezier(0.25, 1.0, 0.5, 1)` | Modal entrance, card slide-in |
| `motion.celebration`| 2800ms | Multi-stage keyframe sequence | Trophy pop, starburst explosion, XP count-up |

---

## 7. Sound & Micro-Audio System

Audio micro-feedback provides instant physical validation for young children.

| Event Type | Audio Trigger Name | Latency Target | Sound Characteristic |
| :--- | :--- | :--- | :--- |
| **Standard Touch** | `sfx_tap_pop` | < 20ms | Crisp, high-pitched wooden toy pop |
| **Primary CTA Press** | `sfx_btn_heavy_bounce` | < 20ms | Deep springy rubber bounce |
| **Card Drag Snap** | `sfx_magnetic_snap` | < 20ms | Satisfying metallic-bubble snap |
| **Correct Choice** | `sfx_star_chime` | < 20ms | Two-note ascending golden bell chime |
| **Exploratory Choice**| `sfx_curious_wobble` | < 20ms | Soft marimba wobble (non-punitive) |
| **Stage Complete** | `sfx_fanfare_short` | Synchronized | Orchestral starburst chime |

---

## 8. Component Specifications (Anatomy & State Matrices)

This section defines the canonical anatomy and complete state behavior for NovaStars' core component library.

---

### 8.1 Component: `NSButton`

#### Anatomy
1. **Top Surface Container:** Rounded rectangle (Radius 22px).
2. **3D Bevel Shadow Layer:** Bottom layer (Height 6px) colored with dark bevel token.
3. **Leading Icon Slot:** Optional 24x24dp emoji or vector icon.
4. **Label Text:** Typography style `Button` (18pt ExtraBold, White).
5. **Trailing Star/Arrow:** Optional indicator icon.

```
       ┌─────────────────────────────────────────┐ ──┐
       │  🚀   Bắt Đầu Hành Trình!              │   │ Top Surface (Height 56px)
       └─────────────────────────────────────────┘ ──┼── Bevel Layer (Height 6px)
       └─────────────────────────────────────────┘ ──┘
```

#### State Matrix

| State | Top Surface Color | Bevel Shadow Color | Y-Translation Offset | Shadow Blur |
| :--- | :--- | :--- | :--- | :--- |
| **Default (Primary)**| `nebula-blue` | `nebula-blue-dark` | 0px | 0 10px 20px rgba(59,130,246,0.35) |
| **Pressed** | `nebula-blue` | `nebula-blue-dark` | +4px (Bevel collapses to 2px) | 0 2px 8px rgba(59,130,246,0.2) |
| **Accent (Default)**| `starlight-amber`| `#D97706` | 0px | 0 10px 20px rgba(245,158,11,0.35) |
| **Green (Victory)** | `hero-emerald` | `#047857` | 0px | 0 10px 20px rgba(16,185,129,0.35) |
| **Disabled** | `#CBD5E1` | `#94A3B8` | +4px | None |
| **Loading** | `nebula-blue` | `nebula-blue-dark` | +2px | Spinner replaces icon |

---

### 8.2 Component: `NSCard`

#### Anatomy
1. **Container Surface:** White or glass background (Radius 24px).
2. **Border Stroke:** 3.5px solid stroke (`#E2E8F0`).
3. **3D Bottom Bevel:** 6px bottom shadow offset (`#CBD5E1`).
4. **Header Slot:** Optional character avatar + title.
5. **Body Slot:** Content, story dialogue, or mini game components.

#### State Matrix

| State | Border Stroke | Background Color | Bevel Shadow Offset | Behavior |
| :--- | :--- | :--- | :--- | :--- |
| **Default** | `#E2E8F0` (3.5px) | `#FFFFFF` | 6px (`#CBD5E1`) | Static resting card |
| **Hover / Focused**| `nebula-blue` (3.5px)| `#F0F9FF` | 8px (`#93C5FD`) | Elevates -2px |
| **Selected (Correct)**| `hero-emerald` (3.5px)| `#ECFDF5` | 6px (`#059669`) | Green glow, star pop |
| **Selected (Explore)**| `sunset-orange` (3.5px)| `#FFF7ED` | 6px (`#EA580C`) | Orange wobble hint |

---

### 8.3 Component: `NSHUD`

#### Anatomy
1. **Pill Container:** Full capsule radius (9999px), height 36px.
2. **Icon Badge:** 24x24px rounded circle containing Star (⭐), XP (⚡), or Streak (🔥).
3. **Counter Text:** Typography style `HUD` (15pt ExtraBold).

#### State Matrix

| HUD Variant | Background Gradient | Border Stroke | Text Color | Icon Pulse Rule |
| :--- | :--- | :--- | :--- | :--- |
| **Stars HUD** | `#FEFCE8` to `#FEF08A` | `#FDE047` (2.5px) | `#D97706` | Pulses +15% on star earn |
| **XP HUD** | `#FFF7ED` to `#FFEDD5` | `#FED7AA` (2.5px) | `#C2410C` | Ticks count-up on XP earn |
| **Streak HUD** | `#FEF2F2` to `#FEE2E2` | `#FCA5A5` (2.5px) | `#B91C1C` | Flame wiggles on streak update |

---

### 8.4 Component: `NSAvatar`

#### Anatomy
1. **Avatar Circle Frame:** Circle (Width/Height 58px to 86px).
2. **Character Expression Illustration:** Su, Kem, or Sao Nova.
3. **Outer Border Ring:** 4px solid white stroke with shadow.
4. **Status Badge Indicator:** Optional level or emotion star badge overlay.

#### State Matrix

| State | Animation Behavior | Eye Contact Spec | Reactive Sound Trigger |
| :--- | :--- | :--- | :--- |
| **Idle** | Breathing vertical stretch (1.00 to 1.04) | Looks straight ahead | None |
| **Interactive Tap**| Squish-and-pop bounce (`scale(1.15)`) | Looks down toward child's finger | `sfx_character_giggle` |
| **Active Speaker**| Subtle talking tilt (±3 deg) | Tracks active dialogue box | `sfx_voice_cue` |

---

### 8.5 Component: `NSModal`

#### Anatomy
1. **Backdrop Layer:** 75% dark indigo overlay with 10dp blur.
2. **Modal Card Window:** Max width 420px, radius 32px, 4px top accent border.
3. **Header Character Avatar:** Floating 64x64px avatar overlapping top border.
4. **Title & Body Area:** Heading (24pt) + Body (16pt).
5. **Action CTA Stack:** Single or dual vertical 3D button stack.

#### State Matrix

| Modal Type | Top Accent Border | Primary Action Button | Exit Trigger |
| :--- | :--- | :--- | :--- |
| **Storybook Briefing**| `nebula-blue` (8px) | "Bắt Đầu Sứ Mệnh 🚀" | Top-right X button or CTA tap |
| **Celebration Victory**| `starlight-amber` (8px)| "Nhận Thưởng & Tiếp Tục 🎉"| Primary CTA tap only |
| **Exploratory Hint** | `sunset-orange` (8px) | "Thử Lại Nhé 🔄" | Primary CTA tap only |

---

### 8.6 Component: `NSProgressBar`

#### Anatomy
1. **Track Container:** Capsule radius (9999px), height 16px, background `#E2E8F0`, inset shadow.
2. **Fill Bar:** Linear gradient (`#F59E0B` to `#10B981`), rounded end cap.
3. **Star Checkpoint Nodes:** 20x20px star nodes placed along track percentage milestones.

#### State Matrix

| State | Fill Behavior | Milestone Node Reaction |
| :--- | :--- | :--- |
| **Progressing** | Smooth spring expansion (`450ms cushion`) | Star node expands and glows on pass |
| **Completed** | Full 100% emerald glow | All checkpoint stars burst golden dust |

---

### 8.7 Component: `NSBadge`

#### Anatomy
1. **Shield Container:** Rounded 3D polygon or circular medal (Radius 16px).
2. **Center Icon:** 32x32px 3D vector trophy, medal, or competency symbol.
3. **Ribbon Banner:** Bottom text banner with typography `Badge` (13pt ExtraBold).

#### State Matrix

| State | Visual Treatment | Unlock Animation |
| :--- | :--- | :--- |
| **Locked** | Grayscale 50% opacity, padlocked badge | None |
| **Unlocked** | Full vibrant gold/emerald gradient, 3D shadow | 360-degree spin + starburst particle pop |

---

## 9. Screen Layout Rules (Demo v0.1 Scope)

This section establishes explicit structural layout rules for the **7 core Playable Demo screens**, enforcing the Nintendo Focus Principle and child ergonomics.

```
       1. SPLASH           2. FTUE ONBOARDING      3. HOME BASE (HERO HUB)
   ┌──────────────┐        ┌──────────────┐        ┌──────────────┐
   │ 🌟 STAR LOGO │        │ 👧 CHOOSE    │        │ 👧 SU PROFILE│
   │              │        │    AVATAR    │        │              │
   │  [PROGRESS]  │        │  [START CTA] │        │  [CONTINUE]  │
   └──────────────┘        └──────────────┘        └──────────────┘

       4. WORLD MAP        5. MISSION INTRO        6. LESSON RUNNER       7. CELEBRATION
   ┌──────────────┐        ┌──────────────┐        ┌──────────────┐        ┌──────────────┐
   │ 🏝️ FLOATING  │        │ 📖 STORYBOOK │        │ 📍 HUD TRACK │        │ 🏆 TROPHY POP│
   │    ISLAND    │        │    POPUP     │        │ 💬 SCENARIO  │        │              │
   │ (ACTIVE NODE)│        │ [BEGIN MISSION]       │ [CHOICE CARDS│        │  [CLAIM CTA] │
   └──────────────┘        └──────────────┘        └──────────────┘        └──────────────┘
```

---

### 9.1 Screen: Splash Screen
* **Layout Structure:** Single vertical column centered on screen.
* **Primary Attention Focus (Nintendo Rule):** Glowing NovaStars Star Logo (Soft 2-second breathing pulse).
* **Elements Order:**
  1. Top spacer (flex 1).
  2. NovaStars Glowing Logo (96x96dp).
  3. App Title (Display 32pt, Amber `#FDE047`).
  4. Subtitle ("Phiêu Lưu Học Kỹ Năng Sống", Body 16pt).
  5. Capsule Progress Bar (`NSProgressBar`, width 220dp).
  6. Loading status caption ("Đang tải thế giới phiêu lưu...", Caption 13pt).
  7. Bottom spacer (flex 1).

---

### 9.2 Screen: FTUE Onboarding
* **Layout Structure:** Full-screen modal overlay with central hero greeting card.
* **Primary Attention Focus (Nintendo Rule):** Giant glowing 3D CTA Button ("Bắt Đầu Hành Trình Ngay! 🚀").
* **Elements Order:**
  1. Header Sao Nova star icon (72x72dp).
  2. Greeting Title (Heading 24pt, "Chào Mừng Đến NovaStars!").
  3. Avatar Picker Row (Su 👧, Kem 👦, Sao Nova 🌟 selectable chips).
  4. Story Objective Card ("Sứ Mệnh 1: Đảo Dũng Cảm → Bài 1: Lời Chào Ngôi Sao").
  5. Primary 3D CTA Button (`NSButton`, Amber/Blue, width 100%).

---

### 9.3 Screen: Home Base (Cozy Hero Hub)
* **Layout Structure:** Header HUD top → Vertical scroll body → Bottom Navigation Bar.
* **Primary Attention Focus (Nintendo Rule):** Glowing "Tiếp Tục Phiêu Lưu 🗺️" Hero Card CTA.
* **Elements Order:**
  1. Header Bar (`NSLayoutHeader` with XP and Star HUD badges).
  2. Hero Profile Card:
     - Avatar Su (`NSAvatar`, 68x68dp, static).
     - Hero Name ("Chào Su!") & Level Badge ("Ngôi Sao Tập Sự").
     - Streak Indicator ("🔥 Chuỗi 3 Ngày").
     - **Pulsing Hero CTA Button** ("Tiếp Tục Phiêu Lưu 🗺️").
  3. Daily Quest Scrolls Card:
     - Section Title ("🎯 Nhiệm Vụ Hằng Ngày").
     - 2x Quest Item Rows with XP reward badges.
  4. Bottom Navigation Bar (`NSBottomNav`, Active Tab: `home`).

---

### 9.4 Screen: World Map (Floating Island Environmental Storytelling)
* **Layout Structure:** Header HUD top → Scrollable Floating Island Terrain → Bottom Navigation Bar.
* **Primary Attention Focus (Nintendo Rule):** Pulsing Hero Avatar Marker on Active Node 1.
* **Environmental Storytelling Specs:**
  - Background: Floating island terrain gradient (`#E0F2FE` to `#F0FDFA`) with subtle cloud landmarks.
  - Path Layout: Winding dotted path connecting Node 1 → Node 2 → Boss Lair.
* **Node Elements Order:**
  1. **Active Node 1 Card (Lesson Zero):**
     - Pulsing Hero Marker Flag ("Bắt Đầu Học!").
     - Title ("Bài 1: Lời Chào Ngôi Sao").
     - Subtitle ("Chào Hỏi Lịch Lựa & Tự Tin").
     - Badge Row (⭐ 3 Stars + Status Pill).
  2. Winding Path Divider Ring.
  3. **Node 2 Card (Locked/Unlocked):**
     - Padlock icon / Lesson title ("Bài 2: Từ Chối Người Lạ").
  4. Winding Path Divider Ring.
  5. **Island Boss Lair Peak (Dragon Lair):**
     - Dark Indigo Lair Card with Boss Dragon icon (🐉) and star requirement caption.

---

### 9.5 Screen: Mission Intro Briefing Modal
* **Layout Structure:** Storybook popup card window centered over dimmed backdrop.
* **Primary Attention Focus (Nintendo Rule):** Pulsing Green 3D CTA Button ("Bắt Đầu Sứ Mệnh 🚀").
* **Elements Order:**
  1. Top Header Bar: Island Tag ("🗺️ Đảo Dũng Cảm") + Close X Button.
  2. Mission Star Badge Icon (56x56dp).
  3. Mission Title (Heading 24pt, "Bài 1: Lời Chào Ngôi Sao").
  4. Competency Subtitle ("Học cách tự tin chào hỏi & kết bạn").
  5. Reward Preview Box (XP + Star Badges + Medal Badge Preview).
  6. **Pulsing Green 3D Action Button** (`NSButton`, width 100%).

---

### 9.6 Screen: Lesson Runner (Stage Shell)
* **Layout Structure:** Header Progress Track top → Scrollable Interactive Stage Body → Modal Overlay Slot.
* **Primary Attention Focus (Nintendo Rule):** Active Stage Target (e.g., Drag item or Choice Option).
* **Elements Order:**
  1. Header Shell: Back Button (←) + Capsule Progress Track (`NSProgressBar`) + Star/XP HUD.
  2. Stage Indicator Pill ("📍 Màn X / 6: [Stage Title]").
  3. Stage Content Container:
     - Story Bubble / Mini Game / Boss Arena / Reflection Card.
  4. Bottom Action Bar (when applicable).

---

### 9.7 Screen: Celebration Victory Screen
* **Layout Structure:** Full-screen modal overlay over dimmed blurred background.
* **Primary Attention Focus (Nintendo Rule):** Giant Spinning Golden Star Trophy (3D Starburst).
* **Elements Order:**
  1. **Spinning Golden Trophy Icon** (80x80dp with golden glow rays).
  2. Victory Title (Display 32pt, "Chúc Mừng Ngôi Sao! 🎉").
  3. Unlocked Medal Name ("🏅 Ngôi Sao Giao Tiếp").
  4. Reward Badges Stack (XP count-up + Star count-up).
  5. Vertical Button Stack:
     - **Primary Action Button** ("Nhận Thưởng & Về Trang Chủ 📖").
     - Secondary Action Button ("Chơi Lại Bài Học 🔄").

---
*End of NovaStars Design System v1.0*
