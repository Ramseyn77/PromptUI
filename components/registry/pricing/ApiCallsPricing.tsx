/**
 * @registry
 * name: API Calls Pricing
 * category: Pricing
 * style: Dark
 * tags: recent
 * description: Tarification d'API à l'usage : curseur logarithmique de requêtes mensuelles, paliers dégressifs colorés, coût estimé et extrait de code de l'endpoint.
 * prompt: Create dark usage-based API pricing: a logarithmic slider from 10k to 100M requests per month (labelled ticks 10k, 100k, 1M, 10M, 100M) showing the formatted volume; graduated tiers (first 100k free, then $0.40 per 1k up to 1M, $0.25 per 1k to 10M, $0.10 beyond) rendered as a stacked bar where each tier's used portion is colored; the estimated monthly cost updates live; a small code card shows a curl request; "Get API key" CTA. Dark in both themes.
 */
'use client';
import { useId, useState } from 'react';

const tiers = [{ upTo: 1e5, per1k: 0, color: 'bg-emerald-400', label: 'First 100k free' }, { upTo: 1e6, per1k: 0.4, color: 'bg-sky-400', label: '$0.40 / 1k to 1M' }, { upTo: 1e7, per1k: 0.25, color: 'bg-violet-400', label: '$0.25 / 1k to 10M' }, { upTo: 1e8, per1k: 0.1, color: 'bg-fuchsia-400', label: '$0.10 / 1k beyond' }];
const format = (value: number) => (value >= 1e6 ? `${(value / 1e6).toFixed(value >= 1e7 ? 0 : 1)}M` : `${Math.round(value / 1e3)}k`);

export function ApiCallsPricing() {
  const uid = useId();
  const [log, setLog] = useState(6.3);
  const requests = Math.round(10 ** log / 1000) * 1000;
  let previous = 0;
  const usage = tiers.map((tier) => { const used = Math.max(0, Math.min(requests, tier.upTo) - previous); const cost = (used / 1000) * tier.per1k; const span = tier.upTo - previous; previous = tier.upTo; return { ...tier, used, cost, fill: used / span }; });
  const total = usage.reduce((sum, tier) => sum + tier.cost, 0);

  return (
    <section className="w-full max-w-xl rounded-3xl bg-zinc-950 p-6 text-zinc-300 ring-1 ring-white/10">
      <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">Usage-based</p>
      <h3 className="mt-1 text-2xl font-semibold text-white">Only pay for what you call</h3>
      <label htmlFor={`${uid}-volume`} className="mt-6 flex items-baseline justify-between text-sm">Monthly requests<span className="font-mono text-2xl font-bold text-white">{format(requests)}</span></label>
      <input id={`${uid}-volume`} type="range" min={4} max={8} step={0.05} value={log} aria-valuetext={`${format(requests)} requests per month`} onChange={(event) => setLog(Number(event.target.value))} className="mt-2 w-full accent-sky-400" />
      <div aria-hidden className="mt-1 flex justify-between text-[10px] text-zinc-500">{['10k', '100k', '1M', '10M', '100M'].map((tick) => <span key={tick}>{tick}</span>)}</div>
      <div aria-hidden className="mt-5 grid grid-cols-4 gap-1">{usage.map((tier) => <div key={tier.label} className="h-3 overflow-hidden rounded-full bg-white/10"><div className={`h-full rounded-full transition-[width] duration-300 ${tier.color}`} style={{ width: `${Math.round(tier.fill * 100)}%` }} /></div>)}</div>
      <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] md:grid-cols-4">{usage.map((tier) => <li key={tier.label} className={tier.used ? 'text-zinc-300' : 'text-zinc-600'}>{tier.label}<span className="block tabular-nums">${tier.cost.toFixed(2)}</span></li>)}</ul>
      <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-4"><p className="text-sm">Estimated monthly cost</p><p aria-live="polite" className="text-3xl font-bold tabular-nums text-white">${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p></div>
      <pre className="mt-5 overflow-x-auto rounded-xl bg-black/50 p-3 font-mono text-[11px] leading-relaxed text-zinc-400 ring-1 ring-white/10" data-lenis-prevent><span className="text-sky-300">curl</span> https://api.vector.dev/v1/embed \{'\n'}  -H <span className="text-emerald-300">&quot;Authorization: Bearer $KEY&quot;</span> \{'\n'}  -d <span className="text-amber-300">&apos;{'{'}&quot;text&quot;: &quot;hello&quot;{'}'}&apos;</span></pre>
      <a href="#" className="mt-5 block rounded-xl bg-white py-2.5 text-center text-sm font-semibold text-zinc-950">Get API key</a>
    </section>
  );
}
