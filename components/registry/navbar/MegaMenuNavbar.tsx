/**
 * @registry
 * name: Mega Menu Navbar
 * category: Navbar
 * style: SaaS
 * tags: featured, recent
 * description: Navigation avec mega menu Produits en grille d'icônes, ouverture au clic et Échap.
 * prompt: Create a navbar with a "Products" trigger (aria-expanded, closes on Escape and outside click) opening a mega menu: 2-column grid of product items with icon tile, title and one-line description, plus a highlighted footer row. Light and dark mode.
 */
'use client';
import { BarChart3, ChevronDown, CreditCard, Layers, Shield } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const products = [
  { icon: BarChart3, title: 'Analytics', text: 'Understand every user journey.' },
  { icon: CreditCard, title: 'Billing', text: 'Subscriptions and invoices.' },
  { icon: Shield, title: 'Security', text: 'SSO, audit logs, roles.' },
  { icon: Layers, title: 'Integrations', text: '120+ tools, one click.' },
];

/** defaultOpen shows the menu immediately (handy for previews); pass false in your app. */
export function MegaMenuNavbar({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Listen on the document that renders the component: it may live in an iframe (previews, embeds).
    const doc = ref.current?.ownerDocument ?? document;
    if (!open) return;
    const close = (event: MouseEvent) => { if (!ref.current?.contains(event.target as Node)) setOpen(false); };
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    doc.addEventListener('mousedown', close);
    doc.addEventListener('keydown', onKey);
    return () => { doc.removeEventListener('mousedown', close); doc.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <div ref={ref} className="relative w-full max-w-4xl">
      <nav aria-label="Main" className="flex h-14 items-center gap-6 rounded-2xl border border-zinc-200 bg-white px-5 dark:border-zinc-800 dark:bg-zinc-950">
        <span className="font-bold text-zinc-900 dark:text-white">Lumen</span>
        <button type="button" aria-expanded={open} aria-controls="mega-products" onClick={() => setOpen((value) => !value)} className="inline-flex items-center gap-1 text-sm font-medium text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white">
          Products <ChevronDown aria-hidden className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        <a href="#" className="hidden text-sm font-medium text-zinc-700 sm:block dark:text-zinc-300">Pricing</a>
        <a href="#" className="ml-auto rounded-lg bg-teal-600 px-3.5 py-2 text-sm font-semibold text-white">Get started</a>
      </nav>
      {open && (
        <div id="mega-products" className="absolute inset-x-0 top-16 z-10 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
          <ul className="grid gap-1 p-3 sm:grid-cols-2">
            {products.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <a href="#" className="flex gap-3 rounded-xl p-3 transition hover:bg-zinc-50 dark:hover:bg-zinc-900">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-teal-500/10 text-teal-700 dark:text-teal-300"><Icon aria-hidden className="size-5" /></span>
                  <span><span className="block text-sm font-semibold text-zinc-900 dark:text-white">{title}</span><span className="block text-sm text-zinc-500 dark:text-zinc-400">{text}</span></span>
                </a>
              </li>
            ))}
          </ul>
          <a href="#" className="flex items-center justify-between bg-zinc-50 px-6 py-3 text-sm dark:bg-zinc-900"><span className="font-medium text-zinc-900 dark:text-white">New: AI assistant</span><span className="text-teal-700 dark:text-teal-300">Learn more →</span></a>
        </div>
      )}
    </div>
  );
}
