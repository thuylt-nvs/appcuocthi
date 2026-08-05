import 'package:flutter/material.dart';
import '../../core/tokens/color_tokens.dart';
import '../../core/constants/app_typography.dart';

/// NovaStars Design System Theme Configurator
/// Theme consumes canonical ColorTokens directly.
abstract class AppTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      primaryColor: ColorTokens.primaryBlue,
      scaffoldBackgroundColor: ColorTokens.backgroundLight,
      colorScheme: const ColorScheme.light(
        primary: ColorTokens.primaryBlue,
        secondary: ColorTokens.secondaryYellow,
        surface: ColorTokens.surfaceWhite,
        error: ColorTokens.errorRed,
        onPrimary: ColorTokens.textOnPrimary,
        onSecondary: ColorTokens.textDark,
        onSurface: ColorTokens.textDark,
      ),

      // Typography Mapping
      textTheme: const TextTheme(
        displayLarge: AppTypography.heading1,
        displayMedium: AppTypography.heading2,
        titleLarge: AppTypography.heading3,
        bodyLarge: AppTypography.bodyLarge,
        bodyMedium: AppTypography.bodyMedium,
        labelLarge: AppTypography.buttonLabel,
        bodySmall: AppTypography.caption,
      ),

      // Card Theme
      cardTheme: CardTheme(
        color: ColorTokens.surfaceWhite,
        elevation: 2.0,
        shadowColor: ColorTokens.cardShadow,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16.0),
        ),
      ),

      // Primary Button Theme
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: ColorTokens.primaryBlue,
          foregroundColor: ColorTokens.textOnPrimary,
          elevation: 4.0,
          shadowColor: ColorTokens.buttonShadow,
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 14.0),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16.0),
          ),
          textStyle: AppTypography.buttonLabel,
        ),
      ),

      // App Bar Theme
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        iconTheme: IconThemeData(color: ColorTokens.textDark),
        titleTextStyle: AppTypography.heading2,
      ),

      // Dialog & Bottom Sheet Theme
      dialogTheme: DialogTheme(
        backgroundColor: ColorTokens.surfaceWhite,
        elevation: 6.0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20.0),
        ),
      ),
      bottomSheetTheme: const BottomSheetThemeData(
        backgroundColor: ColorTokens.surfaceWhite,
        elevation: 8.0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(24.0)),
        ),
      ),
    );
  }
}
