/**
 * @registry
 * name: Icon Knob Switch
 * category: Toggle
 * style: Minimal
 * tags: recent
 * description: Interrupteurs dont le bouton affiche une icône qui change : cadenas, volume, wifi.
 * prompt: Create switches whose knob contains an icon that swaps with a rotate/fade transition when toggled (lock/unlock, volume/mute, wifi/wifi-off); track colors per switch, visible labels, role="switch" + aria-checked. Light and dark mode.
 */
'use client';
import { Lock, LockOpen, Volume2, VolumeX, Wifi, WifiOff, type LucideIcon } from 'lucide-react';
import { useState } from 'react';

const switches: Array<{ label: string; on: LucideIcon; off: LucideIcon; tone: string }> = [
  { label: 'Private', on: Lock, off: LockOpen, tone: 'bg-violet-600' },
  { label: 'Sound', on: Volume2, off: VolumeX, tone: 'bg-teal-600' },
  { label: 'Wi-Fi', on: Wifi, off: WifiOff, tone: 'bg-sky-600' },
];

export function IconKnobSwitch() {
  const [state, setState] = useState([true, false, true]);

  return (
    <div className="space-y-4">
      {switches.map(({ label, on: OnIcon, off: OffIcon, tone }, index) => {
        const checked = state[index];
        return (
          <div key={label} className="flex w-52 items-center justify-between">
            <span id={`icon-switch-${index}`} className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{label}</span>
            <button type="button" role="switch" aria-checked={checked} aria-labelledby={`icon-switch-${index}`} onClick={() => setState((current) => current.map((value, i) => (i === index ? !value : value)))} className={`relative h-8 w-14 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${checked ? tone : 'bg-zinc-300 dark:bg-zinc-700'}`}>
              <span className={`absolute left-1 top-1 grid size-6 place-items-center rounded-full bg-white text-zinc-700 shadow transition-transform duration-300 ${checked ? 'translate-x-6' : ''}`}>
                <OnIcon aria-hidden className={`absolute size-3.5 transition duration-300 ${checked ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} />
                <OffIcon aria-hidden className={`absolute size-3.5 transition duration-300 ${checked ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
