/**
 * @registry
 * name: Letter Wave
 * category: Loader
 * style: Minimal
 * tags: recent
 * description: Mot « LOADING » dont les lettres montent et changent de couleur en vague.
 * prompt: Create a text loader where each letter of "LOADING" (spans with staggered animation-delay) lifts and tints teal in a wave; the full word is exposed once via sr-only text, letters aria-hidden. Tracking-wide bold type, light and dark mode, reduced-motion safe.
 */
export function LetterWave() {
  const word = 'LOADING';
  return (
    <>
      <style>{`@keyframes pui-letter{0%,60%,100%{transform:translateY(0);color:inherit}30%{transform:translateY(-8px);color:#14b8a6}}`}</style>
      <p role="status" className="text-2xl font-black tracking-[.35em] text-zinc-900 dark:text-white">
        <span className="sr-only">Loading</span>
        {word.split('').map((letter, index) => <span key={index} aria-hidden className="inline-block motion-safe:animate-[pui-letter_1.4s_ease-in-out_infinite]" style={{ animationDelay: `${index * 0.1}s` }}>{letter}</span>)}
      </p>
    </>
  );
}
