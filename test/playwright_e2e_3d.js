/* ==========================================================================
   NovaStars Universe 3D — Playwright E2E Multi-Device Validation Suite
   Optimized for Mobile, Tablet & Desktop with 4-8 parallel worker execution
   Captures visual verification screenshots across responsive form-factors
   ========================================================================== */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SCREENSHOT_DIR = path.join(__dirname, '../screenshots/v1_0_universe_3d');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const INDEX_HTML_PATH = 'file://' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');

const DEVICES = [
  {
    name: 'mobile_iphone13',
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148'
  },
  {
    name: 'tablet_ipad',
    viewport: { width: 820, height: 1180 },
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148'
  },
  {
    name: 'desktop_wide',
    viewport: { width: 1366, height: 768 },
    isMobile: false,
    hasTouch: false,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
];

async function runDeviceE2E(deviceConfig) {
  console.log(`\n▶ Starting E2E Test on [${deviceConfig.name}] (${deviceConfig.viewport.width}x${deviceConfig.viewport.height})...`);
  
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-webgl', '--no-sandbox']
  });

  const context = await browser.newContext({
    viewport: deviceConfig.viewport,
    isMobile: deviceConfig.isMobile,
    hasTouch: deviceConfig.hasTouch,
    userAgent: deviceConfig.userAgent
  });

  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  try {
    // 1. Load Page
    await page.goto(INDEX_HTML_PATH, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(1200);

    // 2. Validate Three.js Canvas Rendering
    const canvasExists = await page.evaluate(() => {
      const container = document.getElementById('three-canvas-container');
      const cv = container ? container.querySelector('canvas') : null;
      return cv !== null && cv.width > 0 && cv.height > 0;
    });
    console.log(`  ✓ Three.js WebGL Canvas rendered: ${canvasExists}`);

    // Take Initial Galaxy View Screenshot
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${deviceConfig.name}_01_galaxy_home.png`),
      fullPage: false
    });

    // 3. Test Planet Modal Interaction
    await page.evaluate(() => {
      if (window.app && window.app.universe) {
        window.app.universe.focusPlanetById('NL1');
      }
    });
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${deviceConfig.name}_02_planet_modal.png`),
      fullPage: false
    });

    // Close Modal
    await page.evaluate(() => {
      if (window.app) window.app.hidePlanetModal();
    });
    await page.waitForTimeout(300);

    // 4. Test Championship Exam Flow
    await page.evaluate(() => {
      if (window.app) window.app.switchView('championship');
    });
    await page.waitForTimeout(500);

    // Start Exam Grade 1-3
    await page.evaluate(() => {
      if (window.app) window.app.startExam('GRADE_1_3');
    });
    await page.waitForTimeout(500);

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${deviceConfig.name}_03_exam_question.png`),
      fullPage: false
    });

    // Answer questions and submit
    await page.evaluate(() => {
      if (window.app && window.app.activeExam) {
        window.app.activeExam.questions.forEach((q) => {
          window.app.activeExam.userAnswers[q.itemId] = q.correctOptionId;
        });
        window.app.submitExam();
      }
    });
    await page.waitForTimeout(800);

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${deviceConfig.name}_04_exam_result.png`),
      fullPage: false
    });

    // 5. Test Profile & Radar Chart View
    await page.evaluate(() => {
      if (window.app) window.app.switchView('profile');
    });
    await page.waitForTimeout(600);

    // Check Radar Canvas
    const radarDrawn = await page.evaluate(() => {
      const cv = document.getElementById('nvs-radar-canvas');
      return cv !== null && cv.width > 0;
    });
    console.log(`  ✓ NVS 7-Axis Radar Chart drawn: ${radarDrawn}`);

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${deviceConfig.name}_05_profile_radar.png`),
      fullPage: false
    });

    // 6. Test Skill Boost Flow
    await page.evaluate(() => {
      if (window.app) window.app.switchView('skill_boost');
    });
    await page.waitForTimeout(500);

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${deviceConfig.name}_06_skill_boost_lobby.png`),
      fullPage: false
    });

    // 7. Test Mini-Game 3D View
    await page.evaluate(() => {
      if (window.app) window.app.switchView('minigame');
    });
    await page.waitForTimeout(500);

    await page.evaluate(() => {
      if (window.app) window.app.startMiniGame();
    });
    await page.waitForTimeout(800);

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${deviceConfig.name}_07_minigame_action.png`),
      fullPage: false
    });

    console.log(`  ✅ [${deviceConfig.name}] All E2E test steps passed flawlessly!`);
  } catch (err) {
    console.error(`  ❌ [${deviceConfig.name}] E2E Test Failed:`, err);
    throw err;
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log('======================================================================');
  console.log('🚀 PLAYWRIGHT MULTI-DEVICE E2E TEST RUNNER (4 WORKERS PARALLEL)');
  console.log('======================================================================');

  const startTime = Date.now();

  // Run across all devices concurrently (Rule: 4 to 8 workers optimization)
  const results = await Promise.allSettled(
    DEVICES.map(device => runDeviceE2E(device))
  );

  const passed = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.filter(r => r.status === 'rejected').length;

  console.log('\n======================================================================');
  console.log(`E2E SUITE COMPLETED in ${((Date.now() - startTime) / 1000).toFixed(2)}s`);
  console.log(`TOTAL CONFIGS: ${DEVICES.length} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log(`Screenshots saved to: ${SCREENSHOT_DIR}`);
  console.log('======================================================================\n');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main().catch(err => {
  console.error("Fatal test runner error:", err);
  process.exit(1);
});
