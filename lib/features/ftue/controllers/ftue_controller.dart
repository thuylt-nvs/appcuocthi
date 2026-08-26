import 'package:flutter_riverpod/flutter_riverpod.dart';

/// State model for First-Time User Experience (FTUE)
class FTUEState {
  final String selectedAvatarId; // "su" or "kem"
  final String heroName;
  final bool isCompleted;
  final String? errorMessage;

  const FTUEState({
    this.selectedAvatarId = 'su',
    this.heroName = '',
    this.isCompleted = false,
    this.errorMessage,
  });

  FTUEState copyWith({
    String? selectedAvatarId,
    String? heroName,
    bool? isCompleted,
    String? errorMessage,
  }) {
    return FTUEState(
      selectedAvatarId: selectedAvatarId ?? this.selectedAvatarId,
      heroName: heroName ?? this.heroName,
      isCompleted: isCompleted ?? this.isCompleted,
      errorMessage: errorMessage,
    );
  }
}

/// Controller managing FTUE onboarding selection state
class FTUEController extends StateNotifier<FTUEState> {
  FTUEController() : super(const FTUEState());

  /// Selects companion avatar ("su" or "kem")
  void selectAvatar(String avatarId) {
    if (avatarId == 'su' || avatarId == 'kem') {
      state = state.copyWith(selectedAvatarId: avatarId);
    }
  }

  /// Updates hero name string
  void updateHeroName(String name) {
    state = state.copyWith(heroName: name, errorMessage: null);
  }

  /// Validates inputs and submits onboarding completion
  bool submitOnboarding() {
    final trimmedName = state.heroName.trim();
    if (trimmedName.isEmpty) {
      state = state.copyWith(errorMessage: 'Please enter your hero name!');
      return false;
    }

    state = state.copyWith(
      heroName: trimmedName,
      isCompleted: true,
      errorMessage: null,
    );
    return true;
  }
}

/// Riverpod Provider for FTUEController
final ftueControllerProvider = StateNotifierProvider<FTUEController, FTUEState>((ref) {
  return FTUEController();
});
