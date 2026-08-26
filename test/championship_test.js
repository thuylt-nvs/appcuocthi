/* ==========================================================================
   NovaStars / Antigravity — Automated Unit & Integration Test Suite
   REVIEW GATE 1 Validation for Steps 1–4
   ========================================================================== */

const assert = require('assert');

// Mock localStorage for Node.js environment
class MockLocalStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) { return this.store[key] || null; }
  setItem(key, value) { this.store[key] = String(value); }
  removeItem(key) { delete this.store[key]; }
  clear() { this.store = {}; }
}
global.localStorage = new MockLocalStorage();

// Mock AppState for Node.js environment
class MockAppState {
  constructor() {
    this.storageKey = 'novastars_player_state_v1';
    this.data = {
      xp: 2620,
      stars: 180,
      streak: 6,
      completedNodes: { 'island_1_node_1': true },
      user: { id: 'harry_5', name: 'Harry', grade: 5 }
    };
  }
  saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.data));
  }
}
global.appState = new MockAppState();

// Load Step 1-4 Modules
const { NVSCompetencies, getNVSCompetency } = require('../js/core/nvs_competency.js');
const { ChampionshipDateService } = require('../js/services/championship_date_service.js');
const { ChampionshipConfig } = require('../js/config/championship_config.js');
const { TicketStatus, AttemptStatus, ExamTicket, ExamAttempt } = require('../js/core/championship_models.js');
const { ChampionshipQuestions } = require('../js/data/championship_questions.js');
const { LocalStorageRepository } = require('../js/services/local_storage_repository.js');
const { ChampionshipEconomyService } = require('../js/services/championship_economy_service.js');
const { ExamService } = require('../js/services/exam_service.js');
const { ChampionshipStateService } = require('../js/services/championship_state_service.js');

console.log('===================================================================');
console.log('🧪 RUNNING REVIEW GATE 1 AUTOMATED TEST SUITE (STEPS 1–4)');
console.log('===================================================================\n');

let passedTests = 0;
let totalTests = 0;

function runTest(testName, testFn) {
  totalTests++;
  try {
    testFn();
    console.log(`  ✅ PASSED: ${testName}`);
    passedTests++;
  } catch (error) {
    console.error(`  ❌ FAILED: ${testName}`);
    console.error(`     Error: ${error.message}\n`);
  }
}

// -------------------------------------------------------------------------
// TEST GROUP 1: Canonical NVS Competencies & Date Service
// -------------------------------------------------------------------------
runTest('1.1 Canonical NVS Competencies taxonomy completeness', () => {
  assert.strictEqual(Object.keys(NVSCompetencies).length, 7);
  assert.strictEqual(getNVSCompetency('EMOTIONAL_COMPETENCE').name, 'Nhận Thức & Cảm Xúc');
  assert.strictEqual(getNVSCompetency('COMMUNICATION').englishName, 'Communication');
  assert.strictEqual(getNVSCompetency('NON_EXISTENT').id, 'NON_EXISTENT'); // Fallback
});

runTest('1.2 Competition-Local Date Service format & midnight calculation', () => {
  const dateService = new ChampionshipDateService('Asia/Ho_Chi_Minh');
  const dateKey = dateService.getCompetitionDateKey();
  assert.strictEqual(typeof dateKey, 'string');
  assert.strictEqual(dateKey.length, 10);
  assert.strictEqual(dateKey.includes('-'), true);
  assert.strictEqual(dateService.isToday(dateKey), true);
});

// -------------------------------------------------------------------------
// TEST GROUP 2: Grade Validation & Blueprint Feasibility
// -------------------------------------------------------------------------
runTest('2.1 Grade validation explicitly maps 1-3 to GRADE_1_3 and 4-5 to GRADE_4_5', () => {
  assert.strictEqual(ChampionshipConfig.resolveAgeGroup(1), 'GRADE_1_3');
  assert.strictEqual(ChampionshipConfig.resolveAgeGroup(3), 'GRADE_1_3');
  assert.strictEqual(ChampionshipConfig.resolveAgeGroup(4), 'GRADE_4_5');
  assert.strictEqual(ChampionshipConfig.resolveAgeGroup(5), 'GRADE_4_5');
  assert.throws(() => ChampionshipConfig.resolveAgeGroup(6), /UNSUPPORTED_GRADE/);
  assert.throws(() => ChampionshipConfig.resolveAgeGroup('K'), /UNSUPPORTED_GRADE/);
});

