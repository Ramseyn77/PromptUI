/**
 * @registry
 * name: Wave Footer
 * category: Footer
 * style: Gradient
 * tags: recent
 * description: Pied de page surmonte de vagues SVG superposees qui ondulent doucement.
 * prompt: Create a footer topped by two layered SVG waves (different opacity) that slowly drift horizontally via a translateX keyframe on a double-width path, then a teal gradient body with centered logo, links and copyright. Reduced-motion safe; readable in light and dark mode.
 */
export function WaveFooter() {
  const wave = 'M0 40 C 120 10, 240 70, 360 40 S 600 10, 720 40 S 960 70, 1080 40 S 1320 10, 1440 40 V80 H0 Z';
  return (
    <>
      <style>{`@keyframes pui-wave-drift{to{transform:translateX(-50%)}}`}</style>
      <footer className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white dark:bg-zinc-950">
        <div aria-hidden className="relative h-16 overflow-hidden">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute bottom-0 h-full w-[200%] fill-teal-400/50 motion-safe:animate-[pui-wave-drift_14s_linear_infinite]"><path d={wave} /></svg>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute bottom-0 h-3/4 w-[200%] fill-teal-600 [animation-direction:reverse] motion-safe:animate-[pui-wave-drift_10s_linear_infinite]"><path d={wave} /></svg>
        </div>
        <div className="bg-teal-600 px-6 pb-8 pt-2 text-center text-white">
          <p className="text-lg font-bold">Tidewater</p>
          <nav aria-label="Footer" className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/85">{['Trips', 'Stories', 'Gear', 'About', 'Contact'].map((link) => <a key={link} href="#" className="hover:text-white">{link}</a>)}</nav>
          <p className="mt-5 text-xs text-white/70">© 2026 Tidewater Expeditions</p>
        </div>
      </footer>
    </>
  );
}
