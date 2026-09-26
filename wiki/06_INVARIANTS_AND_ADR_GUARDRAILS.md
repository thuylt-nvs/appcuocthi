# 06 — Các Bất Biến & 20 Quyết Định Kiến Trúc (Invariants & ADR Guardrails)

> **File nguồn chuẩn xác:** [`NovaStars Decision Log`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/extracted_docs/NovaStars%20Decision%20Log.txt), [`MVP_NON_GOALS.md`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/MVP_NON_GOALS.md), [`NovaStars Engineering Playbook`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/extracted_docs/NovaStars%20Engineering%20Playbook.txt)  
> **Nguyên tắc vàng:** Bất kỳ AI Agent hay kỹ sư nào cũng phải tuân thủ nghiêm ngặt 20 ADRs đã đóng băng; không bao giờ tự ý thay đổi kiến trúc nếu không có sự đồng thuận rõ ràng từ người dùng.

---

## 🏛️ 1. Bảng Tra Cứu 20 Quyết Định Kiến Trúc (Canonical ADRs)

| Mã ADR | Tên Quyết Định | Nội Dung Quyết Định Cốt Lõi | Ràng Buộc Kỹ Thuật Đối Với AI Agent |
| :---: | :--- | :--- | :--- |
| **ADR-001** | Competency is the Product | Năng lực thực tế là sản phẩm, bài học không phải sản phẩm. | Tiêu chí thành công dựa trên bằng chứng năng lực, không đo bằng số bài hoàn thành. |
| **ADR-002** | Competency-First Architecture | Toàn bộ nội dung phát sinh từ Competency Packages. | Giữ ổn định bộ khung năng lực; nội dung bài học có thể thay đổi linh hoạt. |
| **ADR-003** | Story Before Instruction | Mọi bài học đều bắt đầu bằng một câu chuyện dẫn dắt cảm xúc. | Không đưa lý thuyết hoặc câu hỏi kiểm tra khô khan ngay đầu màn hình. |
| **ADR-004** | Gameplay Before Infrastructure | Trải nghiệm chơi luôn được ưu tiên hơn hạ tầng kỹ thuật hoàn hảo. | Không xây dựng hạ tầng phức tạp khi chưa có gameplay chạy thực tế. |
| **ADR-005** | Vertical Slice Development | Phát triển theo từng lát cắt dọc hoàn chỉnh có thể chơi được. | Mỗi milestone phải là một bản build chạy được từ đầu tới cuối. |
| **ADR-006** | Content-Driven Architecture | Toàn bộ nội dung học tập nạp từ file gói dữ liệu (Content Packages). | **CẤM** đưa câu hỏi, hội thoại hay kịch bản vào mã nguồn UI widgets/views. |
| **ADR-007** | Configuration Over Hardcoding | Các tham số gameplay (thời gian, điểm, độ khó) nằm trong GameConfig. | Không hardcode hằng số game trong logic xử lý sự kiện. |
| **ADR-008** | MVP Before Scale | MVP chỉ chứa các hệ thống tối thiểu xác thực chu trình học tập. | Trì hoãn các hệ thống mở rộng quy mô lớn (CMS, AI realtime, Marketplace). |
| **ADR-009** | Guest First | Cho phép chơi ngay dưới tư cách khách (Guest) không cần đăng ký. | Giảm thiểu ma sát đăng nhập ban đầu để trẻ tiếp cận ngay. |
| **ADR-010** | Evidence Before Mastery | Làm chủ năng lực đòi hỏi bằng chứng hành vi đời thực. | Luồng xác thực: Bài học $\rightarrow$ Thử thách đời thực $\rightarrow$ Phụ huynh xác nhận $\rightarrow$ Đạt chuẩn. |
| **ADR-011** | Parent as Learning Partner | Phụ huynh chỉ đồng hành xác nhận bằng chứng, không phải giáo viên chấm bài. | Giao diện phụ huynh tối giản, không yêu cầu theo dõi hay quản lý phức tạp hàng ngày. |
| **ADR-012** | Positive Failure | Thất bại không bao giờ trừng phạt; thất bại là để học hỏi. | Không trừ điểm phạt, không "Game Over" tước quyền chơi, luôn có lời giải động viên. |
| **ADR-013** | Reward Growth, Not Correctness | Thưởng cho nỗ lực, sự kiên trì và làm lại chứ không chỉ đáp án đúng 100%. | Cơ chế tính thưởng XP cho lần thử lại, duy trì Streak và làm nhiệm vụ thực tế. |
| **ADR-014** | Replay Must Have Purpose | Chơi lại để đào sâu năng lực, không phải để cày điểm đơn điệu. | Thiết kế các nhánh kết quả khác nhau hoặc mốc thử thách cao hơn khi chơi lại. |
| **ADR-015** | AI Is Enhancement, Not Foundation | MVP phải hoạt động mượt mà và trọn vẹn mà không bắt buộc có AI. | AI chỉ đóng vai trò tăng cường (gợi ý thông minh, trợ lý), không làm sập app nếu offline. |
| **ADR-016** | Feature-First Workspace | Mã nguồn tổ chức theo tính năng (Feature-First) kết hợp luồng game. | Không chia cấu trúc quá nhiều tầng kỹ thuật nằm rải rác. |
| **ADR-017** | Playtest Over Opinion | Dữ liệu hành vi của trẻ em có trọng số cao hơn tranh cãi nội bộ. | Khi bất đồng quan điểm thiết kế, căn cứ vào kết quả quan sát trẻ em trải nghiệm. |
| **ADR-018** | Every Milestone Must Be Playable | Không milestone nào được coi là xong nếu trẻ em chưa chơi thử được. | Hoàn thành code thuần túy không được tính là nghiệm thu milestone. |
| **ADR-019** | Freeze Before Build | Đóng băng khung năng lực, roadmap và tài liệu trước khi code. | Thực thi tập trung, không vừa code vừa thay đổi định nghĩa nền tảng. |
| **ADR-020** | Build Tomorrow Without Delaying Today | Thiết kế kiến trúc có điểm mở rộng nhưng không triển khai sớm trước thời hạn. | Chừa các extension points cho AI Content Factory, Remote Config, Cloud Sync. |

