import 'dart:convert';
import 'package:flutter/services.dart';
import '../models/game_config_model.dart';
import '../../core/constants/asset_paths.dart';

/// Repository managing asynchronous game configuration loading & caching.
class GameConfigRepository {
  final AssetBundle _bundle;
  GameConfigModel? _cachedConfig;

  GameConfigRepository({AssetBundle? bundle}) : _bundle = bundle ?? rootBundle;

  /// Current cached config instance (returns default fallback if not loaded yet).
  GameConfigModel get config => _cachedConfig ?? GameConfigModel.defaultConfig;

  /// Loads and parses game_config.json from asset bundle.
  Future<GameConfigModel> loadConfig([String? jsonPath]) async {
    final path = jsonPath ?? AssetPaths.gameConfigJson;
    try {
      final jsonString = await _bundle.loadString(path);
      final dynamic decoded = json.decode(jsonString);
      if (decoded is Map<String, dynamic>) {
        _cachedConfig = GameConfigModel.fromJson(decoded);
      } else {
        _cachedConfig = GameConfigModel.defaultConfig;
      }
    } catch (_) {
      // Fallback cleanly to default configuration on load or parse failure
      _cachedConfig = GameConfigModel.defaultConfig;
    }
    return _cachedConfig!;
  }

  /// Parses config directly from a raw JSON string (useful for testing or remote config).
  GameConfigModel parseRawJson(String jsonString) {
    try {
      final dynamic decoded = json.decode(jsonString);
      if (decoded is Map<String, dynamic>) {
        _cachedConfig = GameConfigModel.fromJson(decoded);
      } else {
        _cachedConfig = GameConfigModel.defaultConfig;
      }
    } catch (_) {
      _cachedConfig = GameConfigModel.defaultConfig;
    }
    return _cachedConfig!;
  }
}
