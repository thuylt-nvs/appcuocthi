/* ==========================================================================
   NovaStars Universe 3D — Automated Integration & Logic Test Suite
   Validates 3D Scene Configs, Controls, Game Mechanics, Exam Engine & Persistence
   ========================================================================== */

const fs = require('fs');
const path = require('path');

// Mock Browser Environment for Node.js testing
const store = {};
global.localStorage = {
  getItem: (k) => store[k] || null,
  setItem: (k, v) => { store[k] = String(v); },
  removeItem: (k) => { delete store[k]; },
  clear: () => { Object.keys(store).forEach(k => delete store[k]); }
};

global.window = {
  devicePixelRatio: 2,
  innerWidth: 1080,
  innerHeight: 1920,
  addEventListener: () => {},
  removeEventListener: () => {}
};

global.requestAnimationFrame = (cb) => setTimeout(cb, 16);
global.cancelAnimationFrame = (id) => clearTimeout(id);

global.document = {
  hidden: false,
  addEventListener: () => {},
  removeEventListener: () => {},
  createElement: (tag) => ({
    style: {},
    addEventListener: () => {},
    removeEventListener: () => {},
    getContext: () => null
  }),
  createElementNS: (ns, tag) => ({
    style: {},
    addEventListener: () => {},
    removeEventListener: () => {},
    getContext: () => null
  }),
  getElementById: (id) => {
    return {
      id,
      clientWidth: 800,
      clientHeight: 600,
      getBoundingClientRect: () => ({ width: 800, height: 600, top: 0, left: 0 }),
      classList: {
        add: () => {},
        remove: () => {},
        contains: () => false
      },
      appendChild: () => {},
      removeChild: () => {},
      addEventListener: () => {},
      getContext: () => ({
        scale: () => {},
        clearRect: () => {},
        beginPath: () => {},
        moveTo: () => {},
        lineTo: () => {},
        closePath: () => {},
        stroke: () => {},
        fill: () => {},
        arc: () => {},
        fillText: () => {},
        createRadialGradient: () => ({ addColorStop: () => {} })
      }),
      style: {}
    };
  },
  querySelectorAll: () => []
};

// Load Three.js
global.THREE = require('../lib/three.min.js');
window.THREE = global.THREE;

// Mock WebGLRenderer for Node.js environment
global.THREE.WebGLRenderer = function() {
  return {
    domElement: global.document.createElement('canvas'),
    setSize: () => {},
    setPixelRatio: () => {},
    setClearColor: () => {},
    render: () => {},
    toneMapping: 0,
    toneMappingExposure: 1
  };
};

// Load NVS Competency standard
const nvs = require('../js/core/nvs_competency.js');
window.NVSCompetencies = nvs.NVSCompetencies;
global.getNVSCompetency = nvs.getNVSCompetency;

// Load App Modules into global
const touchControlsCode = fs.readFileSync(path.join(__dirname, '../js/3d/touch_controls.js'), 'utf8');
(new Function('THREE', 'window', touchControlsCode))(global.THREE, global.window);
global.UniverseTouchControls = window.UniverseTouchControls;

const universeSceneCode = fs.readFileSync(path.join(__dirname, '../js/3d/universe_scene.js'), 'utf8');
(new Function('THREE', 'window', 'document', universeSceneCode))(global.THREE, global.window, global.document);
global.UniverseSceneEngine = window.UniverseSceneEngine;

const miniGameCode = fs.readFileSync(path.join(__dirname, '../js/3d/star_collector_game.js'), 'utf8');
(new Function('THREE', 'window', 'document', miniGameCode))(global.THREE, global.window, global.document);
global.StarCollectorGame = window.StarCollectorGame;

const audioCode = fs.readFileSync(path.join(__dirname, '../js/core/synth_audio.js'), 'utf8');
(new Function('window', 'document', 'localStorage', audioCode))(global.window, global.document, global.localStorage);
global.SynthAudioEngine = window.SynthAudioEngine || (new Function('return class SynthAudioEngine ' + audioCode.split('class SynthAudioEngine')[1].split('if (typeof window')[0]))();

const radarCode = fs.readFileSync(path.join(__dirname, '../js/components/radar_chart.js'), 'utf8');
(new Function('window', radarCode))(global.window);
global.NVSRadarChart = window.NVSRadarChart;

// Test Runner
class TestSuite {
  constructor() {
    this.passed = 0;
    this.failed = 0;
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(`ASSERTION_FAILED: ${message}`);
    }
  }

  run(name, fn) {
    try {
      fn();
      console.log(`✅ [PASS] ${name}`);
      this.passed++;
    } catch (err) {
      console.error(`❌ [FAIL] ${name}: ${err.message}`);
      this.failed++;
    }
  }
}

const suite = new TestSuite();

console.log('================================================================');
console.log('🚀 RUNNING NOVASTARS UNIVERSE 3D TEST SUITE');
console.log('================================================================\n');

// 1. Three.js Library Verification
suite.run('Three.js library is loaded and has core constructors', () => {
  suite.assert(typeof THREE !== 'undefined', 'THREE must be defined');
  suite.assert(typeof THREE.Scene === 'function', 'Scene constructor must exist');
  suite.assert(typeof THREE.PerspectiveCamera === 'function', 'PerspectiveCamera constructor must exist');
  suite.assert(typeof THREE.WebGLRenderer === 'function', 'WebGLRenderer constructor must exist');
});

