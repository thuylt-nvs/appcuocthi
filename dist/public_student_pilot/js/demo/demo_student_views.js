/* ==========================================================================
   NovaStars × NVS Championship — Demo Student Views
   v0.2.4 Mobile-First Child-Facing Experience (Thumb-Zone & Tactile Ergonomics)
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

  // 1. Welcome & Grade Selection Screen
  renderWelcome(studentState) {
    return `
      <div class="ns-view" data-view="student_welcome" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: space-between; width: 100%; box-sizing: border-box; background: linear-gradient(180deg, #0F172A 0%, #1E1B4B 100%); color: #FFF; padding: max(24px, env(safe-area-inset-top)) 20px max(24px, env(safe-area-inset-bottom)) 20px; text-align: center;">
        
        <div style="width: 100%; display: flex; flex-direction: column; align-items: center; margin-top: 10px;" data-god-header="true">
          <div style="font-size: 3.5rem; margin-bottom: 8px; cursor: pointer;" class="ns-pulse-glow animate-bounce">🏆</div>
          <h1 style="font-family: var(--font-display); font-size: 1.55rem; color: #FDE047; font-weight: 900; margin: 0 0 8px 0; text-shadow: 0 3px 10px rgba(0,0,0,0.6); letter-spacing: 0.5px; cursor: pointer;">
            ĐẤU TRƯỜNG NVS 2026
          </h1>
          <p style="font-size: 0.95rem; color: #E0E7FF; font-weight: 700; max-width: 320px; margin: 0 auto; line-height: 1.45;">
            Chào mừng em! Cùng Coach Nova khám phá chuyến phiêu lưu kỹ năng nhé!
          </p>
        </div>

        <div style="background: rgba(255,255,255,0.08); border: 2.5px solid rgba(255,255,255,0.18); padding: 18px 16px; border-radius: 20px; width: 100%; max-width: 380px; box-sizing: border-box; box-shadow: 0 10px 30px rgba(0,0,0,0.3); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);">
          <div style="display: flex; align-items: center; justify-content: center; gap: 6px; margin-bottom: 14px;">
            <span style="font-size: 1.2rem;">🎒</span>
            <label style="font-family: var(--font-display); font-size: 1.05rem; font-weight: 800; color: #38BDF8; margin: 0;">
              Em đang học khối mấy?
            </label>
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px; width: 100%;">
            <button class="ns-btn ns-squash-press" style="width: 100%; min-height: 60px; font-size: 1.05rem; background: linear-gradient(135deg, #3B82F6, #1D4ED8); border-bottom: 5px solid #172554; box-shadow: var(--shadow-btn-blue); display: flex; align-items: center; justify-content: space-between; padding: 12px 18px; border-radius: 16px;" onclick="window.studentController.startPilot('GRADE_1_3')">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 1.6rem;">🎈</span>
                <div style="text-align: left;">
                  <div style="font-family: var(--font-display); font-weight: 900; font-size: 1.1rem; color: #FFFFFF;">Khối 1 – 3</div>
                  <div style="font-size: 0.75rem; color: #BAE6FD; font-weight: 700;">Lớp 1, Lớp 2, Lớp 3</div>
                </div>
              </div>
              <span style="font-size: 1.2rem; color: #FDE047;">➜</span>
            </button>

            <button class="ns-btn ns-squash-press" style="width: 100%; min-height: 60px; font-size: 1.05rem; background: linear-gradient(135deg, #F59E0B, #D97706); border-bottom: 5px solid #78350F; box-shadow: var(--shadow-btn-amber); display: flex; align-items: center; justify-content: space-between; padding: 12px 18px; border-radius: 16px;" onclick="window.studentController.startPilot('GRADE_4_5')">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 1.6rem;">🚀</span>
                <div style="text-align: left;">
                  <div style="font-family: var(--font-display); font-weight: 900; font-size: 1.1rem; color: #FFFFFF;">Khối 4 – 5</div>
                  <div style="font-size: 0.75rem; color: #FEF3C7; font-weight: 700;">Lớp 4, Lớp 5</div>
                </div>
              </div>
              <span style="font-size: 1.2rem; color: #FDE047;">➜</span>
            </button>
          </div>
        </div>

        <div style="font-size: 0.8rem; color: #94A3B8; font-weight: 700; margin-bottom: 4px;">
          ⭐ Trải nghiệm rèn luyện năng lực tư duy NVS
        </div>

      </div>
    `;
  },

  // 2. Student Home Screen
  renderHome(studentState) {
    const xp = studentState.xp ?? 0;
    const stars = studentState.stars ?? 0;
    const streak = studentState.streak ?? 1;

    return `
      <div class="ns-view" data-view="student_home" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box; background: #F8FAFC;">
        
        <!-- Mobile Top HUD Bar -->
        <header data-god-header="true" style="background: #0F172A; color: #FFF; padding: max(10px, env(safe-area-inset-top)) 14px 10px 14px; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #334155; cursor: pointer;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #FEF3C7, #FDE68A); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; border: 2px solid #FDE047;">🐱</div>
            <div>
              <div style="font-family: var(--font-display); font-weight: 800; font-size: 0.92rem; color: #FDE047; line-height: 1.1;">NovaStars</div>
              <div style="font-size: 0.72rem; color: #94A3B8; font-weight: 700;">Học Sinh Rèn Luyện</div>
            </div>
          </div>
          <div style="display: flex; gap: 6px; font-weight: 800; font-size: 0.82rem;">
            <span style="background: rgba(245, 158, 11, 0.15); border: 1.5px solid #F59E0B; color: #F59E0B; padding: 4px 8px; border-radius: 999px;">🔥 ${streak}</span>
            <span style="background: rgba(56, 189, 248, 0.15); border: 1.5px solid #38BDF8; color: #38BDF8; padding: 4px 8px; border-radius: 999px;">⭐ ${stars}</span>
            <span style="background: rgba(52, 211, 153, 0.15); border: 1.5px solid #34D399; color: #34D399; padding: 4px 8px; border-radius: 999px;">⚡ ${xp}</span>
          </div>
        </header>

        <!-- Main Scroll Body -->
        <div class="ns-mobile-scroll">
          
          <div class="ns-card" style="background: linear-gradient(135deg, #1E1B4B, #312E81); color: #FFF; text-align: center; padding: 22px 18px; border-color: #FDE047; border-width: 3.5px; box-shadow: var(--shadow-card-3d);">
            <div style="font-size: 2.6rem; margin-bottom: 6px;" class="animate-bounce">🏆</div>
            <h2 style="font-family: var(--font-display); font-size: 1.35rem; color: #FDE047; font-weight: 900; margin: 0 0 6px 0;">
              ĐẤU TRƯỜNG NVS 2026
            </h2>
            <p style="font-size: 0.9rem; color: #E0E7FF; font-weight: 700; margin-bottom: 18px; line-height: 1.45;">
              Khám phá tiềm năng và năng lực bản thân qua 5 câu hỏi nhanh hằng ngày!
            </p>

            <button class="ns-btn ns-btn-accent ns-squash-press" style="width: 100%; min-height: 54px; font-size: 1.08rem; font-weight: 900;" onclick="window.studentController.nextStep()">
              <span>VÀO ĐẤU TRƯỜNG NVS 🚀</span>
            </button>
          </div>

          <!-- Feature Quick Info -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div style="background: #FFFFFF; border: 2px solid #E2E8F0; padding: 12px; border-radius: 14px; text-align: center; box-shadow: var(--shadow-sm);">
              <div style="font-size: 1.4rem; margin-bottom: 2px;">⚡</div>
              <div style="font-family: var(--font-display); font-weight: 800; font-size: 0.88rem; color: #1E293B;">Tích Lũy XP</div>
              <div style="font-size: 0.75rem; color: #64748B;">Nhận thưởng mỗi ngày</div>
            </div>
            <div style="background: #FFFFFF; border: 2px solid #E2E8F0; padding: 12px; border-radius: 14px; text-align: center; box-shadow: var(--shadow-sm);">
              <div style="font-size: 1.4rem; margin-bottom: 2px;">🎯</div>
              <div style="font-family: var(--font-display); font-weight: 800; font-size: 0.88rem; color: #1E293B;">Rèn Luyện 7 NL</div>
              <div style="font-size: 0.75rem; color: #64748B;">Phát triển toàn diện</div>
            </div>
          </div>

        </div>
      </div>
    `;
  },

  // 3. Championship Home / Intro Screen
  renderChampionshipHome(studentState) {
    return `
      <div class="ns-view" data-view="student_champ_home" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box; background: #F8FAFC;">
        ${ChampionshipUIComponents.renderHeader({
          title: "Đấu Trường NVS",
          subtitle: "Trải Nghiệm Rút Gọn",
          isExamMode: false,
          onBack: "window.studentController.prevStep()"
        })}

        <div class="ns-mobile-scroll">
          
          <!-- Coach Nova Speech Bubble -->
          <div style="background: linear-gradient(135deg, #EFF6FF, #DBEAFE); border: 2.5px solid #3B82F6; padding: 14px; border-radius: 18px; display: flex; align-items: center; gap: 12px; box-shadow: var(--shadow-sm);">
            <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #FEF3C7, #FDE68A); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; border: 2.5px solid #3B82F6; flex-shrink: 0;" class="animate-breathing">🐱</div>
            <div style="min-width: 0; flex: 1;">
              <div style="font-family: var(--font-display); font-weight: 900; font-size: 0.95rem; color: #1E40AF;">Coach Nova chào em!</div>
              <div style="font-size: 0.85rem; color: #1E3A8A; font-weight: 700; margin-top: 2px; line-height: 1.35;">Hôm nay chúng mình cùng thử 5 câu hỏi nhanh để khám phá năng lực nhé!</div>
            </div>
          </div>

          <!-- Practice Challenge Card -->
          <div class="ns-card" style="border: 3px solid #F59E0B; background: #FFFBEB; box-shadow: var(--shadow-card-3d); padding: 18px 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-family: var(--font-display); font-size: 1.1rem; font-weight: 900; color: #B45309;">📝 Bài Luyện Tập</span>
              <span style="font-size: 0.78rem; background: #F59E0B; color: #FFF; padding: 3px 10px; border-radius: 999px; font-weight: 900;">5 CÂU • ~4 PHÚT</span>
            </div>
            
            <p style="font-size: 0.88rem; color: #78350F; font-weight: 700; margin-bottom: 16px; line-height: 1.4;">
              Thử thách phản xạ tự nhiên và khả năng tư duy giải quyết vấn đề.
            </p>

            <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
              <div style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 700; color: #92400E;">
                <span>✨</span><span>Không giới hạn áp lực thời gian trải nghiệm</span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 700; color: #92400E;">
                <span>🎁</span><span>Hoàn thành để mở khóa Skill Boost & Nhận quà</span>
              </div>
            </div>

            <button class="ns-btn ns-btn-accent ns-squash-press" style="width: 100%; min-height: 54px; font-size: 1.1rem; font-weight: 900;" onclick="window.studentController.nextStep()">
              <span>BẮT ĐẦU TRẢI NGHIỆM 🚀</span>
            </button>
          </div>

        </div>
      </div>
    `;
  },

  // 4. Exam Question Screen
  renderExamQuestion(currentQuestion, currentIdx, totalQuestions, shuffledOptions, studentState) {
    const qId = currentQuestion.itemId || currentQuestion.id;
    const opts = shuffledOptions || currentQuestion.options || [];
    const letters = ['A', 'B', 'C', 'D', 'E'];
    const progressPercent = Math.round(((currentIdx + 1) / totalQuestions) * 100);
    const isGodMode = studentState && studentState.godMode;
    const correctOpt = currentQuestion.correctOptionId || 'opt_a';

    return `
      <div class="ns-view" data-view="student_exam_question" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box; background: #F8FAFC;">
        ${ChampionshipUIComponents.renderHeader({
          title: "BÀI THI TRẢI NGHIỆM",
          subtitle: `Câu ${currentIdx + 1} / ${totalQuestions}`,
          isExamMode: true
        })}

        <!-- Progress Indicator -->
        <div style="width: 100%; height: 6px; background: #E2E8F0; position: relative;">
          <div style="width: ${progressPercent}%; height: 100%; background: linear-gradient(90deg, #3B82F6, #10B981); transition: width 0.3s ease;"></div>
        </div>

        <div class="ns-mobile-scroll">
          
          <!-- Question Stem Card -->
          <div class="ns-card" style="border: 2.5px solid #3B82F6; padding: 16px; box-shadow: var(--shadow-sm);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-family: var(--font-display); font-size: 0.85rem; color: #2563EB; font-weight: 900; background: #EFF6FF; padding: 3px 10px; border-radius: 999px; border: 1.5px solid #BFDBFE;">
                CÂU HỎI ${currentIdx + 1} / ${totalQuestions}
              </span>
              ${isGodMode ? `
                <button class="ns-btn" style="padding: 4px 8px; font-size: 0.75rem; background: linear-gradient(135deg, #10B981, #059669); color: #FFF; border: none; border-radius: 6px; font-weight: 800;" onclick="window.studentController.answerExamQuestion('${qId}', '${correctOpt}')">
                  ⚡ Auto Đúng
                </button>
              ` : ''}
            </div>
            
            <p style="font-size: 1.02rem; font-weight: 800; color: #1E293B; line-height: 1.5; margin: 0 0 16px 0;">
              ${currentQuestion.stem}
            </p>

            <!-- Option Cards with A/B/C/D Badges -->
            <div style="display: flex; flex-direction: column; gap: 10px; width: 100%;">
              ${opts.map((opt, oIdx) => {
                const optId = opt.id || `opt_${oIdx}`;
                const text = typeof opt === 'string' ? opt : opt.text;
                const letter = letters[oIdx] || String.fromCharCode(65 + oIdx);
                const isCorrect = (optId === correctOpt || optId === currentQuestion.correctAnswer);
                const godModeHighlight = (isGodMode && isCorrect) ? 'ns-godmode-correct-highlight' : '';

                return `
                  <button class="ns-option-card ${godModeHighlight}" onclick="window.studentController.answerExamQuestion('${qId}', '${optId}')">
                    <div class="ns-option-badge">${letter}</div>
                    <span style="flex: 1; text-align: left;">${text}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

        </div>
      </div>
    `;
  },

  // 5. Practice Result Screen
  renderPracticeResult(scoreData, studentState) {
    const score = scoreData.score ?? 80;
    let encouragement = 'Tuyệt vời! Em đã xử lý rất tốt nhiều tình huống.';
    let scoreColor = '#2563EB';
    let badgeEmoji = '🎉';

    if (score < 40) {
      encouragement = 'Em đã hoàn thành thử thách! Cùng Coach Nova khám phá thêm nhé.';
      scoreColor = '#D97706';
      badgeEmoji = '💪';
    } else if (score < 80) {
      encouragement = 'Khởi đầu rất tốt! Cùng Coach Nova rèn thêm để bứt phá nhé.';
      scoreColor = '#2563EB';
      badgeEmoji = '🌟';
    }

    return `
      <div class="ns-view" data-view="student_practice_result" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box; background: #F8FAFC;">
        ${ChampionshipUIComponents.renderHeader({
          title: "KẾT QUẢ BÀI THI",
          subtitle: "Điểm Trải Nghiệm",
          isExamMode: false
        })}

        <div class="ns-mobile-scroll">
          
          <!-- Score Result Card -->
          <div class="ns-card" style="text-align: center; padding: 22px 16px; background: linear-gradient(135deg, #EFF6FF, #DBEAFE); border: 3px solid #3B82F6; box-shadow: var(--shadow-card-3d);">
            <div style="font-size: 2.8rem; margin-bottom: 2px;" class="animate-bounce">${badgeEmoji}</div>
            
            <div class="ns-score-badge-circle" style="border-color: ${scoreColor};">
              <div style="font-family: var(--font-display); font-size: 1.8rem; font-weight: 900; color: ${scoreColor}; line-height: 1;">
                ${score}
              </div>
              <div style="font-size: 0.72rem; font-weight: 800; color: #64748B;">/ 100 ĐIỂM</div>
            </div>

            <h2 style="font-family: var(--font-display); font-size: 1.2rem; color: #1E40AF; font-weight: 900; margin: 4px 0 6px 0; line-height: 1.35;">
              ${encouragement}
            </h2>

            <div style="display: inline-block; background: #FFFFFF; border: 1.5px solid #BFDBFE; padding: 6px 14px; border-radius: 999px; font-size: 0.88rem; color: #1E3A8A; font-weight: 800; margin-top: 4px;">
              🎯 Đúng ${scoreData.correctCount ?? 4} / ${scoreData.totalCount ?? 5} câu hỏi
            </div>
          </div>

          <!-- Coach Nova Suggestion Banner -->
          <div style="background: linear-gradient(135deg, #FEF3C7, #FFFBEB); border: 2.5px solid #F59E0B; padding: 14px; border-radius: 18px; display: flex; align-items: center; gap: 12px; box-shadow: var(--shadow-sm);">
            <div style="width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #FEF3C7, #FDE68A); display: flex; align-items: center; justify-content: center; font-size: 1.6rem; border: 2px solid #F59E0B; flex-shrink: 0;">🐱</div>
            <div style="min-width: 0; flex: 1;">
              <div style="font-family: var(--font-display); font-weight: 900; font-size: 0.92rem; color: #92400E;">COACH NOVA GỢI Ý:</div>
              <div style="font-size: 0.85rem; color: #78350F; font-weight: 700; margin-top: 2px; line-height: 1.35;">Mời em thử thêm 3 tình huống Skill Boost để rèn thêm phản xạ và nhận sao nhé!</div>
            </div>
          </div>

          <button class="ns-btn ns-btn-accent ns-squash-press" style="width: 100%; min-height: 54px; font-size: 1.08rem; font-weight: 900;" onclick="window.studentController.nextStep()">
            <span>LUYỆN TIẾP SKILL BOOST 🚀</span>
          </button>

        </div>
      </div>
    `;
  },

  // 6. Skill Boost Question Screen (No Layout Shift / Context-Preserved)
  renderSkillBoostQuestion(currentQuestion, currentIdx, totalQuestions, feedback, shuffledOptions, studentState) {
    const qId = currentQuestion.itemId || currentQuestion.id;
    const opts = shuffledOptions || currentQuestion.options || [];
    const letters = ['A', 'B', 'C', 'D', 'E'];
    const progressPercent = Math.round(((currentIdx + 1) / totalQuestions) * 100);
    const isGodMode = studentState && studentState.godMode;
    const correctOpt = currentQuestion.correctOptionId || 'opt_a';

    return `
      <div class="ns-view" data-view="student_skill_boost" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box; background: #F8FAFC;">
        ${ChampionshipUIComponents.renderHeader({
          title: "SKILL BOOST RÚT GỌN",
          subtitle: `Câu ${currentIdx + 1} / ${totalQuestions}`,
          isExamMode: false
        })}

        <!-- Progress Indicator -->
        <div style="width: 100%; height: 6px; background: #E2E8F0; position: relative;">
          <div style="width: ${progressPercent}%; height: 100%; background: linear-gradient(90deg, #10B981, #059669); transition: width 0.3s ease;"></div>
        </div>

        <div class="ns-mobile-scroll">
          
          <div class="ns-card" style="border: 2.5px solid #10B981; padding: 16px; box-shadow: var(--shadow-sm);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-family: var(--font-display); font-size: 0.85rem; color: #059669; font-weight: 900; background: #ECFDF5; padding: 3px 10px; border-radius: 999px; border: 1.5px solid #A7F3D0;">
                SKILL BOOST ${currentIdx + 1} / ${totalQuestions}
              </span>
              ${isGodMode && !feedback ? `
                <button class="ns-btn" style="padding: 4px 8px; font-size: 0.75rem; background: linear-gradient(135deg, #10B981, #059669); color: #FFF; border: none; border-radius: 6px; font-weight: 800;" onclick="window.studentController.answerBoostQuestion('${qId}', '${correctOpt}')">
                  ⚡ Auto Đúng
                </button>
              ` : ''}
            </div>
            
            <p style="font-size: 1rem; font-weight: 800; color: #1E293B; line-height: 1.45; margin: 0 0 14px 0;">
              ${currentQuestion.stem}
            </p>

            <!-- Options: Kept in place even after answered -->
            <div style="display: flex; flex-direction: column; gap: 10px; width: 100%;">
              ${opts.map((opt, oIdx) => {
                const optId = opt.id || `opt_${oIdx}`;
                const text = typeof opt === 'string' ? opt : opt.text;
                const letter = letters[oIdx] || String.fromCharCode(65 + oIdx);
                const isCorrect = (optId === correctOpt || optId === currentQuestion.correctAnswer);

                let extraClass = '';
                if (feedback) {
                  if (optId === currentQuestion.correctOptionId) {
                    extraClass = 'is-correct';
                  } else if (feedback.selectedOptId === optId && !feedback.isCorrect) {
                    extraClass = 'is-incorrect';
                  }
                } else if (isGodMode && isCorrect) {
                  extraClass = 'ns-godmode-correct-highlight';
                }

                return `
                  <button class="ns-option-card ${extraClass}" ${feedback ? 'disabled' : ''} onclick="window.studentController.answerBoostQuestion('${qId}', '${optId}')">
                    <div class="ns-option-badge">${letter}</div>
                    <span style="flex: 1; text-align: left;">${text}</span>
                  </button>
                `;
              }).join('')}
            </div>

            <!-- Feedback Drawer: Slides up without replacing options -->
            ${feedback ? `
              <div class="ns-feedback-drawer ${feedback.isCorrect ? '' : 'incorrect'}">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                  <span style="font-size: 1.4rem;">${feedback.isCorrect ? '✅' : '💡'}</span>
                  <div style="font-family: var(--font-display); font-weight: 900; font-size: 1rem; color: ${feedback.isCorrect ? '#15803D' : '#B91C1C'};">
                    ${feedback.isCorrect ? 'ĐÁP ÁN CHÍNH XÁC! (+6 XP)' : 'COACH NOVA GIẢI THÍCH:'}
                  </div>
                </div>

                <p style="font-size: 0.88rem; color: #334155; font-weight: 700; line-height: 1.45; margin: 0 0 14px 0;">
                  ${currentQuestion.explanation}
                </p>

                <button class="ns-btn ns-btn-green ns-squash-press" style="width: 100%; min-height: 50px; font-size: 1.05rem; font-weight: 900;" onclick="window.studentController.advanceBoostQuestion()">
                  <span>${currentIdx + 1 < totalQuestions ? 'CÂU TIẾP THEO 🚀' : 'HOÀN THÀNH SKILL BOOST 🎉'}</span>
                </button>
              </div>
            ` : ''}

          </div>

        </div>
      </div>
    `;
  },

  // 7. Reward Moment Screen
  renderRewardMoment(studentState) {
    const earnedXP = studentState.boostXpEarned ?? ((studentState.boostCorrectCount ?? 3) * 6);

    return `
      <div class="ns-view" data-view="student_reward" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box; background: linear-gradient(180deg, #0F172A 0%, #1E1B4B 100%); color: #FFF; text-align: center;">
        ${ChampionshipUIComponents.renderHeader({
          title: "PHẦN THƯỞNG RÈN LUYỆN",
          subtitle: "Chúc Mừng Em!",
          isExamMode: false
        })}

        <div class="ns-mobile-scroll" style="align-items: center; justify-content: space-around; padding: 20px 16px;">
          
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="font-size: 3.8rem; margin-bottom: 8px;" class="ns-pulse-glow animate-bounce">🎁</div>
            <h2 style="font-family: var(--font-display); font-size: 1.45rem; color: #FDE047; font-weight: 900; margin: 0 0 6px 0;">
              HOÀN THÀNH SKILL BOOST!
            </h2>
            <p style="font-size: 0.92rem; color: #E0E7FF; font-weight: 700; margin: 0;">
              Em đã hoàn thành xuất sắc các tình huống rèn luyện.
            </p>
          </div>

          <!-- Reward Cards Grid -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; width: 100%; max-width: 360px;">
            <div class="ns-card" style="background: rgba(255,255,255,0.09); border: 2.5px solid #38BDF8; color: #FFF; padding: 14px; text-align: center; border-radius: 18px; box-shadow: 0 0 16px rgba(56, 189, 248, 0.25);">
              <div style="font-size: 1.8rem; margin-bottom: 2px;">⚡</div>
              <div style="font-family: var(--font-display); font-size: 1.3rem; font-weight: 900; color: #38BDF8;">+${earnedXP} XP</div>
              <div style="font-size: 0.78rem; color: #94A3B8; font-weight: 700;">Kinh nghiệm</div>
            </div>
            <div class="ns-card" style="background: rgba(255,255,255,0.09); border: 2.5px solid #F59E0B; color: #FFF; padding: 14px; text-align: center; border-radius: 18px; box-shadow: 0 0 16px rgba(245, 158, 11, 0.25);">
              <div style="font-size: 1.8rem; margin-bottom: 2px;">⭐</div>
              <div style="font-family: var(--font-display); font-size: 1.3rem; font-weight: 900; color: #F59E0B;">+10 Stars</div>
              <div style="font-size: 0.78rem; color: #94A3B8; font-weight: 700;">Ngôi sao thưởng</div>
            </div>
          </div>

          <div style="background: rgba(52,211,153,0.18); border: 2px solid #34D399; padding: 10px 18px; border-radius: 999px; color: #34D399; font-weight: 800; font-size: 0.9rem;">
            ✓ Đã hoàn thành 1 Nhiệm vụ Ngày!
          </div>

          <button class="ns-btn ns-btn-accent ns-squash-press" style="width: 100%; max-width: 360px; min-height: 52px; font-size: 1.05rem; font-weight: 900;" onclick="window.studentController.nextStep()">
            <span>XEM HÀNH TRÌNH TIẾP THEO 🚀</span>
          </button>

        </div>
      </div>
    `;
  },

  // 8. Student Gamified Journey Roadmap Screen
  renderStudentJourney(studentState) {
    return `
      <div class="ns-view" data-view="student_journey" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box; background: linear-gradient(180deg, #0F172A 0%, #1E1B4B 100%); color: #FFF;">
        ${ChampionshipUIComponents.renderHeader({
          title: "HÀNH TRÌNH CHỦ ĐỘNG",
          subtitle: "Đấu Trường NVS",
          isExamMode: false,
          onBack: "window.studentController.prevStep()"
        })}

        <div class="ns-mobile-scroll">
          
          <!-- Motivation Banner -->
          <div style="text-align: center; background: rgba(255,255,255,0.08); border: 2px solid #FDE047; padding: 14px; border-radius: 18px; box-shadow: 0 0 16px rgba(253, 224, 71, 0.2);">
            <div style="font-size: 2rem;">🌟</div>
            <h3 style="font-family: var(--font-display); font-size: 1.15rem; color: #FDE047; font-weight: 900; margin: 4px 0 2px 0;">MỖI NGÀY TIẾN MỘT BƯỚC!</h3>
            <p style="font-size: 0.85rem; color: #CBD5E1; font-weight: 700; margin: 0;">Kiên trì rèn luyện hằng ngày để tự tin chinh phục đấu trường.</p>
          </div>

          <!-- Gamified Vertical Trail Roadmap -->
          <div class="ns-journey-trail">
            
            <!-- Step 1: Completed Today -->
            <div class="ns-journey-node active-today">
              <div class="ns-journey-icon">✅</div>
              <div style="min-width: 0; flex: 1;">
                <div style="font-family: var(--font-display); font-weight: 900; font-size: 0.95rem; color: #34D399;">HÔM NAY: Hoàn Thành Trải Nghiệm</div>
                <div style="font-size: 0.78rem; color: #A7F3D0; font-weight: 700;">Đã nhận +XP và Star thưởng</div>
              </div>
            </div>

            <!-- Step 2: Daily Habit -->
            <div class="ns-journey-node" style="border-color: rgba(245, 158, 11, 0.4); background: rgba(245, 158, 11, 0.08);">
              <div class="ns-journey-icon" style="border-color: #F59E0B; color: #F59E0B;">📝</div>
              <div style="min-width: 0; flex: 1;">
                <div style="font-family: var(--font-display); font-weight: 900; font-size: 0.95rem; color: #FBBF24;">LUYỆN TẬP HẰNG NGÀY</div>
                <div style="font-size: 0.78rem; color: #CBD5E1; font-weight: 700;">5 câu mỗi ngày để giữ streak</div>
              </div>
            </div>

            <!-- Step 3: Round 1 -->
            <div class="ns-journey-node">
              <div class="ns-journey-icon">🚀</div>
              <div style="min-width: 0; flex: 1;">
                <div style="font-family: var(--font-display); font-weight: 900; font-size: 0.95rem; color: #94A3B8;">VÒNG 1: KHỞI ĐỘNG</div>
                <div style="font-size: 0.78rem; color: #64748B; font-weight: 700;">Đấu trường cấp cơ sở</div>
              </div>
            </div>

            <!-- Step 4: Round 2 -->
            <div class="ns-journey-node">
              <div class="ns-journey-icon">🔥</div>
              <div style="min-width: 0; flex: 1;">
                <div style="font-family: var(--font-display); font-weight: 900; font-size: 0.95rem; color: #94A3B8;">VÒNG 2: BỨT PHÁ</div>
                <div style="font-size: 0.78rem; color: #64748B; font-weight: 700;">Vòng tranh tài bán kết</div>
              </div>
            </div>

            <!-- Step 5: Championship Final -->
            <div class="ns-journey-node">
              <div class="ns-journey-icon">🏆</div>
              <div style="min-width: 0; flex: 1;">
                <div style="font-family: var(--font-display); font-weight: 900; font-size: 0.95rem; color: #94A3B8;">CHUNG KẾT NVS 2026</div>
                <div style="font-size: 0.78rem; color: #64748B; font-weight: 700;">Vinh danh nhà kiến tạo tương lai</div>
              </div>
            </div>

          </div>

          <button class="ns-btn ns-btn-primary ns-squash-press" style="width: 100%; min-height: 52px; font-size: 1.05rem; font-weight: 900; background: linear-gradient(135deg, #3B82F6, #1D4ED8);" onclick="window.studentController.nextStep()">
            <span>GỬI ĐÁNH GIÁ CỦA EM ✍️</span>
          </button>

        </div>
      </div>
    `;
  },

  // 9. Student Feedback Screen (Thumb-Friendly Touch Targets)
  renderStudentFeedback(feedbackState, studentState) {
    const q1 = feedbackState.q1;
    const q2 = feedbackState.q2;
    const q3 = feedbackState.q3;
    const isGodMode = studentState && studentState.godMode;
    const isValid = isGodMode ? true : (q1 !== null && q2 !== null && q3 !== null);

    const ratingOptions = [
      { val: 1, emoji: '😕', label: 'Khó hiểu' },
      { val: 2, emoji: '😐', label: 'Bình thường' },
      { val: 3, emoji: '🙂', label: 'Khá dễ' },
      { val: 4, emoji: '😊', label: 'Dễ hiểu' },
      { val: 5, emoji: '😄', label: 'Rất thích' }
    ];

    const partOptions = ['Bài thi', 'Coach Nova', 'Skill Boost', 'Nhận thưởng', 'Hành trình Championship'];
    const returnOptions = ['Có!', 'Có thể', 'Không'];

    return `
      <div class="ns-view" data-view="student_feedback" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box; background: #F8FAFC;">
        ${ChampionshipUIComponents.renderHeader({
          title: "ĐÁNH GIÁ TRẢI NGHIỆM",
          subtitle: "Ý Kiến Của Em",
          isExamMode: false
        })}

        <div class="ns-mobile-scroll">
          
          ${isGodMode ? `
            <div style="background: linear-gradient(135deg, #FEF3C7, #FFFBEB); border: 2px solid #F59E0B; padding: 10px 14px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; box-shadow: var(--shadow-sm);">
              <span style="font-weight: 800; font-size: 0.85rem; color: #92400E;">👑 God Mode: Mở khóa gửi tự do</span>
              <button class="ns-btn" style="padding: 4px 10px; font-size: 0.78rem; font-weight: 800; background: linear-gradient(135deg, #10B981, #059669); color: #FFF; border: none; border-radius: 6px;" onclick="window.studentController.autoFillFeedback()">
                ✍️ Điền 5 Sao
              </button>
            </div>
          ` : ''}

          <!-- Q1 Rating Card -->
          <div class="ns-card" style="padding: 16px;">
            <label style="font-family: var(--font-display); font-weight: 900; font-size: 0.95rem; color: #1E293B; display: block; margin-bottom: 10px;">
              1. Em thấy app có dễ hiểu không? <span style="color: #EF4444;">*</span>
            </label>
            <div style="display: flex; gap: 6px; width: 100%;">
              ${ratingOptions.map(opt => `
                <button class="ns-emoji-card ${q1 === opt.val ? 'selected' : ''}" onclick="window.studentController.setFeedbackRating(${opt.val})">
                  <span style="font-size: 1.8rem; line-height: 1;">${opt.emoji}</span>
                  <span style="font-size: 0.65rem; font-weight: 800; color: ${q1 === opt.val ? '#1D4ED8' : '#64748B'};">${opt.label}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Q2 Favorite Part -->
          <div class="ns-card" style="padding: 16px;">
            <label style="font-family: var(--font-display); font-weight: 900; font-size: 0.95rem; color: #1E293B; display: block; margin-bottom: 10px;">
              2. Phần nào em thích nhất? <span style="color: #EF4444;">*</span>
            </label>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${partOptions.map(part => `
                <button class="ns-tag-pill ${q2 === part ? 'active' : ''}" onclick="window.studentController.setFavoritePart('${part}')">
                  ${part}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Q3 Return Intent -->
          <div class="ns-card" style="padding: 16px;">
            <label style="font-family: var(--font-display); font-weight: 900; font-size: 0.95rem; color: #1E293B; display: block; margin-bottom: 10px;">
              3. Em có muốn quay lại luyện tiếp ngày mai không? <span style="color: #EF4444;">*</span>
            </label>
            <div style="display: flex; gap: 8px;">
              ${returnOptions.map(ans => {
                const isActive = q3 === ans;
                let bgStyle = '';
                if (isActive) {
                  if (ans === 'Có!') bgStyle = 'background: linear-gradient(135deg, #10B981, #059669); border-color: #047857; color: #FFF; box-shadow: 0 4px 0 #047857;';
                  else if (ans === 'Có thể') bgStyle = 'background: linear-gradient(135deg, #F59E0B, #D97706); border-color: #B45309; color: #FFF; box-shadow: 0 4px 0 #B45309;';
                  else bgStyle = 'background: #64748B; border-color: #475569; color: #FFF; box-shadow: 0 4px 0 #334155;';
                }
                return `
                  <button class="ns-btn ${isActive ? '' : 'ns-btn-secondary'}" style="flex: 1; min-height: 48px; font-size: 0.92rem; font-weight: 800; padding: 8px 10px; ${bgStyle}" onclick="window.studentController.setReturnIntent('${ans}')">
                    ${ans}
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Optional Suggestion -->
          <div class="ns-card" style="padding: 16px;">
            <label style="font-family: var(--font-display); font-weight: 900; font-size: 0.92rem; color: #1E293B; display: block; margin-bottom: 4px;">
              Em muốn app thay đổi điều gì? (Tùy chọn)
            </label>
            <div style="font-size: 0.75rem; color: #64748B; font-weight: 700; margin-bottom: 10px;">
              🔒 Không cần ghi tên, trường hay thông tin cá nhân của em nhé.
            </div>
            <input type="text" id="student-suggestion-input" maxlength="200" placeholder="Viết ý kiến của em tại đây (tối đa 200 ký tự)..." style="width: 100%; min-height: 46px; padding: 10px 14px; border: 2px solid #CBD5E1; border-radius: 12px; font-size: 0.95rem; box-sizing: border-box; font-family: var(--font-main);" value="${this.escapeHtml(feedbackState.suggestion || '')}" onchange="window.studentController.setSuggestion(this.value)">
          </div>

          <button class="ns-btn ns-squash-press" style="width: 100%; min-height: 54px; font-size: 1.05rem; font-weight: 900; background: ${isValid ? 'linear-gradient(135deg, #10B981, #059669)' : '#94A3B8'}; color: #FFF; border-bottom: 5px solid ${isValid ? '#047857' : '#64748B'}; box-shadow: ${isValid ? 'var(--shadow-btn-green)' : 'none'}; cursor: ${isValid ? 'pointer' : 'not-allowed'};" ${isValid ? '' : 'disabled'} onclick="window.studentController.submitFeedback()">
            <span>${isValid ? 'HOÀN THÀNH & GỬI 🚀' : 'VUI LÒNG CHỌN CÂU 1, 2, 3'}</span>
          </button>

        </div>
      </div>
    `;
  },

  // 10. Thank You Screen
  renderThankYou(studentState) {
    return `
      <div class="ns-view" data-view="student_thank_you" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; box-sizing: border-box; background: linear-gradient(180deg, #0F172A 0%, #1E1B4B 100%); color: #FFF; padding: 24px; text-align: center;">
        <div style="font-size: 4.5rem; margin-bottom: 12px; cursor: pointer;" class="ns-pulse-glow animate-bounce" data-god-header="true">⭐</div>
        
        <h2 style="font-family: var(--font-display); font-size: 1.7rem; color: #FDE047; font-weight: 900; margin: 0 0 8px 0; text-shadow: 0 3px 10px rgba(0,0,0,0.5); cursor: pointer;" data-god-header="true">
          CẢM ƠN EM! ⭐
        </h2>
        
        <p style="font-size: 1.05rem; color: #E0E7FF; font-weight: 700; max-width: 320px; margin-bottom: 28px; line-height: 1.45;">
          Coach Nova rất vui được đồng hành cùng em. Hẹn gặp lại em trong các thử thách tiếp theo!
        </p>

        <button class="ns-btn ns-btn-primary ns-squash-press" style="width: 100%; max-width: 290px; min-height: 54px; font-size: 1.08rem; font-weight: 900; background: linear-gradient(135deg, #3B82F6, #1D4ED8);" onclick="window.studentController.restartPilot()">
          <span>🔄 CHƠI LẠI TRẢI NGHIỆM</span>
        </button>
      </div>
    `;
  },

  // 11. God Mode Floating Dock (Developer & Unlimited Exploration Toolbar)
  renderGodModeDock(studentState, currentStep, currentExamIdx, currentBoostIdx) {
    const isG13 = studentState.ageGroup === 'GRADE_1_3';
    const steps = [
      { idx: 0, label: 'S0: Chào Mừng' },
      { idx: 1, label: 'S1: Trang Chủ' },
      { idx: 2, label: 'S2: Đấu Trường NVS' },
      { idx: 3, label: 'S3: Bài Thi Rút Gọn' },
      { idx: 4, label: 'S4: Kết Quả Điểm' },
      { idx: 5, label: 'S5: Skill Boost' },
      { idx: 6, label: 'S6: Phần Thưởng' },
      { idx: 7, label: 'S7: Hành Trình' },
      { idx: 8, label: 'S8: Đánh Giá' },
      { idx: 9, label: 'S9: Cảm Ơn' }
    ];

    return `
      <div class="ns-godmode-dock" id="ns-godmode-dock">
        <!-- Dock Header -->
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="ns-godmode-badge">👑 GOD MODE ACTIVE</span>
            <span style="font-size: 0.72rem; color: #CBD5E1; font-weight: 700;">Mở Khóa Toàn Bộ</span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <button class="ns-btn" style="padding: 2px 8px; font-size: 0.72rem; background: #334155; color: #E2E8F0; border: 1px solid #475569; border-radius: 6px;" onclick="window.studentController.setGodMode(false)">
              ✕ Đóng
            </button>
          </div>
        </div>

        <!-- Quick Controls Row -->
        <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
          <!-- Step Selector Dropdown -->
          <div style="flex: 1; min-width: 130px;">
            <select style="width: 100%; background: #1E293B; color: #FDE047; border: 1.5px solid #FDE047; padding: 5px 8px; border-radius: 8px; font-weight: 800; font-size: 0.78rem; font-family: var(--font-display);" onchange="window.studentController.jumpToStep(parseInt(this.value, 10))">
              ${steps.map(s => `
                <option value="${s.idx}" ${currentStep === s.idx ? 'selected' : ''}>${s.label}</option>
              `).join('')}
            </select>
          </div>

          <!-- Age Group Toggle -->
          <button class="ns-btn" style="padding: 5px 10px; font-size: 0.75rem; font-weight: 800; background: ${isG13 ? '#3B82F6' : '#F59E0B'}; color: #FFF; border: none; border-radius: 8px;" onclick="window.studentController.setGodModeAgeGroup('${isG13 ? 'GRADE_4_5' : 'GRADE_1_3'}')">
            🎯 ${isG13 ? 'Khối 1–3' : 'Khối 4–5'}
          </button>

          <!-- Auto-Solve Exam -->
          <button class="ns-btn" style="padding: 5px 10px; font-size: 0.75rem; font-weight: 800; background: linear-gradient(135deg, #10B981, #059669); color: #FFF; border: none; border-radius: 8px;" onclick="window.studentController.autoSolveExam()">
            ✨ 100đ Thi
          </button>

          <!-- Auto-Solve Boost -->
          <button class="ns-btn" style="padding: 5px 10px; font-size: 0.75rem; font-weight: 800; background: linear-gradient(135deg, #8B5CF6, #6D28D9); color: #FFF; border: none; border-radius: 8px;" onclick="window.studentController.autoSolveBoost()">
            ⚡ Max Boost
          </button>
        </div>

        <!-- Question Fast Jumpers if in Exam / Boost -->
        ${currentStep === 3 ? `
          <div style="display: flex; gap: 6px; align-items: center; font-size: 0.72rem; color: #CBD5E1; font-weight: 800;">
            <span>Nhảy câu hỏi:</span>
            ${[0, 1, 2, 3, 4].map(idx => `
              <button style="padding: 3px 8px; border-radius: 6px; border: 1px solid ${currentExamIdx === idx ? '#38BDF8' : '#475569'}; background: ${currentExamIdx === idx ? '#38BDF8' : '#1E293B'}; color: ${currentExamIdx === idx ? '#0F172A' : '#FFF'}; font-weight: 900; font-size: 0.75rem; cursor: pointer;" onclick="window.studentController.jumpToExamQuestion(${idx})">
                Câu ${idx + 1}
              </button>
            `).join('')}
          </div>
        ` : ''}

        ${currentStep === 5 ? `
          <div style="display: flex; gap: 6px; align-items: center; font-size: 0.72rem; color: #CBD5E1; font-weight: 800;">
            <span>Nhảy câu hỏi:</span>
            ${[0, 1, 2].map(idx => `
              <button style="padding: 3px 8px; border-radius: 6px; border: 1px solid ${currentBoostIdx === idx ? '#10B981' : '#475569'}; background: ${currentBoostIdx === idx ? '#10B981' : '#1E293B'}; color: ${currentBoostIdx === idx ? '#0F172A' : '#FFF'}; font-weight: 900; font-size: 0.75rem; cursor: pointer;" onclick="window.studentController.jumpToBoostQuestion(${idx})">
                Câu ${idx + 1}
              </button>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DemoStudentViews };
} else if (typeof window !== 'undefined') {
  window.DemoStudentViews = DemoStudentViews;
}
