/**
 * @registry
 * name: Suggested Prompts
 * category: AI Chat
 * style: Gradient
 * tags: recent
 * description: Grille de suggestions de prompts avec icônes, à cliquer pour pré-remplir la saisie.
 * prompt: Create an AI welcome block: greeting, then a 2x2 grid (1 column on mobile) of suggestion cards with icon, title and subtitle; clicking one fills the input below and focuses it. Gradient greeting text, light and dark mode.
 */
'use client';
import { Code2, Lightbulb, PenLine, Table2 } from 'lucide-react';
import { useRef, useState } from 'react';

const prompts = [
  { icon: PenLine, title: 'Write a launch email', text: 'for our new AI feature' },
  { icon: Code2, title: 'Build a React form', text: 'with validation and errors' },
  { icon: Table2, title: 'Summarize this table', text: 'into three key insights' },
  { icon: Lightbulb, title: 'Brainstorm names', text: 'for a calm finance app' },
];

export function SuggestedPrompts() {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full max-w-xl">
      <h2 className="bg-gradient-to-r from-teal-500 via-sky-500 to-violet-500 bg-clip-text text-3xl font-semibold tracking-tight text-transparent">Hello, Camille</h2>
      <p className="mt-1 text-lg text-zinc-500 dark:text-zinc-400">How can I help today?</p>
      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        {prompts.map(({ icon: Icon, title, text }) => (
          <button key={title} type="button" onClick={() => { setValue(`${title} ${text}`); inputRef.current?.focus(); }} className="group flex items-start gap-3 rounded-2xl border border-zinc-200 bg-white p-4 text-left transition hover:border-teal-500/50 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
            <Icon aria-hidden className="mt-0.5 size-5 text-zinc-400 transition group-hover:text-teal-600 dark:group-hover:text-teal-400" />
            <span><span className="block text-sm font-semibold text-zinc-900 dark:text-white">{title}</span><span className="block text-sm text-zinc-500 dark:text-zinc-400">{text}</span></span>
          </button>
        ))}
      </div>
      <label htmlFor="suggested-input" className="sr-only">Prompt</label>
      <input id="suggested-input" ref={inputRef} value={value} onChange={(event) => setValue(event.target.value)} placeholder="Message the assistant…" className="mt-4 h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white" />
    </div>
  );
}
