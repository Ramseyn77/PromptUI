/**
 * @registry
 * name: Neon Flicker Text
 * category: Text
 * style: Dark
 * tags: recent
 * description: Enseigne au néon : lettres lumineuses multi-couches, une lettre défaillante qui clignote irrégulièrement, interrupteur pour allumer/éteindre.
 * prompt: Create a neon sign text on a dark brick-like background: the word "OPEN LATE" rendered with layered text-shadows in pink and cyan tubes; one letter flickers on an irregular keyframe pattern like a faulty tube; a power switch (role=switch) turns the sign off (tubes go dim grey with no glow) and on (quick buzz-on flicker); full text available to screen readers; reduced motion removes the flicker. Dark in both themes.
 */
'use client';
import { useState } from 'react';

export function NeonFlickerText() {
  const [on, setOn] = useState(true);
  const glow = (color: string) => (on ? { color: '#fff', textShadow: `0 0 4px #fff, 0 0 10px ${color}, 0 0 22px ${color}, 0 0 44px ${color}, 0 0 80px ${color}` } : { color: '#3f3f46', textShadow: 'none' });

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-6 rounded-3xl bg-[#140d16] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_24px] p-10">
      <style>{`
        @keyframes pui-neon-flicker { 0%, 18%, 22%, 25%, 53%, 57%, 100% { opacity: 1 } 20%, 24%, 55% { opacity: .15 } }
        @keyframes pui-neon-on { 0% { opacity: 0 } 10% { opacity: 1 } 15% { opacity: .2 } 30% { opacity: 1 } 35% { opacity: .4 } 100% { opacity: 1 } }
        @media (prefers-reduced-motion: reduce) { .pui-neon * { animation: none !important } }
      `}</style>
      <p key={String(on)} className="pui-neon select-none text-center font-[cursive] text-6xl tracking-wide motion-safe:animate-[pui-neon-on_.8s_linear]" aria-label="Open late">
        <span aria-hidden style={glow('#ec4899')}>OP</span><span aria-hidden className={on ? 'motion-safe:animate-[pui-neon-flicker_3.2s_linear_infinite]' : ''} style={glow('#ec4899')}>E</span><span aria-hidden style={glow('#ec4899')}>N</span>
        <br />
        <span aria-hidden style={glow('#22d3ee')}>LATE</span>
      </p>
      <button type="button" role="switch" aria-checked={on} onClick={() => setOn(!on)} className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs text-zinc-300 ring-1 ring-white/10 hover:bg-white/10"><span className={`size-2 rounded-full ${on ? 'bg-pink-500 shadow-[0_0_8px_#ec4899]' : 'bg-zinc-600'}`} />{on ? 'Sign on' : 'Sign off'}</button>
    </div>
  );
}
