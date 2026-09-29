/**
 * @registry
 * name: Bounce Hover Text
 * category: Text
 * style: Gradient
 * tags: recent
 * description: Titre dont chaque lettre saute et se colore en cascade au survol ou au focus.
 * prompt: Create a playful heading link where, on hover or focus-visible, each letter (aria-hidden spans with staggered transition-delay) jumps up with a springy easing and shifts hue along a teal→violet ramp, returning on leave; full text in aria-label. Light and dark mode, reduced-motion keeps only the color change.
 */
export function BounceHoverText() {
  const word = 'Say hello!';
  return (
    <a href="#" aria-label={word} className="group inline-flex text-5xl font-black tracking-tight text-zinc-900 outline-none dark:text-white">
      {word.split('').map((char, index) => (
        <span
          key={index}
          aria-hidden
          className="inline-block whitespace-pre transition-[transform,color] duration-500 ease-[cubic-bezier(.34,1.8,.64,1)] group-hover:[color:var(--hue)] group-focus-visible:[color:var(--hue)] motion-safe:group-hover:-translate-y-3 motion-safe:group-focus-visible:-translate-y-3"
          style={{ transitionDelay: `${index * 35}ms`, ['--hue' as string]: `hsl(${170 + index * 12} 75% 48%)` }}
        >
          {char}
        </span>
      ))}
    </a>
  );
}
