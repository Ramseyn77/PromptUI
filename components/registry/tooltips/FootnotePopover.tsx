/**
 * @registry
 * name: Footnote Popover
 * category: Tooltips
 * style: Editorial
 * tags: recent
 * description: Notes de bas de page interactives dans un article : appel numéroté qui ouvre la note en popover sur place, lien vers la source et retour au texte.
 * prompt: Create interactive footnotes in an editorial article: superscript numbered footnote buttons in serif body text; clicking or pressing Enter opens a small popover right below the reference with the footnote text and a source link (the second note is open by default), only one open at a time, Escape closes and returns focus to the reference; the full footnote list remains at the bottom of the article with "↩" back-links; works without hover (touch friendly). Light (paper) and dark mode.
 */
'use client';
import { X } from 'lucide-react';
import { useId, useRef, useState } from 'react';

const notes = [
  { text: 'The term was popularised in a 1999 essay on “calm technology” by researchers at Xerox PARC.', source: 'Weiser & Brown, 1996' },
  { text: 'In our study of 1,200 sessions, users on 3G waited a median of 6.4 seconds for the first meaningful paint.', source: 'Internal research, 2026' },
  { text: 'Defaults matter because roughly 95% of people never change them, according to several usability studies.', source: 'Spool, 2011' },
];

export function FootnotePopover() {
  const uid = useId();
  const [open, setOpen] = useState<number | null>(1);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const close = () => { const index = open; setOpen(null); if (index !== null) refs.current[index]?.focus(); };

  const ref = (index: number) => (
    <span className="relative">
      <sup><button ref={(node) => { refs.current[index] = node; }} type="button" aria-expanded={open === index} aria-controls={`${uid}-pop${index}`} aria-label={`Footnote ${index + 1}`} onClick={() => setOpen(open === index ? null : index)} className={`mx-0.5 rounded px-1 font-sans text-[11px] font-bold ${open === index ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-rose-700 hover:bg-rose-100 dark:text-rose-400 dark:hover:bg-rose-500/15'}`}>{index + 1}</button></sup>
      {open === index && (
        <span id={`${uid}-pop${index}`} role="note" className="absolute left-0 top-full z-10 mt-1 block w-64 rounded-xl bg-white p-3 font-sans text-xs leading-relaxed text-zinc-700 shadow-xl ring-1 ring-zinc-900/10 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-white/10">
          <span className="flex items-start gap-2"><span className="flex-1">{notes[index].text}</span><button type="button" aria-label="Close footnote" onClick={close} className="grid size-5 shrink-0 place-items-center rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"><X aria-hidden className="size-3" /></button></span>
          <a href="#" className="mt-1.5 block font-medium text-rose-700 underline dark:text-rose-400">{notes[index].source}</a>
        </span>
      )}
    </span>
  );

  return (
    <article className="w-full max-w-xl rounded-2xl bg-[#faf6ee] p-7 dark:bg-zinc-950" onKeyDown={(event) => { if (event.key === 'Escape') close(); }}>
      <h3 className="font-serif text-2xl text-zinc-950 dark:text-white">The case for quiet software</h3>
      <p className="mt-4 font-serif text-lg leading-relaxed text-zinc-800 dark:text-zinc-200">
        Calm interfaces respect attention{ref(0)}. They load quickly even on slow connections{ref(1)}, and they choose sensible defaults because most people will never open the settings page{ref(2)}.
      </p>
      <ol className="mt-24 space-y-1.5 border-t border-zinc-900/10 pt-4 font-sans text-xs text-zinc-600 dark:border-white/10 dark:text-zinc-400">
        {notes.map((note, index) => <li key={note.source} className="flex gap-2"><span className="font-semibold">{index + 1}.</span><span className="flex-1">{note.text} <em>{note.source}</em></span><button type="button" aria-label={`Back to reference ${index + 1}`} onClick={() => { refs.current[index]?.focus(); setOpen(index); }} className="text-rose-700 dark:text-rose-400">↩</button></li>)}
      </ol>
    </article>
  );
}
