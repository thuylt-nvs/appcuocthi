/* ==========================================================================
   NovaStars × NVS Championship — Demo Presenter Control Panel & Overlay
   v0.1 Floating Presenter Controls & "Why This Exists" Rationale Overlay
   (Product-Content Patched v0.1)
   ========================================================================== */

const DemoPresenterPanel = {

  // Visual badges for 3 internal feature classifications
  classifications: {
    LIVE_PRODUCT: { label: 'LIVE PRODUCT', badgeColor: '#10B981', textColor: '#FFFFFF' },
    LIVE_SANDBOX: { label: 'LIVE PRODUCT + DEMO DATA', badgeColor: '#3B82F6', textColor: '#FFFFFF' },
    CONCEPT_PREVIEW: { label: 'CONCEPT PREVIEW', badgeColor: '#8B5CF6', textColor: '#FFFFFF' }
  },

  // Presenter rationales ("Why This Exists")
  rationales: {
    demo_home: "Tích hợp Đấu trường NVS vào hệ sinh thái học tập NovaStars, không phải một ứng dụng thi trắc nghiệm độc lập.",
    demo_map: "Học sinh khám phá hành trình qua bản đồ phiêu lưu tương tác.",
    demo_lesson: "Hoàn thành bài học tích lũy Stars & XP để tham gia Đấu trường.",
    demo_mission: "Xây dựng thói quen tự học hằng ngày thông qua các nhiệm vụ rõ ràng.",
    demo_champ_home: "Trung tâm Đấu trường: 1 CTA chính cho Bài thi luyện tập hằng ngày (1 lượt miễn phí/ngày), 7 thẻ năng lực khám phá bên dưới.",
    demo_exam_ready: "Sẵn sàng làm Bài thi luyện tập hằng ngày. Cấu hình 15/20 phút hiện tại là cấu hình luyện tập Demo, KHÔNG PHẢI thể thức Vòng 1 chính thức NVS.",
    demo_exam_question: "Chế độ EXAM MODE tối giản, tập trung làm bài không gây xao nhãng.",
    demo_practice_result: "Chuyển hóa kết quả thi thử thành hành động rèn luyện tiếp theo (Coach Nova đôn đốc). Cấu hình thi hiện tại là cấu hình luyện tập Demo.",
    demo_skill_boost: "Chuyển hóa bằng chứng rèn luyện thành hành động luyện tập có mục tiêu với phản hồi tức thì.",
    demo_skill_boost_complete: "Vòng lặp phần thưởng tức thì: +30 XP, +10 Stars và hoàn thành Nhiệm vụ Ngày.",
    concept_journey_timeline: "Trực quan hóa lộ trình tham gia minh họa: Tích lũy bằng chứng rèn luyện -> Vòng 1 Online Qualification -> Vòng 2 Online Championship Round -> Chung kết Offline Final 🏆",
    concept_practice_progress: "Báo cáo bằng chứng rèn luyện 7 nhóm năng lực NL1-NL7 từ lịch sử thực tế (không đưa ra chỉ số phán đoán hay xác suất trúng tuyển giả lập).",
    concept_competition_energy: "Vòng lặp tương tác & thi đua: Bảng xếp hạng chỉ tính XP hợp lệ từ bài thi luyện tập hằng ngày miễn phí. Thử thách tốc độ là trải nghiệm luyện phản xạ, KHÔNG tạo lợi thế xếp hạng chính thức.",
    concept_leaderboard: "Tạo động lực thi đua lành mạnh mà không thao túng Pay-to-Win (chỉ tính XP từ 1 lượt luyện tập miễn phí/ngày).",
    concept_challenges: "Thử thách tốc độ giúp luyện phản xạ tự nhiên. Thử thách KHÔNG tạo lợi thế xếp hạng hay cộng điểm thi đấu chính thức NVS.",
    concept_premium_preview: "Chuyển đổi Premium đúng thời điểm học sinh có nhu cầu học tập cao nhất ('Hỏi Phụ Huynh').",
    concept_parent_progress: "Học sinh là người học; Phụ huynh là người đồng hành, hỗ trợ, ra quyết định và chi trả."
  },

  /**
   * Renders the floating presenter control bar overlay
   */
  renderControlPanel(controllerState) {
    const { gradeKey, accountTierKey, scenarioKey, currentStepIndex, steps, showRationale } = controllerState;
    const currentStep = steps[currentStepIndex] || steps[0];
    const classif = this.classifications[currentStep.classification] || this.classifications.CONCEPT_PREVIEW;

    return `
      <div id="demo-presenter-panel-root" style="position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999; background: #0F172A; color: #FFF; border-top: 3px solid #38BDF8; padding: 10px 14px; font-family: 'Nunito', sans-serif; box-shadow: 0 -8px 24px rgba(0,0,0,0.5);">
        
        <!-- Header Row: Classification Badge & Presenter Toggle -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="background: #38BDF8; color: #0F172A; font-weight: 900; font-size: 0.72rem; padding: 2px 8px; border-radius: 4px;">VISION DEMO v0.1</span>
            <span style="background: ${classif.badgeColor}; color: ${classif.textColor}; font-weight: 800; font-size: 0.72rem; padding: 2px 8px; border-radius: 4px;">${classif.label}</span>
            <span style="font-size: 0.82rem; font-weight: 800; color: #FDE047;">${currentStepIndex + 1}/${steps.length}: ${currentStep.name}</span>
          </div>

          <div style="display: flex; gap: 6px;">
            ${currentStep.id === 'demo_exam_question' ? `
              <button style="background: #F59E0B; border: none; color: #FFF; font-weight: 900; font-size: 0.75rem; padding: 4px 10px; border-radius: 6px; cursor: pointer;" onclick="window.demoController.simulateExamCompletion()">
                ⚡ SIMULATE EXAM COMPLETION
              </button>
            ` : ''}

            ${currentStep.id === 'demo_skill_boost' ? `
              <button style="background: #10B981; border: none; color: #FFF; font-weight: 900; font-size: 0.75rem; padding: 4px 10px; border-radius: 6px; cursor: pointer;" onclick="window.demoController.simulateBoostCompletion()">
                ⚡ SIMULATE BOOST COMPLETION
              </button>
            ` : ''}

            <button style="background: #8B5CF6; border: none; color: #FFF; font-weight: 900; font-size: 0.75rem; padding: 4px 10px; border-radius: 6px; cursor: pointer;" onclick="window.demoController.exportPilotResults()">
              📥 EXPORT PILOT RESULTS
            </button>

            <button style="background: ${showRationale ? '#F59E0B' : '#334155'}; border: none; color: #FFF; font-weight: 800; font-size: 0.78rem; padding: 4px 10px; border-radius: 6px; cursor: pointer;" onclick="window.demoController.toggleRationale()">
              💡 ${showRationale ? 'Ẩn Lý Do' : 'Tại Sao Có Tính Năng Này?'}
            </button>
          </div>
        </div>

        <!-- Presenter Rationale Overlay Card -->
        ${showRationale ? `
          <div style="background: #1E293B; border: 1.5px solid #F59E0B; padding: 8px 12px; border-radius: 8px; font-size: 0.82rem; color: #FEF3C7; font-weight: 700; margin-bottom: 8px; line-height: 1.35;">
            🎯 <b>TẠI SAO CÓ TÍNH NĂNG NÀY:</b> ${this.rationales[currentStep.id] || 'Định hình trải nghiệm học tập & thi đấu toàn diện.'}
          </div>
        ` : ''}

        <!-- Interactive Control Controls Grid -->
        <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center; justify-content: space-between;">
          
          <!-- Persona Selectors -->
          <div style="display: flex; gap: 6px; align-items: center;">
            <select style="background: #1E293B; color: #FFF; border: 1px solid #475569; padding: 4px 8px; border-radius: 6px; font-size: 0.78rem; font-weight: 700;" onchange="window.demoController.switchGrade(this.value)">
              <option value="GRADE_5" ${gradeKey === 'GRADE_5' ? 'selected' : ''}>Khối 5 (Chính)</option>
              <option value="GRADE_2" ${gradeKey === 'GRADE_2' ? 'selected' : ''}>Khối 2 (Nhi)</option>
            </select>

            <select style="background: #1E293B; color: #FFF; border: 1px solid #475569; padding: 4px 8px; border-radius: 6px; font-size: 0.78rem; font-weight: 700;" onchange="window.demoController.switchAccountTier(this.value)">
              <option value="FREE" ${accountTierKey === 'FREE' ? 'selected' : ''}>Miễn Phí</option>
              <option value="PREMIUM" ${accountTierKey === 'PREMIUM' ? 'selected' : ''}>Premium Preview</option>
            </select>

            <select style="background: #1E293B; color: #FFF; border: 1px solid #475569; padding: 4px 8px; border-radius: 6px; font-size: 0.78rem; font-weight: 700; max-width: 140px;" onchange="window.demoController.switchScenario(this.value)">
              <option value="BEFORE_EXAM" ${scenarioKey === 'BEFORE_EXAM' ? 'selected' : ''}>Trước Bài Thi</option>
              <option value="AFTER_EXAM" ${scenarioKey === 'AFTER_EXAM' ? 'selected' : ''}>Sau Bài Thi</option>
              <option value="AFTER_SKILL_BOOST" ${scenarioKey === 'AFTER_SKILL_BOOST' ? 'selected' : ''}>Sau Skill Boost</option>
              <option value="PREPARING_ROUND_1" ${scenarioKey === 'PREPARING_ROUND_1' ? 'selected' : ''}>Chuẩn Bị Vòng 1 (Demo)</option>
              <option value="FUTURE_FINALIST" ${scenarioKey === 'FUTURE_FINALIST' ? 'selected' : ''}>Chung Kết (Demo)</option>
            </select>
          </div>

          <!-- Navigation & Jump Controls -->
          <div style="display: flex; gap: 6px; align-items: center;">
            <button style="background: #334155; border: none; color: #FFF; font-weight: 800; padding: 4px 10px; border-radius: 6px; cursor: pointer; font-size: 0.8rem;" onclick="window.demoController.prevStep()">◀ Trước</button>

            <select style="background: #1E293B; color: #38BDF8; border: 1px solid #38BDF8; padding: 4px 8px; border-radius: 6px; font-size: 0.78rem; font-weight: 800; max-width: 130px;" onchange="window.demoController.jumpToScreen(this.value)">
              ${steps.map((s, idx) => `
                <option value="${s.id}" ${idx === currentStepIndex ? 'selected' : ''}>${idx + 1}. ${s.name}</option>
              `).join('')}
            </select>

            <button style="background: #2563EB; border: none; color: #FFF; font-weight: 800; padding: 4px 10px; border-radius: 6px; cursor: pointer; font-size: 0.8rem;" onclick="window.demoController.nextStep()">Tiếp ▶</button>
            <button style="background: #EF4444; border: none; color: #FFF; font-weight: 800; padding: 4px 10px; border-radius: 6px; cursor: pointer; font-size: 0.8rem;" onclick="window.demoController.resetDemo()">🔄 Reset</button>
          </div>

        </div>
      </div>
    `;
  },

  /**
   * Renders the Parent Handoff Modal overlay
   */
  renderParentHandoffModal() {
    return `
      <div class="ns-modal-overlay" id="parent-handoff-modal" style="display: flex;">
        <div class="ns-modal-card" style="background: #FFF; border: 4px solid #3B82F6; max-width: 340px; text-align: center;">
          <div style="font-size: 3rem; margin-bottom: 8px;">👨‍👩‍👧</div>
          <h3 style="font-family: var(--font-display); font-size: 1.25rem; color: #1E3A8A; font-weight: 800; margin: 0 0 6px 0;">
            Hãy Nhờ Bố/Mẹ Xem Phần Này Cùng Em
          </h3>
          <p style="font-size: 0.88rem; color: #475569; font-weight: 700; line-height: 1.4; margin-bottom: 14px;">
            Hệ thống đã gửi thông báo đến ứng dụng Phụ huynh (người đồng hành, hỗ trợ & chi trả) để mở khóa <b>Lời giải Chi tiết Premium & Báo cáo Tiến độ NVS</b> cho em!
          </p>

          <div style="background: #EFF6FF; border: 2px solid #93C5FD; padding: 10px; border-radius: 10px; font-size: 0.82rem; font-weight: 700; color: #1E40AF; margin-bottom: 14px;">
            📩 Đã gửi thông báo đến SĐT Phụ huynh: 098****123
          </div>

          <button class="ns-btn ns-btn-primary" style="width: 100%; font-size: 1rem; min-height: 48px;" onclick="window.demoController.closeParentHandoffAndOpenParentProgress()">
            <span>Xem Báo Cáo Phụ Huynh 📊</span>
          </button>
        </div>
      </div>
    `;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DemoPresenterPanel };
} else if (typeof window !== 'undefined') {
  window.DemoPresenterPanel = DemoPresenterPanel;
}
