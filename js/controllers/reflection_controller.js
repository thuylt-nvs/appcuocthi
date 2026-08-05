/* ==========================================================================
   NovaStars MVP — Reflection & Real-Life Challenge Sub-Controller (M1-405)
   ========================================================================== */

class ReflectionController {
  renderReflection(stage) {
    return NSCards.renderReflectionCard({
      question: stage.question,
      options: stage.options,
      onSelect: "window.lessonRunner.handleReflectionSelect"
    });
  }

  handleReflectionSelect(idx, runner, evt) {
    window.soundEngine.playCorrect();
    if (window.particleEngine) window.particleEngine.spawnStarBurst(evt ? evt.clientX : null, evt ? evt.clientY : null);

    // M1-405 Evidence Logging
    window.appState.addSilentScore(15);
    window.appState.logEvidence('evidenceE05MeaningMaking');

    runner.showModal({
      title: "Trái Tim Ngôi Sao! ❤️",
      avatar: "🌟",
      speaker: "Sao Nova",
      text: "Cảm ơn suy nghĩ ấm áp của em. Nụ cười của em sẽ mang lại niềm vui cho tất cả mọi người!",
      isCorrect: true,
      actionType: "next"
    });
  }

  renderChallenge(stage) {
    return NSCards.renderChallengeCard({
      title: stage.title,
      missionText: stage.missionText,
      guideText: stage.guideText,
      onComplete: "window.lessonRunner.nextStage"
    });
  }

  renderParent(stage) {
    return NSModals.renderParentConfirmModal({
      parentPrompt: stage.parentPrompt,
      onConfirm: "window.lessonRunner.handleParentConfirm()"
    });
  }

  handleParentConfirm(runner) {
    window.soundEngine.playVictory();
    if (window.particleEngine) window.particleEngine.spawnStarBurst(null, null, 20);

    // M1-405 Evidence Logging
    window.appState.addSilentScore(20);
    window.appState.logEvidence('evidenceE06ParentVerification');

    runner.showModal({
      title: "Bằng Chứng Đã Xác Nhận! 📜",
      avatar: "👨‍👩‍👧",
      speaker: "Bố Mẹ Su",
      text: "Bố mẹ rất tự hào về nụ cười và lời chào tự tin của em ngoài đời thực!",
      isCorrect: true,
      actionType: "next"
    });
  }
}

window.reflectionController = new ReflectionController();
