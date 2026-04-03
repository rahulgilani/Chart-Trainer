// data/questions.js — All quiz questions
const QUESTIONS = [

  // ═══════════════════════════════════════════════════════════════════
  // MODULE 1 — Chart Fundamentals
  // ═══════════════════════════════════════════════════════════════════
  { id:'q1-01', moduleId:'module-1', type:'mc',
    question:'What does OHLC stand for?',
    options:['Open, High, Low, Close','Open, Hold, Limit, Close','Order, High, Low, Continue','Open, High, Last, Current'],
    correct:0, difficulty:1,
    explanation:'OHLC describes the four key price points of a candle: where it opened, the session high, session low, and where it closed.' },

  { id:'q1-02', moduleId:'module-1', type:'mc',
    question:'Which chart type is most widely used by technical analysts?',
    options:['Line chart','Bar chart','Candlestick chart','Heikin-Ashi chart'],
    correct:2, difficulty:1,
    explanation:'Candlestick charts are the industry standard. They display the same OHLC data as bar charts but are far easier to read visually at a glance.' },

  { id:'q1-03', moduleId:'module-1', type:'mc',
    question:'On a candlestick, what does the "body" represent?',
    options:['The high-to-low range of the session','The difference between open and close','Only the closing price','The volume traded'],
    correct:1, difficulty:1,
    explanation:'The body of a candle represents the range between the opening and closing price. A large body shows strong momentum; a small body shows indecision.' },

  { id:'q1-04', moduleId:'module-1', type:'mc',
    question:'A bullish (green) candlestick means:',
    options:['The stock went up during the week','The closing price was higher than the opening price','Volume increased compared to yesterday','Price opened above yesterday\'s close'],
    correct:1, difficulty:1,
    explanation:'A bullish candle simply means the close was higher than the open during that specific time period. Color conventions: green/white = bullish, red/black = bearish.' },

  { id:'q1-05', moduleId:'module-1', type:'mc',
    question:'A candle with a very long lower wick and small body at the top suggests:',
    options:['Strong bearish momentum','Sellers dominated the entire session','Buyers rejected lower prices and pushed back up','The market is trending strongly downward'],
    correct:2, difficulty:2,
    explanation:'A long lower wick shows that price dropped significantly during the session, but buyers stepped in and pushed it back up close to the open — a bullish rejection signal.' },

  { id:'q1-06', moduleId:'module-1', type:'mc',
    question:'Heikin-Ashi candles differ from standard candlesticks because they:',
    options:['Show futures prices instead of spot','Use averaged price data, making trends smoother but lagging','Only display volume data','Automatically plot support and resistance'],
    correct:1, difficulty:2,
    explanation:'Heikin-Ashi candles use averaged open/close values from the prior candle, smoothing out price noise. This makes trends easier to see but introduces lag — they should not be used for precise entry/exit timing.' },

  { id:'q1-07', moduleId:'module-1', type:'mc',
    question:'Which timeframe would a day trader most likely use for entries?',
    options:['Weekly','Monthly','1-hour or 5-minute','Yearly'],
    correct:2, difficulty:1,
    explanation:'Day traders work within a single session. 1-minute to 1-hour charts are typical for entries, while they might check 4-hour or daily charts for broader context.' },

  { id:'q1-08', moduleId:'module-1', type:'mc',
    question:'The "wick" (or shadow) of a candle represents:',
    options:['After-hours trading activity','The range between high/low that exceeds the body','Institutional order flow','The spread between bid and ask'],
    correct:1, difficulty:1,
    explanation:'Wicks (or shadows) extend from the body to the session high (upper wick) and session low (lower wick). They show rejected price levels — areas where buyers or sellers fought back.' },

  { id:'q1-09', moduleId:'module-1', type:'mc',
    question:'A line chart connects which prices by default?',
    options:['Opening prices','High prices','Closing prices','Volume-weighted prices'],
    correct:2, difficulty:1,
    explanation:'Line charts typically connect closing prices. They\'re the simplest chart type, useful for seeing the broad trend but they hide intra-period price action.' },

  { id:'q1-10', moduleId:'module-1', type:'mc',
    question:'Which timeframe provides the most meaningful signals for a swing trader (holds for days to weeks)?',
    options:['1-minute','5-minute','Daily and 4-hour','Tick chart'],
    correct:2, difficulty:2,
    explanation:'Swing traders typically use the daily chart to identify trend and setup, with the 4-hour chart to time entry. Lower timeframes have too much noise for multi-day positions.' },

  { id:'q1-11', moduleId:'module-1', type:'mc',
    question:'A candle with no upper wick means:',
    options:['The stock was halted at the open','The closing price was also the session high','Volume was zero','The candle is always bearish'],
    correct:1, difficulty:2,
    explanation:'No upper wick means the close (for a bullish candle) or open (for a bearish candle) was exactly at the session high — bulls or bears were still pushing at the very end of the period.' },

  { id:'q1-12', moduleId:'module-1', type:'tf',
    question:'True or False: A daily candlestick and an hourly candlestick represent the same time period.',
    options:['True','False'],
    correct:1, difficulty:1,
    explanation:'False. Each candlestick represents ONE complete time period. A daily candle shows one full trading day; an hourly candle shows one hour. They carry different levels of significance.' },

  // Check-in questions (used for mid-section)
  { id:'q1-ci-01', moduleId:'module-1', type:'mc', checkIn: true,
    question:'What is the high of a candlestick?',
    options:['The opening price','The highest price reached during that session','The closing price','The volume-weighted price'],
    correct:1, difficulty:1,
    explanation:'The high is the highest price traded during the candle\'s time period — shown by the top of the upper wick (or top of body if no upper wick).' },

  { id:'q1-ci-02', moduleId:'module-1', type:'mc', checkIn: true,
    question:'On a standard candlestick chart, a red/black candle means:',
    options:['Volume was high','Price opened lower than the prior close','Close was lower than open','Price will continue falling'],
    correct:2, difficulty:1,
    explanation:'A red/black (bearish) candle simply means the closing price was lower than the opening price for that specific period. It says nothing about the next candle.' },

  // ═══════════════════════════════════════════════════════════════════
  // MODULE 2 — Market Structure
  // ═══════════════════════════════════════════════════════════════════
  { id:'q2-01', moduleId:'module-2', type:'mc',
    question:'An uptrend is technically defined as:',
    options:['Price above its 200-day moving average','A series of higher highs and higher lows','Any period of positive price movement','RSI above 50'],
    correct:1, difficulty:1,
    explanation:'An uptrend is defined by structure: each swing high exceeds the prior swing high (higher highs), and each pullback remains above the prior pullback low (higher lows). This is Dow Theory.' },

  { id:'q2-02', moduleId:'module-2', type:'mc',
    question:'A support level is best described as:',
    options:['Any price below current market price','A price zone where buying interest has historically emerged to stop price falling','The lower Bollinger Band','The 52-week low'],
    correct:1, difficulty:1,
    explanation:'Support is a price area where demand has previously overwhelmed supply, causing price to bounce. The more times price has bounced from a level, the stronger that support is considered.' },

  { id:'q2-03', moduleId:'module-2', type:'mc',
    question:'When a resistance level is decisively broken upward, it often:',
    options:['Becomes irrelevant','Becomes a new support level','Signals a bear market','Means the indicator was wrong'],
    correct:1, difficulty:2,
    explanation:'This is called "role reversal" — old resistance becomes new support (and vice versa). This happens because traders who missed the breakout now buy pullbacks to the breakout level.' },

  { id:'q2-04', moduleId:'module-2', type:'mc',
    question:'An uptrend line is drawn by connecting:',
    options:['The closing prices','The session highs','The swing lows (higher lows)','The moving averages'],
    correct:2, difficulty:2,
    explanation:'An uptrend line connects ascending swing lows. It represents dynamic support in an uptrend. A break below this line is often an early signal that the uptrend may be ending.' },

  { id:'q2-05', moduleId:'module-2', type:'mc',
    question:'High volume on a price breakout suggests:',
    options:['The move is likely a false breakout','The move is likely genuine and has conviction behind it','Volatility will decrease','A reversal is imminent'],
    correct:1, difficulty:2,
    explanation:'Volume is the fuel behind price moves. A breakout on high volume means many participants are committing to the new direction — it has conviction. Low-volume breakouts are much more likely to fail.' },

  { id:'q2-06', moduleId:'module-2', type:'mc',
    question:'In a downtrend, what are you looking for structurally?',
    options:['Higher highs and higher lows','Equal highs and equal lows','Lower highs and lower lows','A doji candlestick'],
    correct:2, difficulty:1,
    explanation:'A downtrend is the mirror of an uptrend: lower highs (each rally fails to reach the prior high) and lower lows (each selloff goes deeper than the last). This is the basic definition per Dow Theory.' },

  { id:'q2-07', moduleId:'module-2', type:'mc',
    question:'A "higher high" means:',
    options:['Price is more volatile than usual','A swing high exceeds the previous swing high','An indicator just made a new signal','RSI reached overbought territory'],
    correct:1, difficulty:1,
    explanation:'A higher high occurs when the most recent swing/peak in price exceeds the previous peak. Combined with higher lows, this confirms an uptrend is intact.' },

  { id:'q2-08', moduleId:'module-2', type:'mc',
    question:'A valid trend line requires at minimum how many touch points?',
    options:['1','2','3','5'],
    correct:1, difficulty:2,
    explanation:'You need at least 2 points to draw a line, but a 3rd touch that holds confirms the trend line is significant. The more touches without breaking, the more reliable the line.' },

  { id:'q2-09', moduleId:'module-2', type:'mc',
    question:'Volume divergence in an uptrend (rising price, falling volume) suggests:',
    options:['The trend is accelerating','Momentum may be weakening, trend could reverse','A breakout is about to happen','Volume is irrelevant to price'],
    correct:1, difficulty:3,
    explanation:'If price makes new highs but volume is declining, fewer and fewer participants are driving the move. This divergence suggests buying interest is waning and the trend may be losing steam.' },

  { id:'q2-10', moduleId:'module-2', type:'mc',
    question:'What is a consolidation (sideways) market?',
    options:['A bear market in progress','A market where price moves within a range with no clear trend','A period of very high volume','A government intervention in prices'],
    correct:1, difficulty:1,
    explanation:'Consolidation (also called ranging or sideways) occurs when supply and demand are roughly balanced. Price moves between a floor (support) and ceiling (resistance) without establishing a trend.' },

  { id:'q2-11', moduleId:'module-2', type:'mc',
    question:'An ascending channel is formed by:',
    options:['One trend line and one moving average','Two parallel upward-sloping trend lines','The Bollinger Bands contracting','A flag pattern'],
    correct:1, difficulty:2,
    explanation:'A channel has two parallel trend lines — one connecting the lows (support) and one connecting the highs (resistance). In an ascending channel, both lines slope upward.' },

  { id:'q2-ci-01', moduleId:'module-2', type:'mc', checkIn: true,
    question:'Which of the following would signal a potential end to an uptrend?',
    options:['Price makes a new all-time high','A lower low is formed for the first time','Volume increases on an up day','RSI reaches 60'],
    correct:1, difficulty:2,
    explanation:'In an uptrend, price makes higher lows. The first lower low (a pullback that goes below the prior pullback) is an early warning sign that trend structure may be breaking down.' },

  // ═══════════════════════════════════════════════════════════════════
  // MODULE 3 — Candlestick Patterns
  // ═══════════════════════════════════════════════════════════════════
  { id:'q3-01', moduleId:'module-3', type:'mc',
    question:'A hammer candlestick has:',
    options:['Long upper wick, small body at the bottom','Small body near the top, long lower wick (2x+ body)','No wicks at all','Equal upper and lower wicks'],
    correct:1, difficulty:1,
    explanation:'A hammer has a small real body near the top of the candle and a lower wick at least twice the length of the body, with little to no upper wick. This shows buyers rejected lower prices.' },

  { id:'q3-02', moduleId:'module-3', type:'mc',
    question:'The key difference between a hammer and a hanging man is:',
    options:['The color of the candle','The length of the wick','The trend context in which they appear','The volume level'],
    correct:2, difficulty:2,
    explanation:'Visually identical, but context defines the signal. A hammer appears at the bottom of a downtrend (bullish reversal). A hanging man appears at the top of an uptrend (bearish warning). Same shape, opposite meaning.' },

  { id:'q3-03', moduleId:'module-3', type:'mc',
    question:'What does a doji candlestick primarily indicate?',
    options:['Strong bullish momentum','Strong bearish momentum','Market indecision — neither buyers nor sellers won','A guaranteed reversal'],
    correct:2, difficulty:1,
    explanation:'A doji forms when open and close are nearly equal. It represents indecision or equilibrium. By itself it\'s not a signal — you need the prior trend context and a confirmation candle.' },

  { id:'q3-04', moduleId:'module-3', type:'mc',
    question:'A bullish engulfing pattern is most meaningful when it appears:',
    options:['In the middle of an uptrend','After an extended downtrend, at or near support','On a small-cap stock with no volume','During pre-market trading'],
    correct:1, difficulty:2,
    explanation:'Candlestick patterns are context-dependent. A bullish engulfing after a downtrend at support has the most reversal significance. The same pattern mid-uptrend is less meaningful.' },

  { id:'q3-05', moduleId:'module-3', type:'mc',
    question:'A Morning Star is a:',
    options:['Single bearish candlestick','Two-candle bearish pattern','Three-candle bullish reversal pattern','Moving average crossover signal'],
    correct:2, difficulty:1,
    explanation:'The Morning Star is a three-candle bullish reversal: (1) large bearish candle, (2) small-bodied "star" candle showing indecision, (3) large bullish candle that recovers most of candle 1\'s loss.' },

  { id:'q3-06', moduleId:'module-3', type:'mc',
    question:'Three White Soldiers indicates:',
    options:['A bearish reversal is coming','Three institutional sell orders','Strong bullish momentum — buyers are firmly in control','A triple top chart pattern'],
    correct:2, difficulty:1,
    explanation:'Three White Soldiers is three consecutive large bullish candles, each opening within the prior body and closing near its high. This shows persistent buying pressure and a decisive shift in momentum.' },

  { id:'q3-07', moduleId:'module-3', type:'mc',
    question:'A shooting star has a long upper wick. What does this wick tell us?',
    options:['Buyers pushed price high but sellers rejected the gains by the close','Sellers were in control all session','Volume was very high','The stock is about to gap up'],
    correct:0, difficulty:2,
    explanation:'The long upper wick on a shooting star shows that buyers pushed price significantly higher during the session, but sellers overwhelmed them and drove price back down near the open by the close — a bearish rejection.' },

  { id:'q3-08', moduleId:'module-3', type:'mc',
    question:'An Evening Star appears at:',
    options:['The bottom of a downtrend (bullish reversal)','A support zone','The top of an uptrend (bearish reversal)','Any point in a trend'],
    correct:2, difficulty:1,
    explanation:'The Evening Star is the bearish equivalent of the Morning Star. It forms at the top of an uptrend: (1) large bullish candle, (2) small star candle, (3) large bearish candle — signaling exhaustion of buyers.' },

  { id:'q3-09', moduleId:'module-3', type:'mc',
    question:'A bearish engulfing pattern\'s second candle must:',
    options:['Have a longer wick than the first candle','Be the same size as the first candle','Open above the first candle\'s close and close below the first candle\'s open','Have no wicks at all'],
    correct:2, difficulty:2,
    explanation:'The defining feature of bearish engulfing is that the second (bearish) candle\'s body completely contains the first (bullish) candle\'s body — it opens higher and closes lower, "engulfing" the prior candle.' },

  { id:'q3-10', moduleId:'module-3', type:'mc',
    question:'Three Black Crows is the bearish equivalent of:',
    options:['Morning Star','Doji','Three White Soldiers','Bullish Engulfing'],
    correct:2, difficulty:1,
    explanation:'Three Black Crows mirrors Three White Soldiers but to the downside. Three consecutive large bearish candles, each opening within the prior body and closing near its low, showing strong selling pressure.' },

  // Pattern recognition questions — Module 3
  { id:'q3-p01', moduleId:'module-3', type:'pattern', patternGen:'genHammer',
    question:'What candlestick pattern is shown, and what does it signal?',
    options:['Shooting Star — bearish reversal','Hammer — bullish reversal','Hanging Man — bearish reversal','Doji — indecision'],
    correct:1, difficulty:2,
    explanation:'This is a Hammer. It has a small body near the top and a long lower wick (2x+ body length) appearing after a downtrend. This shows sellers tried to push lower but buyers overwhelmed them — bullish reversal signal.' },

  { id:'q3-p02', moduleId:'module-3', type:'pattern', patternGen:'genShootingStar',
    question:'Identify this candlestick pattern and its directional implication:',
    options:['Hammer — bullish','Inverted Hammer — bullish','Shooting Star — bearish reversal','Doji — neutral'],
    correct:2, difficulty:2,
    explanation:'This is a Shooting Star. Long upper wick appearing after an uptrend, small body at the bottom. Buyers pushed price up but sellers overwhelmed them — bearish reversal signal.' },

  { id:'q3-p03', moduleId:'module-3', type:'pattern', patternGen:'genBullishEngulfing',
    question:'What two-candle pattern is highlighted?',
    options:['Bearish Engulfing','Bullish Harami','Bullish Engulfing','Morning Star'],
    correct:2, difficulty:2,
    explanation:'Bullish Engulfing: after a downtrend, a large bullish candle completely engulfs the prior smaller bearish candle. One of the strongest reversal signals in candlestick analysis.' },

  { id:'q3-p04', moduleId:'module-3', type:'pattern', patternGen:'genMorningStar',
    question:'Identify this three-candle pattern:',
    options:['Evening Star — bearish reversal','Three Black Crows — bearish','Morning Star — bullish reversal','Three White Soldiers — bullish'],
    correct:2, difficulty:2,
    explanation:'Morning Star: large bearish candle, small indecisive star candle, then a large bullish candle closing above the midpoint of candle 1. Strong bullish reversal at a downtrend bottom.' },

  { id:'q3-ci-01', moduleId:'module-3', type:'mc', checkIn: true,
    question:'A Marubozu candle (no wicks) indicates:',
    options:['Complete indecision','One side dominated entirely from open to close','A pending reversal','Low volume'],
    correct:1, difficulty:2,
    explanation:'A marubozu (full body, no wicks) means the opening price was also the extreme in one direction and the closing price was the extreme in the other. Bulls or bears controlled the entire session without opposition.' },

  // ═══════════════════════════════════════════════════════════════════
  // MODULE 4 — Chart Patterns
  // ═══════════════════════════════════════════════════════════════════
  { id:'q4-01', moduleId:'module-4', type:'mc',
    question:'Head and Shoulders is classified as a:',
    options:['Continuation pattern','Neutral pattern','Bearish reversal pattern','Bullish reversal pattern'],
    correct:2, difficulty:1,
    explanation:'Head and Shoulders is one of the most reliable bearish reversal patterns. It forms at the top of an uptrend and, when the neckline breaks, signals a trend change from bullish to bearish.' },

  { id:'q4-02', moduleId:'module-4', type:'mc',
    question:'After a confirmed Double Top, price is expected to move:',
    options:['Higher, to test resistance again','Sideways in consolidation','Lower, by approximately the pattern height','To the previous support level only'],
    correct:2, difficulty:2,
    explanation:'The measured move target for a Double Top is calculated by taking the height of the pattern (from peak to neckline) and projecting that distance downward from the neckline breakout point.' },

  { id:'q4-03', moduleId:'module-4', type:'mc',
    question:'An ascending triangle typically breaks out:',
    options:['Downward through the rising support','Upward through the flat resistance','To the downside 80% of the time','Randomly, with no statistical edge'],
    correct:1, difficulty:2,
    explanation:'Ascending triangles have flat resistance and rising support. As the support line rises toward resistance, buyers become increasingly aggressive. The pattern typically (but not always) breaks upward.' },

  { id:'q4-04', moduleId:'module-4', type:'mc',
    question:'A Bull Flag consists of:',
    options:['Two equal highs followed by a breakdown','A rounded bottom then breakout','A sharp upward pole followed by a slight downward consolidation channel','A symmetrical triangle after an uptrend'],
    correct:2, difficulty:1,
    explanation:'A bull flag has two parts: the pole (sharp, rapid price advance) and the flag (brief consolidation in a slightly downward-sloping channel). Volume contracts during the flag and expands on the breakout.' },

  { id:'q4-05', moduleId:'module-4', type:'mc',
    question:'The price target for a Head and Shoulders pattern is measured as:',
    options:['The distance from left shoulder to right shoulder','The distance from the head peak to the neckline, projected down from the neckline break','The height of the right shoulder','Half the distance from head to neckline'],
    correct:1, difficulty:3,
    explanation:'Measured move: measure the vertical distance from the head\'s peak down to the neckline. Then project that same distance downward from the point where price breaks through the neckline.' },

  { id:'q4-06', moduleId:'module-4', type:'mc',
    question:'A Cup and Handle is primarily a:',
    options:['Bearish reversal','Bearish continuation','Bullish continuation','Neutral consolidation'],
    correct:2, difficulty:1,
    explanation:'The Cup and Handle is a bullish continuation pattern. It forms when a prior uptrend pauses, the price rounds out a U-shaped base (accumulation), forms a brief handle, then breaks out to new highs.' },

  { id:'q4-07', moduleId:'module-4', type:'mc',
    question:'A Rising Wedge in an existing uptrend signals:',
    options:['Strong continuation of the uptrend','Increasing bullish momentum','A likely bearish reversal despite the upward slope','Nothing — wedges are unreliable'],
    correct:2, difficulty:3,
    explanation:'Although price makes higher highs, the rising wedge shows diminishing momentum — the range narrows as both support and resistance converge upward. The breakdown below the lower support line often leads to sharp declines.' },

  { id:'q4-08', moduleId:'module-4', type:'mc',
    question:'An Inverse Head and Shoulders forms:',
    options:['At the top of an uptrend','At the bottom of a downtrend','In a consolidating market','After a gap-up opening'],
    correct:1, difficulty:1,
    explanation:'Inverse H&S is a bullish reversal pattern. It forms at the bottom of a downtrend with three troughs — the middle one (head) being the lowest. A break above the neckline signals the reversal.' },

  { id:'q4-09', moduleId:'module-4', type:'mc',
    question:'A Symmetrical Triangle can break out in which direction?',
    options:['Only upward','Only downward','Either direction — it is a neutral pattern','Always in the direction of the prior trend'],
    correct:2, difficulty:2,
    explanation:'Unlike ascending and descending triangles, the symmetrical triangle is neutral. It can break either way. Traders watch for the breakout with volume to determine direction. The prior trend provides a slight bias.' },

  { id:'q4-10', moduleId:'module-4', type:'mc',
    question:'The main difference between a Flag and a Pennant continuation pattern is:',
    options:['Flags are bullish, pennants are bearish','Flags have parallel consolidation lines; pennants have converging lines','Pennants require more volume','Flags are longer in duration'],
    correct:1, difficulty:2,
    explanation:'Both follow a strong "pole" move. A flag consolidates in a parallel channel (rectangular shape). A pennant consolidates in a symmetrical triangle shape (converging lines). Both resolve in the direction of the pole.' },

  // Pattern recognition — Module 4
  { id:'q4-p01', moduleId:'module-4', type:'pattern', patternGen:'genHeadAndShoulders',
    question:'Identify this chart pattern and its implication:',
    options:['Double Bottom — bullish reversal','Ascending Triangle — bullish continuation','Head and Shoulders — bearish reversal','Cup and Handle — bullish continuation'],
    correct:2, difficulty:2,
    explanation:'Head and Shoulders: three peaks where the middle (head) is highest. The neckline connecting the two troughs has been broken. This is a bearish reversal — target is the head-to-neckline distance projected down.' },

  { id:'q4-p02', moduleId:'module-4', type:'pattern', patternGen:'genDoubleTop',
    question:'What pattern is shown and what is the expected move?',
    options:['Double Bottom — expected to rise','Ascending Triangle — expected to break up','Double Top — expected to decline','Head and Shoulders — expected to decline'],
    correct:2, difficulty:2,
    explanation:'Double Top: two peaks at the same resistance with a trough between them (neckline). After breaking below the neckline, the expected move is bearish by the height of the pattern.' },

  { id:'q4-p03', moduleId:'module-4', type:'pattern', patternGen:'genBullFlag',
    question:'Identify this pattern and the expected direction:',
    options:['Bear Flag — expected to fall','Rising Wedge — expected to fall','Descending Triangle — expected to fall','Bull Flag — expected to continue higher'],
    correct:3, difficulty:2,
    explanation:'Bull Flag: strong upward pole, slight downward consolidation on lower volume, then a breakout. The flag is the rest before the next advance. Target = pole height added to breakout point.' },

  { id:'q4-p04', moduleId:'module-4', type:'pattern', patternGen:'genAscendingTriangle',
    question:'What pattern is forming, and what is the likely breakout direction?',
    options:['Descending Triangle — likely bearish','Symmetrical Triangle — neutral','Ascending Triangle — likely bullish','Double Top — bearish'],
    correct:2, difficulty:2,
    explanation:'Ascending Triangle: flat resistance and rising support. Buyers are becoming more aggressive (higher lows). This typically resolves with a bullish breakout above the flat resistance.' },

  { id:'q4-ci-01', moduleId:'module-4', type:'mc', checkIn: true,
    question:'What is the key differentiator between a Falling Wedge (bullish) and a Descending Triangle?',
    options:['Wedges have one horizontal line; triangles do not','Falling wedges have both support AND resistance sloping down; descending triangles have flat support','Triangles are always bearish','Wedges are longer in duration'],
    correct:1, difficulty:3,
    explanation:'In a falling wedge, BOTH trendlines slope downward and converge — bullish resolution. In a descending triangle, the support line is FLAT while resistance slopes down — bearish resolution. The shape of the support line is the key.' },

  // ═══════════════════════════════════════════════════════════════════
  // MODULE 5 — Technical Indicators
  // ═══════════════════════════════════════════════════════════════════
  { id:'q5-01', moduleId:'module-5', type:'mc',
    question:'RSI above 70 indicates the asset is:',
    options:['Trending strongly — buy more','In a downtrend','Potentially overbought — caution on new longs','Definitely about to reverse'],
    correct:2, difficulty:1,
    explanation:'RSI (Relative Strength Index) above 70 is considered "overbought" — not a sell signal by itself, but a caution zone. In strong trends, RSI can stay above 70 for extended periods. Always use it with context.' },

  { id:'q5-02', moduleId:'module-5', type:'mc',
    question:'A "Golden Cross" occurs when:',
    options:['Price crosses above the 200 SMA','The 50-period SMA crosses above the 200-period SMA','RSI crosses above 50','MACD crosses above its signal line'],
    correct:1, difficulty:1,
    explanation:'The Golden Cross is when the 50-period SMA crosses above the 200-period SMA. It\'s a widely-watched long-term bullish signal. The opposite — 50 crossing below 200 — is a "Death Cross" (bearish).' },

  { id:'q5-03', moduleId:'module-5', type:'mc',
    question:'MACD is calculated as:',
    options:['RSI minus Stochastic','12-period EMA minus 26-period EMA','20-period SMA plus 2 standard deviations','Daily close minus 14-day average'],
    correct:1, difficulty:2,
    explanation:'MACD = 12-period EMA − 26-period EMA. The Signal line is a 9-period EMA of the MACD line. The histogram shows the difference between MACD and Signal. Crossovers of MACD and Signal are key signals.' },

  { id:'q5-04', moduleId:'module-5', type:'mc',
    question:'Bollinger Bands consist of:',
    options:['Three moving averages of different periods','A 20-period SMA with upper and lower bands set 2 standard deviations away','RSI with overbought and oversold lines','A MACD with a histogram'],
    correct:1, difficulty:2,
    explanation:'Bollinger Bands: middle band = 20-period SMA; upper band = 20 SMA + 2×SD; lower band = 20 SMA − 2×SD. When bands contract (squeeze), a big move is often imminent. Price touching a band is not automatically a signal.' },

  { id:'q5-05', moduleId:'module-5', type:'mc',
    question:'VWAP stands for and is most useful for:',
    options:['Volume-Weighted Average Price; used as an intraday benchmark by institutions','Volatility-Weighted Average Performance; used for options','Variable Width Average Price; used for channels','Volume With Average Pullback; swing trading'],
    correct:0, difficulty:2,
    explanation:'VWAP (Volume-Weighted Average Price) weights each price by its volume. Institutions use it as a benchmark. Price above VWAP is considered bullish intraday; below is bearish. It resets each trading day.' },

  { id:'q5-06', moduleId:'module-5', type:'mc',
    question:'ADX (Average Directional Index) above 25 indicates:',
    options:['Price is overbought','A strong trend exists (regardless of direction)','A bearish reversal is forming','Low volatility environment'],
    correct:1, difficulty:2,
    explanation:'ADX measures trend STRENGTH, not direction. Above 25 indicates a strong trend. Below 20 = weak/no trend. ADX doesn\'t tell you if the trend is up or down — use it with +DI/-DI or price action for direction.' },

  { id:'q5-07', moduleId:'module-5', type:'mc',
    question:'An Exponential Moving Average (EMA) differs from a Simple Moving Average (SMA) because it:',
    options:['Uses only closing prices, not OHLC','Gives more weight to recent prices, making it more responsive','Is calculated over a longer period by default','Doesn\'t smooth out price data'],
    correct:1, difficulty:2,
    explanation:'An EMA applies exponentially decreasing weights to older data, making it react faster to recent price changes. This makes it more useful for short-term trading. The SMA treats all periods equally, making it smoother but slower.' },

  { id:'q5-08', moduleId:'module-5', type:'mc',
    question:'The ATR (Average True Range) measures:',
    options:['Trend direction','Average daily price volatility (range of movement)','Relative momentum on a 0-100 scale','The difference between two moving averages'],
    correct:1, difficulty:2,
    explanation:'ATR measures how much an asset moves on average per period, accounting for gaps. It\'s a pure volatility measure — not directional. Traders use it for stop placement (e.g., stop = 2× ATR below entry).' },

  { id:'q5-09', moduleId:'module-5', type:'mc',
    question:'OBV (On-Balance Volume) is best used to:',
    options:['Measure trend strength','Confirm price moves or spot divergence (price up, OBV down = warning)','Set stop losses','Calculate position size'],
    correct:1, difficulty:3,
    explanation:'OBV adds volume on up days and subtracts it on down days. When OBV and price both make new highs, the trend is confirmed. If price makes a new high but OBV doesn\'t (divergence), the move may not be sustained.' },

  { id:'q5-10', moduleId:'module-5', type:'mc',
    question:'Using trend-following indicators (like moving averages) in a sideways, ranging market will most likely:',
    options:['Generate accurate buy and sell signals','Identify support and resistance precisely','Generate many false signals, leading to losses','Work better than momentum oscillators'],
    correct:2, difficulty:3,
    explanation:'This is one of the most important lessons in technical analysis. Trend indicators are designed for trending markets. In a range, they will whipsaw constantly — giving buy signals at the top and sell signals at the bottom.' },

  { id:'q5-ci-01', moduleId:'module-5', type:'mc', checkIn: true,
    question:'The MACD histogram represents:',
    options:['The 12-period EMA value','The MACD line minus the Signal line','Volume-weighted price momentum','Price minus the 26-period EMA'],
    correct:1, difficulty:2,
    explanation:'The MACD histogram = MACD line − Signal line. Positive bars mean MACD is above Signal (bullish momentum). When histogram bars grow, momentum is accelerating; when they shrink, momentum is fading — often an early warning before the lines actually cross.' },

  { id:'q5-11', moduleId:'module-5', type:'mc',
    question:'Stochastic Oscillator readings above 80 indicate:',
    options:['The trend is very strong — add to position','The asset may be overbought — price is near the top of its recent range','A guaranteed sell signal','Volume is surging'],
    correct:1, difficulty:2,
    explanation:'Stochastic above 80 means the closing price is near the top of its recent high-low range (overbought zone). Like RSI above 70, this is a caution signal, not an automatic sell. In strong trends, Stochastic can stay above 80 for an extended time.' },

  // ═══════════════════════════════════════════════════════════════════
  // MODULE 6 — Trading Strategy
  // ═══════════════════════════════════════════════════════════════════
  { id:'q6-01', moduleId:'module-6', type:'mc',
    question:'Multi-timeframe analysis is best approached by starting with:',
    options:['The smallest (1-minute) timeframe for precision','The highest (weekly/daily) timeframe for context, then zooming in','The same timeframe as your trading style','RSI on multiple timeframes simultaneously'],
    correct:1, difficulty:2,
    explanation:'Top-down analysis: start with the weekly or daily to understand the macro trend, then use the 4-hour for direction, then the 1-hour or 15-minute for entry. Never take a trade that fights the higher-timeframe trend.' },

  { id:'q6-02', moduleId:'module-6', type:'mc',
    question:'"Confluence" in trading means:',
    options:['Using only one indicator for cleaner signals','Multiple independent signals pointing to the same trade setup','Trading the same security across multiple brokers','Holding positions in multiple asset classes'],
    correct:1, difficulty:1,
    explanation:'Confluence is when multiple independent factors align to support the same trade. Example: price at support + oversold RSI + bullish engulfing candle. Each signal alone is weak; together they create a high-probability setup.' },

  { id:'q6-03', moduleId:'module-6', type:'mc',
    question:'Why do experienced traders prefer a minimum risk-to-reward ratio of 1:2?',
    options:['Regulations require it','Even with a 50% win rate, you still profit overall','It\'s required by all brokers','Higher ratios mean bigger position sizes'],
    correct:1, difficulty:2,
    explanation:'At 1:2 R:R with a 50% win rate: if you risk $100 to make $200, over 10 trades you lose 5×$100 = $500 and win 5×$200 = $1,000 for a net $500 profit. Good R:R means you can be wrong often and still make money.' },

  { id:'q6-04', moduleId:'module-6', type:'mc',
    question:'A stop loss placed based on market structure means:',
    options:['Setting it at a fixed dollar amount','Setting it below a significant support level or swing low that, if broken, invalidates your thesis','Using 1% of portfolio value always','Setting it where your broker recommends'],
    correct:1, difficulty:2,
    explanation:'Structure-based stops are logical: if you\'re buying because price bounced off support, your stop goes just below that support. If that support breaks, your reason for the trade no longer exists.' },

  { id:'q6-05', moduleId:'module-6', type:'mc',
    question:'A "pullback entry" strategy involves:',
    options:['Buying as soon as a new high is made','Waiting for price to pull back to a key level after a breakout, then entering','Entering at the worst possible price','Only trading during pullbacks in earnings'],
    correct:1, difficulty:2,
    explanation:'Pullback entries wait for a trend move, let price retrace (pull back) to a key level (previous resistance turned support, a moving average, a trend line), then enter as price resumes the trend. This offers better R:R than chasing.' },

  { id:'q6-06', moduleId:'module-6', type:'mc',
    question:'Position sizing based on risk means:',
    options:['Always buying 100 shares','Calculating how many shares to buy so your dollar loss equals your predetermined risk if stopped out','Using maximum leverage','Investing a fixed dollar amount regardless of stop distance'],
    correct:1, difficulty:3,
    explanation:'Proper position sizing: decide how much you\'re willing to lose (e.g., $200). Divide by the distance to your stop (e.g., $2/share). That gives you 100 shares. This way every trade risks the same amount regardless of volatility.' },

  { id:'q6-07', moduleId:'module-6', type:'mc',
    question:'A trailing stop:',
    options:['Is always set at 5% below entry','Automatically adjusts upward (in a long) as price rises, locking in profits','Must be set manually each day','Is only used for options trading'],
    correct:1, difficulty:2,
    explanation:'A trailing stop moves with price in the direction of the trade, locking in profit as the trade moves in your favor, while cutting the loss if price reverses. It\'s a mechanical way to let winners run.' },

  { id:'q6-ci-01', moduleId:'module-6', type:'mc', checkIn: true,
    question:'You see a strong uptrend on the weekly chart, but the daily shows a downtrend. A short-term trade should:',
    options:['Ignore the weekly chart and short the daily downtrend','Favor the long side on the daily because the larger trend is up','Only trade when both align (weekly up + daily up)','Avoid the market entirely'],
    correct:2, difficulty:3,
    explanation:'The most conservative and highest-probability approach: only trade in the direction the higher timeframe agrees with the lower timeframe. When the weekly is bullish AND the daily is bullish, you have trend alignment.' },

  // ═══════════════════════════════════════════════════════════════════
  // MODULE 7 — Options & Greeks
  // ═══════════════════════════════════════════════════════════════════
  { id:'q7-01', moduleId:'module-7', type:'mc',
    question:'A call option gives the buyer the right to:',
    options:['Sell shares at the strike price before expiration','Buy shares at the strike price before expiration','Sell shares at the market price','Buy shares at market price with leverage'],
    correct:1, difficulty:1,
    explanation:'A call option gives the buyer the RIGHT (but not obligation) to BUY 100 shares of the underlying at the strike price, anytime before expiration. The seller (writer) is obligated to sell if exercised.' },

  { id:'q7-02', moduleId:'module-7', type:'mc',
    question:'Delta of an at-the-money (ATM) call option is approximately:',
    options:['0 to 0.1','0.25','0.50','1.0'],
    correct:2, difficulty:2,
    explanation:'ATM options have a delta of approximately 0.50 because there\'s roughly a 50% chance they expire in-the-money. Deep ITM options have delta near 1.0; deep OTM options have delta near 0.' },

  { id:'q7-03', moduleId:'module-7', type:'mc',
    question:'Theta (time decay) means that options:',
    options:['Become more valuable as expiration approaches','Lose value every day, all else being equal','Are only affected by price moves','Increase in value with more volatility'],
    correct:1, difficulty:1,
    explanation:'Theta is the daily erosion of an option\'s time value. An option with 30 days to expiry loses a portion of its value each day, even if the stock price doesn\'t move. Theta accelerates dramatically in the final 30 days.' },

  { id:'q7-04', moduleId:'module-7', type:'mc',
    question:'"IV Crush" occurs when:',
    options:['Implied volatility spikes before an event, then drops sharply after','The stock price drops 20% or more','Delta reaches zero','Time decay accelerates'],
    correct:0, difficulty:2,
    explanation:'IV Crush: before events like earnings, implied volatility inflates (making options expensive). Immediately after the event — even if the stock moves — IV collapses. Option buyers can lose money even when the stock moves the right way.' },

  { id:'q7-05', moduleId:'module-7', type:'mc',
    question:'Gamma is highest when:',
    options:['The option is deep in-the-money','The option is deep out-of-the-money','The option is at-the-money and near expiration','Implied volatility is very low'],
    correct:2, difficulty:3,
    explanation:'Gamma measures how quickly delta changes per $1 move in the underlying. It\'s highest for ATM options close to expiration, where small moves cause large delta swings. This makes short gamma positions risky near expiry.' },

  { id:'q7-06', moduleId:'module-7', type:'mc',
    question:'Vega measures an option\'s sensitivity to:',
    options:['Time passing','Interest rate changes','Changes in implied volatility','The underlying stock\'s price'],
    correct:2, difficulty:2,
    explanation:'Vega tells you how much the option price changes for every 1% change in implied volatility. Long options have positive vega (benefit from rising IV); short options have negative vega (benefit from falling IV).' },

  { id:'q7-07', moduleId:'module-7', type:'mc',
    question:'A long straddle profits when:',
    options:['The stock stays flat','The stock moves significantly in either direction','Only when the stock rises','Only when IV increases'],
    correct:1, difficulty:2,
    explanation:'A straddle (long call + long put at same strike/expiry) profits from a big move in either direction. You pay the combined premium; you need the move to exceed that premium to profit. Commonly used around earnings.' },

  { id:'q7-08', moduleId:'module-7', type:'mc',
    question:'A covered call strategy involves:',
    options:['Buying a call option to hedge a long stock position','Selling a call option against shares you already own','Buying calls on two correlated stocks','Selling naked calls without owning the stock'],
    correct:1, difficulty:2,
    explanation:'A covered call: you own 100 shares and sell 1 call option against them. You collect premium income. Risk: if stock rallies past strike, your gains are capped. It\'s a strategy for income in a flat or mildly bullish outlook.' },

  { id:'q7-09', moduleId:'module-7', type:'mc',
    question:'A put option is "in-the-money" (ITM) when:',
    options:['The stock price is above the strike price','The stock price is below the strike price','The option has more than 30 days to expiry','Implied volatility is above 30%'],
    correct:1, difficulty:2,
    explanation:'A put gives the right to SELL at the strike. If the stock is BELOW the strike, the put has intrinsic value (you can sell at a higher-than-market price) — it\'s in-the-money. A call is ITM when stock > strike.' },

  { id:'q7-10', moduleId:'module-7', type:'mc',
    question:'A put option is best used as:',
    options:['A way to generate income on flat stocks','Directional bearish bet or insurance against a long stock position','A substitute for buying a stock','A neutral volatility play'],
    correct:1, difficulty:1,
    explanation:'Buying a put profits when the stock falls below the strike price. It can be used speculatively (betting on a decline) or as a hedge (protective put) to limit downside on shares you already own.' },

  { id:'q7-ci-01', moduleId:'module-7', type:'mc', checkIn: true,
    question:'Which Greek primarily benefits option sellers (rather than buyers)?',
    options:['Delta','Vega','Theta','Gamma'],
    correct:2, difficulty:2,
    explanation:'Theta (time decay) works in favor of option sellers. Every day that passes, the option loses time value — that value flows from the option buyer to the seller. Sellers profit from the passage of time.' },

  // ═══════════════════════════════════════════════════════════════════
  // MODULE 8 — Macro Context
  // ═══════════════════════════════════════════════════════════════════
  { id:'q8-01', moduleId:'module-8', type:'mc',
    question:'CPI (Consumer Price Index) measures:',
    options:['Corporate profit margins','The average price change of a basket of consumer goods and services — i.e., inflation','Gross Domestic Product growth','Central bank interest rate changes'],
    correct:1, difficulty:1,
    explanation:'CPI measures inflation from the consumer\'s perspective. When CPI rises faster than expected, markets often price in Fed rate hikes (bearish for growth stocks). When it falls, rate cut expectations rise.' },

  { id:'q8-02', moduleId:'module-8', type:'mc',
    question:'The stock market typically leads the broader economy by:',
    options:['It doesn\'t — it follows GDP reports exactly','About 6 to 9 months','About 2 years','The economy leads the market'],
    correct:1, difficulty:2,
    explanation:'Financial markets are forward-looking. Stocks typically peak ~6-9 months before a recession begins, and bottom 6-9 months before the economy actually recovers. Waiting for economic confirmation is usually too late.' },

  { id:'q8-03', moduleId:'module-8', type:'mc',
    question:'Rising interest rates generally have what effect on growth/tech stocks?',
    options:['Positive — higher rates mean more economic activity','Negative — future earnings are discounted at a higher rate, reducing their present value','No effect — rates only matter for bonds','Positive for small caps but negative for large caps'],
    correct:1, difficulty:2,
    explanation:'Growth stocks are valued heavily on future earnings. Higher rates increase the discount rate in valuation models (DCF), making those future earnings worth less TODAY. This is why tech stocks fell sharply during 2022 rate hikes.' },

  { id:'q8-04', moduleId:'module-8', type:'mc',
    question:'"Risk-off" behavior in markets typically includes:',
    options:['Buying high-beta tech stocks and emerging markets','Buying safe-haven assets: US Treasuries, gold, Japanese yen, USD','Shorting the VIX','Increasing allocation to junk bonds'],
    correct:1, difficulty:2,
    explanation:'Risk-off is when investors become fearful and rotate from risky to safe assets. Classic risk-off moves: buy US Treasuries (price up, yield down), buy gold, buy USD and JPY, sell equities and emerging markets.' },

  { id:'q8-05', moduleId:'module-8', type:'mc',
    question:'Quantitative Easing (QE) refers to:',
    options:['The Fed raising interest rates quickly','The Fed buying financial assets (like bonds) to inject liquidity into the economy','The government reducing corporate taxes','Banks lending at higher interest rates'],
    correct:1, difficulty:2,
    explanation:'QE: the central bank creates money to buy bonds (and sometimes other assets), lowering long-term rates and injecting liquidity. This makes borrowing cheap and drives investors into riskier assets like equities.' },

  { id:'q8-06', moduleId:'module-8', type:'mc',
    question:'Defensive sectors that tend to outperform in recessions include:',
    options:['Technology, Consumer Discretionary, Financials','Utilities, Consumer Staples, Healthcare','Energy, Materials, Industrials','Real Estate, Communication Services, Semiconductors'],
    correct:1, difficulty:2,
    explanation:'Defensive sectors sell goods/services people need regardless of the economy (utilities, food, medicine). They hold up during recessions. Cyclicals (tech, consumer discretionary) are more sensitive to economic conditions.' },

  { id:'q8-07', moduleId:'module-8', type:'mc',
    question:'NFP (Non-Farm Payrolls) reports measure:',
    options:['Corporate earnings per share','The number of jobs added or lost in the U.S. economy in the prior month','Consumer spending levels','Manufacturing output'],
    correct:1, difficulty:1,
    explanation:'NFP is released monthly by the Bureau of Labor Statistics. It measures job creation in the U.S. (excluding farm workers). It\'s one of the most closely watched economic indicators — a strong number can push markets higher.' },

  { id:'q8-08', moduleId:'module-8', type:'mc',
    question:'Sector rotation theory suggests that in an early recovery phase, which sectors tend to lead?',
    options:['Utilities and Consumer Staples','Financials, Technology, and Consumer Discretionary','Energy and Materials only','Healthcare exclusively'],
    correct:1, difficulty:3,
    explanation:'In early recovery: investors move from defensives into cyclical sectors. Financials benefit from rising rates and loan growth; consumer discretionary benefits from improving confidence; tech leads the next growth cycle.' },

  { id:'q8-09', moduleId:'module-8', type:'mc',
    question:'The VIX is often called the "fear gauge" because:',
    options:['It measures the volatility of the VIX itself','It measures implied volatility in S&P 500 options — high VIX = market fear','It tracks hedge fund positioning','It is the volatility of individual stocks'],
    correct:1, difficulty:1,
    explanation:'VIX measures the market\'s expectation of 30-day volatility in the S&P 500, derived from option prices. VIX above 30 typically signals fear/uncertainty; below 15 signals complacency. It tends to spike during market crashes.' },

  { id:'q8-10', moduleId:'module-8', type:'mc',
    question:'When the Federal Reserve signals it will cut interest rates, it typically:',
    options:['Causes bond prices to fall and equity markets to sell off','Causes bond prices to rise and often boosts equity markets, especially growth stocks','Has no effect on financial markets','Only affects the currency market'],
    correct:1, difficulty:2,
    explanation:'Rate cuts: bonds become more valuable (existing higher-rate bonds are worth more), yields fall, and equities often rally as future cash flows are discounted at a lower rate. Growth/tech stocks benefit the most.' },

  { id:'q8-ci-01', moduleId:'module-8', type:'mc', checkIn: true,
    question:'PMI (Purchasing Managers Index) above 50 indicates:',
    options:['Inflation is above 50% annually','The manufacturing or services sector is expanding','Unemployment is above average','Interest rates are too high'],
    correct:1, difficulty:2,
    explanation:'PMI is a survey-based index. Above 50 = expansion (more companies report growth than contraction). Below 50 = contraction. It\'s a leading indicator — it often moves before official GDP data confirms the trend.' },

  // ═══════════════════════════════════════════════════════════════════
  // FINAL ASSESSMENT — Mixed modules
  // ═══════════════════════════════════════════════════════════════════
  { id:'qf-01', moduleId:'final', type:'mc',
    question:'A bullish engulfing pattern appearing at the 200-day moving average support, with RSI near 30 and OBV making higher highs while price is flat — this is an example of:',
    options:['A weak, low-probability trade setup','High confluence — multiple independent signals aligning bullishly','A bearish setup in disguise','A signal to sell'],
    correct:1, difficulty:3,
    explanation:'Confluence: S/R support (200-day MA) + oversold momentum (RSI near 30) + volume confirmation (OBV divergence) + reversal candlestick (bullish engulfing). Each factor independently supports the bull case.' },

  { id:'qf-02', moduleId:'final', type:'mc',
    question:'You own a call option with 5 days to expiry. The stock has not moved. Your position is likely:',
    options:['More valuable due to potential near-term move','Losing value rapidly due to accelerating theta decay','Worth exactly the same as when you bought it','Gaining due to vega expansion'],
    correct:1, difficulty:2,
    explanation:'With 5 days to expiry, theta decay accelerates dramatically — time value evaporates quickly. If price hasn\'t moved, the option loses significant value each day even without any adverse price move.' },

  { id:'qf-03', moduleId:'final', type:'mc',
    question:'CPI prints well above expectations. The likely immediate market reaction is:',
    options:['Stocks rally broadly on economic strength','Bonds rally, yields fall','Rate hike expectations increase — growth stocks fall, yields rise','The Federal Reserve immediately cuts rates'],
    correct:2, difficulty:3,
    explanation:'Hot CPI = more inflation = Fed likely needs to hike more aggressively. Bond prices fall (yields rise). Growth stocks fall the hardest (future earnings worth less at higher discount rates). Defensive stocks relatively outperform.' },

  { id:'qf-04', moduleId:'final', type:'mc',
    question:'An ADX of 18, price in a range, and you\'re using a moving average crossover system. You should expect:',
    options:['High-probability signals from the crossover system','Many false signals because the trend is too weak for trend indicators','The death cross to confirm a bear market','Strong directional follow-through'],
    correct:1, difficulty:3,
    explanation:'ADX below 20 = no meaningful trend. Moving average crossover systems perform terribly in ranging markets. The MA lines will criss-cross repeatedly, generating many false buy/sell signals. Switch to range-bound tools (oscillators, S/R).' },

  { id:'qf-05', moduleId:'final', type:'mc',
    question:'A Head and Shoulders pattern completes and you enter a short. The measured move target is based on:',
    options:['The distance from the right shoulder to the left shoulder','The distance from the head peak to the neckline, projected below the neckline','The average of all three peaks','The volume during the neckline break'],
    correct:1, difficulty:2,
    explanation:'H&S measured move: measure the distance from the top of the head straight down to the neckline. Project that same distance downward from the point where price breaks below the neckline.' },

  { id:'qf-06', moduleId:'final', type:'mc',
    question:'Which scenario represents the most favorable risk-to-reward setup?',
    options:['Entry $50, Stop $48, Target $52 (1:1)','Entry $50, Stop $49, Target $53 (1:3)','Entry $50, Stop $47, Target $52 (1:0.67)','Entry $50, Stop $45, Target $52 (1:0.4)'],
    correct:1, difficulty:2,
    explanation:'R:R of 1:3 means you risk $1 to make $3. Even with a 33% win rate, this strategy is breakeven. Options A, C, D all have unfavorable R:R. Always seek at minimum 1:2, with 1:3 or better being ideal.' },

  { id:'qf-07', moduleId:'final', type:'mc',
    question:'The "role reversal" principle states that:',
    options:['Bulls become bears and vice versa at turning points','A broken support level often becomes resistance, and a broken resistance often becomes support','Trend direction reverses after a doji pattern','Moving averages change their role in different markets'],
    correct:1, difficulty:2,
    explanation:'Role reversal: once a support level is broken decisively, it flips to become resistance on the way back up (and vice versa). This creates high-probability trade setups — short at broken support that now acts as resistance.' },

  { id:'qf-08', moduleId:'final', type:'mc',
    question:'In a risk-off environment driven by recession fears, which asset allocation would typically perform best?',
    options:['100% small-cap tech stocks','60% high-yield bonds, 40% emerging market equities','US Treasuries, gold, consumer staples stocks, USD','Cryptocurrency and commodity futures'],
    correct:2, difficulty:3,
    explanation:'Classic risk-off rotation: US Treasuries (safe, government-backed), gold (store of value), defensive stocks like consumer staples (people still buy food/medicine), and USD (global reserve currency flight to safety).' },
];
