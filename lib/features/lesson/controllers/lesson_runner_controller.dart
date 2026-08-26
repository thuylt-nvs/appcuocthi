import 'package:flutter_riverpod/flutter_riverpod.dart';

/// Typed identifiers for Stage 1 initial approach choices
enum InitialApproachChoice {
  waveSmile,
  walkCloser,
}

/// Typed identifiers for Stage 2 greeting style choices
enum GreetingStyleChoice {
  warmDirect,
  gentleCalm,
}

/// State model for Lesson Runner Stage Engine
class LessonRunnerState {
  final int currentStageIndex; // 1 to 10 in M1-405
  final InitialApproachChoice? initialApproach;
  final GreetingStyleChoice? selectedGreetingOption;
  final int silentBaselineScore; // Internal scoring (hidden from child UI)
  final bool isStageComplete;

  // Learning Evidence Flags (ADR-010 & ADR-020 Compliance)
  final bool evidenceE01WaveGesture;
  final bool evidenceE02SocialTiming;
  final bool evidenceE03SmileConsequence;
  final bool evidenceE04SkillTransfer;
  final bool evidenceE05MeaningMaking;
  final bool evidenceE06ParentVerification;

  // Stage 7 Reflection Selections
  final String? selectedReflectionEmotion;
  final String? selectedReflectionWhy;

  // Stage 8 Parent Praise Selection
  final String? selectedParentPraise;

  // World Progression State Flags (Permanent World Progression)
  final bool isLessonZeroCompleted;
  final bool isNode1GoldStar;
  final bool isNode2Unlocked;

  const LessonRunnerState({
    this.currentStageIndex = 1,
    this.initialApproach,
    this.selectedGreetingOption,
    this.silentBaselineScore = 0,
    this.isStageComplete = false,
    this.evidenceE01WaveGesture = false,
    this.evidenceE02SocialTiming = false,
    this.evidenceE03SmileConsequence = false,
    this.evidenceE04SkillTransfer = false,
    this.evidenceE05MeaningMaking = false,
    this.evidenceE06ParentVerification = false,
    this.selectedReflectionEmotion,
    this.selectedReflectionWhy,
    this.selectedParentPraise,
    this.isLessonZeroCompleted = false,
    this.isNode1GoldStar = false,
    this.isNode2Unlocked = false,
  });

  LessonRunnerState copyWith({
    int? currentStageIndex,
    InitialApproachChoice? initialApproach,
    GreetingStyleChoice? selectedGreetingOption,
    int? silentBaselineScore,
    bool? isStageComplete,
    bool? evidenceE01WaveGesture,
    bool? evidenceE02SocialTiming,
    bool? evidenceE03SmileConsequence,
    bool? evidenceE04SkillTransfer,
    bool? evidenceE05MeaningMaking,
    bool? evidenceE06ParentVerification,
    String? selectedReflectionEmotion,
    String? selectedReflectionWhy,
    String? selectedParentPraise,
    bool? isLessonZeroCompleted,
    bool? isNode1GoldStar,
    bool? isNode2Unlocked,
  }) {
    return LessonRunnerState(
      currentStageIndex: currentStageIndex ?? this.currentStageIndex,
      initialApproach: initialApproach ?? this.initialApproach,
      selectedGreetingOption: selectedGreetingOption ?? this.selectedGreetingOption,
      silentBaselineScore: silentBaselineScore ?? this.silentBaselineScore,
      isStageComplete: isStageComplete ?? this.isStageComplete,
      evidenceE01WaveGesture: evidenceE01WaveGesture ?? this.evidenceE01WaveGesture,
      evidenceE02SocialTiming: evidenceE02SocialTiming ?? this.evidenceE02SocialTiming,
      evidenceE03SmileConsequence: evidenceE03SmileConsequence ?? this.evidenceE03SmileConsequence,
      evidenceE04SkillTransfer: evidenceE04SkillTransfer ?? this.evidenceE04SkillTransfer,
      evidenceE05MeaningMaking: evidenceE05MeaningMaking ?? this.evidenceE05MeaningMaking,
      evidenceE06ParentVerification: evidenceE06ParentVerification ?? this.evidenceE06ParentVerification,
      selectedReflectionEmotion: selectedReflectionEmotion ?? this.selectedReflectionEmotion,
      selectedReflectionWhy: selectedReflectionWhy ?? this.selectedReflectionWhy,
      selectedParentPraise: selectedParentPraise ?? this.selectedParentPraise,
      isLessonZeroCompleted: isLessonZeroCompleted ?? this.isLessonZeroCompleted,
      isNode1GoldStar: isNode1GoldStar ?? this.isNode1GoldStar,
      isNode2Unlocked: isNode2Unlocked ?? this.isNode2Unlocked,
    );
  }
}

