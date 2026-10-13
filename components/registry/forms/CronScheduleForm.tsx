/**
 * @registry
 * name: Cron Schedule Form
 * category: Forms
 * style: Dark
 * tags: recent
 * description: Planificateur de tâche : fréquence, jours, heure et fuseau traduits en expression cron et en phrase lisible, avec prochaines exécutions.
 * prompt: Create a job schedule form on a dark panel: frequency segmented control (Hourly, Daily, Weekly, Monthly), weekday toggle chips shown for Weekly, a day-of-month select for Monthly, an hour and minute select, and a timezone select; it renders the generated cron expression in a mono pill with a Copy button, a human sentence ("At 09:30, on Mon and Thu (UTC)") and the next three run labels computed deterministically from a fixed reference date. Dark in both themes.
 */
'use client';
import { useId, useState } from 'react';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const pad = (value: number) => String(value).padStart(2, '0');

export function CronScheduleForm() {
  const uid = useId();
  const [frequency, setFrequency] = useState<'Hourly' | 'Daily' | 'Weekly' | 'Monthly'>('Weekly');
  const [weekdays, setWeekdays] = useState<number[]>([0, 3]);
  const [monthDay, setMonthDay] = useState(1);
  const [hour, setHour] = useState(9);
  const [minute, setMinute] = useState(30);
  const [zone, setZone] = useState('UTC');

  const cron = frequency === 'Hourly' ? `${minute} * * * *` : frequency === 'Daily' ? `${minute} ${hour} * * *` : frequency === 'Weekly' ? `${minute} ${hour} * * ${weekdays.map((day) => (day + 1) % 7).sort().join(',') || '*'}` : `${minute} ${hour} ${monthDay} * *`;
  const sentence = frequency === 'Hourly' ? `Every hour at minute ${minute}` : `At ${pad(hour)}:${pad(minute)}${frequency === 'Weekly' ? `, on ${weekdays.length ? weekdays.map((day) => days[day]).join(' and ') : 'every day'}` : frequency === 'Monthly' ? `, on day ${monthDay} of the month` : ', every day'} (${zone})`;
  // Next runs from a fixed reference: Monday Oct 12, 2026, 08:00.
  const next = frequency === 'Hourly' ? ['08', '09', '10'].map((h) => `Oct 12, ${h}:${pad(minute)}`) : frequency === 'Daily' ? [12, 13, 14].map((d) => `Oct ${d}, ${pad(hour)}:${pad(minute)}`) : frequency === 'Monthly' ? ['Nov', 'Dec', 'Jan'].map((m) => `${m} ${monthDay}, ${pad(hour)}:${pad(minute)}`) : Array.from({ length: 21 }, (_, offset) => offset).filter((offset) => weekdays.includes(offset % 7)).slice(0, 3).map((offset) => `${days[offset % 7]} ${offset + 12 > 31 ? `Nov ${offset - 19}` : `Oct ${offset + 12}`}, ${pad(hour)}:${pad(minute)}`);
  const select = 'rounded-lg bg-white/5 px-2 py-1.5 text-sm text-white ring-1 ring-white/10 outline-none focus:ring-white/30';

  return (
    <form onSubmit={(event) => event.preventDefault()} className="w-full max-w-md rounded-2xl bg-zinc-950 p-5 text-zinc-300 ring-1 ring-white/10">
      <p className="text-sm font-semibold text-white">Run “Sync invoices”</p>
      <div role="radiogroup" aria-label="Frequency" className="mt-3 grid grid-cols-4 rounded-lg bg-white/5 p-1 text-xs">{(['Hourly', 'Daily', 'Weekly', 'Monthly'] as const).map((item) => <button key={item} type="button" role="radio" aria-checked={frequency === item} onClick={() => setFrequency(item)} className={`rounded-md py-1.5 font-medium ${frequency === item ? 'bg-white text-zinc-950' : 'hover:text-white'}`}>{item}</button>)}</div>
      {frequency === 'Weekly' && <div role="group" aria-label="Days" className="mt-3 flex flex-wrap gap-1.5">{days.map((day, index) => <button key={day} type="button" aria-pressed={weekdays.includes(index)} onClick={() => setWeekdays((list) => (list.includes(index) ? list.filter((item) => item !== index) : [...list, index].sort()))} className={`rounded-full px-2.5 py-1 text-xs font-medium ${weekdays.includes(index) ? 'bg-emerald-400 text-zinc-950' : 'bg-white/5 ring-1 ring-white/10'}`}>{day}</button>)}</div>}
      <div className="mt-3 flex flex-wrap items-end gap-2">
        {frequency === 'Monthly' && <label className="text-xs">Day<select value={monthDay} onChange={(event) => setMonthDay(Number(event.target.value))} className={`${select} mt-1 block`}>{Array.from({ length: 28 }, (_, index) => <option key={index} value={index + 1} className="bg-zinc-900">{index + 1}</option>)}</select></label>}
        {frequency !== 'Hourly' && <label htmlFor={`${uid}-hour`} className="text-xs">Hour<select id={`${uid}-hour`} value={hour} onChange={(event) => setHour(Number(event.target.value))} className={`${select} mt-1 block`}>{Array.from({ length: 24 }, (_, index) => <option key={index} value={index} className="bg-zinc-900">{pad(index)}</option>)}</select></label>}
        <label htmlFor={`${uid}-minute`} className="text-xs">Minute<select id={`${uid}-minute`} value={minute} onChange={(event) => setMinute(Number(event.target.value))} className={`${select} mt-1 block`}>{[0, 15, 30, 45].map((value) => <option key={value} value={value} className="bg-zinc-900">{pad(value)}</option>)}</select></label>
        <label htmlFor={`${uid}-zone`} className="text-xs">Timezone<select id={`${uid}-zone`} value={zone} onChange={(event) => setZone(event.target.value)} className={`${select} mt-1 block`}>{['UTC', 'Africa/Lagos', 'Europe/Paris', 'America/New_York'].map((value) => <option key={value} className="bg-zinc-900">{value}</option>)}</select></label>
      </div>
      <div className="mt-4 rounded-xl bg-white/5 p-3">
        <div className="flex items-center gap-2"><code className="flex-1 rounded-md bg-black/40 px-2 py-1 font-mono text-sm text-emerald-300">{cron}</code><button type="button" onClick={() => navigator.clipboard?.writeText(cron).catch(() => {})} className="rounded-md px-2 py-1 text-xs ring-1 ring-white/10 hover:bg-white/5">Copy</button></div>
        <p aria-live="polite" className="mt-2 text-sm text-white">{sentence}</p>
        <p className="mt-2 text-[11px] uppercase tracking-wider text-zinc-500">Next runs</p>
        <ul className="mt-1 space-y-0.5 text-xs tabular-nums">{next.map((run) => <li key={run}>{run}</li>)}{!next.length && <li>Pick at least one day</li>}</ul>
      </div>
    </form>
  );
}
