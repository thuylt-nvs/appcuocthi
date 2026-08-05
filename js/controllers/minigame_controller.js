/* ==========================================================================
   NovaStars MVP — Mini Game Sub-Controller (M1-405 Compliant)
   ========================================================================== */

class MinigameController {
  /* Drag & Drop Handler (Stage 3 - Evidence E-01 & E-03) */
  renderDrag(stage, selectedIdx) {
    return NSCards.renderDragAndDrop({
      instruction: stage ? stage.instruction : '',
      draggables: stage ? stage.draggables : [],
      targetZoneLabel: stage ? stage.targetZoneLabel : '',
      selectedIdx: selectedIdx
    });
  }

  processDragSelection(stage, idx, runner) {
    const item = stage.draggables[idx];

    if (item && item.isCorrect) {
      window.soundEngine.playStarChime();
      if (window.particleEngine) window.particleEngine.spawnStarBurst();

      // M1-405 Evidence Logging
      window.appState.addSilentScore(15);
      window.appState.logEvidence('evidenceE01WaveGesture');
      window.appState.logEvidence('evidenceE03SmileConsequence');

      runner.showModal({
        title: "Cử Chỉ Tuyệt Vời! ✨",
        avatar: "😊",
        speaker: "Sao Nova",
        text: `Đúng rồi! "${item.label}" là biểu hiện của sự chân thành và lịch sự!`,
        isCorrect: true,
        actionType: "next"
      });
    } else {
      window.soundEngine.playWrong();
      runner.showModal({
        title: "Cử Chỉ Chưa Phù Hợp! 💡",
        avatar: "🙈",
        speaker: "Sao Nova",
        text: "Nụ cười mỉm ấm áp mới là bí kíp chào hỏi đấy! Em thử lại nhé! 💡",
        isCorrect: false,
        actionType: "continue"
      });
    }
  }

  /* Matching Grid Handler (Stage 4 - Evidence E-02) */
  renderMatch(stage, matchState) {
    if (matchState.lefts.length === 0) {
      matchState.lefts = stage.pairs.map(p => ({ id: p.id, text: p.left, type: 'left' }));
      matchState.rights = [...stage.pairs].sort(() => Math.random() - 0.5).map(p => ({ id: p.id, text: p.right, type: 'right' }));
    }

    return NSCards.renderMatchingGrid({
      instruction: stage.instruction,
      pairs: stage.pairs,
      lefts: matchState.lefts,
      rights: matchState.rights
    });
  }

  handleMatchClick(type, id, matchState, runner, evt) {
    window.soundEngine.playTap();
    if (type === 'left') {
      if (matchState.left) {
        document.getElementById(`match-left-${matchState.left}`)?.classList.remove('active');
      }
      matchState.left = id;
      document.getElementById(`match-left-${id}`)?.classList.add('active');
    } else {
      if (matchState.right) {
        document.getElementById(`match-right-${matchState.right}`)?.classList.remove('active');
      }
      matchState.right = id;
      document.getElementById(`match-right-${id}`)?.classList.add('active');
    }

    if (matchState.left && matchState.right) {
      if (matchState.left === matchState.right) {
        window.soundEngine.playCorrect();
        if (window.particleEngine) window.particleEngine.spawnStarBurst(evt ? evt.clientX : null, evt ? evt.clientY : null);
        if (runner && runner.container) {
          runner.container.classList.add('shake');
          setTimeout(() => runner.container.classList.remove('shake'), 350);
        }

        document.getElementById(`match-left-${matchState.left}`)?.classList.add('matched');
        document.getElementById(`match-right-${matchState.right}`)?.classList.add('matched');
        matchState.matchedCount++;
        matchState.left = null;
        matchState.right = null;

        if (matchState.matchedCount >= 3) {
          // M1-405 Evidence Logging
          window.appState.addSilentScore(15);
          window.appState.logEvidence('evidenceE02SocialTiming');

          setTimeout(() => {
            runner.showModal({
              title: "Ghép Đôi Hoàn Hảo! 🏅",
              avatar: "🌟",
              speaker: "Sao Nova",
              text: "Em đã thuộc lòng tất cả câu chào hỏi lịch sự cho từng hoàn cảnh!",
              isCorrect: true,
              actionType: "next"
            });
          }, 300);
        }
      } else {
        window.soundEngine.playWrong();
        setTimeout(() => {
          document.getElementById(`match-left-${matchState.left}`)?.classList.remove('active');
          document.getElementById(`match-right-${matchState.right}`)?.classList.remove('active');
          matchState.left = null;
          matchState.right = null;
        }, 400);
      }
    }
  }

  /* Sequence Builder Handler (Stage 5) */
  renderSequence(stage, sequenceState, selectedSeqIdx) {
    if (Array.isArray(sequenceState) && sequenceState.length === 0 && stage && Array.isArray(stage.steps)) {
      sequenceState.push(...stage.steps);
    }

    return NSCards.renderSequenceBuilder({
      instruction: stage.instruction,
      steps: sequenceState,
      selectedSeqIdx: selectedSeqIdx
    }) + `
      <button class="ns-btn ns-btn-green" style="margin-top: 16px; width: 100%;" onclick="window.lessonRunner.checkSequence()">
        <span>Xác Nhận Thứ Tự 3 Bước 🚀</span>
      </button>
    `;
  }
}

window.minigameController = new MinigameController();