/// Controller managing Lesson Stage flow, silent score tracking, and learning evidence logging
class LessonRunnerController extends StateNotifier<LessonRunnerState> {
  LessonRunnerController() : super(const LessonRunnerState());

  /// Advances from Stage 1 to Stage 2
  void completeStage1(InitialApproachChoice choice) {
    final addedScore = choice == InitialApproachChoice.waveSmile ? 10 : 8;
    state = state.copyWith(
      currentStageIndex: 2,
      initialApproach: choice,
      silentBaselineScore: state.silentBaselineScore + addedScore,
    );
  }

  /// Selects Stage 2 greeting style option and advances to Stage 3
  void selectStage2Option(GreetingStyleChoice choice) {
    final addedScore = choice == GreetingStyleChoice.warmDirect ? 15 : 12;
    state = state.copyWith(
      currentStageIndex: 3,
      selectedGreetingOption: choice,
      silentBaselineScore: state.silentBaselineScore + addedScore,
    );
  }

  /// Completes Stage 3 (Superstar Wave Modeling) and logs Evidence E-01
  void completeStage3Wave() {
    state = state.copyWith(
      currentStageIndex: 4,
      silentBaselineScore: state.silentBaselineScore + 15,
      evidenceE01WaveGesture: true,
    );
  }

  /// Completes Stage 4 (Gentle Eye Contact Social Timing) and logs Evidence E-02
  void completeStage4EyeContact() {
    state = state.copyWith(
      currentStageIndex: 5,
      silentBaselineScore: state.silentBaselineScore + 15,
      evidenceE02SocialTiming: true,
    );
  }

  /// Completes Stage 5 (Warm Superstar Smile) and logs Evidence E-03
  void completeStage5Smile() {
    state = state.copyWith(
      currentStageIndex: 6,
      silentBaselineScore: state.silentBaselineScore + 20,
      evidenceE03SmileConsequence: true,
    );
  }

  /// Completes Stage 6 (Hero Super Challenge) and logs Evidence E-04
  void completeStage6Challenge() {
    state = state.copyWith(
      currentStageIndex: 7,
      silentBaselineScore: state.silentBaselineScore + 25,
      evidenceE04SkillTransfer: true,
    );
  }

  /// Selects Stage 7 emotion reflection
  void setReflectionEmotion(String emotion) {
    state = state.copyWith(selectedReflectionEmotion: emotion);
  }

  /// Completes Stage 7 (Meaning-Making Reflection) and advances to Stage 8 Parent Verification
  void completeStage7Reflection(String whyExplanation) {
    state = state.copyWith(
      currentStageIndex: 8,
      selectedReflectionWhy: whyExplanation,
      silentBaselineScore: state.silentBaselineScore + 15,
      evidenceE05MeaningMaking: true,
    );
  }

  /// Completes Stage 8 (Parent Confirmation Card) and advances to Stage 9 Island Bloom
  void confirmParentVerification(String praiseCardText) {
    state = state.copyWith(
      currentStageIndex: 9,
      selectedParentPraise: praiseCardText,
      silentBaselineScore: state.silentBaselineScore + 20,
      evidenceE06ParentVerification: true,
    );
  }

  /// Completes Stage 9 (Island Bloom & Memory Epilogue) and advances to Stage 10 Celebration
  void completeStage9IslandBloom() {
    state = state.copyWith(
      currentStageIndex: 10,
    );
  }

  /// Finalizes Stage 10 Celebration & saves permanent world progress flags
  void finalizeLessonZeroCompletion() {
    state = state.copyWith(
      isStageComplete: true,
      isLessonZeroCompleted: true,
      isNode1GoldStar: true,
      isNode2Unlocked: true,
    );
  }

  /// Resets lesson runner state for mission replay
  void resetLesson() {
    state = state.copyWith(
      currentStageIndex: 1,
      isStageComplete: false,
    );
  }
}

/// Riverpod provider for LessonRunnerController
final lessonRunnerControllerProvider =
    StateNotifierProvider<LessonRunnerController, LessonRunnerState>((ref) {
  return LessonRunnerController();
});
