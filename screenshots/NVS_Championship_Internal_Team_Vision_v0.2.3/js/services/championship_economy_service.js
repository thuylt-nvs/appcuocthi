/* ==========================================================================
   NovaStars / Antigravity — Idempotent Ledger Economy Service
   ========================================================================== */

class ChampionshipEconomyService {
  constructor(repository) {
    this.repo = repository || new LocalStorageRepository(window.appState);
  }

  /**
   * Check if an idempotencyKey has already been processed in the transaction ledger
   */
  isIdempotentProcessed(draftState, idempotencyKey) {
    if (!idempotencyKey) return false;
    const transactions = (draftState.championship && draftState.championship.transactions) || [];
    return transactions.some(tx => tx.idempotencyKey === idempotencyKey);
  }

  /**
   * Grant XP idempotently using ledger check
   */
  grantXP({ userId = 'user_default', amount, sourceType, rankEligible = true, idempotencyKey, metadata = {} }) {
    if (typeof amount !== 'number' || amount <= 0) return { grantedAmount: 0, processed: false };

    let grantedAmount = 0;
    this.repo.updateStateAtomic((draft) => {
      if (this.isIdempotentProcessed(draft, idempotencyKey)) {
        if (typeof console !== 'undefined' && console.log) console.log(`[EconomyService] Duplicate grant ignored for key: ${idempotencyKey}`);
        return draft;
      }

      // Update balances
      draft.xp += amount;
      if (rankEligible) {
        draft.rankEligibleXP = (draft.rankEligibleXP || 0) + amount;
      }
      grantedAmount = amount;

      // Ledger entry
      const tx = {
        transactionId: `tx_xp_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        idempotencyKey,
        userId,
        sourceType,
        amount,
        currency: 'XP',
        rankEligible,
        metadata,
        createdAt: Date.now()
      };
      draft.championship.transactions.push(tx);

      return draft;
    });

    return { grantedAmount, processed: grantedAmount > 0 };
  }

  /**
   * Grant Stars idempotently using ledger check
   */
  grantStars({ userId = 'user_default', amount, sourceType, idempotencyKey, metadata = {} }) {
    if (typeof amount !== 'number' || amount <= 0) return { grantedAmount: 0, processed: false };

    let grantedAmount = 0;
    this.repo.updateStateAtomic((draft) => {
      if (this.isIdempotentProcessed(draft, idempotencyKey)) {
        if (typeof console !== 'undefined' && console.log) console.log(`[EconomyService] Duplicate Stars grant ignored for key: ${idempotencyKey}`);
        return draft;
      }

      // Update balance
      draft.stars += amount;
      grantedAmount = amount;

      // Ledger entry
      const tx = {
        transactionId: `tx_star_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        idempotencyKey,
        userId,
        sourceType,
        amount,
        currency: 'STARS',
        rankEligible: false,
        metadata,
        createdAt: Date.now()
      };
      draft.championship.transactions.push(tx);

      return draft;
    });

    return { grantedAmount, processed: grantedAmount > 0 };
  }

  /**
   * Process Exam Reward XP separately from Exam Evaluation using EXAM_REWARD:{attemptId}
   */
  processExamRewards(examResult) {
    const { attemptId, userId = 'user_default', xpReward = 100, rankEligibleXP = true } = examResult;
    const idempotencyKey = `EXAM_REWARD:${attemptId}`;

    return this.grantXP({
      userId,
      amount: xpReward,
      sourceType: 'DAILY_EXAM',
      rankEligible: rankEligibleXP,
      idempotencyKey,
      metadata: { attemptId }
    });
  }

  grantExamReward({ attemptId, xpAmount = 100, rankEligibleXP = true }) {
    return this.processExamRewards({ attemptId, xpReward: xpAmount, rankEligibleXP });
  }

  /**
   * Process Skill Boost per-answer XP using SKILL_XP:{sessionId}:{questionId}
   * Prevents XP farming (6 XP per correct answer, max 30 XP)
   */
  processSkillBoostAnswer({ userId = 'user_default', sessionId, questionId, isCorrect, rankEligible = true }) {
    if (!isCorrect) return { grantedAmount: 0, processed: false };

    const amount = 6; // Configured 6 XP per correct answer
    const idempotencyKey = `SKILL_XP:${sessionId}:${questionId}`;

    return this.grantXP({
      userId,
      amount,
      sourceType: 'SKILL_TRAINING_ANSWER',
      rankEligible,
      idempotencyKey,
      metadata: { sessionId, questionId }
    });
  }

  grantSkillBoostXP({ sessionId, questionId, xpAmount = 6 }) {
    return this.processSkillBoostAnswer({ sessionId, questionId, isCorrect: true });
  }

  /**
   * Process Skill Boost session completion Stars reward using SKILL_STARS:{sessionId}
   */
  processSkillBoostCompletion({ userId = 'user_default', sessionId, starsReward = 10 }) {
    const idempotencyKey = `SKILL_STARS:${sessionId}`;

    return this.grantStars({
      userId,
      amount: starsReward,
      sourceType: 'SKILL_TRAINING_BONUS',
      idempotencyKey,
      metadata: { sessionId }
    });
  }

