/**
 * @registry
 * name: Habit Tracker Board
 * category: Boards
 * style: Minimal
 * tags: recent
 * description: Tableau d'habitudes sur la semaine : cases à cocher par jour, séries en cours et taux de réussite par habitude.
 * prompt: Create a weekly habit tracker board: rows of habits (emoji + name), 7 day columns with round toggle buttons (aria-pressed, aria-label "Read on Wednesday"), today's column highlighted, a streak counter with flame per habit computed from consecutive checks up to today, and a completion percentage bar per row. Horizontal scroll on small screens. Light and dark mode.
 */
'use client';
import { Check } from 'lucide-react';
import { useState } from 'react';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const today = 3;

export function HabitTrackerBoard() {
  const [habits, setHabits] = useState([
    { emoji: '📚', name: 'Read 20 min', done: [true, true, true, false, false, false, false] },
    { emoji: '🏃', name: 'Run', done: [true, false, true, true, false, false, false] },
    { emoji: '💧', name: '2L of water', done: [true, true, true, true, false, false, false] },
    { emoji: '🧘', name: 'Meditate', done: [false, true, false, false, false, false, false] },
  ]);

  const toggle = (row: number, day: number) => setHabits((list) => list.map((habit, i) => (i === row ? { ...habit, done: habit.done.map((value, d) => (d === day ? !value : value)) } : habit)));
  const streak = (done: boolean[]) => { let count = 0; for (let d = today; d >= 0 && done[d]; d--) count++; return count; };

  return (
    <div className="w-full max-w-2xl overflow-x-auto rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950" data-lenis-prevent>
      <table className="w-full min-w-[34rem] text-sm">
        <caption className="mb-3 text-left font-semibold text-zinc-900 dark:text-zinc-100">This week</caption>
        <thead><tr><th className="text-left text-xs font-medium text-zinc-500">Habit</th>{days.map((day, d) => <th key={day} className={`pb-2 text-xs font-medium ${d === today ? 'text-teal-700 dark:text-teal-400' : 'text-zinc-500'}`}>{day}</th>)}<th className="text-right text-xs font-medium text-zinc-500">Streak</th></tr></thead>
        <tbody>
          {habits.map((habit, row) => {
            const rate = Math.round((habit.done.filter(Boolean).length / (today + 1)) * 100);
            return (
              <tr key={habit.name} className="border-t border-zinc-100 dark:border-zinc-900">
                <td className="py-2.5 pr-2"><span className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100"><span aria-hidden>{habit.emoji}</span>{habit.name}</span><span className="mt-1 block h-1 w-24 rounded-full bg-zinc-100 dark:bg-zinc-800"><span className="block h-full rounded-full bg-teal-500" style={{ width: `${Math.min(100, rate)}%` }} /></span></td>
                {habit.done.map((value, day) => (
                  <td key={day} className={`text-center ${day === today ? 'bg-teal-50/60 dark:bg-teal-400/5' : ''}`}>
                    <button type="button" aria-pressed={value} aria-label={`${habit.name} on ${days[day]}`} disabled={day > today} onClick={() => toggle(row, day)} className={`grid size-7 place-items-center rounded-full border-2 transition disabled:opacity-30 ${value ? 'border-teal-600 bg-teal-600 text-white' : 'border-zinc-300 hover:border-teal-500 dark:border-zinc-700'}`}>{value && <Check aria-hidden className="size-3.5" />}</button>
                  </td>
                ))}
                <td className="text-right font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">{streak(habit.done) > 0 ? `🔥 ${streak(habit.done)}` : '–'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
