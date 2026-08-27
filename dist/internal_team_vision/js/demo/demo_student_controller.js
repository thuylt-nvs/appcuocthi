/* ==========================================================================
   NovaStars × NVS Championship — Demo Student Controller
   v0.2.3B Student Alpha Orchestrator & Centralized Telemetry Navigation
   ========================================================================== */

class DemoStudentController {
  constructor() {
    this.storageKey = 'novastars_student_pilot_v1';
    this.currentStepIndex = 0; // 0: Welcome, 1: Home, 2: Champ Home, 3: Exam, 4: Result, 5: Boost, 6: Reward, 7: Journey, 8: Feedback, 9: Thank You
    this.currentExamIdx = 0;
    this.currentBoostIdx = 0;
    this.telemetryRepo = typeof PilotTelemetryRepository !== 'undefined' ? new PilotTelemetryRepository() : null;

    this.headerClickCount = 0;
    this.lastHeaderClickTime = 0;
    this.toastTimeout = null;
    this._headerListenerAttached = false;

    // Anonymous Session State (Zero PII, State Persisted & Restored)
    this.pilotState = {
      sessionId: 'pilot_' + Math.random().toString(36).substring(2, 9),
      ageGroup: 'GRADE_4_5',
      godMode: false,
      currentStepIndex: 0,
      currentExamIdx: 0,
      currentBoostIdx: 0,
      xp: 0,
      stars: 0,
      streak: 1,
      examAnswers: {},
      examScore: null,
      boostAnswers: {},
      boostCorrectCount: 0,
      boostXpEarned: 0,
      boostCompleted: false,
      boostFeedbackQuestionId: null,
      boostFeedbackIsCorrect: null,
      feedback: { q1: null, q2: null, q3: null, suggestion: '' },
      loggedEvents: {}
    };

    // Public Pilot Fixtures (Separate Pools for G1-3 vs G4-5)
    this.examQuestions = {
      GRADE_1_3: typeof PILOT_EXAM_G13 !== 'undefined' ? PILOT_EXAM_G13 : [],
      GRADE_4_5: typeof PILOT_EXAM_G45 !== 'undefined' ? PILOT_EXAM_G45 : []
    };

    this.boostQuestions = {
      GRADE_1_3: typeof PILOT_SKILL_BOOST_G13 !== 'undefined' ? PILOT_SKILL_BOOST_G13 : [],
      GRADE_4_5: typeof PILOT_SKILL_BOOST_G45 !== 'undefined' ? PILOT_SKILL_BOOST_G45 : []
    };

    this.shuffledCache = {};
  }

  /**
   * Deterministically shuffle options using seed string (sessionId + itemId)
   */
  getShuffledOptions(item) {
    const itemId = item.itemId || item.id;
    const cacheKey = `${this.pilotState.sessionId}_${itemId}`;
    if (this.shuffledCache[cacheKey]) {
      return this.shuffledCache[cacheKey];
    }

    const opts = (item.options || []).map((o, idx) => {
      if (typeof o === 'string') {
        const id = `opt_${String.fromCharCode(97 + idx)}`;
        return { id, text: o };
      }
      return o;
    });

    let hash = 0;
    for (let i = 0; i < cacheKey.length; i++) {
      hash = ((hash << 5) - hash) + cacheKey.charCodeAt(i);
      hash |= 0;
    }
    const seed = Math.abs(hash);

    const arr = [...opts];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = (seed + i * 37) % (i + 1);
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    this.shuffledCache[cacheKey] = arr;
    return arr;
  }

  assertPilotItemSafety(item) {
    if (!item) return;
    const allowed = ['DEMO_PILOT_ONLY', 'READY_FOR_PILOT'];
    const status = item.contentStatus || item.status;
    if (!allowed.includes(status)) {
      throw new Error(`PILOT_ITEM_SAFETY_VIOLATION: Item ${item.itemId || item.id} has unapproved status '${status}'. SECURE_ACTIVE items are forbidden in Student Mode.`);
    }
  }

