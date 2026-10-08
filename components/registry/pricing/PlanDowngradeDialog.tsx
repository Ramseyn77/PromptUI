/**
 * @registry
 * name: Plan Downgrade Dialog
 * category: Pricing
 * style: Minimal
 * tags: recent
 * description: Écran de rétrogradation d'offre qui liste ce que l'on perd, propose une remise de rétention puis confirme.
 * prompt: Create a plan downgrade flow card (role="dialog" style panel, in flow): "Switch to Starter?" with a comparison list of features you'll lose (crossed, rose) and keep (check), a highlighted retention offer "Stay on Pro for 40% off for 3 months" with Accept button, and a secondary "Downgrade anyway" that requires ticking an acknowledgement checkbox before it enables; final state confirms the change date. Light and dark mode.
 */
'use client';
import { Check, Gift, X } from 'lucide-react';
import { useId, useState } from 'react';

export function PlanDowngradeDialog() {
  const uid = useId();
  const [ack, setAck] = useState(false);
  const [result, setResult] = useState<'offer' | 'downgraded' | null>(null);

  if (result) return <div role="status" className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-950"><p className="font-semibold text-zinc-900 dark:text-zinc-100">{result === 'offer' ? 'Discount applied 🎉' : 'Downgrade scheduled'}</p><p className="mt-1 text-sm text-zinc-500">{result === 'offer' ? 'Pro at $14.40/mo until January.' : 'You’ll move to Starter on Nov 1.'}</p><button type="button" onClick={() => { setResult(null); setAck(false); }} className="mt-3 text-xs text-zinc-500 underline">Reset demo</button></div>;

  return (
    <section role="dialog" aria-labelledby={`${uid}-title`} className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
      <h3 id={`${uid}-title`} className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Switch to Starter?</h3>
      <ul className="mt-3 space-y-1.5 text-sm">
        {['Unlimited projects', 'Custom domains', 'Priority support'].map((item) => <li key={item} className="flex items-center gap-2 text-rose-700 dark:text-rose-400"><X aria-hidden className="size-4" /><span className="line-through decoration-rose-300">{item}</span><span className="sr-only">(you will lose this)</span></li>)}
        {['3 projects', 'Analytics'].map((item) => <li key={item} className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300"><Check aria-hidden className="size-4 text-emerald-500" />{item}</li>)}
      </ul>
      <div className="mt-5 rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-500/40 dark:bg-amber-500/10">
        <p className="flex items-center gap-2 text-sm font-semibold text-amber-900 dark:text-amber-200"><Gift aria-hidden className="size-4" />Stay on Pro for 40% off</p>
        <p className="mt-1 text-xs text-amber-800 dark:text-amber-300">$14.40/mo for the next 3 months, then $24.</p>
        <button type="button" onClick={() => setResult('offer')} className="mt-3 w-full rounded-lg bg-amber-500 py-2 text-sm font-semibold text-amber-950">Accept offer</button>
      </div>
      <label className="mt-4 flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400"><input type="checkbox" checked={ack} onChange={(event) => setAck(event.target.checked)} className="mt-0.5 accent-zinc-900" />I understand projects beyond the first 3 will be archived.</label>
      <button type="button" disabled={!ack} onClick={() => setResult('downgraded')} className="mt-3 w-full rounded-lg border border-zinc-300 py-2 text-sm font-medium text-zinc-700 disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300">Downgrade anyway</button>
    </section>
  );
}
