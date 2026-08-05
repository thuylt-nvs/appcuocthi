/// Game Domain Configuration Interfaces
/// Defines abstract contracts for game parameters, timing, and reward values.

abstract class IGameConfig {
  int get maxLessonDurationMinutes;
  int get fastPassScoreThresholdPercent;
  bool get hapticFeedbackEnabled;
}

abstract class IRewardConfig {
  int get defaultLessonXp;
  int get defaultMiniGameXp;
  int get defaultLessonStars;
  int get streakBonusXp;
}
