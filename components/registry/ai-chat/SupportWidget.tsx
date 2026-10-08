/**
 * @registry
 * name: Support Widget
 * category: AI Chat
 * style: SaaS
 * tags: recent
 * description: Widget de support flottant avec bulle d'ouverture, équipe en ligne et réponses rapides.
 * prompt: Create a floating support chat widget: a round launcher button (aria-expanded) that toggles a panel with gradient header, team avatars and "Typically replies in 2 min", a bot greeting and quick-reply chips. Panel opens with a scale/fade transition from the corner; defaultOpen prop. Light and dark mode.
 */
'use client';
import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

export function SupportWidget({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="flex w-full max-w-xs flex-col items-end gap-3">
      <section aria-label="Support chat" aria-hidden={!open} className={`w-full origin-bottom-right overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl transition duration-300 dark:border-zinc-800 dark:bg-zinc-950 ${open ? 'scale-100 opacity-100' : 'pointer-events-none scale-90 opacity-0'}`}>
        <header className="bg-gradient-to-br from-teal-500 to-sky-600 p-4 text-white">
          <div className="flex -space-x-2">{['#fcd34d', '#f9a8d4', '#a5b4fc'].map((color) => <span key={color} className="size-8 rounded-full border-2 border-white/80" style={{ background: color }} />)}</div>
          <p className="mt-3 font-semibold">Hi there 👋</p>
          <p className="text-sm text-white/85">Typically replies in 2 min</p>
        </header>
        <div className="space-y-3 p-4">
          <p className="w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-zinc-100 px-3 py-2 text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">How can we help you today?</p>
          <div className="flex flex-wrap gap-2">
            {['Pricing question', 'Report a bug', 'Talk to sales'].map((chip) => <button key={chip} type="button" tabIndex={open ? 0 : -1} className="rounded-full border border-teal-500/40 px-3 py-1 text-xs font-medium text-teal-700 hover:bg-teal-500/10 dark:text-teal-300">{chip}</button>)}
          </div>
        </div>
      </section>
      <button type="button" aria-label={open ? 'Close support chat' : 'Open support chat'} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="grid size-14 place-items-center rounded-full bg-teal-600 text-white shadow-lg shadow-teal-600/30 transition hover:scale-105 active:scale-95">
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>
    </div>
  );
}
