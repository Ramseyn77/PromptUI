/**
 * @registry
 * name: Chat Mode Composer
 * category: AI Chat
 * style: Gradient
 * tags: recent
 * description: Zone de saisie IA avec modes Demander / Éditer / Agent, placeholder adapté et bordure dégradée au focus.
 * prompt: Create an AI composer with a mode switcher (Ask, Edit, Agent) as a segmented radiogroup; each mode changes the placeholder, the accent gradient of the focus border and a small helper line (Agent shows "Can run commands" with a warning dot); textarea auto-grows, Enter sends (Shift+Enter newline) and shows the sent message above. Light and dark mode.
 */
'use client';
import { ArrowUp } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';

const modes = {
  Ask: { placeholder: 'Ask anything about your codebase…', ring: 'from-sky-400 to-teal-400', hint: 'Answers only, no changes.' },
  Edit: { placeholder: 'Describe the change to make…', ring: 'from-violet-500 to-fuchsia-500', hint: 'Proposes a diff you can review.' },
  Agent: { placeholder: 'Give the agent a task…', ring: 'from-amber-400 to-rose-500', hint: 'Can run commands and edit files.' },
} as const;
type Mode = keyof typeof modes;

export function ChatModeComposer() {
  const [mode, setMode] = useState<Mode>('Edit');
  const [text, setText] = useState('');
  const [sent, setSent] = useState<{ mode: Mode; text: string } | null>(null);

  function onKey(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); if (text.trim()) { setSent({ mode, text }); setText(''); } }
  }

  return (
    <div className="w-full max-w-md">
      {sent && <p className="mb-3 ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-zinc-900 px-3.5 py-2 text-sm text-white dark:bg-white dark:text-zinc-900"><span className="mr-1 rounded bg-white/20 px-1 text-[10px] font-semibold uppercase dark:bg-zinc-900/10">{sent.mode}</span>{sent.text}</p>}
      <div className={`rounded-2xl bg-gradient-to-r p-[1.5px] ${modes[mode].ring}`}>
        <div className="rounded-[calc(1rem-1.5px)] bg-white p-2 dark:bg-zinc-950">
          <textarea aria-label="Message" rows={2} value={text} onChange={(event) => { setText(event.target.value); event.target.style.height = 'auto'; event.target.style.height = `${event.target.scrollHeight}px`; }} onKeyDown={onKey} placeholder={modes[mode].placeholder} className="max-h-40 w-full resize-none bg-transparent px-2 py-1 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100" />
          <div className="flex items-center gap-2">
            <div role="radiogroup" aria-label="Mode" className="flex rounded-lg bg-zinc-100 p-0.5 dark:bg-zinc-900">
              {(Object.keys(modes) as Mode[]).map((name) => <button key={name} type="button" role="radio" aria-checked={mode === name} onClick={() => setMode(name)} className={`rounded-md px-2.5 py-1 text-xs font-medium ${mode === name ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-500'}`}>{name}</button>)}
            </div>
            <span className="flex items-center gap-1 text-[11px] text-zinc-500">{mode === 'Agent' && <span className="size-1.5 rounded-full bg-amber-500" />}{modes[mode].hint}</span>
            <button type="button" aria-label="Send" disabled={!text.trim()} onClick={() => { setSent({ mode, text }); setText(''); }} className="ml-auto grid size-8 place-items-center rounded-lg bg-zinc-950 text-white disabled:opacity-30 dark:bg-white dark:text-zinc-950"><ArrowUp aria-hidden className="size-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
