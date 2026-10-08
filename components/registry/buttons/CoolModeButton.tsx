/**
 * @registry
 * name: Cool Mode Button
 * category: Buttons
 * style: Gradient
 * tags: featured, recent
 * description: Bouton qui projette une gerbe d'emojis et de pastilles colorées à chaque clic.
 * prompt: Create a "cool mode" button: each click spawns 10 particles (emoji or colored dots) at the click point that fly up and out with random velocity, rotate and fade (CSS keyframes driven by per-particle custom properties set in the click handler), then are removed after 900ms. Particles are aria-hidden and pointer-events none; a counter announces "You sent 3 cheers" politely. No particles with reduced motion. Light and dark mode.
 */
'use client';
import { useRef, useState, type MouseEvent } from 'react';

type Particle = { id: number; x: number; y: number; dx: number; dy: number; spin: number; content: string };
const pool = ['🎉', '✨', '💚', '🚀', '●', '●'];
const dotColors = ['#2dd4bf', '#a78bfa', '#f472b6', '#facc15'];

export function CoolModeButton() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [count, setCount] = useState(0);
  const serial = useRef(0);

  function burst(event: MouseEvent<HTMLButtonElement>) {
    setCount((value) => value + 1);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX ? event.clientX - rect.left : rect.width / 2;
    const y = event.clientY ? event.clientY - rect.top : rect.height / 2;
    const fresh = Array.from({ length: 10 }, () => {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.2;
      const speed = 60 + Math.random() * 80;
      return { id: serial.current++, x, y, dx: Math.cos(angle) * speed, dy: Math.sin(angle) * speed, spin: (Math.random() - 0.5) * 540, content: pool[Math.floor(Math.random() * pool.length)] };
    });
    setParticles((current) => [...current, ...fresh]);
    const ids = new Set(fresh.map((particle) => particle.id));
    window.setTimeout(() => setParticles((current) => current.filter((particle) => !ids.has(particle.id))), 900);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <style>{`@keyframes pui-cool{0%{transform:translate(-50%,-50%) scale(.6);opacity:1}100%{transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy) + 40px)) rotate(var(--spin)) scale(1);opacity:0}}`}</style>
      <button type="button" onClick={burst} className="relative rounded-full bg-gradient-to-r from-teal-500 via-sky-500 to-violet-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 outline-none transition active:scale-95 focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950">
        Send a cheer 🎉
        <span aria-hidden className="pointer-events-none absolute inset-0 overflow-visible">
          {particles.map((particle) => (
            <span
              key={particle.id}
              className="absolute text-lg"
              style={{ left: particle.x, top: particle.y, color: dotColors[particle.id % dotColors.length], animation: 'pui-cool .9s cubic-bezier(.2,.7,.4,1) forwards', ['--dx' as string]: `${particle.dx}px`, ['--dy' as string]: `${particle.dy}px`, ['--spin' as string]: `${particle.spin}deg` }}
            >{particle.content}</span>
          ))}
        </span>
      </button>
      <p aria-live="polite" className="text-xs text-zinc-500 dark:text-zinc-400">{count ? `You sent ${count} cheer${count > 1 ? 's' : ''}` : 'Click as many times as you like'}</p>
    </div>
  );
}
