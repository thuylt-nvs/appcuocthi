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

/// HeroSmileMatchWidget — Stage 5 Warm Superstar Smile Selection & Interactive Reflection Widget
/// Distinct positive consequences per smile option + Celebration sequence + Interactive Reflection choice.
class HeroSmileMatchWidget extends ConsumerStatefulWidget {
  const HeroSmileMatchWidget({super.key});

  @override
  ConsumerState<HeroSmileMatchWidget> createState() => _HeroSmileMatchWidgetState();
}

class _HeroSmileMatchWidgetState extends ConsumerState<HeroSmileMatchWidget> {
  int? _selectedSmileIndex;
  int _celebrationStep = 0; // 0: Select, 1: Spoken Response, 2: Su Confidence, 3: Badge, 4: Interactive Reflection
  int? _selectedReflectionIndex;

  String get _neighborResponseText {
    switch (_selectedSmileIndex) {
      case 2:
        return LessonZeroStoryData.smileOption2NeighborResponse;
      case 3:
        return LessonZeroStoryData.smileOption3NeighborResponse;
      case 1:
      default:
        return LessonZeroStoryData.smileOption1NeighborResponse;
    }
  }

  void _onSelectSmileCard(int index) {
    if (_celebrationStep > 0) return;
    setState(() {
      _selectedSmileIndex = index;
      _celebrationStep = 1;
    });

    // Sequence Step 2: Su Confidence Boost
    Future.delayed(AnimationTokens.buttonPressDuration * 3, () {
      if (mounted) setState(() => _celebrationStep = 2);
    });

    // Sequence Step 3: Badge Presentation & Interactive Reflection
    Future.delayed(AnimationTokens.confettiBlastDuration, () {
      if (mounted) {
        setState(() => _celebrationStep = 3);
        ref.read(lessonRunnerControllerProvider.notifier).completeStage5Smile();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(SpacingTokens.lg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            LessonZeroStoryData.stage5Title,
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: ColorTokens.primaryBlue,
                  fontWeight: FontWeight.bold,
                ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: SpacingTokens.md),

          const NSStoryBubble(
            speakerName: 'Sao Nova Guidance',
            text: LessonZeroStoryData.stage5DemoSpeech,
            backgroundColor: ColorTokens.secondaryYellowLight,
            borderColor: ColorTokens.secondaryYellow,
            avatarGraphic: NSCharacterAvatarWidget(
              characterId: 'sao_nova',
              size: 44,
            ),
          ),

          const SizedBox(height: SpacingTokens.lg),

          // Centerpiece Character Graphic
          Center(
            child: NSCharacterAvatarWidget(
              characterId: 'su',
              size: 110,
              emotion: 'happy',
              borderColor: _celebrationStep >= 2 ? ColorTokens.secondaryYellow : ColorTokens.primaryBlue,
            ),
          ),

          const SizedBox(height: SpacingTokens.lg),

          // Distinct Smile Selection Cards
          if (_celebrationStep == 0) ...[
            Text(
              'Select Su\'s Superstar Smile:',
              style: Theme.of(context).textTheme.displayLarge?.copyWith(
                    fontSize: 18,
                    color: ColorTokens.textDark,
                  ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: SpacingTokens.md),

            NSPrimaryButton(
              text: LessonZeroStoryData.smileOption1Title,
              icon: Icons.sentiment_very_satisfied_rounded,
              color: ColorTokens.secondaryYellowDark,
              onPressed: () => _onSelectSmileCard(1),
            ),
            const SizedBox(height: SpacingTokens.sm),
            NSPrimaryButton(
              text: LessonZeroStoryData.smileOption2Title,
              icon: Icons.sentiment_satisfied_alt_rounded,
              color: ColorTokens.growthGreen,
              onPressed: () => _onSelectSmileCard(2),
            ),
            const SizedBox(height: SpacingTokens.sm),
            NSPrimaryButton(
              text: LessonZeroStoryData.smileOption3Title,
              icon: Icons.auto_awesome_rounded,
              color: ColorTokens.primaryBlue,
              onPressed: () => _onSelectSmileCard(3),
            ),
          ],

          // Distinct Neighbor Response & Celebration Sequence
          if (_celebrationStep >= 1) ...[
            // 1. Spoken Neighbor Response (Varies per smile option)
            AnimatedOpacity(
              opacity: _celebrationStep >= 1 ? 1.0 : 0.0,
              duration: AnimationTokens.buttonPressDuration,
              child: Container(
                padding: const EdgeInsets.all(SpacingTokens.md),
                decoration: BoxDecoration(
                  color: ColorTokens.growthGreenLight,
                  borderRadius: SpacingTokens.cardRadius,
                  border: Border.all(color: ColorTokens.growthGreen, width: 2),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.face_retouching_natural_rounded,
                        color: ColorTokens.growthGreenDark, size: 36),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        _neighborResponseText,
                        style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                              color: ColorTokens.textDark,
                              fontWeight: FontWeight.bold,
                            ),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: SpacingTokens.md),

            // 2. Su Confidence Boost
            if (_celebrationStep >= 2)
              AnimatedOpacity(
                opacity: _celebrationStep >= 2 ? 1.0 : 0.0,
                duration: AnimationTokens.buttonPressDuration,
                child: Text(
                  LessonZeroStoryData.stage5SuConfidenceText,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: ColorTokens.primaryBlueDark,
                        fontWeight: FontWeight.bold,
                      ),
                  textAlign: TextAlign.center,
                ),
              ),

            const SizedBox(height: SpacingTokens.md),

            // 3. Badge Presentation
            if (_celebrationStep >= 3) ...[
              AnimatedScale(
                scale: _celebrationStep >= 3 ? 1.0 : 0.0,
                duration: AnimationTokens.buttonPressDuration,
                curve: Curves.elasticOut,
                child: Container(
                  padding: const EdgeInsets.all(SpacingTokens.md),
                  decoration: BoxDecoration(
                    color: ColorTokens.secondaryYellowLight,
                    borderRadius: SpacingTokens.cardRadius,
                    border: Border.all(color: ColorTokens.secondaryYellow, width: 3),
                  ),
                  child: Column(
                    children: [
                      const Icon(Icons.stars_rounded, color: ColorTokens.secondaryYellowDark, size: 56),
                      const SizedBox(height: 4),
                      Text(
                        LessonZeroStoryData.stage5BadgeAwardText,
                        style: Theme.of(context).textTheme.titleLarge?.copyWith(
                              fontSize: 16,
                              color: ColorTokens.textDark,
                              fontWeight: FontWeight.bold,
                            ),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                ),
              ),

              const SizedBox(height: SpacingTokens.lg),

              // Interactive Reflection Seed Choice (Converted from static text)
              Text(
                LessonZeroStoryData.reflectionPrompt,
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontSize: 16,
                      color: ColorTokens.primaryBlue,
                      fontWeight: FontWeight.bold,
                    ),
                textAlign: TextAlign.center,
              ),

              const SizedBox(height: SpacingTokens.sm),

              if (_selectedReflectionIndex == null) ...[
                ChoiceChip(
                  label: Text(LessonZeroStoryData.reflectionChoice1),
                  selected: false,
                  onSelected: (_) => setState(() => _selectedReflectionIndex = 1),
                ),
                const SizedBox(height: 4),
                ChoiceChip(
                  label: Text(LessonZeroStoryData.reflectionChoice2),
                  selected: false,
                  onSelected: (_) => setState(() => _selectedReflectionIndex = 2),
                ),
                const SizedBox(height: 4),
                ChoiceChip(
                  label: Text(LessonZeroStoryData.reflectionChoice3),
                  selected: false,
                  onSelected: (_) => setState(() => _selectedReflectionIndex = 3),
                ),
              ],

              if (_selectedReflectionIndex != null) ...[
                Container(
                  padding: const EdgeInsets.all(SpacingTokens.md),
                  decoration: BoxDecoration(
                    color: ColorTokens.surfaceWhite,
                    borderRadius: SpacingTokens.cardRadius,
                    border: Border.all(color: ColorTokens.primaryBlue, width: 2),
                  ),
                  child: Text(
                    'Sao Nova smiles: "That is beautiful! Every small choice builds who you become!"',
                    style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                          color: ColorTokens.primaryBlueDark,
                          fontWeight: FontWeight.bold,
                        ),
                    textAlign: TextAlign.center,
                  ),
                ),

                const SizedBox(height: SpacingTokens.xl),

                NSPrimaryButton(
                  text: 'Complete The Greeting Journey',
                  icon: Icons.check_circle_rounded,
                  color: ColorTokens.growthGreen,
                  onPressed: () {
                    context.go('/map');
                  },
                ),
              ],
            ],
          ],
        ],
      ),
    );
  }
}
