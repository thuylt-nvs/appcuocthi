# AGENTS.md — Trạm Điều Khiển Ngữ Cảnh Dành Cho AI Agent (Root Context Hub)

> **Dành cho mọi AI Agent (Antigravity, Cursor, Claude Code, Copilot, Codex,...)**:  
> Đọc kỹ tài liệu này trước khi thực hiện bất kỳ hành động nào trong repository `appcuocthi` (NovaStars × NVS Championship). Mọi quy tắc và kiến trúc dưới đây là **bất biến (canonical invariants)**.

---

## 🧭 1. Bản Đồ Hệ Thống Trong 60 Giây (The 60-Second Mental Model)

Dự án này là **Nền tảng phát triển năng lực sống qua game phiêu lưu** dành cho học sinh tiểu học (6–11 tuổi).  
Mục tiêu tối thượng (North Star): **Năng lực hành vi ngoài đời thực**, không phải điểm số hoàn thành bài thi hay bài học.

```
                    ┌────────────────────────────────────────────────────────┐
                    │                      DOMAIN CORE                       │
                    │   • Khung 7 Năng Lực NVS (NL1–NL7) & 34 Skills LSCAF   │
                    │   • Chu trình học tập 10 bước (Core Learning Loop)     │
                    │   • Ngân hàng 680 câu hỏi (5 Tiers: Biết -> Phản tư)   │
                    │   • Exam Engine, Chấm điểm (Primary Competency Only)   │
                    │   • Telemetry & Idempotent Ledger (Sự kiện & Kinh tế)  │
                    └───────────────────────────┬────────────────────────────┘
                                                │ Tiêu thụ (Consumes)
                 ┌──────────────────────────────┴──────────────────────────────┐
                 ▼                                                             ▼
┌─────────────────────────────────┐                           ┌─────────────────────────────────┐
│     WEB CHAMPIONSHIP ALPHA      │                           │      FLUTTER NATIVE MVP         │
│  (Live: appcuocthi.vercel.app)  │                           │     (Mục tiêu mobile dài hạn)   │
│  • index.html (WebApp 3D Live)  │                           │  • lib/features/ (ftue, lesson, │
│  • demo/student_pilot.html      │                           │    map, home)                   │
│  • demo/admin_dashboard.html    │                           │  • lib/core, lib/data           │
│  • js/controllers, js/services  │                           │                                 │
└─────────────────────────────────┘                           └─────────────────────────────────┘
```

---

## 🚫 2. Những Điều Tuyệt Đối CẤM Làm (The "Never Ever" List)

1. **KHÔNG BAO GIỜ hardcode dữ liệu học tập/nội dung vào UI**: Mọi câu hỏi, câu chuyện, XP, phần thưởng, thời gian animation phải đến từ `questions_data.js`, `ChampionshipConfig` hoặc Content Packages (ADR-006, ADR-007).
2. **KHÔNG BAO GIỜ phạt người học (Positive Failure)**: Trẻ làm sai không bị trừ điểm phạt hay bị nhốt màn hình. Mọi thất bại là bài học để thử lại (ADR-012).
3. **KHÔNG BAO GIỜ dùng `linkedCompetencyIds` để chấm điểm thi**: Điểm thi và phân loại năng lực yếu/mạnh chỉ tính duy nhất trên `primaryCompetencyId`. `linkedCompetencyIds` chỉ dùng cho mục đích gợi ý hiển thị.
4. **KHÔNG BAO GIỜ cộng thưởng/XP mà không qua Idempotent Ledger**: Mọi giao dịch cộng XP/Stars phải có `transactionKey` duy nhất (ví dụ: `EXAM_REWARD:{attemptId}`) để chống cộng đúp khi học sinh bấm lại (Step 4 / Patch 2B).
5. **KHÔNG BAO GIỜ chẩn đoán năng lực vội vàng**: Nếu số câu hỏi thuộc một năng lực trong bài làm nhỏ hơn `minimumEvidenceCount` (mặc định là 3), không được gán nhãn "Yếu", mà phải dùng thông điệp xây dựng kỹ năng `"LET'S BUILD THIS SKILL"` (ADR-010, Requirement 10).
6. **KHÔNG BAO GIỜ xây dựng các tính năng ngoài MVP (Non-Goals)**: Không làm Multiplayer, AI Orchestrator thời gian thực, CMS phức tạp, Teacher Portal hay Chợ giao dịch vật phẩm.

---

## 🗂️ 3. Thư Mục Wiki Chuyên Đề (Deep-Dive Wiki Map)

Khi cần đào sâu vào từng module cụ thể, hãy đọc các tài liệu tương ứng trong thư mục [`wiki/`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/wiki/):

