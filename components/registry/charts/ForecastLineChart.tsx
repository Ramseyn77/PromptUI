/**
 * @registry
 * name: Forecast Line Chart
 * category: Charts
 * style: SaaS
 * tags: featured, recent
 * description: Courbe réelle pleine prolongée par une prévision en pointillés avec intervalle de confiance.
 * prompt: Create an SVG line chart where actual data is a solid line with end dot, the forecast continues as a dashed line, and a shaded confidence band widens over the forecast period; a vertical "Today" divider, month labels, legend and an sr-only table. Light and dark mode.
 */
const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const actual = [22, 26, 25, 31, 34, 38];
const forecast = [38, 42, 45, 49];

export function ForecastLineChart() {
  const x = (index: number) => 20 + (index / (months.length - 1)) * 320;
  const y = (value: number) => 140 - (value / 60) * 125;
  const actualPath = actual.map((value, index) => `${index ? 'L' : 'M'}${x(index)},${y(value)}`).join(' ');
  const start = actual.length - 1;
  const forecastPath = forecast.map((value, index) => `${index ? 'L' : 'M'}${x(start + index)},${y(value)}`).join(' ');
  const upper = forecast.map((value, index) => `${x(start + index)},${y(value + index * 3)}`);
  const lower = forecast.map((value, index) => `${x(start + index)},${y(value - index * 3)}`).reverse();

  return (
    <section className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold text-zinc-900 dark:text-white">Revenue forecast</h3>
        <div className="flex gap-4 text-xs text-zinc-600 dark:text-zinc-400"><span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-4 bg-teal-500" />Actual</span><span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-4 border-t-2 border-dashed border-violet-500" />Forecast</span></div>
      </div>
      <svg aria-hidden viewBox="0 0 360 160" className="mt-3 w-full">
        {[20, 40].map((tick) => <line key={tick} x1="20" x2="340" y1={y(tick)} y2={y(tick)} className="stroke-zinc-100 dark:stroke-zinc-800" />)}
        <polygon points={[...upper, ...lower].join(' ')} fill="#8b5cf6" fillOpacity=".12" />
        <line x1={x(start)} x2={x(start)} y1="10" y2="140" strokeDasharray="2 3" className="stroke-zinc-400" />
        <text x={x(start) + 4} y="18" className="fill-zinc-500 text-[9px]">Today</text>
        <path d={forecastPath} fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5 4" />
        <path d={actualPath} fill="none" stroke="#14b8a6" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx={x(start)} cy={y(actual[start])} r="4" fill="#14b8a6" stroke="white" strokeWidth="2" className="dark:stroke-zinc-950" />
        {months.map((month, index) => <text key={month} x={x(index)} y="155" textAnchor="middle" className="fill-zinc-400 text-[9px]">{month}</text>)}
      </svg>
      <div className="sr-only"><table><caption>Revenue in k$, actual then forecast</caption><tbody>{months.map((month, index) => <tr key={month}><td>{month}</td><td>{index < actual.length ? `${actual[index]} actual` : `${forecast[index - start]} forecast`}</td></tr>)}</tbody></table></div>
    </section>
  );
}
