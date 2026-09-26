/* ==========================================================================
   NovaStars Universe — 3D Galaxy Scene Engine (Three.js WebGL)
   7 NVS Competency Crystal Planets, Central Base Core & Golden Star Mascot
   Optimized for 60 FPS Mobile Touch, Tablet & High-DPI Desktop
   ========================================================================== */

class UniverseSceneEngine {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.onPlanetSelect = options.onPlanetSelect || (() => {});
    this.isPaused = false;
    this.animationFrameId = null;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;

    this.planets = [];
    this.clickableMeshes = [];
    this.starfield = null;
    this.centralCore = null;
    this.mascotShip = null;

    // Competency Planet Definitions (Canonical NVS Standard NL1–NL7)
    this.planetConfigs = [
      {
        id: 'NL1',
        name: 'Mục Đích & Giá Trị Sống',
        shortName: 'Mục Đích Sống',
        color: 0xEC4899,
        hex: '#EC4899',
        icon: '🎯',
        radius: 1.8,
        orbitRadius: 13,
        orbitSpeed: 0.007,
        rotationSpeed: 0.015,
        angle: 0.2,
        geometryType: 'octahedron',
        desc: 'Xác định mục đích cá nhân, giá trị đạo đức và kỷ luật bản thân.'
      },
      {
        id: 'NL2',
        name: 'Tư Duy & Học Tập Suốt Đời',
        shortName: 'Tư Duy Logic',
        color: 0x3B82F6,
        hex: '#3B82F6',
        icon: '🧩',
        radius: 2.1,
        orbitRadius: 18,
        orbitSpeed: 0.0055,
        rotationSpeed: 0.018,
        angle: 1.1,
        geometryType: 'dodecahedron',
        desc: 'Rèn luyện tư duy logic, phản biện, phân tích và chủ động học tập.'
      },
      {
        id: 'NL3',
        name: 'Trí Tuệ Cảm Xúc & Kết Nối',
        shortName: 'Trí Tuệ Cảm Xúc',
        color: 0x10B981,
        hex: '#10B981',
        icon: '❤️',
        radius: 2.0,
        orbitRadius: 23,
        orbitSpeed: 0.0042,
        rotationSpeed: 0.014,
        angle: 2.0,
        geometryType: 'icosahedron',
        desc: 'Thấu hiểu cảm xúc cá nhân, làm chủ tâm trí và gắn kết bạn bè.'
      },
      {
        id: 'NL4',
        name: 'Giao Tiếp & Thuyết Phục',
        shortName: 'Giao Tiếp & Cảm Hứng',
        color: 0xF97316,
        hex: '#F97316',
        icon: '🗣️',
        radius: 2.2,
        orbitRadius: 28,
        orbitSpeed: 0.0034,
        rotationSpeed: 0.02,
        angle: 3.1,
        geometryType: 'torusKnot',
        desc: 'Lắng nghe tích cực, tự tin diễn đạt và truyền năng lượng tích cực.'
      },
      {
        id: 'NL5',
        name: 'Công Dân Toàn Cầu & Xã Hội',
        shortName: 'Công Dân Toàn Cầu',
        color: 0x06B6D4,
        hex: '#06B6D4',
        icon: '🌍',
        radius: 2.3,
        orbitRadius: 33,
        orbitSpeed: 0.0028,
        rotationSpeed: 0.012,
        angle: 4.2,
        geometryType: 'sphere',
        desc: 'Tôn trọng văn hóa đa dạng, bảo vệ hành tinh và hỗ trợ cộng đồng.'
      },
      {
        id: 'NL6',
        name: 'Hành Động & Dám Thử Thách',
        shortName: 'Dũng Cảm Hành Động',
        color: 0xF59E0B,
        hex: '#F59E0B',
        icon: '🚀',
        radius: 2.2,
        orbitRadius: 38,
        orbitSpeed: 0.0022,
        rotationSpeed: 0.022,
        angle: 5.1,
        geometryType: 'starGeo',
        desc: 'Dũng cảm bước khỏi vùng an toàn, tổ chức thực thi và kiên trì theo đuổi.'
      },
      {
        id: 'NL7',
        name: 'Kỹ Năng Công Nghệ & AI',
        shortName: 'Công Nghệ & AI',
        color: 0x8B5CF6,
        hex: '#8B5CF6',
        icon: '💻',
        radius: 2.4,
        orbitRadius: 43,
        orbitSpeed: 0.0018,
        rotationSpeed: 0.016,
        angle: 6.0,
        geometryType: 'cyberPyramid',
        desc: 'Ứng dụng công nghệ và trí tuệ nhân tạo an toàn, sáng tạo và thông minh.'
      }
    ];

