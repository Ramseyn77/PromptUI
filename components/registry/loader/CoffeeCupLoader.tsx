/**
 * @registry
 * name: Coffee Cup Loader
 * category: Loader
 * style: Editorial
 * tags: recent
 * description: Loader tasse de café qui se remplit par vagues avec vapeur ondulante et message « Préparation de votre espace… », en boucle.
 * prompt: Create a coffee cup loader in CSS: a cup with a handle where the coffee level rises and falls in a loop with a wavy surface (a rotating rounded square clipped by the cup), three steam wisps rising and fading with staggered delays, and a serif caption "Brewing your workspace…"; role=status; reduced motion shows a full static cup without steam animation. Light (cream) and dark mode.
 */
export function CoffeeCupLoader() {
  return (
    <div role="status" className="flex flex-col items-center gap-4 rounded-3xl bg-[#f6efe4] p-10 dark:bg-zinc-950">
      <style>{`
        @keyframes pui-coffee-fill { 0%, 100% { transform: translateY(70%) } 50% { transform: translateY(15%) } }
        @keyframes pui-coffee-wave { from { transform: translateX(-50%) rotate(0deg) } to { transform: translateX(-50%) rotate(360deg) } }
        @keyframes pui-steam { 0% { transform: translateY(6px) scaleY(.6); opacity: 0 } 40% { opacity: .7 } 100% { transform: translateY(-22px) scaleY(1.1); opacity: 0 } }
        @media (prefers-reduced-motion: reduce) { .pui-coffee * { animation: none !important } .pui-coffee-level { transform: translateY(15%) !important } }
      `}</style>
      <div aria-hidden className="pui-coffee relative">
        <div className="absolute -top-9 left-1/2 flex -translate-x-1/2 gap-2">{[0, 0.4, 0.8].map((delay) => <span key={delay} className="h-8 w-1.5 rounded-full bg-zinc-400/50 blur-[1px] [animation:pui-steam_2s_ease-in_infinite] dark:bg-zinc-300/40" style={{ animationDelay: `${delay}s` }} />)}</div>
        <div className="relative h-20 w-24 overflow-hidden rounded-b-[2rem] rounded-t-md border-4 border-zinc-800 bg-white dark:border-zinc-200 dark:bg-zinc-900">
          <div className="pui-coffee-level absolute inset-0 [animation:pui-coffee-fill_3s_ease-in-out_infinite]">
            <span className="absolute left-1/2 top-0 size-40 -translate-y-[85%] rounded-[38%] bg-[#6b3f1d] [animation:pui-coffee-wave_4s_linear_infinite]" />
            <span className="absolute inset-x-0 top-[14px] bottom-0 bg-[#6b3f1d]" />
          </div>
        </div>
        <span className="absolute -right-5 top-3 h-10 w-6 rounded-r-full border-4 border-l-0 border-zinc-800 dark:border-zinc-200" />
        <span className="mx-auto mt-1 block h-1.5 w-32 -translate-x-1 rounded-full bg-zinc-800/20 dark:bg-zinc-200/20" />
      </div>
      <p className="font-serif text-sm italic text-zinc-700 dark:text-zinc-300">Brewing your workspace…</p>
    </div>
  );
}
