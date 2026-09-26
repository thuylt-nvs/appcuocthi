/* ==========================================================================
   NovaStars Universe — 3D Mini-Game: Star Collector 3D (Chiến Binh Ngôi Sao)
   Collect 7 NVS Competency Crystals, Dodge Asteroids, Earn XP & Stars
   High-performance Mobile Touch D-Pad & Keyboard Controls
   ========================================================================== */

class StarCollectorGame {
  constructor(universeEngine, options = {}) {
    this.universe = universeEngine;
    this.onFinish = options.onFinish || (() => {});
    this.onScoreUpdate = options.onScoreUpdate || (() => {});

    this.isActive = false;
    this.score = 0;
    this.shields = 3;
    this.timeLeft = 45; // 45 seconds run
    this.timerInterval = null;

    // Player Ship State
    this.playerX = 0;
    this.targetPlayerX = 0;
    this.playerSpeed = 0.35;
    this.laneWidth = 4.5;
    this.maxLane = 2; // -2, -1, 0, 1, 2

    // Game 3D Objects
    this.gameGroup = null;
    this.playerMesh = null;
    this.items = []; // Crystals & Asteroids
    this.itemPool = [];
    this.speed = 0.55; // Forward movement speed
    this.spawnTimer = 0;

    // Keys state
    this.keys = { left: false, right: false };

    this.bindControls();
  }

  bindControls() {
    window.addEventListener('keydown', (e) => {
      if (!this.isActive) return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        this.moveLeft();
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        this.moveRight();
      }
    });

    // Touch button events
    const btnLeft = document.getElementById('touch-btn-left');
    const btnRight = document.getElementById('touch-btn-right');

