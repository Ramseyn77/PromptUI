/**
 * @registry
 * name: Two Step Delete Button
 * category: Buttons
 * style: Minimal
 * tags: recent
 * description: Bouton de suppression en deux temps : le premier clic l'élargit en « Confirmer ? » rouge avec compte à rebours, le second supprime.
 * prompt: Create a two-step delete button: at rest a subtle trash icon button "Delete"; first click morphs it (width transition) into a red "Click again to delete" state with a shrinking countdown bar that reverts after 3 seconds or on blur/Escape; second click shows a short spinner then a "Deleted" state with an Undo link; aria-live announces each state; works with keyboard. Light and dark mode.
 */
'use client';
import { Loader2, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export function TwoStepDeleteButton() {
  const [state, setState] = useState<'idle' | 'confirm' | 'deleting' | 'deleted'>('idle');

  useEffect(() => {
    if (state === 'confirm') { const timer = window.setTimeout(() => setState('idle'), 3000); return () => window.clearTimeout(timer); }
    if (state === 'deleting') { const timer = window.setTimeout(() => setState('deleted'), 700); return () => window.clearTimeout(timer); }
  }, [state]);

  return (
    <div className="flex flex-col items-center gap-3 p-6">
      <style>{`@keyframes pui-delete-timer { from { transform: scaleX(1) } to { transform: scaleX(0) } }`}</style>
      {state === 'deleted' ? (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Project deleted · <button type="button" onClick={() => setState('idle')} className="font-semibold text-zinc-950 underline dark:text-white">Undo</button></p>
      ) : (
        <button
          type="button"
          onClick={() => setState(state === 'idle' ? 'confirm' : state === 'confirm' ? 'deleting' : state)}
          onBlur={() => { if (state === 'confirm') setState('idle'); }}
          onKeyDown={(event) => { if (event.key === 'Escape' && state === 'confirm') setState('idle'); }}
          disabled={state === 'deleting'}
          className={`relative flex h-10 items-center justify-center gap-2 overflow-hidden rounded-xl px-4 text-sm font-semibold transition-all duration-300 ${state === 'idle' ? 'w-28 border border-zinc-200 text-zinc-700 hover:border-rose-300 hover:text-rose-600 dark:border-zinc-700 dark:text-zinc-300' : 'w-56 bg-rose-600 text-white'}`}
        >
          {state === 'deleting' ? <Loader2 aria-hidden className="size-4 motion-safe:animate-spin" /> : <Trash2 aria-hidden className="size-4" />}
          <span className="whitespace-nowrap">{state === 'idle' ? 'Delete' : state === 'confirm' ? 'Click again to delete' : 'Deleting…'}</span>
          {state === 'confirm' && <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 origin-left bg-white/50 motion-safe:animate-[pui-delete-timer_3s_linear_forwards]" />}
        </button>
      )}
      <p aria-live="polite" className="sr-only">{state === 'confirm' ? 'Press again within 3 seconds to confirm deletion' : state === 'deleted' ? 'Project deleted' : ''}</p>
    </div>
  );
}