    this.init();
  }

  init() {
    if (!this.container || typeof THREE === 'undefined') {
      console.error('Three.js or container not available.');
      return;
    }

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // 1. Scene Setup
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x07090E, 0.012);

    // 2. Camera Setup
    this.camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 1000);
    this.camera.position.set(22, 26, 42);

    // 3. WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0x07090E, 1);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;

    // Clear existing children
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
    this.container.appendChild(this.renderer.domElement);

    // 4. Lighting System
    this.setupLighting();

    // 5. Starfield & Cosmic Dust
    this.createStarfield();

    // 6. Central Base Core (The Heart of NovaStars)
    this.createCentralCore();

    // 7. 7 Competency Planets
    this.createPlanets();

    // 8. Mascot Ship (Sao Nova Spaceship)
    this.createMascotShip();

    // 9. Touch Controls
    if (typeof UniverseTouchControls !== 'undefined') {
      this.controls = new UniverseTouchControls(
        this.camera,
        this.renderer.domElement,
        (planetData, obj) => {
          this.focusPlanet(planetData, obj);
        }
      );
      this.controls.setClickableObjects(this.clickableMeshes);
    }

    // 10. Event Listeners
    window.addEventListener('resize', () => this.onResize());
    document.addEventListener('visibilitychange', () => {
      this.isPaused = document.hidden;
    });

    // 11. Start Render Loop
    this.animate();
  }

  setupLighting() {
    // Ambient soft space fill
    const ambientLight = new THREE.AmbientLight(0x2D3748, 1.2);
    this.scene.add(ambientLight);

    // Main Golden Core Glow PointLight
    const coreLight = new THREE.PointLight(0xFACC15, 3.5, 90, 1.2);
    coreLight.position.set(0, 0, 0);
    this.scene.add(coreLight);

    // Directional Rim Light for depth
    const rimLight = new THREE.DirectionalLight(0x93C5FD, 1.5);
    rimLight.position.set(30, 45, 20);
    this.scene.add(rimLight);

    const bottomBounce = new THREE.DirectionalLight(0x818CF8, 0.6);
    bottomBounce.position.set(-20, -30, -10);
    this.scene.add(bottomBounce);
  }

  createStarfield() {
    const starCount = 2800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const palette = [
      new THREE.Color(0xFFFFFF),
      new THREE.Color(0xFDE047), // Gold
      new THREE.Color(0x93C5FD), // Soft blue
      new THREE.Color(0xF472B6)  // Pink
    ];

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      // Spherical distribution around outer shell
      const r = 50 + Math.random() * 110;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[idx] = r * Math.sin(phi) * Math.cos(theta);
      positions[idx + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[idx + 2] = r * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[idx] = color.r;
      colors[idx + 1] = color.g;
      colors[idx + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    this.starfield = new THREE.Points(geometry, material);
    this.scene.add(this.starfield);
  }

  createCentralCore() {
    const coreGroup = new THREE.Group();

    // Inner Glowing Sun Core
    const coreGeo = new THREE.IcosahedronGeometry(3.6, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xFDE047,
      emissive: 0xF59E0B,
      emissiveIntensity: 1.0,
      roughness: 0.2,
      metalness: 0.3
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Pulsing Core Atmosphere Aura
    const glowGeo = new THREE.SphereGeometry(4.8, 24, 24);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xFDE047,
      transparent: true,
      opacity: 0.22,
      wireframe: true
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    coreGroup.add(glowMesh);

    // Orbiting Golden Energy Rings
    const ringGeo1 = new THREE.TorusGeometry(5.8, 0.12, 12, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xFACC15, transparent: true, opacity: 0.7 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.8;
    coreGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(6.6, 0.1, 12, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xFB923C, transparent: true, opacity: 0.5 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 3.2;
    coreGroup.add(ring2);

    coreGroup.userData = {
      planetData: {
        id: 'BASE',
        name: 'Trạm Vũ Trụ Trung Tâm NovaStars Base',
        shortName: 'NovaStars Base',
        icon: '⭐',
        desc: 'Trung tâm kết nối 7 hành tinh năng lực vũ trụ NVS.',
        isBase: true
      }
    };

    this.clickableMeshes.push(coreMesh);
    this.scene.add(coreGroup);
    this.centralCore = { group: coreGroup, ring1, ring2, coreMesh, glowMesh };
  }

  createPlanets() {
    this.planets = [];

    this.planetConfigs.forEach((cfg) => {
      const group = new THREE.Group();

      // 1. Orbit Visual Ring
      const orbitGeo = new THREE.BufferGeometry();
      const segments = 90;
      const orbitPoints = [];
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        orbitPoints.push(
          new THREE.Vector3(Math.cos(theta) * cfg.orbitRadius, 0, Math.sin(theta) * cfg.orbitRadius)
        );
      }
      orbitGeo.setFromPoints(orbitPoints);
      const orbitMat = new THREE.LineBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.28
      });
      const orbitLine = new THREE.Line(orbitGeo, orbitMat);
      this.scene.add(orbitLine);

      // 2. Planet Main Mesh with unique geometry
      let geom;
      switch (cfg.geometryType) {
        case 'octahedron':
          geom = new THREE.OctahedronGeometry(cfg.radius, 1);
          break;
        case 'dodecahedron':
          geom = new THREE.DodecahedronGeometry(cfg.radius, 0);
          break;
        case 'icosahedron':
          geom = new THREE.IcosahedronGeometry(cfg.radius, 1);
          break;
        case 'torusKnot':
          geom = new THREE.TorusKnotGeometry(cfg.radius * 0.75, cfg.radius * 0.28, 48, 12);
          break;
        case 'sphere':
          geom = new THREE.SphereGeometry(cfg.radius, 24, 24);
          break;
        case 'starGeo':
          geom = new THREE.DodecahedronGeometry(cfg.radius, 1);
          break;
        case 'cyberPyramid':
          geom = new THREE.ConeGeometry(cfg.radius * 1.1, cfg.radius * 1.8, 5);
          break;
        default:
          geom = new THREE.SphereGeometry(cfg.radius, 16, 16);
      }

      const mat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: 0.35,
        roughness: 0.25,
        metalness: 0.5,
        flatShading: true
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.castShadow = true;
      group.add(mesh);

      // 3. Atmosphere Aura Glow
      const glowGeo = new THREE.SphereGeometry(cfg.radius * 1.35, 16, 16);
      const glowMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.2,
        wireframe: true
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      group.add(glowMesh);

      // 4. Floating Mini-Satellite / Crystal Moon
      const moonGeo = new THREE.TetrahedronGeometry(cfg.radius * 0.32);
      const moonMat = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        emissive: cfg.color,
        emissiveIntensity: 0.6,
        roughness: 0.1
      });
      const moonMesh = new THREE.Mesh(moonGeo, moonMat);
      moonMesh.position.set(cfg.radius * 2.2, 0.4, 0);
      group.add(moonMesh);

      // Bind metadata for Raycaster
      group.userData = { planetData: cfg };
      mesh.userData = { planetData: cfg };
      glowMesh.userData = { planetData: cfg };

      this.clickableMeshes.push(mesh);
      this.clickableMeshes.push(glowMesh);

      this.scene.add(group);

      this.planets.push({
        group,
        mesh,
        glowMesh,
        moonMesh,
        config: cfg,
        currentAngle: cfg.angle
      });
    });
  }

  createMascotShip() {
    // Stylized Golden Star Mascot Spacecraft
    const shipGroup = new THREE.Group();

    // 5-Pointed Star Mascot Model
    const starShape = new THREE.Shape();
    const points = 5;
    const outerRadius = 1.3;
    const innerRadius = 0.6;
    for (let i = 0; i < points * 2; i++) {
      const r = i % 2 === 0 ? outerRadius : innerRadius;
      const a = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (i === 0) starShape.moveTo(x, y);
      else starShape.lineTo(x, y);
    }
    starShape.closePath();

    const extrudeSettings = { depth: 0.5, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.15, bevelThickness: 0.15 };
    const starGeo = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
    starGeo.center();

    const starMat = new THREE.MeshStandardMaterial({
      color: 0xFDE047,
      emissive: 0xF59E0B,
      emissiveIntensity: 0.6,
      metalness: 0.4,
      roughness: 0.2
    });
    const starMesh = new THREE.Mesh(starGeo, starMat);
    shipGroup.add(starMesh);

    // Glowing Thruster
    const thrusterGeo = new THREE.SphereGeometry(0.35, 12, 12);
    const thrusterMat = new THREE.MeshBasicMaterial({ color: 0x38BDF8, transparent: true, opacity: 0.8 });
    const thruster = new THREE.Mesh(thrusterGeo, thrusterMat);
    thruster.position.set(0, -1.2, 0);
    shipGroup.add(thruster);

    shipGroup.scale.set(0.85, 0.85, 0.85);
    this.scene.add(shipGroup);

    this.mascotShip = {
      group: shipGroup,
      time: 0,
      orbitRadius: 15.5
    };
  }

  focusPlanet(planetData, obj) {
    if (this.controls && obj) {
      this.controls.focusPlanet(obj);
    }
    this.onPlanetSelect(planetData);
  }

  focusPlanetById(planetId) {
    if (planetId === 'BASE') {
      if (this.controls && this.centralCore) {
        this.controls.focusPlanet(this.centralCore.group);
      }
      return;
    }
    const found = this.planets.find(p => p.config.id === planetId);
    if (found && this.controls) {
      this.controls.focusPlanet(found.group);
      this.onPlanetSelect(found.config);
    }
  }

  resetOverview() {
    if (this.controls) {
      this.controls.resetToOverview();
    }
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    if (this.isPaused) return;

    // 1. Rotate Starfield slowly
    if (this.starfield) {
      this.starfield.rotation.y += 0.0003;
    }

    // 2. Animate Central Base Core
    if (this.centralCore) {
      this.centralCore.coreMesh.rotation.y += 0.008;
      this.centralCore.glowMesh.rotation.x -= 0.006;
      this.centralCore.ring1.rotation.z += 0.012;
      this.centralCore.ring2.rotation.z -= 0.015;
    }

    // 3. Animate Planets Revolution & Self Rotation
    this.planets.forEach((p) => {
      p.currentAngle += p.config.orbitSpeed;
      const x = Math.cos(p.currentAngle) * p.config.orbitRadius;
      const z = Math.sin(p.currentAngle) * p.config.orbitRadius;
      p.group.position.set(x, Math.sin(p.currentAngle * 2) * 1.5, z);

      p.mesh.rotation.y += p.config.rotationSpeed;
      p.mesh.rotation.x += p.config.rotationSpeed * 0.5;
      p.glowMesh.rotation.y -= p.config.rotationSpeed * 0.7;

      if (p.moonMesh) {
        const moonAngle = performance.now() * 0.003;
        const mr = p.config.radius * 2.0;
        p.moonMesh.position.set(Math.cos(moonAngle) * mr, Math.sin(moonAngle) * 0.6, Math.sin(moonAngle) * mr);
        p.moonMesh.rotation.y += 0.04;
      }
    });

    // 4. Animate Mascot Ship Flight
    if (this.mascotShip) {
      this.mascotShip.time += 0.018;
      const sx = Math.cos(this.mascotShip.time) * this.mascotShip.orbitRadius;
      const sz = Math.sin(this.mascotShip.time) * this.mascotShip.orbitRadius;
      const sy = Math.sin(this.mascotShip.time * 2.2) * 3.5;
      this.mascotShip.group.position.set(sx, sy, sz);

      // Point ship forward in trajectory direction
      const nextX = Math.cos(this.mascotShip.time + 0.05) * this.mascotShip.orbitRadius;
      const nextZ = Math.sin(this.mascotShip.time + 0.05) * this.mascotShip.orbitRadius;
      this.mascotShip.group.lookAt(nextX, sy, nextZ);
      this.mascotShip.group.rotateZ(Math.sin(this.mascotShip.time * 3) * 0.25);
    }

    // 5. Update Active Mini-Game
    if (this.activeMiniGame && this.activeMiniGame.isActive) {
      this.activeMiniGame.update();
    }

    // 6. Update Camera Touch Controls
    if (this.controls && (!this.activeMiniGame || !this.activeMiniGame.isActive)) {
      this.controls.update();
    }

    // 7. Render Frame
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', () => this.onResize());
  }
}

if (typeof window !== 'undefined') {
  window.UniverseSceneEngine = UniverseSceneEngine;
}
