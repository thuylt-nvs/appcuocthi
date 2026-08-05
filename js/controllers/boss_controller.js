/* ==========================================================================
   NovaStars MVP — Boss Arena Sub-Controller (M1-405 Compliant)
   ========================================================================== */

class BossController {
  render(stage, currentSubIndex, bossHp) {
    const sc = stage.scenarios[currentSubIndex] || stage.scenarios[0];
    return NSCards.renderBossArena({
      bossName: stage.bossName,
      instruction: stage.instruction,
      scenario: sc,
      currentHp: bossHp,
      scenarioIndex: currentSubIndex,
      totalScenarios: stage.scenarios.length
    });
  }

  handleOption(stage, currentSubIndex, optIdx, runner, evt) {
    const sc = stage.scenarios[currentSubIndex];
    const opt = sc.options[optIdx];

    if (opt.correct) {
      window.soundEngine.playBossHit();
      if (window.particleEngine) window.particleEngine.spawnStarBurst(evt ? evt.clientX : null, evt ? evt.clientY : null, 16);

      // Screen shake animation
      const arena = document.getElementById('app-root');
      if (arena) {
        arena.classList.add('shake');
        setTimeout(() => arena.classList.remove('shake'), 400);
      }

      // M1-405 Evidence Logging
      window.appState.addSilentScore(25);
      window.appState.logEvidence('evidenceE04SkillTransfer');

      runner.bossHp = Math.max(0, runner.bossHp - 50);
      const nextSub = currentSubIndex + 1;
      const hasMoreScenarios = nextSub < stage.scenarios.length;

      runner.showModal({
        title: "Xử Lý Tuyệt Mật! 🐉",
        avatar: "👧",
        speaker: "Su",
        text: opt.feedback,
        isCorrect: true,
        actionType: hasMoreScenarios ? "boss_advance" : "next",
        nextSubIndex: nextSub
      });
    } else {
      window.soundEngine.playWrong();
      runner.showModal({
        title: "Bị Gián Đoạn Rồi! 💡",
        avatar: "🐉",
        speaker: "Thử Thách Công Viên",
        text: opt.feedback,
        isCorrect: false,
        actionType: "continue"
      });
    }
  }
}

window.bossController = new BossController();
