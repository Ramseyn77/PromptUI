/**
 * @registry
 * name: Animated Underlines
 * category: Text
 * style: Minimal
 * tags: recent
 * description: Quatre styles de liens soulignés animés : glissement, centré, surligneur et vague.
 * prompt: Create four animated link underline styles shown side by side: slide-in from left (background-size), grow from center (scale-x pseudo), marker fill behind text, and an SVG wavy underline that animates its dash on hover; all work on focus-visible too. Light and dark mode.
 */
export function AnimatedUnderlines() {
  const base = 'text-lg font-semibold text-zinc-900 outline-none dark:text-white';
  return (
    <>
      <style>{`@keyframes pui-wave-draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}`}</style>
      <div className="grid w-full max-w-lg grid-cols-2 gap-8">
        <a href="#" className={`${base} bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-300 hover:bg-[length:100%_2px] focus-visible:bg-[length:100%_2px]`}>Slide in</a>
        <a href="#" className={`${base} relative w-fit pb-1 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:scale-x-0 after:bg-teal-500 after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100`}>From center</a>
        <a href="#" className={`${base} w-fit bg-[linear-gradient(rgba(250,204,21,.6),rgba(250,204,21,.6))] bg-[length:100%_30%] bg-bottom bg-no-repeat px-1 transition-[background-size] duration-300 hover:bg-[length:100%_100%] focus-visible:bg-[length:100%_100%]`}>Marker fill</a>
        <a href="#" className={`${base} group relative w-fit pb-2`}>
          Wavy
          <svg aria-hidden viewBox="0 0 100 8" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-2 w-full opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100">
            <path d="M0 4 Q 6 0 12.5 4 T 25 4 T 37.5 4 T 50 4 T 62.5 4 T 75 4 T 87.5 4 T 100 4" pathLength={1} strokeDasharray={1} fill="none" stroke="#8b5cf6" strokeWidth="1.5" className="group-hover:motion-safe:animate-[pui-wave-draw_.5s_ease-out_both]" />
          </svg>
        </a>
      </div>
    </>
  );
}
