/**
 * @registry
 * name: Morphing Submit Button
 * category: Buttons
 * style: Gradient
 * tags: featured, recent
 * description: Bouton d'envoi qui se rétracte en cercle de chargement puis se transforme en coche verte (ou croix rouge en cas d'erreur) avant de revenir.
 * prompt: Create a morphing submit button: a wide gradient pill "Send message"; on click it shrinks into a circle with a spinning arc, then morphs into a green circle with a drawn check (stroke-dashoffset animation) or, when the "Simulate error" switch is on, a red circle with a shaking ×; after 1.8s it expands back to the label; aria-busy while loading and an aria-live status; width animates via CSS transitions; reduced motion removes the spin and shake. Light and dark mode.
 */
'use client';
import { useEffect, useState } from 'react';

export function MorphingSubmitButton() {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [fail, setFail] = useState(false);

  useEffect(() => {
    if (state === 'loading') { const timer = window.setTimeout(() => setState(fail ? 'error' : 'success'), 1400); return () => window.clearTimeout(timer); }
    if (state === 'success' || state === 'error') { const timer = window.setTimeout(() => setState('idle'), 1800); return () => window.clearTimeout(timer); }
  }, [state, fail]);

  const round = state !== 'idle';
  const tone = state === 'success' ? 'bg-emerald-500' : state === 'error' ? 'bg-rose-500' : 'bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500';

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <style>{`
        @keyframes pui-morph-draw { from { stroke-dashoffset: 24 } to { stroke-dashoffset: 0 } }
        @keyframes pui-morph-shake { 20%, 60% { transform: translateX(-4px) } 40%, 80% { transform: translateX(4px) } }
      `}</style>
      <button type="button" aria-busy={state === 'loading'} aria-disabled={round} aria-label={round ? (state === 'loading' ? 'Sending' : state === 'success' ? 'Sent' : 'Failed to send') : undefined} onClick={() => { if (!round) setState('loading'); }} className={`relative grid h-12 place-items-center overflow-hidden rounded-full text-sm font-semibold text-white shadow-lg transition-all duration-500 ease-[cubic-bezier(.4,1.4,.5,1)] motion-reduce:duration-0 ${round ? 'w-12' : 'w-48'} ${tone} ${state === 'error' ? 'motion-safe:animate-[pui-morph-shake_.4s]' : ''}`}>
        {state === 'idle' && <span className="whitespace-nowrap">Send message</span>}
        {state === 'loading' && <span aria-hidden className="size-5 rounded-full border-2 border-white/30 border-t-white motion-safe:animate-spin" />}
        {state === 'success' && <svg aria-hidden viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" strokeDasharray="24" className="motion-safe:animate-[pui-morph-draw_.4s_ease-out_both]" /></svg>}
        {state === 'error' && <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>}
      </button>
      <p aria-live="polite" className="h-4 text-xs text-zinc-500">{state === 'loading' ? 'Sending…' : state === 'success' ? 'Message sent' : state === 'error' ? 'Could not send. Try again.' : ''}</p>
      <label className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400"><input type="checkbox" role="switch" checked={fail} onChange={(event) => setFail(event.target.checked)} className="accent-rose-500" />Simulate error</label>
    </div>
  );
}
