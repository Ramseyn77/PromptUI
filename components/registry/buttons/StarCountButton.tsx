/**
 * @registry
 * name: Star Count Button
 * category: Buttons
 * style: Dark
 * tags: recent
 * description: Bouton « Star » de dépôt open source avec compteur séparé, étoile qui se remplit en tournant et chiffres qui roulent à l'incrément.
 * prompt: Create a repository star button group: a left segment "Star" with a star icon that fills with amber and spins once when starred (aria-pressed), and a right segment showing the count "24.8k"-style formatted number that rolls vertically to the new value; a second sibling "Fork" segment with count; hover borders brighten; reduced motion disables the spin. Dark in both themes.
 */
'use client';
import { GitFork, Star } from 'lucide-react';
import { useState } from 'react';

const format = (value: number) => `${(value / 1000).toFixed(1)}k`;

export function StarCountButton() {
  const [starred, setStarred] = useState(false);
  const stars = 24812 + (starred ? 100 : 0);
  const segment = 'flex h-9 items-center gap-1.5 border border-white/15 bg-zinc-900 px-3 text-sm font-medium text-zinc-200 transition hover:border-white/30 hover:bg-zinc-800';

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-zinc-950 p-8 ring-1 ring-white/10">
      <style>{`@keyframes pui-star-spin { from { transform: rotate(-144deg) scale(.4) } to { transform: rotate(0) scale(1) } }`}</style>
      <div className="flex">
        <button type="button" aria-pressed={starred} onClick={() => setStarred(!starred)} className={`${segment} rounded-l-lg`}>
          <Star aria-hidden key={String(starred)} className={`size-4 ${starred ? 'fill-amber-400 text-amber-400 motion-safe:animate-[pui-star-spin_.45s_cubic-bezier(.3,1.6,.5,1)]' : 'text-zinc-400'}`} />
          {starred ? 'Starred' : 'Star'}
        </button>
        <a href="#" aria-label={`${stars.toLocaleString('en-US')} stargazers`} className={`${segment} -ml-px overflow-hidden rounded-r-lg`}>
          <span className="relative block h-5 overflow-hidden tabular-nums">
            <span className={`block transition-transform duration-300 motion-reduce:duration-0 ${starred ? '-translate-y-5' : 'translate-y-0'}`}><span className="block h-5 leading-5">{format(24812)}</span><span className="block h-5 leading-5">{format(24912)}</span></span>
          </span>
        </a>
      </div>
      <div className="flex">
        <button type="button" className={`${segment} rounded-l-lg`}><GitFork aria-hidden className="size-4 text-zinc-400" />Fork</button>
        <a href="#" aria-label="1,932 forks" className={`${segment} -ml-px rounded-r-lg tabular-nums`}>1.9k</a>
      </div>
    </div>
  );
}
