// charts.js — Canvas-based chart renderer + synthetic data generators
const Charts = {

  // ── Renderer ──────────────────────────────────────────────────────────────
  render(canvas, candles, opts = {}) {
    const ctx   = canvas.getContext('2d');
    const W     = canvas.width;
    const H     = canvas.height;
    const pad   = { top: 24, right: 16, bottom: 28, left: 52 };
    const cW    = W - pad.left - pad.right;
    const cH    = H - pad.top  - pad.bottom;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    const bg     = isDark ? '#0d1117' : '#ffffff';
    const grid   = isDark ? '#21262d' : '#e8ecf0';
    const textC  = isDark ? '#8b949e' : '#6e7681';
    const bullC  = opts.bullColor  || '#26a69a';
    const bearC  = opts.bearColor  || '#ef5350';
    const hlC    = 'rgba(255,200,0,0.18)';

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    if (!candles || !candles.length) return;

    const highs = candles.map(c => c.high);
    const lows  = candles.map(c => c.low);
    let maxP = Math.max(...highs);
    let minP = Math.min(...lows);
    const margin = (maxP - minP) * 0.08;
    maxP += margin; minP -= margin;
    const priceRange = maxP - minP || 1;

    const toY = p => pad.top + cH - ((p - minP) / priceRange * cH);
    const n   = candles.length;
    const slotW = cW / n;
    const bodyW = Math.max(2, slotW * 0.55);
    const toX   = i => pad.left + i * slotW + slotW / 2;

    // Grid lines
    const gridLines = 5;
    ctx.strokeStyle = grid;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= gridLines; i++) {
      const price = minP + (priceRange / gridLines) * i;
      const y = toY(price);
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
      ctx.fillStyle = textC;
      ctx.font = '10px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(price.toFixed(2), pad.left - 4, y + 3);
    }

    // Highlight region
    if (opts.highlight) {
      const [from, to] = opts.highlight;
      ctx.fillStyle = hlC;
      ctx.fillRect(pad.left + from * slotW, pad.top, (to - from + 1) * slotW, cH);
    }

    // Support/Resistance lines
    if (opts.lines) {
      opts.lines.forEach(line => {
        ctx.strokeStyle = line.color || '#f0b90b';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(pad.left, toY(line.price));
        ctx.lineTo(W - pad.right, toY(line.price));
        ctx.stroke();
        ctx.setLineDash([]);
        if (line.label) {
          ctx.fillStyle = line.color || '#f0b90b';
          ctx.font = '10px monospace';
          ctx.textAlign = 'left';
          ctx.fillText(line.label, pad.left + 4, toY(line.price) - 3);
        }
      });
    }

    // Candles
    candles.forEach((c, i) => {
      const x     = toX(i);
      const openY = toY(c.open);
      const closeY= toY(c.close);
      const highY = toY(c.high);
      const lowY  = toY(c.low);
      const bull  = c.close >= c.open;
      const color = bull ? bullC : bearC;

      ctx.strokeStyle = color;
      ctx.lineWidth   = 1;
      ctx.beginPath();
      ctx.moveTo(x, highY); ctx.lineTo(x, lowY);
      ctx.stroke();

      const bodyTop  = Math.min(openY, closeY);
      const bodyH    = Math.max(1, Math.abs(closeY - openY));
      ctx.fillStyle  = bull ? bullC : bearC;
      ctx.fillRect(x - bodyW / 2, bodyTop, bodyW, bodyH);

      // Candle label (if opts.labels)
      if (opts.labels && opts.labels[i]) {
        ctx.fillStyle  = '#f0b90b';
        ctx.font       = 'bold 10px sans-serif';
        ctx.textAlign  = 'center';
        ctx.fillText(opts.labels[i], x, highY - 6);
      }
    });

    // Volume bars (optional)
    if (opts.showVolume && candles[0].volume !== undefined) {
      const maxVol  = Math.max(...candles.map(c => c.volume));
      const volH    = cH * 0.18;
      candles.forEach((c, i) => {
        const x   = toX(i);
        const h   = (c.volume / maxVol) * volH;
        const bull = c.close >= c.open;
        ctx.fillStyle = bull ? 'rgba(38,166,154,0.35)' : 'rgba(239,83,80,0.35)';
        ctx.fillRect(x - bodyW / 2, pad.top + cH - h, bodyW, h);
      });
    }

    // Trend line
    if (opts.trendLine) {
      const { from, to, price1, price2, color } = opts.trendLine;
      ctx.strokeStyle = color || '#f0b90b';
      ctx.lineWidth   = 1.5;
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.moveTo(toX(from), toY(price1));
      ctx.lineTo(toX(to), toY(price2));
      ctx.stroke();
      ctx.setLineDash([]);
    }
  },

  // ── Synthetic data generators ──────────────────────────────────────────────

  _rand(min, max) { return min + Math.random() * (max - min); },
  _randInt(min, max) { return Math.floor(this._rand(min, max + 1)); },

  // Generate a baseline random walk
  _baseline(n, startPrice = 100, drift = 0, vol = 1) {
    const candles = [];
    let price = startPrice;
    for (let i = 0; i < n; i++) {
      const change = (Math.random() - 0.5) * vol * 2 + drift;
      const open  = price;
      const close = Math.max(1, price + change);
      const high  = Math.max(open, close) + Math.random() * vol * 0.5;
      const low   = Math.min(open, close) - Math.random() * vol * 0.5;
      candles.push({ open, high, low, close, volume: this._rand(500, 2000) });
      price = close;
    }
    return candles;
  },

  // ── Candlestick pattern generators ────────────────────────────────────────

  genDoji() {
    const base = this._baseline(8, 100, -0.3, 1.5);
    const p = base[base.length - 1].close;
    base.push({ open: p, high: p + 2.5, low: p - 2.5, close: p + 0.05, volume: 1200 });
    return { candles: base, highlight: [base.length - 1, base.length - 1] };
  },

  genHammer() {
    const base = this._baseline(8, 110, -0.5, 1.5);
    const p = base[base.length - 1].close;
    const bodySize = 0.6;
    base.push({ open: p, high: p + bodySize + 0.3, low: p - 3.5, close: p + bodySize, volume: 1800 });
    return { candles: base, highlight: [base.length - 1, base.length - 1] };
  },

  genInvertedHammer() {
    const base = this._baseline(8, 110, -0.5, 1.5);
    const p = base[base.length - 1].close;
    const bodySize = 0.6;
    base.push({ open: p + bodySize, high: p + bodySize + 3.5, low: p - 0.2, close: p, volume: 1600 });
    return { candles: base, highlight: [base.length - 1, base.length - 1] };
  },

  genShootingStar() {
    const base = this._baseline(8, 90, 0.5, 1.5);
    const p = base[base.length - 1].close;
    const bodySize = 0.6;
    base.push({ open: p + bodySize, high: p + bodySize + 3.5, low: p - 0.2, close: p, volume: 1900 });
    return { candles: base, highlight: [base.length - 1, base.length - 1] };
  },

  genHangingMan() {
    const base = this._baseline(8, 90, 0.5, 1.5);
    const p = base[base.length - 1].close;
    base.push({ open: p, high: p + 0.4, low: p - 3.2, close: p + 0.5, volume: 1400 });
    return { candles: base, highlight: [base.length - 1, base.length - 1] };
  },

  genMarubozu(bull = true) {
    const drift = bull ? 0.5 : -0.5;
    const base = this._baseline(8, bull ? 90 : 110, drift, 1.5);
    const p = base[base.length - 1].close;
    const size = 3;
    if (bull) base.push({ open: p, high: p + size, low: p, close: p + size, volume: 2500 });
    else      base.push({ open: p, high: p, low: p - size, close: p - size, volume: 2500 });
    return { candles: base, highlight: [base.length - 1, base.length - 1] };
  },

  genBullishEngulfing() {
    const base = this._baseline(7, 110, -0.4, 1.5);
    const p = base[base.length - 1].close;
    const small = { open: p + 1.2, high: p + 1.5, low: p - 0.1, close: p, volume: 900 };
    const big   = { open: p - 0.8, high: p + 2.8, low: p - 1.0, close: p + 2.6, volume: 2400 };
    base.push(small, big);
    return { candles: base, highlight: [base.length - 2, base.length - 1] };
  },

  genBearishEngulfing() {
    const base = this._baseline(7, 90, 0.4, 1.5);
    const p = base[base.length - 1].close;
    const small = { open: p - 1.2, high: p + 0.1, low: p - 1.5, close: p, volume: 900 };
    const big   = { open: p + 0.8, high: p + 1.0, low: p - 2.8, close: p - 2.6, volume: 2400 };
    base.push(small, big);
    return { candles: base, highlight: [base.length - 2, base.length - 1] };
  },

  genMorningStar() {
    const base = this._baseline(6, 110, -0.5, 1.5);
    const p = base[base.length - 1].close;
    const c1 = { open: p + 2,   high: p + 2.2, low: p - 0.2, close: p,     volume: 1500 };
    const c2 = { open: p - 0.3, high: p + 0.5, low: p - 0.8, close: p - 0.1, volume: 800 };
    const c3 = { open: p + 0.2, high: p + 2.8, low: p - 0.1, close: p + 2.5, volume: 2000 };
    base.push(c1, c2, c3);
    return { candles: base, highlight: [base.length - 3, base.length - 1] };
  },

  genEveningStar() {
    const base = this._baseline(6, 90, 0.5, 1.5);
    const p = base[base.length - 1].close;
    const c1 = { open: p,       high: p + 0.2, low: p - 2.2, close: p + 2, volume: 1500 };
    const c2 = { open: p + 2.3, high: p + 2.8, low: p + 1.7, close: p + 2.4, volume: 800 };
    const c3 = { open: p + 2.1, high: p + 2.3, low: p - 0.2, close: p - 0.1, volume: 2000 };
    base.push(c1, c2, c3);
    return { candles: base, highlight: [base.length - 3, base.length - 1] };
  },

  genThreeWhiteSoldiers() {
    const base = this._baseline(6, 95, -0.3, 1.5);
    let p = base[base.length - 1].close;
    for (let i = 0; i < 3; i++) {
      const o = p + 0.2;
      const c = o + 2.5;
      base.push({ open: o, high: c + 0.3, low: o - 0.2, close: c, volume: 2000 + i * 200 });
      p = c;
    }
    return { candles: base, highlight: [base.length - 3, base.length - 1] };
  },

  genThreeBlackCrows() {
    const base = this._baseline(6, 105, 0.3, 1.5);
    let p = base[base.length - 1].close;
    for (let i = 0; i < 3; i++) {
      const o = p - 0.2;
      const c = o - 2.5;
      base.push({ open: o, high: o + 0.2, low: c - 0.3, close: c, volume: 2000 + i * 200 });
      p = c;
    }
    return { candles: base, highlight: [base.length - 3, base.length - 1] };
  },

  // ── Chart pattern generators ───────────────────────────────────────────────

  genHeadAndShoulders() {
    const candles = [];
    // Uptrend
    for (let i = 0; i < 8; i++) {
      const p = 90 + i * 0.8 + (Math.random() - 0.5);
      candles.push({ open: p - 0.4, high: p + 0.8, low: p - 0.8, close: p + 0.4, volume: 1200 });
    }
    // Left shoulder peak ~100
    const ls = [{ open: 97, high: 101, low: 96, close: 100, volume: 1800 },
                { open: 99, high: 100, low: 96, close: 97, volume: 1400 }];
    // Rise to head ~106
    const rise = [{ open: 97, high: 100, low: 96, close: 99, volume: 1300 },
                  { open: 99, high: 103, low: 98, close: 102, volume: 1600 }];
    // Head peak ~106
    const head = [{ open: 102, high: 107, low: 101, close: 106, volume: 2200 },
                  { open: 105, high: 106, low: 101, close: 102, volume: 1700 }];
    // Right shoulder ~100
    const rs = [{ open: 102, high: 104, low: 100, close: 101, volume: 1500 },
                { open: 101, high: 102, low: 97,  close: 98,  volume: 1400 }];
    // Breakdown below neckline (~97)
    const breakdown = [
      { open: 97.5, high: 98, low: 94, close: 94.5, volume: 2500 },
      { open: 94,   high: 95, low: 91, close: 91.5, volume: 2800 },
    ];
    candles.push(...ls, ...rise, ...head, ...rs, ...breakdown);
    return {
      candles,
      highlight: [8, candles.length - 1],
      lines: [{ price: 97, label: 'Neckline', color: '#f0b90b' }]
    };
  },

  genInverseHeadAndShoulders() {
    const candles = [];
    for (let i = 0; i < 8; i++) {
      const p = 110 - i * 0.8 + (Math.random() - 0.5);
      candles.push({ open: p + 0.4, high: p + 0.8, low: p - 0.8, close: p - 0.4, volume: 1200 });
    }
    // Inv left shoulder trough ~100
    const ls = [{ open: 103, high: 104, low: 99,  close: 100, volume: 1800 },
                { open: 101, high: 104, low: 100, close: 103, volume: 1400 }];
    // Drop to inv head ~94
    const drop = [{ open: 103, high: 104, low: 100, close: 101, volume: 1300 },
                  { open: 101, high: 102, low: 97,  close: 98,  volume: 1600 }];
    const head = [{ open: 98, high: 99, low: 93, close: 94, volume: 2200 },
                  { open: 95, high: 99, low: 94, close: 98, volume: 1700 }];
    // Inv right shoulder ~100
    const rs = [{ open: 98, high: 101, low: 97, close: 100, volume: 1500 },
                { open: 100, high: 103, low: 99, close: 102, volume: 1400 }];
    // Breakout above neckline (~103)
    const breakout = [
      { open: 103, high: 106, low: 102, close: 105.5, volume: 2500 },
      { open: 105, high: 109, low: 104, close: 108.5, volume: 2800 },
    ];
    candles.push(...ls, ...drop, ...head, ...rs, ...breakout);
    return {
      candles,
      highlight: [8, candles.length - 1],
      lines: [{ price: 103, label: 'Neckline', color: '#f0b90b' }]
    };
  },

  genDoubleTop() {
    const candles = [];
    for (let i = 0; i < 6; i++) {
      const p = 90 + i * 1.5;
      candles.push({ open: p - 0.4, high: p + 0.8, low: p - 0.8, close: p + 0.3, volume: 1200 });
    }
    // First top ~100
    candles.push({ open: 98, high: 101, low: 97, close: 100, volume: 2000 });
    candles.push({ open: 99, high: 100, low: 96, close: 97,  volume: 1600 });
    // Pullback to ~94
    for (let i = 0; i < 3; i++) {
      const p = 96 - i * 0.7;
      candles.push({ open: p + 0.3, high: p + 0.8, low: p - 0.6, close: p - 0.3, volume: 1100 });
    }
    // Second top ~100
    for (let i = 0; i < 3; i++) {
      const p = 94 + i * 2;
      candles.push({ open: p - 0.3, high: p + 1, low: p - 0.8, close: p + 0.4, volume: 1300 });
    }
    candles.push({ open: 99, high: 101, low: 98, close: 99.5, volume: 1900 });
    candles.push({ open: 99, high: 99.5, low: 95, close: 95.5, volume: 2200 });
    // Breakdown
    candles.push({ open: 95, high: 96, low: 91, close: 91.5, volume: 2600 });
    candles.push({ open: 91, high: 93, low: 88, close: 88.5, volume: 2900 });
    return {
      candles,
      highlight: [6, candles.length - 1],
      lines: [{ price: 100, label: 'Resistance', color: '#ef5350' },
              { price: 94,  label: 'Neckline',   color: '#f0b90b' }]
    };
  },

  genDoubleBottom() {
    const candles = [];
    for (let i = 0; i < 6; i++) {
      const p = 110 - i * 1.5;
      candles.push({ open: p + 0.4, high: p + 0.8, low: p - 0.8, close: p - 0.3, volume: 1200 });
    }
    candles.push({ open: 102, high: 103, low: 99, close: 100, volume: 2000 });
    candles.push({ open: 101, high: 104, low: 100, close: 103, volume: 1600 });
    for (let i = 0; i < 3; i++) {
      const p = 104 + i * 0.7;
      candles.push({ open: p - 0.3, high: p + 0.6, low: p - 0.8, close: p + 0.3, volume: 1100 });
    }
    for (let i = 0; i < 3; i++) {
      const p = 106 - i * 2;
      candles.push({ open: p + 0.3, high: p + 0.8, low: p - 1, close: p - 0.4, volume: 1300 });
    }
    candles.push({ open: 101, high: 102, low: 99, close: 100.5, volume: 1900 });
    candles.push({ open: 101, high: 105, low: 100, close: 104.5, volume: 2200 });
    candles.push({ open: 105, high: 109, low: 104, close: 108.5, volume: 2600 });
    return {
      candles,
      highlight: [6, candles.length - 1],
      lines: [{ price: 100, label: 'Support',  color: '#26a69a' },
              { price: 106, label: 'Neckline', color: '#f0b90b' }]
    };
  },

  genAscendingTriangle() {
    const candles = [];
    let support = 95;
    const resistance = 105;
    for (let i = 0; i < 20; i++) {
      const swing = i % 4;
      let p;
      if (swing < 2) {
        p = support + (i / 20) * 4 + Math.random() * 0.5;
        support += 0.15;
      } else {
        p = resistance - Math.random() * 1.5;
      }
      candles.push({
        open: p - 0.3, high: p + 0.8, low: p - 0.8, close: p + 0.2,
        volume: swing < 2 ? 1800 : 1200
      });
    }
    // Breakout
    candles.push({ open: 105, high: 108, low: 104, close: 107.5, volume: 3000 });
    candles.push({ open: 107, high: 111, low: 106, close: 110,   volume: 3200 });
    return {
      candles,
      lines: [{ price: 105, label: 'Resistance', color: '#ef5350' }]
    };
  },

  genDescendingTriangle() {
    const candles = [];
    let resistance = 105;
    const support = 95;
    for (let i = 0; i < 20; i++) {
      const swing = i % 4;
      let p;
      if (swing < 2) {
        p = support + Math.random() * 1.5;
      } else {
        p = resistance - (i / 20) * 4 - Math.random() * 0.5;
        resistance -= 0.15;
      }
      candles.push({
        open: p + 0.3, high: p + 0.8, low: p - 0.8, close: p - 0.2,
        volume: swing >= 2 ? 1800 : 1200
      });
    }
    candles.push({ open: 95, high: 96, low: 92, close: 92.5, volume: 3000 });
    candles.push({ open: 92, high: 93, low: 89, close: 89.5, volume: 3200 });
    return {
      candles,
      lines: [{ price: 95, label: 'Support', color: '#26a69a' }]
    };
  },

  genBullFlag() {
    const candles = [];
    // Pole — strong upward move
    for (let i = 0; i < 6; i++) {
      const p = 90 + i * 3;
      candles.push({ open: p - 0.3, high: p + 1, low: p - 0.5, close: p + 0.8, volume: 2500 - i * 50 });
    }
    // Flag — slight downward drift
    for (let i = 0; i < 8; i++) {
      const p = 107 - i * 0.5 + (Math.random() - 0.5);
      candles.push({ open: p + 0.2, high: p + 0.8, low: p - 0.8, close: p - 0.2, volume: 800 });
    }
    // Breakout
    candles.push({ open: 103.5, high: 107, low: 103, close: 106.5, volume: 2800 });
    candles.push({ open: 106,   high: 110, low: 105, close: 109.5, volume: 3000 });
    return {
      candles,
      highlight: [6, candles.length - 3]
    };
  },

  genBearFlag() {
    const candles = [];
    for (let i = 0; i < 6; i++) {
      const p = 110 - i * 3;
      candles.push({ open: p + 0.3, high: p + 0.5, low: p - 1, close: p - 0.8, volume: 2500 - i * 50 });
    }
    for (let i = 0; i < 8; i++) {
      const p = 93 + i * 0.5 + (Math.random() - 0.5);
      candles.push({ open: p - 0.2, high: p + 0.8, low: p - 0.8, close: p + 0.2, volume: 800 });
    }
    candles.push({ open: 96.5, high: 97, low: 93, close: 93.5, volume: 2800 });
    candles.push({ open: 94,   high: 94.5, low: 90, close: 90.5, volume: 3000 });
    return {
      candles,
      highlight: [6, candles.length - 3]
    };
  },

  genCupAndHandle() {
    const candles = [];
    // Left rim up
    for (let i = 0; i < 5; i++) {
      const p = 95 + i * 1.5;
      candles.push({ open: p - 0.3, high: p + 0.8, low: p - 0.6, close: p + 0.4, volume: 1400 });
    }
    // Cup bottom — gradual decline then recovery
    const cupPoints = [102, 100, 98, 96, 95, 95, 96, 98, 100, 102];
    cupPoints.forEach(p => {
      candles.push({ open: p - 0.3, high: p + 1, low: p - 1, close: p + 0.3, volume: 1000 });
    });
    // Handle — small pullback
    for (let i = 0; i < 5; i++) {
      const p = 102 - i * 0.6 + (Math.random() - 0.5) * 0.3;
      candles.push({ open: p + 0.2, high: p + 0.6, low: p - 0.6, close: p - 0.2, volume: 800 });
    }
    // Breakout
    candles.push({ open: 100, high: 104, low: 99, close: 103.5, volume: 2600 });
    candles.push({ open: 103, high: 107, low: 102, close: 106.5, volume: 3000 });
    return {
      candles,
      highlight: [5, candles.length - 3],
      lines: [{ price: 102.5, label: 'Rim', color: '#f0b90b' }]
    };
  },

  genRisingWedge() {
    const candles = [];
    let lo = 90, hi = 96;
    for (let i = 0; i < 18; i++) {
      const squeeze = i * 0.18;
      const mid = (lo + hi) / 2;
      candles.push({
        open:  mid - 0.3 + squeeze * 0.05,
        high:  hi  - squeeze * 0.4 + Math.random() * 0.3,
        low:   lo  + squeeze * 0.5 - Math.random() * 0.3,
        close: mid + 0.3 + squeeze * 0.05,
        volume: 1200
      });
      lo += 0.4; hi += 0.3;
    }
    // Breakdown
    candles.push({ open: 100, high: 100.5, low: 96, close: 96.5, volume: 2800 });
    candles.push({ open: 96,  high: 97,    low: 92, close: 92.5, volume: 3200 });
    return { candles };
  },

  genFallingWedge() {
    const candles = [];
    let lo = 104, hi = 110;
    for (let i = 0; i < 18; i++) {
      const squeeze = i * 0.18;
      const mid = (lo + hi) / 2;
      candles.push({
        open:  mid + 0.3 - squeeze * 0.05,
        high:  hi  - squeeze * 0.5 + Math.random() * 0.3,
        low:   lo  + squeeze * 0.4 - Math.random() * 0.3,
        close: mid - 0.3 - squeeze * 0.05,
        volume: 1200
      });
      lo -= 0.3; hi -= 0.4;
    }
    candles.push({ open: 100, high: 104, low: 99, close: 103.5, volume: 2800 });
    candles.push({ open: 103, high: 107, low: 102, close: 106.5, volume: 3200 });
    return { candles };
  },

  // ── Single-candle illustration configs ────────────────────────────────────
  // upperWick + bodyH + lowerWick = 1.0 (fractions of total drawing height)
  SINGLE_CANDLE_CONFIGS: {
    'doji':             { bull: false, upperWick: 0.47, bodyH: 0.06, lowerWick: 0.47 },
    'hammer':           { bull: true,  upperWick: 0.04, bodyH: 0.14, lowerWick: 0.82 },
    'inverted-hammer':  { bull: true,  upperWick: 0.82, bodyH: 0.14, lowerWick: 0.04 },
    'shooting-star':    { bull: false, upperWick: 0.82, bodyH: 0.14, lowerWick: 0.04 },
    'hanging-man':      { bull: false, upperWick: 0.04, bodyH: 0.14, lowerWick: 0.82 },
    'bull-marubozu':    { bull: true,  upperWick: 0.00, bodyH: 1.00, lowerWick: 0.00 },
    'bear-marubozu':    { bull: false, upperWick: 0.00, bodyH: 1.00, lowerWick: 0.00 },
    'spinning-top':     { bull: true,  upperWick: 0.40, bodyH: 0.14, lowerWick: 0.46 },
    'dragonfly-doji':   { bull: true,  upperWick: 0.02, bodyH: 0.04, lowerWick: 0.94 },
    'gravestone-doji':  { bull: false, upperWick: 0.94, bodyH: 0.04, lowerWick: 0.02 },
  },

  // Renders a single large, clean candle illustration (no axes, no context)
  renderSingleCandleIllustration(canvas, type) {
    const config = this.SINGLE_CANDLE_CONFIGS[type];
    if (!config) return;

    const ctx    = canvas.getContext('2d');
    const W      = canvas.width;
    const H      = canvas.height;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = isDark ? '#161b22' : '#f6f8fa';
    ctx.fillRect(0, 0, W, H);

    const { bull, upperWick, bodyH, lowerWick } = config;
    const color  = bull ? (isDark ? '#26a69a' : '#1a7f64') : (isDark ? '#ef5350' : '#cf222e');
    const padV   = H * 0.08;
    const drawH  = H - 2 * padV;
    const cx     = W / 2;
    const bW     = Math.round(Math.min(W * 0.38, 22));

    const wickTopY    = padV;
    const bodyTopY    = padV + upperWick * drawH;
    const bodyBotY    = bodyTopY + Math.max(2, bodyH * drawH);
    const wickBotY    = bodyBotY + lowerWick * drawH;

    // Full wick
    ctx.strokeStyle = color;
    ctx.lineWidth   = 2;
    ctx.beginPath();
    ctx.moveTo(cx, wickTopY);
    ctx.lineTo(cx, wickBotY);
    ctx.stroke();

    // Body
    ctx.fillStyle = color;
    ctx.fillRect(cx - bW / 2, bodyTopY, bW, Math.max(2, bodyBotY - bodyTopY));
  },

  // Renders a compact inline pattern (no price axis, tight padding)
  renderInline(canvas, candles, opts = {}) {
    if (!candles || !candles.length) return;

    const ctx    = canvas.getContext('2d');
    const W      = canvas.width;
    const H      = canvas.height;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const pad    = { top: 6, right: 6, bottom: 6, left: 6 };
    const cW     = W - pad.left - pad.right;
    const cH     = H - pad.top  - pad.bottom;

    const bg     = isDark ? '#161b22' : '#f6f8fa';
    const bullC  = isDark ? '#26a69a' : '#1a7f64';
    const bearC  = isDark ? '#ef5350' : '#cf222e';
    const hlC    = 'rgba(255,200,0,0.15)';

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    const highs = candles.map(c => c.high);
    const lows  = candles.map(c => c.low);
    let maxP = Math.max(...highs);
    let minP = Math.min(...lows);
    const margin = (maxP - minP) * 0.12;
    maxP += margin; minP -= margin;
    const priceRange = maxP - minP || 1;

    const toY   = p  => pad.top + cH - ((p - minP) / priceRange * cH);
    const n     = candles.length;
    const slotW = cW / n;
    const bodyW = Math.max(2, slotW * 0.58);
    const toX   = i  => pad.left + i * slotW + slotW / 2;

    if (opts.highlight) {
      const [from, to] = opts.highlight;
      ctx.fillStyle = hlC;
      ctx.fillRect(pad.left + from * slotW, pad.top, (to - from + 1) * slotW, cH);
    }

    candles.forEach((c, i) => {
      const x      = toX(i);
      const openY  = toY(c.open);
      const closeY = toY(c.close);
      const highY  = toY(c.high);
      const lowY   = toY(c.low);
      const bull   = c.close >= c.open;
      const color  = bull ? bullC : bearC;

      ctx.strokeStyle = color;
      ctx.lineWidth   = 1.5;
      ctx.beginPath();
      ctx.moveTo(x, highY);
      ctx.lineTo(x, lowY);
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.fillRect(
        x - bodyW / 2,
        Math.min(openY, closeY),
        bodyW,
        Math.max(2, Math.abs(closeY - openY))
      );
    });
  },

  // ── Illustration generators (compact, 2-3 candles only) ───────────────────

  illustrationEngulfingBull() {
    const p = 100;
    return {
      candles: [
        { open: p+1.5, high: p+1.8, low: p-0.2, close: p,     volume: 900  },
        { open: p-0.5, high: p+3.2, low: p-0.8, close: p+3.0, volume: 2400 },
      ],
      highlight: [0, 1],
    };
  },

  illustrationEngulfingBear() {
    const p = 100;
    return {
      candles: [
        { open: p-1.5, high: p+0.2, low: p-1.8, close: p,     volume: 900  },
        { open: p+0.5, high: p+0.8, low: p-3.2, close: p-3.0, volume: 2400 },
      ],
      highlight: [0, 1],
    };
  },

  illustrationHaramiBull() {
    const p = 100;
    return {
      candles: [
        { open: p+2.8, high: p+3.0, low: p-0.2, close: p,     volume: 1600 },
        { open: p+0.4, high: p+1.2, low: p+0.1, close: p+0.9, volume: 700  },
      ],
      highlight: [0, 1],
    };
  },

  illustrationHaramiBear() {
    const p = 100;
    return {
      candles: [
        { open: p-2.8, high: p+0.2, low: p-3.0, close: p,     volume: 1600 },
        { open: p-0.4, high: p-0.1, low: p-1.2, close: p-0.9, volume: 700  },
      ],
      highlight: [0, 1],
    };
  },

  illustrationPiercingLine() {
    const p = 100;
    return {
      candles: [
        { open: p+2.5, high: p+2.8, low: p-0.5, close: p,     volume: 1400 },
        { open: p-0.8, high: p+1.6, low: p-1.0, close: p+1.4, volume: 1900 },
      ],
      highlight: [0, 1],
    };
  },

  illustrationDarkCloud() {
    const p = 100;
    return {
      candles: [
        { open: p-2.5, high: p+0.5, low: p-2.8, close: p,     volume: 1400 },
        { open: p+0.8, high: p+1.0, low: p-1.6, close: p-1.4, volume: 1900 },
      ],
      highlight: [0, 1],
    };
  },

  illustrationMorningStar() {
    const p = 100;
    return {
      candles: [
        { open: p+2.8, high: p+3.0, low: p-0.2, close: p,     volume: 1500 },
        { open: p-0.3, high: p+0.5, low: p-0.8, close: p-0.1, volume: 700  },
        { open: p+0.2, high: p+3.2, low: p-0.1, close: p+3.0, volume: 2100 },
      ],
      highlight: [0, 2],
    };
  },

  illustrationEveningStar() {
    const p = 100;
    return {
      candles: [
        { open: p-2.8, high: p+0.2, low: p-3.0, close: p,     volume: 1500 },
        { open: p+0.3, high: p+0.8, low: p-0.5, close: p+0.1, volume: 700  },
        { open: p-0.2, high: p+0.1, low: p-3.2, close: p-3.0, volume: 2100 },
      ],
      highlight: [0, 2],
    };
  },

  illustrationThreeWhiteSoldiers() {
    return {
      candles: [
        { open: 98.3, high: 100.8, low: 98.0, close: 100.5, volume: 2000 },
        { open: 100.6, high: 103.2, low: 100.4, close: 103.0, volume: 2300 },
        { open: 103.1, high: 105.8, low: 102.9, close: 105.5, volume: 2600 },
      ],
      highlight: [0, 2],
    };
  },

  illustrationThreeBlackCrows() {
    return {
      candles: [
        { open: 101.7, high: 102.0, low: 99.5, close: 99.8, volume: 2000 },
        { open: 99.6,  high: 99.9,  low: 97.3, close: 97.5, volume: 2300 },
        { open: 97.4,  high: 97.7,  low: 95.0, close: 95.2, volume: 2600 },
      ],
      highlight: [0, 2],
    };
  },

  // ── Indicator computation helpers ──────────────────────────────────────────

  _computeSMA(values, period) {
    return values.map((_, i) => {
      if (i < period - 1) return null;
      let sum = 0;
      for (let j = i - period + 1; j <= i; j++) sum += values[j];
      return sum / period;
    });
  },

  _computeEMA(values, period) {
    const k = 2 / (period + 1);
    const result = new Array(values.length).fill(null);
    const startIdx = values.findIndex(v => v !== null);
    if (startIdx === -1 || startIdx + period > values.length) return result;
    let sum = 0;
    for (let j = startIdx; j < startIdx + period; j++) sum += values[j];
    result[startIdx + period - 1] = sum / period;
    for (let j = startIdx + period; j < values.length; j++) {
      result[j] = values[j] * k + result[j - 1] * (1 - k);
    }
    return result;
  },

  _computeRSI(closes, period) {
    period = period || 14;
    const result = new Array(closes.length).fill(null);
    if (closes.length < period + 1) return result;
    let avgGain = 0, avgLoss = 0;
    for (let i = 1; i <= period; i++) {
      const d = closes[i] - closes[i - 1];
      if (d >= 0) avgGain += d; else avgLoss -= d;
    }
    avgGain /= period; avgLoss /= period;
    result[period] = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss);
    for (let i = period + 1; i < closes.length; i++) {
      const d = closes[i] - closes[i - 1];
      avgGain = (avgGain * (period - 1) + (d >= 0 ? d : 0)) / period;
      avgLoss = (avgLoss * (period - 1) + (d < 0 ? -d : 0)) / period;
      result[i] = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss);
    }
    return result;
  },

  _computeMACD(closes, fast, slow, signal) {
    fast = fast || 12; slow = slow || 26; signal = signal || 9;
    const fastEMA = this._computeEMA(closes, fast);
    const slowEMA = this._computeEMA(closes, slow);
    const macdLine = closes.map((_, i) =>
      fastEMA[i] !== null && slowEMA[i] !== null ? fastEMA[i] - slowEMA[i] : null
    );
    const signalLine = this._computeEMA(macdLine, signal);
    const histogram = macdLine.map((v, i) =>
      v !== null && signalLine[i] !== null ? v - signalLine[i] : null
    );
    return { macdLine, signalLine, histogram };
  },

  _computeBollinger(closes, period, mult) {
    period = period || 20; mult = mult || 2;
    const middle = this._computeSMA(closes, period);
    const upper = [], lower = [];
    for (let i = 0; i < closes.length; i++) {
      if (middle[i] === null) { upper.push(null); lower.push(null); continue; }
      const slice = closes.slice(i - period + 1, i + 1);
      const std = Math.sqrt(slice.reduce((s, v) => s + (v - middle[i]) ** 2, 0) / period);
      upper.push(middle[i] + mult * std);
      lower.push(middle[i] - mult * std);
    }
    return { upper, middle, lower };
  },

  _computeStochastic(candles, period) {
    period = period || 14;
    const k = candles.map((_, i) => {
      if (i < period - 1) return null;
      const slice = candles.slice(i - period + 1, i + 1);
      const hi = Math.max(...slice.map(c => c.high));
      const lo = Math.min(...slice.map(c => c.low));
      return hi === lo ? 50 : (candles[i].close - lo) / (hi - lo) * 100;
    });
    const d = new Array(candles.length).fill(null);
    for (let i = period + 1; i < candles.length; i++) {
      if (k[i] === null || k[i-1] === null || k[i-2] === null) continue;
      d[i] = (k[i] + k[i-1] + k[i-2]) / 3;
    }
    return { k, d };
  },

  _computeVWAP(candles) {
    let cumTV = 0, cumV = 0;
    return candles.map(c => {
      const tp = (c.high + c.low + c.close) / 3;
      cumTV += tp * c.volume;
      cumV  += c.volume;
      return cumV ? cumTV / cumV : tp;
    });
  },

  _computeOBV(candles) {
    let obv = 0;
    return candles.map((c, i) => {
      if (i === 0) return 0;
      if (c.close > candles[i - 1].close) obv += c.volume;
      else if (c.close < candles[i - 1].close) obv -= c.volume;
      return obv;
    });
  },

  // ── Indicator chart renderer ───────────────────────────────────────────────

  renderIndicatorChart(canvas, opts) {
    const ctx    = canvas.getContext('2d');
    const W      = canvas.width;
    const H      = canvas.height;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    const bg    = isDark ? '#161b22' : '#f6f8fa';
    const grid  = isDark ? '#21262d' : '#e8ecf0';
    const textC = isDark ? '#8b949e' : '#6e7681';
    const bullC = isDark ? '#26a69a' : '#1a7f64';
    const bearC = isDark ? '#ef5350' : '#cf222e';

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    const { candles, overlayLines = [], bands = null, subpanel = null } = opts;
    if (!candles || !candles.length) return;

    const hasSubpanel = subpanel !== null;
    const priceH = hasSubpanel ? Math.floor(H * 0.62) : H;
    const subH   = hasSubpanel ? H - priceH : 0;

    const hasLabels = overlayLines.some(l => l.label);
    const pPad = { top: 8, right: hasLabels ? 52 : 10, bottom: hasSubpanel ? 4 : 18, left: 40 };
    const pCW  = W - pPad.left - pPad.right;
    const pCH  = priceH - pPad.top - pPad.bottom;

    // Price range (expand to include overlays and bands)
    let maxP = Math.max(...candles.map(c => c.high));
    let minP = Math.min(...candles.map(c => c.low));
    if (bands) {
      const vu = bands.upper.filter(v => v !== null);
      const vl = bands.lower.filter(v => v !== null);
      if (vu.length) maxP = Math.max(maxP, ...vu);
      if (vl.length) minP = Math.min(minP, ...vl);
    }
    overlayLines.forEach(l => {
      const vv = l.values.filter(v => v !== null);
      if (vv.length) { maxP = Math.max(maxP, ...vv); minP = Math.min(minP, ...vv); }
    });
    const pm   = (maxP - minP) * 0.06;
    maxP += pm; minP -= pm;
    const pRng = maxP - minP || 1;

    const n     = candles.length;
    const slotW = pCW / n;
    const bodyW = Math.max(1.5, slotW * 0.55);
    const toX   = i => pPad.left + i * slotW + slotW / 2;
    const toY   = p => pPad.top + pCH - ((p - minP) / pRng * pCH);

    // Price grid
    ctx.font = '9px monospace';
    for (let i = 0; i <= 4; i++) {
      const price = minP + (pRng / 4) * i;
      const y     = toY(price);
      if (y < pPad.top - 1 || y > pPad.top + pCH + 1) continue;
      ctx.strokeStyle = grid; ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(pPad.left, y); ctx.lineTo(W - pPad.right, y); ctx.stroke();
      ctx.fillStyle = textC; ctx.textAlign = 'right';
      ctx.fillText(price.toFixed(0), pPad.left - 3, y + 3);
    }

    // Bollinger Bands
    if (bands) {
      ctx.fillStyle = isDark ? 'rgba(120,120,230,0.07)' : 'rgba(80,80,200,0.07)';
      ctx.beginPath();
      let started = false;
      for (let i = 0; i < n; i++) {
        if (bands.upper[i] === null) continue;
        const x = toX(i), y = toY(bands.upper[i]);
        if (!started) { ctx.moveTo(x, y); started = true; } else ctx.lineTo(x, y);
      }
      for (let i = n - 1; i >= 0; i--) {
        if (bands.lower[i] === null) continue;
        ctx.lineTo(toX(i), toY(bands.lower[i]));
      }
      ctx.closePath(); ctx.fill();
      ['upper', 'middle', 'lower'].forEach((key, ki) => {
        ctx.strokeStyle = isDark ? 'rgba(160,160,230,0.65)' : 'rgba(80,80,180,0.55)';
        ctx.lineWidth = ki === 1 ? 1.5 : 1;
        ctx.setLineDash(ki === 1 ? [4, 3] : []);
        ctx.beginPath(); started = false;
        for (let i = 0; i < n; i++) {
          if (bands[key][i] === null) continue;
          const x = toX(i), y = toY(bands[key][i]);
          if (!started) { ctx.moveTo(x, y); started = true; } else ctx.lineTo(x, y);
        }
        ctx.stroke(); ctx.setLineDash([]);
      });
    }

    // Candles
    candles.forEach((c, i) => {
      const x      = toX(i);
      const openY  = toY(c.open);
      const closeY = toY(c.close);
      const highY  = toY(c.high);
      const lowY   = toY(c.low);
      const bull   = c.close >= c.open;
      const color  = bull ? bullC : bearC;
      ctx.strokeStyle = color; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x, highY); ctx.lineTo(x, lowY); ctx.stroke();
      ctx.fillStyle = color;
      ctx.fillRect(x - bodyW / 2, Math.min(openY, closeY), bodyW, Math.max(1.5, Math.abs(closeY - openY)));
    });

    // Overlay lines
    overlayLines.forEach(line => {
      ctx.strokeStyle = line.color; ctx.lineWidth = 1.5;
      ctx.setLineDash(line.dash ? [4, 3] : []);
      ctx.beginPath(); let started = false;
      for (let i = 0; i < n; i++) {
        if (line.values[i] === null) continue;
        const x = toX(i), y = toY(line.values[i]);
        if (!started) { ctx.moveTo(x, y); started = true; } else ctx.lineTo(x, y);
      }
      ctx.stroke(); ctx.setLineDash([]);
      if (line.label) {
        const li = line.values.reduce((best, v, i) => v !== null ? i : best, -1);
        if (li >= 0) {
          ctx.fillStyle = line.color; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'right';
          ctx.fillText(line.label, W - 4, toY(line.values[li]) + 3);
        }
      }
    });

    // Subpanel
    if (subpanel) {
      const spY0  = priceH;
      const sPad  = { top: 4, right: 10, bottom: 14, left: 40 };
      const spCH  = subH - sPad.top - sPad.bottom;
      const spMin = subpanel.min !== undefined ? subpanel.min : 0;
      const spMax = subpanel.max !== undefined ? subpanel.max : 100;
      const spRng = spMax - spMin || 1;
      const toSY  = v => spY0 + sPad.top + spCH - ((v - spMin) / spRng * spCH);

      // Divider line
      ctx.strokeStyle = grid; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, spY0); ctx.lineTo(W, spY0); ctx.stroke();

      // Panel label
      if (subpanel.label) {
        ctx.fillStyle = textC; ctx.font = '9px monospace'; ctx.textAlign = 'left';
        ctx.fillText(subpanel.label, pPad.left + 2, spY0 + sPad.top + 9);
      }

      // Zone lines
      (subpanel.zones || []).forEach(z => {
        const y = toSY(z.level);
        if (y < spY0 + 1 || y > spY0 + subH - 1) return;
        ctx.strokeStyle = z.color || '#f0b90b'; ctx.lineWidth = 0.8;
        ctx.setLineDash([4, 3]);
        ctx.beginPath(); ctx.moveTo(pPad.left, y); ctx.lineTo(W - sPad.right, y); ctx.stroke();
        ctx.setLineDash([]);
        if (z.label) {
          ctx.fillStyle = z.color || '#f0b90b'; ctx.font = '8px monospace'; ctx.textAlign = 'right';
          ctx.fillText(z.label, pPad.left - 2, y - 2);
        }
      });

      // Y-axis labels
      ctx.fillStyle = textC; ctx.font = '9px monospace'; ctx.textAlign = 'right';
      [spMin, (spMin + spMax) / 2, spMax].forEach(v => {
        const y = toSY(v);
        if (y > spY0 + 2 && y < spY0 + subH - 2)
          ctx.fillText(v.toFixed(0), pPad.left - 3, y + 3);
      });

      // Histogram bars
      if (subpanel.histogram) {
        const zeroY = toSY(Math.max(spMin, Math.min(spMax, 0)));
        subpanel.histogram.forEach((v, i) => {
          if (v === null) return;
          const x = toX(i), y = toSY(v);
          ctx.fillStyle = v >= 0 ? bullC : bearC;
          ctx.fillRect(x - bodyW / 2, Math.min(y, zeroY), bodyW, Math.abs(y - zeroY) || 1);
        });
      }

      // Subpanel lines
      (subpanel.lines || []).forEach(line => {
        ctx.strokeStyle = line.color; ctx.lineWidth = 1.5;
        ctx.setLineDash(line.dash ? [3, 2] : []);
        ctx.beginPath(); let started = false;
        for (let i = 0; i < n; i++) {
          if (line.values[i] === null) continue;
          const x = toX(i), y = toSY(line.values[i]);
          if (!started) { ctx.moveTo(x, y); started = true; } else ctx.lineTo(x, y);
        }
        ctx.stroke(); ctx.setLineDash([]);
      });
    }
  },

  // ── Indicator illustration generators ─────────────────────────────────────

  illustrationMovingAverages() {
    const candles = this._baseline(35, 90, 0.3, 1.8);
    const closes  = candles.map(c => c.close);
    return {
      candles,
      overlayLines: [
        { values: this._computeSMA(closes, 20),  color: '#f0b90b', label: 'SMA 20', dash: true  },
        { values: this._computeEMA(closes, 9),   color: '#7c4dff', label: 'EMA 9',  dash: false },
      ],
    };
  },

  illustrationGoldenCross() {
    const candles = [];
    for (let i = 0; i < 18; i++) {
      const p = 112 - i * 0.9 + (Math.random() - 0.5);
      candles.push({ open: p + 0.3, high: p + 1.1, low: p - 1.1, close: p - 0.3, volume: 1200 });
    }
    for (let i = 0; i < 22; i++) {
      const p = 96 + i * 0.9 + (Math.random() - 0.5);
      candles.push({ open: p - 0.3, high: p + 1.1, low: p - 1.1, close: p + 0.3, volume: 1400 + i * 40 });
    }
    const closes = candles.map(c => c.close);
    return {
      candles,
      overlayLines: [
        { values: this._computeEMA(closes, 10), color: '#26a69a', label: 'Fast MA', dash: false },
        { values: this._computeSMA(closes, 22), color: '#ef5350', label: 'Slow MA', dash: true  },
      ],
    };
  },

  illustrationMACD() {
    const candles = [];
    for (let i = 0; i < 25; i++) {
      const p = 105 - i * 0.5 + (Math.random() - 0.5) * 1.5;
      candles.push({ open: p + 0.3, high: p + 1.2, low: p - 1.2, close: p - 0.3, volume: 1200 });
    }
    for (let i = 0; i < 25; i++) {
      const p = 93 + i * 0.65 + (Math.random() - 0.5) * 1.5;
      candles.push({ open: p - 0.3, high: p + 1.2, low: p - 1.2, close: p + 0.3, volume: 1400 + i * 30 });
    }
    const closes  = candles.map(c => c.close);
    const { macdLine, signalLine, histogram } = this._computeMACD(closes, 12, 26, 9);
    const valid   = histogram.filter(v => v !== null);
    const extreme = Math.max(Math.abs(Math.min(...valid)), Math.abs(Math.max(...valid)));
    return {
      candles,
      subpanel: {
        label: 'MACD',
        min: -extreme * 1.3,
        max:  extreme * 1.3,
        histogram,
        lines: [
          { values: macdLine,   color: '#26a69a', dash: false },
          { values: signalLine, color: '#ef5350', dash: true  },
        ],
        zones: [],
      },
    };
  },

  illustrationRSI() {
    const candles = [];
    for (let i = 0; i < 20; i++) {
      const p = 90 + i * 1.3 + (Math.random() - 0.5) * 0.8;
      candles.push({ open: p - 0.3, high: p + 1.1, low: p - 1.1, close: p + 0.3, volume: 1400 + i * 50 });
    }
    for (let i = 0; i < 20; i++) {
      const p = 115 - i * 1.4 + (Math.random() - 0.5) * 0.8;
      candles.push({ open: p + 0.3, high: p + 1.1, low: p - 1.1, close: p - 0.3, volume: 1200 });
    }
    const closes = candles.map(c => c.close);
    return {
      candles,
      subpanel: {
        label: 'RSI',
        min: 0, max: 100,
        lines: [{ values: this._computeRSI(closes, 14), color: '#7c4dff', dash: false }],
        zones: [
          { level: 70, color: '#ef5350', label: '70' },
          { level: 30, color: '#26a69a', label: '30' },
        ],
      },
    };
  },

  illustrationStochastic() {
    const candles = [];
    for (let i = 0; i < 40; i++) {
      const p = 100 + Math.sin(i * 0.38) * 9 + (Math.random() - 0.5) * 2;
      candles.push({ open: p - 0.4, high: p + 1.8, low: p - 1.8, close: p + 0.4, volume: 1200 });
    }
    const { k, d } = this._computeStochastic(candles, 14);
    return {
      candles,
      subpanel: {
        label: 'Stoch',
        min: 0, max: 100,
        lines: [
          { values: k, color: '#26a69a', dash: false },
          { values: d, color: '#f0b90b', dash: true  },
        ],
        zones: [
          { level: 80, color: '#ef5350', label: '80' },
          { level: 20, color: '#26a69a', label: '20' },
        ],
      },
    };
  },

  illustrationBollingerBands() {
    const candles = [];
    for (let i = 0; i < 22; i++) {
      const p = 100 + (Math.random() - 0.5) * 2.5;
      candles.push({ open: p - 0.2, high: p + 0.9, low: p - 0.9, close: p + 0.2, volume: 800 });
    }
    for (let i = 0; i < 18; i++) {
      const p = 100 + i * 1.4 + (Math.random() - 0.5) * 1.5;
      candles.push({ open: p - 0.3, high: p + 2.2, low: p - 1.8, close: p + 0.6, volume: 1700 + i * 80 });
    }
    const closes = candles.map(c => c.close);
    return {
      candles,
      bands: this._computeBollinger(closes, 20, 2),
    };
  },

  illustrationVWAP() {
    const candles = [];
    for (let i = 0; i < 20; i++) {
      const p = 96 - i * 0.25 + (Math.random() - 0.5) * 1.8;
      candles.push({ open: p + 0.3, high: p + 1.2, low: p - 1.2, close: p - 0.2, volume: 900 + Math.random() * 400 });
    }
    for (let i = 0; i < 20; i++) {
      const p = 91 + i * 0.95 + (Math.random() - 0.5) * 1.8;
      candles.push({ open: p - 0.3, high: p + 1.5, low: p - 1.2, close: p + 0.5, volume: 1700 + i * 90 });
    }
    return {
      candles,
      overlayLines: [
        { values: this._computeVWAP(candles), color: '#f0b90b', label: 'VWAP', dash: false },
      ],
    };
  },

  illustrationOBV() {
    const candles = [];
    // Two price peaks — 2nd is higher but OBV fails to confirm (bearish divergence)
    for (let i = 0; i < 10; i++) {
      const p = 94 + i * 1.2;
      candles.push({ open: p - 0.3, high: p + 1.0, low: p - 1.0, close: p + 0.3, volume: 2000 - i * 60 });
    }
    for (let i = 0; i < 6; i++) {
      const p = 106 - i * 0.8;
      candles.push({ open: p + 0.2, high: p + 0.9, low: p - 0.9, close: p - 0.2, volume: 900 + i * 40 });
    }
    for (let i = 0; i < 9; i++) {
      const p = 100 + i * 1.0;
      candles.push({ open: p - 0.3, high: p + 0.9, low: p - 0.9, close: p + 0.3, volume: 1100 - i * 55 });
    }
    for (let i = 0; i < 5; i++) {
      const p = 109 - i * 0.9;
      candles.push({ open: p + 0.2, high: p + 0.8, low: p - 0.8, close: p - 0.2, volume: 650 + i * 25 });
    }
    for (let i = 0; i < 10; i++) {
      const p = 104 - i * 1.1;
      candles.push({ open: p + 0.3, high: p + 0.9, low: p - 1.1, close: p - 0.4, volume: 1900 + i * 60 });
    }
    const obv    = this._computeOBV(candles);
    const obvMin = Math.min(...obv);
    const obvMax = Math.max(...obv);
    const obvPad = (obvMax - obvMin) * 0.15;
    return {
      candles,
      subpanel: {
        label: 'OBV',
        min: obvMin - obvPad,
        max: obvMax + obvPad,
        lines: [{ values: obv, color: '#7c4dff', dash: false }],
        zones: [],
      },
    };
  },
};
