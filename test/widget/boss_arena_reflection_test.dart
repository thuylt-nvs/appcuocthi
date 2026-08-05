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

  group('Hero Super Challenge & Meaning-Making Reflection Widget Tests', () {
    testWidgets('should execute Stage 6 (Hero Super Challenge) and Stage 7 (Hero Journal Reflection)', (tester) async {
      final container = ProviderContainer();
      await tester.pumpWidget(createWidgetUnderTest(container));
      await tester.pumpAndSettle();

      final context = tester.element(find.byType(MaterialApp));
      LessonRunner.startLessonZero(context);
      await tester.pumpAndSettle();

      // Fast-forward Stages 1 to 5 to reach Stage 6
      container.read(lessonRunnerControllerProvider.notifier).completeStage5Smile();
      await tester.pumpAndSettle();

      // Verify Stage 6 Hero Super Challenge rendering
      expect(find.text(LessonZeroStoryData.stage6Title), findsOneWidget);
      final executeButton = find.text('Execute Complete Superstar Hello!');
      await tester.tap(executeButton);
      await tester.pumpAndSettle(const Duration(milliseconds: 1800));

      // Verify Stage 7 Hero Journal Reflection rendering
      expect(find.text(LessonZeroStoryData.stage7Title), findsOneWidget);
      expect(find.text(LessonZeroStoryData.stage7EmotionPrompt), findsOneWidget);

      // Select Emotion Choice
      await tester.tap(find.text(LessonZeroStoryData.emotionOption1));
      await tester.pumpAndSettle();

      // Select Meaning-Making "Why?" Step Choice
      expect(find.text(LessonZeroStoryData.stage7WhyPrompt), findsOneWidget);
      await tester.tap(find.text(LessonZeroStoryData.whyOption1));
      await tester.pumpAndSettle();

      // Verify Real-World Narrative Bridge Whisper
      expect(find.textContaining('You are a true Hero!'), findsOneWidget);

      // Verify Learning Evidence Flags E-04 & E-05 (ADR-010 Compliance)
      final state = container.read(lessonRunnerControllerProvider);
      expect(state.evidenceE04SkillTransfer, isTrue);
      expect(state.evidenceE05MeaningMaking, isTrue);
      expect(state.isStageComplete, isTrue);
    });
  });
}
