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

  group('LessonRunnerView Comprehensive Widget & State Tests', () {
    testWidgets('should render Stage 1 scene and exit pause modal', (tester) async {
      final container = ProviderContainer();
      await tester.pumpWidget(createWidgetUnderTest(container));
      await tester.pumpAndSettle();

      final context = tester.element(find.byType(MaterialApp));
      LessonRunner.startLessonZero(context);
      await tester.pumpAndSettle();

      // Verify Stage 1 Narrative Scene rendering
      expect(find.text(LessonZeroStoryData.stage1Title), findsOneWidget);
      expect(find.text(LessonZeroStoryData.stage1OptionA), findsOneWidget);

      // Verify Pause Mission Exit Modal Dialog
      final closeButton = find.byIcon(Icons.close_rounded);
      await tester.tap(closeButton);
      await tester.pumpAndSettle();

      expect(find.text(LessonZeroStoryData.exitModalTitle), findsOneWidget);
      expect(find.text(LessonZeroStoryData.exitModalBody), findsOneWidget);
      expect(find.text(LessonZeroStoryData.keepPlayingCta), findsOneWidget);

      // Dismiss dialog
      await tester.tap(find.text(LessonZeroStoryData.keepPlayingCta));
      await tester.pumpAndSettle();
    });

    testWidgets('should test Stage 2 Option A (warmDirect), silent scoring, and reflection seed', (tester) async {
      final container = ProviderContainer();
      await tester.pumpWidget(createWidgetUnderTest(container));
      await tester.pumpAndSettle();

      final context = tester.element(find.byType(MaterialApp));
      LessonRunner.startLessonZero(context);
      await tester.pumpAndSettle();

      // Tap Stage 1 Option A
      await tester.tap(find.text(LessonZeroStoryData.stage1OptionA));
      await tester.pumpAndSettle();

      // Verify Stage 2 Scene 2 rendering
      expect(find.text(LessonZeroStoryData.stage2Title), findsOneWidget);
      expect(find.text(LessonZeroStoryData.stage2OptionA), findsOneWidget);

      // Tap Option A (warmDirect)
      await tester.tap(find.text(LessonZeroStoryData.stage2OptionA));
      await tester.pumpAndSettle();

      // Verify Consequence & Reflection Seed rendering
      expect(find.text(LessonZeroStoryData.neighborReactionA), findsOneWidget);
      expect(find.text(LessonZeroStoryData.reflectionSeedText), findsOneWidget);

      // Verify Silent Scoring State
      final state = container.read(lessonRunnerControllerProvider);
      expect(state.selectedGreetingOption, equals(GreetingStyleChoice.warmDirect));
      expect(state.silentBaselineScore, equals(25)); // 10 (Stage 1) + 15 (Stage 2)
      expect(state.isStageComplete, isTrue);
    });

    testWidgets('should test Stage 2 Option B (gentleCalm) and consequence reaction', (tester) async {
      final container = ProviderContainer();
      await tester.pumpWidget(createWidgetUnderTest(container));
      await tester.pumpAndSettle();

      final context = tester.element(find.byType(MaterialApp));
      LessonRunner.startLessonZero(context);
      await tester.pumpAndSettle();

      // Tap Stage 1 Option B
      await tester.tap(find.text(LessonZeroStoryData.stage1OptionB));
      await tester.pumpAndSettle();

      // Tap Stage 2 Option B (gentleCalm)
      await tester.tap(find.text(LessonZeroStoryData.stage2OptionB));
      await tester.pumpAndSettle();

      // Verify Consequence Reaction B
      expect(find.text(LessonZeroStoryData.neighborReactionB), findsOneWidget);

      // Verify Silent Scoring State
      final state = container.read(lessonRunnerControllerProvider);
      expect(state.selectedGreetingOption, equals(GreetingStyleChoice.gentleCalm));
      expect(state.silentBaselineScore, equals(20)); // 8 (Stage 1) + 12 (Stage 2)
    });
  });
}