  grantSkillBoostCompletionStars({ sessionId, starsAmount = 10 }) {
    return this.processSkillBoostCompletion({ sessionId, starsReward: starsAmount });
  }

  /**
   * Perform Star-to-Ticket Exchange through EconomyService (Requirement 6)
   */
  exchangeStarsForTicket(options = {}) {
    const costPerTicket = options.cost || options.costPerTicket || (ChampionshipConfig.starExchange && ChampionshipConfig.starExchange.costPerTicket) || 100;
    const ticketType = options.ticketType || (ChampionshipConfig.starExchange && ChampionshipConfig.starExchange.ticketType) || 'STAR_EXCHANGE';
    const seasonId = options.seasonId || ChampionshipConfig.seasonId;
    const userId = options.userId || 'user_default';
    const issueDate = options.issueDate;

    return this.repo.atomicStarToTicketExchange({
      userId,
      seasonId,
      cost: costPerTicket,
      costPerTicket,
      ticketType,
      issueDate
    });
  }

  /**
   * Single atomic/idempotent claimDailyMissionReward() operation (Requirement 8).
   * Idempotency keys scoped by DAILY_MISSION:{userId}:{seasonId}:{dateKey}:XP / STARS
   */
  claimDailyMissionReward(options = {}) {
    const userId = options.userId || (this.repo.appState && this.repo.appState.data && this.repo.appState.data.user && this.repo.appState.data.user.id) || 'user_default';
    const seasonId = options.seasonId || ChampionshipConfig.seasonId;
    const dateService = typeof championshipDateService !== 'undefined' ? championshipDateService : new ChampionshipDateService();
    const dateKey = options.dateKey || dateService.getCompetitionDateKey();
    const xpReward = options.xpReward || (ChampionshipConfig.missionBonus && ChampionshipConfig.missionBonus.xpReward) || 50;
    const starsReward = options.starsReward || (ChampionshipConfig.missionBonus && ChampionshipConfig.missionBonus.starsReward) || 20;

    let xpGranted = 0;
    let starsGranted = 0;

    this.repo.updateStateAtomic((draft) => {
      const missions = (draft.championship && draft.championship.dailyMissions && draft.championship.dailyMissions[dateKey]) || null;
      if (!missions) {
        throw new Error(`MISSING_MISSION_STATE: Mission state for ${dateKey} not found.`);
      }

      const completedCount = (missions.dailyExamCompleted ? 1 : 0) +
                             (missions.boostCompleted ? 1 : 0) +
                             (missions.weakSpotFixed ? 1 : 0);

      if (completedCount < 3) {
        throw new Error(`INCOMPLETE_MISSIONS: Cannot claim bonus: Only ${completedCount}/3 missions completed.`);
      }

      if (missions.claimedReward) {
        throw new Error(`ALREADY_CLAIMED: Daily mission completion bonus has already been claimed for ${dateKey}.`);
      }

      // Requirement 8: Scoped idempotency key
      const xpKey = `DAILY_MISSION:${userId}:${seasonId}:${dateKey}:XP`;
      const starsKey = `DAILY_MISSION:${userId}:${seasonId}:${dateKey}:STARS`;

      if (this.isIdempotentProcessed(draft, xpKey) || this.isIdempotentProcessed(draft, `MISSION_BONUS_XP:${userId}:${dateKey}`)) {
        throw new Error(`ALREADY_CLAIMED: XP bonus already processed for key ${xpKey}`);
      }

      // Mark claimed
      missions.claimedReward = true;

      // Add balances
      draft.xp += xpReward;
      draft.rankEligibleXP = (draft.rankEligibleXP || 0) + xpReward;
      draft.stars += starsReward;
      xpGranted = xpReward;
      starsGranted = starsReward;

      // Add transactions
      draft.championship.transactions.push({
        transactionId: `tx_xp_mission_${Date.now()}`,
        idempotencyKey: xpKey,
        userId,
        seasonId,
        sourceType: 'DAILY_MISSION_BONUS',
        amount: xpReward,
        currency: 'XP',
        rankEligible: true,
        metadata: { dateKey, seasonId },
        createdAt: Date.now()
      });

      draft.championship.transactions.push({
        transactionId: `tx_star_mission_${Date.now()}`,
        idempotencyKey: starsKey,
        userId,
        seasonId,
        sourceType: 'DAILY_MISSION_BONUS',
        amount: starsReward,
        currency: 'STARS',
        rankEligible: false,
        metadata: { dateKey, seasonId },
        createdAt: Date.now()
      });

      return draft;
    });

    return {
      success: true,
      xpGranted,
      starsGranted
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ChampionshipEconomyService };
} else {
  window.ChampionshipEconomyService = ChampionshipEconomyService;
}
