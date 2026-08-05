import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../core/tokens/color_tokens.dart';
import '../../../core/tokens/spacing_tokens.dart';
import '../../../core/constants/game_text.dart';
import '../../../shared/components/ns_primary_button.dart';
import '../../../shared/components/ns_character_avatar_widget.dart';
import '../../ftue/controllers/ftue_controller.dart';

/// HomeView — Hero Home Base Composition
/// Emphasizes hero identity centerpiece using GameText constants.
class HomeView extends ConsumerStatefulWidget {
  const HomeView({super.key});

  @override
  ConsumerState<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends ConsumerState<HomeView> with SingleTickerProviderStateMixin {
  late final AnimationController _revealController;
  late final Animation<double> _scaleAnimation;
  late final Animation<double> _fadeAnimation;
  bool _showAhaStar = false;

  @override
  void initState() {
    super.initState();
    _revealController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1800),
    );

    _scaleAnimation = Tween<double>(begin: 0.7, end: 1.0).animate(
      CurvedAnimation(parent: _revealController, curve: Curves.easeOutBack),
    );

    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _revealController, curve: Curves.easeIn),
    );

    _revealController.forward().then((_) {
      if (mounted) {
        setState(() => _showAhaStar = true);
      }
    });
  }

  @override
  void dispose() {
    _revealController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final ftueState = ref.watch(ftueControllerProvider);
    final String heroName = ftueState.heroName.isNotEmpty ? ftueState.heroName : 'Star Hero';
    final String avatarId = ftueState.selectedAvatarId;
    final String avatarName = avatarId == 'kem' ? GameText.companionKemName : GameText.companionSuName;

    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: SpacingTokens.lg, vertical: SpacingTokens.md),
          child: Column(
            children: [
              FadeTransition(
                opacity: _fadeAnimation,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: const [
                    _SleekMetricBadge(
                      icon: Icons.stars_rounded,
                      iconColor: ColorTokens.secondaryYellow,
                      label: '0 Stars',
                    ),
                    _SleekMetricBadge(
                      icon: Icons.bolt_rounded,
                      iconColor: ColorTokens.warningOrange,
                      label: '0 XP',
                    ),
                    _SleekMetricBadge(
                      icon: Icons.local_fire_department_rounded,
                      iconColor: ColorTokens.errorRed,
                      label: '1 Day Streak',
                    ),
                  ],
                ),
              ),

              const Spacer(),

              ScaleTransition(
                scale: _scaleAnimation,
                child: Column(
                  children: [
                    Stack(
                      alignment: Alignment.topRight,
                      children: [
                        NSCharacterAvatarWidget(
                          characterId: avatarId,
                          size: 120,
                          borderColor: ColorTokens.secondaryYellow,
                        ),
                        if (_showAhaStar)
                          AnimatedScale(
                            scale: _showAhaStar ? 1.0 : 0.0,
                            duration: const Duration(milliseconds: 600),
                            curve: Curves.elasticOut,
                            child: Container(
                              padding: const EdgeInsets.all(6),
                              decoration: const BoxDecoration(
                                color: ColorTokens.secondaryYellow,
                                shape: BoxShape.circle,
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.black26,
                                    blurRadius: 8,
                                    offset: Offset(0, 3),
                                  ),
                                ],
                              ),
                              child: const Icon(
                                Icons.auto_awesome_rounded,
                                color: ColorTokens.textDark,
                                size: 24,
                              ),
                            ),
                          ),
                      ],
                    ),

                    const SizedBox(height: SpacingTokens.md),

                    Text(
                      GameText.welcomeHeroTitle.replaceFirst('{name}', heroName),
                      style: Theme.of(context).textTheme.displayLarge?.copyWith(
                            fontSize: 26,
                            color: ColorTokens.textDark,
                          ),
                      textAlign: TextAlign.center,
                    ),

                    const SizedBox(height: 6),

                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 4),
                      decoration: BoxDecoration(
                        color: ColorTokens.primaryBlue.withOpacity(0.12),
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Text(
                        GameText.heroPartnerTag.replaceFirst('{partner}', avatarName),
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.bold,
                          color: ColorTokens.primaryBlueDark,
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              const Spacer(),

              FadeTransition(
                opacity: _fadeAnimation,
                child: Container(
                  padding: const EdgeInsets.all(SpacingTokens.md),
                  decoration: BoxDecoration(
                    color: ColorTokens.surfaceWhite,
                    borderRadius: SpacingTokens.cardRadius,
                    border: Border.all(color: ColorTokens.secondaryYellow, width: 2),
                    boxShadow: const [
                      BoxShadow(
                        color: Colors.black12,
                        blurRadius: 10,
                        offset: Offset(0, 4),
                      ),
                    ],
                  ),
                  child: Row(
                    children: [
                      const NSCharacterAvatarWidget(
                        characterId: 'sao_nova',
                        size: 56,
                      ),
                      const SizedBox(width: SpacingTokens.md),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              GameText.saoNovaInviteHeader,
                              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                                    fontSize: 16,
                                  ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              GameText.mission1InviteSub,
                              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                    color: ColorTokens.textMedium,
                                  ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              const SizedBox(height: SpacingTokens.lg),

              NSPrimaryButton(
                text: GameText.exploreWorldMapCta,
                icon: Icons.map_rounded,
                onPressed: () => context.go('/map'),
              ),

              const SizedBox(height: SpacingTokens.md),
            ],
          ),
        ),
      ),
    );
  }
}

class _SleekMetricBadge extends StatelessWidget {
  final IconData icon;
  final Color iconColor;
  final String label;

  const _SleekMetricBadge({
    required this.icon,
    required this.iconColor,
    required this.label,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: ColorTokens.surfaceWhite,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: ColorTokens.borderLight),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, color: iconColor, size: 16),
          const SizedBox(width: 4),
          Text(
            label,
            style: const TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.bold,
              color: ColorTokens.textDark,
            ),
          ),
        ],
      ),
    );
  }
}
