/* ==========================================================================
   NovaStars × NVS Championship — Public Student Pilot Fixture: Grade 4–5 Exam
   v0.2.3A Student Alpha Fixture (Canonical NL1–NL7 Mapped & Corrected Copy)
   ========================================================================== */

const PILOT_EXAM_G45 = [
  {
    itemId: 'pilot_g45_e1',
    ageGroup: 'GRADE_4_5',
    primaryCompetencyId: 'NL6',
    linkedCompetencyIds: ['NL4'],
    skillId: 'SKILL_G45_TEAM_ACTION',
    skillLabel: 'Lập kế hoạch & Tổ chức công việc nhóm',
    indicatorId: null,
    mappingStatus: 'DEMO_PROVISIONAL',
    contentStatus: 'DEMO_PILOT_ONLY',
    eligibleForOfficialScoring: false,
    scoringRationale: 'Đánh giá kỹ năng chủ động lập kế hoạch và phân công nhiệm vụ phù hợp với mục tiêu nhóm.',
    reviewStatus: 'PENDING_ACADEMIC_REVIEW',
    reviewer: null,
    stem: 'Để chuẩn bị bài thuyết trình dự án xanh của nhóm trong 3 ngày tới, bước đầu tiên hiệu quả nhất là gì?',
    options: [
      { id: 'opt_a', text: 'Thảo luận mục tiêu chung, liệt kê các việc cần làm và phân công phù hợp năng lực từng bạn' },
      { id: 'opt_b', text: 'Dành toàn bộ thời gian ngày đầu để trang trí hình ảnh Slide trước rồi mới phân công nội dung' },
      { id: 'opt_c', text: 'Nhất trí giao toàn bộ việc tìm tài liệu và tổng hợp cho nhóm trưởng làm hộ cả nhóm' },
      { id: 'opt_d', text: 'Chờ đến buổi tối trước ngày nộp mới gặp nhau làm gấp cho kịp hạn' }
    ],
    correctOptionId: 'opt_a'
  },
  {
    itemId: 'pilot_g45_e2',
    ageGroup: 'GRADE_4_5',
    primaryCompetencyId: 'NL4',
    linkedCompetencyIds: ['NL3'],
    skillId: 'SKILL_G45_PERSUASION_CONFLICT',
    skillLabel: 'Giao tiếp, truyền cảm hứng & Giải quyết bất đồng',
    indicatorId: null,
    mappingStatus: 'DEMO_PROVISIONAL',
    contentStatus: 'DEMO_PILOT_ONLY',
    eligibleForOfficialScoring: false,
    scoringRationale: 'Đánh giá khả năng giao tiếp thuyết phục và thấu hiểu khi có sự khác biệt ý kiến.',
    reviewStatus: 'PENDING_ACADEMIC_REVIEW',
    reviewer: null,
    stem: 'Trong buổi thảo luận nhóm, một bạn đề xuất giải pháp mà em thấy chưa thật sự tối ưu. Em nên trao đổi thế nào?',
    options: [
      { id: 'opt_a', text: '"Tớ lắng nghe góc nhìn của bạn. Tớ có thêm một hướng tiếp cận này, mình cùng so sánh hai cách nhé?"' },
      { id: 'opt_b', text: '"Phương án của bạn hoàn toàn không phù hợp, làm theo cách của tớ hiệu quả hơn hẳn."' },
      { id: 'opt_c', text: 'Im lặng không nói gì vì không muốn tranh luận, nhưng trong lòng thấy bất mãn' },
      { id: 'opt_d', text: 'Bỏ qua ý kiến đó và chuyển ngay sang hỏi bạn khác để thay đổi chủ đề' }
    ],
    correctOptionId: 'opt_a'
  },
  {
    itemId: 'pilot_g45_e3',
    ageGroup: 'GRADE_4_5',
    primaryCompetencyId: 'NL7',
    linkedCompetencyIds: ['NL2'],
    skillId: 'SKILL_G45_DATA_AI_LITERACY',
    skillLabel: 'Kĩ năng công nghệ, dữ liệu số & AI',
    indicatorId: null,
    mappingStatus: 'DEMO_PROVISIONAL',
    contentStatus: 'DEMO_PILOT_ONLY',
    eligibleForOfficialScoring: false,
    scoringRationale: 'Đánh giá năng lực phân tích dữ liệu trực tuyến khách quan và tránh kết luận vội vã.',
    reviewStatus: 'PENDING_ACADEMIC_REVIEW',
    reviewer: null,
    stem: 'Khi thu thập 100 phiếu khảo sát trực tuyến về thói quen đọc sách của học sinh, kết luận nào có căn cứ dữ liệu chính xác nhất?',
    options: [
      { id: 'opt_a', text: '"Có 85/100 học sinh tham gia khảo sát cho biết các bạn đọc sách ít nhất 20 phút mỗi ngày."' },
      { id: 'opt_b', text: '"Tất cả học sinh trong toàn trường đều rất thích đọc sách hằng ngày."' },
      { id: 'opt_c', text: '"Công cụ AI khẳng định 100% học sinh hiện nay không còn quan tâm tới sách in."' },
      { id: 'opt_d', text: '"Dữ liệu khảo sát không quan trọng, chỉ cần chọn con số nào nghe ấn tượng nhất."' }
    ],
    correctOptionId: 'opt_a'
  },
  {
    itemId: 'pilot_g45_e4',
    ageGroup: 'GRADE_4_5',
    primaryCompetencyId: 'NL5',
    linkedCompetencyIds: [],
    skillId: 'SKILL_G45_GLOBAL_CITIZEN',
    skillLabel: 'Tinh thần công dân toàn cầu & Trách nhiệm xã hội',
    indicatorId: null,
    mappingStatus: 'DEMO_PROVISIONAL',
    contentStatus: 'DEMO_PILOT_ONLY',
    eligibleForOfficialScoring: false,
    scoringRationale: 'Đánh giá ý thức trách nhiệm cộng đồng và tiết kiệm tài nguyên môi trường.',
    reviewStatus: 'PENDING_ACADEMIC_REVIEW',
    reviewer: null,
    stem: 'Hành động nào thể hiện tinh thần công dân có trách nhiệm với môi trường sống hằng ngày?',
    options: [
      { id: 'opt_a', text: 'Chủ động tắt các thiết bị điện khi không sử dụng và phân loại rác tái chế đúng nơi quy định' },
      { id: 'opt_b', text: 'Chỉ thu gom rác khi có hoạt động phát động thi đua của trường' },
      { id: 'opt_c', text: 'Bật máy điều hòa cả ngày trong phòng trống vì nghĩ rằng tiền điện gia đình tự trả' },
      { id: 'opt_d', text: 'Dùng túi nilon một lần cho tiện vì thấy mọi người xung quanh vẫn dùng' }
    ],
    correctOptionId: 'opt_a'
  },
  {
    itemId: 'pilot_g45_e5',
    ageGroup: 'GRADE_4_5',
    primaryCompetencyId: 'NL6',
    linkedCompetencyIds: ['NL2'],
    skillId: 'SKILL_G45_ADAPTABILITY_TIME',
    skillLabel: 'Hành động, thích ứng & Quản lý thời gian',
    indicatorId: null,
    mappingStatus: 'DEMO_PROVISIONAL',
    contentStatus: 'DEMO_PILOT_ONLY',
    eligibleForOfficialScoring: false,
    scoringRationale: 'Đánh giá khả năng làm chủ bản thân và thích ứng khi gặp áp lực thời gian.',
    reviewStatus: 'PENDING_ACADEMIC_REVIEW',
    reviewer: null,
    stem: 'Nếu thời gian làm bài thi rèn luyện còn 5 phút và còn 2 câu hỏi khó chưa làm, em nên xử lý thế nào?',
    options: [
      { id: 'opt_a', text: 'Giữ bình tĩnh, rà soát lại đề và ưu tiên câu em có hướng giải rõ nhất và khả năng làm đúng cao hơn' },
      { id: 'opt_b', text: 'Dành trọn 5 phút cố giải bằng được câu cực khó đầu tiên bất chấp thời gian' },
      { id: 'opt_c', text: 'Chọn ngẫu nhiên đáp án cho cả 2 câu mà không đọc kỹ nội dung đề' },
      { id: 'opt_d', text: 'Dừng làm bài và nộp ngay để khỏi phải suy nghĩ tiếp' }
    ],
    correctOptionId: 'opt_a'
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PILOT_EXAM_G45 };
} else if (typeof window !== 'undefined') {
  window.PILOT_EXAM_G45 = PILOT_EXAM_G45;
}
