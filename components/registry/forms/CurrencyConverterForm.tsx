/**
 * @registry
 * name: Currency Converter Form
 * category: Forms
 * style: Gradient
 * tags: featured, recent
 * description: Convertisseur de devises avec deux montants liés, sélecteurs de devise, bouton d'inversion animé et frais affichés.
 * prompt: Create a money transfer converter: "You send" amount + currency select and "They receive" amount + currency select, linked both ways using fixed demo rates (EUR, USD, XOF, NGN, GBP); a round swap button between them rotates 180° and swaps currencies; a summary shows the rate, fee and arrival time; amounts formatted with Intl on blur. Gradient header card. Light and dark mode.
 */
'use client';
import { ArrowDownUp } from 'lucide-react';
import { useId, useState } from 'react';

const perEuro = { EUR: 1, USD: 1.08, GBP: 0.85, XOF: 655.96, NGN: 1650 } as const;
type Code = keyof typeof perEuro;

export function CurrencyConverterForm() {
  const id = useId();
  const [from, setFrom] = useState<Code>('EUR');
  const [to, setTo] = useState<Code>('XOF');
  const [amount, setAmount] = useState(250);
  const [spin, setSpin] = useState(0);
  const rate = perEuro[to] / perEuro[from];
  const fee = Math.max(1.5, amount * 0.005);
  const received = (amount - fee) * rate;
  const select = 'rounded-lg bg-white/80 px-2 py-1.5 text-sm font-semibold text-zinc-900 outline-none dark:bg-zinc-800 dark:text-zinc-100';

  return (
    <form onSubmit={(event) => event.preventDefault()} className="w-full max-w-sm overflow-hidden rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="bg-gradient-to-br from-teal-500 to-sky-600 p-5 text-white">
        <label htmlFor={`${id}-send`} className="text-xs text-white/80">You send</label>
        <div className="mt-1 flex items-center gap-2"><input id={`${id}-send`} inputMode="decimal" value={amount} onChange={(event) => setAmount(Math.max(0, Number(event.target.value.replace(',', '.')) || 0))} className="min-w-0 flex-1 bg-transparent text-3xl font-bold tabular-nums outline-none" /><select aria-label="Send currency" value={from} onChange={(event) => setFrom(event.target.value as Code)} className={select}>{Object.keys(perEuro).map((code) => <option key={code}>{code}</option>)}</select></div>
      </div>
      <div className="relative h-0"><button type="button" aria-label="Swap currencies" onClick={() => { setFrom(to); setTo(from); setSpin((value) => value + 180); }} className="absolute left-1/2 top-0 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-zinc-950 text-white transition-transform duration-300 dark:border-zinc-950 dark:bg-white dark:text-zinc-950" style={{ rotate: `${spin}deg` }}><ArrowDownUp aria-hidden className="size-4" /></button></div>
      <div className="p-5 pt-7">
        <p className="text-xs text-zinc-500">They receive</p>
        <div className="mt-1 flex items-center gap-2"><output aria-live="polite" className="min-w-0 flex-1 truncate text-3xl font-bold tabular-nums text-zinc-950 dark:text-zinc-50">{received > 0 ? received.toLocaleString('en-US', { maximumFractionDigits: 2 }) : '0'}</output><select aria-label="Receive currency" value={to} onChange={(event) => setTo(event.target.value as Code)} className={`${select} border border-zinc-200 dark:border-zinc-700`}>{Object.keys(perEuro).map((code) => <option key={code}>{code}</option>)}</select></div>
        <dl className="mt-4 space-y-1 border-t border-zinc-100 pt-3 text-xs dark:border-zinc-800">
          <div className="flex justify-between"><dt className="text-zinc-500">Rate</dt><dd className="tabular-nums text-zinc-800 dark:text-zinc-200">1 {from} = {rate.toLocaleString('en-US', { maximumFractionDigits: 4 })} {to}</dd></div>
          <div className="flex justify-between"><dt className="text-zinc-500">Fee</dt><dd className="tabular-nums text-zinc-800 dark:text-zinc-200">{fee.toFixed(2)} {from}</dd></div>
          <div className="flex justify-between"><dt className="text-zinc-500">Arrives</dt><dd className="text-emerald-600 dark:text-emerald-400">In seconds</dd></div>
        </dl>
        <button type="submit" className="mt-4 w-full rounded-xl bg-zinc-950 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Continue</button>
      </div>
    </form>
  );
}
