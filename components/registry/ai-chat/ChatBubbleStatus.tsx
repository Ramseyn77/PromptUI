/**
 * @registry
 * name: Chat Bubble Status
 * category: AI Chat
 * style: Minimal
 * tags: recent
 * description: Bulles de discussion façon daisyUI avec avatars, heure, en-tête et statut Envoyé / Distribué / Lu.
 * prompt: Create daisyUI-style chat bubbles: alternating start/end bubbles with avatar, name + time header and a footer status ("Delivered", "Seen at 10:42" with double check icons turning teal when read); the last own message cycles Sending → Delivered → Seen after mount. Bubble tails via rounded corners. Light and dark mode.
 */
'use client';
import { Check, CheckCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ChatBubbleStatus() {
  const [status, setStatus] = useState<'Sending' | 'Delivered' | 'Seen'>('Sending');

  useEffect(() => {
    const a = window.setTimeout(() => setStatus('Delivered'), 900);
    const b = window.setTimeout(() => setStatus('Seen'), 2200);
    return () => { window.clearTimeout(a); window.clearTimeout(b); };
  }, []);

  const start = (name: string, text: string, time: string, tone: string) => (
    <div className="flex items-end gap-2">
      <span aria-hidden className={`size-8 shrink-0 rounded-full bg-gradient-to-br ${tone}`} />
      <div>
        <p className="mb-1 text-xs text-zinc-500">{name} <time className="opacity-70">{time}</time></p>
        <p className="max-w-[16rem] rounded-2xl rounded-bl-sm bg-zinc-100 px-3.5 py-2 text-sm text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">{text}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-sm space-y-4 rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      {start('Obi-Wan', 'You were the chosen one!', '10:38', 'from-amber-300 to-orange-500')}
      <div className="flex flex-col items-end">
        <p className="mb-1 text-xs text-zinc-500">You <time className="opacity-70">10:40</time></p>
        <p className="max-w-[16rem] rounded-2xl rounded-br-sm bg-teal-600 px-3.5 py-2 text-sm text-white">I have the high ground, actually.</p>
        <p className="mt-1 flex items-center gap-1 text-[11px] text-zinc-400"><CheckCheck aria-hidden className="size-3.5 text-teal-500" />Seen</p>
      </div>
      {start('Obi-Wan', 'It’s over, Anakin.', '10:41', 'from-amber-300 to-orange-500')}
      <div className="flex flex-col items-end">
        <p className="max-w-[16rem] rounded-2xl rounded-br-sm bg-teal-600 px-3.5 py-2 text-sm text-white">Fine. Let's ship it on Friday.</p>
        <p aria-live="polite" className="mt-1 flex items-center gap-1 text-[11px] text-zinc-400">
          {status === 'Sending' ? <span className="size-3 animate-spin rounded-full border border-zinc-400 border-t-transparent" /> : status === 'Delivered' ? <Check aria-hidden className="size-3.5" /> : <CheckCheck aria-hidden className="size-3.5 text-teal-500" />}
          {status === 'Seen' ? 'Seen at 10:42' : status}
        </p>
      </div>
    </div>
  );
}
