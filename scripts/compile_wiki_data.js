const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const outputPath = path.join(rootDir, 'js', 'data', 'wiki_data.js');

const docsConfig = [
  { id: '00_index', title: '00. Mục Lục & Mô Hình Tư Duy', icon: '📑', file: 'wiki/00_INDEX.md', group: 'Tổng Quan' },
  { id: 'agents', title: 'AGENTS.md — Root Context Hub', icon: '🤖', file: 'AGENTS.md', group: 'Tổng Quan' },
  { id: 'readme', title: 'README — Giới Thiệu Dự Án', icon: '🚀', file: 'README.md', group: 'Tổng Quan' },
  { id: '01_competency', title: '01. Khung Năng Lực NVS (NL1–NL7)', icon: '🎯', file: 'wiki/01_COMPETENCY_FRAMEWORK.md', group: 'Domain Core' },
  { id: '02_game_rules', title: '02. Luật Game & Chu Trình Học', icon: '🔄', file: 'wiki/02_GAME_RULES_AND_LEARNING_LOOP.md', group: 'Domain Core' },
  { id: '03_question_bank', title: '03. Ngân Hàng Câu Hỏi & Pipeline', icon: '🧩', file: 'wiki/03_QUESTION_BANK_AND_PIPELINE.md', group: 'Domain Core' },
  { id: '04_exam_engine', title: '04. Động Cơ Phòng Thi & Chấm Điểm', icon: '📐', file: 'wiki/04_EXAM_ENGINE_SCORING_AND_BLUEPRINT.md', group: 'Động Cơ & Dữ Liệu' },
  { id: '05_telemetry', title: '05. Telemetry & Quản Lý Trạng Thái', icon: '📡', file: 'wiki/05_TELEMETRY_ANALYTICS_AND_STATE.md', group: 'Động Cơ & Dữ Liệu' },
  { id: '06_invariants', title: '06. 20 ADRs & Rào Chắn Bất Biến', icon: '🛡️', file: 'wiki/06_INVARIANTS_AND_ADR_GUARDRAILS.md', group: 'Quy Chuẩn & Vận Hành' },
  { id: '07_playbook', title: '07. Sổ Tay Tác Chiến AI Agent', icon: '💻', file: 'wiki/07_AI_AGENT_OPERATIONAL_PLAYBOOK.md', group: 'Quy Chuẩn & Vận Hành' }
];

const wikiData = {
  version: '1.0.0',
  generatedAt: new Date().toISOString(),
  documents: []
};

docsConfig.forEach(item => {
  const fullPath = path.join(rootDir, item.file);
  if (fs.existsSync(fullPath)) {
    const rawContent = fs.readFileSync(fullPath, 'utf-8');
    wikiData.documents.push({
      id: item.id,
      title: item.title,
      icon: item.icon,
      group: item.group,
      filePath: item.file,
      content: rawContent
    });
    console.log(`✅ Loaded: ${item.file} (${rawContent.length} chars)`);
  } else {
    console.error(`❌ File not found: ${fullPath}`);
  }
});

const fileContent = `/**
 * NovaStars x NVS Championship — Compiled Wiki Data Bundle
 * Generated automatically by scripts/compile_wiki_data.js
 */
window.WIKI_DATA = ${JSON.stringify(wikiData, null, 2)};
`;

fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log(`\n🎉 Successfully generated: ${outputPath} (${wikiData.documents.length} documents)`);
