/**
 * @registry
 * name: OTP Input
 * category: Forms
 * style: SaaS
 * tags: featured, recent
 * description: Saisie de code à 6 chiffres avec avance auto, collage et validation.
 * prompt: Create a 6-digit OTP input: digits only, auto-advance, Backspace goes back, arrow keys move, pasting a code fills every box, inputMode numeric and autocomplete one-time-code. Borders turn green with a status message when complete. Light and dark mode.
 */
'use client';
import { Check } from 'lucide-react';
import { useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react';

const LENGTH = 6;

export function OtpInput() {
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(''));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const complete = digits.every(Boolean);

  function update(index: number, value: string) {
    const digit = value.replace(/\D/g, '').slice(-1);
    setDigits((current) => current.map((item, i) => (i === index ? digit : item)));
    if (digit && index < LENGTH - 1) inputs.current[index + 1]?.focus();
  }

  function onKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Backspace' && !digits[index] && index > 0) inputs.current[index - 1]?.focus();
    if (event.key === 'ArrowLeft' && index > 0) inputs.current[index - 1]?.focus();
    if (event.key === 'ArrowRight' && index < LENGTH - 1) inputs.current[index + 1]?.focus();
  }

  function onPaste(event: ClipboardEvent<HTMLInputElement>) {
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, LENGTH);
    if (!pasted) return;
    event.preventDefault();
    setDigits(Array.from({ length: LENGTH }, (_, i) => pasted[i] ?? ''));
    inputs.current[Math.min(pasted.length, LENGTH - 1)]?.focus();
  }

  return (
    <fieldset className="w-full min-w-0 max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <legend className="sr-only">Verification code</legend>
      <p className="text-lg font-semibold text-zinc-900 dark:text-white">Check your inbox</p>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Enter the 6-digit code we sent you.</p>
      <div className="mt-6 flex justify-center gap-1.5 sm:gap-2">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(node) => { inputs.current[index] = node; }}
            value={digit}
            inputMode="numeric"
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            maxLength={1}
            aria-label={`Digit ${index + 1}`}
            onChange={(event) => update(index, event.target.value)}
            onKeyDown={(event) => onKeyDown(index, event)}
            onPaste={onPaste}
            onFocus={(event) => event.target.select()}
            className={`size-10 rounded-xl border bg-white text-center text-lg font-semibold text-zinc-900 outline-none transition focus:ring-4 sm:size-11 dark:bg-zinc-900 dark:text-white ${
              complete
                ? 'border-emerald-500 focus:ring-emerald-500/20'
                : 'border-zinc-300 focus:border-teal-500 focus:ring-teal-500/15 dark:border-zinc-700 dark:focus:border-teal-400'
            }`}
          />
        ))}
      </div>
      <p role="status" className={`mt-4 inline-flex items-center gap-1.5 text-sm font-medium transition-opacity ${complete ? 'text-emerald-600 opacity-100 dark:text-emerald-400' : 'opacity-0'}`}>
        <Check aria-hidden className="size-4" /> Code complete
      </p>
    </fieldset>
  );
}
