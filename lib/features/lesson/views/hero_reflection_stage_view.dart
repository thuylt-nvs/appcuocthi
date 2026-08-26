import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../core/tokens/color_tokens.dart';
import '../../../core/tokens/spacing_tokens.dart';
import '../../../core/tokens/animation_tokens.dart';
import '../../../data/content/lesson_zero_story_data.dart';
import '../../../shared/components/ns_primary_button.dart';
import '../../../shared/components/ns_story_bubble.dart';
import '../../../shared/components/ns_character_avatar_widget.dart';
import '../controllers/lesson_runner_controller.dart';

/// HeroReflectionStageView — Stage 7 2-Step Hero Journal Reflection View
/// Features 2-Step Reflection (Emotion Choice + Equally Valid Meaning-Making "Why?" Step)
/// and Sao Nova's real-world narrative bridge whisper.
class HeroReflectionStageView extends ConsumerStatefulWidget {
  const HeroReflectionStageView({super.key});

  @override
  ConsumerState<HeroReflectionStageView> createState() =>
      _HeroReflectionStageViewState();
}

class _HeroReflectionStageViewState
    extends ConsumerState<HeroReflectionStageView> {
  String? _selectedEmotion;
  String? _selectedWhy;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(SpacingTokens.lg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            LessonZeroStoryData.stage7Title,
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: ColorTokens.primaryBlue,
                  fontWeight: FontWeight.bold,
                ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: SpacingTokens.md),

          // Hero Journal Container
          Container(
            padding: const EdgeInsets.all(SpacingTokens.md),
            decoration: BoxDecoration(
              color: ColorTokens.surfaceWhite,
              borderRadius: SpacingTokens.cardRadius,
              border: Border.all(color: ColorTokens.secondaryYellow, width: 3),
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
                const Icon(Icons.book_rounded, color: ColorTokens.primaryBlue, size: 48),
                const SizedBox(height: SpacingTokens.xs),
                Text(
                  'Hero Journal Entry',
                  style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        color: ColorTokens.textDark,
                        fontWeight: FontWeight.bold,
                      ),
                ),
                const SizedBox(height: SpacingTokens.md),

                // Step 1: Emotion Choice
                Text(
                  LessonZeroStoryData.stage7EmotionPrompt,
                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        color: ColorTokens.textDark,
                        fontWeight: FontWeight.w600,
                      ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: SpacingTokens.sm),

                if (_selectedEmotion == null) ...[
                  ChoiceChip(
                    label: Text(LessonZeroStoryData.emotionOption1),
                    selected: false,
                    onSelected: (_) => setState(() => _selectedEmotion = LessonZeroStoryData.emotionOption1),
                  ),
                  const SizedBox(height: 4),
                  ChoiceChip(
                    label: Text(LessonZeroStoryData.emotionOption2),
                    selected: false,
                    onSelected: (_) => setState(() => _selectedEmotion = LessonZeroStoryData.emotionOption2),
                  ),
                  const SizedBox(height: 4),
                  ChoiceChip(
                    label: Text(LessonZeroStoryData.emotionOption3),
                    selected: false,
                    onSelected: (_) => setState(() => _selectedEmotion = LessonZeroStoryData.emotionOption3),
                  ),
                ],

                if (_selectedEmotion != null) ...[
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: ColorTokens.primaryBlueLight,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      'Su says: "$_selectedEmotion"',
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        color: ColorTokens.primaryBlueDark,
                      ),
                    ),
                  ),
                  const SizedBox(height: SpacingTokens.lg),

                  // Step 2: Meaning-Making "Why?" Step (Equally Valid Choices)
                  if (_selectedWhy == null) ...[
                    Text(
                      LessonZeroStoryData.stage7WhyPrompt,
                      style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                            color: ColorTokens.textDark,
                            fontWeight: FontWeight.w600,
                          ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: SpacingTokens.sm),
                    NSPrimaryButton(
                      text: LessonZeroStoryData.whyOption1,
                      icon: Icons.favorite_rounded,
                      color: ColorTokens.growthGreen,
                      onPressed: () {
                        setState(() => _selectedWhy = LessonZeroStoryData.whyOption1);
                        ref.read(lessonRunnerControllerProvider.notifier).completeStage7Reflection(LessonZeroStoryData.whyOption1);
                      },
                    ),
                    const SizedBox(height: SpacingTokens.xs),
                    NSPrimaryButton(
                      text: LessonZeroStoryData.whyOption2,
                      icon: Icons.auto_awesome_rounded,
                      color: ColorTokens.primaryBlue,
                      onPressed: () {
                        setState(() => _selectedWhy = LessonZeroStoryData.whyOption2);
                        ref.read(lessonRunnerControllerProvider.notifier).completeStage7Reflection(LessonZeroStoryData.whyOption2);
                      },
                    ),
                    const SizedBox(height: SpacingTokens.xs),
                    NSPrimaryButton(
                      text: LessonZeroStoryData.whyOption3,
                      icon: Icons.star_rounded,
                      color: ColorTokens.secondaryYellowDark,
                      onPressed: () {
                        setState(() => _selectedWhy = LessonZeroStoryData.whyOption3);
                        ref.read(lessonRunnerControllerProvider.notifier).completeStage7Reflection(LessonZeroStoryData.whyOption3);
                      },
                    ),
                  ],
                ],
              ],
            ),
          ),

          const SizedBox(height: SpacingTokens.lg),

          // Real-World Narrative Bridge & Map Return CTA
          if (_selectedWhy != null) ...[
            AnimatedOpacity(
              opacity: _selectedWhy != null ? 1.0 : 0.0,
              duration: AnimationTokens.buttonPressDuration,
              child: Column(
                children: [
                  const NSStoryBubble(
                    speakerName: 'Sao Nova Narrative Bridge',
                    text: LessonZeroStoryData.realWorldNarrativeBridge,
                    backgroundColor: ColorTokens.secondaryYellowLight,
                    borderColor: ColorTokens.secondaryYellow,
                    avatarGraphic: NSCharacterAvatarWidget(
                      characterId: 'sao_nova',
                      size: 44,
                    ),
                  ),

                  const SizedBox(height: SpacingTokens.xl),

                  NSPrimaryButton(
                    text: 'Pause & Enter Internal Validation Gate (IVG-01)',
                    icon: Icons.check_circle_rounded,
                    color: ColorTokens.growthGreen,
                    onPressed: () {
                      context.go('/map');
                    },
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }
}
