/* ==========================================================================
   NovaStars / Antigravity — Exam Evaluation & Blueprint Validation Service
   ========================================================================== */

class ExamService {
  constructor(repository, questionsData) {
    this.repo = repository || new LocalStorageRepository(window.appState);
    this.questionsData = questionsData || (typeof ChampionshipQuestions !== 'undefined' ? ChampionshipQuestions : {});
  }

  /**
   * Validate ExamBlueprint feasibility against question pool
   * Never silently violates a blueprint when pool is insufficient.
   */
  validateBlueprintFeasibility(blueprint, questionPool) {
    if (!blueprint || !blueprint.competencyDistribution) {
      throw new Error("INVALID_BLUEPRINT: Missing competency distribution rules.");
    }
    if (!Array.isArray(questionPool) || questionPool.length === 0) {
      throw new Error("EMPTY_QUESTION_POOL: Question pool is empty.");
    }

    const availableByCompetency = {};
    questionPool.forEach(q => {
      const primaryId = q.primaryCompetencyId || q.competencyId;
      availableByCompetency[primaryId] = (availableByCompetency[primaryId] || 0) + 1;
    });

    const deficits = [];
    Object.entries(blueprint.competencyDistribution).forEach(([competencyId, requiredCount]) => {
      const available = availableByCompetency[competencyId] || 0;
      if (available < requiredCount) {
        deficits.push(`${competencyId}: Required ${requiredCount}, Available ${available}`);
      }
    });

    if (deficits.length > 0) {
      throw new Error(`INSUFFICIENT_QUESTION_POOL: Question pool cannot satisfy blueprint. Deficits: [${deficits.join(', ')}]`);
    }

    return true;
  }

  /**
   * Select questions satisfying blueprint competency distribution and avoiding recent repetition
   */
  selectQuestionsForBlueprint(blueprint, questionPool, recentQuestionIds = []) {
    this.validateBlueprintFeasibility(blueprint, questionPool);

    const recentSet = new Set(recentQuestionIds);
    const selectedQuestions = [];

    Object.entries(blueprint.competencyDistribution).forEach(([competencyId, countNeeded]) => {
      // 1. Get available questions by primaryCompetencyId ONLY
      const candidates = questionPool.filter(q => (q.primaryCompetencyId || q.competencyId) === competencyId);

      // 2. Prefer questions not in recentSet
      const nonRecentCandidates = candidates.filter(q => !recentSet.has(q.id));
      const chosenForCompetency = [];

      // Take non-recent candidates first
      while (chosenForCompetency.length < countNeeded && nonRecentCandidates.length > 0) {
        const randomIndex = Math.floor(Math.random() * nonRecentCandidates.length);
        chosenForCompetency.push(nonRecentCandidates.splice(randomIndex, 1)[0]);
      }

      // If needed, fill remainder from candidate pool
      while (chosenForCompetency.length < countNeeded && candidates.length > 0) {
        const availableCandidates = candidates.filter(q => !chosenForCompetency.includes(q));
        if (availableCandidates.length === 0) break;
        const randomIndex = Math.floor(Math.random() * availableCandidates.length);
        chosenForCompetency.push(availableCandidates.splice(randomIndex, 1)[0]);
      }

      if (chosenForCompetency.length < countNeeded) {
        throw new Error(`BLUEPRINT_SELECTION_FAILED: Could not select ${countNeeded} questions for ${competencyId}.`);
      }

      selectedQuestions.push(...chosenForCompetency);
    });

    return selectedQuestions;
  }

  /**
   * Evaluate answers & calculate ExamResult metrics
   * Returns pure educational result object without mutating economy balances.
   * Strictly aggregates stats by primaryCompetencyId ONLY (linkedCompetencyIds ignored for scoring).
   */
  evaluateAttemptAnswers({ attemptId, answers = {}, questions = [], autoSubmitted = false, durationUsed = 0, rankEligibleXP = true }) {
    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error("EVALUATION_ERROR: Question list is empty.");
    }

    let totalCorrect = 0;
    const competencyStats = {}; // { primaryCompetencyId: { correct: 0, total: 0 } }
    let allItemsUnmapped = true;

    questions.forEach(q => {
      const compId = q.primaryCompetencyId || q.competencyId;
      if (!competencyStats[compId]) {
        competencyStats[compId] = { correct: 0, total: 0 };
      }
      competencyStats[compId].total += 1;

      if (q.eligibleForOfficialScoring === true) {
        allItemsUnmapped = false;
      }

      const studentAnswer = answers[q.id];
      if (studentAnswer && studentAnswer.toUpperCase() === q.correctAnswer.toUpperCase()) {
        totalCorrect += 1;
        competencyStats[compId].correct += 1;
      }
    });

    const totalQuestions = questions.length;
    const percentage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    const score = percentage; // 100-point scale

    // Calculate competency accuracy percentages based ONLY on primaryCompetencyId
    const competencyResults = {};
    let lowestAccuracy = 101;
    let highestAccuracy = -1;
    let weakestCompetency = null;
    let strongestCompetency = null;

    Object.entries(competencyStats).forEach(([compId, stat]) => {
      const accuracy = stat.total > 0 ? (stat.correct / stat.total) * 100 : 0;
      competencyResults[compId] = {
        correct: stat.correct,
        total: stat.total,
        accuracy: Math.round(accuracy)
      };

      if (accuracy < lowestAccuracy) {
        lowestAccuracy = accuracy;
        weakestCompetency = compId;
      }
      if (accuracy > highestAccuracy) {
        highestAccuracy = accuracy;
        strongestCompetency = compId;
      }
    });

    // Fallbacks if all equal
    if (!weakestCompetency && questions.length > 0) weakestCompetency = questions[0].primaryCompetencyId || questions[0].competencyId;
    if (!strongestCompetency && questions.length > 0) strongestCompetency = questions[0].primaryCompetencyId || questions[0].competencyId;

    return {
      attemptId,
      score,
      totalCorrect,
      totalQuestions,
      percentage,
      durationUsed,
      autoSubmitted,
      competencyResults,
      strongestCompetency,
      weakestCompetency,
      xpReward: 100, // Configured Daily Exam completion XP
      rankEligibleXP,
      isPracticeScore: true,
      officialCompetencyMastery: allItemsUnmapped ? null : competencyResults
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ExamService };
} else {
  window.ExamService = ExamService;
}
