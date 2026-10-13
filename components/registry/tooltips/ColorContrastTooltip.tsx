/**
 * @registry
 * name: Color Contrast Tooltip
 * category: Tooltips
 * style: SaaS
 * tags: recent
 * description: Palette de couleurs dont chaque nuance affiche au survol une infobulle de contraste : ratio WCAG sur blanc et noir, badges AA / AAA.
 * prompt: Create a color palette with contrast tooltips: a row of 9 shade swatches (50–900) of a brand color; hovering or focusing a swatch shows a tooltip above it with the hex value, the WCAG contrast ratio against white and against black (computed with the relative luminance formula), and AA / AAA pass/fail badges for normal text; clicking copies the hex (tooltip shows "Copied"); swatches are buttons with aria-describedby. Light and dark mode.
 */
'use client';
import { useId, useState } from 'react';

const shades = [['50', '#eef2ff'], ['100', '#e0e7ff'], ['200', '#c7d2fe'], ['300', '#a5b4fc'], ['400', '#818cf8'], ['500', '#6366f1'], ['600', '#4f46e5'], ['700', '#4338ca'], ['900', '#312e81']] as const;

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((index) => { const c = parseInt(hex.slice(index, index + 2), 16) / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const ratio = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

function Badge({ value, min, label }: { value: number; min: number; label: string }) {
  const pass = value >= min;
  return <span className={`rounded px-1 text-[10px] font-bold ${pass ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>{label} {pass ? '✓' : '✗'}</span>;
}

export function ColorContrastTooltip() {
  const uid = useId();
  const [active, setActive] = useState<number | null>(5);
  const [copied, setCopied] = useState<string | null>(null);

  return (
    <div className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-5 pt-36 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="relative flex" onMouseLeave={() => setActive(null)}>
        {shades.map(([name, hex], index) => {
          const lum = luminance(hex);
          const white = ratio(lum, 1);
          const black = ratio(lum, 0);
          return (
            <div key={name} className="relative flex-1">
              {active === index && (
                <div id={`${uid}-tip`} role="tooltip" className="absolute bottom-full left-1/2 z-10 mb-3 w-44 -translate-x-1/2 rounded-xl bg-zinc-950 p-3 text-xs text-zinc-300 shadow-xl ring-1 ring-white/10 dark:bg-zinc-800">
                  <span aria-hidden className="absolute -bottom-1 left-1/2 size-2.5 -translate-x-1/2 rotate-45 bg-zinc-950 dark:bg-zinc-800" />
                  <p className="font-mono text-sm text-white">{copied === hex ? 'Copied!' : hex.toUpperCase()}</p>
                  <p className="mt-2 flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="size-3 rounded-sm bg-white ring-1 ring-white/20" />{white.toFixed(2)}:1</span><span className="flex gap-1"><Badge value={white} min={4.5} label="AA" /><Badge value={white} min={7} label="AAA" /></span></p>
                  <p className="mt-1.5 flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="size-3 rounded-sm bg-black ring-1 ring-white/20" />{black.toFixed(2)}:1</span><span className="flex gap-1"><Badge value={black} min={4.5} label="AA" /><Badge value={black} min={7} label="AAA" /></span></p>
                </div>
              )}
              <button type="button" aria-label={`Indigo ${name}, ${hex}`} aria-describedby={active === index ? `${uid}-tip` : undefined} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onBlur={() => setActive(null)} onClick={() => { navigator.clipboard?.writeText(hex).catch(() => {}); setCopied(hex); window.setTimeout(() => setCopied(null), 1200); }} className={`block h-16 w-full transition-transform first:rounded-l-xl last:rounded-r-xl focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-white ${active === index ? 'scale-y-110' : ''}`} style={{ background: hex }} />
              <p className="mt-1.5 text-center text-[10px] tabular-nums text-zinc-500">{name}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-zinc-500">Hover a shade to check text contrast. Click to copy.</p>
    </div>
  );
}
