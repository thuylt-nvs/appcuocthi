import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/tokens/color_tokens.dart';
import '../../../core/tokens/spacing_tokens.dart';
import '../../../core/tokens/animation_tokens.dart';
import '../../../data/content/lesson_zero_story_data.dart';
import '../../../shared/components/ns_primary_button.dart';
import '../../../shared/components/ns_story_bubble.dart';
import '../../../shared/components/ns_character_avatar_widget.dart';
import '../controllers/lesson_runner_controller.dart';

/// ParentVerificationStageView — Stage 8 Parent Real-World Confirmation Card View
/// Uses large child-friendly tactile praise cards instead of basic choice chips.
class ParentVerificationStageView extends ConsumerStatefulWidget {
  const ParentVerificationStageView({super.key});

  @override
  ConsumerState<ParentVerificationStageView> createState() =>
      _ParentVerificationStageViewState();
}

class _ParentVerificationStageViewState
    extends ConsumerState<ParentVerificationStageView> {
  String _selectedPraise = LessonZeroStoryData.praiseOption1;
  bool _isConfirmed = false;

  void _onConfirm() {
    if (_isConfirmed) return;
    setState(() => _isConfirmed = true);

    ref.read(lessonRunnerControllerProvider.notifier).confirmParentVerification(_selectedPraise);
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(SpacingTokens.lg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            LessonZeroStoryData.stage8Title,
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: ColorTokens.primaryBlue,
                  fontWeight: FontWeight.bold,
                ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: SpacingTokens.md),

          const NSStoryBubble(
            speakerName: 'Parent Real-World Anchor',
            text: LessonZeroStoryData.parentPrompt,
            avatarGraphic: NSCharacterAvatarWidget(
              characterId: 'sao_nova',
              size: 44,
            ),
          ),

          const SizedBox(height: SpacingTokens.xl),

          // Parent Confirmation Card Container
          Container(
            padding: const EdgeInsets.all(SpacingTokens.md),
            decoration: BoxDecoration(
              color: ColorTokens.surfaceWhite,
              borderRadius: SpacingTokens.cardRadius,
              border: Border.all(color: ColorTokens.growthGreen, width: 3),
              boxShadow: const [
                BoxShadow(
                  color: Colors.black12,
                  blurRadius: 10,
                  offset: Offset(0, 4),
                ),
              ],
            ),
            child: Column(
              children: [
                const Icon(Icons.family_restroom_rounded,
                    color: ColorTokens.growthGreenDark, size: 48),
                const SizedBox(height: SpacingTokens.xs),
                Text(
                  LessonZeroStoryData.parentConfirmCardTitle,
                  style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontSize: 16,
                        color: ColorTokens.textDark,
                        fontWeight: FontWeight.bold,
                      ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: SpacingTokens.md),

                // Large Tactile Parent Praise Cards
                Text(
                  'Select Warm Parent Praise Card:',
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: ColorTokens.textMedium,
                        fontWeight: FontWeight.bold,
                      ),
                ),
                const SizedBox(height: SpacingTokens.sm),

                _PraiseCard(
                  text: LessonZeroStoryData.praiseOption1,
                  isSelected: _selectedPraise == LessonZeroStoryData.praiseOption1,
                  onTap: () => setState(() => _selectedPraise = LessonZeroStoryData.praiseOption1),
                ),
                const SizedBox(height: SpacingTokens.xs),
                _PraiseCard(
                  text: LessonZeroStoryData.praiseOption2,
                  isSelected: _selectedPraise == LessonZeroStoryData.praiseOption2,
                  onTap: () => setState(() => _selectedPraise = LessonZeroStoryData.praiseOption2),
                ),
                const SizedBox(height: SpacingTokens.xs),
                _PraiseCard(
                  text: LessonZeroStoryData.praiseOption3,
                  isSelected: _selectedPraise == LessonZeroStoryData.praiseOption3,
                  onTap: () => setState(() => _selectedPraise = LessonZeroStoryData.praiseOption3),
                ),
              ],
            ),
          ),

          const SizedBox(height: SpacingTokens.xl),

          NSPrimaryButton(
            text: LessonZeroStoryData.confirmActionCta,
            icon: Icons.check_circle_rounded,
            color: ColorTokens.growthGreen,
            onPressed: _onConfirm,
          ),
        ],
      ),
    );
  }
}

class _PraiseCard extends StatelessWidget {
  final String text;
  final bool isSelected;
  final VoidCallback onTap;

  const _PraiseCard({
    required this.text,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedScale(
        scale: isSelected ? 1.02 : 1.0,
        duration: AnimationTokens.buttonPressDuration,
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
          decoration: BoxDecoration(
            color: isSelected ? ColorTokens.secondaryYellowLight : ColorTokens.surfaceWhite,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: isSelected ? ColorTokens.secondaryYellow : ColorTokens.borderLight,
              width: isSelected ? 2.5 : 1.5,
            ),
          ),
          child: Row(
            children: [
              Icon(
                isSelected ? Icons.stars_rounded : Icons.star_border_rounded,
                color: isSelected ? ColorTokens.secondaryYellowDark : ColorTokens.textMuted,
                size: 20,
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  text,
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                    color: ColorTokens.textDark,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
