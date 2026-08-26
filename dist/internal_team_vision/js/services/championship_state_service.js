/* ==========================================================================
   NovaStars / Antigravity — Championship State Service & Schema Migration
   ========================================================================== */

const CURRENT_SCHEMA_VERSION = 1;

class ChampionshipStateService {
  constructor(repository, dateService) {
    this.repo = repository || new LocalStorageRepository(typeof window !== 'undefined' ? window.appState : null);
    this.dateService = dateService || (typeof championshipDateService !== 'undefined' ? championshipDateService : new ChampionshipDateService());
  }

  /**
   * Migrate and ensure championship sub-state schema without overwriting existing user data
   */
  ensureStateSchema() {
    return this.repo.updateStateAtomic((draft) => {
      // 1. Preserve base app state defaults if missing
      if (typeof draft.xp !== 'number') draft.xp = 0;
      if (typeof draft.stars !== 'number') draft.stars = 0;
      if (typeof draft.streak !== 'number') draft.streak = 1;
      if (!draft.completedNodes) draft.completedNodes = {};
      if (!draft.unlockedNodes) draft.unlockedNodes = {};

      // 2. Ensure championship namespace exists
      if (!draft.championship) {
        draft.championship = {
          schemaVersion: CURRENT_SCHEMA_VERSION,
          tickets: [],
          attempts: [],
          sessions: [],
          trainingSessions: [],
          transactions: [],
          dailyMissions: {}
        };
      } else {
        if (!draft.championship.schemaVersion || draft.championship.schemaVersion < CURRENT_SCHEMA_VERSION) {
          draft.championship.schemaVersion = CURRENT_SCHEMA_VERSION;
        }
        if (!Array.isArray(draft.championship.tickets)) draft.championship.tickets = [];
        if (!Array.isArray(draft.championship.attempts)) draft.championship.attempts = [];
        if (!Array.isArray(draft.championship.sessions)) draft.championship.sessions = [];
        if (!Array.isArray(draft.championship.trainingSessions)) draft.championship.trainingSessions = [];
        if (!Array.isArray(draft.championship.transactions)) draft.championship.transactions = [];
        if (!draft.championship.dailyMissions) draft.championship.dailyMissions = {};
      }

      // 3. Perform Date-Aware Synchronization
      const todayKey = this.dateService.getCompetitionDateKey();
      const userId = (draft.user && draft.user.id) || 'user_default';
      const seasonId = 'NVS_2026_SEASON_1';

      // 3a. Provision Date-Aware DAILY_FREE ticket if none exists for today
      const existingDailyTicket = draft.championship.tickets.find(t =>
        t.ticketType === 'DAILY_FREE' && t.issueDate === todayKey && t.userId === userId
      );

      if (!existingDailyTicket) {
        const ticketId = `daily_free_${userId}_${seasonId}_${todayKey}`;
        draft.championship.tickets.push({
          ticketId,
          userId,
          seasonId,
          ticketType: 'DAILY_FREE',
          issueDate: todayKey,
          status: 'AVAILABLE',
          reservedByAttemptId: null,
          consumedAt: null,
          createdAt: Date.now()
        });
      }

      // 3b. Provision Date-Aware Daily Missions for today
      if (!draft.championship.dailyMissions[todayKey]) {
        draft.championship.dailyMissions[todayKey] = {
          dateKey: todayKey,
          dailyExamCompleted: false,
          boostCompleted: false,
          weakSpotFixed: false,
          claimedReward: false
        };
      }

      return draft;
    });
  }

  /**
   * Provision date-aware DAILY_FREE ticket (helper alias)
   */
  provisionDailyTicket() {
    this.ensureStateSchema();
    const todayKey = this.dateService.getCompetitionDateKey();
    const state = (this.repo.appState && this.repo.appState.data) || (typeof window !== 'undefined' && window.appState && window.appState.data);
    const tickets = (state && state.championship && state.championship.tickets) || [];
    return tickets.find(t => t.issueDate === todayKey && t.ticketType === 'DAILY_FREE');
  }

  /**
   * Get today's active tickets
   */
  getTodayTickets() {
    this.ensureStateSchema();
    const todayKey = this.dateService.getCompetitionDateKey();
    const state = (this.repo.appState && this.repo.appState.data) || (typeof window !== 'undefined' && window.appState && window.appState.data);
    const tickets = (state && state.championship && state.championship.tickets) || [];
    return tickets.filter(t => t.issueDate === todayKey || t.status === 'AVAILABLE');
  }

