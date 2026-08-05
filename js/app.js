/* ==========================================================================
   NovaStars MVP — Main Application Controller & View Router
   Stabilized Edition: Consolidated Modals, Event Listener Safety & Guard Clauses
   ========================================================================== */

class AppController {
  constructor() {
    this.container = null;
    this.isInitialized = false;
    this.splashTimer = null;
  }

  init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    this.container = document.getElementById('app-view-container');
    
    // Single execution audio unlock
    document.addEventListener('pointerdown', () => {
      if (window.soundEngine) window.soundEngine.init();
    }, { once: true });

    // State update subscription (guarded against duplicate callbacks)
    if (window.appState) {
      window.appState.subscribe(() => {
        this.render();
      });
    }

    // Start with Splash Screen
    this.showSplash();
  }

  clearSplashTimer() {
    if (this.splashTimer) {
      clearTimeout(this.splashTimer);
      this.splashTimer = null;
    }
  }

  showSplash() {
    if (!this.container) return;
    this.clearSplashTimer();
    this.container.innerHTML = Views.renderSplash();

    // Auto navigate after 1.8 seconds
    this.splashTimer = setTimeout(() => {
      this.splashTimer = null;
      if (window.appState && window.appState.data) {
        if (!window.appState.data.hasSeenFTUE) {
          this.navigateTo('home');
          this.showFTUEModal();
        } else {
          this.navigateTo('home');
        }
      }
    }, 1800);
  }

  showFTUEModal() {
    const existing = document.getElementById('ftue-modal-root');
    if (existing) existing.remove();

    const modalDiv = document.createElement('div');
    modalDiv.id = 'ftue-modal-root';
    modalDiv.innerHTML = Views.renderWelcomeModal();
    const root = document.getElementById('app-root');
    if (root) root.appendChild(modalDiv);
  }

  startFTUEJourney() {
    if (window.soundEngine) window.soundEngine.playVictory();
    if (window.appState) window.appState.setFTUESeen();
    
    const modal = document.getElementById('ftue-modal-root');
    if (modal) modal.remove();
    this.navigateTo('map');
  }

  showMissionIntro() {
    if (window.soundEngine) window.soundEngine.playTap();
    const existing = document.getElementById('mission-intro-modal-root');
    if (existing) existing.remove();

    const modalDiv = document.createElement('div');
    modalDiv.id = 'mission-intro-modal-root';
    modalDiv.innerHTML = NSComponents.renderMissionIntroModal({
      title: "Bài 1: Lời Chào Ngôi Sao",
      subtitle: "Học cách chào hỏi tự tin và lịch sự với mọi người",
      xp: 100,
      stars: 3,
      badge: "Ngôi Sao Giao Tiếp 🏅",
      onStart: "window.app.startLessonZeroFromIntro()",
      onClose: "window.app.closeMissionIntro()"
    });
    const root = document.getElementById('app-root');
    if (root) root.appendChild(modalDiv);
  }

  closeMissionIntro() {
    if (window.soundEngine) window.soundEngine.playTap();
    const modal = document.getElementById('mission-intro-modal-root');
    if (modal) modal.remove();
  }

  startLessonZeroFromIntro() {
    if (window.soundEngine) window.soundEngine.playVictory();
    this.closeMissionIntro();
    this.startLessonZero();
  }

  startLessonZero() {
    this.clearSplashTimer();
    if (window.soundEngine) window.soundEngine.playTap();
    if (window.appState) window.appState.setView('lesson');
    if (window.lessonRunner) {
      window.lessonRunner.init('app-view-container', window.lessonZeroData);
    }
  }

  showHeroJournalAndReturn() {
    if (window.soundEngine) window.soundEngine.playVictory();

    // Consolidated cleanup of lingering overlays
    ['reward-popup-modal-root', 'hero-journal-modal-root', 'mission-intro-modal-root'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.remove();
    });

    const modalDiv = document.createElement('div');
    modalDiv.id = 'hero-journal-modal-root';
    modalDiv.innerHTML = NSComponents.renderHeroJournalModal({
      badgeName: "Huy Chương Ngôi Sao Giao Tiếp",
      xp: (window.appState && window.appState.data) ? window.appState.data.xp : 100,
      stars: (window.appState && window.appState.data) ? window.appState.data.stars : 3,
      streak: (window.appState && window.appState.data) ? window.appState.data.streak : 1,
      onClose: "window.app.closeHeroJournalAndReturn()"
    });

    const root = document.getElementById('app-root');
    if (root) root.appendChild(modalDiv);
  }

  closeHeroJournalAndReturn() {
    if (window.soundEngine) window.soundEngine.playTap();
    const modal = document.getElementById('hero-journal-modal-root');
    if (modal) modal.remove();
    this.navigateTo('map');
  }

  navigateTo(viewName) {
    this.clearSplashTimer();
    if (window.soundEngine) window.soundEngine.playTap();
    if (window.appState) window.appState.setView(viewName);
    this.render();
  }

  navigateToTab(tabName) {
    this.navigateTo(tabName);
  }

  render() {
    if (!this.container || !window.appState || !window.appState.data) return;

    const currentView = window.appState.data.currentView;

    switch (currentView) {
      case 'splash':
        this.container.innerHTML = Views.renderSplash();
        break;
      case 'home':
        this.container.innerHTML = Views.renderHome();
        break;
      case 'map':
        this.container.innerHTML = Views.renderMap();
        break;
      case 'profile':
        this.container.innerHTML = Views.renderProfile();
        break;
      case 'lesson':
        // Handled by lesson runner
        break;
      default:
        this.container.innerHTML = Views.renderHome();
    }
  }
}

window.app = new AppController();

document.addEventListener('DOMContentLoaded', () => {
  if (window.app) window.app.init();
});
