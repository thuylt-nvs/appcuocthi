import 'package:flutter/material.dart';
import 'app_colors.dart';

/// NovaStars Design System — Typography
/// Child-friendly, highly readable rounded typography rules using Nunito font family.
/// Optimized for children aged 6–11 with soft rounded terminals and low cognitive load.
abstract class AppTypography {
  /// Primary font family choice for NovaStars.
  /// Rationale: Nunito offers soft, rounded letterforms that feel warm and approachable
  /// for young readers (ages 6–11), reducing reading anxiety while maintaining excellent legibility.
  static const String fontFamily = 'Nunito';

  /// Title 1 / Hero Heading (World Map, Celebration Popups)
  static const TextStyle heading1 = TextStyle(
    fontFamily: fontFamily,
    fontSize: 28.0,
    fontWeight: FontWeight.w800,
    color: AppColors.textDark,
    height: 1.2,
    letterSpacing: -0.5,
  );

  /// Title 2 / Card Titles (Competency Card, Boss Title)
  static const TextStyle heading2 = TextStyle(
    fontFamily: fontFamily,
    fontSize: 22.0,
    fontWeight: FontWeight.w700,
    color: AppColors.textDark,
    height: 1.3,
  );

  /// Subheading / Stage Section Headers
  static const TextStyle heading3 = TextStyle(
    fontFamily: fontFamily,
    fontSize: 18.0,
    fontWeight: FontWeight.w600,
    color: AppColors.textDark,
    height: 1.3,
  );

  /// Body Primary (Story Speech Bubbles, Challenge Instructions)
  static const TextStyle bodyLarge = TextStyle(
    fontFamily: fontFamily,
    fontSize: 16.0,
    fontWeight: FontWeight.w500,
    color: AppColors.textDark,
    height: 1.4,
  );

  /// Body Secondary (Dialogue Subtitles, Hints)
  static const TextStyle bodyMedium = TextStyle(
    fontFamily: fontFamily,
    fontSize: 14.0,
    fontWeight: FontWeight.w400,
    color: AppColors.textMedium,
    height: 1.4,
  );

  /// Button Labels (Tactile Touch Buttons)
  static const TextStyle buttonLabel = TextStyle(
    fontFamily: fontFamily,
    fontSize: 18.0,
    fontWeight: FontWeight.w700,
    color: AppColors.textOnPrimary,
    letterSpacing: 0.5,
  );

  /// Micro Copy / Badges / Counter Labels
  static const TextStyle caption = TextStyle(
    fontFamily: fontFamily,
    fontSize: 12.0,
    fontWeight: FontWeight.w600,
    color: AppColors.textMuted,
    letterSpacing: 0.2,
  );
}
