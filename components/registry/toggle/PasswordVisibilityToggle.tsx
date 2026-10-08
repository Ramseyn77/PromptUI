/**
 * @registry
 * name: Password Visibility Toggle
 * category: Toggle
 * style: Minimal
 * tags: recent
 * description: Champ mot de passe avec bascule œil animée (paupière qui se ferme), état annoncé et masquage auto après 10 s.
 * prompt: Create a password field with an animated visibility toggle: an eye icon button inside the input whose SVG eyelid closes with a stroke animation when hidden; aria-pressed and aria-label "Show password"/"Hide password"; when shown, the password auto-hides after 10 seconds with a thin countdown bar under the field; caret position is preserved; a strength hint below. Light and dark mode.
 */
'use client';
import { useEffect, useId, useState } from 'react';

export function PasswordVisibilityToggle() {
  const uid = useId();
  const [value, setValue] = useState('correct-horse-42');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => setVisible(false), 10000);
    return () => window.clearTimeout(timer);
  }, [visible]);

  const strength = Math.min(4, Math.floor(value.length / 4) + (/\d/.test(value) ? 1 : 0) - (value.length < 8 ? 1 : 0));

  return (
    <div className="w-full max-w-xs">
      <style>{`@keyframes pui-pw-timer { from { transform: scaleX(1) } to { transform: scaleX(0) } }`}</style>
      <label htmlFor={`${uid}-pw`} className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Password</label>
      <div className="relative mt-1.5">
        <input id={`${uid}-pw`} type={visible ? 'text' : 'password'} value={value} onChange={(event) => setValue(event.target.value)} autoComplete="new-password" className="w-full rounded-lg border border-zinc-300 bg-white py-2 pl-3 pr-11 font-mono text-sm text-zinc-900 outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-300" />
        <button type="button" aria-pressed={visible} aria-label={visible ? 'Hide password' : 'Show password'} aria-controls={`${uid}-pw`} onClick={() => setVisible(!visible)} className="absolute right-1.5 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-md text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" className={`transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`} />
            <path d="M4 4l16 16" strokeDasharray="23" strokeDashoffset={visible ? 23 : 0} className="transition-[stroke-dashoffset] duration-300" />
          </svg>
        </button>
        {visible && <span aria-hidden className="absolute inset-x-1 -bottom-1 h-0.5 origin-left rounded-full bg-zinc-900 motion-safe:animate-[pui-pw-timer_10s_linear_forwards] dark:bg-zinc-100" />}
      </div>
      <div className="mt-3 flex gap-1" aria-hidden>{[0, 1, 2, 3].map((index) => <span key={index} className={`h-1 flex-1 rounded-full ${index < strength ? (strength >= 3 ? 'bg-emerald-500' : 'bg-amber-500') : 'bg-zinc-200 dark:bg-zinc-800'}`} />)}</div>
      <p className="mt-1.5 text-xs text-zinc-500">{visible ? 'Visible — hides again in 10 seconds.' : `Strength: ${['Very weak', 'Weak', 'Fair', 'Good', 'Strong'][Math.max(0, strength)]}`}</p>
    </div>
  );
}
