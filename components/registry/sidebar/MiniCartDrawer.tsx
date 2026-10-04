/**
 * @registry
 * name: Mini Cart Drawer
 * category: Sidebar
 * style: SaaS
 * tags: recent
 * description: Mini panier lateral avec quantites, suppression, total et seuil de livraison offerte.
 * prompt: Create a responsive mini cart drawer with two products, quantity controls, remove actions, dynamic subtotal, free-shipping progress and checkout button. Include an empty state.
 */
'use client';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useState } from 'react';
const products = [{ id: 1, name: 'Cloud Runner', detail: 'Sand · EU 42', price: 72, tone: 'bg-orange-200' }, { id: 2, name: 'Trail Bottle', detail: 'Forest · 750 ml', price: 24, tone: 'bg-emerald-200' }];
export function MiniCartDrawer() {
  const [quantities, setQuantities] = useState<Record<number, number>>({ 1: 1, 2: 2 });
  const update = (id: number, delta: number) => setQuantities((current) => ({ ...current, [id]: Math.max(0, (current[id] || 0) + delta) }));
  const visible = products.filter((item) => quantities[item.id] > 0);
  const total = visible.reduce((sum, item) => sum + item.price * quantities[item.id], 0);
  return <aside aria-label="Shopping cart" className="flex w-full max-w-md flex-col rounded-3xl border border-zinc-200 bg-white p-5 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 sm:p-6"><div className="flex items-center justify-between"><h2 className="flex items-center gap-2 font-semibold text-zinc-950 dark:text-white"><ShoppingBag size={19}/>Your cart</h2><span className="rounded-full bg-zinc-100 px-2 py-1 text-xs dark:bg-zinc-900">{visible.length} items</span></div>{visible.length ? <><div className="mt-5 space-y-4">{visible.map((item)=><div key={item.id} className="flex gap-3"><div className={`grid size-16 shrink-0 place-items-center rounded-2xl ${item.tone} text-xs font-bold text-zinc-700`}>ITEM</div><div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><div><p className="font-medium text-zinc-900 dark:text-white">{item.name}</p><p className="text-xs text-zinc-500">{item.detail}</p></div><button onClick={()=>setQuantities((q)=>({...q,[item.id]:0}))} aria-label={`Remove ${item.name}`} className="text-zinc-400 hover:text-rose-500"><Trash2 size={15}/></button></div><div className="mt-2 flex items-center justify-between"><div className="flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800"><button onClick={()=>update(item.id,-1)} aria-label="Decrease quantity" className="p-1.5"><Minus size={13}/></button><span className="w-7 text-center text-xs tabular-nums">{quantities[item.id]}</span><button onClick={()=>update(item.id,1)} aria-label="Increase quantity" className="p-1.5"><Plus size={13}/></button></div><strong className="text-sm text-zinc-950 dark:text-white">${item.price * quantities[item.id]}</strong></div></div></div>)}</div><div className="mt-6"><div className="flex justify-between text-xs text-zinc-500"><span>{total >= 120 ? 'Free shipping unlocked' : `$${120-total} away from free shipping`}</span><span>{Math.min(100,Math.round(total/120*100))}%</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"><div className="h-full rounded-full bg-emerald-500 transition-all" style={{width:`${Math.min(100,total/120*100)}%`}}/></div></div><div className="mt-5 flex justify-between border-t border-zinc-200 pt-4 dark:border-zinc-800"><span className="text-sm text-zinc-500">Subtotal</span><strong className="text-xl text-zinc-950 dark:text-white">${total}</strong></div><button className="mt-4 w-full rounded-xl bg-zinc-950 py-3 text-sm font-bold text-white dark:bg-white dark:text-zinc-950">Secure checkout</button></>:<div className="py-14 text-center"><ShoppingBag className="mx-auto text-zinc-300"/><p className="mt-3 font-medium text-zinc-900 dark:text-white">Your cart is empty</p><button onClick={()=>setQuantities({1:1,2:2})} className="mt-3 text-sm font-semibold text-emerald-600">Restore demo</button></div>}</aside>;
}
