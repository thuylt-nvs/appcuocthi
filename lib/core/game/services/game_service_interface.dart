/// Game Domain Services Contract
/// Extension point for game services (analytics, audio engine, save state).

abstract class IGameService {
  bool get isInitialized;
  Future<void> initialize();
}
