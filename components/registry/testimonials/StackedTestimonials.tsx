/**
 * @registry
 * name: Stacked Testimonials
 * category: Testimonials
 * style: Gradient
 * tags: featured, recent
 * description: Pile de cartes de temoignages ; « Suivant » envoie la carte du dessus a l arriere avec animation.
 * prompt: Create a stacked-cards testimonial: three cards stacked with offset, scale and rotation by depth; a "Next" button moves the top card to the back with a spring transition (transforms computed from each card's position in the order array). Colorful gradient cards readable in light and dark mode.
 */
'use client';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

const cards = [
  { text: 'PromptUI cut our design-to-code time in half.', name: 'Aïcha K.', tone: 'from-teal-400 to-sky-500' },
  { text: 'The most thoughtful dark mode I have seen in a kit.', name: 'Marco P.', tone: 'from-violet-500 to-fuchsia-500' },
  { text: 'Every component feels hand-crafted, not generated.', name: 'Yuki T.', tone: 'from-amber-400 to-rose-500' },
];

export function StackedTestimonials() {
  const [order, setOrder] = useState([0, 1, 2]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative h-56 w-72">
        {cards.map((card, index) => {
          const depth = order.indexOf(index);
          return (
            <figure key={card.name} aria-hidden={depth !== 0} className={`absolute inset-0 flex flex-col justify-between rounded-3xl bg-gradient-to-br p-6 text-white shadow-xl transition-all duration-500 ease-[cubic-bezier(.34,1.3,.64,1)] ${card.tone}`} style={{ transform: `translateY(${depth * 14}px) scale(${1 - depth * 0.06}) rotate(${depth * 2}deg)`, zIndex: cards.length - depth, opacity: 1 - depth * 0.15 }}>
              <blockquote className="text-lg font-medium leading-7">“{card.text}”</blockquote>
              <figcaption className="text-sm font-semibold text-white/85">— {card.name}</figcaption>
            </figure>
          );
        })}
      </div>
      <button type="button" onClick={() => setOrder((current) => [...current.slice(1), current[0]])} className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Next <ArrowRight aria-hidden className="size-4" /></button>
    </div>
  );
}
