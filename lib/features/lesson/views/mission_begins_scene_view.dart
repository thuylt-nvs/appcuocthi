import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/tokens/color_tokens.dart';
import '../../../core/tokens/spacing_tokens.dart';
import '../../../data/content/lesson_zero_story_data.dart';
import '../../../shared/components/ns_primary_button.dart';
import '../../../shared/components/ns_story_bubble.dart';
import '../../../shared/components/ns_character_avatar_widget.dart';
import '../controllers/lesson_runner_controller.dart';

/// MissionBeginsSceneView — Stage 1 Opening Story Scene
/// Renders story data from LessonZeroStoryData using typed enums.
class MissionBeginsSceneView extends ConsumerWidget {
  const MissionBeginsSceneView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(SpacingTokens.lg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: SpacingTokens.sm),

          Text(
            LessonZeroStoryData.stage1Title,
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: ColorTokens.primaryBlue,
                  fontWeight: FontWeight.bold,
                ),
            textAlign: TextAlign.center,
          ),

          const SizedBox(height: SpacingTokens.md),

          const NSStoryBubble(
            speakerName: 'Narrator',
            text: LessonZeroStoryData.stage1Dialogue,
            avatarGraphic: NSCharacterAvatarWidget(
              characterId: 'sao_nova',
              size: 44,
            ),
          ),

          const SizedBox(height: SpacingTokens.xl),

          const Center(
            child: NSCharacterAvatarWidget(
              characterId: 'su',
              size: 110,
              emotion: 'happy',
            ),
          ),

          const SizedBox(height: SpacingTokens.md),

          Text(
            LessonZeroStoryData.stage1Prompt,
            style: Theme.of(context).textTheme.displayLarge?.copyWith(
                  fontSize: 20,
                  color: ColorTokens.textDark,
                ),
            textAlign: TextAlign.center,
          ),

          const SizedBox(height: SpacingTokens.lg),

          NSPrimaryButton(
            text: LessonZeroStoryData.stage1OptionA,
            icon: Icons.waving_hand_rounded,
            color: ColorTokens.primaryBlue,
            onPressed: () {
              ref
                  .read(lessonRunnerControllerProvider.notifier)
                  .completeStage1(InitialApproachChoice.waveSmile);
            },
          ),

          const SizedBox(height: SpacingTokens.md),

          NSPrimaryButton(
            text: LessonZeroStoryData.stage1OptionB,
            icon: Icons.directions_walk_rounded,
            color: ColorTokens.growthGreen,
            onPressed: () {
              ref
                  .read(lessonRunnerControllerProvider.notifier)
                  .completeStage1(InitialApproachChoice.walkCloser);
            },
          ),
        ],
      ),
    );
  }
}
