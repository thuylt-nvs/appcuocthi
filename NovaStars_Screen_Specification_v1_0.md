# NovaStars Screen Specification v1.0
## Production Layout, Component Hierarchy & Screen Specs for Playable Demo v0.1

---

## 1. Executive Summary & Governance

The **NovaStars Screen Specification v1.0** establishes production specifications for the 7 core Playable Demo v0.1 screens.

* **Production Foundation:** Serves as the implementation spec for UI Layouts, component stacks, screen flow transitions, and attention focus targets.
* **Scope Scoping:** Strictly covers the 7 core screens: **Splash, FTUE, Home Base, World Map, Mission Intro, Lesson Runner, and Celebration**.
* **Zero Implementation Code:** Defines layout slots, padding parameters, component composition, and trigger contracts without code snippet dependencies.

---

## 2. Screen Architecture Summary (7 Demo v0.1 Screens)

```
                         SCREEN FLOW ARCHITECTURE
 ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
 │1. SPLASH     │ ──> │2. FTUE MODAL │ ──> │3. HOME BASE  │ ──> │4. WORLD MAP  │
 └──────────────┘     └──────────────┘     └──────────────┘     └──────┬───────┘
                                                                       │
 ┌──────────────┐     ┌──────────────┐     ┌──────────────┐            │
 │7.CELEBRATION │ <── │6.LESSON RUN  │ <── │5.MISSION INTRO│ <──────────┘
 └──────────────┘     └──────────────┘     └──────────────┘
```

---

## 3. Screen Specifications (Screen-by-Screen)

---

### 3.1 Screen SPEC-01: Splash Screen

* **Screen ID:** `SCR_SPLASH_01`
* **Purpose:** Initial game loading sequence establishing starlight atmosphere.
* **Layout Structure:** Single vertical flex column centered on viewport.
* **Nintendo Focus Target:** Glowing NovaStars Star Logo (2-second soft breathing pulse).
* **Component Composition:**
  1. `Spacer` (flex 1).
  2. `NSLogo` (Width 96dp, Height 96dp, Amber `#FDE047` drop shadow).
  3. `NSTitle` ("NOVASTARS", Display 32pt, ExtraBold).
  4. `NSSubtitle` ("Phiêu Lưu Học Kỹ Năng Sống", Body 16pt, `#A5B4FC`).
  5. `NSProgressBar` (Capsule width 220dp, progress fill 0% → 100% over 1800ms).
  6. `NSCaption` ("Đang tải thế giới phiêu lưu...", Caption 13pt, `#CBD5E1`).
  7. `Spacer` (flex 1).
* **Transition Contract:** Upon progress completion, automatically triggers smooth portal zoom into `SCR_FTUE_02` or `SCR_HOME_03`.

---

### 3.2 Screen SPEC-02: FTUE Onboarding Modal

* **Screen ID:** `SCR_FTUE_02`
* **Purpose:** First-time user onboarding card establishing character selection & initial mission within 10 seconds.
* **Layout Structure:** Full-screen dimmed backdrop overlay with centered hero modal window.
* **Nintendo Focus Target:** Primary 3D CTA Button ("Bắt Đầu Hành Trình Ngay! 🚀").
* **Component Composition:**
  1. Backdrop Layer (75% dark indigo overlay with 10dp backdrop blur).
  2. `NSModal` Container (Radius 32px, max-width 420dp).
  3. Header Icon (Sao Nova starlight star 72x72dp).
  4. Title (`NSHeading` 24pt, "Chào Mừng Đến NovaStars!").
  5. Avatar Selection Row: 3x `NSAvatar` chips (Su 👧, Kem 👦, Sao Nova 🌟).
  6. Mission Card (`NSCard.story`, "Sứ Mệnh 1: Đảo Dũng Cảm → Bài 1: Lời Chào Ngôi Sao").
  7. **Pulsing CTA Button** (`NSButton.primary`, label: "Bắt Đầu Hành Trình Ngay! 🚀").
* **Interaction Trigger:** Tapping CTA stores character selection and navigates to `SCR_HOME_03`.

---

### 3.3 Screen SPEC-03: Home Base (Cozy Hero Hub)

* **Screen ID:** `SCR_HOME_03`
* **Purpose:** Central game hub displaying child progress, streak momentum, and primary adventure CTA.
* **Layout Structure:** Header Bar top → Scrollable Content Column → Bottom Navigation Bar.
* **Nintendo Focus Target:** Glowing Hero Card CTA Button ("Tiếp Tục Phiêu Lưu 🗺️").
* **Component Composition:**
  1. Header (`NSLayoutHeader` with `NSHUD.stars` and `NSHUD.xp`).
  2. Hero Profile Card (`NSCard.hero`):
     - `NSAvatar` Su (68x68dp, static).
     - Hero Name ("Chào Su!") & Title ("Ngôi Sao Tập Sự").
     - `NSHUD.streak` ("🔥 Chuỗi 3 Ngày").
     - **Pulsing Action CTA** (`NSButton.primary`, "Tiếp Tục Phiêu Lưu 🗺️").
  3. Daily Quests Card (`NSCard.base`):
     - Title (`NSTitle` 20pt, "🎯 Nhiệm Vụ Hằng Ngày").
     - 2x Quest Item Rows with `NSHUD.xp` reward badges (+20 XP).
  4. Bottom Navigation (`NSBottomNav`, Active Tab: `home`).
* **Interaction Trigger:** Tapping Hero CTA navigates to `SCR_MAP_04`.

