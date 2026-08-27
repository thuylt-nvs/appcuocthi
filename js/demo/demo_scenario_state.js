/* ==========================================================================
   NovaStars × NVS Championship — Demo Scenario State Generator
   v0.1 Isolated Presentation Presets (Product-Content Patched)
   ========================================================================== */

const DemoScenarioState = {

  // Seeded Student Profiles
  profiles: {
    GRADE_2: {
      id: 'demo_student_g2',
      name: 'Bé Su',
      grade: 2,
      avatar: '👧',
      ageGroupName: 'Khối 1–3'
    },
    GRADE_5: {
      id: 'demo_student_g5',
      name: 'Minh Trí',
      grade: 5,
      avatar: '👦',
      ageGroupName: 'Khối 4–5'
    }
  },

  // Seeded Account Tiers
  accountTiers: {
    FREE: {
      isPremium: false,
      tierName: 'Miễn Phí',
      explanationAccess: 'LOCKED'
    },
    PREMIUM: {
      isPremium: true,
      tierName: 'Premium Preview',
      explanationAccess: 'UNLOCKED'
    }
  },

  // Scenario Presets: Before Exam, After Exam, After Skill Boost, Preparing for Round 1, Future Finalist
  scenarios: {
    NEW_STUDENT: {
      id: 'NEW_STUDENT',
      name: 'Học Sinh Mới Khoái Phiêu Lưu',
      xp: 0,
      stars: 0,
      streak: 1,
      rankEligibleXP: 0,
      hasExamToday: false,
      examScore: null,
      boostCompleted: false,
      missions: { examCompleted: false, boostCompleted: false, rewardClaimed: false },
      championshipStage: 'ILLUSTRATIVE_QUALIFYING',
      recommendedAction: 'Bắt đầu 1 lượt luyện tập miễn phí hôm nay để rèn luyện kỹ năng!'
    },
    BEFORE_EXAM: {
      id: 'BEFORE_EXAM',
      name: 'Trước Bài Thi Luyện Tập Hằng Ngày',
      xp: 120,
      stars: 15,
      streak: 3,
      rankEligibleXP: 80,
      hasExamToday: false,
      examScore: null,
      boostCompleted: false,
      missions: { examCompleted: false, boostCompleted: false, rewardClaimed: false },
      championshipStage: 'ILLUSTRATIVE_QUALIFYING',
      recommendedAction: 'Tham gia Bài thi luyện tập hằng ngày (Cấu hình luyện tập Demo: Khối 4–5 / 20 câu / 20 phút)'
    },
    AFTER_EXAM: {
      id: 'AFTER_EXAM',
      name: 'Sau Khi Luyện Tập (Nhận Bằng Chứng Rèn Luyện)',
      xp: 170,
      stars: 15,
      streak: 3,
      rankEligibleXP: 130,
      hasExamToday: true,
      examScore: { score: 75, correct: 15, total: 20, timeSpentMinutes: 14 },
      boostCompleted: false,
      missions: { examCompleted: true, boostCompleted: false, rewardClaimed: false },
      championshipStage: 'ILLUSTRATIVE_QUALIFYING',
      recommendedAction: 'Coach Nova đề xuất: Rèn luyện NL4 Giao tiếp, truyền cảm hứng và thuyết phục (+6 XP / câu)'
    },
    AFTER_SKILL_BOOST: {
      id: 'AFTER_SKILL_BOOST',
      name: 'Sau Khi Bứt Phá Skill Boost',
      xp: 200,
      stars: 25,
      streak: 3,
      rankEligibleXP: 130,
      hasExamToday: true,
      examScore: { score: 75, correct: 15, total: 20, timeSpentMinutes: 14 },
      boostCompleted: true,
      missions: { examCompleted: true, boostCompleted: true, rewardClaimed: true },
      championshipStage: 'ILLUSTRATIVE_QUALIFYING',
      recommendedAction: 'Hoàn thành bứt phá NL4! Hãy tiếp tục duy trì thói quen học hằng ngày.'
    },
    PREPARING_ROUND_1: {
      id: 'PREPARING_ROUND_1',
      name: 'Kịch Bản Minh Họa: Chuẩn Bị Vòng 1 (DEMO)',
      xp: 350,
      stars: 45,
      streak: 7,
      rankEligibleXP: 260,
      hasExamToday: true,
      examScore: { score: 85, correct: 17, total: 20, timeSpentMinutes: 12 },
      boostCompleted: true,
      missions: { examCompleted: true, boostCompleted: true, rewardClaimed: true },
      championshipStage: 'ILLUSTRATIVE_QUALIFYING',
      recommendedAction: 'Kịch bản minh họa: Tích lũy bằng chứng rèn luyện sẵn sàng cho Vòng 1 sắp tới'
    },
    FUTURE_FINALIST: {
      id: 'FUTURE_FINALIST',
      name: 'Kịch Bản Minh Họa: Ứng Viên Chung Kết (DEMO)',
      xp: 850,
      stars: 120,
      streak: 21,
      rankEligibleXP: 720,
      hasExamToday: true,
      examScore: { score: 95, correct: 19, total: 20, timeSpentMinutes: 10 },
      boostCompleted: true,
      missions: { examCompleted: true, boostCompleted: true, rewardClaimed: true },
      championshipStage: 'ILLUSTRATIVE_FINALIST',
      recommendedAction: 'Kịch bản minh họa: Hướng tới Vòng Chung kết Toàn quốc NVS 🏆'
    }
  },

  /**
   * Generates a clean, domain-consistent presentation state
   */
  createState(gradeKey = 'GRADE_5', tierKey = 'FREE', scenarioKey = 'BEFORE_EXAM') {
    const student = this.profiles[gradeKey] || this.profiles.GRADE_5;
    const tier = this.accountTiers[tierKey] || this.accountTiers.FREE;
    const scenario = this.scenarios[scenarioKey] || this.scenarios.BEFORE_EXAM;

    return {
      user: {
        id: student.id,
        name: student.name,
        grade: student.grade,
        avatar: student.avatar,
        ageGroupName: student.ageGroupName
      },
      account: {
        isPremium: tier.isPremium,
        tierName: tier.tierName,
        explanationAccess: tier.explanationAccess
      },
      scenario: {
        id: scenario.id,
        name: scenario.name,
        championshipStage: scenario.championshipStage,
        recommendedAction: scenario.recommendedAction
      },
      xp: scenario.xp,
      stars: scenario.stars,
      streak: scenario.streak,
      rankEligibleXP: scenario.rankEligibleXP,
      dailyMissions: [
        { id: 'm1', title: 'Hoàn thành 1 bài thi luyện tập hằng ngày', progress: scenario.missions.examCompleted ? 1 : 0, max: 1, rewardXp: 20, completed: scenario.missions.examCompleted },
        { id: 'm2', title: 'Luyện 5 câu Skill Boost', progress: scenario.missions.boostCompleted ? 5 : (scenario.hasExamToday ? 2 : 0), max: 5, rewardXp: 15, completed: scenario.missions.boostCompleted },
        { id: 'm3', title: 'Đạt chuỗi học 3 ngày', progress: Math.min(scenario.streak, 3), max: 3, rewardXp: 10, completed: scenario.streak >= 3 }
      ],
      competencySignals: [
        { code: 'NL1', name: 'Có mục đích và giá trị sống', icon: '🎯', count: 18, practiceEvidence: 'Tích cực', status: 'Bằng chứng tốt' },
        { code: 'NL2', name: 'Có tư duy và năng lực học tập suốt đời', icon: '🧩', count: 14, practiceEvidence: 'Khá', status: 'Đang duy trì' },
        { code: 'NL3', name: 'Trí tuệ cảm xúc và khả năng kết nối', icon: '❤️', count: 12, practiceEvidence: 'Khá', status: 'Đang duy trì' },
        { code: 'NL4', name: 'Giao tiếp, truyền cảm hứng và thuyết phục', icon: '🗣️', count: 25, practiceEvidence: 'Cần luyện thêm', status: 'Trọng tâm rèn luyện 🚀' },
        { code: 'NL5', name: 'Tinh thần công dân toàn cầu và trách nhiệm xã hội', icon: '🌍', count: 10, practiceEvidence: 'Khá', status: 'Đang duy trì' },
        { code: 'NL6', name: 'Hành động, dám thử, dám thay đổi', icon: '🚀', count: 8, practiceEvidence: 'Tốt', status: 'Tín hiệu cao' },
        { code: 'NL7', name: 'Kĩ năng công nghệ và trí tuệ nhân tạo', icon: '💻', count: 6, practiceEvidence: 'Khá', status: 'Đang duy trì' }
      ]
    };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DemoScenarioState };
} else if (typeof window !== 'undefined') {
  window.DemoScenarioState = DemoScenarioState;
}
