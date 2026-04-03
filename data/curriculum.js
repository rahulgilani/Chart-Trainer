// data/curriculum.js — All module & lesson content
const CURRICULUM = [
  {
    id: 'module-1',
    title: 'Chart Fundamentals',
    icon: '📊',
    description: 'The building blocks: chart types, candlestick anatomy, and how timeframes shape what you see.',
    checkInIds: ['q1-ci-01', 'q1-ci-02'],
    quizIds: ['q1-01','q1-02','q1-03','q1-04','q1-05','q1-06','q1-07','q1-08','q1-09','q1-10','q1-11','q1-12'],
    sections: [
      {
        id: 's1-1',
        title: 'What Is a Market Chart?',
        content: `
<p>A market chart is a visual record of an asset's price over time. Every bar, candle, or data point represents a specific time period — whether that's one minute, one hour, or one day. Charts allow you to see, at a glance, where price has been, how fast it moved, and where it may be headed.</p>

<p>Traders and analysts use charts because human psychology is consistent. The same patterns of fear, greed, indecision, and conviction play out repeatedly across markets and time. A chart is essentially a record of collective human behavior.</p>

<div class="info-box">
  <strong>Why charts matter:</strong>
  <ul>
    <li>They summarize thousands of trades into a readable picture</li>
    <li>They reveal supply and demand imbalances before they're reflected in fundamentals</li>
    <li>They allow you to define clear entries, exits, and risk levels</li>
    <li>They work across every asset class: stocks, forex, crypto, commodities, futures</li>
  </ul>
</div>

<p>Technical analysis is the study of charts to forecast future price behavior. It operates on three core assumptions:</p>
<ol>
  <li><strong>Price discounts everything</strong> — all known information is already reflected in the price</li>
  <li><strong>Price moves in trends</strong> — once a trend begins, it tends to continue until it doesn't</li>
  <li><strong>History repeats</strong> — market participants react similarly to similar situations, creating repeating patterns</li>
</ol>
`
      },
      {
        id: 's1-2',
        title: 'Types of Charts',
        content: `
<p>There are four primary chart types you will encounter. Each shows the same underlying price data but emphasizes different aspects.</p>

<div class="chart-types-grid">
  <div class="chart-type-card">
    <h4>Line Chart</h4>
    <p>Connects the <strong>closing price</strong> of each period with a line. The simplest view — good for seeing the big-picture trend, poor for intraday detail. Often used in news articles and financial reporting.</p>
    <p class="chart-verdict">Best for: long-term trend overview, presentation.</p>
  </div>
  <div class="chart-type-card">
    <h4>Bar Chart (OHLC)</h4>
    <p>Each bar shows four prices: Open (left tick), High (top), Low (bottom), Close (right tick). Contains the same information as a candlestick but is visually harder to read at speed.</p>
    <p class="chart-verdict">Best for: detailed price analysis in professional settings.</p>
  </div>
  <div class="chart-type-card">
    <h4>Candlestick Chart ⭐</h4>
    <p>The same OHLC data as a bar chart, but displayed with a colored body (open-to-close range) and wicks (high/low). Much easier to read patterns visually. <strong>This is the industry standard.</strong></p>
    <p class="chart-verdict">Best for: everything — pattern recognition, entries, exits.</p>
  </div>
  <div class="chart-type-card">
    <h4>Heikin-Ashi Chart</h4>
    <p>Uses <em>averaged</em> OHLC values: the close is the average of OHLC; the open is the average of prior HA open and close. This smooths noise, making trends more visually clear.</p>
    <p class="chart-verdict">⚠ Warning: HA candles are <strong>lagging</strong>. Never use exact HA prices for order placement or stop losses.</p>
  </div>
</div>
`
      },
      {
        id: 's1-3',
        title: 'Candlestick Anatomy',
        content: `
<p>Understanding a candlestick precisely is foundational. Every candlestick tells a story about the battle between buyers and sellers during that period.</p>

<div class="anatomy-diagram">
  <div class="candle-visual">
    <div class="wick-top"></div>
    <div class="candle-body bull">BODY</div>
    <div class="wick-bottom"></div>
  </div>
  <div class="anatomy-labels">
    <div class="label"><strong>Upper Wick</strong> → High of the session. Sellers rejected this price.</div>
    <div class="label"><strong>Body Top</strong> → Close price (bullish) or Open price (bearish)</div>
    <div class="label"><strong>Body Bottom</strong> → Open price (bullish) or Close price (bearish)</div>
    <div class="label"><strong>Lower Wick</strong> → Low of the session. Buyers rejected this price.</div>
  </div>
</div>

<h4>Reading the Story</h4>
<ul>
  <li><strong>Large body, small wicks</strong> → Strong conviction. One side dominated all session.</li>
  <li><strong>Small body, long wicks</strong> → Indecision. Both sides fought and neither won decisively.</li>
  <li><strong>Long lower wick</strong> → Sellers tried to push price down; buyers overwhelmed them.</li>
  <li><strong>Long upper wick</strong> → Buyers tried to push price up; sellers overwhelmed them.</li>
  <li><strong>No lower wick on bullish candle</strong> → Price never went below the open — pure buying pressure.</li>
</ul>

<div class="info-box">
  <strong>Color convention:</strong> Green or white = bullish (close > open). Red or black = bearish (close < open). The colors are display settings — what matters is the relationship between open and close.
</div>
`
      },
      {
        id: 's1-4',
        title: 'Timeframes',
        content: `
<p>Every candlestick represents exactly one time period. A 1-hour candlestick shows all price action within that hour. A daily candlestick shows the entire day's OHLC. The same asset looks completely different depending on which timeframe you're viewing.</p>

<table class="data-table">
  <thead><tr><th>Timeframe</th><th>Candles per day</th><th>Typical use</th><th>Trading style</th></tr></thead>
  <tbody>
    <tr><td>1-min (M1)</td><td>~390</td><td>Scalping, tape reading</td><td>Scalper</td></tr>
    <tr><td>5-min (M5)</td><td>~78</td><td>Day trading entries</td><td>Day trader</td></tr>
    <tr><td>15-min (M15)</td><td>~26</td><td>Day trading context</td><td>Day trader</td></tr>
    <tr><td>1-hour (H1)</td><td>6.5</td><td>Swing entries + context</td><td>Swing trader</td></tr>
    <tr><td>4-hour (H4)</td><td>~1.6</td><td>Trend direction</td><td>Swing/position</td></tr>
    <tr><td>Daily (D1)</td><td>1</td><td>Primary trend analysis</td><td>Swing/position</td></tr>
    <tr><td>Weekly (W1)</td><td>0.2</td><td>Big picture trend</td><td>Position/investor</td></tr>
    <tr><td>Monthly (MN)</td><td>~0.05</td><td>Macro/secular trends</td><td>Long-term investor</td></tr>
  </tbody>
</table>

<h4>The Noise Problem</h4>
<p>Lower timeframes have more price "noise" — random, meaningless fluctuations. A 1-minute chart of a stock will look chaotic even while the daily chart shows a clean uptrend. The longer the timeframe, the more significant each candle and each signal.</p>

<div class="info-box warning">
  <strong>Key principle:</strong> Always check a higher timeframe before entering on a lower one. Never trade against the higher-timeframe trend.
</div>
`
      },
    ]
  },

  {
    id: 'module-2',
    title: 'Market Structure',
    icon: '🏗️',
    description: 'Trends, support & resistance, channels, and how volume confirms price moves.',
    checkInIds: ['q2-ci-01'],
    quizIds: ['q2-01','q2-02','q2-03','q2-04','q2-05','q2-06','q2-07','q2-08','q2-09','q2-10','q2-11'],
    sections: [
      {
        id: 's2-1',
        title: 'Trends: The Foundation',
        content: `
<p>Charles Dow, the founder of the Dow Jones Index, defined market structure in the late 1800s. His principles remain the bedrock of technical analysis today.</p>

<h4>The Three Trend Types</h4>
<div class="three-col">
  <div class="col-card bullish">
    <h5>Uptrend</h5>
    <p>Series of <strong>Higher Highs (HH)</strong> and <strong>Higher Lows (HL)</strong></p>
    <p>Each rally goes higher than the last. Each pullback holds above the prior low.</p>
  </div>
  <div class="col-card neutral">
    <h5>Sideways (Range)</h5>
    <p>Price oscillates between <strong>equal highs</strong> and <strong>equal lows</strong></p>
    <p>Supply and demand are balanced. No directional bias.</p>
  </div>
  <div class="col-card bearish">
    <h5>Downtrend</h5>
    <p>Series of <strong>Lower Highs (LH)</strong> and <strong>Lower Lows (LL)</strong></p>
    <p>Each rally fails to reach the prior high. Each selloff goes deeper.</p>
  </div>
</div>

<h4>Trend Change Signals</h4>
<p>A trend doesn't reverse instantly. Look for these early warnings:</p>
<ul>
  <li><strong>Uptrend warning:</strong> First lower low forms (HL turns to LL)</li>
  <li><strong>Uptrend break:</strong> Price fails to make a higher high AND makes a lower low</li>
  <li><strong>Downtrend warning:</strong> First higher high forms (LH turns to HH)</li>
</ul>

<div class="info-box">
  <strong>Remember:</strong> "The trend is your friend until it bends." Trading in the direction of the established trend gives you the highest probability of success.
</div>
`
      },
      {
        id: 's2-2',
        title: 'Support & Resistance',
        content: `
<p>Support and resistance (S/R) are the most important concepts in technical analysis. Every chart pattern, every indicator signal, every entry and exit ultimately relates back to S/R.</p>

<h4>What Creates S/R?</h4>
<ul>
  <li><strong>Previous highs and lows</strong> — price has memory. Areas where price reversed before attract attention again.</li>
  <li><strong>Round numbers</strong> — $100, $200, $50 — psychological levels where traders cluster orders.</li>
  <li><strong>Moving averages</strong> — dynamic S/R that moves with price (200-day MA is a key support in bull markets).</li>
  <li><strong>Prior consolidation zones</strong> — areas of heavy trading volume create "fair value" that price returns to.</li>
</ul>

<h4>Role Reversal</h4>
<p>One of the most powerful concepts: <strong>once a support level is broken, it becomes resistance</strong> (and vice versa). Why? Traders who bought at support and are now underwater will sell when price returns to their entry — creating selling pressure at that level.</p>

<div class="info-box">
  <strong>Strength of S/R:</strong> The more times price has tested a level without breaking it, the stronger it is. A level that has held 4 times is far more significant than one that's held once.
</div>

<h4>S/R Are Zones, Not Lines</h4>
<p>Price rarely respects an exact price to the penny. Draw S/R as zones (a range of 2-5% or an ATR width). Small "wicks" through a level that close back above/below it are often false breaks, not genuine breaches.</p>
`
      },
      {
        id: 's2-3',
        title: 'Trend Lines & Channels',
        content: `
<p>Trend lines are dynamic support and resistance. Unlike horizontal S/R levels, trend lines slope with the price and represent the "floor" or "ceiling" of a trend.</p>

<h4>Drawing Trend Lines Correctly</h4>
<ul>
  <li>An <strong>uptrend line</strong> connects the swing <em>lows</em> — it acts as dynamic support</li>
  <li>A <strong>downtrend line</strong> connects the swing <em>highs</em> — it acts as dynamic resistance</li>
  <li>Minimum 2 points to draw, confirmed (and significant) after a 3rd touch</li>
  <li>Connect the <em>bodies</em>, not the wicks, for the most conservative line</li>
</ul>

<h4>Channels</h4>
<p>A channel is formed by drawing a parallel line to a trend line on the other side of price. This creates a lane within which price oscillates. Channels are useful for:</p>
<ul>
  <li>Targeting the opposite channel wall as a profit target</li>
  <li>Identifying overbought/oversold within a trend</li>
  <li>Spotting breakouts early when price leaves the channel</li>
</ul>

<div class="info-box warning">
  <strong>Trend line break:</strong> A candle CLOSING beyond the trend line (not just wicking through) is the minimum requirement for a confirmed break. Watch for follow-through.
</div>
`
      },
      {
        id: 's2-4',
        title: 'Volume: The Confirmation Tool',
        content: `
<p>Price tells you <em>what</em> is happening. Volume tells you <em>how much conviction</em> is behind it. A price move without volume is suspect; a price move with surging volume is credible.</p>

<h4>Key Volume Principles</h4>
<table class="data-table">
  <thead><tr><th>Price</th><th>Volume</th><th>Interpretation</th></tr></thead>
  <tbody>
    <tr><td>Rising</td><td>Rising</td><td>✅ Healthy uptrend — buying is accelerating</td></tr>
    <tr><td>Rising</td><td>Falling</td><td>⚠️ Warning — uptrend losing conviction, may reverse</td></tr>
    <tr><td>Falling</td><td>Rising</td><td>✅ Healthy downtrend — selling is accelerating</td></tr>
    <tr><td>Falling</td><td>Falling</td><td>⚠️ Downtrend exhausting, potential bounce</td></tr>
    <tr><td>Breakout up</td><td>High spike</td><td>✅ Genuine breakout — conviction move</td></tr>
    <tr><td>Breakout up</td><td>Low</td><td>🚫 Suspect breakout — likely to fail</td></tr>
  </tbody>
</table>

<div class="info-box">
  <strong>Volume divergence</strong> is one of the most reliable early warning signals. When price makes a new high but volume is lower than the prior high, the trend is losing participation. Smart money may be distributing (selling) into the rally.
</div>
`
      },
    ]
  },

  {
    id: 'module-3',
    title: 'Candlestick Patterns',
    icon: '🕯️',
    description: 'Single and multi-candle patterns that signal reversals and continuations.',
    checkInIds: ['q3-ci-01'],
    quizIds: ['q3-01','q3-02','q3-03','q3-04','q3-05','q3-06','q3-07','q3-08','q3-09','q3-10'],
    patternQuizIds: ['q3-p01','q3-p02','q3-p03','q3-p04'],
    sections: [
      {
        id: 's3-1',
        title: 'Single Candlestick Patterns',
        content: `
<p>Single-candle patterns are the alphabet of candlestick analysis. While rarely sufficient on their own, they are the building blocks of more complex patterns and frequently confirm setups in context.</p>

<h4>The Critical Rule</h4>
<div class="info-box warning">
  All candlestick patterns require <strong>context</strong>. A hammer at the bottom of a downtrend at key support is a high-probability signal. A hammer mid-uptrend is meaningless. Always ask: "Where are we in the trend?"
</div>

<h4>Reversal Signals at Bottoms (Bullish)</h4>
<div class="candle-illus-grid">
  <div class="candle-illus-item">
    <canvas class="lesson-single-candle" data-type="hammer" width="64" height="110"></canvas>
    <div class="candle-illus-name">Hammer</div>
    <div class="candle-illus-signal bullish">Bullish Reversal</div>
    <div class="candle-illus-desc">Long lower wick (≥2× body). Buyers rejected the lows. Appears after downtrend.</div>
  </div>
  <div class="candle-illus-item">
    <canvas class="lesson-single-candle" data-type="inverted-hammer" width="64" height="110"></canvas>
    <div class="candle-illus-name">Inverted Hammer</div>
    <div class="candle-illus-signal bullish">Bullish (needs confirm)</div>
    <div class="candle-illus-desc">Long upper wick at the bottom of a downtrend. Buyers tried higher; needs follow-through.</div>
  </div>
  <div class="candle-illus-item">
    <canvas class="lesson-single-candle" data-type="dragonfly-doji" width="64" height="110"></canvas>
    <div class="candle-illus-name">Dragonfly Doji</div>
    <div class="candle-illus-signal bullish">Strong Bullish Reversal</div>
    <div class="candle-illus-desc">T-shape. Open = High = Close. Sellers pushed price down but buyers completely recovered it.</div>
  </div>
</div>

<h4>Reversal Signals at Tops (Bearish)</h4>
<div class="candle-illus-grid">
  <div class="candle-illus-item">
    <canvas class="lesson-single-candle" data-type="shooting-star" width="64" height="110"></canvas>
    <div class="candle-illus-name">Shooting Star</div>
    <div class="candle-illus-signal bearish">Bearish Reversal</div>
    <div class="candle-illus-desc">Long upper wick (≥2× body). Appears after uptrend. Sellers rejected the highs.</div>
  </div>
  <div class="candle-illus-item">
    <canvas class="lesson-single-candle" data-type="hanging-man" width="64" height="110"></canvas>
    <div class="candle-illus-name">Hanging Man</div>
    <div class="candle-illus-signal bearish">Bearish Warning</div>
    <div class="candle-illus-desc">Identical shape to hammer but appears at the TOP of an uptrend. Context defines the signal.</div>
  </div>
  <div class="candle-illus-item">
    <canvas class="lesson-single-candle" data-type="gravestone-doji" width="64" height="110"></canvas>
    <div class="candle-illus-name">Gravestone Doji</div>
    <div class="candle-illus-signal bearish">Strong Bearish Reversal</div>
    <div class="candle-illus-desc">Inverted T. Open = Low = Close. Buyers attempted higher but failed completely by the close.</div>
  </div>
</div>

<h4>Indecision &amp; Momentum Signals</h4>
<div class="candle-illus-grid">
  <div class="candle-illus-item">
    <canvas class="lesson-single-candle" data-type="doji" width="64" height="110"></canvas>
    <div class="candle-illus-name">Doji</div>
    <div class="candle-illus-signal neutral">Indecision</div>
    <div class="candle-illus-desc">Open ≈ Close. Neither side won. Meaningful at trend extremes with confirmation.</div>
  </div>
  <div class="candle-illus-item">
    <canvas class="lesson-single-candle" data-type="spinning-top" width="64" height="110"></canvas>
    <div class="candle-illus-name">Spinning Top</div>
    <div class="candle-illus-signal neutral">Low Conviction</div>
    <div class="candle-illus-desc">Small body, roughly equal wicks. Both sides fought but neither dominated.</div>
  </div>
  <div class="candle-illus-item">
    <canvas class="lesson-single-candle" data-type="bull-marubozu" width="64" height="110"></canvas>
    <div class="candle-illus-name">Bull Marubozu</div>
    <div class="candle-illus-signal bullish">Strong Bull Momentum</div>
    <div class="candle-illus-desc">No wicks. Open = Low, Close = High. Buyers dominated the entire session.</div>
  </div>
  <div class="candle-illus-item">
    <canvas class="lesson-single-candle" data-type="bear-marubozu" width="64" height="110"></canvas>
    <div class="candle-illus-name">Bear Marubozu</div>
    <div class="candle-illus-signal bearish">Strong Bear Momentum</div>
    <div class="candle-illus-desc">No wicks. Open = High, Close = Low. Sellers dominated the entire session.</div>
  </div>
</div>
`
      },
      {
        id: 's3-2',
        title: 'Two-Candle Patterns',
        content: `
<p>Two-candle patterns are more reliable than single candles because they require a sequence — they show a shift in momentum over two periods.</p>

<h4>Engulfing Patterns (Most Reliable)</h4>
<p>The defining feature: the second candle's body completely contains (engulfs) the first candle's body.</p>

<div class="pattern-illus-grid">
  <div class="pattern-illus-item">
    <canvas class="lesson-pattern-canvas" data-gen="illustrationEngulfingBull" width="110" height="100"></canvas>
    <div class="candle-illus-name">Bullish Engulfing</div>
    <div class="candle-illus-signal bullish">Bullish Reversal</div>
    <div class="candle-illus-desc">Appears at downtrend bottom. Small bear candle followed by a large bull candle that opens below and closes above the prior body.</div>
  </div>
  <div class="pattern-illus-item">
    <canvas class="lesson-pattern-canvas" data-gen="illustrationEngulfingBear" width="110" height="100"></canvas>
    <div class="candle-illus-name">Bearish Engulfing</div>
    <div class="candle-illus-signal bearish">Bearish Reversal</div>
    <div class="candle-illus-desc">Appears at uptrend top. Small bull candle followed by a large bear candle that opens above and closes below the prior body.</div>
  </div>
  <div class="pattern-illus-item">
    <canvas class="lesson-pattern-canvas" data-gen="illustrationHaramiBull" width="110" height="100"></canvas>
    <div class="candle-illus-name">Bullish Harami</div>
    <div class="candle-illus-signal bullish">Bullish Reversal (weaker)</div>
    <div class="candle-illus-desc">Small bull candle fits entirely INSIDE the prior large bear candle. Less decisive than engulfing — needs confirmation.</div>
  </div>
  <div class="pattern-illus-item">
    <canvas class="lesson-pattern-canvas" data-gen="illustrationHaramiBear" width="110" height="100"></canvas>
    <div class="candle-illus-name">Bearish Harami</div>
    <div class="candle-illus-signal bearish">Bearish Reversal (weaker)</div>
    <div class="candle-illus-desc">Small bear candle fits inside prior large bull candle. Momentum is slowing but needs bearish follow-through.</div>
  </div>
  <div class="pattern-illus-item">
    <canvas class="lesson-pattern-canvas" data-gen="illustrationPiercingLine" width="110" height="100"></canvas>
    <div class="candle-illus-name">Piercing Line</div>
    <div class="candle-illus-signal bullish">Bullish Reversal</div>
    <div class="candle-illus-desc">2nd candle opens below prior low, then closes above the 50% midpoint of the first candle's body — buyers stepped in hard.</div>
  </div>
  <div class="pattern-illus-item">
    <canvas class="lesson-pattern-canvas" data-gen="illustrationDarkCloud" width="110" height="100"></canvas>
    <div class="candle-illus-name">Dark Cloud Cover</div>
    <div class="candle-illus-signal bearish">Bearish Reversal</div>
    <div class="candle-illus-desc">2nd candle opens above prior high, then closes below the midpoint of the first candle's body — sellers overwhelmed buyers.</div>
  </div>
</div>
`
      },
      {
        id: 's3-3',
        title: 'Three-Candle Patterns',
        content: `
<p>Three-candle patterns are the most reliable in the candlestick toolkit. They require sustained effort from buyers or sellers across three periods, making them statistically stronger signals.</p>

<h4>Star Patterns (Strong Reversals)</h4>

<div class="pattern-illus-grid">
  <div class="pattern-illus-item">
    <canvas class="lesson-pattern-canvas" data-gen="illustrationMorningStar" width="160" height="110"></canvas>
    <div class="candle-illus-name">Morning Star ⭐</div>
    <div class="candle-illus-signal bullish">Bullish Reversal</div>
    <div class="candle-illus-desc"><strong>1.</strong> Large bear candle. <strong>2.</strong> Small "star" — indecision, possible gap lower. <strong>3.</strong> Large bull candle closing above midpoint of candle 1. Signals seller exhaustion.</div>
  </div>
  <div class="pattern-illus-item">
    <canvas class="lesson-pattern-canvas" data-gen="illustrationEveningStar" width="160" height="110"></canvas>
    <div class="candle-illus-name">Evening Star ⭐</div>
    <div class="candle-illus-signal bearish">Bearish Reversal</div>
    <div class="candle-illus-desc"><strong>1.</strong> Large bull candle. <strong>2.</strong> Small star — buyers losing conviction. <strong>3.</strong> Large bear candle closing below midpoint of candle 1. Very reliable at resistance.</div>
  </div>
</div>

<h4>Soldier & Crow Patterns (Momentum)</h4>
<div class="pattern-illus-grid">
  <div class="pattern-illus-item">
    <canvas class="lesson-pattern-canvas" data-gen="illustrationThreeWhiteSoldiers" width="160" height="110"></canvas>
    <div class="candle-illus-name">Three White Soldiers</div>
    <div class="candle-illus-signal bullish">Strong Bullish Momentum</div>
    <div class="candle-illus-desc">Three consecutive bull candles, each opening within the prior body and closing near its high. Decisive shift from sellers to buyers.</div>
  </div>
  <div class="pattern-illus-item">
    <canvas class="lesson-pattern-canvas" data-gen="illustrationThreeBlackCrows" width="160" height="110"></canvas>
    <div class="candle-illus-name">Three Black Crows</div>
    <div class="candle-illus-signal bearish">Strong Bearish Momentum</div>
    <div class="candle-illus-desc">Three consecutive bear candles, each opening within the prior body and closing near its low. Bears are firmly in control.</div>
  </div>
</div>
`
      },
    ]
  },

  {
    id: 'module-4',
    title: 'Chart Patterns',
    icon: '📐',
    description: 'Reversal and continuation chart patterns with measured move targets.',
    checkInIds: ['q4-ci-01'],
    quizIds: ['q4-01','q4-02','q4-03','q4-04','q4-05','q4-06','q4-07','q4-08','q4-09','q4-10'],
    patternQuizIds: ['q4-p01','q4-p02','q4-p03','q4-p04'],
    sections: [
      {
        id: 's4-1',
        title: 'Reversal Patterns',
        content: `
<p>Reversal patterns signal the end of a trend. They take time to develop (days to weeks on a daily chart) and offer some of the most reliable setups when confirmed correctly.</p>

<h4>Head and Shoulders</h4>
<p>The most famous bearish reversal pattern. Forms at the top of an uptrend. Three peaks — the middle (head) is the highest. A neckline connects the two pullback lows.</p>

<div class="pattern-illus-grid">
  <div class="pattern-illus-item">
    <canvas class="lesson-pattern-canvas" data-gen="genHeadAndShoulders" width="260" height="150"></canvas>
    <div class="candle-illus-name">Head and Shoulders</div>
    <div class="candle-illus-signal bearish">Bearish Reversal</div>
    <div class="candle-illus-desc">Left shoulder → higher head → right shoulder (same height as left). Break below the neckline (dashed line) triggers the pattern. Target = head-to-neckline distance projected down.</div>
  </div>
  <div class="pattern-illus-item">
    <canvas class="lesson-pattern-canvas" data-gen="genInverseHeadAndShoulders" width="260" height="150"></canvas>
    <div class="candle-illus-name">Inverse Head and Shoulders</div>
    <div class="candle-illus-signal bullish">Bullish Reversal</div>
    <div class="candle-illus-desc">Mirror image at the bottom of a downtrend. Three troughs — the middle is the deepest. Break above the neckline triggers. Target = depth of head projected up.</div>
  </div>
</div>

<h4>Double Top &amp; Double Bottom</h4>

<div class="pattern-illus-grid">
  <div class="pattern-illus-item">
    <canvas class="lesson-pattern-canvas" data-gen="genDoubleTop" width="260" height="150"></canvas>
    <div class="candle-illus-name">Double Top (M-shape)</div>
    <div class="candle-illus-signal bearish">Bearish Reversal</div>
    <div class="candle-illus-desc">Two peaks at the same resistance. Sellers rejected the same price twice. Break below the trough (neckline) between peaks confirms. Target = pattern height projected down.</div>
  </div>
  <div class="pattern-illus-item">
    <canvas class="lesson-pattern-canvas" data-gen="genDoubleBottom" width="260" height="150"></canvas>
    <div class="candle-illus-name">Double Bottom (W-shape)</div>
    <div class="candle-illus-signal bullish">Bullish Reversal</div>
    <div class="candle-illus-desc">Two troughs at the same support. Buyers defended the same price twice. Break above the peak between troughs confirms. Target = pattern height projected up.</div>
  </div>
</div>

<div class="info-box">
  <strong>Confirmation rule:</strong> Never enter on the pattern alone. Wait for the neckline break with a strong close, ideally on higher volume. Many failed patterns stall right at the neckline without breaking.
</div>
`
      },
      {
        id: 's4-2',
        title: 'Continuation Patterns',
        content: `
<p>Continuation patterns represent pauses within an existing trend — the market "catching its breath" before the prior trend resumes. They offer low-risk entries in the direction of the trend.</p>

<h4>Flags</h4>
<p>A sharp "pole" move followed by a brief consolidation channel. Volume contracts during the flag and expands on the breakout. Target = pole height added to the breakout point.</p>

<div class="pattern-illus-grid">
  <div class="pattern-illus-item">
    <canvas class="lesson-pattern-canvas" data-gen="genBullFlag" width="240" height="140"></canvas>
    <div class="candle-illus-name">Bull Flag</div>
    <div class="candle-illus-signal bullish">Bullish Continuation</div>
    <div class="candle-illus-desc">Strong up-pole (highlighted) followed by a slight downward drift on falling volume. Breakout resumes the uptrend. One of the most reliable continuation patterns.</div>
  </div>
  <div class="pattern-illus-item">
    <canvas class="lesson-pattern-canvas" data-gen="genBearFlag" width="240" height="140"></canvas>
    <div class="candle-illus-name">Bear Flag</div>
    <div class="candle-illus-signal bearish">Bearish Continuation</div>
    <div class="candle-illus-desc">Strong down-pole followed by a slight upward drift (the flag). Breakdown resumes the downtrend. Same structure as bull flag, just inverted.</div>
  </div>
</div>

<h4>Triangles</h4>
<p>Price compresses into converging trendlines before a breakout. The type of triangle tells you the likely direction.</p>

<div class="pattern-illus-grid">
  <div class="pattern-illus-item">
    <canvas class="lesson-pattern-canvas" data-gen="genAscendingTriangle" width="240" height="140"></canvas>
    <div class="candle-illus-name">Ascending Triangle</div>
    <div class="candle-illus-signal bullish">Bullish (usually)</div>
    <div class="candle-illus-desc">Flat resistance ceiling + rising support floor. Each pullback is shallower — buyers are becoming more aggressive. Typically breaks upward through the resistance line.</div>
  </div>
  <div class="pattern-illus-item">
    <canvas class="lesson-pattern-canvas" data-gen="genDescendingTriangle" width="240" height="140"></canvas>
    <div class="candle-illus-name">Descending Triangle</div>
    <div class="candle-illus-signal bearish">Bearish (usually)</div>
    <div class="candle-illus-desc">Flat support floor + falling resistance ceiling. Each rally is weaker — sellers are increasingly in control. Typically breaks down through the support line.</div>
  </div>
</div>

<div class="info-box">
  A <strong>Symmetrical Triangle</strong> has both lines converging equally and is direction-neutral — it can break either way. Wait for a confirmed break with volume before trading it. The prior trend gives a slight directional bias.
</div>
`
      },
      {
        id: 's4-3',
        title: 'Wedges & Cup and Handle',
        content: `
<h4>Wedge Patterns</h4>
<p>Wedges look like triangles but <em>both</em> trendlines slope in the same direction. Despite the apparent momentum, the narrowing range reveals the move is losing conviction — and they almost always resolve in the opposite direction to the slope.</p>

<div class="pattern-illus-grid">
  <div class="pattern-illus-item">
    <canvas class="lesson-pattern-canvas" data-gen="genRisingWedge" width="240" height="140"></canvas>
    <div class="candle-illus-name">Rising Wedge</div>
    <div class="candle-illus-signal bearish">Bearish Reversal / Continuation</div>
    <div class="candle-illus-desc">Both lines slope <em>up</em> and converge. Higher highs, but gains are shrinking. Buyers are losing steam. Break below the lower support line → sharp drop. Counter-intuitive but very reliable.</div>
  </div>
  <div class="pattern-illus-item">
    <canvas class="lesson-pattern-canvas" data-gen="genFallingWedge" width="240" height="140"></canvas>
    <div class="candle-illus-name">Falling Wedge</div>
    <div class="candle-illus-signal bullish">Bullish Reversal / Continuation</div>
    <div class="candle-illus-desc">Both lines slope <em>down</em> and converge. Lower lows, but declines are shrinking. Sellers losing momentum. Break above the upper resistance line → sharp rally. Often forms as a pullback within a larger uptrend.</div>
  </div>
</div>

<h4>Cup and Handle</h4>
<p>Developed by William O'Neil. A classic <strong>bullish continuation</strong> pattern formed by gradual accumulation.</p>

<div class="pattern-illus-grid">
  <div class="pattern-illus-item">
    <canvas class="lesson-pattern-canvas" data-gen="genCupAndHandle" width="300" height="150"></canvas>
    <div class="candle-illus-name">Cup and Handle</div>
    <div class="candle-illus-signal bullish">Bullish Continuation</div>
    <div class="candle-illus-desc">Rounded U-shaped base (the cup) → small pullback handle on low volume → breakout above the rim. Target = cup depth added to breakout price. A V-shaped bottom is NOT a valid cup — the rounding signals orderly accumulation.</div>
  </div>
</div>

<div class="info-box">
  <strong>Wedge vs. Triangle:</strong> In a triangle, one line is flat or shallower than the other. In a wedge, <em>both</em> lines slope the same direction. This distinction changes the directional bias completely.
</div>
`
      },
    ]
  },

  {
    id: 'module-5',
    title: 'Technical Indicators',
    icon: '📈',
    description: 'Trend, momentum, volatility, and volume indicators — what they are, how to use them, and when not to.',
    checkInIds: ['q5-ci-01'],
    quizIds: ['q5-01','q5-02','q5-03','q5-04','q5-05','q5-06','q5-07','q5-08','q5-09','q5-10','q5-11'],
    sections: [
      {
        id: 's5-1',
        title: 'Trend Indicators',
        content: `
<p>Trend indicators help identify the direction and strength of a trend. They are <strong>lagging</strong> by nature — they confirm what has happened, not what will happen. Do not use them to predict reversals.</p>

<h4>Moving Averages</h4>
<table class="data-table">
  <thead><tr><th>Type</th><th>Calculation</th><th>Behavior</th><th>Best for</th></tr></thead>
  <tbody>
    <tr><td><strong>SMA</strong> (Simple)</td><td>Average of last N closes</td><td>Smooth, slow, treats all periods equally</td><td>Long-term trend, major S/R</td></tr>
    <tr><td><strong>EMA</strong> (Exponential)</td><td>Weighted: recent prices matter more</td><td>Faster, more responsive to recent moves</td><td>Short-term trend, entry signals</td></tr>
  </tbody>
</table>

<h4>Key MA Levels Traders Watch</h4>
<ul>
  <li><strong>9 EMA</strong> — short-term momentum (day traders)</li>
  <li><strong>20 EMA / 21 EMA</strong> — medium-term trend, common in swing trading</li>
  <li><strong>50 SMA</strong> — intermediate trend</li>
  <li><strong>200 SMA / 200 EMA</strong> — major long-term trend separator. Price above = bull territory; below = bear.</li>
</ul>

<h4>Moving Average Comparison</h4>
<div class="indicator-illus">
  <canvas class="lesson-indicator-canvas" data-gen="illustrationMovingAverages" width="320" height="160"></canvas>
  <div class="indicator-illus-caption"><strong>SMA 20 (dashed gold)</strong> vs <strong>EMA 9 (purple)</strong>. Notice how the EMA hugs price more tightly and reacts faster to the recent move, while the SMA lags behind. Use EMA for entries; SMA for major S/R levels.</div>
</div>

<h4>Golden Cross & Death Cross</h4>
<ul>
  <li><strong>Golden Cross:</strong> 50 SMA crosses <em>above</em> 200 SMA → long-term bullish signal</li>
  <li><strong>Death Cross:</strong> 50 SMA crosses <em>below</em> 200 SMA → long-term bearish signal</li>
</ul>

<div class="indicator-illus">
  <canvas class="lesson-indicator-canvas" data-gen="illustrationGoldenCross" width="320" height="160"></canvas>
  <div class="indicator-illus-caption">A downtrend reverses and the <strong>Fast MA (green)</strong> crosses above the <strong>Slow MA (red dashed)</strong> — a Golden Cross. The signal confirms the trend has shifted, though it lags the actual bottom by design.</div>
</div>

<h4>MACD (Moving Average Convergence Divergence)</h4>
<ul>
  <li><strong>MACD Line:</strong> 12-period EMA − 26-period EMA</li>
  <li><strong>Signal Line:</strong> 9-period EMA of the MACD line</li>
  <li><strong>Histogram:</strong> MACD minus Signal (positive = bullish momentum)</li>
  <li><strong>Signals:</strong> MACD crossing above Signal = bullish; crossing below = bearish</li>
  <li><strong>Divergence:</strong> MACD making lower highs while price makes higher highs = bearish divergence (warning)</li>
</ul>

<div class="indicator-illus">
  <canvas class="lesson-indicator-canvas" data-gen="illustrationMACD" width="320" height="220"></canvas>
  <div class="indicator-illus-caption"><strong>MACD panel (bottom):</strong> Green histogram bars = bullish momentum (MACD above Signal). Red bars = bearish. The green line (MACD) crossing above the red dashed line (Signal) is a buy signal. Watch for when the bars start shrinking — momentum is fading before the lines even cross.</div>
</div>

<h4>ADX (Average Directional Index)</h4>
<ul>
  <li>Measures trend <em>strength</em>, not direction. 0–100 scale.</li>
  <li>Below 20 = weak/no trend (avoid trend-following strategies)</li>
  <li>Above 25 = trend is strengthening</li>
  <li>Above 40 = strong trend</li>
  <li>Use +DI / −DI lines for direction</li>
</ul>
`
      },
      {
        id: 's5-2',
        title: 'Momentum Oscillators',
        content: `
<p>Momentum oscillators measure the speed and strength of price moves. They oscillate between fixed values (like 0–100) and are best used in <strong>ranging markets</strong> to identify overbought/oversold conditions. In strong trends, oscillators can stay extreme for long periods.</p>

<h4>RSI (Relative Strength Index) — The Most Widely Used</h4>
<ul>
  <li>Scale: 0 to 100</li>
  <li><strong>Above 70:</strong> Overbought zone — potential exhaustion of upside</li>
  <li><strong>Below 30:</strong> Oversold zone — potential exhaustion of downside</li>
  <li><strong>50 level:</strong> Centerline — above 50 = bullish momentum, below 50 = bearish</li>
  <li><strong>RSI Divergence:</strong> RSI makes lower high while price makes higher high = hidden weakness (bearish divergence)</li>
  <li>Period: default 14. Shorter (e.g., 9) = more sensitive/noisy; longer (21) = smoother/slower</li>
</ul>

<div class="info-box warning">
  In strong uptrends, RSI can stay above 70 for months. "Overbought" is not the same as "sell signal." Confirm with price action before acting.
</div>

<div class="indicator-illus">
  <canvas class="lesson-indicator-canvas" data-gen="illustrationRSI" width="320" height="220"></canvas>
  <div class="indicator-illus-caption"><strong>RSI panel (bottom):</strong> The purple RSI line climbs toward 70 as price rallies (overbought), then falls back toward 30 as price drops (oversold). The 70/30 dashed lines mark the key zones. Notice RSI often turns before price peaks.</div>
</div>

<h4>Stochastic Oscillator</h4>
<ul>
  <li>Compares closing price to the high-low range over N periods</li>
  <li>Scale: 0 to 100. Above 80 = overbought; below 20 = oversold</li>
  <li>Two lines: %K (fast, green) and %D (slow signal line, dashed gold)</li>
  <li>Best used in ranging markets for mean reversion trades</li>
</ul>

<div class="indicator-illus">
  <canvas class="lesson-indicator-canvas" data-gen="illustrationStochastic" width="320" height="220"></canvas>
  <div class="indicator-illus-caption"><strong>Stochastic panel (bottom):</strong> The fast %K (green) and slow %D (gold dashed) oscillate between 0–100 in a ranging market. When both lines are above 80 = overbought zone; below 20 = oversold. A %K crossing below %D while above 80 is a bearish signal.</div>
</div>

<h4>CCI (Commodity Channel Index)</h4>
<ul>
  <li>Measures deviation of price from its statistical mean</li>
  <li>Above +100 = overbought; below −100 = oversold</li>
  <li>Originally designed for commodities, works on all markets</li>
</ul>

<h4>Williams %R</h4>
<ul>
  <li>Similar to Stochastic, inverted scale: 0 to −100</li>
  <li>Above −20 = overbought; below −80 = oversold</li>
  <li>Good for short-term reversal timing</li>
</ul>
`
      },
      {
        id: 's5-3',
        title: 'Volatility Indicators',
        content: `
<p>Volatility indicators measure how much price is moving, independent of direction. They're essential for position sizing and for anticipating when big moves are about to happen.</p>

<h4>Bollinger Bands</h4>
<ul>
  <li><strong>Middle band:</strong> 20-period SMA</li>
  <li><strong>Upper band:</strong> 20 SMA + 2 standard deviations</li>
  <li><strong>Lower band:</strong> 20 SMA − 2 standard deviations</li>
  <li>About 95% of price action occurs within the bands (statistically)</li>
</ul>
<p><strong>Key signals:</strong></p>
<ul>
  <li><strong>Bollinger Squeeze:</strong> Bands contract tightly → volatility compression → big move imminent (direction unknown)</li>
  <li><strong>Band walk:</strong> Price riding the upper band = strong uptrend; lower band = strong downtrend</li>
  <li><strong>Mean reversion:</strong> Price touching the outer band in a range will often revert to the middle band</li>
</ul>

<div class="indicator-illus">
  <canvas class="lesson-indicator-canvas" data-gen="illustrationBollingerBands" width="320" height="160"></canvas>
  <div class="indicator-illus-caption"><strong>Bollinger Bands:</strong> The bands start tight (Bollinger Squeeze — price moving sideways, volatility compressed). Then a breakout occurs and the bands rapidly widen as price walks the upper band. The squeeze is one of the highest-probability setups in technical analysis.</div>
</div>

<h4>ATR (Average True Range)</h4>
<ul>
  <li>Measures average price range per period, accounting for overnight gaps</li>
  <li>Pure volatility measure — no direction component</li>
  <li>High ATR = volatile market; Low ATR = quiet market</li>
  <li><strong>Stop loss placement:</strong> Stop = Entry − 1.5× ATR (adapts to current volatility)</li>
  <li><strong>Position sizing:</strong> Wider ATR = smaller position to keep dollar risk constant</li>
</ul>

<h4>Keltner Channels</h4>
<ul>
  <li>Similar to Bollinger Bands but uses ATR instead of standard deviation</li>
  <li>Middle: 20 EMA. Bands: ±2× ATR</li>
  <li>Used alongside BB: when BB exits Keltner channels = "squeeze breakout" signal</li>
</ul>
`
      },
      {
        id: 's5-4',
        title: 'Volume Indicators',
        content: `
<p>Volume indicators turn raw volume data into directional signals. They answer the key question: "Is smart money buying or selling into this price move?"</p>

<h4>VWAP (Volume-Weighted Average Price)</h4>
<ul>
  <li>The average price weighted by volume — represents "fair value" for the day</li>
  <li>Resets each trading day at the open</li>
  <li>Used heavily by institutional traders as an execution benchmark</li>
  <li>Price above VWAP = buyers in control (intraday bullish)</li>
  <li>Price below VWAP = sellers in control (intraday bearish)</li>
  <li>Many algorithms try to execute at VWAP — it acts as a magnet</li>
</ul>

<div class="indicator-illus">
  <canvas class="lesson-indicator-canvas" data-gen="illustrationVWAP" width="320" height="160"></canvas>
  <div class="indicator-illus-caption"><strong>VWAP (gold line):</strong> Price consolidates below VWAP (sellers in control), then breaks above it on increased volume. Once price is above VWAP, institutional algorithms treat it as support — a "VWAP reclaim" is a high-probability long entry intraday.</div>
</div>

<h4>OBV (On-Balance Volume)</h4>
<ul>
  <li>Adds volume on up days; subtracts on down days (cumulative running total)</li>
  <li>If OBV trends up while price consolidates → accumulation (bullish)</li>
  <li>If OBV trends down while price holds highs → distribution (bearish)</li>
  <li><strong>Divergence signal:</strong> OBV making new highs while price stalls = bull divergence</li>
</ul>

<div class="indicator-illus">
  <canvas class="lesson-indicator-canvas" data-gen="illustrationOBV" width="320" height="220"></canvas>
  <div class="indicator-illus-caption"><strong>OBV divergence (bottom panel):</strong> Price makes a second, higher peak — but OBV (purple) fails to make a new high. This is bearish divergence: the second rally wasn't backed by volume, meaning "smart money" was distributing into the move. Price then drops sharply.</div>
</div>

<h4>MFI (Money Flow Index)</h4>
<ul>
  <li>RSI but with volume incorporated — volume-weighted RSI</li>
  <li>Scale 0–100. Above 80 = overbought; below 20 = oversold</li>
  <li>More reliable than RSI because it accounts for whether moves are backed by volume</li>
</ul>

<div class="info-box">
  <strong>The most important lesson in this module:</strong> Use trend indicators (MAs, MACD) in trending markets. Use oscillators (RSI, Stochastic) in ranging markets. Using the wrong tool for the market condition is one of the most common trading mistakes.
</div>
`
      },
    ]
  },

  {
    id: 'module-6',
    title: 'Trading Strategy',
    icon: '🎯',
    description: 'Multi-timeframe analysis, confluence, entries, exits, and risk management.',
    checkInIds: ['q6-ci-01'],
    quizIds: ['q6-01','q6-02','q6-03','q6-04','q6-05','q6-06','q6-07'],
    sections: [
      {
        id: 's6-1',
        title: 'Multi-Timeframe Analysis',
        content: `
<p>Multi-timeframe analysis (MTA) is the practice of analyzing the same asset across multiple timeframes simultaneously. It gives you context before precision — you understand the forest before examining individual trees.</p>

<h4>The Top-Down Approach</h4>
<ol>
  <li><strong>Higher timeframe (Weekly/Daily)</strong> → Establish the primary trend. Are we in a bull market, bear market, or range? What are the major S/R levels?</li>
  <li><strong>Middle timeframe (4H/1H)</strong> → Identify the current structure and direction for potential trades. Where is price relative to key levels?</li>
  <li><strong>Lower timeframe (15M/5M)</strong> → Time your entry with precision using smaller patterns and candlestick signals.</li>
</ol>

<h4>The Cardinal Rule</h4>
<div class="info-box warning">
  <strong>Never take a trade that contradicts your highest timeframe.</strong> If the weekly chart shows a downtrend, avoid buying setups on the 15-minute chart — you're fighting the trend. Only trade in the direction all timeframes agree on.
</div>

<h4>Timeframe Relationships</h4>
<p>Common 3-timeframe combinations:</p>
<ul>
  <li><strong>Day trader:</strong> Daily (context) → 1H (direction) → 15M (entry)</li>
  <li><strong>Swing trader:</strong> Weekly (context) → Daily (direction) → 4H (entry)</li>
  <li><strong>Position trader:</strong> Monthly (context) → Weekly (direction) → Daily (entry)</li>
</ul>
`
      },
      {
        id: 's6-2',
        title: 'Confluence & Setup Quality',
        content: `
<p>Confluence is the single most important concept for improving trade probability. It means multiple independent analytical factors all pointing to the same conclusion at the same time.</p>

<h4>Example: High-Confluence Long Setup</h4>
<div class="info-box bullish">
  <ul>
    <li>✅ Daily uptrend intact (HH + HL structure)</li>
    <li>✅ Price pulling back to the 50 EMA (trend support)</li>
    <li>✅ RSI at 38 (coming off oversold, not overbought)</li>
    <li>✅ Prior resistance level (now support via role reversal) at same price</li>
    <li>✅ Bullish engulfing candle forms right at that level</li>
    <li>✅ Volume spike on the bullish candle</li>
  </ul>
  <p><strong>6 independent factors agree = very high probability setup</strong></p>
</div>

<h4>Why Confluence Works</h4>
<p>Each factor is independently derived from different data (price structure, averages, momentum, volume, and candlestick pattern). When they converge, the probability of the expected outcome is exponentially higher than any single signal alone.</p>

<p>Develop a scoring system: grade each setup by how many confluence factors are present. Only trade setups that score above your threshold (e.g., 3+ factors minimum).</p>
`
      },
      {
        id: 's6-3',
        title: 'Entries, Exits & Stop Placement',
        content: `
<h4>Entry Types</h4>
<div class="three-col">
  <div class="col-card">
    <h5>Breakout Entry</h5>
    <p>Enter as price breaks above resistance. Pros: captures momentum immediately. Cons: higher risk of false breakout (wait for a close above).</p>
  </div>
  <div class="col-card">
    <h5>Pullback Entry ⭐</h5>
    <p>Wait for breakout, then let price pull back to the broken level (role reversal) before entering. Better R:R, lower risk of chasing. Preferred by most professional traders.</p>
  </div>
  <div class="col-card">
    <h5>Anticipation Entry</h5>
    <p>Enter before the confirmed breakout at S/R, anticipating the move. Highest R:R but higher risk. Requires precise S/R identification.</p>
  </div>
</div>

<h4>Stop Loss Placement</h4>
<ul>
  <li><strong>Structure-based (best):</strong> Place stop just below the swing low (longs) or above swing high (shorts) that would invalidate your trade thesis</li>
  <li><strong>ATR-based:</strong> Stop = Entry − 1.5×ATR. Adapts to current volatility automatically</li>
  <li><strong>Avoid:</strong> Fixed-dollar or fixed-percentage stops without reference to structure</li>
</ul>

<h4>Take Profit / Exit Strategy</h4>
<ul>
  <li><strong>Measured move:</strong> Use the pattern's calculated target (e.g., flag pole height)</li>
  <li><strong>Next S/R level:</strong> Take partial profits at each significant resistance zone</li>
  <li><strong>Trailing stop:</strong> Move stop up with price to lock in profits on strong moves</li>
  <li><strong>Time stop:</strong> Exit if price hasn't moved significantly within expected timeframe</li>
</ul>
`
      },
      {
        id: 's6-4',
        title: 'Risk Management',
        content: `
<p>Risk management separates profitable traders from those who blow up. A strategy with a 40% win rate can be highly profitable with proper risk management. A strategy with an 80% win rate can lose everything without it.</p>

<h4>The 1-2% Rule</h4>
<p>Risk no more than 1-2% of your total account on any single trade. This ensures that a string of losses (which will happen to every trader) doesn't impair your ability to continue trading.</p>

<div class="info-box">
  <strong>Example:</strong> $10,000 account. Risk 1% = $100 per trade. Entry at $50, stop at $48 (risk $2/share). Position size = $100 / $2 = 50 shares.
</div>

<h4>Risk-to-Reward Ratio (R:R)</h4>
<p>Every trade should have a defined R:R <strong>before entry</strong>.</p>
<table class="data-table">
  <thead><tr><th>R:R Ratio</th><th>Win Rate Needed to Break Even</th></tr></thead>
  <tbody>
    <tr><td>1:1</td><td>50%</td></tr>
    <tr><td>1:2</td><td>33%</td></tr>
    <tr><td>1:3</td><td>25%</td></tr>
    <tr><td>1:5</td><td>17%</td></tr>
  </tbody>
</table>
<p><strong>Minimum target: 1:2 R:R.</strong> Most professional traders aim for 1:3 or better.</p>

<h4>Position Sizing Formula</h4>
<pre class="code-block">Position Size = Account Risk ($) / Trade Risk per Share ($)
Trade Risk per Share = Entry Price − Stop Loss Price</pre>

<div class="info-box warning">
  The #1 trading mistake is taking a trade without a predefined stop loss and position size. Every trade needs these defined BEFORE you enter, not after.
</div>
`
      },
    ]
  },

  {
    id: 'module-7',
    title: 'Options & Greeks',
    icon: '⚡',
    description: 'Options fundamentals, the Greeks (Delta, Gamma, Theta, Vega, Rho), implied volatility, and key strategies.',
    checkInIds: ['q7-ci-01'],
    quizIds: ['q7-01','q7-02','q7-03','q7-04','q7-05','q7-06','q7-07','q7-08','q7-09','q7-10'],
    sections: [
      {
        id: 's7-1',
        title: 'Options Fundamentals',
        content: `
<p>An option is a <strong>contract</strong> that gives the buyer the right — but not the obligation — to buy or sell 100 shares of an underlying asset at a specified price (the strike) before a specified date (expiration).</p>

<h4>Core Terms</h4>
<table class="data-table">
  <thead><tr><th>Term</th><th>Definition</th></tr></thead>
  <tbody>
    <tr><td><strong>Call Option</strong></td><td>Right to BUY 100 shares at the strike price</td></tr>
    <tr><td><strong>Put Option</strong></td><td>Right to SELL 100 shares at the strike price</td></tr>
    <tr><td><strong>Strike Price</strong></td><td>The fixed price at which you can buy/sell the shares</td></tr>
    <tr><td><strong>Expiration</strong></td><td>The date the option expires. After this, it's worthless.</td></tr>
    <tr><td><strong>Premium</strong></td><td>The price you pay for the option contract</td></tr>
    <tr><td><strong>Intrinsic Value</strong></td><td>How much the option would be worth if exercised now</td></tr>
    <tr><td><strong>Time Value (Extrinsic)</strong></td><td>The portion of premium beyond intrinsic — what you pay for the chance the option moves further ITM</td></tr>
  </tbody>
</table>

<h4>Moneyness</h4>
<div class="three-col">
  <div class="col-card bullish">
    <h5>In-the-Money (ITM)</h5>
    <p>Call: Stock price > Strike<br>Put: Stock price < Strike<br><em>Has intrinsic value</em></p>
  </div>
  <div class="col-card neutral">
    <h5>At-the-Money (ATM)</h5>
    <p>Stock price ≈ Strike<br><em>All value is time value</em></p>
  </div>
  <div class="col-card bearish">
    <h5>Out-of-the-Money (OTM)</h5>
    <p>Call: Stock price < Strike<br>Put: Stock price > Strike<br><em>All value is time value; expires worthless if stays OTM</em></p>
  </div>
</div>

<div class="info-box warning">
  Most (70-80%) of options expire worthless. Buying options requires not just a directional move but also the RIGHT TIMING and enough magnitude to overcome time decay.
</div>
`
      },
      {
        id: 's7-2',
        title: 'The Greeks: Delta & Gamma',
        content: `
<p>The Greeks measure different dimensions of an option's sensitivity. Understanding them is essential for managing options positions.</p>

<h4>Delta (Δ) — Directional Exposure</h4>
<p>Delta measures how much the option price changes for every <strong>$1 move</strong> in the underlying stock.</p>
<ul>
  <li>Call delta: 0 to +1.0 (positive — benefits from price increase)</li>
  <li>Put delta: -1.0 to 0 (negative — benefits from price decrease)</li>
  <li>ATM option ≈ ±0.50 delta</li>
  <li>Deep ITM option ≈ ±1.0 delta (moves like the stock)</li>
  <li>Deep OTM option ≈ ±0.05 delta (barely moves)</li>
</ul>

<div class="info-box">
  <strong>Delta as probability:</strong> A 0.30 delta option has roughly a 30% chance of expiring in-the-money. This is a useful rule of thumb for strike selection.
</div>

<h4>Delta Hedging</h4>
<p>Institutions constantly adjust their stock positions to stay "delta neutral" — meaning they have no directional exposure. This mechanical buying/selling by market makers creates predictable price flows.</p>

<h4>Gamma (Γ) — Rate of Delta Change</h4>
<p>Gamma measures how much delta changes per $1 move in the underlying.</p>
<ul>
  <li>Highest for ATM options close to expiration</li>
  <li>Long options = positive gamma (delta works for you as price moves)</li>
  <li>Short options = negative gamma (dangerous near expiry — a big move can be catastrophic)</li>
  <li><strong>Gamma squeeze:</strong> When dealers are short gamma and price keeps moving, their forced hedging amplifies the move</li>
</ul>
`
      },
      {
        id: 's7-3',
        title: 'Theta, Vega & Rho',
        content: `
<h4>Theta (Θ) — Time Decay</h4>
<p>Theta is the daily erosion of an option's time value. Every day that passes, the option is worth a little less — all else being equal.</p>
<ul>
  <li>Expressed as a negative number for option buyers (e.g., −$0.05/day)</li>
  <li>Option sellers have positive theta — time works in their favor</li>
  <li><strong>Theta accelerates</strong> as expiration approaches — especially inside the final 30 days</li>
  <li>A 45-DTE (days-to-expiration) option decays much more slowly than a 7-DTE option</li>
</ul>

<div class="info-box warning">
  If you buy an ATM option and hold it through expiration with no price move, you lose 100% of your investment. Time is an options buyer's enemy.
</div>

<h4>Vega (V) — Volatility Sensitivity</h4>
<p>Vega measures how much the option price changes for every 1% change in implied volatility (IV).</p>
<ul>
  <li>Long options have positive vega: rising IV increases option value</li>
  <li>Short options have negative vega: falling IV increases profit</li>
  <li>Longer DTE options have more vega (more time for IV to matter)</li>
</ul>

<h4>IV Crush</h4>
<p>Before major events (earnings, FDA announcements, Fed decisions), IV inflates as traders buy options for protection. After the event, IV collapses — even if the stock moves. This is IV crush.</p>
<div class="info-box warning">
  <strong>Example:</strong> You buy a call before earnings. The stock beats expectations and jumps 5%. But your option LOSES value because IV dropped 40%. Never buy single-leg options into earnings unless IV is already very low.
</div>

<h4>Rho (ρ) — Interest Rate Sensitivity</h4>
<p>Rho measures sensitivity to interest rate changes. Positive for calls (higher rates = slightly higher call value); negative for puts. For short-dated options, Rho is negligible. It matters more for long-dated options (LEAPS).</p>
`
      },
      {
        id: 's7-4',
        title: 'Options Strategies',
        content: `
<p>These are the most commonly used options structures. Each has a defined risk profile, outlook, and ideal market condition.</p>

<table class="data-table">
  <thead><tr><th>Strategy</th><th>Construction</th><th>Outlook</th><th>Max Loss</th><th>Max Gain</th></tr></thead>
  <tbody>
    <tr><td><strong>Long Call</strong></td><td>Buy 1 call</td><td>Bullish</td><td>Premium paid</td><td>Unlimited</td></tr>
    <tr><td><strong>Long Put</strong></td><td>Buy 1 put</td><td>Bearish</td><td>Premium paid</td><td>Strike (stock → 0)</td></tr>
    <tr><td><strong>Covered Call</strong></td><td>Own stock + sell call</td><td>Neutral/slightly bullish</td><td>Stock drop − premium</td><td>Premium + upside to strike</td></tr>
    <tr><td><strong>Cash-Secured Put</strong></td><td>Sell put, hold cash</td><td>Neutral/bullish</td><td>Strike − premium</td><td>Premium collected</td></tr>
    <tr><td><strong>Bull Call Spread</strong></td><td>Buy lower call + sell higher call</td><td>Moderately bullish</td><td>Net debit</td><td>Spread width − debit</td></tr>
    <tr><td><strong>Bear Put Spread</strong></td><td>Buy higher put + sell lower put</td><td>Moderately bearish</td><td>Net debit</td><td>Spread width − debit</td></tr>
    <tr><td><strong>Long Straddle</strong></td><td>Buy ATM call + put</td><td>Big move either way</td><td>Total premium</td><td>Unlimited (call) / large (put)</td></tr>
    <tr><td><strong>Long Strangle</strong></td><td>Buy OTM call + OTM put</td><td>Big move either way</td><td>Total premium</td><td>Unlimited</td></tr>
    <tr><td><strong>Iron Condor</strong></td><td>Sell OTM call spread + put spread</td><td>Neutral (range-bound)</td><td>Spread − premium</td><td>Net credit</td></tr>
  </tbody>
</table>

<div class="info-box">
  <strong>Rule of thumb:</strong> When IV is high (VIX elevated), prefer selling options (credit strategies). When IV is low, prefer buying options (debit strategies). This ensures you're buying cheap volatility and selling expensive volatility.
</div>
`
      },
    ]
  },

  {
    id: 'module-8',
    title: 'Macro Context',
    icon: '🌍',
    description: 'Market cycles, economic indicators, central bank policy, sector rotation, and risk-on/risk-off dynamics.',
    checkInIds: ['q8-ci-01'],
    quizIds: ['q8-01','q8-02','q8-03','q8-04','q8-05','q8-06','q8-07','q8-08','q8-09','q8-10'],
    sections: [
      {
        id: 's8-1',
        title: 'Market Cycles',
        content: `
<p>Markets move in cycles driven by the underlying economy, credit conditions, and investor psychology. Understanding where you are in the cycle dramatically improves your asset allocation and strategy selection.</p>

<h4>The Economic Cycle</h4>
<div class="cycle-grid">
  <div class="cycle-card">
    <h5>🌱 Expansion</h5>
    <p>GDP growing, unemployment falling, corporate earnings rising, consumer confidence high. Stocks generally rise. Cyclicals outperform.</p>
  </div>
  <div class="cycle-card">
    <h5>🏔️ Peak</h5>
    <p>Economy at full capacity. Inflation rising. Fed begins tightening (rate hikes). Late-cycle sectors (energy, materials) often lead. Growth stocks begin to struggle.</p>
  </div>
  <div class="cycle-card">
    <h5>📉 Contraction</h5>
    <p>GDP slowing or declining. Unemployment rising. Earnings falling. Stocks fall. Defensive sectors (utilities, staples, healthcare) outperform.</p>
  </div>
  <div class="cycle-card">
    <h5>🌊 Trough</h5>
    <p>Economy at its worst. Fed cuts rates aggressively. Stocks often begin recovering 6-9 months before the economy does. Financials and early-cycle sectors lead the next upturn.</p>
  </div>
</div>

<div class="info-box">
  <strong>Critical insight:</strong> The stock market is a forward-looking mechanism. It typically peaks 6-9 months BEFORE the economy enters recession, and bottoms 6-9 months BEFORE the economy officially recovers. By the time the news is obviously bad, stocks may already be rallying.
</div>

<h4>Bull vs. Bear Markets</h4>
<ul>
  <li><strong>Bull market:</strong> A rise of 20%+ from a recent low</li>
  <li><strong>Bear market:</strong> A decline of 20%+ from a recent high</li>
  <li>Average bull market duration: ~3-4 years. Average gain: ~150%</li>
  <li>Average bear market duration: ~1 year. Average decline: ~35%</li>
</ul>
`
      },
      {
        id: 's8-2',
        title: 'Key Economic Indicators',
        content: `
<p>Economic data releases move markets. Knowing what each measures and how markets typically react gives you an edge around these events.</p>

<table class="data-table">
  <thead><tr><th>Indicator</th><th>What it measures</th><th>Release frequency</th><th>Market reaction if above expectations</th></tr></thead>
  <tbody>
    <tr><td><strong>CPI</strong></td><td>Consumer price inflation (basket of goods)</td><td>Monthly</td><td>Rate hike fears → equities fall, yields rise, USD rises</td></tr>
    <tr><td><strong>PPI</strong></td><td>Producer/wholesale price inflation (upstream)</td><td>Monthly</td><td>Leading indicator of CPI — similar reaction</td></tr>
    <tr><td><strong>NFP</strong></td><td>U.S. non-farm job creation</td><td>Monthly (1st Friday)</td><td>Strong jobs = strong economy = rate concerns if inflation high</td></tr>
    <tr><td><strong>GDP</strong></td><td>Total economic output</td><td>Quarterly</td><td>Strong GDP = equities rally; weak = flight to safety</td></tr>
    <tr><td><strong>PMI</strong></td><td>Business activity (survey-based, 50 = neutral)</td><td>Monthly</td><td>Above 50 = expansion = bullish for equities</td></tr>
    <tr><td><strong>Fed Funds Rate</strong></td><td>U.S. benchmark interest rate</td><td>8× per year (FOMC)</td><td>Rate hike = bearish for growth stocks, bullish for USD</td></tr>
    <tr><td><strong>Retail Sales</strong></td><td>Consumer spending</td><td>Monthly</td><td>Strong = economic health = bullish equities</td></tr>
    <tr><td><strong>Unemployment Rate</strong></td><td>% of labor force unemployed</td><td>Monthly</td><td>Low = strong economy; paradoxically can be bearish if it triggers rate hikes</td></tr>
  </tbody>
</table>

<div class="info-box warning">
  <strong>The "bad news is good news" paradox:</strong> Sometimes weak economic data causes stocks to RISE because investors expect the Fed to cut rates or pause hikes. Context matters more than the data itself.
</div>
`
      },
      {
        id: 's8-3',
        title: 'Central Bank Policy',
        content: `
<p>The Federal Reserve (and other central banks) have enormous influence over financial markets. Understanding their policy cycle is essential for macro-aware trading.</p>

<h4>The Fed's Dual Mandate</h4>
<ul>
  <li><strong>Maximum employment</strong> — keep unemployment low</li>
  <li><strong>Price stability</strong> — keep inflation around 2%</li>
</ul>
<p>When these two goals conflict (e.g., low unemployment but high inflation), the Fed must choose which to prioritize — and markets watch every word for clues.</p>

<h4>Rate Hikes vs. Rate Cuts</h4>
<div class="pattern-pair">
  <div class="col-card bearish">
    <h5>Rate Hikes</h5>
    <ul>
      <li>Makes borrowing more expensive</li>
      <li>Slows economic growth and spending</li>
      <li>Strengthens USD (higher yield attracts foreign capital)</li>
      <li>Compresses P/E multiples — especially growth stocks</li>
      <li>Raises mortgage rates → slows housing</li>
    </ul>
  </div>
  <div class="col-card bullish">
    <h5>Rate Cuts</h5>
    <ul>
      <li>Makes borrowing cheaper</li>
      <li>Stimulates economic activity</li>
      <li>Weakens USD</li>
      <li>Expands P/E multiples — especially growth stocks</li>
      <li>Boosts housing and consumer spending</li>
    </ul>
  </div>
</div>

<h4>QE vs. QT</h4>
<ul>
  <li><strong>QE (Quantitative Easing):</strong> Fed creates money and buys bonds/assets → injects liquidity → suppresses long-term rates → inflates asset prices. Used during crises (2008, 2020).</li>
  <li><strong>QT (Quantitative Tightening):</strong> Fed lets bonds mature without replacing them (or actively sells) → removes liquidity from the system → generally bearish for risk assets.</li>
</ul>
`
      },
      {
        id: 's8-4',
        title: 'Sector Rotation & Risk-On/Off',
        content: `
<h4>Sector Rotation</h4>
<p>Not all sectors perform equally at every point in the cycle. Rotating between sectors as the cycle evolves is a well-established institutional strategy.</p>

<table class="data-table">
  <thead><tr><th>Cycle Phase</th><th>Outperforming Sectors</th><th>Why</th></tr></thead>
  <tbody>
    <tr><td>Early Recovery</td><td>Financials, Consumer Discretionary, Technology</td><td>Credit expands, consumers spend, tech leads innovation cycle</td></tr>
    <tr><td>Mid Expansion</td><td>Industrials, Materials, Energy</td><td>Manufacturing ramps up, commodity demand rises</td></tr>
    <tr><td>Late Cycle</td><td>Energy, Materials, Real Estate</td><td>Inflation rising, hard assets hold value</td></tr>
    <tr><td>Recession</td><td>Utilities, Consumer Staples, Healthcare</td><td>People still pay electric bills and buy food/medicine</td></tr>
  </tbody>
</table>

<h4>Risk-On vs. Risk-Off</h4>
<p>These terms describe the overall market sentiment and capital flows at any given time.</p>
<div class="pattern-pair">
  <div class="col-card bullish">
    <h5>Risk-On Environment</h5>
    <p>Investors are comfortable with risk. Capital flows into: equities (especially growth/tech), high-yield bonds, emerging markets, commodities. USD and gold typically weaken.</p>
  </div>
  <div class="col-card bearish">
    <h5>Risk-Off Environment</h5>
    <p>Investors seek safety. Capital flows into: US Treasuries, gold, Japanese Yen, Swiss Franc, USD. Equities (especially small caps and emerging markets) fall. VIX spikes.</p>
  </div>
</div>

<div class="info-box">
  <strong>Correlation to watch:</strong> When stocks and gold both fall simultaneously, it's a liquidity crisis — investors are selling everything to raise cash. This is the most dangerous environment and often represents capitulation.
</div>
`
      },
    ]
  },
];
