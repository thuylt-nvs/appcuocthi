/* ==========================================================================
   NovaStars × NVS Championship — Demo Showcase Controller
   v0.1 Showcase Orchestrator & Vision Screen Map Manager
   (Product-Content Patched v0.1)
   ========================================================================== */

class DemoShowcaseController {
  constructor() {
    this.gradeKey = 'GRADE_5';
    this.accountTierKey = 'FREE';
    this.scenarioKey = 'BEFORE_EXAM';
    this.currentStepIndex = 0;
    this.showRationale = true;

    this.demoState = new DemoAppState(
      DemoScenarioState.createState(this.gradeKey, this.accountTierKey, this.scenarioKey)
    );

    // The 12-step guided Vision Map screens with internal feature classifications
    this.steps = [
      { id: 'demo_home', name: 'NovaStars Base', classification: 'LIVE_PRODUCT', isDefaultGuided: true },
      { id: 'demo_champ_home', name: 'Championship Home', classification: 'LIVE_SANDBOX', isDefaultGuided: true },
      { id: 'demo_exam_ready', name: 'Daily Practice Exam Ready', classification: 'LIVE_SANDBOX', isDefaultGuided: true },
      { id: 'demo_exam_question', name: 'Exam Question', classification: 'LIVE_SANDBOX', isDefaultGuided: true },
      { id: 'demo_practice_result', name: 'Practice Result', classification: 'LIVE_SANDBOX', isDefaultGuided: true },
      { id: 'demo_skill_boost', name: 'Skill Boost Feedback', classification: 'LIVE_SANDBOX', isDefaultGuided: true },
      { id: 'demo_skill_boost_complete', name: 'Skill Boost Complete', classification: 'LIVE_SANDBOX', isDefaultGuided: true },
      { id: 'concept_journey_timeline', name: 'Championship Journey', classification: 'CONCEPT_PREVIEW', isDefaultGuided: true },
      { id: 'concept_practice_progress', name: 'Practice Progress', classification: 'CONCEPT_PREVIEW', isDefaultGuided: true },
      { id: 'concept_competition_energy', name: 'Competition Energy Preview', classification: 'CONCEPT_PREVIEW', isDefaultGuided: true },
      { id: 'concept_premium_preview', name: 'Premium Explanation & Handoff', classification: 'CONCEPT_PREVIEW', isDefaultGuided: true },
      { id: 'concept_parent_progress', name: 'Parent Progress Dashboard', classification: 'CONCEPT_PREVIEW', isDefaultGuided: true },
      // Auxiliary jump-accessible screens
      { id: 'demo_map', name: 'World Map', classification: 'LIVE_PRODUCT', isDefaultGuided: false },
      { id: 'demo_lesson', name: 'Lesson Completion', classification: 'LIVE_PRODUCT', isDefaultGuided: false },
      { id: 'demo_mission', name: 'Daily Mission Progress', classification: 'LIVE_PRODUCT', isDefaultGuided: false },
      { id: 'concept_leaderboard', name: 'Leaderboard Full', classification: 'CONCEPT_PREVIEW', isDefaultGuided: false },
      { id: 'concept_challenges', name: 'Challenges Full', classification: 'CONCEPT_PREVIEW', isDefaultGuided: false }
    ];

    this.guidedStepIndices = this.steps
      .map((s, i) => s.isDefaultGuided ? i : null)
      .filter(i => i !== null);
  }

  init() {
    this.demoState.loadFromStorage();
    this.renderCurrentStep();
    window.demoController = this;
    console.log('🚀 [VisionDemo] Demo Showcase Controller initialized successfully.');
  }

  getCurrentStep() {
    return this.steps[this.currentStepIndex] || this.steps[0];
  }

