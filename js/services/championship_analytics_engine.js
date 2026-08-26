/* ==========================================================================
   NovaStars / Antigravity — Championship Analytics Engine (Step 5 / Patch 2B)
   Educational Progress Analytics & Product Event Telemetry
   ========================================================================== */

class ChampionshipAnalyticsEngine {
  constructor(repository) {
    this.repo = repository || new LocalStorageRepository(window.appState);
    this.analyticsEventsLog = [];
  }

  /**
   * Track product analytics event with validated canonical event schema
   */
  trackEvent(eventName, payload = {}) {
    const event = {
      eventName,
      timestamp: Date.now(),
      payload
    };
    this.analyticsEventsLog.push(event);
    if (typeof console !== 'undefined' && console.log) {
      console.log(`[Analytics] ${eventName}:`, payload);
    }
    return event;
  }

  /**
   * Aggregate student overall competency profile across all completed attempts
   * Strictly uses primaryCompetencyId ONLY (linkedCompetencyIds ignored for scoring).
   */
  aggregateCompetencyProfile(examResults = []) {
    const aggregated = {};
    let totalExamsEvaluated = 0;

    examResults.forEach(res => {
      if (!res.competencyResults) return;
      totalExamsEvaluated++;
      Object.entries(res.competencyResults).forEach(([compId, stat]) => {
        if (!aggregated[compId]) {
          aggregated[compId] = { correct: 0, total: 0, accuracy: 0 };
        }
        aggregated[compId].correct += stat.correct || 0;
        aggregated[compId].total += stat.total || 0;
      });
    });

    // Calculate aggregated accuracies
    Object.keys(aggregated).forEach(compId => {
      const stat = aggregated[compId];
      stat.accuracy = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
    });

    return {
      totalExamsEvaluated,
      competencies: aggregated
    };
  }

  /**
   * Determine PRACTICE_PRIORITY / TRAIN NEXT recommendation with minimum evidence count guard (Requirement 10)
   * Framed as PRACTICE_PRIORITY / TRAIN NEXT, not a definitive weak-competency diagnosis.
   */
  evaluateCoachAdvice(examResult) {
    if (!examResult || !examResult.competencyResults) {
      return {
        trainNextCompetency: 'NL3',
        recommendationType: 'PRACTICE_PRIORITY',
        recommendationTitle: "PRACTICE PRIORITY",
        coachPhrasing: "Cùng rèn luyện thêm kỹ năng để bứt phá nhé!",
        isPracticePriority: true,
        isCautiousDiagnosis: true,
        evidenceCount: 0
      };
    }

    const weakestId = examResult.weakestCompetency || 'NL3';
    const weakestStat = examResult.competencyResults[weakestId] || { correct: 0, total: 0, accuracy: 0 };
    const evidenceCount = weakestStat.total;
    const isCautiousDiagnosis = evidenceCount < (ChampionshipConfig.minimumEvidenceCount || 3);

    const compMeta = typeof getNVSCompetency === 'function' ? getNVSCompetency(weakestId) : { officialNameVi: 'Năng Lực NVS' };

    let coachPhrasing = '';
    let recommendationTitle = '';

    if (isCautiousDiagnosis) {
      recommendationTitle = "LET'S BUILD THIS SKILL";
      coachPhrasing = `Cùng rèn luyện thêm năng lực ${compMeta.officialNameVi} để tự tin hơn nhé!`;
    } else {
      recommendationTitle = "PRACTICE PRIORITY";
      coachPhrasing = `Gợi ý rèn luyện: Ưu tiên ôn luyện thêm năng lực ${compMeta.officialNameVi} trong buổi tiếp theo!`;
    }

    return {
      trainNextCompetency: weakestId,
      recommendationType: 'PRACTICE_PRIORITY',
      recommendationTitle,
      coachPhrasing,
      isPracticePriority: true,
      isCautiousDiagnosis,
      evidenceCount,
      accuracy: weakestStat.accuracy
    };
  }

  /**
   * Evaluate Official Competency Mastery boundary (Requirement 10)
   * Demo/Practice items (eligibleForOfficialScoring === false) MUST NEVER update Official Mastery or Official Readiness.
   */
  evaluateOfficialMastery(examResult) {
    if (!examResult) return null;
    
    // Check if result contains only non-official practice items
    if (examResult.eligibleForOfficialScoring === false || examResult.isPracticeScore === true) {
      return {
        isOfficial: false,
        officialReadinessScore: null,
        officialMastery: null,
        message: "Demo/Practice items do not modify official championship ranking or official readiness score."
      };
    }

    return {
      isOfficial: true,
      officialReadinessScore: examResult.score,
      officialMastery: examResult.competencyResults
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ChampionshipAnalyticsEngine };
} else {
  window.ChampionshipAnalyticsEngine = ChampionshipAnalyticsEngine;
}
