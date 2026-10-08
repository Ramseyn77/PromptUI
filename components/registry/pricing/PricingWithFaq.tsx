/**
 * @registry
 * name: Pricing With FAQ
 * category: Pricing
 * style: Editorial
 * tags: recent
 * description: Carte tarifaire accompagnée d'une FAQ en accordéon à une seule question ouverte.
 * prompt: Create a pricing block with a plan card on one side and an FAQ accordion on the other (stacked on mobile): questions are buttons with aria-expanded/aria-controls, only one open at a time, plus/minus icon, answers revealed with a grid-rows transition. Light and dark mode.
 */
'use client';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  ['Can I cancel anytime?', 'Yes. Your plan stays active until the end of the billing period, then simply stops.'],
  ['Do you offer refunds?', 'We refund any purchase within 30 days, no questions asked.'],
  ['Is there a student discount?', 'Students and teachers get 50% off with a school email address.'],
];

export function PricingWithFaq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="grid w-full max-w-4xl gap-6 md:grid-cols-[1fr_1.3fr]">
      <article className="rounded-3xl bg-zinc-950 p-6 text-white dark:bg-white dark:text-zinc-950">
        <p className="text-sm opacity-70">Pro plan</p>
        <p className="mt-2 text-5xl font-semibold tracking-tight">$18<span className="text-base font-normal opacity-60">/mo</span></p>
        <p className="mt-3 text-sm opacity-75">Everything you need to design, prototype and ship.</p>
        <button type="button" className="mt-6 w-full rounded-xl bg-teal-400 py-2.5 text-sm font-semibold text-teal-950">Start 14-day trial</button>
      </article>
      <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {faqs.map(([question, answer], index) => {
          const expanded = open === index;
          return (
            <div key={question} className="py-1">
              <h4>
                <button type="button" aria-expanded={expanded} aria-controls={`pricing-faq-${index}`} onClick={() => setOpen(expanded ? -1 : index)} className="flex w-full items-center justify-between gap-4 py-3 text-left text-sm font-semibold text-zinc-900 dark:text-white">
                  {question}{expanded ? <Minus aria-hidden className="size-4 shrink-0" /> : <Plus aria-hidden className="size-4 shrink-0" />}
                </button>
              </h4>
              <div id={`pricing-faq-${index}`} className={`grid transition-[grid-template-rows] duration-300 ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <p className="overflow-hidden text-sm leading-6 text-zinc-600 dark:text-zinc-400"><span className="block pb-3">{answer}</span></p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
