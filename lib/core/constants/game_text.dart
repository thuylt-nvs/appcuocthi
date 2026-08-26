/// NovaStars Game Text & Localization String Layer
/// Centralizes all user-facing copy and gameplay text to prepare for future content packages.
abstract class GameText {
  // Onboarding & FTUE Copy
  static const String saoNovaWelcomeSpeech = 'Sao Nova says: "Welcome to NovaStars! Are you ready to become a real-life hero?"';
  static const String step1ChoosePartner = '1. Choose Your Hero Partner';
  static const String step2EnterHeroName = '2. What is Your Hero Name?';
  static const String heroNameHint = 'e.g. Star Hero';
  static const String heroNameRequiredError = 'Please enter your hero name!';
  static const String startHeroAdventureCta = 'Start Hero Adventure';

  // Companion Names & Roles
  static const String companionSuName = 'Su';
  static const String companionSuDesc = 'Best Friend';
  static const String companionKemName = 'Kem';
  static const String companionKemDesc = 'Adventure Partner';
  static const String selectedPartnerLabel = 'Selected Partner';

  // Home Base Copy
  static const String welcomeHeroTitle = 'Welcome, {name}!';
  static const String heroPartnerTag = 'Hero Partner: {partner} | Courage Island Apprentice';
  static const String saoNovaInviteHeader = 'Sao Nova Invites You!';
  static const String mission1InviteSub = 'Mission 1: Superstar Hello is ready on Island 1!';
  static const String exploreWorldMapCta = 'Explore World Map';

  // World Map & Mission Intro Copy
  static const String island1Title = 'Island of Courage';
  static const String node1InviteSpeech = 'Your first mission is waiting!';
  static const String mission1Tag = 'MISSION 1';
  static const String mission1Title = 'Superstar Hello';
  static const String mission2LockedTag = 'Mission 2 (Locked)';
  static const String competencyPoliteGreetings = 'Polite Greetings & Self-Confidence';
  static const String estimatedDuration15m = '15 Min';
  static const String targetXp100 = '+100 XP';
  static const String targetStars3 = '3 Stars';
  static const String badgeSuperstarGreeting = 'Superstar Greeting Badge';
  static const String beginMissionCta = 'Begin Mission';
}
