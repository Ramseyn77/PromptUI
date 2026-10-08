/**
 * @registry
 * name: Aurora Text
 * category: Text
 * style: Gradient
 * tags: recent
 * description: Mot rempli d'un dégradé multicolore qui coule lentement à l'intérieur des lettres.
 * prompt: Create an aurora text effect: a heading where one keyword uses background-clip:text with a 6-stop teal/cyan/violet/pink/amber gradient at 300% size whose background-position animates back and forth, so colors flow inside the letters; real text stays readable to screen readers. Light and dark mode, reduced-motion safe.
 */
export function AuroraText() {
  return (
    <>
      <style>{`@keyframes pui-aurora-flow{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}`}</style>
      <h2 className="text-center text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl dark:text-white">
        Ship with{' '}
        <span className="bg-[linear-gradient(120deg,#14b8a6,#22d3ee,#8b5cf6,#ec4899,#f59e0b,#14b8a6)] bg-[length:300%_300%] bg-clip-text text-transparent [filter:saturate(1.2)] motion-safe:animate-[pui-aurora-flow_8s_ease-in-out_infinite]">
          aurora
        </span>
      </h2>
    </>
  );
}
