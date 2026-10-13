/**
 * @registry
 * name: Letter Swap Text
 * category: Text
 * style: Minimal
 * tags: recent
 * description: Liens de navigation dont les lettres glissent vers le haut et sont remplacées par une copie qui monte d'en bas, lettre après lettre, au survol.
 * prompt: Create letter-swap hover links: a vertical nav of large links where each letter is a mask containing two stacked copies; on hover or focus-visible the top copy slides up and the bottom copy slides in with a per-letter stagger (transition-delay by index), creating a rolling effect; the second copy is italic serif for contrast; accessible name stays the plain word (letters aria-hidden + sr-only text); reduced motion swaps instantly. Light and dark mode.
 */
const links = ['Work', 'About', 'Journal', 'Contact'];

export function LetterSwapText() {
  return (
    <nav aria-label="Main" className="w-full max-w-md rounded-3xl bg-white p-8 dark:bg-zinc-950">
      <ul className="space-y-2">
        {links.map((link, row) => (
          <li key={link} className="flex items-baseline gap-4 border-b border-zinc-200 pb-2 dark:border-zinc-800">
            <span className="w-6 font-mono text-xs text-zinc-400">0{row + 1}</span>
            <a href="#" className="group rounded-md text-5xl font-semibold tracking-tight text-zinc-950 outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:text-white dark:focus-visible:ring-white">
              <span className="sr-only">{link}</span>
              <span aria-hidden className="inline-flex">
                {link.split('').map((char, index) => (
                  <span key={index} className="relative inline-block overflow-hidden leading-[1.1]">
                    <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:duration-0" style={{ transitionDelay: `${index * 30}ms` }}>{char}</span>
                    <span className="absolute left-0 top-full inline-block font-serif italic text-violet-600 transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:duration-0 dark:text-violet-400" style={{ transitionDelay: `${index * 30}ms` }}>{char}</span>
                  </span>
                ))}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
