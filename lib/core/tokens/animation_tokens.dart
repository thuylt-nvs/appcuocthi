import 'package:flutter/animation.dart';

/// Design Token Foundation — Animation & Spring Tokens (v1.0 Upgraded)
/// Standardized duration and custom cubic-bezier curves for toy-like tactile feedback.
abstract class AnimationTokens {
  static const Duration buttonPressDuration = Duration(milliseconds: 120);
  static const Duration pageTransitionDuration = Duration(milliseconds: 280);
  static const Duration confettiBlastDuration = Duration(milliseconds: 2800);
  static const Duration islandBloomDuration = Duration(milliseconds: 1400);

  // Custom Spring & Elastic Curves inspired by Toca Life World UX
  static const Curve defaultCurve = Curves.easeInOutCubic;
  static const Curve bounceCurve = Cubic(0.34, 1.56, 0.64, 1);     // Spring Elastic
  static const Curve cushionCurve = Cubic(0.25, 1.0, 0.5, 1);      // Soft Cushion
}
