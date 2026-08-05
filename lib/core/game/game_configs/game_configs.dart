/// Game Configurations Foundation Interface
/// Defines abstract contracts for decoupled game parameters, timing, and reward rules.

abstract class IGameConfig {
  int get maxLessonDurationMinutes;
  int get fastPassScoreThresholdPercent;
  bool get hapticFeedbackEnabled;
}

abstract class IRewardConfig {
  int get defaultLessonXp;
  int get defaultMiniGameXp;
  int get defaultLessonStars;
}
