/* ==========================================================================
   NovaStars × NVS Championship — Demo Concept Views
   v0.1 Isolated Concept Presentation Renderers (Content Patched v0.1)
   ========================================================================== */

const DemoConceptViews = {

  /**
   * 1. My Championship Journey (CONCEPT_PREVIEW)
   */
  renderJourneyTimeline(demoState) {
    const user = demoState.data.user || {};
    const scenario = demoState.data.scenario || {};

    return `
      <div class="ns-view" data-view="concept_journey_timeline" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box; background: linear-gradient(180deg, #0F172A 0%, #1E1B4B 100%); color: #FFF;">
        ${ChampionshipUIComponents.renderHeader({
          title: "Hành Trình Đấu Trường NVS",
          subtitle: `Mùa Giải 2026 • ${user.name} (${user.ageGroupName || 'Khối 4–5'})`,
          isExamMode: false,
          onBack: "window.demoController.prevStep()"
        })}

        <div style="flex: 1; padding: 14px; display: flex; flex-direction: column; gap: 14px; overflow-y: auto; box-sizing: border-box; width: 100%;">
          
          <!-- Coach Nova Recommendation Card (Next Best Action) -->
          <div style="background: linear-gradient(135deg, #312E81, #1E1B4B); border: 2.5px solid #FDE047; padding: 14px; border-radius: 14px; box-shadow: 0 4px 14px rgba(253, 224, 71, 0.2);">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
              <span style="font-size: 1.8rem;">🐱</span>
              <div>
                <div style="font-family: var(--font-display); font-size: 0.82rem; font-weight: 800; color: #FDE047;">COACH NOVA ĐỀ XUẤT HÀNH ĐỘNG HÔM NAY</div>
                <div style="font-size: 0.95rem; font-weight: 800; color: #FFF;">${scenario.recommendedAction || 'Tham gia luyện tập hằng ngày để tích lũy tín hiệu năng lực!'}</div>
              </div>
            </div>
            <button class="ns-btn ns-btn-primary ns-squash-press" style="width: 100%; font-size: 1rem; min-height: 48px; background: linear-gradient(135deg, #F59E0B, #D97706); margin-top: 6px;" onclick="window.demoController.jumpToScreen('demo_exam_ready')">
              <span>BẮT ĐẦU LUYỆN TẬP 🚀</span>
            </button>
          </div>

          <!-- Championship Timeline Steps (CONCEPT FORMAT) -->
          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.12); padding: 14px; border-radius: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <h3 style="font-family: var(--font-display); font-size: 1.05rem; color: #FDE047; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.4);">
                🏆 Lộ Trình Đấu Trường NVS 2026
              </h3>
              <span style="font-size: 0.72rem; background: rgba(139,92,246,0.3); color: #C4B5FD; padding: 2px 8px; border-radius: 4px; font-weight: 700;">CONCEPT FORMAT</span>
            </div>

            <!-- Stage 1: Practice Signals -->
            <div style="display: flex; gap: 12px; margin-bottom: 14px;">
              <div style="display: flex; flex-direction: column; align-items: center;">
                <div style="width: 32px; height: 32px; border-radius: 999px; background: #10B981; color: #FFF; font-weight: 800; display: flex; align-items: center; justify-content: center; font-size: 0.9rem;">✓</div>
                <div style="width: 3px; flex: 1; background: #10B981; margin-top: 4px;"></div>
              </div>
              <div>
                <div style="font-family: var(--font-display); font-size: 0.95rem; font-weight: 800; color: #34D399;">GIAI ĐOẠN 1: Tích Lũy Bằng Chứng Rèn Luyện</div>
                <div style="font-size: 0.82rem; color: #CBD5E1; font-weight: 700; margin-top: 2px;">Bài thi luyện tập hằng ngày & Skill Boost. Rèn luyện 7 nhóm năng lực NVS.</div>
              </div>
            </div>

            <!-- Stage 2: Round 1 Online Qualification -->
            <div style="display: flex; gap: 12px; margin-bottom: 14px;">
              <div style="display: flex; flex-direction: column; align-items: center;">
                <div style="width: 32px; height: 32px; border-radius: 999px; background: #F59E0B; color: #FFF; font-weight: 800; display: flex; align-items: center; justify-content: center; font-size: 0.9rem;">2</div>
                <div style="width: 3px; flex: 1; background: rgba(255,255,255,0.2); margin-top: 4px;"></div>
              </div>
              <div>
                <div style="font-family: var(--font-display); font-size: 0.95rem; font-weight: 800; color: #FBBF24;">VÒNG 1 — Online Qualification</div>
                <div style="font-size: 0.82rem; color: #CBD5E1; font-weight: 700; margin-top: 2px;">Thi đấu chính thức trực tuyến theo thể thức chuẩn từ Ban tổ chức NVS.</div>
              </div>
            </div>

            <!-- Stage 3: Round 2 Online Championship Round -->
            <div style="display: flex; gap: 12px; margin-bottom: 14px;">
              <div style="display: flex; flex-direction: column; align-items: center;">
                <div style="width: 32px; height: 32px; border-radius: 999px; background: rgba(255,255,255,0.2); color: #94A3B8; font-weight: 800; display: flex; align-items: center; justify-content: center; font-size: 0.9rem;">3</div>
                <div style="width: 3px; flex: 1; background: rgba(255,255,255,0.2); margin-top: 4px;"></div>
              </div>
              <div>
                <div style="font-family: var(--font-display); font-size: 0.95rem; font-weight: 800; color: #94A3B8;">VÒNG 2 — Online Championship Round</div>
                <div style="font-size: 0.82rem; color: #64748B; font-weight: 700; margin-top: 2px;">Giải quyết các thử thách tình huống thực tế chuyên sâu.</div>
              </div>
            </div>

            <!-- Stage 4: Offline Final -->
            <div style="display: flex; gap: 12px;">
              <div style="display: flex; flex-direction: column; align-items: center;">
                <div style="width: 32px; height: 32px; border-radius: 999px; background: rgba(255,255,255,0.2); color: #94A3B8; font-weight: 800; display: flex; align-items: center; justify-content: center; font-size: 0.9rem;">🏆</div>
              </div>
              <div>
                <div style="font-family: var(--font-display); font-size: 0.95rem; font-weight: 800; color: #94A3B8;">CHUNG KẾT — Offline Final</div>
                <div style="font-size: 0.82rem; color: #64748B; font-weight: 700; margin-top: 2px;">Vinh danh những Nhà Kiến tạo Tương lai tài năng.</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    `;
  },

  /**
   * 2. Practice Progress (CONCEPT_PREVIEW - Normalized Qualitative Statuses: Đã luyện nhiều | Đang luyện | Nên khám phá thêm)
   */
  renderPracticeProgress(demoState) {
    const signals = demoState.data.competencySignals || [];

    return `
      <div class="ns-view" data-view="concept_practice_progress" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box; background: #F8FAFC;">
        ${ChampionshipUIComponents.renderHeader({
          title: "Báo Cáo Bằng Chứng Rèn Luyện",
          subtitle: "7 Nhóm Năng Lực Kiến Tạo NVS",
          isExamMode: false,
          onBack: "window.demoController.prevStep()"
        })}

        <div style="flex: 1; padding: 14px; display: flex; flex-direction: column; gap: 12px; overflow-y: auto; box-sizing: border-box; width: 100%;">
          
          <div style="background: #EFF6FF; border: 2px solid #93C5FD; padding: 12px; border-radius: 12px; font-size: 0.85rem; color: #1E40AF; font-weight: 700;">
            💡 <b>Báo cáo Bằng chứng Rèn luyện:</b> Dựa trên số câu hỏi & bài tập đã thực hiện. Không sử dụng tỷ lệ phần trăm phán đoán hay chỉ số trúng tuyển giả lập.
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${signals.map(s => `
              <div class="ns-card" style="padding: 12px; box-sizing: border-box; width: 100%;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 1.4rem;">${s.icon}</span>
                    <div>
                      <div style="font-family: var(--font-display); font-size: 0.88rem; font-weight: 800; color: #1E293B;">${s.name} (${s.code})</div>
                      <div style="font-size: 0.78rem; color: #64748B; font-weight: 700;">Số lượt luyện tập: ${s.count} câu</div>
                    </div>
                  </div>
                  <span style="font-size: 0.78rem; padding: 4px 10px; border-radius: 999px; font-weight: 800; background: ${s.status === 'Nên khám phá thêm' ? '#FEF3C7' : (s.status === 'Đã luyện nhiều' ? '#DCFCE7' : '#EFF6FF')}; color: ${s.status === 'Nên khám phá thêm' ? '#D97706' : (s.status === 'Đã luyện nhiều' ? '#15803D' : '#1D4ED8')};">
                    ${s.status}
                  </span>
                </div>
              </div>
            `).join('')}
          </div>

        </div>
      </div>
    `;
  },

  /**
   * 3. Competition Energy Highlight: Combined Leaderboard & Challenges Preview (CONCEPT_PREVIEW)
   */
  renderCompetitionEnergyPreview(demoState) {
    const user = demoState.data.user || {};
    const rankXP = demoState.data.rankEligibleXP || 130;

    return `
      <div class="ns-view" data-view="concept_competition_energy" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box; background: #F8FAFC;">
        ${ChampionshipUIComponents.renderHeader({
          title: "Vòng Lặp Tương Tác & Thi Đua",
          subtitle: "Bảng Xếp Hạng & Thử Thách Rèn Luyện",
          isExamMode: false,
          onBack: "window.demoController.prevStep()"
        })}

        <div style="flex: 1; padding: 14px; display: flex; flex-direction: column; gap: 12px; overflow-y: auto; box-sizing: border-box; width: 100%;">
          
          <!-- Pay-to-win Protection Banner -->
          <div style="background: #FEF3C7; border: 2px solid #F59E0B; padding: 10px 14px; border-radius: 10px; font-size: 0.82rem; color: #92400E; font-weight: 700;">
            🛡️ <b>Cam kết Công bằng NVS:</b> Bảng xếp hạng CHỈ tính điểm Rank-Eligible XP từ 1 lượt luyện tập miễn phí mỗi ngày. Luyện tập thêm không mua được vị trí thứ hạng.
          </div>

          <!-- Dynamic Rank Snapshot -->
          <div class="ns-card" style="padding: 12px; background: #FFFBEB; border: 2.5px solid #F59E0B;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 1.5rem;">🥈</span>
                <div>
                  <div style="font-family: var(--font-display); font-weight: 800; font-size: 0.95rem;">${user.name} (Hạng 2 Tuần Này)</div>
                  <div style="font-size: 0.78rem; color: #64748B; font-weight: 700;">XP Hợp lệ: ${rankXP} Rank XP</div>
                </div>
              </div>
              <button class="ns-btn ns-btn-secondary" style="padding: 4px 10px; font-size: 0.78rem;" onclick="window.demoController.jumpToScreen('concept_leaderboard')">Xem Đầy Đủ 🏆</button>
            </div>
          </div>

          <!-- Speed Challenge Training Notice (Fluency Only) -->
          <div class="ns-card" style="background: linear-gradient(135deg, #1E1B4B, #312E81); color: #FFF; border-color: #FDE047; border-width: 3px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <h3 style="font-family: var(--font-display); font-size: 1.05rem; color: #FDE047; margin: 0;">⚡ Thử Thách Tốc Độ (Luyện Phản Xạ)</h3>
              <span style="font-size: 0.72rem; background: #3B82F6; color: #FFF; padding: 2px 8px; border-radius: 999px; font-weight: 800;">TRAINING ONLY</span>
            </div>
            <p style="font-size: 0.82rem; color: #E0E7FF; font-weight: 700; line-height: 1.4; margin-bottom: 8px;">
              Trải nghiệm luyện phản xạ nhanh. <i>Lưu ý: Thử thách tốc độ KHÔNG ảnh hưởng đến điểm thi đấu hay xếp hạng chính thức NVS.</i>
            </p>
            <div style="font-size: 0.82rem; color: #FDE047; font-weight: 800; margin-bottom: 10px;">🎁 Event Reward + Badge</div>
            <button class="ns-btn ns-btn-primary" style="width: 100%; min-height: 42px; font-size: 0.9rem; background: linear-gradient(135deg, #F59E0B, #D97706);" onclick="window.demoController.jumpToScreen('concept_challenges')">Khám Phá Sự Kiện 🚀</button>
          </div>

        </div>
      </div>
    `;
  },

  /**
   * 4. Leaderboard Concept (CONCEPT_PREVIEW)
   */
  renderLeaderboard(demoState) {
    const user = demoState.data.user || {};
    const rankXP = demoState.data.rankEligibleXP || 130;

    return `
      <div class="ns-view" data-view="concept_leaderboard" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box; background: #F8FAFC;">
        ${ChampionshipUIComponents.renderHeader({
          title: "Bảng Xếp Hạng Đấu Trường",
          subtitle: "Tuần 34 • Mùa Giải 2026",
          isExamMode: false,
          onBack: "window.demoController.prevStep()"
        })}

        <div style="flex: 1; padding: 14px; display: flex; flex-direction: column; gap: 12px; overflow-y: auto; box-sizing: border-box; width: 100%;">
          
          <div style="background: #FEF3C7; border: 2px solid #F59E0B; padding: 10px 14px; border-radius: 10px; font-size: 0.82rem; color: #92400E; font-weight: 700;">
            🛡️ <b>Cam kết Công bằng NVS:</b> Bảng xếp hạng CHỈ tính điểm Rank-Eligible XP từ 1 lượt luyện tập miễn phí mỗi ngày. XP mua thêm không tính hạng.
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div class="ns-card" style="display: flex; justify-content: space-between; align-items: center; border: 2.5px solid #F59E0B; background: #FFFBEB;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.5rem;">🥇</span>
                <div>
                  <div style="font-family: var(--font-display); font-weight: 800; font-size: 0.95rem;">Minh Anh</div>
                  <div style="font-size: 0.78rem; color: #64748B; font-weight: 700;">Khối 5 • Trường Tiểu học Lê Ngọc Hân</div>
                </div>
              </div>
              <div style="font-family: var(--font-display); font-weight: 800; color: #D97706;">340 Rank XP</div>
            </div>

            <div class="ns-card" style="display: flex; justify-content: space-between; align-items: center; border: 2.5px solid #3B82F6; background: #EFF6FF;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.5rem;">🥈</span>
                <div>
                  <div style="font-family: var(--font-display); font-weight: 800; font-size: 0.95rem;">${user.name} (Bạn)</div>
                  <div style="font-size: 0.78rem; color: #64748B; font-weight: 700;">Khối ${user.grade || 5} • NovaStars Student</div>
                </div>
              </div>
              <div style="font-family: var(--font-display); font-weight: 800; color: #2563EB;">${rankXP} Rank XP</div>
            </div>
          </div>

        </div>
      </div>
    `;
  },

  /**
   * 5. Challenges Concept (CONCEPT_PREVIEW)
   */
  renderChallenges() {
    return `
      <div class="ns-view" data-view="concept_challenges" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box; background: #F8FAFC;">
        ${ChampionshipUIComponents.renderHeader({
          title: "Sự Kiện & Thử Thách Rèn Luyện",
          subtitle: "Đấu Trường NVS Events",
          isExamMode: false,
          onBack: "window.demoController.prevStep()"
        })}

        <div style="flex: 1; padding: 14px; display: flex; flex-direction: column; gap: 12px; overflow-y: auto; box-sizing: border-box; width: 100%;">
          
          <div class="ns-card" style="background: linear-gradient(135deg, #1E1B4B, #312E81); color: #FFF; border-color: #FDE047; border-width: 3px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <h3 style="font-family: var(--font-display); font-size: 1.1rem; color: #FDE047; margin: 0;">⚡ Thử Thách Tốc Độ (Luyện Phản Xạ)</h3>
              <span style="font-size: 0.75rem; background: #3B82F6; color: #FFF; padding: 2px 8px; border-radius: 999px; font-weight: 800;">TRAINING ONLY</span>
            </div>
            <p style="font-size: 0.85rem; color: #E0E7FF; font-weight: 700; margin-bottom: 6px;">
              Trả lời 10 câu hỏi trong 5 phút để luyện phản xạ tự nhiên.
            </p>
            <div style="font-size: 0.82rem; color: #FDE047; font-weight: 800; margin-bottom: 10px;">🎁 Event Reward + Badge</div>
            <button class="ns-btn ns-btn-primary" style="width: 100%; min-height: 44px; font-size: 0.95rem; background: linear-gradient(135deg, #F59E0B, #D97706);">Tham Gia Luyện Tập 🚀</button>
          </div>

        </div>
      </div>
    `;
  },

  /**
   * 6. Detailed Explanation Premium Preview & Parent Handoff Modal (CONCEPT_PREVIEW - NL4 Disagreement Scenario)
   */
  renderDetailedExplanation(demoState) {
    const isPremium = demoState.data.account.isPremium;

    return `
      <div class="ns-view" data-view="concept_premium_preview" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box; background: #F8FAFC;">
        ${ChampionshipUIComponents.renderHeader({
          title: "Giải Thích Chi Tiết NL4",
          subtitle: "Giao tiếp & Thuyết phục",
          isExamMode: false,
          onBack: "window.demoController.prevStep()"
        })}

        <div style="flex: 1; padding: 14px; display: flex; flex-direction: column; gap: 12px; overflow-y: auto; box-sizing: border-box; width: 100%;">
          
          <div class="ns-card" style="box-sizing: border-box; width: 100%;">
            <div style="font-size: 0.82rem; color: #64748B; font-weight: 700; margin-bottom: 6px;">TÌNH HUỐNG THỰC TẾ:</div>
            <p style="font-size: 0.9rem; font-weight: 800; color: #1E293B; margin-bottom: 10px; line-height: 1.4;">
              Trong buổi làm việc nhóm, một bạn đưa ra ý tưởng mà em không đồng ý. Em nên phản hồi thế nào để vừa thể hiện quan điểm, vừa giữ cuộc trao đổi tích cực?
            </p>

            <div style="font-size: 0.85rem; color: #EF4444; font-weight: 800; margin-bottom: 4px;">❌ Lựa chọn chưa tối ưu: "Ý của bạn dở tệ."</div>
            <div style="font-size: 0.85rem; color: #10B981; font-weight: 800; margin-bottom: 10px;">✅ Phản hồi tích cực: "Tớ hiểu góc nhìn của bạn. Tớ có một ý khác, mình cùng so sánh hai cách nhé?"</div>
            
            <div style="font-weight: 800; font-size: 0.95rem; color: #1E293B; margin-bottom: 6px;">💡 Hướng dẫn giao tiếp:</div>
            <p style="font-size: 0.85rem; color: #475569; font-weight: 700; line-height: 1.4; margin-bottom: 12px;">
              • Ghi nhận góc nhìn của đối phương trước để tạo thiện cảm.<br>
              • Bày tỏ sự không đồng ý một cách lịch sự, không đả kích cá nhân.<br>
              • Mời hợp tác so sánh giải pháp để giữ cuộc trao đổi diễn ra tích cực.
            </p>

            ${!isPremium ? `
              <div style="background: linear-gradient(135deg, #FEF3C7, #FFFBEB); border: 2.5px dashed #F59E0B; padding: 14px; border-radius: 12px; text-align: center; margin-top: 10px;">
                <div style="font-size: 2rem; margin-bottom: 4px;">🔒</div>
                <div style="font-family: var(--font-display); font-weight: 800; font-size: 1rem; color: #92400E;">Coach Nova Phân Tích Từng Bước Premium</div>
                <p style="font-size: 0.82rem; color: #B45309; font-weight: 700; margin: 4px 0 12px 0;">Xem sơ đồ tư duy giao tiếp 3 bước & gợi ý tình huống nâng cao.</p>

                <button class="ns-btn ns-btn-primary" style="width: 100%; background: linear-gradient(135deg, #F59E0B, #D97706); font-size: 0.95rem; min-height: 44px;" onclick="window.demoController.openParentHandoffModal()">
                  <span>HỎI PHỤ HUYNH MỞ KHÓA 👨‍👩‍👧</span>
                </button>
              </div>
            ` : `
              <div style="background: #F0FDF4; border: 2.5px solid #10B981; padding: 14px; border-radius: 12px; margin-top: 10px;">
                <div style="font-family: var(--font-display); font-weight: 800; font-size: 0.98rem; color: #15803D; margin-bottom: 6px;">✨ Coach Nova Phân Tích Từng Bước (Premium Active):</div>
                <p style="font-size: 0.85rem; color: #166534; font-weight: 700; line-height: 1.4;">
                  1. Ghi nhận góc nhìn (Tạo thiện cảm) -> 2. Đề xuất phương án thay thế nhẹ nhàng (Tập trung vào giải pháp) -> 3. Mời cùng so sánh (Tạo tinh thần đồng đội).
                </p>
              </div>
            `}
          </div>

          <button class="ns-btn ns-btn-secondary" style="width: 100%; min-height: 48px;" onclick="window.demoController.jumpToScreen('concept_parent_progress')">
            <span>Xem Báo Cáo Phụ Huynh 📊</span>
          </button>

        </div>
      </div>
    `;
  },

  /**
   * 7. Parent Progress Dashboard (CONCEPT_PREVIEW - Dynamic Metrics & Supporter Rationale)
   */
  renderParentProgress(demoState) {
    const user = demoState.data.user || {};
    const streak = demoState.data.streak || 3;
    const completedExamsCount = demoState.data.scenario.hasExamToday ? 12 : 11;

    return `
      <div class="ns-view" data-view="concept_parent_progress" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box; background: #F8FAFC;">
        ${ChampionshipUIComponents.renderHeader({
          title: "Báo Cáo Tiến Độ Cho Phụ Huynh",
          subtitle: `Học sinh: ${user.name} (Khối ${user.grade || 5})`,
          isExamMode: false,
          onBack: "window.demoController.prevStep()"
        })}

        <div style="flex: 1; padding: 14px; display: flex; flex-direction: column; gap: 12px; overflow-y: auto; box-sizing: border-box; width: 100%;">
          
          <div class="ns-card" style="background: linear-gradient(135deg, #1E1B4B, #312E81); color: #FFF; border-color: #93C5FD;">
            <div style="font-family: var(--font-display); font-size: 1.1rem; color: #FDE047; font-weight: 800; margin-bottom: 4px;">
              👨‍👩‍👧 Bảng Đồng Hành Cùng Con — Đấu Trường NVS
            </div>
            <p style="font-size: 0.85rem; color: #E0E7FF; font-weight: 700;">Phụ huynh là người đồng hành, hỗ trợ, ra quyết định & chi trả.</p>
          </div>

          <!-- Dynamic Metric Cards -->
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
            <div class="ns-card" style="padding: 10px; text-align: center;">
              <div style="font-size: 0.75rem; color: #64748B; font-weight: 700;">NGÀY HOẠT ĐỘNG</div>
              <div style="font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; color: #2563EB;">${streak} Ngày</div>
            </div>
            <div class="ns-card" style="padding: 10px; text-align: center;">
          <div class="ns-card">
            <h4 style="font-family: var(--font-display); font-size: 0.95rem; color: #1E293B; margin: 0 0 6px 0;">🎯 Trọng Tâm Rèn Luyện Tuần Này</h4>
            <p style="font-size: 0.85rem; color: #475569; font-weight: 700; line-height: 1.4; margin: 0;">
              Con đang tích cực rèn luyện <b>NL4: Năng lực Giao tiếp, truyền cảm hứng và thuyết phục</b>. Khuyên phụ huynh động viên con duy trì thói quen làm Bài thi luyện tập hằng ngày.
            </p>
          </div>

        </div>
      </div>
    `;
  },

  /**
   * Team-Only Final Discussion / Checkpoint Screen (Requirement 10)
   */
  renderTeamFeedback() {
    return `
      <div class="ns-view" data-view="concept_team_feedback" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box; background: linear-gradient(180deg, #0F172A 0%, #1E1B4B 100%); color: #FFF; padding: 14px; overflow-y: auto;">
        <div style="background: rgba(139, 92, 246, 0.15); border: 2px solid #8B5CF6; border-radius: 14px; padding: 16px; margin-bottom: 14px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
            <span style="font-size: 1.5rem;">💬</span>
            <div>
              <h3 style="font-family: var(--font-display); font-size: 1.15rem; color: #FDE047; margin: 0;">NOVASTARS TEAM ALIGNMENT CHECKPOINT</h3>
              <span style="font-size: 0.75rem; background: #8B5CF6; color: #FFF; padding: 2px 6px; border-radius: 4px; font-weight: 800;">INTERNAL DISCUSSION ONLY</span>
            </div>
          </div>
          <p style="font-size: 0.85rem; color: #E2E8F0; font-weight: 700; margin: 0 0 14px 0; line-height: 1.4;">
            Dành cho đội ngũ NovaStars cùng thảo luận và thống nhất tầm nhìn sản phẩm sau khi xem trọn vẹn 12 bước trải nghiệm:
          </p>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid #334155; padding: 12px; border-radius: 10px;">
              <div style="font-size: 0.88rem; font-weight: 800; color: #38BDF8; margin-bottom: 4px;">1. Phần nào trong vòng lặp cảm thấy mạnh mẽ nhất?</div>
              <div style="font-size: 0.8rem; color: #94A3B8; font-weight: 700;">Test / Coach / Train / Reward / Journey / Competition</div>
            </div>

            <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid #334155; padding: 12px; border-radius: 10px;">
              <div style="font-size: 0.88rem; font-weight: 800; color: #FBBF24; margin-bottom: 4px;">2. Phần nào khó hiểu nhất hoặc cần đơn giản hóa?</div>
              <div style="font-size: 0.8rem; color: #94A3B8; font-weight: 700;">Góc nhìn của học sinh & phụ huynh khi trải nghiệm lần đầu</div>
            </div>

            <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid #334155; padding: 12px; border-radius: 10px;">
              <div style="font-size: 0.88rem; font-weight: 800; color: #34D399; margin-bottom: 4px;">3. Yếu tố nào làm trẻ muốn quay lại học mỗi ngày?</div>
              <div style="font-size: 0.8rem; color: #94A3B8; font-weight: 700;">Chuỗi streak, phần thưởng Stars/XP hay thử thách cá nhân?</div>
            </div>

            <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid #334155; padding: 12px; border-radius: 10px;">
              <div style="font-size: 0.88rem; font-weight: 800; color: #EF4444; margin-bottom: 4px;">4. Tính năng nào tuyệt đối KHÔNG NÊN làm?</div>
              <div style="font-size: 0.8rem; color: #94A3B8; font-weight: 700;">Ví dụ: thao túng Pay-to-win, gây áp lực điểm số gắt gao</div>
            </div>

            <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid #8B5CF6; padding: 12px; border-radius: 10px;">
              <div style="font-size: 0.88rem; font-weight: 800; color: #C4B5FD; margin-bottom: 4px;">5. Ý tưởng tương lai nào xứng đáng làm thử nghiệm tiếp theo?</div>
              <div style="font-size: 0.8rem; color: #94A3B8; font-weight: 700;">Bảng xếp hạng năng lực, thử thách tốc độ hay báo cáo nâng cao cho Phụ huynh?</div>
            </div>
          </div>
        </div>

        <button class="ns-btn ns-btn-primary" style="width: 100%; min-height: 48px; font-size: 1rem;" onclick="window.demoController.resetDemo()">
          <span>🔄 QUAY LẠI TỪ ĐẦU (RESET DEMO)</span>
        </button>
      </div>
    `;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DemoConceptViews };
} else if (typeof window !== 'undefined') {
  window.DemoConceptViews = DemoConceptViews;
}
