/**
 * @registry
 * name: Tone Rewrite Box
 * category: AI Chat
 * style: Minimal
 * tags: recent
 * description: Zone de texte avec réécriture IA par ton (pro, amical, concis) : la version proposée s'écrit puis peut remplacer l'original.
 * prompt: Create an AI rewrite box: a textarea with the user's draft, tone chips (Professional, Friendly, Concise, Confident) as a radiogroup and a Rewrite button; the suggestion streams in word by word below with a shimmer while generating, then offers Replace / Copy / Try again; reduced motion shows it instantly. Light and dark mode.
 */
'use client';
import { Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const rewrites: Record<string, string> = {
  Professional: 'Thank you for your patience. The update is now live, and the issue you reported has been resolved. Please let us know if anything else comes up.',
  Friendly: 'Good news! 🎉 The fix is live, so you should be all set now. Shout if anything else looks off!',
  Concise: 'Fixed and live. Let us know if you see anything else.',
  Confident: 'The fix is live and the issue is resolved. You can rely on it from today.',
};

export function ToneRewriteBox() {
  const [draft, setDraft] = useState('hey so the bug thing is fixed now i think, it should work, tell us if not');
  const [tone, setTone] = useState('Professional');
  const [output, setOutput] = useState('');
  const [busy, setBusy] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearInterval(timer.current), []);

  function rewrite() {
    window.clearInterval(timer.current);
    const words = rewrites[tone].split(' ');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setOutput(rewrites[tone]); return; }
    setBusy(true); setOutput('');
    let index = 0;
    timer.current = window.setInterval(() => { index += 1; setOutput(words.slice(0, index).join(' ')); if (index >= words.length) { window.clearInterval(timer.current); setBusy(false); } }, 60);
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <textarea aria-label="Your draft" rows={3} value={draft} onChange={(event) => setDraft(event.target.value)} className="w-full resize-none rounded-xl bg-zinc-50 p-3 text-sm text-zinc-800 outline-none focus:ring-2 focus:ring-teal-500/30 dark:bg-zinc-900 dark:text-zinc-200" />
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <div role="radiogroup" aria-label="Tone" className="flex flex-wrap gap-1.5">{Object.keys(rewrites).map((name) => <button key={name} type="button" role="radio" aria-checked={tone === name} onClick={() => setTone(name)} className={`rounded-full px-2.5 py-1 text-xs font-medium ${tone === name ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'border border-zinc-300 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300'}`}>{name}</button>)}</div>
        <button type="button" onClick={rewrite} disabled={busy} className="ml-auto inline-flex items-center gap-1 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"><Sparkles aria-hidden className="size-3.5" />Rewrite</button>
      </div>
      {(output || busy) && (
        <div className="mt-3 rounded-xl border border-teal-200 bg-teal-50/60 p-3 dark:border-teal-500/30 dark:bg-teal-400/5">
          <p aria-live="polite" className="text-sm text-zinc-800 dark:text-zinc-200">{output}{busy && <span aria-hidden className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-teal-500" />}</p>
          {!busy && <div className="mt-2 flex gap-3 text-xs font-medium"><button type="button" onClick={() => { setDraft(output); setOutput(''); }} className="text-teal-700 hover:underline dark:text-teal-400">Replace</button><button type="button" onClick={() => navigator.clipboard?.writeText(output).catch(() => {})} className="text-zinc-600 hover:underline dark:text-zinc-400">Copy</button><button type="button" onClick={rewrite} className="text-zinc-600 hover:underline dark:text-zinc-400">Try again</button></div>}
        </div>
      )}
    </div>
  );
}
