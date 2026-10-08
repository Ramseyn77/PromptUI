/**
 * @registry
 * name: Waterfall Chart
 * category: Charts
 * style: Editorial
 * tags: recent
 * description: Cascade de revenus du début à la fin de période, hausses et baisses flottantes avec connecteurs.
 * prompt: Create an SVG waterfall chart for MRR movement: starting total bar, floating green bars for new/expansion, rose bars for contraction/churn, and an ending total bar; thin dashed connectors between bars, value labels above each bar, category labels below, and an sr-only list. Light and dark mode.
 */
const steps = [
  { label: 'Start', value: 120, total: true },
  { label: 'New', value: 28 },
  { label: 'Expansion', value: 14 },
  { label: 'Contraction', value: -9 },
  { label: 'Churn', value: -15 },
  { label: 'End', value: 138, total: true },
];

export function WaterfallChart() {
  const max = 170;
  const y = (value: number) => 140 - (value / max) * 125;
  let running = 0;
  const bars = steps.map((step) => {
    const from = step.total ? 0 : running;
    const to = step.total ? step.value : running + step.value;
    running = step.total ? step.value : to;
    return { ...step, from, to };
  });

  return (
    <section className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="font-semibold text-zinc-900 dark:text-white">MRR bridge <span className="text-sm font-normal text-zinc-500">(k$)</span></h3>
      <svg aria-hidden viewBox="0 0 360 165" className="mt-3 w-full">
        {bars.map((bar, index) => {
          const x = 14 + index * 58;
          const top = y(Math.max(bar.from, bar.to));
          const height = Math.abs(y(bar.from) - y(bar.to));
          const color = bar.total ? '#52525b' : bar.value > 0 ? '#10b981' : '#f43f5e';
          return (
            <g key={bar.label}>
              <rect x={x} y={top} width="40" height={height} rx="4" fill={color} className={bar.total ? 'dark:fill-zinc-300' : ''} />
              <text x={x + 20} y={top - 5} textAnchor="middle" className="fill-zinc-700 text-[10px] font-semibold dark:fill-zinc-200">{bar.total ? bar.value : `${bar.value > 0 ? '+' : ''}${bar.value}`}</text>
              <text x={x + 20} y="158" textAnchor="middle" className="fill-zinc-500 text-[9px]">{bar.label}</text>
              {index < bars.length - 1 && <line x1={x + 40} x2={x + 58} y1={y(bar.to)} y2={y(bar.to)} strokeDasharray="2 2" className="stroke-zinc-400" />}
            </g>
          );
        })}
      </svg>
      <ul className="sr-only">{steps.map((step) => <li key={step.label}>{step.label}: {step.value}k</li>)}</ul>
    </section>
  );
}