  init() {
    this.loadFromStorage();
    window.studentController = this;
    window.DEMO_SHOWCASE = false;

    // Attach Global Header Click Listener for 5-click God Mode activation
    if (typeof document !== 'undefined' && !this._headerListenerAttached) {
      this._headerListenerAttached = true;
      document.addEventListener('click', (e) => {
        const target = e.target;
        const headerEl = target.closest('header, .ns-app-header, .ns-exam-header, [data-god-header="true"], .ns-header-title, [data-view="student_welcome"] h1, [data-view="student_thank_you"] h2');
        if (headerEl) {
          if (!target.closest('button, a, input, select')) {
            this.handleHeaderClick();
          }
        }
      });
    }

    this.renderCurrentStep();
    console.log('🚀 [StudentPilot] Student Controller initialized successfully.');
  }

  loadFromStorage() {
    try {
      if (typeof sessionStorage !== 'undefined') {
        const raw = sessionStorage.getItem(this.storageKey);
        if (raw) {
          const parsed = JSON.parse(raw);
          this.pilotState = { ...this.pilotState, ...parsed };
          this.currentStepIndex = this.pilotState.currentStepIndex ?? 0;
          this.currentExamIdx = this.pilotState.currentExamIdx ?? 0;
          this.currentBoostIdx = this.pilotState.currentBoostIdx ?? 0;
        }
      }
    } catch (e) {
      console.warn('Could not read student pilot storage:', e);
    }
  }

  saveToStorage() {
    try {
      if (typeof sessionStorage !== 'undefined') {
        this.pilotState.currentStepIndex = this.currentStepIndex;
        this.pilotState.currentExamIdx = this.currentExamIdx;
        this.pilotState.currentBoostIdx = this.currentBoostIdx;
        sessionStorage.setItem(this.storageKey, JSON.stringify(this.pilotState));
      }
    } catch (e) {
      console.warn('Could not write student pilot storage:', e);
    }
  }

  /**
   * Log business event exactly once per session key
   */
  logOnce(eventKey, eventName, payload = {}) {
    if (!this.pilotState.loggedEvents) {
      this.pilotState.loggedEvents = {};
    }
    if (this.pilotState.loggedEvents[eventKey]) {
      return;
    }
    this.pilotState.loggedEvents[eventKey] = true;

    const evt = {
      eventId: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'evt_' + Math.random().toString(36).substring(2, 9),
      event: eventName,
      sessionId: this.pilotState.sessionId,
      ageGroup: this.pilotState.ageGroup,
      timestamp: new Date().toISOString(),
      ...payload
    };

    if (this.telemetryRepo) {
      this.telemetryRepo.logEvent(evt);
    }
    this.saveToStorage();
  }

  /**
   * Log screen_viewed event with a FRESH eventId on every screen entry (supports revisits/back navigation)
   */
  logScreenView(screenName, stepIndex) {
    const evt = {
      eventId: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'evt_' + Math.random().toString(36).substring(2, 9),
      event: 'screen_viewed',
      sessionId: this.pilotState.sessionId,
      ageGroup: this.pilotState.ageGroup,
      timestamp: new Date().toISOString(),
      screenName,
      stepIndex
    };

    if (this.telemetryRepo) {
      this.telemetryRepo.logEvent(evt);
    }
    this.saveToStorage();
  }

  /**
   * Centralized Screen Navigation Pipeline (v0.2.3B)
   */
  goToStep(stepIndex) {
    if (stepIndex < 0 || stepIndex > 9) return;
    this.currentStepIndex = stepIndex;

    const stepNames = ['welcome', 'home', 'champ_home', 'exam_question', 'practice_result', 'skill_boost', 'reward', 'journey', 'feedback', 'thank_you'];
    const screenName = stepNames[this.currentStepIndex] || 'unknown';

    // Emit fresh screen_viewed event for every entry/revisit
    this.logScreenView(screenName, this.currentStepIndex);

    // Emit relevant exactly-once business lifecycle events
    if (this.currentStepIndex === 2) {
      this.logOnce('championship_opened', 'championship_opened');
    } else if (this.currentStepIndex === 3) {
      this.logOnce('short_exam_started', 'short_exam_started');
    } else if (this.currentStepIndex === 4) {
      this.logOnce('practice_result_seen', 'practice_result_seen');
    } else if (this.currentStepIndex === 5) {
      this.logOnce('skill_boost_started', 'skill_boost_started');
    } else if (this.currentStepIndex === 7) {
      this.logOnce('journey_seen', 'journey_seen');
    }

    this.saveToStorage();
    this.renderCurrentStep();
  }