---

### 3.4 Screen SPEC-04: World Map (Floating Island Environmental Storytelling)

* **Screen ID:** `SCR_MAP_04`
* **Purpose:** Interactive floating island map driving natural curiosity and exploration.
* **Layout Structure:** Header Bar top → Scrollable Island Terrain Surface → Bottom Navigation Bar.
* **Nintendo Focus Target:** Pulsing Hero Marker Flag on Active Node 1.
* **Component Composition:**
  1. Header (`NSLayoutHeader` with Stars & XP HUD).
  2. Island Background Surface (Terrain gradient `#E0F2FE` to `#F0FDFA` with background clouds).
  3. **Node 1 Active Card (Lesson Zero):**
     - Pulsing Hero Marker Flag ("Bắt Đầu Học!").
     - Node Title ("Bài 1: Lời Chào Ngôi Sao").
     - Status Badges (`NSHUD.stars` ⭐ 3 Stars + Status Pill "🚀 Học Ngay").
  4. Winding Path Divider Ring.
  5. **Node 2 Card (Locked/Unlocked):**
     - Padlock Icon + Title ("Bài 2: Từ Chối Người Lạ").
  6. Winding Path Divider Ring.
  7. **Boss Dragon Lair Lair Card:**
     - Dark Indigo Lair Card + Boss Dragon icon (🐉) + Star Requirement Caption ("🔒 Cần 5 Ngôi Sao").
  8. Bottom Navigation (`NSBottomNav`, Active Tab: `map`).
* **Interaction Trigger:** Tapping Active Node 1 opens `SCR_INTRO_05`.

---

### 3.5 Screen SPEC-05: Mission Intro Briefing Modal

* **Screen ID:** `SCR_INTRO_05`
* **Purpose:** Storybook briefing modal establishing mission objectives and reward incentives.
* **Layout Structure:** Centered storybook modal overlay over dimmed map backdrop.
* **Nintendo Focus Target:** Pulsing Green 3D Action CTA ("Bắt Đầu Sứ Mệnh 🚀").
* **Component Composition:**
  1. Modal Container (`NSModal.mission-intro`, Blue top border accent 8px).
  2. Island Header Tag ("🗺️ Đảo Dũng Cảm") + Close Button.
  3. Mission Star Badge Icon (56x56dp).
  4. Title (`NSHeading` 24pt, "Bài 1: Lời Chào Ngôi Sao").
  5. Subtitle (`NSBody` 16pt, "Học cách tự tin chào hỏi & kết bạn").
  6. Reward Preview Box (`NSHUD.xp` + `NSHUD.stars` + Medal Badge Preview).
  7. **Pulsing Green CTA Button** (`NSButton.green`, "Bắt Đầu Sứ Mệnh 🚀").
* **Interaction Trigger:** Tapping CTA starts Lesson Runner `SCR_RUNNER_06`.

---

### 3.6 Screen SPEC-06: Lesson Runner (Stage Shell)

* **Screen ID:** `SCR_RUNNER_06`
* **Purpose:** Stage-by-stage orchestrator running the 6 lesson stages (Pretest → Story → Mini Game → Boss → Reflection → Parent).
* **Layout Structure:** Header Progress Track top → Scrollable Interactive Stage Body.
* **Nintendo Focus Target:** Active Stage Control (e.g., Drag Item or Choice Option Card).
* **Component Composition:**
  1. Top Progress Header: Back Button (←) + `NSProgressBar` + Stars/XP HUD.
  2. Stage Pill Indicator ("📍 Màn X / 6: [Stage Title]").
  3. Active Stage Body Container:
     - Stage 1 (Pretest): `NSCard.choice` questions.
     - Stage 2 (Story): `NSCard.story` dialogue bubble + Su avatar.
     - Stage 3 (Mini Game): Drag/Match/Sequence builder card.
     - Stage 4 (Boss): `NSBossArena` card + HP bar + Scenario cards.
     - Stage 5 (Reflection): Hero Journal emotion sticker book.
     - Stage 6 (Parent): Real-life parent confirmation certificate.
* **Transition Contract:** Completing Stage 6 triggers `SCR_CELEBRATION_07`.

---

### 3.7 Screen SPEC-07: Celebration Victory Screen

* **Screen ID:** `SCR_CELEBRATION_07`
* **Purpose:** Peak dopamine victory reward screen celebrating child effort.
* **Layout Structure:** Full-screen victory overlay modal.
* **Nintendo Focus Target:** Spinning Golden Star Trophy (80x80dp with starburst).
* **Component Composition:**
  1. Spinning Star Trophy Icon (`80x80dp`, Golden Glow Rays).
  2. Victory Title (`NSDisplay` 32pt, "Chúc Mừng Ngôi Sao! 🎉").
  3. Unlocked Medal Name (`NSHeading` 24pt, "🏅 Ngôi Sao Giao Tiếp").
  4. Reward Badges Stack: `NSHUD.xp` (+50 XP) + `NSHUD.stars` (+3 Stars).
  5. Vertical CTA Stack:
     - **Primary Action CTA** (`NSButton.primary`, "Nhận Thưởng & Về Trang Chủ 📖").
     - Secondary Action CTA (`NSButton.secondary`, "Chơi Lại Bài Học 🔄").
* **Interaction Trigger:** Tapping Primary CTA awards stars/XP, unlocks Node 2, and returns to `SCR_HOME_03`.

---
*End of NovaStars Screen Specification v1.0*
