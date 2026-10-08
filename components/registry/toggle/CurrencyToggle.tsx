/**
 * @registry
 * name: Currency Toggle
 * category: Toggle
 * style: SaaS
 * tags: recent
 * description: Sélecteur de devise segmenté (USD, EUR, GBP) qui convertit les prix avec un défilement vertical des chiffres.
 * prompt: Create a currency toggle: a segmented radiogroup (USD $, EUR €, GBP £) with a sliding active pill; below, three plan prices convert using fixed demo rates and the digits roll vertically to the new value (each digit is a column of 0–9 translated by CSS); the locale formatting changes accordingly (€ after the number for EUR); a note "Prices exclude VAT". Arrow keys move selection. Light and dark mode.
 */
'use client';
import { useId, useRef, useState, type KeyboardEvent } from 'react';

const currencies = [{ code: 'USD', symbol: '$', rate: 1, after: false }, { code: 'EUR', symbol: '€', rate: 0.92, after: true }, { code: 'GBP', symbol: '£', rate: 0.79, after: false }];
const plans = [['Starter', 12], ['Pro', 39], ['Scale', 129]] as const;

function RollingNumber({ value }: { value: number }) {
  return (
    <span className="inline-flex tabular-nums" aria-hidden>
      {String(value).padStart(3, ' ').split('').map((digit, index) => digit === ' ' ? <span key={index} /> : (
        <span key={index} className="relative inline-block h-[1em] w-[0.62em] overflow-hidden leading-none">
          <span className="absolute inset-x-0 top-0 flex flex-col transition-transform duration-500 motion-reduce:duration-0" style={{ transform: `translateY(-${Number(digit) * 10}%)` }}>
            {Array.from({ length: 10 }, (_, n) => <span key={n} className="h-[1em]">{n}</span>)}
          </span>
        </span>
      ))}
    </span>
  );
}

export function CurrencyToggle() {
  const uid = useId();
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const currency = currencies[active];

  function onKeyDown(event: KeyboardEvent) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const next = (active + (event.key === 'ArrowRight' ? 1 : -1) + currencies.length) % currencies.length;
    setActive(next);
    refs.current[next]?.focus();
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div role="radiogroup" aria-labelledby={`${uid}-label`} onKeyDown={onKeyDown} className="relative inline-grid grid-cols-3 rounded-full bg-zinc-100 p-1 dark:bg-zinc-900">
        <span id={`${uid}-label`} className="sr-only">Currency</span>
        <span aria-hidden className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-full bg-white shadow-sm transition-transform duration-300 dark:bg-zinc-700" style={{ transform: `translateX(${active * 100}%)` }} />
        {currencies.map((item, index) => <button key={item.code} ref={(node) => { refs.current[index] = node; }} type="button" role="radio" aria-checked={active === index} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} className={`relative z-10 px-4 py-1.5 text-sm font-semibold ${active === index ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'}`}>{item.code} {item.symbol}</button>)}
      </div>
      <ul className="mt-5 grid grid-cols-3 gap-3">
        {plans.map(([name, usd]) => {
          const amount = Math.round(usd * currency.rate);
          return (
            <li key={name} className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-900">
              <p className="text-xs text-zinc-500">{name}</p>
              <p className="mt-1 flex items-baseline text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                <span className="sr-only">{currency.after ? `${amount} ${currency.symbol}` : `${currency.symbol}${amount}`} per month</span>
                {!currency.after && <span aria-hidden className="text-base">{currency.symbol}</span>}<RollingNumber value={amount} />{currency.after && <span aria-hidden className="ml-0.5 text-base">{currency.symbol}</span>}
              </p>
              <p className="text-[11px] text-zinc-400">/month</p>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-xs text-zinc-500">Prices exclude VAT. Demo exchange rates.</p>
    </div>
  );
}