runTest('2.2 ExamBlueprint feasibility validation & question selection', () => {
  const repo = new LocalStorageRepository(global.appState);
  const examService = new ExamService(repo, ChampionshipQuestions);
  const blueprint = ChampionshipConfig.examBlueprints.GRADE_4_5;
  const pool = ChampionshipQuestions.GRADE_4_5;

  assert.strictEqual(examService.validateBlueprintFeasibility(blueprint, pool), true);

  const selected = examService.selectQuestionsForBlueprint(blueprint, pool, []);
  assert.strictEqual(selected.length, blueprint.questionCount);

  // Verify pool deficit error
  const smallPool = pool.slice(0, 5);
  assert.throws(() => examService.validateBlueprintFeasibility(blueprint, smallPool), /INSUFFICIENT_QUESTION_POOL/);
});

// -------------------------------------------------------------------------
// TEST GROUP 3: Atomic Repository Operations & Lifecycle
// -------------------------------------------------------------------------
runTest('3.1 Atomic Star-to-Ticket Exchange (valid balance -> deducts 100 stars + creates ticket)', () => {
  const repo = new LocalStorageRepository(global.appState);
  const initialStars = global.appState.data.stars; // 180

  const updatedState = repo.atomicStarToTicketExchange({
    userId: 'harry_5',
    cost: 100,
    ticketType: 'STAR_EXCHANGE',
    issueDate: '2026-08-24'
  });

  assert.strictEqual(updatedState.stars, initialStars - 100);
  assert.strictEqual(updatedState.championship.tickets.length, 1);
  assert.strictEqual(updatedState.championship.tickets[0].ticketType, 'STAR_EXCHANGE');
  assert.strictEqual(updatedState.championship.tickets[0].status, 'AVAILABLE');

  // Verify failure on insufficient stars
  assert.throws(() => repo.atomicStarToTicketExchange({
    userId: 'harry_5',
    cost: 500,
    ticketType: 'STAR_EXCHANGE',
    issueDate: '2026-08-24'
  }), /INSUFFICIENT_STARS/);
});

runTest('3.2 Atomic Exam Start & Ticket Reservation', () => {
  const repo = new LocalStorageRepository(global.appState);
  const ticket = global.appState.data.championship.tickets[0];

  const attempt = new ExamAttempt({
    attemptId: 'att_101',
    userId: 'harry_5',
    examId: 'daily_exam_1',
    ticketId: ticket.ticketId,
    ageGroup: 'GRADE_4_5',
    blueprintId: 'DAILY_EXAM_BLUEPRINT_GRADE_4_5'
  });

  const updatedState = repo.atomicStartExamAttempt({
    ticketId: ticket.ticketId,
    attempt
  });

  const updatedTicket = updatedState.championship.tickets.find(t => t.ticketId === ticket.ticketId);
  assert.strictEqual(updatedTicket.status, 'RESERVED');
  assert.strictEqual(updatedTicket.reservedByAttemptId, 'att_101');
  assert.strictEqual(updatedState.championship.attempts.length, 1);
});

