/* ==========================================================================
   NovaStars MVP — Layout Components (Header, BottomNav, HUD Badges)
   ========================================================================== */

const NSLayout = {
  renderHeader({ title, currentStage, totalStages, xp, stars, showProgress = true, onBack }) {
    const progressPercent = totalStages > 0 ? ((currentStage + 1) / totalStages) * 100 : 0;
    return `
      <header class="ns-app-header">
        ${onBack ? `<button class="ns-btn ns-btn-secondary" style="padding: 8px 14px; font-size: 1rem;" onclick="${onBack}">←</button>` : '<div></div>'}
        
        ${showProgress ? `
          <div class="ns-progress-container">
            <div class="ns-progress-fill" style="width: ${progressPercent}%;"></div>
          </div>
        ` : `<div class="ns-header-title">🌟 ${title || 'NovaStars'}</div>`}

        <div style="display: flex; gap: 8px;">
          <div class="ns-hud-badge stars">⭐ <span>${stars || 0}</span></div>
          <div class="ns-hud-badge">⚡ <span>${xp || 0} XP</span></div>
        </div>
      </header>
    `;
  },

  renderBottomNav({ activeTab = 'home', onTabChange }) {
    return `
      <nav class="ns-bottom-nav">
        <div class="ns-nav-item ${activeTab === 'home' ? 'active' : ''}" onclick="${onTabChange}('home')">
          <span class="ns-nav-icon">🏠</span>
          <span>Trang Chủ</span>
        </div>
        <div class="ns-nav-item ${activeTab === 'map' ? 'active' : ''}" onclick="${onTabChange}('map')">
          <span class="ns-nav-icon">🗺️</span>
          <span>Bản Đồ</span>
        </div>
        <div class="ns-nav-item ${activeTab === 'profile' ? 'active' : ''}" onclick="${onTabChange}('profile')">
          <span class="ns-nav-icon">👤</span>
          <span>Cá Nhân</span>
        </div>
      </nav>
    `;
  }
};

window.NSLayout = NSLayout;
