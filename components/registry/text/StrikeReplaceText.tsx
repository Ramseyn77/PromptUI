/**
 * @registry
 * name: Strike Replace Text
 * category: Text
 * style: Editorial
 * tags: recent
 * description: Titre où un mot se fait barrer d'un trait puis remplacer par un autre écrit au-dessus.
 * prompt: Create a headline "Building UI is hard" where "hard" gets struck through by an animated line (scaleX from left) and then the replacement word "fun" drops in above it in an accent color with a handwritten feel; loops every few seconds, static final state with reduced motion. Full sentence for screen readers. Light and dark mode.
 */
export function StrikeReplaceText() {
  return (
    <>
      <style>{`@keyframes pui-strike{0%,15%{transform:scaleX(0)}35%,85%{transform:scaleX(1)}100%{transform:scaleX(0)}}@keyframes pui-replace{0%,35%{opacity:0;transform:translateY(-10px) rotate(-6deg)}45%,85%{opacity:1;transform:translateY(0) rotate(-6deg)}100%{opacity:0}}`}</style>
      <h2 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
        <span className="sr-only">Building UI is fun.</span>
        <span aria-hidden>
          Building UI is{' '}
          <span className="relative inline-block">
            hard
            <span className="absolute inset-x-[-4px] top-[55%] h-1 origin-left scale-x-100 rounded-full bg-rose-500 motion-safe:animate-[pui-strike_4s_ease-in-out_infinite]" />
            <span className="absolute -top-9 left-1/2 -translate-x-1/2 font-serif text-3xl italic text-teal-600 [transform:rotate(-6deg)] motion-safe:animate-[pui-replace_4s_ease-in-out_infinite] dark:text-teal-400">fun</span>
          </span>
        </span>
      </h2>
    </>
  );
}