runTest('3.3 Atomic Exam Submission & Ticket Consumption', () => {
  const repo = new LocalStorageRepository(global.appState);
  const attemptId = 'att_101';

  const mockExamResult = {
    attemptId,
    score: 85,
    totalCorrect: 17,
    totalQuestions: 20,
    durationUsed: 650,
    autoSubmitted: false,
    competencyResults: { COMMUNICATION: { correct: 2, total: 3, accuracy: 67 } },
    strongestCompetency: 'EMOTIONAL_COMPETENCE',
    weakestCompetency: 'COMMUNICATION',
    rankEligibleXP: false
  };

  const updatedState = repo.atomicSubmitExamAttempt({
    attemptId,
    examResult: mockExamResult
  });

  const submittedAttempt = updatedState.championship.attempts.find(a => a.attemptId === attemptId);
  assert.strictEqual(submittedAttempt.status, 'SUBMITTED');
  assert.strictEqual(submittedAttempt.score, 85);

  const consumedTicket = updatedState.championship.tickets.find(t => t.ticketId === submittedAttempt.ticketId);
  assert.strictEqual(consumedTicket.status, 'CONSUMED');
});

// -------------------------------------------------------------------------
// TEST GROUP 4: Idempotent Ledger Economy Service & Schema Migration
// -------------------------------------------------------------------------
runTest('4.1 Idempotent Ledger Economy Service (prevents duplicate XP/Stars grants)', () => {
  const repo = new LocalStorageRepository(global.appState);
  const economyService = new ChampionshipEconomyService(repo);

  const initialXP = global.appState.data.xp;

  // First grant
  economyService.grantXP({
    userId: 'harry_5',
    amount: 100,
    sourceType: 'DAILY_EXAM',
    rankEligible: true,
    idempotencyKey: 'EXAM_REWARD:att_101'
  });

  assert.strictEqual(global.appState.data.xp, initialXP + 100);

  // Duplicate grant with same idempotency key
  economyService.grantXP({
    userId: 'harry_5',
    amount: 100,
    sourceType: 'DAILY_EXAM',
    rankEligible: true,
    idempotencyKey: 'EXAM_REWARD:att_101'
  });

  // XP should remain unchanged after duplicate call
  assert.strictEqual(global.appState.data.xp, initialXP + 100);
});

runTest('4.2 Skill Boost per-answer XP idempotency (SKILL_XP:{sessionId}:{questionId})', () => {
  const repo = new LocalStorageRepository(global.appState);
  const economyService = new ChampionshipEconomyService(repo);
  const initialXP = global.appState.data.xp;

  // Answer 1 correct (+6 XP)
  economyService.processSkillBoostAnswer({
    userId: 'harry_5',
    sessionId: 'sess_999',
    questionId: 'q_boost_cm_01',
    isCorrect: true
  });

  assert.strictEqual(global.appState.data.xp, initialXP + 6);

  // Repeat same answer call -> ignored
  economyService.processSkillBoostAnswer({
    userId: 'harry_5',
    sessionId: 'sess_999',
    questionId: 'q_boost_cm_01',
    isCorrect: true
  });

  assert.strictEqual(global.appState.data.xp, initialXP + 6);
});

runTest('4.3 Schema Migration preserves existing user state & syncs date-aware tickets/missions', () => {
  const repo = new LocalStorageRepository(global.appState);
  const dateService = new ChampionshipDateService('Asia/Ho_Chi_Minh');
  const stateService = new ChampionshipStateService(repo, dateService);

  stateService.ensureStateSchema();

  const data = global.appState.data;

  // Preserved base data
  assert.strictEqual(data.xp, 2726); // 2620 + 100 + 6 from previous test steps
  assert.strictEqual(data.streak, 6);
  assert.strictEqual(data.completedNodes['island_1_node_1'], true);

  // Provisioned Championship data
  const todayKey = dateService.getCompetitionDateKey();
  const dailyFreeTicket = data.championship.tickets.find(t => t.ticketType === 'DAILY_FREE' && t.issueDate === todayKey);
  assert.notStrictEqual(dailyFreeTicket, undefined);
  assert.strictEqual(dailyFreeTicket.status, 'AVAILABLE');

  const todayMissions = data.championship.dailyMissions[todayKey];
  assert.notStrictEqual(todayMissions, undefined);
  assert.strictEqual(todayMissions.claimedReward, false);
});

console.log('\n===================================================================');
console.log(`📊 TEST RESULT SUMMARY: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('===================================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
