/**
 * @registry
 * name: Interactive Product Inspector
 * category: Cards
 * style: SaaS
 * tags: featured, recent
 * description: Galerie produit avec loupe realiste, deplacement tactile, angles multiples et points d'information.
 * prompt: Create a responsive ecommerce product inspector with a cursor-following magnifying lens that shows the exact zoomed area, pointer/touch support, three image angles, clickable feature hotspots, zoom controls and an accessible reduced-motion experience.
 */
'use client';

import { BadgeCheck, Minus, Plus, ScanSearch, X } from 'lucide-react';
import { useState, type PointerEvent } from 'react';

const views = [
  { label: 'Side', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85' },
  { label: 'Detail', url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85' },
  { label: 'Top', url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85' },
];

const hotspots = [
  { x: 69, y: 38, title: 'Breathable knit', text: 'Engineered mesh increases airflow around the foot.' },
  { x: 45, y: 68, title: 'Energy foam', text: 'Dual-density cushioning softens every landing.' },
];

export function InteractiveProductInspector() {
  const [view, setView] = useState(0);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);
  const [zoom, setZoom] = useState(2.4);
  const [feature, setFeature] = useState<number | null>(null);

  const moveLens = (event: PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: Math.max(0, Math.min(100, ((event.clientX - box.left) / box.width) * 100)),
      y: Math.max(0, Math.min(100, ((event.clientY - box.top) / box.height) * 100)),
    });
  };

  return (
    <section className="w-full max-w-4xl rounded-[2rem] border border-zinc-200 bg-white p-4 shadow-2xl shadow-orange-500/10 dark:border-zinc-800 dark:bg-zinc-950 sm:p-6">
      <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="min-w-0 max-w-full overflow-hidden">
          <div
            className="relative aspect-[4/3] touch-none overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900"
            onPointerEnter={(event) => { setActive(true); moveLens(event); }}
            onPointerMove={moveLens}
            onPointerLeave={() => setActive(false)}
            onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); setActive(true); moveLens(event); }}
            onPointerUp={() => setActive(false)}
          >
            <img src={views[view].url} alt={`Performance sneaker, ${views[view].label.toLowerCase()} view`} draggable={false} className="block size-full min-w-0 max-w-full select-none object-cover" />
            <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/65 px-3 py-1.5 text-xs font-medium text-white backdrop-blur"><ScanSearch size={14} />Move to inspect</div>
            {view === 0 && hotspots.map((spot, index) => <button key={spot.title} type="button" aria-label={`Show ${spot.title}`} onPointerDown={(event) => event.stopPropagation()} onClick={() => setFeature(index)} style={{ left: `${spot.x}%`, top: `${spot.y}%` }} className="absolute z-20 grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-orange-500 text-xs font-black text-white shadow-lg motion-safe:animate-pulse">+</button>)}
            {active && <div aria-hidden="true" className="pointer-events-none absolute z-10 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-no-repeat shadow-2xl ring-1 ring-black/20 sm:size-44" style={{ left: `${position.x}%`, top: `${position.y}%`, backgroundImage: `url(${views[view].url})`, backgroundSize: `${zoom * 100}%`, backgroundPosition: `${position.x}% ${position.y}%` }} />}
            {feature !== null && <div className="absolute inset-x-3 bottom-3 z-30 rounded-2xl bg-zinc-950/90 p-4 text-white backdrop-blur sm:left-auto sm:max-w-xs"><button onClick={() => setFeature(null)} aria-label="Close feature" className="absolute right-3 top-3 text-zinc-400 hover:text-white"><X size={15}/></button><p className="flex items-center gap-1.5 text-sm font-bold"><BadgeCheck size={16} className="text-orange-400"/>{hotspots[feature].title}</p><p className="mt-1 pr-4 text-xs leading-relaxed text-zinc-300">{hotspots[feature].text}</p></div>}
          </div>
          <div className="mt-3 flex items-center gap-2"><div className="flex min-w-0 flex-1 gap-2">{views.map((item,index)=><button key={item.label} onClick={()=>{setView(index);setFeature(null)}} aria-pressed={view===index} className={`relative h-14 w-16 overflow-hidden rounded-xl border-2 ${view===index?'border-orange-500':'border-transparent opacity-65 hover:opacity-100'}`}><img src={item.url} alt="" className="size-full object-cover"/><span className="sr-only">{item.label} view</span></button>)}</div><div className="flex items-center rounded-xl border border-zinc-200 dark:border-zinc-800"><button onClick={()=>setZoom(value=>Math.max(1.6,value-.4))} aria-label="Zoom out" className="p-2.5"><Minus size={14}/></button><span className="w-10 text-center text-xs font-semibold tabular-nums">{zoom.toFixed(1)}×</span><button onClick={()=>setZoom(value=>Math.min(4,value+.4))} aria-label="Zoom in" className="p-2.5"><Plus size={14}/></button></div></div>
        </div>
        <aside className="flex flex-col justify-center rounded-3xl bg-zinc-50 p-5 dark:bg-zinc-900"><p className="text-xs font-bold uppercase tracking-[.2em] text-orange-600">Inspector</p><h2 className="mt-2 text-2xl font-black text-zinc-950 dark:text-white">Aero Sprint 02</h2><p className="mt-2 text-sm leading-relaxed text-zinc-500">Inspect the fabric, seams and cushioning before adding it to your collection.</p><dl className="mt-6 space-y-3 text-sm"><div className="flex justify-between"><dt className="text-zinc-500">Material</dt><dd className="font-semibold text-zinc-900 dark:text-white">Recycled knit</dd></div><div className="flex justify-between"><dt className="text-zinc-500">Weight</dt><dd className="font-semibold text-zinc-900 dark:text-white">248 g</dd></div><div className="flex justify-between"><dt className="text-zinc-500">Price</dt><dd className="font-semibold text-zinc-900 dark:text-white">$128</dd></div></dl><p className="mt-6 rounded-xl bg-orange-50 p-3 text-xs text-orange-800 dark:bg-orange-500/10 dark:text-orange-200">Desktop: hover the image. Mobile: press and drag your finger.</p></aside>
      </div>
    </section>
  );
}
