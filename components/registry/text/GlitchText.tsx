/**
 * @registry
 * name: Glitch Text
 * category: Text
 * style: Dark
 * tags: recent
 * description: Titre au glitch RGB : deux copies decalees cyan et magenta decoupees en tranches qui sautent.
 * prompt: Create an RGB glitch headline: the text plus two aria-hidden pseudo-copies (via data-text + before/after) in cyan and magenta, offset horizontally and clipped with animated clip-path inset slices (steps timing) for a digital glitch. Dark stage in both themes; glitch only on hover when prefers-reduced-motion.
 */
export function GlitchText() {
  return (
    <>
      <style>{`
        @keyframes pui-glitch-a{0%{clip-path:inset(10% 0 80% 0)}20%{clip-path:inset(60% 0 20% 0)}40%{clip-path:inset(30% 0 50% 0)}60%{clip-path:inset(80% 0 5% 0)}80%{clip-path:inset(5% 0 70% 0)}100%{clip-path:inset(45% 0 40% 0)}}
        @keyframes pui-glitch-b{0%{clip-path:inset(70% 0 10% 0)}25%{clip-path:inset(15% 0 60% 0)}50%{clip-path:inset(50% 0 30% 0)}75%{clip-path:inset(0 0 85% 0)}100%{clip-path:inset(35% 0 50% 0)}}
        .pui-glitch{position:relative}
        .pui-glitch::before,.pui-glitch::after{content:attr(data-text);position:absolute;inset:0}
        .pui-glitch::before{color:#22d3ee;transform:translateX(-3px);animation:pui-glitch-a 1.8s steps(1) infinite}
        .pui-glitch::after{color:#f0abfc;transform:translateX(3px);animation:pui-glitch-b 1.4s steps(1) infinite}
        @media (prefers-reduced-motion:reduce){.pui-glitch::before,.pui-glitch::after{animation:none;opacity:0}.pui-glitch:hover::before,.pui-glitch:hover::after{opacity:1}}
      `}</style>
      <div className="rounded-3xl bg-zinc-950 px-10 py-12">
        <h2 data-text="SYSTEM_ERROR" className="pui-glitch font-mono text-4xl font-black tracking-tight text-white sm:text-5xl">SYSTEM_ERROR</h2>
      </div>
    </>
  );
}
