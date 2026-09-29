/**
 * @registry
 * name: Liquid Chrome
 * category: Shaders
 * style: Gradient
 * tags: recent
 * description: Surface chromee liquide aux reflets irises qui coulent et changent de teinte.
 * prompt: Create a liquid-chrome surface: layered repeating-linear and conic gradients in silver tones with an iridescent overlay (mix-blend color-dodge) whose background-position and hue-rotate animate slowly, plus a blurred highlight streak. Readable label on top; reduced-motion safe.
 */
export function LiquidChrome() {
  return (
    <>
      <style>{`@keyframes pui-chrome{to{background-position:200% 100%,0 0;filter:hue-rotate(360deg)}}@keyframes pui-streak{50%{transform:translateX(160%) rotate(20deg)}}`}</style>
      <div className="relative grid h-64 w-full max-w-xl place-items-center overflow-hidden rounded-3xl bg-[repeating-linear-gradient(115deg,#f4f4f5_0%,#a1a1aa_12%,#fafafa_20%,#71717a_30%,#e4e4e7_40%)] bg-[length:200%_200%] dark:bg-[repeating-linear-gradient(115deg,#27272a_0%,#71717a_12%,#18181b_20%,#a1a1aa_30%,#3f3f46_40%)]">
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(120deg,rgba(94,234,212,.55),rgba(196,181,253,.55),rgba(251,207,232,.5),rgba(94,234,212,.55)),linear-gradient(0deg,transparent,transparent)] bg-[length:200%_100%] mix-blend-color-dodge motion-safe:animate-[pui-chrome_10s_linear_infinite] dark:mix-blend-overlay" />
        <div aria-hidden className="absolute -left-1/3 top-0 h-full w-1/3 rotate-[20deg] bg-white/40 blur-2xl motion-safe:animate-[pui-streak_6s_ease-in-out_infinite]" />
        <p className="relative rounded-full bg-white/50 px-4 py-2 text-sm font-semibold text-zinc-900 backdrop-blur dark:bg-black/40 dark:text-white">Liquid chrome</p>
      </div>
    </>
  );
}
