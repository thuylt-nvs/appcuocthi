/* ==========================================================================
   NovaStars / Antigravity — Championship Training Screen Views (UI Slice A)
   Renders from actual controller and state data (no hardcoded screen values)
   ========================================================================== */

const ChampionshipViews = {

  /**
   * 1. Championship Training Home View (championship_home)
   */
  renderHome() {
    const data = (typeof window !== 'undefined' && window.appState && window.appState.data) || {};
    const repo = new LocalStorageRepository(typeof window !== 'undefined' ? window.appState : null);
    const stateService = new ChampionshipStateService(repo);
    stateService.ensureStateSchema();

    const todayTickets = stateService.getTodayTickets();
    const activeTicket = todayTickets.find(t => t.status === 'AVAILABLE' || t.status === 'RESERVED') || todayTickets[0];
    const activeObj = stateService.getActiveReservedAttempt();
    const activeExam = activeObj ? activeObj.attempt : null;
    const missions = stateService.getTodayMissions();

    const userGrade = data.user ? data.user.grade : null;
    let ageGroup = null;
    let gradeError = null;

    try {
      if (!userGrade) throw new Error("Chưa cài đặt khối lớp cho tài khoản học sinh.");
      ageGroup = ChampionshipConfig.resolveAgeGroup(userGrade);
    } catch (err) {
      gradeError = err.message;
    }

    return `
      <div class="ns-view" data-view="championship_home" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box;">
        ${ChampionshipUIComponents.renderHeader({
          title: "Championship Training",
          subtitle: userGrade ? `Khối ${userGrade} (${ageGroup === 'GRADE_1_3' ? 'Khối 1–3' : 'Khối 4–5'})` : 'Chưa cài đặt lớp',
          isExamMode: false,
          onBack: "window.app.navigateTo('home')"
        })}

        <div style="flex: 1; padding: 14px; display: flex; flex-direction: column; gap: 14px; overflow-y: auto; overflow-x: hidden; box-sizing: border-box; width: 100%;">
          
          ${gradeError ? `
            <div style="background: #FEE2E2; border: 2.5px solid #EF4444; color: #991B1B; padding: 12px; border-radius: 12px; font-weight: 700; text-align: center; box-sizing: border-box; width: 100%;">
              ⚠️ ${gradeError} (Cần cài đặt Khối Lớp 1–5 để thi thử)
            </div>
          ` : ''}

          <!-- 1. Countdown & Championship Identity Widget -->
          ${ChampionshipUIComponents.renderCountdownWidget({
            targetTimestamp: ChampionshipConfig.competitionTargetTimestamp
          })}

          <!-- 2. Today's Training & 1 Dominant CTA Card -->
          ${ChampionshipUIComponents.renderTicketCard({
            ticket: activeTicket,
            activeExam,
            onStartExam: activeExam ? "window.app.resumeActiveExamView()" : "window.app.navigateTo('championship_exam_detail')",
            onExchangeStar: "window.app.exchangeStarsForTicketUI()"
          })}

          <!-- 3. Daily Missions Widget -->
          ${ChampionshipUIComponents.renderDailyMissionsWidget({
            missions,
            onClaimReward: "window.app.claimDailyMissionRewardUI()"
          })}

          <!-- 4. Secondary Navigation: Practice by Competency (NL1–NL7) -->
          <div class="ns-card" style="background: #F8FAFC; border: 2px solid #E2E8F0; box-sizing: border-box; width: 100%;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <h3 style="font-family: var(--font-display); font-weight: 700; font-size: 0.98rem; color: #475569; margin: 0;">🚀 Rèn Luyện Theo Năng Lực (Khám Phá)</h3>
              <span style="font-size: 0.75rem; background: #E2E8F0; color: #475569; padding: 3px 8px; border-radius: 999px; font-weight: 700;">7 Nhóm NL</span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; box-sizing: border-box; width: 100%;">
              ${['NL1', 'NL2', 'NL3', 'NL4', 'NL5', 'NL6', 'NL7'].map(code => {
                const comp = typeof getNVSCompetency === 'function' ? getNVSCompetency(code) : { displayName: code, icon: '⭐' };
                return `
                  <div style="background: #FFFFFF; border: 1.5px solid #CBD5E1; padding: 10px; border-radius: 8px; text-align: center; cursor: pointer; box-sizing: border-box; width: 100%;" onclick="window.app.startSkillBoostIntroUI('${code}')">
                    <div style="font-size: 1.3rem; margin-bottom: 2px;">${comp.icon || '⭐'}</div>
                    <div style="font-family: var(--font-display); font-size: 0.78rem; font-weight: 700; color: #334155; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${comp.displayName || code}</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

        </div>

        ${NSComponents.renderBottomNav({
          activeTab: 'home',
          onTabChange: "window.app.navigateToTab"
        })}
      </div>
    `;
  },

  /**
   * 2. Daily Exam Detail View (championship_exam_detail)
   */
  renderExamDetail() {
    const data = (typeof window !== 'undefined' && window.appState && window.appState.data) || {};
    const userGrade = data.user ? data.user.grade : null;
    let blueprint = null;
    let gradeError = null;

    try {
      if (!userGrade) throw new Error("MISSING_GRADE: Chưa thiết lập khối lớp cho học sinh. Vui lòng chọn khối lớp 1–5.");
      const ageGroup = ChampionshipConfig.resolveAgeGroup(userGrade);
      blueprint = ChampionshipConfig.examBlueprints[ageGroup];
    } catch (err) {
      gradeError = err.message;
    }

    const repo = new LocalStorageRepository(typeof window !== 'undefined' ? window.appState : null);
    const stateService = new ChampionshipStateService(repo);
    const todayTickets = stateService.getTodayTickets();
    const ticket = todayTickets.find(t => t.status === 'AVAILABLE') || todayTickets[0];
    const rankEligible = ticket ? ChampionshipConfig.resolveRankEligibility(ticket.ticketType) : true;

    return `
      <div class="ns-view" data-view="championship_exam_detail" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box;">
        ${ChampionshipUIComponents.renderHeader({
          title: "Thi Thử Ngày",
          subtitle: blueprint ? blueprint.title : "Championship Exam",
          isExamMode: false,
          onBack: "window.app.navigateTo('championship_home')"
        })}

        <div style="flex: 1; padding: 14px; display: flex; flex-direction: column; gap: 14px; overflow-y: auto; overflow-x: hidden; box-sizing: border-box; width: 100%;">
          
          ${gradeError ? `
            <div class="ns-card" style="border: 3px solid #EF4444; background: #FEF2F2; text-align: center; box-sizing: border-box; width: 100%;">
              <div style="font-size: 2.8rem; margin-bottom: 8px;">⚠️</div>
              <h3 style="font-family: var(--font-display); color: #991B1B; font-weight: 700;">Chưa Thiết Lập Khối Lớp</h3>
              <p style="font-size: 0.92rem; font-weight: 700; color: #7F1D1D; margin: 8px 0 16px 0;">${gradeError}</p>
              <button class="ns-btn ns-btn-primary" onclick="window.app.navigateTo('championship_home')">
                <span>Quay Lại Trang Chủ</span>
              </button>
            </div>
          ` : `
            <div class="ns-card" style="background: linear-gradient(135deg, #1E1B4B, #312E81); color: #FFF; border-color: #FDE047; border-width: 3.5px; box-sizing: border-box; width: 100%;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <h3 style="font-family: var(--font-display); font-size: 1.2rem; color: #FDE047; margin: 0;">
                  📋 ${blueprint.title}
                </h3>
                <span style="font-size: 0.75rem; color: #34D399; background: rgba(52,211,153,0.2); padding: 3px 8px; border-radius: 6px; font-weight: 700;">
                  ${rankEligible ? '🏆 Tính Bảng Xếp Hạng' : '📝 Thi Thử Phụ'}
                </span>
              </div>

              <p style="font-size: 0.9rem; color: #E0E7FF; font-weight: 700; line-height: 1.4; margin-bottom: 14px;">
                ${blueprint.description}
              </p>

              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 10px; margin-bottom: 14px;">
                <div>
                  <div style="font-size: 0.72rem; color: #A5B4FC; font-weight: 700;">SỐ CÂU HỎI</div>
                  <div style="font-family: var(--font-display); font-size: 1.2rem; font-weight: 800; color: #FDE047;">${blueprint.questionCount} câu</div>
                </div>
                <div>
                  <div style="font-size: 0.72rem; color: #A5B4FC; font-weight: 700;">THỜI GIAN</div>
                  <div style="font-family: var(--font-display); font-size: 1.2rem; font-weight: 800; color: #FDE047;">${Math.round(blueprint.durationSeconds / 60)} phút</div>
                </div>
              </div>

              <button class="ns-btn ns-btn-primary ns-squash-press" style="width: 100%; font-size: 1.1rem; min-height: 52px; background: linear-gradient(135deg, #F59E0B, #D97706);" onclick="window.app.startExamFromReadyUI(${userGrade})">
                <span>BẮT ĐẦU BÀI THI 🚀</span>
              </button>
            </div>
          `}

        </div>
      </div>
    `;
  },

  /**
   * 3. Exam Ready View (championship_exam_ready)
   */
  renderExamReady() {
    const data = (typeof window !== 'undefined' && window.appState && window.appState.data) || {};
    const userGrade = data.user ? data.user.grade : null;
    let gradeError = null;

    try {
      if (!userGrade) throw new Error("Chưa cài đặt khối lớp cho tài khoản.");
      ChampionshipConfig.resolveAgeGroup(userGrade);
    } catch (err) {
      gradeError = err.message;
    }

    return `
      <div class="ns-view" data-view="championship_exam_ready" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box;">
        ${ChampionshipUIComponents.renderHeader({
          title: "Sẵn Sàng Làm Bài Thi",
          isExamMode: false,
          onBack: "window.app.navigateTo('championship_home')"
        })}

        <div style="flex: 1; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 16px; box-sizing: border-box; width: 100%;">
          ${gradeError ? `
            <div class="ns-card" style="border: 3px solid #EF4444; background: #FEF2F2; box-sizing: border-box; width: 100%;">
              <p style="font-weight: 700; color: #991B1B;">⚠️ ${gradeError}</p>
              <button class="ns-btn ns-btn-secondary" style="margin-top: 12px;" onclick="window.app.navigateTo('championship_home')">Quay Lại Trang Chủ</button>
            </div>
          ` : `
            <div style="font-size: 3.5rem;" class="animate-bounce">⏱️</div>

            <h2 style="font-family: var(--font-display); font-size: 1.5rem; font-weight: 800; color: #0F172A; margin: 0;">
              Em đã sẵn sàng chưa?
            </h2>

            <p style="font-size: 0.92rem; color: #475569; font-weight: 700; max-width: 320px; line-height: 1.4; margin: 0;">
              Hãy tập trung làm tốt bài thi thử hôm nay nhé!
            </p>

            <button class="ns-btn ns-btn-primary ns-squash-press" style="width: 100%; max-width: 320px; font-size: 1.15rem; min-height: 52px;" onclick="window.app.startExamFromReadyUI(${userGrade})">
              <span>BẮT ĐẦU BÀI THI 🚀</span>
            </button>
            
            <p style="font-size: 0.82rem; color: #64748B; font-weight: 700; margin-top: -6px;">
              Đồng hồ sẽ bắt đầu ngay.
            </p>
          `}
        </div>
      </div>
    `;
  },

  /**
   * 4. Exam Question View (championship_exam_question - EXAM MODE)
   */
  renderExamQuestion() {
    const examController = typeof window !== 'undefined' ? window.examController : null;
    if (!examController || !examController.currentAttempt) {
      return `
        <div class="ns-view" data-view="championship_exam_question" style="padding: 24px; text-align: center;">
          <p style="font-weight: 700; color: #475569;">Không tìm thấy bài thi đang làm. <a href="#" onclick="window.app.navigateTo('championship_home')">Quay về Trang Chủ</a></p>
        </div>
      `;
    }

    const attempt = examController.currentAttempt;
    const questions = examController.activeQuestionPool || [];
    const currentIndex = typeof attempt.currentQuestionIndex === 'number' ? attempt.currentQuestionIndex : 0;
    const currentQuestion = questions[currentIndex] || questions[0];
    const answers = attempt.answers || {};
    const selectedOption = currentQuestion ? answers[currentQuestion.id] : null;
    const flaggedIds = attempt.flaggedQuestionIds || [];
    const isFlagged = currentQuestion ? flaggedIds.includes(currentQuestion.id) : false;
    const remainingSeconds = examController.getRemainingSeconds();

    return `
      <div class="ns-view" data-view="championship_exam_question" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box;">
        ${ChampionshipUIComponents.renderHeader({
          title: `Câu ${currentIndex + 1}/${questions.length}`,
          showTimer: true,
          remainingSeconds,
          isExamMode: true,
          rankEligible: attempt.rankEligible,
          onBack: "window.app.showLeaveExamConfirmModalUI()",
          onToggleFlag: `window.app.toggleExamFlagUI('${currentQuestion ? currentQuestion.id : ''}')`,
          isFlagged
        })}

        <div style="flex: 1; padding: 14px; display: flex; flex-direction: column; gap: 14px; overflow-y: auto; overflow-x: hidden; background: #F8FAFC; box-sizing: border-box; width: 100%;">
          
          ${ChampionshipUIComponents.renderQuestionCard({
            question: currentQuestion,
            questionIndex: currentIndex,
            totalQuestions: questions.length,
            selectedOption,
            isExamMode: true,
            onSelectOption: "window.app.selectExamOptionUI"
          })}

          <!-- Action Controls -->
          <div style="display: flex; justify-content: space-between; gap: 10px; margin-top: auto; box-sizing: border-box; width: 100%;">
            <button class="ns-btn ns-btn-secondary" style="flex: 1; font-size: 0.9rem; min-height: 48px;" ${currentIndex === 0 ? 'disabled' : ''} onclick="window.app.prevExamQuestionUI()">
              <span>← Câu Trước</span>
            </button>

            ${currentIndex < questions.length - 1 ? `
              <button class="ns-btn ns-btn-primary ns-squash-press" style="flex: 1; font-size: 0.9rem; min-height: 48px;" onclick="window.app.nextExamQuestionUI()">
                <span>Câu Tiếp →</span>
              </button>
            ` : `
              <button class="ns-btn ns-btn-primary ns-squash-press" style="flex: 1; font-size: 0.9rem; min-height: 48px; background: linear-gradient(135deg, #10B981, #059669);" onclick="window.app.navigateTo('championship_exam_review')">
                <span>Xem & Nộp Bài 📥</span>
              </button>
            `}
          </div>

        </div>
      </div>
    `;
  },

  /**
   * 5. Review & Submit View (championship_exam_review)
   */
  renderExamReview() {
    const examController = typeof window !== 'undefined' ? window.examController : null;
    if (!examController || !examController.currentAttempt) {
      return `
        <div class="ns-view" data-view="championship_exam_review" style="padding: 24px; text-align: center;">
          <p style="font-weight: 700;">Không tìm thấy bài thi active.</p>
        </div>
      `;
    }

    const attempt = examController.currentAttempt;
    const questions = examController.activeQuestionPool || [];
    const answers = attempt.answers || {};
    const flaggedIds = attempt.flaggedQuestionIds || [];
    const answeredCount = Object.keys(answers).length;
    const remainingSeconds = examController.getRemainingSeconds();

    return `
      <div class="ns-view" data-view="championship_exam_review" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box;">
        ${ChampionshipUIComponents.renderHeader({
          title: "Xem Lại Bài Thi",
          showTimer: true,
          remainingSeconds,
          isExamMode: true,
          onBack: "window.app.navigateTo('championship_exam_question')"
        })}

        <div style="flex: 1; padding: 14px; display: flex; flex-direction: column; gap: 14px; overflow-y: auto; overflow-x: hidden; background: #F8FAFC; box-sizing: border-box; width: 100%;">
          
          <div class="ns-card" style="box-sizing: border-box; width: 100%;">
            <h3 style="font-family: var(--font-display); font-weight: 700; font-size: 1.1rem; color: #0F172A; margin: 0 0 8px 0;">
              📊 Tổng Quan Bài Làm
            </h3>
            <p style="font-size: 0.9rem; font-weight: 700; color: #475569; margin-bottom: 12px;">
              Đã trả lời <b>${answeredCount}</b> / ${questions.length} câu. (${flaggedIds.length} câu đánh dấu 🚩)
            </p>

            ${ChampionshipUIComponents.renderQuestionMatrix({
              totalQuestions: questions.length,
              answers,
              flaggedIds,
              currentIndex: attempt.currentQuestionIndex || 0,
              onJumpToQuestion: "window.app.jumpToExamQuestionUI"
            })}
          </div>

          <button class="ns-btn ns-btn-primary ns-squash-press" style="width: 100%; font-size: 1.1rem; min-height: 52px; background: linear-gradient(135deg, #10B981, #059669); margin-top: auto;" onclick="window.app.showSubmitConfirmModalUI()">
            <span>Nộp Bài Thi Ngay 📥</span>
          </button>

        </div>
      </div>
    `;
  },

  /**
   * 6. Coach Result View (championship_exam_result)
   */
  renderExamResult() {
    const repo = new LocalStorageRepository(typeof window !== 'undefined' ? window.appState : null);
    const stateService = new ChampionshipStateService(repo);
    const analytics = new ChampionshipAnalyticsEngine(repo);

    const latestAttempt = stateService.getLatestCompletedAttempt();
    if (!latestAttempt || !latestAttempt.examResult) {
      return `
        <div class="ns-view" data-view="championship_exam_result" style="padding: 24px; text-align: center;">
          <p style="font-weight: 700; color: #475569;">Chưa có kết quả bài thi nào. <a href="#" onclick="window.app.navigateTo('championship_home')">Quay về Trang Chủ</a></p>
        </div>
      `;
    }

    const examResult = latestAttempt.examResult;
    const coachAdvice = analytics.evaluateCoachAdvice(examResult);

    return `
      <div class="ns-view" data-view="championship_exam_result" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box;">
        ${ChampionshipUIComponents.renderHeader({
          title: "Kết Quả Thi Thử",
          isExamMode: false,
          onBack: "window.app.navigateTo('championship_home')"
        })}

        <div style="flex: 1; padding: 14px; display: flex; flex-direction: column; gap: 14px; overflow-y: auto; overflow-x: hidden; box-sizing: border-box; width: 100%;">
          
          ${ChampionshipUIComponents.renderCoachAdviceCard({
            examResult,
            coachAdvice,
            onStartBoost: "window.app.startSkillBoostIntroUI"
          })}

          <button class="ns-btn ns-btn-secondary" style="width: 100%; min-height: 48px;" onclick="window.app.navigateTo('championship_home')">
            <span>Về Trang Championship 🏠</span>
          </button>

        </div>
      </div>
    `;
  },

  /**
   * 7. Skill Boost Intro View (championship_skill_boost_intro)
   */
  renderSkillBoostIntro(competencyId) {
    if (!competencyId) {
      return `
        <div class="ns-view" data-view="championship_skill_boost_intro" style="padding: 24px; text-align: center;">
          <p style="font-weight: 700; color: #EF4444;">⚠️ MISSING_COMPETENCY: Vui lòng chọn 1 nhóm năng lực để luyện tập.</p>
        </div>
      `;
    }

    const comp = typeof getNVSCompetency === 'function' ? getNVSCompetency(competencyId) : { officialNameVi: competencyId, displayName: competencyId, icon: '⭐', coachDescription: 'Cùng rèn luyện năng lực nhé!' };

    return `
      <div class="ns-view" data-view="championship_skill_boost_intro" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box;">
        ${ChampionshipUIComponents.renderHeader({
          title: "Skill Boost Training",
          subtitle: comp.displayName || competencyId,
          isExamMode: false,
          onBack: "window.app.navigateTo('championship_home')"
        })}

        <div style="flex: 1; padding: 18px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 14px; box-sizing: border-box; width: 100%;">
          <div style="font-size: 3.5rem;">${comp.icon || '⭐'}</div>

          <h2 style="font-family: var(--font-display); font-size: 1.5rem; font-weight: 800; color: var(--primary-blue-dark); margin: 0;">
            ${comp.displayName || competencyId}
          </h2>

          <p style="font-size: 0.92rem; font-weight: 700; color: #475569; max-width: 320px; line-height: 1.4; margin: 0;">
            ${comp.coachDescription || 'Hoàn thành 5 câu hỏi tình huống thực tế để tích lũy XP & Stars!'}
          </p>

          <div style="background: #EFF6FF; border: 2px solid #93C5FD; padding: 10px 16px; border-radius: 10px; font-size: 0.85rem; font-weight: 700; color: #1E40AF; max-width: 320px;">
            ⚡ Thưởng +6 XP / câu đúng | ⭐ +10 Stars hoàn thành
          </div>

          <button class="ns-btn ns-btn-primary ns-squash-press" style="width: 100%; max-width: 320px; font-size: 1.15rem; min-height: 52px; margin-top: 6px;" onclick="window.app.startSkillBoostSessionUI('${competencyId}')">
            <span>Bắt Đầu Luyện Tập 🚀</span>
          </button>
        </div>
      </div>
    `;
  },

  /**
   * 8. Skill Boost Question View (championship_skill_boost_question)
   */
  renderSkillBoostQuestion() {
    const trainingController = typeof window !== 'undefined' ? window.trainingController : null;
    if (!trainingController || !trainingController.activeSession) {
      return `
        <div class="ns-view" data-view="championship_skill_boost_question" style="padding: 24px; text-align: center;">
          <p style="font-weight: 700; color: #475569;">Không có bài luyện Skill Boost nào đang hoạt động. <a href="#" onclick="window.app.navigateTo('championship_home')">Quay về Trang Chủ</a></p>
        </div>
      `;
    }

    const session = trainingController.activeSession;
    const questions = trainingController.activeQuestions || [];
    const currentIndex = typeof session.currentQuestionIndex === 'number' ? session.currentQuestionIndex : 0;
    const currentQuestion = questions[currentIndex] || questions[0];

    let lastFeedback = (typeof window !== 'undefined' && window.app) ? window.app.lastSkillBoostFeedback : null;
    if (!lastFeedback && currentQuestion && session.answers && session.answers[currentQuestion.id]) {
      const savedAns = session.answers[currentQuestion.id];
      lastFeedback = {
        questionId: currentQuestion.id,
        isCorrect: savedAns.isCorrect,
        isAlreadyAnswered: true,
        correctAnswer: currentQuestion.correctAnswer,
        explanationShort: currentQuestion.explanationShort,
        explanationFull: currentQuestion.explanationFull,
        xpGranted: 0
      };
    }

    return `
      <div class="ns-view" data-view="championship_skill_boost_question" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box;">
        ${ChampionshipUIComponents.renderHeader({
          title: `Skill Boost (${session.competencyId || 'NVS'})`,
          subtitle: `Câu ${currentIndex + 1}/${questions.length}`,
          isExamMode: false,
          onBack: "window.app.navigateTo('championship_home')"
        })}

        <div style="flex: 1; padding: 14px; display: flex; flex-direction: column; gap: 14px; overflow-y: auto; overflow-x: hidden; box-sizing: border-box; width: 100%;">
          
          ${ChampionshipUIComponents.renderQuestionCard({
            question: currentQuestion,
            questionIndex: currentIndex,
            totalQuestions: questions.length,
            selectedOption: (session.answers && session.answers[currentQuestion.id]) ? session.answers[currentQuestion.id].selectedOption : null,
            isExamMode: false,
            onSelectOption: "window.app.submitSkillBoostAnswerUI"
          })}

          ${lastFeedback ? ChampionshipUIComponents.renderImmediateFeedbackCard({
            isCorrect: lastFeedback.isCorrect,
            isAlreadyAnswered: lastFeedback.isAlreadyAnswered,
            correctAnswer: lastFeedback.correctAnswer,
            explanationShort: lastFeedback.explanationShort,
            explanationFull: lastFeedback.explanationFull,
            xpGranted: lastFeedback.xpGranted,
            onNext: "window.app.nextSkillBoostQuestionUI()"
          }) : ''}

        </div>
      </div>
    `;
  },

  /**
   * 9. Skill Boost Complete View (championship_skill_boost_complete)
   */
  renderSkillBoostComplete() {
    const repo = new LocalStorageRepository(typeof window !== 'undefined' ? window.appState : null);
    const stateService = new ChampionshipStateService(repo);
    const latestSession = stateService.getLatestCompletedTrainingSession();

    const xpEarned = latestSession ? (latestSession.xpEarned || 0) : 30;
    const starsEarned = latestSession ? (latestSession.starsEarned || 10) : 10;
    const compId = latestSession ? latestSession.competencyId : 'NL4';
    const compMeta = typeof getNVSCompetency === 'function' ? getNVSCompetency(compId) : { displayName: compId };

    const missions = stateService.getTodayMissions();

    return `
      <div class="ns-view" data-view="championship_skill_boost_complete" style="flex: 1; display: flex; flex-direction: column; width: 100%; box-sizing: border-box;">
        ${ChampionshipUIComponents.renderHeader({
          title: "Hoàn Thành Rèn Luyện",
          isExamMode: false,
          onBack: "window.app.navigateTo('championship_home')"
        })}

        <div style="flex: 1; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 14px; background: linear-gradient(180deg, #EFF6FF 0%, #F8FAFC 100%); box-sizing: border-box; width: 100%;">
          <div style="display: flex; align-items: center; gap: 8px; background: #DBEAFE; padding: 8px 16px; border-radius: 999px; border: 2px solid #93C5FD;">
            <span style="font-size: 1.5rem;">🐱</span>
            <span style="font-family: var(--font-display); font-weight: 800; color: #1E40AF; font-size: 0.95rem;">Coach Nova Khen Ngợi</span>
          </div>

          <h2 style="font-family: var(--font-display); font-size: 1.5rem; font-weight: 800; color: #1E3A8A; margin: 0;">
            Xuất Sắc Hoàn Thành! 🎉
          </h2>

          <p style="font-size: 0.92rem; font-weight: 700; color: #475569; max-width: 320px; line-height: 1.4; margin: 0;">
            Em đã hoàn thành xuất sắc 5 câu luyện tập <b>${compMeta.displayName || compId} (${compId})</b>!
          </p>

          <!-- Rewards Display Card -->
          <div style="display: flex; gap: 12px; justify-content: center; width: 100%; max-width: 320px; box-sizing: border-box;">
            <div style="flex: 1; background: #FEF3C7; border: 2.5px solid #F59E0B; padding: 12px; border-radius: 12px; font-family: var(--font-display); font-weight: 800; font-size: 1.1rem; color: #D97706; box-shadow: 0 4px 0 #F59E0B;">
              ⚡ +${xpEarned} XP
            </div>
            <div style="flex: 1; background: #FEFCE8; border: 2.5px solid #EAB308; padding: 12px; border-radius: 12px; font-family: var(--font-display); font-weight: 800; font-size: 1.1rem; color: #CA8A04; box-shadow: 0 4px 0 #EAB308;">
              ⭐ +${starsEarned} Stars
            </div>
          </div>

          <!-- Daily Mission Update Card -->
          <div style="background: #F0FDF4; border: 2px solid #86EFAC; padding: 10px 14px; border-radius: 10px; font-size: 0.85rem; font-weight: 700; color: #166534; width: 100%; max-width: 320px; text-align: center; box-sizing: border-box;">
            🎯 Nhiệm Vụ Ngày: Skill Boost ${missions.boostCompleted ? '✅ Đã hoàn thành' : '⏳ 1/3'}
          </div>

          <button class="ns-btn ns-btn-primary ns-squash-press" style="width: 100%; max-width: 320px; font-size: 1.1rem; min-height: 52px; margin-top: 6px;" onclick="window.app.navigateTo('championship_home')">
            <span>Về Trang Championship 🏠</span>
          </button>
        </div>
      </div>
    `;
  }

};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ChampionshipViews };
} else {
  if (typeof window !== 'undefined') {
    window.ChampionshipViews = ChampionshipViews;
  }
}
