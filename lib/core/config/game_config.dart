import '../game/config/game_config_interface.dart';
import '../../data/models/game_config_model.dart';

/// Concrete runtime Game Config wrapper implementing IGameConfig.
class GameConfig implements IGameConfig {
  final GameConfigModel _model;

  const GameConfig([GameConfigModel model = GameConfigModel.defaultConfig])
      : _model = model;

  @override
  int get maxLessonDurationMinutes => _model.maxLessonDurationMinutes;

  @override
  int get fastPassScoreThresholdPercent => _model.fastPassScoreThresholdPercent;

  @override
  bool get hapticFeedbackEnabled => _model.hapticFeedbackEnabled;

  int get miniGameMaxRetries => _model.miniGameMaxRetries;
}
