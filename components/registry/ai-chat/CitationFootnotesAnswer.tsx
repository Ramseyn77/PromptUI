/**
 * @registry
 * name: Citation Footnotes Answer
 * category: AI Chat
 * style: Editorial
 * tags: recent
 * description: Réponse IA avec citations numérotées en exposant : survol ou focus d'une citation affiche la source et surligne le passage, liste des sources en bas.
 * prompt: Create an AI answer with inline numbered citations: the answer paragraph contains superscript citation buttons [1] [2] [3]; hovering or focusing a citation highlights the cited sentence, shows a small source preview card (favicon initial, site name, title, quoted snippet) and highlights the matching row in the "Sources" list below; clicking pins the preview; Escape unpins; sources list items link out; serif reading typography. Light (paper) and dark mode.
 */
'use client';
import { useState } from 'react';

const sources = [
  { site: 'who.int', title: 'Physical activity fact sheet', quote: 'Adults should do at least 150–300 minutes of moderate aerobic activity per week.' },
  { site: 'nhs.uk', title: 'Exercise guidelines for adults', quote: 'Do strengthening activities that work all the major muscle groups on at least 2 days a week.' },
  { site: 'harvard.edu', title: 'Sitting is the new smoking?', quote: 'Breaking up long periods of sitting lowers blood sugar after meals.' },
];
const sentences = [['Most health agencies recommend 150 to 300 minutes of moderate activity each week.', 0], ['Strength training on two days adds benefits for muscles and bones.', 1], ['Even short walks that break up sitting help your blood sugar.', 2]] as const;

export function CitationFootnotesAnswer() {
  const [hover, setHover] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const active = pinned ?? hover;

  return (
    <article className="w-full max-w-xl rounded-2xl bg-[#faf7f0] p-6 dark:bg-zinc-950" onKeyDown={(event) => { if (event.key === 'Escape') setPinned(null); }}>
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Answer</p>
      <p className="mt-3 font-serif text-lg leading-relaxed text-zinc-900 dark:text-zinc-100">
        {sentences.map(([text, source]) => (
          <span key={source}>
            <span className={`rounded transition-colors ${active === source ? 'bg-amber-200/80 dark:bg-amber-500/30' : ''}`}>{text}</span>
            <sup><button type="button" aria-label={`Source ${source + 1}: ${sources[source].site}`} aria-pressed={pinned === source} onMouseEnter={() => setHover(source)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(source)} onBlur={() => setHover(null)} onClick={() => setPinned(pinned === source ? null : source)} className={`mx-0.5 rounded px-1 font-sans text-[11px] font-semibold ${active === source ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'bg-zinc-900/10 text-zinc-700 dark:bg-white/10 dark:text-zinc-300'}`}>{source + 1}</button></sup>{' '}
          </span>
        ))}
      </p>
      <div aria-live="polite" className="min-h-[5.5rem]">
        {active !== null && (
          <div className="mt-4 rounded-xl bg-white p-3 shadow-md ring-1 ring-zinc-900/10 dark:bg-zinc-900 dark:ring-white/10">
            <p className="flex items-center gap-2 text-xs text-zinc-500"><span className="grid size-5 place-items-center rounded bg-zinc-900 text-[10px] font-bold uppercase text-white dark:bg-white dark:text-zinc-900">{sources[active].site[0]}</span>{sources[active].site}{pinned !== null && <span className="ml-auto text-[10px]">Pinned · Esc to close</span>}</p>
            <p className="mt-1.5 text-sm font-medium text-zinc-950 dark:text-white">{sources[active].title}</p>
            <blockquote className="mt-1 border-l-2 border-amber-400 pl-2 text-xs italic text-zinc-600 dark:text-zinc-400">“{sources[active].quote}”</blockquote>
          </div>
        )}
      </div>
      <h3 className="mt-5 text-xs font-semibold uppercase tracking-widest text-zinc-500">Sources</h3>
      <ol className="mt-2 space-y-1">{sources.map((source, index) => <li key={source.site}><a href="#" className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors ${active === index ? 'bg-zinc-900/5 dark:bg-white/10' : ''}`}><span className="w-4 text-xs tabular-nums text-zinc-400">{index + 1}</span><span className="text-zinc-900 dark:text-zinc-100">{source.title}</span><span className="ml-auto text-xs text-zinc-500">{source.site}</span></a></li>)}</ol>
    </article>
  );
}
