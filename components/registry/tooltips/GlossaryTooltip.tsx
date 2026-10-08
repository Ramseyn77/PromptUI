/**
 * @registry
 * name: Glossary Tooltip
 * category: Tooltips
 * style: Editorial
 * tags: recent
 * description: Termes techniques soulignés en pointillés dans un texte, définition en bulle au survol et au focus.
 * prompt: Create a paragraph with glossary terms: each term is a focusable <dfn>-styled button with a dotted underline that shows a definition tooltip (title + one sentence) on hover/focus; role="tooltip" + aria-describedby; tooltips don't overflow the paragraph edge (anchored left). Serif editorial text, light and dark mode.
 */
const terms = {
  hydration: 'The step where React attaches event handlers to server-rendered HTML in the browser.',
  CLS: 'Cumulative Layout Shift: how much visible content jumps around while the page loads.',
};

function Term({ word }: { word: keyof typeof terms }) {
  return (
    <span className="group relative inline-block">
      <button type="button" aria-describedby={`gloss-${word}`} className="cursor-help font-medium text-zinc-900 underline decoration-teal-500 decoration-dotted decoration-2 underline-offset-4 outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-white">{word}</button>
      <span id={`gloss-${word}`} role="tooltip" className="pointer-events-none absolute left-0 top-full z-10 mt-2 w-64 translate-y-1 rounded-xl border border-zinc-200 bg-white p-3 font-sans text-xs leading-5 text-zinc-600 opacity-0 shadow-xl transition group-hover:translate-y-0 group-hover:opacity-100 group-has-[:focus-visible]:translate-y-0 group-has-[:focus-visible]:opacity-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
        <strong className="block text-sm text-zinc-900 dark:text-white">{word}</strong>{terms[word]}
      </span>
    </span>
  );
}

export function GlossaryTooltip() {
  return (
    <p className="max-w-md pb-24 font-serif text-lg leading-8 text-zinc-700 dark:text-zinc-300">
      Rendering on the server makes pages feel instant, but a slow <Term word="hydration" /> can make buttons ignore clicks, and late images push content down, hurting your <Term word="CLS" /> score.
    </p>
  );
}
