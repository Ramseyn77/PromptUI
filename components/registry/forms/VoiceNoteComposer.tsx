/**
 * @registry
 * name: Voice Note Composer
 * category: Forms
 * style: SaaS
 * tags: recent
 * description: Composeur de note vocale avec enregistrement simule, forme d'onde et actions accessibles.
 * prompt: Create a responsive voice-note composer that simulates recording with a live timer and animated waveform, then lets users preview, pause, delete or send the recording. Do not request microphone permission.
 */
'use client';

import { Mic, Pause, Play, Send, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const bars = [35, 62, 45, 88, 58, 76, 42, 92, 55, 70, 38, 82, 50, 66, 44, 74, 48, 86];

export function VoiceNoteComposer() {
  const [state, setState] = useState<'idle' | 'recording' | 'ready' | 'playing'>('idle');
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (state !== 'recording') return;
    const timer = window.setInterval(() => setSeconds((value) => Math.min(99, value + 1)), 1000);
    return () => window.clearInterval(timer);
  }, [state]);
  const reset = () => { setState('idle'); setSeconds(0); };

  return (
    <section className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-4 shadow-lg shadow-cyan-500/10 dark:border-zinc-800 dark:bg-zinc-950 sm:p-5">
      <div className="mb-4 flex items-center justify-between"><div><p className="text-sm font-semibold text-zinc-950 dark:text-white">Voice note</p><p className="text-xs text-zinc-500">Share an idea while it is fresh</p></div><span className={`size-2.5 rounded-full ${state === 'recording' ? 'animate-pulse bg-rose-500' : 'bg-zinc-300 dark:bg-zinc-700'}`} aria-hidden="true" /></div>
      <div className="flex min-h-24 items-center gap-3 rounded-2xl bg-zinc-50 p-3 dark:bg-zinc-900 sm:gap-4 sm:p-4">
        <button type="button" onClick={() => state === 'idle' ? setState('recording') : state === 'recording' ? setState('ready') : setState(state === 'playing' ? 'ready' : 'playing')} aria-label={state === 'idle' ? 'Start recording' : state === 'recording' ? 'Stop recording' : state === 'playing' ? 'Pause preview' : 'Play preview'} className={`grid size-12 shrink-0 place-items-center rounded-full text-white transition hover:scale-105 motion-reduce:transform-none ${state === 'recording' ? 'bg-rose-500' : 'bg-cyan-600'}`}>{state === 'idle' ? <Mic size={20} /> : state === 'recording' || state === 'playing' ? <Pause size={19} fill="currentColor" /> : <Play size={19} fill="currentColor" />}</button>
        <div className="min-w-0 flex-1"><div className="flex h-11 items-center justify-between gap-1 overflow-hidden" aria-hidden="true">{bars.map((height, index) => <span key={index} style={{ height: `${state === 'idle' ? 10 : height}%`, animationDelay: `${index * 55}ms` }} className={`w-1 min-w-1 rounded-full bg-cyan-500 transition-all ${state === 'recording' ? 'animate-pulse' : ''}`} />)}</div><div className="mt-2 flex justify-between text-xs text-zinc-500"><span>{state === 'recording' ? 'Recording…' : state === 'idle' ? 'Tap to record' : 'Preview ready'}</span><span className="font-mono tabular-nums">00:{String(seconds).padStart(2, '0')}</span></div></div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        {state !== 'idle' && <button type="button" onClick={reset} aria-label="Delete voice note" className="grid size-10 place-items-center rounded-xl border border-zinc-200 text-zinc-500 hover:text-rose-500 dark:border-zinc-800"><Trash2 size={17} /></button>}
        <p className="mr-auto truncate text-xs text-zinc-400">Audio stays on this device</p>
        <button type="button" disabled={state === 'idle' || state === 'recording'} className="flex items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-30 dark:bg-white dark:text-zinc-950"><Send size={16} />Send</button>
      </div>
    </section>
  );
}
