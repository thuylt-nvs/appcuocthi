/* ==========================================================================
   NovaStars × NVS Championship — Demo Repository & Sandbox AppState
   v0.1 Storage Isolation Module (Zero Production Mutation)
   ========================================================================== */

class DemoAppState {
  constructor(initialData) {
    this.STORAGE_KEY = 'novastars_demo_showcase_v1';
    this.data = initialData || DemoScenarioState.createState('GRADE_5', 'FREE', 'BEFORE_EXAM');
    this.subscribers = [];
  }

  subscribe(callback) {
    if (typeof callback === 'function') {
      this.subscribers.push(callback);
    }
  }

  notify() {
    this.subscribers.forEach(cb => cb(this.data));
  }

  saveToStorage() {
    try {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
      }
    } catch (e) {
      console.warn('[DemoAppState] Storage save warning:', e);
    }
    this.notify();
  }

  loadFromStorage() {
    try {
      if (typeof sessionStorage !== 'undefined') {
        const raw = sessionStorage.getItem(this.STORAGE_KEY);
        if (raw) {
          this.data = JSON.parse(raw);
        }
      }
    } catch (e) {
      console.warn('[DemoAppState] Storage load warning:', e);
    }
  }

  reset(gradeKey = 'GRADE_5', tierKey = 'FREE', scenarioKey = 'BEFORE_EXAM') {
    this.data = DemoScenarioState.createState(gradeKey, tierKey, scenarioKey);
    this.saveToStorage();
  }
}

class DemoRepository {
  constructor(demoAppState) {
    this.appState = demoAppState;
  }

  getStudentProfile() {
    return this.appState.data.user || {};
  }

  getAccountInfo() {
    return this.appState.data.account || {};
  }

  getCompetencySignals() {
    return this.appState.data.competencySignals || [];
  }

  saveState() {
    this.appState.saveToStorage();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DemoAppState, DemoRepository };
} else if (typeof window !== 'undefined') {
  window.DemoAppState = DemoAppState;
  window.DemoRepository = DemoRepository;
}
