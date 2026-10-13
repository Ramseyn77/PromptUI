/**
 * @registry
 * name: Customer Logo Switcher
 * category: Testimonials
 * style: Editorial
 * tags: recent
 * description: Rangée de logos clients typographiques : sélectionner un logo affiche sa citation, son résultat chiffré et le portrait de l'interlocuteur.
 * prompt: Create a customer logo switcher: a row of six wordmark-style logos (typographic, neutral names) as a tablist; selecting one (click or arrow keys) makes it fully opaque with an underline while others are greyed, and the panel below crossfades to that customer's quote in large serif, the person's initials, name and role, and a key metric ("3× faster onboarding"); auto-rotates every 6s unless the user interacted; reduced motion disables auto-rotate. Light (paper) and dark mode.
 */
'use client';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

const customers = [
  { logo: 'KORA', style: 'font-black tracking-[0.2em]', quote: 'We replaced four tools with one and nobody misses the old ones.', person: 'Awa Diop', role: 'COO', metric: ['4→1', 'tools consolidated'] },
  { logo: 'atelier', style: 'font-serif italic text-2xl', quote: 'Our designers finally spend their week designing.', person: 'Lucas Moreau', role: 'Design Director', metric: ['−60%', 'handoff time'] },
  { logo: 'Northwind', style: 'font-semibold tracking-tight', quote: 'Onboarding went from a month to a week.', person: 'Mei Tanaka', role: 'Head of Ops', metric: ['3×', 'faster onboarding'] },
  { logo: 'LUMEN', style: 'font-light tracking-[0.4em]', quote: 'The security review took one meeting. That never happens.', person: 'Dana Price', role: 'CISO', metric: ['1', 'security meeting'] },
  { logo: 'shamba', style: 'font-bold lowercase', quote: 'It works on the slowest phones our farmers own.', person: 'Kofi Mensah', role: 'Founder', metric: ['2×', 'weekly active users'] },
  { logo: 'Vela', style: 'font-mono font-bold', quote: 'Support tickets dropped the week we launched.', person: 'Inès Romero', role: 'Support Lead', metric: ['−42%', 'tickets'] },
];

export function CustomerLogoSwitcher() {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = customers[active];

  useEffect(() => {
    if (touched || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => setActive((active + 1) % customers.length), 6000);
    return () => window.clearTimeout(timer);
  }, [active, touched]);

  function pick(index: number) { setActive(index); setTouched(true); }
  function onKeyDown(event: KeyboardEvent) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const next = (active + (event.key === 'ArrowRight' ? 1 : -1) + customers.length) % customers.length;
    pick(next);
    refs.current[next]?.focus();
  }

  return (
    <section className="w-full max-w-4xl rounded-3xl bg-[#f6f2ea] p-8 dark:bg-zinc-950">
      <div role="tablist" aria-label="Customers" onKeyDown={onKeyDown} className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {customers.map((customer, index) => <button key={customer.logo} ref={(node) => { refs.current[index] = node; }} type="button" role="tab" aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => pick(index)} className={`border-b-2 pb-1 text-xl text-zinc-900 transition dark:text-zinc-100 ${customer.style} ${active === index ? 'border-zinc-900 opacity-100 dark:border-zinc-100' : 'border-transparent opacity-35 hover:opacity-70'}`}>{customer.logo}</button>)}
      </div>
      <div role="tabpanel" aria-label={item.logo} key={active} className="mx-auto mt-10 grid max-w-3xl items-center gap-8 motion-safe:animate-[pui-logo-fade_.4s_ease-out] md:grid-cols-[1fr_auto]">
        <figure>
          <blockquote className="font-serif text-3xl leading-snug text-zinc-950 dark:text-white">“{item.quote}”</blockquote>
          <figcaption className="mt-5 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-zinc-900 text-xs font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">{item.person.split(' ').map((part) => part[0]).join('')}</span><span className="text-sm"><strong className="block text-zinc-950 dark:text-white">{item.person}</strong><span className="text-zinc-500">{item.role}, {item.logo}</span></span></figcaption>
        </figure>
        <p className="border-l-2 border-zinc-900/20 pl-5 dark:border-white/20"><span className="block font-serif text-5xl text-zinc-950 dark:text-white">{item.metric[0]}</span><span className="text-sm text-zinc-600 dark:text-zinc-400">{item.metric[1]}</span></p>
      </div>
      <style>{`@keyframes pui-logo-fade { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }`}</style>
    </section>
  );
}