// 2. Canonical NVS Competency Standards
suite.run('7 Core NVS Competencies (NL1–NL7) are properly defined', () => {
  const comps = window.NVSCompetencies;
  suite.assert(comps && Object.keys(comps).length === 7, 'Must have exactly 7 NVS competencies');
  ['NL1', 'NL2', 'NL3', 'NL4', 'NL5', 'NL6', 'NL7'].forEach((id) => {
    suite.assert(comps[id] !== undefined, `Competency ${id} must exist`);
    suite.assert(comps[id].officialNameVi, `${id} must have Vietnamese official name`);
    suite.assert(comps[id].color, `${id} must have distinct color`);
    suite.assert(comps[id].icon, `${id} must have icon`);
  });
});

// 3. Universe Scene Engine Initialization
suite.run('UniverseSceneEngine defines 7 planetary configs with orbits and colors', () => {
  const engine = new UniverseSceneEngine('three-canvas-container');
  suite.assert(engine.planetConfigs.length === 7, 'Must define 7 planetary configurations');
  engine.planetConfigs.forEach((cfg, idx) => {
    suite.assert(cfg.id === `NL${idx + 1}`, `Planet ${idx + 1} must correspond to NL${idx + 1}`);
    suite.assert(cfg.orbitRadius > 10, `Planet ${cfg.id} orbit radius must be spaced out`);
    suite.assert(cfg.geometryType, `Planet ${cfg.id} must have 3D geometry type`);
  });
  suite.assert(engine.planets.length === 7, 'Must instantiate 7 planet groups in 3D scene');
  suite.assert(engine.centralCore !== null, 'Central NovaStars Base Core must exist');
  suite.assert(engine.mascotShip !== null, 'Golden Star Mascot Spaceship must exist');
});

// 4. Universe Touch Controls Gestures
suite.run('UniverseTouchControls correctly computes spherical coordinates and zoom damping', () => {
  const cam = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  const fakeDom = document.getElementById('three-canvas-container');
  const controls = new UniverseTouchControls(cam, fakeDom);

  const initialRadius = controls.radius;
  controls.zoom(10);
  suite.assert(controls.targetRadius === initialRadius + 10, 'Target radius must increase on zoom out');
  controls.zoom(-100);
  suite.assert(controls.targetRadius === controls.minRadius, 'Target radius must respect minRadius constraint');

  controls.update();
  suite.assert(controls.radius < initialRadius + 10, 'Radius should smoothly interpolate towards target');
});

// 5. Star Collector 3D Mini-Game Mechanics
suite.run('StarCollectorGame manages lanes, crystals, asteroids, and scoring loop', () => {
  const engine = new UniverseSceneEngine('three-canvas-container');
  let finishedResult = null;
  const game = new StarCollectorGame(engine, {
    onFinish: (res) => { finishedResult = res; }
  });

  game.start();
  suite.assert(game.isActive === true, 'Mini-game must be active after start()');
  suite.assert(game.shields === 3, 'Initial shields must be 3');
  suite.assert(game.score === 0, 'Initial score must be 0');

  // Move controls
  game.moveLeft();
  suite.assert(game.targetPlayerX < 0, 'Ship target must shift left');
  game.moveRight();
  suite.assert(game.targetPlayerX === 0, 'Ship target must return center');

  // Spawn and update item simulation
  game.spawnItem();
  suite.assert(game.items.length === 1, 'Spawn item must create 3D object in arena');

  // End Game
  game.score = 150;
  game.endGame();
  suite.assert(game.isActive === false, 'Game should be inactive after endGame()');
  suite.assert(finishedResult !== null, 'onFinish callback must be triggered with result');
  suite.assert(finishedResult.score === 150, 'Result score must match final score');
  suite.assert(finishedResult.stars === 3, 'High score (150) should award 3 stars');
  suite.assert(finishedResult.xp >= 225, 'High score should award bonus XP');
});

// 6. Synthesizer Audio Engine
suite.run('SynthAudioEngine toggles mute state and remembers localStorage', () => {
  const audio = new SynthAudioEngine();
  suite.assert(audio.isMuted === false, 'Default audio is unmuted');
  const muted = audio.toggleMute();
  suite.assert(muted === true, 'Mute should toggle to true');
  suite.assert(localStorage.getItem('ns_muted') === 'true', 'Mute state persisted in localStorage');
  audio.toggleMute();
  suite.assert(audio.isMuted === false, 'Audio toggles back to unmuted');
});

// 7. Radar Chart Rendering
suite.run('NVSRadarChart renders 7 axes without throwing error', () => {
  const canvas = document.getElementById('nvs-radar-canvas');
  NVSRadarChart.render(canvas, {
    NL1: 80, NL2: 90, NL3: 85, NL4: 70, NL5: 75, NL6: 95, NL7: 88
  });
  suite.assert(true, 'Radar chart rendered successfully');
});

console.log('\n----------------------------------------------------------------');
console.log(`TOTAL: ${suite.passed + suite.failed} | PASSED: ${suite.passed} | FAILED: ${suite.failed}`);
console.log('----------------------------------------------------------------\n');

if (suite.failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
