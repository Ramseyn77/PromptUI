/**
 * @registry
 * name: Diff Suggestion Card
 * category: AI Chat
 * style: Dark
 * tags: recent
 * description: Proposition de modification de l'IA en diff ligne à ligne, avec accepter / rejeter par bloc et tout appliquer.
 * prompt: Create an AI code-change suggestion card: file name header, two hunks shown as unified diff lines (removed rose with "-", added emerald with "+", context gray), each hunk with Accept / Reject buttons that collapse it into a "Accepted"/"Rejected" pill; an "Apply all" button and a summary "+6 −3". Dark editor styling in both themes.
 */
'use client';
import { Check, X } from 'lucide-react';
import { useState } from 'react';

const hunks = [
  { title: 'Use optional chaining', lines: [[' ', 'function getCity(user) {'], ['-', '  return user && user.address && user.address.city;'], ['+', '  return user?.address?.city ?? null;'], [' ', '}']] },
  { title: 'Memoize the expensive filter', lines: [['-', 'const visible = items.filter(isVisible);'], ['+', 'const visible = useMemo('], ['+', '  () => items.filter(isVisible),'], ['+', '  [items],'], ['+', ');']] },
] as const;

export function DiffSuggestionCard() {
  const [state, setState] = useState<Record<number, 'accepted' | 'rejected'>>({});

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-zinc-950 text-zinc-200 ring-1 ring-white/10">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5 text-xs">
        <span className="font-mono text-zinc-300">src/profile.tsx</span>
        <span className="text-emerald-400">+6</span><span className="text-rose-400">−3</span>
        <button type="button" onClick={() => setState({ 0: 'accepted', 1: 'accepted' })} className="ml-auto rounded-md bg-emerald-500 px-2.5 py-1 font-semibold text-emerald-950">Apply all</button>
      </div>
      {hunks.map((hunk, index) => (
        <section key={hunk.title} className="border-b border-white/5 last:border-0">
          <div className="flex items-center gap-2 px-4 py-2 text-xs text-zinc-400">
            <span className="flex-1">{hunk.title}</span>
            {state[index] ? <span className={`rounded-full px-2 py-0.5 font-semibold ${state[index] === 'accepted' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-zinc-700 text-zinc-300'}`}>{state[index] === 'accepted' ? 'Accepted' : 'Rejected'}</span> : (
              <>
                <button type="button" aria-label={`Accept: ${hunk.title}`} onClick={() => setState((value) => ({ ...value, [index]: 'accepted' }))} className="grid size-6 place-items-center rounded bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25"><Check aria-hidden className="size-3.5" /></button>
                <button type="button" aria-label={`Reject: ${hunk.title}`} onClick={() => setState((value) => ({ ...value, [index]: 'rejected' }))} className="grid size-6 place-items-center rounded bg-rose-500/15 text-rose-300 hover:bg-rose-500/25"><X aria-hidden className="size-3.5" /></button>
              </>
            )}
          </div>
          {!state[index] && <pre className="overflow-x-auto pb-3 font-mono text-xs leading-5">{hunk.lines.map(([mark, text], line) => <span key={line} className={`block px-4 ${mark === '-' ? 'bg-rose-500/10 text-rose-200' : mark === '+' ? 'bg-emerald-500/10 text-emerald-200' : 'text-zinc-400'}`}><span aria-hidden className="mr-3 select-none opacity-70">{mark}</span>{text}</span>)}</pre>}
        </section>
      ))}
    </div>
  );
}
