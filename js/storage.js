// storage.js — localStorage wrapper
const Storage = {
  KEYS: {
    PROGRESS: 'ct_progress',
    SCORES:   'ct_scores',
    SR_DATA:  'ct_sr_data',
    SESSION:  'ct_session',
  },

  _get(key) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; }
    catch(e) { return null; }
  },
  _set(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); }
    catch(e) { console.warn('Storage write failed:', e); }
  },

  // Progress: { moduleId: 'locked'|'unlocked'|'complete' }
  getProgress()   { return this._get(this.KEYS.PROGRESS) || {}; },
  setProgress(p)  { this._set(this.KEYS.PROGRESS, p); },

  // Scores: { moduleId: [{ score, total, date }] }
  getScores()     { return this._get(this.KEYS.SCORES) || {}; },
  setScores(s)    { this._set(this.KEYS.SCORES, s); },
  addScore(moduleId, score, total) {
    const scores = this.getScores();
    if (!scores[moduleId]) scores[moduleId] = [];
    scores[moduleId].push({ score, total, pct: Math.round(score/total*100), date: Date.now() });
    this.setScores(scores);
  },
  getBestScore(moduleId) {
    const scores = this.getScores();
    const arr = scores[moduleId] || [];
    if (!arr.length) return null;
    return arr.reduce((best, s) => s.pct > best.pct ? s : best, arr[0]);
  },

  // SR Data: { questionId: { interval, repetitions, easeFactor, nextReview, lapses } }
  getSRData()     { return this._get(this.KEYS.SR_DATA) || {}; },
  setSRData(d)    { this._set(this.KEYS.SR_DATA, d); },
  getSRCard(qid) {
    const data = this.getSRData();
    return data[qid] || { interval: 1, repetitions: 0, easeFactor: 2.5, nextReview: 0, lapses: 0 };
  },
  updateSRCard(qid, card) {
    const data = this.getSRData();
    data[qid] = card;
    this.setSRData(data);
  },
  getDueCards() {
    const data = this.getSRData();
    const now = Date.now();
    return Object.entries(data)
      .filter(([, card]) => card.nextReview <= now)
      .map(([qid]) => qid);
  },

  // Session: tracks SR review completion per day
  getSession() {
    const s = this._get(this.KEYS.SESSION) || {};
    const today = new Date().toDateString();
    if (s.date !== today) return { date: today, srReviewedToday: false };
    return s;
  },
  setSession(s) { this._set(this.KEYS.SESSION, s); },
  markSRReviewedToday() {
    const s = this.getSession();
    s.srReviewedToday = true;
    this.setSession(s);
  },
  isSRReviewedToday() { return this.getSession().srReviewedToday; },

  resetAll() {
    Object.values(this.KEYS).forEach(k => localStorage.removeItem(k));
  }
};
