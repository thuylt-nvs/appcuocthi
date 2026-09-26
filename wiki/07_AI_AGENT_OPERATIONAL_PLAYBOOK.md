# 07 — Sổ Tay Vận Hành Tác Chiến Cho AI Agent (Operational Playbook)

> **Cẩm nang hành động thực tế (Action-Oriented Playbook)**  
> Phong cách: **Andrej Karpathy** (Thực tế, súc tích, cung cấp công thức từng bước từ dòng lệnh tới mã nguồn).

---

## 💻 1. Bảng Tra Cứu Lệnh Terminal Chuẩn (Command Cheatsheet)

### Kiểm Thử Hệ Thống (Automated Testing)
```powershell
# 1. Kiểm tra toàn bộ logic runtime của bài thi và học sinh
node test/runtime_test.js

# 2. Kiểm chứng luồng trải nghiệm hoàn chỉnh của Student Pilot (5Q exam + 3Q boost)
node test/student_pilot_verification_test.js

# 3. Kiểm thử kịch bản demo và điều hướng màn hình
node test/demo_verification_test.js

# 4. Kiểm thử bộ test Championship (Lưu ý: xem phần ghi chú về thuộc tính canonical)
node test/championship_test.js
```

### Xử Lý Ngân Hàng Câu Hỏi (Question Bank Pipeline)
```powershell
# 1. Kiểm tra tính toàn vẹn của ngân hàng câu hỏi (34 skills, 20 câu/skill, 5 tiers)
$env:PYTHONIOENCODING = "utf-8"; python question_bank/verify_questions.py

# 2. Biên dịch dữ liệu nguồn Markdown sang bundle questions_data.js
$env:PYTHONIOENCODING = "utf-8"; python question_bank/parse_to_js.py
```

### Thao Tác Git & GitHub CLI (Quy Chuẩn Bắt Buộc Trên Windows PowerShell)
```powershell
# BẮT BUỘC: Luôn đặt $env:GITHUB_TOKEN = $null; ở đầu mọi lệnh git/gh
$env:GITHUB_TOKEN = $null; git status
$env:GITHUB_TOKEN = $null; git diff
```

### Kiểm Thử Giao Diện Playwright E2E
```powershell
# BẮT BUỘC: Luôn thiết lập từ 4 đến 8 workers
npx playwright test --workers=4
```

---

## 🛠️ 2. Công Thức Tác Chiến 1: Thêm/Sửa Câu Hỏi Trong Ngân Hàng

Khi cần bổ sung hoặc hiệu chỉnh nội dung câu hỏi:

1. **Bước 1 — Mở file nguồn Markdown tương ứng:**
   - Không sửa file compiled `questions_data.js`!
   - Mở file nhóm trong `question_bank/group1_...md` đến `group6_...md`.
2. **Bước 2 — Định dạng câu hỏi theo đúng chuẩn LSCAF:**
   - Đảm bảo câu hỏi có đủ 3 hoặc 4 phương án.
   - Đáp án đúng có đánh dấu rõ ràng.
   - Lời giải thích mang tính sư phạm tích cực (khích lệ, giải thích lý do).
3. **Bước 3 — Chạy kiểm thử xác thực cấu trúc:**
   ```powershell
   python question_bank/verify_questions.py
   ```
   *Nếu có lỗi (thiếu câu, sai số lượng phương án), script sẽ báo dòng cụ thể.*
4. **Bước 4 — Biên dịch ra file JavaScript:**
   ```powershell
   python question_bank/parse_to_js.py
   ```
5. **Bước 5 — Chạy test kiểm tra runtime:**
   ```powershell
   node test/runtime_test.js
   ```

---

## 🛠️ 3. Công Thức Tác Chiến 2: Điều Chỉnh Cấu Hình Đề Thi (Blueprint)

Khi Ban Tổ Chức muốn thay đổi số lượng câu hỏi, thời gian hoặc phân bổ năng lực:

1. **Bước 1 — Mở file cấu hình:**
   [`js/config/championship_config.js`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/js/config/championship_config.js).
