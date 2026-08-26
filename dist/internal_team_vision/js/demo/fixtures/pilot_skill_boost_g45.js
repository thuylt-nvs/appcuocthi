/* ==========================================================================
   NovaStars × NVS Championship — Public Student Pilot Fixture: Grade 4–5 Skill Boost
   v0.2.3 Student Alpha Fixture (Canonical NL1–NL7 Mapped & Plausible Distractors)
   ========================================================================== */

const PILOT_SKILL_BOOST_G45 = [
  {
    itemId: 'pilot_sb_g45_1',
    ageGroup: 'GRADE_4_5',
    primaryCompetencyId: 'NL4',
    linkedCompetencyIds: ['NL3'],
    skillId: 'SKILL_BOOST_G45_PERSUASION',
    skillLabel: 'Giao tiếp, truyền cảm hứng & Thuyết phục',
    indicatorId: null,
    mappingStatus: 'DEMO_PROVISIONAL',
    contentStatus: 'DEMO_PILOT_ONLY',
    eligibleForOfficialScoring: false,
    scoringRationale: 'Đánh giá khả năng giao tiếp truyền cảm hứng để giải quyết bất đồng ý kiến.',
    reviewStatus: 'PENDING_ACADEMIC_REVIEW',
    reviewer: null,
    stem: 'Trong buổi làm việc nhóm, một bạn đưa ra ý tưởng mà em không đồng ý. Em nên phản hồi thế nào để vừa thể hiện quan điểm vừa giữ cuộc trao đổi tích cực?',
    options: [
      { id: 'opt_a', text: '"Ý tưởng của bạn có điểm thú vị. Tớ có góc nhìn này nữa, mình thử kết hợp cả hai xem sao nhé?"' },
      { id: 'opt_b', text: '"Ý tưởng của bạn không thực tế đâu, làm theo ý tớ cho chắc chắn."' },
      { id: 'opt_c', text: 'Im lặng không đóng góp ý kiến nữa vì thấy nhóm không đồng ý với mình' },
      { id: 'opt_d', text: 'Nhờ thầy cô can thiệp ngay để phân xử xem ai đúng ai sai' }
    ],
    correctOptionId: 'opt_a',
    explanation: 'Năng lực Giao tiếp, truyền cảm hứng và thuyết phục giúp em xây dựng giải pháp chung hài hòa!'
  },
  {
    itemId: 'pilot_sb_g45_2',
    ageGroup: 'GRADE_4_5',
    primaryCompetencyId: 'NL6',
    linkedCompetencyIds: ['NL2'],
    skillId: 'SKILL_BOOST_G45_ACTION',
    skillLabel: 'Hành động, dám thử & Dám thay đổi',
    indicatorId: null,
    mappingStatus: 'DEMO_PROVISIONAL',
    contentStatus: 'DEMO_PILOT_ONLY',
    eligibleForOfficialScoring: false,
    scoringRationale: 'Đánh giá thái độ thích ứng tích cực trước bài tập tình huống thử thách.',
    reviewStatus: 'PENDING_ACADEMIC_REVIEW',
    reviewer: null,
    stem: 'Khi gặp một dạng bài tập tư duy số học và công nghệ chưa từng học trước đây, thái độ nào là phù hợp nhất?',
    options: [
      { id: 'opt_a', text: 'Chủ động phân tích câu hỏi, liên hệ bài cũ và tự tin thử nghiệm các giả thuyết giải khác nhau' },
      { id: 'opt_b', text: 'Bỏ qua câu hỏi đó ngay để đỡ mất thời gian' },
      { id: 'opt_c', text: 'Chép lời giải của bạn khác nếu có thể để bài làm đầy đủ' },
      { id: 'opt_d', text: 'Phàn nàn đề thi khó quá phạm vi học tập' }
    ],
    correctOptionId: 'opt_a',
    explanation: 'Năng lực Hành động, dám thử, dám thay đổi giúp em rèn tư duy chủ động trước mọi thử thách!'
  },
  {
    itemId: 'pilot_sb_g45_3',
    ageGroup: 'GRADE_4_5',
    primaryCompetencyId: 'NL5',
    linkedCompetencyIds: ['NL3'],
    skillId: 'SKILL_BOOST_G45_GLOBAL_CITIZEN',
    skillLabel: 'Tinh thần công dân toàn cầu & Trách nhiệm xã hội',
    indicatorId: null,
    mappingStatus: 'DEMO_PROVISIONAL',
    contentStatus: 'DEMO_PILOT_ONLY',
    eligibleForOfficialScoring: false,
    scoringRationale: 'Đánh giá tinh thần tôn trọng sự đa dạng văn hóa và chủ động hợp tác tích cực.',
    reviewStatus: 'PENDING_ACADEMIC_REVIEW',
    reviewer: null,
    stem: 'Làm thế nào để phối hợp ăn ý với một bạn học mới chuyển trường từ một tỉnh thành khác đến nhóm em?',
    options: [
      { id: 'opt_a', text: 'Tôn trọng sự khác biệt vùng miền, chủ động chia sẻ thông tin nhóm và lắng nghe ý kiến của bạn' },
      { id: 'opt_b', text: 'Phân công việc phụ cho bạn mới vì sợ bạn chưa quen công việc chung' },
      { id: 'opt_c', text: 'Trêu chọc thói quen và giọng nói khác biệt của bạn' },
      { id: 'opt_d', text: 'Không chủ động trò chuyện trừ khi bạn lên tiếng trước' }
    ],
    correctOptionId: 'opt_a',
    explanation: 'Năng lực Tinh thần công dân toàn cầu giúp em mở rộng góc nhìn và gắn kết đồng đội!'
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PILOT_SKILL_BOOST_G45 };
} else if (typeof window !== 'undefined') {
  window.PILOT_SKILL_BOOST_G45 = PILOT_SKILL_BOOST_G45;
}
