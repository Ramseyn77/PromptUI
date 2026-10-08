/**
 * @registry
 * name: Pivot Table
 * category: Tables
 * style: SaaS
 * tags: featured, recent
 * description: Tableau croisé dynamique : choisir lignes et colonnes (région, produit, trimestre), totaux et chaleur des cellules.
 * prompt: Create a pivot table: two selects choose the row dimension and column dimension among Region, Product and Quarter (they can't be equal), the table recomputes sums from a flat dataset, cells get a teal background whose opacity scales with the value (heat), and row/column totals plus a grand total are bold; horizontal scroll on mobile. Light and dark mode.
 */
'use client';
import { useId, useState } from 'react';

const regions = ['Europe', 'Africa', 'Americas'];
const products = ['Starter', 'Pro', 'Team'];
const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
const data = regions.flatMap((region, r) => products.flatMap((product, p) => quarters.map((quarter, q) => ({ Region: region, Product: product, Quarter: quarter, value: 20 + ((r * 7 + p * 11 + q * 5) % 17) * 6 }))));
const dims = { Region: regions, Product: products, Quarter: quarters } as const;
type Dim = keyof typeof dims;

export function PivotTable() {
  const id = useId();
  const [rows, setRows] = useState<Dim>('Region');
  const [cols, setCols] = useState<Dim>('Quarter');
  const sum = (filter: (item: (typeof data)[number]) => boolean) => data.filter(filter).reduce((total, item) => total + item.value, 0);
  const max = Math.max(...dims[rows].flatMap((row) => dims[cols].map((col) => sum((item) => item[rows] === row && item[cols] === col))));
  const select = 'rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200';

  return (
    <div className="w-full max-w-xl">
      <div className="mb-2 flex flex-wrap gap-3 text-xs text-zinc-500">
        <label htmlFor={`${id}-r`} className="flex items-center gap-1.5">Rows<select id={`${id}-r`} value={rows} onChange={(event) => { const next = event.target.value as Dim; if (next === cols) setCols(rows); setRows(next); }} className={select}>{Object.keys(dims).map((dim) => <option key={dim}>{dim}</option>)}</select></label>
        <label htmlFor={`${id}-c`} className="flex items-center gap-1.5">Columns<select id={`${id}-c`} value={cols} onChange={(event) => { const next = event.target.value as Dim; if (next === rows) setRows(cols); setCols(next); }} className={select}>{Object.keys(dims).map((dim) => <option key={dim}>{dim}</option>)}</select></label>
      </div>
      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950" data-lenis-prevent>
        <table className="w-full min-w-[26rem] text-sm">
          <thead><tr className="border-b border-zinc-200 text-xs text-zinc-500 dark:border-zinc-800"><th className="px-3 py-2 text-left font-medium">{rows} \ {cols}</th>{dims[cols].map((col) => <th key={col} className="px-3 text-right font-medium">{col}</th>)}<th className="px-3 text-right font-semibold text-zinc-900 dark:text-zinc-100">Total</th></tr></thead>
          <tbody>
            {dims[rows].map((row) => (
              <tr key={row} className="border-b border-zinc-100 dark:border-zinc-900">
                <th scope="row" className="px-3 py-2 text-left font-medium text-zinc-800 dark:text-zinc-200">{row}</th>
                {dims[cols].map((col) => { const value = sum((item) => item[rows] === row && item[cols] === col); return <td key={col} className="px-3 text-right tabular-nums text-zinc-900 dark:text-zinc-100" style={{ background: `rgba(20,184,166,${((value / max) * 0.35).toFixed(3)})` }}>{value}</td>; })}
                <td className="px-3 text-right font-semibold tabular-nums text-zinc-950 dark:text-zinc-50">{sum((item) => item[rows] === row)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot><tr className="font-semibold text-zinc-950 dark:text-zinc-50"><th scope="row" className="px-3 py-2 text-left">Total</th>{dims[cols].map((col) => <td key={col} className="px-3 text-right tabular-nums">{sum((item) => item[cols] === col)}</td>)}<td className="px-3 text-right tabular-nums">{sum(() => true)}</td></tr></tfoot>
        </table>
      </div>
    </div>
  );
}
