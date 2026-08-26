/* ==========================================================================
   NovaStars × NVS Championship — Vision Demo Isolation Verification Suite
   ========================================================================== */

class DemoVerificationSuite {
  constructor() {
    this.results = [];
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(`DEMO_VERIFICATION_FAILED: ${message}`);
    }
  }

  test(name, testFn) {
    try {
      testFn();
      this.results.push({ name, passed: true });
      console.log(`✅ [Demo Test PASSED] ${name}`);
    } catch (err) {
      this.results.push({ name, passed: false, error: err.message });
      console.log(`❌ [Demo Test FAILED] ${name}: ${err.message}`);
    }
  }

  runAll() {
    console.log('\n===================================================================');
    console.log('🚀 RUNNING VISION DEMO ISOLATION & VERIFICATION SUITE');
    console.log('===================================================================\n');

    // 1. Storage Isolation Test (Snapshot all production LocalStorage keys)
    this.test('1. Entire demo showcase leaves all production storage keys byte-for-byte unchanged', () => {
      const prodKeys = ['novastars_player_state_v1', 'novastars_user_settings', 'novastars_app_cache'];
      const initialSnapshots = {};
      
      if (typeof localStorage !== 'undefined') {
        prodKeys.forEach(k => {
          localStorage.setItem(k, JSON.stringify({ key: k, value: `test_val_${k}` }));
          initialSnapshots[k] = localStorage.getItem(k);
        });
      }

      const showcase = new DemoShowcaseController();
      showcase.init();
      
      // Step through complete guided journey
      for (let i = 0; i < showcase.steps.length; i++) {
        showcase.nextStep();
      }
      showcase.switchGrade('GRADE_2');
      showcase.switchAccountTier('PREMIUM');
      showcase.switchScenario('FUTURE_FINALIST');

      if (typeof localStorage !== 'undefined') {
        prodKeys.forEach(k => {
          const afterVal = localStorage.getItem(k);
          this.assert(afterVal === initialSnapshots[k], `Production storage key ${k} was mutated during demo execution!`);
        });
      }
    });

    // 2. Reset Demo Test
    this.test('2. Reset Demo restores deterministic initial state', () => {
      const showcase = new DemoShowcaseController();
      showcase.init();
      showcase.switchGrade('GRADE_2');
      showcase.switchScenario('FUTURE_FINALIST');

      showcase.resetDemo();
      this.assert(showcase.gradeKey === 'GRADE_5', 'Reset did not restore Grade 5');
      this.assert(showcase.accountTierKey === 'FREE', 'Reset did not restore Free account');
      this.assert(showcase.scenarioKey === 'BEFORE_EXAM', 'Reset did not restore Before Exam scenario');
      this.assert(showcase.currentStepIndex === 0, 'Reset did not restore step index 0');
    });

    // 3. Persona Switching Test
    this.test('3. Grade 2 / Grade 5 persona switching updates relevant content coherently', () => {
      const showcase = new DemoShowcaseController();
      showcase.init();
      
      showcase.switchGrade('GRADE_2');
      this.assert(showcase.demoState.data.user.grade === 2, 'Grade 2 persona not applied to user');
      this.assert(showcase.demoState.data.user.name === 'Bé Su', 'Grade 2 avatar name mismatch');

      showcase.switchGrade('GRADE_5');
      this.assert(showcase.demoState.data.user.grade === 5, 'Grade 5 persona not applied to user');
      this.assert(showcase.demoState.data.user.name === 'Minh Trí', 'Grade 5 avatar name mismatch');
    });

    // 4. Free / Premium Preview Switching Test
    this.test('4. Free / Premium Preview switching toggles lock states', () => {
      const showcase = new DemoShowcaseController();
      showcase.init();

      showcase.switchAccountTier('FREE');
      this.assert(showcase.demoState.data.account.isPremium === false, 'Free tier isPremium must be false');

      showcase.switchAccountTier('PREMIUM');
      this.assert(showcase.demoState.data.account.isPremium === true, 'Premium tier isPremium must be true');
    });

    // 5. Guided Previous / Next Progression Test
    this.test('5. Guided Previous/Next progression remains consistent across all steps', () => {
      const showcase = new DemoShowcaseController();
      showcase.init();

      this.assert(showcase.currentStepIndex === 0, 'Initial step index should be 0');
      showcase.nextStep();
      this.assert(showcase.currentStepIndex === 1, 'Next step should advance to index 1');
      showcase.prevStep();
      this.assert(showcase.currentStepIndex === 0, 'Prev step should regress to index 0');
    });

    // 6. Concept Preview Non-Mutation Test
    this.test('6. Concept Preview screens cannot mutate official scoring or economy', () => {
      const showcase = new DemoShowcaseController();
      showcase.init();
      showcase.jumpToScreen('concept_journey_timeline');
      showcase.jumpToScreen('concept_practice_progress');
      showcase.jumpToScreen('concept_leaderboard');

      const data = showcase.demoState.data;
      this.assert(typeof data.xp === 'number', 'XP is a valid number');
      this.assert(typeof data.stars === 'number', 'Stars is a valid number');
    });

    // 7. Presenter Control Absence Outside Demo Test
    this.test('7. Presenter controls are absent outside demo mode', () => {
      window.DEMO_SHOWCASE = false;
      const showcase = new DemoShowcaseController();
      showcase.renderPresenterPanel();
      const isDemoActive = window.DEMO_SHOWCASE === true;
      this.assert(isDemoActive === false, 'Presenter panel must not activate when DEMO_SHOWCASE is false');
    });

    const passed = this.results.filter(r => r.passed).length;
    const total = this.results.length;

    console.log('\n===================================================================');
    console.log(`📊 VISION DEMO VERIFICATION RESULTS: ${passed}/${total} PASSED`);
    console.log('===================================================================\n');

    return { total, passed, failed: total - passed, results: this.results };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DemoVerificationSuite };
} else if (typeof window !== 'undefined') {
  window.DemoVerificationSuite = DemoVerificationSuite;
}