  startPilot(ageGroupKey) {
    this.pilotState.ageGroup = ageGroupKey;
    this.currentExamIdx = 0;
    this.currentBoostIdx = 0;
    this.pilotState.currentExamIdx = 0;
    this.pilotState.currentBoostIdx = 0;
    this.pilotState.examAnswers = {};
    this.pilotState.examScore = null;
    this.pilotState.boostAnswers = {};
    this.pilotState.boostCorrectCount = 0;
    this.pilotState.boostXpEarned = 0;
    this.pilotState.boostCompleted = false;
    this.pilotState.boostFeedbackQuestionId = null;
    this.pilotState.boostFeedbackIsCorrect = null;
    this.pilotState.feedback = { q1: null, q2: null, q3: null, suggestion: '' };

    this.logOnce('pilot_started', 'pilot_started', { ageGroupKey });
    this.goToStep(1); // S1 Home
  }

  nextStep() {
    if (this.currentStepIndex < 9) {
      this.goToStep(this.currentStepIndex + 1);
    }
  }

  prevStep() {
    if (this.currentStepIndex > 1) {
      this.goToStep(this.currentStepIndex - 1);
    }
  }

  answerExamQuestion(questionId, optionId) {
    const pool = this.examQuestions[this.pilotState.ageGroup] || this.examQuestions.GRADE_4_5;
    const curQ = pool[this.currentExamIdx] || pool[0];
    if (!curQ) return;
    this.assertPilotItemSafety(curQ);

    const curId = curQ.itemId || curQ.id;
    if (questionId !== curId) {
      throw new Error(`QUESTION_STATE_MISMATCH: Passed questionId '${questionId}' does not match currentQuestion '${curId}'`);
    }

    this.pilotState.examAnswers[curId] = optionId;

    if (this.currentExamIdx < pool.length - 1) {
      this.currentExamIdx++;
      this.pilotState.currentExamIdx = this.currentExamIdx;
      this.saveToStorage();
      this.renderCurrentStep();
    } else {
      // Complete Short Exam
      let correct = 0;
      pool.forEach(item => {
        this.assertPilotItemSafety(item);
        const qId = item.itemId || item.id;
        const correctOpt = item.correctOptionId || 'opt_a';
        if (this.pilotState.examAnswers[qId] === correctOpt || this.pilotState.examAnswers[qId] === item.correctAnswer) {
          correct++;
        }
      });
      this.pilotState.examScore = {
        score: Math.round((correct / pool.length) * 100),
        correctCount: correct,
        totalCount: pool.length
      };
      this.logOnce('short_exam_completed', 'short_exam_completed', this.pilotState.examScore);
      this.goToStep(4); // S4 Practice Result
    }
  }

  answerBoostQuestion(questionId, optionId) {
    const pool = this.boostQuestions[this.pilotState.ageGroup] || this.boostQuestions.GRADE_4_5;
    const q = pool[this.currentBoostIdx];
    if (!q) return;
    this.assertPilotItemSafety(q);

    const curId = q.itemId || q.id;
    if (questionId !== curId) {
      throw new Error(`QUESTION_STATE_MISMATCH: Passed questionId '${questionId}' does not match currentQuestion '${curId}'`);
    }

    const correctOpt = q.correctOptionId || 'opt_a';
    const isCorrect = (optionId === correctOpt || optionId === q.correctAnswer);

    this.pilotState.boostAnswers[curId] = optionId;
    this.pilotState.boostFeedbackQuestionId = curId;
    this.pilotState.boostFeedbackIsCorrect = isCorrect;

    this.saveToStorage();
    this.renderCurrentStep();
  }