  /**
   * Get active RESERVED or IN_PROGRESS attempt that can be resumed after reload/app return
   */
  getActiveReservedAttempt() {
    this.ensureStateSchema();
    const state = (this.repo.appState && this.repo.appState.data) || (typeof window !== 'undefined' && window.appState && window.appState.data);
    const attempts = (state && state.championship && state.championship.attempts) || [];
    const tickets = (state && state.championship && state.championship.tickets) || [];

    const activeAttempt = attempts.find(a => a.status === 'RESERVED' || a.status === 'IN_PROGRESS');
    if (!activeAttempt) return null;

    const ticket = tickets.find(t => t.ticketId === activeAttempt.ticketId && (t.status === 'RESERVED' || t.status === 'AVAILABLE'));
    if (!ticket) return null;

    return { attempt: activeAttempt, ticket };
  }

  /**
   * Get active in-progress training session for boot recovery (Requirement 1 & 3)
   */
  getActiveTrainingSession() {
    this.ensureStateSchema();
    const state = (this.repo.appState && this.repo.appState.data) || (typeof window !== 'undefined' && window.appState && window.appState.data);
    const sessions = (state && state.championship && state.championship.trainingSessions) || [];
    return sessions.find(s => s.status === 'IN_PROGRESS') || null;
  }

  /**
   * Get latest completed attempt entity (Requirement 2)
   */
  getLatestCompletedAttempt() {
    this.ensureStateSchema();
    const state = (this.repo.appState && this.repo.appState.data) || (typeof window !== 'undefined' && window.appState && window.appState.data);
    const attempts = (state && state.championship && state.championship.attempts) || [];
    const completed = attempts.filter(a => a.status === 'COMPLETED' || a.status === 'SUBMITTED');
    if (completed.length === 0) return null;
    return completed.sort((a, b) => (b.submittedAtTimestamp || b.createdAt || 0) - (a.submittedAtTimestamp || a.createdAt || 0))[0];
  }

  /**
   * Get latest completed Skill Boost session entity (Requirement 2)
   */
  getLatestCompletedTrainingSession() {
    this.ensureStateSchema();
    const state = (this.repo.appState && this.repo.appState.data) || (typeof window !== 'undefined' && window.appState && window.appState.data);
    const sessions = (state && state.championship && state.championship.trainingSessions) || [];
    const completed = sessions.filter(s => s.status === 'COMPLETED');
    if (completed.length === 0) return null;
    return completed.sort((a, b) => (b.completedAtTimestamp || b.createdAt || 0) - (a.completedAtTimestamp || a.createdAt || 0))[0];
  }

  /**
   * Get today's daily mission status
   */
  getTodayMissions() {
    this.ensureStateSchema();
    const todayKey = this.dateService.getCompetitionDateKey();
    const state = (this.repo.appState && this.repo.appState.data) || (typeof window !== 'undefined' && window.appState && window.appState.data);
    return (state && state.championship && state.championship.dailyMissions && state.championship.dailyMissions[todayKey]) || {
      dateKey: todayKey,
      dailyExamCompleted: false,
      boostCompleted: false,
      weakSpotFixed: false,
      claimedReward: false
    };
  }

  /**
   * Update mission completion status
   */
  updateMissionProgress(missionKey, value = true) {
    const todayKey = this.dateService.getCompetitionDateKey();
    return this.repo.updateStateAtomic((draft) => {
      if (!draft.championship.dailyMissions[todayKey]) {
        draft.championship.dailyMissions[todayKey] = {
          dateKey: todayKey,
          dailyExamCompleted: false,
          boostCompleted: false,
          weakSpotFixed: false,
          claimedReward: false
        };
      }
      draft.championship.dailyMissions[todayKey][missionKey] = value;
      return draft;
    });
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ChampionshipStateService, CURRENT_SCHEMA_VERSION };
} else {
  if (typeof window !== 'undefined') {
    window.ChampionshipStateService = ChampionshipStateService;
    window.CURRENT_SCHEMA_VERSION = CURRENT_SCHEMA_VERSION;
  }
}
