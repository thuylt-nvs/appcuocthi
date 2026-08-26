/* ==========================================================================
   NovaStars / Antigravity — Production JavaScript Runtime Test Suite
   EXECUTES REAL JAVASCRIPT BUSINESS LOGIC IN RUNTIME (REVIEW GATE 1)
   ========================================================================== */

(function (exports) {
  'use strict';

  // Lightweight DOM & Timer Mock Guard for Headless CLI Engine
  if (typeof document === 'undefined') {
    const mockEl = {
      appendChild() {},
      remove() {},
      style: {},
      innerHTML: '',
      className: ''
    };
    globalThis.document = {
      getElementById() { return mockEl; },
      createElement() { return mockEl; },
      addEventListener() {}
    };
  }

  if (typeof setTimeout === 'undefined') {
    globalThis.setTimeout = function(fn) { if (typeof fn === 'function') fn(); return 1; };
    globalThis.clearTimeout = function() {};
  }

  // Helper for Assertions
  function assert(condition, message) {
    if (!condition) {
      throw new Error(`ASSERTION_FAILED: ${message}`);
    }
  }

  assert.strictEqual = function (actual, expected, message) {
    if (actual !== expected) {
      throw new Error(`ASSERTION_FAILED: Expected [${expected}], but got [${actual}]. ${message || ''}`);
    }
  };

  assert.notStrictEqual = function (actual, expected, message) {
    if (actual === expected) {
      throw new Error(`ASSERTION_FAILED: Expected NOT [${expected}], but got [${actual}]. ${message || ''}`);
    }
  };

  assert.throws = function (fn, expectedErrorRegex, message) {
    let errorThrown = null;
    try {
      fn();
    } catch (e) {
      errorThrown = e;
    }
    if (!errorThrown) {
      throw new Error(`ASSERTION_FAILED: Expected error matching [${expectedErrorRegex}], but no error was thrown. ${message || ''}`);
    }
    if (expectedErrorRegex && !expectedErrorRegex.test(errorThrown.message)) {
      throw new Error(`ASSERTION_FAILED: Expected error matching [${expectedErrorRegex}], but got [${errorThrown.message}]. ${message || ''}`);
    }
  };

  // Mock Storage Engine for Runtime Isolation
  class MockLocalStorageEngine {
    constructor() { this.store = {}; }
    getItem(key) { return this.store[key] || null; }
    setItem(key, value) { this.store[key] = String(value); }
    removeItem(key) { delete this.store[key]; }
    clear() { this.store = {}; }
  }

  // Test Harness Runner
  class RuntimeTestRunner {
    constructor() {
      this.results = [];
      this.passedCount = 0;
      this.failedCount = 0;
    }

    test(name, fn) {
      // Create isolated environment per test
      const mockStorage = new MockLocalStorageEngine();
      const mockAppState = {
        storageKey: 'novastars_player_state_v1',
        data: {
          xp: 2620,
          stars: 180,
          streak: 6,
          completedNodes: { 'island_1_node_1': true },
          unlockedNodes: { 'island_1_node_1': true, 'island_1_node_2': true },
          dailyQuests: [],
          user: { id: 'harry_5', name: 'Harry', grade: 5 }
        },
        saveToStorage() {
          mockStorage.setItem(this.storageKey, JSON.stringify(this.data));
        },
        subscribe(cb) {},
        setView(viewName) {
          this.data.currentView = viewName;
          this.saveToStorage();
        }
      };

      try {
        if (typeof window !== 'undefined') window.appState = mockAppState;
        if (typeof globalThis !== 'undefined') globalThis.appState = mockAppState;
        fn(mockAppState, mockStorage);
        this.results.push({ name, passed: true });
        this.passedCount++;
      } catch (err) {
        this.results.push({ name, passed: false, error: err.message, stack: err.stack });
        this.failedCount++;
      }
    }

    runAll() {
      console.log('===================================================================');
      console.log('🧪 RUNNING PRODUCTION JAVASCRIPT RUNTIME TEST SUITE');
      console.log('===================================================================\n');

      // -------------------------------------------------------------------------
      // TEST 1: ChampionshipDateService Boundary Tests
      // -------------------------------------------------------------------------
      this.test('1. ChampionshipDateService boundary tests for Asia/Ho_Chi_Minh (23:59:59 vs 00:00:01)', () => {
        const dateService = new ChampionshipDateService('Asia/Ho_Chi_Minh');

        // UTC 2026-08-24 16:59:59 -> Asia/Ho_Chi_Minh (UTC+7) is 2026-08-24 23:59:59
        const nightDate = new Date('2026-08-24T16:59:59Z');
        const nightKey = dateService.getCompetitionDateKey(nightDate);
        assert.strictEqual(nightKey, '2026-08-24', 'Boundary 23:59:59 should be 2026-08-24');

        // UTC 2026-08-24 17:00:01 -> Asia/Ho_Chi_Minh (UTC+7) is 2026-08-25 00:00:01
        const midnightDate = new Date('2026-08-24T17:00:01Z');
        const midnightKey = dateService.getCompetitionDateKey(midnightDate);
        assert.strictEqual(midnightKey, '2026-08-25', 'Boundary 00:00:01 should transition to 2026-08-25');
      });

      // -------------------------------------------------------------------------
      // TEST 2: Exact AppState Migration Test
      // -------------------------------------------------------------------------
      this.test('2. Exact AppState migration preserves existing user state & progress untouched', (appState) => {
        const repo = new LocalStorageRepository(appState);
        const stateService = new ChampionshipStateService(repo);

        stateService.ensureStateSchema();

        assert.strictEqual(appState.data.xp, 2620, 'Existing XP must be preserved');
        assert.strictEqual(appState.data.stars, 180, 'Existing Stars must be preserved');
        assert.strictEqual(appState.data.streak, 6, 'Existing Streak must be preserved');
        assert.strictEqual(appState.data.user.id, 'harry_5', 'Existing User profile must be preserved');
        assert.strictEqual(appState.data.completedNodes['island_1_node_1'], true, 'Completed nodes preserved');
        assert.strictEqual(appState.data.unlockedNodes['island_1_node_2'], true, 'Unlocked nodes preserved');
        assert.strictEqual(appState.data.championship.schemaVersion, 1, 'Championship schema v1 initialized');
      });

      // -------------------------------------------------------------------------
      // TEST 3: Daily Free Ticket Provisioned Exactly Once
      // -------------------------------------------------------------------------
      this.test('3. Daily Free Ticket provisioned exactly once per user + season + dateKey', (appState) => {
        const repo = new LocalStorageRepository(appState);
        const stateService = new ChampionshipStateService(repo);

        // Run schema sync 5 consecutive times
        stateService.ensureStateSchema();
        stateService.ensureStateSchema();
        stateService.ensureStateSchema();

        const todayKey = championshipDateService.getCompetitionDateKey();
        const dailyTickets = appState.data.championship.tickets.filter(t => t.ticketType === 'DAILY_FREE' && t.issueDate === todayKey);

        assert.strictEqual(dailyTickets.length, 1, 'Exactly one Daily Free Ticket must be provisioned for today');
        assert.strictEqual(dailyTickets[0].status, 'AVAILABLE', 'Daily Free Ticket must start in AVAILABLE status');
      });

      // -------------------------------------------------------------------------
      // TEST 4: Star Exchange Success
      // -------------------------------------------------------------------------
      this.test('4. Star exchange success: exactly 100 Stars deducted and 1 AVAILABLE ticket created', (appState) => {
        const repo = new LocalStorageRepository(appState);
        const initialStars = appState.data.stars; // 180
        const todayKey = championshipDateService.getCompetitionDateKey();

        const updatedState = repo.atomicStarToTicketExchange({
          userId: 'harry_5',
          cost: 100,
          ticketType: 'STAR_EXCHANGE',
          issueDate: todayKey
        });

        assert.strictEqual(updatedState.stars, initialStars - 100, 'Exactly 100 Stars deducted');
        const exchangeTickets = updatedState.championship.tickets.filter(t => t.ticketType === 'STAR_EXCHANGE');
        assert.strictEqual(exchangeTickets.length, 1, 'Exactly 1 STAR_EXCHANGE ticket created');
        assert.strictEqual(exchangeTickets[0].status, 'AVAILABLE', 'Exchange ticket starts in AVAILABLE status');

        const transactions = updatedState.championship.transactions.filter(tx => tx.sourceType === 'STAR_EXCHANGE');
        assert.strictEqual(transactions.length, 1, 'Exactly 1 Star transaction recorded');
        assert.strictEqual(transactions[0].amount, -100, 'Transaction amount is -100 Stars');
      });

      // -------------------------------------------------------------------------
      // TEST 5: Star Exchange Insufficient Funds
      // -------------------------------------------------------------------------
      this.test('5. Star exchange insufficient funds: zero balance mutation, no ticket, no transaction', (appState) => {
        const repo = new LocalStorageRepository(appState);
        const stateService = new ChampionshipStateService(repo);
        stateService.ensureStateSchema();

        appState.data.stars = 70; // Insufficient funds (< 100)
        const todayKey = championshipDateService.getCompetitionDateKey();

        const initialTicketsCount = (appState.data.championship && appState.data.championship.tickets) ? appState.data.championship.tickets.length : 0;
        const initialTxCount = (appState.data.championship && appState.data.championship.transactions) ? appState.data.championship.transactions.length : 0;

        assert.throws(() => {
          repo.atomicStarToTicketExchange({
            userId: 'harry_5',
            cost: 100,
            ticketType: 'STAR_EXCHANGE',
            issueDate: todayKey
          });
        }, /INSUFFICIENT_STARS/, 'Must throw INSUFFICIENT_STARS error');

        assert.strictEqual(appState.data.stars, 70, 'Stars balance must remain 70');
        assert.strictEqual(appState.data.championship.tickets.length, initialTicketsCount, 'Tickets count unmutated');
        assert.strictEqual(appState.data.championship.transactions.length, initialTxCount, 'Transactions unmutated');
      });

      // -------------------------------------------------------------------------
      // TEST 6: Atomic Exam Start
      // -------------------------------------------------------------------------
      this.test('6. Atomic Exam Start: AVAILABLE ticket -> RESERVED + one ExamAttempt created', (appState) => {
        const repo = new LocalStorageRepository(appState);
        const stateService = new ChampionshipStateService(repo);
        stateService.ensureStateSchema();

        const freeTicket = appState.data.championship.tickets[0];
        assert.strictEqual(freeTicket.status, 'AVAILABLE', 'Ticket starts AVAILABLE');

        const attempt = new ExamAttempt({
          attemptId: 'att_run_101',
          userId: 'harry_5',
          examId: 'daily_exam_1',
          ticketId: freeTicket.ticketId,
          ageGroup: 'GRADE_4_5',
          blueprintId: 'DAILY_EXAM_BLUEPRINT_GRADE_4_5'
        });

        const updatedState = repo.atomicStartExamAttempt({
          ticketId: freeTicket.ticketId,
          attempt
        });

        const updatedTicket = updatedState.championship.tickets.find(t => t.ticketId === freeTicket.ticketId);
        assert.strictEqual(updatedTicket.status, 'RESERVED', 'Ticket transitions to RESERVED');
        assert.strictEqual(updatedTicket.reservedByAttemptId, 'att_run_101', 'Ticket reservedByAttemptId linked');
        assert.strictEqual(updatedState.championship.attempts.length, 1, 'Exactly 1 ExamAttempt committed');
      });

      // -------------------------------------------------------------------------
      // TEST 7: Reload / Resume Active Reserved Attempt
      // -------------------------------------------------------------------------
      this.test('7. Reload/resume: active RESERVED attempt resumes without burning additional ticket', (appState) => {
        const repo = new LocalStorageRepository(appState);
        const stateService = new ChampionshipStateService(repo);
        stateService.ensureStateSchema();

        const freeTicket = appState.data.championship.tickets[0];
        const attempt = new ExamAttempt({
          attemptId: 'att_run_102',
          userId: 'harry_5',
          examId: 'daily_exam_1',
          ticketId: freeTicket.ticketId,
          ageGroup: 'GRADE_4_5',
          blueprintId: 'DAILY_EXAM_BLUEPRINT_GRADE_4_5'
        });
        repo.atomicStartExamAttempt({ ticketId: freeTicket.ticketId, attempt });

        // Simulate page reload: re-instantiate stateService and check active reserved attempt
        const activeRes = stateService.getActiveReservedAttempt();
        assert.notStrictEqual(activeRes, null, 'Active reserved attempt must be found on reload');
        assert.strictEqual(activeRes.attempt.attemptId, 'att_run_102', 'Same attempt ID retrieved');
        assert.strictEqual(activeRes.ticket.status, 'RESERVED', 'Ticket status remains RESERVED');
        assert.strictEqual(appState.data.championship.tickets.length, 1, 'No new ticket was created');
      });

      // -------------------------------------------------------------------------
      // TEST 8: Atomic Exam Submission & Ticket Consumption
      // -------------------------------------------------------------------------
      this.test('8. Atomic Exam Submission: ExamAttempt finalized + ExamResult persisted + Ticket CONSUMED', (appState) => {
        const repo = new LocalStorageRepository(appState);
        const stateService = new ChampionshipStateService(repo);
        stateService.ensureStateSchema();

        const freeTicket = appState.data.championship.tickets[0];
        const attempt = new ExamAttempt({
          attemptId: 'att_run_103',
          userId: 'harry_5',
          examId: 'daily_exam_1',
          ticketId: freeTicket.ticketId,
          ageGroup: 'GRADE_4_5',
          blueprintId: 'DAILY_EXAM_BLUEPRINT_GRADE_4_5'
        });
        repo.atomicStartExamAttempt({ ticketId: freeTicket.ticketId, attempt });

        const mockExamResult = {
          attemptId: 'att_run_103',
          score: 90,
          totalCorrect: 18,
          totalQuestions: 20,
          durationUsed: 800,
          autoSubmitted: false,
          competencyResults: { COMMUNICATION: { correct: 2, total: 3, accuracy: 67 } },
          strongestCompetency: 'EMOTIONAL_COMPETENCE',
          weakestCompetency: 'COMMUNICATION',
          rankEligibleXP: true
        };

        const updatedState = repo.atomicSubmitExamAttempt({
          attemptId: 'att_run_103',
          examResult: mockExamResult
        });

        const submittedAttempt = updatedState.championship.attempts.find(a => a.attemptId === 'att_run_103');
        assert.strictEqual(submittedAttempt.status, 'SUBMITTED', 'Attempt status updated to SUBMITTED');
        assert.strictEqual(submittedAttempt.score, 90, 'Score 90 persisted');

        const consumedTicket = updatedState.championship.tickets.find(t => t.ticketId === freeTicket.ticketId);
        assert.strictEqual(consumedTicket.status, 'CONSUMED', 'Ticket status updated to CONSUMED');
        assert.notStrictEqual(consumedTicket.consumedAt, null, 'consumedAt timestamp recorded');
      });

      // -------------------------------------------------------------------------
      // TEST 9: Exam Reward Crash / Retry Idempotency
      // -------------------------------------------------------------------------
      this.test('9. Exam reward crash/retry: EXAM_REWARD:{attemptId} grants XP exactly once on retries', (appState) => {
        const repo = new LocalStorageRepository(appState);
        const economyService = new ChampionshipEconomyService(repo);

        const mockResult = {
          attemptId: 'att_run_104',
          userId: 'harry_5',
          xpReward: 100,
          rankEligibleXP: true
        };

        const initialXP = appState.data.xp;

        // First attempt to process reward
        economyService.processExamRewards(mockResult);
        assert.strictEqual(appState.data.xp, initialXP + 100, '100 XP granted on first try');

        // Retry processing (e.g. after network retry or crash recovery)
        economyService.processExamRewards(mockResult);
        economyService.processExamRewards(mockResult);

        assert.strictEqual(appState.data.xp, initialXP + 100, 'XP balance must remain initialXP + 100 (zero duplicate grant)');
      });

      // -------------------------------------------------------------------------
      // TEST 10: Rank Eligibility Differentiation
      // -------------------------------------------------------------------------
      this.test('10. Rank eligibility: Daily Free Exam XP is Rank-Eligible; STAR_EXCHANGE extra exam XP is not', (appState) => {
        const repo = new LocalStorageRepository(appState);
        const economyService = new ChampionshipEconomyService(repo);

        appState.data.rankEligibleXP = 2400;

        // Daily Free Exam Result
        const freeResult = { attemptId: 'att_free_1', userId: 'harry_5', xpReward: 100, rankEligibleXP: true };
        economyService.processExamRewards(freeResult);
        assert.strictEqual(appState.data.rankEligibleXP, 2500, 'Rank eligible XP increased to 2500');

        // Star Exchange Extra Exam Result
        const starExtraResult = { attemptId: 'att_star_extra_1', userId: 'harry_5', xpReward: 100, rankEligibleXP: false };
        economyService.processExamRewards(starExtraResult);
        assert.strictEqual(appState.data.xp, 2820, 'Total XP increased to 2820');
        assert.strictEqual(appState.data.rankEligibleXP, 2500, 'Rank eligible XP remains 2500 (not increased by extra exam)');
      });

      // -------------------------------------------------------------------------
      // TEST 11: Skill Boost Per-Answer XP & 30 XP Cap
      // -------------------------------------------------------------------------
      this.test('11. Skill Boost: correct answer grants 6 XP once; repeat grants 0; 5 correct cap at 30 XP', (appState) => {
        const repo = new LocalStorageRepository(appState);
        const economyService = new ChampionshipEconomyService(repo);
        const initialXP = appState.data.xp; // 2620

        // Answer 1 correct -> +6 XP
        economyService.processSkillBoostAnswer({ userId: 'harry_5', sessionId: 's1', questionId: 'q1', isCorrect: true });
        assert.strictEqual(appState.data.xp, initialXP + 6, 'Answer 1 grants +6 XP');

        // Answer 1 repeat -> 0 XP
        economyService.processSkillBoostAnswer({ userId: 'harry_5', sessionId: 's1', questionId: 'q1', isCorrect: true });
        assert.strictEqual(appState.data.xp, initialXP + 6, 'Repeat answer 1 grants 0 XP');

        // Answer 2 incorrect -> 0 XP
        economyService.processSkillBoostAnswer({ userId: 'harry_5', sessionId: 's1', questionId: 'q2', isCorrect: false });
        assert.strictEqual(appState.data.xp, initialXP + 6, 'Incorrect answer grants 0 XP');

        // Answers 2, 3, 4, 5 correct
        economyService.processSkillBoostAnswer({ userId: 'harry_5', sessionId: 's1', questionId: 'q2', isCorrect: true });
        economyService.processSkillBoostAnswer({ userId: 'harry_5', sessionId: 's1', questionId: 'q3', isCorrect: true });
        economyService.processSkillBoostAnswer({ userId: 'harry_5', sessionId: 's1', questionId: 'q4', isCorrect: true });
        economyService.processSkillBoostAnswer({ userId: 'harry_5', sessionId: 's1', questionId: 'q5', isCorrect: true });

        assert.strictEqual(appState.data.xp, initialXP + 30, 'Total 5 correct answers cap at +30 XP total');
      });

      // -------------------------------------------------------------------------
      // TEST 12: Skill Boost Completion Stars Reward Idempotency
      // -------------------------------------------------------------------------
      this.test('12. Skill Boost completion Stars grant exactly once even after reload/reopening completion state', (appState) => {
        const repo = new LocalStorageRepository(appState);
        const economyService = new ChampionshipEconomyService(repo);
        const initialStars = appState.data.stars; // 180

        // First completion
        economyService.processSkillBoostCompletion({ userId: 'harry_5', sessionId: 's1', starsReward: 10 });
        assert.strictEqual(appState.data.stars, initialStars + 10, '+10 Stars granted on completion');

        // Reload / Re-open completion screen
        economyService.processSkillBoostCompletion({ userId: 'harry_5', sessionId: 's1', starsReward: 10 });
        economyService.processSkillBoostCompletion({ userId: 'harry_5', sessionId: 's1', starsReward: 10 });

        assert.strictEqual(appState.data.stars, initialStars + 10, 'Stars balance remains initial + 10 (zero duplicate grant)');
      });

      // -------------------------------------------------------------------------
      // TEST 13: Daily Mission Reward Atomic Claim (2/3 Fails, 3/3 Succeeds Once)
      // -------------------------------------------------------------------------
      this.test('13. Daily Mission reward: fails at 2/3 missions, succeeds once at 3/3, blocks duplicate claim', (appState) => {
        const repo = new LocalStorageRepository(appState);
        const stateService = new ChampionshipStateService(repo);
        const economyService = new ChampionshipEconomyService(repo);

        stateService.ensureStateSchema();
        const todayKey = championshipDateService.getCompetitionDateKey();

        // 1. Set 2/3 missions completed
        stateService.updateMissionProgress('dailyExamCompleted', true);
        stateService.updateMissionProgress('boostCompleted', true);

        // Attempt claim at 2/3 -> Should throw INCOMPLETE_MISSIONS
        assert.throws(() => {
          economyService.claimDailyMissionReward({ userId: 'harry_5', dateKey: todayKey, xpReward: 50, starsReward: 20 });
        }, /INCOMPLETE_MISSIONS/, 'Claim must fail at 2/3 missions');

        // 2. Set 3rd mission completed (3/3)
        stateService.updateMissionProgress('weakSpotFixed', true);

        const initialXP = appState.data.xp;
        const initialStars = appState.data.stars;

        // Attempt claim at 3/3 -> Should succeed
        economyService.claimDailyMissionReward({ userId: 'harry_5', dateKey: todayKey, xpReward: 50, starsReward: 20 });

        assert.strictEqual(appState.data.xp, initialXP + 50, '+50 XP granted');
        assert.strictEqual(appState.data.stars, initialStars + 20, '+20 Stars granted');
        assert.strictEqual(appState.data.championship.dailyMissions[todayKey].claimedReward, true, 'claimedReward marked true');

        // 3. Repeat claim -> Should throw ALREADY_CLAIMED
        assert.throws(() => {
          economyService.claimDailyMissionReward({ userId: 'harry_5', dateKey: todayKey, xpReward: 50, starsReward: 20 });
        }, /ALREADY_CLAIMED/, 'Repeat claim must fail with ALREADY_CLAIMED');
      });

      // -------------------------------------------------------------------------
      // TEST 14: Sequential Non-Overlapping Exam Attempts Allocator
      // -------------------------------------------------------------------------
      this.test('14. Question allocator: 2 sequential non-overlapping valid attempts for EACH age group', (appState) => {
        const repo = new LocalStorageRepository(appState);
        const examService = new ExamService(repo, ChampionshipQuestions);

        // --- AGE GROUP A: GRADE_1_3 (15 questions per blueprint) ---
        const bpG13 = ChampionshipConfig.examBlueprints.GRADE_1_3;
        assert.strictEqual(bpG13.questionCount, 15, 'Grade 1-3 DEMO blueprint is 15 questions');
        const poolG13 = ChampionshipQuestions.GRADE_1_3;

        // Attempt 1
        const attempt1_G13 = examService.selectQuestionsForBlueprint(bpG13, poolG13, []);
        assert.strictEqual(attempt1_G13.length, 15, 'Attempt 1 Grade 1-3 has 15 questions');

        // Attempt 2 (excluding Attempt 1 question IDs)
        const att1_G13_ids = attempt1_G13.map(q => q.id);
        const attempt2_G13 = examService.selectQuestionsForBlueprint(bpG13, poolG13, att1_G13_ids);
        assert.strictEqual(attempt2_G13.length, 15, 'Attempt 2 Grade 1-3 has 15 questions');

        // Verify ZERO overlap between Attempt 1 and Attempt 2
        const att2_G13_ids = attempt2_G13.map(q => q.id);
        const overlapG13 = att1_G13_ids.filter(id => att2_G13_ids.includes(id));
        assert.strictEqual(overlapG13.length, 0, 'Grade 1-3 Attempt 1 and Attempt 2 must be non-overlapping');

        // --- AGE GROUP B: GRADE_4_5 (20 questions per blueprint) ---
        const bpG45 = ChampionshipConfig.examBlueprints.GRADE_4_5;
        assert.strictEqual(bpG45.questionCount, 20, 'Grade 4-5 DEMO blueprint is 20 questions');
        const poolG45 = ChampionshipQuestions.GRADE_4_5;

        // Attempt 1
        const attempt1_G45 = examService.selectQuestionsForBlueprint(bpG45, poolG45, []);
        assert.strictEqual(attempt1_G45.length, 20, 'Attempt 1 Grade 4-5 has 20 questions');

        // Attempt 2 (excluding Attempt 1 question IDs)
        const att1_G45_ids = attempt1_G45.map(q => q.id);
        const attempt2_G45 = examService.selectQuestionsForBlueprint(bpG45, poolG45, att1_G45_ids);
        assert.strictEqual(attempt2_G45.length, 20, 'Attempt 2 Grade 4-5 has 20 questions');

        // Verify ZERO overlap between Attempt 1 and Attempt 2
        const att2_G45_ids = attempt2_G45.map(q => q.id);
        const overlapG45 = att1_G45_ids.filter(id => att2_G45_ids.includes(id));
        assert.strictEqual(overlapG45.length, 0, 'Grade 4-5 Attempt 1 and Attempt 2 must be non-overlapping');
      });

      // -------------------------------------------------------------------------
      // TEST 15: Blueprint Feasibility Exception Assertion
      // -------------------------------------------------------------------------
      this.test('15. Blueprint-unsatisfiable test: allocator throws INSUFFICIENT_QUESTION_POOL when deficient', (appState) => {
        const repo = new LocalStorageRepository(appState);
        const examService = new ExamService(repo, ChampionshipQuestions);

        const bp = ChampionshipConfig.examBlueprints.GRADE_4_5;
        const insufficientPool = ChampionshipQuestions.GRADE_4_5.slice(0, 5); // Only 5 questions

        assert.throws(() => {
          examService.selectQuestionsForBlueprint(bp, insufficientPool, []);
        }, /INSUFFICIENT_QUESTION_POOL/, 'Must throw INSUFFICIENT_QUESTION_POOL error');
      });

      // -------------------------------------------------------------------------
      // TEST 16: Repository Failure Simulation & Atomic Rollback
      // -------------------------------------------------------------------------
      this.test('16. Repository failure simulation: failed persistence leaves zero partial state mutations', (appState) => {
        const repo = new LocalStorageRepository(appState);
        const stateService = new ChampionshipStateService(repo);
        stateService.ensureStateSchema();

        const initialXP = appState.data.xp;
        const initialStars = appState.data.stars;
        const initialTicketsCount = appState.data.championship.tickets.length;

        // Simulate mutator throwing an error halfway through a multi-step operation
        assert.throws(() => {
          repo.updateStateAtomic((draft) => {
            draft.stars += 500;
            draft.xp += 1000;
            draft.championship.tickets.push({ ticketId: 'fake_ticket' });
            throw new Error("DATABASE_DISK_FULL_SIMULATION");
          });
        }, /DATABASE_DISK_FULL_SIMULATION/, 'Exception expected from mutator');

        // Verify live state remains 100% unmutated
        assert.strictEqual(appState.data.stars, initialStars, 'Stars unmutated');
        assert.strictEqual(appState.data.xp, initialXP, 'XP unmutated');
        assert.strictEqual(appState.data.championship.tickets.length, initialTicketsCount, 'Tickets unmutated');
      });

      // -------------------------------------------------------------------------
      // SEMANTIC INTEGRITY TEST 17: Canonical Competency Taxonomy Object Purity
      // -------------------------------------------------------------------------
      this.test('17. Semantic Guard: Canonical NVSCompetencies object purity (sorted keys === NL1..NL7, zero legacy properties)', () => {
        const canonicalKeys = Object.keys(NVSCompetencies).sort();
        const expectedNLs = ['NL1', 'NL2', 'NL3', 'NL4', 'NL5', 'NL6', 'NL7'];
        assert.strictEqual(canonicalKeys.length, 7, 'Object.keys(NVSCompetencies) length must be 7');
        assert.strictEqual(JSON.stringify(canonicalKeys), JSON.stringify(expectedNLs), 'Keys must equal exactly NL1..NL7 sorted');

        const legacyProperties = [
          'EMOTIONAL_COMPETENCE', 'PROBLEM_SOLVING', 'SELF_MANAGEMENT',
          'TECHNOLOGY', 'GLOBAL_RESPONSIBILITY', 'LEADERSHIP', 'COMMUNICATION'
        ];
        legacyProperties.forEach(prop => {
          assert.strictEqual(NVSCompetencies[prop], undefined, `Legacy property ${prop} must be undefined on canonical NVSCompetencies object`);
        });
      });

      // -------------------------------------------------------------------------
      // SEMANTIC INTEGRITY TEST 18: Ban Pseudo-Core Competency IDs
      // -------------------------------------------------------------------------
      this.test('18. Semantic Guard: No question or blueprint uses pseudo-core competency IDs', () => {
        const bannedKeys = ['PROBLEM_SOLVING', 'SELF_MANAGEMENT', 'LEADERSHIP', 'EMOTIONAL_COMPETENCE', 'TECHNOLOGY', 'GLOBAL_RESPONSIBILITY', 'COMMUNICATION'];

        // Check blueprints
        Object.values(ChampionshipConfig.examBlueprints).forEach(bp => {
          bannedKeys.forEach(key => {
            assert.strictEqual(bp.competencyDistribution[key], undefined, `Banned key ${key} must NOT exist in blueprint ${bp.blueprintId}`);
          });
        });

        // Check questions
        const allQuestions = [...ChampionshipQuestions.GRADE_1_3, ...ChampionshipQuestions.GRADE_4_5];
        allQuestions.forEach(q => {
          bannedKeys.forEach(key => {
            assert.notStrictEqual(q.primaryCompetencyId, key, `Question ${q.id} primaryCompetencyId must NOT be ${key}`);
            if (Array.isArray(q.linkedCompetencyIds)) {
              assert.strictEqual(q.linkedCompetencyIds.includes(key), false, `Question ${q.id} linkedCompetencyIds must NOT contain ${key}`);
            }
          });
        });
      });

      // -------------------------------------------------------------------------
      // SEMANTIC INTEGRITY TEST 19: Blueprint Distribution Exact Sums
      // -------------------------------------------------------------------------
      this.test('19. Semantic Guard: Every blueprint uses only NL1–NL7 and distribution sums to questionCount', () => {
        const validNLs = new Set(['NL1', 'NL2', 'NL3', 'NL4', 'NL5', 'NL6', 'NL7']);

        Object.values(ChampionshipConfig.examBlueprints).forEach(bp => {
          let sum = 0;
          Object.entries(bp.competencyDistribution).forEach(([compId, count]) => {
            assert.strictEqual(validNLs.has(compId), true, `Blueprint ${bp.blueprintId} contains invalid competency ID ${compId}`);
            sum += count;
          });
          assert.strictEqual(sum, bp.questionCount, `Blueprint ${bp.blueprintId} distribution sum [${sum}] must match questionCount [${bp.questionCount}]`);
        });
      });

      // -------------------------------------------------------------------------
      // SEMANTIC INTEGRITY TEST 20: Governance Guard — DEMO_UNMAPPED Items Unscoring
      // -------------------------------------------------------------------------
      this.test('20. Semantic Guard: Every DEMO_UNMAPPED question fixture has eligibleForOfficialScoring === false', () => {
        const allQuestions = [...ChampionshipQuestions.GRADE_1_3, ...ChampionshipQuestions.GRADE_4_5];
        allQuestions.forEach(q => {
          if (q.contentStatus === 'DEMO_UNMAPPED') {
            assert.strictEqual(q.eligibleForOfficialScoring, false, `Question ${q.id} DEMO_UNMAPPED item must have eligibleForOfficialScoring === false`);
          }
        });
      });

      // -------------------------------------------------------------------------
      // SEMANTIC INTEGRITY TEST 21: Governance Guard — APPROVED Items Indicator Rule
      // -------------------------------------------------------------------------
      this.test('21. Semantic Guard: No question marked APPROVED can have indicatorId === null', () => {
        const allQuestions = [...ChampionshipQuestions.GRADE_1_3, ...ChampionshipQuestions.GRADE_4_5];
        allQuestions.forEach(q => {
          if (q.mappingStatus === 'APPROVED') {
            assert.notStrictEqual(q.indicatorId, null, `Question ${q.id} marked APPROVED cannot have null indicatorId`);
          }
        });
      });

      // -------------------------------------------------------------------------
      // SEMANTIC INTEGRITY TEST 22: Linked Competency Guard
      // -------------------------------------------------------------------------
      this.test('22. Semantic Guard: Every linked competency differs from primaryCompetencyId and is a valid NL1–NL7 ID', () => {
        const validNLs = new Set(['NL1', 'NL2', 'NL3', 'NL4', 'NL5', 'NL6', 'NL7']);
        const allQuestions = [...ChampionshipQuestions.GRADE_1_3, ...ChampionshipQuestions.GRADE_4_5];

        allQuestions.forEach(q => {
          assert.strictEqual(validNLs.has(q.primaryCompetencyId), true, `Question ${q.id} has invalid primaryCompetencyId: ${q.primaryCompetencyId}`);
          if (Array.isArray(q.linkedCompetencyIds)) {
            q.linkedCompetencyIds.forEach(linked => {
              assert.strictEqual(validNLs.has(linked), true, `Question ${q.id} linkedCompetencyId ${linked} must be valid NL1..NL7`);
              assert.notStrictEqual(linked, q.primaryCompetencyId, `Question ${q.id} linkedCompetencyId ${linked} must NOT equal primaryCompetencyId`);
            });
          }
        });
      });

      // -------------------------------------------------------------------------
      // SEMANTIC INTEGRITY TEST 23: Metadata Separation Guard
      // -------------------------------------------------------------------------
      this.test('23. Semantic Guard: NVSCompetencies separates official canonical fields from presentation metadata', () => {
        Object.values(NVSCompetencies).forEach(comp => {
          assert.notStrictEqual(comp.id, undefined, 'Official id required');
          assert.notStrictEqual(comp.code, undefined, 'Official code required');
          assert.notStrictEqual(comp.officialNameVi, undefined, 'Official officialNameVi required');
          assert.notStrictEqual(comp.displayName, undefined, 'Presentation displayName required');
          assert.notStrictEqual(comp.englishDisplayName, undefined, 'Presentation englishDisplayName required');
        });
      });

      // -------------------------------------------------------------------------
      // INTEGRATION TEST 24: Ticket Type Rank Eligibility & Exact Ticket Consumption
      // -------------------------------------------------------------------------
      this.test('24. Integration: DAILY_FREE is rankEligible, STAR_EXCHANGE is NOT rankEligible, exact ticket consumed', (appState) => {
        const repo = new LocalStorageRepository(appState);
        const stateService = new ChampionshipStateService(repo);
        const economyService = new ChampionshipEconomyService(repo);
        const controller = new ChampionshipExamController({ repository: repo, stateService, economyService, questionsData: ChampionshipQuestions });

        // 1. DAILY_FREE ticket attempt
        const res1 = controller.startExam(4);
        assert.strictEqual(res1.rankEligible, true, 'DAILY_FREE attempt must be rankEligible');
        assert.strictEqual(res1.attempt.rankEligible, true, 'Attempt entity stores rankEligible = true');

        const submit1 = controller.submitExam(false);
        assert.strictEqual(submit1.attempt.status, 'COMPLETED', 'Attempt completed');
        const consumedTicket1 = appState.data.championship.tickets.find(t => t.ticketId === res1.ticket.ticketId);
        assert.strictEqual(consumedTicket1.status, 'CONSUMED', 'DAILY_FREE ticket marked CONSUMED');

        // 2. STAR_EXCHANGE ticket attempt
        repo.updateStateAtomic(draft => { draft.stars = 150; });
        const exchangeRes = economyService.exchangeStarsForTicket({ userId: 'harry_5' });
        const starTicketId = exchangeRes.ticket.ticketId;

        const res2 = controller.startExam(4, starTicketId);
        assert.strictEqual(res2.rankEligible, false, 'STAR_EXCHANGE attempt must NOT be rankEligible');
        assert.strictEqual(res2.attempt.rankEligible, false, 'Attempt entity stores rankEligible = false');

        const submit2 = controller.submitExam(false);
        const consumedTicket2 = appState.data.championship.tickets.find(t => t.ticketId === starTicketId);
        assert.strictEqual(consumedTicket2.status, 'CONSUMED', 'STAR_EXCHANGE ticket marked CONSUMED');
      });

      // -------------------------------------------------------------------------
      // INTEGRATION TEST 25: Active-Exam Concurrency Prevention
      // -------------------------------------------------------------------------
      this.test('25. Integration: Active-exam concurrency prevention returns RESUME_REQUIRED without re-burning tickets', (appState) => {
        const repo = new LocalStorageRepository(appState);
        const stateService = new ChampionshipStateService(repo);
        const controller = new ChampionshipExamController({ repository: repo, stateService, questionsData: ChampionshipQuestions });

        // Start exam 1
        const res1 = controller.startExam(4);
        const initialTicketCount = appState.data.championship.tickets.length;

        // Try to start exam 2 while exam 1 is still active
        const res2 = controller.startExam(4);
        assert.strictEqual(res2.status, 'RESUME_REQUIRED', 'Second startExam must return RESUME_REQUIRED');
        assert.strictEqual(res2.attempt.attemptId, res1.attempt.attemptId, 'Returns existing active attempt');
        assert.strictEqual(appState.data.championship.tickets.length, initialTicketCount, 'Zero tickets burned on duplicate start');
      });

      // -------------------------------------------------------------------------
      // INTEGRATION TEST 26: Attempt 1 -> Attempt 2 Controller No-Repeat Policy
      // -------------------------------------------------------------------------
      this.test('26. Integration: Sequential exams started through ExamController satisfy no-repeat policy', (appState) => {
        const repo = new LocalStorageRepository(appState);
        const stateService = new ChampionshipStateService(repo);
        const economyService = new ChampionshipEconomyService(repo);
        const controller = new ChampionshipExamController({ repository: repo, stateService, economyService, questionsData: ChampionshipQuestions });

        // Attempt 1
        const res1 = controller.startExam(4);
        const qIds1 = res1.questions.map(q => q.id);
        controller.submitExam(false);

        // Provision extra ticket for Attempt 2
        repo.updateStateAtomic(draft => { draft.stars = 100; });
        const exRes = economyService.exchangeStarsForTicket({ userId: 'harry_5' });

        // Attempt 2
        const res2 = controller.startExam(4, exRes.ticket.ticketId);
        const qIds2 = res2.questions.map(q => q.id);

        const overlaps = qIds1.filter(id => qIds2.includes(id));
        assert.strictEqual(overlaps.length, 0, 'Sequential attempts through controller must have 0 overlapping questions');
      });

      // -------------------------------------------------------------------------
      // INTEGRATION TEST 27: Full Exam Rehydration, Position Tracking & Expired Auto-Submit
      // -------------------------------------------------------------------------
      this.test('27. Integration: Full exam rehydration after reload & position tracking & expired auto-submit', (appState) => {
        const repo = new LocalStorageRepository(appState);
        const stateService = new ChampionshipStateService(repo);
        const controller = new ChampionshipExamController({ repository: repo, stateService, questionsData: ChampionshipQuestions });

        // Start exam
        const { attempt } = controller.startExam(4);
        controller.saveAnswer(attempt.questions[0].id, 'A', 0);
        controller.updateCurrentQuestionPosition(1, attempt.questions[1].id);

        // Simulate reload: create fresh controller
        const reloadedController = new ChampionshipExamController({ repository: repo, stateService, questionsData: ChampionshipQuestions });
        const resumed = reloadedController.resumeActiveExam();

        assert.strictEqual(resumed.attempt.attemptId, attempt.attemptId, 'Rehydrated attempt ID matches');
        assert.strictEqual(resumed.answers[attempt.questions[0].id], 'A', 'Saved answer rehydrated correctly');
        assert.strictEqual(resumed.currentQuestionIndex, 1, 'Question position rehydrated to index 1');

        // Expire exam in state
        repo.updateStateAtomic(draft => {
          const att = draft.championship.attempts.find(a => a.attemptId === attempt.attemptId);
          if (att) att.startedAtTimestamp = Date.now() - 1300 * 1000;
        });

        // Resume expired exam triggers auto-submit
        const expiredResumed = reloadedController.resumeActiveExam();
        assert.strictEqual(expiredResumed.attempt.status, 'COMPLETED', 'Expired resumed exam auto-submits');
        assert.strictEqual(expiredResumed.examResult.autoSubmitted, true, 'autoSubmitted flag is true');
      });

      // -------------------------------------------------------------------------
      // INTEGRATION TEST 28: Skill Boost Resume & Reward Idempotency
      // -------------------------------------------------------------------------
      this.test('28. Integration: Skill Boost session resume restores position & prevents duplicate XP / Stars', (appState) => {
        const repo = new LocalStorageRepository(appState);
        const controller = new ChampionshipTrainingController({ repository: repo, questionsData: ChampionshipQuestions });

        // Start Skill Boost
        const { session, questions } = controller.startSkillBoost('NL4', 'GRADE_4_5');
        controller.submitAnswer(questions[0].id, questions[0].correctAnswer);

        // Reload controller & resume
        const freshController = new ChampionshipTrainingController({ repository: repo, questionsData: ChampionshipQuestions });
        const resumed = freshController.resumeActiveSkillBoost();

        assert.strictEqual(resumed.session.sessionId, session.sessionId, 'Resumed Skill Boost session ID matches');
        assert.strictEqual(resumed.currentQuestionIndex, 1, 'Restores current question position (1 answered)');
        assert.strictEqual(resumed.nextQuestion.id, questions[1].id, 'Next question is index 1');

        // Submitting answered question gives duplicate warning and 0 XP
        const dupRes = freshController.submitAnswer(questions[0].id, questions[0].correctAnswer);
        assert.strictEqual(dupRes.isAlreadyAnswered, true, 'Answer marked as already answered');
        assert.strictEqual(dupRes.xpGranted, 0, 'Duplicate answer grants 0 XP');

        // Completion rewards 10 Stars once
        const initialStars = appState.data.stars;
        const comp = freshController.completeSkillBoost();
        assert.strictEqual(comp.starsEarned, 10, 'Completion awards 10 Stars');
        assert.strictEqual(appState.data.stars, initialStars + 10, 'Stars updated in state');
      });

      // -------------------------------------------------------------------------
      // INTEGRATION TEST 29: Scoring Boundary & Official Mastery Exclusion
      // -------------------------------------------------------------------------
      this.test('29. Integration: Linked competency excluded from scoring & demo items excluded from Official Mastery', (appState) => {
        const repo = new LocalStorageRepository(appState);
        const examService = new ExamService(repo, ChampionshipQuestions);
        const analytics = new ChampionshipAnalyticsEngine(repo);

        const mockQuestions = [
          { id: 'q1', primaryCompetencyId: 'NL1', linkedCompetencyIds: ['NL2'], correctAnswer: 'A', eligibleForOfficialScoring: false },
          { id: 'q2', primaryCompetencyId: 'NL1', linkedCompetencyIds: ['NL3'], correctAnswer: 'B', eligibleForOfficialScoring: false }
        ];

        const evalRes = examService.evaluateAttemptAnswers({
          attemptId: 'att_test_boundary',
          answers: { q1: 'A', q2: 'A' },
          questions: mockQuestions
        });

        assert.notStrictEqual(evalRes.competencyResults.NL1, undefined, 'Primary competency NL1 evaluated');
        assert.strictEqual(evalRes.competencyResults.NL2, undefined, 'Linked competency NL2 excluded from scoring');
        assert.strictEqual(evalRes.competencyResults.NL3, undefined, 'Linked competency NL3 excluded from scoring');

        const official = analytics.evaluateOfficialMastery(evalRes);
        assert.strictEqual(official.isOfficial, false, 'Official mastery evaluates isOfficial = false for demo items');
        assert.strictEqual(official.officialReadinessScore, null, 'Official readiness score is null for demo items');
      });

      // -------------------------------------------------------------------------
      // INTEGRATION TEST 30: Strengthened Analytics Event Payload Schema Contract
      // -------------------------------------------------------------------------
      this.test('30. Integration: Analytics event payload validation for required telemetry fields', (appState) => {
        const repo = new LocalStorageRepository(appState);
        const analytics = new ChampionshipAnalyticsEngine(repo);
        const controller = new ChampionshipExamController({ repository: repo, analyticsEngine: analytics, questionsData: ChampionshipQuestions });

        controller.startExam(4);
        const event = analytics.analyticsEventsLog.find(e => e.eventName === ChampionshipAnalyticsEvents.EXAM_STARTED);

        assert.notStrictEqual(event, undefined, 'EXAM_STARTED event logged');
        assert.notStrictEqual(event.payload.userId, undefined, 'Payload includes userId');
        assert.notStrictEqual(event.payload.seasonId, undefined, 'Payload includes seasonId');
        assert.notStrictEqual(event.payload.attemptId, undefined, 'Payload includes attemptId');
        assert.notStrictEqual(event.payload.ticketId, undefined, 'Payload includes ticketId');
        assert.notStrictEqual(event.payload.ticketType, undefined, 'Payload includes ticketType');
        assert.strictEqual(typeof event.payload.rankEligible, 'boolean', 'Payload includes boolean rankEligible');
        assert.notStrictEqual(event.payload.ageGroup, undefined, 'Payload includes ageGroup');
        assert.strictEqual(event.payload.questionCount, 20, 'Payload includes questionCount = 20 for Grade 4');
      });

      // -------------------------------------------------------------------------
      // INTEGRATION TEST 31: Real Boot Recovery (Resumes Exam, Expired Exam, Skill Boost)
      // -------------------------------------------------------------------------
      this.test('31. Gate 3A: Boot recovery resumes active exam / auto-submits expired exam / resumes Skill Boost', (appState) => {
        window.appState = appState;
        
        // 1. Boot recovery with active exam
        const app1 = new AppController();
        app1.init();
        app1.startExamFromReadyUI(4);
        app1.nextExamQuestionUI(); // move to index 1

        // Simulate reload during active exam
        const app2 = new AppController();
        app2.init(); // bootRecovery() called inside init()
        assert.strictEqual(appState.data.currentView, 'championship_exam_question', 'Boot recovery automatically resumes exam view');
        assert.strictEqual(app2.examController.currentAttempt.currentQuestionIndex, 1, 'Boot recovery restores question index 1');

        // 2. Boot recovery with expired exam -> auto-submits & navigates to result
        appState.data.championship.attempts[0].startedAtTimestamp = Date.now() - 1300 * 1000;
        const app3 = new AppController();
        app3.init();
        assert.strictEqual(appState.data.currentView, 'championship_exam_result', 'Expired exam auto-submits & navigates to Practice Result');

        // 3. Boot recovery with active Skill Boost
        appState.data.championship.attempts = []; // clear attempts
        const app4 = new AppController();
        app4.init();
        app4.startSkillBoostSessionUI('NL4');

        const app5 = new AppController();
        app5.init();
        assert.strictEqual(appState.data.currentView, 'championship_skill_boost_question', 'Boot recovery resumes active Skill Boost question view');
      });

      // -------------------------------------------------------------------------
      // INTEGRATION TEST 32: Persisted State Rendering (No Transient Window Data)
      // -------------------------------------------------------------------------
      this.test('32. Gate 3A: Practice Result & Skill Boost Complete render directly from persisted repository state', (appState) => {
        window.appState = appState;
        const app = new AppController();
        app.init();

        // Start & submit exam
        app.startExamFromReadyUI(4);
        app.examController.submitExam(false);

        // Clear transient global variables
        delete window.lastExamSubmitResult;

        // Render Practice Result view directly
        app.navigateTo('championship_exam_result');
        assert.strictEqual(appState.data.currentView, 'championship_exam_result', 'Navigates to exam result');
        const viewHTML = ChampionshipViews.renderExamResult();
        assert.strictEqual(viewHTML.includes('Kết Quả Thi Thử'), true, 'Renders exam result from persisted attempt state');

        // Start & complete Skill Boost
        app.startSkillBoostSessionUI('NL4');
        app.trainingController.completeSkillBoost();
        delete window.lastSkillBoostCompletion;

        const completeHTML = ChampionshipViews.renderSkillBoostComplete();
        assert.strictEqual(completeHTML.includes('Xuất Sắc Hoàn Thành!'), true, 'Renders Skill Boost complete from persisted session state');
      });

      // -------------------------------------------------------------------------
      // INTEGRATION TEST 33: Explicit Error Handling for Missing Grade / Competency
      // -------------------------------------------------------------------------
      this.test('33. Gate 3A: Missing grade or missing competency produces explicit error, never silent default', (appState) => {
        window.appState = appState;
        delete appState.data.user.grade; // clear grade

        const app = new AppController();
        app.init();

        // Attempting startExam without grade returns INVALID_GRADE
        const res = app.examController.startExam(null);
        assert.strictEqual(res.status, 'INVALID_GRADE', 'Returns INVALID_GRADE status when grade is missing');

        // ChampionshipViews.renderExamDetail shows explicit error box
        const detailHTML = ChampionshipViews.renderExamDetail();
        assert.strictEqual(detailHTML.includes('Chưa Thiết Lập Khối Lớp'), true, 'Displays explicit error for missing grade');

        // Missing competency in Skill Boost intro shows error
        const boostHTML = ChampionshipViews.renderSkillBoostIntro(null);
        assert.strictEqual(boostHTML.includes('MISSING_COMPETENCY'), true, 'Displays explicit error for missing competency');
      });

      // -------------------------------------------------------------------------
      // INTEGRATION TEST 34: Leave Exam Flow
      // -------------------------------------------------------------------------
      this.test('34. Gate 3A: Leave Exam preserves attempt as IN_PROGRESS, preserves ticket & keeps timer running', (appState) => {
        window.appState = appState;
        const app = new AppController();
        app.init();

        app.startExamFromReadyUI(4);
        const attemptId = app.examController.currentAttempt.attemptId;

        // Trigger leave exam
        const leaveRes = app.examController.leaveExam();
        assert.strictEqual(leaveRes.status, 'PAUSED', 'leaveExam returns PAUSED status');

        const stateAttempt = appState.data.championship.attempts.find(a => a.attemptId === attemptId);
        assert.strictEqual(stateAttempt.status, 'IN_PROGRESS', 'Attempt status preserved as IN_PROGRESS');

        const stateTicket = appState.data.championship.tickets.find(t => t.ticketId === stateAttempt.ticketId);
        assert.strictEqual(stateTicket.status, 'RESERVED', 'Ticket status preserved as RESERVED');
      });

      // -------------------------------------------------------------------------
      // INTEGRATION TEST 35: Explicit Response Statuses from ExamController
      // -------------------------------------------------------------------------
      this.test('35. Gate 3A: ExamController returns explicit response statuses (STARTED, RESUME_REQUIRED, NO_ELIGIBLE_TICKET)', (appState) => {
        window.appState = appState;
        const repo = new LocalStorageRepository(appState);
        const controller = new ChampionshipExamController({ repository: repo, questionsData: ChampionshipQuestions });

        // 1. Normal start
        const res1 = controller.startExam(4);
        assert.strictEqual(res1.status, 'STARTED', 'Returns STARTED status');

        // 2. Duplicate start while active
        const res2 = controller.startExam(4);
        assert.strictEqual(res2.status, 'RESUME_REQUIRED', 'Returns RESUME_REQUIRED status');

        // Submit exam
        controller.submitExam(false);

        // 3. Start without ticket
        const res3 = controller.startExam(4);
        assert.strictEqual(res3.status, 'NO_ELIGIBLE_TICKET', 'Returns NO_ELIGIBLE_TICKET when ticket consumed');
      });

      // -------------------------------------------------------------------------
      // INTEGRATION TEST 36: Fail-Safe Lazy Championship Initialization
      // -------------------------------------------------------------------------
      this.test('36. Gate 3A: Base Home/Map/Profile still boot if Championship module initialization fails', (appState) => {
        window.appState = appState;
        const app = new AppController();
        
        // Intentionally simulate broken repository initialization
        app.initChampionshipControllers = function() {
          throw new Error("Simulated Championship loading failure");
        };

        // Base app init should succeed without throwing
        app.init();
        app.navigateTo('home');
        assert.strictEqual(appState.data.currentView, 'home', 'Base Home boots successfully despite Championship init failure');

        app.navigateTo('map');
        assert.strictEqual(appState.data.currentView, 'map', 'Base Map boots successfully');
      });

      // -------------------------------------------------------------------------
      // INTEGRATION TEST 37: Immediate Submission Before Processing Delay
      // -------------------------------------------------------------------------
      this.test('37. Gate 3A: Tap Submit immediately persists completed attempt before processing transition completes', (appState) => {
        window.appState = appState;
        const app = new AppController();
        app.init();

        app.startExamFromReadyUI(4);
        const attemptId = app.examController.currentAttempt.attemptId;

        // Call submitExamFinalUI() which immediately executes atomic submitExam(false)
        app.submitExamFinalUI();

        // Check persisted state BEFORE setTimeout processing transition completes
        const attempt = appState.data.championship.attempts.find(a => a.attemptId === attemptId);
        assert.strictEqual(attempt.status, 'COMPLETED', 'Attempt is COMPLETED immediately');
        assert.notStrictEqual(attempt.examResult, undefined, 'ExamResult persisted immediately');

        // Reload immediately during processing view
        const reloadedApp = new AppController();
        reloadedApp.init();

        const latest = reloadedApp.stateService.getLatestCompletedAttempt();
        assert.strictEqual(latest.attemptId, attemptId, 'Completed attempt rehydrates on reload');
        assert.strictEqual(latest.status, 'COMPLETED', 'Reloaded attempt is COMPLETED, never IN_PROGRESS');
      });

      // Print summary
      console.log('\n===================================================================');
      console.log(`📊 JAVASCRIPT RUNTIME TEST RESULTS: ${this.passedCount}/${this.results.length} PASSED`);
      console.log('===================================================================\n');

      return {
        total: this.results.length,
        passed: this.passedCount,
        failed: this.failedCount,
        results: this.results
      };
    }
  }

  exports.RuntimeTestRunner = RuntimeTestRunner;
  if (typeof window !== 'undefined') window.RuntimeTestRunner = RuntimeTestRunner;
  if (typeof globalThis !== 'undefined') globalThis.RuntimeTestRunner = RuntimeTestRunner;

})(typeof exports !== 'undefined' ? exports : (window.RuntimeTestRunnerSuite = {}));

