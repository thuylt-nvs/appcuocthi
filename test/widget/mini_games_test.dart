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

  group('Continuous Greeting Journey Learning Interaction Widget & Evidence Tests', () {
    testWidgets('should execute Stage 3 (Wave Gesture), Stage 4 (Eye Contact Timing), and Stage 5 (Smile & Reflection Choice)', (tester) async {
      final container = ProviderContainer();
      await tester.pumpWidget(createWidgetUnderTest(container));
      await tester.pumpAndSettle();

      final context = tester.element(find.byType(MaterialApp));
      LessonRunner.startLessonZero(context);
      await tester.pumpAndSettle();

      // Stage 1 -> Stage 2
      await tester.tap(find.text(LessonZeroStoryData.stage1OptionA));
      await tester.pumpAndSettle();

      // Stage 2 -> Stage 3
      await tester.tap(find.text(LessonZeroStoryData.stage2OptionA));
      await tester.pumpAndSettle();

      // Stage 3 Superstar Wave Pattern Gesture
      expect(find.text(LessonZeroStoryData.stage3Title), findsOneWidget);
      final gestureArea = find.byType(GestureDetector).last;
      await tester.drag(gestureArea, const Offset(80, 0));
      await tester.drag(gestureArea, const Offset(-80, 0));
      await tester.pumpAndSettle(const Duration(milliseconds: 1600));

      // Stage 4 Gentle Eye Contact Social Timing
      expect(find.text(LessonZeroStoryData.stage4Title), findsOneWidget);
      await tester.pumpAndSettle(const Duration(milliseconds: 1400)); // Neighbor turns & looks over
      final eyeContactButton = find.text('Neighbor is looking over! Make Eye Contact!');
      await tester.tap(eyeContactButton);
      await tester.pumpAndSettle(const Duration(milliseconds: 1400));

      // Stage 5 Warm Superstar Smile
      expect(find.text(LessonZeroStoryData.stage5Title), findsOneWidget);
      final smileButton = find.text(LessonZeroStoryData.smileOption1Title);
      await tester.tap(smileButton);
      await tester.pumpAndSettle(const Duration(milliseconds: 2800));

      // Verify Spoken Neighbor Response & Badge Presentation
      expect(find.text(LessonZeroStoryData.smileOption1NeighborResponse), findsOneWidget);
      expect(find.text(LessonZeroStoryData.stage5BadgeAwardText), findsOneWidget);

      // Select Interactive Reflection Choice
      expect(find.text(LessonZeroStoryData.reflectionPrompt), findsOneWidget);
      await tester.tap(find.text(LessonZeroStoryData.reflectionChoice1));
      await tester.pumpAndSettle();

      expect(find.textContaining('Every small choice builds who you become!'), findsOneWidget);

      // Verify Learning Evidence Flags (ADR-010 Compliance)
      final state = container.read(lessonRunnerControllerProvider);
      expect(state.evidenceE01WaveGesture, isTrue);
      expect(state.evidenceE02SocialTiming, isTrue);
      expect(state.evidenceE03SmileConsequence, isTrue);
      expect(state.isStageComplete, isTrue);
    });
  });
}
