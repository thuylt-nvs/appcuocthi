/* ==========================================================================
   NovaStars Universe — Mobile-First Touch & Orbit Camera Controls
   Smooth Inertia, Touch Gestures (Drag, Pinch-Zoom, Tap-Raycasting)
   Zero external dependencies (Native Three.js Integration)
   ========================================================================== */

class UniverseTouchControls {
  constructor(camera, domElement, onPlanetSelectCallback) {
    this.camera = camera;
    this.domElement = domElement;
    this.onPlanetSelect = onPlanetSelectCallback || (() => {});

    // Spherical coordinates
    this.radius = 45;
    this.minRadius = 15;
    this.maxRadius = 85;
    this.theta = 0.5; // Horizontal angle (radians)
    this.phi = Math.PI / 3; // Vertical angle (radians)
    this.minPhi = 0.1;
    this.maxPhi = Math.PI - 0.2;

    this.target = new THREE.Vector3(0, 0, 0);

    // Momentum / Damping
    this.targetTheta = this.theta;
    this.targetPhi = this.phi;
    this.targetRadius = this.radius;
    this.damping = 0.08;

    // Interaction state
    this.isDragging = false;
    this.isPinching = false;
    this.prevPointerX = 0;
    this.prevPointerY = 0;
    this.startPointerX = 0;
    this.startPointerY = 0;
    this.initialPinchDistance = 0;
    this.touchStartTime = 0;

    // Auto-rotation when idle
    this.autoRotate = true;
    this.autoRotateSpeed = 0.0015;
    this.lastInteractionTime = Date.now();

    // Raycaster for object tap detection
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.clickableObjects = [];

    // Smooth Camera Transition State (Lerp)
    this.isLerping = false;
    this.lerpProgress = 1;
    this.lerpDuration = 1000;
    this.lerpStartTime = 0;
    this.cameraStartPos = new THREE.Vector3();
    this.cameraEndPos = new THREE.Vector3();
    this.targetStartLook = new THREE.Vector3();
    this.targetEndLook = new THREE.Vector3();

    this.bindEvents();
    this.updateCamera();
  }

  setClickableObjects(objects) {
    this.clickableObjects = objects;
  }

