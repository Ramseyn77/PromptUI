/**
 * @registry
 * name: Aura Glow
 * category: Shaders
 * style: Gradient
 * tags: featured, recent
 * description: Halo d'aura façon daisyUI : nappes de couleur floues qui tournent lentement derrière un contenu en verre.
 * prompt: Create a daisyUI "aura"-style background: three large blurred color blobs (teal, violet, amber) orbiting around the center at different speeds via rotating wrappers with offset children, behind a centered glass card with title and text; blobs use mix-blend for richer overlaps in dark mode. Paused with reduced motion. Light and dark mode.
 */
export function AuraGlow() {
  const blobs = [['bg-teal-400', '18s', '-30%'], ['bg-violet-500', '24s', '25%'], ['bg-amber-300', '30s', '-10%']] as const;

  return (
    <div className="relative grid h-80 w-full max-w-xl place-items-center overflow-hidden rounded-3xl bg-zinc-50 dark:bg-zinc-950">
      <style>{`@keyframes pui-aura{to{transform:rotate(360deg)}}@media (prefers-reduced-motion:reduce){.pui-aura{animation:none!important}}`}</style>
      {blobs.map(([tone, duration, offset], index) => (
        <div key={tone} aria-hidden className="pui-aura absolute inset-0 grid place-items-center" style={{ animation: `pui-aura ${duration} linear infinite${index % 2 ? ' reverse' : ''}` }}>
          <span className={`size-56 rounded-full opacity-60 blur-3xl dark:opacity-50 dark:mix-blend-screen ${tone}`} style={{ transform: `translate(${offset}, ${index === 1 ? '-20%' : '18%'})` }} />
        </div>
      ))}
      <div className="relative rounded-2xl border border-white/60 bg-white/50 px-8 py-6 text-center shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
        <p className="text-2xl font-semibold text-zinc-950 dark:text-white">Find your focus</p>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">Ambient soundscapes for deep work.</p>
      </div>
    </div>
  );
}
