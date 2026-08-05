/* ==========================================================================
   NovaStars MVP — Universal Lesson Runner Engine (10-Stage State Machine)
   ========================================================================== */

class LessonRunner {
  constructor() {
    this.lessonData = null;
    this.currentStageIndex = 0;
    this.container = null;
    this.dragSelectedIdx = null;
    this.matchState = { left: null, right: null, matchedCount: 0 };
    this.sequenceState = [];
    this.bossHp = 100;
  }

  init(containerId, lessonData) {
    this.container = document.getElementById(containerId);
    this.lessonData = lessonData;
    this.currentStageIndex = 0;
    this.bossHp = 100;
    this.renderCurrentStage();
  }

  renderCurrentStage() {
    if (!this.container || !this.lessonData) return;

    const stage = this.lessonData.stages[this.currentStageIndex];
    if (!stage) return;

    // Header HTML
    const headerHtml = NSComponents.renderHeader({
      title: this.lessonData.competencyName,
      currentStage: this.currentStageIndex,
      totalStages: this.lessonData.stages.length,
      xp: window.appState.data.xp,
      stars: window.appState.data.stars,
      showProgress: true,
      onBack: "window.app.navigateTo('map')"
    });

    let stageContentHtml = '';

    switch (stage.type) {
      case 'pretest':
        stageContentHtml = this.renderPretestStage(stage);
        break;
      case 'story':
        stageContentHtml = this.renderStoryStage(stage);
        break;
      case 'minigame_drag':
        stageContentHtml = this.renderDragStage(stage);
        break;
      case 'minigame_match':
        stageContentHtml = this.renderMatchStage(stage);
        break;
      case 'minigame_sequence':
        stageContentHtml = this.renderSequenceStage(stage);
        break;
      case 'boss':
        stageContentHtml = this.renderBossStage(stage);
        break;
      case 'reflection':
        stageContentHtml = this.renderReflectionStage(stage);
        break;
      case 'challenge':
        stageContentHtml = this.renderChallengeStage(stage);
        break;
      case 'parent_confirm':
        stageContentHtml = this.renderParentStage(stage);
        break;
      case 'posttest':
        stageContentHtml = this.renderPosttestStage(stage);
        break;
      default:
        stageContentHtml = `<div class="ns-card">Stage type standard handler.</div>`;
    }

    this.container.innerHTML = `
      ${headerHtml}
      <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="margin-bottom: 12px; font-weight: 800; font-size: 0.9rem; color: var(--primary-blue); text-transform: uppercase;">
            Màn ${this.currentStageIndex + 1} / ${this.lessonData.stages.length}: ${stage.title}
          </div>
          ${stageContentHtml}
        </div>
      </div>
    `;
  }

  /* 1. Pretest Stage */
  renderPretestStage(stage) {
    const q = stage.questions[0];
    return NSComponents.renderChoiceButtons({
      question: q.question,
      options: q.options,
      onSelect: "window.lessonRunner.handlePretestAnswer"
    });
  }

  handlePretestAnswer(optionIdx) {
    window.soundEngine.playCorrect();
    alert("Tuyệt vời! Bạn đã chọn đáp án thông minh. Hãy bước vào câu chuyện nhé!");
    this.nextStage();
  }

  /* 2. Story Stage */
  renderStoryStage(stage) {
    const d = stage.dialogues[0];
    return NSComponents.renderStoryBubble({
      characterName: d.speaker,
      avatar: d.avatar,
      text: d.text,
      decision: stage.decision
    });
  }

  handleStoryDecision(choiceIdx) {
    const stage = this.lessonData.stages[this.currentStageIndex];
    const choice = stage.decision.choices[choiceIdx];
    if (choice.correct) {
      window.soundEngine.playCorrect();
      alert(choice.feedback);
      this.nextStage();
    } else {
      window.soundEngine.playWrong();
      alert(choice.feedback);
    }
  }

