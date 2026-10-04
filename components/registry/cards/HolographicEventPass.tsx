/**
 * @registry
 * name: Holographic Event Pass
 * category: Cards
 * style: Gradient
 * tags: featured, recent
 * description: Pass evenementiel avec reflet holographique, perforations et informations de billet.
 * prompt: Create a responsive event pass card with a dark premium surface, animated holographic sheen that fully crosses the card, perforated ticket edge, event date, venue, attendee name, seat and a compact decorative QR pattern. On hover the rainbow border brightens and a drifting holographic tint appears, but all information remains readable without motion. Use semantic article content, hide the fake QR from assistive technology, support light/dark contexts and prefers-reduced-motion.
 */

import { CalendarDays, MapPin } from 'lucide-react';

export function HolographicEventPass() {
  return (
    <article className="group relative w-full max-w-sm overflow-hidden rounded-[2rem] bg-zinc-950 p-1 text-white shadow-2xl shadow-violet-950/25">
      <style>{`@keyframes pui-pass-sheen{0%,20%{transform:translateX(-190%) rotate(14deg)}70%,100%{transform:translateX(480%) rotate(14deg)}}@keyframes pui-pass-holo{to{background-position:200% 50%}}@media(prefers-reduced-motion:reduce){.pui-pass-sheen,.pui-pass-holo{animation:none!important}}`}</style>
      <span aria-hidden className="absolute inset-0 bg-[conic-gradient(from_210deg_at_50%_50%,#2dd4bf,#60a5fa,#a78bfa,#fb7185,#facc15,#2dd4bf)] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative overflow-hidden rounded-[1.8rem] bg-zinc-950">
        {/* Translations are relative to the sheen's own width (a quarter of the card), so it fully crosses the pass. */}
        <span aria-hidden className="pui-pass-sheen absolute -inset-y-24 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-md motion-safe:animate-[pui-pass-sheen_4.5s_ease-in-out_infinite]" />
        <span aria-hidden className="pui-pass-holo pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_20%,rgba(45,212,191,.22)_35%,rgba(167,139,250,.22)_50%,rgba(251,113,133,.2)_65%,transparent_80%)] bg-[length:200%_100%] opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100 motion-safe:animate-[pui-pass-holo_2.5s_linear_infinite]" />
        <div className="relative p-6">
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-xs font-semibold uppercase tracking-[.25em] text-teal-300">Prompt Sessions</p><h3 className="mt-2 text-3xl font-black leading-none">Design in motion</h3></div>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">Admit one</span>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 text-xs text-zinc-300">
            <p className="flex items-center gap-2"><CalendarDays aria-hidden className="size-4 text-violet-300" /><span><span className="block text-zinc-500">Date</span>18 October · 19:00</span></p>
            <p className="flex items-center gap-2"><MapPin aria-hidden className="size-4 text-rose-300" /><span><span className="block text-zinc-500">Venue</span>Studio Hall · A2</span></p>
          </div>
        </div>
        <div className="relative border-t border-dashed border-white/20 px-6 py-5 before:absolute before:-left-3 before:-top-3 before:size-6 before:rounded-full before:bg-[var(--surface-2)] after:absolute after:-right-3 after:-top-3 after:size-6 after:rounded-full after:bg-[var(--surface-2)]">
          <div className="flex items-end justify-between gap-4">
            <div><p className="text-[10px] uppercase tracking-widest text-zinc-500">Guest</p><p className="mt-1 font-semibold">Alex Morgan</p><p className="mt-3 text-xs text-zinc-400">Row 04 · Seat 18</p></div>
            <div aria-hidden className="grid size-16 grid-cols-5 gap-0.5 rounded-lg bg-white p-2">{Array.from({ length: 25 }, (_, index) => <span key={index} className={`${[0,1,3,4,5,7,9,10,11,13,14,16,18,20,21,22,24].includes(index) ? 'bg-zinc-950' : 'bg-transparent'}`} />)}</div>
          </div>
        </div>
      </div>
    </article>
  );
}
