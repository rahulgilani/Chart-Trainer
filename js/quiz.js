// quiz.js — Quiz engine + SM-2 spaced repetition

const Quiz = {

  // ── SM-2 Spaced Repetition ─────────────────────────────────────────────────
  // quality: 0 = blackout, 1 = incorrect, 2 = incorrect easy, 3 = correct hard, 4 = correct, 5 = perfect
  sm2(card, quality) {
    let { interval, repetitions, easeFactor } = card;
    if (quality < 3) {
      repetitions = 0;
      interval    = 1;
    } else {
      if      (repetitions === 0) interval = 1;
      else if (repetitions === 1) interval = 6;
      else                        interval = Math.round(interval * easeFactor);
      repetitions++;
      easeFactor = Math.max(1.3, easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    }
    const nextReview = Date.now() + interval * 24 * 60 * 60 * 1000;
    return { ...card, interval, repetitions, easeFactor, nextReview };
  },

  // Add a question to the SR queue (called when answered wrong in module quiz)
  addToSR(questionId) {
    const card = Storage.getSRCard(questionId);
    if (card.repetitions === 0 && card.nextReview === 0) {
      // New card — schedule for next session
      const updated = { ...card, nextReview: Date.now() + 24 * 60 * 60 * 1000 };
      Storage.updateSRCard(questionId, updated);
    }
  },

  // Mark as incorrectly answered (immediate re-queue)
  markWrong(questionId) {
    const card = Storage.getSRCard(questionId);
    const updated = this.sm2(card, 1);
    // Wrong answers in SR review come back after 1 day minimum
    updated.nextReview = Date.now() + 60 * 60 * 1000; // 1 hour re-review
    Storage.updateSRCard(questionId, updated);
  },

  // Mark as correctly answered
  markCorrect(questionId, quality = 4) {
    const card = Storage.getSRCard(questionId);
    const updated = this.sm2(card, quality);
    Storage.updateSRCard(questionId, updated);
  },

  // Get all due SR cards as question objects
  getDueQuestions() {
    const due = Storage.getDueCards();
    return due
      .map(qid => QUESTIONS.find(q => q.id === qid))
      .filter(Boolean);
  },

  // ── Session State ──────────────────────────────────────────────────────────
  _session: {
    questions:    [],
    current:      0,
    answers:      [], // { qid, correct, selected }
    mode:         null, // 'module-quiz' | 'check-in' | 'sr-review' | 'final'
    moduleId:     null,
    onComplete:   null,
  },

  start(questions, mode, moduleId, onComplete) {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    this._session = {
      questions: shuffled,
      current:   0,
      answers:   [],
      mode,
      moduleId,
      onComplete,
    };
  },

  current() {
    return this._session.questions[this._session.current] || null;
  },

  total()    { return this._session.questions.length; },
  progress() { return this._session.current; },
  isDone()   { return this._session.current >= this._session.questions.length; },

  answer(selectedIndex) {
    const q = this.current();
    if (!q) return null;
    const correct = selectedIndex === q.correct;
    this._session.answers.push({ qid: q.id, correct, selected: selectedIndex });

    // SR management
    if (correct) {
      this.markCorrect(q.id, 4);
    } else {
      this.markWrong(q.id);
    }

    this._session.current++;
    return { correct, explanation: q.explanation, correctIndex: q.correct };
  },

  getResults() {
    const { answers, questions, mode, moduleId } = this._session;
    const score = answers.filter(a => a.correct).length;
    const total = questions.length;
    const pct   = Math.round(score / total * 100);
    const passed = pct >= 70;

    if (mode === 'module-quiz' || mode === 'final') {
      Storage.addScore(moduleId || 'final', score, total);

      if (passed && mode === 'module-quiz') {
        const progress = Storage.getProgress();
        progress[moduleId] = 'complete';
        // Unlock next module
        const modules = CURRICULUM.map(m => m.id);
        const idx = modules.indexOf(moduleId);
        if (idx >= 0 && idx < modules.length - 1) {
          const nextId = modules[idx + 1];
          if (progress[nextId] !== 'complete') {
            progress[nextId] = 'unlocked';
          }
        }
        Storage.setProgress(progress);
      }
    }

    // Add wrong answers to SR queue
    answers.filter(a => !a.correct).forEach(a => this.addToSR(a.qid));

    return { score, total, pct, passed, answers, questions };
  },

  // ── Render helpers ─────────────────────────────────────────────────────────
  renderQuestion(q, container, onAnswer) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    let html = `<div class="quiz-question">`;

    // Pattern question — generate chart
    if (q.type === 'pattern') {
      html += `<div class="pattern-chart-wrap">
        <canvas id="quiz-canvas" width="520" height="260"></canvas>
      </div>`;
    }

    html += `<p class="q-text">${q.question}</p>`;
    html += `<div class="q-options">`;
    q.options.forEach((opt, i) => {
      html += `<button class="q-btn" data-idx="${i}">${String.fromCharCode(65 + i)}. ${opt}</button>`;
    });
    html += `</div></div>`;

    container.innerHTML = html;

    // Render pattern chart if needed
    if (q.type === 'pattern') {
      setTimeout(() => {
        const canvas = document.getElementById('quiz-canvas');
        if (canvas && q.patternGen) {
          const gen = Charts[q.patternGen] && Charts[q.patternGen].bind(Charts);
          if (gen) {
            const { candles, highlight, lines } = gen();
            Charts.render(canvas, candles, { highlight, lines });
          }
        }
      }, 50);
    }

    // Bind answer buttons
    container.querySelectorAll('.q-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (container.querySelector('.q-btn.answered')) return; // already answered
        const idx = parseInt(btn.dataset.idx);
        const result = this.answer(idx);
        if (!result) return;

        // Visual feedback
        container.querySelectorAll('.q-btn').forEach((b, i) => {
          b.classList.add('answered');
          if (i === result.correctIndex) b.classList.add('correct');
          else if (i === idx && !result.correct) b.classList.add('incorrect');
          b.disabled = true;
        });

        // Show explanation
        const expDiv = document.createElement('div');
        expDiv.className = `q-explanation ${result.correct ? 'correct' : 'incorrect'}`;
        expDiv.innerHTML = `<strong>${result.correct ? '✓ Correct' : '✗ Incorrect'}.</strong> ${result.explanation}`;
        container.querySelector('.quiz-question').appendChild(expDiv);

        // Proceed button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'btn btn-primary q-next';
        nextBtn.textContent = this.isDone() ? 'View Results →' : 'Next Question →';
        container.querySelector('.quiz-question').appendChild(nextBtn);
        nextBtn.addEventListener('click', () => onAnswer(result));
      });
    });
  },
};
