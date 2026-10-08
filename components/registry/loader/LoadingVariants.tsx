/**
 * @registry
 * name: Loading Variants
 * category: Loader
 * style: Minimal
 * tags: featured, recent
 * description: Les six indicateurs de chargement façon daisyUI (spinner, points, anneau, balle, barres, infini) en trois tailles.
 * prompt: Create a daisyUI-style loading set: six CSS-only indicators (spinner, dots, ring, ball, bars, infinity) each with role="status" and an sr-only "Loading" label, shown in a grid with captions, plus a size switcher (sm/md/lg radiogroup) scaling them all. Animations slow to a gentle pulse with reduced motion. Uses currentColor so they inherit text color; light and dark mode.
 */
'use client';
import { useState, type ReactNode } from 'react';

const sizes = { sm: 'size-5', md: 'size-8', lg: 'size-12' } as const;
type Size = keyof typeof sizes;

export function LoadingVariants() {
  const [size, setSize] = useState<Size>('md');
  const s = sizes[size];
  const items: [string, ReactNode][] = [
    ['Spinner', <span className={`block rounded-full border-[3px] border-current border-r-transparent motion-safe:animate-spin ${s}`} />],
    ['Dots', <span className={`flex items-center justify-center gap-1 ${s}`}>{[0, 1, 2].map((dot) => <span key={dot} className="size-1/4 rounded-full bg-current motion-safe:animate-bounce" style={{ animationDelay: `${dot * 0.15}s` }} />)}</span>],
    ['Ring', <span className={`relative block ${s}`}><span className="absolute inset-0 rounded-full border-[3px] border-current opacity-20" /><span className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-current motion-safe:animate-spin" /></span>],
    ['Ball', <span className={`flex items-end justify-center ${s}`}><span className="size-1/2 rounded-full bg-current motion-safe:animate-[pui-ball_.6s_ease-in_infinite_alternate]" /></span>],
    ['Bars', <span className={`flex items-center justify-center gap-[2px] ${s}`}>{[0, 1, 2, 3].map((bar) => <span key={bar} className="h-full w-1/6 rounded-full bg-current motion-safe:animate-[pui-bars_.9s_ease-in-out_infinite]" style={{ animationDelay: `${bar * 0.12}s` }} />)}</span>],
    ['Infinity', <svg viewBox="0 0 40 20" className={`${s} overflow-visible`}><path d="M10 10c0-4 6-4 10 0s10 4 10 0-6-4-10 0-10 4-10 0Z" fill="none" stroke="currentColor" strokeOpacity=".2" strokeWidth="3" /><path d="M10 10c0-4 6-4 10 0s10 4 10 0-6-4-10 0-10 4-10 0Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" pathLength={100} strokeDasharray="25 75" className="motion-safe:animate-[pui-inf_1.4s_linear_infinite]" /></svg>],
  ];

  return (
    <div className="w-full max-w-sm">
      <style>{`@keyframes pui-ball{from{transform:translateY(-120%)}to{transform:translateY(0) scale(1.1,.9)}}@keyframes pui-bars{0%,100%{transform:scaleY(.35)}50%{transform:scaleY(1)}}@keyframes pui-inf{to{stroke-dashoffset:-100}}`}</style>
      <div role="radiogroup" aria-label="Size" className="mb-4 flex justify-center gap-1">{(Object.keys(sizes) as Size[]).map((name) => <button key={name} type="button" role="radio" aria-checked={size === name} onClick={() => setSize(name)} className={`rounded-md px-2.5 py-1 text-xs font-semibold uppercase ${size === name ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>{name}</button>)}</div>
      <div className="grid grid-cols-3 gap-3">
        {items.map(([label, node], index) => (
          <div key={label} className={`flex h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 ${['text-teal-600', 'text-sky-600', 'text-violet-600', 'text-amber-500', 'text-rose-500', 'text-emerald-600'][index]} dark:brightness-125`}>
            <span role="status">{node}<span className="sr-only">Loading</span></span>
            <span className="text-[11px] text-zinc-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
