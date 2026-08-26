/// LessonZeroStoryData — Dedicated Content Data Package for Lesson Zero (Superstar Hello)
/// Decouples story dialogue, scene descriptions, neighbor reactions, and reflection seeds from UI code.
abstract class LessonZeroStoryData {
  // Stage 1 Content
  static const String stage1Title = 'Scene 1: Walking Down Courage Path';
  static const String stage1Dialogue =
      'Su is walking down the sunlit park path. Up ahead, a friendly neighbor waves warmly from across the garden gate...';
  static const String stage1Prompt = 'What should Su do first?';
  static const String stage1OptionA = 'Wave back warmly and smile!';
  static const String stage1OptionB = 'Walk closer with a friendly greeting!';

  // Stage 2 Content
  static const String stage2Title = 'Scene 2: Meeting the Neighbor';
  static const String stage2HesitationDialogue =
      'Su grips her bag tightly, feeling a little flutter of shyness... "I feel a bit shy saying hello to our new neighbor..."';
  static const String stage2CourageDialogue =
      'Su takes a deep breath, stands tall, and shares her friendly greeting!';
  static const String stage2Prompt = 'How can you help Su say hello?';

  static const String stage2OptionA = 'Take a warm step forward, smile, and wave hello!';
  static const String stage2OptionB = 'Offer a gentle nod and friendly smile from near the gate!';

  // Consequence Reactions
  static const String neighborReactionA =
      'Neighbor waves back warmly: "Good morning! What a lovely, bright smile!"';
  static const String neighborReactionB =
      'Neighbor smiles back gently: "Hello there! Nice to see a friendly face today!"';

  // Stage 3 — Superstar Wave (Modeling Gesture Interaction)
  static const String stage3Title = 'The Greeting Journey — Step 1: Superstar Wave';
  static const String stage3DemoSpeech =
      'Sao Nova demonstrates: "Watch how I wave my star wand! Now wave your finger back and forth across Su to help her wave!"';
  static const String stage3PerformText = 'Su waves her hand warmly... and the neighbor notices!';

  // Stage 4 — Gentle Eye Contact (Social Timing Behavior Loop)
  static const String stage4Title = 'The Greeting Journey — Step 2: Gentle Eye Contact';
  static const String stage4DemoSpeech =
      'Sao Nova bridges: "Watch the neighbor closely! Wait for the neighbor to turn around, then make gentle eye contact!"';
  static const String stage4SuccessText = 'Su makes gentle, confident eye contact at the perfect moment!';

  // Stage 5 — Warm Superstar Smile & Distinct Consequence Reactions
  static const String stage5Title = 'The Greeting Journey — Step 3: Warm Superstar Smile';
  static const String stage5DemoSpeech =
      'Sao Nova bridges: "Perfect social timing! Now choose Su\'s superstar smile!"';

  static const String smileOption1Title = '1. Bright Superstar Smile';
  static const String smileOption1NeighborResponse =
      'Neighbor beams brightly and waves back: "What a bright, energetic superstar greeting! Made my day!"';

  static const String smileOption2Title = '2. Soft Gentle Greeting Smile';
  static const String smileOption2NeighborResponse =
      'Neighbor smiles warmly with a gentle nod: "What a polite and pleasant greeting! So wonderful!"';

  static const String smileOption3Title = '3. Cheerful Hero Smile';
  static const String smileOption3NeighborResponse =
      'Neighbor chuckles happily with a thumbs-up: "What a cheerful, confident hero! Good morning!"';

  static const String stage5SuConfidenceText = 'Su feels her heart swell with courage and pride!';
  static const String stage5BadgeAwardText =
      'Sao Nova awards Su the golden Superstar Greeting Star Badge! (+100 XP)';

