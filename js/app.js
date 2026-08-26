/* ==========================================================================
   NovaStars MVP — Main Application Controller & View Router
   Updated with Championship Training UI Orchestration (Gate 3A Patch)
   ========================================================================== */

class AppController {
  constructor() {
    this.container = null;
    this.isInitialized = false;
    this.splashTimer = null;

    this.repo = null;
    this.stateService = null;
    this.economyService = null;
    this.examService = null;
    this.analytics = null;
    this.examController = null;
    this.trainingController = null;
    this.targetSkillBoostCompId = null; // Requirement 4: No silent default fallback to NL3
    this.lastSkillBoostFeedback = null; // Requirement 4: Explicit instance state instead of window.lastSkillBoostFeedback
  }

  init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    if (typeof window !== 'undefined' && window.location && window.location.search.includes('demo=showcase')) {
      window.location.href = 'demo/vision_demo.html';
      return;
    }

    if (typeof document !== 'undefined') {
      this.container = document.getElementById('app-view-container');
    }

    // Fail-safe Eager Initialization (Requirement 5: Fail-safe eager at app boot)
    try {
      this.initChampionshipControllers();
    } catch (err) {
      if (typeof console !== 'undefined' && console.warn) console.warn("Championship module eager initialization failed:", err);
    }

    // Single execution audio unlock
    if (typeof document !== 'undefined' && document.addEventListener) {
      document.addEventListener('pointerdown', () => {
        if (typeof window !== 'undefined' && window.soundEngine && window.soundEngine.init) {
          window.soundEngine.init();
        }
      }, { once: true });
    }

    // Single rendering policy: Subscribe to state changes
    if (typeof window !== 'undefined' && window.appState && typeof window.appState.subscribe === 'function') {
      window.appState.subscribe(() => {
        this.render();
      });
    }

