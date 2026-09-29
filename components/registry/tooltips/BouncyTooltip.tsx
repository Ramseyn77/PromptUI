/**
 * @registry
 * name: Bouncy Tooltip
 * category: Tooltips
 * style: Gradient
 * tags: recent
 * description: Info-bulle en degrade qui surgit avec un rebond elastique et une petite rotation.
 * prompt: Create a playful tooltip that pops from the trigger with a springy overshoot (scale 0 → 1.1 → 1 and slight rotate) using a cubic-bezier with overshoot, gradient background and arrow, on hover and focus-visible; role="tooltip". Reduced motion uses a simple fade. Light and dark mode.
 */
export function BouncyTooltip() {
  return (
    <div className="group relative mt-14 inline-block">
      <button type="button" aria-describedby="bouncy-tip" className="rounded-full bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">Hover me 👋</button>
      <span
        id="bouncy-tip"
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 mb-3 origin-bottom -translate-x-1/2 -rotate-6 scale-0 whitespace-nowrap rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition duration-300 ease-[cubic-bezier(.34,1.8,.64,1)] group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100 group-has-[:focus-visible]:rotate-0 group-has-[:focus-visible]:scale-100 group-has-[:focus-visible]:opacity-100 motion-reduce:rotate-0 motion-reduce:scale-100 motion-reduce:transition-opacity"
      >
        Hi there, nice to meet you!
        <span aria-hidden className="absolute -bottom-1 left-1/2 size-2.5 -translate-x-1/2 rotate-45 bg-violet-600" />
      </span>
    </div>
  );
}
