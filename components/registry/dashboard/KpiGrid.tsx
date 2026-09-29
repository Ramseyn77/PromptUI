/**
 * @registry
 * name: KPI Grid
 * category: Dashboard
 * style: SaaS
 * tags: featured, recent
 * description: Grille de quatre indicateurs cles avec variation, mini courbe et periode de comparaison.
 * prompt: Create a KPI grid (1 col mobile, 2 on sm, 4 on lg): each card has a label, big value, a green/red delta badge with arrow, a tiny SVG sparkline colored by trend, and "vs last week". Light and dark mode.
 */
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

const kpis = [
  { label: 'Revenue', value: '$84.2k', delta: 12.4, points: [8, 10, 9, 13, 12, 15, 17] },
  { label: 'Active users', value: '12,480', delta: 5.1, points: [10, 11, 11, 12, 13, 13, 14] },
  { label: 'Churn', value: '2.4%', delta: -0.6, points: [14, 13, 13, 12, 11, 11, 10] },
  { label: 'NPS', value: '64', delta: -2.0, points: [15, 14, 15, 13, 12, 13, 12] },
];

function Sparkline({ points, up }: { points: number[]; up: boolean }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const d = points.map((value, index) => `${(index / (points.length - 1)) * 100},${28 - ((value - min) / (max - min || 1)) * 24}`).join(' ');
  return <svg aria-hidden viewBox="0 0 100 30" preserveAspectRatio="none" className="h-8 w-20"><polyline points={d} fill="none" strokeWidth="2" vectorEffect="non-scaling-stroke" className={up ? 'stroke-emerald-500' : 'stroke-rose-500'} /></svg>;
}

export function KpiGrid() {
  return (
    <div className="grid w-full max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => {
        // For churn, going down is good news.
        const good = kpi.label === 'Churn' ? kpi.delta < 0 : kpi.delta > 0;
        const Arrow = kpi.delta > 0 ? ArrowUpRight : ArrowDownRight;
        return (
          <article key={kpi.label} className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{kpi.label}</p>
            <div className="mt-2 flex items-end justify-between gap-2">
              <p className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">{kpi.value}</p>
              <Sparkline points={kpi.points} up={good} />
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-semibold ${good ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-700 dark:text-rose-400'}`}><Arrow aria-hidden className="size-3" />{Math.abs(kpi.delta)}%</span>
              vs last week
            </p>
          </article>
        );
      })}
    </div>
  );
}