  static const String reflectionPrompt = 'Sao Nova asks: "How did it feel when the neighbor smiled back?"';
  static const String reflectionChoice1 = 'It made me feel warm and happy!';
  static const String reflectionChoice2 = 'It gave me courage to greet more friends!';
  static const String reflectionChoice3 = 'It felt like magic!';

  // Stage 6 — Hero Super Challenge (Playground Social Transfer)
  static const String stage6Title = 'Stage 6: Hero Super Challenge';
  static const String stage6Dialogue =
      'Su arrives at the school playground and sees a new classmate sitting alone on a swing, looking hesitant...';
  static const String stage6Prompt = 'Help Su use her complete Superstar Hello (Wave + Glance + Smile)!';

  static const String classmateShyText = 'Classmate is looking down shyly at the swing...';
  static const String classmateNoticingText = 'Classmate pauses... notices Su standing nearby...';
  static const String classmateSmilingText = 'Classmate smiles back with a warm glance!';
  static const String classmateEngagingText =
      'Classmate beams brightly: "Hi Su! Would you like to swing together?"';

  // Stage 7 — Hero Journal Meaning-Making Reflection
  static const String stage7Title = 'Stage 7: Hero Journal Reflection';
  static const String stage7EmotionPrompt = 'Step 1: How does Su feel after greeting her new classmate?';
  static const String emotionOption1 = 'I felt brave!';
  static const String emotionOption2 = 'I felt happy!';
  static const String emotionOption3 = 'I felt proud!';

  static const String stage7WhyPrompt = 'Step 2: Why did taking positive action make Su feel this way?';
  static const String whyOption1 = 'Because I helped a new friend feel happy and welcome!';
  static const String whyOption2 = 'Because trying new social steps gets easier when I smile!';
  static const String whyOption3 = 'Because Sao Nova and Su were right by my side!';

  static const String realWorldNarrativeBridge =
      'Sao Nova whispers: "You are a true Hero! Next time you see a friend at school or the park, I wonder if you will try your Superstar Hello in real life..."';

  // Stage 8 — Parent Real-World Confirmation Card & Preset Praise Cards
  static const String stage8Title = 'Stage 8: Parent Real-World Confirmation';
  static const String parentPrompt =
      'Hero practiced Superstar Hello! Did your hero greet someone with a friendly smile in real life today?';
  static const String parentConfirmCardTitle =
      'Parent Confirmation: My hero greeted someone with a smile today!';
  static const String confirmActionCta = 'Confirm Real-World Hero Action!';

  static const String praiseOption1 = 'So proud of your friendly smile!';
  static const String praiseOption2 = 'You brought joy to someone today!';
  static const String praiseOption3 = 'You are a brave and polite hero!';

  // Stage 9 — Cinematic Island Bloom & Memory Epilogue Scene
  static const String stage9Title = 'Stage 9: Courage Island Bloom';
  static const String islandBloomText =
      'Courage Island blooms with flowers as Node 1 shines bright gold!';
  static const String memoryEpilogueSaoNovaText =
      'Sao Nova says: "Look at Courage Island shine! Every time you greet someone with a warm smile, your hero star shines brighter!"';
  static const String memoryEpilogueSuText = 'Su waves warmly: "See you on our next hero adventure!"';

  // Stage 10 — Milestone 1 3-Star Celebration Modal
  static const String stage10Title = 'Lesson Zero Complete!';
  static const String starRating3of3 = '3 / 3 Golden Stars Earned!';
  static const String xpPayoutTotal = '+120 XP Total Payout (+100 Base + 20 Streak)';
  static const String badgeUnlockedText = 'Superstar Greeting Competency Badge Unlocked!';

  // Exit Modal Copy
  static const String exitModalTitle = 'Pause Mission?';
  static const String exitModalBody =
      'Sao Nova says: "Don\'t worry! Your hero progress is saved on Courage Island. Would you like to keep exploring or take a break?"';
  static const String keepPlayingCta = 'Keep Playing';
  static const String takeABreakCta = 'Take a Break';
}
