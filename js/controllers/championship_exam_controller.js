/* ==========================================================================
   NovaStars / Antigravity — Championship Exam Controller (Step 6 / Patch 2B)
   State Orchestrator for Core Daily Exam Training Loop
   ========================================================================== */

class ChampionshipExamController {
  constructor({ repository, stateService, economyService, examService, analyticsEngine, questionsData }) {
    this.repo = repository || new LocalStorageRepository(typeof window !== 'undefined' ? window.appState : null);
    this.stateService = stateService || new ChampionshipStateService(this.repo);
    this.economyService = economyService || new ChampionshipEconomyService(this.repo);
    this.questionsData = questionsData || (typeof ChampionshipQuestions !== 'undefined' ? ChampionshipQuestions : {});
    this.examService = examService || new ExamService(this.repo, this.questionsData);
    this.analytics = analyticsEngine || new ChampionshipAnalyticsEngine(this.repo);

    this.currentAttempt = null;
    this.activeBlueprint = null;
    this.activeQuestionPool = [];
    this.activeTicket = null;
  }

  /**
   * Rehydrate full controller context for an attempt ID (Micro-Patch 1)
   * Restores persisted context including lastVisitedQuestionId & currentQuestionIndex.
   */
  rehydrateAttempt(attemptId) {
    this.stateService.ensureStateSchema();
    const state = this.repo.getState();
    const attempts = (state.championship && state.championship.attempts) || [];
    const tickets = (state.championship && state.championship.tickets) || [];

    const attempt = attempts.find(a => a.attemptId === attemptId);
    if (!attempt) {
      throw new Error(`ATTEMPT_NOT_FOUND: Cannot rehydrate attempt ${attemptId}.`);
    }

    const ticket = tickets.find(t => t.ticketId === attempt.ticketId) || null;
    const ageGroup = attempt.ageGroup || ChampionshipConfig.resolveAgeGroup((state.user && state.user.grade) || 4);
    const blueprint = ChampionshipConfig.examBlueprints[ageGroup] || null;

    this.currentAttempt = attempt;
    this.activeBlueprint = blueprint;
    this.activeQuestionPool = attempt.questions || [];
    this.activeTicket = ticket;

    const elapsedSeconds = Math.floor((Date.now() - attempt.startedAtTimestamp) / 1000);
    const remainingSeconds = Math.max(0, attempt.durationSeconds - elapsedSeconds);

    const lastVisitedQuestionId = attempt.lastVisitedQuestionId || (attempt.questions && attempt.questions[0] ? attempt.questions[0].id : null);
    const currentQuestionIndex = typeof attempt.currentQuestionIndex === 'number' ? attempt.currentQuestionIndex : 0;

    return {
      status: remainingSeconds === 0 ? 'AUTO_SUBMITTED' : 'RESUME_REQUIRED',
      attempt,
      ticket,
      blueprint,
      ageGroup,
      questions: attempt.questions,
      answers: attempt.answers || {},
      flaggedQuestionIds: attempt.flaggedQuestionIds || [],
      lastVisitedQuestionId,
      currentQuestionIndex,
      rankEligible: attempt.rankEligible !== undefined ? attempt.rankEligible : attempt.rankEligibleXP,
      remainingSeconds
    };
  }

