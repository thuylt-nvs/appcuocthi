/* ==========================================================================
   NovaStars MVP — State Store & Local Persistence Engine
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
      currentView: 'splash', // splash, home, map, lesson
      unlockedNodes: {
        'island_1_node_1': true, // Lesson 0 unlocked
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
      console.warn('Failed to load state from localStorage:', e);
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch (e) {
      console.warn('Failed to save state to localStorage:', e);
    }
    this.notify();
  }

  subscribe(callback) {
    this.listeners.push(callback);
  }

  notify() {
    this.listeners.forEach(cb => cb(this.data));
  }

  addXP(amount) {
    this.data.xp += amount;
    // Update daily quest progress
    const q1 = this.data.dailyQuests.find(q => q.id === 'q1');
    if (q1) q1.progress = Math.min(q1.max, q1.progress + 1);
    this.saveToStorage();
  }

  addStars(amount) {
    this.data.stars += amount;
    const q3 = this.data.dailyQuests.find(q => q.id === 'q3');
    if (q3) q3.progress = Math.min(q3.max, q3.progress + amount);
    this.saveToStorage();
  }

  completeLessonNode(nodeId) {
    this.data.completedNodes[nodeId] = true;
    // Unlock next node
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

window.appState = new AppState();
