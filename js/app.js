// app.js — Main application controller
const App = {

  // ── Init ──────────────────────────────────────────────────────────────────
  init() {
    this.applyTheme();
    this.initProgress();
    this.bindNav();
    this.checkSRRequired();
    this.render('dashboard');

    // Auto-apply theme every minute (handles 6am/6pm crossover); clear manual override when auto matches it
    setInterval(() => {
      const h = new Date().getHours();
      const auto = (h >= 6 && h < 18) ? 'light' : 'dark';
      if (this._themeOverride === auto) this._themeOverride = undefined;
      this.applyTheme();
    }, 60 * 1000);

    document.getElementById('theme-indicator').addEventListener('click', () => this.toggleTheme());
  },

  applyTheme() {
    const h = new Date().getHours();
    const auto = (h >= 6 && h < 18) ? 'light' : 'dark';
    const theme = (this._themeOverride !== undefined) ? this._themeOverride : auto;
    document.documentElement.setAttribute('data-theme', theme);
    const indicator = document.getElementById('theme-indicator');
    if (indicator) indicator.textContent = theme === 'light' ? '☀️' : '🌙';
  },

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    this._themeOverride = (current === 'light') ? 'dark' : 'light';
    this.applyTheme();
  },

  initProgress() {
    const progress = Storage.getProgress();
    if (!progress['module-1']) {
      progress['module-1'] = 'unlocked';
      Storage.setProgress(progress);
    }
  },

  // ── Navigation ────────────────────────────────────────────────────────────
  bindNav() {
    document.querySelectorAll('[data-nav]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        this.render(el.dataset.nav);
      });
    });
  },

  setActiveNav(view) {
    document.querySelectorAll('[data-nav]').forEach(el => {
      el.classList.toggle('active', el.dataset.nav === view ||
        (view.startsWith('module-') && el.dataset.nav === 'dashboard'));
    });
  },

  // ── Router ────────────────────────────────────────────────────────────────
  render(view, params = {}) {
    const main = document.getElementById('main-content');
    main.innerHTML = '';
    this.setActiveNav(view);
    window.scrollTo(0, 0);

    if      (view === 'dashboard')                          this.renderDashboard(main);
    else if (view === 'reference')                          this.renderReference(main);
    else if (view === 'sr-review')                          this.renderSRReview(main);
    else if (view === 'final-quiz')                         this.renderFinalQuiz(main);
    else if (view === 'module' && params.section !== undefined)
                                                            this.renderSection(main, params.moduleId, params.section);
    else if (view === 'module' && params.moduleId)          this.renderModuleStart(main, params.moduleId);
    else if (view.startsWith('module-') && params.section !== undefined)
                                                            this.renderSection(main, view, params.section);
    else if (view.startsWith('module-'))                    this.renderModuleStart(main, view);
  },

  // ── Dashboard ─────────────────────────────────────────────────────────────
  renderDashboard(container) {
    const progress = Storage.getProgress();
    const dueCount = Storage.getDueCards().length;
    const session  = Storage.getSession();

    let html = `<div class="dashboard">
      <div class="dashboard-header">
        <div class="dashboard-title-row">
          <div>
            <h1>Chart Trainer</h1>
            <p class="subtitle">Your personal trading education program</p>
          </div>
          <button class="btn-reset-progress" onclick="if(confirm('Reset all progress and scores? This cannot be undone.')){Storage.resetAll();App.render('dashboard')}">
            Reset Progress
          </button>
        </div>
      </div>`;

    // SR Review Banner
    if (dueCount > 0 && !session.srReviewedToday) {
      html += `<div class="sr-banner">
        <div class="sr-banner-text">
          <strong>📚 Spaced Repetition Review Due</strong>
          <span>${dueCount} card${dueCount !== 1 ? 's' : ''} ready for review</span>
        </div>
        <button class="btn btn-warning" onclick="App.render('sr-review')">Start Review</button>
      </div>`;
    }

    // Module cards
    html += `<div class="module-grid">`;
    CURRICULUM.forEach((mod, idx) => {
      const state = progress[mod.id] || (idx === 0 ? 'unlocked' : 'locked');
      const best  = Storage.getBestScore(mod.id);
      const isLocked = state === 'locked';
      const isDone   = state === 'complete';

      let badge = '';
      if (isDone)    badge = `<span class="badge badge-complete">✓ Complete</span>`;
      else if (!isLocked) badge = `<span class="badge badge-unlocked">Unlocked</span>`;
      else           badge = `<span class="badge badge-locked">🔒 Locked</span>`;

      html += `<div class="module-card ${isLocked ? 'locked' : isDone ? 'complete' : 'unlocked'}"
        ${!isLocked ? `onclick="App.render('${mod.id}')"` : ''}>
        <div class="module-card-icon">${mod.icon}</div>
        <div class="module-card-content">
          <div class="module-card-title">${mod.title}</div>
          <div class="module-card-desc">${mod.description}</div>
          ${best ? `<div class="module-card-score">Best score: ${best.pct}%</div>` : ''}
        </div>
        ${badge}
      </div>`;
    });
    html += `</div>`;

    // Final quiz
    const allDone = CURRICULUM.every(m => progress[m.id] === 'complete');
    if (allDone) {
      const finalBest = Storage.getBestScore('final');
      html += `<div class="final-quiz-card" onclick="App.render('final-quiz')">
        <div class="final-quiz-icon">🏆</div>
        <div>
          <strong>Final Assessment</strong>
          <p>Test everything you've learned across all modules.</p>
          ${finalBest ? `<span class="module-card-score">Best score: ${finalBest.pct}%</span>` : ''}
        </div>
        <span class="badge badge-unlocked">Available</span>
      </div>`;
    }

    html += `</div>`;
    container.innerHTML = html;
  },

  // ── Module Start ──────────────────────────────────────────────────────────
  renderModuleStart(container, moduleId) {
    const mod = CURRICULUM.find(m => m.id === moduleId);
    if (!mod) { this.render('dashboard'); return; }

    const progress = Storage.getProgress();
    if (progress[moduleId] === 'locked') { this.render('dashboard'); return; }

    const best = Storage.getBestScore(moduleId);

    container.innerHTML = `
      <div class="module-start">
        <div class="module-start-header">
          <span class="module-icon-lg">${mod.icon}</span>
          <div>
            <h2>${mod.title}</h2>
            <p>${mod.description}</p>
            ${best ? `<p class="score-note">Your best quiz score: <strong>${best.pct}%</strong></p>` : ''}
          </div>
        </div>

        <div class="section-list">
          <h3>Lessons in this module</h3>
          ${mod.sections.map((s, i) => `
            <div class="section-row">
              <span class="section-num">${i + 1}</span>
              <span>${s.title}</span>
            </div>`).join('')}
        </div>

        <div class="module-actions">
          <button class="btn btn-primary btn-lg"
            onclick="App.render('module', {moduleId:'${moduleId}', section:0})">
            Begin Module →
          </button>
          ${progress[moduleId] === 'complete' ?
            `<button class="btn btn-secondary"
               onclick="App.startQuiz('${moduleId}', 'module-quiz')">
               Retake Quiz
             </button>` : ''}
        </div>
      </div>`;
  },

  // ── Section Lesson ────────────────────────────────────────────────────────
  renderSection(container, moduleId, sectionIdx) {
    const mod = CURRICULUM.find(m => m.id === moduleId);
    if (!mod) { this.render('dashboard'); return; }

    const section  = mod.sections[sectionIdx];
    const total    = mod.sections.length;
    const isLast   = sectionIdx === total - 1;
    const pct      = Math.round(((sectionIdx + 1) / total) * 100);

    container.innerHTML = `
      <div class="lesson-view">
        <div class="lesson-nav">
          <button class="btn btn-ghost" onclick="App.render('${moduleId}')">← ${mod.title}</button>
          <span class="lesson-progress-text">Section ${sectionIdx + 1} of ${total}</span>
        </div>

        <div class="progress-bar-wrap">
          <div class="progress-bar" style="width:${pct}%"></div>
        </div>

        <div class="lesson-content">
          <h2>${section.title}</h2>
          <div class="lesson-body">${section.content}</div>
        </div>

        <div class="lesson-footer">
          ${sectionIdx > 0 ?
            `<button class="btn btn-ghost" onclick="App.render('module',{moduleId:'${moduleId}',section:${sectionIdx - 1}})">← Previous</button>` :
            `<div></div>`}
          <button class="btn btn-primary" id="next-btn">
            ${isLast ? 'Take Module Quiz →' : 'Next Section →'}
          </button>
        </div>
      </div>`;

    // Render any inline candle illustrations in the lesson
    this.renderLessonCharts(container);

    // Check-in quiz after section 1 of each module
    const nextBtn = document.getElementById('next-btn');
    const checkInIds = mod.checkInIds || [];
    const showCheckIn = checkInIds.length > 0 && sectionIdx === 0;

    nextBtn.addEventListener('click', () => {
      if (showCheckIn) {
        this.startCheckIn(moduleId, checkInIds, sectionIdx, isLast);
      } else if (isLast) {
        this.startQuiz(moduleId, 'module-quiz');
      } else {
        this.render('module', { moduleId, section: sectionIdx + 1 });
      }
    });
  },

  // ── Check-in Quiz ─────────────────────────────────────────────────────────
  startCheckIn(moduleId, questionIds, currentSection, fromLast) {
    const questions = questionIds.map(id => QUESTIONS.find(q => q.id === id)).filter(Boolean);
    Quiz.start(questions, 'check-in', moduleId, null);
    this._afterComplete = () => {
      if (fromLast) {
        this.startQuiz(moduleId, 'module-quiz');
      } else {
        this.render('module', { moduleId, section: currentSection + 1 });
      }
    };
    const main = document.getElementById('main-content');
    main.innerHTML = '';
    window.scrollTo(0, 0);
    this.renderQuiz(main, { mode: 'check-in', moduleId });
  },

  // ── Module Quiz ───────────────────────────────────────────────────────────
  startQuiz(moduleId, mode) {
    const mod = CURRICULUM.find(m => m.id === moduleId);
    if (!mod) return;

    let questionIds = [...(mod.quizIds || [])];
    if (mod.patternQuizIds) questionIds = [...questionIds, ...mod.patternQuizIds];

    const questions = questionIds
      .map(id => QUESTIONS.find(q => q.id === id))
      .filter(Boolean);

    Quiz.start(questions, mode, moduleId, null);

    const main = document.getElementById('main-content');
    main.innerHTML = '';
    this.setActiveNav('dashboard');
    window.scrollTo(0, 0);
    this.renderQuiz(main, { mode, moduleId });
  },

  // ── Final Quiz ────────────────────────────────────────────────────────────
  renderFinalQuiz(container) {
    const finalIds = ['qf-01','qf-02','qf-03','qf-04','qf-05','qf-06','qf-07','qf-08'];
    const questions = finalIds.map(id => QUESTIONS.find(q => q.id === id)).filter(Boolean);
    Quiz.start(questions, 'final', 'final', null);
    container.innerHTML = '';
    window.scrollTo(0, 0);
    this.renderQuiz(container, { mode: 'final', moduleId: 'final' });
  },

  // ── Quiz View ─────────────────────────────────────────────────────────────
  renderQuiz(container, params) {
    const modeLabel = {
      'check-in':    'Quick Check-In',
      'module-quiz': 'Module Quiz',
      'sr-review':   'Spaced Repetition Review',
      'final':       'Final Assessment',
    }[params.mode] || 'Quiz';

    const renderQuestion = () => {
      const q = Quiz.current();
      if (!q || Quiz.isDone()) {
        if (params.afterComplete) {
          params.afterComplete();
        } else {
          this.renderResults(container, params);
        }
        return;
      }

      const total    = Quiz.total();
      const progress = Quiz.progress();
      const pct      = Math.round((progress / total) * 100);

      container.innerHTML = `
        <div class="quiz-view">
          <div class="quiz-header">
            <span class="quiz-mode-label">${modeLabel}</span>
            <span class="quiz-counter">Question ${progress + 1} of ${total}</span>
          </div>
          <div class="progress-bar-wrap">
            <div class="progress-bar" style="width:${pct}%"></div>
          </div>
          <div id="quiz-question-container"></div>
        </div>`;

      Quiz.renderQuestion(q, document.getElementById('quiz-question-container'), () => {
        renderQuestion();
      });
    };

    renderQuestion();
  },

  // Stores the afterComplete callback so renderResults can bind it without inline onclick
  _afterComplete: null,

  // ── SR Review ─────────────────────────────────────────────────────────────
  renderSRReview(container) {
    const due = Quiz.getDueQuestions();
    if (!due.length) {
      Storage.markSRReviewedToday();
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">✅</div>
          <h3>No reviews due!</h3>
          <p>You're all caught up. Keep studying to build your review queue.</p>
          <button class="btn btn-primary" onclick="App.render('dashboard')">Back to Dashboard</button>
        </div>`;
      return;
    }

    Quiz.start(due, 'sr-review', null, null);
    container.innerHTML = `
      <div class="quiz-view">
        <div class="quiz-header">
          <span class="quiz-mode-label">📚 Spaced Repetition Review</span>
          <span class="quiz-counter">${due.length} card${due.length !== 1 ? 's' : ''} due</span>
        </div>
        <div class="progress-bar-wrap">
          <div class="progress-bar" style="width:0%"></div>
        </div>
        <div id="quiz-question-container"></div>
      </div>`;

    const renderNext = () => {
      if (Quiz.isDone()) {
        Storage.markSRReviewedToday();
        const results = Quiz.getResults();
        container.innerHTML = `
          <div class="results-view">
            <div class="results-header">
              <div class="results-icon">📚</div>
              <h2>Review Complete!</h2>
              <p>You reviewed ${results.total} card${results.total !== 1 ? 's' : ''}.</p>
              <p class="results-score">${results.pct}% correct</p>
            </div>
            <button class="btn btn-primary btn-lg" onclick="App.render('dashboard')">Back to Dashboard →</button>
          </div>`;
        return;
      }
      const pct = Math.round((Quiz.progress() / Quiz.total()) * 100);
      container.querySelector('.progress-bar').style.width = pct + '%';
      container.querySelector('.quiz-counter').textContent =
        `${Quiz.progress() + 1} of ${Quiz.total()}`;
      Quiz.renderQuestion(Quiz.current(), document.getElementById('quiz-question-container'), renderNext);
    };

    renderNext();
  },

  // ── Results View ──────────────────────────────────────────────────────────
  renderResults(container, params) {
    const results = Quiz.getResults();
    const { score, total, pct, passed, answers, questions } = results;
    const mod  = CURRICULUM.find(m => m.id === params?.moduleId);
    const mode = params?.mode;

    const isCheckIn = mode === 'check-in';

    const emoji   = isCheckIn ? (pct === 100 ? '🎯' : '📝')
                  : pct >= 90 ? '🏆' : pct >= 70 ? '✅' : '❌';
    const message = isCheckIn ? (pct === 100 ? 'Perfect check-in!' : `Check-in complete — ${score} of ${total} correct`)
                  : pct >= 90 ? 'Excellent work!'
                  : pct >= 70 ? 'Passed! Well done.'
                  : 'Not quite — review the material and try again.';

    let html = `
      <div class="results-view">
        <div class="results-header">
          <div class="results-icon">${emoji}</div>
          <h2>${message}</h2>
          <div class="results-score">${pct}%</div>
          <div class="results-sub">${score} / ${total} correct</div>
          ${mode === 'module-quiz' && passed && mod ?
            `<div class="results-unlock">🔓 Next module unlocked!</div>` : ''}
          ${mode === 'module-quiz' && !passed ?
            `<div class="results-fail-note">You need 70% to advance. Review the material and try again.</div>` : ''}
        </div>

        <div class="results-breakdown">
          <h3>Answer Review</h3>
          ${questions.map((q, i) => {
            const ans = answers[i];
            return `<div class="result-item ${ans.correct ? 'correct' : 'incorrect'}">
              <div class="result-item-header">
                <span>${ans.correct ? '✓' : '✗'}</span>
                <span>${q.question}</span>
              </div>
              ${!ans.correct ? `
                <div class="result-item-detail">
                  <span class="wrong-ans">Your answer: ${q.options[ans.selected]}</span>
                  <span class="correct-ans">Correct: ${q.options[q.correct]}</span>
                  <span class="explanation">${q.explanation}</span>
                </div>` : ''}
            </div>`;
          }).join('')}
        </div>

        <div class="results-actions">
          ${mode === 'module-quiz' && !passed ?
            `<button class="btn btn-primary" onclick="App.startQuiz('${params.moduleId}', 'module-quiz')">Retry Quiz</button>` : ''}
          ${isCheckIn ?
            `<button class="btn btn-primary" id="checkin-continue-btn">Continue to Next Section →</button>` :
            mode === 'module-quiz' && passed ?
              `<button class="btn btn-primary" onclick="App.render('dashboard')">Back to Dashboard →</button>` :
              mode !== 'module-quiz' ?
                `<button class="btn btn-primary" onclick="App.render('dashboard')">Back to Dashboard</button>` : ''}
        </div>
      </div>`;

    container.innerHTML = html;

    // Bind the continue button for check-ins (can't use inline onclick with a stored function)
    if (isCheckIn) {
      const btn = document.getElementById('checkin-continue-btn');
      if (btn && this._afterComplete) {
        const fn = this._afterComplete;
        this._afterComplete = null;
        btn.addEventListener('click', fn);
      }
    }
  },

  // ── Reference ─────────────────────────────────────────────────────────────
  renderReference(container) {
    container.innerHTML = `
      <div class="reference-view">
        <h2>Reference Library</h2>
        <div class="ref-tabs">
          <button class="ref-tab active" onclick="App.showRefTab('candlestick', this)">Candlestick Patterns</button>
          <button class="ref-tab" onclick="App.showRefTab('chart', this)">Chart Patterns</button>
          <button class="ref-tab" onclick="App.showRefTab('glossary', this)">Glossary</button>
        </div>
        <div id="ref-content"></div>
      </div>`;

    this.showRefTab('candlestick', container.querySelector('.ref-tab.active'));
  },

  showRefTab(tab, btn) {
    document.querySelectorAll('.ref-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    const content = document.getElementById('ref-content');
    if (tab === 'candlestick') this.renderPatternRef(content, PATTERNS.candlestick);
    else if (tab === 'chart')  this.renderPatternRef(content, PATTERNS.chart);
    else                       this.renderGlossary(content);
  },

  renderPatternRef(container, patterns) {
    container.innerHTML = `<div class="pattern-ref-grid">
      ${patterns.map(p => `
        <div class="pattern-ref-card" onclick="App.showPatternDetail('${p.id}')">
          <canvas id="ref-canvas-${p.id}" width="200" height="120" class="ref-canvas"></canvas>
          <div class="pattern-ref-info">
            <div class="pattern-ref-name">${p.name}</div>
            <div class="direction-badge ${p.direction}">${p.direction.toUpperCase()}</div>
          </div>
        </div>`).join('')}
    </div>`;

    // Render charts after DOM update
    setTimeout(() => {
      patterns.forEach(p => {
        const canvas = document.getElementById(`ref-canvas-${p.id}`);
        if (canvas && Charts[p.patternGen]) {
          const { candles, highlight, lines } = Charts[p.patternGen]();
          Charts.render(canvas, candles, { highlight, lines });
        }
      });
    }, 50);
  },

  showPatternDetail(patternId) {
    const p = [...PATTERNS.candlestick, ...PATTERNS.chart].find(x => x.id === patternId);
    if (!p) return;

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
      <div class="overlay-card">
        <button class="overlay-close" onclick="this.closest('.overlay').remove()">✕</button>
        <canvas id="detail-canvas" width="500" height="240"></canvas>
        <h3>${p.name}</h3>
        <div class="direction-badge ${p.direction}">${p.direction.toUpperCase()} — ${p.signal}</div>
        <p>${p.description}</p>
        <ul>${(p.characteristics || []).map(c => `<li>${c}</li>`).join('')}</ul>
      </div>`;
    document.body.appendChild(overlay);

    setTimeout(() => {
      const canvas = document.getElementById('detail-canvas');
      if (canvas && Charts[p.patternGen]) {
        const { candles, highlight, lines } = Charts[p.patternGen]();
        Charts.render(canvas, candles, { highlight, lines });
      }
    }, 50);
  },

  renderGlossary(container) {
    const terms = [
      { term: 'ATR', def: 'Average True Range — measures average daily price volatility.' },
      { term: 'Bear Market', def: 'A decline of 20%+ from recent highs, lasting at least 2 months.' },
      { term: 'Bull Market', def: 'A rise of 20%+ from recent lows.' },
      { term: 'Call Option', def: 'Right to buy 100 shares at the strike price before expiration.' },
      { term: 'CPI', def: 'Consumer Price Index — measures consumer goods inflation.' },
      { term: 'Dead Cat Bounce', def: 'A temporary recovery after a steep decline, quickly followed by continued decline.' },
      { term: 'Delta', def: 'Option Greek: price change per $1 move in underlying. Call: 0 to 1. Put: -1 to 0.' },
      { term: 'Divergence', def: 'When price and an indicator move in opposite directions — a warning sign.' },
      { term: 'EMA', def: 'Exponential Moving Average — weighted toward recent prices, reacts faster than SMA.' },
      { term: 'FOMC', def: 'Federal Open Market Committee — the Fed body that sets interest rates.' },
      { term: 'Gamma', def: 'Rate of change of Delta per $1 move. Highest ATM near expiration.' },
      { term: 'Gap Up/Down', def: 'When price opens significantly above (gap up) or below (gap down) the prior close.' },
      { term: 'Golden Cross', def: '50 SMA crossing above 200 SMA — long-term bullish signal.' },
      { term: 'Ichimoku Cloud', def: 'A comprehensive indicator showing trend, support/resistance, and momentum simultaneously.' },
      { term: 'IV Crush', def: 'Sharp drop in implied volatility after an expected event, hurting option buyers.' },
      { term: 'MACD', def: 'Moving Average Convergence Divergence — trend/momentum indicator (12 EMA - 26 EMA).' },
      { term: 'Neckline', def: 'In H&S or Double Top/Bottom patterns, the support/resistance line that triggers the pattern when broken.' },
      { term: 'NFP', def: 'Non-Farm Payrolls — monthly U.S. job creation report.' },
      { term: 'OBV', def: 'On-Balance Volume — cumulative volume indicator showing accumulation/distribution.' },
      { term: 'PMI', def: 'Purchasing Managers Index — business activity survey. Above 50 = expansion.' },
      { term: 'Put Option', def: 'Right to sell 100 shares at the strike price before expiration.' },
      { term: 'QE', def: 'Quantitative Easing — central bank buying assets to inject liquidity.' },
      { term: 'QT', def: 'Quantitative Tightening — central bank shrinking its balance sheet, removing liquidity.' },
      { term: 'Resistance', def: 'Price level where selling pressure historically emerges, capping advances.' },
      { term: 'Risk-Off', def: 'Market environment where investors flee to safety: bonds, gold, USD, yen.' },
      { term: 'Risk-On', def: 'Market environment where investors embrace risk: equities, high-yield, emerging markets.' },
      { term: 'RSI', def: 'Relative Strength Index — momentum oscillator (0-100). >70 overbought; <30 oversold.' },
      { term: 'Sector Rotation', def: 'The flow of investment capital between sectors as the economic cycle evolves.' },
      { term: 'SMA', def: 'Simple Moving Average — arithmetic mean of closing prices over N periods.' },
      { term: 'Support', def: 'Price level where buying interest historically emerges, halting declines.' },
      { term: 'Theta', def: 'Time decay — how much an option loses in value each day.' },
      { term: 'Vega', def: 'Option Greek: sensitivity to implied volatility. Long options have positive vega.' },
      { term: 'VIX', def: 'CBOE Volatility Index — "fear gauge" measuring expected 30-day S&P 500 volatility.' },
      { term: 'VWAP', def: 'Volume-Weighted Average Price — institutional intraday benchmark.' },
      { term: 'Whipsaw', def: 'A false signal that quickly reverses, trapping traders who acted on it.' },
    ];

    const grouped = {};
    terms.forEach(t => {
      const letter = t.term[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(t);
    });

    container.innerHTML = `<div class="glossary">
      ${Object.entries(grouped).sort().map(([letter, items]) => `
        <div class="glossary-group">
          <div class="glossary-letter">${letter}</div>
          ${items.map(t => `
            <div class="glossary-entry">
              <span class="glossary-term">${t.term}</span>
              <span class="glossary-def">${t.def}</span>
            </div>`).join('')}
        </div>`).join('')}
    </div>`;
  },

  // ── Lesson chart rendering ─────────────────────────────────────────────────
  renderLessonCharts(container) {
    // Single-candle illustrations
    container.querySelectorAll('canvas.lesson-single-candle').forEach(canvas => {
      const type = canvas.dataset.type;
      if (type) Charts.renderSingleCandleIllustration(canvas, type);
    });

    // Multi-candle pattern illustrations
    container.querySelectorAll('canvas.lesson-pattern-canvas').forEach(canvas => {
      const genName = canvas.dataset.gen;
      const fn = Charts[genName] && Charts[genName].bind(Charts);
      if (!fn) return;
      const { candles, highlight } = fn();
      Charts.renderInline(canvas, candles, { highlight });
    });

    // Indicator illustrations (overlays + split panels)
    container.querySelectorAll('canvas.lesson-indicator-canvas').forEach(canvas => {
      const genName = canvas.dataset.gen;
      const fn = Charts[genName] && Charts[genName].bind(Charts);
      if (!fn) return;
      Charts.renderIndicatorChart(canvas, fn());
    });
  },

  // ── SR Required Check ─────────────────────────────────────────────────────
  checkSRRequired() {
    // SR review is checked/prompted via dashboard banner
  },
};

// Boot
window.addEventListener('DOMContentLoaded', () => App.init());
