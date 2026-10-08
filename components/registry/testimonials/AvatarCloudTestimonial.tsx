/**
 * @registry
 * name: Avatar Cloud Testimonial
 * category: Testimonials
 * style: Gradient
 * tags: featured, recent
 * description: Nuage d'avatars flottants autour d'une citation centrale ; survoler un avatar affiche son témoignage à la place.
 * prompt: Create an avatar-cloud testimonial section: ~10 gradient avatar buttons positioned around a central quote at fixed percentages, gently floating (staggered keyframes, off with reduced motion); hovering or focusing an avatar swaps the central quote, name and role with a fade and highlights that avatar with a ring. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const people = [
  { name: 'Lina K.', role: 'Founder, Mola', quote: 'Our onboarding finally feels designed, not assembled.', x: 8, y: 20, tone: 'from-rose-400 to-orange-300' },
  { name: 'Marcus O.', role: 'CTO, Northwind', quote: 'We deleted 4,000 lines of UI code in a month.', x: 86, y: 14, tone: 'from-sky-400 to-indigo-500' },
  { name: 'Aïcha D.', role: 'Designer, Kora', quote: 'Prompts that actually produce on-brand UI. Wild.', x: 14, y: 74, tone: 'from-emerald-400 to-teal-500' },
  { name: 'Tom R.', role: 'PM, Bluefin', quote: 'Our designers and devs finally speak the same language.', x: 82, y: 76, tone: 'from-violet-400 to-fuchsia-500' },
  { name: 'Yuki T.', role: 'Indie hacker', quote: 'Shipped my landing page on a train ride.', x: 50, y: 6, tone: 'from-amber-300 to-pink-400' },
  { name: 'Sam O.', role: 'Engineer, Lumen', quote: 'Accessible defaults saved us an audit.', x: 48, y: 90, tone: 'from-cyan-300 to-sky-500' },
];

export function AvatarCloudTestimonial() {
  const [active, setActive] = useState(0);
  const person = people[active];

  return (
    <section className="relative h-80 w-full max-w-2xl overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-50 to-violet-50 dark:from-zinc-950 dark:to-violet-950/40">
      <style>{`@keyframes pui-float{0%,100%{transform:translate(-50%,-50%)}50%{transform:translate(-50%,calc(-50% - 6px))}}`}</style>
      {people.map((item, index) => (
        <button key={item.name} type="button" aria-label={`${item.name}, ${item.role}`} aria-pressed={active === index} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} className={`absolute size-12 rounded-full bg-gradient-to-br outline-none ring-offset-2 transition motion-safe:animate-[pui-float_4s_ease-in-out_infinite] dark:ring-offset-zinc-950 ${item.tone} ${active === index ? 'scale-110 ring-2 ring-violet-500' : 'opacity-70 hover:opacity-100'}`} style={{ left: `${item.x}%`, top: `${item.y}%`, transform: 'translate(-50%,-50%)', animationDelay: `${index * -0.6}s` }} />
      ))}
      <figure key={active} aria-live="polite" className="absolute left-1/2 top-1/2 w-72 -translate-x-1/2 -translate-y-1/2 text-center motion-safe:animate-[pui-quote-in_.3s_ease-out]">
        <style>{`@keyframes pui-quote-in{from{opacity:0}}`}</style>
        <blockquote className="text-lg font-medium leading-snug text-zinc-900 dark:text-zinc-50">“{person.quote}”</blockquote>
        <figcaption className="mt-3 text-sm text-zinc-500"><strong className="text-zinc-800 dark:text-zinc-200">{person.name}</strong> · {person.role}</figcaption>
      </figure>
    </section>
  );
}
