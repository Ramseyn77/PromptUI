/**
 * @registry
 * name: Avatar Picker Testimonial
 * category: Testimonials
 * style: Minimal
 * tags: recent
 * description: Rangee d avatars cliquables, l avatar choisi s agrandit et affiche sa citation.
 * prompt: Create a testimonial selector: a row of circular avatar buttons (aria-pressed) where the selected one scales up with a ring and the others dim; below, the selected person's quote, name and role fade in. Arrow keys move selection. Light and dark mode.
 */
'use client';
import { useState, type KeyboardEvent } from 'react';

const people = [
  { name: 'Aminata', role: 'Designer, Wave', quote: 'I can finally prototype at the speed I think.', hue: 170 },
  { name: 'Julien', role: 'Engineer, Kite', quote: 'The code reads like something our team would write.', hue: 260 },
  { name: 'Priya', role: 'PM, Lumen', quote: 'Demos look like the real product now. Stakeholders love it.', hue: 30 },
  { name: 'Omar', role: 'Founder, Tadam', quote: 'We launched our MVP two weeks earlier than planned.', hue: 330 },
];

export function AvatarPickerTestimonial() {
  const [active, setActive] = useState(1);
  const person = people[active];

  function onKey(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') setActive((value) => (value + 1) % people.length);
    if (event.key === 'ArrowLeft') setActive((value) => (value - 1 + people.length) % people.length);
  }

  return (
    <>
      <style>{`@keyframes pui-fade-up{from{opacity:0;transform:translateY(6px)}}`}</style>
      <section className="w-full max-w-lg text-center">
        <div role="group" aria-label="Choose a testimonial" onKeyDown={onKey} className="flex items-center justify-center gap-3">
          {people.map((item, index) => (
            <button key={item.name} type="button" aria-pressed={active === index} aria-label={item.name} onClick={() => setActive(index)} className={`rounded-full transition-all duration-300 ${active === index ? 'size-16 ring-4 ring-teal-500/40' : 'size-11 opacity-50 grayscale hover:opacity-80'}`} style={{ background: `linear-gradient(135deg, hsl(${item.hue} 70% 65%), hsl(${item.hue + 40} 60% 45%))` }} />
          ))}
        </div>
        <figure key={active} className="mt-6 motion-safe:animate-[pui-fade-up_.35s_ease-out]">
          <blockquote className="text-lg font-medium text-zinc-800 dark:text-zinc-100">“{person.quote}”</blockquote>
          <figcaption className="mt-3 text-sm text-zinc-500 dark:text-zinc-400"><strong className="text-zinc-900 dark:text-white">{person.name}</strong> · {person.role}</figcaption>
        </figure>
      </section>
    </>
  );
}
