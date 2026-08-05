import 'package:flutter_test/flutter_test.dart';
import 'package:novastars_mvp/data/repositories/game_config_repository.dart';
import 'package:novastars_mvp/data/models/game_config_model.dart';
import 'package:novastars_mvp/core/config/game_config.dart';
import 'package:novastars_mvp/core/config/reward_config.dart';

void main() {
  group('GameConfigRepository Unit Tests', () {
    late GameConfigRepository repository;

    setUp(() {
      repository = GameConfigRepository();
    });

    test('should parse valid game_config.json string correctly', () {
      const validJson = '''
      {
        "game_rules": {
          "max_lesson_duration_minutes": 20,
          "fast_pass_score_threshold_percent": 95,
          "haptic_feedback_enabled": false
        },
        "rewards": {
          "lesson_completion_xp": 150,
          "mini_game_completion_xp": 25,
          "lesson_completion_stars_default": 3,
          "daily_streak_bonus_xp": 30
        }
      }
      ''';

      final model = repository.parseRawJson(validJson);
      final gameConfig = GameConfig(model);
      final rewardConfig = RewardConfig(model);

      expect(gameConfig.maxLessonDurationMinutes, equals(20));
      expect(gameConfig.fastPassScoreThresholdPercent, equals(95));
      expect(gameConfig.hapticFeedbackEnabled, isFalse);

      expect(rewardConfig.defaultLessonXp, equals(150));
      expect(rewardConfig.defaultMiniGameXp, equals(25));
      expect(rewardConfig.streakBonusXp, equals(30));
    });

    test('should supply default fallback values when JSON keys are missing', () {
      const emptyJson = '{}';

      final model = repository.parseRawJson(emptyJson);
      final gameConfig = GameConfig(model);
      final rewardConfig = RewardConfig(model);

      expect(gameConfig.maxLessonDurationMinutes, equals(15));
      expect(gameConfig.fastPassScoreThresholdPercent, equals(90));
      expect(gameConfig.hapticFeedbackEnabled, isTrue);

      expect(rewardConfig.defaultLessonXp, equals(100));
      expect(rewardConfig.defaultMiniGameXp, equals(15));
      expect(rewardConfig.streakBonusXp, equals(20));
    });

    test('should fallback to defaultConfig on malformed JSON string', () {
      const invalidJson = 'malformed json string';

      final model = repository.parseRawJson(invalidJson);
      expect(model.defaultLessonXp, equals(GameConfigModel.defaultConfig.defaultLessonXp));
      expect(model.maxLessonDurationMinutes, equals(GameConfigModel.defaultConfig.maxLessonDurationMinutes));
    });
  });
}
