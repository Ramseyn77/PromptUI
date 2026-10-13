/**
 * @registry
 * name: Permission Toggle Table
 * category: Tables
 * style: SaaS
 * tags: recent
 * description: Tableau de droits par rôle avec interrupteurs (lecture, écriture, suppression, admin), dépendances automatiques et modifications à enregistrer.
 * prompt: Create a role permissions table: rows are resources (Projects, Billing, Members, API keys, Audit log) and column groups per role (Viewer, Editor, Admin) — simplified to one role selected via tabs — with switches for Read, Write, Delete; enabling Write or Delete auto-enables Read, disabling Read disables the others (with a small hint); Admin role rows are locked on; changed cells get a dot and a "3 unsaved changes" bar with Discard / Save appears; switches have accessible names like "Editor can write Billing". Light and dark mode.
 */
'use client';
import { Lock } from 'lucide-react';
import { useState } from 'react';

const resources = ['Projects', 'Billing', 'Members', 'API keys', 'Audit log'];
const actions = ['Read', 'Write', 'Delete'] as const;
type Matrix = Record<string, Record<string, boolean[]>>;
const initial: Matrix = {
  Viewer: Object.fromEntries(resources.map((resource) => [resource, [resource !== 'Billing' && resource !== 'API keys', false, false]])),
  Editor: Object.fromEntries(resources.map((resource) => [resource, [true, resource === 'Projects' || resource === 'Members', resource === 'Projects']])),
  Admin: Object.fromEntries(resources.map((resource) => [resource, [true, true, true]])),
};

export function PermissionToggleTable() {
  const [role, setRole] = useState('Editor');
  const [saved, setSaved] = useState(initial);
  const [matrix, setMatrix] = useState(initial);
  const locked = role === 'Admin';
  const changes = Object.keys(matrix).reduce((sum, key) => sum + resources.reduce((acc, resource) => acc + matrix[key][resource].filter((value, index) => value !== saved[key][resource][index]).length, 0), 0);

  function toggle(resource: string, action: number) {
    const current = [...matrix[role][resource]];
    current[action] = !current[action];
    if (action > 0 && current[action]) current[0] = true;
    if (action === 0 && !current[0]) { current[1] = false; current[2] = false; }
    setMatrix({ ...matrix, [role]: { ...matrix[role], [resource]: current } });
  }

  return (
    <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-200 bg-white pb-14 dark:border-zinc-800 dark:bg-zinc-950">
      <div role="tablist" aria-label="Role" className="flex gap-1 border-b border-zinc-200 px-3 pt-3 dark:border-zinc-800">{Object.keys(matrix).map((key) => <button key={key} type="button" role="tab" aria-selected={role === key} onClick={() => setRole(key)} className={`-mb-px border-b-2 px-3 pb-2 text-sm font-medium ${role === key ? 'border-indigo-600 text-indigo-700 dark:text-indigo-300' : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}>{key}</button>)}</div>
      <table className="w-full text-sm">
        <thead className="text-left text-xs text-zinc-500"><tr><th className="px-4 py-2.5 font-medium">Resource</th>{actions.map((action) => <th key={action} className="text-center font-medium">{action}</th>)}</tr></thead>
        <tbody>
          {resources.map((resource) => (
            <tr key={resource} className="border-t border-zinc-100 dark:border-zinc-900">
              <th scope="row" className="px-4 py-2.5 text-left font-medium text-zinc-900 dark:text-zinc-100"><span className="flex items-center gap-1.5">{resource}{locked && <Lock aria-label="Locked" className="size-3 text-zinc-400" />}</span></th>
              {actions.map((action, index) => {
                const on = matrix[role][resource][index];
                const changed = on !== saved[role][resource][index];
                return (
                  <td key={action} className="text-center">
                    <span className="relative inline-flex">
                      <button type="button" role="switch" aria-checked={on} disabled={locked} aria-label={`${role} can ${action.toLowerCase()} ${resource}`} onClick={() => toggle(resource, index)} className={`relative h-5 w-9 rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${on ? 'bg-indigo-600' : 'bg-zinc-300 dark:bg-zinc-700'}`}><span className={`absolute top-0.5 size-4 rounded-full bg-white shadow transition-all ${on ? 'left-[1.1rem]' : 'left-0.5'}`} /></button>
                      {changed && <span aria-hidden className="absolute -right-1.5 -top-1 size-2 rounded-full bg-amber-400" />}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-4 pt-2 text-[11px] text-zinc-500">Write and Delete need Read. Admin permissions can’t be changed.</p>
      <div aria-live="polite" className={`absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2 text-sm text-white transition-all dark:bg-white dark:text-zinc-950 ${changes ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}>
        <span className="flex-1">{changes} unsaved change{changes === 1 ? '' : 's'}</span>
        <button type="button" tabIndex={changes ? 0 : -1} onClick={() => setMatrix(saved)} className="rounded-lg px-2.5 py-1 text-xs">Discard</button>
        <button type="button" tabIndex={changes ? 0 : -1} onClick={() => setSaved(matrix)} className="rounded-lg bg-indigo-500 px-2.5 py-1 text-xs font-semibold text-white">Save</button>
      </div>
    </div>
  );
}
