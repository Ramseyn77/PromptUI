/**
 * @registry
 * name: Async Switch
 * category: Toggle
 * style: Minimal
 * tags: recent
 * description: Interrupteur qui attend la réponse du serveur : spinner dans le bouton, puis succès ou retour arrière en cas d'erreur.
 * prompt: Create an async switch: clicking it shows a spinner inside the knob and aria-busy while a fake request runs (900ms); it then commits, or — when "Simulate failure" is checked — reverts to the previous state with a rose shake and an error message in an aria-live region. Disabled while pending. Light and dark mode.
 */
'use client';
import { Loader2 } from 'lucide-react';
import { useId, useState } from 'react';

export function AsyncSwitch() {
  const id = useId();
  const [on, setOn] = useState(false);
  const [pending, setPending] = useState(false);
  const [fail, setFail] = useState(false);
  const [message, setMessage] = useState('');

  function toggle() {
    setPending(true);
    setMessage('');
    window.setTimeout(() => {
      setPending(false);
      if (fail) setMessage('Could not reach the server. Try again.');
      else { setOn((value) => !value); setMessage(on ? 'Public link disabled.' : 'Public link enabled.'); }
    }, 900);
  }

  return (
    <div className="w-full max-w-xs rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <style>{`@keyframes pui-shake{25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}`}</style>
      <div className="flex items-center justify-between gap-3">
        <span id={id} className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Public share link</span>
        <button type="button" role="switch" aria-checked={on} aria-labelledby={id} aria-busy={pending} disabled={pending} onClick={toggle} className={`relative h-7 w-12 rounded-full outline-none transition focus-visible:ring-2 focus-visible:ring-teal-500 disabled:cursor-wait ${on ? 'bg-teal-600' : 'bg-zinc-300 dark:bg-zinc-700'} ${message.startsWith('Could') ? 'motion-safe:animate-[pui-shake_.3s]' : ''}`}>
          <span className={`absolute top-1 grid size-5 place-items-center rounded-full bg-white shadow transition-transform ${on ? 'translate-x-6' : 'translate-x-1'}`}>
            {pending && <Loader2 aria-hidden className="size-3.5 text-zinc-500 motion-safe:animate-spin" />}
          </span>
        </button>
      </div>
      <label className="mt-4 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400"><input type="checkbox" checked={fail} onChange={(event) => setFail(event.target.checked)} className="accent-rose-600" />Simulate failure</label>
      <p aria-live="polite" className={`mt-2 min-h-4 text-xs ${message.startsWith('Could') ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>{pending ? 'Saving…' : message}</p>
    </div>
  );
}
