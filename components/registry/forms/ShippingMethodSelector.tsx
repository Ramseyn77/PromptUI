/**
 * @registry
 * name: Shipping Method Selector
 * category: Forms
 * style: SaaS
 * tags: recent
 * description: Choix du mode de livraison avec prix, délai et point relais.
 * prompt: Create a responsive shipping method selector with standard, express and pickup options, delivery dates, prices, accessible radio selection and a dynamic summary.
 */
'use client';
import { Bike, Box, MapPin, Zap } from 'lucide-react';import { useState } from 'react';
const methods=[{name:'Standard delivery',note:'Oct 16–18',price:0,Icon:Box},{name:'Express delivery',note:'Tomorrow before 18:00',price:12,Icon:Zap},{name:'Pickup point',note:'Central Market · 1.2 km',price:3,Icon:MapPin}];
export function ShippingMethodSelector(){const[selected,setSelected]=useState(0);const choice=methods[selected];return <section className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950 sm:p-6"><div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-xl bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300"><Bike size={20}/></div><div><h2 className="font-semibold text-zinc-950 dark:text-white">Delivery method</h2><p className="text-xs text-zinc-500">Choose how your order arrives</p></div></div><div role="radiogroup" aria-label="Shipping method" className="mt-5 space-y-2">{methods.map((item,index)=><button key={item.name} role="radio" aria-checked={selected===index} onClick={()=>setSelected(index)} className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left ${selected===index?'border-cyan-500 bg-cyan-50 dark:bg-cyan-500/10':'border-zinc-200 dark:border-zinc-800'}`}><item.Icon size={19} className="shrink-0 text-cyan-600"/><span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-zinc-900 dark:text-white">{item.name}</span><span className="block truncate text-xs text-zinc-500">{item.note}</span></span><strong className="text-sm text-zinc-950 dark:text-white">{item.price?'$'+item.price:'Free'}</strong></button>)}</div><div className="mt-5 rounded-xl bg-zinc-950 p-3 text-sm text-white dark:bg-white dark:text-zinc-950"><span className="text-zinc-400">Selected: </span><strong>{choice.name}</strong><span className="float-right">{choice.price?'$'+choice.price:'Free'}</span></div></section>}