  nextStep() {
    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
      this.renderCurrentStep();
    }
  }

  prevStep() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.renderCurrentStep();
    }
  }

  jumpToScreen(screenId) {
    const idx = this.steps.findIndex(s => s.id === screenId);
    if (idx !== -1) {
      this.currentStepIndex = idx;
      this.renderCurrentStep();
    }
  }

  switchGrade(gradeKey) {
    this.gradeKey = gradeKey;
    this.demoState.reset(this.gradeKey, this.accountTierKey, this.scenarioKey);
    this.renderCurrentStep();
  }

  switchAccountTier(tierKey) {
    this.accountTierKey = tierKey;
    this.demoState.reset(this.gradeKey, this.accountTierKey, this.scenarioKey);
    this.renderCurrentStep();
  }

  switchScenario(scenarioKey) {
    this.scenarioKey = scenarioKey;
    this.demoState.reset(this.gradeKey, this.accountTierKey, this.scenarioKey);
    this.renderCurrentStep();
  }

  resetDemo() {
    this.gradeKey = 'GRADE_5';
    this.accountTierKey = 'FREE';
    this.scenarioKey = 'BEFORE_EXAM';
    this.currentStepIndex = 0;
    this.demoState.reset(this.gradeKey, this.accountTierKey, this.scenarioKey);
    this.renderCurrentStep();
  }

  toggleRationale() {
    this.showRationale = !this.showRationale;
    this.renderPresenterPanel();
  }

  exportPilotResults() {
    try {
      let raw = null;
      if (typeof sessionStorage !== 'undefined') {
        raw = sessionStorage.getItem('novastars_student_pilot_v1');
      }
      const data = raw ? JSON.parse(raw) : { info: 'No active student pilot session recorded yet in sessionStorage["novastars_student_pilot_v1"]' };
      const jsonStr = JSON.stringify(data, null, 2);

      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nvs_student_pilot_telemetry_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      console.log('📥 [VisionDemo] Exported Student Pilot Telemetry JSON successfully.');
    } catch (e) {
      console.error('Could not export student pilot telemetry:', e);
      alert('Pilot telemetry export note: No student pilot session data found in current browser tab.');
    }
  }

  simulateExamCompletion() {
    this.switchScenario('AFTER_EXAM');
    this.jumpToScreen('demo_practice_result');
  }

  simulateBoostCompletion() {
    this.switchScenario('AFTER_SKILL_BOOST');
    this.jumpToScreen('demo_skill_boost_complete');
  }

  openParentHandoffModal() {
    const modalHTML = DemoPresenterPanel.renderParentHandoffModal();
    const container = document.getElementById('app-view-container');
    if (container) {
      const modalDiv = document.createElement('div');
      modalDiv.id = 'parent-modal-wrapper';
      modalDiv.innerHTML = modalHTML;
      container.appendChild(modalDiv);
    }
  }

  closeParentHandoffAndOpenParentProgress() {
    const wrapper = document.getElementById('parent-modal-wrapper');
    if (wrapper) wrapper.remove();
    this.jumpToScreen('concept_parent_progress');
  }

  renderPresenterPanel() {
    if (typeof document === 'undefined' || !document.body) return;
    let panelEl = document.getElementById('demo-presenter-panel-root');
    if (panelEl) panelEl.remove();

    if (typeof window !== 'undefined' && window.DEMO_SHOWCASE !== true) {
      return;
    }

    const panelHTML = DemoPresenterPanel.renderControlPanel({
      gradeKey: this.gradeKey,
      accountTierKey: this.accountTierKey,
      scenarioKey: this.scenarioKey,
      currentStepIndex: this.currentStepIndex,
      steps: this.steps,
      showRationale: this.showRationale
    });

    if (typeof document.body.insertAdjacentHTML === 'function') {
      document.body.insertAdjacentHTML('beforeend', panelHTML);
    } else if (typeof document.createElement === 'function') {
      const div = document.createElement('div');
      div.innerHTML = panelHTML;
      if (document.body.appendChild) document.body.appendChild(div);
    }
  }

  renderCurrentStep() {
    const step = this.getCurrentStep();
    const container = document.getElementById('app-view-container');
    if (!container) return;

    window.appState = this.demoState;
    window.DEMO_SHOWCASE = true;

    let html = '';

    switch (step.id) {
      case 'demo_home':
        html = Views.renderHome();
        break;

      case 'demo_champ_home':
        html = ChampionshipViews.renderHome();
        break;

      case 'demo_exam_ready':
        html = ChampionshipViews.renderExamReady();
        break;

      case 'demo_exam_question':
        window.examController = {
          currentAttempt: { currentQuestionIndex: 0, answers: {}, flaggedQuestionIds: [], rankEligible: true },
          activeQuestionPool: [
            { id: 'q_demo1', title: 'Bài thi luyện tập hằng ngày Khối 5', stem: 'Trong buổi làm việc nhóm, một bạn đưa ra ý tưởng mà em không đồng ý. Em nên phản hồi thế nào để vừa thể hiện quan điểm, vừa giữ cuộc trao đổi tích cực?', options: ['A. Ý của bạn dở tệ.', 'B. Tớ hiểu góc nhìn của bạn. Tớ có một ý khác, mình cùng so sánh hai cách nhé?', 'C. Im lặng bỏ ra chỗ khác.', 'D. Báo cô giáo phạt bạn.'], correctAnswer: 'B', indicatorId: 'IND_NL4_1' }
          ],
          getRemainingSeconds: () => 1200
        };
        html = ChampionshipViews.renderExamQuestion();
        break;

      case 'demo_practice_result':
        html = ChampionshipViews.renderExamResult();
        break;

      case 'demo_skill_boost':
        window.trainingController = {
          activeSession: { currentQuestionIndex: 0, competencyId: 'NL4', answers: {} },
          activeQuestions: [
            { id: 'sb_q1', title: 'Tình huống NL4', stem: 'Em muốn đề xuất ý tưởng giữ gìn vệ sinh lớp học với các bạn, em sẽ làm gì?', options: ['A. Ép buộc bạn làm', 'B. Trình bày rõ lý do & truyền cảm hứng cùng tham gia', 'C. Mặc kệ', 'D. Báo cô phạt bạn'], correctAnswer: 'B', explanationShort: 'Năng lực Giao tiếp, truyền cảm hứng và thuyết phục giúp tạo sự đồng thuận!' }
          ]
        };
        window.app = window.app || {};
        window.app.lastSkillBoostFeedback = {
          questionId: 'sb_q1', isCorrect: true, isAlreadyAnswered: false, correctAnswer: 'B', explanationShort: 'Năng lực Giao tiếp, truyền cảm hứng và thuyết phục giúp tạo sự đồng thuận!', xpGranted: 6
        };
        html = ChampionshipViews.renderSkillBoostQuestion();
        break;

      case 'demo_skill_boost_complete':
        html = ChampionshipViews.renderSkillBoostComplete();
        break;

      case 'concept_journey_timeline':
        html = DemoConceptViews.renderJourneyTimeline(this.demoState);
        break;

      case 'concept_practice_progress':
        html = DemoConceptViews.renderPracticeProgress(this.demoState);
        break;

      case 'concept_competition_energy':
        html = DemoConceptViews.renderCompetitionEnergyPreview(this.demoState);
        break;

      case 'concept_leaderboard':
        html = DemoConceptViews.renderLeaderboard(this.demoState);
        break;

      case 'concept_challenges':
        html = DemoConceptViews.renderChallenges();
        break;

      case 'concept_premium_preview':
        html = DemoConceptViews.renderDetailedExplanation(this.demoState);
        break;

      case 'concept_parent_progress':
        html = DemoConceptViews.renderParentProgress(this.demoState);
        break;

      case 'demo_map':
        html = Views.renderMap();
        break;

      case 'demo_lesson':
        html = `<div class="ns-view" data-view="demo_lesson" style="padding: 20px; text-align: center;"><h2>📖 Hoàn Thành Bài Học Dũng Cảm</h2><p>+20 Stars | +30 XP</p><button class="ns-btn ns-btn-primary" onclick="window.demoController.jumpToScreen('demo_champ_home')">Vào Đấu Trường NVS 🏆</button></div>`;
        break;

      case 'demo_mission':
        html = `<div class="ns-view" data-view="demo_mission" style="padding: 20px; text-align: center;"><h2>🎯 Nhiệm Vụ Ngày</h2><p>Tiến độ: 3/3 Nhiệm vụ hoàn thành!</p><button class="ns-btn ns-btn-primary" onclick="window.demoController.jumpToScreen('demo_champ_home')">Tiếp Tục 🚀</button></div>`;
        break;

      default:
        html = Views.renderHome();
    }

    container.innerHTML = html;
    this.renderPresenterPanel();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DemoShowcaseController };
} else if (typeof window !== 'undefined') {
  window.DemoShowcaseController = DemoShowcaseController;
}
