/// Generalized Game Event Foundation
/// Reusable for Gameplay, Analytics, Replay, AI, and Debugging.

abstract class GameEvent {
  final String eventId;
  final String eventType;
  final DateTime timestamp;
  final Map<String, dynamic> payload;

  GameEvent({
    required this.eventId,
    required this.eventType,
    required this.payload,
    DateTime? timestamp,
  }) : timestamp = timestamp ?? DateTime.now();
}

/// Dispatched when a lesson stage completes.
class StageCompletedEvent extends GameEvent {
  StageCompletedEvent({
    required String eventId,
    required String lessonId,
    required int stageIndex,
    required bool isSuccess,
  }) : super(
          eventId: eventId,
          eventType: 'stage_completed',
          payload: {
            'lessonId': lessonId,
            'stageIndex': stageIndex,
            'isSuccess': isSuccess,
          },
        );
}

/// Dispatched when rewards are granted.
class RewardEarnedEvent extends GameEvent {
  RewardEarnedEvent({
    required String eventId,
    required int xpEarned,
    required int starsEarned,
    String? badgeId,
  }) : super(
          eventId: eventId,
          eventType: 'reward_earned',
          payload: {
            'xpEarned': xpEarned,
            'starsEarned': starsEarned,
            if (badgeId != null) 'badgeId': badgeId,
          },
        );
}
