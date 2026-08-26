/* ==========================================================================
   NovaStars / Antigravity — Competition-Local Date Service
   Unified date key provider for Daily Tickets, Missions, Streaks, & Rankings
   ========================================================================== */

class ChampionshipDateService {
  constructor(timeZone = 'Asia/Ho_Chi_Minh') {
    this.timeZone = timeZone;
  }

  /**
   * Get the competition local date key formatted as YYYY-MM-DD
   * Uses Intls DateTimeFormat or fallback timezone offset calculation
   */
  getCompetitionDateKey(date = new Date()) {
    try {
      const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: this.timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      return formatter.format(date); // Output: YYYY-MM-DD
    } catch (e) {
      // Fallback: UTC+7 offset if Intl is unsupported
      const localDate = new Date(date.getTime() + 7 * 60 * 60 * 1000);
      return localDate.toISOString().split('T')[0];
    }
  }

  /**
   * Check if a given date string (YYYY-MM-DD) matches today's competition date key
   */
  isToday(dateKey) {
    return dateKey === this.getCompetitionDateKey();
  }

  /**
   * Calculate exact milliseconds remaining until competition local midnight
   */
  getMsUntilLocalMidnight(now = new Date()) {
    const todayKey = this.getCompetitionDateKey(now);
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const tomorrowKey = this.getCompetitionDateKey(tomorrow);
    
    // Parse midnight timestamp in local time
    const nextMidnight = new Date(`${tomorrowKey}T00:00:00+07:00`);
    return Math.max(0, nextMidnight.getTime() - now.getTime());
  }
}

const championshipDateService = new ChampionshipDateService();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ChampionshipDateService, championshipDateService };
} else {
  window.ChampionshipDateService = ChampionshipDateService;
  window.championshipDateService = championshipDateService;
}
