import 'package:flutter/material.dart';
import '../tokens/color_tokens.dart';

/// Legacy AppColors Facade
/// Aliases canonical ColorTokens to maintain backward compatibility.
abstract class AppColors {
  static const Color primaryBlue = ColorTokens.primaryBlue;
  static const Color primaryBlueDark = ColorTokens.primaryBlueDark;
  static const Color primaryBlueLight = ColorTokens.primaryBlueLight;

  static const Color secondaryYellow = ColorTokens.secondaryYellow;
  static const Color secondaryYellowDark = ColorTokens.secondaryYellowDark;
  static const Color secondaryYellowLight = ColorTokens.secondaryYellowLight;

  static const Color growthGreen = ColorTokens.growthGreen;
  static const Color growthGreenDark = ColorTokens.growthGreenDark;
  static const Color growthGreenLight = ColorTokens.growthGreenLight;

  static const Color warningOrange = ColorTokens.warningOrange;
  static const Color warningOrangeDark = ColorTokens.warningOrangeDark;

  static const Color errorRed = ColorTokens.errorRed;
  static const Color errorRedLight = ColorTokens.errorRedLight;

  static const Color backgroundLight = ColorTokens.backgroundLight;
  static const Color surfaceWhite = ColorTokens.surfaceWhite;
  static const Color surfaceElevated = ColorTokens.surfaceElevated;

  static const Color textDark = ColorTokens.textDark;
  static const Color textMedium = ColorTokens.textMedium;
  static const Color textMuted = ColorTokens.textMuted;
  static const Color textOnPrimary = ColorTokens.textOnPrimary;

  static const Color borderLight = ColorTokens.borderLight;
  static const Color cardShadow = ColorTokens.cardShadow;
  static const Color buttonShadow = ColorTokens.buttonShadow;
}
