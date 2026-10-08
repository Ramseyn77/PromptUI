/**
 * @registry
 * name: Chat Screenshot Testimonial
 * category: Testimonials
 * style: Minimal
 * tags: recent
 * description: Témoignage façon capture de messagerie : bulles d'un client enthousiaste qui apparaissent une à une.
 * prompt: Create a chat-screenshot testimonial: a phone-like messaging card (header with avatar, name, "online"), incoming bubbles from a customer appearing one by one with a typing indicator between them (stops at the end, static with reduced motion), a reply bubble from the founder, and a caption "Real message from a customer, shared with permission". Light and dark mode.
 */
'use client';
import { useEffect, useState } from 'react';

const messages = [
  { from: 'them', text: 'ok I have to tell you something' },
  { from: 'them', text: 'we closed our biggest client this morning' },
  { from: 'them', text: 'they said the demo site "felt like a real product" 😭' },
  { from: 'me', text: 'This made our whole week. Congrats!! 🎉' },
];

export function ChatScreenshotTestimonial() {
  const [shown, setShown] = useState(1);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(messages.length); return; }
    if (shown >= messages.length) return;
    const timer = window.setTimeout(() => setShown((value) => value + 1), 1300);
    return () => window.clearTimeout(timer);
  }, [shown]);

  return (
    <figure className="w-full max-w-xs">
      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center gap-2 border-b border-zinc-100 px-4 py-3 dark:border-zinc-900">
          <span aria-hidden className="size-8 rounded-full bg-gradient-to-br from-pink-400 to-amber-300" />
          <span className="text-sm"><span className="block font-semibold text-zinc-900 dark:text-zinc-100">Jade · Founder, Mola</span><span className="text-xs text-emerald-600">online</span></span>
        </div>
        <ol aria-live="polite" className="flex min-h-64 flex-col gap-1.5 bg-zinc-50 p-3 dark:bg-zinc-900/50">
          {messages.slice(0, shown).map((message, index) => (
            <li key={index} className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm motion-safe:animate-[pui-bubble_.25s_ease-out] ${message.from === 'me' ? 'self-end rounded-br-sm bg-sky-500 text-white' : 'self-start rounded-bl-sm bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100'}`}>{message.text}</li>
          ))}
          {shown < messages.length && <li aria-label="Typing" className="flex gap-1 self-start rounded-2xl bg-white px-3 py-3 shadow-sm dark:bg-zinc-800">{[0, 1, 2].map((dot) => <span key={dot} className="size-1.5 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: `${dot * 0.15}s` }} />)}</li>}
        </ol>
      </div>
      <figcaption className="mt-3 text-center text-xs text-zinc-500">Real message from a customer, shared with permission.</figcaption>
      <style>{`@keyframes pui-bubble{from{opacity:0;transform:translateY(6px) scale(.97)}}`}</style>
    </figure>
  );
}
