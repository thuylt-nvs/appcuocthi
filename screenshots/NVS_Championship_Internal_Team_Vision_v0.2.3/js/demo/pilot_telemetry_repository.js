/* ==========================================================================
   NovaStars × NVS Championship — Centralized Anonymous Pilot Telemetry Repository
   v0.2.1 Asynchronous Telemetry Sink & Remote Queue Manager
   ========================================================================== */

class PilotTelemetryRepository {
  constructor() {
    this.queueKey = 'novastars_student_pilot_telemetry_queue';
    this.aggregatedKey = 'novastars_student_pilot_telemetry_aggregated';
    this.endpoint = 'https://api.novastars.edu.vn/pilot/telemetry'; // HTTPS Remote Sink Placeholder
  }

  /**
   * Asynchronously log an anonymous telemetry event with local queue buffering & remote sync.
   * Tolerates network failure silently without breaking the child flow.
   */
  async logEvent(eventPayload) {
    const payload = {
      ...eventPayload,
      timestamp: eventPayload.timestamp || new Date().toISOString()
    };

    // 1. Buffer into local aggregated storage for team export
    this.bufferAggregated(payload);

    // 2. Queue for asynchronous remote HTTP submission
    this.queuePending(payload);

    // 3. Try flushing pending queue without blocking UI
    this.flushQueueAsync();
  }

  bufferAggregated(payload) {
    try {
      if (typeof sessionStorage !== 'undefined') {
        const raw = sessionStorage.getItem(this.aggregatedKey);
        const list = raw ? JSON.parse(raw) : [];
        list.push(payload);
        sessionStorage.setItem(this.aggregatedKey, JSON.stringify(list));
      }
    } catch (e) {
      console.warn('[PilotTelemetry] Could not buffer aggregated payload:', e);
    }
  }

  queuePending(payload) {
    try {
      if (typeof sessionStorage !== 'undefined') {
        const raw = sessionStorage.getItem(this.queueKey);
        const queue = raw ? JSON.parse(raw) : [];
        queue.push(payload);
        sessionStorage.setItem(this.queueKey, JSON.stringify(queue));
      }
    } catch (e) {
      console.warn('[PilotTelemetry] Could not queue pending event:', e);
    }
  }

  async flushQueueAsync() {
    try {
      if (typeof sessionStorage === 'undefined') return;
      const raw = sessionStorage.getItem(this.queueKey);
      if (!raw) return;
      const queue = JSON.parse(raw);
      if (!queue || queue.length === 0) return;

      // In browser runtime, attempt fetch submission with silent fallback
      if (typeof fetch === 'function') {
        try {
          // Send queue to pilot telemetry endpoint
          const res = await fetch(this.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ events: queue })
          });
          if (res.ok) {
            sessionStorage.removeItem(this.queueKey);
          }
        } catch (netErr) {
          // Network failure is silently swallowed to protect student flow
        }
      }
    } catch (e) {
      // Never throw or block UI
    }
  }

  /**
   * Retrieves all aggregated anonymous telemetry logs for Team Mode export
   */
  getAggregatedData() {
    try {
      if (typeof sessionStorage !== 'undefined') {
        const raw = sessionStorage.getItem(this.aggregatedKey);
        return raw ? JSON.parse(raw) : [];
      }
    } catch (e) {
      console.warn('[PilotTelemetry] Could not read aggregated data:', e);
    }
    return [];
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PilotTelemetryRepository };
} else if (typeof window !== 'undefined') {
  window.PilotTelemetryRepository = PilotTelemetryRepository;
}
