/**
 * @registry
 * name: Waitlist Position CTA
 * category: CTA
 * style: Gradient
 * tags: featured, recent
 * description: Position sur liste d'attente après inscription : rang qui défile, parrainages pour remonter, lien de partage copiable et paliers débloqués.
 * prompt: Create a post-signup waitlist CTA: "You're #1,284 in line" with the number counting down smoothly to the new rank when referrals are added; a referral link field with Copy (aria-live "Copied"); a "Simulate a referral" button that moves the user up 150 spots; reward milestones as a 3-step track (1 referral: skip 150, 3: early access, 5: free month) that light up as referrals grow; share text buttons (X, LinkedIn, Email) as plain text pills. Light and dark mode.
 */
'use client';
import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const milestones = [[1, 'Skip 150 spots'], [3, 'Early access'], [5, 'Free month of Pro']] as const;

export function WaitlistPositionCta() {
  const [referrals, setReferrals] = useState(0);
  const target = Math.max(1, 1284 - referrals * 150);
  const [shown, setShown] = useState(target);
  const [copied, setCopied] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    const from = shown;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 700);
      setShown(Math.round(from + (target - from) * (1 - (1 - t) ** 3)));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return (
    <section className="w-full max-w-md rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-px">
      <div className="rounded-3xl bg-white p-6 text-center dark:bg-zinc-950">
        <p className="text-sm font-medium text-violet-600 dark:text-violet-400">You’re on the list 🎉</p>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">You’re</p>
        <p className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-6xl font-black tabular-nums tracking-tight text-transparent">#{shown.toLocaleString('en-US')}</p>
        <p className="text-zinc-600 dark:text-zinc-400">in line</p>
        <p aria-live="polite" className="sr-only">Your position is {target}</p>
        <div className="mt-6 flex gap-2 rounded-xl bg-zinc-100 p-1.5 pl-3 dark:bg-zinc-900"><span className="flex-1 truncate py-1.5 text-left font-mono text-xs text-zinc-700 dark:text-zinc-300">promptui.dev/r/awa-7f2</span><button type="button" onClick={() => { navigator.clipboard?.writeText('https://promptui.dev/r/awa-7f2').catch(() => {}); setCopied(true); window.setTimeout(() => setCopied(false), 1500); }} className="flex items-center gap-1.5 rounded-lg bg-zinc-950 px-3 text-xs font-semibold text-white dark:bg-white dark:text-zinc-950">{copied ? <Check aria-hidden className="size-3.5" /> : <Copy aria-hidden className="size-3.5" />}<span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span></button></div>
        <div className="mt-2 flex justify-center gap-2 text-xs">{['Share on X', 'LinkedIn', 'Email'].map((label) => <a key={label} href="#" className="rounded-full border border-zinc-200 px-3 py-1 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900">{label}</a>)}</div>
        <ol className="mt-6 grid grid-cols-3 gap-2 text-left">
          {milestones.map(([count, reward]) => { const on = referrals >= count; return <li key={count} className={`rounded-xl p-2.5 text-xs transition ${on ? 'bg-violet-600 text-white' : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-900'}`}><p className="font-bold">{count} referral{count > 1 ? 's' : ''}</p><p className="mt-0.5">{reward}</p>{on && <Check aria-hidden className="mt-1 size-3.5" />}</li>; })}
        </ol>
        <button type="button" onClick={() => setReferrals(referrals + 1)} disabled={referrals >= 8} className="mt-4 text-xs font-medium text-violet-600 hover:underline disabled:opacity-40 dark:text-violet-400">Simulate a referral ({referrals})</button>
      </div>
    </section>
  );
}
