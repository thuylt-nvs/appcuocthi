/* ==========================================================================
   NovaStars × NVS Championship — Demo Student Controller
   v0.2.3 Student Alpha Orchestrator & Shuffled Options Manager
   ========================================================================== */

class DemoStudentController {
  constructor() {
    this.storageKey = 'novastars_student_pilot_v1';
    this.currentStepIndex = 0; // 0: Welcome, 1: Home, 2: Champ Home, 3: Exam, 4: Result, 5: Boost, 6: Reward, 7: Journey, 8: Feedback, 9: Thank You
    this.currentExamIdx = 0;
    this.currentBoostIdx = 0;
    this.telemetryRepo = typeof PilotTelemetryRepository !== 'undefined' ? new PilotTelemetryRepository() : null;

    // Anonymous Session State (Zero PII, State Persisted & Restored)
    this.pilotState = {
      sessionId: 'pilot_' + Math.random().toString(36).substring(2, 9),
      ageGroup: 'GRADE_4_5',
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

    // Simple deterministic PRNG hash seed
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
    this.currentStepIndex = 1; // S1 Home
    this.saveToStorage();
    this.renderCurrentStep();
  }

  nextStep() {
    if (this.currentStepIndex < 9) {
      this.currentStepIndex++;
      this.handleStepTransition();
      this.saveToStorage();
      this.renderCurrentStep();
    }
  }

  prevStep() {
    if (this.currentStepIndex > 1) {
      this.currentStepIndex--;
      this.handleStepTransition();
      this.saveToStorage();
      this.renderCurrentStep();
    }
  }

  handleStepTransition() {
    const stepNames = ['welcome', 'home', 'champ_home', 'exam_question', 'practice_result', 'skill_boost', 'reward', 'journey', 'feedback', 'thank_you'];
    const screenName = stepNames[this.currentStepIndex] || 'unknown';
    this.logOnce(`screen_${this.currentStepIndex}`, 'screen_viewed', { screenName, stepIndex: this.currentStepIndex });

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
      this.currentStepIndex = 4; // S4 Practice Result
      this.saveToStorage();
      this.renderCurrentStep();
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
      // Skill Boost Complete: Idempotent Reward Calculation from final saved answers
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

        const earnedXP = correctCount * 6; // Max 18 XP
        this.pilotState.boostCorrectCount = correctCount;
        this.pilotState.boostXpEarned = earnedXP;
        this.pilotState.xp = (this.pilotState.xp ?? 0) + earnedXP;
        this.pilotState.stars = (this.pilotState.stars ?? 0) + 10;
        this.pilotState.boostCompleted = true;

        this.logOnce('skill_boost_completed', 'skill_boost_completed', { correctCount, xpEarned: earnedXP, starsEarned: 10 });
      }

      this.currentStepIndex = 6; // S6 Reward
      this.saveToStorage();
      this.renderCurrentStep();
    }
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
    // HTML Escape untrusted free text input
    const cleanStr = (textStr || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    this.pilotState.feedback.suggestion = cleanStr.substring(0, 200);
    this.saveToStorage();
  }

  submitFeedback() {
    const fb = this.pilotState.feedback;
    if (fb.q1 === null || fb.q2 === null || fb.q3 === null) {
      return; // Block submission until Q1, Q2, and Q3 are answered
    }

    this.logOnce('feedback_submitted', 'feedback_submitted', this.pilotState.feedback);
    this.logOnce('pilot_completed', 'pilot_completed', { sessionId: this.pilotState.sessionId });
    this.currentStepIndex = 9; // S9 Thank You
    this.saveToStorage();
    this.renderCurrentStep();
  }

  restartPilot() {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem(this.storageKey);
    }
    this.pilotState = {
      sessionId: 'pilot_' + Math.random().toString(36).substring(2, 9),
      ageGroup: 'GRADE_4_5',
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
    this.currentStepIndex = 0;
    this.currentExamIdx = 0;
    this.currentBoostIdx = 0;
    this.renderCurrentStep();
  }

  renderCurrentStep() {
    const container = document.getElementById('app-view-container');
    if (!container) return;

    window.DEMO_SHOWCASE = false;
    let html = '';

    switch (this.currentStepIndex) {
      case 0:
        html = DemoStudentViews.renderWelcome();
        break;

      case 1:
        html = DemoStudentViews.renderHome(this.pilotState);
        break;

      case 2:
        html = DemoStudentViews.renderChampionshipHome();
        break;

      case 3:
        const pool = this.examQuestions[this.pilotState.ageGroup] || this.examQuestions.GRADE_4_5;
        const curQ = pool[this.currentExamIdx] || pool[0];
        this.assertPilotItemSafety(curQ);
        const shuffledOpts = this.getShuffledOptions(curQ);
        html = DemoStudentViews.renderExamQuestion(curQ, this.currentExamIdx, pool.length, shuffledOpts);
        break;

      case 4:
        html = DemoStudentViews.renderPracticeResult(this.pilotState.examScore || { score: 80, correctCount: 4, totalCount: 5 });
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

        html = DemoStudentViews.renderSkillBoostQuestion(boostQ, this.currentBoostIdx, bPool.length, fbState, shuffledBoostOpts);
        break;

      case 6:
        html = DemoStudentViews.renderRewardMoment(this.pilotState);
        break;

      case 7:
        html = DemoStudentViews.renderStudentJourney();
        break;

      case 8:
        html = DemoStudentViews.renderStudentFeedback(this.pilotState.feedback);
        break;

      case 9:
        html = DemoStudentViews.renderThankYou();
        break;

      default:
        html = DemoStudentViews.renderWelcome();
    }

    container.innerHTML = html;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DemoStudentController };
} else if (typeof window !== 'undefined') {
  window.DemoStudentController = DemoStudentController;
}
