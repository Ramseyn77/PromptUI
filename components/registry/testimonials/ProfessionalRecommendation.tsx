/**
 * @registry
 * name: Professional Recommendation
 * category: Testimonials
 * style: Minimal
 * tags: recent
 * description: Recommandation professionnelle façon réseau pro : relation de travail, texte dépliable « voir plus », compétences confirmées et réactions.
 * prompt: Create a professional recommendation card in the style of a professional network (no brand marks): recommender avatar initials, name, headline, the relationship line ("Managed Awa directly · Jan 2024"), a recommendation text clamped to 4 lines with a "See more" toggle (aria-expanded), endorsed skill chips, and a reactions row (Like, Celebrate, Insightful) as toggle buttons with counts; a pager to switch between three recommendations. Light and dark mode.
 */
'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const items = [
  { name: 'Leo Martin', headline: 'VP Engineering at Atelier', relation: 'Managed Awa directly · Jan 2024', text: 'Awa is the rare designer who makes engineers faster. She joined when our product had five different button styles and left us with a system the whole company uses. She runs critiques that people look forward to, writes specs that answer questions before they are asked, and has an instinct for the one detail that makes a flow feel trustworthy. Any team would be lucky to have her.', skills: ['Design systems', 'Prototyping', 'Mentoring'] },
  { name: 'Mei Tanaka', headline: 'Head of Ops at Northwind', relation: 'Worked with Awa on the same team', text: 'Working with Awa felt like having a translator between our operators and the product team. She sat with our warehouse staff for a week and came back with three changes that cut picking errors in half.', skills: ['User research', 'Service design'] },
  { name: 'Kofi Mensah', headline: 'Founder at Shamba', relation: 'Awa was a client', text: 'Clear, calm and fast. Awa redesigned our field app for low-end phones and our weekly active users doubled within two months.', skills: ['Mobile design', 'Accessibility'] },
];

export function ProfessionalRecommendation() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [reactions, setReactions] = useState<Record<string, boolean>>({});
  const item = items[index];
  const counts = { Like: 24, Celebrate: 9, Insightful: 5 };

  return (
    <article className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-sky-100 font-semibold text-sky-800 dark:bg-sky-500/20 dark:text-sky-200">{item.name.split(' ').map((part) => part[0]).join('')}</span>
        <div className="flex-1"><p className="font-semibold text-zinc-950 dark:text-white">{item.name}</p><p className="text-sm text-zinc-600 dark:text-zinc-400">{item.headline}</p><p className="text-xs text-zinc-500">{item.relation}</p></div>
      </div>
      <p className={`mt-4 text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 ${expanded ? '' : 'line-clamp-4'}`}>{item.text}</p>
      {item.text.length > 220 && <button type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)} className="mt-1 text-sm font-semibold text-zinc-600 hover:underline dark:text-zinc-300">{expanded ? 'See less' : '…See more'}</button>}
      <ul className="mt-4 flex flex-wrap gap-1.5">{item.skills.map((skill) => <li key={skill} className="rounded-full border border-zinc-300 px-2.5 py-0.5 text-xs text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">✓ {skill}</li>)}</ul>
      <div className="mt-4 flex items-center gap-1 border-t border-zinc-100 pt-3 dark:border-zinc-800">
        {Object.entries(counts).map(([label, count]) => <button key={label} type="button" aria-pressed={Boolean(reactions[`${index}${label}`])} onClick={() => setReactions({ ...reactions, [`${index}${label}`]: !reactions[`${index}${label}`] })} className={`rounded-full px-2.5 py-1 text-xs ${reactions[`${index}${label}`] ? 'bg-sky-100 font-semibold text-sky-800 dark:bg-sky-500/20 dark:text-sky-200' : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'}`}>{label} <span className="tabular-nums">{count + (reactions[`${index}${label}`] ? 1 : 0)}</span></button>)}
        <div className="ml-auto flex items-center gap-1 text-xs text-zinc-500"><button type="button" aria-label="Previous recommendation" onClick={() => { setIndex((index + items.length - 1) % items.length); setExpanded(false); }} className="grid size-7 place-items-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"><ChevronLeft aria-hidden className="size-4" /></button><span aria-live="polite" className="tabular-nums">{index + 1}/{items.length}</span><button type="button" aria-label="Next recommendation" onClick={() => { setIndex((index + 1) % items.length); setExpanded(false); }} className="grid size-7 place-items-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"><ChevronRight aria-hidden className="size-4" /></button></div>
      </div>
    </article>
  );
}
