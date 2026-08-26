import 'package:flutter/material.dart';

/// NovaStars Design System — Canonical Color Tokens (v1.0 Upgraded)
/// Primary Source of Truth for visual design tokens.
/// Themes and widgets consume these tokens.
abstract class ColorTokens {
  // Cosmic Brand & Adventure Visual Tokens
  static const Color primaryBlue = Color(0xFF3B82F6);       // Nebula Blue
  static const Color primaryBlueDark = Color(0xFF1D4ED8);   // Pressed Bevel State
  static const Color primaryBlueLight = Color(0xFF93C5FD);  // Subtile Card Accents

  static const Color secondaryYellow = Color(0xFFF59E0B);   // Starlight Amber
  static const Color secondaryYellowDark = Color(0xFFD97706); // Amber Bevel Shadow
  static const Color secondaryYellowLight = Color(0xFFFDE68A); // Star Glow Overlay

  static const Color growthGreen = Color(0xFF10B981);       // Hero Emerald Success
  static const Color growthGreenDark = Color(0xFF047857);   // Green Bevel Shadow
  static const Color growthGreenLight = Color(0xFFA7F3D0);  // Green Highlight

  static const Color warningOrange = Color(0xFFF97316);     // Sunset Streak Flame
  static const Color warningOrangeDark = Color(0xFFC2410C); // Streak Shadow

  static const Color errorRed = Color(0xFFEF4444);          // Safe Guidance Accent
  static const Color errorRedLight = Color(0xFFFEE2E2);

  static const Color supernovaPink = Color(0xFFEC4899);     // Kem Badge Pink
  static const Color galaxyPurple = Color(0xFF8B5CF6);      // Sao Nova Magic Purple
  static const Color cosmicIndigo = Color(0xFF1E1B4B);      // Cosmic Sky Midnight

  // Background & Surface Tokens
  static const Color backgroundLight = Color(0xFFEFF6FF);  // Warm Sky Off-White
  static const Color surfaceWhite = Color(0xFFFFFFFF);     // Card Background
  static const Color surfaceElevated = Color(0xFFF8FAFC);  // 3D Bevel Container

  // Text Tokens
  static const Color textDark = Color(0xFF1E293B);         // Primary Text
  static const Color textMedium = Color(0xFF64748B);       // Secondary Text
  static const Color textMuted = Color(0xFF94A3B8);        // Subtitle Text
  static const Color textOnPrimary = Color(0xFFFFFFFF);    // Button Text

  // UI Borders & 3D Shadow Bevels
  static const Color borderLight = Color(0xFFE2E8F0);
  static const Color bevelShadowBlue = Color(0xFF1D4ED8);
  static const Color bevelShadowAmber = Color(0xFFD97706);
  static const Color bevelShadowGreen = Color(0xFF047857);
  static const Color cardShadow = Color(0x1F0F172A);
  static const Color buttonShadow = Color(0x403B82F6);
}
