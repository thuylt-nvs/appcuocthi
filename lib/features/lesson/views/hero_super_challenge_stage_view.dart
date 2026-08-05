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

/// HeroSuperChallengeStageView — Stage 6 Playground Social Transfer Challenge View
/// Presents classmate emotional progression (shy -> noticing -> smiling -> engaging).
class HeroSuperChallengeStageView extends ConsumerStatefulWidget {
  const HeroSuperChallengeStageView({super.key});

  @override
  ConsumerState<HeroSuperChallengeStageView> createState() =>
      _HeroSuperChallengeStageViewState();
}

class _HeroSuperChallengeStageViewState
    extends ConsumerState<HeroSuperChallengeStageView> {
  int _progressionStep = 0; // 0: Shy, 1: Noticing, 2: Smiling, 3: Engaging

  void _onExecuteGreeting() {
    if (_progressionStep > 0) return;
    setState(() => _progressionStep = 1);

    // Step 2: Noticing Su's greeting (after 600ms)
    Future.delayed(AnimationTokens.buttonPressDuration * 3, () {
      if (mounted) setState(() => _progressionStep = 2);
    });

    // Step 3: Smiling & Engaging (after 1200ms)
    Future.delayed(AnimationTokens.buttonPressDuration * 6, () {
      if (mounted) {
        setState(() => _progressionStep = 3);
        ref.read(lessonRunnerControllerProvider.notifier).completeStage6Challenge();
      }
    });
  }

  String get _classmateStatusText {
    switch (_progressionStep) {
      case 1:
        return LessonZeroStoryData.classmateNoticingText;
      case 2:
        return LessonZeroStoryData.classmateSmilingText;
      case 3:
        return LessonZeroStoryData.classmateEngagingText;
      case 0:
      default:
        return LessonZeroStoryData.classmateShyText;
    }
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(SpacingTokens.lg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            LessonZeroStoryData.stage6Title,
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: ColorTokens.primaryBlue,
                  fontWeight: FontWeight.bold,
                ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: SpacingTokens.md),

          const NSStoryBubble(
            speakerName: 'Playground Scenario',
            text: LessonZeroStoryData.stage6Dialogue,
            avatarGraphic: NSCharacterAvatarWidget(
              characterId: 'sao_nova',
              size: 44,
            ),
          ),

          const SizedBox(height: SpacingTokens.xl),

          // Playground Scene Container with Su and Classmate
          Container(
            padding: const EdgeInsets.all(SpacingTokens.md),
            decoration: BoxDecoration(
              color: ColorTokens.surfaceWhite,
              borderRadius: SpacingTokens.cardRadius,
              border: Border.all(color: ColorTokens.secondaryYellow, width: 2.5),
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
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    const NSCharacterAvatarWidget(
                      characterId: 'su',
                      size: 90,
                      emotion: 'happy',
                    ),
                    const Icon(
                      Icons.park_rounded,
                      color: ColorTokens.growthGreen,
                      size: 36,
                    ),
                    AnimatedScale(
                      scale: _progressionStep == 3 ? 1.1 : 1.0,
                      duration: AnimationTokens.buttonPressDuration,
                      child: NSCharacterAvatarWidget(
                        characterId: 'kem',
                        size: 90,
                        emotion: _progressionStep >= 2 ? 'happy' : 'thinking',
                        borderColor: _progressionStep >= 2
                            ? ColorTokens.growthGreen
                            : ColorTokens.borderLight,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: SpacingTokens.md),
                AnimatedSwitcher(
                  duration: AnimationTokens.buttonPressDuration,
                  child: Text(
                    _classmateStatusText,
                    key: ValueKey(_progressionStep),
                    style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                          color: ColorTokens.textDark,
                          fontWeight: FontWeight.bold,
                        ),
                    textAlign: TextAlign.center,
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: SpacingTokens.xl),

          if (_progressionStep == 0)
            NSPrimaryButton(
              text: 'Execute Complete Superstar Hello!',
              icon: Icons.auto_awesome_rounded,
              color: ColorTokens.secondaryYellowDark,
              onPressed: _onExecuteGreeting,
            ),

          if (_progressionStep == 3) ...[
            Container(
              padding: const EdgeInsets.all(SpacingTokens.md),
              decoration: BoxDecoration(
                color: ColorTokens.secondaryYellowLight,
                borderRadius: SpacingTokens.cardRadius,
                border: Border.all(color: ColorTokens.secondaryYellow, width: 2),
              ),
              child: const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.stars_rounded, color: ColorTokens.secondaryYellowDark, size: 28),
                  SizedBox(width: 8),
                  Text(
                    'Hero Super Challenge Complete! (+25 XP)',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: ColorTokens.textDark,
                    ),
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
