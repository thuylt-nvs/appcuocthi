/* ==========================================================================
   NovaStars / Antigravity — NVS Championship Configuration & Blueprints
   ========================================================================== */

const ChampionshipAnalyticsEvents = {
  EXAM_STARTED: 'championship_exam_started',
  EXAM_SUBMITTED: 'championship_exam_submitted',
  SKILL_BOOST_STARTED: 'championship_skill_boost_started',
  SKILL_BOOST_COMPLETED: 'championship_skill_boost_completed',
  STAR_EXCHANGED: 'championship_star_exchanged',
  DAILY_MISSION_CLAIMED: 'championship_daily_mission_claimed'
};

const ChampionshipConfig = {
  // Season & Competition Info
  seasonId: 'NVS_2026_SEASON_1',
  competitionId: 'NVS_FUTURE_LEADERS_2026',
  
  /* DEMO ONLY - Countdown Target Date (Pending Official Schedule) */
  competitionTargetTimestamp: Date.parse('2026-09-17T00:00:00+07:00'),
  isDemoTargetDate: true,

  // Centralized Rank Eligibility Policy
  resolveRankEligibility(ticketType) {
    return ticketType === 'DAILY_FREE';
  },

  // Supported Grade Group Mapping & Validation
  gradeToGroupMap: {
    1: 'GRADE_1_3',
    2: 'GRADE_1_3',
    3: 'GRADE_1_3',
    4: 'GRADE_4_5',
    5: 'GRADE_4_5'
  },

  /**
   * Validate grade and return ageGroup string
   * Throws explicit error for unsupported grades
   */
  resolveAgeGroup(grade) {
    const numericGrade = Number(grade);
    const group = this.gradeToGroupMap[numericGrade];
    if (!group) {
      throw new Error(`UNSUPPORTED_GRADE: Grade ${grade} is not supported for Championship Training (Supported: 1-5).`);
    }
    return group;
  },

  /* ==========================================================================
     EXAM BLUEPRINTS — Clearly marked DEMO CONFIGURATION until official rules
     Uses Canonical NVS Competency Standard v0.2 IDs (NL1–NL7)
     ========================================================================== */
  examBlueprints: {
    GRADE_1_3: {
      blueprintId: 'DAILY_EXAM_BLUEPRINT_GRADE_1_3',
      isDemoConfiguration: true,
      title: 'Thi Thử Ngày — Tiểu Học (Khối 1–3)',
      questionCount: 15,
      durationSeconds: 900, // DEMO: 15 minutes
      rewardXP: 100,
      allowPrevious: true,
      allowFlag: true,
      autoSubmit: true,
      competencyDistribution: {
        NL1: 2, // Purpose & Life Values
        NL2: 2, // Lifelong Learning & Thinking
        NL3: 3, // Emotional Intelligence & Social Connection
        NL4: 2, // Communication, Inspiration & Persuasion
        NL5: 2, // Global Citizenship & Social Responsibility
        NL6: 2, // Action, Courage & Adaptability
        NL7: 2  // Technology & AI Skills
      },
      difficultyDistribution: {
        EASY: 0.6,
        MEDIUM: 0.3,
        HARD: 0.1
      }
    },
    GRADE_4_5: {
      blueprintId: 'DAILY_EXAM_BLUEPRINT_GRADE_4_5',
      isDemoConfiguration: true,
      title: 'Thi Thử Ngày — Tiểu Học (Khối 4–5)',
      questionCount: 20,
      durationSeconds: 1200, // DEMO: 20 minutes
      rewardXP: 100,
      allowPrevious: true,
      allowFlag: true,
      autoSubmit: true,
      competencyDistribution: {
        NL1: 3, // Purpose & Life Values
        NL2: 3, // Lifelong Learning & Thinking
        NL3: 3, // Emotional Intelligence & Social Connection
        NL4: 3, // Communication, Inspiration & Persuasion
        NL5: 3, // Global Citizenship & Social Responsibility
        NL6: 3, // Action, Courage & Adaptability
        NL7: 2  // Technology & AI Skills
      },
      difficultyDistribution: {
        EASY: 0.4,
        MEDIUM: 0.4,
        HARD: 0.2
      }
    }
  },

  // Star Exchange Settings
  starExchange: {
    costPerTicket: 100,
    ticketType: 'STAR_EXCHANGE',
    rankEligibleExam: false // Extra attempts purchased with stars grant rankEligibleXP = false
  },

  // Skill Boost Settings
  skillBoost: {
    questionCount: 5,
    durationSeconds: 300,
    xpPerCorrectAnswer: 6, // 6 XP per correct answer (max 30 XP)
    completionStarsReward: 10
  },

  // Mission Completion Bonus Settings
  missionBonus: {
    requiredMissionsCount: 3,
    xpReward: 50,
    starsReward: 20
  },

  // Minimum evidence count for non-cautious coach diagnoses
  minimumEvidenceCount: 3,

  // Feature Flags
  featureFlags: {
    premiumEnabled: true,
    starExchangeEnabled: true,
    extraExamEnabled: true,
    detailedExplanationEnabled: true,
    dailyMissionEnabled: true,
    countdownEnabled: true,
    examPauseEnabled: true
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ChampionshipConfig, ChampionshipAnalyticsEvents };
} else {
  window.ChampionshipConfig = ChampionshipConfig;
  window.ChampionshipAnalyticsEvents = ChampionshipAnalyticsEvents;
}
