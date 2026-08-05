/* ==========================================================================
   NovaStars MVP — Views (Splash, Welcome Modal, Home, World Map, Profile)
   v1.0 Upgraded Edition: Toca Life World UX Philosophy Alignment
   ========================================================================== */

const Views = {
  // 1. Splash View
  renderSplash() {
    return `
      <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: radial-gradient(circle at center, #1E1B4B 0%, #0F172A 100%); color: #FFFFFF; padding: 24px; text-align: center; position: relative; overflow: hidden;">
        
        <!-- Ambient Glowing Star Rays -->
        <div style="position: absolute; width: 300px; height: 300px; background: radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 70%); top: 30%; left: 50%; transform: translate(-50%, -50%); pointer-events: none;" class="animate-breathing"></div>

        <div style="width: 140px; height: 140px; margin-bottom: 12px; position: relative;" class="animate-bounce">
          <img src="assets/images/star_mascot.png" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 0 25px rgba(253, 224, 71, 0.7));" alt="Sao Nova Mascot">
        </div>
        <h1 style="font-family: var(--font-display); font-size: 2.5rem; font-weight: 700; color: #FDE047; margin-bottom: 6px; letter-spacing: 1px; text-shadow: 0 4px 12px rgba(253, 224, 71, 0.3);">NOVASTARS</h1>
        <p style="font-size: 1.15rem; font-weight: 800; color: #A5B4FC; margin-bottom: 36px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Phiêu Lưu Học Kỹ Năng Sống</p>

        <!-- Upgraded Loading Bar Capsule -->
        <div style="width: 220px; height: 14px; background: rgba(255,255,255,0.15); border-radius: 999px; overflow: hidden; margin-bottom: 18px; border: 2px solid rgba(255,255,255,0.25); box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);">
          <div style="width: 100%; height: 100%; background: linear-gradient(90deg, #F59E0B, #10B981); animation: splashProgressFill 1.8s var(--ns-spring-cushion); box-shadow: 0 0 12px rgba(245, 158, 11, 0.8);"></div>
        </div>
        <p style="font-size: 0.95rem; font-weight: 700; color: #CBD5E1;">Đang tải thế giới phiêu lưu...</p>
      </div>
    `;
  },

  // 2. Welcome Modal (FTUE Adventure Opening Scene)
  renderWelcomeModal() {
    return `
      <div class="ns-modal-overlay" id="welcome-ftue-modal">
        <div class="ns-modal-card ns-rim-light" style="background: radial-gradient(circle at top, #FFFFFF 60%, #EFF6FF 100%); border: 4px solid #93C5FD;">
          <div class="ns-hero-portal ns-idle-float" style="width: 125px; height: 125px; margin: 4px 0;">
            <img src="assets/images/star_mascot.png" style="width: 100%; height: 100%; object-fit: contain;" alt="Sao Nova Mascot">
          </div>
          <h2 style="font-family: var(--font-display); font-size: 1.65rem; font-weight: 700; color: var(--primary-blue-dark); text-shadow: 0 2px 4px rgba(30, 58, 138, 0.15);">Chào Mừng Đến NovaStars!</h2>
          
          <div style="display: flex; gap: 14px; margin: 4px 0; justify-content: center;">
            <div class="ns-character-avatar ns-squash-press" style="width: 54px; height: 54px; font-size: 1.8rem; background: linear-gradient(135deg, #FEF3C7, #FDE68A); box-shadow: 0 4px 0 #F59E0B;">👧</div>
            <div class="ns-character-avatar ns-squash-press" style="width: 54px; height: 54px; font-size: 1.8rem; background: linear-gradient(135deg, #DBEAFE, #93C5FD); box-shadow: 0 4px 0 #2563EB;">👦</div>
            <div class="ns-character-avatar ns-squash-press" style="width: 54px; height: 54px; font-size: 1.8rem; background: linear-gradient(135deg, #FBCFE8, #F472B6); box-shadow: 0 4px 0 #DB2777;">⭐</div>
          </div>

          <p style="font-size: 1.05rem; font-weight: 700; color: var(--text-main); line-height: 1.5;">
            Sao Nova chào em! Chúng mình cùng bắt đầu chuyến phiêu lưu Anh Hùng Kỹ Năng nhé! ⭐
          </p>

          <div style="background: linear-gradient(135deg, #EFF6FF, #E0F2FE); padding: 16px; border-radius: var(--radius-md); border: 3px solid var(--primary-blue-light); width: 100%; text-align: left; box-shadow: var(--shadow-sm);">
            <p style="font-family: var(--font-display); font-weight: 700; color: var(--primary-blue-dark); margin-bottom: 6px; font-size: 1.05rem;">🗺️ Sứ Mệnh Đầu Tiên:</p>
            <p style="font-weight: 800; color: var(--text-main); font-size: 1rem;">Đảo Dũng Cảm → Bài 1: Lời Chào Ngôi Sao</p>
          </div>

          <button class="ns-btn ns-btn-primary ns-squash-press ns-anticipate" style="width: 100%; margin-top: 6px;" onclick="window.app.startFTUEJourney()">
            <span>Bắt Đầu Hành Trình Ngay! 🚀</span>
          </button>
        </div>
      </div>
    `;
  },

  // 3. Home View (Hero Base Hub)
  renderHome() {
    const data = window.appState.data;
    return `
      ${NSComponents.renderHeader({
        title: "NovaStars Base",
        xp: data.xp,
        stars: data.stars,
        showProgress: false
      })}

      <div style="flex: 1; padding: 20px; display: flex; flex-direction: column; gap: 20px; overflow-y: auto;">
        <!-- Welcome Hero Card (Cozy Base Scene) -->
        <div class="ns-card" style="background: linear-gradient(135deg, #DBEAFE, #EFF6FF); border-color: var(--primary-blue-light); border-width: 3.5px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <div class="ns-character-avatar" style="width: 68px; height: 68px; font-size: 2.4rem; background: linear-gradient(135deg, #FEF3C7, #FDE68A);">👧</div>
            <div>
              <h2 style="font-family: var(--font-display); font-weight: 700; font-size: 1.4rem; color: var(--primary-blue-dark);">Chào Su!</h2>
              <p style="font-weight: 800; font-size: 0.98rem; color: var(--accent-orange); display: flex; align-items: center; gap: 4px;">
                <span style="font-size: 1.2rem;" class="animate-bounce">🔥</span> Chuỗi: ${data.streak} Ngày Liên Tiếp
              </p>
            </div>
          </div>
          <button class="ns-btn ns-btn-primary ns-squash-press ns-anticipate" style="width: 100%; margin-top: 18px;" onclick="window.app.navigateTo('map')">
            <span>Tiếp Tục Phiêu Lưu 🗺️</span>
          </button>
        </div>

        <!-- Daily Quests Card -->
        <div class="ns-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h3 style="font-family: var(--font-display); font-weight: 700; font-size: 1.2rem; color: var(--text-main);">🎯 Nhiệm Vụ Hằng Ngày</h3>
            <span class="ns-hud-badge" style="font-size: 0.85rem; padding: 4px 12px;">Thưởng +XP</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${data.dailyQuests.map(q => `
              <div style="background: #F8FAFC; border: 3px solid #E2E8F0; padding: 14px 16px; border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center; box-shadow: 0 3px 0 #CBD5E1;">
                <div>
                  <p style="font-weight: 800; font-size: 1rem; color: var(--text-main);">${q.title}</p>
                  <p style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700;">Tiến độ: ${q.progress}/${q.max}</p>
                </div>
                <div class="ns-hud-badge" style="padding: 4px 12px; font-size: 0.9rem;">⚡ +${q.rewardXp}</div>
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

  // 4. World Map View (Floating Island Terrain)
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

      <div class="ns-map-island-bg" style="flex: 1; padding: 24px 20px; position: relative; overflow-y: auto; display: flex; flex-direction: column; align-items: center; gap: 28px;">
        
        <!-- Node 1: Lesson Zero (Active Node Card) -->
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <div class="ns-map-node-card" style="width: 290px; text-align: center;" onclick="window.app.showMissionIntro()">
            <div style="font-size: 3rem; filter: drop-shadow(0 0 12px rgba(245, 158, 11, 0.5));" class="animate-bounce">🌟</div>
            <h3 style="font-family: var(--font-display); font-weight: 700; font-size: 1.25rem; color: var(--primary-blue-dark); margin-top: 4px;">Bài 1: Lời Chào Ngôi Sao</h3>
            <p style="font-size: 0.9rem; font-weight: 700; color: var(--text-muted); margin: 4px 0 12px 0;">Chào Hỏi Lịch Sự & Tự Tin</p>
            <div style="display: flex; justify-content: center; gap: 10px;">
              <span class="ns-hud-badge stars" style="font-size: 0.85rem; padding: 4px 12px;">⭐ 3 Stars</span>
              <span class="ns-hud-badge" style="font-size: 0.85rem; padding: 4px 12px;">${isNode1Completed ? '✅ Đã Học' : '🚀 Học Ngay'}</span>
            </div>
          </div>
        </div>

        <!-- Path Divider Ring -->
        <div style="width: 6px; height: 36px; background: linear-gradient(180deg, var(--primary-blue), #CBD5E1); border-radius: 999px;"></div>

        <!-- Node 2 (Unlocked if Node 1 completed) -->
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: ${isNode1Completed ? '1' : '0.65'};">
          <div class="ns-card" style="width: 270px; text-align: center; border-width: 3.5px; border-color: #CBD5E1;">
            <div style="font-size: 2.4rem;">🛡️</div>
            <h3 style="font-family: var(--font-display); font-weight: 700; font-size: 1.15rem; color: var(--text-main);">Bài 2: Từ Chối Người Lạ</h3>
            <p style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); margin-top: 4px;">${isNode1Completed ? 'Sẵn sàng học' : '🔒 Mở khóa khi xong Bài 1'}</p>
          </div>
        </div>

        <!-- Path Divider Ring -->
        <div style="width: 6px; height: 36px; background: #CBD5E1; border-radius: 999px;"></div>

        <!-- Island Boss Lair Node -->
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: 0.6;">
          <div class="ns-card" style="width: 250px; text-align: center; background: linear-gradient(135deg, #1E1B4B, #312E81); color: #FFFFFF; border-color: #FDE047;">
            <div style="font-size: 2.4rem;">🐉</div>
            <h3 style="font-family: var(--font-display); font-weight: 700; font-size: 1.1rem; color: #FDE047;">Boss Đảo Dũng Cảm</h3>
            <p style="font-size: 0.8rem; color: #A5B4FC; font-weight: 700; margin-top: 4px;">🔒 Cần 5 Ngôi Sao Đảo</p>
          </div>
        </div>

      </div>

      ${NSComponents.renderBottomNav({
        activeTab: 'map',
        onTabChange: "window.app.navigateToTab"
      })}
    `;
  },

  // 5. Profile View (Hero Journal)
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
        <div class="ns-card" style="text-align: center; border-width: 3.5px;">
          <div class="ns-character-avatar" style="width: 86px; height: 86px; font-size: 3.2rem; margin: 0 auto 14px auto; background: linear-gradient(135deg, #FEF3C7, #FDE68A);">👧</div>
          <h2 style="font-family: var(--font-display); font-weight: 700; font-size: 1.5rem; color: var(--primary-blue-dark);">Bé Su</h2>
          <p style="font-weight: 800; font-size: 0.98rem; color: var(--text-muted);">Cấp Độ: Ngôi Sao Tập Sự 🌟</p>

          <div style="display: flex; justify-content: center; gap: 16px; margin-top: 18px;">
            <div class="ns-hud-badge" style="font-size: 1.05rem; padding: 6px 18px;">⚡ ${data.xp} XP</div>
            <div class="ns-hud-badge stars" style="font-size: 1.05rem; padding: 6px 18px;">⭐ ${data.stars} Stars</div>
          </div>
        </div>

        <div class="ns-card">
          <h3 style="font-family: var(--font-display); font-weight: 700; font-size: 1.2rem; margin-bottom: 14px; color: var(--text-main);">🏅 Huy Chương Đã Đạt</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            ${data.completedNodes['island_1_node_1'] ? `
              <div style="background: linear-gradient(135deg, #FEFCE8, #FEF08A); border: 3px solid #FDE047; padding: 12px 16px; border-radius: var(--radius-md); display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 0.95rem; color: #D97706; box-shadow: 0 4px 0 #FACC15;">
                <span style="font-size: 1.4rem;">🏅</span>
                <span>Ngôi Sao Giao Tiếp</span>
              </div>
            ` : `<p style="font-weight: 700; color: var(--text-muted); font-size: 0.95rem;">Chưa có huy chương nào. Hãy hoàn thành Bài 1 nhé!</p>`}
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
