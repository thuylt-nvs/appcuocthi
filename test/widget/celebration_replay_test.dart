import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:novastars_mvp/app/routes/app_router.dart';
import 'package:novastars_mvp/app/theme/app_theme.dart';
import 'package:novastars_mvp/core/services/lesson_runner_stub.dart';
import 'package:novastars_mvp/features/lesson/controllers/lesson_runner_controller.dart';
import 'package:novastars_mvp/data/content/lesson_zero_story_data.dart';

void main() {
  Widget createWidgetUnderTest(ProviderContainer container) {
    return UncontrolledProviderScope(
      container: container,
      child: MaterialApp.router(
        theme: AppTheme.lightTheme,
        routerConfig: appRouter,
      ),
    );
  }

  group('Parent Confirmation, Island Bloom & 3-Star Celebration Widget Tests', () {
    testWidgets('should execute Stage 8 (Parent Card), Stage 9 (Island Bloom & Epilogue), and Stage 10 (3-Star Modal)', (tester) async {
      final container = ProviderContainer();
      await tester.pumpWidget(createWidgetUnderTest(container));
      await tester.pumpAndSettle();

      final context = tester.element(find.byType(MaterialApp));
      LessonRunner.startLessonZero(context);
      await tester.pumpAndSettle();

      // Fast-forward Stages 1 to 7 to reach Stage 8
      container.read(lessonRunnerControllerProvider.notifier).completeStage7Reflection('Because I helped a new friend!');
      await tester.pumpAndSettle();

      // Verify Stage 8 Parent Confirmation Card rendering
      expect(find.text(LessonZeroStoryData.stage8Title), findsOneWidget);
      expect(find.text(LessonZeroStoryData.parentConfirmCardTitle), findsOneWidget);

      final confirmButton = find.text(LessonZeroStoryData.confirmActionCta);
      await tester.tap(confirmButton);
      await tester.pumpAndSettle();

      // Verify Evidence E-06 Flag (ADR-020 Compliance)
      final state = container.read(lessonRunnerControllerProvider);
      expect(state.evidenceE06ParentVerification, isTrue);

      // Verify Stage 9 Island Bloom & Memory Epilogue Scene rendering
      expect(find.text(LessonZeroStoryData.stage9Title), findsOneWidget);
      await tester.pumpAndSettle(const Duration(milliseconds: 1600)); // Animation controller completes
      expect(find.text(LessonZeroStoryData.memoryEpilogueSaoNovaText), findsOneWidget);

      // Tap View Celebration CTA to reach Stage 10
      final viewCelebrationButton = find.text('View Milestone 1 Celebration!');
      await tester.tap(viewCelebrationButton);
      await tester.pumpAndSettle();

      // Verify Stage 10 NSCelebrationModal rendering
      expect(find.text(LessonZeroStoryData.stage10Title), findsOneWidget);
      expect(find.text(LessonZeroStoryData.starRating3of3), findsOneWidget);
      expect(find.text(LessonZeroStoryData.xpPayoutTotal), findsOneWidget);
      expect(find.text('Replay Mission (3-Star Mastery)'), findsOneWidget);

      // Verify Replay Reset Trigger
      await tester.tap(find.text('Replay Mission (3-Star Mastery)'));
      await tester.pumpAndSettle();

      final resetState = container.read(lessonRunnerControllerProvider);
      expect(resetState.currentStageIndex, equals(1));
    });
  });
}
