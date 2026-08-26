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

/// IslandBloomStageView — Stage 9 Cinematic Island Bloom & Interactive Memory Epilogue View
/// Features cinematic camera pan, blooming flowers, glowing Hero Star tap, and Sao Nova & Su Memory Epilogue scene.
class IslandBloomStageView extends ConsumerStatefulWidget {
  const IslandBloomStageView({super.key});

  @override
  ConsumerState<IslandBloomStageView> createState() => _IslandBloomStageViewState();
}

class _IslandBloomStageViewState extends ConsumerState<IslandBloomStageView>
    with SingleTickerProviderStateMixin {
  late final AnimationController _bloomController;
  late final Animation<double> _scaleAnimation;
  bool _showEpilogue = false;
  bool _hasTappedStar = false;

  @override
  void initState() {
    super.initState();
    _bloomController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1400),
    );
    _scaleAnimation = Tween<double>(begin: 0.5, end: 1.0).animate(
      CurvedAnimation(parent: _bloomController, curve: Curves.elasticOut),
    );

    _bloomController.forward().then((_) {
      if (mounted) {
        setState(() => _showEpilogue = true);
      }
    });
  }

  @override
  void dispose() {
    _bloomController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(SpacingTokens.lg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            LessonZeroStoryData.stage9Title,
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: ColorTokens.primaryBlue,
                  fontWeight: FontWeight.bold,
                ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: SpacingTokens.md),

          // Island Bloom Visual Canvas
          ScaleTransition(
            scale: _scaleAnimation,
            child: Container(
              padding: const EdgeInsets.all(SpacingTokens.lg),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFFE8F5E9), Color(0xFFFFF9C4)],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                ),
                borderRadius: SpacingTokens.cardRadius,
                border: Border.all(color: ColorTokens.secondaryYellow, width: 3),
              ),
              child: Column(
                children: [
                  const Icon(Icons.park_rounded, color: ColorTokens.growthGreen, size: 72),
                  const SizedBox(height: SpacingTokens.sm),
                  Text(
                    LessonZeroStoryData.islandBloomText,
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

          // Interactive Memory Epilogue Scene (Sao Nova & Su on Courage Peak)
          if (_showEpilogue) ...[
            AnimatedOpacity(
              opacity: _showEpilogue ? 1.0 : 0.0,
              duration: AnimationTokens.buttonPressDuration,
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: const [
                      NSCharacterAvatarWidget(characterId: 'sao_nova', size: 64),
                      SizedBox(width: 16),
                      NSCharacterAvatarWidget(characterId: 'su', size: 64, emotion: 'happy'),
                    ],
                  ),
                  const SizedBox(height: SpacingTokens.md),

                  // Interactive Glowing Hero Star Moment
                  GestureDetector(
                    onTap: () => setState(() => _hasTappedStar = true),
                    child: Container(
                      padding: const EdgeInsets.all(SpacingTokens.md),
                      decoration: BoxDecoration(
                        color: ColorTokens.secondaryYellowLight,
                        borderRadius: SpacingTokens.cardRadius,
                        border: Border.all(color: ColorTokens.secondaryYellow, width: 3),
                      ),
                      child: Column(
                        children: [
                          Icon(
                            Icons.stars_rounded,
                            color: ColorTokens.secondaryYellowDark,
                            size: _hasTappedStar ? 56 : 44,
                          ),
                          const SizedBox(height: 4),
                          Text(
                            _hasTappedStar
                                ? 'Sao Nova whispers: "Your hero star will shine brighter every time you greet someone in real life!"'
                                : 'Tap the glowing Hero Star to light up Courage Island!',
                            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                                  color: ColorTokens.textDark,
                                  fontWeight: FontWeight.bold,
                                ),
                            textAlign: TextAlign.center,
                          ),
                        ],
                      ),
                    ),
                  ),

                  const SizedBox(height: SpacingTokens.sm),

                  const NSStoryBubble(
                    speakerName: 'Su',
                    text: LessonZeroStoryData.memoryEpilogueSuText,
                    backgroundColor: ColorTokens.surfaceWhite,
                    borderColor: ColorTokens.primaryBlue,
                  ),

                  const SizedBox(height: SpacingTokens.xl),

                  NSPrimaryButton(
                    text: 'View Milestone 1 Celebration!',
                    icon: Icons.stars_rounded,
                    color: ColorTokens.secondaryYellowDark,
                    onPressed: () {
                      ref.read(lessonRunnerControllerProvider.notifier).completeStage9IslandBloom();
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
