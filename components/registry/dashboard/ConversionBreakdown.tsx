/**
 * @registry
 * name: Conversion Breakdown
 * category: Dashboard
 * style: Gradient
 * tags: recent
 * description: Anneau de répartition du trafic par canal avec légende interactive qui isole un segment.
 * prompt: Create a traffic-source donut: SVG circles with stroke-dasharray segments (Organic, Paid, Social, Referral) and gaps, center total; hovering or focusing a legend item highlights its segment and dims the others, center text switches to that channel. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const channels = [
  { name: 'Organic', value: 42, color: '#14b8a6' },
  { name: 'Paid', value: 24, color: '#8b5cf6' },
  { name: 'Social', value: 20, color: '#f59e0b' },
  { name: 'Referral', value: 14, color: '#ec4899' },
];

export function ConversionBreakdown() {
  const [active, setActive] = useState<string | null>(null);
  const circumference = 2 * Math.PI * 40;
  let offset = 0;
  const current = channels.find((channel) => channel.name === active);

  return (
    <section className="flex w-full max-w-md flex-col items-center gap-6 rounded-2xl border border-zinc-200 bg-white p-5 sm:flex-row dark:border-zinc-800 dark:bg-zinc-950">
      <div className="relative size-40 shrink-0">
        <svg aria-hidden viewBox="0 0 100 100" className="size-40 -rotate-90">
          {channels.map((channel) => {
            const length = (channel.value / 100) * circumference;
            const segment = <circle key={channel.name} cx="50" cy="50" r="40" fill="none" stroke={channel.color} strokeWidth="14" strokeDasharray={`${length - 2} ${circumference - length + 2}`} strokeDashoffset={-offset} className="transition-opacity duration-200" style={{ opacity: !active || active === channel.name ? 1 : 0.2 }} />;
            offset += length;
            return segment;
          })}
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <div><p className="text-2xl font-semibold text-zinc-900 dark:text-white">{current ? `${current.value}%` : '18.2k'}</p><p className="text-xs text-zinc-500 dark:text-zinc-400">{current ? current.name : 'Sessions'}</p></div>
        </div>
      </div>
      <ul className="w-full space-y-1">
        {channels.map((channel) => (
          <li key={channel.name}>
            <button type="button" onMouseEnter={() => setActive(channel.name)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(channel.name)} onBlur={() => setActive(null)} className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900">
              <span className="size-2.5 rounded-full" style={{ background: channel.color }} />
              <span className="text-zinc-700 dark:text-zinc-300">{channel.name}</span>
              <span className="ml-auto font-semibold tabular-nums text-zinc-900 dark:text-white">{channel.value}%</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
