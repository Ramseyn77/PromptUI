/**
 * @registry
 * name: Stat Card Sparkline
 * category: Cards
 * style: Minimal
 * tags: recent
 * description: Carte KPI avec tendance, badge de progression et sparkline en degrade.
 * prompt: Create a KPI card: label, large value, green trend badge, and an SVG sparkline (polyline + gradient area, non-scaling stroke) with an accessible label. Works in light and dark mode.
 */
import { TrendingUp } from 'lucide-react';

const points = [12, 18, 15, 22, 20, 28, 26, 34, 31, 40, 38, 46];

export function StatCard() {
  const max = Math.max(...points);
  const line = points.map((value, index) => `${(index / (points.length - 1)) * 100},${40 - (value / max) * 36}`).join(' ');

  return (
    <article className="w-full max-w-xs rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Monthly revenue</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">$48.2k</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
          <TrendingUp aria-hidden className="size-3.5" /> +18.4%
        </span>
      </div>
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="mt-5 h-16 w-full" role="img" aria-label="Revenue trending up over 12 months">
        <defs>
          <linearGradient id="stat-card-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#14b8a6" stopOpacity=".28" />
            <stop offset="1" stopColor="#14b8a6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={`0,40 ${line} 100,40`} fill="url(#stat-card-fill)" />
        <polyline points={line} fill="none" stroke="#14b8a6" strokeWidth="1.6" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      </svg>
      <div className="mt-4 flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
        <span>Jan</span>
        <span>vs. last month</span>
        <span>Dec</span>
      </div>
    </article>
  );
}
