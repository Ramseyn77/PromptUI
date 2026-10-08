/**
 * @registry
 * name: Release Train Board
 * category: Boards
 * style: Dark
 * tags: recent
 * description: Train de releases : wagons de versions sur des rails, fonctionnalités embarquées et statut de chaque version.
 * prompt: Create a release train board on a dark panel: a horizontal track with "wagons" for versions (v4.1 shipped, v4.2 boarding, v4.3 planned) connected by couplers; each wagon lists feature chips and a status pill; a "Boarding closes in 2 days" banner on the current one; features can be moved to the next train with a small button; the track scrolls horizontally on mobile. Dark in both themes.
 */
'use client';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

const trains = [{ version: 'v4.1', status: 'Shipped', date: 'Sep 24' }, { version: 'v4.2', status: 'Boarding', date: 'Oct 15' }, { version: 'v4.3', status: 'Planned', date: 'Nov 5' }];
const pill = { Shipped: 'bg-emerald-400/15 text-emerald-300', Boarding: 'bg-amber-400/15 text-amber-300', Planned: 'bg-white/10 text-zinc-300' } as const;

export function ReleaseTrainBoard() {
  const [features, setFeatures] = useState([
    { name: 'Dark mode', train: 0 }, { name: 'CSV export', train: 0 }, { name: 'SSO', train: 1 }, { name: 'Audit log', train: 1 }, { name: 'Webhooks v2', train: 1 }, { name: 'AI search', train: 2 },
  ]);

  return (
    <section className="w-full max-w-3xl rounded-2xl bg-zinc-950 p-5 text-white ring-1 ring-white/10">
      <h3 className="font-semibold">Release trains</h3>
      <div className="mt-4 overflow-x-auto pb-2" data-lenis-prevent>
        <div className="relative flex min-w-[40rem] items-stretch gap-6">
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 rounded bg-[repeating-linear-gradient(90deg,#52525b_0_10px,transparent_10px_16px)]" />
          {trains.map((train, index) => (
            <article key={train.version} className={`relative mb-3 flex-1 rounded-xl border p-3 ${train.status === 'Boarding' ? 'border-amber-400/50 bg-amber-400/5' : 'border-white/10 bg-white/5'}`}>
              {index > 0 && <span aria-hidden className="absolute -left-6 top-1/2 h-0.5 w-6 bg-zinc-600" />}
              <div className="flex items-center justify-between"><span className="font-mono text-sm font-semibold">{train.version}</span><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${pill[train.status as keyof typeof pill]}`}>{train.status}</span></div>
              <p className="text-[11px] text-zinc-500">{train.date}</p>
              {train.status === 'Boarding' && <p className="mt-2 rounded-md bg-amber-400/10 px-2 py-1 text-[11px] text-amber-200">Boarding closes in 2 days</p>}
              <ul className="mt-2 space-y-1">
                {features.filter((feature) => feature.train === index).map((feature) => (
                  <li key={feature.name} className="flex items-center justify-between rounded-md bg-white/5 px-2 py-1 text-xs">
                    {feature.name}
                    {train.status !== 'Shipped' && index < trains.length - 1 && <button type="button" aria-label={`Move ${feature.name} to ${trains[index + 1].version}`} onClick={() => setFeatures((list) => list.map((item) => (item.name === feature.name ? { ...item, train: item.train + 1 } : item)))} className="grid size-5 place-items-center rounded text-zinc-400 hover:bg-white/10 hover:text-white"><ChevronRight aria-hidden className="size-3.5" /></button>}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
