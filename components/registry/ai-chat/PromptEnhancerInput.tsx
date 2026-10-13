/**
 * @registry
 * name: Prompt Enhancer Input
 * category: AI Chat
 * style: Gradient
 * tags: recent
 * description: Champ de prompt avec bouton baguette magique qui réécrit le prompt en version détaillée, aperçu avant/après et annulation.
 * prompt: Create a prompt input with an "Enhance" magic-wand button: the user types a short prompt; clicking Enhance shows a shimmer over the textarea for a moment, then replaces the text with a richer, structured prompt (deterministic template using the original text) and shows a small bar "Enhanced · Undo" with a diff-like before/after toggle; the send button stays available; character count; disabled Enhance when empty; aria-live status. Light and dark mode.
 */
'use client';
import { ArrowUp, Undo2, WandSparkles } from 'lucide-react';
import { useId, useState } from 'react';

const enhance = (text: string) => `Act as a senior product designer. ${text.trim().replace(/\.$/, '')}.\n\nRequirements:\n- Audience: early-stage SaaS founders\n- Tone: confident, friendly, concise\n- Output: 3 variations with a one-line rationale each\n- Avoid jargon and exclamation marks`;

export function PromptEnhancerInput() {
  const uid = useId();
  const [text, setText] = useState('write a hero headline for our analytics app');
  const [previous, setPrevious] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [showBefore, setShowBefore] = useState(false);

  function run() {
    if (!text.trim()) return;
    setBusy(true);
    window.setTimeout(() => { setPrevious(text); setText(enhance(text)); setBusy(false); setShowBefore(false); }, 900);
  }

  return (
    <div className="w-full max-w-lg rounded-3xl bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-amber-400/20 p-px">
      <div className="rounded-3xl bg-white p-3 dark:bg-zinc-950">
        <style>{`@keyframes pui-enhance-shimmer { to { background-position: -200% 0 } }`}</style>
        <div className="relative">
          <label htmlFor={`${uid}-prompt`} className="sr-only">Prompt</label>
          <textarea id={`${uid}-prompt`} rows={6} value={showBefore && previous ? previous : text} readOnly={showBefore} onChange={(event) => { setText(event.target.value); setPrevious(null); }} className="w-full resize-none bg-transparent px-2 py-1 text-sm leading-relaxed text-zinc-900 outline-none dark:text-zinc-100" />
          {busy && <span aria-hidden className="pointer-events-none absolute inset-0 rounded-xl bg-[linear-gradient(110deg,transparent_30%,rgba(168,85,247,0.18)_50%,transparent_70%)] bg-[length:200%_100%] motion-safe:animate-[pui-enhance-shimmer_1s_linear_infinite]" />}
        </div>
        {previous && !busy && (
          <div className="mx-1 mb-2 flex items-center gap-2 rounded-xl bg-violet-50 px-3 py-1.5 text-xs text-violet-900 dark:bg-violet-500/10 dark:text-violet-200">
            <WandSparkles aria-hidden className="size-3.5" />Enhanced
            <button type="button" aria-pressed={showBefore} onClick={() => setShowBefore(!showBefore)} className="ml-auto underline">{showBefore ? 'Show after' : 'Show before'}</button>
            <button type="button" onClick={() => { setText(previous); setPrevious(null); setShowBefore(false); }} className="flex items-center gap-1 font-semibold"><Undo2 aria-hidden className="size-3.5" />Undo</button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <button type="button" onClick={run} disabled={!text.trim() || busy || Boolean(previous)} className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-40"><WandSparkles aria-hidden className="size-3.5" />{busy ? 'Enhancing…' : 'Enhance'}</button>
          <span className="text-[11px] tabular-nums text-zinc-400">{text.length} chars</span>
          <button type="button" aria-label="Send" disabled={!text.trim()} className="ml-auto grid size-9 place-items-center rounded-full bg-zinc-950 text-white disabled:opacity-30 dark:bg-white dark:text-zinc-950"><ArrowUp aria-hidden className="size-4" /></button>
        </div>
        <p aria-live="polite" className="sr-only">{busy ? 'Enhancing prompt' : previous ? 'Prompt enhanced. Undo available.' : ''}</p>
      </div>
    </div>
  );
}
