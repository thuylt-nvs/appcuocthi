# NovaStars Component Library v1.0
## Production Component Specifications, Anatomies, Variants & State Matrices

---

## 1. Executive Summary & Governance

The **NovaStars Component Library v1.0** provides the definitive specification for all reusable UI components.

* **Single Source of Truth:** Replaces ad-hoc widget creation with standardized anatomies, variant taxonomies, state matrices, and behavioral rules.
* **Inheritance:** Built on top of *NovaStars Design System v1.0*. Enforces 8pt grid spacing, 3D bevel depths, squircle radii, and tactile touch feedback.
* **Zero Implementation Code:** This document specifies abstract component anatomies, layout slots, state behaviors, and accessibility targets without embedding framework-specific code.

---

## 2. Master Component Taxonomies

```
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │                      NOVASTARS COMPONENT LIBRARY                            │
 └──────┬────────────┬─────────────┬────────────┬─────────────┬─────────┬──────┘
        │            │             │            │             │         │
        ▼            ▼             ▼            ▼             ▼         ▼
    ┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐  ┌────────┐
    │NSBUTTON│   │ NSCARD │   │ NSHUD  │   │NSAVATAR│   │NSMODAL │  │NSBADGE │
    └────────┘   └────────┘   └────────┘   └────────┘   └────────┘  └────────┘
```

---

## 3. Detailed Component Specifications

---

### 3.1 Component: `NSButton`

#### 3.1.1 Overview & Role
Primary interactive action control. Features double-layered 3D volume that compresses on touch down to give children tactile physical feedback.

#### 3.1.2 Anatomy & Layout Slots
* **Slot 1 (Surface Container):** Rounded rectangle (Radius 22px, min-height 56dp).
* **Slot 2 (Bevel Layer):** Bottom shadow layer (6px height offset, darker tone).
* **Slot 3 (Leading Icon):** 24x24dp optional emoji/vector icon.
* **Slot 4 (Label Text):** Typography `Button` (18pt ExtraBold, White).
* **Slot 5 (Trailing Arrow/Star):** 20x20dp optional status icon.

#### 3.1.3 Variants & Color Tokens

| Variant Name | Top Surface Color | Bevel Layer Color | Usage Purpose |
| :--- | :--- | :--- | :--- |
| **`NSButton.primary`** | `nebula-blue` (`#3B82F6`) | `nebula-blue-dark` (`#1D4ED8`)| Default primary progression CTAs |
| **`NSButton.accent`** | `starlight-amber` (`#F59E0B`)| `#D97706` | Major achievements & star claims |
| **`NSButton.green`** | `hero-emerald` (`#10B981`) | `#047857` | Victory, mission completion, stage pass |
| **`NSButton.secondary`**| `#F1F5F9` (Off-white) | `#CBD5E1` | Cancel, replay, secondary actions |

#### 3.1.4 Complete State Matrix

| State Name | Surface Translation | Bevel Height | Label Opacity | Micro-Sound Trigger |
| :--- | :--- | :--- | :--- | :--- |
| **Default** | `translateY(0px)` | 6px | 100% (1.00) | None |
| **Pressed** | `translateY(+4px)` | 2px | 100% (1.00) | `sfx_btn_heavy_bounce` (< 20ms) |
| **Hover / Focus** | `translateY(-2px)` | 8px | 100% (1.00) | Soft highlight shimmer |
| **Disabled** | `translateY(+4px)` | 2px (`#CBD5E1`)| 50% (0.50) | None (non-interactive) |
| **Loading** | `translateY(+2px)` | 4px | 0% (Hidden) | Center spinner active |

---

### 3.2 Component: `NSCard`

#### 3.2.1 Overview & Role
Universal content container for story dialogues, quest lists, daily missions, and mini-game option cards.

#### 3.2.2 Anatomy & Layout Slots
* **Slot 1 (Surface Background):** White or glass container (Radius 24px).
* **Slot 2 (Border Stroke):** 3.5px solid stroke (`#E2E8F0`).
* **Slot 3 (Bottom Bevel):** 6px bottom shadow offset (`#CBD5E1`).
* **Slot 4 (Header Avatar):** Optional floating character avatar.
* **Slot 5 (Body Content):** Custom view slot.

#### 3.2.3 Variants & State Matrix

