/**
 * @registry
 * name: Plasma Field
 * category: Shaders
 * style: Gradient
 * tags: featured, recent
 * description: Effet plasma rétro calculé pixel par pixel sur un petit canvas agrandi, palettes Néon, Lave ou Océan au choix.
 * prompt: Create a classic plasma shader on a low-resolution canvas (e.g. 120×68 pixels) scaled up with image-rendering: auto and a blur for smoothness: each frame computes sin-based interference of four waves per pixel into an ImageData and maps it through a 256-color palette; a Neon / Lava / Ocean segmented control swaps the palette; paused off screen, single frame with reduced motion; a headline overlay. Looks the same in light and dark.
 */
'use client';
import { useEffect, useRef, useState } from 'react';

const palettes = {
  Neon: (t: number) => [128 + 127 * Math.sin(Math.PI * t * 2), 64 + 63 * Math.sin(Math.PI * t * 2 + 2), 200 + 55 * Math.sin(Math.PI * t * 2 + 4)],
  Lava: (t: number) => [200 + 55 * Math.sin(Math.PI * t * 2), 90 + 90 * Math.sin(Math.PI * t * 2 + 1.2), 30 + 30 * Math.sin(Math.PI * t * 2 + 3)],
  Ocean: (t: number) => [20 + 20 * Math.sin(Math.PI * t * 2 + 3), 120 + 100 * Math.sin(Math.PI * t * 2 + 1), 180 + 75 * Math.sin(Math.PI * t * 2)],
};
type Palette = keyof typeof palettes;

export function PlasmaField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [palette, setPalette] = useState<Palette>('Neon');

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    const width = 120;
    const height = 68;
    canvas.width = width;
    canvas.height = height;
    const image = context.createImageData(width, height);
    const colors = Array.from({ length: 256 }, (_, index) => palettes[palette](index / 256).map((value) => Math.max(0, Math.min(255, value))));
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let visible = true;
    let time = 0;

    const draw = () => {
      time += 0.035;
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const value = Math.sin(x / 9 + time) + Math.sin(y / 7 - time * 0.8) + Math.sin((x + y) / 13 + time * 0.6) + Math.sin(Math.hypot(x - width / 2, y - height / 2) / 6 - time);
          const [r, g, b] = colors[Math.floor(((value + 4) / 8) * 255) & 255];
          const offset = (y * width + x) * 4;
          image.data[offset] = r; image.data[offset + 1] = g; image.data[offset + 2] = b; image.data[offset + 3] = 255;
        }
      }
      context.putImageData(image, 0, 0);
      if (!still && visible) raf = requestAnimationFrame(draw);
    };
    draw();
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; cancelAnimationFrame(raf); if (visible && !still) raf = requestAnimationFrame(draw); });
    io.observe(canvas);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [palette]);

  return (
    <div className="relative h-72 w-full max-w-xl overflow-hidden rounded-3xl bg-zinc-950">
      <canvas ref={canvasRef} role="img" aria-label={`Animated ${palette.toLowerCase()} plasma`} className="absolute inset-0 size-full scale-110 blur-[2px]" />
      <div className="relative flex h-full flex-col items-center justify-center gap-4 text-center">
        <p className="text-4xl font-black tracking-tight text-white mix-blend-overlay">PLASMA</p>
        <div role="group" aria-label="Palette" className="flex rounded-full bg-black/30 p-1 text-xs backdrop-blur">{(Object.keys(palettes) as Palette[]).map((name) => <button key={name} type="button" aria-pressed={palette === name} onClick={() => setPalette(name)} className={`rounded-full px-3 py-1 font-medium ${palette === name ? 'bg-white text-zinc-950' : 'text-white/80'}`}>{name}</button>)}</div>
      </div>
    </div>
  );
}
