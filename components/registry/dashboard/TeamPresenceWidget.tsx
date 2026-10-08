/**
 * @registry
 * name: Team Presence Widget
 * category: Dashboard
 * style: Minimal
 * tags: recent
 * description: Qui est en ligne : membres groupés par statut, fuseau et heure locale, avec bouton pour démarrer un appel.
 * prompt: Create a team presence widget: members grouped under Online / Away / Offline with colored status dots, each row showing name, role, a local time computed from a UTC offset (rendered after mount to stay hydration safe) with a moon icon when it's night there, and a call button for online members; header counter "5 online". Light and dark mode.
 */
'use client';
import { Moon, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

const members = [
  { name: 'Awa Diop', role: 'Design', status: 'online', offset: 0 }, { name: 'Leo Martin', role: 'Engineering', status: 'online', offset: 2 },
  { name: 'Yuki Tanaka', role: 'Engineering', status: 'away', offset: 9 }, { name: 'Sam Okafor', role: 'Sales', status: 'online', offset: 1 },
  { name: 'Ana Lima', role: 'Support', status: 'offline', offset: -3 },
];
const dot = { online: 'bg-emerald-500', away: 'bg-amber-400', offline: 'bg-zinc-400' } as const;

export function TeamPresenceWidget() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => { setNow(Date.now()); const timer = window.setInterval(() => setNow(Date.now()), 60000); return () => window.clearInterval(timer); }, []);

  const local = (offset: number) => {
    if (now === null) return { label: '--:--', night: false };
    const date = new Date(now + offset * 3600000);
    const hours = date.getUTCHours();
    return { label: `${String(hours).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}`, night: hours < 7 || hours >= 21 };
  };

  return (
    <section className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between"><h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Team</h3><span className="text-xs text-emerald-600 dark:text-emerald-400">{members.filter((member) => member.status === 'online').length} online</span></div>
      {(['online', 'away', 'offline'] as const).map((status) => {
        const group = members.filter((member) => member.status === status);
        if (!group.length) return null;
        return (
          <div key={status} className="mt-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">{status}</p>
            <ul className="mt-1">
              {group.map((member) => {
                const time = local(member.offset);
                return (
                  <li key={member.name} className="flex items-center gap-3 py-1.5">
                    <span className="relative"><span aria-hidden className="block size-8 rounded-full bg-gradient-to-br from-sky-300 to-violet-400" /><span className={`absolute bottom-0 right-0 size-2.5 rounded-full ring-2 ring-white dark:ring-zinc-950 ${dot[status]}`}><span className="sr-only">{status}</span></span></span>
                    <span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">{member.name}</span><span className="text-xs text-zinc-500">{member.role}</span></span>
                    <span className="flex items-center gap-1 text-xs tabular-nums text-zinc-500">{time.night && <Moon aria-label="Night time" className="size-3" />}{time.label}</span>
                    {status === 'online' && <button type="button" aria-label={`Call ${member.name}`} className="grid size-7 place-items-center rounded-lg text-zinc-500 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-500/10"><Phone aria-hidden className="size-3.5" /></button>}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </section>
  );
}
