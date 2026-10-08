/**
 * @registry
 * name: Empty State Table
 * category: Tables
 * style: SaaS
 * tags: recent
 * description: Tableau vide avec illustration légère, message clair et action pour importer ou créer.
 * prompt: Create a table shell with headers and a full-width empty state: a stacked-cards illustration made of divs, "No customers yet" title, one-sentence help, primary "Add customer" and secondary "Import CSV" buttons; clicking Add inserts a sample row. Light and dark mode.
 */
'use client';
import { Plus, Upload } from 'lucide-react';
import { useState } from 'react';

export function EmptyStateTable() {
  const [rows, setRows] = useState<string[]>([]);

  return (
    <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-zinc-200 bg-zinc-50 text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"><tr><th className="px-4 py-2.5 font-medium">Customer</th><th className="px-4 py-2.5 font-medium">Plan</th><th className="px-4 py-2.5 text-right font-medium">Since</th></tr></thead>
        <tbody>
          {rows.map((name) => <tr key={name} className="border-t border-zinc-100 dark:border-zinc-900"><td className="px-4 py-3 font-medium text-zinc-900 dark:text-white">{name}</td><td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">Pro</td><td className="px-4 py-3 text-right text-zinc-600 dark:text-zinc-400">Today</td></tr>)}
          {!rows.length && (
            <tr>
              <td colSpan={3} className="px-6 py-12 text-center">
                <div aria-hidden className="relative mx-auto h-16 w-24">
                  <span className="absolute inset-x-4 top-0 h-10 rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900" />
                  <span className="absolute inset-x-2 top-3 h-10 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900" />
                  <span className="absolute inset-x-0 top-6 flex h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-2 shadow-sm dark:border-zinc-700 dark:bg-zinc-800"><span className="size-5 rounded-full bg-teal-500/30" /><span className="h-1.5 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-700" /></span>
                </div>
                <p className="mt-4 font-semibold text-zinc-900 dark:text-white">No customers yet</p>
                <p className="mx-auto mt-1 max-w-xs text-sm text-zinc-500 dark:text-zinc-400">Add your first customer or import a CSV to see revenue by account.</p>
                <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
                  <button type="button" onClick={() => setRows(['Northwind Traders'])} className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-zinc-950 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"><Plus aria-hidden className="size-4" /> Add customer</button>
                  <button type="button" className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-800 dark:border-zinc-700 dark:text-zinc-200"><Upload aria-hidden className="size-4" /> Import CSV</button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
