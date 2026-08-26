/* ==========================================================================
   NovaStars MVP — State Store & Local Persistence Engine (M1-405 Compliant)
   Stabilized Edition: Unique Event Subscriptions & Guarded Access
   ========================================================================== */

class AppState {
  constructor() {
    this.storageKey = 'novastars_player_state_v1';
    this.listeners = [];
    this.data = this.loadDefaultState();
    this.loadFromStorage();
  }

  loadDefaultState() {
    return {
      xp: 0,
      stars: 0,
      streak: 1,
      hasSeenFTUE: false,
      currentView: 'splash',
      silentBaselineScore: 0,
      evidenceFlags: {
        evidenceE01WaveGesture: false,
        evidenceE02SocialTiming: false,
        evidenceE03SmileConsequence: false,
        evidenceE04SkillTransfer: false,
        evidenceE05MeaningMaking: false,
        evidenceE06ParentVerification: false
      },
      unlockedNodes: {
        'island_1_node_1': true,
        'island_1_node_2': false,
        'island_1_node_3': false,
        'island_1_node_4': false,
        'island_1_node_5': false,
        'island_1_boss': false
      },
      completedNodes: {},
      masteredNodes: {},
      dailyQuests: [
        { id: 'q1', title: 'Hoàn thành 1 bài học', rewardXp: 50, progress: 0, max: 1, claimed: false },
        { id: 'q2', title: 'Thử thách thực tế', rewardXp: 50, progress: 0, max: 1, claimed: false },
        { id: 'q3', title: 'Đạt 3 Ngôi Sao', rewardXp: 30, progress: 0, max: 3, claimed: false }
      ],
      lessonProgress: {
        currentStageIndex: 0,
        stageAnswers: {}
      }
    };
  }

  loadFromStorage() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.data = { ...this.data, ...parsed };
      }
    } catch (e) {
      if (typeof console !== 'undefined' && console.warn) console.warn('Failed to load state from localStorage:', e);
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch (e) {
      if (typeof console !== 'undefined' && console.warn) console.warn('Failed to save state to localStorage:', e);
    }
    this.notify();
  }

  subscribe(callback) {
    if (typeof callback === 'function' && !this.listeners.includes(callback)) {
      this.listeners.push(callback);
    }
  }

  notify() {
    if (this._isNotifying) return;
    this._isNotifying = true;
    try {
      this.listeners.forEach(cb => {
        if (typeof cb === 'function') cb(this.data);
      });
    } finally {
      this._isNotifying = false;
    }
  }

  addXP(amount) {
    if (typeof amount !== 'number') return;
    this.data.xp += amount;
    const q1 = Array.isArray(this.data.dailyQuests) ? this.data.dailyQuests.find(q => q.id === 'q1') : null;
    if (q1) q1.progress = Math.min(q1.max, q1.progress + 1);
    this.saveToStorage();
  }

  addStars(amount) {
    if (typeof amount !== 'number') return;
    this.data.stars += amount;
    const q3 = Array.isArray(this.data.dailyQuests) ? this.data.dailyQuests.find(q => q.id === 'q3') : null;
    if (q3) q3.progress = Math.min(q3.max, q3.progress + amount);
    this.saveToStorage();
  }

  addSilentScore(amount) {
    if (typeof amount !== 'number') return;
    this.data.silentBaselineScore += amount;
    this.saveToStorage();
  }

  logEvidence(flagName) {
    if (this.data.evidenceFlags && this.data.evidenceFlags.hasOwnProperty(flagName)) {
      this.data.evidenceFlags[flagName] = true;
      this.saveToStorage();
    }
  }

  completeLessonNode(nodeId) {
    if (!nodeId) return;
    this.data.completedNodes[nodeId] = true;
    if (nodeId === 'island_1_node_1') {
      this.data.unlockedNodes['island_1_node_2'] = true;
    }
    this.saveToStorage();
  }

  setFTUESeen() {
    this.data.hasSeenFTUE = true;
    this.saveToStorage();
  }

  setView(viewName) {
    this.data.currentView = viewName;
    this.saveToStorage();
  }

  resetLessonProgress() {
    this.data.lessonProgress = {
      currentStageIndex: 0,
      stageAnswers: {}
    };
    this.saveToStorage();
  }
}

if (typeof window !== 'undefined') window.AppState = AppState;
if (typeof globalThis !== 'undefined') globalThis.AppState = AppState;

if (typeof window !== 'undefined') {
  window.appState = new AppState();
}
