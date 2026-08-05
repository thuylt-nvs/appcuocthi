/// Game Events Foundation
/// Establishes event contract definitions for decoupled gameplay triggers.
/// Future controllers and analytics listeners subscribe to these events.

abstract class GameEvent {
  final DateTime timestamp;
  GameEvent() : timestamp = DateTime.now();
}

/// Dispatched when a stage within a lesson is completed.
class StageCompletedEvent extends GameEvent {
  final String lessonId;
  final int stageIndex;
  final bool isSuccess;

  StageCompletedEvent({
    required this.lessonId,
    required this.stageIndex,
    required this.isSuccess,
  });
}

/// Dispatched when rewards are granted to the user.
class RewardEarnedEvent extends GameEvent {
  final int xpEarned;
  final int starsEarned;
  final String? badgeId;

  RewardEarnedEvent({
    required this.xpEarned,
    required this.starsEarned,
    this.badgeId,
  });
}
