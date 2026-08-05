import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

/// LessonRunner Entry Point
/// Launches interactive 10-stage Lesson Runner flow.
abstract class LessonRunner {
  /// Launches canonical Lesson Zero (Superstar Hello Mission)
  static void startLessonZero(BuildContext context) {
    context.go('/lesson-runner');
  }
}
