import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/tokens/color_tokens.dart';
import '../../../core/tokens/spacing_tokens.dart';
import '../../../core/tokens/animation_tokens.dart';
import '../../../data/content/lesson_zero_story_data.dart';
import '../../../shared/components/ns_story_bubble.dart';
import '../../../shared/components/ns_character_avatar_widget.dart';
import '../controllers/lesson_runner_controller.dart';

/// SuperstarWaveWidget — Stage 3 Wave Modeling Gesture Pattern Recognizer Widget
/// Detects back-and-forth (left-right & right-left) waving motion pattern.
class SuperstarWaveWidget extends ConsumerStatefulWidget {
  const SuperstarWaveWidget({super.key});

  @override
  ConsumerState<SuperstarWaveWidget> createState() => _SuperstarWaveWidgetState();
}

class _SuperstarWaveWidgetState extends ConsumerState<SuperstarWaveWidget>
    with SingleTickerProviderStateMixin {
  late final AnimationController _waveController;
  late final Animation<double> _waveAnimation;

  bool _swipedRight = false;
  bool _swipedLeft = false;
  bool _hasWaved = false;

  @override
  void initState() {
    super.initState();
    _waveController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 700),
    );
    _waveAnimation = Tween<double>(begin: -0.20, end: 0.20).animate(
      CurvedAnimation(parent: _waveController, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _waveController.dispose();
    super.dispose();
  }

  void _onPanUpdate(DragUpdateDetails details) {
    if (_hasWaved) return;

    if (details.delta.dx > 10.0) {
      _swipedRight = true;
    } else if (details.delta.dx < -10.0 && _swipedRight) {
      _swipedLeft = true;
    }

    // Pattern matched: back-and-forth wave gesture
    if (_swipedRight && _swipedLeft) {
      setState(() => _hasWaved = true);
      _waveController.repeat(reverse: true);

      Future.delayed(AnimationTokens.confettiBlastDuration ~/ 2, () {
        if (mounted) {
          _waveController.stop();
          ref.read(lessonRunnerControllerProvider.notifier).completeStage3Wave();
        }
      });
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
            LessonZeroStoryData.stage3Title,
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: ColorTokens.primaryBlue,
                  fontWeight: FontWeight.bold,
                ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: SpacingTokens.md),

          const NSStoryBubble(
            speakerName: 'Sao Nova Modeling',
            text: LessonZeroStoryData.stage3DemoSpeech,
            backgroundColor: ColorTokens.secondaryYellowLight,
            borderColor: ColorTokens.secondaryYellow,
            avatarGraphic: NSCharacterAvatarWidget(
              characterId: 'sao_nova',
              size: 44,
            ),
          ),

          const SizedBox(height: SpacingTokens.lg),

          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: ColorTokens.growthGreenLight,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: ColorTokens.growthGreen),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.face_retouching_natural_rounded,
                        color: ColorTokens.growthGreenDark, size: 24),
                    const SizedBox(width: 6),
                    Text(
                      _hasWaved ? 'Neighbor notices Su waving!' : 'Neighbor is standing near the gate...',
                      style: const TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                        color: ColorTokens.textDark,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),

          const SizedBox(height: SpacingTokens.lg),

          // Interactive Gesture Area for Pattern Waving
          GestureDetector(
            onPanUpdate: _onPanUpdate,
            child: AnimatedContainer(
              duration: AnimationTokens.buttonPressDuration,
              padding: const EdgeInsets.all(SpacingTokens.lg),
              decoration: BoxDecoration(
                color: _hasWaved ? ColorTokens.growthGreenLight : ColorTokens.surfaceWhite,
                borderRadius: SpacingTokens.cardRadius,
                border: Border.all(
                  color: _hasWaved ? ColorTokens.growthGreen : ColorTokens.primaryBlue,
                  width: 3,
                ),
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
                  RotationTransition(
                    turns: _waveAnimation,
                    child: const NSCharacterAvatarWidget(
                      characterId: 'su',
                      size: 110,
                      emotion: 'happy',
                      borderColor: ColorTokens.secondaryYellow,
                    ),
                  ),
                  const SizedBox(height: SpacingTokens.md),
                  Icon(
                    Icons.swipe_rounded,
                    size: 32,
                    color: _hasWaved ? ColorTokens.growthGreen : ColorTokens.primaryBlue,
                  ),
                  const SizedBox(height: 4),
                  Text(
                    _hasWaved
                        ? LessonZeroStoryData.stage3PerformText
                        : 'Wave back and forth across Su (left & right) to teach her to wave!',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: _hasWaved ? ColorTokens.growthGreenDark : ColorTokens.primaryBlueDark,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
