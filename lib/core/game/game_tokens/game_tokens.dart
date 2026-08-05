/// Game Tokens Foundation
/// Establishes type definitions for in-game currencies, reward types, and progress tiers.
/// Reserved for future gameplay systems (XP, Stars, Coins, Badges, Cosmetics).

enum GameRewardType {
  xp,
  star,
  coin,
  badge,
  cosmetic,
  islandUnlock,
}

enum DifficultyTier {
  beginner,
  intermediate,
  hero,
}

/// Abstract contract for game tokens and rewards.
abstract class IGameToken {
  String get id;
  GameRewardType get type;
  int get amount;
}
