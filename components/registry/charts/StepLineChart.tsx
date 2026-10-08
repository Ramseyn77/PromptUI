/**
 * @registry
 * name: Step Line Chart
 * category: Charts
 * style: Dark
 * tags: recent
 * description: Courbe en escalier du nombre de serveurs actifs, avec annotations d'événements (déploiement, incident).
 * prompt: Create a step line chart (MUI step curve) of active servers over 24 hours on a dark panel: horizontal-then-vertical segments, a translucent fill under the line, dashed vertical annotation markers with labels ("Deploy v4.2", "Incident"), hour ticks every 6h and a current value badge. sr-only summary. Dark in both themes.
 */
import { useId } from 'react';

const values = [8, 8, 8, 10, 10, 12, 12, 12, 16, 16, 16, 14, 14, 20, 20, 18, 18, 18, 12, 12, 10, 10, 9, 9];
const notes = [{ hour: 8, label: 'Deploy v4.2', color: '#2dd4bf' }, { hour: 15, label: 'Incident', color: '#fb7185' }];

export function StepLineChart() {
  const fillId = `pui-step-fill-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const x = (hour: number) => 20 + (hour / 23) * 310;
  const y = (value: number) => 160 - (value / 24) * 140;
  const path = values.reduce((d, value, hour) => (hour === 0 ? `M${x(0)},${y(value)}` : `${d} H${x(hour).toFixed(1)} V${y(value)}`), '');

  return (
    <section className="w-full max-w-lg rounded-2xl bg-zinc-950 p-5 text-white ring-1 ring-white/10">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Active servers · 24h</h3>
        <span className="rounded-full bg-teal-400/15 px-2 py-0.5 text-xs font-semibold text-teal-300">Now {values[values.length - 1]}</span>
      </div>
      <svg viewBox="0 0 340 185" aria-hidden className="mt-3 w-full">
        <defs><linearGradient id={fillId} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#2dd4bf" stopOpacity=".35" /><stop offset="1" stopColor="#2dd4bf" stopOpacity="0" /></linearGradient></defs>
        {[0, 8, 16, 24].map((tick) => <g key={tick}><line x1="20" x2="330" y1={y(tick)} y2={y(tick)} stroke="#ffffff14" /><text x="14" y={y(tick) + 3} textAnchor="end" fill="#71717a" fontSize="8">{tick}</text></g>)}
        <path d={`${path} H${x(23)} V160 H${x(0)} Z`} fill={`url(#${fillId})`} />
        <path d={path} fill="none" stroke="#2dd4bf" strokeWidth="2" />
        {notes.map((note) => <g key={note.label}><line x1={x(note.hour)} x2={x(note.hour)} y1="14" y2="160" stroke={note.color} strokeDasharray="3 3" /><text x={x(note.hour) + 4} y="22" fill={note.color} fontSize="8" fontWeight="600">{note.label}</text></g>)}
        {[0, 6, 12, 18, 23].map((hour) => <text key={hour} x={x(hour)} y="178" textAnchor="middle" fill="#71717a" fontSize="8">{String(hour).padStart(2, '0')}:00</text>)}
      </svg>
      <p className="sr-only">Active servers peaked at 20 around 13:00 after the v4.2 deploy, and fell back to 9 by midnight after an incident at 15:00.</p>
    </section>
  );
}
