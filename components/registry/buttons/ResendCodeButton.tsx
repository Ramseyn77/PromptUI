/**
 * @registry
 * name: Resend Code Button
 * category: Buttons
 * style: Minimal
 * tags: recent
 * description: Bouton « Renvoyer le code » désactivé pendant un compte à rebours circulaire, puis réactivé avec confirmation.
 * prompt: Create a "Resend code" button for a verification screen: after clicking it is disabled for 30 seconds with a small circular countdown ring (conic-gradient) and "Resend in 0:24" label; when the timer ends it re-enables; clicking shows a "Code sent to +221 •• •• 42" confirmation in an aria-live region. Light and dark mode.
 */
'use client';
import { RotateCw } from 'lucide-react';
import { useEffect, useState } from 'react';

const total = 30;

export function ResendCodeButton() {
  const [left, setLeft] = useState(18);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (left <= 0) return;
    const timer = window.setTimeout(() => setLeft((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [left]);

  return (
    <div className="flex flex-col items-center gap-2">
      <button type="button" disabled={left > 0} onClick={() => { setLeft(total); setSent(true); }} className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:text-zinc-400 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900 dark:disabled:text-zinc-500">
        {left > 0 ? <span aria-hidden className="size-4 rounded-full" style={{ background: `conic-gradient(#14b8a6 ${(left / total) * 360}deg, transparent 0)` }} /> : <RotateCw aria-hidden className="size-4" />}
        {left > 0 ? `Resend in 0:${String(left).padStart(2, '0')}` : 'Resend code'}
      </button>
      <p aria-live="polite" className="text-xs text-zinc-500">{sent ? 'Code sent to +221 •• •• 42' : 'Didn’t get a code?'}</p>
    </div>
  );
}
