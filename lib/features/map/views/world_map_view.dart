import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../core/tokens/color_tokens.dart';
import '../../../core/tokens/spacing_tokens.dart';
import '../../../core/constants/game_text.dart';
import '../../../core/services/lesson_runner_stub.dart';
import '../../../shared/components/ns_mission_intro_scene.dart';
import '../../../shared/components/ns_character_avatar_widget.dart';
import '../../lesson/controllers/lesson_runner_controller.dart';

/// WorldMapView — Alive World Map & Permanent World Progression View
/// Shows permanent gold star Node 1, blooming Island 1, and Node 2 unlock reveal.
class WorldMapView extends ConsumerStatefulWidget {
  const WorldMapView({super.key});

  @override
  ConsumerState<WorldMapView> createState() => _WorldMapViewState();
}

class _WorldMapViewState extends ConsumerState<WorldMapView> with SingleTickerProviderStateMixin {
  late final AnimationController _pulseController;
  late final Animation<double> _pulseAnimation;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    )..repeat(reverse: true);

    _pulseAnimation = Tween<double>(begin: 1.0, end: 1.15).animate(
      CurvedAnimation(parent: _pulseController, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _pulseController.dispose();
    super.dispose();
  }

  void _onMission1Tap() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (sheetContext) {
        return NSMissionIntroScene(
          missionTitle: GameText.mission1Title,
          competencyTitle: GameText.competencyPoliteGreetings,
          estimatedTime: GameText.estimatedDuration15m,
          targetXp: 100,
          targetStars: 3,
          badgeTitle: GameText.badgeSuperstarGreeting,
          companionId: 'su',
          onBeginMission: (ctx) {
            LessonRunner.startLessonZero(context);
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final lessonState = ref.watch(lessonRunnerControllerProvider);
    final bool isNode1Completed = lessonState.isNode1GoldStar;
    final bool isNode2Unlocked = lessonState.isNode2Unlocked;

    return Scaffold(
      appBar: AppBar(
        title: Text(isNode1Completed ? 'Island of Courage (Bloomed!)' : GameText.island1Title),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded),
          onPressed: () => context.go('/home'),
        ),
      ),
      body: Stack(
        children: [
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: isNode1Completed
                    ? const [Color(0xFFE8F5E9), Color(0xFFFFF9C4)] // Permanent Bloomed Island Gradient
                    : const [Color(0xFFE3F2FD), Color(0xFFE8F5E9)],
              ),
            ),
          ),

          Positioned(
            top: 24,
            left: 20,
            child: Opacity(
              opacity: 0.65,
              child: Row(
                children: const [
                  Icon(Icons.cloud_rounded, color: Colors.white, size: 64),
                  SizedBox(width: 48),
                  Icon(Icons.cloud_rounded, color: Colors.white, size: 48),
                ],
              ),
            ),
          ),

          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const NSCharacterAvatarWidget(
                      characterId: 'sao_nova',
                      size: 48,
                    ),
                    const SizedBox(width: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                      decoration: BoxDecoration(
                        color: ColorTokens.secondaryYellowLight,
                        borderRadius: BorderRadius.circular(18),
                        border: Border.all(color: ColorTokens.secondaryYellow, width: 2),
                        boxShadow: const [
                          BoxShadow(
                            color: Colors.black12,
                            blurRadius: 8,
                            offset: Offset(0, 3),
                          ),
                        ],
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Icon(Icons.auto_awesome_rounded, color: ColorTokens.secondaryYellowDark, size: 18),
                          const SizedBox(width: 6),
                          Text(
                            isNode1Completed
                                ? 'Courage Island is blooming! Node 2 Unlocked!'
                                : GameText.node1InviteSpeech,
                            style: const TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.bold,
                              color: ColorTokens.textDark,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),

                const SizedBox(height: 16),

                // Node 1 (Permanent Gold Star when completed)
                GestureDetector(
                  onTap: _onMission1Tap,
                  child: ScaleTransition(
                    scale: _pulseAnimation,
                    child: Container(
                      width: 92,
                      height: 92,
                      decoration: BoxDecoration(
                        color: isNode1Completed ? ColorTokens.growthGreen : ColorTokens.secondaryYellow,
                        shape: BoxShape.circle,
                        border: Border.all(color: Colors.white, width: 4),
                        boxShadow: [
                          BoxShadow(
                            color: (isNode1Completed ? ColorTokens.growthGreen : ColorTokens.secondaryYellow)
                                .withOpacity(0.65),
                            blurRadius: 22,
                            spreadRadius: 4,
                          ),
                        ],
                      ),
                      child: Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(
                              isNode1Completed ? Icons.stars_rounded : Icons.play_arrow_rounded,
                              size: 44,
                              color: isNode1Completed ? ColorTokens.secondaryYellow : ColorTokens.textDark,
                            ),
                            Text(
                              isNode1Completed ? '3 STARS' : GameText.mission1Tag,
                              style: TextStyle(
                                fontSize: 10,
                                fontWeight: FontWeight.black,
                                color: isNode1Completed ? Colors.white : ColorTokens.textDark,
                                letterSpacing: 0.5,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),

                const SizedBox(height: 12),

                Text(
                  isNode1Completed ? 'Superstar Hello (Mastered ★★★)' : GameText.mission1Title,
                  style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        color: ColorTokens.textDark,
                        fontWeight: FontWeight.bold,
                      ),
                ),

                const SizedBox(height: 36),

                // Node 2 Reveal Animation when Unlocked
                AnimatedScale(
                  scale: isNode2Unlocked ? 1.05 : 1.0,
                  duration: const Duration(milliseconds: 600),
                  curve: Curves.elasticOut,
                  child: Container(
                    width: 72,
                    height: 72,
                    decoration: BoxDecoration(
                      color: isNode2Unlocked ? ColorTokens.primaryBlue : ColorTokens.surfaceElevated,
                      shape: BoxShape.circle,
                      border: Border.all(
                        color: isNode2Unlocked ? ColorTokens.secondaryYellow : ColorTokens.borderLight,
                        width: isNode2Unlocked ? 3.5 : 2,
                      ),
                      boxShadow: isNode2Unlocked
                          ? [
                              BoxShadow(
                                color: ColorTokens.primaryBlue.withOpacity(0.5),
                                blurRadius: 14,
                                spreadRadius: 2,
                              ),
                            ]
                          : [],
                    ),
                    child: Icon(
                      isNode2Unlocked ? Icons.play_arrow_rounded : Icons.lock_rounded,
                      color: isNode2Unlocked ? Colors.white : ColorTokens.textMuted,
                      size: 32,
                    ),
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  isNode2Unlocked ? 'Node 2: Courage Adventure 2 (Unlocked!)' : GameText.mission2LockedTag,
                  style: TextStyle(
                    fontSize: 12,
                    color: isNode2Unlocked ? ColorTokens.primaryBlueDark : ColorTokens.textMuted,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
