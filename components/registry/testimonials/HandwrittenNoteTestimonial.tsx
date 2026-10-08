/**
 * @registry
 * name: Handwritten Note Testimonial
 * category: Testimonials
 * style: Editorial
 * tags: recent
 * description: Témoignage façon mot manuscrit sur papier ligné, punaisé et légèrement incliné, avec signature.
 * prompt: Create a handwritten-note testimonial: a slightly rotated lined-paper card (repeating-linear-gradient rules, red margin line), a pushpin at the top, the message in a cursive font stack, a signature and date bottom-right; hovering straightens the note with a gentle lift. Paper stays light in both themes but the surrounding surface adapts. Reduced motion: no rotation change.
 */
export function HandwrittenNoteTestimonial() {
  return (
    <div className="grid w-full max-w-md place-items-center rounded-3xl bg-[#e9e2d3] p-10 dark:bg-zinc-900">
      <figure className="group relative w-full max-w-xs -rotate-3 rounded-sm bg-[#fffdf6] bg-[repeating-linear-gradient(transparent_0_27px,#c7d7ee_27px_28px)] px-6 pb-6 pt-8 shadow-xl shadow-black/15 transition-transform duration-500 hover:-translate-y-1 hover:rotate-0 motion-reduce:transition-none">
        <span aria-hidden className="absolute left-10 top-0 h-full w-px bg-rose-300" />
        <span aria-hidden className="absolute -top-3 left-1/2 size-6 -translate-x-1/2 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 shadow-md ring-2 ring-rose-700/30" />
        <blockquote className="relative pl-6 text-xl leading-[28px] text-slate-800 [font-family:'Segoe_Print','Bradley_Hand','Comic_Sans_MS',cursive]">
          Thank you for building something that made our tiny team feel like a real studio. We launched in two weeks!
        </blockquote>
        <figcaption className="mt-4 text-right text-lg text-slate-700 [font-family:'Segoe_Print','Bradley_Hand',cursive]">— Mariama & Jo<span className="block text-xs text-slate-500 [font-family:ui-sans-serif]">Atelier Teranga · Sept 2026</span></figcaption>
      </figure>
    </div>
  );
}
