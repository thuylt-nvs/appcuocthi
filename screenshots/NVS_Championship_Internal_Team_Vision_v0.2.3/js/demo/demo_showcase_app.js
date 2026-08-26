/* ==========================================================================
   NovaStars × NVS Championship — Demo Showcase Bootstrapper
   v0.2 Mode Dispatcher: TEAM MODE (?mode=team) vs STUDENT MODE (?mode=student)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const mode = (urlParams.get('mode') || '').toLowerCase();

  if (mode === 'team') {
    window.DEMO_SHOWCASE = true;
    const showcaseController = new DemoShowcaseController();
    showcaseController.init();

    const targetScreen = urlParams.get('screen') || urlParams.get('step');
    if (targetScreen) {
      showcaseController.jumpToScreen(targetScreen);
    }
  } else {
    // Default public pilot mode: STUDENT_MODE
    window.DEMO_SHOWCASE = false;
    const studentController = new DemoStudentController();
    studentController.init();
  }
});
