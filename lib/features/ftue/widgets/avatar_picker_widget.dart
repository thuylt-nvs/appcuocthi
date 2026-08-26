import 'package:flutter/material.dart';
import '../../../core/tokens/color_tokens.dart';
import '../../../core/tokens/spacing_tokens.dart';
import '../../../core/tokens/animation_tokens.dart';
import '../../../core/constants/game_text.dart';
import '../../../shared/components/ns_character_avatar_widget.dart';

/// AvatarPickerWidget — Interactive Companion Selection Cards
/// Uses single rendering path via NSCharacterAvatarWidget with clean GameText labels.
class AvatarPickerWidget extends StatelessWidget {
  final String selectedAvatarId;
  final ValueChanged<String> onAvatarSelected;

  const AvatarPickerWidget({
    super.key,
    required this.selectedAvatarId,
    required this.onAvatarSelected,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Expanded(
          child: _AvatarCard(
            avatarId: 'su',
            name: GameText.companionSuName,
            description: GameText.companionSuDesc,
            badgeColor: ColorTokens.primaryBlue,
            isSelected: selectedAvatarId == 'su',
            onTap: () => onAvatarSelected('su'),
          ),
        ),
        const SizedBox(width: SpacingTokens.md),
        Expanded(
          child: _AvatarCard(
            avatarId: 'kem',
            name: GameText.companionKemName,
            description: GameText.companionKemDesc,
            badgeColor: ColorTokens.growthGreen,
            isSelected: selectedAvatarId == 'kem',
            onTap: () => onAvatarSelected('kem'),
          ),
        ),
      ],
    );
  }
}

class _AvatarCard extends StatelessWidget {
  final String avatarId;
  final String name;
  final String description;
  final Color badgeColor;
  final bool isSelected;
  final VoidCallback onTap;

  const _AvatarCard({
    required this.avatarId,
    required this.name,
    required this.description,
    required this.badgeColor,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedScale(
        scale: isSelected ? 1.05 : 1.0,
        duration: AnimationTokens.buttonPressDuration,
        curve: AnimationTokens.bounceCurve,
        child: AnimatedContainer(
          duration: AnimationTokens.buttonPressDuration,
          padding: const EdgeInsets.all(SpacingTokens.md),
          decoration: BoxDecoration(
            color: ColorTokens.surfaceWhite,
            borderRadius: SpacingTokens.cardRadius,
            border: Border.all(
              color: isSelected ? ColorTokens.secondaryYellow : ColorTokens.borderLight,
              width: isSelected ? 3.5 : 1.5,
            ),
            boxShadow: isSelected
                ? [
                    BoxShadow(
                      color: ColorTokens.secondaryYellow.withOpacity(0.45),
                      blurRadius: 14,
                      offset: const Offset(0, 5),
                    ),
                  ]
                : [
                    const BoxShadow(
                      color: Colors.black12,
                      blurRadius: 6,
                      offset: Offset(0, 2),
                    ),
                  ],
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              NSCharacterAvatarWidget(
                characterId: avatarId,
                size: 76.0,
                borderColor: isSelected ? ColorTokens.secondaryYellow : badgeColor,
              ),
              const SizedBox(height: SpacingTokens.sm),
              Text(
                name,
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      color: ColorTokens.textDark,
                      fontWeight: FontWeight.bold,
                    ),
              ),
              Text(
                description,
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: ColorTokens.textMedium,
                    ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: SpacingTokens.xs),
              AnimatedContainer(
                duration: AnimationTokens.buttonPressDuration,
                height: 20,
                child: isSelected
                    ? const Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.stars_rounded,
                              size: 16, color: ColorTokens.secondaryYellow),
                          SizedBox(width: 4),
                          Text(
                            GameText.selectedPartnerLabel,
                            style: TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.bold,
                              color: ColorTokens.secondaryYellowDark,
                            ),
                          ),
                        ],
                      )
                    : const SizedBox.shrink(),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
