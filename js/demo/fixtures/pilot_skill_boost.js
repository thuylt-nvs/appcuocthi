/* ==========================================================================
   NovaStars × NVS Championship — Public Student Pilot Fixture: Skill Boost
   v0.2.2 Hardened Public Pilot Item Fixtures (Canonical NL1–NL7 Mapped)
   ========================================================================== */

const PILOT_SKILL_BOOST = [
  {
    itemId: 'pilot_sb_1',
    ageGroup: 'SHARED',
    primaryCompetencyId: 'NL4',
    linkedCompetencyIds: ['NL3'],
    skillId: 'SKILL_BOOST_PERSUASION',
    skillLabel: 'Giao tiếp, truyền cảm hứng & Thuyết phục',
    indicatorId: null,
    mappingStatus: 'DEMO_MAPPED',
    contentStatus: 'DEMO_PILOT_ONLY',
    eligibleForOfficialScoring: false,
    scoringRationale: 'Đánh giá khả năng đề xuất ý tưởng và truyền cảm hứng cùng tham gia.',
    reviewStatus: 'PENDING_ACADEMIC_REVIEW',
    reviewer: null,
    stem: 'Em muốn đề xuất ý tưởng giữ gìn vệ sinh lớp học với các bạn, em sẽ chọn cách nào?',
    options: [
      'A. Trình bày rõ lý do, lợi ích chung & truyền cảm hứng để cả lớp cùng tham gia',
      'B. Ép buộc bạn làm theo mệnh lệnh của mình',
      'C. Mặc kệ không quan tâm',
      'D. Báo cô giáo phạt các bạn'
    ],
    correctAnswer: 0,
    explanation: 'Năng lực Giao tiếp, truyền cảm hứng và thuyết phục giúp tạo sự đồng thuận tích cực!'
  },
  {
    itemId: 'pilot_sb_2',
    ageGroup: 'SHARED',
    primaryCompetencyId: 'NL6',
    linkedCompetencyIds: ['NL2'],
    skillId: 'SKILL_BOOST_ACTION',
    skillLabel: 'Hành động, dám thử & Dám thay đổi',
    indicatorId: null,
    mappingStatus: 'DEMO_MAPPED',
    contentStatus: 'DEMO_PILOT_ONLY',
    eligibleForOfficialScoring: false,
    scoringRationale: 'Đánh giá thái độ tích cực chủ động học hỏi trước tình huống thử thách mới.',
    reviewStatus: 'PENDING_ACADEMIC_REVIEW',
    reviewer: null,
    stem: 'Khi gặp một dạng bài tập tư duy mới chưa từng học trước đây, em nên phản ứng thế nào?',
    options: [
      'A. Tự tin khám phá, phân tích câu hỏi và thử nghiệm các cách giải khác nhau',
      'B. Sợ hãi bỏ cuộc ngay lập tức',
      'C. Chép bài của bạn bên cạnh',
      'D. Giận dữ đổ lỗi cho đề thi'
    ],
    correctAnswer: 0,
    explanation: 'Năng lực Hành động, dám thử, dám thay đổi giúp em chủ động chinh phục tri thức!'
  },
  {
    itemId: 'pilot_sb_3',
    ageGroup: 'SHARED',
    primaryCompetencyId: 'NL5',
    linkedCompetencyIds: ['NL7'],
    skillId: 'SKILL_BOOST_GLOBAL_CITIZEN',
    skillLabel: 'Tinh thần công dân toàn cầu & Trách nhiệm xã hội',
    indicatorId: null,
    mappingStatus: 'DEMO_MAPPED',
    contentStatus: 'DEMO_PILOT_ONLY',
    eligibleForOfficialScoring: false,
    scoringRationale: 'Đánh giá thái độ tôn trọng sự đa dạng văn hóa và kết nối bạn bè.',
    reviewStatus: 'PENDING_ACADEMIC_REVIEW',
    reviewer: null,
    stem: 'Làm thế nào để phối hợp hiệu quả với một bạn học mới chuyển trường đến lớp em?',
    options: [
      'A. Tôn trọng sự khác biệt, chủ động chào hỏi và hỗ trợ bạn hòa nhập',
      'B. Tách biệt xa lánh bạn',
      'C. Trêu chọc giọng nói địa phương của bạn',
      'D. Bỏ mặc không giao tiếp'
    ],
    correctAnswer: 0,
    explanation: 'Năng lực Tinh thần công dân toàn cầu giúp em mở lòng và gắn kết bạn bè!'
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PILOT_SKILL_BOOST };
} else if (typeof window !== 'undefined') {
  window.PILOT_SKILL_BOOST = PILOT_SKILL_BOOST;
}