  advanceBoostQuestion() {
    const pool = this.boostQuestions[this.pilotState.ageGroup] || this.boostQuestions.GRADE_4_5;
    this.pilotState.boostFeedbackQuestionId = null;
    this.pilotState.boostFeedbackIsCorrect = null;

    if (this.currentBoostIdx < pool.length - 1) {
      this.currentBoostIdx++;
      this.pilotState.currentBoostIdx = this.currentBoostIdx;
      this.saveToStorage();
      this.renderCurrentStep();
    } else {
      // Skill Boost Complete
      if (!this.pilotState.boostCompleted) {
        let correctCount = 0;
        pool.forEach(item => {
          this.assertPilotItemSafety(item);
          const qId = item.itemId || item.id;
          const correctOpt = item.correctOptionId || 'opt_a';
          if (this.pilotState.boostAnswers[qId] === correctOpt || this.pilotState.boostAnswers[qId] === item.correctAnswer) {
            correctCount++;
          }
        });

        const earnedXP = correctCount * 6; // 0, 6, 12, or 18 XP
        this.pilotState.boostCorrectCount = correctCount;
        this.pilotState.boostXpEarned = earnedXP;
        this.pilotState.xp = (this.pilotState.xp ?? 0) + earnedXP;
        this.pilotState.stars = (this.pilotState.stars ?? 0) + 10;
        this.pilotState.boostCompleted = true;

        this.logOnce('skill_boost_completed', 'skill_boost_completed', { correctCount, xpEarned: earnedXP, starsEarned: 10 });
      }

      this.goToStep(6); // S6 Reward
    }
  }

  /**
   * Header Click Trigger for God Mode (5 clicks in 2.5s)
   */
  handleHeaderClick() {
    const now = Date.now();
    if (now - this.lastHeaderClickTime > 2500) {
      this.headerClickCount = 1;
    } else {
      this.headerClickCount++;
    }
    this.lastHeaderClickTime = now;

    if (this.headerClickCount >= 2 && this.headerClickCount < 5) {
      this.showToast(`⚡ ${this.headerClickCount}/5 click header để kích hoạt God Mode...`, 800);
    }

    if (this.headerClickCount >= 5) {
      this.headerClickCount = 0;
      this.toggleGodMode();
    }
  }

  toggleGodMode() {
    this.setGodMode(!this.pilotState.godMode);
  }

  setGodMode(enabled) {
    this.pilotState.godMode = !!enabled;
    if (this.pilotState.godMode) {
      if ((this.pilotState.xp || 0) < 999) this.pilotState.xp = 9999;
      if ((this.pilotState.stars || 0) < 999) this.pilotState.stars = 9999;
      this.pilotState.streak = Math.max(this.pilotState.streak || 1, 99);
      
      this.showToast('👑 GOD MODE ACTIVATED! Mở khóa tất cả bài & tính năng!', 3500);
      
      if (typeof ConfettiManager !== 'undefined' && ConfettiManager.triggerFullCelebration) {
        ConfettiManager.triggerFullCelebration();
      }
    } else {
      this.showToast('ℹ️ Đã tắt God Mode', 2000);
    }
    this.saveToStorage();
    this.renderCurrentStep();
  }