  /* 3. Drag & Drop Stage */
  renderDragStage(stage) {
    return NSComponents.renderDragAndDrop({
      instruction: stage.instruction,
      draggables: stage.draggables,
      targetZoneLabel: stage.targetZoneLabel
    });
  }

  handleDragItemClick(idx) {
    const stage = this.lessonData.stages[this.currentStageIndex];
    const item = stage.draggables[idx];
    if (item.isCorrect) {
      window.soundEngine.playCorrect();
      const dropzone = document.getElementById('ns-target-dropzone');
      if (dropzone) {
        dropzone.innerHTML += `<div class="ns-draggable-item" style="border-color: var(--accent-green); background: #ECFDF5;">${item.label}</div>`;
      }
      const sourceItem = document.getElementById(`drag-item-${idx}`);
      if (sourceItem) sourceItem.style.display = 'none';

      // Check if finished
      setTimeout(() => {
        alert("Chính xác! Bạn đã chọn đúng cử chỉ lịch sự!");
        this.nextStage();
      }, 500);
    } else {
      window.soundEngine.playWrong();
      alert("Hành vi này chưa lịch sự đâu, hãy chọn lại cử chỉ thân thiện nhé!");
    }
  }

  /* 4. Matching Grid Stage */
  renderMatchStage(stage) {
    this.matchState = { left: null, right: null, matchedCount: 0 };
    return NSComponents.renderMatchingGrid({
      instruction: stage.instruction,
      pairs: stage.pairs
    });
  }

  handleMatchClick(type, id) {
    window.soundEngine.playTap();
    if (type === 'left') {
      if (this.matchState.left) {
        document.getElementById(`match-left-${this.matchState.left}`)?.classList.remove('active');
      }
      this.matchState.left = id;
      document.getElementById(`match-left-${id}`)?.classList.add('active');
    } else {
      if (this.matchState.right) {
        document.getElementById(`match-right-${this.matchState.right}`)?.classList.remove('active');
      }
      this.matchState.right = id;
      document.getElementById(`match-right-${id}`)?.classList.add('active');
    }

    if (this.matchState.left && this.matchState.right) {
      if (this.matchState.left === this.matchState.right) {
        window.soundEngine.playCorrect();
        document.getElementById(`match-left-${this.matchState.left}`)?.classList.add('matched');
        document.getElementById(`match-right-${this.matchState.right}`)?.classList.add('matched');
        this.matchState.matchedCount++;
        this.matchState.left = null;
        this.matchState.right = null;

        if (this.matchState.matchedCount >= 3) {
          setTimeout(() => {
            alert("Tuyệt vời! Em đã ghép đúng tất cả lời chào lịch sự!");
            this.nextStage();
          }, 400);
        }
      } else {
        window.soundEngine.playWrong();
        setTimeout(() => {
          document.getElementById(`match-left-${this.matchState.left}`)?.classList.remove('active');
          document.getElementById(`match-right-${this.matchState.right}`)?.classList.remove('active');
          this.matchState.left = null;
          this.matchState.right = null;
        }, 500);
      }
    }
  }

  /* 5. Sequence Stage */
  renderSequenceStage(stage) {
    this.sequenceState = [...stage.steps];
    return NSComponents.renderSequenceBuilder({
      instruction: stage.instruction,
      steps: this.sequenceState
    }) + `
      <button class="ns-btn ns-btn-green" style="margin-top: 16px; width: 100%;" onclick="window.lessonRunner.checkSequence()">
        <span>Xác Nhận Thứ Tự 3 Bước</span>
      </button>
    `;
  }

  moveSequence(idx, direction) {
    window.soundEngine.playTap();
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= this.sequenceState.length) return;

    const temp = this.sequenceState[idx];
    this.sequenceState[idx] = this.sequenceState[newIdx];
    this.sequenceState[newIdx] = temp;

