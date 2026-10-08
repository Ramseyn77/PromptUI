/**
 * @registry
 * name: Team Status Table
 * category: Tables
 * style: SaaS
 * tags: recent
 * description: Tableau d'équipe avec avatars, badges de statut colorés et dernière activité.
 * prompt: Create a team members table: avatar (initials on hashed color) + name + email, role, a status badge with dot (Active green, Invited amber, Suspended rose), last active time and a "…" actions button with aria-label. Scrolls horizontally on mobile. Light and dark mode.
 */
import { MoreHorizontal } from 'lucide-react';

const members = [
  { name: 'Léa Moreau', email: 'lea@kite.dev', role: 'Owner', status: 'Active', seen: 'Now' },
  { name: 'Noah Kim', email: 'noah@kite.dev', role: 'Developer', status: 'Active', seen: '2h ago' },
  { name: 'Inès Belkacem', email: 'ines@kite.dev', role: 'Designer', status: 'Invited', seen: '—' },
  { name: 'Tom Weber', email: 'tom@kite.dev', role: 'Support', status: 'Suspended', seen: '12d ago' },
];
const tones: Record<string, string> = {
  Active: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  Invited: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  Suspended: 'bg-rose-500/10 text-rose-700 dark:text-rose-400',
};

export function TeamStatusTable() {
  return (
    <div className="w-full max-w-3xl overflow-x-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="border-b border-zinc-200 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          <tr>{['Member', 'Role', 'Status', 'Last active', ''].map((head) => <th key={head} className="px-4 py-3 font-medium">{head}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {members.map((member, index) => (
            <tr key={member.email}>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full text-xs font-bold text-white" style={{ background: `hsl(${index * 70 + 170} 55% 45%)` }}>{member.name.split(' ').map((part) => part[0]).join('')}</span>
                  <span><span className="block font-medium text-zinc-900 dark:text-white">{member.name}</span><span className="block text-xs text-zinc-500 dark:text-zinc-400">{member.email}</span></span>
                </div>
              </td>
              <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{member.role}</td>
              <td className="px-4 py-3"><span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${tones[member.status]}`}><span className="size-1.5 rounded-full bg-current" />{member.status}</span></td>
              <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400">{member.seen}</td>
              <td className="px-2 py-3 text-right"><button type="button" aria-label={`Actions for ${member.name}`} className="grid size-8 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"><MoreHorizontal className="size-4" /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