  showToast(msg, duration = 3000) {
    if (typeof document === 'undefined') return;
    let toast = document.getElementById('ns-godmode-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'ns-godmode-toast';
      toast.className = 'ns-godmode-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>👑</span> <span>${msg}</span>`;
    toast.classList.add('active');

    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      if (toast) toast.classList.remove('active');
    }, duration);
  }

  jumpToStep(stepIdx) {
    this.goToStep(stepIdx);
  }

  jumpToExamQuestion(idx) {
    const pool = this.examQuestions[this.pilotState.ageGroup] || this.examQuestions.GRADE_4_5;
    if (idx >= 0 && idx < pool.length) {
      this.currentExamIdx = idx;
      this.pilotState.currentExamIdx = idx;
      this.saveToStorage();
      this.goToStep(3);
    }
  }

  jumpToBoostQuestion(idx) {
    const pool = this.boostQuestions[this.pilotState.ageGroup] || this.boostQuestions.GRADE_4_5;
    if (idx >= 0 && idx < pool.length) {
      this.currentBoostIdx = idx;
      this.pilotState.currentBoostIdx = idx;
      this.pilotState.boostFeedbackQuestionId = null;
      this.pilotState.boostFeedbackIsCorrect = null;
      this.saveToStorage();
      this.goToStep(5);
    }
  }

  setGodModeAgeGroup(ageKey) {
    this.pilotState.ageGroup = ageKey;
    this.currentExamIdx = 0;
    this.currentBoostIdx = 0;
    this.pilotState.currentExamIdx = 0;
    this.pilotState.currentBoostIdx = 0;
    this.saveToStorage();
    this.showToast(`🎯 Đã đổi sang ${ageKey === 'GRADE_1_3' ? 'Khối 1–3' : 'Khối 4–5'}`, 2000);
    this.renderCurrentStep();
  }

  autoSolveExam() {
    const pool = this.examQuestions[this.pilotState.ageGroup] || this.examQuestions.GRADE_4_5;
    pool.forEach(item => {
      const qId = item.itemId || item.id;
      const correctOpt = item.correctOptionId || 'opt_a';
      this.pilotState.examAnswers[qId] = correctOpt;
    });
    this.pilotState.examScore = {
      score: 100,
      correctCount: pool.length,
      totalCount: pool.length
    };
    this.showToast('✨ Auto-Solve: Hoàn thành 100/100 Điểm!', 2500);
    this.goToStep(4); // S4 Practice Result
  }

  autoSolveBoost() {
    const pool = this.boostQuestions[this.pilotState.ageGroup] || this.boostQuestions.GRADE_4_5;
    pool.forEach(item => {
      const qId = item.itemId || item.id;
      const correctOpt = item.correctOptionId || 'opt_a';
      this.pilotState.boostAnswers[qId] = correctOpt;
    });
    const earnedXP = pool.length * 6;
    this.pilotState.boostCorrectCount = pool.length;
    this.pilotState.boostXpEarned = earnedXP;
    this.pilotState.xp = (this.pilotState.xp ?? 0) + earnedXP;
    this.pilotState.stars = (this.pilotState.stars ?? 0) + 10;
    this.pilotState.boostCompleted = true;
    this.showToast(`✨ Auto-Boost: Nhận trọn vẹn +${earnedXP} XP & 10 Stars!`, 2500);
    this.goToStep(6); // S6 Reward
  }

  autoFillFeedback() {
    this.pilotState.feedback = {
      q1: 5,
      q2: 'Bài thi',
      q3: 'Có!',
      suggestion: 'Trải nghiệm tuyệt vời! God Mode mở khóa toàn bộ tính năng.'
    };
    this.saveToStorage();
    this.showToast('✍️ Đã tự động điền đánh giá 5 sao!', 2000);
    this.renderCurrentStep();
  }

  setFeedbackRating(val) {
    this.pilotState.feedback.q1 = val;
    this.saveToStorage();
    this.renderCurrentStep();
  }

  setFavoritePart(partStr) {
    this.pilotState.feedback.q2 = partStr;
    this.saveToStorage();
    this.renderCurrentStep();
  }

  setReturnIntent(intentStr) {
    this.pilotState.feedback.q3 = intentStr;
    this.saveToStorage();
    this.renderCurrentStep();
  }

  setSuggestion(textStr) {
    this.pilotState.feedback.suggestion = (textStr || '').substring(0, 200);
    this.saveToStorage();
  }

  submitFeedback() {
    const fb = this.pilotState.feedback;
    if (!this.pilotState.godMode && (fb.q1 === null || fb.q2 === null || fb.q3 === null)) {
      return; // Block submission until Q1, Q2, and Q3 are answered (unless in God Mode)
    }

    this.logOnce('feedback_submitted', 'feedback_submitted', this.pilotState.feedback);
    this.logOnce('pilot_completed', 'pilot_completed', { sessionId: this.pilotState.sessionId });
    this.goToStep(9); // S9 Thank You
  }

  restartPilot() {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem(this.storageKey);
    }
    const currentGodMode = this.pilotState.godMode;
    this.pilotState = {
      sessionId: 'pilot_' + Math.random().toString(36).substring(2, 9),
      ageGroup: 'GRADE_4_5',
      godMode: currentGodMode,
      currentStepIndex: 0,
      currentExamIdx: 0,
      currentBoostIdx: 0,
      xp: currentGodMode ? 9999 : 0,
      stars: currentGodMode ? 9999 : 0,
      streak: currentGodMode ? 99 : 1,
      examAnswers: {},
      examScore: null,
      boostAnswers: {},
      boostCorrectCount: 0,
      boostXpEarned: 0,
      boostCompleted: false,
      boostFeedbackQuestionId: null,
      boostFeedbackIsCorrect: null,
      feedback: { q1: null, q2: null, q3: null, suggestion: '' },
      loggedEvents: {}
    };
    this.currentStepIndex = 0;
    this.currentExamIdx = 0;
    this.currentBoostIdx = 0;
    this.renderCurrentStep();
  }

  /**
   * Telemetry-Free Renderer with God Mode Dock
   */
  renderCurrentStep() {
    const container = document.getElementById('app-view-container');
    if (!container) return;

    window.DEMO_SHOWCASE = false;
    let html = '';

    switch (this.currentStepIndex) {
      case 0:
        html = DemoStudentViews.renderWelcome(this.pilotState);
        break;
      case 1:
        html = DemoStudentViews.renderHome(this.pilotState);
        break;
      case 2:
        html = DemoStudentViews.renderChampionshipHome(this.pilotState);
        break;
      case 3:
        const pool = this.examQuestions[this.pilotState.ageGroup] || this.examQuestions.GRADE_4_5;
        const curQ = pool[this.currentExamIdx] || pool[0];
        this.assertPilotItemSafety(curQ);
        const shuffledOpts = this.getShuffledOptions(curQ);
        html = DemoStudentViews.renderExamQuestion(curQ, this.currentExamIdx, pool.length, shuffledOpts, this.pilotState);
        break;
      case 4:
        html = DemoStudentViews.renderPracticeResult(this.pilotState.examScore || { score: 80, correctCount: 4, totalCount: 5 }, this.pilotState);
        break;
      case 5:
        const bPool = this.boostQuestions[this.pilotState.ageGroup] || this.boostQuestions.GRADE_4_5;
        const boostQ = bPool[this.currentBoostIdx] || bPool[0];
        this.assertPilotItemSafety(boostQ);
        const shuffledBoostOpts = this.getShuffledOptions(boostQ);

        let fbState = null;
        if (this.pilotState.boostFeedbackQuestionId === (boostQ.itemId || boostQ.id)) {
          fbState = { isCorrect: this.pilotState.boostFeedbackIsCorrect };
        }

        html = DemoStudentViews.renderSkillBoostQuestion(boostQ, this.currentBoostIdx, bPool.length, fbState, shuffledBoostOpts, this.pilotState);
        break;
      case 6:
        html = DemoStudentViews.renderRewardMoment(this.pilotState);
        break;
      case 7:
        html = DemoStudentViews.renderStudentJourney(this.pilotState);
        break;
      case 8:
        html = DemoStudentViews.renderStudentFeedback(this.pilotState.feedback, this.pilotState);
        break;
      case 9:
        html = DemoStudentViews.renderThankYou(this.pilotState);
        break;
      default:
        html = DemoStudentViews.renderWelcome(this.pilotState);
    }

    if (this.pilotState.godMode && typeof DemoStudentViews.renderGodModeDock === 'function') {
      html += DemoStudentViews.renderGodModeDock(this.pilotState, this.currentStepIndex, this.currentExamIdx, this.currentBoostIdx);
    }

    container.innerHTML = html;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DemoStudentController };
} else if (typeof window !== 'undefined') {
  window.DemoStudentController = DemoStudentController;
}
