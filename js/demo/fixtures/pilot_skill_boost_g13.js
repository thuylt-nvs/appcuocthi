/* ==========================================================================
   NovaStars × NVS Championship — Public Student Pilot Fixture: Grade 1–3 Skill Boost
   v0.2.3 Student Alpha Fixture (Canonical NL1–NL7 Mapped & Plausible Distractors)
   ========================================================================== */

const PILOT_SKILL_BOOST_G13 = [
  {
    itemId: 'pilot_sb_g13_1',
    ageGroup: 'GRADE_1_3',
    primaryCompetencyId: 'NL4',
    linkedCompetencyIds: ['NL3'],
    skillId: 'SKILL_BOOST_G13_PERSUASION',
    skillLabel: 'Giao tiếp, truyền cảm hứng & Thuyết phục',
    indicatorId: null,
    mappingStatus: 'DEMO_PROVISIONAL',
    contentStatus: 'DEMO_PILOT_ONLY',
    eligibleForOfficialScoring: false,
    scoringRationale: 'Đánh giá khả năng đề xuất ý tưởng giữ gìn vệ sinh chung bằng sự truyền cảm hứng.',
    reviewStatus: 'PENDING_ACADEMIC_REVIEW',
    reviewer: null,
    stem: 'Em muốn rủ các bạn cùng giữ vệ sinh lớp học sau giờ chơi, em nên nói thế nào?',
    options: [
      { id: 'opt_a', text: '"Các bạn ơi, mình cùng dọn gọn góc chơi 3 phút để lớp mình đẹp và sạch sẽ nhé!"' },
      { id: 'opt_b', text: '"Yêu cầu tất cả các bạn phải dọn rác ngay lập tức cho mình!"' },
      { id: 'opt_c', text: 'Tự dọn một mình và không nói gì với các bạn trong lớp' },
      { id: 'opt_d', text: 'Báo cô giáo phạt các bạn chưa dọn dẹp' }
    ],
    correctOptionId: 'opt_a',
    explanation: 'Năng lực Giao tiếp, truyền cảm hứng và thuyết phục giúp em kêu gọi sự hợp tác vui vẻ từ bạn bè!'
  },
  {
    itemId: 'pilot_sb_g13_2',
    ageGroup: 'GRADE_1_3',
    primaryCompetencyId: 'NL6',
    linkedCompetencyIds: ['NL2'],
    skillId: 'SKILL_BOOST_G13_ACTION',
    skillLabel: 'Hành động, dám thử & Dám thay đổi',
    indicatorId: null,
    mappingStatus: 'DEMO_PROVISIONAL',
    contentStatus: 'DEMO_PILOT_ONLY',
    eligibleForOfficialScoring: false,
    scoringRationale: 'Đánh giá tinh thần chủ động thử sức khi gặp dạng bài tập tư duy mới.',
    reviewStatus: 'PENDING_ACADEMIC_REVIEW',
    reviewer: null,
    stem: 'Khi gặp một trò chơi đố trí tuệ mới lạ em chưa chơi bao giờ, em nên phản ứng thế nào?',
    options: [
      { id: 'opt_a', text: 'Tự tin đọc hướng dẫn, quan sát mẫu và hào hứng thử chơi vài lần để hiểu cách làm' },
      { id: 'opt_b', text: 'Thấy khó quá nên cất đi luôn và chọn trò chơi quen thuộc cũ' },
      { id: 'opt_c', text: 'Nhờ anh chị làm hộ toàn bộ trò chơi rồi nhận là bài của mình' },
      { id: 'opt_d', text: 'Tức giận vì trò chơi mới không giống trò mình thích' }
    ],
    correctOptionId: 'opt_a',
    explanation: 'Năng lực Hành động, dám thử, dám thay đổi giúp em khám phá nhiều điều mới mẻ!'
  },
  {
    itemId: 'pilot_sb_g13_3',
    ageGroup: 'GRADE_1_3',
    primaryCompetencyId: 'NL5',
    linkedCompetencyIds: ['NL3'],
    skillId: 'SKILL_BOOST_G13_GLOBAL_CITIZEN',
    skillLabel: 'Tinh thần công dân toàn cầu & Trách nhiệm xã hội',
    indicatorId: null,
    mappingStatus: 'DEMO_PROVISIONAL',
    contentStatus: 'DEMO_PILOT_ONLY',
    eligibleForOfficialScoring: false,
    scoringRationale: 'Đánh giá thái độ mở lòng tôn trọng sự đa dạng và mến khách.',
    reviewStatus: 'PENDING_ACADEMIC_REVIEW',
    reviewer: null,
    stem: 'Có một bạn học mới chuyển từ vùng miền khác đến lớp em, em nên đón tiếp bạn thế nào?',
    options: [
      { id: 'opt_a', text: 'Tôn trọng sự khác biệt, chủ động mỉm cười chào hỏi và giới thiệu các góc lớp cho bạn' },
      { id: 'opt_b', text: 'Đợi bạn tự đến nói chuyện với mình chứ không chào trước' },
      { id: 'opt_c', text: 'Tỏ ra ngạc nhiên và chỉ trỏ giọng nói địa phương của bạn' },
      { id: 'opt_d', text: 'Chỉ chơi với nhóm bạn cũ và không tiếp xúc bạn mới' }
    ],
    correctOptionId: 'opt_a',
    explanation: 'Năng lực Tinh thần công dân toàn cầu giúp em tôn trọng sự khác biệt và có thêm nhiều bạn mới!'
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PILOT_SKILL_BOOST_G13 };
} else if (typeof window !== 'undefined') {
  window.PILOT_SKILL_BOOST_G13 = PILOT_SKILL_BOOST_G13;
}
