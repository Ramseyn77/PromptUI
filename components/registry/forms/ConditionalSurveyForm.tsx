/**
 * @registry
 * name: Conditional Survey Form
 * category: Forms
 * style: Editorial
 * tags: recent
 * description: Questionnaire à logique conditionnelle : les questions suivantes dépendent des réponses (abandon, raison, alternative), avec progression et récapitulatif.
 * prompt: Create a branching cancellation survey: Q1 "Why are you leaving?" (radio: Too expensive, Missing a feature, Switching to another tool, Other); depending on the answer a follow-up appears — a discount offer card for "Too expensive", a feature checkbox list for "Missing a feature", a text input for the competitor name, or a textarea for "Other" — each revealed with a smooth height transition and focus moved to it; a step progress indicator; Submit shows a summary of answers. Serif headings on a paper card. Light (paper) and dark mode.
 */
'use client';
import { useEffect, useId, useRef, useState } from 'react';

const reasons = ['Too expensive', 'Missing a feature', 'Switching to another tool', 'Other'];
const features = ['Offline mode', 'Better exports', 'Team permissions', 'Integrations'];

export function ConditionalSurveyForm() {
  const uid = useId();
  const [reason, setReason] = useState<string | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [detail, setDetail] = useState('');
  const [offer, setOffer] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);
  const followRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (reason) followRef.current?.focus(); }, [reason]);
  const step = done ? 3 : reason ? 2 : 1;

  if (done) return (
    <section role="status" className="w-full max-w-md rounded-3xl bg-[#f7f2e9] p-7 dark:bg-zinc-950">
      <h3 className="font-serif text-2xl text-zinc-950 dark:text-white">{offer ? 'Glad you’re staying!' : 'Thanks for telling us.'}</h3>
      <dl className="mt-4 space-y-2 text-sm"><div><dt className="text-zinc-500">Reason</dt><dd className="text-zinc-900 dark:text-zinc-100">{reason}</dd></div>{picked.length > 0 && <div><dt className="text-zinc-500">Missing</dt><dd className="text-zinc-900 dark:text-zinc-100">{picked.join(', ')}</dd></div>}{detail && <div><dt className="text-zinc-500">Details</dt><dd className="text-zinc-900 dark:text-zinc-100">{detail}</dd></div>}</dl>
      <button type="button" onClick={() => { setDone(false); setReason(null); setPicked([]); setDetail(''); setOffer(null); }} className="mt-5 text-sm underline">Start over</button>
    </section>
  );

  return (
    <form onSubmit={(event) => { event.preventDefault(); if (reason) setDone(true); }} className="w-full max-w-md rounded-3xl bg-[#f7f2e9] p-7 dark:bg-zinc-950">
      <div className="flex gap-1.5" aria-label={`Step ${step} of 3`}>{[1, 2, 3].map((index) => <span key={index} className={`h-1 flex-1 rounded-full ${index <= step ? 'bg-zinc-900 dark:bg-zinc-100' : 'bg-zinc-900/10 dark:bg-white/10'}`} />)}</div>
      <fieldset className="mt-5">
        <legend className="font-serif text-2xl text-zinc-950 dark:text-white">Why are you leaving?</legend>
        <div className="mt-3 space-y-1.5">{reasons.map((item) => <label key={item} className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-900/5 dark:text-zinc-200 dark:hover:bg-white/5"><input type="radio" name={`${uid}-reason`} checked={reason === item} onChange={() => { setReason(item); setOffer(null); }} className="accent-zinc-900 dark:accent-white" />{item}</label>)}</div>
      </fieldset>
      <div ref={followRef} tabIndex={-1} aria-live="polite" className={`grid outline-none transition-[grid-template-rows] duration-300 motion-reduce:duration-0 ${reason ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          {reason === 'Too expensive' && <div className="mt-4 rounded-2xl bg-white p-4 dark:bg-zinc-900"><p className="font-serif text-lg text-zinc-950 dark:text-white">How about 40% off for 3 months?</p><div className="mt-3 flex gap-2"><button type="button" aria-pressed={offer === true} onClick={() => setOffer(true)} className="rounded-full bg-zinc-950 px-4 py-1.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Accept offer</button><button type="button" aria-pressed={offer === false} onClick={() => setOffer(false)} className="rounded-full px-4 py-1.5 text-sm text-zinc-600 underline dark:text-zinc-400">No thanks</button></div></div>}
          {reason === 'Missing a feature' && <fieldset className="mt-4"><legend className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Which ones?</legend><div className="mt-2 grid grid-cols-2 gap-1.5">{features.map((feature) => <label key={feature} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300"><input type="checkbox" checked={picked.includes(feature)} onChange={() => setPicked(picked.includes(feature) ? picked.filter((item) => item !== feature) : [...picked, feature])} className="accent-zinc-900" />{feature}</label>)}</div></fieldset>}
          {reason === 'Switching to another tool' && <label className="mt-4 block text-sm font-medium text-zinc-900 dark:text-zinc-100">Which tool?<input value={detail} onChange={(event) => setDetail(event.target.value)} className="mt-1 w-full rounded-lg border border-zinc-900/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-100" /></label>}
          {reason === 'Other' && <label className="mt-4 block text-sm font-medium text-zinc-900 dark:text-zinc-100">Tell us more<textarea rows={3} value={detail} onChange={(event) => setDetail(event.target.value)} className="mt-1 w-full resize-none rounded-lg border border-zinc-900/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-100" /></label>}
        </div>
      </div>
      <button type="submit" disabled={!reason} className="mt-6 w-full rounded-full bg-zinc-950 py-2.5 text-sm font-semibold text-white disabled:opacity-30 dark:bg-white dark:text-zinc-950">{offer ? 'Keep my plan' : 'Submit'}</button>
    </form>
  );
}
