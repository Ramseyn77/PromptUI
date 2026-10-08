/**
 * @registry
 * name: Airplane Mode Toggle
 * category: Toggle
 * style: Glass
 * tags: recent
 * description: Interrupteur mode avion façon centre de contrôle : l'avion décolle dans le pouce et coupe Wi-Fi et Bluetooth.
 * prompt: Create a control-center style airplane mode toggle: a glass tile with a switch (role=switch) whose thumb contains a plane icon that takes off (rotates and slides) when enabled; enabling it dims and disables the Wi-Fi and Bluetooth tiles beside it with "Off" captions (they can be individually re-enabled); a status line announces the change via aria-live; motion reduced with prefers-reduced-motion. Light and dark mode.
 */
'use client';
import { Bluetooth, Plane, Wifi } from 'lucide-react';
import { useState } from 'react';

export function AirplaneModeToggle() {
  const [airplane, setAirplane] = useState(false);
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);

  function toggleAirplane() {
    const next = !airplane;
    setAirplane(next);
    setWifi(!next);
    setBluetooth(!next);
  }

  const tile = (on: boolean) => `flex flex-col items-start gap-2 rounded-2xl p-3 text-left text-xs font-medium backdrop-blur-xl transition ${on ? 'bg-sky-500 text-white' : 'bg-white/50 text-zinc-700 dark:bg-white/10 dark:text-zinc-300'}`;

  return (
    <div className="w-full max-w-xs rounded-[2rem] bg-[linear-gradient(135deg,#a5b4fc,#f0abfc,#fdba74)] p-4 dark:bg-[linear-gradient(135deg,#1e1b4b,#4a044e,#431407)]">
      <div className="rounded-3xl border border-white/40 bg-white/30 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-black/30">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-zinc-900 dark:text-white">Airplane mode</span>
          <button type="button" role="switch" aria-checked={airplane} aria-label="Airplane mode" onClick={toggleAirplane} className={`relative h-8 w-14 rounded-full transition-colors ${airplane ? 'bg-orange-500' : 'bg-zinc-900/20 dark:bg-white/20'}`}>
            <span className={`absolute top-1 grid size-6 place-items-center rounded-full bg-white shadow transition-all duration-500 motion-reduce:duration-0 ${airplane ? 'left-7' : 'left-1'}`}>
              <Plane aria-hidden className={`size-3.5 transition-transform duration-500 motion-reduce:duration-0 ${airplane ? '-rotate-45 text-orange-500' : 'rotate-0 text-zinc-500'}`} />
            </span>
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button type="button" aria-pressed={wifi} onClick={() => setWifi(!wifi)} className={tile(wifi)}><Wifi aria-hidden className="size-5" /><span>Wi-Fi<span className="block font-normal opacity-75">{wifi ? 'Home 5G' : 'Off'}</span></span></button>
          <button type="button" aria-pressed={bluetooth} onClick={() => setBluetooth(!bluetooth)} className={tile(bluetooth)}><Bluetooth aria-hidden className="size-5" /><span>Bluetooth<span className="block font-normal opacity-75">{bluetooth ? 'On' : 'Off'}</span></span></button>
        </div>
        <p aria-live="polite" className="mt-3 text-xs text-zinc-700 dark:text-zinc-300">{airplane ? `Airplane mode on${wifi || bluetooth ? ' · some radios re-enabled' : ' · all radios off'}` : 'Connected'}</p>
      </div>
    </div>
  );
}