| Tài liệu | Nội dung trọng tâm | Khi nào Agent cần đọc? |
| :--- | :--- | :--- |
| [`wiki/00_INDEX.md`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/wiki/00_INDEX.md) | Triết lý sản phẩm, sơ đồ tư duy tổng thể và mục lục hệ thống | Cần cái nhìn bao quát toàn bộ repo |
| [`wiki/01_COMPETENCY_FRAMEWORK.md`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/wiki/01_COMPETENCY_FRAMEWORK.md) | Chuẩn NVS NL1–NL7, 34 kỹ năng LSCAF, mã màu hex, bảng ánh xạ legacy | Khi làm việc với năng lực, huy hiệu, UI theme |
| [`wiki/02_GAME_RULES_AND_LEARNING_LOOP.md`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/wiki/02_GAME_RULES_AND_LEARNING_LOOP.md) | Chu trình học 10 bước, cơ chế kinh tế (XP, Stars, Streak), Boss battle | Khi phát triển tính năng game, quest, reward |
| [`wiki/03_QUESTION_BANK_AND_PIPELINE.md`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/wiki/03_QUESTION_BANK_AND_PIPELINE.md) | 5 Tiers nhận thức, 680 câu hỏi, pipeline biên dịch Python -> JS | Khi thêm/sửa câu hỏi, điều chỉnh cấu trúc dữ liệu |
| [`wiki/04_EXAM_ENGINE_SCORING_AND_BLUEPRINT.md`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/wiki/04_EXAM_ENGINE_SCORING_AND_BLUEPRINT.md) | Cấu hình Blueprint, thuật toán chọn đề không trùng, thuật toán chấm điểm, Coach advice | Khi chỉnh sửa phòng thi, tính điểm, thuật toán gợi ý |
| [`wiki/05_TELEMETRY_ANALYTICS_AND_STATE.md`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/wiki/05_TELEMETRY_ANALYTICS_AND_STATE.md) | Event schema cho Admin BTC, LocalStorageRepository, Idempotent ledger | Khi tích hợp dashboard, lưu trữ state, fix lỗi kinh tế |
| [`wiki/06_INVARIANTS_AND_ADR_GUARDRAILS.md`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/wiki/06_INVARIANTS_AND_ADR_GUARDRAILS.md) | Bảng 20 ADRs chuẩn, danh sách Non-Goals, bẫy kỹ thuật thường gặp | Trước khi refactor hoặc đề xuất kiến trúc mới |
| [`wiki/07_AI_AGENT_PLAYBOOK.md`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/wiki/07_AI_AGENT_PLAYBOOK.md) | Các lệnh terminal chuẩn, 5 recipes tác chiến từng bước cho tác vụ phổ biến | Khi chuẩn bị code, chạy test hoặc thao tác git |

---

## ⚡ 4. Các Lệnh Thực Thi Chuẩn (Standard Commands)

### Chạy Kiểm Thử Tự Động (Node.js Test Runner)
```powershell
# Chạy bộ test kiểm tra runtime học sinh
node test/runtime_test.js

# Chạy test kiểm chứng luồng trải nghiệm Student Pilot
node test/student_pilot_verification_test.js

# Chạy test kiểm chứng kịch bản demo tổng hợp
node test/demo_verification_test.js
```

### Chạy Biên Dịch & Xác Thực Ngân Hàng Câu Hỏi
```powershell
# Kiểm tra tính toàn vẹn của ngân hàng câu hỏi
$env:PYTHONIOENCODING = "utf-8"; python question_bank/verify_questions.py

# Biên dịch Markdown/JSON sang bundle questions_data.js
$env:PYTHONIOENCODING = "utf-8"; python question_bank/parse_to_js.py
```

### Quy Chuẩn Git & GitHub CLI (Bắt Buộc Trên Windows PowerShell)
```powershell
# Luôn chèn lệnh xóa token rác mặc định của hệ thống trước khi chạy git/gh
$env:GITHUB_TOKEN = $null; git status
```

### Quy Chuẩn Playwright E2E Testing
- Khi cấu hình hoặc chạy Playwright, **luôn thiết lập từ 4 đến 8 workers** (tối thiểu 4, tối đa 8):
```powershell
npx playwright test --workers=4
```

---

## 🔍 5. File Map Trọng Yếu (Critical Files & Entry Points)

- **Entry point ứng dụng WebApp 3D (Live Vercel)**: [`index.html`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/index.html) — [https://appcuocthi.vercel.app](https://appcuocthi.vercel.app)
- **Entry point ứng dụng Web Alpha 2D**: [`demo/student_pilot.html`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/demo/student_pilot.html)
- **Bảng điều khiển Admin Telemetry**: [`demo/admin_dashboard.html`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/demo/admin_dashboard.html)
- **Ngân hàng dữ liệu câu hỏi compiled**: [`question_bank/questions_data.js`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/question_bank/questions_data.js)
- **Định nghĩa 7 Năng lực NVS**: [`js/core/nvs_competency.js`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/js/core/nvs_competency.js)
- **Logic thi đấu & Đề thi**: [`js/services/exam_service.js`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/js/services/exam_service.js)
- **Telemetry & Gợi ý rèn luyện**: [`js/services/championship_analytics_engine.js`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/js/services/championship_analytics_engine.js)
- **Kinh tế game chống trùng**: [`js/services/championship_economy_service.js`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/js/services/championship_economy_service.js)
- **Kho lưu trữ LocalStorage**: [`js/services/local_storage_repository.js`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/js/services/local_storage_repository.js)
