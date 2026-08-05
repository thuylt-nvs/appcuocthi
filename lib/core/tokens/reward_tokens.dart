/// Design Token Foundation — Reward Identity Tokens
/// Defines reward type identifiers only.
/// Concrete gameplay values (XP amounts, Star thresholds) are owned by GameConfig.
abstract class RewardTokens {
  static const String xpKey = 'reward_xp';
  static const String starKey = 'reward_star';
  static const String coinKey = 'reward_coin';
  static const String badgeKey = 'reward_badge';
  static const String cosmeticKey = 'reward_cosmetic';
}
