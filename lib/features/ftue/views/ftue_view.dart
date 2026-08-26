import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../core/tokens/color_tokens.dart';
import '../../../core/tokens/spacing_tokens.dart';
import '../../../core/constants/game_text.dart';
import '../../../shared/components/ns_primary_button.dart';
import '../../../shared/components/ns_character_avatar_widget.dart';
import '../controllers/ftue_controller.dart';
import '../widgets/avatar_picker_widget.dart';

/// FTUEView — First-Time User Experience Onboarding View
/// Guided onboarding flow (<60s) using GameText constants.
class FTUEView extends ConsumerStatefulWidget {
  const FTUEView({super.key});

  @override
  ConsumerState<FTUEView> createState() => _FTUEViewState();
}

class _FTUEViewState extends ConsumerState<FTUEView> {
  late final TextEditingController _nameController;

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController();
  }

  @override
  void dispose() {
    _nameController.dispose();
    super.dispose();
  }

  void _onStartAdventure() {
    final controller = ref.read(ftueControllerProvider.notifier);
    controller.updateHeroName(_nameController.text);
    
    if (controller.submitOnboarding()) {
      context.go('/home');
    }
  }

  @override
  Widget build(BuildContext context) {
    final ftueState = ref.watch(ftueControllerProvider);

    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: SpacingTokens.lg, vertical: SpacingTokens.md),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: SpacingTokens.md),

              // Sao Nova Greeting Speech Bubble Scene
              Container(
                padding: const EdgeInsets.all(SpacingTokens.md),
                decoration: BoxDecoration(
                  color: ColorTokens.secondaryYellowLight,
                  borderRadius: SpacingTokens.cardRadius,
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
                  children: [
                    const NSCharacterAvatarWidget(
                      characterId: 'sao_nova',
                      size: 56,
                    ),
                    const SizedBox(width: SpacingTokens.md),
                    Expanded(
                      child: Text(
                        GameText.saoNovaWelcomeSpeech,
                        style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                              color: ColorTokens.textDark,
                              fontWeight: FontWeight.w600,
                            ),
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: SpacingTokens.xl),

              // Step 1 Title
              Text(
                GameText.step1ChoosePartner,
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      color: ColorTokens.textDark,
                    ),
              ),
              const SizedBox(height: SpacingTokens.md),

              // Avatar Selection Cards
              AvatarPickerWidget(
                selectedAvatarId: ftueState.selectedAvatarId,
                onAvatarSelected: (avatarId) {
                  ref.read(ftueControllerProvider.notifier).selectAvatar(avatarId);
                },
              ),

              const SizedBox(height: SpacingTokens.xl),

              // Step 2 Title
              Text(
                GameText.step2EnterHeroName,
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      color: ColorTokens.textDark,
                    ),
              ),
              const SizedBox(height: SpacingTokens.sm),

              // Hero Name Input Field
              TextField(
                controller: _nameController,
                onChanged: (val) {
                  ref.read(ftueControllerProvider.notifier).updateHeroName(val);
                },
                decoration: InputDecoration(
                  hintText: GameText.heroNameHint,
                  prefixIcon: const Icon(Icons.stars_rounded, color: ColorTokens.primaryBlue),
                  filled: true,
                  fillColor: ColorTokens.surfaceWhite,
                  errorText: ftueState.errorMessage,
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: SpacingTokens.md,
                    vertical: SpacingTokens.md,
                  ),
                  border: OutlineInputBorder(
                    borderRadius: SpacingTokens.buttonRadius,
                    borderSide: const BorderSide(color: ColorTokens.borderLight),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: SpacingTokens.buttonRadius,
                    borderSide: const BorderSide(color: ColorTokens.primaryBlue, width: 2.5),
                  ),
                ),
              ),

              const SizedBox(height: SpacingTokens.sm),

              // Quick Preset Name Selector Chips
              Wrap(
                spacing: SpacingTokens.xs,
                children: ['Star Hero', 'Super Su', 'Captain Kem'].map((presetName) {
                  return ChoiceChip(
                    label: Text(presetName),
                    selected: _nameController.text == presetName,
                    onSelected: (_) {
                      _nameController.text = presetName;
                      ref.read(ftueControllerProvider.notifier).updateHeroName(presetName);
                    },
                    selectedColor: ColorTokens.primaryBlueLight,
                  );
                }).toList(),
              ),

              const SizedBox(height: SpacingTokens.xl * 1.5),

              // Primary CTA Button
              NSPrimaryButton(
                text: GameText.startHeroAdventureCta,
                icon: Icons.rocket_launch_rounded,
                onPressed: _onStartAdventure,
              ),

              const SizedBox(height: SpacingTokens.md),
            ],
          ),
        ),
      ),
    );
  }
}
