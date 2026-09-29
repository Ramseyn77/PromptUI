/**
 * @registry
 * name: Candlestick Chart
 * category: Charts
 * style: Dark
 * tags: recent
 * description: Graphique boursier en chandeliers avec meches, hausse verte, baisse rouge et ligne du dernier prix.
 * prompt: Create an SVG candlestick chart for 14 trading days: wicks (high/low lines) and bodies (open/close) colored emerald when up and rose when down, a dashed last-price line with a price tag on the right, price gridlines, and an sr-only summary. Dark panel in both themes.
 */
const candles = [
  [100, 106, 98, 104], [104, 108, 101, 102], [102, 105, 97, 99], [99, 103, 96, 102], [102, 110, 101, 109],
  [109, 112, 106, 107], [107, 109, 102, 103], [103, 107, 100, 106], [106, 114, 105, 113], [113, 116, 110, 111],
  [111, 113, 106, 108], [108, 115, 107, 114], [114, 119, 112, 118], [118, 121, 114, 116],
];

export function CandlestickChart() {
  const min = 94;
  const max = 124;
  const y = (value: number) => 10 + ((max - value) / (max - min)) * 150;
  const last = candles[candles.length - 1][3];

  return (
    <section className="w-full max-w-xl rounded-2xl bg-zinc-950 p-5">
      <div className="flex items-baseline justify-between">
        <h3 className="font-semibold text-white">PUI / USD</h3>
        <p className="font-mono text-sm text-emerald-400">{last.toFixed(2)} <span className="text-xs">+16.0%</span></p>
      </div>
      <p className="sr-only">Daily candles over 14 days, from 100 to {last}, high 121, low 96.</p>
      <svg aria-hidden viewBox="0 0 360 170" className="mt-3 w-full">
        {[100, 110, 120].map((tick) => <g key={tick}><line x1="0" x2="320" y1={y(tick)} y2={y(tick)} stroke="#27272a" /><text x="328" y={y(tick) + 3} className="fill-zinc-500 text-[9px]">{tick}</text></g>)}
        {candles.map(([open, high, low, close], index) => {
          const x = 12 + index * 22.5;
          const up = close >= open;
          const color = up ? '#34d399' : '#fb7185';
          return (
            <g key={index}>
              <line x1={x} x2={x} y1={y(high)} y2={y(low)} stroke={color} strokeWidth="1.2" />
              <rect x={x - 6} y={y(Math.max(open, close))} width="12" height={Math.max(1.5, Math.abs(y(open) - y(close)))} rx="1.5" fill={color} />
            </g>
          );
        })}
        <line x1="0" x2="320" y1={y(last)} y2={y(last)} stroke="#34d399" strokeDasharray="3 3" strokeWidth="1" />
        <rect x="320" y={y(last) - 7} width="40" height="14" rx="3" fill="#34d399" />
        <text x="340" y={y(last) + 3.5} textAnchor="middle" className="fill-zinc-950 text-[9px] font-bold">{last}</text>
      </svg>
    </section>
  );
}
