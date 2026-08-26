/* ==========================================================================
   NovaStars MVP — Universal Lesson Runner Engine Orchestrator
   Decomposed Sub-Controllers Architecture (Zero eval(), Dual Touch/Drag Support)
   ========================================================================== */

class LessonRunner {
  constructor() {
    this.lessonData = null;
    this.currentStageIndex = 0;
    this.currentSubIndex = 0;
    this.container = null;
    this.selectedDragIdx = null;
    this.matchState = { left: null, right: null, matchedCount: 0, lefts: [], rights: [] };
    this.sequenceState = [];
    this.selectedSeqIdx = null;
    this.bossHp = 100;
    this.activeModalConfig = null;
  }

  init(containerId, lessonData) {
    if (!containerId || !lessonData) return;
    this.container = document.getElementById(containerId);
    this.lessonData = lessonData;
    this.currentStageIndex = 0;
    this.currentSubIndex = 0;
    this.bossHp = 100;
    this.selectedDragIdx = null;
    this.matchState = { left: null, right: null, matchedCount: 0, lefts: [], rights: [] };
    this.sequenceState = [];
    this.selectedSeqIdx = null;
    this.activeModalConfig = null;

    // DOM Cleanup: Remove all lingering modal roots
    ['reward-popup-modal-root', 'hero-journal-modal-root', 'mission-intro-modal-root', 'ftue-modal-root'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.remove();
    });

