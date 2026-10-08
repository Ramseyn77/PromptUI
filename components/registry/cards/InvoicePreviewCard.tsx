/**
 * @registry
 * name: Invoice Preview Card
 * category: Cards
 * style: SaaS
 * tags: recent
 * description: Aperçu de facture en carte avec statut, lignes, total, échéance et actions Envoyer / Marquer payée.
 * prompt: Create an invoice preview card: header with invoice number, client and a status pill (Draft/Sent/Paid) that changes with actions; 3 line items with quantity and amount; subtotal, VAT and bold total; due date with "in 6 days"; buttons Send (Draft → Sent) and Mark as paid (Sent → Paid with emerald pill and a PAID stamp rotated in the corner). Light and dark mode.
 */
'use client';
import { useState } from 'react';

const lines = [['Website redesign', 1, 4200], ['Hosting (12 months)', 1, 480], ['Support hours', 6, 90]] as const;
const pill = { Draft: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300', Sent: 'bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300', Paid: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300' };

export function InvoicePreviewCard() {
  const [status, setStatus] = useState<keyof typeof pill>('Draft');
  const subtotal = lines.reduce((sum, [, qty, price]) => sum + qty * price, 0);
  const money = (value: number) => value.toLocaleString('en-IE', { style: 'currency', currency: 'EUR' });

  return (
    <article className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      {status === 'Paid' && <span aria-hidden className="absolute right-4 top-14 rotate-12 rounded-md border-2 border-emerald-500 px-2 py-0.5 text-lg font-black tracking-widest text-emerald-500 opacity-80">PAID</span>}
      <div className="flex items-start justify-between">
        <div><p className="font-mono text-xs text-zinc-500">INV-2026-041</p><h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Baobab Studio</h3></div>
        <span aria-live="polite" className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${pill[status]}`}>{status}</span>
      </div>
      <table className="mt-4 w-full text-sm"><tbody>{lines.map(([label, qty, price]) => <tr key={label} className="border-b border-zinc-100 dark:border-zinc-900"><td className="py-1.5 text-zinc-700 dark:text-zinc-300">{label}{qty > 1 && <span className="text-zinc-400"> × {qty}</span>}</td><td className="text-right tabular-nums text-zinc-900 dark:text-zinc-100">{money(qty * price)}</td></tr>)}</tbody></table>
      <dl className="mt-3 space-y-1 text-sm">
        <div className="flex justify-between text-zinc-500"><dt>Subtotal</dt><dd className="tabular-nums">{money(subtotal)}</dd></div>
        <div className="flex justify-between text-zinc-500"><dt>VAT 20%</dt><dd className="tabular-nums">{money(subtotal * 0.2)}</dd></div>
        <div className="flex justify-between text-base font-bold text-zinc-950 dark:text-zinc-50"><dt>Total</dt><dd className="tabular-nums">{money(subtotal * 1.2)}</dd></div>
      </dl>
      <p className="mt-3 text-xs text-zinc-500">Due Oct 14, 2026 · in 6 days</p>
      <div className="mt-4 flex gap-2">
        <button type="button" disabled={status !== 'Draft'} onClick={() => setStatus('Sent')} className="flex-1 rounded-lg bg-zinc-950 py-2 text-sm font-semibold text-white disabled:opacity-40 dark:bg-white dark:text-zinc-950">Send</button>
        <button type="button" disabled={status !== 'Sent'} onClick={() => setStatus('Paid')} className="flex-1 rounded-lg border border-zinc-300 py-2 text-sm font-semibold text-zinc-800 disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-200">Mark as paid</button>
      </div>
    </article>
  );
}
