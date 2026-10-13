/**
 * @registry
 * name: Spin Wheel CTA
 * category: CTA
 * style: Gradient
 * tags: featured, recent
 * description: Roue de la fortune promotionnelle : e-mail requis, rotation animée avec décélération, segment gagnant révélé et code à copier.
 * prompt: Create a spin-to-win promo wheel: a conic-gradient wheel with 6 labeled segments (5% off, Free shipping, 10% off, Try again, 15% off, Gift) and a pointer at the top; an email field must be valid before "Spin" is enabled; spinning rotates the wheel with a long ease-out transition to a deterministic result (the 10% segment on first spin), then reveals the prize with a copyable code (aria-live); one spin only; with reduced motion the result appears without rotation. Light and dark mode.
 */
'use client';
import { useId, useState } from 'react';

const segments = [['5% off', '#f97316'], ['Free shipping', '#8b5cf6'], ['10% off', '#ec4899'], ['Try again', '#64748b'], ['15% off', '#10b981'], ['Gift', '#f59e0b']] as const;
const winner = 2;

export function SpinWheelCta() {
  const uid = useId();
  const [email, setEmail] = useState('');
  const [rotation, setRotation] = useState(0);
  const [state, setState] = useState<'idle' | 'spinning' | 'won'>('idle');
  const valid = /^\S+@\S+\.\S+$/.test(email);
  const slice = 360 / segments.length;
  const gradient = segments.map(([, color], index) => `${color} ${index * slice}deg ${(index + 1) * slice}deg`).join(', ');

  function spin() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setRotation(360 * 6 + (360 - (winner * slice + slice / 2)));
    setState('spinning');
    window.setTimeout(() => setState('won'), reduce ? 0 : 4200);
  }

  return (
    <section className="grid w-full max-w-2xl items-center gap-8 rounded-3xl bg-gradient-to-br from-fuchsia-50 to-amber-50 p-6 md:grid-cols-2 dark:from-fuchsia-950/40 dark:to-amber-950/30">
      <div className="relative mx-auto size-64">
        <span aria-hidden className="absolute left-1/2 top-[-6px] z-10 size-0 -translate-x-1/2 border-x-[12px] border-t-[20px] border-x-transparent border-t-zinc-900 dark:border-t-white" />
        <div aria-hidden className="size-full rounded-full border-8 border-white shadow-2xl transition-transform duration-[4000ms] ease-[cubic-bezier(.12,.8,.2,1)] motion-reduce:duration-0 dark:border-zinc-800" style={{ background: `conic-gradient(${gradient})`, transform: `rotate(${rotation}deg)` }}>
          {segments.map(([label], index) => { const angle = index * slice + slice / 2; const rad = (angle * Math.PI) / 180; return <span key={label} className="absolute w-20 -translate-x-1/2 -translate-y-1/2 text-center text-[11px] font-bold leading-tight text-white" style={{ left: `${(50 + 32 * Math.sin(rad)).toFixed(2)}%`, top: `${(50 - 32 * Math.cos(rad)).toFixed(2)}%`, transform: `rotate(${angle}deg)` }}>{label}</span>; })}
          <span className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow dark:bg-zinc-900" />
        </div>
      </div>
      <div aria-live="polite">
        {state === 'won' ? (
          <div><p className="text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-400">You won!</p><p className="text-3xl font-bold text-zinc-950 dark:text-white">{segments[winner][0]}</p><p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Use this code at checkout. We also sent it to {email}.</p><button type="button" onClick={() => navigator.clipboard?.writeText('SPIN10').catch(() => {})} className="mt-3 rounded-lg border-2 border-dashed border-fuchsia-400 px-4 py-2 font-mono text-lg font-bold tracking-widest text-zinc-950 dark:text-white">SPIN10</button></div>
        ) : (
          <form onSubmit={(event) => { event.preventDefault(); if (valid && state === 'idle') spin(); }}>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">Spin for a welcome gift</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">One spin per person. Everyone wins something (almost).</p>
            <label htmlFor={`${uid}-email`} className="mt-4 block text-sm font-medium text-zinc-900 dark:text-zinc-100">Email</label>
            <input id={`${uid}-email`} type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@email.com" disabled={state !== 'idle'} className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-fuchsia-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100" />
            <button type="submit" disabled={!valid || state !== 'idle'} className="mt-3 w-full rounded-xl bg-gradient-to-r from-fuchsia-600 to-amber-500 py-2.5 text-sm font-semibold text-white disabled:opacity-40">{state === 'spinning' ? 'Spinning…' : 'Spin the wheel'}</button>
          </form>
        )}
      </div>
    </section>
  );
}
