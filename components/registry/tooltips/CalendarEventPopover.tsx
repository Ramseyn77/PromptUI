/**
 * @registry
 * name: Calendar Event Popover
 * category: Tooltips
 * style: SaaS
 * tags: featured, recent
 * description: Popover d'événement de calendrier : clic sur un créneau de la semaine pour voir détails, participants, lien visio, RSVP et actions.
 * prompt: Create a week calendar strip (Mon–Fri columns with 3 colored event blocks each at fixed times) where clicking or pressing Enter on an event opens an anchored popover card (the Wednesday standup is open by default) showing color bar, title, date and time, location/video link with a "Join" button, attendees as stacked initials with RSVP counts, an RSVP segmented control (Yes / Maybe / No) and Edit / Delete icon actions; Escape or clicking outside closes and returns focus to the event. Light and dark mode.
 */
'use client';
import { Pencil, Trash2, Video, X } from 'lucide-react';
import { useRef, useState } from 'react';

const days = ['Mon 12', 'Tue 13', 'Wed 14', 'Thu 15', 'Fri 16'];
const events = [
  { id: 1, day: 0, start: 9, length: 1, title: 'Planning', color: 'bg-indigo-500', who: ['AD', 'LM', 'MT'] },
  { id: 2, day: 2, start: 10, length: 0.5, title: 'Standup', color: 'bg-emerald-500', who: ['AD', 'LM', 'MT', 'KM', 'IR'] },
  { id: 3, day: 2, start: 14, length: 1.5, title: 'Design review', color: 'bg-pink-500', who: ['AD', 'IR'] },
  { id: 4, day: 3, start: 11, length: 1, title: 'Customer call · Kora', color: 'bg-amber-500', who: ['KM', 'AD'] },
  { id: 5, day: 4, start: 16, length: 1, title: 'Demo day', color: 'bg-violet-500', who: ['AD', 'LM', 'MT', 'KM'] },
];
const time = (value: number) => `${Math.floor(value)}:${value % 1 ? '30' : '00'}`;

export function CalendarEventPopover() {
  const [open, setOpen] = useState<number | null>(2);
  const [rsvp, setRsvp] = useState<Record<number, string>>({});
  const refs = useRef<Record<number, HTMLButtonElement | null>>({});
  const event = events.find((item) => item.id === open);
  const close = () => { const id = open; setOpen(null); if (id !== null) refs.current[id]?.focus(); };

  return (
    <div className="relative w-full max-w-2xl overflow-x-auto rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950" onKeyDown={(keyEvent) => { if (keyEvent.key === 'Escape') close(); }} data-lenis-prevent>
      <div className="grid min-w-[34rem] grid-cols-[2.5rem_repeat(5,1fr)] gap-1">
        <span />{days.map((day) => <p key={day} className="pb-1 text-center text-xs font-semibold text-zinc-600 dark:text-zinc-400">{day}</p>)}
        <div className="relative h-72">{[9, 11, 13, 15, 17].map((hour) => <span key={hour} className="absolute right-1 text-[10px] text-zinc-400" style={{ top: `${((hour - 9) / 9) * 100}%` }}>{hour}:00</span>)}</div>
        {days.map((day, dayIndex) => (
          <div key={day} className="relative h-72 rounded-lg bg-zinc-50 dark:bg-zinc-900">
            {events.filter((item) => item.day === dayIndex).map((item) => (
              <button key={item.id} ref={(node) => { refs.current[item.id] = node; }} type="button" aria-haspopup="dialog" aria-expanded={open === item.id} onClick={() => setOpen(open === item.id ? null : item.id)} className={`absolute inset-x-1 overflow-hidden rounded-md px-1.5 py-1 text-left text-[11px] font-medium text-white ${item.color} ${open === item.id ? 'ring-2 ring-zinc-950 ring-offset-1 dark:ring-white' : ''}`} style={{ top: `${((item.start - 9) / 9) * 100}%`, height: `${(item.length / 9) * 100}%`, minHeight: '1.5rem' }}>{item.title}</button>
            ))}
            {event && event.day === dayIndex && (
              <div role="dialog" aria-label={event.title} className={`absolute z-20 w-64 rounded-2xl border border-zinc-200 bg-white p-4 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900 ${dayIndex >= 3 ? 'right-full mr-2' : 'left-full ml-2'}`} style={{ top: 0 }}>
                <div className="flex items-start gap-2"><span className={`mt-1 h-8 w-1 rounded-full ${event.color}`} /><div className="flex-1"><p className="font-semibold text-zinc-950 dark:text-white">{event.title}</p><p className="text-xs text-zinc-500">{days[event.day].split(' ')[0]}, Oct {days[event.day].split(' ')[1]} · {time(event.start)}–{time(event.start + event.length)}</p></div><button type="button" aria-label="Edit event" className="grid size-7 place-items-center rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"><Pencil aria-hidden className="size-3.5" /></button><button type="button" aria-label="Delete event" className="grid size-7 place-items-center rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"><Trash2 aria-hidden className="size-3.5" /></button><button type="button" aria-label="Close" onClick={close} className="grid size-7 place-items-center rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"><X aria-hidden className="size-3.5" /></button></div>
                <a href="#" className="mt-3 flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white"><Video aria-hidden className="size-3.5" />Join video call</a>
                <div className="mt-3 flex items-center gap-2"><ul className="flex -space-x-1.5">{event.who.map((initials) => <li key={initials} className="grid size-6 place-items-center rounded-full bg-zinc-200 text-[9px] font-bold text-zinc-700 ring-2 ring-white dark:bg-zinc-700 dark:text-zinc-200 dark:ring-zinc-900">{initials}</li>)}</ul><span className="text-xs text-zinc-500">{event.who.length} guests · {event.who.length - 1} yes</span></div>
                <div role="radiogroup" aria-label="Going?" className="mt-3 grid grid-cols-3 gap-1 rounded-lg bg-zinc-100 p-0.5 text-xs dark:bg-zinc-800">{['Yes', 'Maybe', 'No'].map((value) => <button key={value} type="button" role="radio" aria-checked={rsvp[event.id] === value} onClick={() => setRsvp({ ...rsvp, [event.id]: value })} className={`rounded-md py-1 ${rsvp[event.id] === value ? 'bg-white font-semibold text-zinc-950 shadow-sm dark:bg-zinc-600 dark:text-white' : 'text-zinc-600 dark:text-zinc-400'}`}>{value}</button>)}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
