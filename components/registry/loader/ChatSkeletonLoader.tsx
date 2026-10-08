/**
 * @registry
 * name: Chat Skeleton Loader
 * category: Loader
 * style: SaaS
 * tags: recent
 * description: Squelette de conversation : bulles grises alternées qui pulsent, puis remplacées par les vrais messages.
 * prompt: Create a chat loading skeleton: alternating left/right bubble placeholders of varied widths with avatar circles, pulsing; after 1.8s they are replaced by real messages that fade in (aria-busy toggles off, aria-live announces "Conversation loaded"); a Reload button replays the skeleton. Pulse disabled with reduced motion. Light and dark mode.
 */
'use client';
import { useEffect, useState } from 'react';

const messages = [['them', 'Did the new build pass QA?'], ['me', 'Yes — all green, deploying at 4pm.'], ['them', 'Perfect, I’ll tell the client.'], ['me', 'Send them the changelog too 🙏']] as const;

export function ChatSkeletonLoader() {
  const [loading, setLoading] = useState(true);
  const [run, setRun] = useState(0);

  useEffect(() => { setLoading(true); const timer = window.setTimeout(() => setLoading(false), 1800); return () => window.clearTimeout(timer); }, [run]);

  return (
    <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-3 flex items-center justify-between"><p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">#launch</p><button type="button" onClick={() => setRun((value) => value + 1)} className="text-xs text-zinc-500 underline">Reload</button></div>
      <ul aria-busy={loading} className="space-y-3">
        {messages.map(([from, text], index) => (
          <li key={index} className={`flex items-end gap-2 ${from === 'me' ? 'flex-row-reverse' : ''}`}>
            {from === 'them' && <span aria-hidden className={`size-7 shrink-0 rounded-full ${loading ? 'bg-zinc-200 motion-safe:animate-pulse dark:bg-zinc-800' : 'bg-gradient-to-br from-sky-400 to-indigo-500'}`} />}
            {loading ? <span aria-hidden className="h-9 rounded-2xl bg-zinc-200 motion-safe:animate-pulse dark:bg-zinc-800" style={{ width: `${[62, 48, 70, 55][index]}%`, animationDelay: `${index * 0.15}s` }} /> : <span className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm motion-safe:animate-[pui-msg-in_.3s_ease-out] ${from === 'me' ? 'rounded-br-sm bg-teal-600 text-white' : 'rounded-bl-sm bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'}`} style={{ animationDelay: `${index * 0.06}s`, animationFillMode: 'both' }}>{text}</span>}
          </li>
        ))}
      </ul>
      <p aria-live="polite" className="sr-only">{loading ? '' : 'Conversation loaded'}</p>
      <style>{`@keyframes pui-msg-in{from{opacity:0;transform:translateY(4px)}}`}</style>
    </div>
  );
}
