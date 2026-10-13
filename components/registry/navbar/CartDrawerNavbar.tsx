/**
 * @registry
 * name: Cart Drawer Navbar
 * category: Navbar
 * style: Minimal
 * tags: recent
 * description: Navbar de boutique avec panier en tiroir (ouvert par défaut) : articles, quantités, livraison gratuite à atteindre et total.
 * prompt: Create a shop navbar with a cart drawer rendered in flow (defaultOpen): the header has logo, category links and a bag button with a count badge (aria-expanded); the drawer lists items with thumbnail, name, variant, a quantity stepper and remove; a free-shipping progress bar ("Spend $12 more for free shipping" → "You've unlocked free shipping"); subtotal and a Checkout button; Escape closes and returns focus to the bag button; empty state with a "Continue shopping" link. Light and dark mode.
 */
'use client';
import { Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { useId, useRef, useState } from 'react';

const initial = [{ id: 1, name: 'Linen shirt', variant: 'Sand · M', price: 48, qty: 1, tone: 'bg-amber-200' }, { id: 2, name: 'Canvas tote', variant: 'Black', price: 22, qty: 2, tone: 'bg-zinc-800' }];
const threshold = 120;

export function CartDrawerNavbar({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const uid = useId();
  const [open, setOpen] = useState(defaultOpen);
  const [items, setItems] = useState(initial);
  const bagRef = useRef<HTMLButtonElement>(null);
  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const update = (id: number, qty: number) => setItems((list) => (qty <= 0 ? list.filter((item) => item.id !== id) : list.map((item) => (item.id === id ? { ...item, qty } : item))));

  return (
    <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950" onKeyDown={(event) => { if (event.key === 'Escape' && open) { setOpen(false); bagRef.current?.focus(); } }}>
      <header className="flex h-14 items-center gap-6 border-b border-zinc-200 px-5 dark:border-zinc-800">
        <a href="#" className="font-serif text-xl text-zinc-950 dark:text-white">atelier</a>
        <nav aria-label="Shop" className="hidden gap-5 text-sm text-zinc-600 sm:flex dark:text-zinc-400">{['New', 'Women', 'Men', 'Home'].map((link) => <a key={link} href="#" className="hover:text-zinc-950 dark:hover:text-white">{link}</a>)}</nav>
        <button ref={bagRef} type="button" aria-label={`Cart, ${count} items`} aria-expanded={open} aria-controls={`${uid}-cart`} onClick={() => setOpen(!open)} className="relative ml-auto grid size-10 place-items-center rounded-full text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"><ShoppingBag aria-hidden className="size-5" />{count > 0 && <span aria-hidden className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-zinc-950 text-[10px] font-bold text-white dark:bg-white dark:text-zinc-950">{count}</span>}</button>
      </header>
      {open && (
        <section id={`${uid}-cart`} aria-label="Shopping cart" className="ml-auto w-full border-l border-zinc-200 p-5 sm:w-96 dark:border-zinc-800">
          <div className="flex items-center justify-between"><h2 className="font-semibold text-zinc-950 dark:text-white">Your bag ({count})</h2><button type="button" aria-label="Close cart" onClick={() => { setOpen(false); bagRef.current?.focus(); }} className="grid size-8 place-items-center rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"><X aria-hidden className="size-4" /></button></div>
          {items.length ? (
            <>
              <div className="mt-4"><p aria-live="polite" className="text-xs text-zinc-600 dark:text-zinc-400">{subtotal >= threshold ? 'You’ve unlocked free shipping 🎉' : `Spend $${threshold - subtotal} more for free shipping`}</p><div className="mt-1.5 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${Math.min(100, (subtotal / threshold) * 100)}%` }} /></div></div>
              <ul className="mt-4 divide-y divide-zinc-100 dark:divide-zinc-800">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-3 py-3">
                    <span aria-hidden className={`size-16 shrink-0 rounded-lg ${item.tone}`} />
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between gap-2 text-sm"><p className="font-medium text-zinc-950 dark:text-white">{item.name}</p><p className="tabular-nums text-zinc-900 dark:text-zinc-100">${item.price * item.qty}</p></div>
                      <p className="text-xs text-zinc-500">{item.variant}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center rounded-full border border-zinc-200 dark:border-zinc-700"><button type="button" aria-label={`Decrease ${item.name}`} onClick={() => update(item.id, item.qty - 1)} className="grid size-7 place-items-center text-zinc-600 dark:text-zinc-300"><Minus aria-hidden className="size-3" /></button><span className="w-5 text-center text-xs tabular-nums text-zinc-900 dark:text-zinc-100">{item.qty}</span><button type="button" aria-label={`Increase ${item.name}`} onClick={() => update(item.id, item.qty + 1)} className="grid size-7 place-items-center text-zinc-600 dark:text-zinc-300"><Plus aria-hidden className="size-3" /></button></div>
                        <button type="button" onClick={() => update(item.id, 0)} className="text-xs text-zinc-500 underline hover:text-zinc-900 dark:hover:text-zinc-100">Remove</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex justify-between border-t border-zinc-200 pt-4 text-sm dark:border-zinc-800"><span className="text-zinc-600 dark:text-zinc-400">Subtotal</span><span className="font-semibold tabular-nums text-zinc-950 dark:text-white">${subtotal}</span></div>
              <button type="button" className="mt-4 w-full rounded-full bg-zinc-950 py-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Checkout</button>
            </>
          ) : <div className="py-10 text-center"><p className="text-sm text-zinc-500">Your bag is empty.</p><button type="button" onClick={() => setItems(initial)} className="mt-2 text-sm font-medium underline">Continue shopping</button></div>}
        </section>
      )}
    </div>
  );
}
