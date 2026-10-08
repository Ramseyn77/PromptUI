/**
 * @registry
 * name: Rainbow Underline Text
 * category: Text
 * style: Minimal
 * tags: recent
 * description: Liens dans un paragraphe avec soulignement arc-en-ciel qui se dessine au survol et au focus, multi-lignes compris.
 * prompt: Create a paragraph with inline links whose underline is a rainbow gradient drawn with background-image on the inline element (box-decoration-break: clone so it wraps across lines); the underline grows from 0 to full width on hover and focus-visible, and thickens slightly; visible focus ring; works with reduced motion (instant). Light and dark mode.
 */
export function RainbowUnderlineText() {
  const link = 'rounded-sm bg-[linear-gradient(90deg,#f43f5e,#f59e0b,#10b981,#3b82f6,#8b5cf6,#f43f5e)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-0.5 font-medium text-zinc-900 underline decoration-zinc-300 decoration-1 underline-offset-[5px] hover:decoration-transparent focus-visible:decoration-transparent dark:decoration-zinc-700 [box-decoration-break:clone] transition-[background-size] duration-500 hover:bg-[length:100%_3px] focus-visible:bg-[length:100%_3px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 motion-reduce:transition-none dark:text-zinc-100';

  return (
    <div className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        PromptUI is a growing collection of <a href="#" className={link}>production-ready components</a> you can paste straight into a Next.js app. Every piece ships with <a href="#" className={link}>light and dark themes, keyboard support and reduced-motion fallbacks</a>, so you can spend your time on what makes your product different. Read the <a href="#" className={link}>contribution guide</a> to add your own.
      </p>
    </div>
  );
}
