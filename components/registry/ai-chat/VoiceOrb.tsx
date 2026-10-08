/**
 * @registry
 * name: Voice Orb
 * category: AI Chat
 * style: Gradient
 * tags: featured, recent
 * description: Orbe vocale animée qui pulse et ondule quand l'assistant écoute.
 * prompt: Create a voice assistant orb: a gradient sphere with a slow morphing border-radius blob animation; tapping toggles listening, which adds expanding rings and a live waveform of animated bars. Button with aria-pressed and a status label. Light and dark mode, reduced-motion safe.
 */
'use client';
import { Mic, MicOff } from 'lucide-react';
import { useState } from 'react';

export function VoiceOrb() {
  const [listening, setListening] = useState(false);

  return (
    <>
      <style>{`@keyframes pui-morph{0%,100%{border-radius:42% 58% 55% 45%/48% 42% 58% 52%}50%{border-radius:58% 42% 45% 55%/55% 58% 42% 45%}}@keyframes pui-ring{to{transform:scale(1.9);opacity:0}}@keyframes pui-bar{50%{transform:scaleY(.3)}}`}</style>
      <div className="flex flex-col items-center gap-6">
        <button
          type="button"
          aria-pressed={listening}
          aria-label={listening ? 'Stop listening' : 'Start listening'}
          onClick={() => setListening((value) => !value)}
          className="relative grid size-36 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-500/40"
        >
          {listening && [0, 1].map((ring) => <span key={ring} aria-hidden className="absolute inset-4 rounded-full border-2 border-violet-400/60 motion-safe:animate-[pui-ring_2s_ease-out_infinite]" style={{ animationDelay: `${ring}s` }} />)}
          <span aria-hidden className={`absolute inset-4 bg-[radial-gradient(circle_at_30%_30%,#99f6e4,#8b5cf6_55%,#312e81)] shadow-2xl shadow-violet-500/40 motion-safe:animate-[pui-morph_7s_ease-in-out_infinite] transition-transform duration-500 ${listening ? 'scale-105' : ''}`} />
          {listening ? <MicOff aria-hidden className="relative size-7 text-white" /> : <Mic aria-hidden className="relative size-7 text-white" />}
        </button>
        <div aria-hidden className={`flex h-8 items-center gap-1 transition-opacity ${listening ? 'opacity-100' : 'opacity-0'}`}>
          {Array.from({ length: 9 }, (_, index) => <span key={index} className="h-full w-1 origin-center rounded-full bg-violet-500 motion-safe:animate-[pui-bar_.9s_ease-in-out_infinite] dark:bg-violet-400" style={{ animationDelay: `${index * 0.08}s` }} />)}
        </div>
        <p role="status" className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{listening ? 'Listening…' : 'Tap to talk'}</p>
      </div>
    </>
  );
}
