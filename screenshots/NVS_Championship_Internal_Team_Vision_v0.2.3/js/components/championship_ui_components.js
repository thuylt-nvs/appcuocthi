/* ==========================================================================
   NovaStars / Antigravity — Championship Training Reusable UI Components
   Supports both Grade 1–3 and Grade 4–5 through centralized configuration
   ========================================================================== */

const ChampionshipUIComponents = {

  /**
   * Header component with strict mode distinction: EXAM MODE vs TRAIN MODE
   */
  renderHeader({ title = 'Championship Training', subtitle = '', showTimer = false, remainingSeconds = 0, isExamMode = false, rankEligible = true, onBack, onToggleFlag, isFlagged = false }) {
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    const timeFormatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    if (isExamMode) {
      // EXAM MODE: Visually distinct — focused, minimal, clean, no XP/Stars animation, no character interruption, NO rank badge in active exam header
      return `
        <header class="ns-exam-header" style="background: #0F172A; color: #F8FAFC; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #334155; box-shadow: 0 4px 12px rgba(0,0,0,0.3); box-sizing: border-box; width: 100%; min-width: 0;">
          <div style="display: flex; align-items: center; gap: 8px; min-width: 0; flex: 1;">
            ${onBack ? `<button class="ns-btn ns-btn-secondary" style="padding: 6px 10px; font-size: 0.9rem; background: #1E293B; color: #CBD5E1; border-color: #475569; flex-shrink: 0;" onclick="${onBack}">✕</button>` : ''}
            <div style="min-width: 0; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              <div style="font-family: var(--font-display); font-weight: 700; font-size: 0.95rem; color: #FDE047; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${title}</div>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
            ${onToggleFlag ? `
              <button class="ns-btn" style="padding: 6px 10px; font-size: 0.8rem; background: ${isFlagged ? '#EF4444' : '#334155'}; color: #FFF; border: none; border-radius: 6px; flex-shrink: 0;" onclick="${onToggleFlag}">
                ${isFlagged ? '🚩 Đã Đánh Dấu' : '🏳️ Đánh Dấu'}
              </button>
            ` : ''}

            ${showTimer ? `
              <div style="background: #1E293B; border: 2px solid ${remainingSeconds < 180 ? '#EF4444' : '#3B82F6'}; color: ${remainingSeconds < 180 ? '#FCA5A5' : '#60A5FA'}; font-family: monospace; font-size: 1.05rem; font-weight: 800; padding: 4px 10px; border-radius: 8px; flex-shrink: 0;">
                ⏱️ ${timeFormatted}
              </div>
            ` : ''}
          </div>
        </header>
      `;
    }

    // TRAIN MODE: Playful, vibrant, character-led
    return `
      <header class="ns-app-header" style="background: linear-gradient(135deg, #1E1B4B, #312E81); border-bottom: 3.5px solid #FDE047; box-sizing: border-box; width: 100%; min-width: 0;">
        <div style="display: flex; align-items: center; gap: 10px; min-width: 0; flex: 1;">
          ${onBack ? `<button class="ns-btn ns-btn-secondary" style="padding: 6px 12px; font-size: 0.9rem; flex-shrink: 0;" onclick="${onBack}">←</button>` : ''}
          <div style="min-width: 0; flex: 1; overflow: hidden;">
            <div style="font-family: var(--font-display); font-weight: 700; font-size: 1.1rem; color: #FDE047; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${title}</div>
            ${subtitle ? `<div style="font-size: 0.75rem; color: #A5B4FC; font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${subtitle}</div>` : ''}
          </div>
        </div>

        <div style="display: flex; gap: 8px; flex-shrink: 0;">
          <div class="ns-hud-badge stars">⭐ <span>${(typeof window !== 'undefined' && window.appState && window.appState.data) ? window.appState.data.stars : 0}</span></div>
          <div class="ns-hud-badge">⚡ <span>${(typeof window !== 'undefined' && window.appState && window.appState.data) ? window.appState.data.xp : 0} XP</span></div>
        </div>
      </header>
    `;
  },

  /**
   * Countdown Widget with competition target date (Child-facing DEMO SCHEDULE removed)
   */
  renderCountdownWidget({ targetTimestamp }) {
    const now = Date.now();
    const diff = Math.max(0, targetTimestamp - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `
      <div class="ns-card" style="background: linear-gradient(135deg, #1E1B4B, #312E81); color: #FFF; border-color: #FDE047; border-width: 3.5px; position: relative; box-sizing: border-box; width: 100%;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="font-family: var(--font-display); font-size: 1.1rem; color: #FDE047; margin: 0; display: flex; align-items: center; gap: 6px;">
            🏆 Đấu Trường NVS 2026
          </h3>
        </div>

        <div style="display: flex; justify-content: space-around; text-align: center; background: rgba(0,0,0,0.3); padding: 12px; border-radius: 12px; border: 1.5px solid rgba(253, 224, 71, 0.3);">
          <div>
            <div style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 800; color: #FDE047;">${days}</div>
            <div style="font-size: 0.75rem; color: #A5B4FC; font-weight: 700;">NGÀY</div>
          </div>
          <div style="font-size: 1.5rem; color: #FDE047; font-weight: 700;">:</div>
          <div>
            <div style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 800; color: #FDE047;">${String(hours).padStart(2, '0')}</div>
            <div style="font-size: 0.75rem; color: #A5B4FC; font-weight: 700;">GIỜ</div>
          </div>
          <div style="font-size: 1.5rem; color: #FDE047; font-weight: 700;">:</div>
          <div>
            <div style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 800; color: #FDE047;">${String(mins).padStart(2, '0')}</div>
            <div style="font-size: 0.75rem; color: #A5B4FC; font-weight: 700;">PHÚT</div>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Daily Training Action Card (Coach-centric, 1 Dominant CTA, Supporting rank text)
   */
  renderTicketCard({ ticket, onStartExam, onExchangeStar, activeExam }) {
    const isAvailable = ticket && ticket.status === 'AVAILABLE';
    const isReserved = ticket && ticket.status === 'RESERVED';
    const isConsumed = ticket && ticket.status === 'CONSUMED';
    const isDailyFree = ticket && ticket.ticketType === 'DAILY_FREE';

    let title = "Bài Thi Hôm Nay";
    let statusText = "1 lượt làm bài miễn phí";

    if (isReserved || activeExam) {
      statusText = "⏱️ Bạn đang có bài thi chưa hoàn thành!";
    } else if (isConsumed) {
      statusText = "Bạn đã hoàn thành bài thi thử hôm nay.";
    }

    return `
      <div class="ns-card" style="background: linear-gradient(135deg, #FEF3C7, #FFFBEB); border-color: #F59E0B; border-width: 3.5px; position: relative; box-sizing: border-box; width: 100%;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
          <div>
            <h3 style="font-family: var(--font-display); font-weight: 800; font-size: 1.25rem; color: #92400E; margin: 0;">🎯 ${title}</h3>
            <p style="font-size: 0.9rem; font-weight: 800; color: #B45309; margin-top: 4px;">${statusText}</p>
          </div>
        </div>

        ${activeExam ? `
          <button class="ns-btn ns-btn-primary ns-squash-press" style="width: 100%; margin-top: 10px; background: linear-gradient(135deg, #F59E0B, #D97706); font-size: 1.15rem; min-height: 52px;" onclick="${onStartExam}">
            <span>Tiếp Tục Bài Thi Dang Dở ⏱️</span>
          </button>
        ` : isAvailable ? `
          <button class="ns-btn ns-btn-primary ns-squash-press" style="width: 100%; margin-top: 10px; font-size: 1.15rem; min-height: 54px; box-shadow: 0 6px 0 #D97706;" onclick="${onStartExam}">
            <span>Bắt Đầu Bài Thi Hôm Nay 🚀</span>
          </button>
        ` : `
          <div style="display: flex; gap: 10px; margin-top: 10px;">
            <button class="ns-btn ns-btn-secondary" style="flex: 1; font-size: 0.85rem; min-height: 48px;" disabled>Đã Hoàn Thành</button>
            <button class="ns-btn ns-btn-primary ns-squash-press" style="flex: 1; font-size: 0.85rem; min-height: 48px; background: linear-gradient(135deg, #10B981, #059669);" onclick="${onExchangeStar}">
              <span>Đổi Lượt (⭐ 100)</span>
            </button>
          </div>
        `}

        <div style="font-size: 0.78rem; color: #B45309; font-weight: 700; margin-top: 8px; text-align: center;">
          ${isDailyFree ? '🏆 Lượt này được tính vào bảng xếp hạng.' : '📝 Bài thi phụ giúp em rèn luyện thêm.'}
        </div>
      </div>
    `;
  },

  /**
   * Daily Missions Widget (Non-diagnostic wording)
   */
  renderDailyMissionsWidget({ missions, onClaimReward }) {
    const m = missions || { dailyExamCompleted: false, boostCompleted: false, weakSpotFixed: false, claimedReward: false };
    const completedCount = (m.dailyExamCompleted ? 1 : 0) + (m.boostCompleted ? 1 : 0) + (m.weakSpotFixed ? 1 : 0);
    const canClaim = completedCount >= 3 && !m.claimedReward;

    return `
      <div class="ns-card" style="border-width: 3px; box-sizing: border-box; width: 100%;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <h3 style="font-family: var(--font-display); font-weight: 700; font-size: 1.1rem; color: var(--text-main); margin: 0;">🎯 Nhiệm Vụ Ngày (${completedCount}/3)</h3>
          <span class="ns-hud-badge" style="font-size: 0.75rem;">Thưởng +50 XP & 20 ⭐</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; align-items: center; justify-content: space-between; background: #F8FAFC; padding: 10px 12px; border-radius: 8px; border: 1.5px solid #E2E8F0;">
            <span style="font-size: 0.9rem; font-weight: 700; color: var(--text-main);">1. Hoàn thành 1 Bài Thi Thử Ngày</span>
            <span style="font-weight: 800; color: ${m.dailyExamCompleted ? '#10B981' : '#94A3B8'};">${m.dailyExamCompleted ? '✅' : '⏳'}</span>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; background: #F8FAFC; padding: 10px 12px; border-radius: 8px; border: 1.5px solid #E2E8F0;">
            <span style="font-size: 0.9rem; font-weight: 700; color: var(--text-main);">2. Luyện tập 1 bài Skill Boost</span>
            <span style="font-weight: 800; color: ${m.boostCompleted ? '#10B981' : '#94A3B8'};">${m.boostCompleted ? '✅' : '⏳'}</span>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; background: #F8FAFC; padding: 10px 12px; border-radius: 8px; border: 1.5px solid #E2E8F0;">
            <span style="font-size: 0.9rem; font-weight: 700; color: var(--text-main);">3. Hoàn thành 1 bài luyện Coach Nova gợi ý</span>
            <span style="font-weight: 800; color: ${m.weakSpotFixed ? '#10B981' : '#94A3B8'};">${m.weakSpotFixed ? '✅' : '⏳'}</span>
          </div>
        </div>

        ${m.claimedReward ? `
          <button class="ns-btn ns-btn-secondary" style="width: 100%; margin-top: 10px; font-size: 0.85rem; min-height: 48px;" disabled>🎉 Đã Nhận Thưởng Hôm Nay</button>
        ` : `
          <button class="ns-btn ns-btn-primary ns-squash-press" style="width: 100%; margin-top: 10px; min-height: 48px; background: ${canClaim ? 'linear-gradient(135deg, #10B981, #059669)' : '#CBD5E1'};" ${!canClaim ? 'disabled' : ''} onclick="${onClaimReward}">
            <span>${canClaim ? 'Nhận Thưởng Nhiệm Vụ 🎁' : 'Hoàn Thành 3 Nhiệm Vụ Để Nhận Thưởng'}</span>
          </button>
        `}
      </div>
    `;
  },

  /**
   * Question Card (EXAM MODE vs TRAIN MODE with Normalized Array/Object Options Parsing)
   */
  renderQuestionCard({ question, questionIndex, totalQuestions, selectedOption, isExamMode = false, onSelectOption }) {
    if (!question) return '';
    const optionKeys = ['A', 'B', 'C', 'D'];

    // Normalize options into map { A: "text", B: "text", C: "text", D: "text" }
    const optionsMap = {};
    if (Array.isArray(question.options)) {
      question.options.forEach((optStr, idx) => {
        const key = optionKeys[idx] || String.fromCharCode(65 + idx);
        const cleanText = typeof optStr === 'string' ? optStr.replace(/^[A-D][.\:\s]\s*/, '') : String(optStr);
        optionsMap[key] = cleanText;
      });
    } else if (question.options && typeof question.options === 'object') {
      optionKeys.forEach(key => {
        if (question.options[key]) {
          const val = question.options[key];
          optionsMap[key] = typeof val === 'string' ? val.replace(/^[A-D][.\:\s]\s*/, '') : String(val);
        }
      });
    }

    return `
      <div class="ns-card" style="${isExamMode ? 'background: #FFFFFF; border: 3px solid #CBD5E1; box-shadow: 0 4px 12px rgba(0,0,0,0.08);' : ''} box-sizing: border-box; width: 100%;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-family: var(--font-display); font-weight: 700; font-size: 1rem; color: ${isExamMode ? '#1E293B' : 'var(--primary-blue-dark)'};">
            Câu ${questionIndex + 1} / ${totalQuestions}
          </span>
          <span style="font-size: 0.75rem; font-weight: 700; background: #EFF6FF; color: #2563EB; padding: 4px 10px; border-radius: 999px;">
            ${question.primaryCompetencyId || 'NVS'}
          </span>
        </div>

        <p style="font-size: 1.05rem; font-weight: 700; color: ${isExamMode ? '#0F172A' : 'var(--text-main)'}; line-height: 1.5; margin-bottom: 16px; word-break: break-word;">
          ${question.prompt}
        </p>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${optionKeys.map(key => {
            const text = optionsMap[key];
            if (!text) return '';
            const isSelected = selectedOption === key;

            return `
              <div class="ns-option-item ${isSelected ? 'selected' : ''}" 
                   data-option-key="${key}"
                   style="padding: 12px 14px; border-radius: 10px; border: 3px solid ${isSelected ? '#2563EB' : '#E2E8F0'}; background: ${isSelected ? '#EFF6FF' : '#F8FAFC'}; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: all 0.15s ease; min-height: 48px; box-sizing: border-box; width: 100%;"
                   onclick="${onSelectOption}('${key}')">
                <div style="width: 32px; height: 32px; border-radius: 50%; background: ${isSelected ? '#2563EB' : '#CBD5E1'}; color: ${isSelected ? '#FFF' : '#334155'}; font-weight: 800; display: flex; align-items: center; justify-content: center; font-size: 0.95rem; flex-shrink: 0;">
                  ${key}
                </div>
                <div style="font-weight: 700; font-size: 0.95rem; color: ${isSelected ? '#1E3A8A' : '#334155'}; flex: 1; word-break: break-word;">
                  ${text}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  /**
   * Question Matrix Grid for Review & Submit Screen
   */
  renderQuestionMatrix({ totalQuestions, answers = {}, flaggedIds = [], currentIndex = 0, onJumpToQuestion }) {
    const items = [];
    for (let i = 0; i < totalQuestions; i++) {
      const qIndex = i;
      const questionNumber = i + 1;
      const isAnswered = Boolean(answers[`q_${i}`] || Object.values(answers)[i]);
      const isFlagged = Array.isArray(flaggedIds) && flaggedIds.includes(qIndex);

      items.push(`
        <button style="width: 44px; height: 44px; border-radius: 8px; font-weight: 800; font-size: 0.95rem; border: 2px solid ${currentIndex === i ? '#2563EB' : '#CBD5E1'}; background: ${isAnswered ? '#10B981' : '#F1F5F9'}; color: ${isAnswered ? '#FFF' : '#334155'}; position: relative; cursor: pointer;" onclick="${onJumpToQuestion}(${i})">
          ${questionNumber}
          ${isFlagged ? `<span style="position: absolute; top: -4px; right: -4px; font-size: 0.75rem;">🚩</span>` : ''}
        </button>
      `);
    }

    return `
      <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; justify-items: center; padding: 12px; background: #F8FAFC; border-radius: 12px; border: 2px solid #E2E8F0; box-sizing: border-box; width: 100%;">
        ${items.join('')}
      </div>
    `;
  },

  /**
   * Submit Confirmation Modal
   */
  renderSubmitConfirmModal({ answeredCount = 0, totalQuestions = 20, flaggedCount = 0, onConfirmSubmit, onCancel }) {
    const unansweredCount = Math.max(0, totalQuestions - answeredCount);

    return `
      <div class="ns-modal-overlay" id="submit-confirm-modal">
        <div class="ns-modal-card" style="text-align: center; border: 3px solid #334155; background: #0F172A; color: #F8FAFC; padding: 24px; box-sizing: border-box; max-width: 360px;">
          <h3 style="font-family: var(--font-display); font-size: 1.3rem; font-weight: 700; color: #FDE047; margin: 0 0 14px 0;">
            📥 Xác Nhận Nộp Bài Thi
          </h3>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; background: #1E293B; padding: 12px; border-radius: 10px; border: 1px solid #334155; margin-bottom: 18px;">
            <div>
              <div style="font-size: 1.3rem; font-weight: 800; color: #34D399;">${answeredCount}</div>
              <div style="font-size: 0.7rem; color: #94A3B8; font-weight: 700;">ĐÃ TRẢ LỜI</div>
            </div>
            <div>
              <div style="font-size: 1.3rem; font-weight: 800; color: #F87171;">${unansweredCount}</div>
              <div style="font-size: 0.7rem; color: #94A3B8; font-weight: 700;">CHƯA TRẢ LỜI</div>
            </div>
            <div>
              <div style="font-size: 1.3rem; font-weight: 800; color: #FBBF24;">${flaggedCount}</div>
              <div style="font-size: 0.7rem; color: #94A3B8; font-weight: 700;">ĐÁNH DẤU 🚩</div>
            </div>
          </div>

          <p style="font-size: 0.9rem; color: #CBD5E1; font-weight: 700; margin-bottom: 18px;">
            ${unansweredCount > 0 ? `Còn ${unansweredCount} câu chưa trả lời. Em có chắc muốn nộp bài ngay không?` : 'Em đã làm hết các câu hỏi. Sẵn sàng nộp bài chưa?'}
          </p>

          <div style="display: flex; gap: 10px;">
            <button class="ns-btn ns-btn-secondary" style="flex: 1; background: #334155; color: #FFF; border: none; min-height: 48px;" onclick="${onCancel}">
              <span>Quay Lại</span>
            </button>
            <button class="ns-btn ns-btn-primary ns-squash-press" style="flex: 1; background: linear-gradient(135deg, #10B981, #059669); min-height: 48px;" onclick="${onConfirmSubmit}">
              <span>Nộp Bài 📥</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Leave Exam Confirmation Modal
   */
  renderLeaveExamConfirmModal({ onConfirmLeave, onContinueExam }) {
    return `
      <div class="ns-modal-overlay" id="leave-exam-modal">
        <div class="ns-modal-card" style="text-align: center; border: 3px solid #334155; background: #0F172A; color: #F8FAFC; padding: 24px; box-sizing: border-box; max-width: 360px;">
          <h3 style="font-family: var(--font-display); font-size: 1.3rem; font-weight: 700; color: #FBBF24; margin: 0 0 12px 0;">
            ⏸️ Tạm Dừng Bài Thi?
          </h3>
          <p style="font-size: 0.9rem; color: #CBD5E1; font-weight: 700; line-height: 1.4; margin-bottom: 18px;">
            Đồng hồ vẫn tiếp tục đếm ngược. Em có thể bấm <b>"Tiếp Tục Bài Thi"</b> ở Trang Chủ bất cứ lúc nào!
          </p>

          <div style="display: flex; gap: 10px;">
            <button class="ns-btn ns-btn-secondary" style="flex: 1; background: #334155; color: #FFF; border: none; min-height: 48px;" onclick="${onConfirmLeave}">
              <span>Tạm Dừng</span>
            </button>
            <button class="ns-btn ns-btn-primary ns-squash-press" style="flex: 1; background: linear-gradient(135deg, #2563EB, #1D4ED8); min-height: 48px;" onclick="${onContinueExam}">
              <span>Làm Tiếp ➔</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Branded Non-Blocking Notification Banner
   */
  renderNotificationBanner({ title = 'Thông báo', message = '', type = 'info', onClose }) {
    const isError = type === 'error';

    return `
      <div class="ns-modal-overlay" id="notification-banner-root">
        <div class="ns-modal-card" style="text-align: center; border: 3.5px solid ${isError ? '#EF4444' : '#3B82F6'}; background: #FFF; color: #0F172A; padding: 24px; max-width: 360px;">
          <div style="font-size: 2.5rem; margin-bottom: 8px;">${isError ? '⚠️' : '💡'}</div>
          <h3 style="font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; color: ${isError ? '#991B1B' : '#1E3A8A'}; margin: 0 0 10px 0;">
            ${title}
          </h3>
          <p style="font-size: 0.92rem; font-weight: 700; color: #475569; line-height: 1.4; margin-bottom: 18px;">
            ${message}
          </p>
          <button class="ns-btn ns-btn-primary ns-squash-press" style="width: 100%; min-height: 48px; background: ${isError ? 'linear-gradient(135deg, #EF4444, #DC2626)' : 'linear-gradient(135deg, #3B82F6, #2563EB)'};" onclick="${onClose}">
            <span>Đã Hiểu ➔</span>
          </button>
        </div>
      </div>
    `;
  },

  /**
   * Practice Result Processing State
   */
  renderProcessingState() {
    return `
      <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: radial-gradient(circle at center, #1E1B4B 0%, #0F172A 100%); color: #FFFFFF; padding: 24px; text-align: center;">
        <div style="font-size: 3.5rem; margin-bottom: 14px;" class="animate-bounce">📊</div>
        <h2 style="font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; color: #FDE047; margin-bottom: 8px;">
          Đang Tổng Hợp Kết Quả...
        </h2>
        <p style="font-size: 0.95rem; color: #A5B4FC; font-weight: 700;">
          Coach Nova đang chuẩn bị gợi ý bài luyện tiếp theo cho em!
        </p>
      </div>
    `;
  },

  /**
   * Coach Advice & Result Component (Shortened Primary CTA "LUYỆN TIẾP 🚀" with Supporting Competency Title)
   */
  renderCoachAdviceCard({ examResult, coachAdvice, onStartBoost }) {
    const score = examResult ? examResult.score : 0;
    const totalCorrect = examResult ? examResult.totalCorrect : 0;
    const totalQuestions = examResult ? examResult.totalQuestions : 15;
    const advice = coachAdvice || { recommendationTitle: 'PRACTICE PRIORITY', coachPhrasing: 'Cùng rèn luyện thêm kỹ năng để bứt phá nhé!', trainNextCompetency: 'NL3' };

    const compId = advice.trainNextCompetency || 'NL3';
    const compMeta = typeof getNVSCompetency === 'function' ? getNVSCompetency(compId) : { officialNameVi: 'Năng Lực NVS', displayName: 'Trí Tuệ Cảm Xúc' };

    return `
      <div class="ns-card" style="text-align: center; border-width: 3.5px; border-color: #3B82F6; box-sizing: border-box; width: 100%;">
        <div style="font-family: var(--font-display); font-size: 0.85rem; font-weight: 800; color: #2563EB; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">
          PRACTICE SCORE
        </div>
        <!-- Score Capsule -->
        <div style="font-family: var(--font-display); font-size: 3rem; font-weight: 800; color: #2563EB; margin-bottom: 4px;">
          ${score}<span style="font-size: 1.5rem; color: #94A3B8;">/100</span>
        </div>
        <p style="font-weight: 700; font-size: 0.95rem; color: #475569; margin-bottom: 14px;">
          Đúng ${totalCorrect} / ${totalQuestions} câu hỏi
        </p>

        <!-- Coach Nova Advice Section -->
        <div style="background: #EFF6FF; border: 2px solid #93C5FD; padding: 14px; border-radius: 12px; margin-bottom: 16px; text-align: left;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 1.2rem;">🐱</span>
              <span style="font-family: var(--font-display); font-weight: 800; font-size: 0.95rem; color: #1E40AF;">
                Coach Nova Gợi Ý
              </span>
            </div>
            <span style="background: #2563EB; color: #FFF; font-size: 0.75rem; font-weight: 800; padding: 3px 8px; border-radius: 999px;">
              PRACTICE PRIORITY
            </span>
          </div>
          <p style="font-size: 0.92rem; font-weight: 700; color: #1E293B; line-height: 1.4; margin: 0 0 6px 0;">
            ${advice.coachPhrasing}
          </p>
          <div style="font-size: 0.78rem; color: #3B82F6; font-weight: 700;">
            Gợi ý từ kết quả bài luyện tập này (DEMO content).
          </div>
        </div>

        <div style="font-size: 0.85rem; font-weight: 800; color: #1E293B; margin-bottom: 6px;">
          Bài Luyện Tiếp Theo: ${compMeta.displayName || compId} (${compId})
        </div>

        <button class="ns-btn ns-btn-primary ns-squash-press" style="width: 100%; font-size: 1.15rem; min-height: 52px;" onclick="${onStartBoost}('${compId}')">
          <span>LUYỆN TIẾP 🚀</span>
        </button>
      </div>
    `;
  },

  /**
   * Immediate Feedback Banner for Skill Boost (Min 48–56px tap target for Next button)
   */
  renderImmediateFeedbackCard({ isCorrect, isAlreadyAnswered, correctAnswer, explanationShort, explanationFull, xpGranted = 0, onNext }) {
    const isSuccess = isCorrect;

    return `
      <div style="background: ${isSuccess ? 'linear-gradient(135deg, #DCFCE7, #F0FDF4)' : 'linear-gradient(135deg, #FEE2E2, #FEF2F2)'}; border: 3px solid ${isSuccess ? '#22C55E' : '#EF4444'}; border-radius: 14px; padding: 14px; margin-top: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); box-sizing: border-box; width: 100%;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <h4 style="font-family: var(--font-display); font-weight: 700; font-size: 1.1rem; color: ${isSuccess ? '#15803D' : '#991B1B'}; margin: 0;">
            ${isSuccess ? '🎉 Chính Xác!' : '💡 Thử Lại Nhé!'}
          </h4>
          ${isSuccess && xpGranted > 0 ? `<span class="ns-hud-badge" style="background: #22C55E; color: #FFF;">+${xpGranted} XP</span>` : ''}
        </div>

        <p style="font-size: 0.92rem; font-weight: 700; color: #1E293B; margin-bottom: 10px; line-height: 1.4;">
          ${explanationShort || (isSuccess ? 'Em đã đưa ra lựa chọn rất chính xác!' : `Đáp án đúng là (${correctAnswer}).`)}
        </p>

        ${explanationFull ? `
          <div style="font-size: 0.82rem; color: #475569; background: rgba(255,255,255,0.7); padding: 8px 10px; border-radius: 8px; margin-bottom: 12px;">
            ${explanationFull}
          </div>
        ` : ''}

        <button class="ns-btn ns-btn-primary ns-squash-press" style="width: 100%; min-height: 52px; font-size: 1.1rem; background: ${isSuccess ? 'linear-gradient(135deg, #22C55E, #16A34A)' : 'linear-gradient(135deg, #3B82F6, #2563EB)'};" onclick="${onNext}">
          <span>Tiếp Theo ➔</span>
        </button>
      </div>
    `;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ChampionshipUIComponents };
} else {
  if (typeof window !== 'undefined') {
    window.ChampionshipUIComponents = ChampionshipUIComponents;
  }
}
