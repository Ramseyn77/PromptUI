/**
 * @registry
 * name: Prompt Box Hero
 * category: Hero
 * style: Gradient
 * tags: featured, recent
 * description: Hero façon générateur IA : grand champ de prompt central, suggestions cliquables, choix du type de projet et halo dégradé.
 * prompt: Create an AI builder hero inspired by v0/bolt: a big headline "What do you want to build?", a large rounded prompt textarea with a soft gradient halo, an attach button, a project-type select (Website, App, Dashboard) and a send button that is disabled while empty; suggestion chips below fill the textarea when clicked; submitting shows "Generating…" then a success line (aria-live); stacks well on mobile. Light and dark mode.
 */
'use client';
import { ArrowUp, Paperclip } from 'lucide-react';
import { useId, useState, type FormEvent } from 'react';

const suggestions = ['A pricing page for a coffee subscription', 'An admin dashboard for a gym', 'A landing page for a podcast', 'A recipe app with filters'];

export function PromptBoxHero() {
  const uid = useId();
  const [prompt, setPrompt] = useState('');
  const [kind, setKind] = useState('Website');
  const [state, setState] = useState<'idle' | 'busy' | 'done'>('idle');

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!prompt.trim()) return;
    setState('busy');
    window.setTimeout(() => setState('done'), 1200);
  }

  return (
    <section className="relative w-full overflow-hidden bg-white px-5 py-16 text-center dark:bg-zinc-950">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[40rem] max-w-full -translate-x-1/2 -translate-y-1/3 rounded-full bg-gradient-to-r from-sky-400/30 via-violet-500/30 to-pink-400/30 blur-3xl" />
      <div className="relative mx-auto max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-white">What do you want to build?</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">Describe it. Get a working, editable first version in seconds.</p>
        <form onSubmit={submit} className="mt-8 rounded-3xl border border-zinc-200 bg-white/90 p-3 text-left shadow-xl shadow-violet-500/10 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90">
          <label htmlFor={`${uid}-prompt`} className="sr-only">Describe your project</label>
          <textarea id={`${uid}-prompt`} rows={3} value={prompt} onChange={(event) => { setPrompt(event.target.value); setState('idle'); }} placeholder="Ask PromptUI to build…" className="w-full resize-none bg-transparent px-2 py-1 text-base text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100" />
          <div className="flex items-center gap-2">
            <button type="button" aria-label="Attach file" className="grid size-9 place-items-center rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"><Paperclip aria-hidden className="size-4" /></button>
            <label htmlFor={`${uid}-kind`} className="sr-only">Project type</label>
            <select id={`${uid}-kind`} value={kind} onChange={(event) => setKind(event.target.value)} className="rounded-full border border-zinc-200 bg-transparent px-3 py-1.5 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"><option>Website</option><option>App</option><option>Dashboard</option></select>
            <button type="submit" aria-label="Generate" disabled={!prompt.trim() || state === 'busy'} className="ml-auto grid size-9 place-items-center rounded-full bg-zinc-950 text-white transition disabled:opacity-30 dark:bg-white dark:text-zinc-950"><ArrowUp aria-hidden className="size-4" /></button>
          </div>
        </form>
        <p aria-live="polite" className="mt-3 h-5 text-sm text-violet-600 dark:text-violet-400">{state === 'busy' ? `Generating your ${kind.toLowerCase()}…` : state === 'done' ? 'Done — your preview is ready.' : ''}</p>
        <ul className="mt-3 flex flex-wrap justify-center gap-2">
          {suggestions.map((item) => <li key={item}><button type="button" onClick={() => { setPrompt(item); setState('idle'); }} className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">{item}</button></li>)}
        </ul>
      </div>
    </section>
  );
}
