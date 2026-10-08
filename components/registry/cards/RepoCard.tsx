/**
 * @registry
 * name: Repo Card
 * category: Cards
 * style: Dark
 * tags: recent
 * description: Carte de dépôt de code avec description, barre des langages, étoiles (bouton Star), forks et dernière mise à jour.
 * prompt: Create a code repository card: owner/repo name with a Public badge, description, topic chips, a segmented language bar (TypeScript, CSS, MDX with percentages in a legend), stats row (stars, forks, issues) and a Star toggle button (aria-pressed) that updates the count; "Updated 3h ago". Dark card in both themes; no brand logos.
 */
'use client';
import { BookMarked, CircleDot, GitFork, Star } from 'lucide-react';
import { useState } from 'react';

const languages = [['TypeScript', 68, '#3178c6'], ['CSS', 22, '#a855f7'], ['MDX', 10, '#f59e0b']] as const;

export function RepoCard() {
  const [starred, setStarred] = useState(false);

  return (
    <article className="w-full max-w-sm rounded-2xl bg-zinc-950 p-5 text-zinc-200 ring-1 ring-white/10">
      <div className="flex items-start gap-2">
        <BookMarked aria-hidden className="mt-0.5 size-4 text-zinc-500" />
        <h3 className="min-w-0 flex-1 truncate text-sm"><a href="#repo" className="text-sky-400 hover:underline">promptui</a><span className="text-zinc-500"> / </span><a href="#repo" className="font-semibold text-sky-400 hover:underline">registry</a></h3>
        <span className="rounded-full border border-white/15 px-2 text-[11px] text-zinc-400">Public</span>
      </div>
      <p className="mt-2 text-sm text-zinc-400">Copy-ready React components with AI prompts. Accessible, themeable, no lock-in.</p>
      <ul className="mt-3 flex flex-wrap gap-1.5">{['react', 'tailwind', 'design-system'].map((topic) => <li key={topic} className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[11px] font-medium text-sky-300">{topic}</li>)}</ul>
      <div className="mt-4 flex h-2 overflow-hidden rounded-full">{languages.map(([name, pct, color]) => <span key={name} style={{ width: `${pct}%`, background: color }} />)}</div>
      <ul className="mt-2 flex flex-wrap gap-3 text-xs text-zinc-400">{languages.map(([name, pct, color]) => <li key={name} className="flex items-center gap-1"><span className="size-2 rounded-full" style={{ background: color }} />{name} {pct}%</li>)}</ul>
      <div className="mt-4 flex items-center gap-4 border-t border-white/10 pt-3 text-xs text-zinc-400">
        <span className="flex items-center gap-1"><GitFork aria-hidden className="size-3.5" />214</span>
        <span className="flex items-center gap-1"><CircleDot aria-hidden className="size-3.5" />12 issues</span>
        <span className="hidden sm:inline">Updated 3h ago</span>
        <button type="button" aria-pressed={starred} onClick={() => setStarred((value) => !value)} className={`ml-auto inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-medium ${starred ? 'border-amber-400/50 bg-amber-400/10 text-amber-300' : 'border-white/15 text-zinc-300 hover:bg-white/5'}`}><Star aria-hidden className={`size-3.5 ${starred ? 'fill-current' : ''}`} />{starred ? 'Starred' : 'Star'}<span className="tabular-nums text-zinc-400">{(4812 + (starred ? 1 : 0)).toLocaleString('en-US')}</span></button>
      </div>
    </article>
  );
}
