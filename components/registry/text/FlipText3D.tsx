/**
 * @registry
 * name: Flip Text 3D
 * category: Text
 * style: Minimal
 * tags: featured, recent
 * description: Chaque lettre bascule en 3D pour révéler une version colorée au survol, en cascade.
 * prompt: Create 3D flip text: each letter is a small perspective box with two faces (front in foreground color, bottom face in teal) and rotates -90deg on X when the word is hovered or focused, with 30ms stagger per letter, so a colored copy rolls in from below. Word is a link with aria-label; flip disabled with reduced motion. Light and dark mode.
 */
export function FlipText3D() {
  const words = ['Components', 'Templates', 'Blocks'];

  return (
    <nav aria-label="Library sections" className="flex flex-col items-center gap-2">
      <style>{`.pui-flip-letter{display:inline-block;transform-style:preserve-3d;transition:transform .45s cubic-bezier(.65,0,.35,1)}
.pui-flip-word:hover .pui-flip-letter,.pui-flip-word:focus-visible .pui-flip-letter{transform:rotateX(90deg)}
@media (prefers-reduced-motion:reduce){.pui-flip-letter{transition:none}}`}</style>
      {words.map((word) => (
        <a key={word} href={`#${word.toLowerCase()}`} aria-label={word} className="pui-flip-word rounded-lg px-2 text-5xl font-black uppercase leading-[1.1] tracking-tight text-zinc-950 outline-none [perspective:600px] focus-visible:ring-2 focus-visible:ring-teal-500 sm:text-6xl dark:text-zinc-50">
          {word.split('').map((letter, index) => (
            <span key={index} aria-hidden className="pui-flip-letter relative" style={{ transitionDelay: `${index * 30}ms` }}>
              <span className="block [backface-visibility:hidden] [transform:translateZ(0.55em)]">{letter}</span>
              <span className="absolute inset-0 block text-teal-600 [backface-visibility:hidden] [transform:rotateX(-90deg)_translateZ(0.55em)] dark:text-teal-400">{letter}</span>
            </span>
          ))}
        </a>
      ))}
    </nav>
  );
}