    this.renderCurrentStage();
  }

  renderCurrentStage() {
    if (!this.container || !this.lessonData || !Array.isArray(this.lessonData.stages)) return;

    const stage = this.lessonData.stages[this.currentStageIndex];
    if (!stage) return;

    const headerHtml = NSLayout.renderHeader({
      title: this.lessonData.competencyName || 'Bài Học',
      currentStage: this.currentStageIndex,
      totalStages: this.lessonData.stages.length,
      xp: (window.appState && window.appState.data) ? window.appState.data.xp : 0,
      stars: (window.appState && window.appState.data) ? window.appState.data.stars : 0,
      showProgress: true,
      onBack: "window.app.navigateTo('map')"
    });

    let stageContentHtml = '';

    switch (stage.type) {
      case 'pretest':
        stageContentHtml = window.pretestController ? window.pretestController.render(stage, this.currentSubIndex) : '';
        break;
      case 'story':
        stageContentHtml = window.storyController ? window.storyController.render(stage) : '';
        break;
      case 'minigame_drag':
        stageContentHtml = window.minigameController ? window.minigameController.renderDrag(stage, this.selectedDragIdx) : '';
        break;
      case 'minigame_match':
        stageContentHtml = window.minigameController ? window.minigameController.renderMatch(stage, this.matchState) : '';
        break;
      case 'minigame_sequence':
        stageContentHtml = window.minigameController ? window.minigameController.renderSequence(stage, this.sequenceState, this.selectedSeqIdx) : '';
        break;
      case 'boss':
        stageContentHtml = window.bossController ? window.bossController.render(stage, this.currentSubIndex, this.bossHp) : '';
        break;
      case 'reflection':
        stageContentHtml = window.reflectionController ? window.reflectionController.renderReflection(stage) : '';
        break;
      case 'challenge':
        stageContentHtml = window.reflectionController ? window.reflectionController.renderChallenge(stage) : '';
        break;
      case 'parent_confirm':
        stageContentHtml = window.reflectionController ? window.reflectionController.renderParent(stage) : '';
        break;
      case 'posttest':
        stageContentHtml = window.pretestController ? window.pretestController.render(stage, 0) : '';
        break;
      default:
        stageContentHtml = `<div class="ns-card">Nội dung bài học đang được tải...</div>`;
    }

    let modalOverlayHtml = '';
    if (this.activeModalConfig) {
      modalOverlayHtml = NSModals.renderStoryFeedbackModal(this.activeModalConfig);
    }

    this.container.innerHTML = `
      ${headerHtml}
      <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; overflow-y: auto;">
        <div>
          <div style="margin-bottom: 12px; font-weight: 800; font-size: 0.85rem; color: var(--primary-blue); text-transform: uppercase; letter-spacing: 0.5px;">
            📍 Màn ${this.currentStageIndex + 1} / ${this.lessonData.stages.length}: ${stage.title || ''}
          </div>
          ${stageContentHtml}
        </div>
      </div>
      ${modalOverlayHtml}
    `;
  }

  showModal(config) {
    this.activeModalConfig = config;
    this.renderCurrentStage();
  }

  closeModalAndContinue() {
    this.activeModalConfig = null;
    this.renderCurrentStage();
  }

  closeModalAndNextStage() {
    this.activeModalConfig = null;
    this.nextStage();
  }

  advancePretestSubQuestion() {
    const nextSub = this.activeModalConfig ? this.activeModalConfig.nextSubIndex : (this.currentSubIndex + 1);
    this.activeModalConfig = null;
    this.currentSubIndex = nextSub;
    this.renderCurrentStage();
  }

  advanceBossScenario() {
    const nextSub = this.activeModalConfig ? this.activeModalConfig.nextSubIndex : (this.currentSubIndex + 1);
    this.activeModalConfig = null;
    this.currentSubIndex = nextSub;
    this.renderCurrentStage();
  }

  /* Delegation Handlers */
  handlePretestAnswer(optionIdx, evt) {
    if (!this.lessonData || !Array.isArray(this.lessonData.stages)) return;
    const stage = this.lessonData.stages[this.currentStageIndex];
    if (stage && stage.type === 'posttest') {
      this.handlePosttestAnswer(optionIdx, evt);
    } else if (window.pretestController) {
      window.pretestController.handleAnswer(stage, this.currentSubIndex, optionIdx, this);
    }
  }

  handleStoryDecision(choiceIdx, evt) {
    if (!this.lessonData || !Array.isArray(this.lessonData.stages)) return;
    const stage = this.lessonData.stages[this.currentStageIndex];
    if (window.storyController) {
      window.storyController.handleDecision(stage, choiceIdx, this);
    }
  }

  /* Stage 3 Dual Interaction Handlers: Tap-to-Select & Drag-and-Drop */
  handleDragItemClick(idx, evt) {
    if (window.soundEngine) window.soundEngine.playTap();
    this.selectedDragIdx = (this.selectedDragIdx === idx) ? null : idx;
    this.renderCurrentStage();
  }

  handleDropZoneClick(evt) {
    if (this.selectedDragIdx !== null && this.lessonData && Array.isArray(this.lessonData.stages)) {
      const stage = this.lessonData.stages[this.currentStageIndex];
      if (window.minigameController && stage) {
        window.minigameController.processDragSelection(stage, this.selectedDragIdx, this);
      }
      this.selectedDragIdx = null;
    }
  }

  handleDrop(evt) {
    if (!evt) return;
    evt.preventDefault();
    const idxStr = evt.dataTransfer ? evt.dataTransfer.getData('text/plain') : '';
    if (idxStr !== '' && this.lessonData && Array.isArray(this.lessonData.stages)) {
      const stage = this.lessonData.stages[this.currentStageIndex];
      if (window.minigameController && stage) {
        window.minigameController.processDragSelection(stage, parseInt(idxStr, 10), this);
      }
      this.selectedDragIdx = null;
    }
  }

  handleMatchClick(type, id, evt) {
    if (!this.lessonData || !Array.isArray(this.lessonData.stages)) return;
    const stage = this.lessonData.stages[this.currentStageIndex];
    if (window.minigameController) {
      window.minigameController.handleMatchClick(type, id, this.matchState, this, evt);
    }
  }

  moveSequenceUp(idx, evt) {
    if (evt && evt.stopPropagation) evt.stopPropagation();
    if (window.soundEngine) window.soundEngine.playTap();
    if (idx > 0 && Array.isArray(this.sequenceState)) {
      const temp = this.sequenceState[idx];
      this.sequenceState[idx] = this.sequenceState[idx - 1];
      this.sequenceState[idx - 1] = temp;
      this.selectedSeqIdx = null;
      this.renderCurrentStage();
    }
  }

  moveSequenceDown(idx, evt) {
    if (evt && evt.stopPropagation) evt.stopPropagation();
    if (window.soundEngine) window.soundEngine.playTap();
    if (Array.isArray(this.sequenceState) && idx < this.sequenceState.length - 1) {
      const temp = this.sequenceState[idx];
      this.sequenceState[idx] = this.sequenceState[idx + 1];
      this.sequenceState[idx + 1] = temp;
      this.selectedSeqIdx = null;
      this.renderCurrentStage();
    }
  }

  handleSequenceTap(idx, evt) {
    if (window.soundEngine) window.soundEngine.playTap();
    if (this.selectedSeqIdx === null) {
      this.selectedSeqIdx = idx;
    } else if (this.selectedSeqIdx === idx) {
      this.selectedSeqIdx = null;
    } else {
      const temp = this.sequenceState[this.selectedSeqIdx];
      this.sequenceState[this.selectedSeqIdx] = this.sequenceState[idx];
      this.sequenceState[idx] = temp;
      this.selectedSeqIdx = null;
    }
    this.renderCurrentStage();
  }

  checkSequence() {
    const isCorrect = Array.isArray(this.sequenceState) &&
      this.sequenceState.length === 3 &&
      this.sequenceState.every((step, idx) => step.correctOrder === (idx + 1));

    if (isCorrect) {
      if (window.soundEngine) window.soundEngine.playCorrect();
      if (window.particleEngine) window.particleEngine.spawnStarBurst();
    } else {
      if (window.soundEngine) window.soundEngine.playWrong();
    }

    this.showModal({
      title: isCorrect ? "Bí Kíp 3 Bước Chuẩn! 🌟" : "Gợi Ý Thứ Tự Ngôi Sao 💡",
      avatar: "🌟",
      speaker: "Sao Nova",
      text: isCorrect
        ? "Chính xác! 3 Bước Chào Ngôi Sao: 1. Mỉm Cười → 2. Cất Lời Chào → 3. Tự Giới Thiệu Tên!"
        : "Bí kíp luôn bắt đầu bằng Nụ Cười mỉm ấm áp trước hết. Em hãy chạm vào 2 bước để thử đổi lại thứ tự nhé!",
      isCorrect: isCorrect,
      actionType: isCorrect ? "next" : "continue"
    });
  }

  handleBossOption(optIdx, evt) {
    if (!this.lessonData || !Array.isArray(this.lessonData.stages)) return;
    const stage = this.lessonData.stages[this.currentStageIndex];
    if (window.bossController) {
      window.bossController.handleOption(stage, this.currentSubIndex, optIdx, this, evt);
    }
  }

  handleReflectionSelect(idx, evt) {
    if (window.reflectionController) {
      window.reflectionController.handleReflectionSelect(idx, this, evt);
    }
  }

  handleParentConfirm() {
    if (window.reflectionController) {
      window.reflectionController.handleParentConfirm(this);
    }
  }

  /* Consolidated Single-Path Celebration Modal Rendering */
  showCelebrationModal(rewardData) {
    const data = rewardData || { xp: 100, stars: 3, badgeName: "Huy Chương Ngôi Sao Giao Tiếp", badgeIcon: "🏅" };
    if (window.soundEngine) window.soundEngine.playVictory();
    if (window.confettiEngine) window.confettiEngine.burst(120);

    const existing = document.getElementById('reward-popup-modal-root');
    if (existing) existing.remove();

    const modalDiv = document.createElement('div');
    modalDiv.id = 'reward-popup-modal-root';
    modalDiv.innerHTML = NSModals.renderCelebrationPopup({
      title: "Hoàn Thành Xuất Sắc!",
      xp: data.xp || 100,
      stars: data.stars || 3,
      badgeName: data.badgeName || "Huy Chương Ngôi Sao Giao Tiếp",
      badgeIcon: data.badgeIcon || "🏅",
      onContinue: "window.app.showHeroJournalAndReturn()",
      onReplay: "window.lessonRunner.replayLessonZero()"
    });

    const root = document.getElementById('app-root');
    if (root) root.appendChild(modalDiv);
  }

  handlePosttestAnswer(idx, evt) {
    if (!this.lessonData || !Array.isArray(this.lessonData.stages)) return;
    const stage = this.lessonData.stages[this.currentStageIndex];
    const rewardData = stage ? stage.rewardData : null;

    if (window.appState) {
      const xp = (rewardData && rewardData.xp) ? rewardData.xp : 100;
      const stars = (rewardData && rewardData.stars) ? rewardData.stars : 3;
      window.appState.addXP(xp);
      window.appState.addStars(stars);
      window.appState.completeLessonNode('island_1_node_1');
    }

    this.showCelebrationModal(rewardData);
  }

  replayLessonZero() {
    ['reward-popup-modal-root', 'hero-journal-modal-root', 'mission-intro-modal-root', 'ftue-modal-root'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.remove();
    });

    this.init('app-view-container', window.lessonZeroData);
  }

  nextStage() {
    this.currentStageIndex++;
    this.currentSubIndex = 0;
    this.selectedDragIdx = null;
    this.matchState = { left: null, right: null, matchedCount: 0, lefts: [], rights: [] };
    this.sequenceState = [];
    this.selectedSeqIdx = null;
    this.activeModalConfig = null;

    if (this.lessonData && Array.isArray(this.lessonData.stages) && this.currentStageIndex < this.lessonData.stages.length) {
      this.renderCurrentStage();
    }
  }
}

window.lessonRunner = new LessonRunner();
