/* ==========================================================================
   NovaStars / Antigravity — Canonical Application NVS Competency Taxonomy
   Official NVS Future Competency Standard v0.2 (Canonical Objects NL1–NL7)
   ========================================================================== */

const NVSCompetencies = {
  NL1: {
    id: 'NL1',
    code: 'NL1',
    officialNameVi: 'Có mục đích và giá trị sống',
    displayName: 'Có mục đích và giá trị sống',
    englishDisplayName: 'Purpose & Life Values (UI Metadata)',
    icon: '🎯',
    color: '#EC4899',
    bgColor: '#FCE7F3',
    borderColor: '#F472B6',
    coachDescription: 'Xác định mục đích cá nhân, sống có phẩm chất, giá trị đạo đức và kỷ luật bản thân.'
  },
  NL2: {
    id: 'NL2',
    code: 'NL2',
    officialNameVi: 'Có tư duy và năng lực học tập suốt đời',
    displayName: 'Có tư duy và năng lực học tập suốt đời',
    englishDisplayName: 'Lifelong Learning & Thinking Mindset (UI Metadata)',
    icon: '🧩',
    color: '#3B82F6',
    bgColor: '#DBEAFE',
    borderColor: '#60A5FA',
    coachDescription: 'Rèn luyện tư duy logic, phản biện, phân tích và chủ động tự học.'
  },
  NL3: {
    id: 'NL3',
    code: 'NL3',
    officialNameVi: 'Trí tuệ cảm xúc và khả năng kết nối',
    displayName: 'Trí tuệ cảm xúc và khả năng kết nối',
    englishDisplayName: 'Emotional Intelligence & Social Connection (UI Metadata)',
    icon: '❤️',
    color: '#10B981',
    bgColor: '#D1FAE5',
    borderColor: '#34D399',
    coachDescription: 'Thấu hiểu cảm xúc cá nhân, làm chủ tâm trí, đồng cảm và gắn kết quan hệ xã hội.'
  },
  NL4: {
    id: 'NL4',
    code: 'NL4',
    officialNameVi: 'Giao tiếp, truyền cảm hứng và thuyết phục',
    displayName: 'Giao tiếp, truyền cảm hứng và thuyết phục',
    englishDisplayName: 'Communication, Inspiration & Persuasion (UI Metadata)',
    icon: '🗣️',
    color: '#F97316',
    bgColor: '#FFEDD5',
    borderColor: '#FB923C',
    coachDescription: 'Lắng nghe tích cực, diễn đạt rõ ràng, thuyết phục và truyền cảm hứng.'
  },
  NL5: {
    id: 'NL5',
    code: 'NL5',
    officialNameVi: 'Tinh thần công dân toàn cầu và trách nhiệm xã hội',
    displayName: 'Tinh thần công dân toàn cầu và trách nhiệm xã hội',
    englishDisplayName: 'Global Citizenship & Social Responsibility (UI Metadata)',
    icon: '🌍',
    color: '#06B6D4',
    bgColor: '#CFFAFE',
    borderColor: '#22D3EE',
    coachDescription: 'Tôn trọng sự đa dạng văn hóa, bảo vệ môi trường và đóng góp cho cộng đồng.'
  },
  NL6: {
    id: 'NL6',
    code: 'NL6',
    officialNameVi: 'Hành động, dám thử, dám thay đổi',
    displayName: 'Hành động, dám thử, dám thay đổi',
    englishDisplayName: 'Action, Courage & Adaptability (UI Metadata)',
    icon: '🚀',
    color: '#F59E0B',
    bgColor: '#FEF3C7',
    borderColor: '#FBBF24',
    coachDescription: 'Dũng cảm bước khỏi vùng an toàn, tổ chức thực thi và thích ứng linh hoạt.'
  },
  NL7: {
    id: 'NL7',
    code: 'NL7',
    officialNameVi: 'Kĩ năng công nghệ và trí tuệ nhân tạo',
    displayName: 'Kĩ năng công nghệ và trí tuệ nhân tạo',
    englishDisplayName: 'Technology & AI Skills (UI Metadata)',
    icon: '💻',
    color: '#8B5CF6',
    bgColor: '#EDE9FE',
    borderColor: '#A78BFA',
    coachDescription: 'Sử dụng công nghệ và trí tuệ nhân tạo an toàn, bảo mật và có trách nhiệm.'
  }
};

/**
 * Separate Legacy Migration Alias Map (Does NOT contaminate NVSCompetencies object)
 */
const LegacyCompetencyMigrationMap = {
  EMOTIONAL_COMPETENCE: 'NL3',
  PROBLEM_SOLVING: 'NL2',
  SELF_MANAGEMENT: 'NL1',
  TECHNOLOGY: 'NL7',
  GLOBAL_RESPONSIBILITY: 'NL5',
  LEADERSHIP: 'NL6',
  COMMUNICATION: 'NL4'
};

/**
 * Get canonical competency definition by ID (NL1–NL7)
 */
function getNVSCompetency(competencyId) {
  if (!competencyId || !NVSCompetencies[competencyId]) {
    // Check if passed legacy ID
    const mapped = LegacyCompetencyMigrationMap[competencyId];
    if (mapped && NVSCompetencies[mapped]) {
      return NVSCompetencies[mapped];
    }

    if (typeof console !== 'undefined' && console.log) {
      console.log(`[NVSCompetencies] Unknown competency ID: ${competencyId}`);
    }
    return {
      id: competencyId || 'UNKNOWN',
      code: competencyId || 'UNKNOWN',
      officialNameVi: 'Năng Lực NVS',
      displayName: 'Năng Lực NVS',
      englishDisplayName: 'NVS Competency (Fallback)',
      icon: '🌟',
      color: '#64748B',
      bgColor: '#F1F5F9',
      borderColor: '#94A3B8',
      coachDescription: 'Năng lực NVS Future Competency Standard v0.2.'
    };
  }
  return NVSCompetencies[competencyId];
}

// Export for module systems or global window
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NVSCompetencies, LegacyCompetencyMigrationMap, getNVSCompetency };
} else {
  window.NVSCompetencies = NVSCompetencies;
  window.LegacyCompetencyMigrationMap = LegacyCompetencyMigrationMap;
  window.getNVSCompetency = getNVSCompetency;
}
