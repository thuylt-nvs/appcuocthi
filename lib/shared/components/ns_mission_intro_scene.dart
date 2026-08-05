import 'package:flutter/material.dart';
import '../../core/tokens/color_tokens.dart';
import '../../core/tokens/spacing_tokens.dart';
import '../../core/constants/game_text.dart';
import '../../core/services/lesson_runner_stub.dart';
import 'ns_primary_button.dart';
import 'ns_character_avatar_widget.dart';

/// NSMissionIntroScene — Game Level Intro Sheet Scene
/// Uses GameText constants and clean LessonRunner.startLessonZero callback.
class NSMissionIntroScene extends StatelessWidget {
  final String missionTitle;
  final String competencyTitle;
  final String estimatedTime;
  final int targetXp;
  final int targetStars;
  final String badgeTitle;
  final String companionId;
  final void Function(BuildContext context) onBeginMission;

  const NSMissionIntroScene({
    super.key,
    this.missionTitle = GameText.mission1Title,
    this.competencyTitle = GameText.competencyPoliteGreetings,
    this.estimatedTime = GameText.estimatedDuration15m,
    this.targetXp = 100,
    this.targetStars = 3,
    this.badgeTitle = GameText.badgeSuperstarGreeting,
    this.companionId = 'su',
    this.onBeginMission = LessonRunner.startLessonZero,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(SpacingTokens.lg),
      decoration: const BoxDecoration(
        color: ColorTokens.surfaceWhite,
        borderRadius: BorderRadius.vertical(top: Radius.circular(28.0)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 48,
            height: 5,
            decoration: BoxDecoration(
              color: ColorTokens.borderLight,
              borderRadius: BorderRadius.circular(10),
            ),
          ),
          const SizedBox(height: SpacingTokens.md),

          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 4),
            decoration: BoxDecoration(
              color: ColorTokens.primaryBlue.withOpacity(0.15),
              borderRadius: BorderRadius.circular(16),
            ),
            child: const Text(
              GameText.mission1Tag,
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.black,
                color: ColorTokens.primaryBlue,
                letterSpacing: 1.0,
              ),
            ),
          ),

          const SizedBox(height: SpacingTokens.sm),

          Text(
            missionTitle,
            style: Theme.of(context).textTheme.displayLarge?.copyWith(
                  fontSize: 26,
                  color: ColorTokens.textDark,
                ),
            textAlign: TextAlign.center,
          ),

          const SizedBox(height: 4),

          Text(
            competencyTitle,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: ColorTokens.textMedium,
                  fontWeight: FontWeight.w600,
                ),
            textAlign: TextAlign.center,
          ),

          const SizedBox(height: SpacingTokens.md),

          NSCharacterAvatarWidget(
            characterId: companionId,
            size: 88,
            emotion: 'happy',
          ),

          const SizedBox(height: SpacingTokens.md),

          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: ColorTokens.backgroundLight,
              borderRadius: SpacingTokens.cardRadius,
              border: Border.all(color: ColorTokens.borderLight),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _RewardItem(
                  icon: Icons.timer_rounded,
                  iconColor: ColorTokens.primaryBlue,
                  label: estimatedTime,
                ),
                _RewardItem(
                  icon: Icons.bolt_rounded,
                  iconColor: ColorTokens.warningOrange,
                  label: '+$targetXp XP',
                ),
                _RewardItem(
                  icon: Icons.stars_rounded,
                  iconColor: ColorTokens.secondaryYellow,
                  label: '$targetStars Stars',
                ),
              ],
            ),
          ),

          const SizedBox(height: SpacingTokens.xl),

          NSPrimaryButton(
            text: GameText.beginMissionCta,
            icon: Icons.play_arrow_rounded,
            color: ColorTokens.growthGreen,
            onPressed: () {
              Navigator.pop(context);
              onBeginMission(context);
            },
          ),

          const SizedBox(height: SpacingTokens.sm),
        ],
      ),
    );
  }
}

class _RewardItem extends StatelessWidget {
  final IconData icon;
  final Color iconColor;
  final String label;

  const _RewardItem({
    required this.icon,
    required this.iconColor,
    required this.label,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(icon, color: iconColor, size: 22),
        const SizedBox(width: 6),
        Text(
          label,
          style: const TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.bold,
            color: ColorTokens.textDark,
          ),
        ),
      ],
    );
  }
}
