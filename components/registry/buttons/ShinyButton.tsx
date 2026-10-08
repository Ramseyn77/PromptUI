/**
 * @registry
 * name: Shiny Button
 * category: Buttons
 * style: Glass
 * tags: recent
 * description: Bouton translucide dont le texte et la bordure sont balayés par un reflet lumineux en boucle.
 * prompt: Create a shiny button: rounded-lg translucent surface with a subtle teal radial glow; the label uses a mask-image linear gradient whose position animates so a bright band sweeps across the text, while a matching gradient border (padding-box/border-box trick) sweeps in sync; hover lifts slightly. Reduced motion disables the sweep. Light and dark mode.
 */
export function ShinyButton() {
  return (
    <button type="button" className="pui-shiny relative rounded-lg px-7 py-3 font-medium outline-none transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-teal-500 [background:radial-gradient(circle_at_50%_0%,rgba(20,184,166,.12),transparent_60%)]">
      <style>{`@keyframes pui-shiny{from{--pui-shiny-x:100%}to{--pui-shiny-x:-100%}}
@property --pui-shiny-x{syntax:'<percentage>';initial-value:100%;inherits:true}
.pui-shiny{--pui-shiny-x:100%;animation:pui-shiny 2.4s linear infinite}
.pui-shiny-label{-webkit-mask-image:linear-gradient(-75deg,#000 calc(var(--pui-shiny-x) + 20%),transparent calc(var(--pui-shiny-x) + 30%),#000 calc(var(--pui-shiny-x) + 100%));mask-image:linear-gradient(-75deg,#000 calc(var(--pui-shiny-x) + 20%),transparent calc(var(--pui-shiny-x) + 30%),#000 calc(var(--pui-shiny-x) + 100%))}
.pui-shiny-border{padding:1px;background:linear-gradient(-75deg,rgba(20,184,166,.15) calc(var(--pui-shiny-x) + 20%),rgba(20,184,166,.8) calc(var(--pui-shiny-x) + 25%),rgba(20,184,166,.15) calc(var(--pui-shiny-x) + 100%));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0)}
@media (prefers-reduced-motion:reduce){.pui-shiny{animation:none}}`}</style>
      <span className="pui-shiny-label relative block text-sm uppercase tracking-wide text-zinc-800 dark:text-zinc-100">Shiny button</span>
      <span aria-hidden className="pui-shiny-border absolute inset-0 rounded-lg" />
    </button>
  );
}
