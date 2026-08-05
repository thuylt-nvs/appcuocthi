import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../core/tokens/color_tokens.dart';
import '../../../core/tokens/spacing_tokens.dart';
import '../../../data/content/lesson_zero_story_data.dart';
import '../../../shared/components/ns_celebration_modal.dart';
import '../controllers/lesson_runner_controller.dart';
import 'mission_begins_scene_view.dart';
import 'meet_your_friends_story_view.dart';
import 'mini_game_stage_view.dart';
import 'hero_super_challenge_stage_view.dart';
import 'hero_reflection_stage_view.dart';
import 'parent_verification_stage_view.dart';
import 'island_bloom_stage_view.dart';

/// LessonRunnerView — Main Container Shell for Lesson Stages
/// Features narrative-aligned exit modal dialog and smooth stage switching for all 10 Stages.
class LessonRunnerView extends ConsumerWidget {
  const LessonRunnerView({super.key});

  void _showExitConfirmation(BuildContext context) {
    showDialog(
      context: context,
      builder: (dialogContext) {
        return AlertDialog(
          shape: RoundedRectangleBorder(borderRadius: SpacingTokens.cardRadius),
          title: const Text(LessonZeroStoryData.exitModalTitle),
          content: const Text(LessonZeroStoryData.exitModalBody),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(dialogContext),
              child: const Text(LessonZeroStoryData.keepPlayingCta),
            ),
            ElevatedButton(
              style: ElevatedButton.styleFrom(backgroundColor: ColorTokens.primaryBlue),
              onPressed: () {
                Navigator.pop(dialogContext);
                context.go('/map');
              },
              child: const Text(LessonZeroStoryData.takeABreakCta),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final lessonState = ref.watch(lessonRunnerControllerProvider);
    final double progress = (lessonState.currentStageIndex / 10.0).clamp(0.10, 1.0);

    return Scaffold(
      appBar: AppBar(
        title: Text('Lesson Zero — Stage ${lessonState.currentStageIndex} of 10'),
        leading: IconButton(
          icon: const Icon(Icons.close_rounded),
          onPressed: () => _showExitConfirmation(context),
        ),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(8),
          child: LinearProgressIndicator(
            value: progress,
            backgroundColor: ColorTokens.borderLight,
            valueColor: const AlwaysStoppedAnimation<Color>(ColorTokens.secondaryYellow),
            minHeight: 6,
          ),
        ),
      ),
      body: SafeArea(
        child: AnimatedSwitcher(
          duration: const Duration(milliseconds: 300),
          child: _buildStageContent(context, ref, lessonState.currentStageIndex),
        ),
      ),
    );
  }

  Widget _buildStageContent(BuildContext context, WidgetRef ref, int stageIndex) {
    switch (stageIndex) {
      case 1:
        return const MissionBeginsSceneView(key: ValueKey(1));
      case 2:
        return const MeetYourFriendsStoryView(key: ValueKey(2));
      case 3:
      case 4:
      case 5:
        return const MiniGameStageView(key: ValueKey('mini_game_stage'));
      case 6:
        return const HeroSuperChallengeStageView(key: ValueKey(6));
      case 7:
        return const HeroReflectionStageView(key: ValueKey(7));
      case 8:
        return const ParentVerificationStageView(key: ValueKey(8));
      case 9:
        return const IslandBloomStageView(key: ValueKey(9));
      case 10:
      default:
        return NSCelebrationModal(
          key: const ValueKey(10),
          onReplay: () {
            ref.read(lessonRunnerControllerProvider.notifier).resetLesson();
          },
        );
    }
  }
}
