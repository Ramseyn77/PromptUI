/**
 * @registry
 * name: Voice Recorder Input
 * category: AI Chat
 * style: Dark
 * tags: featured, recent
 * description: Saisie vocale : maintenir pour enregistrer, forme d'onde vivante, minuteur, puis transcription simulée.
 * prompt: Create a voice input for an AI chat: a mic button you press and hold (pointer and Space key) to record; while recording, a live waveform of 28 bars animates with deterministic pseudo-random heights, a red dot and mm:ss timer show, and "Release to send · Slide to cancel" hint; releasing shows a transcript bubble that types in. aria-pressed and aria-live status. Dark in both themes.
 */
'use client';
import { Mic } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const transcript = 'Summarize yesterday’s sales call and draft a follow-up email.';

export function VoiceRecorderInput() {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [tick, setTick] = useState(0);
  const [typed, setTyped] = useState('');
  const start = useRef(0);

  useEffect(() => {
    if (!recording) return;
    start.current = Date.now();
    const timer = window.setInterval(() => { setSeconds(Math.floor((Date.now() - start.current) / 1000)); setTick((value) => value + 1); }, 120);
    return () => window.clearInterval(timer);
  }, [recording]);

  function stop() {
    if (!recording) return;
    setRecording(false);
    let index = 0;
    const timer = window.setInterval(() => { index += 2; setTyped(transcript.slice(0, index)); if (index >= transcript.length) window.clearInterval(timer); }, 30);
  }

  return (
    <div className="w-full max-w-sm rounded-3xl bg-zinc-950 p-4 text-white ring-1 ring-white/10">
      <div className="min-h-16">
        {typed && <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-violet-600 px-3.5 py-2 text-sm">{typed}</p>}
      </div>
      <div className="mt-3 flex items-center gap-3 rounded-2xl bg-white/5 p-2">
        <div className="flex h-10 flex-1 items-center gap-[3px] px-2">
          {recording ? Array.from({ length: 28 }, (_, i) => <span key={i} className="w-1 rounded-full bg-violet-300 transition-all duration-100" style={{ height: `${20 + Math.abs(Math.sin((i + tick) * 0.7) * Math.cos(i * 0.3 + tick * 0.2)) * 80}%` }} />) : <span className="text-sm text-zinc-500">{typed ? 'Hold to record again' : 'Hold the mic to talk'}</span>}
        </div>
        {recording && <span aria-live="polite" className="flex items-center gap-1.5 font-mono text-xs text-rose-300"><span className="size-2 animate-pulse rounded-full bg-rose-500" />{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</span>}
        <button
          type="button"
          aria-pressed={recording}
          aria-label={recording ? 'Recording, release to send' : 'Hold to record'}
          onPointerDown={() => { setTyped(''); setSeconds(0); setRecording(true); }}
          onPointerUp={stop}
          onPointerLeave={stop}
          onKeyDown={(event) => { if (event.key === ' ' && !recording) { event.preventDefault(); setTyped(''); setRecording(true); } }}
          onKeyUp={(event) => { if (event.key === ' ') stop(); }}
          className={`grid size-11 shrink-0 touch-none place-items-center rounded-full outline-none transition focus-visible:ring-2 focus-visible:ring-violet-400 ${recording ? 'scale-110 bg-rose-500' : 'bg-violet-600 hover:bg-violet-500'}`}
        ><Mic aria-hidden className="size-5" /></button>
      </div>
      <p className="mt-2 text-center text-[11px] text-zinc-500">{recording ? 'Release to send' : 'Press and hold · Space works too'}</p>
    </div>
  );
}
