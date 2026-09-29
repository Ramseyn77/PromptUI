/**
 * @registry
 * name: Spotlight Card
 * category: Cards
 * style: SaaS
 * tags: featured, recent
 * description: Carte feature dont le halo lumineux suit le curseur.
 * prompt: Create a feature card where a soft teal radial-gradient spotlight follows the pointer (pointermove sets x/y, fades out on leave). Include an icon tile, title, description and two stat tiles. Light and dark mode borders and surfaces.
 */
'use client';
import { RefreshCw } from 'lucide-react';
import { useState, type PointerEvent } from 'react';

export function SpotlightCard() {
  const [spot, setSpot] = useState({ x: 0, y: 0, visible: false });

  function follow(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setSpot({ x: event.clientX - rect.left, y: event.clientY - rect.top, visible: true });
  }

  return (
    <article
      onPointerMove={follow}
      onPointerLeave={() => setSpot((value) => ({ ...value, visible: false }))}
      className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: spot.visible ? 1 : 0,
          background: `radial-gradient(280px circle at ${spot.x}px ${spot.y}px, rgba(45, 212, 191, .18), transparent 70%)`,
        }}
      />
      <div className="relative">
        <span className="grid size-11 place-items-center rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
          <RefreshCw aria-hidden className="size-5" />
        </span>
        <h3 className="mt-5 text-lg font-semibold text-zinc-900 dark:text-white">Realtime sync</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Every edit lands on all devices in under 50 ms, even when your team works offline.
        </p>
        <dl className="mt-6 grid grid-cols-2 gap-3">
          {[['Latency', '42 ms'], ['Uptime', '99.99%']].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-zinc-200 px-4 py-3 dark:border-zinc-800">
              <dt className="text-xs text-zinc-500 dark:text-zinc-400">{label}</dt>
              <dd className="mt-1 font-semibold text-zinc-900 dark:text-white">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
