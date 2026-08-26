/* ==========================================================================
   NovaStars / Antigravity — Championship Training Controller (Step 6 / Patch 2B)
   State Orchestrator for Skill Boost & Daily Mission Training Loop
   ========================================================================== */

class ChampionshipTrainingController {
  constructor({ repository, stateService, economyService, analyticsEngine, questionsData }) {
    this.repo = repository || new LocalStorageRepository(typeof window !== 'undefined' ? window.appState : null);
    this.stateService = stateService || new ChampionshipStateService(this.repo);
    this.economyService = economyService || new ChampionshipEconomyService(this.repo);
    this.questionsData = questionsData || (typeof ChampionshipQuestions !== 'undefined' ? ChampionshipQuestions : {});
    this.analytics = analyticsEngine || new ChampionshipAnalyticsEngine(this.repo);

    this.activeSession = null;
    this.activeQuestions = [];
  }

  /**
   * Start a new Skill Boost targeted training session (5 questions for chosen competency)
   */
  startSkillBoost(competencyId, ageGroup = 'GRADE_4_5') {
    this.stateService.ensureStateSchema();
    const activeObj = this.resumeActiveSkillBoost();
    if (activeObj && activeObj.session && activeObj.session.competencyId === competencyId) {
      return activeObj;
    }

    const pool = this.questionsData[ageGroup] || [];
    const targetQuestions = pool.filter(q => q.primaryCompetencyId === competencyId).slice(0, ChampionshipConfig.skillBoost.questionCount || 5);

    if (targetQuestions.length === 0) {
      throw new Error(`NO_QUESTIONS_FOUND: No questions available for competency ${competencyId} in ageGroup ${ageGroup}.`);
    }

    const state = this.repo.getState();
    const userId = (state.user && state.user.id) || 'user_default';
    const sessionId = `sb_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const sessionEntity = {
      sessionId,
      userId,
      seasonId: ChampionshipConfig.seasonId,
      competencyId,
      ageGroup,
      questions: targetQuestions,
      currentQuestionIndex: 0,
      answers: {},
      xpEarned: 0,
      starsEarned: 0,
      status: 'IN_PROGRESS',
      createdAt: Date.now()
    };

    this.repo.updateStateAtomic(draft => {
      draft.championship.trainingSessions.push(sessionEntity);
    });

    this.activeSession = sessionEntity;
    this.activeQuestions = targetQuestions;

    const eventName = (typeof ChampionshipAnalyticsEvents !== 'undefined' && ChampionshipAnalyticsEvents.SKILL_BOOST_STARTED)
      ? ChampionshipAnalyticsEvents.SKILL_BOOST_STARTED
      : 'championship_skill_boost_started';

    this.analytics.trackEvent(eventName, {
      userId,
      seasonId: ChampionshipConfig.seasonId,
      sessionId,
      competencyId,
      ageGroup,
      questionCount: targetQuestions.length
    });

    return {
      session: sessionEntity,
      questions: targetQuestions,
      currentQuestionIndex: 0,
      nextQuestion: targetQuestions[0]
    };
  }

  /**
   * Resume active IN_PROGRESS Skill Boost session
   */
  resumeActiveSkillBoost() {
    this.stateService.ensureStateSchema();
    const state = this.repo.getState();
    const sessions = (state.championship && state.championship.trainingSessions) || [];
    const active = sessions.find(s => s.status === 'IN_PROGRESS');

    if (!active) return null;

    this.activeSession = active;
    this.activeQuestions = active.questions || [];

    const answeredQuestionIds = Object.keys(active.answers || {});
    const currentQuestionIndex = typeof active.currentQuestionIndex === 'number' ? active.currentQuestionIndex : answeredQuestionIds.length;
    const nextQuestion = this.activeQuestions[currentQuestionIndex] || null;

    return {
      session: active,
      questions: active.questions,
      answeredQuestionIds,
      currentQuestionIndex,
      nextQuestion,
      xpEarned: active.xpEarned || 0,
      starsEarned: active.starsEarned || 0
    };
  }

  /**
   * Submit answer for a Skill Boost question with immediate feedback & per-answer XP idempotency
   */
  submitAnswer(questionId, selectedOption) {
    if (!this.activeSession) throw new Error("NO_ACTIVE_SESSION: No Skill Boost session in progress.");

    const question = this.activeQuestions.find(q => q.id === questionId);
    if (!question) throw new Error(`QUESTION_NOT_FOUND: Question ${questionId} not in active session.`);

    const isAlreadyAnswered = Boolean(this.activeSession.answers && this.activeSession.answers[questionId]);
    const isCorrect = String(selectedOption).toUpperCase() === String(question.correctAnswer).toUpperCase();
    let xpGranted = 0;

    if (isCorrect && !isAlreadyAnswered) {
      const rewardRes = this.economyService.grantSkillBoostXP({
        sessionId: this.activeSession.sessionId,
        questionId,
        xpAmount: ChampionshipConfig.skillBoost.xpPerCorrectAnswer || 6
      });
      xpGranted = rewardRes.grantedAmount;
    }

    const answeredCount = Object.keys(this.activeSession.answers || {}).length + (isAlreadyAnswered ? 0 : 1);
    const newIndex = Math.min(this.activeQuestions.length, answeredCount);

    // Persist answer in session state
    this.repo.updateStateAtomic(draft => {
      const session = draft.championship.trainingSessions.find(s => s.sessionId === this.activeSession.sessionId);
      if (session) {
        if (!session.answers) session.answers = {};
        session.answers[questionId] = {
          selectedOption,
          isCorrect,
          answeredAt: Date.now()
        };
        session.currentQuestionIndex = newIndex;
        session.xpEarned = (session.xpEarned || 0) + xpGranted;
      }
    });

    if (!this.activeSession.answers) this.activeSession.answers = {};
    this.activeSession.answers[questionId] = { selectedOption, isCorrect };
    this.activeSession.currentQuestionIndex = newIndex;

    return {
      questionId,
      isCorrect,
      isAlreadyAnswered,
      correctAnswer: question.correctAnswer,
      explanationShort: question.explanationShort,
      explanationFull: question.explanationFull,
      xpGranted
    };
  }

  /**
   * Advance to next question in Skill Boost session
   */
  advanceToNextQuestion() {
    if (!this.activeSession) return false;
    const currentIndex = typeof this.activeSession.currentQuestionIndex === 'number' ? this.activeSession.currentQuestionIndex : 0;
    const newIndex = currentIndex + 1;

    this.repo.updateStateAtomic(draft => {
      const s = draft.championship.trainingSessions.find(x => x.sessionId === this.activeSession.sessionId);
      if (s) {
        s.currentQuestionIndex = newIndex;
      }
    });

    this.activeSession.currentQuestionIndex = newIndex;
    return newIndex;
  }

  /**
   * Complete active Skill Boost session & award one-time completion Stars
   */
  completeSkillBoost() {
    if (!this.activeSession) throw new Error("NO_ACTIVE_SESSION: No Skill Boost session in progress.");

    const session = this.activeSession;
    const rewardRes = this.economyService.grantSkillBoostCompletionStars({
      sessionId: session.sessionId,
      starsAmount: ChampionshipConfig.skillBoost.completionStarsReward || 10
    });

    // Mark session COMPLETED
    this.repo.updateStateAtomic(draft => {
      const s = draft.championship.trainingSessions.find(x => x.sessionId === session.sessionId);
      if (s) {
        s.status = 'COMPLETED';
        s.completedAtTimestamp = Date.now();
        s.starsEarned = rewardRes.grantedAmount;
      }
    });

    // Update Daily Mission Progress
    this.stateService.updateMissionProgress('boostCompleted', true);

    const state = this.repo.getState();
    const userId = (state.user && state.user.id) || 'user_default';

    const eventName = (typeof ChampionshipAnalyticsEvents !== 'undefined' && ChampionshipAnalyticsEvents.SKILL_BOOST_COMPLETED)
      ? ChampionshipAnalyticsEvents.SKILL_BOOST_COMPLETED
      : 'championship_skill_boost_completed';

    this.analytics.trackEvent(eventName, {
      userId,
      seasonId: ChampionshipConfig.seasonId,
      sessionId: session.sessionId,
      competencyId: session.competencyId,
      starsEarned: rewardRes.grantedAmount
    });

    this.activeSession = null;

    return {
      sessionId: session.sessionId,
      status: 'COMPLETED',
      starsEarned: rewardRes.grantedAmount
    };
  }

  /**
   * Star-to-ticket exchange routed through EconomyService
   */
  exchangeStarsForTicket() {
    const state = this.repo.getState();
    const userId = (state.user && state.user.id) || 'user_default';
    return this.economyService.exchangeStarsForTicket({ userId });
  }

  /**
   * Claim Daily Mission Reward
   */
  claimDailyMissionReward() {
    const state = this.repo.getState();
    const userId = (state.user && state.user.id) || 'user_default';
    const todayKey = this.stateService.dateService.getCompetitionDateKey();
    const missions = this.stateService.getTodayMissions();

    const completedCount = (missions.dailyExamCompleted ? 1 : 0) + (missions.boostCompleted ? 1 : 0) + (missions.weakSpotFixed ? 1 : 0);
    if (completedCount < 3) {
      throw new Error("MISSIONS_NOT_COMPLETED: Complete all 3 daily missions to claim reward.");
    }
    if (missions.claimedReward) {
      throw new Error("ALREADY_CLAIMED: Daily mission reward has already been claimed for today.");
    }

    const rewardXP = ChampionshipConfig.missionBonus.xpReward || 50;
    const rewardStars = ChampionshipConfig.missionBonus.starsReward || 20;

    const res = this.economyService.grantDailyMissionReward({
      userId,
      seasonId: ChampionshipConfig.seasonId,
      dateKey: todayKey,
      xpAmount: rewardXP,
      starsAmount: rewardStars
    });

    this.stateService.updateMissionProgress('claimedReward', true);
    return res;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ChampionshipTrainingController };
} else {
  if (typeof window !== 'undefined') {
    window.ChampionshipTrainingController = ChampionshipTrainingController;
  }
}
