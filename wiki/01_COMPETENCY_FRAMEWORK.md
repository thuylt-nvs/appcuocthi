# 01 — Khung Năng Lực NVS Chuẩn (Competency Framework)

> **File nguồn chuẩn xác (Single Source of Truth):** [`js/core/nvs_competency.js`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/js/core/nvs_competency.js)  
> **Phiên bản:** NVS Future Competency Standard v0.2 (Canonical Objects NL1–NL7)

---

## 🎯 1. 7 Năng Lực Cốt Lõi (Canonical NL1–NL7)

Hệ thống đánh giá và phát triển học sinh xoay quanh 7 năng lực cốt lõi. Mỗi năng lực được định nghĩa chuẩn hóa kèm siêu dữ liệu hiển thị (UI Metadata):

| Mã (ID) | Tên tiếng Việt chính thức (`officialNameVi`) | Tên tiếng Anh (`englishDisplayName`) | Biểu tượng (`icon`) | Màu chính (`color`) | Màu nền (`bgColor`) | Định hướng rèn luyện (`coachDescription`) |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| **`NL1`** | **Có mục đích và giá trị sống** | Purpose & Life Values | 🎯 | `#EC4899` | `#FCE7F3` | Xác định mục đích cá nhân, sống có phẩm chất, giá trị đạo đức và kỷ luật bản thân. |
| **`NL2`** | **Có tư duy và năng lực học tập suốt đời** | Lifelong Learning & Thinking Mindset | 🧩 | `#3B82F6` | `#DBEAFE` | Rèn luyện tư duy logic, phản biện, phân tích và chủ động tự học. |
| **`NL3`** | **Trí tuệ cảm xúc và khả năng kết nối** | Emotional Intelligence & Social Connection | ❤️ | `#10B981` | `#D1FAE5` | Thấu hiểu cảm xúc cá nhân, làm chủ tâm trí, đồng cảm và gắn kết quan hệ xã hội. |
| **`NL4`** | **Giao tiếp, truyền cảm hứng và thuyết phục** | Communication, Inspiration & Persuasion | 🗣️ | `#F97316` | `#FFEDD5` | Lắng nghe tích cực, diễn đạt rõ ràng, thuyết phục và truyền cảm hứng. |
| **`NL5`** | **Tinh thần công dân toàn cầu và trách nhiệm xã hội** | Global Citizenship & Social Responsibility | 🌍 | `#06B6D4` | `#CFFAFE` | Tôn trọng sự đa dạng văn hóa, bảo vệ môi trường và đóng góp cho cộng đồng. |
| **`NL6`** | **Hành động, dám thử, dám thay đổi** | Action, Courage & Adaptability | 🚀 | `#F59E0B` | `#FEF3C7` | Dũng cảm bước khỏi vùng an toàn, tổ chức thực thi và thích ứng linh hoạt. |
| **`NL7`** | **Kĩ năng công nghệ và trí tuệ nhân tạo** | Technology & AI Skills | 💻 | `#8B5CF6` | `#EDE9FE` | Sử dụng công nghệ và trí tuệ nhân tạo an toàn, bảo mật và có trách nhiệm. |

---

## 🔄 2. Bảng Ánh Xạ Kế Thừa (Legacy Migration Map)