2. **Bước 2 — Chỉnh sửa đối tượng Blueprint:**
   ```javascript
   // Ví dụ cập nhật Blueprint 5 câu cho Khối 1-3:
   const ChampionshipBlueprint = {
     totalQuestions: 5,
     timeLimitSeconds: 300, // 5 phút
     minimumEvidenceCount: 3, // Ngưỡng chẩn đoán thận trọng
     competencyDistribution: {
       NL1: 1,
       NL2: 1,
       NL3: 1,
       NL4: 1,
       NL5: 1
     }
   };
   ```
3. **Bước 3 — Xác minh tính khả thi:**
   Đảm bảo tổng số câu hỏi yêu cầu của mỗi năng lực nhỏ hơn hoặc bằng số câu hỏi khả dụng trong kho `questions_data.js`.
4. **Bước 4 — Chạy test xác nhận:**
   ```powershell
   node test/student_pilot_verification_test.js
   ```

---

## 🛠️ 4. Công Thức Tác Chiến 3: Thêm Năng Lực NVS Mới Vào Hệ Thống

Khi cập nhật hoặc bổ sung năng lực mới vào khung chuẩn:

1. **Bước 1 — Mở file định nghĩa chuẩn:**
   [`js/core/nvs_competency.js`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/js/core/nvs_competency.js).
2. **Bước 2 — Thêm đối tượng Canonical mới vào `NVSCompetencies`:**
   ```javascript
   NL8: {
     id: 'NL8',
     code: 'NL8',
     officialNameVi: 'Tên Năng Lực Mới',
     displayName: 'Tên Năng Lực Mới',
     englishDisplayName: 'New Competency English (UI Metadata)',
     icon: '🚀',
     color: '#10B981',
     bgColor: '#D1FAE5',
     borderColor: '#34D399',
     coachDescription: 'Mô tả định hướng rèn luyện cho học sinh.'
   }
   ```
3. **Bước 3 — Cập nhật ánh xạ kế thừa nếu cần:**
   Nếu có mã định danh cũ cần trỏ về năng lực này, thêm vào `LegacyCompetencyMigrationMap`.
4. **Bước 4 — Kiểm thử:**
   ```powershell
   node test/runtime_test.js
   ```

---

## 🛠️ 5. Công Thức Tác Chiến 4: Bổ Sung Sự Kiện Telemetry Cho Admin Dashboard

Khi cần theo dõi thêm một hành vi mới của học sinh:

1. **Bước 1 — Phát sự kiện từ Controller hoặc Service:**
   ```javascript
   // Sử dụng instance ChampionshipAnalyticsEngine:
   analyticsEngine.trackEvent('MINIGAME_COMPLETED', {
     studentId: appState.data.user.id,
     gameId: 'sorting_hazard_items',
     score: 100,
     timeSpentSeconds: 45
   });
   ```
2. **Bước 2 — Cập nhật Admin Dashboard để hiển thị sự kiện:**
   Mở [`js/demo/demo_admin_controller.js`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/js/demo/demo_admin_controller.js) và bổ sung định dạng render cho `MINIGAME_COMPLETED`.
3. **Bước 3 — Mở và kiểm tra giao diện:**
   Mở file [`demo/admin_dashboard.html`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/demo/admin_dashboard.html) trên trình duyệt để kiểm tra trực quan bảng dữ liệu Telemetry real-time.

---

## 🛠️ 6. Công Thức Tác Chiến 5: Reset Trạng Thái & Dọn Dẹp LocalStorage

Khi kiểm thử các kịch bản người dùng mới (First-Time User Experience - FTUE) hoặc dọn sạch lịch sử thi:

1. **Thực thi trong Console Trình Duyệt (DevTools F12):**
   ```javascript
   // Xóa toàn bộ dữ liệu người chơi và vé thi
   localStorage.removeItem('novastars_player_state_v1');
   localStorage.removeItem('nvs_championship_tickets_v1');
   localStorage.removeItem('nvs_championship_attempts_v1');
   localStorage.removeItem('nvs_championship_ledger_v1');
   location.reload();
   ```
2. **Hoặc sử dụng Bảng Điều Khiển Debug:**
   Truy cập [`demo/student_pilot_debug.html`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/demo/student_pilot_debug.html) và bấm nút **"Reset All State"** tích hợp sẵn.