    // Real Boot Recovery Logic (Requirements 1 & 2)
    if (this.stateService) {
      this.bootRecovery();
    } else {
      this.showSplash();
    }
  }

  initChampionshipControllers() {
    try {
      if (typeof window !== 'undefined' && window.appState) {
        this.repo = new LocalStorageRepository(window.appState);
        this.stateService = new ChampionshipStateService(this.repo);
        this.economyService = new ChampionshipEconomyService(this.repo);
        this.analytics = new ChampionshipAnalyticsEngine(this.repo);
        
        const qData = typeof ChampionshipQuestions !== 'undefined' ? ChampionshipQuestions : {};
        this.examService = new ExamService(this.repo, qData);

        this.examController = new ChampionshipExamController({
          repository: this.repo,
          stateService: this.stateService,
          economyService: this.economyService,
          examService: this.examService,
          analyticsEngine: this.analytics,
          questionsData: qData
        });

        this.trainingController = new ChampionshipTrainingController({
          repository: this.repo,
          stateService: this.stateService,
          economyService: this.economyService,
          analyticsEngine: this.analytics,
          questionsData: qData
        });

        window.examController = this.examController;
        window.trainingController = this.trainingController;
      }
    } catch (err) {
      if (typeof console !== 'undefined' && console.warn) console.warn("Championship module eager initialization failed. Base app remains functional:", err);
    }
  }

  /**
   * Real Boot Recovery (Requirements 1 & 2): Explicit State Resolver
   * Resumes active Exam / auto-submits expired exam / resumes Skill Boost / restores completed views cleanly on reload
   */
  bootRecovery() {
    if (!this.stateService) {
      this.showSplash();
      return;
    }

    try {
      this.stateService.ensureStateSchema();
      const currentView = (typeof window !== 'undefined' && window.appState && window.appState.data) ? window.appState.data.currentView : null;

      // 1. Check active Exam attempt (RESERVED / IN_PROGRESS)
      const activeExamObj = this.stateService.getActiveReservedAttempt();
      if (activeExamObj && activeExamObj.attempt && this.examController) {
        const rehydrated = this.examController.rehydrateAttempt(activeExamObj.attempt.attemptId);
        
        if (rehydrated.remainingSeconds === 0) {
          // Auto-submit expired exam exactly once and navigate to Practice Result
          this.examController.submitExam(true);
          this.navigateTo('championship_exam_result');
          return;
        } else {
          // Rehydrate & resume exact exam question
          this.navigateTo('championship_exam_question');
          return;
        }
      }

      // 2. Check active Skill Boost session (IN_PROGRESS)
      const activeTrainingSession = this.stateService.getActiveTrainingSession();
      if (activeTrainingSession && this.trainingController) {
        this.trainingController.resumeActiveSkillBoost();
        this.navigateTo('championship_skill_boost_question');
        return;
      }

      // 3. Completed Exam Result view OR transient Processing view (Requirements 1 & 2)
      // Never restore Processing route after reload; boot directly to championship_exam_result
      if (currentView === 'championship_exam_result' || currentView === 'championship_exam_processing') {
        const latestCompletedExam = this.stateService.getLatestCompletedAttempt();
        if (latestCompletedExam && latestCompletedExam.examResult) {
          this.navigateTo('championship_exam_result');
          return;
        }
      }

      // 4. Completed Skill Boost Complete view (Requirement 2)
      if (currentView === 'championship_skill_boost_complete') {
        const latestCompletedBoost = this.stateService.getLatestCompletedTrainingSession();
        if (latestCompletedBoost) {
          this.navigateTo('championship_skill_boost_complete');
          return;
        }
      }

      // 5. Explicit whitelist for static Championship views (Home, Detail, Ready)
      if (currentView === 'championship_home') {
        this.navigateTo('championship_home');
        return;
      }

      if (currentView === 'championship_exam_detail' || currentView === 'championship_exam_ready') {
        const userGrade = (window.appState.data.user && window.appState.data.user.grade);
        if (userGrade && userGrade >= 1 && userGrade <= 5) {
          this.navigateTo(currentView);
          return;
        } else {
          this.navigateTo('championship_home');
          return;
        }
      }

      if (currentView === 'championship_skill_boost_intro') {
        if (this.targetSkillBoostCompId) {
          this.navigateTo('championship_skill_boost_intro');
          return;
        } else {
          this.navigateTo('championship_home');
          return;
        }
      }

      // Stale question/review routes without active domain attempt fallback to Championship Home
      if (currentView === 'championship_exam_question' || currentView === 'championship_exam_review' || currentView === 'championship_skill_boost_question') {
        this.navigateTo('championship_home');
        return;
      }
    } catch (err) {
      if (typeof console !== 'undefined' && console.warn) console.warn("Boot recovery encounter:", err);
    }

    // Default: Splash -> Home / FTUE
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

    this.splashTimer = setTimeout(() => {
      this.splashTimer = null;
      if (typeof window !== 'undefined' && window.appState && window.appState.data) {
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

  navigateTo(viewName) {
    this.clearSplashTimer();
    if (typeof window !== 'undefined' && window.soundEngine && window.soundEngine.playTap) {
      window.soundEngine.playTap();
    }
    if (typeof window !== 'undefined' && window.appState) {
      window.appState.setView(viewName);
    }
  }

  navigateToTab(tabName) {
    this.navigateTo(tabName);
  }

  showNotification(title, message, type = 'info') {
    const existing = document.getElementById('notification-banner-root');
    if (existing) existing.remove();

    const div = document.createElement('div');
    div.id = 'notification-banner-root';
    div.innerHTML = ChampionshipUIComponents.renderNotificationBanner({
      title,
      message,
      type,
      onClose: "document.getElementById('notification-banner-root').remove()"
    });
    document.getElementById('app-root').appendChild(div);
  }

  // --- Championship UI Handlers ---

  startExamFromReadyUI(grade) {
    if (!this.examController) this.initChampionshipControllers();

    if (!grade) {
      this.showNotification("Thiếu Khối Lớp", "Vui lòng thiết lập khối lớp cho tài khoản học sinh (Khối 1-5).", "error");
      return;
    }

    const startRes = this.examController.startExam(grade);

    switch (startRes.status) {
      case 'STARTED':
      case 'RESUME_REQUIRED':
        this.navigateTo('championship_exam_question');
        break;
      case 'AUTO_SUBMITTED':
        this.navigateTo('championship_exam_result');
        break;
      case 'NO_ELIGIBLE_TICKET':
        this.showNotification("Hết Lượt Thi Hôm Nay", startRes.error || "Bạn đã dùng hết vé thi thử hôm nay.", "error");
        break;
      case 'INVALID_GRADE':
        this.showNotification("Khối Lớp Không Hợp Lệ", startRes.error || "Khối lớp phải là từ 1 đến 5.", "error");
        break;
      default:
        this.showNotification("Lỗi Bắt Đầu Bài Thi", startRes.error || "Không thể bắt đầu bài thi.", "error");
    }
  }

  resumeActiveExamView() {
    if (!this.examController) this.initChampionshipControllers();
    const resumed = this.examController.resumeActiveExam();
    if (resumed && resumed.status === 'AUTO_SUBMITTED') {
      this.navigateTo('championship_exam_result');
    } else {
      this.navigateTo('championship_exam_question');
    }
  }

  showLeaveExamConfirmModalUI() {
    const existing = document.getElementById('leave-exam-modal');
    if (existing) existing.remove();

    const div = document.createElement('div');
    div.id = 'leave-exam-modal';
    div.innerHTML = ChampionshipUIComponents.renderLeaveExamConfirmModal({
      onConfirmLeave: "window.app.confirmLeaveExamUI()",
      onContinueExam: "document.getElementById('leave-exam-modal').remove()"
    });
    document.getElementById('app-root').appendChild(div);
  }

  confirmLeaveExamUI() {
    const modal = document.getElementById('leave-exam-modal');
    if (modal) modal.remove();

    if (this.examController) {
      this.examController.leaveExam();
    }
    this.navigateTo('championship_home');
  }

  selectExamOptionUI(optionKey) {
    if (!this.examController || !this.examController.currentAttempt) return;
    const attempt = this.examController.currentAttempt;
    const questions = this.examController.activeQuestionPool || [];
    const currentIndex = typeof attempt.currentQuestionIndex === 'number' ? attempt.currentQuestionIndex : 0;
    const q = questions[currentIndex];
    if (q) {
      this.examController.saveAnswer(q.id, optionKey, currentIndex);
    }
  }

  toggleExamFlagUI(questionId) {
    if (!this.examController) return;
    this.examController.toggleFlagQuestion(questionId);
  }

  nextExamQuestionUI() {
    if (!this.examController || !this.examController.currentAttempt) return;
    const attempt = this.examController.currentAttempt;
    const questions = this.examController.activeQuestionPool || [];
    const currentIndex = typeof attempt.currentQuestionIndex === 'number' ? attempt.currentQuestionIndex : 0;
    if (currentIndex < questions.length - 1) {
      this.examController.updateCurrentQuestionPosition(currentIndex + 1, questions[currentIndex + 1].id);
    }
  }

  prevExamQuestionUI() {
    if (!this.examController || !this.examController.currentAttempt) return;
    const attempt = this.examController.currentAttempt;
    const questions = this.examController.activeQuestionPool || [];
    const currentIndex = typeof attempt.currentQuestionIndex === 'number' ? attempt.currentQuestionIndex : 0;
    if (currentIndex > 0) {
      this.examController.updateCurrentQuestionPosition(currentIndex - 1, questions[currentIndex - 1].id);
    }
  }

  jumpToExamQuestionUI(index) {
    if (!this.examController || !this.examController.currentAttempt) return;
    const questions = this.examController.activeQuestionPool || [];
    if (index >= 0 && index < questions.length) {
      this.examController.updateCurrentQuestionPosition(index, questions[index].id);
      this.navigateTo('championship_exam_question');
    }
  }

  showSubmitConfirmModalUI() {
    const existing = document.getElementById('submit-confirm-modal');
    if (existing) existing.remove();

    const questions = this.examController.activeQuestionPool || [];
    const attempt = this.examController.currentAttempt || {};
    const answers = attempt.answers || {};
    const answeredCount = Object.keys(answers).length;
    const flaggedCount = (attempt.flaggedQuestionIds || []).length;

    const modalDiv = document.createElement('div');
    modalDiv.id = 'submit-confirm-modal';
    modalDiv.innerHTML = ChampionshipUIComponents.renderSubmitConfirmModal({
      answeredCount,
      totalQuestions: questions.length,
      flaggedCount,
      onConfirmSubmit: "window.app.submitExamFinalUI()",
      onCancel: "document.getElementById('submit-confirm-modal').remove()"
    });
    document.getElementById('app-root').appendChild(modalDiv);
  }

  /**
   * Submit Exam Final (Requirement 5: Explicit Try/Catch Error Handling)
   * Only enters Processing UI after successful persisted submission!
   */
  submitExamFinalUI() {
    const modal = document.getElementById('submit-confirm-modal');
    if (modal) modal.remove();

    if (!this.examController) return;

    try {
      // 1. Atomic Exam Submission & Persistence happens IMMEDIATELY
      const result = this.examController.submitExam(false);

      if (!result || result.status !== 'SUBMITTED') {
        throw new Error((result && result.error) || "Không thể hoàn thành nộp bài thi.");
      }

      // 2. Enter Processing UI ONLY after successful persisted submission
      this.navigateTo('championship_exam_processing');
      
      // 3. After visual transition delay, navigate to Practice Result
      setTimeout(() => {
        this.navigateTo('championship_exam_result');
      }, 600);
    } catch (err) {
      // 4. On error, remain in recoverable state and show branded notification
      this.showNotification("Lỗi Nộp Bài Thi", err.message || "Không thể nộp bài thi. Vui lòng thử lại.", "error");
    }
  }

  exchangeStarsForTicketUI() {
    if (!this.trainingController) this.initChampionshipControllers();
    
    if (!ChampionshipConfig.featureFlags.starExchangeEnabled) {
      this.showNotification("Tính Năng Đổi Vé", "Tính năng đổi vé bằng Stars sẽ mở khóa trong Sprint tiếp theo!", "info");
      return;
    }

    try {
      const exchangeRes = this.trainingController.exchangeStarsForTicket();
      if (typeof window !== 'undefined' && window.soundEngine && window.soundEngine.playVictory) {
        window.soundEngine.playVictory();
      }
      const newTicketId = exchangeRes.ticket ? exchangeRes.ticket.ticketId : null;
      if (newTicketId) {
        const userGrade = (window.appState.data.user && window.appState.data.user.grade) || null;
        if (!userGrade) {
          this.showNotification("Thiếu Khối Lớp", "Cần cài đặt khối lớp cho tài khoản học sinh (Khối 1-5).", "error");
          return;
        }
        this.examController.startExam(userGrade, newTicketId);
        this.navigateTo('championship_exam_question');
      }
    } catch (err) {
      this.showNotification("Không Đủ Stars", err.message || 'Bạn không đủ Stars để đổi vé thi thử.', "error");
    }
  }

  claimDailyMissionRewardUI() {
    if (!this.trainingController) this.initChampionshipControllers();
    try {
      const claimRes = this.trainingController.claimDailyMissionReward();
      if (claimRes.success && typeof window !== 'undefined' && window.soundEngine && window.soundEngine.playVictory) {
        window.soundEngine.playVictory();
      }
    } catch (err) {
      this.showNotification("Nhiệm Vụ Chưa Hoàn Thành", err.message || 'Chưa hoàn thành đủ 3 nhiệm vụ hằng ngày.', "error");
    }
  }

  startSkillBoostIntroUI(competencyId) {
    if (!competencyId) {
      this.showNotification("Thiếu Năng Lực", "Vui lòng chọn nhóm năng lực để rèn luyện.", "error");
      return;
    }
    this.targetSkillBoostCompId = competencyId;
    this.navigateTo('championship_skill_boost_intro');
  }

  /**
   * Start Skill Boost Session (Requirement 3: Differentiate MISSING_GRADE vs UNSUPPORTED_GRADE)
   */
  startSkillBoostSessionUI(competencyId) {
    if (!this.trainingController) this.initChampionshipControllers();
    
    const userGrade = (window.appState.data.user && window.appState.data.user.grade);
    if (!userGrade) {
      this.showNotification("Thiếu Khối Lớp", "Cần cài đặt khối lớp cho tài khoản học sinh (Khối 1-5).", "error");
      return;
    }

    let ageGroup = null;
    try {
      ageGroup = ChampionshipConfig.resolveAgeGroup(userGrade);
    } catch (err) {
      this.showNotification("Khối Lớp Không Hợp Lệ", err.message, "error");
      return;
    }

    const targetComp = competencyId || this.targetSkillBoostCompId;
    if (!targetComp) {
      this.showNotification("Thiếu Năng Lực", "Cần chọn nhóm năng lực để bắt đầu rèn luyện.", "error");
      return;
    }

    this.trainingController.startSkillBoost(targetComp, ageGroup);
    this.lastSkillBoostFeedback = null;
    this.navigateTo('championship_skill_boost_question');
  }

  /**
   * Submit Skill Boost Answer (Requirement 4: Instance state feedback)
   */
  submitSkillBoostAnswerUI(optionKey) {
    if (!this.trainingController || !this.trainingController.activeSession) return;
    const session = this.trainingController.activeSession;
    const questions = this.trainingController.activeQuestions || [];
    const currentIndex = typeof session.currentQuestionIndex === 'number' ? session.currentQuestionIndex : 0;
    const q = questions[currentIndex];
    if (q) {
      const feedback = this.trainingController.submitAnswer(q.id, optionKey);
      this.lastSkillBoostFeedback = feedback;
      if (feedback.isCorrect && typeof window !== 'undefined' && window.soundEngine && window.soundEngine.playVictory) {
        window.soundEngine.playVictory();
      }
    }
  }

  nextSkillBoostQuestionUI() {
    this.lastSkillBoostFeedback = null;
    if (!this.trainingController || !this.trainingController.activeSession) return;
    const session = this.trainingController.activeSession;
    const questions = this.trainingController.activeQuestions || [];
    const answeredCount = Object.keys(session.answers || {}).length;

    if (answeredCount >= questions.length) {
      this.trainingController.completeSkillBoost();
      this.navigateTo('championship_skill_boost_complete');
    } else {
      this.navigateTo('championship_skill_boost_question');
    }
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
      case 'championship_home':
        this.container.innerHTML = ChampionshipViews.renderHome();
        break;
      case 'championship_exam_detail':
        this.container.innerHTML = ChampionshipViews.renderExamDetail();
        break;
      case 'championship_exam_ready':
        this.container.innerHTML = ChampionshipViews.renderExamReady();
        break;
      case 'championship_exam_question':
        this.container.innerHTML = ChampionshipViews.renderExamQuestion();
        break;
      case 'championship_exam_review':
        this.container.innerHTML = ChampionshipViews.renderExamReview();
        break;
      case 'championship_exam_processing':
        this.container.innerHTML = ChampionshipUIComponents.renderProcessingState();
        break;
      case 'championship_exam_result':
        this.container.innerHTML = ChampionshipViews.renderExamResult();
        break;
      case 'championship_skill_boost_intro':
        this.container.innerHTML = ChampionshipViews.renderSkillBoostIntro(this.targetSkillBoostCompId);
        break;
      case 'championship_skill_boost_question':
        this.container.innerHTML = ChampionshipViews.renderSkillBoostQuestion();
        break;
      case 'championship_skill_boost_complete':
        this.container.innerHTML = ChampionshipViews.renderSkillBoostComplete();
        break;
      default:
        this.container.innerHTML = Views.renderHome();
    }
  }
}

if (typeof window !== 'undefined') window.AppController = AppController;
if (typeof globalThis !== 'undefined') globalThis.AppController = AppController;

if (typeof window !== 'undefined') {
  window.app = new AppController();
}

if (typeof document !== 'undefined' && document.addEventListener) {
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof window !== 'undefined' && window.app) window.app.init();
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AppController };
}