---

## 🚫 2. Danh Sách Những Thứ CẤM Xây Dựng Trong MVP (Non-Goals)

Theo [`MVP_NON_GOALS.md`](file:///c:/Users/Nova/.gemini/antigravity/scratch/appcuocthi/MVP_NON_GOALS.md), AI Agent tuyệt đối **KHÔNG** tự ý đề xuất hoặc code các hệ thống sau:

- ❌ **Hệ thống AI Production & AI Orchestrator thời gian thực** (Real-time LLM agents).
- ❌ **Hệ thống CMS quản trị nội dung phức tạp** (Content Management System).
- ❌ **Chợ mua bán & Kinh tế thương mại phức tạp** (Marketplace / Advanced Shop Economy).
- ❌ **Chế độ chơi nhiều người trực tuyến** (Multiplayer real-time).
- ❌ **Đa ngôn ngữ phức tạp** (Localization đa quốc gia - MVP tập trung 100% tiếng Việt).
- ❌ **Cổng thông tin giáo viên trường học** (Teacher Portal).
- ❌ **Hệ thống nuôi Pet phức tạp đa kỹ năng** (Complex Pet Skills).
- ❌ **Sự kiện trực tiếp theo mùa quy mô lớn** (Live Events).

---

## ⚠️ 3. 10 Bẫy Kỹ Thuật Thường Gặp Của AI Agent (Anti-Patterns)

1. **Bẫy dùng `name` thay vì `displayName`/`officialNameVi`**: Truy cập `getNVSCompetency(id).name` sẽ trả về `undefined`. Luôn dùng `displayName` hoặc `officialNameVi`.
2. **Bẫy chấm điểm theo `linkedCompetencyIds`**: Chỉ có `primaryCompetencyId` mới được tính vào mẫu số và tử số của kết quả thi.
3. **Bẫy cộng đúp điểm thưởng**: Luôn gọi qua `ChampionshipEconomyService` với transaction key duy nhất, không bao giờ trực tiếp thay đổi `appState.xp += 100`.
4. **Bẫy nhầm lẫn giữa Web Engine và Flutter Engine**: Sửa đổi file trong `demo/` và `js/` là tác động lên Web Prototype Vercel; sửa trong `lib/` là tác động lên Flutter Mobile App.
5. **Bẫy vi phạm Positive Failure**: Không hiển thị popup đỏ lòm ghi "BẠN ĐÃ THUA" hoặc "ĐIỂM KÉM". Phải dùng giao diện gợi ý động viên bo tròn thân thiện.
6. **Bẫy hardcode font chữ**: Toàn bộ hệ thống giao diện tiếng Việt sử dụng font tròn `Nunito`. Không chèn các font serif hoặc font không hỗ trợ đầy đủ dấu tiếng Việt.
7. **Bẫy chạy Playwright sai số worker**: Phải luôn cấu hình từ 4 đến 8 workers (`--workers=4`).
8. **Bẫy Git Token trên Windows PowerShell**: Chạy lệnh git/gh mà không có `$env:GITHUB_TOKEN = $null;` sẽ gây lỗi authentication với token rác hệ thống.
9. **Bẫy sửa trực tiếp `questions_data.js`**: Dữ liệu câu hỏi gốc nằm ở `question_bank/group*.md`. Phải chỉnh sửa ở file nguồn và chạy compiler, không sửa tay file compiled 500KB.
10. **Bẫy chẩn đoán vội vàng khi thiếu dữ liệu**: Nếu số câu hỏi của một năng lực trong bài làm $< 3$, không được kết luận năng lực đó yếu. Phải gắn nhãn `"LET'S BUILD THIS SKILL"`.
