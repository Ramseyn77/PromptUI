/**
 * @registry
 * name: Message Actions
 * category: AI Chat
 * style: Minimal
 * tags: recent
 * description: Barre d actions sous une reponse IA : copier, pouce haut ou bas, relancer, avec retour d etat.
 * prompt: Create an assistant message with an action bar: copy (shows check), thumbs up / thumbs down as mutually exclusive toggles (aria-pressed, filled when active), regenerate, and a small "Thanks for the feedback" status after voting. Icon buttons have tooltips via title and aria-labels. Light and dark mode.
 */
'use client';
import { Check, Copy, RotateCcw, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

export function MessageActions() {
  const [vote, setVote] = useState<'up' | 'down' | null>(null);
  const [copied, setCopied] = useState(false);
  const button = 'grid size-8 place-items-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white';

  async function copy() {
    await navigator.clipboard.writeText('Use a skeleton that mirrors the final layout.');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="w-full max-w-md">
      <p className="text-sm leading-7 text-zinc-800 dark:text-zinc-200">Use a skeleton that mirrors the final layout, so content does not jump when it loads. Keep the shimmer subtle.</p>
      <div className="mt-2 flex items-center gap-0.5">
        <button type="button" title="Copy" aria-label="Copy answer" onClick={copy} className={button}>{copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}</button>
        <button type="button" title="Good answer" aria-label="Good answer" aria-pressed={vote === 'up'} onClick={() => setVote(vote === 'up' ? null : 'up')} className={`${button} aria-pressed:text-teal-600 dark:aria-pressed:text-teal-400`}><ThumbsUp className={`size-4 ${vote === 'up' ? 'fill-current' : ''}`} /></button>
        <button type="button" title="Bad answer" aria-label="Bad answer" aria-pressed={vote === 'down'} onClick={() => setVote(vote === 'down' ? null : 'down')} className={`${button} aria-pressed:text-rose-600 dark:aria-pressed:text-rose-400`}><ThumbsDown className={`size-4 ${vote === 'down' ? 'fill-current' : ''}`} /></button>
        <button type="button" title="Regenerate" aria-label="Regenerate" className={button}><RotateCcw className="size-4" /></button>
        <span role="status" className="ml-2 text-xs text-zinc-500 dark:text-zinc-400">{vote ? 'Thanks for the feedback!' : ''}</span>
      </div>
    </div>
  );
}
