import '../../data/models/game_config_model.dart';

/// Concrete runtime Animation Config wrapper supplying timing & scale metrics.
class AnimationConfig {
  final GameConfigModel _model;

  const AnimationConfig([GameConfigModel model = GameConfigModel.defaultConfig])
      : _model = model;

  double get buttonPressScaleDown => _model.buttonPressScaleDown;
  Duration get buttonPressDuration => Duration(milliseconds: _model.buttonPressDurationMs);
  Duration get pageTransitionDuration => Duration(milliseconds: _model.pageTransitionDurationMs);
  Duration get confettiBlastDuration => Duration(milliseconds: _model.confettiBlastDurationMs);
  Duration get xpBarFillDuration => Duration(milliseconds: _model.xpBarFillDurationMs);
  Duration get islandBloomDuration => Duration(milliseconds: _model.islandBloomDurationMs);
}
