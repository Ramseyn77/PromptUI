/**
 * @registry
 * name: Prism Sweep
 * category: Shaders
 * style: Gradient
 * tags: recent
 * description: Surface prismatique animée composée de faisceaux colorés et de reflets en mouvement.
 * prompt: Create a responsive prismatic light surface using layered CSS gradients only: a dark base, two large blurred conic gradients rotating in opposite directions, diagonal light streaks crossing the canvas, subtle grain and a centered glass label. Scope every keyframe name, keep contrast in light/dark contexts and stop decorative motion with prefers-reduced-motion.
 */

export function PrismSweep() {
  return (
    <div className="relative h-72 w-full max-w-xl overflow-hidden rounded-[2rem] bg-[#08080d] shadow-2xl shadow-violet-950/30">
      <style>{`@keyframes pui-prism-a{to{transform:translate(-50%,-50%) rotate(360deg)}}@keyframes pui-prism-b{to{transform:translate(-50%,-50%) rotate(-360deg)}}@keyframes pui-prism-streak{0%,100%{transform:translateX(-140%) skewX(-20deg);opacity:0}35%,65%{opacity:.8}100%{transform:translateX(260%) skewX(-20deg);opacity:0}}@media(prefers-reduced-motion:reduce){.pui-prism-a,.pui-prism-b,.pui-prism-streak{animation:none!important}}`}</style>
      <span aria-hidden className="pui-prism-a absolute left-1/2 top-1/2 size-[32rem] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent,#22d3ee55,transparent,#a78bfa66,transparent,#fb718555,transparent)] blur-2xl motion-safe:animate-[pui-prism-a_12s_linear_infinite]" />
      <span aria-hidden className="pui-prism-b absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_90deg,transparent,#facc1555,transparent,#2dd4bf66,transparent,#818cf855,transparent)] blur-xl motion-safe:animate-[pui-prism-b_8s_linear_infinite]" />
      <span aria-hidden className="pui-prism-streak absolute inset-y-[-20%] left-0 w-24 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/70 to-transparent blur-md motion-safe:animate-[pui-prism-streak_4s_ease-in-out_infinite]" />
      <span aria-hidden className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(255,255,255,.45)_0.6px,transparent_0.7px)] [background-size:5px_5px] mix-blend-soft-light" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="rounded-full border border-white/20 bg-black/25 px-5 py-2.5 text-center text-white shadow-xl backdrop-blur-xl"><p className="text-sm font-semibold tracking-wide">Prismatic surface</p><p className="mt-0.5 text-[10px] uppercase tracking-[.24em] text-white/55">CSS light study</p></div>
      </div>
    </div>
  );
}
