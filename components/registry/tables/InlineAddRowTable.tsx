/**
 * @registry
 * name: Inline Add Row Table
 * category: Tables
 * style: SaaS
 * tags: recent
 * description: Tableau de dépenses avec ligne d'ajout en bas : saisie directe, validation par Entrée, total recalculé et suppression.
 * prompt: Create an expense table with an inline "add row" at the bottom: inputs for description, category select and amount sit in the last row; Enter or the Add button validates (description and positive amount required, inline aria-invalid errors) and appends the row with a highlight; each row has a delete button; the footer total updates live. Light and dark mode.
 */
'use client';
import { Plus, Trash2 } from 'lucide-react';
import { useState, type FormEvent } from 'react';

export function InlineAddRowTable() {
  const [rows, setRows] = useState([{ id: 1, label: 'Team lunch', category: 'Food', amount: 86 }, { id: 2, label: 'Figma seats', category: 'Software', amount: 45 }]);
  const [draft, setDraft] = useState({ label: '', category: 'Travel', amount: '' });
  const [tried, setTried] = useState(false);
  const [fresh, setFresh] = useState<number | null>(null);
  const amount = Number(draft.amount);
  const labelInvalid = tried && !draft.label.trim();
  const amountInvalid = tried && !(amount > 0);

  function add(event: FormEvent) {
    event.preventDefault();
    setTried(true);
    if (!draft.label.trim() || !(amount > 0)) return;
    const id = Date.now();
    setRows((list) => [...list, { id, label: draft.label.trim(), category: draft.category, amount }]);
    setDraft({ label: '', category: draft.category, amount: '' });
    setTried(false);
    setFresh(id);
    window.setTimeout(() => setFresh(null), 900);
  }

  const input = (invalid: boolean) => `w-full rounded-md border bg-transparent px-2 py-1 text-sm text-zinc-900 outline-none dark:text-zinc-100 ${invalid ? 'border-rose-500' : 'border-zinc-300 focus:border-teal-500 dark:border-zinc-700'}`;

  return (
    <form onSubmit={add} className="w-full max-w-lg overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950" data-lenis-prevent>
      <table className="w-full min-w-[26rem] text-sm">
        <thead className="text-left text-xs text-zinc-500"><tr className="border-b border-zinc-200 dark:border-zinc-800"><th className="px-3 py-2 font-medium">Description</th><th className="font-medium">Category</th><th className="text-right font-medium">Amount</th><th className="w-10" /></tr></thead>
        <tbody>
          {rows.map((row) => <tr key={row.id} className={`border-b border-zinc-100 transition-colors duration-700 dark:border-zinc-900 ${fresh === row.id ? 'bg-teal-50 dark:bg-teal-400/10' : ''}`}><td className="px-3 py-2 text-zinc-900 dark:text-zinc-100">{row.label}</td><td className="text-zinc-600 dark:text-zinc-400">{row.category}</td><td className="text-right tabular-nums text-zinc-900 dark:text-zinc-100">€{row.amount.toFixed(2)}</td><td className="text-center"><button type="button" aria-label={`Delete ${row.label}`} onClick={() => setRows((list) => list.filter((item) => item.id !== row.id))} className="grid size-7 place-items-center rounded text-zinc-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10"><Trash2 aria-hidden className="size-3.5" /></button></td></tr>)}
          <tr className="bg-zinc-50/70 dark:bg-zinc-900/40">
            <td className="px-2 py-2"><input aria-label="New description" aria-invalid={labelInvalid} value={draft.label} onChange={(event) => setDraft((value) => ({ ...value, label: event.target.value }))} placeholder="Add expense…" className={input(labelInvalid)} /></td>
            <td className="py-2"><select aria-label="New category" value={draft.category} onChange={(event) => setDraft((value) => ({ ...value, category: event.target.value }))} className={input(false)}><option>Travel</option><option>Food</option><option>Software</option><option>Office</option></select></td>
            <td className="py-2 pl-2"><input aria-label="New amount" aria-invalid={amountInvalid} inputMode="decimal" value={draft.amount} onChange={(event) => setDraft((value) => ({ ...value, amount: event.target.value }))} placeholder="0.00" className={`${input(amountInvalid)} text-right`} /></td>
            <td className="text-center"><button type="submit" aria-label="Add expense" className="grid size-7 place-items-center rounded bg-teal-600 text-white"><Plus aria-hidden className="size-4" /></button></td>
          </tr>
        </tbody>
        <tfoot><tr><td colSpan={2} className="px-3 py-2.5 font-semibold text-zinc-900 dark:text-zinc-100">Total</td><td aria-live="polite" className="text-right font-bold tabular-nums text-zinc-950 dark:text-zinc-50">€{rows.reduce((sum, row) => sum + row.amount, 0).toFixed(2)}</td><td /></tr></tfoot>
      </table>
    </form>
  );
}
