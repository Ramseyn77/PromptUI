/**
 * @registry
 * name: Stacked Area Chart
 * category: Charts
 * style: Minimal
 * tags: recent
 * description: Aires empilées par canal d'acquisition avec courbes lissées, légende et totaux.
 * prompt: Create an SVG stacked area chart of traffic by channel (Organic, Paid, Referral) over 8 weeks: compute cumulative stacks, draw smooth areas (quadratic midpoints) with layered opacity, a legend with each channel's latest value, x labels, and an sr-only table. Light and dark mode.
 */
const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'];
const channels = [
  { name: 'Organic', color: '#14b8a6', values: [30, 34, 33, 40, 44, 47, 52, 58] },
  { name: 'Paid', color: '#8b5cf6', values: [18, 20, 24, 22, 26, 28, 27, 30] },
  { name: 'Referral', color: '#f59e0b', values: [8, 9, 12, 11, 14, 13, 16, 18] },
];

function smooth(points: number[][]) {
  return points.reduce((path, [x, y], index) => {
    if (!index) return `M${x},${y}`;
    const [px, py] = points[index - 1];
    return `${path} Q${px},${py} ${(px + x) / 2},${(py + y) / 2}`;
  }, '') + ` T${points[points.length - 1].join(',')}`;
}

export function StackedAreaChart() {
  const max = 110;
  const x = (index: number) => 10 + (index / (weeks.length - 1)) * 340;
  const y = (value: number) => 140 - (value / max) * 130;
  const stacks = channels.map((_, c) => weeks.map((__, w) => channels.slice(0, c + 1).reduce((sum, channel) => sum + channel.values[w], 0)));

  return (
    <section className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="font-semibold text-zinc-900 dark:text-white">Traffic by channel</h3>
      <div className="mt-2 flex flex-wrap gap-4">{channels.map((channel) => <span key={channel.name} className="inline-flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400"><span className="size-2.5 rounded-sm" style={{ background: channel.color }} />{channel.name} <strong className="text-zinc-900 dark:text-white">{channel.values[weeks.length - 1]}k</strong></span>)}</div>
      <svg viewBox="0 0 360 160" className="mt-3 w-full" aria-hidden>
        {[...channels].reverse().map((channel, reversed) => {
          const c = channels.length - 1 - reversed;
          const top = stacks[c].map((value, w) => [x(w), y(value)]);
          const line = smooth(top);
          return (
            <g key={channel.name}>
              <path d={`${line} L${x(weeks.length - 1)},140 L${x(0)},140 Z`} fill={channel.color} fillOpacity=".75" />
              <path d={line} fill="none" stroke={channel.color} strokeWidth="1.5" />
            </g>
          );
        })}
        {weeks.map((week, w) => <text key={week} x={x(w)} y="155" textAnchor="middle" className="fill-zinc-400 text-[9px]">{week}</text>)}
      </svg>
      <div className="sr-only"><table><caption>Weekly visits in thousands</caption><thead><tr><th>Week</th>{channels.map((channel) => <th key={channel.name}>{channel.name}</th>)}</tr></thead><tbody>{weeks.map((week, w) => <tr key={week}><td>{week}</td>{channels.map((channel) => <td key={channel.name}>{channel.values[w]}</td>)}</tr>)}</tbody></table></div>
    </section>
  );
}
