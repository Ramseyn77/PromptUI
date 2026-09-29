/**
 * @registry
 * name: Radar Chart
 * category: Charts
 * style: Gradient
 * tags: featured, recent
 * description: Graphique radar comparant deux profils sur six axes, polygones translucides et points.
 * prompt: Create an SVG radar chart: 6 axes (Speed, Design, Docs, A11y, Price, Support) with concentric hexagon grid levels, axis labels, two translucent overlapping polygons (teal and violet) with vertex dots, a legend, and an sr-only table. Computed with polar coordinates. Light and dark mode.
 */
const axes = ['Speed', 'Design', 'Docs', 'A11y', 'Price', 'Support'];
const profiles = [
  { name: 'PromptUI', color: '#14b8a6', values: [9, 9, 8, 9, 7, 8] },
  { name: 'Competitor', color: '#8b5cf6', values: [7, 6, 9, 5, 8, 6] },
];
const center = 110;
const radius = 80;
const point = (index: number, value: number) => {
  const angle = (Math.PI * 2 * index) / axes.length - Math.PI / 2;
  return [center + Math.cos(angle) * radius * (value / 10), center + Math.sin(angle) * radius * (value / 10)];
};

export function RadarChart() {
  return (
    <section className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="font-semibold text-zinc-900 dark:text-white">Product comparison</h3>
      <svg viewBox="0 0 220 220" className="mt-2 w-full" aria-hidden>
        {[2.5, 5, 7.5, 10].map((level) => <polygon key={level} points={axes.map((_, index) => point(index, level).join(',')).join(' ')} fill="none" className="stroke-zinc-200 dark:stroke-zinc-800" />)}
        {axes.map((axis, index) => {
          const [x, y] = point(index, 10);
          const [lx, ly] = point(index, 12.2);
          return <g key={axis}><line x1={center} y1={center} x2={x} y2={y} className="stroke-zinc-200 dark:stroke-zinc-800" /><text x={lx} y={ly + 3} textAnchor="middle" className="fill-zinc-500 text-[9px] font-medium dark:fill-zinc-400">{axis}</text></g>;
        })}
        {profiles.map((profile) => (
          <g key={profile.name}>
            <polygon points={profile.values.map((value, index) => point(index, value).join(',')).join(' ')} fill={profile.color} fillOpacity=".2" stroke={profile.color} strokeWidth="2" />
            {profile.values.map((value, index) => { const [x, y] = point(index, value); return <circle key={index} cx={x} cy={y} r="3" fill={profile.color} />; })}
          </g>
        ))}
      </svg>
      <div className="flex justify-center gap-4">{profiles.map((profile) => <span key={profile.name} className="inline-flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400"><span className="size-2.5 rounded-full" style={{ background: profile.color }} />{profile.name}</span>)}</div>
      <table className="sr-only"><caption>Scores out of 10</caption><thead><tr><th>Axis</th>{profiles.map((profile) => <th key={profile.name}>{profile.name}</th>)}</tr></thead><tbody>{axes.map((axis, index) => <tr key={axis}><td>{axis}</td>{profiles.map((profile) => <td key={profile.name}>{profile.values[index]}</td>)}</tr>)}</tbody></table>
    </section>
  );
}
