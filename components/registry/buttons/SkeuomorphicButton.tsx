/**
 * @registry
 * name: Skeuomorphic Button
 * category: Buttons
 * style: Gradient
 * tags: featured, recent
 * description: Boutons en relief réaliste (plastique brillant, métal brossé, gomme) avec ombres internes et enfoncement au clic.
 * prompt: Create three skeuomorphic buttons: glossy plastic (top highlight gradient, colored body, bottom shadow), brushed metal (repeating linear gradient texture, engraved label with text-shadow) and soft rubber (matte, inset shadow when pressed); all physically depress on :active (translateY 2px, reduced bottom shadow); focus rings visible. Same look in both themes on a neutral pad.
 */
export function SkeuomorphicButton() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5 rounded-3xl bg-gradient-to-b from-zinc-200 to-zinc-300 p-8 dark:from-zinc-700 dark:to-zinc-800">
      <button type="button" className="relative rounded-xl bg-gradient-to-b from-rose-400 to-rose-600 px-6 py-3 font-semibold text-white shadow-[0_4px_0_#9f1239,0_8px_14px_rgba(0,0,0,.25),inset_0_1px_0_rgba(255,255,255,.5)] outline-none transition-transform [text-shadow:0_1px_1px_rgba(0,0,0,.35)] before:absolute before:inset-x-2 before:top-1 before:h-1/3 before:rounded-lg before:bg-white/35 before:content-[''] active:translate-y-[3px] active:shadow-[0_1px_0_#9f1239,0_3px_6px_rgba(0,0,0,.25)] focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2">Record</button>
      <button type="button" className="rounded-lg bg-[repeating-linear-gradient(90deg,#d4d4d8_0_1px,#e4e4e7_1px_3px)] px-6 py-3 font-bold uppercase tracking-widest text-zinc-600 shadow-[0_3px_0_#71717a,0_6px_10px_rgba(0,0,0,.2),inset_0_1px_0_#fff] outline-none [text-shadow:0_1px_0_#fff] transition-transform active:translate-y-[2px] active:shadow-[0_1px_0_#71717a,inset_0_1px_0_#fff] focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2">Engage</button>
      <button type="button" className="rounded-full bg-zinc-800 px-6 py-3 font-semibold text-zinc-200 shadow-[0_4px_8px_rgba(0,0,0,.35),inset_0_1px_1px_rgba(255,255,255,.12)] outline-none transition active:translate-y-[1px] active:shadow-[inset_0_3px_6px_rgba(0,0,0,.6)] focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2">Power</button>
    </div>
  );
}
