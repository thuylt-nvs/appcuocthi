/* ==========================================================================
   NovaStars Universe × NVS Championship 3D — Master App Orchestrator
   Mobile-First Touch Ergonomics, 3D Galaxy, Exam Engine & Gamification
   ========================================================================== */

class NovaStarsApp {
  constructor() {
    this.currentView = 'galaxy'; // galaxy | exam | skill_boost | minigame | profile
    this.universe = null;
    this.miniGame = null;
    this.activePlanetModalData = null;

    // Persistent User State
    this.state = this.loadState();

    // Exam runtime state
    this.activeExam = null;
    this.examTimer = null;
    this.examTimeLeft = 600; // 10 minutes

    // Skill Boost runtime state
    this.activeSkillBoost = null;

    this.init();
  }

  loadState() {
    const saved = localStorage.getItem('novastars_universe_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn("Could not parse saved state:", e);
      }
    }
    return {
      xp: 450,
      stars: 18,
      streak: 5,
      grade: 'GRADE_1_3', // or 'GRADE_4_5'
      competencyScores: {
        NL1: 85,
        NL2: 70,
        NL3: 90,
        NL4: 80,
        NL5: 75,
        NL6: 95,
        NL7: 80
      },
      badges: [
        { id: 'b1', name: 'Chiến Binh Vũ Trụ', icon: '🌟', desc: 'Gia nhập NovaStars Universe' },
        { id: 'b2', name: 'Ngôi Sao Tự Lập', icon: '🎯', desc: 'Hoàn thành bài thi Mục đích sống' },
        { id: 'b3', name: 'Bậc Thầy Cảm Xúc', icon: '❤️', desc: 'Đạt điểm tuyệt đối Trí tuệ cảm xúc' }
      ]
    };
  }

  saveState() {
    localStorage.setItem('novastars_universe_state', JSON.stringify(this.state));
    this.updateHUD();
  }

  init() {
    // 1. Initialize 3D Universe Scene
    try {
      this.universe = new UniverseSceneEngine('three-canvas-container', {
        onPlanetSelect: (planetData) => this.showPlanetModal(planetData)
      });
      // Initialize Mini-Game Engine
      this.miniGame = new StarCollectorGame(this.universe, {
        onScoreUpdate: (data) => this.updateMiniGameHUD(data),
        onFinish: (result) => this.onMiniGameFinish(result)
      });
      this.universe.activeMiniGame = this.miniGame;
    } catch (e) {
      console.warn("Could not initialize Three.js 3D Universe:", e);
    }

    // 2. Bind DOM Events & Navigation
    this.bindEvents();

    // 3. Update HUD
    this.updateHUD();

    // 4. Default View: Galaxy
    this.switchView('galaxy');
  }

  bindEvents() {
    // Bottom Nav Tabs
    document.querySelectorAll('.ns-nav-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        if (view) {
          if (window.soundEngine) window.soundEngine.playPop();
          this.switchView(view);
        }
      });
    });

    // Sound toggle button
    const soundBtn = document.getElementById('btn-sound-toggle');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        if (window.soundEngine) {
          const isMuted = window.soundEngine.toggleMute();
          soundBtn.innerHTML = isMuted ? '🔇' : '🔊';
        }
      });
    }

    // Camera Switch Buttons
    const camOverview = document.getElementById('cam-btn-overview');
    if (camOverview) {
      camOverview.addEventListener('click', () => {
        if (this.universe) this.universe.resetOverview();
        if (window.soundEngine) window.soundEngine.playPop();
      });
    }

    const camClose = document.getElementById('cam-btn-close');
    if (camClose) {
      camClose.addEventListener('click', () => {
        if (this.universe) {
          // Focus nearest planet NL1
          this.universe.focusPlanetById('NL1');
        }
        if (window.soundEngine) window.soundEngine.playPop();
      });
    }

    // Planet Modal Actions
    const modalClose = document.getElementById('planet-modal-close');
    const modalBackdrop = document.getElementById('planet-modal-backdrop');
    if (modalClose) modalClose.addEventListener('click', () => this.hidePlanetModal());
    if (modalBackdrop) modalBackdrop.addEventListener('click', () => this.hidePlanetModal());

    const modalBtnBoost = document.getElementById('planet-modal-btn-boost');
    if (modalBtnBoost) {
      modalBtnBoost.addEventListener('click', () => {
        if (this.activePlanetModalData && this.activePlanetModalData.id !== 'BASE') {
          this.hidePlanetModal();
          this.startSkillBoost(this.activePlanetModalData.id);
        }
      });
    }

    const modalBtnExam = document.getElementById('planet-modal-btn-exam');
    if (modalBtnExam) {
      modalBtnExam.addEventListener('click', () => {
        this.hidePlanetModal();
        this.startExam(this.state.grade);
      });
    }
  }

  updateHUD() {
    const elXp = document.getElementById('hud-xp-val');
    const elStars = document.getElementById('hud-stars-val');
    const elStreak = document.getElementById('hud-streak-val');

    if (elXp) elXp.textContent = this.state.xp;
    if (elStars) elStars.textContent = this.state.stars;
    if (elStreak) elStreak.textContent = this.state.streak;
  }

  switchView(viewName) {
    this.currentView = viewName;

    // Update Bottom Nav active states
    document.querySelectorAll('.ns-nav-item').forEach((item) => {
      if (item.dataset.view === viewName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Hide all overlays first
    const overlays = ['view-exam', 'view-skill-boost', 'view-profile', 'view-minigame-lobby'];
    overlays.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.classList.add('hidden');
    });

    // Controls overlay & hint visibility in galaxy view
    const controls3D = document.getElementById('3d-controls-overlay');
    const hint3D = document.getElementById('3d-hint-banner');

    if (viewName === 'galaxy') {
      if (controls3D) controls3D.style.display = 'flex';
      if (hint3D) hint3D.style.display = 'flex';
      if (this.universe) this.universe.resetOverview();
    } else {
      if (controls3D) controls3D.style.display = 'none';
      if (hint3D) hint3D.style.display = 'none';
    }

    // Show selected view
    switch (viewName) {
      case 'galaxy':
        break;
      case 'championship':
        this.renderChampionshipLobby();
        break;
      case 'skill_boost':
        this.renderSkillBoostLobby();
        break;
      case 'minigame':
        this.renderMiniGameLobby();
        break;
      case 'profile':
        this.renderProfile();
        break;
    }
  }

  showPlanetModal(planetData) {
    if (!planetData) return;
    this.activePlanetModalData = planetData;

    const modal = document.getElementById('planet-modal');
    const backdrop = document.getElementById('planet-modal-backdrop');
    if (!modal) return;

    if (window.soundEngine) window.soundEngine.playPop();

    document.getElementById('planet-modal-icon').textContent = planetData.icon;
    document.getElementById('planet-modal-title').textContent = planetData.name;
    document.getElementById('planet-modal-desc').textContent = planetData.desc;

    const btnBoost = document.getElementById('planet-modal-btn-boost');
    if (planetData.isBase) {
      if (btnBoost) btnBoost.style.display = 'none';
    } else {
      if (btnBoost) {
        btnBoost.style.display = 'inline-flex';
        btnBoost.textContent = `⚡ Luyện Năng Lực ${planetData.id}`;
      }
    }

    modal.classList.add('show');
    if (backdrop) backdrop.classList.add('show');
  }

  hidePlanetModal() {
    const modal = document.getElementById('planet-modal');
    const backdrop = document.getElementById('planet-modal-backdrop');
    if (modal) modal.classList.remove('show');
    if (backdrop) backdrop.classList.remove('show');
    this.activePlanetModalData = null;
  }

  /* ==========================================================================
     Championship Exam Flow
     ========================================================================== */
  renderChampionshipLobby() {
    const el = document.getElementById('view-exam');
    if (!el) return;
    el.classList.remove('hidden');

    el.innerHTML = `
      <div class="ns-view-header">
        <h2 class="ns-view-title"><span>🏆</span> Đấu Trường NVS Championship</h2>
        <button class="ns-icon-btn" onclick="window.app.switchView('galaxy')">✕</button>
      </div>

      <div class="ns-card" style="background: linear-gradient(135deg, rgba(30, 27, 75, 0.9), rgba(49, 46, 129, 0.9)); border-color: #FACC15;">
        <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 12px;">
          <div style="font-size: 2.8rem;">🌟</div>
          <div>
            <h3 style="font-size: 1.25rem; font-weight: 900; color: #FDE047;">Giải Vô Địch Năng Lực 2026</h3>
            <p style="font-size: 0.9rem; color: #E0E7FF; font-weight: 700;">Đấu trường thử thách bản lĩnh học sinh toàn diện</p>
          </div>
        </div>
        <p style="font-size: 0.88rem; color: #CBD5E1; line-height: 1.5; margin-bottom: 16px;">
          Bài thi gồm 5 câu hỏi tình huống thực tế chuẩn 7 năng lực NVS (NL1–NL7). Thời gian làm bài 10 phút. Nhận ngay phân tích biểu đồ Radar sau khi hoàn thành!
        </p>

        <div style="margin-bottom: 18px;">
          <label style="display: block; font-weight: 800; font-size: 0.92rem; color: #F8FAFC; margin-bottom: 8px;">Chọn Bảng Thi Của Em:</label>
          <div style="display: flex; gap: 10px;">
            <button class="ns-btn-3d ns-btn-outline ${this.state.grade === 'GRADE_1_3' ? 'selected' : ''}" style="flex: 1; padding: 12px; font-size: 0.92rem; ${this.state.grade === 'GRADE_1_3' ? 'border-color: #FACC15; background: rgba(250, 204, 21, 0.2);' : ''}" onclick="window.app.selectGrade('GRADE_1_3')">
              🎒 Khối 1–3
            </button>
            <button class="ns-btn-3d ns-btn-outline ${this.state.grade === 'GRADE_4_5' ? 'selected' : ''}" style="flex: 1; padding: 12px; font-size: 0.92rem; ${this.state.grade === 'GRADE_4_5' ? 'border-color: #FACC15; background: rgba(250, 204, 21, 0.2);' : ''}" onclick="window.app.selectGrade('GRADE_4_5')">
              🚀 Khối 4–5
            </button>
          </div>
        </div>

        <button class="ns-btn-3d ns-btn-gold" style="width: 100%; font-size: 1.1rem; padding: 14px;" onclick="window.app.startExam('${this.state.grade}')">
          <span>Bắt Đầu Làm Bài Thi 🚀</span>
        </button>
      </div>

      <div class="ns-card">
        <h4 style="font-weight: 800; font-size: 1.05rem; margin-bottom: 10px; color: #38BDF8;">📋 Hướng Dẫn Tham Gia</h4>
        <ul style="padding-left: 20px; font-size: 0.88rem; color: #94A3B8; line-height: 1.6;">
          <li>Mỗi câu hỏi có 4 lựa chọn, hãy đọc kỹ tình huống để tìm cách ứng xử tự tin và tích cực nhất.</li>
          <li>Đồng hồ đếm ngược tự động nộp bài khi hết giờ.</li>
          <li>Đạt điểm cao để thăng hạng và tỏa sáng trên bản đồ vũ trụ 3D!</li>
        </ul>
      </div>
    `;
  }

  selectGrade(grade) {
    this.state.grade = grade;
    this.saveState();
    this.renderChampionshipLobby();
  }

  startExam(grade) {
    let questions = [];
    if (grade === 'GRADE_4_5' && typeof PILOT_EXAM_G45 !== 'undefined') {
      questions = PILOT_EXAM_G45;
    } else if (typeof PILOT_EXAM_G13 !== 'undefined') {
      questions = PILOT_EXAM_G13;
    }

    if (!questions || questions.length === 0) {
      alert("Đang nạp ngân hàng câu hỏi...");
      return;
    }

    this.activeExam = {
      grade: grade,
      questions: questions,
      currentIndex: 0,
      userAnswers: {},
      totalSeconds: 600,
      remainingSeconds: 600
    };

    if (this.examTimer) clearInterval(this.examTimer);
    this.examTimer = setInterval(() => {
      this.activeExam.remainingSeconds--;
      const timerEl = document.getElementById('exam-timer-display');
      if (timerEl) {
        const m = Math.floor(this.activeExam.remainingSeconds / 60);
        const s = this.activeExam.remainingSeconds % 60;
        timerEl.textContent = `⏱️ ${m}:${s < 10 ? '0' : ''}${s}`;
      }
      if (this.activeExam.remainingSeconds <= 0) {
        this.submitExam();
      }
    }, 1000);

    this.renderExamQuestion();
  }

  renderExamQuestion() {
    const el = document.getElementById('view-exam');
    if (!el || !this.activeExam) return;
    el.classList.remove('hidden');

    const q = this.activeExam.questions[this.activeExam.currentIndex];
    const comp = typeof getNVSCompetency === 'function' ? getNVSCompetency(q.primaryCompetencyId) : null;
    const progressPercent = ((this.activeExam.currentIndex + 1) / this.activeExam.questions.length) * 100;

    const m = Math.floor(this.activeExam.remainingSeconds / 60);
    const s = this.activeExam.remainingSeconds % 60;
    const timerStr = `⏱️ ${m}:${s < 10 ? '0' : ''}${s}`;

    el.innerHTML = `
      <div class="ns-view-header">
        <div>
          <span style="font-size: 0.8rem; font-weight: 800; color: #38BDF8;">CÂU HỎI ${this.activeExam.currentIndex + 1}/${this.activeExam.questions.length}</span>
          <h3 style="font-size: 1.15rem; font-weight: 900; color: #FFF;">Đấu Trường NVS</h3>
        </div>
        <div id="exam-timer-display" class="ns-stat-badge streak" style="font-size: 0.95rem;">${timerStr}</div>
      </div>

      <!-- Progress Bar Capsule -->
      <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 999px; overflow: hidden; margin-bottom: 14px;">
        <div style="width: ${progressPercent}%; height: 100%; background: linear-gradient(90deg, #38BDF8, #FACC15); transition: width 0.3s;"></div>
      </div>

      <!-- Question Card -->
      <div class="ns-exam-question-card">
        ${comp ? `
          <div style="display: inline-flex; align-items: center; gap: 6px; background: ${comp.bgColor}; color: ${comp.color}; border: 1.5px solid ${comp.borderColor}; border-radius: 999px; padding: 4px 10px; font-size: 0.8rem; font-weight: 800; margin-bottom: 10px;">
            <span>${comp.icon}</span> <span>${comp.officialNameVi}</span>
          </div>
        ` : ''}
        <p style="font-size: 1.05rem; font-weight: 800; color: #F8FAFC; line-height: 1.55;">
          ${q.stem}
        </p>
      </div>

      <!-- Options List -->
      <div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 18px;">
        ${q.options.map((opt, idx) => {
          const letter = String.fromCharCode(65 + idx);
          const isSelected = this.activeExam.userAnswers[q.itemId] === opt.id;
          return `
            <div class="ns-exam-option-item ${isSelected ? 'selected' : ''}" onclick="window.app.selectExamAnswer('${q.itemId}', '${opt.id}')">
              <div class="ns-option-letter">${letter}</div>
              <div style="flex: 1; font-size: 0.92rem; font-weight: 700; color: #F1F5F9; line-height: 1.4;">${opt.text}</div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Navigation Footer -->
      <div style="display: flex; gap: 10px;">
        ${this.activeExam.currentIndex > 0 ? `
          <button class="ns-btn-3d ns-btn-outline" style="flex: 1;" onclick="window.app.prevExamQuestion()">
            <span>◀ Quay Lại</span>
          </button>
        ` : ''}

        ${this.activeExam.currentIndex < this.activeExam.questions.length - 1 ? `
          <button class="ns-btn-3d ns-btn-primary" style="flex: 2;" onclick="window.app.nextExamQuestion()">
            <span>Câu Tiếp Theo ▶</span>
          </button>
        ` : `
          <button class="ns-btn-3d ns-btn-gold" style="flex: 2;" onclick="window.app.submitExam()">
            <span>Nộp Bài Thi 🏆</span>
          </button>
        `}
      </div>
    `;
  }

  selectExamAnswer(questionId, optionId) {
    if (!this.activeExam) return;
    this.activeExam.userAnswers[questionId] = optionId;
    if (window.soundEngine) window.soundEngine.playPop();
    this.renderExamQuestion();
  }

  nextExamQuestion() {
    if (!this.activeExam) return;
    if (this.activeExam.currentIndex < this.activeExam.questions.length - 1) {
      this.activeExam.currentIndex++;
      if (window.soundEngine) window.soundEngine.playPop();
      this.renderExamQuestion();
    }
  }

  prevExamQuestion() {
    if (!this.activeExam) return;
    if (this.activeExam.currentIndex > 0) {
      this.activeExam.currentIndex--;
      if (window.soundEngine) window.soundEngine.playPop();
      this.renderExamQuestion();
    }
  }

  submitExam() {
    if (!this.activeExam) return;
    clearInterval(this.examTimer);

    let correctCount = 0;
    this.activeExam.questions.forEach((q) => {
      if (this.activeExam.userAnswers[q.itemId] === q.correctOptionId) {
        correctCount++;
        // Boost corresponding competency score
        if (q.primaryCompetencyId && this.state.competencyScores[q.primaryCompetencyId]) {
          this.state.competencyScores[q.primaryCompetencyId] = Math.min(100, this.state.competencyScores[q.primaryCompetencyId] + 5);
        }
      }
    });

    const totalQuestions = this.activeExam.questions.length;
    const earnedXp = correctCount * 30 + 50;
    const earnedStars = correctCount >= 4 ? 3 : correctCount >= 2 ? 2 : 1;

    this.state.xp += earnedXp;
    this.state.stars += earnedStars;
    this.saveState();

    if (window.soundEngine) window.soundEngine.playFanfare();
    this.triggerConfetti();

    this.renderExamResult(correctCount, totalQuestions, earnedXp, earnedStars);
  }

  renderExamResult(correct, total, xp, stars) {
    const el = document.getElementById('view-exam');
    if (!el) return;

    el.innerHTML = `
      <div class="ns-view-header">
        <h2 class="ns-view-title"><span>🌟</span> Kết Quả Thi Đấu Trường</h2>
        <button class="ns-icon-btn" onclick="window.app.switchView('galaxy')">✕</button>
      </div>

      <div class="ns-card" style="text-align: center; border-color: #FACC15; background: linear-gradient(135deg, rgba(30, 27, 75, 0.95), rgba(49, 46, 129, 0.95));">
        <div style="font-size: 3.5rem; margin-bottom: 6px;">🎉</div>
        <h3 style="font-size: 1.5rem; font-weight: 900; color: #FDE047; margin-bottom: 4px;">Chúc Mừng Em!</h3>
        <p style="font-size: 1rem; color: #E0E7FF; font-weight: 700; margin-bottom: 16px;">
          Em đã hoàn thành xuất sắc <strong>${correct}/${total}</strong> câu hỏi chuẩn NVS!
        </p>

        <div style="display: flex; justify-content: center; gap: 14px; margin-bottom: 18px;">
          <div class="ns-stat-badge xp" style="font-size: 1rem; padding: 8px 16px;">⚡ +${xp} XP</div>
          <div class="ns-stat-badge stars" style="font-size: 1rem; padding: 8px 16px;">⭐ +${stars} Stars</div>
        </div>

        <button class="ns-btn-3d ns-btn-gold" style="width: 100%;" onclick="window.app.switchView('profile')">
          <span>Xem Biểu Đồ Radar Năng Lực 📊</span>
        </button>
      </div>

      <div class="ns-card">
        <h4 style="font-size: 1.1rem; font-weight: 800; color: #38BDF8; margin-bottom: 12px;">🔍 Xem Lại Đáp Án & Hướng Dẫn</h4>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${this.activeExam.questions.map((q, idx) => {
            const isCorrect = this.activeExam.userAnswers[q.itemId] === q.correctOptionId;
            const correctOpt = q.options.find(o => o.id === q.correctOptionId);
            return `
              <div style="background: rgba(15, 23, 42, 0.7); border: 2px solid ${isCorrect ? '#10B981' : '#EF4444'}; border-radius: var(--radius-md); padding: 12px;">
                <p style="font-size: 0.9rem; font-weight: 800; color: #FFF; margin-bottom: 4px;">Câu ${idx + 1}: ${q.stem}</p>
                <p style="font-size: 0.85rem; font-weight: 700; color: ${isCorrect ? '#34D399' : '#F87171'};">
                  ${isCorrect ? '✅ Em đã chọn chính xác!' : `❌ Đáp án gợi ý tốt nhất: ${correctOpt ? correctOpt.text : ''}`}
                </p>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <button class="ns-btn-3d ns-btn-outline" style="width: 100%; margin-top: 10px;" onclick="window.app.switchView('galaxy')">
        <span>Trở Về Vũ Trụ 3D 🌌</span>
      </button>
    `;
  }

  /* ==========================================================================
     Skill Boost Flow (NL1–NL7)
     ========================================================================== */
  renderSkillBoostLobby() {
    const el = document.getElementById('view-skill-boost');
    if (!el) return;
    el.classList.remove('hidden');

    const competencies = typeof NVSCompetencies !== 'undefined' ? Object.values(NVSCompetencies) : [];

    el.innerHTML = `
      <div class="ns-view-header">
        <h2 class="ns-view-title"><span>⚡</span> Trạm Rèn Luyện Skill Boost</h2>
        <button class="ns-icon-btn" onclick="window.app.switchView('galaxy')">✕</button>
      </div>

      <p style="font-size: 0.92rem; color: #CBD5E1; margin-bottom: 16px; font-weight: 700;">
        Chọn 1 trong 7 hành tinh năng lực để rèn luyện phản xạ và nhận thêm Sao Năng Lượng:
      </p>

      <div style="display: flex; flex-direction: column; gap: 12px;">
        ${competencies.map((comp) => `
          <div class="ns-card" style="border-left: 6px solid ${comp.color}; cursor: pointer; margin-bottom: 0;" onclick="window.app.startSkillBoost('${comp.id}')">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 2rem;">${comp.icon}</span>
                <div>
                  <h4 style="font-size: 1.05rem; font-weight: 800; color: #FFF;">${comp.officialNameVi}</h4>
                  <p style="font-size: 0.82rem; color: #94A3B8; font-weight: 600;">${comp.coachDescription}</p>
                </div>
              </div>
              <button class="ns-btn-3d ns-btn-primary" style="padding: 8px 14px; font-size: 0.85rem;">Luyện ⚡</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  startSkillBoost(competencyId) {
    let questions = [];
    if (typeof PILOT_SKILL_BOOST_G13 !== 'undefined') {
      questions = PILOT_SKILL_BOOST_G13.filter(q => q.primaryCompetencyId === competencyId);
    }
    if (questions.length === 0 && typeof PILOT_SKILL_BOOST_G13 !== 'undefined') {
      questions = PILOT_SKILL_BOOST_G13; // Fallback all available boost items
    }

    this.activeSkillBoost = {
      compId: competencyId,
      questions: questions.slice(0, 3), // 3 quick boost questions
      currentIndex: 0,
      correctCount: 0
    };

    this.renderSkillBoostQuestion();
  }

  renderSkillBoostQuestion() {
    const el = document.getElementById('view-skill-boost');
    if (!el || !this.activeSkillBoost) return;
    el.classList.remove('hidden');

    const sb = this.activeSkillBoost;
    const q = sb.questions[sb.currentIndex];
    const comp = typeof getNVSCompetency === 'function' ? getNVSCompetency(sb.compId) : null;

    el.innerHTML = `
      <div class="ns-view-header">
        <div>
          <span style="font-size: 0.8rem; font-weight: 800; color: #FACC15;">SKILL BOOST ${sb.currentIndex + 1}/${sb.questions.length}</span>
          <h3 style="font-size: 1.15rem; font-weight: 900; color: #FFF;">${comp ? comp.officialNameVi : 'Rèn Luyện Năng Lực'}</h3>
        </div>
        <button class="ns-icon-btn" onclick="window.app.switchView('skill_boost')">✕</button>
      </div>

      <div class="ns-exam-question-card">
        <p style="font-size: 1.05rem; font-weight: 800; color: #F8FAFC; line-height: 1.55;">
          ${q.stem}
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px;">
        ${q.options.map((opt, idx) => {
          const letter = String.fromCharCode(65 + idx);
          return `
            <div class="ns-exam-option-item" onclick="window.app.answerSkillBoost('${opt.id}', '${q.correctOptionId}')">
              <div class="ns-option-letter">${letter}</div>
              <div style="flex: 1; font-size: 0.92rem; font-weight: 700; color: #F1F5F9; line-height: 1.4;">${opt.text}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  answerSkillBoost(selectedId, correctId) {
    if (!this.activeSkillBoost) return;
    const isCorrect = selectedId === correctId;
    if (isCorrect) {
      this.activeSkillBoost.correctCount++;
      if (window.soundEngine) window.soundEngine.playCorrect();
    } else {
      if (window.soundEngine) window.soundEngine.playPop();
    }

    if (this.activeSkillBoost.currentIndex < this.activeSkillBoost.questions.length - 1) {
      this.activeSkillBoost.currentIndex++;
      setTimeout(() => this.renderSkillBoostQuestion(), 250);
    } else {
      // Completed Boost
      const earnedXp = this.activeSkillBoost.correctCount * 25 + 30;
      const earnedStars = 2;
      this.state.xp += earnedXp;
      this.state.stars += earnedStars;
      if (this.state.competencyScores[this.activeSkillBoost.compId]) {
        this.state.competencyScores[this.activeSkillBoost.compId] = Math.min(100, this.state.competencyScores[this.activeSkillBoost.compId] + 8);
      }
      this.saveState();
      this.triggerConfetti();
      if (window.soundEngine) window.soundEngine.playFanfare();

      const el = document.getElementById('view-skill-boost');
      if (el) {
        el.innerHTML = `
          <div class="ns-card" style="text-align: center; border-color: #38BDF8; margin-top: 30px;">
            <div style="font-size: 3rem; margin-bottom: 8px;">⚡</div>
            <h3 style="font-size: 1.4rem; font-weight: 900; color: #38BDF8; margin-bottom: 6px;">Bứt Phá Năng Lực Thành Công!</h3>
            <p style="font-size: 0.95rem; color: #CBD5E1; margin-bottom: 16px;">
              Em đã hoàn thành thử thách rèn luyện với <strong>+${earnedXp} XP</strong> và <strong>+${earnedStars} Stars</strong>!
            </p>
            <button class="ns-btn-3d ns-btn-primary" style="width: 100%;" onclick="window.app.switchView('galaxy')">
              <span>Tiếp Tục Khám Phá Vũ Trụ 🌌</span>
            </button>
          </div>
        `;
      }
    }
  }

  /* ==========================================================================
     Mini-Game 3D Flow
     ========================================================================== */
  renderMiniGameLobby() {
    const el = document.getElementById('view-minigame-lobby');
    if (!el) return;
    el.classList.remove('hidden');

    el.innerHTML = `
      <div class="ns-view-header">
        <h2 class="ns-view-title"><span>🚀</span> Trạm Chiến Binh Ngôi Sao 3D</h2>
        <button class="ns-icon-btn" onclick="window.app.switchView('galaxy')">✕</button>
      </div>

      <div class="ns-card" style="background: linear-gradient(135deg, rgba(30, 27, 75, 0.9), rgba(59, 130, 246, 0.4)); border-color: #38BDF8;">
        <div style="text-align: center; margin-bottom: 16px;">
          <div style="font-size: 3.5rem;" class="animate-bounce">🛸</div>
          <h3 style="font-size: 1.35rem; font-weight: 900; color: #FDE047;">Star Collector 3D</h3>
          <p style="font-size: 0.9rem; color: #CBD5E1; font-weight: 700;">Lái Tàu Sao Nova Thu Thập 7 Tinh Thể Năng Lượng</p>
        </div>

        <p style="font-size: 0.88rem; color: #E2E8F0; line-height: 1.5; margin-bottom: 16px;">
          🎮 <strong>Cách Chơi:</strong> Dùng nút cảm ứng <strong>Trái / Phải</strong> (hoặc vuốt màn hình / phím A, D trên máy tính) để điều khiển tàu nhặt tinh thể màu và né tránh các mảnh đá thiên thạch!
        </p>

        <button class="ns-btn-3d ns-btn-gold" style="width: 100%; font-size: 1.1rem; padding: 14px;" onclick="window.app.startMiniGame()">
          <span>Khởi Động Phi Thuyền Ngay! 🛸</span>
        </button>
      </div>
    `;
  }

  startMiniGame() {
    const lobby = document.getElementById('view-minigame-lobby');
    if (lobby) lobby.classList.add('hidden');

    if (this.miniGame) {
      this.miniGame.start();
    }
  }

  updateMiniGameHUD(data) {
    const scoreEl = document.getElementById('mg-score-val');
    const timerEl = document.getElementById('mg-timer-val');
    const shieldEl = document.getElementById('mg-shield-val');

    if (scoreEl) scoreEl.textContent = data.score;
    if (timerEl) timerEl.textContent = `${data.timeLeft}s`;
    if (shieldEl) {
      let hearts = '';
      for (let i = 0; i < data.shields; i++) hearts += '❤️';
      shieldEl.textContent = hearts || '💥';
    }
  }

  onMiniGameFinish(result) {
    this.state.xp += result.xp;
    this.state.stars += result.stars;
    this.saveState();
    this.triggerConfetti();

    const el = document.getElementById('view-minigame-lobby');
    if (el) {
      el.classList.remove('hidden');
      el.innerHTML = `
        <div class="ns-card" style="text-align: center; border-color: #FACC15; margin-top: 30px; background: linear-gradient(135deg, rgba(30, 27, 75, 0.95), rgba(49, 46, 129, 0.95));">
          <div style="font-size: 3.5rem; margin-bottom: 6px;">🏆</div>
          <h3 style="font-size: 1.45rem; font-weight: 900; color: #FDE047; margin-bottom: 6px;">Hoàn Thành Chuyến Bay!</h3>
          <p style="font-size: 1rem; color: #CBD5E1; margin-bottom: 16px;">
            Điểm Thu Thập: <strong>${result.score}</strong> | Nhận Thưởng: <strong>+${result.xp} XP</strong> & <strong>+${result.stars} Stars</strong>!
          </p>
          <button class="ns-btn-3d ns-btn-gold" style="width: 100%; margin-bottom: 10px;" onclick="window.app.startMiniGame()">
            <span>Chơi Lại Vòng Nữa 🔄</span>
          </button>
          <button class="ns-btn-3d ns-btn-outline" style="width: 100%;" onclick="window.app.switchView('galaxy')">
            <span>Trở Về Bản Đồ Vũ Trụ 🌌</span>
          </button>
        </div>
      `;
    }
  }

  /* ==========================================================================
     Profile & 7-Axis Radar Chart View
     ========================================================================== */
  renderProfile() {
    const el = document.getElementById('view-profile');
    if (!el) return;
    el.classList.remove('hidden');

    el.innerHTML = `
      <div class="ns-view-header">
        <h2 class="ns-view-title"><span>👤</span> Hồ Sơ Anh Hùng & Năng Lực</h2>
        <button class="ns-icon-btn" onclick="window.app.switchView('galaxy')">✕</button>
      </div>

      <!-- Hero Summary Card -->
      <div class="ns-card" style="text-align: center;">
        <div style="font-size: 3.2rem; margin-bottom: 6px;">👧</div>
        <h3 style="font-size: 1.4rem; font-weight: 900; color: #FDE047; margin-bottom: 2px;">Bé Su — Anh Hùng Vũ Trụ</h3>
        <p style="font-size: 0.88rem; color: #94A3B8; font-weight: 700; margin-bottom: 12px;">Cấp Độ: Ngôi Sao Tinh Anh 🌟</p>

        <div style="display: flex; justify-content: center; gap: 12px;">
          <div class="ns-stat-badge xp">⚡ ${this.state.xp} XP</div>
          <div class="ns-stat-badge stars">⭐ ${this.state.stars} Stars</div>
          <div class="ns-stat-badge streak">🔥 ${this.state.streak} Ngày</div>
        </div>
      </div>

      <!-- Radar Chart Card -->
      <div class="ns-card">
        <h4 style="font-size: 1.1rem; font-weight: 800; color: #38BDF8; margin-bottom: 14px; text-align: center;">
          📊 Biểu Đồ 7 Năng Lực Cốt Lõi NVS
        </h4>
        <div class="ns-radar-container">
          <canvas id="nvs-radar-canvas" width="340" height="340" style="width: 320px; height: 320px;"></canvas>
        </div>
      </div>

      <!-- Badges Case -->
      <div class="ns-card">
        <h4 style="font-size: 1.1rem; font-weight: 800; color: #FACC15; margin-bottom: 12px;">🏅 Tủ Cúp Huy Hiệu</h4>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${this.state.badges.map(b => `
            <div style="display: flex; align-items: center; gap: 12px; background: rgba(15, 23, 42, 0.7); border: 2px solid rgba(250, 204, 21, 0.3); border-radius: var(--radius-md); padding: 10px 14px;">
              <span style="font-size: 1.8rem;">${b.icon}</span>
              <div>
                <h5 style="font-size: 0.95rem; font-weight: 800; color: #FFF;">${b.name}</h5>
                <p style="font-size: 0.8rem; color: #94A3B8; font-weight: 600;">${b.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Render Radar Chart on Next Animation Frame
    setTimeout(() => {
      const canvas = document.getElementById('nvs-radar-canvas');
      if (canvas && typeof NVSRadarChart !== 'undefined') {
        NVSRadarChart.render(canvas, this.state.competencyScores);
      }
    }, 50);
  }

  /* ==========================================================================
     Confetti Blast Particle System
     ========================================================================== */
  triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#FACC15', '#38BDF8', '#EC4899', '#10B981', '#F97316', '#8B5CF6'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.7) * 18,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 10,
        opacity: 1
      });
    }

    let frame = 0;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach((p) => {
        if (p.opacity > 0) {
          alive = true;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.45; // Gravity
          p.rotation += p.vr;
          p.opacity -= 0.015;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });

      frame++;
      if (alive && frame < 120) {
        requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    render();
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new NovaStarsApp();
});
