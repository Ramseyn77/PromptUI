/**
 * @registry
 * name: Scroll To Agree Checkbox
 * category: Checkboxes
 * style: SaaS
 * tags: recent
 * description: Case d'acceptation des conditions qui ne s'active qu'une fois le texte entièrement lu (défilement jusqu'en bas), avec progression et explication.
 * prompt: Create a terms acceptance block: a scrollable terms panel (data-lenis-prevent) with a thin reading progress bar; the "I have read and agree to the Terms" checkbox stays disabled (with aria-describedby explaining "Scroll to the end to enable") until the panel is scrolled to the bottom, then enables with a subtle highlight; a "Jump to end" link scrolls down; Continue is enabled only when checked; status changes are announced via aria-live. Light and dark mode.
 */
'use client';
import { useId, useRef, useState } from 'react';

const sections = ['1. Your account', '2. Acceptable use', '3. Payments and refunds', '4. Data and privacy', '5. Termination', '6. Changes to these terms'];

export function ScrollToAgreeCheckbox() {
  const uid = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [read, setRead] = useState(false);
  const [agreed, setAgreed] = useState(false);

  function onScroll() {
    const node = panelRef.current!;
    const value = node.scrollTop / Math.max(1, node.scrollHeight - node.clientHeight);
    setProgress(value);
    if (value > 0.98) setRead(true);
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between"><h3 className="font-semibold text-zinc-950 dark:text-white">Terms of service</h3><button type="button" onClick={() => panelRef.current?.scrollTo({ top: panelRef.current.scrollHeight, behavior: 'smooth' })} className="text-xs text-indigo-600 hover:underline dark:text-indigo-400">Jump to end</button></div>
      <div className="mt-3 h-1 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className={`h-full rounded-full transition-[width] ${read ? 'bg-emerald-500' : 'bg-indigo-500'}`} style={{ width: `${Math.round(progress * 100)}%` }} /></div>
      <div ref={panelRef} onScroll={onScroll} tabIndex={0} aria-label="Terms of service text" className="mt-2 h-44 overflow-y-auto rounded-xl bg-zinc-50 p-4 text-xs leading-relaxed text-zinc-600 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:bg-zinc-900 dark:text-zinc-400" data-lenis-prevent>
        {sections.map((section) => <section key={section} className="mb-4"><h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{section}</h4><p className="mt-1">You agree to use the service responsibly, keep your login details safe and follow applicable laws. We may update features over time and will tell you about changes that affect your rights at least 30 days in advance.</p></section>)}
        <p className="font-medium text-zinc-900 dark:text-zinc-100">End of terms.</p>
      </div>
      <label className={`mt-4 flex items-start gap-2 rounded-lg p-2 text-sm transition ${read ? 'bg-emerald-50 text-zinc-900 dark:bg-emerald-500/10 dark:text-zinc-100' : 'text-zinc-400'}`}>
        <input type="checkbox" disabled={!read} checked={agreed} onChange={(event) => setAgreed(event.target.checked)} aria-describedby={`${uid}-hint`} className="mt-0.5 size-4 accent-emerald-600" />
        <span>I have read and agree to the <a href="#" className="underline">Terms</a></span>
      </label>
      <p id={`${uid}-hint`} aria-live="polite" className="mt-1 text-xs text-zinc-500">{read ? 'Thanks for reading — you can now agree.' : 'Scroll to the end to enable this checkbox.'}</p>
      <button type="button" disabled={!agreed} className="mt-4 w-full rounded-xl bg-zinc-950 py-2.5 text-sm font-semibold text-white disabled:opacity-30 dark:bg-white dark:text-zinc-950">Continue</button>
    </div>
  );
}
