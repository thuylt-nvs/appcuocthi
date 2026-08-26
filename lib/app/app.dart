import 'package:flutter/material.dart';
import 'routes/app_router.dart';
import 'theme/app_theme.dart';
import 'widgets/dev_build_indicator.dart';

/// NovaStars Root Application Widget
/// Configures top-level MaterialApp.router shell, themes, and debug indicators.
class NovaStarsApp extends StatelessWidget {
  const NovaStarsApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'NovaStars',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      routerConfig: appRouter,
      builder: (context, child) {
        return DevBuildIndicator(
          child: child ?? const SizedBox.shrink(),
        );
      },
    );
  }
}
