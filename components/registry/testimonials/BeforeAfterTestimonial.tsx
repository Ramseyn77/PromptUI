/**
 * @registry
 * name: Before After Testimonial
 * category: Testimonials
 * style: SaaS
 * tags: featured, recent
 * description: Témoignage chiffré avant / après : trois métriques qui basculent d'un état à l'autre avec la citation du client.
 * prompt: Create a before/after testimonial: a customer quote with avatar, name and company, and three metric tiles (Time to publish, Support tickets, Conversion) with a Before/After segmented toggle (radiogroup) that animates values and colors (rose → emerald) between states; the "After" state is default and shows improvement percentages. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const metrics = [
  { label: 'Time to publish', before: '5 days', after: '4 hours', delta: '−97%' },
  { label: 'Support tickets / week', before: '140', after: '38', delta: '−73%' },
  { label: 'Trial conversion', before: '2.1%', after: '4.8%', delta: '+129%' },
];

export function BeforeAfterTestimonial() {
  const [after, setAfter] = useState(true);

  return (
    <figure className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <blockquote className="text-lg leading-relaxed text-zinc-800 dark:text-zinc-200">“We replaced three tools and a lot of copy-pasting. The team now ships landing pages the same day the idea comes up.”</blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <span aria-hidden className="size-10 rounded-full bg-gradient-to-br from-emerald-400 to-sky-500" />
        <span className="text-sm"><span className="block font-semibold text-zinc-900 dark:text-zinc-100">Nadia Benali</span><span className="text-zinc-500">Head of Growth, Pillar</span></span>
        <div role="radiogroup" aria-label="Compare" className="ml-auto flex rounded-lg bg-zinc-100 p-0.5 dark:bg-zinc-900">
          {['Before', 'After'].map((state) => <button key={state} type="button" role="radio" aria-checked={after === (state === 'After')} onClick={() => setAfter(state === 'After')} className={`rounded-md px-2.5 py-1 text-xs font-semibold ${after === (state === 'After') ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-500'}`}>{state}</button>)}
        </div>
      </figcaption>
      <dl className="mt-5 grid gap-2 sm:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className={`rounded-2xl p-4 transition-colors duration-300 ${after ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'bg-rose-50 dark:bg-rose-500/10'}`}>
            <dt className="text-xs text-zinc-500 dark:text-zinc-400">{metric.label}</dt>
            <dd key={String(after)} className={`mt-1 text-2xl font-bold tabular-nums motion-safe:animate-[pui-metric-in_.35s_ease-out] ${after ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}`}>{after ? metric.after : metric.before}</dd>
            {after && <dd className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{metric.delta}</dd>}
          </div>
        ))}
      </dl>
      <style>{`@keyframes pui-metric-in{from{opacity:0;transform:translateY(6px)}}`}</style>
    </figure>
  );
}
