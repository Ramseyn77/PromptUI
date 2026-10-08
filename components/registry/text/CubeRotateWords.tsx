/**
 * @registry
 * name: Cube Rotate Words
 * category: Text
 * style: Dark
 * tags: recent
 * description: Mot qui change en tournant sur les faces d'un cube 3D dans une phrase, avec perspective et faces colorées.
 * prompt: Create a 3D cube word rotator inside a headline "Build for [web|mobile|desktop|AI]": the changing word sits on the faces of a CSS 3D cube (preserve-3d, four faces rotated 90° around X with translateZ of half the height) that rotates -90° every 2s; each face has its own gradient text; perspective on the wrapper; screen readers get a static sentence listing all options; reduced motion shows the first word only. Dark in both themes.
 */
'use client';
import { useEffect, useState } from 'react';

const words = [['web', 'from-sky-400 to-cyan-300'], ['mobile', 'from-violet-400 to-fuchsia-300'], ['desktop', 'from-amber-300 to-orange-400'], ['AI', 'from-emerald-300 to-lime-300']];

export function CubeRotateWords() {
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setTurn((value) => value + 1), 2000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-2xl rounded-3xl bg-zinc-950 px-6 py-12 text-center ring-1 ring-white/10">
      <h2 className="flex flex-wrap items-center justify-center gap-x-3 text-4xl font-bold tracking-tight text-white sm:text-6xl">
        <span className="sr-only">Build for web, mobile, desktop and AI.</span>
        <span aria-hidden>Build for</span>
        <span aria-hidden className="inline-block h-[1.2em] w-[4.2em] [perspective:600px]">
          <span className="relative block h-full w-full transition-transform duration-700 ease-[cubic-bezier(.7,-.3,.3,1.3)] [transform-style:preserve-3d]" style={{ transform: `translateZ(-0.6em) rotateX(${turn * -90}deg)` }}>
            {words.map(([word, gradient], index) => (
              <span key={word} className={`absolute inset-0 grid place-items-center rounded-xl bg-white/5 bg-gradient-to-r bg-clip-text text-transparent ring-1 ring-white/10 [backface-visibility:hidden] ${gradient}`} style={{ transform: `rotateX(${index * 90}deg) translateZ(0.6em)` }}>{word}</span>
            ))}
          </span>
        </span>
      </h2>
      <p className="mt-6 text-sm text-zinc-400">One codebase. Every surface.</p>
    </div>
  );
}
