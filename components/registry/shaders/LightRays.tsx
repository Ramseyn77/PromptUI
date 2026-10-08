/**
 * @registry
 * name: Light Rays
 * category: Shaders
 * style: Glass
 * tags: recent
 * description: Rayons de lumière volumétriques qui tombent du haut et ondulent lentement, en CSS.
 * prompt: Create volumetric light rays in CSS: 7 tall blurred gradient beams originating from the top center, rotated at different angles (transform-origin top), each swaying and pulsing opacity with its own duration; soft vignette and centered headline. Warm white beams on a deep blue background in dark mode, sky-tinted beams on pale background in light mode. Static with reduced motion.
 */
export function LightRays() {
  const rays = [-34, -22, -11, 0, 10, 21, 33];

  return (
    <div className="relative grid h-80 w-full max-w-xl place-items-center overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-b from-sky-50 to-white dark:border-zinc-800 dark:from-[#0b1026] dark:to-[#05060f]">
      <style>{`@keyframes pui-ray{0%,100%{transform:rotate(var(--a)) scaleY(1);opacity:.45}50%{transform:rotate(calc(var(--a) + 4deg)) scaleY(1.08);opacity:.9}}`}</style>
      <div aria-hidden className="absolute inset-0">
        {rays.map((angle, index) => (
          <span
            key={angle}
            className="absolute left-1/2 top-[-10%] h-[130%] w-16 origin-top -translate-x-1/2 bg-gradient-to-b from-sky-300/70 via-sky-200/20 to-transparent blur-xl motion-safe:animate-[pui-ray_var(--d)_ease-in-out_infinite] dark:from-amber-100/50 dark:via-amber-50/10"
            style={{ ['--a' as string]: `${angle}deg`, ['--d' as string]: `${5 + index * 0.7}s`, transform: `rotate(${angle}deg)`, opacity: 0.6, animationDelay: `${index * -0.8}s` }}
          />
        ))}
      </div>
      <div className="relative mt-16 text-center">
        <p className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white">Into the light</p>
        <p className="mt-2 text-sm text-zinc-500 dark:text-slate-400">Soft beams for calm, premium heroes.</p>
      </div>
    </div>
  );
}
