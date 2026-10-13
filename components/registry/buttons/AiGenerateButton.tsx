/**
 * @registry
 * name: AI Generate Button
 * category: Buttons
 * style: Gradient
 * tags: featured, recent
 * description: Bouton « Générer » IA avec bordure dégradée animée, étincelles qui pétillent au survol et état de génération à progression.
 * prompt: Create an AI "Generate" button: a dark pill with an animated conic-gradient border (rotating via @property angle), a sparkles icon whose three small stars twinkle on hover, and the label "Generate with AI"; clicking enters a generating state with a shimmering label "Generating…" and a thin progress line, then a done state "Regenerate" with a ↺ icon; aria-busy while generating, aria-live status; reduced motion stops the border spin. Light and dark mode.
 */
'use client';
import { RotateCcw, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export function AiGenerateButton() {
  const [state, setState] = useState<'idle' | 'busy' | 'done'>('idle');

  useEffect(() => {
    if (state !== 'busy') return;
    const timer = window.setTimeout(() => setState('done'), 1800);
    return () => window.clearTimeout(timer);
  }, [state]);

  return (
    <div className="flex flex-col items-center gap-3 p-8">
      <style>{`
        @property --pui-ai-angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
        @keyframes pui-ai-spin { to { --pui-ai-angle: 360deg } }
        @keyframes pui-ai-shimmer { to { background-position: -200% 0 } }
        @keyframes pui-ai-progress { from { transform: scaleX(0) } to { transform: scaleX(1) } }
        .pui-ai-border { background: conic-gradient(from var(--pui-ai-angle), #6366f1, #ec4899, #f59e0b, #22d3ee, #6366f1); }
        @media (prefers-reduced-motion: no-preference) { .pui-ai-border { animation: pui-ai-spin 3s linear infinite } }
      `}</style>
      <button type="button" aria-busy={state === 'busy'} onClick={() => state !== 'busy' && setState('busy')} className="pui-ai-border group relative rounded-full p-[2px] shadow-lg shadow-fuchsia-500/20 transition active:scale-[0.97]">
        <span className="relative flex h-11 items-center gap-2 overflow-hidden rounded-full bg-zinc-950 px-5 text-sm font-semibold text-white">
          {state === 'done' ? <RotateCcw aria-hidden className="size-4" /> : <Sparkles aria-hidden className="size-4 text-fuchsia-300 transition-transform group-hover:rotate-12 group-hover:scale-110" />}
          {state === 'busy' ? <span className="bg-[linear-gradient(90deg,#a1a1aa_0%,#fff_50%,#a1a1aa_100%)] bg-[length:200%_100%] bg-clip-text text-transparent motion-safe:animate-[pui-ai-shimmer_1.2s_linear_infinite]">Generating…</span> : state === 'done' ? 'Regenerate' : 'Generate with AI'}
          {state === 'busy' && <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-indigo-400 to-pink-400 motion-safe:animate-[pui-ai-progress_1.8s_ease-out_forwards]" />}
        </span>
      </button>
      <p aria-live="polite" className="h-4 text-xs text-zinc-500">{state === 'busy' ? 'Writing 3 headline ideas…' : state === 'done' ? '3 ideas ready' : ''}</p>
    </div>
  );
}
