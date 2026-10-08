/**
 * @registry
 * name: Prompt Input Bar
 * category: AI Chat
 * style: SaaS
 * tags: featured, recent
 * description: Zone de saisie IA auto-redimensionnable avec pièce jointe, choix du modèle et envoi.
 * prompt: Create an AI prompt composer: auto-growing textarea (max 6 lines), attach button, model pill, character hint, and a send button enabled only when there is text; Enter sends, Shift+Enter adds a line, and the sent prompt appears above. Light and dark mode.
 */
'use client';
import { ArrowUp, Paperclip, Sparkles } from 'lucide-react';
import { useRef, useState, type KeyboardEvent } from 'react';

export function PromptInputBar() {
  const [value, setValue] = useState('');
  const [sent, setSent] = useState<string | null>(null);
  const ref = useRef<HTMLTextAreaElement>(null);

  function resize() {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 144)}px`;
  }

  function send() {
    if (!value.trim()) return;
    setSent(value.trim());
    setValue('');
    requestAnimationFrame(resize);
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); send(); }
  }

  return (
    <div className="w-full max-w-xl space-y-3">
      {sent && <p className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-zinc-900 px-4 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900">{sent}</p>}
      <div className="rounded-3xl border border-zinc-200 bg-white p-3 shadow-lg shadow-zinc-950/5 focus-within:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:focus-within:border-zinc-600">
        <label htmlFor="prompt-input" className="sr-only">Message</label>
        <textarea
          id="prompt-input"
          ref={ref}
          rows={1}
          value={value}
          onChange={(event) => { setValue(event.target.value); resize(); }}
          onKeyDown={onKeyDown}
          placeholder="Ask anything, or describe a component…"
          className="max-h-36 w-full resize-none bg-transparent px-2 py-1.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white"
        />
        <div className="mt-2 flex items-center gap-2">
          <button type="button" aria-label="Attach file" className="grid size-8 place-items-center rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"><Paperclip className="size-4" /></button>
          <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"><Sparkles aria-hidden className="size-3.5 text-violet-500" /> Sonnet</span>
          <span className="ml-auto hidden text-[11px] text-zinc-400 sm:block">Shift + Enter for a new line</span>
          <button type="button" aria-label="Send" disabled={!value.trim()} onClick={send} className="grid size-9 place-items-center rounded-full bg-zinc-950 text-white transition enabled:hover:bg-zinc-800 disabled:opacity-30 dark:bg-white dark:text-zinc-950">
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
