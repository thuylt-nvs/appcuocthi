import 'package:flutter/material.dart';

/// Design Token Foundation — Spacing & Radius Tokens
/// Standardized layout metrics ensuring visual consistency.
abstract class SpacingTokens {
  static const double xs = 4.0;
  static const double sm = 8.0;
  static const double md = 16.0;
  static const double lg = 24.0;
  static const double xl = 32.0;

  static const double radiusSm = 8.0;
  static const double radiusMd = 16.0;
  static const double radiusLg = 20.0;
  static const double radiusXl = 24.0;

  static final BorderRadius cardRadius = BorderRadius.circular(radiusMd);
  static final BorderRadius buttonRadius = BorderRadius.circular(radiusMd);
  static final BorderRadius dialogRadius = BorderRadius.circular(radiusLg);
  static final BorderRadius sheetRadius = BorderRadius.vertical(top: Radius.circular(radiusXl));
}
