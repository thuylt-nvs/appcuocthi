import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:novastars_mvp/app/routes/app_router.dart';
import 'package:novastars_mvp/app/theme/app_theme.dart';

void main() {
  Widget createWidgetUnderTest() {
    return ProviderScope(
      child: MaterialApp.router(
        theme: AppTheme.lightTheme,
        routerConfig: appRouter,
      ),
    );
  }

  group('FTUE Onboarding View Widget Tests', () {
    testWidgets('should render Sao Nova welcome bubble and avatar picker cards', (tester) async {
      await tester.pumpWidget(createWidgetUnderTest());
      await tester.pumpAndSettle();

      // Verify Sao Nova greeting text
      expect(find.textContaining('Welcome to NovaStars!'), findsOneWidget);

      // Verify Avatar cards Su and Kem
      expect(find.text('Su'), findsOneWidget);
      expect(find.text('Kem'), findsOneWidget);

      // Verify Start Hero Adventure button
      expect(find.text('Start Hero Adventure'), findsOneWidget);
    });

    testWidgets('should allow entering hero name and navigating to Home base', (tester) async {
      await tester.pumpWidget(createWidgetUnderTest());
      await tester.pumpAndSettle();

      // Enter hero name
      final textField = find.byType(TextField);
      await tester.enterText(textField, 'Super Hero');
      await tester.pumpAndSettle();

      // Tap Start Hero Adventure button
      final startButton = find.text('Start Hero Adventure');
      await tester.tap(startButton);
      await tester.pumpAndSettle();

      // Verify navigation to Home screen displaying hero name
      expect(find.textContaining('Welcome, Super Hero!'), findsOneWidget);
      expect(find.text('Explore World Map'), findsOneWidget);
    });
  });
}
