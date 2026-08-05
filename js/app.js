/* ==========================================================================
   NovaStars MVP — Main Application Controller & View Router
   ========================================================================== */

class AppController {
  constructor() {
    this.container = null;
  }

  init() {
    this.container = document.getElementById('app-view-container');
    
    // Subscribe to state updates
    window.appState.subscribe(() => {
      this.render();
    });

    // Start with Splash Screen
    this.showSplash();
  }

  showSplash() {
    if (!this.container) return;
    this.container.innerHTML = Views.renderSplash();

    // Auto navigate after 2 seconds
    setTimeout(() => {
      if (!window.appState.data.hasSeenFTUE) {
        this.navigateTo('home');
        this.showFTUEModal();
      } else {
        this.navigateTo('home');
      }
    }, 1800);
  }

  showFTUEModal() {
    const modalDiv = document.createElement('div');
    modalDiv.id = 'ftue-modal-root';
    modalDiv.innerHTML = Views.renderWelcomeModal();
    document.getElementById('app-root').appendChild(modalDiv);
  }

  startFTUEJourney() {
    window.soundEngine.playVictory();
    window.appState.setFTUESeen();
    const modal = document.getElementById('ftue-modal-root');
    if (modal) modal.remove();
    this.navigateTo('map');
  }

  navigateTo(viewName) {
    window.soundEngine.playTap();
    window.appState.setView(viewName);
    this.render();
  }

  navigateToTab(tabName) {
    this.navigateTo(tabName);
  }

  startLessonZero() {
    window.soundEngine.playTap();
    window.appState.setView('lesson');
    if (window.lessonRunner) {
      window.lessonRunner.init('app-view-container', window.lessonZeroData);
    }
  }

  render() {
    if (!this.container) return;

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
  window.app.init();
});
