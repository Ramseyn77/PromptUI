/**
 * @registry
 * name: Matrix Rain
 * category: Shaders
 * style: Dark
 * tags: recent
 * description: Pluie de caractères qui tombent en colonnes sur canvas, façon terminal.
 * prompt: Create a canvas "digital rain": columns of random glyphs (katakana + digits) falling at 14px font size, the head glyph bright and the trail fading via a translucent background fill each frame; columns reset randomly at the bottom. Always dark; DPR-aware, paused off screen, static with reduced motion.
 */
'use client';
import { useEffect, useRef } from 'react';

const glyphs = 'アイウエオカキクケコサシスセソタチツテト0123456789';
const size = 14;

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let drops: number[] = [];
    let raf = 0;
    let visible = true;
    let tick = 0;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * ratio;
      canvas.height = canvas.clientHeight * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      drops = Array.from({ length: Math.ceil(canvas.clientWidth / size) }, () => Math.random() * -20);
    };
    // Resizing clears the canvas: redraw one frame if the loop is paused (off screen or reduced motion).
    const observer = new ResizeObserver(() => { resize(); if (still || !visible) draw(); });
    observer.observe(canvas);
    resize();

    const draw = () => {
      tick += 1;
      if (tick % 3 === 0 || still) {
        context.fillStyle = 'rgba(3, 7, 7, .18)';
        context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        context.font = `${size}px ui-monospace, monospace`;
        drops.forEach((drop, index) => {
          const char = glyphs[Math.floor(Math.random() * glyphs.length)];
          context.fillStyle = Math.random() > 0.95 ? '#ecfdf5' : '#34d399';
          context.fillText(char, index * size, drop * size);
          drops[index] = drop * size > canvas.clientHeight && Math.random() > 0.97 ? 0 : drop + 1;
        });
      }
      if (!still && visible) raf = requestAnimationFrame(draw);
    };
    draw();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !still) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);

    return () => { cancelAnimationFrame(raf); observer.disconnect(); io.disconnect(); };
  }, []);

  return (
    <div className="h-64 w-full max-w-xl overflow-hidden rounded-3xl bg-[#030707]">
      <canvas ref={canvasRef} role="img" aria-label="Falling glyphs animation" className="h-full w-full" />
    </div>
  );
}
