/**
 * @registry
 * name: AI Assistant Sidebar
 * category: Sidebar
 * style: Glass
 * tags: featured, recent
 * description: Panneau latéral d'assistant IA contextuel : actions rapides sur la sélection, conversation, insertion du résultat dans le document et repli.
 * prompt: Create a contextual AI assistant sidebar next to a document: a glass panel with a header (assistant name, model pill, collapse button with aria-expanded), quick action chips that act on the current selection (Summarize, Improve writing, Translate to French, Make shorter), a short chat history, and an input; running an action streams a fake answer word by word, then shows "Insert below" and "Replace selection" buttons that update the document; collapsing turns the panel into a slim rail with a sparkle button; stacks below the document on mobile. Light and dark mode.
 */
'use client';
import { ArrowUp, PanelRightClose, PanelRightOpen, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

const results: Record<string, string> = {
  Summarize: 'Aurora launches Nov 18 with design partners, priced from $24 per seat.',
  'Improve writing': 'We’ll launch Aurora on November 18 with a small group of design partners.',
  'Translate to French': 'Nous lancerons Aurora le 18 novembre avec nos partenaires design.',
  'Make shorter': 'Aurora launches Nov 18.',
};

export function AiAssistantSidebar() {
  const [open, setOpen] = useState(true);
  const [doc, setDoc] = useState(['We plan to launch Aurora on November 18, starting with a handful of design partners who helped shape it.', 'Pricing will start at $24 per seat for teams.']);
  const [action, setAction] = useState<string | null>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!action) return;
    const words = results[action].split(' ');
    setShown(0);
    const timer = window.setInterval(() => setShown((value) => { if (value >= words.length) { window.clearInterval(timer); return value; } return value + 1; }), 60);
    return () => window.clearInterval(timer);
  }, [action]);

  const answer = action ? results[action].split(' ').slice(0, shown).join(' ') : '';
  const done = action ? shown >= results[action].split(' ').length : false;

  return (
    <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#ede9fe,#e0f2fe,#fce7f3)] p-2 md:flex-row dark:bg-[linear-gradient(135deg,#2e1065,#082f49,#500724)]">
      <article className="flex-1 rounded-2xl bg-white p-6 dark:bg-zinc-950">
        <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">Launch plan</h3>
        <p className="mt-3 rounded bg-violet-100/70 text-zinc-800 dark:bg-violet-500/20 dark:text-zinc-200">{doc[0]}</p>
        {doc.slice(1).map((paragraph, index) => <p key={index} className="mt-3 text-zinc-800 dark:text-zinc-200">{paragraph}</p>)}
        <p className="mt-4 text-xs text-zinc-500">The highlighted paragraph is the current selection.</p>
      </article>
      {open ? (
        <aside aria-label="AI assistant" className="mt-2 flex w-full shrink-0 flex-col rounded-2xl border border-white/60 bg-white/60 p-4 backdrop-blur-xl md:ml-2 md:mt-0 md:w-80 dark:border-white/10 dark:bg-zinc-950/60">
          <div className="flex items-center gap-2"><span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-sky-500 text-white"><Sparkles aria-hidden className="size-4" /></span><p className="flex-1 text-sm font-semibold text-zinc-950 dark:text-white">Assistant</p><span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-white/10 dark:text-zinc-300">Fast</span><button type="button" aria-label="Collapse assistant" aria-expanded={open} onClick={() => setOpen(false)} className="grid size-7 place-items-center rounded-md text-zinc-500 hover:bg-white dark:hover:bg-white/10"><PanelRightClose aria-hidden className="size-4" /></button></div>
          <div className="mt-3 flex flex-wrap gap-1.5">{Object.keys(results).map((label) => <button key={label} type="button" aria-pressed={action === label} onClick={() => setAction(label)} className={`rounded-full px-2.5 py-1 text-xs ${action === label ? 'bg-violet-600 text-white' : 'bg-white/80 text-zinc-700 hover:bg-white dark:bg-white/10 dark:text-zinc-300'}`}>{label}</button>)}</div>
          <div aria-live="polite" className="mt-4 min-h-[7rem] flex-1 text-sm">
            {action ? <><p className="ml-auto w-fit rounded-2xl rounded-br-md bg-violet-600 px-3 py-1.5 text-xs text-white">{action} the selection</p><p className="mt-2 rounded-2xl rounded-bl-md bg-white px-3 py-2 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">{answer}{!done && <span aria-hidden className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-violet-500 motion-safe:animate-pulse" />}</p>{done && <div className="mt-2 flex gap-1.5"><button type="button" onClick={() => setDoc([doc[0], results[action], ...doc.slice(1)])} className="rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-zinc-800 shadow-sm dark:bg-zinc-800 dark:text-zinc-200">Insert below</button><button type="button" onClick={() => setDoc([results[action], ...doc.slice(1)])} className="rounded-lg bg-zinc-950 px-2.5 py-1 text-xs font-semibold text-white dark:bg-white dark:text-zinc-950">Replace selection</button></div>}</> : <p className="text-zinc-500">Pick an action to run it on the highlighted paragraph.</p>}
          </div>
          <form onSubmit={(event) => event.preventDefault()} className="mt-3 flex items-center gap-2 rounded-xl bg-white/90 p-1.5 pl-3 dark:bg-zinc-900"><input aria-label="Ask the assistant" placeholder="Ask about this doc…" className="min-w-0 flex-1 bg-transparent text-sm text-zinc-900 outline-none dark:text-zinc-100" /><button type="submit" aria-label="Send" className="grid size-7 place-items-center rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"><ArrowUp aria-hidden className="size-4" /></button></form>
        </aside>
      ) : (
        <aside aria-label="AI assistant (collapsed)" className="mt-2 flex shrink-0 justify-center rounded-2xl border border-white/60 bg-white/60 p-2 backdrop-blur-xl md:ml-2 md:mt-0 dark:border-white/10 dark:bg-zinc-950/60"><button type="button" aria-label="Open assistant" aria-expanded={open} onClick={() => setOpen(true)} className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-sky-500 text-white"><PanelRightOpen aria-hidden className="size-4" /></button></aside>
      )}
    </div>
  );
}
