/* ==========================================================================
   NovaStars / Antigravity — Atomic LocalStorage Repository Adapter
   Sprint 1 Prototype Persistence Adapter (Serves as Service Boundary Interface)
   ========================================================================== */

class LocalStorageRepository {
  constructor(appState) {
    this.appState = appState || (typeof window !== 'undefined' ? window.appState : null) || (typeof globalThis !== 'undefined' ? globalThis.appState : null);
  }

  /**
   * Get current state data
   */
  getState() {
    const targetState = this.appState || (typeof window !== 'undefined' ? window.appState : null) || (typeof globalThis !== 'undefined' ? globalThis.appState : null);
    if (!targetState || !targetState.data) {
      throw new Error("REPOSITORY_ERROR: AppState is not initialized.");
    }
    return targetState.data;
  }

  /**
   * Execute an atomic state mutation function and commit to storage once
   * If any step inside mutatorFn throws, no state changes are committed.
   */
  updateStateAtomic(mutatorFn) {
    const targetState = this.appState || (typeof window !== 'undefined' ? window.appState : null) || (typeof globalThis !== 'undefined' ? globalThis.appState : null);
    if (!targetState || !targetState.data) {
      throw new Error("REPOSITORY_ERROR: AppState is not initialized.");
    }

    // Clone state for draft mutation
    const draft = JSON.parse(JSON.stringify(targetState.data));

    // Ensure championship namespace exists
    if (!draft.championship) {
      draft.championship = {
        tickets: [],
        attempts: [],
        sessions: [],
        trainingSessions: [],
        transactions: [],
        dailyMissions: {},
        schemaVersion: 1
      };
    } else {
      if (!Array.isArray(draft.championship.tickets)) draft.championship.tickets = [];
      if (!Array.isArray(draft.championship.attempts)) draft.championship.attempts = [];
      if (!Array.isArray(draft.championship.sessions)) draft.championship.sessions = [];
      if (!Array.isArray(draft.championship.trainingSessions)) draft.championship.trainingSessions = [];
      if (!Array.isArray(draft.championship.transactions)) draft.championship.transactions = [];
      if (!draft.championship.dailyMissions) draft.championship.dailyMissions = {};
    }

    // Execute atomic mutation
    const mutatedDraft = mutatorFn(draft) || draft;

    // Commit atomically back to AppState
    targetState.data = mutatedDraft;
    targetState.saveToStorage();

    return targetState.data;
  }

  /**
   * Helper: Get list of recently asked question IDs for non-repetitive selection (Requirement 5)
   * Scoped by { userId, seasonId, ageGroup }
   */
  getRecentQuestionIds(filter = {}) {
    const state = this.getState();
    const attempts = (state.championship && state.championship.attempts) || [];
    
    const filtered = attempts.filter(a => {
      if (typeof filter === 'function') {
        return filter(a.seasonId);
      }
      const matchUser = !filter.userId || a.userId === filter.userId;
      const matchSeason = !filter.seasonId || a.seasonId === filter.seasonId;
      const matchAgeGroup = !filter.ageGroup || a.ageGroup === filter.ageGroup;
      return matchUser && matchSeason && matchAgeGroup;
    });

    const ids = [];
    filtered.forEach(a => {
      if (Array.isArray(a.questions)) {
        a.questions.forEach(q => ids.push(q.id));
      }
    });
    return ids;
  }

