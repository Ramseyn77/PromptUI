/**
 * @registry
 * name: Nonprofit Pricing Card
 * category: Pricing
 * style: Editorial
 * tags: recent
 * description: Offre associative : remise de 75 %, prix barré, critères d'éligibilité à cocher et demande de vérification avec téléversement du justificatif.
 * prompt: Create a nonprofit pricing card in an editorial style: a serif headline "For nonprofits & schools", the regular price struck through next to the discounted price with a "75% off" seal, three eligibility criteria as checkboxes the visitor confirms, an organisation name input and a "proof of status" file input; "Apply for discount" is disabled until all criteria are checked and a name is entered, then shows a "We'll review within 2 business days" success (aria-live). Light (paper) and dark mode.
 */
'use client';
import { useId, useState } from 'react';

const criteria = ['Registered nonprofit, charity or accredited school', 'Not a political or religious organisation', 'Fewer than 250 staff'];

export function NonprofitPricingCard() {
  const uid = useId();
  const [checks, setChecks] = useState<number[]>([]);
  const [org, setOrg] = useState('');
  const [sent, setSent] = useState(false);
  const ready = checks.length === criteria.length && org.trim().length > 1;

  return (
    <section className="relative w-full max-w-md rounded-3xl bg-[#f6f1e7] p-7 ring-1 ring-zinc-900/10 dark:bg-zinc-950 dark:ring-white/10">
      <span aria-hidden className="absolute -right-3 -top-3 grid size-20 rotate-12 place-items-center rounded-full bg-emerald-600 text-center text-xs font-bold leading-tight text-white shadow-lg">75%<br />off</span>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">Impact program</p>
      <h3 className="mt-2 font-serif text-3xl text-zinc-950 dark:text-white">For nonprofits & schools</h3>
      <p className="mt-3 flex items-baseline gap-3"><s className="text-lg text-zinc-400">$24</s><span className="font-serif text-5xl text-zinc-950 dark:text-white">$6</span><span className="text-sm text-zinc-500">per seat / month</span></p>
      {sent ? <p role="status" className="mt-6 rounded-2xl bg-emerald-100 p-4 text-sm text-emerald-900 dark:bg-emerald-500/15 dark:text-emerald-100">Thanks, {org}! We’ll review your application within 2 business days.</p> : (
        <form onSubmit={(event) => { event.preventDefault(); if (ready) setSent(true); }} className="mt-6 space-y-3">
          <fieldset><legend className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Eligibility</legend>
            <div className="mt-2 space-y-2">{criteria.map((item, index) => <label key={item} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300"><input type="checkbox" checked={checks.includes(index)} onChange={() => setChecks((list) => (list.includes(index) ? list.filter((value) => value !== index) : [...list, index]))} className="mt-0.5 size-4 accent-emerald-600" />{item}</label>)}</div>
          </fieldset>
          <label htmlFor={`${uid}-org`} className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">Organisation name<input id={`${uid}-org`} value={org} onChange={(event) => setOrg(event.target.value)} className="mt-1 w-full rounded-lg border border-zinc-900/15 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-emerald-600/30 dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-100" /></label>
          <label htmlFor={`${uid}-proof`} className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">Proof of status <span className="font-normal text-zinc-500">(PDF, optional)</span><input id={`${uid}-proof`} type="file" accept="application/pdf" className="mt-1 block w-full text-xs text-zinc-600 file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-900 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white dark:text-zinc-400 dark:file:bg-white dark:file:text-zinc-900" /></label>
          <button type="submit" disabled={!ready} className="w-full rounded-xl bg-emerald-700 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-40">Apply for discount</button>
        </form>
      )}
    </section>
  );
}
