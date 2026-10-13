/**
 * @registry
 * name: Hold To Record Button
 * category: Buttons
 * style: Dark
 * tags: recent
 * description: Bouton micro à maintenir pour enregistrer un message vocal : ondes qui pulsent, chronomètre, glisser pour annuler et envoi au relâchement.
 * prompt: Create a dark hold-to-record voice button like messaging apps: pressing and holding the round mic button (pointer or Space) starts recording — the button grows, concentric pulse rings radiate, a timer counts up and fake level bars animate; sliding the pointer left beyond 80px shows "Release to cancel" and cancels on release; releasing normally adds a voice message bubble with its duration to the list above; aria-pressed while recording and status via aria-live; reduced motion removes the pulses. Dark in both themes.
 */
'use client';
import { Mic, Play } from 'lucide-react';
import { useEffect, useRef, useState, type PointerEvent } from 'react';

export function HoldToRecordButton() {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [cancel, setCancel] = useState(false);
  const [messages, setMessages] = useState([7]);
  const [status, setStatus] = useState('');
  const startX = useRef(0);

  useEffect(() => {
    if (!recording) return;
    setSeconds(0);
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [recording]);

  function start(x: number) { startX.current = x; setCancel(false); setRecording(true); setStatus('Recording'); }
  function stop() {
    if (!recording) return;
    setRecording(false);
    if (cancel || seconds < 1) { setStatus(cancel ? 'Recording cancelled' : 'Too short, hold longer'); return; }
    setMessages((list) => [...list, seconds]);
    setStatus(`Voice message sent, ${seconds} seconds`);
  }

  return (
    <div className="w-full max-w-xs rounded-3xl bg-zinc-950 p-5 text-white ring-1 ring-white/10">
      <style>{`@keyframes pui-rec-pulse { from { transform: scale(1); opacity: .5 } to { transform: scale(2.2); opacity: 0 } } @keyframes pui-rec-bar { 0%, 100% { transform: scaleY(.3) } 50% { transform: scaleY(1) } }`}</style>
      <ul className="space-y-2">
        {messages.map((length, index) => <li key={index} className="ml-auto flex w-fit items-center gap-2 rounded-2xl rounded-br-md bg-emerald-600 px-3 py-2 text-xs"><Play aria-hidden className="size-3.5 fill-current" /><span aria-hidden className="flex h-4 items-center gap-0.5">{Array.from({ length: 14 }, (_, bar) => <span key={bar} className="w-0.5 rounded bg-white/80" style={{ height: `${30 + ((bar * 37 + index * 11) % 70)}%` }} />)}</span><span className="tabular-nums">0:{String(length).padStart(2, '0')}</span></li>)}
      </ul>
      <div className="mt-6 flex items-center gap-3">
        <p className="min-w-0 flex-1 text-sm text-zinc-400">{recording ? (cancel ? <span className="text-rose-400">Release to cancel</span> : <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-rose-500 motion-safe:animate-pulse" /><span className="tabular-nums text-white">0:{String(seconds).padStart(2, '0')}</span><span className="text-xs">← slide to cancel</span></span>) : 'Hold to record'}</p>
        <button
          type="button"
          aria-label="Hold to record a voice message"
          aria-pressed={recording}
          onPointerDown={(event: PointerEvent<HTMLButtonElement>) => { event.currentTarget.setPointerCapture(event.pointerId); start(event.clientX); }}
          onPointerMove={(event) => { if (recording) setCancel(startX.current - event.clientX > 80); }}
          onPointerUp={stop}
          onPointerCancel={() => { setCancel(true); stop(); }}
          onKeyDown={(event) => { if ((event.key === ' ' || event.key === 'Enter') && !event.repeat) { event.preventDefault(); start(0); } if (event.key === 'Escape' && recording) setCancel(true); }}
          onKeyUp={(event) => { if (event.key === ' ' || event.key === 'Enter') stop(); }}
          className={`relative grid touch-none select-none place-items-center rounded-full transition-all duration-200 ${recording ? 'size-16 bg-rose-500' : 'size-12 bg-emerald-500'}`}
        >
          {recording && [0, 0.5, 1].map((delay) => <span key={delay} aria-hidden className="absolute inset-0 rounded-full bg-rose-500 motion-safe:animate-[pui-rec-pulse_1.5s_ease-out_infinite]" style={{ animationDelay: `${delay}s` }} />)}
          {recording ? <span aria-hidden className="relative flex h-5 items-center gap-0.5">{[0, 1, 2, 3].map((bar) => <span key={bar} className="w-1 origin-center rounded bg-white motion-safe:animate-[pui-rec-bar_.6s_ease-in-out_infinite]" style={{ height: '100%', animationDelay: `${bar * 0.12}s` }} />)}</span> : <Mic aria-hidden className="relative size-5" />}
        </button>
      </div>
      <p aria-live="polite" className="sr-only">{status}</p>
    </div>
  );
}
