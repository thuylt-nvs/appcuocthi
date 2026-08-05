import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../core/tokens/color_tokens.dart';
import '../../../core/tokens/spacing_tokens.dart';
import '../../../data/content/lesson_zero_story_data.dart';
import '../../../shared/components/ns_primary_button.dart';
import '../../../shared/components/ns_story_bubble.dart';
import '../../../shared/components/ns_character_avatar_widget.dart';
import '../controllers/lesson_runner_controller.dart';

/// MeetYourFriendsStoryView — Stage 2 Interactive Branching Story Scene
/// Consumes LessonZeroStoryData, GreetingStyleChoice enum, and micro-animations.
class MeetYourFriendsStoryView extends ConsumerWidget {
  const MeetYourFriendsStoryView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final lessonState = ref.watch(lessonRunnerControllerProvider);
    final GreetingStyleChoice? selectedOption = lessonState.selectedGreetingOption;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(SpacingTokens.lg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: SpacingTokens.sm),

          Text(
            LessonZeroStoryData.stage2Title,
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: ColorTokens.primaryBlue,
                  fontWeight: FontWeight.bold,
                ),
            textAlign: TextAlign.center,
          ),

          const SizedBox(height: SpacingTokens.md),

          // Su's Emotional Dialogue with Micro-Animation Switcher
          AnimatedSwitcher(
            duration: const Duration(milliseconds: 400),
            child: NSStoryBubble(
              key: ValueKey(selectedOption),
              speakerName: 'Su',
              characterEmotion: selectedOption != null ? 'happy' : 'shy',
              text: selectedOption == null
                  ? LessonZeroStoryData.stage2HesitationDialogue
                  : LessonZeroStoryData.stage2CourageDialogue,
              avatarGraphic: NSCharacterAvatarWidget(
                characterId: 'su',
                size: 48,
                emotion: selectedOption != null ? 'happy' : 'thinking',
              ),
            ),
          ),

          const SizedBox(height: SpacingTokens.lg),

          // Su Character Graphic with AnimatedScale & AnimatedOpacity
          Center(
            child: AnimatedScale(
              scale: selectedOption != null ? 1.08 : 1.0,
              duration: const Duration(milliseconds: 400),
              curve: Curves.easeOutBack,
              child: NSCharacterAvatarWidget(
                characterId: 'su',
                size: 110,
                emotion: selectedOption != null ? 'happy' : 'thinking',
                borderColor: selectedOption != null ? ColorTokens.growthGreen : ColorTokens.primaryBlue,
              ),
            ),
          ),

          const SizedBox(height: SpacingTokens.lg),

          // Dual Valid Choice Options
          if (selectedOption == null) ...[
            Text(
              LessonZeroStoryData.stage2Prompt,
              style: Theme.of(context).textTheme.displayLarge?.copyWith(
                    fontSize: 20,
                    color: ColorTokens.textDark,
                  ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: SpacingTokens.md),

            NSPrimaryButton(
              text: LessonZeroStoryData.stage2OptionA,
              icon: Icons.waving_hand_rounded,
              color: ColorTokens.primaryBlue,
              onPressed: () {
                ref
                    .read(lessonRunnerControllerProvider.notifier)
                    .selectStage2Option(GreetingStyleChoice.warmDirect);
              },
            ),

            const SizedBox(height: SpacingTokens.md),

            NSPrimaryButton(
              text: LessonZeroStoryData.stage2OptionB,
              icon: Icons.sentiment_satisfied_alt_rounded,
              color: ColorTokens.growthGreen,
              onPressed: () {
                ref
                    .read(lessonRunnerControllerProvider.notifier)
                    .selectStage2Option(GreetingStyleChoice.gentleCalm);
              },
            ),
          ],

          // Consequence & Reflection Seed with AnimatedOpacity reveal
          if (selectedOption != null) ...[
            AnimatedOpacity(
              opacity: selectedOption != null ? 1.0 : 0.0,
              duration: const Duration(milliseconds: 500),
              child: Column(
                children: [
                  Container(
                    padding: const EdgeInsets.all(SpacingTokens.md),
                    decoration: BoxDecoration(
                      color: ColorTokens.growthGreenLight,
                      borderRadius: SpacingTokens.cardRadius,
                      border: Border.all(color: ColorTokens.growthGreen, width: 2),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.face_retouching_natural_rounded,
                            color: ColorTokens.growthGreenDark, size: 40),
                        const SizedBox(width: SpacingTokens.md),
                        Expanded(
                          child: Text(
                            selectedOption == GreetingStyleChoice.warmDirect
                                ? LessonZeroStoryData.neighborReactionA
                                : LessonZeroStoryData.neighborReactionB,
                            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                                  color: ColorTokens.textDark,
                                  fontWeight: FontWeight.bold,
                                ),
                          ),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: SpacingTokens.lg),

                  const NSStoryBubble(
                    speakerName: LessonZeroStoryData.ReflectionSpeaker,
                    text: LessonZeroStoryData.reflectionSeedText,
                    backgroundColor: ColorTokens.secondaryYellowLight,
                    borderColor: ColorTokens.secondaryYellow,
                    avatarGraphic: NSCharacterAvatarWidget(
                      characterId: 'sao_nova',
                      size: 44,
                    ),
                  ),

                  const SizedBox(height: SpacingTokens.xl),

                  NSPrimaryButton(
                    text: 'Return to World Map',
                    icon: Icons.map_rounded,
                    color: ColorTokens.primaryBlue,
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
