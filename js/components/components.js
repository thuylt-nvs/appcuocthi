/* ==========================================================================
   NovaStars MVP — 12 Essential Component Widgets (Milestone 1 Inventory)
   ========================================================================== */

const NSComponents = {
  // 1. App Header Component
  renderHeader({ title, currentStage, totalStages, xp, stars, showProgress = true, onBack }) {
    const progressPercent = totalStages > 0 ? ((currentStage + 1) / totalStages) * 100 : 0;
    return `
      <header class="ns-app-header">
        ${onBack ? `<button class="ns-btn ns-btn-secondary" style="padding: 8px 14px; font-size: 1rem;" onclick="${onBack}">←</button>` : '<div></div>'}
        
        ${showProgress ? `
          <div class="ns-progress-container">
            <div class="ns-progress-fill" style="width: ${progressPercent}%;"></div>
          </div>
        ` : `<div class="ns-header-title">${title || 'NovaStars'}</div>`}

        <div style="display: flex; gap: 8px;">
          <div class="ns-hud-badge stars">⭐ <span>${stars || 0}</span></div>
          <div class="ns-hud-badge">⚡ <span>${xp || 0} XP</span></div>
        </div>
      </header>
    `;
  },

  // 2. Story Dialogue Bubble Component
  renderStoryBubble({ characterName, avatar, text, decision }) {
    return `
      <div class="ns-story-bubble">
        <div class="ns-character-header">
          <div class="ns-character-avatar">${avatar || '👧'}</div>
          <div class="ns-character-name">${characterName}</div>
        </div>
        <div class="ns-dialogue-text">${text}</div>
      </div>
      ${decision ? `
        <div style="margin-top: 16px;">
          <p style="font-weight: 800; font-size: 1.05rem; margin-bottom: 12px; color: var(--primary-blue-dark);">${decision.prompt}</p>
          <div class="ns-choices-group">
            ${decision.choices.map((choice, index) => `
              <div class="ns-choice-card" onclick="window.lessonRunner.handleStoryDecision(${index})">
                <span style="font-size: 1.2rem;">👉</span>
                <span>${choice.text}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;
  },

  // 3. Choice Buttons Group Component
  renderChoiceButtons({ question, options, onSelect }) {
    return `
      <div class="ns-card" style="margin-bottom: 20px;">
        <h3 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 16px; color: var(--text-main);">${question}</h3>
        <div class="ns-choices-group">
          ${options.map((opt, idx) => `
            <div class="ns-choice-card" id="choice-btn-${idx}" onclick="${onSelect}(${idx})">
              <span style="font-weight: 800; color: var(--primary-blue);">${String.fromCharCode(65 + idx)}.</span>
              <span>${opt}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // 4. Drag & Drop Component
  renderDragAndDrop({ instruction, draggables, targetZoneLabel }) {
    return `
      <div class="ns-card">
        <p style="font-weight: 800; font-size: 1.1rem; margin-bottom: 16px;">${instruction}</p>
        <div class="ns-drag-area">
          <div class="ns-drop-zone" id="ns-target-dropzone" ondragover="event.preventDefault(); this.classList.add('drag-over')" ondragleave="this.classList.remove('drag-over')" ondrop="window.lessonRunner.handleDrop(event)">
            <span style="font-weight: 800; color: var(--text-muted);">${targetZoneLabel}</span>
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 10px;" id="draggable-source-container">
            ${draggables.map((item, idx) => `
              <div class="ns-draggable-item" draggable="true" id="drag-item-${idx}" ondragstart="event.dataTransfer.setData('text/plain', '${idx}')" onclick="window.lessonRunner.handleDragItemClick(${idx})">
                ${item.label}
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  // 5. Matching Grid Component
  renderMatchingGrid({ instruction, pairs }) {
    // Generate shuffled list of left and right cards
    const lefts = pairs.map(p => ({ id: p.id, text: p.left, type: 'left' }));
    const rights = [...pairs].sort(() => Math.random() - 0.5).map(p => ({ id: p.id, text: p.right, type: 'right' }));

    return `
      <div class="ns-card">
        <p style="font-weight: 800; font-size: 1.1rem; margin-bottom: 16px;">${instruction}</p>
        <div class="ns-matching-grid">
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${lefts.map(item => `
              <div class="ns-match-card" id="match-left-${item.id}" onclick="window.lessonRunner.handleMatchClick('left', ${item.id})">
                <span>${item.text}</span>
              </div>
            `).join('')}
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${rights.map(item => `
              <div class="ns-match-card" id="match-right-${item.id}" onclick="window.lessonRunner.handleMatchClick('right', ${item.id})">
                <span>${item.text}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  // 6. Sequence Builder Component
  renderSequenceBuilder({ instruction, steps }) {
    return `
      <div class="ns-card">
        <p style="font-weight: 800; font-size: 1.1rem; margin-bottom: 16px;">${instruction}</p>
        <div class="ns-sequence-list" id="sequence-builder-list">
          ${steps.map((step, idx) => `
            <div class="ns-sequence-item" id="seq-item-${idx}">
              <span>${step.text}</span>
              <div style="display: flex; gap: 6px;">
                <button class="ns-btn ns-btn-secondary" style="padding: 4px 10px; font-size: 0.9rem;" onclick="window.lessonRunner.moveSequence(${idx}, -1)">▲</button>
                <button class="ns-btn ns-btn-secondary" style="padding: 4px 10px; font-size: 0.9rem;" onclick="window.lessonRunner.moveSequence(${idx}, 1)">▼</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // 7. Boss Arena Component
  renderBossArena({ bossName, instruction, scenario, currentHp = 100 }) {
    return `
      <div class="ns-boss-arena">
        <div class="ns-boss-header">
          <div class="ns-boss-title">⚔️ ${bossName}</div>
          <div style="font-weight: 800; font-size: 0.9rem; color: #A5B4FC;">Thử Thách Cuối</div>
        </div>
        <div class="ns-boss-meter">
          <div class="ns-boss-meter-fill" id="boss-hp-bar" style="width: ${currentHp}%;"></div>
        </div>
        <p style="font-size: 1.05rem; font-weight: 600; line-height: 1.5; color: #E0E7FF;">${instruction}</p>
        
        <div style="background: rgba(255,255,255,0.1); padding: 16px; border-radius: var(--radius-md); margin-top: 10px;">
          <p style="font-weight: 800; font-size: 1.1rem; margin-bottom: 12px; color: #FDE047;">${scenario.question}</p>
          <div class="ns-choices-group">
            ${scenario.options.map((opt, idx) => `
              <div class="ns-choice-card" style="background: rgba(255,255,255,0.95);" onclick="window.lessonRunner.handleBossOption(${idx})">
                <span style="font-weight: 800; color: var(--primary-blue);">${idx + 1}.</span>
                <span>${opt.text}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  // 8. Reflection Card Component
  renderReflectionCard({ question, options, onSelect }) {
    return `
      <div class="ns-card" style="border-color: var(--accent-purple); background: #FAF5FF;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
          <span style="font-size: 1.8rem;">🤔</span>
          <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--accent-purple);">Suy Ngẫm & Phản Tư</h3>
        </div>
        <p style="font-size: 1.1rem; font-weight: 700; line-height: 1.5; margin-bottom: 16px;">${question}</p>
        <div class="ns-choices-group">
          ${options.map((opt, idx) => `
            <div class="ns-choice-card" style="border-color: #E9D5FF;" onclick="${onSelect}(${idx})">
              <span>${opt}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // 9. Real-life Challenge Card Component
  renderChallengeCard({ title, missionText, guideText, onComplete }) {
    return `
      <div class="ns-card" style="border-color: var(--accent-yellow); background: #FEFCE8;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
          <span style="font-size: 2rem;">🚀</span>
          <h3 style="font-size: 1.25rem; font-weight: 800; color: #D97706;">${title}</h3>
        </div>
        <p style="font-size: 1.15rem; font-weight: 800; color: var(--text-main); margin-bottom: 12px;">${missionText}</p>
        <div style="background: #FFFFFF; padding: 12px 16px; border-radius: var(--radius-sm); border: 2px solid #FEF08A; margin-bottom: 20px; font-weight: 600; color: #B45309;">
          💡 ${guideText}
        </div>
        <button class="ns-btn ns-btn-accent" style="width: 100%;" onclick="${onComplete}">
          <span>Em Đã Sẵn Sàng Làm Nhiệm Vụ!</span>
        </button>
      </div>
    `;
  },

  // 10. Parent Confirmation Modal Component
  renderParentConfirmModal({ parentPrompt, onConfirm }) {
    return `
      <div class="ns-card" style="border-color: var(--accent-green); background: #F0FDF4;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
          <span style="font-size: 2rem;">👨‍👩‍👧</span>
          <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--accent-green-dark);">Bằng Chứng Năng Lực Real-Life</h3>
        </div>
        <p style="font-size: 1.1rem; font-weight: 700; color: var(--text-main); margin-bottom: 16px;">${parentPrompt}</p>
        <button class="ns-btn ns-btn-green" style="width: 100%;" onclick="${onConfirm}">
          <span>👍 Bố/Mẹ Xác Nhận Bé Đã Hoàn Thành!</span>
        </button>
      </div>
    `;
  },

  // 11. Celebration Popup Modal Component
  renderCelebrationPopup({ title, xp, stars, badgeName, badgeIcon, onContinue, onReplay }) {
    return `
      <div class="ns-modal-overlay">
        <div class="ns-modal-card">
          <div style="font-size: 4rem;" class="animate-bounce">${badgeIcon || '🏆'}</div>
          <h2 style="font-size: 1.6rem; font-weight: 900; color: var(--accent-yellow);">${title || 'Chúc Mừng Ngôi Sao!'}</h2>
          <p style="font-weight: 800; font-size: 1.1rem; color: var(--accent-green-dark);">${badgeName || 'Ngôi Sao Hoàn Thành'}</p>
          
          <div style="display: flex; gap: 16px; margin: 10px 0;">
            <div class="ns-hud-badge" style="font-size: 1.1rem; padding: 8px 18px;">⚡ +${xp} XP</div>
            <div class="ns-hud-badge stars" style="font-size: 1.1rem; padding: 8px 18px;">⭐ +${stars} Stars</div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px; width: 100%; margin-top: 10px;">
            <button class="ns-btn ns-btn-primary" style="width: 100%;" onclick="${onContinue}">
              <span>Trở Về Bản Đồ Thế Giới 🗺️</span>
            </button>
            <button class="ns-btn ns-btn-secondary" style="width: 100%;" onclick="${onReplay}">
              <span>Chơi Lại Bài Học 🔄</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // 12. Bottom Navigation Component
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

window.NSComponents = NSComponents;
