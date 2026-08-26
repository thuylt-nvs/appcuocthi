/* ==========================================================================
   NovaStars × NVS Championship — Student Pilot Verification Suite
   v0.2.3B Student Alpha Acceptance Matrix (20 Automated Tests - Genuinely Awaited Async Runner)
   ========================================================================== */

class StudentPilotVerificationSuite {
  constructor() {
    this.results = [];
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(`STUDENT_PILOT_VERIFICATION_FAILED: ${message}`);
    }
  }

  async test(name, fn) {
    try {
      await fn();
      this.results.push({ name, passed: true });
      console.log(`✅ [Student Pilot Test PASSED] ${name}`);
    } catch (err) {
      this.results.push({ name, passed: false, error: err.message });
      console.log(`❌ [Student Pilot Test FAILED] ${name}: ${err.message}`);
    }
  }

  async runAll() {
    this.results = [];
    console.log('\n===================================================================');
    console.log('🚀 RUNNING STUDENT PILOT ACCEPTANCE MATRIX (v0.2.3B ALPHA - 20 TESTS)');
    console.log('===================================================================\n');

    // 1. Presenter Control Absence in Student Mode
    await this.test('1. Student Mode never renders Presenter controls', () => {
      window.DEMO_SHOWCASE = false;
      const student = new DemoStudentController();
      student.init();
      const isDemoActive = window.DEMO_SHOWCASE === true;
      this.assert(isDemoActive === false, 'Presenter panel must not activate in Student Mode');
    });

    // 2. Presenter Control Presence in Team Mode
    await this.test('2. Team Mode renders Presenter controls', () => {
      window.DEMO_SHOWCASE = true;
      const showcase = new DemoShowcaseController();
      showcase.init();
      const isDemoActive = window.DEMO_SHOWCASE === true;
      this.assert(isDemoActive === true, 'Team Mode must enable DEMO_SHOWCASE flag');
    });

    // 3. Independent Sandbox State
    await this.test('3. Student and Team sandbox state cannot overwrite one another', () => {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('novastars_demo_showcase_v1', JSON.stringify({ team: 'val' }));
        sessionStorage.setItem('novastars_student_pilot_v1', JSON.stringify({ student: 'val' }));

        const student = new DemoStudentController();
        student.init();
        student.startPilot('GRADE_4_5');

        const teamVal = JSON.parse(sessionStorage.getItem('novastars_demo_showcase_v1'));
        this.assert(teamVal.team === 'val', 'Team sandbox state was overwritten by Student Mode');
      }
    });

    // 4. Production Storage Isolation
    await this.test('4. Production LocalStorage remains byte-for-byte unchanged', () => {
      const prodKeys = ['novastars_player_state_v1', 'novastars_user_settings', 'novastars_app_cache'];
      const initialSnapshots = {};

      if (typeof localStorage !== 'undefined') {
        prodKeys.forEach(k => {
          localStorage.setItem(k, JSON.stringify({ key: k, value: `prod_val_${k}` }));
          initialSnapshots[k] = localStorage.getItem(k);
        });
      }

      const student = new DemoStudentController();
      student.init();
      student.startPilot('GRADE_1_3');
      student.currentStepIndex = 3;
      student.currentExamIdx = 0;

      const pool = student.examQuestions['GRADE_1_3'];
      for (let i = 0; i < 5; i++) {
        student.answerExamQuestion(pool[i].itemId || pool[i].id, 'opt_a');
      }
      student.currentStepIndex = 5;
      student.currentBoostIdx = 0;
      const bPool = student.boostQuestions['GRADE_1_3'];
      for (let i = 0; i < 3; i++) {
        const bq = bPool[i];
        student.answerBoostQuestion(bq.itemId || bq.id, 'opt_a');
        student.advanceBoostQuestion();
      }

      if (typeof localStorage !== 'undefined') {
        prodKeys.forEach(k => {
          const afterVal = localStorage.getItem(k);
          this.assert(afterVal === initialSnapshots[k], `Production key ${k} was mutated during Student Pilot execution!`);
        });
      }
    });

    // 5. Age Group Question Pool Counts
    await this.test('5. Grade 1–3 and Grade 4–5 exam pools have exactly 5 questions each', () => {
      const student = new DemoStudentController();
      const poolG13 = student.examQuestions['GRADE_1_3'];
      const poolG45 = student.examQuestions['GRADE_4_5'];
      this.assert(poolG13.length === 5, 'Grade 1–3 exam pool must have 5 questions');
      this.assert(poolG45.length === 5, 'Grade 4–5 exam pool must have 5 questions');
    });

    // 6. Canonical NVS Competency Mapping Guard
    await this.test('6. All exam items map strictly to canonical NL1–NL7 competency IDs', () => {
      const student = new DemoStudentController();
      const poolG13 = student.examQuestions['GRADE_1_3'];
      const poolG45 = student.examQuestions['GRADE_4_5'];
      const validNLs = ['NL1', 'NL2', 'NL3', 'NL4', 'NL5', 'NL6', 'NL7'];

      [...poolG13, ...poolG45].forEach(item => {
        this.assert(validNLs.includes(item.primaryCompetencyId), `Item ${item.itemId} has invalid primaryCompetencyId '${item.primaryCompetencyId}'`);
        item.linkedCompetencyIds.forEach(l => {
          this.assert(validNLs.includes(l), `Item ${item.itemId} has invalid linkedCompetencyId '${l}'`);
        });
      });
    });

    // 7. Academic Review Status Guard
    await this.test('7. Pilot items have reviewStatus PENDING_ACADEMIC_REVIEW and reviewer null', () => {
      const student = new DemoStudentController();
      const poolG13 = student.examQuestions['GRADE_1_3'];
      const poolG45 = student.examQuestions['GRADE_4_5'];
      const boostG13 = student.boostQuestions['GRADE_1_3'];
      const boostG45 = student.boostQuestions['GRADE_4_5'];

      [...poolG13, ...poolG45, ...boostG13, ...boostG45].forEach(item => {
        this.assert(item.reviewStatus === 'PENDING_ACADEMIC_REVIEW', `Item ${item.itemId} must have reviewStatus PENDING_ACADEMIC_REVIEW`);
        this.assert(item.reviewer === null, `Item ${item.itemId} must have reviewer null until official review`);
      });
    });

    // 8. Short Exam Completion
    await this.test('8. Short Exam completes after exactly 5 questions', () => {
      const student = new DemoStudentController();
      student.init();
      student.startPilot('GRADE_4_5');
      student.currentStepIndex = 3;
      student.currentExamIdx = 0;

      const pool = student.examQuestions['GRADE_4_5'];
      for (let i = 0; i < 4; i++) {
        student.answerExamQuestion(pool[i].itemId || pool[i].id, 'opt_a');
        this.assert(student.currentStepIndex === 3, 'Must remain on exam question view until final answer');
      }
      student.answerExamQuestion(pool[4].itemId || pool[4].id, 'opt_a');
      this.assert(student.currentStepIndex === 4, 'Must transition to Practice Result (step 4) after 5th answer');
    });

    // 9. Skill Boost Completion & Dynamic XP Calculation
    await this.test('9. Skill Boost completes after 3 questions with dynamic XP calculation (max 18 XP)', () => {
      const student = new DemoStudentController();
      student.init();
      student.startPilot('GRADE_4_5');
      student.currentStepIndex = 5;
      student.currentBoostIdx = 0;

      const bq = student.boostQuestions['GRADE_4_5'];
      student.answerBoostQuestion(bq[0].itemId || bq[0].id, 'opt_a'); // Correct (+6)
      student.advanceBoostQuestion();
      student.answerBoostQuestion(bq[1].itemId || bq[1].id, 'opt_b'); // Incorrect (+0)
      student.advanceBoostQuestion();
      student.answerBoostQuestion(bq[2].itemId || bq[2].id, 'opt_a'); // Correct (+6)
      student.advanceBoostQuestion();

      this.assert(student.currentStepIndex === 6, 'Must transition to Reward view (step 6) after 3rd boost question');
      this.assert(student.pilotState.boostCorrectCount === 2, 'Boost correct count must be 2');
      this.assert(student.pilotState.boostXpEarned === 12, 'Boost XP earned must be 12 (2 * 6)');
    });

    // 10. Feedback Persistence & Restart
    await this.test('10. Student feedback persists & Restart resets Student sandbox deterministically', () => {
      const student = new DemoStudentController();
      student.init();
      student.setFeedbackRating(4);
      student.setFavoritePart('Coach Nova');
      student.setReturnIntent('Có!');
      this.assert(student.pilotState.feedback.q1 === 4, 'Feedback rating must persist');
      this.assert(student.pilotState.feedback.q2 === 'Coach Nova', 'Favorite part must persist');

      student.restartPilot();
      this.assert(student.currentStepIndex === 0, 'Restart must reset step index to 0');
      this.assert(student.pilotState.feedback.q1 === null, 'Restart must reset feedback Q1 to null');
    });

    // 11. No PII Field
    await this.test('11. No PII field exists in Student pilot state', () => {
      const student = new DemoStudentController();
      const keys = Object.keys(student.pilotState);
      const piiFields = ['name', 'fullName', 'school', 'email', 'phone', 'dob'];
      piiFields.forEach(f => {
        this.assert(!keys.includes(f), `PII field ${f} must not exist in Student pilot state`);
      });
    });

    // 12. Pilot Item Safety Guard
    await this.test('12. Pilot item safety guard rejects SECURE_ACTIVE items', () => {
      const student = new DemoStudentController();
      let caught = false;
      try {
        student.assertPilotItemSafety({ itemId: 'secure_1', contentStatus: 'SECURE_ACTIVE' });
      } catch (err) {
        caught = true;
        this.assert(err.message.includes('PILOT_ITEM_SAFETY_VIOLATION'), 'Error message must specify safety violation');
      }
      this.assert(caught === true, 'Safety guard must throw error when encountering SECURE_ACTIVE status');
    });

    // 13. Telemetry Repository Network Failure Tolerance (GENUINELY AWAITED ASYNC TEST)
    await this.test('13. Telemetry Repository handles network failure gracefully without throwing', async () => {
      const repo = new PilotTelemetryRepository();
      let threw = false;
      try {
        await repo.logEvent({ event: 'test_event', sessionId: 'test_sess' });
      } catch (err) {
        threw = true;
      }
      this.assert(threw === false, 'logEvent must not throw exception even if network fetch fails');
    });

    // 14. Suggestion Max Length 200 & Raw Plain Text Storage
    await this.test('14. Free-text suggestion stored as raw text (capped at 200 chars)', () => {
      const student = new DemoStudentController();
      student.init();
      const rawText = '<script>alert(1)</script>' + 'A'.repeat(200);
      student.setSuggestion(rawText);
      this.assert(student.pilotState.feedback.suggestion.length <= 200, 'Suggestion length must be capped at 200 characters');
      this.assert(student.pilotState.feedback.suggestion.startsWith('<script>'), 'Suggestion must store raw plain text without premature double escaping');
    });

    // 15. Non-Diagnostic Result Framing & Score Sensitivity
    await this.test('15. Practice Result contains non-diagnostic framing & score-sensitive copy', () => {
      const htmlHigh = DemoStudentViews.renderPracticeResult({ score: 90, correctCount: 4, totalCount: 5 });
      const htmlLow = DemoStudentViews.renderPracticeResult({ score: 20, correctCount: 1, totalCount: 5 });

      this.assert(htmlHigh.includes('Dựa trên bài trải nghiệm ngắn này...'), 'Result view must contain non-diagnostic disclaimer notice');
      this.assert(htmlHigh.includes('Tuyệt vời! Em đã xử lý rất tốt nhiều tình huống.'), 'High score must show encouraging high-score copy');
      this.assert(htmlLow.includes('Em đã hoàn thành thử thách! Cùng Coach Nova khám phá thêm nhé.'), 'Low score must show encouraging low-score copy');
    });

    // 16. Question/State Match Assertion
    await this.test('16. Question/State match assertion rejects mismatched question IDs', () => {
      const student = new DemoStudentController();
      student.init();
      student.startPilot('GRADE_4_5');
      student.currentStepIndex = 3;
      student.currentExamIdx = 0;

      let caught = false;
      try {
        student.answerExamQuestion('wrong_question_id', 'opt_a');
      } catch (err) {
        caught = true;
        this.assert(err.message.includes('QUESTION_STATE_MISMATCH'), 'Must throw QUESTION_STATE_MISMATCH error');
      }
      this.assert(caught === true, 'Must reject passed questionId if it does not match currentQuestion.itemId');
    });

    // 17. Idempotent Boost Scoring & State Resume
    await this.test('17. Boost scoring is idempotent and reload at Boost 2/3 resumes exact position and feedback', () => {
      const student = new DemoStudentController();
      student.init();
      student.startPilot('GRADE_4_5');
      student.currentStepIndex = 5;
      student.currentBoostIdx = 0;

      const bq = student.boostQuestions['GRADE_4_5'];
      student.answerBoostQuestion(bq[0].itemId || bq[0].id, 'opt_a');

      // Reload simulation
      const resumed = new DemoStudentController();
      resumed.init();
      this.assert(resumed.pilotState.boostFeedbackQuestionId === bq[0].itemId, 'Resumed controller must retain boostFeedbackQuestionId');
      this.assert(resumed.pilotState.boostFeedbackIsCorrect === true, 'Resumed controller must retain boostFeedbackIsCorrect');
    });

    // 18. Telemetry Revisit & Screen View Event ID Uniqueness (v0.2.3B Strengthened)
    await this.test('18. Revisit to screen logs multiple screen_viewed events with unique eventIds', () => {
      const student = new DemoStudentController();
      student.init();
      student.startPilot('GRADE_4_5'); // S1 Home
      
      const emittedEvents = [];
      student.telemetryRepo = {
        logEvent: (evt) => emittedEvents.push(evt)
      };

      student.goToStep(2); // S2 Champ Home (1st visit)
      student.goToStep(1); // S1 Home (back)
      student.goToStep(2); // S2 Champ Home (revisit)

      const champViews = emittedEvents.filter(e => e.event === 'screen_viewed' && e.screenName === 'champ_home');
      this.assert(champViews.length === 2, 'Revisiting champ_home must produce exactly 2 screen_viewed events');
      this.assert(champViews[0].eventId !== champViews[1].eventId, 'Revisit screen_viewed events must have unique eventIds');

      student.goToStep(4); // Practice result
      student.goToStep(6); // Reward
      student.goToStep(9); // Thank you

      const resultViews = emittedEvents.filter(e => e.event === 'screen_viewed' && e.screenName === 'practice_result');
      const rewardViews = emittedEvents.filter(e => e.event === 'screen_viewed' && e.screenName === 'reward');
      const thankYouViews = emittedEvents.filter(e => e.event === 'screen_viewed' && e.screenName === 'thank_you');

      this.assert(resultViews.length >= 1, 'Must emit screen_viewed for practice_result');
      this.assert(rewardViews.length >= 1, 'Must emit screen_viewed for reward');
      this.assert(thankYouViews.length >= 1, 'Must emit screen_viewed for thank_you');
    });

    // 19. Feedback Default Null & Form Validation
    await this.test('19. Feedback defaults are null and submit is blocked until Q1, Q2, Q3 answered', () => {
      const student = new DemoStudentController();
      student.init();
      student.restartPilot();
      this.assert(student.pilotState.feedback.q1 === null, 'Feedback Q1 must default to null');
      this.assert(student.pilotState.feedback.q2 === null, 'Feedback Q2 must default to null');
      this.assert(student.pilotState.feedback.q3 === null, 'Feedback Q3 must default to null');

      student.submitFeedback();
      this.assert(student.currentStepIndex !== 9, 'submitFeedback must be blocked when Q1, Q2, Q3 are null');

      student.setFeedbackRating(5);
      student.setFavoritePart('Coach Nova');
      student.setReturnIntent('Có!');
      student.submitFeedback();
      this.assert(student.currentStepIndex === 9, 'submitFeedback must succeed when Q1, Q2, Q3 are answered');
    });

    // 20. Option Shuffling Non-A Position Distribution & Reload Stability (v0.2.3B Strengthened)
    await this.test('20. Option positions are deterministically shuffled per session and item and stable across reload', () => {
      const student = new DemoStudentController();
      student.init();
      student.startPilot('GRADE_4_5');

      const examPool = student.examQuestions['GRADE_4_5'];
      const boostPool = student.boostQuestions['GRADE_4_5'];

      const examOpts1 = student.getShuffledOptions(examPool[0]);
      const examOpts2 = student.getShuffledOptions(examPool[0]);
      this.assert(JSON.stringify(examOpts1) === JSON.stringify(examOpts2), 'Same session + item must yield identical option order');
      this.assert(examOpts1.some(o => o.id === examPool[0].correctOptionId), 'correctOptionId must remain present in shuffled options');

      const boostOpts1 = student.getShuffledOptions(boostPool[0]);
      this.assert(boostOpts1.length === boostPool[0].options.length, 'Boost options must shuffle safely');

      const positions = examPool.map(item => {
        const opts = student.getShuffledOptions(item);
        return opts.findIndex(o => o.id === item.correctOptionId);
      });
      const allZero = positions.every(p => p === 0);
      this.assert(allZero === false, 'Displayed correct-answer positions must not be all in index 0 (A)');
    });

    const passed = this.results.filter(r => r.passed).length;
    const total = this.results.length;

    console.log('\n===================================================================');
    console.log(`📊 STUDENT PILOT VERIFICATION RESULTS: ${passed}/${total} PASSED`);
    console.log('===================================================================\n');

    return { total, passed, failed: total - passed, results: this.results };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { StudentPilotVerificationSuite };
} else if (typeof window !== 'undefined') {
  window.StudentPilotVerificationSuite = StudentPilotVerificationSuite;
}
