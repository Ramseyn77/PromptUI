/**
 * @registry
 * name: Layered Project Card
 * category: Cards
 * style: Glass
 * tags: featured, recent
 * description: Pile de cartes projet que l utilisateur fait avancer avec une transition en profondeur.
 * prompt: Create an interactive stack of three project cards. The front card is fully readable while the next cards sit behind it with smaller scale, vertical offset and lower opacity. A Next project button rotates the data order with a smooth depth transition. Include project name, category, progress, team avatars and accessible status text. Keep the stack inside its container on mobile and support light/dark mode.
 */
'use client';

import { ArrowRight, Layers3 } from 'lucide-react';
import { useState } from 'react';

const projects = [
  { name: 'Atlas mobile', category: 'Product design', progress: 78, color: 'from-teal-400 to-cyan-500', team: ['AM', 'NK', 'JL'] },
  { name: 'Northstar', category: 'Brand system', progress: 54, color: 'from-violet-500 to-fuchsia-500', team: ['SK', 'OM'] },
  { name: 'Pulse analytics', category: 'Dashboard', progress: 91, color: 'from-amber-400 to-rose-500', team: ['LM', 'CA', 'YS'] },
] as const;

export function LayeredProjectCard() {
  const [first, setFirst] = useState(0);
  const ordered = projects.map((_, index) => projects[(first + index) % projects.length]);

  return (
    <section className="w-full max-w-sm py-8">
      <div className="relative h-80">
        {ordered.map((project, index) => (
          <article key={project.name} aria-hidden={index !== 0} className="absolute inset-x-0 top-0 rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-2xl shadow-zinc-900/10 backdrop-blur-xl transition-all duration-500 dark:border-white/10 dark:bg-zinc-950/90" style={{ transform: `translateY(${index * 24}px) scale(${1 - index * 0.075})`, opacity: 1 - index * 0.22, zIndex: projects.length - index }}>
            <div className={`grid size-12 place-items-center rounded-2xl bg-gradient-to-br ${project.color} text-white shadow-lg`}><Layers3 aria-hidden className="size-5" /></div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-zinc-400">{project.category}</p>
            <h3 className="mt-1 text-2xl font-bold text-zinc-950 dark:text-white">{project.name}</h3>
            <div className="mt-6 flex items-center justify-between text-xs font-medium text-zinc-500"><span>Progress</span><span>{project.progress}%</span></div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"><span className={`block h-full rounded-full bg-gradient-to-r ${project.color} transition-all duration-700`} style={{ width: `${project.progress}%` }} /></div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex -space-x-2">{project.team.map((person) => <span key={person} className="grid size-8 place-items-center rounded-full border-2 border-white bg-zinc-900 text-[10px] font-bold text-white dark:border-zinc-950">{person}</span>)}</div>
              {index === 0 && <button type="button" onClick={() => setFirst((value) => (value + 1) % projects.length)} className="inline-flex items-center gap-1.5 rounded-full bg-zinc-950 px-4 py-2 text-xs font-semibold text-white outline-none transition hover:bg-teal-600 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:bg-white dark:text-zinc-950"><span>Next project</span><ArrowRight aria-hidden className="size-3.5" /></button>}
            </div>
          </article>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">Showing {ordered[0].name}, {ordered[0].progress}% complete.</p>
    </section>
  );
}
