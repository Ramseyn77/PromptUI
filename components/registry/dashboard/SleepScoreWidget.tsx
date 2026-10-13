/**
 * @registry
 * name: Sleep Score Widget
 * category: Dashboard
 * style: Dark
 * tags: recent
 * description: Widget de sommeil nocturne : score en anneau, hypnogramme des phases (éveil, paradoxal, léger, profond), durée et tendance sur 7 nuits.
 * prompt: Create a dark sleep tracking widget: a ring showing the sleep score (84) with a label (Good), total sleep "7h 32m" and bedtime/wake time; a hypnogram as an SVG step chart across the night with four stage levels (Awake, REM, Light, Deep) colored differently, hour labels, and a legend with minutes per stage; a 7-night mini bar trend where tapping a night switches the displayed night (aria-pressed); deterministic data. Dark in both themes.
 */
'use client';
import { useId, useState } from 'react';

const nights = [
  { day: 'Mon', score: 72, total: '6h 48m', stages: [3, 2, 1, 0, 1, 2, 1, 0, 1, 2, 3, 2, 1, 2, 2, 3] },
  { day: 'Tue', score: 78, total: '7h 05m', stages: [3, 2, 1, 0, 0, 1, 2, 1, 0, 1, 2, 2, 1, 2, 3, 3] },
  { day: 'Wed', score: 69, total: '6h 21m', stages: [3, 3, 2, 1, 0, 1, 2, 3, 2, 1, 2, 2, 3, 2, 2, 3] },
  { day: 'Thu', score: 84, total: '7h 32m', stages: [3, 2, 1, 0, 0, 1, 2, 1, 0, 0, 1, 2, 1, 2, 1, 3] },
  { day: 'Fri', score: 61, total: '5h 54m', stages: [3, 3, 2, 1, 2, 3, 2, 1, 2, 2, 3, 2, 2, 3, 3, 3] },
  { day: 'Sat', score: 88, total: '8h 10m', stages: [3, 2, 1, 0, 0, 0, 1, 2, 1, 0, 1, 1, 2, 1, 2, 3] },
  { day: 'Sun', score: 81, total: '7h 40m', stages: [3, 2, 1, 0, 0, 1, 2, 1, 1, 0, 1, 2, 2, 1, 2, 3] },
];
const levels = [['Deep', '#6366f1'], ['Light', '#38bdf8'], ['REM', '#a78bfa'], ['Awake', '#f472b6']] as const;
const circumference = 2 * 3.1416 * 30;

export function SleepScoreWidget() {
  const gradId = `pui-sleep-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const [index, setIndex] = useState(3);
  const night = nights[index];
  const step = 280 / night.stages.length;
  const y = (stage: number) => 90 - stage * 26;
  const path = night.stages.map((stage, i) => `${i === 0 ? 'M' : 'L'}${(10 + i * step).toFixed(1)},${y(stage)} L${(10 + (i + 1) * step).toFixed(1)},${y(stage)}`).join(' ');
  const minutes = levels.map((_, level) => night.stages.filter((stage) => stage === level).length * 28);

  return (
    <section className="w-full max-w-md rounded-3xl bg-zinc-950 p-5 text-zinc-300 ring-1 ring-white/10">
      <div className="flex items-center gap-4">
        <div className="relative size-20 shrink-0">
          <svg viewBox="0 0 72 72" className="size-20 -rotate-90" aria-hidden><circle cx="36" cy="36" r="30" fill="none" strokeWidth="7" className="stroke-white/10" /><circle cx="36" cy="36" r="30" fill="none" strokeWidth="7" strokeLinecap="round" stroke={`url(#${gradId})`} strokeDasharray={circumference.toFixed(1)} strokeDashoffset={(circumference * (1 - night.score / 100)).toFixed(1)} className="transition-[stroke-dashoffset] duration-500" /><defs><linearGradient id={gradId}><stop offset="0" stopColor="#818cf8" /><stop offset="1" stopColor="#f472b6" /></linearGradient></defs></svg>
          <span className="absolute inset-0 grid place-items-center text-center"><span><span className="block text-2xl font-bold text-white">{night.score}</span><span className="text-[10px]">{night.score >= 80 ? 'Good' : night.score >= 70 ? 'Fair' : 'Poor'}</span></span></span>
        </div>
        <div><p className="text-xs text-zinc-500">{night.day} night</p><p className="text-2xl font-semibold text-white">{night.total}</p><p className="text-xs">23:12 → 06:44</p></div>
      </div>
      <svg viewBox="0 0 300 110" className="mt-4 w-full" role="img" aria-label={`Sleep stages for ${night.day}: ${levels.map(([name], level) => `${name} ${minutes[level]} minutes`).join(', ')}`}>
        {levels.map(([name], level) => <text key={name} x="0" y={y(level) + 3} className="fill-zinc-600 text-[7px]">{name[0]}</text>)}
        <path d={path} fill="none" stroke={`url(#${gradId})`} strokeWidth="3" strokeLinejoin="round" />
        {['23h', '1h', '3h', '5h', '7h'].map((label, i) => <text key={label} x={10 + i * 70} y="108" className="fill-zinc-600 text-[8px]">{label}</text>)}
      </svg>
      <ul className="mt-2 grid grid-cols-4 gap-2 text-center text-[11px]">{levels.map(([name, color], level) => <li key={name}><span className="mx-auto mb-1 block h-1 w-6 rounded-full" style={{ background: color }} />{name}<span className="block tabular-nums text-white">{minutes[level]}m</span></li>)}</ul>
      <div role="group" aria-label="Choose night" className="mt-5 flex items-end gap-2 border-t border-white/10 pt-4">
        {nights.map((item, i) => <button key={item.day} type="button" aria-pressed={i === index} aria-label={`${item.day}, score ${item.score}`} onClick={() => setIndex(i)} className="flex flex-1 flex-col items-center gap-1"><span className={`w-full rounded-md transition ${i === index ? 'bg-gradient-to-t from-indigo-500 to-pink-400' : 'bg-white/15 hover:bg-white/25'}`} style={{ height: `${(item.score - 40) * 0.9}px` }} /><span className={`text-[10px] ${i === index ? 'text-white' : ''}`}>{item.day}</span></button>)}
      </div>
    </section>
  );
}
