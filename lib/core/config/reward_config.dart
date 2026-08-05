import '../game/config/game_config_interface.dart';
import '../../data/models/game_config_model.dart';

/// Concrete runtime Reward Config wrapper implementing IRewardConfig.
class RewardConfig implements IRewardConfig {
  final GameConfigModel _model;

  const RewardConfig([GameConfigModel model = GameConfigModel.defaultConfig])
      : _model = model;

  @override
  int get defaultLessonXp => _model.defaultLessonXp;

  @override
  int get defaultMiniGameXp => _model.defaultMiniGameXp;

  @override
  int get defaultLessonStars => _model.defaultLessonStars;

  @override
  int get streakBonusXp => _model.streakBonusXp;
}
