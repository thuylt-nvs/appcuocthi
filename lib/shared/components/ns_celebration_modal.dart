import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/tokens/color_tokens.dart';
import '../../core/tokens/spacing_tokens.dart';
import '../../data/content/lesson_zero_story_data.dart';
import '../../features/lesson/controllers/lesson_runner_controller.dart';
import 'ns_primary_button.dart';
import 'ns_character_avatar_widget.dart';

/// NSCelebrationModal — Stage 10 Milestone 1 3-Star Mastery Celebration Modal
/// Re-ordered Ending: Hero Emotional Pride -> Island Bloom -> Celebration -> Hero Journal -> Return to Map.
/// Features animated XP count-up (0 -> 120 XP) and cinematic badge unlock.
class NSCelebrationModal extends ConsumerStatefulWidget {
  final VoidCallback? onReplay;

  const NSCelebrationModal({
    super.key,
    this.onReplay,
  });

  @override
  ConsumerState<NSCelebrationModal> createState() => _NSCelebrationModalState();
}

class _NSCelebrationModalState extends ConsumerState<NSCelebrationModal>
    with SingleTickerProviderStateMixin {
  late final AnimationController _badgeController;
  late final Animation<double> _badgeScale;
  late final Animation<double> _badgeRotation;

  int _animatedXp = 0;
  Timer? _xpTimer;
  bool _showJournal = false;

  @override
  void initState() {
    super.initState();
    _badgeController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    );

    _badgeScale = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _badgeController, curve: Curves.elasticOut),
    );

    _badgeRotation = Tween<double>(begin: -0.2, end: 0.0).animate(
      CurvedAnimation(parent: _badgeController, curve: Curves.easeOut),
    );

    _badgeController.forward().then((_) {
      _startXpCountUp();
    });
  }

  void _startXpCountUp() {
    _xpTimer = Timer.periodic(const Duration(milliseconds: 150), (timer) {
      if (_animatedXp < 120) {
        setState(() => _animatedXp += 20);
      } else {
        timer.cancel();
      }
    });
  }

  @override
  void dispose() {
    _xpTimer?.cancel();
    _badgeController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final lessonState = ref.watch(lessonRunnerControllerProvider);

    return SingleChildScrollView(
      padding: const EdgeInsets.all(SpacingTokens.lg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: SpacingTokens.md),

          // 1. Hero Emotional Pride Title
          Text(
            LessonZeroStoryData.stage10Title,
            style: Theme.of(context).textTheme.displayMedium?.copyWith(
                  color: ColorTokens.textDark,
                  fontWeight: FontWeight.bold,
                ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: SpacingTokens.xs),
          Text(
            'You completed Superstar Hello Mission with Courage & Heart!',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: ColorTokens.textMedium,
                ),
            textAlign: TextAlign.center,
          ),

          const SizedBox(height: SpacingTokens.lg),

          // 2. World Change / Hero Avatar Centerpiece
          const Center(
            child: NSCharacterAvatarWidget(
              characterId: 'su',
              size: 110,
              emotion: 'happy',
              borderColor: ColorTokens.secondaryYellow,
            ),
          ),

          const SizedBox(height: SpacingTokens.lg),

          // 3. Cinematic Badge Unlock Moment
          ScaleTransition(
            scale: _badgeScale,
            child: RotationTransition(
              turns: _badgeRotation,
              child: Container(
                padding: const EdgeInsets.all(SpacingTokens.md),
                decoration: BoxDecoration(
                  color: ColorTokens.secondaryYellowLight,
                  borderRadius: SpacingTokens.cardRadius,
                  border: Border.all(color: ColorTokens.secondaryYellow, width: 3),
                  boxShadow: const [
                    BoxShadow(
                      color: Colors.black26,
                      blurRadius: 16,
                      offset: Offset(0, 6),
                    ),
                  ],
                ),
                child: Column(
                  children: [
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.star_rounded, color: ColorTokens.secondaryYellowDark, size: 40),
                        Icon(Icons.star_rounded, color: ColorTokens.secondaryYellowDark, size: 48),
                        Icon(Icons.star_rounded, color: ColorTokens.secondaryYellowDark, size: 40),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(
                      LessonZeroStoryData.starRating3of3,
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                            fontSize: 16,
                            color: ColorTokens.textDark,
                            fontWeight: FontWeight.bold,
                          ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      LessonZeroStoryData.badgeUnlockedText,
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                            color: ColorTokens.primaryBlueDark,
                            fontWeight: FontWeight.bold,
                          ),
                    ),
                  ],
                ),
              ),
            ),
          ),

          const SizedBox(height: SpacingTokens.md),

          // 4. Animated Count-up XP Reward (0 -> 120 XP)
          Container(
            padding: const EdgeInsets.all(SpacingTokens.sm),
            decoration: BoxDecoration(
              color: ColorTokens.surfaceWhite,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: ColorTokens.borderLight),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.bolt_rounded, color: ColorTokens.warningOrange, size: 24),
                const SizedBox(width: 8),
                Text(
                  '+$_animatedXp XP Earned (+100 Base + 20 Streak)',
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                    color: ColorTokens.textDark,
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: SpacingTokens.lg),

          // 5. Hero Journal Summary (Appears after celebration)
          if (!_showJournal)
            NSPrimaryButton(
              text: 'View Hero Journal Memory',
              icon: Icons.menu_book_rounded,
              color: ColorTokens.primaryBlue,
              onPressed: () => setState(() => _showJournal = true),
            ),

          if (_showJournal) ...[
            Container(
              padding: const EdgeInsets.all(SpacingTokens.md),
              decoration: BoxDecoration(
                color: ColorTokens.surfaceWhite,
                borderRadius: SpacingTokens.cardRadius,
                border: Border.all(color: ColorTokens.primaryBlue, width: 2),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Hero Journal Entry Saved:',
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                          fontSize: 14,
                          color: ColorTokens.primaryBlue,
                          fontWeight: FontWeight.bold,
                        ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '• Su felt: "${lessonState.selectedReflectionEmotion ?? "Brave"}"',
                    style: const TextStyle(fontSize: 13, color: ColorTokens.textDark),
                  ),
                  Text(
                    '• Reason: "${lessonState.selectedReflectionWhy ?? "Helped a new friend"}"',
                    style: const TextStyle(fontSize: 13, color: ColorTokens.textDark),
                  ),
                  Text(
                    '• Parent Note: "${lessonState.selectedParentPraise ?? "So proud of your smile"}"',
                    style: const TextStyle(fontSize: 13, color: ColorTokens.textDark),
                  ),
                ],
              ),
            ),

            const SizedBox(height: SpacingTokens.xl),

            NSPrimaryButton(
              text: 'Replay Mission (3-Star Mastery)',
              icon: Icons.replay_rounded,
              color: ColorTokens.primaryBlue,
              onPressed: () {
                if (widget.onReplay != null) {
                  widget.onReplay!();
                } else {
                  context.go('/lesson-runner');
                }
              },
            ),

            const SizedBox(height: SpacingTokens.sm),

            NSPrimaryButton(
              text: 'Return to World Map (Node 2 Unlocked)',
              icon: Icons.map_rounded,
              color: ColorTokens.growthGreen,
              onPressed: () {
                ref.read(lessonRunnerControllerProvider.notifier).finalizeLessonZeroCompletion();
                context.go('/map');
              },
            ),
          ],
        ],
      ),
    );
  }
}
