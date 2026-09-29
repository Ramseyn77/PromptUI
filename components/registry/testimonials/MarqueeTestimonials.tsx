/**
 * @registry
 * name: Marquee Testimonials
 * category: Testimonials
 * style: SaaS
 * tags: featured, recent
 * description: Deux rangees de temoignages qui defilent en sens inverse et se mettent en pause au survol.
 * prompt: Create two infinite marquee rows of testimonial cards moving in opposite directions (list duplicated, translateX -50%), paused on hover, edges faded with a mask. Duplicates are aria-hidden. Light and dark card styles.
 */
const quotes = [
  { name: 'Awa Diallo', role: 'Design lead', text: 'We shipped our new onboarding in two days.' },
  { name: 'Lucas Martin', role: 'Founder', text: 'The prompts alone saved us a sprint.' },
  { name: 'Mei Chen', role: 'Frontend engineer', text: 'Clean code I would have written myself.' },
  { name: 'Omar Haddad', role: 'Product manager', text: 'Our demos finally look like the real product.' },
  { name: 'Sofia Rossi', role: 'Indie hacker', text: 'Dark mode just worked. Every single block.' },
];

function Row({ reverse = false }: { reverse?: boolean }) {
  // The list is rendered twice so the -50% translation loops seamlessly.
  return (
    <div className="flex w-max gap-3 group-hover:[animation-play-state:paused] motion-safe:animate-[pui-marquee_28s_linear_infinite]" style={{ animationDirection: reverse ? 'reverse' : 'normal' }}>
      {[...quotes, ...quotes].map((quote, index) => (
        <figure
          key={index}
          aria-hidden={index >= quotes.length}
          className="w-64 shrink-0 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <blockquote className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">“{quote.text}”</blockquote>
          <figcaption className="mt-3 flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-teal-400 to-violet-500 text-xs font-bold text-white">
              {quote.name.split(' ').map((part) => part[0]).join('')}
            </span>
            <span>
              <span className="block text-sm font-semibold text-zinc-900 dark:text-white">{quote.name}</span>
              <span className="block text-xs text-zinc-500 dark:text-zinc-400">{quote.role}</span>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function MarqueeTestimonials() {
  return (
    <>
      <style>{`@keyframes pui-marquee{to{transform:translateX(-50%)}}`}</style>
      <section
        aria-label="Testimonials"
        className="group grid w-full max-w-3xl gap-3 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
      >
        <Row />
        <Row reverse />
      </section>
    </>
  );
}
