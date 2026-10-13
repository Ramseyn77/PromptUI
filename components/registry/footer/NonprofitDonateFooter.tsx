/**
 * @registry
 * name: Nonprofit Donate Footer
 * category: Footer
 * style: Editorial
 * tags: recent
 * description: Footer d'association : don rapide (ponctuel/mensuel, montants), impact concret du montant choisi, transparence des fonds et liens.
 * prompt: Create a nonprofit footer with a quick donation widget: a One-time / Monthly toggle, amount chips ($10, $25, $50, $100) plus custom, and an impact line that changes with the amount ("$25 provides school supplies for 5 children"); a Donate button; a small "Where your money goes" stacked bar (Programs 84%, Operations 11%, Fundraising 5%); registration number and address; link columns; serif headings on warm paper; stacks on mobile. Light (paper) and dark mode.
 */
'use client';
import { Heart } from 'lucide-react';
import { useId, useState } from 'react';

const amounts = [10, 25, 50, 100];
const impact = (value: number) => (value >= 100 ? `funds a teacher’s training for a month` : value >= 50 ? `buys solar lamps for ${Math.floor(value / 10)} homes` : value >= 25 ? `provides school supplies for ${Math.floor(value / 5)} children` : `gives ${value * 2} meals to students`);

export function NonprofitDonateFooter() {
  const uid = useId();
  const [monthly, setMonthly] = useState(true);
  const [amount, setAmount] = useState(25);
  const [custom, setCustom] = useState('');
  const value = custom ? Math.max(1, Number(custom) || 0) : amount;

  return (
    <footer className="w-full bg-[#f4ecdf] px-6 py-12 text-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.2fr_1fr]">
        <section aria-labelledby={`${uid}-title`} className="rounded-3xl bg-white p-6 shadow-sm dark:bg-zinc-900">
          <h2 id={`${uid}-title`} className="font-serif text-3xl text-zinc-950 dark:text-white">Every child deserves a classroom</h2>
          <div role="group" aria-label="Frequency" className="mt-4 inline-flex rounded-full bg-zinc-100 p-1 text-sm dark:bg-zinc-800">{[['One-time', false], ['Monthly', true]].map(([label, value]) => <button key={label as string} type="button" aria-pressed={monthly === value} onClick={() => setMonthly(value as boolean)} className={`rounded-full px-4 py-1.5 ${monthly === value ? 'bg-emerald-700 font-semibold text-white' : 'text-zinc-600 dark:text-zinc-400'}`}>{label as string}</button>)}</div>
          <div role="radiogroup" aria-label="Amount" className="mt-4 grid grid-cols-5 gap-2">
            {amounts.map((option) => <button key={option} type="button" role="radio" aria-checked={!custom && amount === option} onClick={() => { setAmount(option); setCustom(''); }} className={`rounded-xl border py-2 text-sm font-semibold ${!custom && amount === option ? 'border-emerald-700 bg-emerald-50 text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-200' : 'border-zinc-200 text-zinc-800 dark:border-zinc-700 dark:text-zinc-200'}`}>${option}</button>)}
            <input aria-label="Custom amount" inputMode="numeric" value={custom} onChange={(event) => setCustom(event.target.value.replace(/\D/g, ''))} placeholder="$ other" className="min-w-0 rounded-xl border border-zinc-200 bg-transparent px-2 text-sm dark:border-zinc-700" />
          </div>
          <p aria-live="polite" className="mt-3 font-serif text-lg text-zinc-800 dark:text-zinc-200">${value}{monthly ? ' a month' : ''} {impact(value)}.</p>
          <button type="button" className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-emerald-700 py-3 text-sm font-semibold text-white hover:bg-emerald-600"><Heart aria-hidden className="size-4 fill-current" />Donate ${value}{monthly ? '/month' : ''}</button>
        </section>
        <div>
          <h2 className="font-serif text-xl text-zinc-950 dark:text-white">Where your money goes</h2>
          <div aria-hidden className="mt-3 flex h-3 overflow-hidden rounded-full"><span className="bg-emerald-700" style={{ width: '84%' }} /><span className="bg-amber-500" style={{ width: '11%' }} /><span className="bg-zinc-400" style={{ width: '5%' }} /></div>
          <ul className="mt-2 space-y-1 text-sm">{[['Programs', '84%', 'bg-emerald-700'], ['Operations', '11%', 'bg-amber-500'], ['Fundraising', '5%', 'bg-zinc-400']].map(([label, share, tone]) => <li key={label} className="flex items-center gap-2"><span className={`size-2.5 rounded-sm ${tone}`} />{label}<span className="ml-auto tabular-nums">{share}</span></li>)}</ul>
          <nav aria-label="Footer" className="mt-8 grid grid-cols-2 gap-2 text-sm">{['Our work', 'Annual report', 'Volunteer', 'Partners', 'Careers', 'Contact'].map((link) => <a key={link} href="#" className="hover:underline">{link}</a>)}</nav>
          <p className="mt-8 text-xs text-zinc-500">Classrooms for All · Registered charity 1180342 · 12 Rue Carnot, Dakar</p>
        </div>
      </div>
    </footer>
  );
}
