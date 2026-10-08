/**
 * @registry
 * name: Timetable Table
 * category: Tables
 * style: Gradient
 * tags: recent
 * description: Emploi du temps hebdomadaire en tableau avec cours colorés sur plusieurs créneaux et colonne du jour surlignée.
 * prompt: Create a weekly timetable as a real table: time rows (08:00–14:00) × day columns (Mon–Fri) with th scope attributes; sessions span multiple rows via rowSpan and are colored by subject with room labels; today's column is highlighted and a legend explains colors; horizontal scroll on mobile. Light and dark mode.
 */
const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const subjects = { Design: 'bg-violet-100 text-violet-900 dark:bg-violet-500/20 dark:text-violet-100', Code: 'bg-teal-100 text-teal-900 dark:bg-teal-500/20 dark:text-teal-100', Writing: 'bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-100' } as const;
const sessions: Record<string, { subject: keyof typeof subjects; room: string; span: number }> = {
  'Mon-08:00': { subject: 'Design', room: 'A12', span: 2 }, 'Mon-11:00': { subject: 'Writing', room: 'B3', span: 1 },
  'Tue-09:00': { subject: 'Code', room: 'Lab 1', span: 3 }, 'Wed-08:00': { subject: 'Writing', room: 'B3', span: 1 },
  'Wed-10:00': { subject: 'Design', room: 'A12', span: 2 }, 'Thu-08:00': { subject: 'Code', room: 'Lab 2', span: 2 },
  'Thu-12:00': { subject: 'Design', room: 'Studio', span: 2 }, 'Fri-09:00': { subject: 'Code', room: 'Lab 1', span: 2 },
};

export function TimetableTable() {
  const today = 'Wed';
  const covered = new Set<string>();
  Object.entries(sessions).forEach(([key, session]) => { const [day, hour] = key.split('-'); const start = hours.indexOf(hour); for (let i = 1; i < session.span; i++) covered.add(`${day}-${hours[start + i]}`); });

  return (
    <div className="w-full max-w-2xl">
      <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950" data-lenis-prevent>
        <table className="w-full min-w-[34rem] table-fixed border-collapse text-xs">
          <caption className="sr-only">Weekly timetable</caption>
          <thead><tr><th scope="col" className="w-16 py-2" />{days.map((day) => <th key={day} scope="col" className={`py-2 font-semibold ${day === today ? 'bg-teal-50 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300' : 'text-zinc-500'}`}>{day}</th>)}</tr></thead>
          <tbody>
            {hours.map((hour) => (
              <tr key={hour} className="h-12 border-t border-zinc-100 dark:border-zinc-900">
                <th scope="row" className="px-2 text-right align-top font-normal tabular-nums text-zinc-400">{hour}</th>
                {days.map((day) => {
                  const key = `${day}-${hour}`;
                  if (covered.has(key)) return null;
                  const session = sessions[key];
                  return (
                    <td key={key} rowSpan={session?.span} className={`p-1 align-top ${day === today ? 'bg-teal-50/50 dark:bg-teal-400/5' : ''}`}>
                      {session && <div className={`h-full rounded-lg p-2 ${subjects[session.subject]}`}><p className="font-semibold">{session.subject}</p><p className="opacity-70">{session.room}</p></div>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2 flex gap-3 text-xs text-zinc-500">{(Object.keys(subjects) as (keyof typeof subjects)[]).map((subject) => <span key={subject} className="flex items-center gap-1"><span className={`size-2.5 rounded-sm ${subjects[subject].split(' ')[0]}`} />{subject}</span>)}</div>
    </div>
  );
}
