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

enum NeighborBehaviorState {
  lookingAway,
  turning,
  lookingOver,
}

/// GentleEyeContactWidget — Stage 4 Gentle Eye Contact Social Timing Widget
/// Neighbor Behavior Loop: lookingAway -> turning -> lookingOver. Player must time tap during turning/lookingOver.
class GentleEyeContactWidget extends ConsumerStatefulWidget {
  const GentleEyeContactWidget({super.key});

  @override
  ConsumerState<GentleEyeContactWidget> createState() => _GentleEyeContactWidgetState();
}

class _GentleEyeContactWidgetState extends ConsumerState<GentleEyeContactWidget>
    with SingleTickerProviderStateMixin {
  late final AnimationController _pulseController;
  late final Animation<double> _pulseAnimation;
  NeighborBehaviorState _neighborState = NeighborBehaviorState.lookingAway;
  bool _hasMadeContact = false;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 900),
    )..repeat(reverse: true);

    _pulseAnimation = Tween<double>(begin: 1.0, end: 1.15).animate(
      CurvedAnimation(parent: _pulseController, curve: Curves.easeInOut),
    );

    // Neighbor behavior loop state machine
    Future.delayed(const Duration(milliseconds: 600), () {
      if (mounted) setState(() => _neighborState = NeighborBehaviorState.turning);
    });

    Future.delayed(const Duration(milliseconds: 1200), () {
      if (mounted) setState(() => _neighborState = NeighborBehaviorState.lookingOver);
    });
  }

  @override
  void dispose() {
    _pulseController.dispose();
    super.dispose();
  }

  void _onMakeEyeContact() {
    if (_neighborState == NeighborBehaviorState.lookingAway || _hasMadeContact) return;
    setState(() => _hasMadeContact = true);

    Future.delayed(AnimationTokens.confettiBlastDuration ~/ 2, () {
      if (mounted) {
        ref.read(lessonRunnerControllerProvider.notifier).completeStage4EyeContact();
      }
    });
  }

  String get _neighborStatusLabel {
    switch (_neighborState) {
      case NeighborBehaviorState.lookingAway:
        return 'Neighbor is looking away... wait!';
      case NeighborBehaviorState.turning:
        return 'Neighbor is turning around! Tap NOW!';
      case NeighborBehaviorState.lookingOver:
      default:
        return 'Neighbor is looking over! Make Eye Contact!';
    }
  }

  @override
  Widget build(BuildContext context) {
    final bool canTap = _neighborState != NeighborBehaviorState.lookingAway;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(SpacingTokens.lg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            LessonZeroStoryData.stage4Title,
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: ColorTokens.primaryBlue,
                  fontWeight: FontWeight.bold,
                ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: SpacingTokens.md),

          const NSStoryBubble(
            speakerName: 'Sao Nova Guidance',
            text: LessonZeroStoryData.stage4DemoSpeech,
            backgroundColor: ColorTokens.secondaryYellowLight,
            borderColor: ColorTokens.secondaryYellow,
            avatarGraphic: NSCharacterAvatarWidget(
              characterId: 'sao_nova',
              size: 44,
            ),
          ),

          const SizedBox(height: SpacingTokens.xl),

          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              const NSCharacterAvatarWidget(
                characterId: 'su',
                size: 90,
                emotion: 'happy',
              ),
              Icon(
                _hasMadeContact ? Icons.auto_awesome_rounded : Icons.remove_red_eye_rounded,
                color: _hasMadeContact ? ColorTokens.secondaryYellow : ColorTokens.primaryBlue,
                size: 36,
              ),
              ScaleTransition(
                scale: canTap ? _pulseAnimation : const AlwaysStoppedAnimation(1.0),
                child: Container(
                  padding: const EdgeInsets.all(4),
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: canTap ? ColorTokens.growthGreen : ColorTokens.borderLight,
                      width: 3.5,
                    ),
                    boxShadow: canTap
                        ? [
                            BoxShadow(
                              color: ColorTokens.growthGreen.withOpacity(0.5),
                              blurRadius: 14,
                              spreadRadius: 2,
                            ),
                          ]
                        : [],
                  ),
                  child: const Icon(
                    Icons.face_retouching_natural_rounded,
                    size: 64,
                    color: ColorTokens.growthGreenDark,
                  ),
                ),
              ),
            ],
          ),

          const SizedBox(height: SpacingTokens.lg),

          if (_hasMadeContact)
            Container(
              padding: const EdgeInsets.all(SpacingTokens.md),
              decoration: BoxDecoration(
                color: ColorTokens.growthGreenLight,
                borderRadius: SpacingTokens.cardRadius,
                border: Border.all(color: ColorTokens.growthGreen),
              ),
              child: Text(
                LessonZeroStoryData.stage4SuccessText,
                style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                      color: ColorTokens.textDark,
                      fontWeight: FontWeight.bold,
                    ),
                textAlign: TextAlign.center,
              ),
            ),

          const SizedBox(height: SpacingTokens.xl),

          NSPrimaryButton(
            text: _hasMadeContact ? 'Gentle Eye Contact Made!' : _neighborStatusLabel,
            icon: Icons.remove_red_eye_rounded,
            color: canTap ? ColorTokens.growthGreen : ColorTokens.textMuted,
            onPressed: (canTap && !_hasMadeContact) ? _onMakeEyeContact : null,
          ),
        ],
      ),
    );
  }
}