  /**
   * Atomic Star-to-Ticket Exchange
   */
  atomicStarToTicketExchange(params = {}) {
    const costPerTicket = params.cost || params.costPerTicket || 100;
    const ticketType = params.ticketType || 'STAR_EXCHANGE';
    const seasonId = params.seasonId || 'NVS_2026_SEASON_1';

    let createdTicket = null;

    const updatedState = this.updateStateAtomic((draft) => {
      if (draft.stars < costPerTicket) {
        throw new Error(`INSUFFICIENT_STARS: Star exchange requires ${costPerTicket} Stars (Available: ${draft.stars}).`);
      }

      // Deduct Stars
      draft.stars -= costPerTicket;

      const userId = params.userId || (draft.user && draft.user.id) || 'user_default';
      const ticketId = `ticket_star_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      const issueDate = params.issueDate || (typeof championshipDateService !== 'undefined' ? championshipDateService.getCompetitionDateKey() : '2026-08-24');

      createdTicket = {
        ticketId,
        userId,
        seasonId,
        ticketType,
        issueDate,
        status: 'AVAILABLE',
        reservedByAttemptId: null,
        consumedAt: null,
        createdAt: Date.now()
      };

      draft.championship.tickets.push(createdTicket);

      // Record transaction ledger
      draft.championship.transactions.push({
        transactionId: `tx_star_${Date.now()}`,
        idempotencyKey: `STAR_EXCHANGE:${ticketId}`,
        type: 'STAR_EXCHANGE',
        sourceType: 'STAR_EXCHANGE',
        amount: -costPerTicket,
        starsDelta: -costPerTicket,
        ticketId,
        timestamp: Date.now()
      });

      return draft;
    });

    return Object.assign({}, updatedState, { ticket: createdTicket, success: true });
  }

  /**
   * Atomic Exam Start: reserve explicit AVAILABLE ticket + create ExamAttempt (Requirements 1 & 2)
   */
  atomicStartExamAttempt(options = {}) {
    const targetTicketId = options.ticketId;
    if (!targetTicketId) {
      throw new Error("EXPLICIT_TICKET_REQUIRED: atomicStartExamAttempt requires explicit ticketId.");
    }

    let createdAttempt = options.attempt ? JSON.parse(JSON.stringify(options.attempt)) : null;
    let reservedTicket = null;

    const updatedState = this.updateStateAtomic((draft) => {
      const availableTicket = draft.championship.tickets.find(t => t.ticketId === targetTicketId && t.status === 'AVAILABLE');

      if (!availableTicket) {
        throw new Error(`EXPLICIT_TICKET_NOT_AVAILABLE: Ticket ${targetTicketId} is not AVAILABLE.`);
      }

      const rankEligible = options.rankEligible !== undefined 
        ? options.rankEligible 
        : (typeof ChampionshipConfig !== 'undefined' ? ChampionshipConfig.resolveRankEligibility(availableTicket.ticketType) : (availableTicket.ticketType === 'DAILY_FREE'));

      if (!createdAttempt) {
        createdAttempt = {
          attemptId: options.attemptId || `att_${Date.now()}`,
          ticketId: availableTicket.ticketId,
          ticketType: availableTicket.ticketType,
          ticketSource: availableTicket.ticketType,
          rankEligible,
          rankEligibleXP: rankEligible,
          userId: (draft.user && draft.user.id) || options.userId || 'user_default',
          seasonId: options.seasonId || (typeof ChampionshipConfig !== 'undefined' ? ChampionshipConfig.seasonId : 'NVS_2026_SEASON_1'),
          competitionId: options.competitionId || (typeof ChampionshipConfig !== 'undefined' ? ChampionshipConfig.competitionId : 'NVS_FUTURE_LEADERS_2026'),
          blueprintId: options.blueprintId,
          ageGroup: options.ageGroup,
          durationSeconds: options.durationSeconds || 900,
          startedAtTimestamp: options.startedAtTimestamp || Date.now(),
          status: 'RESERVED',
          answers: {},
          flaggedQuestionIds: [],
          questions: options.questions || []
        };
      } else {
        createdAttempt.status = 'RESERVED';
        createdAttempt.ticketId = availableTicket.ticketId;
        createdAttempt.ticketType = availableTicket.ticketType;
        createdAttempt.ticketSource = availableTicket.ticketType;
        createdAttempt.rankEligible = rankEligible;
        createdAttempt.rankEligibleXP = rankEligible;
      }

      // Mark ticket RESERVED
      availableTicket.status = 'RESERVED';
      availableTicket.reservedByAttemptId = createdAttempt.attemptId;
      reservedTicket = availableTicket;

      draft.championship.attempts.push(createdAttempt);
      return draft;
    });

    return Object.assign({}, updatedState, { attempt: createdAttempt, ticket: reservedTicket });
  }

  /**
   * Atomic Exam Submit: finalize ExamAttempt + persist ExamResult + mark ticket CONSUMED
   */
  atomicSubmitExamAttempt(options = {}) {
    const attemptId = options.attemptId;
    const answers = options.answers || {};
    const examResult = options.examResult || {};

    let finalizedAttempt = null;
    const updatedState = this.updateStateAtomic((draft) => {
      const attempt = draft.championship.attempts.find(a => a.attemptId === attemptId);
      if (!attempt) {
        throw new Error(`ATTEMPT_NOT_FOUND: Cannot submit non-existent attempt ${attemptId}.`);
      }

      attempt.answers = answers;
      attempt.status = 'SUBMITTED';
      attempt.completedAtTimestamp = Date.now();
      attempt.examResult = examResult;
      if (examResult.score !== undefined) attempt.score = examResult.score;
      finalizedAttempt = attempt;

      // Consume associated ticket
      const ticket = draft.championship.tickets.find(t => t.ticketId === attempt.ticketId);
      if (ticket) {
        ticket.status = 'CONSUMED';
        ticket.consumedAt = Date.now();
      }

      return draft;
    });

    return Object.assign({}, updatedState, { attempt: finalizedAttempt, examResult });
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LocalStorageRepository };
} else {
  window.LocalStorageRepository = LocalStorageRepository;
}