  /**
   * Start a new exam attempt for student grade (Requirements 1, 2, 3, 4, 5)
   */
  startExam(grade, requestedTicketId = null) {
    this.stateService.ensureStateSchema();

    // Requirement 4: Explicit grade validation
    if (!grade) {
      return { status: 'INVALID_GRADE', error: "MISSING_GRADE: Grade parameters is required (1-5)." };
    }

    let ageGroup = null;
    try {
      ageGroup = ChampionshipConfig.resolveAgeGroup(grade);
    } catch (err) {
      return { status: 'INVALID_GRADE', error: err.message };
    }

    // Requirement 3: Prevent concurrent active exams
    const activeObj = this.stateService.getActiveReservedAttempt();
    if (activeObj && activeObj.attempt) {
      const rehydratedContext = this.rehydrateAttempt(activeObj.attempt.attemptId);
      
      // Auto-submit if time expired while offline
      if (rehydratedContext.remainingSeconds === 0) {
        const submitResult = this.submitExam(true);
        return {
          status: 'AUTO_SUBMITTED',
          attempt: submitResult.attempt,
          examResult: submitResult.examResult,
          coachAdvice: submitResult.coachAdvice
        };
      }

      return {
        status: 'RESUME_REQUIRED',
        attempt: activeObj.attempt,
        ticket: activeObj.ticket,
        questions: activeObj.attempt.questions,
        remainingSeconds: rehydratedContext.remainingSeconds,
        currentQuestionIndex: rehydratedContext.currentQuestionIndex,
        rehydratedContext
      };
    }

    const blueprint = ChampionshipConfig.examBlueprints[ageGroup];
    if (!blueprint) {
      return { status: 'ERROR', error: `BLUEPRINT_NOT_FOUND: No blueprint configured for ageGroup ${ageGroup}.` };
    }

    // Requirement 2: Explicit Ticket Selection
    let selectedTicket = null;
    const todayTickets = this.stateService.getTodayTickets();

    if (requestedTicketId) {
      selectedTicket = todayTickets.find(t => t.ticketId === requestedTicketId && t.status === 'AVAILABLE');
      if (!selectedTicket) {
        return { status: 'NO_ELIGIBLE_TICKET', error: `EXPLICIT_TICKET_NOT_AVAILABLE: Ticket ${requestedTicketId} is not AVAILABLE.` };
      }
    } else {
      selectedTicket = todayTickets.find(t => t.ticketType === 'DAILY_FREE' && t.status === 'AVAILABLE') ||
                       todayTickets.find(t => t.status === 'AVAILABLE');
    }

    if (!selectedTicket) {
      return { status: 'NO_ELIGIBLE_TICKET', error: "NO_AVAILABLE_TICKET: Bạn đã dùng hết lượt thi thử hôm nay." };
    }

    // Requirement 1: Centralized Rank Eligibility Policy
    const rankEligible = ChampionshipConfig.resolveRankEligibility(selectedTicket.ticketType);

    // Requirement 5: Scoped Recent Questions Retrieval
    const state = this.repo.getState();
    const userId = (state.user && state.user.id) || 'user_default';
    const pool = this.questionsData[ageGroup] || [];
    const recentIds = this.repo.getRecentQuestionIds({
      userId,
      seasonId: ChampionshipConfig.seasonId,
      ageGroup
    });
    const selectedQuestions = this.examService.selectQuestionsForBlueprint(blueprint, pool, recentIds);

    const attemptId = `att_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const startedAtTimestamp = Date.now();

    const startRes = this.repo.atomicStartExamAttempt({
      attemptId,
      ticketId: selectedTicket.ticketId,
      seasonId: ChampionshipConfig.seasonId,
      competitionId: ChampionshipConfig.competitionId,
      blueprintId: blueprint.blueprintId,
      ageGroup,
      durationSeconds: blueprint.durationSeconds,
      startedAtTimestamp,
      questions: selectedQuestions,
      rankEligible,
      userId
    });

    const attempt = startRes.attempt || startRes;
    attempt.currentQuestionIndex = 0;
    attempt.lastVisitedQuestionId = selectedQuestions[0] ? selectedQuestions[0].id : null;

    this.currentAttempt = attempt;
    this.activeBlueprint = blueprint;
    this.activeQuestionPool = selectedQuestions;
    this.activeTicket = selectedTicket;

    const eventName = (typeof ChampionshipAnalyticsEvents !== 'undefined' && ChampionshipAnalyticsEvents.EXAM_STARTED)
      ? ChampionshipAnalyticsEvents.EXAM_STARTED
      : 'championship_exam_started';

    this.analytics.trackEvent(eventName, {
      userId,
      seasonId: ChampionshipConfig.seasonId,
      attemptId: attempt.attemptId,
      ticketId: selectedTicket.ticketId,
      ticketType: selectedTicket.ticketType,
      rankEligible,
      ageGroup,
      blueprintId: blueprint.blueprintId,
      questionCount: selectedQuestions.length
    });

    return {
      status: 'STARTED',
      attempt,
      ticket: selectedTicket,
      blueprint,
      questions: selectedQuestions,
      remainingSeconds: blueprint.durationSeconds,
      currentQuestionIndex: 0,
      lastVisitedQuestionId: attempt.lastVisitedQuestionId,
      rankEligible
    };
  }

  /**
   * Resume active in-progress RESERVED attempt if reloaded or interrupted (Requirement 4)
   */
  resumeActiveExam() {
    this.stateService.ensureStateSchema();
    const activeObj = this.stateService.getActiveReservedAttempt();
    if (!activeObj || !activeObj.attempt) {
      return null;
    }

    const rehydrated = this.rehydrateAttempt(activeObj.attempt.attemptId);

    // Auto-submit if time expired while offline/reloading
    if (rehydrated.remainingSeconds === 0) {
      const submitResult = this.submitExam(true);
      return {
        status: 'AUTO_SUBMITTED',
        attempt: submitResult.attempt,
        examResult: submitResult.examResult,
        coachAdvice: submitResult.coachAdvice
      };
    }

    return rehydrated;
  }

  /**
   * Leave exam flow (Requirement 6): Preserve attempt status as IN_PROGRESS & keep timestamp timer running
   */
  leaveExam() {
    if (!this.currentAttempt) return { status: 'NO_ACTIVE_ATTEMPT' };

    this.repo.updateStateAtomic(draft => {
      const att = draft.championship.attempts.find(a => a.attemptId === this.currentAttempt.attemptId);
      if (att) {
        att.status = 'IN_PROGRESS';
      }
    });

    this.currentAttempt.status = 'IN_PROGRESS';
    const attempt = this.currentAttempt;
    this.currentAttempt = null;

    return {
      status: 'PAUSED',
      attempt
    };
  }

  /**
   * Get exact remaining seconds using timestamp difference
   */
  getRemainingSeconds() {
    if (!this.currentAttempt) return 0;
    
    const state = this.repo.getState();
    const liveAttempt = (state.championship && state.championship.attempts)
      ? state.championship.attempts.find(a => a.attemptId === this.currentAttempt.attemptId)
      : null;

    const target = liveAttempt || this.currentAttempt;
    const startedAt = target.startedAtTimestamp || Date.now();
    const duration = target.durationSeconds || 1200;
    const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1000);

    return Math.max(0, duration - elapsedSeconds);
  }

  /**
   * Update and persist active question position (Micro-Patch 1)
   */
  updateCurrentQuestionPosition(index, questionId = null) {
    if (!this.currentAttempt) return false;
    
    this.repo.updateStateAtomic(draft => {
      const att = draft.championship.attempts.find(a => a.attemptId === this.currentAttempt.attemptId);
      if (att) {
        att.currentQuestionIndex = index;
        if (questionId) att.lastVisitedQuestionId = questionId;
      }
    });

    this.currentAttempt.currentQuestionIndex = index;
    if (questionId) this.currentAttempt.lastVisitedQuestionId = questionId;
    return true;
  }

  /**
   * Save student answer for a question immediately (Micro-Patch 1)
   */
  saveAnswer(questionId, selectedOption, questionIndex = null) {
    if (!this.currentAttempt) throw new Error("NO_ACTIVE_ATTEMPT: Cannot save answer.");
    
    this.repo.updateStateAtomic(draft => {
      const att = draft.championship.attempts.find(a => a.attemptId === this.currentAttempt.attemptId);
      if (att) {
        if (!att.answers) att.answers = {};
        att.answers[questionId] = selectedOption;
        att.lastVisitedQuestionId = questionId;
        if (typeof questionIndex === 'number') att.currentQuestionIndex = questionIndex;
      }
    });

    if (!this.currentAttempt.answers) this.currentAttempt.answers = {};
    this.currentAttempt.answers[questionId] = selectedOption;
    this.currentAttempt.lastVisitedQuestionId = questionId;
    if (typeof questionIndex === 'number') this.currentAttempt.currentQuestionIndex = questionIndex;
    return true;
  }

  /**
   * Toggle question flag for review
   */
  toggleFlagQuestion(questionId) {
    if (!this.currentAttempt) throw new Error("NO_ACTIVE_ATTEMPT: Cannot flag question.");

    let isFlagged = false;
    this.repo.updateStateAtomic(draft => {
      const att = draft.championship.attempts.find(a => a.attemptId === this.currentAttempt.attemptId);
      if (att) {
        if (!Array.isArray(att.flaggedQuestionIds)) att.flaggedQuestionIds = [];
        const index = att.flaggedQuestionIds.indexOf(questionId);
        if (index >= 0) {
          att.flaggedQuestionIds.splice(index, 1);
          isFlagged = false;
        } else {
          att.flaggedQuestionIds.push(questionId);
          isFlagged = true;
        }
      }
    });

    return isFlagged;
  }

  /**
   * Check timer and auto-submit if time expired
   */
  autoSubmitIfExpired() {
    if (this.currentAttempt && this.getRemainingSeconds() === 0) {
      return this.submitExam(true);
    }
    return null;
  }

  /**
   * Submit exam attempt atomically (Requirement 1 & 9)
   */
  submitExam(autoSubmitted = false) {
    if (!this.currentAttempt) throw new Error("NO_ACTIVE_ATTEMPT: Cannot submit exam.");
    if (this.currentAttempt.status === 'COMPLETED' || this.currentAttempt.status === 'SUBMITTED') {
      throw new Error("ATTEMPT_ALREADY_COMPLETED: Exam attempt has already been submitted.");
    }

    const state = this.repo.getState();
    const liveAttempt = (state.championship && state.championship.attempts)
      ? state.championship.attempts.find(a => a.attemptId === this.currentAttempt.attemptId)
      : this.currentAttempt;
    
    const targetAttempt = liveAttempt || this.currentAttempt;
    const userId = (state.user && state.user.id) || 'user_default';

    const durationUsed = Math.min(
      targetAttempt.durationSeconds,
      Math.floor((Date.now() - targetAttempt.startedAtTimestamp) / 1000)
    );

    const rankEligible = targetAttempt.rankEligible !== undefined ? targetAttempt.rankEligible : targetAttempt.rankEligibleXP;

    const examResult = this.examService.evaluateAttemptAnswers({
      attemptId: targetAttempt.attemptId,
      answers: targetAttempt.answers || {},
      questions: targetAttempt.questions || [],
      autoSubmitted,
      durationUsed,
      rankEligibleXP: rankEligible
    });

    const submitRes = this.repo.atomicSubmitExamAttempt({
      attemptId: targetAttempt.attemptId,
      answers: targetAttempt.answers || {},
      examResult
    });

    const attempt = submitRes.attempt || submitRes;
    attempt.status = 'COMPLETED';
    attempt.examResult = examResult;

    const economyResult = this.economyService.grantExamReward({
      attemptId: attempt.attemptId,
      xpAmount: examResult.xpReward,
      rankEligibleXP: rankEligible
    });

    const coachAdvice = this.analytics.evaluateCoachAdvice(examResult);

    const eventName = (typeof ChampionshipAnalyticsEvents !== 'undefined' && ChampionshipAnalyticsEvents.EXAM_SUBMITTED)
      ? ChampionshipAnalyticsEvents.EXAM_SUBMITTED
      : 'championship_exam_submitted';

    this.analytics.trackEvent(eventName, {
      userId,
      seasonId: ChampionshipConfig.seasonId,
      attemptId: attempt.attemptId,
      ticketId: targetAttempt.ticketId,
      rankEligible,
      score: examResult.score,
      percentage: examResult.percentage,
      autoSubmitted,
      weakestCompetency: examResult.weakestCompetency,
      strongestCompetency: examResult.strongestCompetency
    });

    this.currentAttempt = null;

    return {
      status: 'SUBMITTED',
      attempt,
      examResult,
      economyResult,
      coachAdvice
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ChampionshipExamController };
} else {
  if (typeof window !== 'undefined') {
    window.ChampionshipExamController = ChampionshipExamController;
  }
}
