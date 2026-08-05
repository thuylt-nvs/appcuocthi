/* ==========================================================================
   NovaStars MVP — Story Sub-Controller
   ========================================================================== */

class StoryController {
  render(stage, currentEmotion = 'happy') {
    const d = stage.dialogues[0];
    return NSCards.renderStoryBubble({
      characterName: d.speaker,
      avatar: d.avatar,
      text: d.text,
      decision: stage.decision,
      emotion: currentEmotion
    });
  }

  handleDecision(stage, choiceIdx, runner) {
    const choice = stage.decision.choices[choiceIdx];

    if (choice.correct) {
      window.soundEngine.playCorrect();
      if (window.particleEngine) window.particleEngine.spawnStarBurst();
      runner.showModal({
        title: "Quyết Định Dũng Cảm! 🌟",
        avatar: "👧",
        speaker: "Su",
        text: choice.feedback,
        isCorrect: true,
        actionType: "next"
      });
    } else {
      window.soundEngine.playWrong();
      runner.showModal({
        title: "Hãy Thử Lại Nhé! 💡",
        avatar: "🌟",
        speaker: "Sao Nova",
        text: choice.feedback,
        isCorrect: false,
        actionType: "continue"
      });
    }
  }
}

window.storyController = new StoryController();
