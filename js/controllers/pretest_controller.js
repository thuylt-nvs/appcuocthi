/* ==========================================================================
   NovaStars MVP — Pretest Sub-Controller
   ========================================================================== */

class PretestController {
  render(stage, currentSubIndex) {
    const questions = stage.questions || [stage];
    const q = questions[currentSubIndex] || questions[0];
    const totalQ = questions.length;
    return `
      <div style="margin-bottom: 8px; font-weight: 800; font-size: 0.85rem; color: var(--text-muted);">
        Câu hỏi ${currentSubIndex + 1} / ${totalQ}
      </div>
      ${NSCards.renderChoiceButtons({
        question: q.question,
        options: q.options,
        onSelect: "window.lessonRunner.handlePretestAnswer"
      })}
    `;
  }

  handleAnswer(stage, currentSubIndex, optionIdx, runner) {
    const q = stage.questions[currentSubIndex];
    const isCorrect = (optionIdx === q.answer);

    if (isCorrect) {
      window.soundEngine.playCorrect();
      if (window.particleEngine) window.particleEngine.spawnStarBurst();
    } else {
      window.soundEngine.playWrong();
    }

    const nextSub = currentSubIndex + 1;
    const hasMoreQuestions = nextSub < stage.questions.length;

    runner.showModal({
      title: isCorrect ? "Đáp Án Chính Xác! 🌟" : "Thử Lại Nhé! 💡",
      avatar: isCorrect ? "🌟" : "👧",
      speaker: "Sao Nova",
      text: q.explanation,
      isCorrect: isCorrect,
      actionType: hasMoreQuestions ? "pretest_advance" : "next",
      nextSubIndex: nextSub
    });
  }
}

window.pretestController = new PretestController();
