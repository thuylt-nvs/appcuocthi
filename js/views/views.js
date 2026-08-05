/* ==========================================================================
   NovaStars MVP — Views (Splash, Welcome Modal, Home, World Map, Profile)
   ========================================================================== */

const Views = {
  // 1. Splash View
  renderSplash() {
    return `
      <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: linear-gradient(135deg, #1E1B4B, #312E81); color: #FFFFFF; padding: 20px; text-align: center;">
        <div style="font-size: 5rem; margin-bottom: 16px;" class="animate-bounce">🌟</div>
        <h1 style="font-size: 2.2rem; font-weight: 900; color: #FDE047; margin-bottom: 8px;">NOVASTARS</h1>
        <p style="font-size: 1.1rem; font-weight: 700; color: #A5B4FC; margin-bottom: 32px;">Phiêu Lưu Học Kỹ Năng Sống</p>

        <div style="width: 200px; height: 10px; background: rgba(255,255,255,0.2); border-radius: 999px; overflow: hidden; margin-bottom: 16px;">
          <div style="width: 100%; height: 100%; background: linear-gradient(90deg, #F59E0B, #10B981); animation: popUp 2s ease-in-out;"></div>
        </div>
        <p style="font-size: 0.9rem; color: #94A3B8;">Đang tải thế giới phiêu lưu...</p>
      </div>
    `;
  },

  // 2. Welcome Modal (FTUE Onboarding < 90 seconds)
  renderWelcomeModal() {
    return `
      <div class="ns-modal-overlay" id="welcome-ftue-modal">
        <div class="ns-modal-card">
          <div style="font-size: 4rem;" class="animate-bounce">🌟</div>
          <h2 style="font-size: 1.5rem; font-weight: 900; color: var(--primary-blue-dark);">Chào Mừng Đến NovaStars!</h2>
          <p style="font-size: 1.05rem; font-weight: 700; color: var(--text-main); line-height: 1.5;">
            Sao Nova chào em! Em đã sẵn sàng biến giờ dùng điện thoại thành hành trình trở thành anh hùng kỹ năng sống chưa?
          </p>

          <div style="background: #EFF6FF; padding: 14px; border-radius: var(--radius-md); border: 2px solid var(--primary-blue-light); width: 100%; text-align: left;">
            <p style="font-weight: 800; color: var(--primary-blue-dark); margin-bottom: 6px;">🗺️ Sứ Mệnh Đầu Tiên:</p>
            <p style="font-weight: 700; color: var(--text-main); font-size: 0.95rem;">Đảo Dũng Cảm → Bài 1: Lời Chào Ngôi Sao</p>
          </div>

          <button class="ns-btn ns-btn-primary" style="width: 100%; margin-top: 10px;" onclick="window.app.startFTUEJourney()">
            <span>Bắt Đầu Hành Trình Ngay! 🚀</span>
          </button>
        </div>
      </div>
    `;
  },

  // 3. Home View
  renderHome() {
    const data = window.appState.data;
    return `
      ${NSComponents.renderHeader({
        title: "NovaStars",
        xp: data.xp,
        stars: data.stars,
        showProgress: false
      })}

      <div style="flex: 1; padding: 20px; display: flex; flex-direction: column; gap: 20px; overflow-y: auto;">
        <!-- Welcome Hero Card -->
        <div class="ns-card" style="background: linear-gradient(135deg, #DBEAFE, #EFF6FF); border-color: var(--primary-blue-light);">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div class="ns-character-avatar" style="width: 64px; height: 64px; font-size: 2.2rem;">👧</div>
            <div>
              <h2 style="font-weight: 900; font-size: 1.3rem; color: var(--primary-blue-dark);">Chào Su!</h2>
              <p style="font-weight: 700; font-size: 0.95rem; color: var(--text-muted);">Chuỗi học tập: 🔥 ${data.streak} Ngày Liên Tiếp</p>
            </div>
          </div>
          <button class="ns-btn ns-btn-primary" style="width: 100%; margin-top: 16px;" onclick="window.app.navigateTo('map')">
            <span>Tiếp Tục Học Tập 🗺️</span>
          </button>
        </div>

        <!-- Daily Quests Card -->
        <div class="ns-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <h3 style="font-weight: 800; font-size: 1.1rem; color: var(--text-main);">🎯 Nhiệm Vụ Hằng Ngày</h3>
            <span style="font-weight: 800; font-size: 0.85rem; color: var(--accent-orange);">Thưởng +XP</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${data.dailyQuests.map(q => `
              <div style="background: #F8FAFC; border: 2px solid #E2E8F0; padding: 12px 14px; border-radius: var(--radius-sm); display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <p style="font-weight: 800; font-size: 0.95rem; color: var(--text-main);">${q.title}</p>
                  <p style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700;">Tiến độ: ${q.progress}/${q.max}</p>
                </div>
                <div class="ns-hud-badge" style="padding: 4px 10px; font-size: 0.85rem;">⚡ +${q.rewardXp}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      ${NSComponents.renderBottomNav({
        activeTab: 'home',
        onTabChange: "window.app.navigateToTab"
      })}
    `;
  },

  // 4. World Map View
  renderMap() {
    const data = window.appState.data;
    const isNode1Completed = data.completedNodes['island_1_node_1'];

    return `
      ${NSComponents.renderHeader({
        title: "Đảo 1: Đảo Dũng Cảm",
        xp: data.xp,
        stars: data.stars,
        showProgress: false
      })}

      <div style="flex: 1; padding: 20px; background: linear-gradient(180deg, #E0F2FE, #F0FDFA); position: relative; overflow-y: auto; display: flex; flex-direction: column; align-items: center; gap: 24px;">
        
        <!-- Node 1: Lesson Zero -->
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <div class="ns-card" style="width: 280px; text-align: center; border-color: var(--primary-blue); cursor: pointer; transform: scale(1.02); box-shadow: var(--shadow-primary);" onclick="window.app.startLessonZero()">
            <div style="font-size: 2.5rem;" class="animate-bounce">🌟</div>
            <h3 style="font-weight: 900; font-size: 1.15rem; color: var(--primary-blue-dark);">Bài 1: Lời Chào Ngôi Sao</h3>
            <p style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); margin: 4px 0 10px 0;">Chào Hỏi Lịch Sự & Tự Tin</p>
            <div style="display: flex; justify-content: center; gap: 8px;">
              <span class="ns-hud-badge stars" style="font-size: 0.8rem; padding: 2px 10px;">⭐ 3 Stars</span>
              <span class="ns-hud-badge" style="font-size: 0.8rem; padding: 2px 10px;">${isNode1Completed ? '✅ Đã Học' : '🚀 Học Ngay'}</span>
            </div>
          </div>
        </div>

        <div style="width: 4px; height: 30px; background: var(--primary-blue-light); border-radius: 999px;"></div>

        <!-- Node 2 (Unlocked if Node 1 completed) -->
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: ${isNode1Completed ? '1' : '0.6'};">
          <div class="ns-card" style="width: 260px; text-align: center; border-color: #CBD5E1;">
            <div style="font-size: 2rem;">🛡️</div>
            <h3 style="font-weight: 800; font-size: 1.05rem; color: var(--text-main);">Bài 2: Từ Chối Người Lạ</h3>
            <p style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">${isNode1Completed ? 'Sẵn sàng học' : '🔒 Mở khóa khi xong Bài 1'}</p>
          </div>
        </div>

        <div style="width: 4px; height: 30px; background: #CBD5E1; border-radius: 999px;"></div>

        <!-- Island Boss Node -->
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: 0.5;">
          <div class="ns-card" style="width: 240px; text-align: center; background: #1E1B4B; color: #FFFFFF;">
            <div style="font-size: 2rem;">🐉</div>
            <h3 style="font-weight: 900; font-size: 1rem; color: #FDE047;">Boss Đảo Dũng Cảm</h3>
            <p style="font-size: 0.75rem; color: #A5B4FC;">🔒 Cần 5 Ngôi Sao Đảo</p>
          </div>
        </div>

      </div>

      ${NSComponents.renderBottomNav({
        activeTab: 'map',
        onTabChange: "window.app.navigateToTab"
      })}
    `;
  },

  // 5. Profile View
  renderProfile() {
    const data = window.appState.data;
    return `
      ${NSComponents.renderHeader({
        title: "Hồ Sơ Anh Hùng",
        xp: data.xp,
        stars: data.stars,
        showProgress: false
      })}

      <div style="flex: 1; padding: 20px; display: flex; flex-direction: column; gap: 20px; overflow-y: auto;">
        <div class="ns-card" style="text-align: center;">
          <div class="ns-character-avatar" style="width: 80px; height: 80px; font-size: 3rem; margin: 0 auto 12px auto;">👧</div>
          <h2 style="font-weight: 900; font-size: 1.4rem; color: var(--primary-blue-dark);">Bé Su</h2>
          <p style="font-weight: 700; font-size: 0.95rem; color: var(--text-muted);">Cấp Độ: Ngôi Sao Tập Sự</p>

          <div style="display: flex; justify-content: center; gap: 16px; margin-top: 16px;">
            <div class="ns-hud-badge" style="font-size: 1rem; padding: 6px 16px;">⚡ ${data.xp} XP</div>
            <div class="ns-hud-badge stars" style="font-size: 1rem; padding: 6px 16px;">⭐ ${data.stars} Stars</div>
          </div>
        </div>

        <div class="ns-card">
          <h3 style="font-weight: 800; font-size: 1.1rem; margin-bottom: 12px;">🏅 Huy Chương Đã Đạt</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            ${data.completedNodes['island_1_node_1'] ? `
              <div style="background: #FEFCE8; border: 2px solid #FEF08A; padding: 10px 14px; border-radius: var(--radius-sm); display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 0.9rem; color: #D97706;">
                <span>🏅</span>
                <span>Ngôi Sao Giao Tiếp</span>
              </div>
            ` : `<p style="font-weight: 700; color: var(--text-muted); font-size: 0.9rem;">Chưa có huy chương nào. Hãy hoàn thành Bài 1 nhé!</p>`}
          </div>
        </div>
      </div>

      ${NSComponents.renderBottomNav({
        activeTab: 'profile',
        onTabChange: "window.app.navigateToTab"
      })}
    `;
  }
};

window.Views = Views;