    if (btnLeft) {
      btnLeft.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.moveLeft();
        if (window.soundEngine) window.soundEngine.playPop();
      });
    }

    if (btnRight) {
      btnRight.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.moveRight();
        if (window.soundEngine) window.soundEngine.playPop();
      });
    }

    // Touch swipe support on screen
    let touchStartX = 0;
    const container = document.getElementById('three-canvas-container');
    if (container) {
      container.addEventListener('touchstart', (e) => {
        if (!this.isActive) return;
        touchStartX = e.touches[0].clientX;
      }, { passive: true });

      container.addEventListener('touchend', (e) => {
        if (!this.isActive) return;
        const diffX = e.changedTouches[0].clientX - touchStartX;
        if (diffX < -30) this.moveLeft();
        else if (diffX > 30) this.moveRight();
      }, { passive: true });
    }
  }

  moveLeft() {
    if (this.targetPlayerX > -this.laneWidth * 1.8) {
      this.targetPlayerX -= this.laneWidth;
    }
  }

  moveRight() {
    if (this.targetPlayerX < this.laneWidth * 1.8) {
      this.targetPlayerX += this.laneWidth;
    }
  }

  start() {
    this.isActive = true;
    this.score = 0;
    this.shields = 3;
    this.timeLeft = 45;
    this.targetPlayerX = 0;
    this.playerX = 0;

    // Show Touch Controls UI
    const controls = document.getElementById('minigame-touch-controls');
    if (controls) controls.classList.remove('hidden');

    // Create Game Sub-Scene
    this.setupGameScene();

    // Start Timer
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.endGame();
      }
      this.onScoreUpdate({
        score: this.score,
        shields: this.shields,
        timeLeft: this.timeLeft
      });
    }, 1000);

    this.onScoreUpdate({
      score: this.score,
      shields: this.shields,
      timeLeft: this.timeLeft
    });
  }

  setupGameScene() {
    if (!this.universe || !this.universe.scene) return;

    this.gameGroup = new THREE.Group();
    this.gameGroup.position.set(0, 50, 0); // Isolated playfield above universe
    this.universe.scene.add(this.gameGroup);

    // Position Camera into 3rd Person View behind ship
    this.universe.controls.isLerping = false;
    this.universe.controls.autoRotate = false;
    this.universe.camera.position.set(0, 56, 16);
    this.universe.camera.lookAt(0, 52, -20);
    this.universe.controls.target.set(0, 52, -20);

    // Create Player Ship Mesh
    const shipGeo = new THREE.ConeGeometry(1.2, 3.2, 5);
    shipGeo.rotateX(Math.PI / 2);
    const shipMat = new THREE.MeshStandardMaterial({
      color: 0xFACC15,
      emissive: 0xF59E0B,
      emissiveIntensity: 0.8,
      metalness: 0.5,
      roughness: 0.2
    });
    this.playerMesh = new THREE.Mesh(shipGeo, shipMat);
    this.playerMesh.position.set(0, 2, 0);

    // Thruster Particle Light
    const thruster = new THREE.PointLight(0x38BDF8, 2, 10);
    thruster.position.set(0, 0, 1.8);
    this.playerMesh.add(thruster);

    this.gameGroup.add(this.playerMesh);

    // Cosmic Grid Runway Tunnel
    const gridHelper = new THREE.GridHelper(50, 25, 0x38BDF8, 0x1E293B);
    gridHelper.position.set(0, 0, -25);
    this.gameGroup.add(gridHelper);

    this.items = [];
  }

  spawnItem() {
    const lanes = [-this.laneWidth, 0, this.laneWidth];
    const laneX = lanes[Math.floor(Math.random() * lanes.length)];
    const isAsteroid = Math.random() < 0.32; // 32% chance asteroid

    let mesh;
    if (isAsteroid) {
      // Asteroid Hazard
      const geo = new THREE.DodecahedronGeometry(1.3, 0);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x64748B,
        roughness: 0.9,
        flatShading: true
      });
      mesh = new THREE.Mesh(geo, mat);
      mesh.userData = { type: 'asteroid', points: -1 };
    } else {
      // Energy Competency Crystal
      const colors = [0xEC4899, 0x3B82F6, 0x10B981, 0xF97316, 0x06B6D4, 0xF59E0B, 0x8B5CF6];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const geo = new THREE.OctahedronGeometry(1.1, 0);
      const mat = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.7,
        roughness: 0.2
      });
      mesh = new THREE.Mesh(geo, mat);
      mesh.userData = { type: 'crystal', points: 15 };
    }

    mesh.position.set(laneX, 2, -60); // Spawn in distance
    this.gameGroup.add(mesh);
    this.items.push(mesh);
  }

  update() {
    if (!this.isActive || !this.playerMesh) return;

    // Smooth Ship Lane Transition
    this.playerX += (this.targetPlayerX - this.playerX) * 0.16;
    this.playerMesh.position.x = this.playerX;
    // Bank ship tilt on turn
    this.playerMesh.rotation.z = (this.targetPlayerX - this.playerX) * -0.15;

    // Spawn items
    this.spawnTimer += 0.04;
    if (this.spawnTimer >= 0.7) {
      this.spawnTimer = 0;
      this.spawnItem();
    }

    // Move items forward
    for (let i = this.items.length - 1; i >= 0; i--) {
      const item = this.items[i];
      item.position.z += this.speed;
      item.rotation.x += 0.03;
      item.rotation.y += 0.04;

      // Check Collision with Player Ship
      const dist = Math.hypot(item.position.x - this.playerX, item.position.z - this.playerMesh.position.z);
      if (dist < 1.9) {
        if (item.userData.type === 'crystal') {
          // Collected Crystal!
          this.score += item.userData.points;
          if (window.soundEngine) window.soundEngine.playCorrect();
        } else {
          // Hit Asteroid!
          this.shields--;
          if (window.soundEngine) window.soundEngine.playHit();
          if (this.shields <= 0) {
            this.endGame();
            return;
          }
        }

        this.onScoreUpdate({
          score: this.score,
          shields: this.shields,
          timeLeft: this.timeLeft
        });

        // Remove item
        this.gameGroup.remove(item);
        this.items.splice(i, 1);
        continue;
      }

      // Past camera
      if (item.position.z > 20) {
        this.gameGroup.remove(item);
        this.items.splice(i, 1);
      }
    }
  }

  endGame() {
    if (!this.isActive) return;
    this.isActive = false;
    clearInterval(this.timerInterval);

    // Hide Touch Controls
    const controls = document.getElementById('minigame-touch-controls');
    if (controls) controls.classList.add('hidden');

    // Clean up Game Scene
    if (this.gameGroup && this.universe && this.universe.scene) {
      this.universe.scene.remove(this.gameGroup);
      this.gameGroup = null;
    }

    // Reset Camera back to Galaxy Overview
    if (this.universe) {
      this.universe.resetOverview();
    }

    // Calculate Earned XP & Stars
    const earnedXp = Math.max(30, Math.floor(this.score * 1.5));
    const earnedStars = this.score >= 120 ? 3 : this.score >= 60 ? 2 : 1;

    if (window.soundEngine) window.soundEngine.playFanfare();

    this.onFinish({
      score: this.score,
      xp: earnedXp,
      stars: earnedStars
    });
  }
}

if (typeof window !== 'undefined') {
  window.StarCollectorGame = StarCollectorGame;
}
