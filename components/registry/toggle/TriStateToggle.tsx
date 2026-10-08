/**
 * @registry
 * name: Tri State Toggle
 * category: Toggle
 * style: Gradient
 * tags: recent
 * description: Bascule à trois positions Off / Auto / On avec curseur qui glisse et couleur adaptée à chaque état.
 * prompt: Create a three-position toggle (Off / Auto / On) as a radiogroup: a sliding thumb moves under the active label, the track color changes per state (zinc / sky / emerald gradient), and a caption explains the current mode. Arrow keys move between options via native radios. Light and dark mode.
 */
'use client';
import { useId, useState } from 'react';

const states = [
  { value: 'Off', caption: 'Notifications are muted.', track: 'from-zinc-400 to-zinc-500' },
  { value: 'Auto', caption: 'Muted during your focus hours.', track: 'from-sky-400 to-indigo-500' },
  { value: 'On', caption: 'You will be notified instantly.', track: 'from-emerald-400 to-teal-500' },
] as const;

export function TriStateToggle() {
  const [index, setIndex] = useState(1);
  const id = useId();

  return (
    <div className="w-full max-w-xs">
      <p id={id} className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Notifications</p>
      <div role="radiogroup" aria-labelledby={id} className={`relative mt-2 grid grid-cols-3 rounded-full bg-gradient-to-r p-1 transition-colors ${states[index].track}`}>
        <span aria-hidden className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-full bg-white shadow transition-transform duration-300 dark:bg-zinc-950" style={{ transform: `translateX(${index * 100}%)` }} />
        {states.map((state, i) => (
          <label key={state.value} className="relative cursor-pointer rounded-full py-1.5 text-center text-sm font-semibold has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-white">
            <input type="radio" name={id} className="sr-only" checked={index === i} onChange={() => setIndex(i)} />
            <span className={index === i ? 'text-zinc-900 dark:text-zinc-100' : 'text-white'}>{state.value}</span>
          </label>
        ))}
      </div>
      <p aria-live="polite" className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{states[index].caption}</p>
    </div>
  );
}
