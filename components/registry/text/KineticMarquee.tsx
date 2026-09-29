/**
 * @registry
 * name: Kinetic Marquee
 * category: Text
 * style: Editorial
 * tags: featured, recent
 * description: Deux bandeaux de mots geants en sens inverse, alternance plein et contour, qui ralentissent au survol.
 * prompt: Create a kinetic typography marquee: two rows of huge uppercase words scrolling in opposite directions (duplicated track, translateX -50%), alternating solid and outlined (-webkit-text-stroke) words with separator stars; hover slows it down; aria-hidden with an sr-only sentence. Light and dark mode, reduced-motion stops it.
 */
const words = ['Design', 'Build', 'Ship', 'Repeat'];

function Row({ reverse }: { reverse?: boolean }) {
  return (
    <div className="flex w-max motion-safe:animate-[pui-kinetic_18s_linear_infinite] group-hover:[animation-duration:40s]" style={{ animationDirection: reverse ? 'reverse' : 'normal' }}>
      {[...words, ...words, ...words, ...words].map((word, index) => (
        <span key={index} className={`px-4 text-6xl font-black uppercase tracking-tight ${index % 2 ? 'text-transparent [-webkit-text-stroke:1.5px_#18181b] dark:[-webkit-text-stroke:1.5px_#fafafa]' : 'text-zinc-900 dark:text-white'}`}>
          {word}<span className="ml-8 text-teal-500">✦</span>
        </span>
      ))}
    </div>
  );
}

export function KineticMarquee() {
  return (
    <>
      <style>{`@keyframes pui-kinetic{to{transform:translateX(-50%)}}`}</style>
      <section className="group w-full max-w-3xl space-y-2 overflow-hidden rounded-3xl bg-white py-8 dark:bg-zinc-950">
        <p className="sr-only">Design, build, ship, repeat.</p>
        <div aria-hidden className="space-y-2"><Row /><Row reverse /></div>
      </section>
    </>
  );
}