| Card Variant | Background Color | Border Color | Bevel Shadow | Interaction Behavior |
| :--- | :--- | :--- | :--- | :--- |
| **`NSCard.base`** | `#FFFFFF` | `#E2E8F0` (3.5px) | `#CBD5E1` (6px) | Static content container |
| **`NSCard.story`** | `#FFFFFF` | `nebula-blue-light` (4px)| `#93C5FD` (6px) | Dialogue bubble with character header |
| **`NSCard.hero`** | Gradient `#DBEAFE`→`#EFF6FF`| `#93C5FD` (3.5px) | `#3B82F6` (6px) | Main profile card on Home Base |
| **`NSCard.choice`** | `#FFFFFF` | `#E2E8F0` (3.5px) | `#CBD5E1` (5px) | Tap-to-select option card |
| **`NSCard.choice-correct`**| `#ECFDF5` | `hero-emerald` (3.5px) | `#059669` (5px) | Correct answer green glow |
| **`NSCard.choice-explore`**| `#FFF7ED` | `sunset-orange` (3.5px) | `#EA580C` (5px) | Exploratory detour orange hint |

---

### 3.3 Component: `NSHUD`

#### 3.3.1 Overview & Role
Head-up display badge positioned in the app header to reflect child's accumulated Stars, XP, and active Streaks.

#### 3.3.2 Anatomy & Variants
* **Structure:** Capsule pill (Radius 9999px, height 36px, padding 6px 14px).
* **Variants:**
  - **`NSHUD.stars`:** Gold gradient (`#FEFCE8` to `#FEF08A`), Star icon (⭐), text color `#D97706`.
  - **`NSHUD.xp`:** Orange gradient (`#FFF7ED` to `#FFEDD5`), XP Spark icon (⚡), text color `#C2410C`.
  - **`NSHUD.streak`:** Red/Orange gradient (`#FEF2F2` to `#FEE2E2`), Flame icon (🔥), text color `#B91C1C`.

---

### 3.4 Component: `NSAvatar`

#### 3.4.1 Overview & Role
Character representation badge (Su, Kem, Sao Nova) providing real-time emotional feedback.

#### 3.4.2 Anatomy & State Matrix
* **Structure:** Circular container (Radius 50%), 4px white outer border stroke, shadow.
* **States:**
  - **Idle:** Soft vertical breathing stretch (`scaleY(1.04)`, 3s sine wave).
  - **Interactive Tap:** Squish bounce (`scale(1.15)` → `scale(1.0)`), plays `sfx_character_giggle`.
  - **Active Speaker:** Subtle tilt angle (`±3deg`), pupil gaze points to dialogue bubble.

---

### 3.5 Component: `NSModal`

#### 3.5.1 Overview & Role
Overlay window for mission briefings, story feedback, and celebration trophy popups.

#### 3.5.2 Anatomy & Variants
* **Anatomy:** 75% dark backdrop overlay with 10dp blur + Central modal card (Max-width 420px, radius 32px).
* **Variants:**
  - **`NSModal.mission-intro`:** Blue top accent border (8px), story objective card, Green CTA button.
  - **`NSModal.celebration`:** Gold top accent border (8px), spinning star trophy, XP/Star reward stack.
  - **`NSModal.hint`:** Orange top accent border (8px), character retry prompt, Accent CTA button.

---

### 3.6 Component: `NSProgressBar`

#### 3.6.1 Overview & Role
Capsule track reflecting stage progress during lesson execution.

#### 3.6.2 Anatomy & States
* **Anatomy:** Capsule track (Height 16px, background `#E2E8F0`) + Gradient fill bar (`#F59E0B` to `#10B981`) + Milestone Star Checkpoints (20x20px).
* **States:**
  - **Progressing:** Smooth width expansion (`duration.cushion` 450ms).
  - **Milestone Pass:** Star node expands `1.3x` and emits starburst particles.

---

### 3.7 Component: `NSBadge`

#### 3.7.1 Overview & Role
Collectible competency medal awarded upon completing island lessons.

#### 3.7.2 Anatomy & States
* **Anatomy:** 3D Shield container (Radius 16px) + 32x32px trophy icon + Title ribbon banner.
* **States:**
  - **Locked:** 50% opacity grayscale with padlock icon.
  - **Unlocked:** Vibrant golden emerald gradient, 3D shadow, 360-degree spin unlock animation.

---
*End of NovaStars Component Library v1.0*
