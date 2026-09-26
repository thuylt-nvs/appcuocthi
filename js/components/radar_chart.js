/* ==========================================================================
   NovaStars — 7-Axis Competency Radar Chart (HTML5 Canvas 2D)
   Renders crisp high-DPI spider chart for NVS Competencies (NL1–NL7)
   ========================================================================== */

class NVSRadarChart {
  static render(canvas, scores = {}) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retina / High-DPI scaling
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 340;
    const height = rect.height || 340;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(centerX, centerY) - 46;

    const axes = [
      { id: 'NL1', label: 'Mục Đích', icon: '🎯', color: '#EC4899' },
      { id: 'NL2', label: 'Tư Duy', icon: '🧩', color: '#3B82F6' },
      { id: 'NL3', label: 'Cảm Xúc', icon: '❤️', color: '#10B981' },
      { id: 'NL4', label: 'Giao Tiếp', icon: '🗣️', color: '#F97316' },
      { id: 'NL5', label: 'Toàn Cầu', icon: '🌍', color: '#06B6D4' },
      { id: 'NL6', label: 'Dám Thử', icon: '🚀', color: '#F59E0B' },
      { id: 'NL7', label: 'Công Nghệ', icon: '💻', color: '#8B5CF6' }
    ];

    const numAxes = axes.length;
    const angleStep = (Math.PI * 2) / numAxes;
    const startAngle = -Math.PI / 2;

    ctx.clearRect(0, 0, width, height);

    // 1. Draw Background Concentric Web Polygons
    const levels = [0.2, 0.4, 0.6, 0.8, 1.0];
    levels.forEach((level) => {
      ctx.beginPath();
      for (let i = 0; i < numAxes; i++) {
        const angle = startAngle + i * angleStep;
        const r = maxRadius * level;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = level === 1.0 ? 'rgba(255, 255, 255, 0.28)' : 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = level === 1.0 ? 1.5 : 1;
      ctx.stroke();

      if (level === 1.0) {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
        ctx.fill();
      }
    });

    // 2. Draw Spokes / Axis Lines
    for (let i = 0; i < numAxes; i++) {
      const angle = startAngle + i * angleStep;
      const x = centerX + Math.cos(angle) * maxRadius;
      const y = centerY + Math.sin(angle) * maxRadius;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Axis Labels & Icons
      const labelDist = maxRadius + 26;
      const lx = centerX + Math.cos(angle) * labelDist;
      const ly = centerY + Math.sin(angle) * labelDist;

      ctx.font = 'bold 11px Nunito, sans-serif';
      ctx.fillStyle = axes[i].color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${axes[i].icon} ${axes[i].label}`, lx, ly);
    }

    // 3. Draw Data Polygon
    ctx.beginPath();
    const dataPoints = [];
    for (let i = 0; i < numAxes; i++) {
      const angle = startAngle + i * angleStep;
      const scoreVal = scores[axes[i].id] !== undefined ? scores[axes[i].id] : 75; // Default 75% baseline
      const normalized = Math.max(0.15, Math.min(1.0, scoreVal / 100));
      const r = maxRadius * normalized;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      dataPoints.push({ x, y, color: axes[i].color, score: scoreVal });

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();

    // Fill with soft glowing gradient
    const gradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, maxRadius);
    gradient.addColorStop(0, 'rgba(250, 204, 21, 0.45)');
    gradient.addColorStop(0.7, 'rgba(56, 189, 248, 0.35)');
    gradient.addColorStop(1, 'rgba(139, 92, 246, 0.15)');
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.strokeStyle = '#FACC15';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // 4. Draw Anchor Data Dots
    dataPoints.forEach((pt) => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = pt.color;
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
  }
}

if (typeof window !== 'undefined') {
  window.NVSRadarChart = NVSRadarChart;
}
