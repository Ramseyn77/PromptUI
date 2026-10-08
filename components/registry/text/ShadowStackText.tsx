/**
 * @registry
 * name: Shadow Stack Text
 * category: Text
 * style: Gradient
 * tags: recent
 * description: Titre rétro avec ombres colorées empilées en escalier qui se déploient au survol et se replient au repos.
 * prompt: Create a retro stacked-shadow headline: bold text with multiple hard text-shadows in a color sequence (yellow, orange, pink, violet) offset diagonally; at rest the stack is compact (1px steps), and on hover/focus-within it expands to 4px steps with a transition and the text lifts. Works in light (cream background) and dark (ink background).
 */
export function ShadowStackText() {
  const compact = '1px 1px 0 #facc15, 2px 2px 0 #fb923c, 3px 3px 0 #f472b6, 4px 4px 0 #a78bfa';
  const expanded = '4px 4px 0 #facc15, 8px 8px 0 #fb923c, 12px 12px 0 #f472b6, 16px 16px 0 #a78bfa';

  return (
    <a href="#groove" className="group block rounded-3xl bg-[#fff8e7] px-8 py-10 text-center outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:bg-[#17131f]">
      <style>{`.pui-stack{text-shadow:${compact};transition:text-shadow .35s cubic-bezier(.34,1.56,.64,1),transform .35s}.group:hover .pui-stack,.group:focus-visible .pui-stack{text-shadow:${expanded};transform:translate(-8px,-8px)}`}</style>
      <span className="pui-stack inline-block text-6xl font-black uppercase tracking-tight text-zinc-900 sm:text-7xl dark:text-white">Groove</span>
      <span className="mt-6 block text-sm text-zinc-600 dark:text-zinc-400">Hover me</span>
    </a>
  );
}
