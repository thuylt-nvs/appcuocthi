import 'package:flutter/material.dart';
import '../../core/tokens/color_tokens.dart';
import '../../core/tokens/spacing_tokens.dart';
import '../../core/tokens/elevation_tokens.dart';
import '../../core/tokens/animation_tokens.dart';

/// NSPrimaryButton — Core Reusable Design System Button
/// Tactile, rounded primary button with spring-damped press scaling (0.95 -> 1.0).
/// Child-friendly high-contrast styling designed for touch agency (ages 6–11).
class NSPrimaryButton extends StatefulWidget {
  final String text;
  final VoidCallback? onPressed;
  final IconData? icon;
  final bool isLoading;
  final bool isEnabled;
  final Color? color;
  final double height;

  const NSPrimaryButton({
    super.key,
    required this.text,
    required this.onPressed,
    this.icon,
    this.isLoading = false,
    this.isEnabled = true,
    this.color,
    this.height = 56.0,
  });

  @override
  State<NSPrimaryButton> createState() => _NSPrimaryButtonState();
}

class _NSPrimaryButtonState extends State<NSPrimaryButton> {
  bool _isPressed = false;

  void _onTapDown(TapDownDetails details) {
    if (widget.isEnabled && !widget.isLoading) {
      setState(() => _isPressed = true);
    }
  }

  void _onTapUp(TapUpDetails details) {
    if (_isPressed) {
      setState(() => _isPressed = false);
    }
  }

  void _onTapCancel() {
    if (_isPressed) {
      setState(() => _isPressed = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final bool active = widget.isEnabled && !widget.isLoading && widget.onPressed != null;
    final Color buttonColor = widget.color ?? ColorTokens.primaryBlue;

    return GestureDetector(
      onTapDown: _onTapDown,
      onTapUp: _onTapUp,
      onTapCancel: _onTapCancel,
      onTap: active ? widget.onPressed : null,
      child: AnimatedScale(
        scale: _isPressed ? 0.95 : 1.0,
        duration: AnimationTokens.buttonPressDuration,
        curve: AnimationTokens.bounceCurve,
        child: AnimatedContainer(
          duration: AnimationTokens.buttonPressDuration,
          height: widget.height,
          constraints: const BoxConstraints(minWidth: 200),
          padding: const EdgeInsets.symmetric(horizontal: SpacingTokens.lg),
          decoration: BoxDecoration(
            color: active ? buttonColor : ColorTokens.textMuted.withOpacity(0.4),
            borderRadius: SpacingTokens.buttonRadius,
            boxShadow: active && !_isPressed
                ? [
                    BoxShadow(
                      color: ColorTokens.buttonShadow,
                      blurRadius: 8,
                      offset: const Offset(0, ElevationTokens.button),
                    ),
                  ]
                : [],
          ),
          child: Center(
            child: widget.isLoading
                ? const SizedBox(
                    width: 24,
                    height: 24,
                    child: CircularProgressIndicator(
                      strokeWidth: 2.5,
                      valueColor: AlwaysStoppedAnimation<Color>(ColorTokens.textOnPrimary),
                    ),
                  )
                : Row(
                    mainAxisSize: MainAxisSize.min,
                    mainAlignment: MainAxisAlignment.center,
                    children: [
                      if (widget.icon != null) ...[
                        Icon(
                          widget.icon,
                          color: ColorTokens.textOnPrimary,
                          size: 22,
                        ),
                        const SizedBox(width: SpacingTokens.sm),
                      ],
                      Text(
                        widget.text,
                        style: Theme.of(context).textTheme.labelLarge?.copyWith(
                              color: ColorTokens.textOnPrimary,
                            ),
                      ),
                    ],
                  ),
          ),
        ),
      ),
    );
  }
}
