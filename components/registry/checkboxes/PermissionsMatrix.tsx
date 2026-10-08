/**
 * @registry
 * name: Permissions Matrix
 * category: Checkboxes
 * style: SaaS
 * tags: recent
 * description: Matrice rôles × permissions avec cases à cocher, colonne Owner verrouillée et en-têtes accessibles.
 * prompt: Create a roles × permissions matrix table: rows are permissions, columns are roles (Owner, Admin, Member, Guest); each cell is a checkbox labeled "<permission> for <role>" (visually hidden label), Owner column checked and disabled; horizontal scroll on small screens with sticky first column. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const roles = ['Owner', 'Admin', 'Member', 'Guest'];
const permissions = ['View projects', 'Edit projects', 'Invite members', 'Manage billing'];
const initial: Record<string, boolean> = { 'View projects:Admin': true, 'Edit projects:Admin': true, 'Invite members:Admin': true, 'View projects:Member': true, 'Edit projects:Member': true, 'View projects:Guest': true };

export function PermissionsMatrix() {
  const [grants, setGrants] = useState(initial);

  return (
    <div className="w-full max-w-xl overflow-x-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <table className="w-full min-w-[460px] text-sm">
        <thead><tr className="border-b border-zinc-200 dark:border-zinc-800"><th className="sticky left-0 bg-white px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:bg-zinc-950">Permission</th>{roles.map((role) => <th key={role} className="px-3 py-3 text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300">{role}</th>)}</tr></thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {permissions.map((permission) => (
            <tr key={permission}>
              <th scope="row" className="sticky left-0 bg-white px-4 py-3 text-left font-normal text-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">{permission}</th>
              {roles.map((role) => {
                const key = `${permission}:${role}`;
                const owner = role === 'Owner';
                return (
                  <td key={role} className="px-3 py-3 text-center">
                    <label className="inline-grid cursor-pointer place-items-center">
                      <span className="sr-only">{permission} for {role}</span>
                      <input type="checkbox" checked={owner || Boolean(grants[key])} disabled={owner} onChange={() => setGrants((current) => ({ ...current, [key]: !current[key] }))} className="size-4 accent-teal-600 disabled:opacity-50" />
                    </label>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
