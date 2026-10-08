/**
 * @registry
 * name: Lock Unlock Toggle
 * category: Toggle
 * style: Dark
 * tags: recent
 * description: Bascule verrou à maintenir appuyé pour déverrouiller : anneau de progression, cadenas animé et reverrouillage en un clic.
 * prompt: Create a hold-to-unlock toggle on a dark card: a round button with a padlock icon whose shackle lifts when unlocked; to unlock the user must press and hold (pointer or Space/Enter) for 1.2s while an SVG ring fills, releasing early resets it; once unlocked a single click locks again; aria-pressed reflects state with a label "Hold to unlock"/"Lock"; status caption "Vault locked" / "Vault unlocked" via aria-live. Dark in both themes.
 */
'use client';
import { useEffect, useRef, useState } from 'react';

const duration = 1200;
const circumference = 2 * 3.1416 * 44;

export function LockUnlockToggle() {
  const [unlocked, setUnlocked] = useState(false);
  const [progress, setProgress] = useState(0);
  const start = useRef<number | null>(null);
  const raf = useRef(0);
  // The press that completes the hold also fires a click: ignore it so the vault does not relock instantly.
  const justUnlocked = useRef(false);
  const ignoreClickUntil = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  function begin() {
    if (unlocked || start.current !== null) return;
    start.current = performance.now();
    const tick = (now: number) => {
      if (start.current === null) return;
      const value = Math.min(1, (now - start.current) / duration);
      setProgress(value);
      if (value >= 1) { start.current = null; justUnlocked.current = true; setUnlocked(true); setProgress(0); return; }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }

  function cancel() {
    if (justUnlocked.current) { justUnlocked.current = false; ignoreClickUntil.current = performance.now() + 150; }
    start.current = null;
    cancelAnimationFrame(raf.current);
    setProgress(0);
  }

  return (
    <div className="flex w-full max-w-xs flex-col items-center rounded-3xl bg-zinc-950 p-7 text-white ring-1 ring-white/10">
      <button
        type="button"
        aria-pressed={unlocked}
        aria-label={unlocked ? 'Lock' : 'Hold to unlock'}
        onClick={() => { if (performance.now() < ignoreClickUntil.current) return; if (unlocked) setUnlocked(false); }}
        onPointerDown={begin}
        onPointerUp={cancel}
        onPointerLeave={cancel}
        onKeyDown={(event) => { if ((event.key === ' ' || event.key === 'Enter') && !event.repeat) { event.preventDefault(); if (unlocked) setUnlocked(false); else begin(); } }}
        onKeyUp={(event) => { if (event.key === ' ' || event.key === 'Enter') cancel(); }}
        className={`relative grid size-28 touch-none select-none place-items-center rounded-full transition-colors ${unlocked ? 'bg-emerald-500/15' : 'bg-white/5 hover:bg-white/10'}`}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" aria-hidden>
          <circle cx="50" cy="50" r="44" fill="none" strokeWidth="4" className="stroke-white/10" />
          <circle cx="50" cy="50" r="44" fill="none" strokeWidth="4" strokeLinecap="round" strokeDasharray={circumference.toFixed(1)} strokeDashoffset={(circumference * (1 - (unlocked ? 1 : progress))).toFixed(1)} className={unlocked ? 'stroke-emerald-400' : 'stroke-amber-400'} />
        </svg>
        <svg viewBox="0 0 24 24" className="size-10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
          <rect x="5" y="11" width="14" height="10" rx="2" className={unlocked ? 'text-emerald-300' : 'text-white'} />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" className={`transition-transform duration-300 ${unlocked ? '-translate-y-1.5 translate-x-[3px] text-emerald-300' : ''}`} style={{ transformBox: 'fill-box', transformOrigin: 'right bottom' }} />
        </svg>
      </button>
      <p aria-live="polite" className={`mt-5 text-sm font-semibold ${unlocked ? 'text-emerald-300' : 'text-white'}`}>{unlocked ? 'Vault unlocked' : 'Vault locked'}</p>
      <p className="mt-1 text-xs text-zinc-500">{unlocked ? 'Click to lock again' : 'Press and hold to unlock'}</p>
    </div>
  );
}