  bindEvents() {
    const el = this.domElement;

    // Mouse events (Desktop)
    el.addEventListener('mousedown', (e) => this.onPointerDown(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) this.onPointerMove(e.clientX, e.clientY);
    });
    window.addEventListener('mouseup', (e) => {
      if (this.isDragging) this.onPointerUp(e.clientX, e.clientY);
    });
    el.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.zoom(e.deltaY * 0.03);
    }, { passive: false });

    // Touch events (Mobile First)
    el.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isPinching = false;
        this.onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
      } else if (e.touches.length === 2) {
        this.isDragging = false;
        this.isPinching = true;
        this.initialPinchDistance = this.getPinchDistance(e.touches);
      }
    }, { passive: true });

    el.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && this.isDragging) {
        this.onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      } else if (e.touches.length === 2 && this.isPinching) {
        const currentDist = this.getPinchDistance(e.touches);
        const diff = this.initialPinchDistance - currentDist;
        this.zoom(diff * 0.12);
        this.initialPinchDistance = currentDist;
      }
    }, { passive: true });

    el.addEventListener('touchend', (e) => {
      if (this.isPinching && e.touches.length < 2) {
        this.isPinching = false;
      }
      if (this.isDragging) {
        const touch = e.changedTouches[0];
        this.onPointerUp(touch.clientX, touch.clientY);
      }
    });
  }

  getPinchDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  onPointerDown(x, y) {
    this.isDragging = true;
    this.prevPointerX = x;
    this.prevPointerY = y;
    this.startPointerX = x;
    this.startPointerY = y;
    this.touchStartTime = Date.now();
    this.lastInteractionTime = Date.now();
    this.autoRotate = false;
    this.isLerping = false; // Cancel any ongoing lerp
  }

  onPointerMove(x, y) {
    const deltaX = x - this.prevPointerX;
    const deltaY = y - this.prevPointerY;
    this.prevPointerX = x;
    this.prevPointerY = y;

    const rotSpeed = 0.0055;
    this.targetTheta -= deltaX * rotSpeed;
    this.targetPhi = Math.max(this.minPhi, Math.min(this.maxPhi, this.targetPhi - deltaY * rotSpeed));
    this.lastInteractionTime = Date.now();
  }

  onPointerUp(x, y) {
    this.isDragging = false;
    const dist = Math.hypot(x - this.startPointerX, y - this.startPointerY);
    const duration = Date.now() - this.touchStartTime;

    // Detected a clean tap (< 10px movement & < 300ms)
    if (dist < 10 && duration < 300) {
      this.checkRaycastClick(x, y);
    }

    // Resume subtle auto-rotate after 5s idle
    setTimeout(() => {
      if (Date.now() - this.lastInteractionTime >= 4800) {
        this.autoRotate = true;
      }
    }, 5000);
  }

  zoom(delta) {
    this.targetRadius = Math.max(this.minRadius, Math.min(this.maxRadius, this.targetRadius + delta));
    this.lastInteractionTime = Date.now();
  }

  checkRaycastClick(screenX, screenY) {
    const rect = this.domElement.getBoundingClientRect();
    this.mouse.x = ((screenX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((screenY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.clickableObjects, true);

    if (intersects.length > 0) {
      // Find highest ancestor with planetData
      let hitObj = intersects[0].object;
      while (hitObj && !hitObj.userData.planetData && hitObj.parent) {
        hitObj = hitObj.parent;
      }
      if (hitObj && hitObj.userData.planetData) {
        this.onPlanetSelect(hitObj.userData.planetData, hitObj);
      }
    }
  }

  focusPlanet(planetObject) {
    if (!planetObject) return;
    const worldPos = new THREE.Vector3();
    planetObject.getWorldPosition(worldPos);

    // Calculate nice offset position for viewing
    const offset = new THREE.Vector3(10, 6, 12);
    const endPos = worldPos.clone().add(offset);

    this.startCameraLerp(endPos, worldPos, 900);
  }

  resetToOverview() {
    this.targetRadius = 45;
    this.targetPhi = Math.PI / 3;
    this.startCameraLerp(new THREE.Vector3(20, 24, 38), new THREE.Vector3(0, 0, 0), 1000);
  }

  startCameraLerp(endPos, endLookAt, durationMs = 1000) {
    this.isLerping = true;
    this.lerpStartTime = performance.now();
    this.lerpDuration = durationMs;
    this.cameraStartPos.copy(this.camera.position);
    this.cameraEndPos.copy(endPos);
    this.targetStartLook.copy(this.target);
    this.targetEndLook.copy(endLookAt);
    this.autoRotate = false;
  }

  update() {
    if (this.isLerping) {
      const now = performance.now();
      const elapsed = now - this.lerpStartTime;
      const t = Math.min(1, elapsed / this.lerpDuration);
      // Ease out cubic
      const easeT = 1 - Math.pow(1 - t, 3);

      this.camera.position.lerpVectors(this.cameraStartPos, this.cameraEndPos, easeT);
      this.target.lerpVectors(this.targetStartLook, this.targetEndLook, easeT);
      this.camera.lookAt(this.target);

      if (t >= 1) {
        this.isLerping = false;
        // Sync spherical coords with new position
        const rel = this.camera.position.clone().sub(this.target);
        this.radius = rel.length();
        this.targetRadius = this.radius;
        this.phi = Math.acos(Math.max(-1, Math.min(1, rel.y / this.radius)));
        this.targetPhi = this.phi;
        this.theta = Math.atan2(rel.x, rel.z);
        this.targetTheta = this.theta;
      }
      return;
    }

    if (this.autoRotate) {
      this.targetTheta += this.autoRotateSpeed;
    }

    // Smooth inertia interpolation
    this.theta += (this.targetTheta - this.theta) * this.damping;
    this.phi += (this.targetPhi - this.phi) * this.damping;
    this.radius += (this.targetRadius - this.radius) * this.damping;

    this.updateCamera();
  }

  updateCamera() {
    const x = this.target.x + this.radius * Math.sin(this.phi) * Math.sin(this.theta);
    const y = this.target.y + this.radius * Math.cos(this.phi);
    const z = this.target.z + this.radius * Math.sin(this.phi) * Math.cos(this.theta);

    this.camera.position.set(x, y, z);
    this.camera.lookAt(this.target);
  }
}

if (typeof window !== 'undefined') {
  window.UniverseTouchControls = UniverseTouchControls;
}
