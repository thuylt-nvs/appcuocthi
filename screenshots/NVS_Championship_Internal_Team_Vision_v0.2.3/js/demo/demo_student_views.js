/* ==========================================================================
   NovaStars × NVS Championship — Demo Student Views
   v0.2.3 Clean Child-Facing Renderers (Score-Sensitive & Feedback Validation)
   ========================================================================== */

const DemoStudentViews = {

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  },

  renderWelcome() {
    return `
      <div class="ns-view" data-view="student_welcome" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; box-sizing: border-box; background: linear-gradient(180deg, #0F172A 0%, #1E1B4B 100%); color: #FFF; padding: 24px; text-align: center;">
        <div style="font-size: 3.5rem; margin-bottom: 10px;" class="ns-pulse-glow">🏆</div>
        <h1 style="font-family: var(--font-display); font-size: 1.6rem; color: #FDE047; font-weight: 900; margin: 0 0 8px 0; text-shadow: 0 2px 8px rgba(0,0,0,0.5);">
          CHÀO MỪNG ĐẾN ĐẤU TRƯỜNG NVS!
        </h1>
        <p style="font-size: 1rem; color: #E0E7FF; font-weight: 700; max-width: 320px; margin-bottom: 24px; line-height: 1.4;">
          Hãy thử một hành trình ngắn cùng Coach Nova nhé!
        </p>

        <div style="background: rgba(255,255,255,0.08); border: 2px solid rgba(255,255,255,0.15); padding: 20px; border-radius: 16px; width: 100%; max-width: 340px; box-sizing: border-box;">
          <label style="font-family: var(--font-display); font-size: 1.05rem; font-weight: 800; color: #38BDF8; display: block; margin-bottom: 14px;">
            Em đang học khối nào?
          </label>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            <button class="ns-btn ns-btn-primary ns-squash-press" style="min-height: 52px; font-size: 1.05rem; background: linear-gradient(135deg, #3B82F6, #1D4ED8);" onclick="window.studentController.startPilot('GRADE_1_3')">
              <span>🎈 Khối 1 – 3</span>
            </button>
            <button class="ns-btn ns-btn-primary ns-squash-press" style="min-height: 52px; font-size: 1.05rem; background: linear-gradient(135deg, #F59E0B, #D97706);" onclick="window.studentController.startPilot('GRADE_4_5')">
              <span>🚀 Khối 4 – 5</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  renderHome(studentState) {
    const xp = studentState.xp ?? 0;
    const stars = studentState.stars ?? 0;
    const streak = studentState.streak ?? 1;

    return `
      <div class="ns-view" data-view="student_home" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box; background: #F8FAFC;">
        <div style="background: #0F172A; color: #FFF; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.4rem;">🐱</span>
            <div>
              <div style="font-family: var(--font-display); font-weight: 800; font-size: 0.95rem; color: #FDE047;">NovaStars Student</div>
              <div style="font-size: 0.75rem; color: #94A3B8; font-weight: 700;">Hành trình rèn luyện kỹ năng</div>
            </div>
          </div>
          <div style="display: flex; gap: 10px; font-weight: 800; font-size: 0.85rem;">
            <span style="color: #F59E0B;">🔥 ${streak} Ngày</span>
            <span style="color: #38BDF8;">⭐ ${stars}</span>
            <span style="color: #34D399;">⚡ ${xp} XP</span>
          </div>
        </div>

        <div style="flex: 1; padding: 16px; display: flex; flex-direction: column; gap: 14px; box-sizing: border-box; overflow-y: auto;">
          <div class="ns-card" style="background: linear-gradient(135deg, #1E1B4B, #312E81); color: #FFF; text-align: center; padding: 20px; border-color: #FDE047;">
            <div style="font-size: 2.8rem; margin-bottom: 6px;">🏆</div>
            <h2 style="font-family: var(--font-display); font-size: 1.3rem; color: #FDE047; margin: 0 0 6px 0;">ĐẤU TRƯỜNG NVS 2026</h2>
            <p style="font-size: 0.9rem; color: #E0E7FF; font-weight: 700; margin-bottom: 16px;">
              Khám phá năng lực bản thân qua các bài rèn luyện hằng ngày!
            </p>
            <button class="ns-btn ns-btn-primary ns-squash-press" style="width: 100%; min-height: 50px; font-size: 1.1rem; background: linear-gradient(135deg, #F59E0B, #D97706);" onclick="window.studentController.nextStep()">
              <span>VÀO ĐẤU TRƯỜNG NVS 🚀</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  renderChampionshipHome() {
    return `
      <div class="ns-view" data-view="student_champ_home" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box; background: #F8FAFC;">
        ${ChampionshipUIComponents.renderHeader({
          title: "Đấu Trường NVS",
          subtitle: "Trải Nghiệm Rút Gọn",
          isExamMode: false,
          onBack: "window.studentController.prevStep()"
        })}

        <div style="flex: 1; padding: 14px; display: flex; flex-direction: column; gap: 14px; overflow-y: auto; box-sizing: border-box;">
          <div style="background: linear-gradient(135deg, #EFF6FF, #DBEAFE); border: 2px solid #3B82F6; padding: 14px; border-radius: 14px; display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 2.2rem;">🐱</span>
            <div>
              <div style="font-family: var(--font-display); font-weight: 800; font-size: 0.95rem; color: #1E40AF;">Chào em! Coach Nova rất vui được đồng hành.</div>
              <div style="font-size: 0.82rem; color: #1E3A8A; font-weight: 700; margin-top: 2px;">Hôm nay chúng mình cùng thử 5 câu hỏi nhanh nhé!</div>
            </div>
          </div>

          <div class="ns-card" style="border: 2.5px solid #F59E0B; background: #FFFBEB;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-family: var(--font-display); font-size: 1.05rem; font-weight: 800; color: #B45309;">📝 Bài Luyện Tập Trải Nghiệm</span>
              <span style="font-size: 0.75rem; background: #F59E0B; color: #FFF; padding: 2px 8px; border-radius: 999px; font-weight: 800;">5 CÂU • ~4 PHÚT</span>
            </div>
            <p style="font-size: 0.85rem; color: #78350F; font-weight: 700; margin-bottom: 14px;">
              Thử thách khả năng tư duy và phản xạ tự nhiên.
            </p>
            <button class="ns-btn ns-btn-primary ns-squash-press" style="width: 100%; min-height: 48px; font-size: 1.05rem; background: linear-gradient(135deg, #F59E0B, #D97706);" onclick="window.studentController.nextStep()">
              <span>BẮT ĐẦU TRẢI NGHIỆM 🚀</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  renderExamQuestion(currentQuestion, currentIdx, totalQuestions, shuffledOptions) {
    const qId = currentQuestion.itemId || currentQuestion.id;
    const opts = shuffledOptions || currentQuestion.options || [];

    return `
      <div class="ns-view" data-view="student_exam_question" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box; background: #F8FAFC;">
        ${ChampionshipUIComponents.renderHeader({
          title: "BẢN TRẢI NGHIỆM RÚT GỌN",
          subtitle: `Câu ${currentIdx + 1} / ${totalQuestions}`,
          isExamMode: true
        })}

        <div style="flex: 1; padding: 14px; display: flex; flex-direction: column; gap: 14px; overflow-y: auto; box-sizing: border-box;">
          <div class="ns-card" style="border: 2px solid #3B82F6;">
            <div style="font-size: 0.8rem; color: #2563EB; font-weight: 800; margin-bottom: 6px;">CÂU HỎI ${currentIdx + 1}:</div>
            <p style="font-size: 0.98rem; font-weight: 800; color: #1E293B; line-height: 1.45; margin: 0 0 14px 0;">
              ${currentQuestion.stem}
            </p>

            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${opts.map((opt, oIdx) => {
                const optId = opt.id || `opt_${oIdx}`;
                const text = typeof opt === 'string' ? opt : opt.text;
                return `
                  <button class="ns-btn ns-btn-secondary" style="text-align: left; justify-content: flex-start; min-height: 46px; font-size: 0.9rem; padding: 8px 12px; line-height: 1.35;" onclick="window.studentController.answerExamQuestion('${qId}', '${optId}')">
                    ${text}
                  </button>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderPracticeResult(scoreData) {
    const score = scoreData.score ?? 80;
    let encouragement = 'Tuyệt vời! Em đã xử lý rất tốt nhiều tình huống.';
    if (score < 40) {
      encouragement = 'Em đã hoàn thành thử thách! Cùng Coach Nova khám phá thêm nhé.';
    } else if (score < 80) {
      encouragement = 'Khởi đầu tốt! Cùng Coach Nova luyện thêm nhé.';
    }

    return `
      <div class="ns-view" data-view="student_practice_result" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box; background: #F8FAFC;">
        ${ChampionshipUIComponents.renderHeader({
          title: "ĐIỂM BÀI TRẢI NGHIỆM",
          subtitle: "Kết Quả Rèn Luyện",
          isExamMode: false
        })}

        <div style="flex: 1; padding: 14px; display: flex; flex-direction: column; gap: 14px; overflow-y: auto; box-sizing: border-box;">
          <div class="ns-card" style="text-align: center; padding: 20px; background: linear-gradient(135deg, #EFF6FF, #DBEAFE); border: 2.5px solid #3B82F6;">
            <div style="font-size: 2.5rem; margin-bottom: 4px;">🎉</div>
            <div style="font-size: 0.82rem; color: #1D4ED8; font-weight: 800; margin-bottom: 2px;">Dựa trên bài trải nghiệm ngắn này...</div>
            <h2 style="font-family: var(--font-display); font-size: 1.25rem; color: #1E40AF; margin: 0 0 4px 0;">
              ${encouragement}
            </h2>
            <div style="font-family: var(--font-display); font-size: 2rem; font-weight: 900; color: #2563EB; margin-bottom: 8px;">
              ${score} / 100 ĐIỂM
            </div>
            <p style="font-size: 0.85rem; color: #1E3A8A; font-weight: 700; margin: 0;">
              Trả lời đúng ${scoreData.correctCount ?? 4} / ${scoreData.totalCount ?? 5} câu hỏi
            </p>
          </div>

          <div style="background: linear-gradient(135deg, #FEF3C7, #FFFBEB); border: 2px solid #F59E0B; padding: 14px; border-radius: 14px; display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 2rem;">🐱</span>
            <div>
              <div style="font-family: var(--font-display); font-weight: 800; font-size: 0.92rem; color: #92400E;">COACH NOVA GỢI Ý:</div>
              <div style="font-size: 0.85rem; color: #78350F; font-weight: 700; margin-top: 2px;">Coach Nova mời em thử thêm 3 tình huống rèn luyện tiếp theo để nhận phần thưởng nhé!</div>
            </div>
          </div>

          <button class="ns-btn ns-btn-primary ns-squash-press" style="width: 100%; min-height: 48px; font-size: 1.05rem; background: linear-gradient(135deg, #F59E0B, #D97706);" onclick="window.studentController.nextStep()">
            <span>LUYỆN TIẾP SKILL BOOST 🚀</span>
          </button>
        </div>
      </div>
    `;
  },

  renderSkillBoostQuestion(currentQuestion, currentIdx, totalQuestions, feedback, shuffledOptions) {
    const qId = currentQuestion.itemId || currentQuestion.id;
    const opts = shuffledOptions || currentQuestion.options || [];

    return `
      <div class="ns-view" data-view="student_skill_boost" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box; background: #F8FAFC;">
        ${ChampionshipUIComponents.renderHeader({
          title: "SKILL BOOST RÚT GỌN",
          subtitle: `Câu ${currentIdx + 1} / ${totalQuestions}`,
          isExamMode: false
        })}

        <div style="flex: 1; padding: 14px; display: flex; flex-direction: column; gap: 12px; overflow-y: auto; box-sizing: border-box;">
          <div class="ns-card" style="border: 2px solid #10B981;">
            <div style="font-size: 0.8rem; color: #059669; font-weight: 800; margin-bottom: 4px;">SKILL BOOST CÂU ${currentIdx + 1}:</div>
            <p style="font-size: 0.95rem; font-weight: 800; color: #1E293B; line-height: 1.4; margin: 0 0 12px 0;">
              ${currentQuestion.stem}
            </p>

            ${!feedback ? `
              <div style="display: flex; flex-direction: column; gap: 8px;">
                ${opts.map((opt, oIdx) => {
                  const optId = opt.id || `opt_${oIdx}`;
                  const text = typeof opt === 'string' ? opt : opt.text;
                  return `
                    <button class="ns-btn ns-btn-secondary" style="text-align: left; justify-content: flex-start; min-height: 44px; font-size: 0.88rem; padding: 8px 12px; line-height: 1.35;" onclick="window.studentController.answerBoostQuestion('${qId}', '${optId}')">
                      ${text}
                    </button>
                  `;
                }).join('')}
              </div>
            ` : `
              <div style="background: ${feedback.isCorrect ? '#F0FDF4' : '#FEF2F2'}; border: 2px solid ${feedback.isCorrect ? '#10B981' : '#EF4444'}; padding: 12px; border-radius: 12px; margin-bottom: 12px;">
                <div style="font-weight: 800; font-size: 0.95rem; color: ${feedback.isCorrect ? '#15803D' : '#991B1B'}; margin-bottom: 4px;">
                  ${feedback.isCorrect ? '✅ ĐÁP ÁN CHÍNH XÁC! (+6 XP)' : '❌ CHƯA CHÍNH XÁC'}
                </div>
                <p style="font-size: 0.82rem; color: #334155; font-weight: 700; margin: 0;">
                  ${currentQuestion.explanation}
                </p>
              </div>

              <button class="ns-btn ns-btn-primary" style="width: 100%; min-height: 44px; background: linear-gradient(135deg, #10B981, #059669);" onclick="window.studentController.advanceBoostQuestion()">
                <span>${currentIdx + 1 < totalQuestions ? 'CÂU TIẾP THEO 🚀' : 'HOÀN THÀNH SKILL BOOST 🎉'}</span>
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  },

  renderRewardMoment(studentState) {
    const earnedXP = studentState.boostXpEarned ?? ((studentState.boostCorrectCount ?? 3) * 6);

    return `
      <div class="ns-view" data-view="student_reward" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box; background: linear-gradient(180deg, #0F172A 0%, #1E1B4B 100%); color: #FFF; text-align: center; padding: 20px;">
        ${ChampionshipUIComponents.renderHeader({
          title: "PHẦN THƯỞNG RÈN LUYỆN",
          subtitle: "Chúc Mừng Em!",
          isExamMode: false
        })}

        <div style="flex: 1; padding: 14px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; box-sizing: border-box;">
          <div style="font-size: 3.5rem;" class="ns-pulse-glow">🎁</div>
          <h2 style="font-family: var(--font-display); font-size: 1.4rem; color: #FDE047; font-weight: 900; margin: 0;">
            HOÀN THÀNH XUẤT SẮC!
          </h2>

          <div style="display: flex; gap: 12px; width: 100%; max-width: 320px;">
            <div class="ns-card" style="flex: 1; background: rgba(255,255,255,0.1); border-color: #38BDF8; color: #FFF; padding: 12px;">
              <div style="font-size: 1.5rem;">⚡</div>
              <div style="font-family: var(--font-display); font-size: 1.2rem; font-weight: 900; color: #38BDF8;">+${earnedXP} XP</div>
              <div style="font-size: 0.75rem; color: #94A3B8;">Kinh nghiệm</div>
            </div>
            <div class="ns-card" style="flex: 1; background: rgba(255,255,255,0.1); border-color: #F59E0B; color: #FFF; padding: 12px;">
              <div style="font-size: 1.5rem;">⭐</div>
              <div style="font-family: var(--font-display); font-size: 1.2rem; font-weight: 900; color: #F59E0B;">+10 Stars</div>
              <div style="font-size: 0.75rem; color: #94A3B8;">Ngôi sao phần thưởng</div>
            </div>
          </div>

          <div style="background: rgba(52,211,153,0.15); border: 2px solid #34D399; padding: 10px 16px; border-radius: 12px; color: #34D399; font-weight: 800; font-size: 0.88rem;">
            ✓ Đã hoàn thành 1 Nhiệm vụ Ngày!
          </div>

          <button class="ns-btn ns-btn-primary ns-squash-press" style="width: 100%; max-width: 320px; min-height: 48px; font-size: 1rem; background: linear-gradient(135deg, #F59E0B, #D97706);" onclick="window.studentController.nextStep()">
            <span>XEM HÀNH TRÌNH TIẾP THEO 🚀</span>
          </button>
        </div>
      </div>
    `;
  },

  renderStudentJourney() {
    return `
      <div class="ns-view" data-view="student_journey" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box; background: linear-gradient(180deg, #0F172A 0%, #1E1B4B 100%); color: #FFF;">
        ${ChampionshipUIComponents.renderHeader({
          title: "HÀNH TRÌNH CHỦ ĐỘNG",
          subtitle: "Đấu Trường NVS",
          isExamMode: false,
          onBack: "window.studentController.prevStep()"
        })}

        <div style="flex: 1; padding: 14px; display: flex; flex-direction: column; gap: 14px; overflow-y: auto; box-sizing: border-box;">
          <div style="text-align: center; background: rgba(255,255,255,0.08); border: 2px solid #FDE047; padding: 14px; border-radius: 14px;">
            <div style="font-size: 2rem;">🌟</div>
            <h3 style="font-family: var(--font-display); font-size: 1.1rem; color: #FDE047; margin: 4px 0 2px 0;">MỖI NGÀY EM TIẾN THÊM MỘT BƯỚC!</h3>
            <p style="font-size: 0.82rem; color: #CBD5E1; font-weight: 700; margin: 0;">Kiên trì rèn luyện hằng ngày để tự tin chinh phục các vòng thi.</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.12); padding: 14px; border-radius: 14px; display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; gap: 10px; align-items: center;">
              <span style="font-size: 1.3rem;">✅</span>
              <div>
                <div style="font-weight: 800; font-size: 0.92rem; color: #34D399;">HÔM NAY: Hoàn thành trải nghiệm</div>
              </div>
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
              <span style="font-size: 1.3rem;">📝</span>
              <div>
                <div style="font-weight: 800; font-size: 0.92rem; color: #FBBF24;">LUYỆN TẬP HẰNG NGÀY</div>
              </div>
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
              <span style="font-size: 1.3rem;">🚀</span>
              <div>
                <div style="font-weight: 800; font-size: 0.92rem; color: #94A3B8;">VÒNG 1</div>
              </div>
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
              <span style="font-size: 1.3rem;">🔥</span>
              <div>
                <div style="font-weight: 800; font-size: 0.92rem; color: #94A3B8;">VÒNG 2</div>
              </div>
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
              <span style="font-size: 1.3rem;">🏆</span>
              <div>
                <div style="font-weight: 800; font-size: 0.92rem; color: #94A3B8;">CHUNG KẾT</div>
              </div>
            </div>
          </div>

          <button class="ns-btn ns-btn-primary ns-squash-press" style="width: 100%; min-height: 48px; font-size: 1rem; background: linear-gradient(135deg, #3B82F6, #1D4ED8);" onclick="window.studentController.nextStep()">
            <span>GỬI ĐÁNH GIÁ CỦA EM ✍️</span>
          </button>
        </div>
      </div>
    `;
  },

  renderStudentFeedback(feedbackState) {
    const q1 = feedbackState.q1;
    const q2 = feedbackState.q2;
    const q3 = feedbackState.q3;
    const isValid = (q1 !== null && q2 !== null && q3 !== null);

    return `
      <div class="ns-view" data-view="student_feedback" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box; background: #F8FAFC;">
        ${ChampionshipUIComponents.renderHeader({
          title: "ĐÁNH GIÁ TRẢI NGHIỆM",
          subtitle: "Ý Kiến Của Em",
          isExamMode: false
        })}

        <div style="flex: 1; padding: 14px; display: flex; flex-direction: column; gap: 14px; overflow-y: auto; box-sizing: border-box;">
          
          <!-- Q1 Rating -->
          <div class="ns-card">
            <label style="font-weight: 800; font-size: 0.92rem; color: #1E293B; display: block; margin-bottom: 8px;">
              1. Em thấy app có dễ hiểu không? <span style="color: #EF4444;">*</span>
            </label>
            <div style="display: flex; justify-content: space-around; font-size: 1.6rem;">
              ${[1, 2, 3, 4, 5].map(val => `
                <button style="background: none; border: ${q1 === val ? '3px solid #3B82F6' : 'none'}; border-radius: 999px; padding: 4px; cursor: pointer;" onclick="window.studentController.setFeedbackRating(${val})">
                  ${val === 1 ? '😕' : (val === 2 ? '😐' : (val === 3 ? '🙂' : (val === 4 ? '😊' : '😄')))}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Q2 Favorite Part -->
          <div class="ns-card">
            <label style="font-weight: 800; font-size: 0.92rem; color: #1E293B; display: block; margin-bottom: 8px;">
              2. Phần nào em thích nhất? <span style="color: #EF4444;">*</span>
            </label>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${['Bài thi', 'Coach Nova', 'Skill Boost', 'Nhận thưởng', 'Hành trình Championship'].map(part => `
                <button class="ns-btn ${q2 === part ? 'ns-btn-primary' : 'ns-btn-secondary'}" style="padding: 6px 10px; font-size: 0.8rem;" onclick="window.studentController.setFavoritePart('${part}')">
                  ${part}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Q3 Return Intent -->
          <div class="ns-card">
            <label style="font-weight: 800; font-size: 0.92rem; color: #1E293B; display: block; margin-bottom: 8px;">
              3. Em có muốn quay lại luyện tiếp ngày mai không? <span style="color: #EF4444;">*</span>
            </label>
            <div style="display: flex; gap: 8px;">
              ${['Có!', 'Có thể', 'Không'].map(ans => `
                <button class="ns-btn ${q3 === ans ? 'ns-btn-primary' : 'ns-btn-secondary'}" style="flex: 1; padding: 6px 10px; font-size: 0.85rem;" onclick="window.studentController.setReturnIntent('${ans}')">
                  ${ans}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Optional Suggestion -->
          <div class="ns-card">
            <label style="font-weight: 800; font-size: 0.88rem; color: #1E293B; display: block; margin-bottom: 4px;">
              Em muốn app thay đổi điều gì? (Tùy chọn)
            </label>
            <div style="font-size: 0.75rem; color: #64748B; font-weight: 700; margin-bottom: 8px;">
              🔒 Không cần ghi tên, trường, số điện thoại hay thông tin cá nhân của em nhé.
            </div>
            <input type="text" id="student-suggestion-input" maxlength="200" placeholder="Viết ý kiến của em tại đây (tối đa 200 ký tự)..." style="width: 100%; padding: 8px 12px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.85rem; box-sizing: border-box;" value="${this.escapeHtml(feedbackState.suggestion || '')}" onchange="window.studentController.setSuggestion(this.value)">
          </div>

          <button class="ns-btn ns-btn-primary ns-squash-press" style="width: 100%; min-height: 48px; font-size: 1rem; background: ${isValid ? 'linear-gradient(135deg, #10B981, #059669)' : '#94A3B8'}; cursor: ${isValid ? 'pointer' : 'not-allowed'};" ${isValid ? '' : 'disabled'} onclick="window.studentController.submitFeedback()">
            <span>${isValid ? 'HOÀN THÀNH & GỬI 🚀' : 'VUI LÒNG CHỌN CÂU 1, 2, 3'}</span>
          </button>
        </div>
      </div>
    `;
  },

  renderThankYou() {
    return `
      <div class="ns-view" data-view="student_thank_you" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; box-sizing: border-box; background: linear-gradient(180deg, #0F172A 0%, #1E1B4B 100%); color: #FFF; padding: 24px; text-align: center;">
        <div style="font-size: 4rem; margin-bottom: 12px;" class="ns-pulse-glow">⭐</div>
        <h2 style="font-family: var(--font-display); font-size: 1.6rem; color: #FDE047; font-weight: 900; margin: 0 0 8px 0;">
          CẢM ƠN EM! ⭐
        </h2>
        <p style="font-size: 1rem; color: #E0E7FF; font-weight: 700; max-width: 320px; margin-bottom: 24px; line-height: 1.4;">
          Coach Nova sẽ gặp lại em trong thử thách tiếp theo!
        </p>

        <button class="ns-btn ns-btn-primary ns-squash-press" style="width: 100%; max-width: 280px; min-height: 50px; font-size: 1.05rem; background: linear-gradient(135deg, #3B82F6, #1D4ED8);" onclick="window.studentController.restartPilot()">
          <span>🔄 CHƠI LẠI TRẢI NGHIỆM</span>
        </button>
      </div>
    `;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DemoStudentViews };
} else if (typeof window !== 'undefined') {
  window.DemoStudentViews = DemoStudentViews;
}
