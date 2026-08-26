import 'package:flutter/material.dart';
import '../../core/tokens/color_tokens.dart';
import '../../core/tokens/spacing_tokens.dart';

/// NSStoryBubble — Story Dialogue & Speech Bubble Component
/// Expanded design system component prepared for typing effects, emotion switches,
/// and emphasis formatting.
class NSStoryBubble extends StatelessWidget {
  final String speakerName;
  final String text;
  final String? characterEmotion; // "happy", "thinking", "shy", "excited"
  final String? emphasisText;
  final Widget? avatarGraphic;

  /// Typing effect parameters (Prepared for Phase 4 typing animation engine)
  final bool enableTypingEffect;
  final int typingSpeedMs;
  final bool pauseOnPunctuation;

  final Color? backgroundColor;
  final Color? borderColor;

  const NSStoryBubble({
    super.key,
    required this.speakerName,
    required this.text,
    this.characterEmotion,
    this.emphasisText,
    this.avatarGraphic,
    this.enableTypingEffect = false,
    this.typingSpeedMs = 30,
    this.pauseOnPunctuation = true,
    this.backgroundColor,
    this.borderColor,
  });

  @override
  Widget build(BuildContext context) {
    final Color bg = backgroundColor ?? ColorTokens.surfaceWhite;
    final Color border = borderColor ?? ColorTokens.secondaryYellow;

    // TODO(Phase-4): Implement typing effect animation using enableTypingEffect, typingSpeedMs, and pauseOnPunctuation
    return Container(
      padding: const EdgeInsets.all(SpacingTokens.md),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: SpacingTokens.cardRadius,
        border: Border.all(color: border, width: 2.5),
        boxShadow: const [
          BoxShadow(
            color: Colors.black12,
            blurRadius: 10,
            offset: Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              if (avatarGraphic != null) ...[
                avatarGraphic!,
                const SizedBox(width: SpacingTokens.sm),
              ],
              Text(
                speakerName,
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontSize: 16,
                      color: ColorTokens.primaryBlue,
                      fontWeight: FontWeight.bold,
                    ),
              ),
              if (characterEmotion != null) ...[
                const SizedBox(width: 8),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: ColorTokens.secondaryYellowLight,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Text(
                    characterEmotion!,
                    style: const TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                      color: ColorTokens.secondaryYellowDark,
                    ),
                  ),
                ),
              ],
            ],
          ),
          const SizedBox(height: SpacingTokens.sm),
          Text(
            text,
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  color: ColorTokens.textDark,
                  height: 1.4,
                ),
          ),
          if (emphasisText != null) ...[
            const SizedBox(height: SpacingTokens.xs),
            Text(
              emphasisText!,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: ColorTokens.primaryBlueDark,
                    fontWeight: FontWeight.bold,
                    fontStyle: FontStyle.italic,
                  ),
            ),
          ],
        ],
      ),
    );
  }
}