Để đảm bảo tương thích ngược với các phiên bản trước đây hoặc dữ liệu lịch sử, hệ sinh thái sử dụng bảng ánh xạ độc lập [`LegacyCompetencyMigrationMap`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/js/core/nvs_competency.js#L96):

```javascript
const LegacyCompetencyMigrationMap = {
  EMOTIONAL_COMPETENCE: 'NL3',
  PROBLEM_SOLVING:      'NL2',
  SELF_MANAGEMENT:       'NL1',
  TECHNOLOGY:            'NL7',
  GLOBAL_RESPONSIBILITY: 'NL5',
  LEADERSHIP:            'NL6',
  COMMUNICATION:         'NL4'
};
```

### Hàm Lấy Năng Lực Chuẩn: `getNVSCompetency(competencyId)`
- **Đầu vào:** Chuỗi định danh (`NL1`..`NL7` hoặc mã cũ như `EMOTIONAL_COMPETENCE`).
- **Xử lý:** 
  1. Kiểm tra trực tiếp trong `NVSCompetencies[competencyId]`.
  2. Nếu không thấy, tra cứu qua `LegacyCompetencyMigrationMap`.
  3. Nếu vẫn không thấy, trả về đối tượng dự phòng an toàn (`Fallback Object` với `id: 'UNKNOWN'`, icon `🌟`, màu `#64748B`).
- **Cảnh báo cho AI Agent:** Không truy cập thuộc tính `.name` hay `.englishName` kiểu cũ. Luôn dùng `.displayName`, `.officialNameVi` hoặc `.englishDisplayName`.

---

## 🧩 3. Khung 34 Kỹ Năng LSCAF (Life Skills Competency Assessment Framework)

34 kỹ năng chi tiết được phân bổ vào các nhóm hành vi, mỗi kỹ năng gồm đúng 20 câu hỏi được biên dịch trong ngân hàng câu hỏi:

### Nhóm 1: Tự Chăm Sóc & An Toàn (8 Kỹ năng)
1. Phòng tránh và xử lý khi bị đi lạc
2. An toàn khi tham gia các phương tiện giao thông công cộng
3. Vui chơi an toàn dưới nắng
4. Kĩ năng phòng tránh tai nạn thương tích do đồ vật sắc, nhọn
5. Kĩ năng phòng, tránh nguy cơ bỏng, nóng
6. Kĩ năng phòng tránh và thoát hiểm khi có hoả hoạn
7. Kĩ năng phòng tránh nguy cơ bị điện giật
8. Kĩ năng phòng tránh nguy cơ bị đuối nước

### Nhóm 2: An Toàn & Tư Duy Cơ Bản (6 Kỹ năng)
9. Quan sát
10. Sắp xếp
11. So sánh
12. Phân loại
13. Sáng tạo
14. Chào hỏi

### Nhóm 3: Giao Tiếp & Cảm Xúc (7 Kỹ năng)
15. Giới thiệu sở thích của bản thân
16. Làm việc nhóm
17. Cảm xúc của bản thân
18. Cảm xúc của người khác
19. Nói lời cảm ơn
20. Ứng xử lịch sự khi đến chơi nhà bạn
21. Cổ vũ, động viên

### Nhóm 4: Thuyết Trình & Học Đường (7 Kỹ năng)
22. Chúc tết
23. Kĩ năng thuyết trình
24. Lắng nghe
25. Thể hiện sự tôn trọng với thầy cô
26. Thể hiện tình yêu thương với thầy cô giáo
27. Chia sẻ ý tưởng
28. Trách nhiệm cá nhân

### Nhóm 5: Trách Nhiệm & Tự Quản (6 Kỹ năng)
29. Quản lý thời gian học tập
30. Giữ gìn vệ sinh cá nhân và môi trường
31. Quản lý chi tiêu cơ bản (Tiền bạc)
32. Bảo vệ thông tin cá nhân trên mạng
33. Tự giác hoàn thành nhiệm vụ
34. Tinh thần kiên trì vượt khó

---

## 🎒 4. Phân Định Nhóm Tuổi (Age Group Resolution)

Quy tắc chia lứa tuổi được quản lý tập trung tại `ChampionshipConfig.resolveAgeGroup(grade)`:

- **Khối 1, 2, 3 (`grade: 1..3`)** $\longrightarrow$ Mã phân nhóm: **`GRADE_1_3`** (Câu hỏi đơn giản, trực quan, tình huống gần gũi ở trường và nhà).
- **Khối 4, 5 (`grade: 4..5`)** $\longrightarrow$ Mã phân nhóm: **`GRADE_4_5`** (Tình huống xã hội, tư duy phản biện, kỹ năng công nghệ và trách nhiệm).
- **Khối ngoài phạm vi (< 1 hoặc > 5)** $\longrightarrow$ Ném ngoại lệ lỗi: `UNSUPPORTED_GRADE`.
