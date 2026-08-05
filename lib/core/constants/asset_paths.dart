/// NovaStars Specialized Asset Registries
/// Separates asset definitions into modular domain categories for maintainability.

abstract class CharacterAssets {
  static const String suHappy = 'assets/characters/su_happy.png';
  static const String suThinking = 'assets/characters/su_thinking.png';
  static const String kemHappy = 'assets/characters/kem_happy.png';
  static const String saoNovaWave = 'assets/characters/sao_nova_wave.png';
}

abstract class AudioAssets {
  static const String sfxBubblePop = 'assets/audio/bubble_pop.wav';
  static const String sfxCorrectChime = 'assets/audio/correct_chime.wav';
  static const String sfxThinkingSoft = 'assets/audio/thinking_soft.wav';
  static const String sfxCelebrateFanfare = 'assets/audio/celebrate_fanfare.wav';
}

abstract class AnimationAssets {
  static const String confettiBlast = 'assets/animations/confetti_blast.json';
  static const String flowerBloom = 'assets/animations/flower_bloom.json';
}

abstract class IconAssets {
  static const String star = 'assets/icons/icon_star.svg';
  static const String xp = 'assets/icons/icon_xp.svg';
  static const String streak = 'assets/icons/icon_streak.svg';
}

abstract class WorldAssets {
  static const String mapBg = 'assets/images/bg_world_map.png';
  static const String island1Courage = 'assets/images/island1_courage.png';
}

abstract class ContentAssets {
  static const String lessonZeroJson = 'assets/content/lesson_zero.json';
}

abstract class ConfigAssets {
  static const String gameConfigJson = 'assets/config/game_config.json';
}

/// Unified Asset Registry Aggregator
/// Maintains backwards compatibility while referencing specialized registries.
abstract class AssetPaths {
  static const String gameConfigJson = ConfigAssets.gameConfigJson;
  static const String lessonZeroJson = ContentAssets.lessonZeroJson;

  static const String sfxBubblePop = AudioAssets.sfxBubblePop;
  static const String sfxCorrectChime = AudioAssets.sfxCorrectChime;
  static const String sfxThinkingSoft = AudioAssets.sfxThinkingSoft;
  static const String sfxCelebrateFanfare = AudioAssets.sfxCelebrateFanfare;

  static const String charSuHappy = CharacterAssets.suHappy;
  static const String charSuThinking = CharacterAssets.suThinking;
  static const String charKemHappy = CharacterAssets.kemHappy;
  static const String charSaoNovaWave = CharacterAssets.saoNovaWave;

  static const String iconStar = IconAssets.star;
  static const String iconXp = IconAssets.xp;
  static const String iconStreak = IconAssets.streak;

  static const String animConfettiBlast = AnimationAssets.confettiBlast;
  static const String animFlowerBloom = AnimationAssets.flowerBloom;

  static const String imgWorldMapBg = WorldAssets.mapBg;
  static const String imgIsland1Courage = WorldAssets.island1Courage;
}
