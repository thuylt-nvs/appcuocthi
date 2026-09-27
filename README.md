# NovaStars 3D — Đấu Trường Năng Lực Tiểu Học NVS

Nền tảng học tập kỹ năng sống và Đấu Trường Năng Lực Học Sinh Tiểu Học (Khối 1–5), tích hợp đồ họa không gian vũ trụ Three.js 3D tối ưu cho điện thoại, máy tính bảng và máy tính.

---

## 🌐 Tên Miền Chính Thức (Live on Vercel)

👉 **Trang chủ WebApp 3D**: [https://appcuocthi.vercel.app](https://appcuocthi.vercel.app)

---

## 🚀 Tính Năng Nổi Bật

- 🌌 **Vũ Trụ 3D Three.js**: Khám phá 7 Hành Tinh Năng Lực NVS (NL1–NL7) và phi thuyền Sao Nova 3D với cử chỉ chạm vuốt mượt mà.
- 🏆 **Đấu Trường NVS**: Làm bài thi trắc nghiệm tình huống chuẩn sư phạm NVS cho Khối 1–3 và Khối 4–5.
- ⚡ **Luyện Kỹ Năng (Skill Boost)**: Rèn luyện phản xạ từng nhóm năng lực trọng tâm.
- 🛸 **Phi Thuyền Sao 3D**: Mini-game không gian 3D thu thập tinh thể năng lượng và né thiên thạch.
- 📊 **Biểu Đồ Radar 7 Chiều**: Đánh giá trực quan mức độ phát triển năng lực của bé trên Canvas Retina.
- 👑 **Bảng Điều Khiển Admin BTC**: [`demo/admin_dashboard.html`](demo/admin_dashboard.html) theo dõi dữ liệu Telemetry thời gian thực.

---

## 📚 Trạm Ngữ Cảnh AI Agent & Hệ Thống Wiki (Andrej Karpathy Style)

Repository được trang bị hệ thống tri thức và context chuyên sâu theo phong cách **Andrej Karpathy** (Nguyên lý đệ nhất, mật độ thông tin cao, zero-fluff, thiết lập các bất biến và rào chắn chống hallucination):

- 🤖 **Root Context Hub**: [`AGENTS.md`](AGENTS.md) — Điểm tiếp xúc đầu tiên cho mọi AI Agent (Antigravity, Cursor, Claude Code, Copilot, Codex,...), bao gồm mô hình 60s, các quy tắc cấm kỵ cốt lõi (Never Ever List), và bảng lệnh kiểm thử chuẩn.
- 📖 **Thư Mục Wiki Chuyên Đề (`wiki/`)**:
  - [`wiki/00_INDEX.md`](wiki/00_INDEX.md): Mục lục tổng thể, triết lý sản phẩm tối thượng (North Star: Năng lực hành vi ngoài đời thực).
  - [`wiki/01_COMPETENCY_FRAMEWORK.md`](wiki/01_COMPETENCY_FRAMEWORK.md): Khung 7 Năng lực NVS chuẩn v0.2 (NL1–NL7), mã màu hex, bảng ánh xạ kế thừa và 34 kỹ năng LSCAF.
  - [`wiki/02_GAME_RULES_AND_LEARNING_LOOP.md`](wiki/02_GAME_RULES_AND_LEARNING_LOOP.md): Chu trình học 10 bước (Core Learning Loop), nền kinh tế game (XP, Stars, Streak, Tickets) và luật Thất bại tích cực (Positive Failure).
  - [`wiki/03_QUESTION_BANK_AND_PIPELINE.md`](wiki/03_QUESTION_BANK_AND_PIPELINE.md): 5 Tầng nhận thức LSCAF, schema câu hỏi chuẩn và pipeline biên dịch Python sang JS.
  - [`wiki/04_EXAM_ENGINE_SCORING_AND_BLUEPRINT.md`](wiki/04_EXAM_ENGINE_SCORING_AND_BLUEPRINT.md): Cấu hình Blueprint đề thi, thuật toán chọn đề không lặp, chấm điểm theo `primaryCompetencyId` và chốt chặn chẩn đoán thận trọng.
  - [`wiki/05_TELEMETRY_ANALYTICS_AND_STATE.md`](wiki/05_TELEMETRY_ANALYTICS_AND_STATE.md): Hệ thống Telemetry sự kiện cho BTC, `LocalStorageRepository` và Sổ cái `Idempotent Ledger`.
  - [`wiki/06_INVARIANTS_AND_ADR_GUARDRAILS.md`](wiki/06_INVARIANTS_AND_ADR_GUARDRAILS.md): Bảng 20 ADRs bất biến (ADR-001 đến ADR-020), danh sách Non-Goals và 10 bẫy kỹ thuật anti-patterns.
  - [`wiki/07_AI_AGENT_OPERATIONAL_PLAYBOOK.md`](wiki/07_AI_AGENT_OPERATIONAL_PLAYBOOK.md): Sổ tay lệnh terminal chuẩn và 5 công thức tác chiến từng bước.

---

## 🧪 Kiểm Thử Tự Động (Verification)

```powershell
# Chạy bộ test kiểm tra runtime học sinh và đề thi
node test/runtime_test.js

# Chạy test kiểm chứng luồng trải nghiệm Student Pilot
node test/student_pilot_verification_test.js

# Kiểm tra và biên dịch ngân hàng câu hỏi
$env:PYTHONIOENCODING = "utf-8"; python question_bank/verify_questions.py
$env:PYTHONIOENCODING = "utf-8"; python question_bank/parse_to_js.py
```
