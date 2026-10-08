/**
 * @registry
 * name: Weather Widget
 * category: Dashboard
 * style: Gradient
 * tags: recent
 * description: Widget météo avec ciel en dégradé, température, prévisions horaires et bascule °C / °F.
 * prompt: Create a weather widget card: a sky gradient background, city, big temperature with condition icon, feels-like/humidity/wind row, a horizontally scrollable hourly forecast (6 hours with icons and temps), and a °C/°F toggle (aria-pressed) converting all values. White text with drop shadows for contrast in both themes.
 */
'use client';
import { Cloud, CloudRain, CloudSun, Droplets, Sun, Wind, type LucideIcon } from 'lucide-react';
import { useState } from 'react';

const hourly: [string, LucideIcon, number][] = [['Now', Sun, 29], ['14h', Sun, 31], ['15h', CloudSun, 31], ['16h', Cloud, 30], ['17h', CloudRain, 27], ['18h', CloudRain, 26]];

export function WeatherWidget() {
  const [fahrenheit, setFahrenheit] = useState(false);
  const t = (celsius: number) => Math.round(fahrenheit ? celsius * 1.8 + 32 : celsius);

  return (
    <section className="w-full max-w-xs rounded-3xl bg-gradient-to-b from-sky-600 via-sky-500 to-amber-400 p-5 text-white shadow-xl shadow-sky-500/20">
      <div className="flex items-start justify-between">
        <div><p className="font-semibold drop-shadow">Dakar</p><p className="text-xs text-white/90">Sunday, 13:20</p></div>
        <button type="button" aria-pressed={fahrenheit} aria-label="Show Fahrenheit" onClick={() => setFahrenheit((value) => !value)} className="rounded-full bg-white/25 px-2.5 py-1 text-xs font-semibold backdrop-blur hover:bg-white/35">°{fahrenheit ? 'F' : 'C'}</button>
      </div>
      <div className="mt-4 flex items-center gap-3"><Sun aria-hidden className="size-14 text-amber-200 drop-shadow" /><p className="text-6xl font-light tabular-nums drop-shadow">{t(29)}°</p></div>
      <p className="mt-1 text-sm text-white/95 drop-shadow">Sunny · H {t(31)}° L {t(24)}°</p>
      <div className="mt-4 flex gap-4 text-xs text-white/95"><span>Feels {t(32)}°</span><span className="flex items-center gap-1"><Droplets aria-hidden className="size-3.5" />64%</span><span className="flex items-center gap-1"><Wind aria-hidden className="size-3.5" />14 km/h</span></div>
      <ul className="mt-4 flex gap-2 overflow-x-auto rounded-2xl bg-sky-900/25 p-2 backdrop-blur" data-lenis-prevent>
        {hourly.map(([hour, Icon, temp]) => <li key={hour} className="flex min-w-12 flex-col items-center gap-1 py-1 text-xs"><span className="text-white/90">{hour}</span><Icon aria-hidden className="size-4" /><span className="font-semibold tabular-nums">{t(temp)}°</span></li>)}
      </ul>
    </section>
  );
}
