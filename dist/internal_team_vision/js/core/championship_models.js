/* ==========================================================================
   NovaStars / Antigravity — Championship Domain Models & Entities
   ========================================================================== */

const TicketStatus = {
  AVAILABLE: 'AVAILABLE',
  RESERVED: 'RESERVED',
  CONSUMED: 'CONSUMED',
  EXPIRED: 'EXPIRED'
};

const AttemptStatus = {
  NOT_STARTED: 'NOT_STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  SUBMITTED: 'SUBMITTED',
  AUTO_SUBMITTED: 'AUTO_SUBMITTED',
  ABANDONED: 'ABANDONED'
};

class ExamTicket {
  constructor({
    ticketId,
    userId,
    seasonId = 'NVS_2026_SEASON_1',
    ticketType, // 'DAILY_FREE' | 'STAR_EXCHANGE' | 'PREMIUM'
    issueDate,  // 'YYYY-MM-DD'
    status = TicketStatus.AVAILABLE,
    reservedByAttemptId = null,
    usedAt = null,
    consumedAt = null,
    expiresAt = null,
    createdAt = Date.now()
  }) {
    this.ticketId = ticketId;
    this.userId = userId;
    this.seasonId = seasonId;
    this.ticketType = ticketType;
    this.issueDate = issueDate;
    this.status = status;
    this.reservedByAttemptId = reservedByAttemptId;
    this.usedAt = usedAt;
    this.consumedAt = consumedAt;
    this.expiresAt = expiresAt;
    this.createdAt = createdAt;
  }
}

class ExamAttempt {
  constructor({
    attemptId,
    userId,
    examId,
    ticketId,
    ageGroup, // 'GRADE_1_3' | 'GRADE_4_5'
    blueprintId,
    startedAt = Date.now(),
    submittedAt = null,
    durationSeconds = 1200,
    durationUsed = 0,
    status = AttemptStatus.IN_PROGRESS,
    answers = {}, // { questionId: selectedOption }
    flags = {},   // { questionId: true/false }
    score = 0,
    totalCorrect = 0,
    totalQuestions = 0,
    competencyResults = {},
    strongestCompetency = null,
    weakestCompetency = null,
    xpAwarded = 0,
    rankEligibleXP = false
  }) {
    this.attemptId = attemptId;
    this.userId = userId;
    this.examId = examId;
    this.ticketId = ticketId;
    this.ageGroup = ageGroup;
    this.blueprintId = blueprintId;
    this.startedAt = startedAt;
    this.submittedAt = submittedAt;
    this.durationSeconds = durationSeconds;
    this.durationUsed = durationUsed;
    this.status = status;
    this.answers = answers;
    this.flags = flags;
    this.score = score;
    this.totalCorrect = totalCorrect;
    this.totalQuestions = totalQuestions;
    this.competencyResults = competencyResults;
    this.strongestCompetency = strongestCompetency;
    this.weakestCompetency = weakestCompetency;
    this.xpAwarded = xpAwarded;
    this.rankEligibleXP = rankEligibleXP;
  }
}

class TrainingSession {
  constructor({
    sessionId,
    userId,
    competencyId,
    questionIds = [],
    startedAt = Date.now(),
    completedAt = null,
    correctCount = 0,
    totalQuestions = 5,
    xpAwarded = 0,
    starsAwarded = 0,
    answeredQuestions = {} // { questionId: { selectedOption, isCorrect, xpEarned } }
  }) {
    this.sessionId = sessionId;
    this.userId = userId;
    this.competencyId = competencyId;
    this.questionIds = questionIds;
    this.startedAt = startedAt;
    this.completedAt = completedAt;
    this.correctCount = correctCount;
    this.totalQuestions = totalQuestions;
    this.xpAwarded = xpAwarded;
    this.starsAwarded = starsAwarded;
    this.answeredQuestions = answeredQuestions;
  }
}

class Transaction {
  constructor({
    transactionId,
    idempotencyKey,
    userId,
    sourceType, // 'DAILY_EXAM' | 'SKILL_TRAINING_ANSWER' | 'SKILL_TRAINING_BONUS' | 'DAILY_MISSION_BONUS' | 'STAR_EXCHANGE'
    amount,
    currency,   // 'XP' | 'STARS'
    rankEligible = true,
    metadata = {},
    createdAt = Date.now()
  }) {
    this.transactionId = transactionId;
    this.idempotencyKey = idempotencyKey;
    this.userId = userId;
    this.sourceType = sourceType;
    this.amount = amount;
    this.currency = currency;
    this.rankEligible = rankEligible;
    this.metadata = metadata;
    this.createdAt = createdAt;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    TicketStatus,
    AttemptStatus,
    ExamTicket,
    ExamAttempt,
    TrainingSession,
    Transaction
  };
} else {
  window.TicketStatus = TicketStatus;
  window.AttemptStatus = AttemptStatus;
  window.ExamTicket = ExamTicket;
  window.ExamAttempt = ExamAttempt;
  window.TrainingSession = TrainingSession;
  window.Transaction = Transaction;
}
