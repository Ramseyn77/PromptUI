/**
 * @registry
 * name: Case Study Timeline
 * category: Testimonials
 * style: Editorial
 * tags: recent
 * description: Témoignage client raconté en frise : problème, déploiement, résultats, avec chiffres et citation finale.
 * prompt: Create a case-study timeline testimonial: company header (logo initial, name, industry), then a vertical timeline of three steps (The problem, The rollout, The results) with dates, dot markers and short paragraphs; the results step includes three metric chips; the timeline line fills as each step enters view (IntersectionObserver); a pull quote closes it. Serif headings. Light and dark mode.
 */
'use client';
import { useEffect, useRef, useState } from 'react';

const steps = [
  { title: 'The problem', date: 'Jan 2026', text: 'Six designers, three frameworks and no shared components. Every launch slipped by weeks.' },
  { title: 'The rollout', date: 'Mar 2026', text: 'One registry, one token set. Teams migrated page by page without a freeze.' },
  { title: 'The results', date: 'Jun 2026', text: 'Launches now ship on schedule, and new hires contribute in their first week.' },
];

export function CaseStudyTimeline() {
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const [seen, setSeen] = useState(1);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setSeen((value) => Math.max(value, Number((entry.target as HTMLElement).dataset.step) + 1)); }), { threshold: 0.6 });
    refs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <article className="w-full max-w-lg rounded-3xl bg-[#faf8f3] p-6 dark:bg-zinc-950 dark:ring-1 dark:ring-zinc-800">
      <header className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-emerald-700 font-serif text-lg font-bold text-white">K</span><span><span className="block font-semibold text-zinc-900 dark:text-zinc-100">Kora Bank</span><span className="text-xs text-zinc-500">Fintech · 400 employees</span></span></header>
      <div className="relative mt-6">
        <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-0.5 bg-zinc-200 dark:bg-zinc-800" />
        <span aria-hidden className="absolute left-[7px] top-2 w-0.5 bg-emerald-600 transition-[height] duration-700" style={{ height: `${((seen - 1) / (steps.length - 1)) * 100}%` }} />
        <ol className="space-y-6 pl-8">
        {steps.map((step, index) => (
          <li key={step.title} ref={(node) => { refs.current[index] = node; }} data-step={index} className="relative">
            <span aria-hidden className={`absolute -left-8 top-1 size-4 rounded-full border-2 transition-colors ${index < seen ? 'border-emerald-600 bg-emerald-600' : 'border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-950'}`} />
            <p className="text-xs uppercase tracking-wider text-zinc-500">{step.date}</p>
            <h3 className="font-serif text-lg text-zinc-950 dark:text-zinc-50">{step.title}</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{step.text}</p>
            {index === 2 && <ul className="mt-2 flex flex-wrap gap-1.5">{['3× faster launches', '−42% UI bugs', '1 week onboarding'].map((metric) => <li key={metric} className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300">{metric}</li>)}</ul>}
          </li>
        ))}
        </ol>
      </div>
      <blockquote className="mt-6 border-l-2 border-emerald-600 pl-4 font-serif text-lg italic text-zinc-800 dark:text-zinc-200">“It changed how our product teams work together.”<footer className="mt-1 font-sans text-xs not-italic text-zinc-500">— Fatou Ndiaye, VP Product</footer></blockquote>
    </article>
  );
}
