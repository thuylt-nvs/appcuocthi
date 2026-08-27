/* ==========================================================================
   NovaStars × NVS Championship — Admin Dashboard Controller
   v0.2.3 Real-Time Telemetry Analytics, Question Bank & Contest Configuration
   ========================================================================== */

class DemoAdminController {
  constructor() {
    this.currentTab = 'overview'; // 'overview', 'telemetry', 'questions', 'config'
    this.telemetryRepo = typeof PilotTelemetryRepository !== 'undefined' ? new PilotTelemetryRepository() : null;
    
    // Contest Configuration State (Persisted in localStorage)
    this.configKey = 'novastars_admin_config_v1';
    this.config = {
      examDurationMinutes: 15,
      allowUnlimitedPractice: true,
      activeSeason: '2026',
      round1Status: 'UPCOMING', // 'UPCOMING', 'LIVE', 'COMPLETED'
      round2Status: 'UPCOMING',
      finalStatus: 'UPCOMING',
      autoExportTelemetry: true
    };
  }

  init() {
    this.loadConfig();
    window.adminController = this;
    this.render();
    console.log('🚀 [AdminDashboard] Admin Controller initialized successfully.');
  }

  loadConfig() {
    try {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem(this.configKey);
        if (raw) {
          this.config = { ...this.config, ...JSON.parse(raw) };
        }
      }
    } catch (e) {
      console.warn('Could not read admin config:', e);
    }
  }

  saveConfig() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.configKey, JSON.stringify(this.config));
      }
    } catch (e) {
      console.warn('Could not save admin config:', e);
    }
  }

  setTab(tabKey) {
    this.currentTab = tabKey;
    this.render();
  }

  updateConfig(key, value) {
    this.config[key] = value;
    this.saveConfig();
    this.render();
  }

  getTelemetryData() {
    if (this.telemetryRepo) {
      const data = this.telemetryRepo.getAggregatedData();
      if (data && data.length > 0) return data;
    }
    try {
      if (typeof sessionStorage !== 'undefined') {
        const raw = sessionStorage.getItem('novastars_student_pilot_telemetry_aggregated');
        return raw ? JSON.parse(raw) : [];
      }
    } catch (e) {}
    return [];
  }

  getStudentState() {
    try {
      if (typeof sessionStorage !== 'undefined') {
        const raw = sessionStorage.getItem('novastars_student_pilot_v1');
        return raw ? JSON.parse(raw) : null;
      }
    } catch (e) {}
    return null;
  }

  exportTelemetryJSON() {
    try {
      const logs = this.getTelemetryData();
      const studentState = this.getStudentState();
      const exportObj = {
        exportedAt: new Date().toISOString(),
        totalLogs: logs.length,
        studentState: studentState || 'No active session',
        telemetryLogs: logs
      };

      const jsonStr = JSON.stringify(exportObj, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nvs_championship_admin_telemetry_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('Không thể xuất dữ liệu: ' + e.message);
    }
  }

  clearTelemetryLogs() {
    if (confirm('Bạn có chắc chắn muốn xóa toàn bộ nhật ký Telemetry thử nghiệm trong phiên làm việc này?')) {
      try {
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.removeItem('novastars_student_pilot_telemetry_aggregated');
          sessionStorage.removeItem('novastars_student_pilot_telemetry_queue');
        }
        this.render();
      } catch (e) {}
    }
  }

  render() {
    const rootEl = document.getElementById('admin-root');
    if (!rootEl) return;

    const logs = this.getTelemetryData();
    const studentState = this.getStudentState();

    rootEl.innerHTML = `
      <div style="min-height: 100vh; background: #0F172A; color: #F8FAFC; font-family: 'Nunito', sans-serif; display: flex; flex-direction: column;">
        
        <!-- Admin Top Navigation Bar -->
        <header style="background: #1E293B; border-bottom: 3px solid #38BDF8; padding: 14px 24px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 12px rgba(0,0,0,0.4); flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="font-size: 1.8rem;">🏆</div>
            <div>
              <h1 style="font-family: var(--font-display); font-size: 1.35rem; color: #FDE047; margin: 0; font-weight: 800;">
                NovaStars × NVS Championship — Admin Control Panel
              </h1>
              <div style="font-size: 0.82rem; color: #94A3B8; font-weight: 700;">
                Bảng Điều Khiển Ban Tổ Chức & Quản Trị Hệ Thống (v0.2.3B Release)
              </div>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <a href="student_pilot.html" target="_blank" style="background: #2563EB; color: #FFF; text-decoration: none; padding: 8px 14px; border-radius: 8px; font-weight: 800; font-size: 0.85rem; display: flex; align-items: center; gap: 6px;">
              🎓 Bản Học Sinh (Student Pilot) ↗
            </a>
            <button onclick="window.adminController.exportTelemetryJSON()" style="background: #10B981; color: #FFF; border: none; padding: 8px 14px; border-radius: 8px; font-weight: 800; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 6px;">
              📥 Xuất Telemetry JSON
            </button>
          </div>
        </header>

        <!-- Main Admin Body Layout -->
        <div style="flex: 1; display: flex; max-width: 1400px; width: 100%; margin: 0 auto; padding: 24px; gap: 24px; box-sizing: border-box; flex-wrap: wrap;">
          
          <!-- Left Sidebar Menu -->
          <nav style="width: 260px; background: #1E293B; border-radius: 14px; padding: 16px; border: 1.5px solid #334155; display: flex; flex-direction: column; gap: 8px; height: fit-content; min-width: 240px;">
            <div style="font-size: 0.75rem; font-weight: 800; color: #64748B; text-transform: uppercase; letter-spacing: 0.8px; padding: 4px 8px; margin-bottom: 4px;">
              DANH MỤC QUẢN TRỊ
            </div>

            <button onclick="window.adminController.setTab('overview')" style="background: ${this.currentTab === 'overview' ? '#3B82F6' : 'transparent'}; color: ${this.currentTab === 'overview' ? '#FFF' : '#CBD5E1'}; border: none; text-align: left; padding: 12px 14px; border-radius: 10px; font-weight: 800; font-size: 0.92rem; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: all 0.15s ease;">
              <span>📊</span>
              <span>Tổng Quan & Chỉ Số</span>
            </button>

            <button onclick="window.adminController.setTab('telemetry')" style="background: ${this.currentTab === 'telemetry' ? '#3B82F6' : 'transparent'}; color: ${this.currentTab === 'telemetry' ? '#FFF' : '#CBD5E1'}; border: none; text-align: left; padding: 12px 14px; border-radius: 10px; font-weight: 800; font-size: 0.92rem; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: all 0.15s ease;">
              <span>🛰️</span>
              <span>Nhật Ký Telemetry (${logs.length})</span>
            </button>

            <button onclick="window.adminController.setTab('questions')" style="background: ${this.currentTab === 'questions' ? '#3B82F6' : 'transparent'}; color: ${this.currentTab === 'questions' ? '#FFF' : '#CBD5E1'}; border: none; text-align: left; padding: 12px 14px; border-radius: 10px; font-weight: 800; font-size: 0.92rem; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: all 0.15s ease;">
              <span>📚</span>
              <span>Ngân Hàng Câu Hỏi & NL1–NL7</span>
            </button>

            <button onclick="window.adminController.setTab('config')" style="background: ${this.currentTab === 'config' ? '#3B82F6' : 'transparent'}; color: ${this.currentTab === 'config' ? '#FFF' : '#CBD5E1'}; border: none; text-align: left; padding: 12px 14px; border-radius: 10px; font-weight: 800; font-size: 0.92rem; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: all 0.15s ease;">
              <span>⚙️</span>
              <span>Cấu Hình Đấu Trường</span>
            </button>

            <hr style="border: 0; border-top: 1px solid #334155; margin: 12px 0;">

            <div style="background: #0F172A; padding: 12px; border-radius: 10px; border: 1px solid #334155; font-size: 0.78rem; color: #94A3B8; font-weight: 700;">
              <div>🟢 <b>Trạng Thái Server:</b> Hoạt động</div>
              <div style="margin-top: 4px;">⏱️ <b>Mùa Giải:</b> ${this.config.activeSeason}</div>
              <div style="margin-top: 4px;">🔒 <b>Bảo Mật:</b> Zero PII Active</div>
            </div>
          </nav>

          <!-- Right Content View Area -->
          <main style="flex: 1; display: flex; flex-direction: column; gap: 20px; min-width: 0;">
            ${this.renderTabContent(logs, studentState)}
          </main>

        </div>
      </div>
    `;
  }

  renderTabContent(logs, studentState) {
    switch (this.currentTab) {
      case 'overview':
        return this.renderOverviewTab(logs, studentState);
      case 'telemetry':
        return this.renderTelemetryTab(logs);
      case 'questions':
        return this.renderQuestionsTab();
      case 'config':
        return this.renderConfigTab();
      default:
        return this.renderOverviewTab(logs, studentState);
    }
  }

  renderOverviewTab(logs, studentState) {
    const totalEvents = logs.length;
    const examEvents = logs.filter(l => l.event === 'short_exam_completed');
    const boostEvents = logs.filter(l => l.event === 'skill_boost_completed');
    const feedbackEvents = logs.filter(l => l.event === 'feedback_submitted');

    let avgExamScore = '---';
    if (examEvents.length > 0) {
      const sum = examEvents.reduce((acc, curr) => acc + (curr.score || 0), 0);
      avgExamScore = Math.round(sum / examEvents.length) + '%';
    } else if (studentState && studentState.examScore) {
      avgExamScore = studentState.examScore.score + '%';
    }

    return `
      <!-- Metric Cards Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
        <div style="background: #1E293B; border: 1.5px solid #3B82F6; padding: 20px; border-radius: 14px; text-align: center;">
          <div style="font-size: 0.8rem; font-weight: 800; color: #94A3B8; text-transform: uppercase;">TỔNG SỐ SỰ KIỆN LOG</div>
          <div style="font-family: var(--font-display); font-size: 2.2rem; font-weight: 800; color: #60A5FA; margin-top: 4px;">${totalEvents}</div>
          <div style="font-size: 0.78rem; color: #34D399; font-weight: 700; margin-top: 4px;">Real-time Telemetry Sink</div>
        </div>

        <div style="background: #1E293B; border: 1.5px solid #F59E0B; padding: 20px; border-radius: 14px; text-align: center;">
          <div style="font-size: 0.8rem; font-weight: 800; color: #94A3B8; text-transform: uppercase;">ĐIỂM THI THỬ TRUNG BÌNH</div>
          <div style="font-family: var(--font-display); font-size: 2.2rem; font-weight: 800; color: #FBBF24; margin-top: 4px;">${avgExamScore}</div>
          <div style="font-size: 0.78rem; color: #FCD34D; font-weight: 700; margin-top: 4px;">Khối 1–3 & Khối 4–5</div>
        </div>

        <div style="background: #1E293B; border: 1.5px solid #10B981; padding: 20px; border-radius: 14px; text-align: center;">
          <div style="font-size: 0.8rem; font-weight: 800; color: #94A3B8; text-transform: uppercase;">SKILL BOOST HOÀN THÀNH</div>
          <div style="font-family: var(--font-display); font-size: 2.2rem; font-weight: 800; color: #34D399; margin-top: 4px;">${boostEvents.length}</div>
          <div style="font-size: 0.78rem; color: #A7F3D0; font-weight: 700; margin-top: 4px;">Rèn luyện tức thì 3 câu</div>
        </div>

        <div style="background: #1E293B; border: 1.5px solid #8B5CF6; padding: 20px; border-radius: 14px; text-align: center;">
          <div style="font-size: 0.8rem; font-weight: 800; color: #94A3B8; text-transform: uppercase;">KHẢO SÁT PHẢN HỒI</div>
          <div style="font-family: var(--font-display); font-size: 2.2rem; font-weight: 800; color: #C4B5FD; margin-top: 4px;">${feedbackEvents.length}</div>
          <div style="font-size: 0.78rem; color: #DDD6FE; font-weight: 700; margin-top: 4px;">Ý kiến từ học sinh</div>
        </div>
      </div>

      <!-- Current Session Snapshot Card -->
      <div style="background: #1E293B; border: 1.5px solid #334155; padding: 20px; border-radius: 14px;">
        <h3 style="font-family: var(--font-display); font-size: 1.15rem; color: #FDE047; margin: 0 0 14px 0; display: flex; align-items: center; gap: 8px;">
          <span>📌</span> <span>Trạng Thái Phiên Thử Nghiệm Gần Nhất (Current Student Session)</span>
        </h3>

        ${studentState ? `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; background: #0F172A; padding: 16px; border-radius: 10px; border: 1px solid #334155;">
            <div>
              <div style="font-size: 0.8rem; color: #94A3B8; font-weight: 700;">SESSION ID</div>
              <div style="font-family: monospace; font-size: 0.95rem; color: #38BDF8; font-weight: 800;">${studentState.sessionId || 'pilot_session'}</div>
              <div style="font-size: 0.8rem; color: #94A3B8; font-weight: 700; margin-top: 8px;">NHÓM TUỔI</div>
              <div style="font-weight: 800; color: #FFF; font-size: 0.95rem;">${studentState.ageGroup === 'GRADE_1_3' ? 'Khối 1–3 (Nhi)' : 'Khối 4–5 (Chính)'}</div>
            </div>

            <div>
              <div style="font-size: 0.8rem; color: #94A3B8; font-weight: 700;">TÍCH LŨY KINH NGHIỆM</div>
              <div style="font-weight: 800; color: #F59E0B; font-size: 1rem;">⚡ ${studentState.xp || 0} XP | ⭐ ${studentState.stars || 0} Stars</div>
              <div style="font-size: 0.8rem; color: #94A3B8; font-weight: 700; margin-top: 8px;">BÀI THI THỬ HÔM NAY</div>
              <div style="font-weight: 800; color: #34D399; font-size: 0.95rem;">
                ${studentState.examScore ? `Đạt ${studentState.examScore.score}/100 (${studentState.examScore.correctCount}/${studentState.examScore.totalCount} câu)` : 'Chưa hoàn thành'}
              </div>
            </div>

            <div>
              <div style="font-size: 0.8rem; color: #94A3B8; font-weight: 700;">KẾT QUẢ SKILL BOOST</div>
              <div style="font-weight: 800; color: #C4B5FD; font-size: 0.95rem;">
                ${studentState.boostCompleted ? `Đúng ${studentState.boostCorrectCount}/3 câu (+${studentState.boostXpEarned} XP)` : 'Chưa tham gia'}
              </div>
              <div style="font-size: 0.8rem; color: #94A3B8; font-weight: 700; margin-top: 8px;">BƯỚC HIỆN TẠI</div>
              <div style="font-weight: 800; color: #FFF; font-size: 0.95rem;">Step Index: ${studentState.currentStepIndex ?? 0}</div>
            </div>
          </div>
        ` : `
          <div style="background: #0F172A; padding: 20px; border-radius: 10px; text-align: center; color: #94A3B8; font-weight: 700;">
            Chưa có phiên làm việc của học sinh nào trên trình duyệt này. Hãy mở bản <a href="student_pilot.html" target="_blank" style="color: #38BDF8;">Student Pilot</a> để trải nghiệm và tạo dữ liệu thử nghiệm.
          </div>
        `}
      </div>

      <!-- Quick Action Shortcuts -->
      <div style="background: #1E293B; border: 1.5px solid #334155; padding: 20px; border-radius: 14px;">
        <h3 style="font-family: var(--font-display); font-size: 1.15rem; color: #FDE047; margin: 0 0 14px 0;">
          🚀 Thao Tác Nhanh Dành Cho Admin
        </h3>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <a href="student_pilot.html" target="_blank" style="background: #1E3A8A; border: 2px solid #3B82F6; color: #FFF; text-decoration: none; padding: 12px 18px; border-radius: 10px; font-weight: 800; font-size: 0.9rem;">
            🎓 Mở Trang Làm Bài Học Sinh (Student Pilot) ↗
          </a>
          <button onclick="window.adminController.exportTelemetryJSON()" style="background: #065F46; border: 2px solid #10B981; color: #FFF; padding: 12px 18px; border-radius: 10px; font-weight: 800; font-size: 0.9rem; cursor: pointer;">
            📥 Tải File JSON Telemetry Log
          </button>
          <button onclick="window.adminController.clearTelemetryLogs()" style="background: #7F1D1D; border: 2px solid #EF4444; color: #FFF; padding: 12px 18px; border-radius: 10px; font-weight: 800; font-size: 0.9rem; cursor: pointer;">
            🗑️ Xóa Log Thử Nghiệm
          </button>
        </div>
      </div>
    `;
  }

  renderTelemetryTab(logs) {
    return `
      <div style="background: #1E293B; border: 1.5px solid #334155; padding: 20px; border-radius: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
          <div>
            <h3 style="font-family: var(--font-display); font-size: 1.2rem; color: #FDE047; margin: 0;">
              🛰️ Nhật Ký Sự Kiện Real-time (Telemetry Log Stream)
            </h3>
            <div style="font-size: 0.82rem; color: #94A3B8; font-weight: 700; margin-top: 2px;">
              Ghi nhận các tương tác vô danh từ Student App để phân tích hành vi người học.
            </div>
          </div>
          <button onclick="window.adminController.exportTelemetryJSON()" style="background: #10B981; color: #FFF; border: none; padding: 8px 14px; border-radius: 8px; font-weight: 800; font-size: 0.85rem; cursor: pointer;">
            📥 Xuất JSON (${logs.length} bản ghi)
          </button>
        </div>

        ${logs.length > 0 ? `
          <div style="overflow-x: auto; background: #0F172A; border-radius: 10px; border: 1px solid #334155;">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.85rem;">
              <thead>
                <tr style="background: #1E293B; color: #94A3B8; border-bottom: 2px solid #334155;">
                  <th style="padding: 10px 14px;">Thời gian</th>
                  <th style="padding: 10px 14px;">Event Name</th>
                  <th style="padding: 10px 14px;">Session ID</th>
                  <th style="padding: 10px 14px;">Nhóm tuổi</th>
                  <th style="padding: 10px 14px;">Chi tiết / Payload</th>
                </tr>
              </thead>
              <tbody>
                ${logs.slice().reverse().map(log => `
                  <tr style="border-bottom: 1px solid #1E293B; color: #CBD5E1;">
                    <td style="padding: 10px 14px; font-family: monospace; font-size: 0.78rem; color: #64748B;">
                      ${log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : '---'}
                    </td>
                    <td style="padding: 10px 14px;">
                      <span style="background: #334155; color: #FDE047; font-family: monospace; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-size: 0.78rem;">
                        ${log.event}
                      </span>
                    </td>
                    <td style="padding: 10px 14px; font-family: monospace; font-size: 0.8rem; color: #38BDF8;">
                      ${log.sessionId || 'pilot_session'}
                    </td>
                    <td style="padding: 10px 14px; font-weight: 700;">
                      ${log.ageGroup || 'GRADE_4_5'}
                    </td>
                    <td style="padding: 10px 14px; font-family: monospace; font-size: 0.78rem; color: #A5B4FC; max-width: 320px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                      ${JSON.stringify(log)}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : `
          <div style="background: #0F172A; padding: 30px; border-radius: 10px; text-align: center; color: #94A3B8; font-weight: 700;">
            Chưa có bản ghi Telemetry nào được ghi nhận trong phiên hiện tại.
          </div>
        `}
      </div>
    `;
  }

  renderQuestionsTab() {
    const examG45 = typeof PILOT_EXAM_G45 !== 'undefined' ? PILOT_EXAM_G45 : [];
    const examG13 = typeof PILOT_EXAM_G13 !== 'undefined' ? PILOT_EXAM_G13 : [];

    return `
      <div style="background: #1E293B; border: 1.5px solid #334155; padding: 20px; border-radius: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <h3 style="font-family: var(--font-display); font-size: 1.2rem; color: #FDE047; margin: 0;">
              📚 Ngân Hàng Câu Hỏi & 7 Khung Năng Lực NVS (NL1–NL7)
            </h3>
            <div style="font-size: 0.82rem; color: #94A3B8; font-weight: 700; margin-top: 2px;">
              Danh mục bộ đề thi thử & bài rèn luyện được phê duyệt status DEMO_PILOT_ONLY.
            </div>
          </div>
        </div>

        <!-- Competency Matrix List -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin-bottom: 20px;">
          <div style="background: #0F172A; padding: 14px; border-radius: 10px; border: 1px solid #334155;">
            <div style="font-weight: 800; color: #38BDF8; font-size: 0.95rem; margin-bottom: 6px;">
              📘 Khối 4–5 (Chính): ${examG45.length} Câu Hỏi Thi Thử
            </div>
            <div style="font-size: 0.82rem; color: #CBD5E1; font-weight: 700;">
              Tích hợp tình huống thực tế chuyên sâu (NL1 Mục đích sống, NL4 Giao tiếp truyền cảm hứng, NL7 Công nghệ AI).
            </div>
          </div>

          <div style="background: #0F172A; padding: 14px; border-radius: 10px; border: 1px solid #334155;">
            <div style="font-weight: 800; color: #FBBF24; font-size: 0.95rem; margin-bottom: 6px;">
              📙 Khối 1–3 (Nhi): ${examG13.length} Câu Hỏi Thi Thử
            </div>
            <div style="font-size: 0.82rem; color: #CBD5E1; font-weight: 700;">
              Minh họa hình ảnh trực quan, tình huống ứng xử đơn giản, gần gũi với học sinh nhỏ tuổi.
            </div>
          </div>
        </div>

        <!-- Sample Questions Table -->
        <div style="overflow-x: auto; background: #0F172A; border-radius: 10px; border: 1px solid #334155;">
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.85rem;">
            <thead>
              <tr style="background: #1E293B; color: #94A3B8; border-bottom: 2px solid #334155;">
                <th style="padding: 10px 14px;">ID Câu Hỏi</th>
                <th style="padding: 10px 14px;">Khối</th>
                <th style="padding: 10px 14px;">Năng lực</th>
                <th style="padding: 10px 14px;">Nội dung tình huống (Stem)</th>
                <th style="padding: 10px 14px;">Trạng thái An toàn</th>
              </tr>
            </thead>
            <tbody>
              ${examG45.slice(0, 5).map(q => `
                <tr style="border-bottom: 1px solid #1E293B; color: #CBD5E1;">
                  <td style="padding: 10px 14px; font-family: monospace; font-size: 0.8rem; color: #F59E0B;">${q.itemId || q.id}</td>
                  <td style="padding: 10px 14px; font-weight: 700;">Khối 4–5</td>
                  <td style="padding: 10px 14px;"><span style="background: #3B82F6; color: #FFF; padding: 2px 6px; border-radius: 4px; font-weight: 800; font-size: 0.75rem;">${q.indicatorId || 'NL4'}</span></td>
                  <td style="padding: 10px 14px; font-weight: 700; max-width: 400px;">${q.stem || q.prompt}</td>
                  <td style="padding: 10px 14px;"><span style="background: #10B981; color: #FFF; padding: 2px 8px; border-radius: 999px; font-weight: 800; font-size: 0.72rem;">${q.contentStatus || 'DEMO_PILOT_ONLY'}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  renderConfigTab() {
    return `
      <div style="background: #1E293B; border: 1.5px solid #334155; padding: 20px; border-radius: 14px;">
        <h3 style="font-family: var(--font-display); font-size: 1.2rem; color: #FDE047; margin: 0 0 16px 0;">
          ⚙️ Cấu Hình Đấu Trường NVS (Contest Settings)
        </h3>

        <div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px;">
          <div style="background: #0F172A; padding: 16px; border-radius: 10px; border: 1px solid #334155;">
            <label style="font-weight: 800; color: #FFF; font-size: 0.95rem; display: block; margin-bottom: 6px;">
              Thời Gian Làm Bài Thi Luyện Tập (Phút):
            </label>
            <input type="number" value="${this.config.examDurationMinutes}" min="5" max="60" onchange="window.adminController.updateConfig('examDurationMinutes', parseInt(this.value))" style="background: #1E293B; color: #FFF; border: 1px solid #475569; padding: 8px 12px; border-radius: 8px; font-weight: 800; font-size: 1rem; width: 100px;">
          </div>

          <div style="background: #0F172A; padding: 16px; border-radius: 10px; border: 1px solid #334155;">
            <label style="font-weight: 800; color: #FFF; font-size: 0.95rem; display: block; margin-bottom: 6px;">
              Trạng Thái Vòng 1 — Online Qualification:
            </label>
            <select onchange="window.adminController.updateConfig('round1Status', this.value)" style="background: #1E293B; color: #FFF; border: 1px solid #475569; padding: 8px 12px; border-radius: 8px; font-weight: 800; font-size: 0.95rem;">
              <option value="UPCOMING" ${this.config.round1Status === 'UPCOMING' ? 'selected' : ''}>Sắp diễn ra (Upcoming)</option>
              <option value="LIVE" ${this.config.round1Status === 'LIVE' ? 'selected' : ''}>Đang diễn ra (Live)</option>
              <option value="COMPLETED" ${this.config.round1Status === 'COMPLETED' ? 'selected' : ''}>Đã kết thúc (Completed)</option>
            </select>
          </div>

          <div style="background: #0F172A; padding: 16px; border-radius: 10px; border: 1px solid #334155;">
            <label style="font-weight: 800; color: #FFF; font-size: 0.95rem; display: block; margin-bottom: 6px;">
              Chế Độ Thi Đấu & Công Bằng (Anti Pay-to-Win):
            </label>
            <div style="font-size: 0.85rem; color: #34D399; font-weight: 700;">
              ✓ Bảng xếp hạng CHỈ tính điểm Rank XP từ 1 lượt thi miễn phí mỗi ngày.<br>
              ✓ Lượt thi phụ đổi bằng Stars không tính điểm xếp hạng chính thức.
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DemoAdminController };
} else if (typeof window !== 'undefined') {
  window.DemoAdminController = DemoAdminController;
}
