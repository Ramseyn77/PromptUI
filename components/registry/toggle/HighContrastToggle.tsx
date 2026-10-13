/**
 * @registry
 * name: High Contrast Toggle
 * category: Toggle
 * style: Minimal
 * tags: recent
 * description: Interrupteurs d'accessibilité : contraste élevé, réduction des animations, soulignement des liens et focus renforcé, appliqués à un aperçu.
 * prompt: Create an accessibility preferences panel with four switches (role=switch with visible labels and descriptions): High contrast (preview switches to black/white with yellow focus and thicker borders), Reduce motion (stops a looping animated element in the preview), Underline links (adds underlines), Larger focus ring (thicker outline on the preview button when focused); the preview card updates live; a "Reset" link restores defaults; changes announced via aria-live. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const options = [['contrast', 'High contrast', 'Stronger colors and borders'], ['motion', 'Reduce motion', 'Stop decorative animations'], ['links', 'Underline links', 'Make every link easy to spot'], ['focus', 'Larger focus ring', 'Thicker outline on focused elements']] as const;
type Key = (typeof options)[number][0];
const defaults: Record<Key, boolean> = { contrast: false, motion: false, links: false, focus: false };

export function HighContrastToggle() {
  const [prefs, setPrefs] = useState(defaults);
  const [status, setStatus] = useState('');
  const set = (key: Key, value: boolean, label: string) => { setPrefs({ ...prefs, [key]: value }); setStatus(`${label} ${value ? 'on' : 'off'}`); };

  return (
    <div className="grid w-full max-w-2xl gap-4 rounded-2xl border border-zinc-200 bg-white p-5 md:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-950">
      <style>{`@keyframes pui-a11y-bob { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }`}</style>
      <div>
        <div className="flex items-center justify-between"><h3 className="font-semibold text-zinc-950 dark:text-white">Accessibility</h3><button type="button" onClick={() => { setPrefs(defaults); setStatus('Preferences reset'); }} className="text-xs text-zinc-500 underline">Reset</button></div>
        <ul className="mt-3 space-y-3">
          {options.map(([key, label, hint]) => (
            <li key={key}>
              <label className="flex cursor-pointer items-center gap-3">
                <span className="flex-1"><span className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">{label}</span><span className="block text-xs text-zinc-500">{hint}</span></span>
                <input type="checkbox" role="switch" checked={prefs[key]} onChange={(event) => set(key, event.target.checked, label)} className="peer sr-only" />
                <span aria-hidden className="relative h-6 w-10 shrink-0 rounded-full bg-zinc-300 transition peer-checked:bg-zinc-950 peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-4 dark:bg-zinc-700 dark:peer-checked:bg-white dark:peer-checked:after:bg-zinc-950" />
              </label>
            </li>
          ))}
        </ul>
        <p aria-live="polite" className="mt-3 h-4 text-xs text-zinc-500">{status}</p>
      </div>
      <div className={`rounded-xl p-5 transition-colors ${prefs.contrast ? 'border-4 border-black bg-white text-black dark:border-white dark:bg-black dark:text-white' : 'border border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300'}`}>
        <div className="flex items-center gap-3"><span aria-hidden className={`size-8 rounded-full ${prefs.contrast ? 'bg-black dark:bg-white' : 'bg-gradient-to-br from-violet-500 to-pink-500'} ${prefs.motion ? '' : 'motion-safe:animate-[pui-a11y-bob_1.6s_ease-in-out_infinite]'}`} /><p className="font-semibold">Preview</p></div>
        <p className="mt-3 text-sm leading-relaxed">Read our <a href="#" className={`font-medium ${prefs.links ? 'underline underline-offset-2' : 'no-underline'} ${prefs.contrast ? 'text-black dark:text-white' : 'text-indigo-600 dark:text-indigo-400'}`}>accessibility statement</a> or <a href="#" className={`font-medium ${prefs.links ? 'underline underline-offset-2' : 'no-underline'} ${prefs.contrast ? 'text-black dark:text-white' : 'text-indigo-600 dark:text-indigo-400'}`}>contact support</a>.</p>
        <button type="button" className={`mt-4 rounded-lg px-4 py-2 text-sm font-semibold ${prefs.contrast ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-indigo-600 text-white'} ${prefs.focus ? 'focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-amber-400' : 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'}`}>Focus me</button>
      </div>
    </div>
  );
}
