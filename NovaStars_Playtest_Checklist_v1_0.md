# NovaStars Playtest Checklist v1.0
## Production QA, Ergonomics, Accessibility & Child Playtest Observation Protocol

---

## 1. Executive Summary & Governance

The **NovaStars Playtest Checklist v1.0** defines the studio QA standards, child ergonomics criteria, pedagogical alignment checks, accessibility parameters, and live child observation protocols for playtest evaluations.

* **Target Audience:** QA Engineers, Playtest Facilitators, Child Psychology Researchers, Product Directors.
* **Inheritance:** Enforces standards set in *NovaStars Design System v1.0*, *Art Bible v1.0*, *Motion Bible v1.0*, *Component Library v1.0*, and *Screen Specification v1.0*.
* **Zero Implementation Code:** Functions as a structured evaluation checklist and observation rubric for quality assurance and playtest sessions.

---

## 2. Master Evaluation Categories

```
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │                      NOVASTARS PLAYTEST CHECKLIST                           │
 └──────┬────────────┬─────────────┬────────────┬─────────────┬─────────┬──────┘
        │            │             │            │             │         │
        ▼            ▼             ▼            ▼             ▼         ▼
    ┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐  ┌────────┐
    │CHILD   │   │PEDAGOGY│   │A11Y &  │   │QA &    │   │OBSERV- │  │ACCEPT- │
    │ERGONOM.│   │& SAFETY│   │CONTRAST│   │PERFORM.│   │ATION   │  │ANCE    │
    └────────┘   └────────┘   └────────┘   └────────┘   └────────┘  └────────┘
```

---

## 3. Playtest Verification Checklists

---

### 3.1 Category 1: Child Ergonomics & Touch Mechanics

| ID | Evaluation Item | Target Specification | Pass Criteria | Status |
| :--- | :--- | :--- | :--- | :--- |
| **ERG-01** | Primary Button Touch Area | Minimum 56x56dp (Web 60px) | Child taps button without missing | [ ] PASS |
| **ERG-02** | Touch Hit-Slop Clearance | 12dp extended bounds around CTA | Off-center child taps register successfully | [ ] PASS |
| **ERG-03** | 3D Bevel Tactile Shift | +4px Y-translation on press down | Child receives physical press feedback | [ ] PASS |
| **ERG-04** | One-Handed Thumb Reach | Primary CTA placed in bottom 40% zone| Child reaches main CTA without shifting grip | [ ] PASS |
| **ERG-05** | Drag & Snap Proximity | 48px magnetic drop zone radius | Draggable item snaps effortlessly into slot | [ ] PASS |

---

### 3.2 Category 2: Pedagogy & Child Psychology (Safety & Self-Efficacy)

| ID | Evaluation Item | Target Specification | Pass Criteria | Status |
| :--- | :--- | :--- | :--- | :--- |
| **PED-01** | Non-Punitive Red Check | Zero red error popups on wrong choice | Sub-optimal choices trigger warm orange hint | [ ] PASS |
| **PED-02** | Anti-Worksheet Framing | No academic labels ("Quiz", "Test") | Gamified story labels ("Sứ Mệnh", "Thử Thách") | [ ] PASS |
| **PED-03** | Self-Efficacy Celebration | Star/XP count-up on completion | Child expresses visible joy/pride during victory | [ ] PASS |
| **PED-04** | Immediate Agency | Interactive elements trigger <20ms feedback | Child touches UI to explore safely | [ ] PASS |
| **PED-05** | Real-World Parent Bridge | Parent confirmation stage option | Child shares accomplishment with parent | [ ] PASS |

---

### 3.3 Category 3: Accessibility (a11y) & Visual Ergonomics

| ID | Evaluation Item | Target Specification | Pass Criteria | Status |
| :--- | :--- | :--- | :--- | :--- |
| **A11Y-01**| Color Contrast Ratio | Minimum 4.5 : 1 (WCAG AA) | All body text is crisp and readable on dark/light background | [ ] PASS |
| **A11Y-02**| Body Font Legibility | Minimum 16pt (20px) Nunito Bold | Early readers read scenario dialogues without squinting | [ ] PASS |
| **A11Y-03**| Motion Focus Limit | Max 1 primary attention animation | No flickering visual clutter on screen | [ ] PASS |
| **A11Y-04**| Audio-Visual Sync | Sound triggers within < 20ms of tap | Tap pop sound coincides perfectly with touch down | [ ] PASS |

---

### 3.4 Category 4: QA & Technical Performance

| ID | Evaluation Item | Target Specification | Pass Criteria | Status |
| :--- | :--- | :--- | :--- | :--- |
| **PERF-01**| Frame Rate Consistency | Solid 60 fps target | Zero stuttering during star explosions or modal slides | [ ] PASS |
| **PERF-02**| Layout Shift Clearance | Zero Cumulative Layout Shift (CLS = 0) | Screen elements maintain fixed structural positions | [ ] PASS |
| **PERF-03**| Audio Latency | < 20ms sound buffer latency | Instant audio pop upon touch down | [ ] PASS |
| **PERF-04**| FTUE Onboarding Time | Onboarding complete in < 90 seconds | Child enters World Map within 90 seconds | [ ] PASS |

---

## 4. Live Child Observation Protocol (Playtest Sessions)

### 4.1 Facilitator Guidelines
1. **Zero Prompting:** Allow the child to touch the screen freely. Do NOT tell the child where to tap unless stuck for > 30 seconds.
2. **Observe First Impression:** Record whether the child hesitates or immediately touches the glowing primary CTA.
3. **Log Emotional Reactions:** Note smiles, laughter during character giggles, star celebrations, or signs of frustration.

### 4.2 Playtest Observation Logging Template

```
PLAYTEST SESSION OBSERVATION LOG
Child ID: _________   Age: ___   Device: [ Tablet / Mobile ]
Session Date: _______________   Facilitator: _______________

[ ] 1. FTUE Arrival (<10s): Did child tap avatar picker and start journey intuitively?
    • Notes: ____________________________________________________

[ ] 2. Home Base Hub (<30s): Did child tap the glowing "Tiếp Tục Phiêu Lưu" CTA?
    • Notes: ____________________________________________________

[ ] 3. World Map Exploration (<30s): Did child identify Node 1 on the floating island?
    • Notes: ____________________________________________________

[ ] 4. Lesson Stage Play (6 Stages): 
    • Pretest Choice Friction:  [ Low / Med / High ]
    • Story Dialogue Interest:   [ Engaged / Bored ]
    • Drag/Match Snap Ease:      [ Intuitive / Clunky ]
    • Boss Battle Climax Thrill: [ Thrilled / Neutral ]
    • Celebration Dopamine Pop:  [ Smiled / Indifferent ]

Friction Points Observed: _____________________________________
Child Verbatim Quotes: ________________________________________
Overall Playtest Outcome: [ PASS / REVISE ]
```

---
*End of NovaStars Playtest Checklist v1.0*
