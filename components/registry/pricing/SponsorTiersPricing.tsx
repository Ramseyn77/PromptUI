/**
 * @registry
 * name: Sponsor Tiers Pricing
 * category: Pricing
 * style: Minimal
 * tags: recent
 * description: Paliers de parrainage open source mensuels ou ponctuels, montant libre, avantages par palier et mur des sponsors actuels.
 * prompt: Create an open-source sponsorship pricing block: a Monthly / One-time toggle, a list of sponsor tiers as radio rows ($5 Supporter, $25 Backer, $100 Bronze sponsor with logo in README, $500 Gold sponsor) each with perks, plus a "Custom amount" row with a number input; the selected row is highlighted; a summary button "Sponsor $25 / month"; below, a wall of current sponsors as initials avatars with a "+48 more" count and a goal progress "72% towards $2,000/mo". Light and dark mode.
 */
'use client';
import { Heart } from 'lucide-react';
import { useId, useState } from 'react';

const tiers = [[5, 'Supporter', 'Sponsor badge on your profile'], [25, 'Backer', 'Early access to releases + Discord role'], [100, 'Bronze sponsor', 'Small logo in the README'], [500, 'Gold sponsor', 'Large logo on the site + monthly call']] as const;
const sponsors = ['KR', 'LM', 'AN', 'VE', 'ZO', 'PI', 'QA', 'MU', 'TE', 'BA', 'NO', 'SH'];

export function SponsorTiersPricing() {
  const uid = useId();
  const [monthly, setMonthly] = useState(true);
  const [choice, setChoice] = useState<number | 'custom'>(25);
  const [custom, setCustom] = useState(50);
  const amount = choice === 'custom' ? custom : choice;

  return (
    <section className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-semibold text-zinc-950 dark:text-white"><Heart aria-hidden className="size-4 fill-pink-500 text-pink-500" />Sponsor Prism</h3>
        <div role="group" aria-label="Frequency" className="flex rounded-full bg-zinc-100 p-0.5 text-xs dark:bg-zinc-900">{[['Monthly', true], ['One-time', false]].map(([label, value]) => <button key={label as string} type="button" aria-pressed={monthly === value} onClick={() => setMonthly(value as boolean)} className={`rounded-full px-3 py-1 font-medium ${monthly === value ? 'bg-white text-zinc-950 shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-500'}`}>{label as string}</button>)}</div>
      </div>
      <fieldset className="mt-4 space-y-2">
        <legend className="sr-only">Tier</legend>
        {tiers.map(([price, name, perk]) => (
          <label key={price} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-pink-500 ${choice === price ? 'border-pink-500 bg-pink-50/60 dark:bg-pink-500/10' : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-800'}`}>
            <input type="radio" name={`${uid}-tier`} checked={choice === price} onChange={() => setChoice(price)} className="size-4 accent-pink-600" />
            <span className="flex-1"><span className="block text-sm font-semibold text-zinc-950 dark:text-white">{name}</span><span className="block text-xs text-zinc-500">{perk}</span></span>
            <span className="text-sm font-bold tabular-nums text-zinc-950 dark:text-white">${price}</span>
          </label>
        ))}
        <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-pink-500 ${choice === 'custom' ? 'border-pink-500 bg-pink-50/60 dark:bg-pink-500/10' : 'border-zinc-200 dark:border-zinc-800'}`}>
          <input type="radio" name={`${uid}-tier`} checked={choice === 'custom'} onChange={() => setChoice('custom')} className="size-4 accent-pink-600" />
          <span className="flex-1 text-sm font-semibold text-zinc-950 dark:text-white">Custom amount</span>
          <span className="flex items-center gap-1 text-sm text-zinc-500">$<input type="number" min={1} value={custom} aria-label="Custom amount in dollars" onFocus={() => setChoice('custom')} onChange={(event) => setCustom(Math.max(1, Number(event.target.value) || 1))} className="w-16 rounded-md border border-zinc-300 bg-transparent px-2 py-1 text-right text-zinc-950 dark:border-zinc-700 dark:text-white" /></span>
        </label>
      </fieldset>
      <button type="button" className="mt-4 w-full rounded-xl bg-pink-600 py-2.5 text-sm font-semibold text-white hover:bg-pink-500">Sponsor ${amount}{monthly ? ' / month' : ' once'}</button>
      <div className="mt-6 border-t border-zinc-100 pt-4 dark:border-zinc-800">
        <div className="flex justify-between text-xs text-zinc-500"><span>72% towards $2,000/mo</span><span>60 sponsors</span></div>
        <div className="mt-1.5 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className="h-full w-[72%] rounded-full bg-pink-500" /></div>
        <ul aria-label="Current sponsors" className="mt-3 flex flex-wrap items-center gap-1.5">{sponsors.map((initials, index) => <li key={initials} className="grid size-8 place-items-center rounded-full text-[10px] font-bold text-white" style={{ background: `hsl(${(index * 37) % 360} 60% 50%)` }}>{initials}</li>)}<li className="text-xs text-zinc-500">+48 more</li></ul>
      </div>
    </section>
  );
}
