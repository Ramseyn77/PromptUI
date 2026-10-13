/**
 * @registry
 * name: Interview QA Testimonial
 * category: Testimonials
 * style: Editorial
 * tags: recent
 * description: Témoignage en format interview : portrait, questions-réponses en serif, chiffre clé en exergue et navigation entre clients.
 * prompt: Create an editorial interview-style testimonial: a customer header (initials portrait, name, role, company), then a Q&A list where questions are small caps labels and answers are large serif text, a pull-quote stat block ("−42% support tickets"), and a small pager "Next customer →" cycling through three interviews with an aria-live region; serif typography on a paper background. Light (paper) and dark mode.
 */
'use client';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

const interviews = [
  { name: 'Awa Diop', role: 'Head of Support', company: 'Kora Bank', stat: ['−42%', 'support tickets in 3 months'], qa: [['What was broken before?', 'Every answer lived in someone’s head. New agents needed six weeks before they felt confident.'], ['What changed?', 'We moved our playbooks into one searchable place. Now a new hire resolves real tickets on day two.']] },
  { name: 'Lucas Moreau', role: 'CTO', company: 'Atelier', stat: ['3×', 'faster release cadence'], qa: [['Why switch?', 'Our release notes were scattered across four tools and nobody trusted them.'], ['The result?', 'One source of truth. We ship weekly now, and sales finally reads the changelog.']] },
  { name: 'Mei Tanaka', role: 'Ops Lead', company: 'Northwind', stat: ['11 h', 'saved per person each month'], qa: [['Biggest surprise?', 'How quickly the team adopted it. No training session, no Slack threads asking where things are.'], ['Would you recommend it?', 'I already have — to three other ops leads this quarter.']] },
];

export function InterviewQaTestimonial() {
  const [index, setIndex] = useState(0);
  const item = interviews[index];

  return (
    <article className="w-full max-w-2xl rounded-3xl bg-[#f7f3ea] p-8 dark:bg-zinc-950" aria-live="polite">
      <header className="flex items-center gap-4">
        <span className="grid size-14 place-items-center rounded-full bg-zinc-900 font-serif text-lg text-white dark:bg-zinc-100 dark:text-zinc-900">{item.name.split(' ').map((part) => part[0]).join('')}</span>
        <div><p className="font-serif text-xl text-zinc-950 dark:text-white">{item.name}</p><p className="text-sm text-zinc-500">{item.role}, {item.company}</p></div>
      </header>
      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto]">
        <dl className="space-y-6">
          {item.qa.map(([question, answer]) => <div key={question}><dt className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{question}</dt><dd className="mt-2 font-serif text-xl leading-relaxed text-zinc-900 dark:text-zinc-100">{answer}</dd></div>)}
        </dl>
        <aside className="self-start border-l-4 border-amber-500 pl-4 md:w-40"><p className="font-serif text-5xl text-zinc-950 dark:text-white">{item.stat[0]}</p><p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{item.stat[1]}</p></aside>
      </div>
      <footer className="mt-8 flex items-center justify-between border-t border-zinc-900/10 pt-4 text-sm dark:border-white/10">
        <span className="tabular-nums text-zinc-500">{index + 1} / {interviews.length}</span>
        <button type="button" onClick={() => setIndex((index + 1) % interviews.length)} className="flex items-center gap-1.5 font-medium text-zinc-900 hover:underline dark:text-zinc-100">Next customer<ArrowRight aria-hidden className="size-4" /></button>
      </footer>
    </article>
  );
}
