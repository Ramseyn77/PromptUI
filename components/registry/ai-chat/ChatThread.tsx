/**
 * @registry
 * name: Chat Thread
 * category: AI Chat
 * style: SaaS
 * tags: featured, recent
 * description: Fil de conversation avec bulles utilisateur et assistant, horodatage et envoi qui simule une reponse.
 * prompt: Create a chat thread card: header with assistant name and online dot, a scrollable message list (role="log", aria-live polite) with right-aligned user bubbles and left assistant bubbles, and a composer; sending appends the message and a delayed canned reply. Light and dark mode.
 */
'use client';
import { SendHorizontal } from 'lucide-react';
import { useRef, useState, type FormEvent } from 'react';

type Message = { from: 'user' | 'bot'; text: string };

export function ChatThread() {
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: 'Hi! I can draft UI copy, components or tests. What are we building?' },
    { from: 'user', text: 'A pricing section with three plans.' },
    { from: 'bot', text: 'Great. Should the middle plan be highlighted as the recommended one?' },
  ]);
  const [draft, setDraft] = useState('');
  const listRef = useRef<HTMLDivElement>(null);

  function scrollDown() {
    requestAnimationFrame(() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' }));
  }

  function send(event: FormEvent) {
    event.preventDefault();
    if (!draft.trim()) return;
    setMessages((current) => [...current, { from: 'user', text: draft.trim() }]);
    setDraft('');
    scrollDown();
    window.setTimeout(() => { setMessages((current) => [...current, { from: 'bot', text: 'On it. Here is a first draft in a moment.' }]); scrollDown(); }, 700);
  }

  return (
    <section className="flex w-full max-w-md flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <header className="flex items-center gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <span className="relative size-8 rounded-full bg-gradient-to-br from-teal-400 to-sky-500"><span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-950" /></span>
        <div><p className="text-sm font-semibold text-zinc-900 dark:text-white">Nova</p><p className="text-xs text-emerald-600 dark:text-emerald-400">Online</p></div>
      </header>
      <div ref={listRef} role="log" aria-live="polite" className="flex h-64 flex-col gap-2 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <p key={index} className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-6 ${message.from === 'user' ? 'self-end rounded-br-md bg-teal-600 text-white' : 'self-start rounded-bl-md bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100'}`}>{message.text}</p>
        ))}
      </div>
      <form onSubmit={send} className="flex items-center gap-2 border-t border-zinc-200 p-3 dark:border-zinc-800">
        <label htmlFor="thread-input" className="sr-only">Message</label>
        <input id="thread-input" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Type a message" className="h-10 flex-1 rounded-full bg-zinc-100 px-4 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-teal-500/40 dark:bg-zinc-900 dark:text-white" />
        <button type="submit" aria-label="Send" className="grid size-10 place-items-center rounded-full bg-teal-600 text-white transition hover:bg-teal-700"><SendHorizontal className="size-4" /></button>
      </form>
    </section>
  );
}
