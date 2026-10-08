/**
 * @registry
 * name: Gooey Blobs
 * category: Shaders
 * style: Gradient
 * tags: recent
 * description: Blobs liquides qui fusionnent entre eux grâce à un filtre SVG « gooey ».
 * prompt: Create a gooey metaball effect: several gradient circles orbiting with different keyframes inside a container filtered by an SVG filter (feGaussianBlur + feColorMatrix alpha threshold) so they merge like liquid. Light and dark backgrounds, reduced-motion safe.
 */
export function GooeyBlobs() {
  const blobs = [
    { size: 'size-24', color: 'from-teal-400 to-sky-500', animation: 'pui-goo-a 6s' },
    { size: 'size-20', color: 'from-violet-500 to-fuchsia-500', animation: 'pui-goo-b 7s' },
    { size: 'size-16', color: 'from-amber-400 to-rose-500', animation: 'pui-goo-c 5s' },
    { size: 'size-14', color: 'from-sky-400 to-violet-500', animation: 'pui-goo-d 8s' },
  ];

  return (
    <>
      <style>{`@keyframes pui-goo-a{50%{transform:translate(70px,20px)}}@keyframes pui-goo-b{50%{transform:translate(-60px,30px)}}@keyframes pui-goo-c{50%{transform:translate(20px,-60px)}}@keyframes pui-goo-d{50%{transform:translate(-30px,-40px)}}@media (prefers-reduced-motion:reduce){.pui-goo>span{animation:none!important}}`}</style>
      <div className="grid h-64 w-full max-w-xl place-items-center overflow-hidden rounded-3xl bg-white dark:bg-zinc-950">
        <svg aria-hidden className="absolute size-0">
          <filter id="pui-gooey"><feGaussianBlur in="SourceGraphic" stdDeviation="10" /><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" /></filter>
        </svg>
        <div aria-hidden className="pui-goo relative grid size-56 place-items-center [filter:url(#pui-gooey)]">
          {blobs.map((blob) => <span key={blob.animation} className={`absolute rounded-full bg-gradient-to-br ${blob.size} ${blob.color}`} style={{ animation: `${blob.animation} ease-in-out infinite` }} />)}
        </div>
      </div>
    </>
  );
}
