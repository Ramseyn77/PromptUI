/**
 * @registry
 * name: Eco Impact Footer
 * category: Footer
 * style: Gradient
 * tags: recent
 * description: Footer d'entreprise engagée : compteurs d'impact (arbres plantés, CO₂ compensé, plastique évité), certifications et inscription newsletter verte.
 * prompt: Create an eco brand footer on a fresh green gradient: three impact counters (Trees planted 128,402, Tonnes CO₂ offset 9,310, Plastic bottles avoided 2.4M) that count up when they scroll into view (IntersectionObserver, instant with reduced motion); badges for certifications as outlined text pills (B Corp, 1% for the Planet, Climate Neutral — text only); a newsletter field; link columns; a leaf-shaped decorative SVG; stacks on mobile. Light and dark mode.
 */
'use client';
import { useEffect, useRef, useState } from 'react';

const stats = [['Trees planted', 128402, ''], ['Tonnes CO₂ offset', 9310, ''], ['Plastic bottles avoided', 2.4, 'M']] as const;

export function EcoImpactFooter() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setProgress(0);
    let raf = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => { const t = Math.min(1, (now - start) / 1600); setProgress(1 - (1 - t) ** 3); if (t < 1) raf = requestAnimationFrame(tick); };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    observer.observe(ref.current!);
    return () => { observer.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <footer className="relative w-full overflow-hidden bg-gradient-to-br from-emerald-50 via-lime-50 to-teal-100 px-6 py-12 text-emerald-950 dark:from-emerald-950 dark:via-zinc-950 dark:to-teal-950 dark:text-emerald-50">
      <svg aria-hidden viewBox="0 0 100 100" className="absolute -right-10 -top-10 size-64 text-emerald-600/10 dark:text-emerald-400/10"><path d="M10 90 C10 40 40 10 90 10 C90 60 60 90 10 90 Z" fill="currentColor" /></svg>
      <div className="relative mx-auto max-w-5xl">
        <div ref={ref} className="grid gap-4 sm:grid-cols-3">
          {stats.map(([label, value, suffix]) => <div key={label} className="rounded-2xl bg-white/70 p-5 dark:bg-white/5"><p className="text-3xl font-bold tabular-nums">{suffix ? (value * progress).toFixed(1) : Math.round(value * progress).toLocaleString('en-US')}{suffix}</p><p className="text-sm text-emerald-800 dark:text-emerald-200">{label}</p></div>)}
        </div>
        <ul className="mt-6 flex flex-wrap gap-2">{['B Corp certified', '1% for the Planet', 'Climate neutral'].map((badge) => <li key={badge} className="rounded-full border border-emerald-700/40 px-3 py-1 text-xs font-medium dark:border-emerald-300/40">{badge}</li>)}</ul>
        <div className="mt-10 grid gap-8 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <form onSubmit={(event) => event.preventDefault()}><p className="font-semibold">Good news, monthly</p><p className="mt-1 text-sm text-emerald-800/80 dark:text-emerald-200/80">One email about the impact you helped create.</p><div className="mt-3 flex gap-2"><input type="email" aria-label="Email address" placeholder="you@email.com" className="min-w-0 flex-1 rounded-full border border-emerald-700/30 bg-white/80 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-600/30 dark:bg-white/10" /><button type="submit" className="rounded-full bg-emerald-700 px-4 text-sm font-semibold text-white">Join</button></div></form>
          {[['Shop', ['Refills', 'Bundles', 'Gift cards']], ['Impact', ['Our report', 'Partners', 'Packaging']], ['Help', ['Shipping', 'Returns', 'Contact']]].map(([title, links]) => <nav key={title as string} aria-label={title as string}><p className="font-semibold">{title as string}</p><ul className="mt-3 space-y-2 text-sm text-emerald-900/80 dark:text-emerald-100/80">{(links as string[]).map((link) => <li key={link}><a href="#" className="hover:underline">{link}</a></li>)}</ul></nav>)}
        </div>
        <p className="mt-10 border-t border-emerald-900/10 pt-5 text-xs text-emerald-900/70 dark:border-white/10 dark:text-emerald-100/60">© 2026 Verdant Goods · Shipped carbon-neutral</p>
      </div>
    </footer>
  );
}
