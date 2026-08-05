import 'package:flutter/material.dart';
import '../../core/constants/asset_paths.dart';
import '../../core/tokens/color_tokens.dart';

/// NSCharacterAvatarWidget — 3-Tier Artist-Ready Character Avatar Component
/// 3-Tier Fallback Strategy:
/// 1. Primary: Tries production character asset (PNG/SVG).
/// 2. Secondary: Tries structured placeholder asset image.
/// 3. Fallback: Minimal clean icon graphic rendering.
class NSCharacterAvatarWidget extends StatelessWidget {
  final String characterId; // "su", "kem", "sao_nova"
  final double size;
  final String emotion; // "happy", "thinking", "excited"
  final Color? borderColor;
  final bool showBadge;

  const NSCharacterAvatarWidget({
    super.key,
    required this.characterId,
    this.size = 80.0,
    this.emotion = 'happy',
    this.borderColor,
    this.showBadge = true,
  });

  String get _assetPath {
    switch (characterId.toLowerCase()) {
      case 'kem':
        return CharacterAssets.kemHappy;
      case 'sao_nova':
        return CharacterAssets.saoNovaWave;
      case 'su':
      default:
        return emotion == 'thinking'
            ? CharacterAssets.suThinking
            : CharacterAssets.suHappy;
    }
  }

  Color get _defaultBadgeColor {
    switch (characterId.toLowerCase()) {
      case 'kem':
        return ColorTokens.growthGreen;
      case 'sao_nova':
        return ColorTokens.secondaryYellow;
      case 'su':
      default:
        return ColorTokens.primaryBlue;
    }
  }

  @override
  Widget build(BuildContext context) {
    final Color activeBorder = borderColor ?? _defaultBadgeColor;

    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: activeBorder.withOpacity(0.15),
        shape: BoxShape.circle,
        border: Border.all(color: activeBorder, width: 3.5),
        boxShadow: const [
          BoxShadow(
            color: Colors.black12,
            blurRadius: 8,
            offset: Offset(0, 3),
          ),
        ],
      ),
      child: ClipOval(
        // Tier 1: Try production character asset
        child: Image.asset(
          _assetPath,
          fit: BoxFit.cover,
          errorBuilder: (context, error, stackTrace) {
            // Tier 2: Try structured placeholder asset image
            return Image.asset(
              WorldAssets.island1Courage,
              fit: BoxFit.cover,
              errorBuilder: (context, err, st) {
                // Tier 3: Minimal clean icon fallback graphic
                return _MinimalIconFallback(
                  characterId: characterId,
                  badgeColor: activeBorder,
                  size: size,
                );
              },
            );
          },
        ),
      ),
    );
  }
}

class _MinimalIconFallback extends StatelessWidget {
  final String characterId;
  final Color badgeColor;
  final double size;

  const _MinimalIconFallback({
    required this.characterId,
    required this.badgeColor,
    required this.size,
  });

  @override
  Widget build(BuildContext context) {
    IconData icon;
    String label;

    switch (characterId.toLowerCase()) {
      case 'kem':
        icon = Icons.smart_toy_rounded;
        label = 'KEM';
        break;
      case 'sao_nova':
        icon = Icons.auto_awesome_rounded;
        label = 'NOVA';
        break;
      case 'su':
      default:
        icon = Icons.face_rounded;
        label = 'SU';
        break;
    }

    return Container(
      color: badgeColor.withOpacity(0.25),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, size: size * 0.45, color: badgeColor),
          Text(
            label,
            style: TextStyle(
              fontSize: size * 0.16,
              fontWeight: FontWeight.bold,
              color: ColorTokens.textDark,
            ),
          ),
        ],
      ),
    );
  }
}
