/**
 * @registry
 * name: Holiday Sale Pricing
 * category: Pricing
 * style: Gradient
 * tags: recent
 * description: Offre promotionnelle de fin d'année : bandeau festif, prix barrés, remise en pourcentage, compte à rebours et code copiable, flocons décoratifs.
 * prompt: Create a festive sale pricing section: a top ribbon "Holiday sale · ends Dec 31" with a ticking countdown (after mount, fixed start), decorative CSS snowflakes falling (deterministic positions, hidden with reduced motion), two plan cards with struck-through regular prices, the sale price and a "-40%" badge, a copyable code "JOY40" (Copied state, aria-live), and CTAs; works on mobile with stacked cards. Light and dark mode.
 */
'use client';
import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

const flakes = Array.from({ length: 16 }, (_, index) => ({ left: (index * 37) % 100, delay: -((index * 13) % 10), duration: 6 + (index % 5), size: 6 + (index % 3) * 3 }));
const plans = [['Personal', 60, 36, 'For one person'], ['Studio', 240, 144, 'For teams up to 10']] as const;

export function HolidaySalePricing() {
  const [left, setLeft] = useState(4 * 86400 + 5 * 3600 + 12 * 60);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-rose-700 via-red-600 to-emerald-700 p-6 text-white">
      <style>{`@keyframes pui-snow { from { transform: translateY(-20px) } to { transform: translateY(420px) } } @media (prefers-reduced-motion: reduce) { .pui-snow { display: none } }`}</style>
      {flakes.map((flake, index) => <span key={index} aria-hidden className="pui-snow pointer-events-none absolute top-0 select-none text-white/60" style={{ left: `${flake.left}%`, fontSize: flake.size, animation: `pui-snow ${flake.duration}s linear ${flake.delay}s infinite` }}>❄</span>)}
      <div className="relative">
        <p className="w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">Holiday sale · ends Dec 31</p>
        <h3 className="mt-3 text-3xl font-bold tracking-tight">40% off all yearly plans</h3>
        <p className="mt-1 text-sm text-white/80">Ends in <span className="font-mono tabular-nums">{Math.floor(left / 86400)}d {String(Math.floor((left % 86400) / 3600)).padStart(2, '0')}h {String(Math.floor((left % 3600) / 60)).padStart(2, '0')}m {String(left % 60).padStart(2, '0')}s</span></p>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {plans.map(([name, regular, sale, hint]) => (
            <article key={name} className="relative rounded-2xl bg-white p-5 text-zinc-950 shadow-xl dark:bg-zinc-950 dark:text-white">
              <span className="absolute right-4 top-4 rounded-full bg-red-600 px-2 py-0.5 text-[11px] font-bold text-white">-40%</span>
              <p className="font-semibold">{name}</p>
              <p className="text-xs text-zinc-500">{hint}</p>
              <p className="mt-3 flex items-baseline gap-2"><s className="text-sm text-zinc-400">${regular}</s><span className="text-3xl font-bold">${sale}</span><span className="text-sm text-zinc-500">/year</span></p>
              <a href="#" className="mt-4 block rounded-xl bg-red-600 py-2.5 text-center text-sm font-semibold text-white hover:bg-red-500">Get {name}</a>
            </article>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm"><span>Use code</span><button type="button" onClick={() => { navigator.clipboard?.writeText('JOY40').catch(() => {}); setCopied(true); window.setTimeout(() => setCopied(false), 1500); }} className="flex items-center gap-2 rounded-lg border-2 border-dashed border-white/60 px-3 py-1 font-mono font-bold tracking-widest hover:bg-white/10">JOY40{copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}</button><span aria-live="polite" className="text-xs text-white/80">{copied ? 'Copied!' : 'at checkout'}</span></div>
      </div>
    </section>
  );
}
