/**
 * @registry
 * name: Glitch Button
 * category: Buttons
 * style: Dark
 * tags: recent
 * description: Bouton cyberpunk dont le texte se dédouble en cyan/magenta et saute en tranches au survol.
 * prompt: Create a cyberpunk glitch button: angular clipped corners (clip-path polygon), neon yellow on black; on hover/focus two pseudo-copies of the label (data-text) offset in cyan and magenta jitter with clipped slices via keyframes for 0.6s loops. Glitch disabled with reduced motion. Same look in both themes.
 */
export function GlitchButton() {
  return (
    <div className="rounded-2xl bg-zinc-950 p-10">
      <style>{`.pui-glitch{position:relative}
.pui-glitch::before,.pui-glitch::after{content:attr(data-text);position:absolute;inset:0;display:grid;place-items:center;opacity:0;pointer-events:none}
.pui-glitch::before{color:#22d3ee;transform:translate(-2px,0)}
.pui-glitch::after{color:#f0abfc;transform:translate(2px,0)}
.pui-glitch:hover::before,.pui-glitch:focus-visible::before{opacity:.9;animation:pui-glitch-a .6s steps(2) infinite}
.pui-glitch:hover::after,.pui-glitch:focus-visible::after{opacity:.9;animation:pui-glitch-b .6s steps(2) infinite}
@keyframes pui-glitch-a{0%{clip-path:inset(10% 0 60% 0);transform:translate(-3px,-1px)}50%{clip-path:inset(55% 0 20% 0);transform:translate(3px,1px)}100%{clip-path:inset(30% 0 40% 0);transform:translate(-2px,0)}}
@keyframes pui-glitch-b{0%{clip-path:inset(65% 0 5% 0);transform:translate(3px,1px)}50%{clip-path:inset(5% 0 70% 0);transform:translate(-3px,-1px)}100%{clip-path:inset(40% 0 35% 0);transform:translate(2px,0)}}
@media (prefers-reduced-motion:reduce){.pui-glitch::before,.pui-glitch::after{animation:none!important}}`}</style>
      <button type="button" data-text="JACK IN_" className="pui-glitch bg-yellow-300 px-8 py-3 font-mono text-sm font-black tracking-[0.2em] text-zinc-950 outline-none transition hover:bg-yellow-200 focus-visible:bg-cyan-300 [clip-path:polygon(0_0,calc(100%-14px)_0,100%_14px,100%_100%,14px_100%,0_calc(100%-14px))]">JACK IN_</button>
    </div>
  );
}
