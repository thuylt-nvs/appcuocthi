import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/tokens/color_tokens.dart';
import '../../features/lesson/controllers/lesson_runner_controller.dart';

/// DevBuildIndicator — QA Debug Metadata & Learning Evidence Overlay
/// Renders QA metadata build banner and learning evidence flags in debug mode (kDebugMode).
class DevBuildIndicator extends ConsumerWidget {
  final Widget child;

  const DevBuildIndicator({
    super.key,
    required this.child,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    if (!kDebugMode) {
      return child;
    }

    final lessonState = ref.watch(lessonRunnerControllerProvider);

    return Stack(
      children: [
        child,
        Positioned(
          top: 0,
          right: 0,
          child: SafeArea(
            child: IgnorePointer(
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: Colors.black.withOpacity(0.75),
                  borderRadius: const BorderRadius.only(bottomLeft: Radius.circular(8)),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Text(
                      'DEV | Milestone 1 | Build #1',
                      style: TextStyle(
                        color: ColorTokens.secondaryYellow,
                        fontSize: 10,
                        fontWeight: FontWeight.bold,
                        fontFamily: 'monospace',
                      ),
                    ),
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        _EvidenceChip(label: 'E-01', active: lessonState.evidenceE01WaveGesture),
                        const SizedBox(width: 4),
                        _EvidenceChip(label: 'E-02', active: lessonState.evidenceE02SocialTiming),
                        const SizedBox(width: 4),
                        _EvidenceChip(label: 'E-03', active: lessonState.evidenceE03SmileConsequence),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class _EvidenceChip extends StatelessWidget {
  final String label;
  final bool active;

  const _EvidenceChip({
    required this.label,
    required this.active,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 1),
      decoration: BoxDecoration(
        color: active ? ColorTokens.growthGreen : Colors.grey,
        borderRadius: BorderRadius.circular(4),
      ),
      child: Text(
        '$label ${active ? "✓" : "..."}',
        style: const TextStyle(
          color: Colors.white,
          fontSize: 9,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}
