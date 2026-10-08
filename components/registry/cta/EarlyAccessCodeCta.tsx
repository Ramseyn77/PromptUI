/**
 * @registry
 * name: Early Access Code CTA
 * category: CTA
 * style: Dark
 * tags: recent
 * description: Saisie d'un code d'accès anticipé en 6 cases (collage géré), vérification puis déblocage animé.
 * prompt: Create a dark early-access CTA: "Got an invite code?" with six single-character inputs that auto-advance, support Backspace to go back and paste of a full code; a Redeem button validates (demo code PROMPT), shows an error shake + message for wrong codes and a success state "You’re in — welcome to the beta" with a glowing check; link "Join the waitlist instead". Dark in both themes.
 */
'use client';
import { Check } from 'lucide-react';
import { useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react';

const length = 6;

export function EarlyAccessCodeCta() {
  const [chars, setChars] = useState<string[]>(Array(length).fill(''));
  const [status, setStatus] = useState<'idle' | 'error' | 'ok'>('idle');
  const [shake, setShake] = useState(0);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  function set(index: number, value: string) {
    const char = value.slice(-1).toUpperCase().replace(/[^A-Z0-9]/, '');
    const next = [...chars];
    next[index] = char;
    setChars(next);
    setStatus('idle');
    if (char && index < length - 1) refs.current[index + 1]?.focus();
  }

  function onKey(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Backspace' && !chars[index] && index > 0) refs.current[index - 1]?.focus();
  }

  function onPaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pasted = event.clipboardData.getData('text').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, length).split('');
    setChars([...pasted, ...Array(length - pasted.length).fill('')]);
    refs.current[Math.min(pasted.length, length - 1)]?.focus();
  }

  function redeem() {
    if (chars.join('') === 'PROMPT') setStatus('ok');
    else { setStatus('error'); setShake((value) => value + 1); }
  }

  return (
    <section className="w-full max-w-md rounded-3xl bg-zinc-950 p-7 text-center text-white ring-1 ring-white/10">
      <style>{`@keyframes pui-code-shake-0 { 20%, 60% { transform: translateX(-6px) } 40%, 80% { transform: translateX(6px) } } @keyframes pui-code-shake-1 { 20%, 60% { transform: translateX(-6px) } 40%, 80% { transform: translateX(6px) } } @media (prefers-reduced-motion: reduce) { .pui-code-group { animation: none !important } }`}</style>
      {status === 'ok' ? (
        <div role="status">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.6)]"><Check aria-hidden className="size-7" /></span>
          <p className="mt-4 text-xl font-semibold">You’re in — welcome to the beta</p>
          <p className="mt-1 text-sm text-zinc-400">Check your inbox for setup instructions.</p>
        </div>
      ) : (
        <>
          <p className="text-xl font-semibold">Got an invite code?</p>
          <p className="mt-1 text-sm text-zinc-400">Enter it below to skip the waitlist. <span className="text-zinc-500">(Try PROMPT)</span></p>
          <div role="group" aria-label="Invite code" className="pui-code-group mt-5 flex justify-center gap-2" style={shake ? { animation: `pui-code-shake-${shake % 2} .4s` } : undefined}>
            {chars.map((char, index) => <input key={index} ref={(node) => { refs.current[index] = node; }} value={char} onChange={(event) => set(index, event.target.value)} onKeyDown={(event) => onKey(index, event)} onPaste={onPaste} aria-label={`Character ${index + 1}`} aria-invalid={status === 'error'} maxLength={2} autoComplete="one-time-code" className={`size-11 rounded-xl border bg-white/5 text-center font-mono text-lg font-bold uppercase outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/30 sm:size-12 ${status === 'error' ? 'border-rose-500' : 'border-white/15'}`} />)}
          </div>
          <p aria-live="polite" className="mt-2 h-5 text-xs text-rose-400">{status === 'error' ? 'That code isn’t valid. Check for typos.' : ''}</p>
          <button type="button" onClick={redeem} disabled={chars.some((char) => !char)} className="mt-3 w-full rounded-xl bg-white py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-200 disabled:opacity-40">Redeem</button>
          <a href="#" className="mt-3 inline-block text-sm text-zinc-400 underline-offset-4 hover:text-white hover:underline">Join the waitlist instead</a>
        </>
      )}
    </section>
  );
}
