/**
 * @registry
 * name: Elastic Send Button
 * category: Buttons
 * style: Gradient
 * tags: featured, recent
 * description: Bouton d envoi qui se comprime, propulse son icone puis confirme la reussite.
 * prompt: Create an elastic Send button with three clear states: idle, sending and sent. On click, compress the pill, launch a paper-plane icon diagonally, show a short progress shimmer, then morph into a green confirmation with a check. Prevent repeated clicks while running, expose state through aria-live, keep focus visible, support light/dark mode and disable decorative motion with prefers-reduced-motion.
 */
'use client';

import { Check, SendHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';

type Status = 'idle' | 'sending' | 'sent';

export function ElasticSendButton() {
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    if (status === 'idle') return;
    const timer = window.setTimeout(() => setStatus(status === 'sending' ? 'sent' : 'idle'), status === 'sending' ? 950 : 1800);
    return () => window.clearTimeout(timer);
  }, [status]);

  return (
    <div className="grid min-h-48 place-items-center">
      <style>{`@keyframes pui-plane-fly{0%{transform:translate(0,0) rotate(0);opacity:1}70%{transform:translate(28px,-24px) rotate(-12deg);opacity:1}100%{transform:translate(42px,-34px) rotate(-18deg);opacity:0}}@keyframes pui-send-shine{to{transform:translateX(260%) skewX(-18deg)}}@media(prefers-reduced-motion:reduce){.pui-plane,.pui-send-shine{animation:none!important}}`}</style>
      <button type="button" disabled={status !== 'idle'} onClick={() => setStatus('sending')} className={`relative flex h-14 min-w-48 items-center justify-center gap-2 overflow-hidden rounded-full px-7 text-sm font-bold text-white shadow-xl outline-none transition-all duration-500 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-default dark:focus-visible:ring-offset-zinc-950 ${status === 'sent' ? 'bg-emerald-500 shadow-emerald-500/25' : 'bg-gradient-to-r from-violet-600 to-teal-500 shadow-violet-500/25'} ${status === 'sending' ? 'scale-x-90' : 'scale-100'}`}>
        {status === 'sending' && <span aria-hidden className="pui-send-shine absolute inset-y-0 -left-1/2 w-1/3 -skew-x-[18deg] bg-white/35 motion-safe:animate-[pui-send-shine_.8s_ease-in-out_infinite]" />}
        {status === 'sent' ? <Check aria-hidden className="size-5" /> : <SendHorizontal aria-hidden className={`size-5 ${status === 'sending' ? 'pui-plane motion-safe:animate-[pui-plane-fly_.7s_ease-in_forwards]' : ''}`} />}
        <span aria-live="polite">{status === 'idle' ? 'Send message' : status === 'sending' ? 'Sending…' : 'Message sent'}</span>
      </button>
    </div>
  );
}
