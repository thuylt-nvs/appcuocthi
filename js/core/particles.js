/* ==========================================================================
   NovaStars MVP — Interactive Star Burst Particle Engine
   Emits floating sparkle star particles at tap coordinates for Game Feel
   ========================================================================== */

class ParticleEngine {
  constructor() {
    this.container = null;
  }

  init() {
    this.container = document.getElementById('app-root');
  }

  spawnStarBurst(x, y, count = 12) {
    if (!this.container) this.init();
    if (!this.container) return;

    const stars = ['⭐', '✨', '🌟', '💫', '⚡'];
    const containerRect = this.container.getBoundingClientRect();
    
    // Calculate coordinates relative to app-root
    const relX = x ? (x - containerRect.left) : (containerRect.width / 2);
    const relY = y ? (y - containerRect.top) : (containerRect.height / 3);

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'ns-star-particle';
      particle.innerText = stars[Math.floor(Math.random() * stars.length)];

      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 80;
      const destX = Math.cos(angle) * distance;
      const destY = Math.sin(angle) * distance - 30; // Float upwards

      particle.style.left = `${relX}px`;
      particle.style.top = `${relY}px`;
      particle.style.setProperty('--dx', `${destX}px`);
      particle.style.setProperty('--dy', `${destY}px`);
      particle.style.fontSize = `${1.2 + Math.random() * 0.8}rem`;

      this.container.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 800);
    }
  }
}

window.particleEngine = new ParticleEngine();
