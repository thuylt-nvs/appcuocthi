/* ==========================================================================
   NovaStars MVP — Modal Components (Zero Eval, Pure Handler Registration & Null Safety)
   ========================================================================== */

const NSModals = {
  // 1. In-Game Story & Pedagogical Feedback Modal
  renderStoryFeedbackModal({ title = '', avatar = '', speaker = '', text = '', isCorrect = true, actionType = 'next' } = {}) {
    let actionFnStr = "window.lessonRunner.closeModalAndNextStage()";
    if (actionType === 'continue') {
      actionFnStr = "window.lessonRunner.closeModalAndContinue()";
    } else if (actionType === 'pretest_advance') {
      actionFnStr = "window.lessonRunner.advancePretestSubQuestion()";
    } else if (actionType === 'boss_advance') {
      actionFnStr = "window.lessonRunner.advanceBossScenario()";
    }

    let btnText = 'Tiếp Theo 🚀';
    if (!isCorrect) {
      btnText = (actionType === 'pretest_advance') ? 'Xem Gợi Ý & Tiếp Tục 💡' : 'Thử Lại Nhé 🔄';
    }

    return `
      <div class="ns-modal-overlay">
        <div class="ns-modal-card" style="border-top: 8px solid ${isCorrect ? 'var(--accent-green)' : 'var(--accent-orange)'};">
          <div style="font-size: 3.5rem;" class="animate-bounce">${avatar || (isCorrect ? '🌟' : '🤔')}</div>
          <div style="font-weight: 900; font-size: 0.9rem; color: var(--text-muted); text-transform: uppercase;">${speaker || 'Sao Nova'}</div>
          <h3 style="font-size: 1.35rem; font-weight: 900; color: ${isCorrect ? 'var(--accent-green-dark)' : '#B45309'}; margin-top: -6px;">${title || ''}</h3>
          
          <div style="background: #F8FAFC; padding: 16px; border-radius: var(--radius-md); border: 2px solid #E2E8F0; width: 100%; text-align: left;">
            <p style="font-size: 1.05rem; font-weight: 700; line-height: 1.5; color: var(--text-main);">${text || ''}</p>
          </div>

          <button class="ns-btn ${isCorrect ? 'ns-btn-green' : 'ns-btn-accent'}" style="width: 100%; margin-top: 8px;" onclick="${actionFnStr}">
            <span>${btnText}</span>
          </button>
        </div>
      </div>
    `;
  },

  // 2. Celebration Popup Modal (Phase 1: Child-Friendly Companion Celebration)
  renderCelebrationPopup({ title = 'Mình làm được rồi! ⭐', xp = 100, stars = 3, badgeName = 'Ngôi Sao Giao Tiếp', badgeIcon = '🏆', onContinue = '', onReplay = '' } = {}) {
    return `
      <div class="ns-modal-overlay">
        <div class="ns-modal-card ns-cinematic-card ns-rim-light" style="background: radial-gradient(circle at top, #FFFFFF, #FEFCE8); border: 4px solid #FDE047;">
          <div class="ns-spotlight-beam"></div>
          
          <div class="ns-stagger-1" style="width: 130px; height: 130px; position: relative; z-index: 1;">
            <img src="assets/images/golden_badge.png" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 0 35px rgba(245, 158, 11, 0.85));" alt="${badgeName}">
          </div>

          <div class="ns-stagger-2" style="position: relative; z-index: 1;">
            <h2 style="font-family: var(--font-display); font-size: 1.75rem; font-weight: 700; color: #D97706; text-shadow: 0 2px 8px rgba(217, 119, 6, 0.25);">${title}</h2>
            <p style="font-weight: 800; font-size: 1.15rem; color: var(--accent-green-dark); margin-top: 4px;">🏅 ${badgeName}</p>
          </div>
          
          <div class="ns-stagger-3" style="display: flex; gap: 14px; margin: 6px 0; position: relative; z-index: 1;">
            <div class="ns-hud-badge" style="font-size: 1.1rem; padding: 8px 18px; box-shadow: 0 4px 0 #FDBA74, 0 8px 16px rgba(249, 115, 22, 0.3);">⚡ +${xp} XP</div>
            <div class="ns-hud-badge stars" style="font-size: 1.1rem; padding: 8px 18px; box-shadow: 0 4px 0 #FACC15, 0 8px 16px rgba(245, 158, 11, 0.3);">⭐ +${stars} Stars</div>
          </div>

          <div class="ns-stagger-4" style="display: flex; flex-direction: column; gap: 10px; width: 100%; margin-top: 8px; position: relative; z-index: 1;">
            <button class="ns-btn ns-btn-primary ns-squash-press" style="width: 100%;" onclick="${onContinue}">
              <span>Mở Nhật Ký Anh Hùng 📖</span>
            </button>
            <button class="ns-btn ns-btn-secondary ns-squash-press" style="width: 100%;" onclick="${onReplay}">
              <span>Chơi Lại Bài Học 🔄</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // 3. Mission Intro Briefing Modal
  renderMissionIntroModal({ title = '', subtitle = '', xp = 0, stars = 0, badge = '', onStart = '', onClose = '' } = {}) {
    return `
      <div class="ns-modal-overlay" id="mission-intro-modal">
        <div class="ns-modal-card ns-rim-light" style="border-top: 8px solid var(--primary-blue);">
          <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
            <span class="ns-hud-badge" style="font-size: 0.8rem; padding: 4px 10px;">🗺️ Đảo Dũng Cảm</span>
            <button class="ns-btn ns-btn-secondary" style="padding: 4px 10px; font-size: 0.9rem;" onclick="${onClose}">✕</button>
          </div>
          
          <div style="width: 100px; height: 100px; margin: 4px 0; position: relative;" class="ns-idle-float">
            <img src="assets/images/star_mascot.png" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.5));" alt="Sao Nova Mascot">
          </div>
          <h2 style="font-size: 1.5rem; font-weight: 900; color: var(--primary-blue-dark);">${title}</h2>
          <p style="font-weight: 700; color: var(--text-muted); font-size: 0.95rem;">Có một bạn nhỏ đang cần chúng mình giúp! ⭐</p>

          <div style="background: #EFF6FF; border: 2px solid #93C5FD; padding: 12px 14px; border-radius: var(--radius-md); width: 100%; text-align: left;">
            <p style="font-weight: 800; color: var(--primary-blue-dark); margin-bottom: 6px; font-size: 0.9rem;">🎁 Nhận được:</p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <span class="ns-hud-badge" style="font-size: 0.85rem; padding: 4px 10px;">⚡ ${xp} XP</span>
              <span class="ns-hud-badge stars" style="font-size: 0.85rem; padding: 4px 10px;">⭐ ${stars} Stars</span>
              <span class="ns-hud-badge" style="font-size: 0.85rem; padding: 4px 10px; background: #FEFCE8; color: #D97706; border-color: #FDE047;">🏅 ${badge}</span>
            </div>
          </div>

          <button class="ns-btn ns-btn-primary ns-squash-press ns-anticipate" style="width: 100%; margin-top: 8px;" onclick="${onStart}">
            <span>Bắt Đầu Sứ Mệnh 🚀</span>
          </button>
        </div>
      </div>
    `;
  },

  // 4. Hero Journal Showcase Modal (Calm Collection Moment)
  renderHeroJournalModal({ badgeName = '', xp = 0, stars = 0, streak = 1, onClose = '' } = {}) {
    return `
      <div class="ns-modal-overlay" id="hero-journal-modal">
        <div class="ns-modal-card ns-rim-light" style="border-top: 8px solid var(--accent-yellow); background: radial-gradient(circle at top, #FFFFFF, #FFFBEB);">
          <div style="width: 80px; height: 80px; margin: 0 auto; position: relative;" class="ns-idle-float">
            <img src="assets/images/star_mascot.png" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 0 16px rgba(245, 158, 11, 0.4));" alt="Sao Nova Mascot">
          </div>
          <h2 style="font-size: 1.5rem; font-weight: 900; color: var(--primary-blue-dark);">Nhật Ký Anh Hùng</h2>
          <p style="font-size: 0.95rem; font-weight: 700; color: var(--text-muted);">Sứ mệnh Lời Chào Ngôi Sao đã hoàn thành! ⭐</p>

          <div style="background: #FEFCE8; border: 2px solid #FEF08A; padding: 14px; border-radius: var(--radius-md); width: 100%; text-align: center;">
            <div style="width: 90px; height: 90px; margin: 0 auto 6px auto; position: relative;" class="animate-bounce">
              <img src="assets/images/golden_badge.png" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 0 20px rgba(245, 158, 11, 0.5));" alt="${badgeName}">
            </div>
            <h4 style="font-weight: 900; color: #D97706; font-size: 1.1rem;">${badgeName}</h4>
            <p style="font-weight: 700; color: var(--text-main); font-size: 0.85rem; margin-top: 4px;">Bí Kíp 3 Bước: 1. Mỉm Cười → 2. Cất Lời Chào → 3. Giới Thiệu Tên</p>
          </div>

          <div style="display: flex; gap: 12px; width: 100%; justify-content: center;">
            <div class="ns-hud-badge" style="font-size: 0.9rem; padding: 6px 14px;">🔥 ${streak} Ngày Chuỗi</div>
            <div class="ns-hud-badge stars" style="font-size: 0.9rem; padding: 6px 14px;">⭐ ${stars} Stars</div>
            <div class="ns-hud-badge" style="font-size: 0.9rem; padding: 6px 14px;">⚡ ${xp} XP</div>
          </div>

          <button class="ns-btn ns-btn-primary" style="width: 100%; margin-top: 8px;" onclick="${onClose}">
            <span>Trở Về Bản Đồ 🗺️</span>
          </button>
        </div>
      </div>
    `;
  },

  // 5. Parent Honor Certificate Modal
  renderParentConfirmModal({ parentPrompt = '', onConfirm = '' } = {}) {
    return `
      <div class="ns-card" style="border-color: var(--accent-green); background: #F0FDF4; text-align: center;">
        <div style="font-size: 3.5rem; margin-bottom: 8px;" class="animate-bounce">📜</div>
        <h3 style="font-size: 1.3rem; font-weight: 900; color: var(--accent-green-dark); margin-bottom: 8px;">Chứng Nhận Năng Lực Anh Hùng Real-Life</h3>
        <p style="font-size: 1rem; font-weight: 700; color: var(--text-main); margin-bottom: 16px; line-height: 1.5;">${parentPrompt}</p>
        
        <div style="background: #FFFFFF; border: 2px dashed var(--accent-green); padding: 14px; border-radius: var(--radius-md); margin-bottom: 16px; font-weight: 700; color: var(--accent-green-dark); font-size: 0.95rem;">
          ✨ Mời bố mẹ cùng xác nhận cho bé nhé! ⭐
        </div>

        <button class="ns-btn ns-btn-green" style="width: 100%;" onclick="${onConfirm}">
          <span>👍 Bố/Mẹ Xác Nhận Bé Đã Hoàn Thành!</span>
        </button>
      </div>
    `;
  }
};

window.NSModals = NSModals;
