/**
 * @registry
 * name: Press Quotes
 * category: Testimonials
 * style: Editorial
 * tags: recent
 * description: Citations de presse avec nom de média stylisé, sélection par onglets et citation qui change en fondu.
 * prompt: Create a press quotes section: a row of publication wordmarks rendered as styled text (serif, mono, condensed — no real logos) acting as tabs; the selected outlet's quote shows large in serif with a fade transition and the article date; arrow keys move between tabs (tablist semantics). Light and dark mode.
 */
'use client';
import { useRef, useState, type KeyboardEvent } from 'react';

const press = [
  { outlet: 'The Ledger', font: 'font-serif italic', quote: 'The rare tool that designers and engineers both open without being told to.', date: 'Sep 2026' },
  { outlet: 'BYTEWIRE', font: 'font-mono tracking-widest', quote: 'A registry that treats prompts as first-class citizens. Expect copycats.', date: 'Aug 2026' },
  { outlet: 'Northbound', font: 'font-sans font-black uppercase tracking-tight', quote: 'It turns a vague idea into a shippable interface faster than a meeting.', date: 'Jul 2026' },
];

export function PressQuotes() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKey(event: KeyboardEvent) {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    const next = (active + (event.key === 'ArrowRight' ? 1 : press.length - 1)) % press.length;
    setActive(next);
    refs.current[next]?.focus();
  }

  return (
    <section className="w-full max-w-2xl rounded-3xl border border-zinc-200 bg-[#fcfbf8] p-8 text-center dark:border-zinc-800 dark:bg-zinc-950">
      <div role="tablist" aria-label="Press" onKeyDown={onKey} className="flex flex-wrap justify-center gap-6">
        {press.map((item, index) => <button key={item.outlet} ref={(node) => { refs.current[index] = node; }} type="button" role="tab" aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} className={`text-lg transition ${item.font} ${active === index ? 'text-zinc-950 dark:text-zinc-50' : 'text-zinc-400 hover:text-zinc-600 dark:text-zinc-600 dark:hover:text-zinc-400'}`}>{item.outlet}</button>)}
      </div>
      <blockquote key={active} role="tabpanel" className="mx-auto mt-8 max-w-lg font-serif text-2xl leading-snug text-zinc-900 motion-safe:animate-[pui-quote-fade_.4s_ease-out] dark:text-zinc-100">
        “{press[active].quote}”
        <footer className="mt-4 font-sans text-xs uppercase tracking-widest text-zinc-500">{press[active].outlet} · {press[active].date}</footer>
      </blockquote>
      <style>{`@keyframes pui-quote-fade{from{opacity:0;transform:translateY(8px)}}`}</style>
    </section>
  );
}
