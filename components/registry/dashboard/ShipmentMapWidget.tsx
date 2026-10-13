/**
 * @registry
 * name: Shipment Map Widget
 * category: Dashboard
 * style: Minimal
 * tags: recent
 * description: Suivi d'expédition : itinéraire en pointillés sur carte stylisée, camion qui avance, étapes horodatées et ETA mis à jour.
 * prompt: Create a shipment tracking widget: a stylised map panel (soft grid, two curved road paths) with an SVG route from warehouse to customer drawn as a dashed path and the completed part solid; a truck marker positioned along the route at the current progress; a header with tracking number and an "In transit" status pill, ETA "Today, 14:30–15:00"; a vertical step list (Picked up, Departed hub, Out for delivery, Delivered) with times and the current step highlighted; a "Simulate progress" button advances the step and moves the truck. Light and dark mode.
 */
'use client';
import { Truck } from 'lucide-react';
import { useState } from 'react';

const steps = [['Picked up', '08:12'], ['Departed hub', '10:40'], ['Out for delivery', '13:05'], ['Delivered', '—']];
const progressAt = [0.12, 0.42, 0.74, 1];
const route = 'M20 130 C 70 120, 80 60, 140 70 S 230 40, 280 30';

export function ShipmentMapWidget() {
  const [step, setStep] = useState(2);
  const progress = progressAt[step];
  // Truck position: sampled points along the route (precomputed, avoids measuring the path on the server).
  const samples = [[20, 130], [58, 118], [85, 85], [125, 70], [160, 66], [200, 52], [240, 40], [280, 30]];
  const point = samples[Math.round(progress * (samples.length - 1))];

  return (
    <section className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-start justify-between">
        <div><p className="text-xs text-zinc-500">Tracking · <span className="font-mono">PU-88214-SN</span></p><p className="mt-0.5 font-semibold text-zinc-950 dark:text-white">ETA today, 14:30–15:00</p></div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${step === 3 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300' : 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300'}`}>{step === 3 ? 'Delivered' : 'In transit'}</span>
      </div>
      <div className="relative mt-4 overflow-hidden rounded-xl bg-[linear-gradient(#e4e4e7_1px,transparent_1px),linear-gradient(90deg,#e4e4e7_1px,transparent_1px)] bg-[size:20px_20px] bg-zinc-50 dark:bg-[linear-gradient(#27272a_1px,transparent_1px),linear-gradient(90deg,#27272a_1px,transparent_1px)] dark:bg-zinc-900">
        <svg viewBox="0 0 300 160" className="w-full" aria-hidden>
          <path d="M0 100 C 80 90, 120 140, 300 110" fill="none" strokeWidth="10" className="stroke-white dark:stroke-zinc-800" />
          <path d={route} fill="none" strokeWidth="4" strokeDasharray="6 6" strokeLinecap="round" className="stroke-zinc-300 dark:stroke-zinc-600" />
          <path d={route} fill="none" strokeWidth="4" strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - progress} className="stroke-indigo-500 transition-[stroke-dashoffset] duration-700" />
          <circle cx="20" cy="130" r="6" className="fill-zinc-900 dark:fill-white" />
          <circle cx="280" cy="30" r="7" className="fill-emerald-500" />
        </svg>
        <span className="absolute grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-indigo-600 text-white shadow-lg transition-all duration-700" style={{ left: `${(point[0] / 300) * 100}%`, top: `${(point[1] / 160) * 100}%` }}><Truck aria-hidden className="size-4" /></span>
      </div>
      <ol className="mt-4 space-y-2">
        {steps.map(([label, time], index) => <li key={label} aria-current={index === step ? 'step' : undefined} className="flex items-center gap-3 text-sm"><span className={`size-2.5 rounded-full ${index < step ? 'bg-indigo-500' : index === step ? 'bg-indigo-500 ring-4 ring-indigo-500/20' : 'bg-zinc-300 dark:bg-zinc-700'}`} /><span className={`flex-1 ${index <= step ? 'font-medium text-zinc-950 dark:text-white' : 'text-zinc-400'}`}>{label}</span><span className="text-xs tabular-nums text-zinc-500">{index <= step ? (index === 3 ? '14:41' : time) : '—'}</span></li>)}
      </ol>
      <button type="button" onClick={() => setStep((step + 1) % 4)} className="mt-4 text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400">{step === 3 ? 'Restart demo' : 'Simulate progress'}</button>
      <p aria-live="polite" className="sr-only">Status: {steps[step][0]}</p>
    </section>
  );
}
