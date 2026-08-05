# NovaStars Motion Bible v1.0
## Motion Physics, Micro-Interactions & Particle System Guide for NovaStars Studio

---

## 1. Executive Summary & Motion Philosophy

The **NovaStars Motion Bible v1.0** defines the animation curves, timing scales, camera behaviors, particle physics, and micro-interaction specifications across NovaStars.

* **Core Motion Directive:** Motion in NovaStars must feel elastic, physical, and alive—like playing with springy physical toys.
* **The Nintendo Focus Principle:** At any given moment on any screen, there shall be **ONLY ONE primary attention animation**. Secondary elements remain static until touched.
* **Zero Implementation Code:** This document specifies pure motion physics, curve mathematical profiles, keyframe timelines, particle parameters, and camera mechanics.

---

## 2. Motion Timing & Spring Physics System

```
                         SPRING CURVE PROFILES
    ELASTIC SNAP (Buttons/Pops)            SOFT CUSHION (Modals/Slides)
      1.5 ───┐                             1.0 ─────────────┐
             │   /\                                         │   /───────
      1.0 ───┼──/  \───────                0.5 ───┼──/
             │ /                                  │ /
      0.0 ───┴──────────────               0.0 ───┴──────────────
             0ms      280ms                       0ms      450ms
```

### 2.1 Cubic-Bezier Physics Curves

| Curve Class | Cubic-Bezier Profile | Physical Characteristic | Application Scope |
| :--- | :--- | :--- | :--- |
| `curve.elastic-snap` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Over-shooting elastic spring pop | Button releases, star pops, card selection |
| `curve.soft-cushion` | `cubic-bezier(0.25, 1.0, 0.5, 1)` | Smooth deceleration cushion | Modal pop-ins, card slide transitions |
| `curve.instant-compress`| `cubic-bezier(0.0, 0.0, 0.2, 1)` | Linear sharp compression | Touch down button bevel press (+4px Y) |
| `curve.breathing` | `cubic-bezier(0.45, 0.05, 0.55, 0.95)` | Soft organic sine wave loop | Idle character breathing (`scaleY(1.04)`) |

### 2.2 Standard Duration Scale
* **`duration.instant` (120ms):** Touch compression, immediate button press down.
* **`duration.standard` (280ms):** Button elastic spring release, card selection pulse.
* **`duration.cushion` (450ms):** Screen transition slide, modal window entrance.
* **`duration.celebration` (2800ms):** Full multi-stage reward sequence (Trophy spin + Confetti + Count-up).

---

## 3. Micro-Interactions Specification

### 3.1 Button Press Micro-Interaction
1. **Touch Down (0–120ms):**
   - Y-Translation: `translateY(0px)` → `translateY(+4px)`
   - Scale: `scale(1.00)` → `scale(0.97)`
   - Shadow Bevel: 6px → 2px offset
   - Sound Trigger: `sfx_btn_heavy_bounce` (< 20ms)
2. **Touch Release (120–280ms):**
   - Y-Translation: `translateY(+4px)` → `translateY(0px)`
   - Scale: `scale(0.97)` → `scale(1.04)` → `scale(1.00)` (`curve.elastic-snap`)
   - Visual Emission: 3x micro-star sparks emit from button corners

### 3.2 Card Drag & Snap Micro-Interaction (Mini Games)
1. **Selection Touch (0–150ms):** Card lifts up `-4px`, scales `1.05x`, tilts `-2deg`, shadow expands.
2. **Magnetic Approach (Target Proximity < 48px):** Target zone pulses green stroke, attracting the card visually.
3. **Drop Release (0–280ms):** Card snaps into slotted position with elastic bounce, emitting `sfx_magnetic_snap`.

---

## 4. Particle System Specifications

NovaStars uses a lightweight 2D canvas particle engine for reward moments.

```
                  ┌─────────────────────────────────────────┐
                  │        PARTICLE SYSTEM EMISSIONS        │
                  └────────────────────┬────────────────────┘
                                       │
         ┌──────────────────┬──────────┴──────────┬──────────────────┐
         ▼                  ▼                     ▼                  ▼
┌─────────────────┐┌─────────────────┐  ┌─────────────────┐┌─────────────────┐
│ STARBURST POP   ││ CONFETTI CANNON │  │   XP SPARKLE    ││  STREAK FLAME   │
├─────────────────┤├─────────────────┤  ├─────────────────┤├─────────────────┤
│ Count: 16 stars ││ Count: 80 pieces│  │ Count: 12 sparks││ Count: 6 embers │
│ Speed: 180px/s  ││ Gravity: 0.25g  │  │ Trail: Ascending││ Motion: Floating│
│ Lifespan: 850ms ││ Lifespan: 2800ms│  │ Lifespan: 600ms ││ Lifespan: 900ms │
└─────────────────┘└─────────────────┘  └─────────────────┘└─────────────────┘
```

### 4.1 Particle Types & Parameters

| Particle System | Particle Count | Shapes & Colors | Gravity / Drag | Lifespan | Trigger Event |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **StarBurst Burst** | 16 stars | Golden 4-point stars (`#FDE047`) | Radial blast, friction 0.92 | 850ms | Star badge click, Stage pass |
| **Victory Confetti**| 80 pieces | Rectangles & Circles (Multicolor) | Gravity `+0.25`, Air Drag `0.98` | 2800ms | Celebration modal open |
| **XP Sparkle Trail**| 12 sparks | Small diamond sparks (`#F59E0B`) | Upward float (`-1.2px/frame`) | 600ms | XP counter increase |
| **Boss Hit Impact** | 20 sparks | Fiery orange sparks (`#F97316`) | Radial explosion, friction 0.88 | 500ms | Correct answer on Boss HP |

---

## 5. Camera & Screen Transitions

### 5.1 Viewport Camera System
* **Orthographic 2D Viewport:** Fixed camera plane simulating a physical tablet/mobile display (Aspect Ratio constrained 480x920dp).
* **Boss Screen Shake:** On boss hit, camera shifts `±8px` horizontally and `±5px` vertically over 400ms (`shake` animation sequence).

### 5.2 Staggered Cascade Entrance
* List items and option choices enter with a 60ms staggered delay (`delay = index * 60ms`), creating a cascading deck-of-cards entrance effect.

---
*End of NovaStars Motion Bible v1.0*
