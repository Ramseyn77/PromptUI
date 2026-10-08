/**
 * @registry
 * name: Line Shadow Text
 * category: Text
 * style: Editorial
 * tags: recent
 * description: Titre italique gras avec une ombre portée rayée qui défile en diagonale, style rétro.
 * prompt: Create line shadow text: a heavy italic headline word whose ::after duplicate (content attr(data-text)) is offset by 0.05em and filled with an animated repeating diagonal stripe gradient clipped to text, placed behind the word, giving a striped moving shadow. Stripe color follows currentColor variants (zinc in light, teal in dark). Static with reduced motion.
 */
export function LineShadowText() {
  return (
    <h3 className="text-center text-5xl font-black leading-none tracking-tighter text-zinc-950 sm:text-7xl dark:text-zinc-50">
      <style>{`@keyframes pui-line-shadow{to{background-position:100% -100%}}
.pui-line-shadow{position:relative;z-index:0;font-style:italic}
.pui-line-shadow::after{content:attr(data-text);position:absolute;left:.05em;top:.05em;z-index:-1;background:linear-gradient(45deg,transparent 45%,var(--pui-shadow) 45%,var(--pui-shadow) 55%,transparent 0);background-size:.06em .06em;-webkit-background-clip:text;background-clip:text;color:transparent;animation:pui-line-shadow 15s linear infinite}
@media (prefers-reduced-motion:reduce){.pui-line-shadow::after{animation:none}}`}</style>
      Ship <span data-text="Faster" className="pui-line-shadow [--pui-shadow:#18181b] dark:[--pui-shadow:#2dd4bf]">Faster</span>
    </h3>
  );
}
