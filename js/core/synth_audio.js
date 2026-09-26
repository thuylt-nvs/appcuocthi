/* ==========================================================================
   NovaStars — Web Audio API Synthesizer Engine
   Zero external asset dependencies, 100% reliable instant sound effects
   ========================================================================== */

class SynthAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isUnlocked = false;

    // Check saved audio preference
    if (typeof localStorage !== 'undefined') {
      this.isMuted = localStorage.getItem('ns_muted') === 'true';
    }
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.isUnlocked = true;
      }
    } catch (e) {
      console.warn("Web Audio API not supported on this browser:", e);
    }
  }

  ensureContext() {
    if (!this.ctx) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('ns_muted', String(this.isMuted));
    }
    return this.isMuted;
  }

  playPop() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(840, now + 0.08);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  playCorrect() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Play friendly 2-note chime (E5 -> B5)
    [ { freq: 659.25, time: 0 }, { freq: 987.77, time: 0.1 } ].forEach((note) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.freq, now + note.time);

      gain.gain.setValueAtTime(0.2, now + note.time);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.time + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + note.time);
      osc.stop(now + note.time + 0.3);
    });
  }

  playHit() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.18);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  }

  playFanfare() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // C5 - E5 - G5 - C6 triumphant arpeggio
    const melody = [
      { freq: 523.25, t: 0.0, d: 0.14 },
      { freq: 659.25, t: 0.14, d: 0.14 },
      { freq: 783.99, t: 0.28, d: 0.16 },
      { freq: 1046.50, t: 0.44, d: 0.45 }
    ];

    melody.forEach((note) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.freq, now + note.t);

      gain.gain.setValueAtTime(0.25, now + note.t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.t + note.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + note.t);
      osc.stop(now + note.t + note.d);
    });
  }
}

if (typeof window !== 'undefined') {
  window.soundEngine = new SynthAudioEngine();
  // Unlock audio on first touch
  document.addEventListener('pointerdown', () => {
    if (window.soundEngine) window.soundEngine.init();
  }, { once: true });
}
