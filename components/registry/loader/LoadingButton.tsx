/**
 * @registry
 * name: Loading Button
 * category: Loader
 * style: SaaS
 * tags: featured, recent
 * description: Bouton qui passe par les états inactif, chargement avec spinner puis succès avant de revenir.
 * prompt: Create a submit button with states: idle "Save changes" → loading (spinner, "Saving…", disabled, aria-busy, width stays stable) → success (green, check, "Saved") → back to idle after 1.5s. Status announced via aria-live. Light and dark mode.
 */
'use client';
import { Check, Loader2 } from 'lucide-react';
import { useState } from 'react';

export function LoadingButton() {
  const [state, setState] = useState<'idle' | 'loading' | 'success'>('idle');

  function save() {
    setState('loading');
    window.setTimeout(() => setState('success'), 1400);
    window.setTimeout(() => setState('idle'), 2900);
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={save}
        disabled={state !== 'idle'}
        aria-busy={state === 'loading'}
        className={`inline-flex h-11 min-w-40 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold text-white transition-colors disabled:cursor-default ${state === 'success' ? 'bg-emerald-600' : 'bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200'} ${state === 'success' ? 'dark:bg-emerald-500 dark:text-white' : ''}`}
      >
        {state === 'loading' && <Loader2 aria-hidden className="size-4 motion-safe:animate-spin" />}
        {state === 'success' && <Check aria-hidden className="size-4" />}
        {state === 'idle' ? 'Save changes' : state === 'loading' ? 'Saving…' : 'Saved'}
      </button>
      <p aria-live="polite" className="sr-only">{state === 'loading' ? 'Saving' : state === 'success' ? 'Changes saved' : ''}</p>
    </div>
  );
}
