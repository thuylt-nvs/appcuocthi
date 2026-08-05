import '../../core/game/config/game_config_interface.dart';

/// Concrete Data Model parsing game_config.json parameters with fallback defaults.
class GameConfigModel implements IGameConfig, IRewardConfig {
  @override
  final int maxLessonDurationMinutes;

  @override
  final int fastPassScoreThresholdPercent;

  final int miniGameMaxRetries;

  @override
  final bool hapticFeedbackEnabled;

  @override
  final int defaultLessonXp;

  @override
  final int defaultMiniGameXp;

  @override
  final int defaultLessonStars;

  @override
  final int streakBonusXp;

  final double buttonPressScaleDown;
  final int buttonPressDurationMs;
  final int pageTransitionDurationMs;
  final int confettiBlastDurationMs;
  final int xpBarFillDurationMs;
  final int islandBloomDurationMs;

  final String tapSfxPath;
  final String correctSfxPath;
  final String thinkingSfxPath;
  final String celebrationSfxPath;

  const GameConfigModel({
    this.maxLessonDurationMinutes = 15,
    this.fastPassScoreThresholdPercent = 90,
    this.miniGameMaxRetries = -1,
    this.hapticFeedbackEnabled = true,
    this.defaultLessonXp = 100,
    this.defaultMiniGameXp = 15,
    this.defaultLessonStars = 3,
    this.streakBonusXp = 20,
    this.buttonPressScaleDown = 0.95,
    this.buttonPressDurationMs = 150,
    this.pageTransitionDurationMs = 300,
    this.confettiBlastDurationMs = 2500,
    this.xpBarFillDurationMs = 800,
    this.islandBloomDurationMs = 1200,
    this.tapSfxPath = 'assets/audio/bubble_pop.wav',
    this.correctSfxPath = 'assets/audio/correct_chime.wav',
    this.thinkingSfxPath = 'assets/audio/thinking_soft.wav',
    this.celebrationSfxPath = 'assets/audio/celebrate_fanfare.wav',
  });

  /// Factory constructor parsing JSON map safely with default fallback values.
  factory GameConfigModel.fromJson(Map<String, dynamic> json) {
    final rules = json['game_rules'] as Map<String, dynamic>? ?? {};
    final rewards = json['rewards'] as Map<String, dynamic>? ?? {};
    final animations = json['animations'] as Map<String, dynamic>? ?? {};
    final audio = json['audio_triggers'] as Map<String, dynamic>? ?? {};

    return GameConfigModel(
      maxLessonDurationMinutes: rules['max_lesson_duration_minutes'] as int? ?? 15,
      fastPassScoreThresholdPercent: rules['fast_pass_score_threshold_percent'] as int? ?? 90,
      miniGameMaxRetries: rules['mini_game_max_retries'] as int? ?? -1,
      hapticFeedbackEnabled: rules['haptic_feedback_enabled'] as bool? ?? true,
      defaultLessonXp: rewards['lesson_completion_xp'] as int? ?? 100,
      defaultMiniGameXp: rewards['mini_game_completion_xp'] as int? ?? 15,
      defaultLessonStars: rewards['lesson_completion_stars_default'] as int? ?? 3,
      streakBonusXp: rewards['daily_streak_bonus_xp'] as int? ?? 20,
      buttonPressScaleDown: (animations['button_press_scale_down'] as num?)?.toDouble() ?? 0.95,
      buttonPressDurationMs: animations['button_press_duration_ms'] as int? ?? 150,
      pageTransitionDurationMs: animations['page_transition_duration_ms'] as int? ?? 300,
      confettiBlastDurationMs: animations['confetti_blast_duration_ms'] as int? ?? 2500,
      xpBarFillDurationMs: animations['xp_bar_fill_duration_ms'] as int? ?? 800,
      islandBloomDurationMs: animations['island_bloom_duration_ms'] as int? ?? 1200,
      tapSfxPath: audio['tap_sfx'] as String? ?? 'assets/audio/bubble_pop.wav',
      correctSfxPath: audio['correct_sfx'] as String? ?? 'assets/audio/correct_chime.wav',
      thinkingSfxPath: audio['thinking_sfx'] as String? ?? 'assets/audio/thinking_soft.wav',
      celebrationSfxPath: audio['celebration_sfx'] as String? ?? 'assets/audio/celebrate_fanfare.wav',
    );
  }

  /// Default fallback configuration instance.
  static const GameConfigModel defaultConfig = GameConfigModel();
}
