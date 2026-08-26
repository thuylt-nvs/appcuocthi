/* ==========================================================================
   NovaStars × NVS Championship — Public Student Pilot Fixture: Grade 1–3 Exam
   v0.2.3 Student Alpha Fixture (Canonical NL1–NL7 Mapped & Plausible Distractors)
   ========================================================================== */

const PILOT_EXAM_G13 = [
  {
    itemId: 'pilot_g13_e1',
    ageGroup: 'GRADE_1_3',
    primaryCompetencyId: 'NL6',
    linkedCompetencyIds: ['NL2'],
    skillId: 'SKILL_G13_SELF_INITIATIVE',
    skillLabel: 'Hành động & Tự giác cá nhân',
    indicatorId: null,
    mappingStatus: 'DEMO_PROVISIONAL',
    contentStatus: 'DEMO_PILOT_ONLY',
    eligibleForOfficialScoring: false,
    scoringRationale: 'Đánh giá tinh thần tự giác và chủ động chuẩn bị công việc học tập cá nhân.',
    reviewStatus: 'PENDING_ACADEMIC_REVIEW',
    reviewer: null,
    stem: 'Khi chuẩn bị góc học tập buổi tối ở nhà, làm thế nào để em vào học chủ động nhất?',
    options: [
      { id: 'opt_a', text: 'Chủ động sắp xếp lại bàn học gọn gàng và soạn sẵn sách vở theo thời khóa biểu' },
      { id: 'opt_b', text: 'Bật máy tính xem phim một lúc rồi mới vừa xem vừa lật mở sách vở' },
      { id: 'opt_c', text: 'Đợi đến khi bố mẹ phải nhắc lần thứ ba mới bắt đầu gom sách vở' },
      { id: 'opt_d', text: 'Nhờ người thân soạn giúp sách vở vào cặp cho nhanh để ngồi chơi' }
    ],
    correctOptionId: 'opt_a'
  },
  {
    itemId: 'pilot_g13_e2',
    ageGroup: 'GRADE_1_3',
    primaryCompetencyId: 'NL3',
    linkedCompetencyIds: ['NL4'],
    skillId: 'SKILL_G13_EMPATHY_FRIENDSHIP',
    skillLabel: 'Trí tuệ cảm xúc & Kết nối bạn bè',
    indicatorId: null,
    mappingStatus: 'DEMO_PROVISIONAL',
    contentStatus: 'DEMO_PILOT_ONLY',
    eligibleForOfficialScoring: false,
    scoringRationale: 'Đánh giá khả năng nhận biết cảm xúc và chia sẻ, giúp đỡ bạn học tích cực.',
    reviewStatus: 'PENDING_ACADEMIC_REVIEW',
    reviewer: null,
    stem: 'Khi thấy bạn ngồi bên cạnh đang buồn lo vì làm mất bút vẽ trước giờ tô màu, em nên chọn cách ứng xử nào?',
    options: [
      { id: 'opt_a', text: 'Đến hỏi thăm nhẹ nhàng, cho bạn mượn bút dùng chung và cùng tìm giúp bạn' },
      { id: 'opt_b', text: 'Chỉ tay báo thầy cô ngay lập tức chứ không tự mình trao đổi hay hỏi thăm bạn' },
      { id: 'opt_c', text: 'Tập trung tô màu bài của mình và bảo bạn tự giải quyết vì không phải việc của mình' },
      { id: 'opt_d', text: 'Nhìn bạn cười rồi nói "Sao bạn không cẩn thận gì cả"' }
    ],
    correctOptionId: 'opt_a'
  },
  {
    itemId: 'pilot_g13_e3',
    ageGroup: 'GRADE_1_3',
    primaryCompetencyId: 'NL5',
    linkedCompetencyIds: ['NL1'],
    skillId: 'SKILL_G13_CITIZENSHIP_ENV',
    skillLabel: 'Trách nhiệm cộng đồng & Giữ gìn môi trường',
    indicatorId: null,
    mappingStatus: 'DEMO_PROVISIONAL',
    contentStatus: 'DEMO_PILOT_ONLY',
    eligibleForOfficialScoring: false,
    scoringRationale: 'Đánh giá hành động giữ gìn không gian chung trường học hằng ngày.',
    reviewStatus: 'PENDING_ACADEMIC_REVIEW',
    reviewer: null,
    stem: 'Sau giờ ra chơi, em thấy một vỏ bọc bánh rơi trên lối đi chung ngoài hành lang. Hành động nào là phù hợp nhất?',
    options: [
      { id: 'opt_a', text: 'Nhặt bọc bánh bỏ vào thùng rác gần nhất để giữ hành lang luôn sạch đẹp' },
      { id: 'opt_b', text: 'Bước qua rác và nghĩ rằng chút nữa bác bảo vệ sẽ dọn dẹp' },
      { id: 'opt_c', text: 'Gạt bọc bánh sang sát góc tường để mọi người không dẫm vào' },
      { id: 'opt_d', text: 'Nhắc bạn đi sau nhặt hộ mình vì mình đang vội vào lớp' }
    ],
    correctOptionId: 'opt_a'
  },
  {
    itemId: 'pilot_g13_e4',
    ageGroup: 'GRADE_1_3',
    primaryCompetencyId: 'NL4',
    linkedCompetencyIds: ['NL3'],
    skillId: 'SKILL_G13_COMMUNICATION_RESPECT',
    skillLabel: 'Giao tiếp & Tôn trọng góc nhìn',
    indicatorId: null,
    mappingStatus: 'DEMO_PROVISIONAL',
    contentStatus: 'DEMO_PILOT_ONLY',
    eligibleForOfficialScoring: false,
    scoringRationale: 'Đánh giá kỹ năng giao tiếp tôn trọng khi trao đổi thảo luận nhóm.',
    reviewStatus: 'PENDING_ACADEMIC_REVIEW',
    reviewer: null,
    stem: 'Khi thảo luận chọn chủ đề vẽ tranh nhóm, bạn đưa ra ý tưởng khác với suy nghĩ của em, em nên làm gì?',
    options: [
      { id: 'opt_a', text: 'Lắng nghe bạn giải thích hết ý tưởng, sau đó nhẹ nhàng chia sẻ suy nghĩ của mình để cùng chọn' },
      { id: 'opt_b', text: 'Ngắt lời bạn ngay và khẳng định ý tưởng của mình đẹp hơn hẳn' },
      { id: 'opt_c', text: 'Im lặng không phát biểu nữa vì bạn không chọn cùng ý với mình' },
      { id: 'opt_d', text: 'Đồng ý ngay lập tức cho xong chuyện dù mình thấy ý đó chưa phù hợp' }
    ],
    correctOptionId: 'opt_a'
  },
  {
    itemId: 'pilot_g13_e5',
    ageGroup: 'GRADE_1_3',
    primaryCompetencyId: 'NL2',
    linkedCompetencyIds: ['NL6'],
    skillId: 'SKILL_G13_LIFELONG_LEARNING',
    skillLabel: 'Tư duy học tập suốt đời & Cải tiến',
    indicatorId: null,
    mappingStatus: 'DEMO_PROVISIONAL',
    contentStatus: 'DEMO_PILOT_ONLY',
    eligibleForOfficialScoring: false,
    scoringRationale: 'Đánh giá thái độ tự giác học hỏi và rút kinh nghiệm sau khi thử nghiệm.',
    reviewStatus: 'PENDING_ACADEMIC_REVIEW',
    reviewer: null,
    stem: 'Thói quen học tập tích cực giúp em ngày càng tiến bộ được thể hiện qua chuỗi hành động nào?',
    options: [
      { id: 'opt_a', text: 'Tập trung nghe giảng -> Tự thử nghiệm làm bài -> Rút kinh nghiệm từ lỗi sai -> Cải tiến lần sau' },
      { id: 'opt_b', text: 'Chỉ học khi có kỳ thi -> Đọc lướt đáp án -> Không xem lại các câu mình làm chưa đúng' },
      { id: 'opt_c', text: 'Làm thật nhanh cho xong -> Không cần kiểm tra lại bài -> Chờ cô sửa bài rồi chép lại' },
      { id: 'opt_d', text: 'Nhờ người khác giảng hộ ngay khi vừa đọc đề chứ không tự suy nghĩ thử trước' }
    ],
    correctOptionId: 'opt_a'
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PILOT_EXAM_G13 };
} else if (typeof window !== 'undefined') {
  window.PILOT_EXAM_G13 = PILOT_EXAM_G13;
}
