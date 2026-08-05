import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../controllers/lesson_runner_controller.dart';
import '../widgets/superstar_wave_widget.dart';
import '../widgets/gentle_eye_contact_widget.dart';
import '../widgets/hero_smile_match_widget.dart';

/// MiniGameStageView — Stage Container for Stages 3, 4, and 5 Learning Interactions
/// Renders SuperstarWaveWidget (Stage 3), GentleEyeContactWidget (Stage 4),
/// or HeroSmileMatchWidget (Stage 5) based on current stage index.
class MiniGameStageView extends ConsumerWidget {
  const MiniGameStageView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final lessonState = ref.watch(lessonRunnerControllerProvider);

    switch (lessonState.currentStageIndex) {
      case 3:
        return const SuperstarWaveWidget(key: ValueKey(3));
      case 4:
        return const GentleEyeContactWidget(key: ValueKey(4));
      case 5:
      default:
        return const HeroSmileMatchWidget(key: ValueKey(5));
    }
  }
}
