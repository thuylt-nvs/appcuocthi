import 'package:go_router/go_router.dart';
import '../../features/ftue/views/ftue_view.dart';
import '../../features/home/views/home_view.dart';
import '../../features/map/views/world_map_view.dart';
import '../../features/lesson/views/lesson_runner_view.dart';

/// NovaStars Declarative Navigation Router
/// Maps application routes to feature views.
final appRouter = GoRouter(
  initialLocation: '/ftue',
  routes: [
    GoRoute(
      path: '/ftue',
      name: 'ftue',
      builder: (context, state) => const FTUEView(),
    ),
    GoRoute(
      path: '/home',
      name: 'home',
      builder: (context, state) => const HomeView(),
    ),
    GoRoute(
      path: '/map',
      name: 'map',
      builder: (context, state) => const WorldMapView(),
    ),
    GoRoute(
      path: '/lesson-runner',
      name: 'lesson-runner',
      builder: (context, state) => const LessonRunnerView(),
    ),
  ],
);
