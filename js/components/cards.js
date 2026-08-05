/* ==========================================================================
   NovaStars MVP — Interactive Cards Components (With Guard Clauses & Null Safety)
   ========================================================================== */

const NSCards = {
  // 1. Story Dialogue Bubble Component (With Expressive Reaction Avatars)
  renderStoryBubble({ characterName = 'Sao Nova', avatar = '🌟', text = '', decision = null, emotion = 'happy' } = {}) {
    const isNova = characterName === 'Sao Nova';
    const bgGradient = isNova 
      ? 'linear-gradient(135deg, #FEF3C7, #FDE68A)' 
      : 'linear-gradient(135deg, #DBEAFE, #93C5FD)';

    let displayEmoji = avatar || (isNova ? '🌟' : '👧');
    if (emotion === 'excited') displayEmoji = isNova ? '✨' : '😄';
    if (emotion === 'surprised') displayEmoji = isNova ? '💫' : '😯';

    const choices = (decision && Array.isArray(decision.choices)) ? decision.choices : [];

    return `
      <div class="ns-story-bubble" style="border-color: ${isNova ? '#F59E0B' : 'var(--primary-blue-light)'};">
        <div class="ns-character-header">
          <div class="ns-character-avatar" style="background: ${bgGradient};">
            <span class="animate-bounce">${displayEmoji}</span>
          </div>
          <div>
            <div class="ns-character-name" style="color: ${isNova ? '#B45309' : 'var(--primary-blue-dark)'};">${characterName}</div>
            <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted);">${isNova ? 'Thần Vệ Nữ Kỹ Năng' : 'Anh Hùng Tập Sự'}</span>
          </div>
        </div>
        <div class="ns-dialogue-text">${text}</div>
      </div>
      ${decision ? `
        <div style="margin-top: 16px;">
          <p style="font-weight: 800; font-size: 1.05rem; margin-bottom: 12px; color: var(--primary-blue-dark);">${decision.prompt || ''}</p>
          <div class="ns-choices-group">
            ${choices.map((choice, index) => `
              <div class="ns-choice-card" onclick="window.lessonRunner.handleStoryDecision(${index}, event)">
                <span style="font-size: 1.3rem;">👉</span>
                <span style="font-weight: 800;">${choice.text}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;
  },

  // 2. Choice Buttons Group Component
  renderChoiceButtons({ question = '', options = [], onSelect = '' } = {}) {
    const safeOptions = Array.isArray(options) ? options : [];
    return `
      <div class="ns-card" style="margin-bottom: 20px;">
        <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 16px; color: var(--text-main); line-height: 1.5;">${question}</h3>
        <div class="ns-choices-group">
          ${safeOptions.map((opt, idx) => `
            <div class="ns-choice-card" id="choice-btn-${idx}" onclick="${onSelect}(${idx}, event)">
              <span style="font-weight: 900; font-size: 1.1rem; color: var(--primary-blue); background: #EFF6FF; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">${String.fromCharCode(65 + idx)}</span>
              <span style="font-weight: 700; flex: 1;">${opt}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // 3. Touch-Compatible & Tap-to-Select Drag & Drop Component
  renderDragAndDrop({ instruction = '', draggables = [], targetZoneLabel = '', selectedIdx = null } = {}) {
    const safeDraggables = Array.isArray(draggables) ? draggables : [];
    return `
      <div class="ns-card">
        <p style="font-weight: 800; font-size: 1.1rem; margin-bottom: 14px; color: var(--primary-blue-dark);">${instruction}</p>
        <div style="background: #FEF3C7; padding: 10px 14px; border-radius: var(--radius-sm); border: 2px solid #FDE68A; margin-bottom: 16px; font-weight: 700; font-size: 0.85rem; color: #B45309;">
          💡 Em có thể <b>Kéo</b> hoặc <b>Chạm vào thẻ</b> rồi chạm vào Ô Lời Chào nhé!
        </div>

        <div class="ns-drag-area">
          <div class="ns-drop-zone" id="ns-target-dropzone" 
               ondragover="event.preventDefault(); this.classList.add('drag-over')" 
               ondragleave="this.classList.remove('drag-over')" 
               ondrop="window.lessonRunner.handleDrop(event)"
               onclick="window.lessonRunner.handleDropZoneClick(event)">
            <span style="font-weight: 800; color: var(--text-muted); pointer-events: none;">${targetZoneLabel}</span>
            <div id="dropzone-slotted-content" style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; width: 100%;"></div>
          </div>

          <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 12px;" id="draggable-source-container">
            ${safeDraggables.map((item, idx) => `
              <div class="ns-draggable-item ${selectedIdx === idx ? 'selected-for-tap' : ''}" 
                   draggable="true" 
                   id="drag-item-${idx}" 
                   ondragstart="event.dataTransfer.setData('text/plain', '${idx}')" 
                   onclick="window.lessonRunner.handleDragItemClick(${idx}, event)"
                   style="position: relative;">
                <span>${item.label}</span>
                ${selectedIdx === idx ? '<div class="ns-corner-star-badge animate-bounce">⭐</div>' : ''}
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  // 4. Matching Grid Component
  renderMatchingGrid({ instruction = '', pairs = [], lefts = [], rights = [] } = {}) {
    const safeLefts = Array.isArray(lefts) ? lefts : [];
    const safeRights = Array.isArray(rights) ? rights : [];
    return `
      <div class="ns-card">
        <p style="font-weight: 800; font-size: 1.1rem; margin-bottom: 16px; color: var(--primary-blue-dark);">${instruction}</p>
        <div class="ns-matching-grid">
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${safeLefts.map(item => `
              <div class="ns-match-card" id="match-left-${item.id}" onclick="window.lessonRunner.handleMatchClick('left', ${item.id}, event)">
                <span>${item.text}</span>
              </div>
            `).join('')}
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${safeRights.map(item => `
              <div class="ns-match-card" id="match-right-${item.id}" onclick="window.lessonRunner.handleMatchClick('right', ${item.id}, event)">
                <span>${item.text}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  // 5. Child-Friendly Tap-to-Swap Sequence Builder Component
  renderSequenceBuilder({ instruction = '', steps = [], selectedSeqIdx = null } = {}) {
    const safeSteps = Array.isArray(steps) ? steps : [];
    return `
      <div class="ns-card">
        <p style="font-weight: 800; font-size: 1.1rem; margin-bottom: 12px; color: var(--primary-blue-dark);">${instruction}</p>
        <div style="background: #EFF6FF; padding: 10px 14px; border-radius: var(--radius-sm); border: 2px solid #93C5FD; margin-bottom: 16px; font-weight: 700; font-size: 0.85rem; color: #1E40AF;">
          💡 Chạm vào 2 bước để <b>Đổi Vị Trí</b> cho đúng thứ tự chuẩn nhé!
        </div>

        <div class="ns-sequence-list" id="sequence-builder-list">
          ${safeSteps.map((step, idx) => `
            <div class="ns-sequence-item ${selectedSeqIdx === idx ? 'seq-selected' : ''}" 
                 id="seq-item-${idx}" 
                 onclick="window.lessonRunner.handleSequenceTap(${idx}, event)">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span class="ns-hud-badge" style="width: 28px; height: 28px; padding: 0; display: flex; align-items: center; justify-content: center; font-size: 0.9rem;">${idx + 1}</span>
                <span>${step.text}</span>
              </div>
              <span style="font-size: 1.2rem; color: var(--primary-blue); font-weight: 800;">${selectedSeqIdx === idx ? '✨ Chọn' : '🔄'}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // 6. Boss Arena Component
  renderBossArena({ bossName = 'Boss', instruction = '', scenario = { question: '', options: [] }, currentHp = 100, scenarioIndex = 0, totalScenarios = 2 } = {}) {
    const safeOptions = (scenario && Array.isArray(scenario.options)) ? scenario.options : [];
    return `
      <div class="ns-boss-arena" id="boss-arena-card">
        <div class="ns-boss-header">
          <div class="ns-boss-title">⚔️ ${bossName}</div>
          <div style="font-weight: 800; font-size: 0.85rem; color: #FDE047; background: rgba(255,255,255,0.15); padding: 4px 10px; border-radius: 999px;">
            Lượt ${scenarioIndex + 1} / ${totalScenarios}
          </div>
        </div>
        <div class="ns-boss-meter">
          <div class="ns-boss-meter-fill" id="boss-hp-bar" style="width: ${currentHp}%;"></div>
        </div>
        <p style="font-size: 1rem; font-weight: 600; line-height: 1.5; color: #E0E7FF;">${instruction}</p>
        
        <div style="background: rgba(255,255,255,0.1); padding: 16px; border-radius: var(--radius-md); margin-top: 6px; border: 2px solid rgba(255,255,255,0.2);">
          <p style="font-weight: 800; font-size: 1.05rem; margin-bottom: 12px; color: #FDE047; line-height: 1.4;">${scenario.question || ''}</p>
          <div class="ns-choices-group">
            ${safeOptions.map((opt, idx) => `
              <div class="ns-choice-card" style="background: rgba(255,255,255,0.95);" onclick="window.lessonRunner.handleBossOption(${idx}, event)">
                <span style="font-weight: 900; color: var(--primary-blue); font-size: 1.1rem;">${idx + 1}.</span>
                <span style="font-weight: 800; color: var(--text-main);">${opt.text}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  // 7. Reflection Card Component
  renderReflectionCard({ question = '', options = [], onSelect = '' } = {}) {
    const safeOptions = Array.isArray(options) ? options : [];
    return `
      <div class="ns-card" style="border-color: var(--accent-purple); background: #FAF5FF;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
          <span style="font-size: 2rem;">🤔</span>
          <h3 style="font-size: 1.2rem; font-weight: 900; color: var(--accent-purple);">Suy Ngẫm & Phản Tư</h3>
        </div>
        <p style="font-size: 1.1rem; font-weight: 700; line-height: 1.5; margin-bottom: 16px;">${question}</p>
        <div class="ns-choices-group">
          ${safeOptions.map((opt, idx) => `
            <div class="ns-choice-card" style="border-color: #E9D5FF;" onclick="${onSelect}(${idx}, event)">
              <span style="font-weight: 700;">${opt}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // 8. Real-life Challenge Card Component
  renderChallengeCard({ title = '', missionText = '', guideText = '', onComplete = '' } = {}) {
    return `
      <div class="ns-card" style="border-color: var(--accent-yellow); background: #FEFCE8;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
          <span style="font-size: 2.2rem;">🚀</span>
          <h3 style="font-size: 1.25rem; font-weight: 900; color: #D97706;">${title}</h3>
        </div>
        <p style="font-size: 1.1rem; font-weight: 800; color: var(--text-main); margin-bottom: 12px; line-height: 1.5;">${missionText}</p>
        <div style="background: #FFFFFF; padding: 14px 16px; border-radius: var(--radius-sm); border: 2px solid #FEF08A; margin-bottom: 20px; font-weight: 700; color: #B45309; line-height: 1.4;">
          💡 ${guideText}
        </div>
        <button class="ns-btn ns-btn-accent" style="width: 100%;" onclick="${onComplete}(event)">
          <span>Em Đã Sẵn Sàng Làm Nhiệm Vụ! 🌟</span>
        </button>
      </div>
    `;
  }
};

window.NSCards = NSCards;