    this.renderCurrentStage();
  }

  checkSequence() {
    window.soundEngine.playCorrect();
    alert("Chính xác! 3 bước chào ngôi sao: 1. Mỉm cười -> 2. Cất lời chào -> 3. Tự giới thiệu tên!");
    this.nextStage();
  }

  /* 6. Boss Stage */
  renderBossStage(stage) {
    const sc = stage.scenarios[0];
    return NSComponents.renderBossArena({
      bossName: stage.bossName,
      instruction: stage.instruction,
      scenario: sc,
      currentHp: this.bossHp
    });
  }

  handleBossOption(optIdx) {
    const stage = this.lessonData.stages[this.currentStageIndex];
    const sc = stage.scenarios[0];
    const opt = sc.options[optIdx];

    if (opt.correct) {
      window.soundEngine.playVictory();
      this.bossHp = 0;
      alert("Chiến thắng Boss! Bạn đã xử lý tình huống công viên cực kỳ xuất sắc!");
      this.nextStage();
    } else {
      window.soundEngine.playWrong();
      this.bossHp = Math.max(20, this.bossHp - opt.hpDamage);
      const bar = document.getElementById('boss-hp-bar');
      if (bar) bar.style.width = `${this.bossHp}%`;
      alert(opt.feedback);
    }
  }

  /* 7. Reflection Stage */
  renderReflectionStage(stage) {
    return NSComponents.renderReflectionCard({
      question: stage.question,
      options: stage.options,
      onSelect: "window.lessonRunner.handleReflectionSelect"
    });
  }

  handleReflectionSelect(idx) {
    window.soundEngine.playCorrect();
    alert("Cảm ơn câu trả lời chân thành của em. Hãy mang nụ cười này ra ngoài đời thực nhé!");
    this.nextStage();
  }

  /* 8. Challenge Stage */
  renderChallengeStage(stage) {
    return NSComponents.renderChallengeCard({
      title: stage.title,
      missionText: stage.missionText,
      guideText: stage.guideText,
      onComplete: "window.lessonRunner.nextStage()"
    });
  }

  /* 9. Parent Confirmation Stage */
  renderParentStage(stage) {
    return NSComponents.renderParentConfirmModal({
      parentPrompt: stage.parentPrompt,
      onConfirm: "window.lessonRunner.handleParentConfirm()"
    });
  }

  handleParentConfirm() {
    window.soundEngine.playVictory();
    alert("Bằng chứng năng lực đã được lưu! Bố mẹ rất tự hào về em!");
    this.nextStage();
  }

  /* 10. Posttest & Reward Stage */
  renderPosttestStage(stage) {
    return NSComponents.renderChoiceButtons({
      question: stage.question,
      options: stage.options,
      onSelect: "window.lessonRunner.handlePosttestAnswer"
    }) + `
      <div id="reward-popup-container"></div>
    `;
  }

  handlePosttestAnswer(idx) {
    const stage = this.lessonData.stages[this.currentStageIndex];
    window.soundEngine.playVictory();
    window.confettiEngine.burst(100);

    // Update global state
    window.appState.addXP(stage.rewardData.xp);
    window.appState.addStars(stage.rewardData.stars);
    window.appState.completeLessonNode('island_1_node_1');

    const popupContainer = document.getElementById('reward-popup-container');
    if (popupContainer) {
      popupContainer.innerHTML = NSComponents.renderCelebrationPopup({
        title: "Hoàn Thành Xuất Sắc!",
        xp: stage.rewardData.xp,
        stars: stage.rewardData.stars,
        badgeName: stage.rewardData.badgeName,
        badgeIcon: stage.rewardData.badgeIcon,
        onContinue: "window.app.navigateTo('map')",
        onReplay: "window.lessonRunner.init('app-view-container', window.lessonZeroData)"
      });
    }
  }

  nextStage() {
    this.currentStageIndex++;
    if (this.currentStageIndex < this.lessonData.stages.length) {
      this.renderCurrentStage();
    }
  }
}

window.lessonRunner = new LessonRunner();
