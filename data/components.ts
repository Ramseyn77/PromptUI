import type { LibraryComponent } from '@/types/component';

const makePrompt = (name: string, category: string, style: string, description: string) =>
  `Create a responsive ${category.toLowerCase()} component named "${name}" with React, TypeScript and Tailwind CSS. Style: ${style.toLowerCase()}. ${description} Keep it accessible, copy-ready and easy to customize.`;

export const components = [
  {
    slug: 'aurora-hero', name: 'Aurora Hero', category: 'Hero', style: 'Gradient', featured: true, recent: true, responsive: true,
    description: 'A focused SaaS hero with gradient glow, compact trust badges and dual CTAs.',
    technologies: ['React', 'TypeScript', 'Tailwind'],
    code: `export function AuroraHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border bg-zinc-950 px-6 py-20 text-white md:px-12">
      <div className="absolute inset-x-20 top-0 h-48 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="relative mx-auto max-w-3xl text-center">
        <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-zinc-300">Ship interfaces faster</span>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">Build beautiful products without starting from zero.</h1>
        <p className="mx-auto mt-5 max-w-2xl text-zinc-400">Copy polished UI, adapt the source, or use the AI prompt to create your own variation.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button className="rounded-xl bg-white px-5 py-3 font-medium text-zinc-950">Browse components</button>
          <button className="rounded-xl border border-white/15 px-5 py-3 font-medium">View on GitHub</button>
        </div>
      </div>
    </section>
  );
}`,
    prompt: ''
  },
  {
    slug: 'command-navbar', name: 'Command Navbar', category: 'Navbar', style: 'Minimal', featured: true, responsive: true,
    description: 'A compact navigation bar with product mark, links, command-search affordance and CTA.', technologies: ['React','TypeScript','Tailwind','Lucide'],
    code: `import { useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
export function CommandNavbar() {
  const [open,setOpen]=useState(false);
  return <div className="relative"><nav className="flex items-center justify-between rounded-2xl border bg-white p-3 shadow-sm dark:bg-zinc-950">
    <div className="flex items-center gap-6"><strong>PromptUI</strong><div className="hidden gap-5 text-sm text-zinc-500 sm:flex"><a href="#">Library</a><a href="#">Docs</a><a href="#">Changelog</a></div></div>
    <div className="flex items-center gap-2"><button className="hidden items-center gap-2 rounded-lg border px-3 py-2 text-sm text-zinc-500 md:flex"><Search size={15}/> Search</button><button className="rounded-lg bg-zinc-950 px-3 py-2 text-sm text-white dark:bg-white dark:text-zinc-950">Browse</button><button aria-label="Ouvrir le menu" aria-expanded={open} onClick={()=>setOpen(!open)} className="grid size-9 place-items-center rounded-lg border sm:hidden">{open?<X/>:<Menu/>}</button></div>
  </nav>{open&&<div className="absolute inset-x-0 top-[calc(100%+.5rem)] z-20 grid rounded-2xl border bg-white p-2 shadow-xl sm:hidden dark:bg-zinc-950">{['Library','Docs','Changelog'].map(item=><a key={item} className="rounded-xl px-3 py-2" href="#">{item}</a>)}</div>}</div>;
}`,
    prompt: ''
  },
  {
    slug: 'metric-card', name: 'Metric Card', category: 'Cards', style: 'SaaS', featured: true, responsive: true,
    description: 'Analytics KPI card with trend indicator, sparkline treatment and supporting context.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function MetricCard() {
  return <article className="rounded-2xl border bg-white p-5 shadow-sm dark:bg-zinc-950">
    <div className="flex items-start justify-between"><div><p className="text-sm text-zinc-500">Monthly revenue</p><p className="mt-2 text-3xl font-semibold">$84.2k</p></div><span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-600">+12.4%</span></div>
    <div className="mt-6 flex h-14 items-end gap-1">{[3,5,4,8,6,10,9,13,11,15].map((v,i)=><span key={i} className="flex-1 rounded-sm bg-zinc-900/80 dark:bg-zinc-100" style={{height:v*3}} />)}</div>
  </article>;
}`,
    prompt: ''
  },
  {
    slug: 'magnetic-button', name: 'Magnetic Button', category: 'Buttons', style: 'Gradient', recent: true, responsive: true,
    description: 'High-emphasis gradient button with icon, depth and polished hover feedback.', technologies: ['React','TypeScript','Tailwind','Lucide'],
    code: `import { ArrowUpRight } from 'lucide-react';
export function MagneticButton() { return <button className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-3 font-medium text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5"><span>Launch project</span><ArrowUpRight size={17} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button>; }`,
    prompt: ''
  },
  {
    slug: 'waitlist-form', name: 'Waitlist Form', category: 'Forms', style: 'Minimal', featured: true, responsive: true,
    description: 'Clean email capture form with helpful copy, label, focus treatment and privacy hint.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function WaitlistForm() { return <form className="mx-auto max-w-md rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-950"><h3 className="text-xl font-semibold">Join the early access list</h3><p className="mt-2 text-sm text-zinc-500">Get product updates and new component drops.</p><label className="mt-5 block text-sm font-medium" htmlFor="email">Work email</label><input id="email" type="email" placeholder="you@company.com" className="mt-2 w-full rounded-xl border bg-transparent px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"/><button className="mt-3 w-full rounded-xl bg-zinc-950 px-4 py-3 font-medium text-white dark:bg-white dark:text-zinc-950">Request access</button><p className="mt-3 text-xs text-zinc-400">No spam. Unsubscribe anytime.</p></form>; }`,
    prompt: ''
  },
  {
    slug: 'pricing-focus', name: 'Pricing Focus', category: 'Pricing', style: 'SaaS', featured: true, responsive: true,
    description: 'Single-plan pricing card designed for focused conversion without a complex comparison table.', technologies: ['React','TypeScript','Tailwind','Lucide'],
    code: `import { Check } from 'lucide-react';
export function PricingFocus() { const features=['Unlimited projects','Priority support','Team collaboration']; return <div className="max-w-sm rounded-3xl border bg-zinc-950 p-7 text-white shadow-xl"><span className="text-sm text-violet-300">Pro</span><div className="mt-3 flex items-end gap-1"><strong className="text-5xl">$24</strong><span className="pb-1 text-zinc-400">/month</span></div><p className="mt-4 text-sm text-zinc-400">Everything a small product team needs to ship faster.</p><ul className="mt-6 space-y-3 text-sm">{features.map(x=><li key={x} className="flex gap-2"><Check size={16} className="text-emerald-400"/>{x}</li>)}</ul><button className="mt-7 w-full rounded-xl bg-white py-3 font-medium text-zinc-950">Start free</button></div>; }`,
    prompt: ''
  },
  {
    slug: 'founder-quote', name: 'Founder Quote', category: 'Testimonials', style: 'Editorial', recent: true, responsive: true,
    description: 'Editorial testimonial card with quote, author details and restrained visual hierarchy.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function FounderQuote() { return <figure className="max-w-2xl rounded-3xl border bg-white p-8 dark:bg-zinc-950"><blockquote className="text-2xl font-medium leading-relaxed tracking-tight">“We moved from rough idea to polished interface in a single afternoon.”</blockquote><figcaption className="mt-8 flex items-center gap-3"><div className="grid size-11 place-items-center rounded-full bg-zinc-900 text-sm font-semibold text-white">AM</div><div><p className="font-medium">Amina Mensah</p><p className="text-sm text-zinc-500">Founder, Northstar Labs</p></div></figcaption></figure>; }`,
    prompt: ''
  },
  {
    slug: 'activity-dashboard', name: 'Activity Dashboard', category: 'Dashboard', style: 'Dark', featured: true, responsive: true,
    description: 'Compact dark dashboard showing key metrics, recent activity and project health at a glance.', technologies: ['React','TypeScript','Tailwind','Lucide'],
    code: `import { Activity, Users, Zap } from 'lucide-react';
export function ActivityDashboard(){ return <div className="grid gap-4 rounded-3xl bg-zinc-950 p-5 text-white md:grid-cols-3"><div className="md:col-span-2 rounded-2xl border border-white/10 p-5"><div className="flex items-center justify-between"><h3 className="font-semibold">Project activity</h3><Activity size={18}/></div><div className="mt-8 grid grid-cols-3 gap-3">{[['Sessions','18.4k'],['Users','7.2k'],['Deploys','128']].map(([a,b])=><div key={a} className="rounded-xl bg-white/5 p-3"><p className="text-xs text-zinc-400">{a}</p><p className="mt-1 text-xl font-semibold">{b}</p></div>)}</div></div><div className="rounded-2xl border border-white/10 p-5"><Users/><p className="mt-6 text-3xl font-semibold">96%</p><p className="text-sm text-zinc-400">Healthy workspace</p><div className="mt-5 h-2 rounded-full bg-white/10"><div className="h-full w-[96%] rounded-full bg-emerald-400"/></div></div></div>; }`,
    prompt: ''
  },
  {
    slug: 'minimal-footer', name: 'Minimal Footer', category: 'Footer', style: 'Minimal', responsive: true,
    description: 'Simple product footer with navigation groups, status indicator and copyright.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function MinimalFooter(){ return <footer className="border-t py-10"><div className="flex flex-col justify-between gap-8 md:flex-row"><div><strong>PromptUI</strong><p className="mt-2 max-w-xs text-sm text-zinc-500">Reusable interfaces and prompts for developers who want to move faster.</p></div><div className="grid grid-cols-2 gap-12 text-sm"><div className="space-y-2"><p className="font-medium">Product</p><a className="block text-zinc-500">Library</a><a className="block text-zinc-500">Changelog</a></div><div className="space-y-2"><p className="font-medium">Company</p><a className="block text-zinc-500">About</a><a className="block text-zinc-500">GitHub</a></div></div></div><div className="mt-10 flex justify-between border-t pt-5 text-xs text-zinc-500"><span>© 2026 PromptUI</span><span>All systems operational</span></div></footer>; }`,
    prompt: ''
  },
  {
    slug: 'launch-cta', name: 'Launch CTA', category: 'CTA', style: 'Gradient', featured: true, responsive: true,
    description: 'Conversion CTA banner with a luminous background, concise pitch and primary action.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function LaunchCTA(){ return <section className="relative overflow-hidden rounded-3xl border bg-zinc-950 p-8 text-white md:p-12"><div className="absolute -right-10 -top-20 size-64 rounded-full bg-fuchsia-500/20 blur-3xl"/><div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"><div><p className="text-sm text-violet-300">Ready to build?</p><h2 className="mt-2 max-w-xl text-3xl font-semibold md:text-4xl">Turn the next interface idea into working UI.</h2></div><button className="rounded-xl bg-white px-5 py-3 font-medium text-zinc-950">Explore library</button></div></section>; }`,
    prompt: ''
  },
  {
    slug: 'split-hero', name: 'Split Product Hero', category: 'Hero', style: 'SaaS', recent: true, responsive: true,
    description: 'Two-column product hero pairing concise messaging with a visual product mockup.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function SplitProductHero(){ return <section className="grid items-center gap-10 py-10 md:grid-cols-2"><div><span className="text-sm font-medium text-violet-600">Built for product teams</span><h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Design, build and iterate from one shared system.</h1><p className="mt-5 text-zinc-500">A cleaner workflow for teams that care about speed and interface quality.</p><button className="mt-7 rounded-xl bg-zinc-950 px-5 py-3 text-white dark:bg-white dark:text-zinc-950">Start building</button></div><div className="rounded-3xl border bg-zinc-100 p-4 dark:bg-zinc-900"><div className="aspect-[4/3] rounded-2xl border bg-white p-4 dark:bg-zinc-950"><div className="h-3 w-24 rounded bg-zinc-200 dark:bg-zinc-800"/><div className="mt-8 grid grid-cols-2 gap-3"><div className="h-28 rounded-xl bg-violet-500/15"/><div className="h-28 rounded-xl bg-zinc-100 dark:bg-zinc-900"/></div></div></div></section>; }`,
    prompt: ''
  },
  {
    slug: 'floating-navbar', name: 'Floating Navbar', category: 'Navbar', style: 'Glass', responsive: true,
    description: 'Pill-shaped floating navbar with glass treatment and compact mobile-friendly actions.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';
import { Menu, X } from 'lucide-react';
export function FloatingNavbar(){const [open,setOpen]=useState(false);return <div className="relative"><nav className="mx-auto flex max-w-3xl items-center justify-between rounded-full border bg-white/80 px-4 py-2 shadow-lg backdrop-blur dark:bg-zinc-950/80"><strong className="pl-2">P/UI</strong><div className="hidden gap-5 text-sm text-zinc-500 sm:flex"><a>Components</a><a>Prompts</a><a>Docs</a></div><div className="flex items-center gap-2"><button className="rounded-full bg-zinc-950 px-4 py-2 text-sm text-white dark:bg-white dark:text-zinc-950">Get started</button><button aria-label="Ouvrir le menu" aria-expanded={open} onClick={()=>setOpen(!open)} className="grid size-9 place-items-center rounded-full border sm:hidden">{open?<X/>:<Menu/>}</button></div></nav>{open&&<div className="absolute inset-x-3 top-[calc(100%+.5rem)] z-20 grid rounded-2xl border bg-white p-2 shadow-xl sm:hidden dark:bg-zinc-950">{['Components','Prompts','Docs'].map(item=><a key={item} className="rounded-xl px-3 py-2">{item}</a>)}</div>}</div>}`,
    prompt: ''
  },
  {
    slug: 'project-card', name: 'Project Card', category: 'Cards', style: 'Minimal', responsive: true,
    description: 'Developer project card with status, description, contributors and deployment context.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function ProjectCard(){return <article className="rounded-2xl border p-5"><div className="flex items-center justify-between"><span className="rounded-lg bg-zinc-100 px-2 py-1 text-xs dark:bg-zinc-900">Production</span><span className="size-2 rounded-full bg-emerald-500"/></div><h3 className="mt-5 text-lg font-semibold">Storefront redesign</h3><p className="mt-2 text-sm text-zinc-500">Component-driven commerce experience for a fast-growing retail team.</p><div className="mt-6 flex items-center justify-between text-xs text-zinc-500"><span>Updated 14m ago</span><span>3 contributors</span></div></article>}`,
    prompt: ''
  },
  {
    slug: 'icon-button-set', name: 'Icon Button Set', category: 'Buttons', style: 'Minimal', responsive: true,
    description: 'Accessible icon button group for common toolbar actions.', technologies: ['React','TypeScript','Tailwind','Lucide'],
    code: `import { Copy, Heart, Share2, MoreHorizontal } from 'lucide-react';
export function IconButtonSet(){const items=[['Copy',Copy],['Save',Heart],['Share',Share2],['More',MoreHorizontal]] as const;return <div className="inline-flex gap-2 rounded-2xl border p-2">{items.map(([label,Icon])=><button key={label} aria-label={label} className="grid size-10 place-items-center rounded-xl transition hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:hover:bg-zinc-900"><Icon size={18}/></button>)}</div>}`,
    prompt: ''
  },
  {
    slug: 'contact-form', name: 'Contact Form', category: 'Forms', style: 'SaaS', responsive: true,
    description: 'Two-column contact form with clear labels and compact field grouping.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function ContactForm(){return <form className="max-w-xl rounded-3xl border p-6"><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm">First name<input className="mt-2 w-full rounded-xl border bg-transparent px-3 py-2.5"/></label><label className="text-sm">Last name<input className="mt-2 w-full rounded-xl border bg-transparent px-3 py-2.5"/></label></div><label className="mt-4 block text-sm">Email<input type="email" className="mt-2 w-full rounded-xl border bg-transparent px-3 py-2.5"/></label><label className="mt-4 block text-sm">Message<textarea rows={4} className="mt-2 w-full resize-none rounded-xl border bg-transparent px-3 py-2.5"/></label><button className="mt-4 rounded-xl bg-zinc-950 px-5 py-3 text-sm font-medium text-white dark:bg-white dark:text-zinc-950">Send message</button></form>}`,
    prompt: ''
  },
  {
    slug: 'pricing-duo', name: 'Pricing Duo', category: 'Pricing', style: 'Minimal', responsive: true,
    description: 'Simple two-tier pricing comparison suitable for an early-stage SaaS landing page.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function PricingDuo(){const plans=[['Starter','$0','For personal prototypes'],['Pro','$19','For shipping teams']];return <div className="grid max-w-3xl gap-4 md:grid-cols-2">{plans.map(([name,price,desc],i)=><div key={name} className={"rounded-3xl border p-6 " + (i?'bg-zinc-950 text-white':'')}><p className="font-medium">{name}</p><p className="mt-5 text-4xl font-semibold">{price}</p><p className={"mt-2 text-sm " + (i?'text-zinc-400':'text-zinc-500')}>{desc}</p><button className={"mt-8 w-full rounded-xl py-3 text-sm font-medium " + (i?'bg-white text-zinc-950':'bg-zinc-100 dark:bg-zinc-900')}>Choose {name}</button></div>)}</div>}`,
    prompt: ''
  },
  {
    slug: 'testimonial-grid', name: 'Testimonial Grid', category: 'Testimonials', style: 'Minimal', responsive: true,
    description: 'Responsive three-card testimonial layout for credible social proof.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function TestimonialGrid(){const quotes=[['Maya','The component quality is excellent.'],['Jon','Copy, adapt, ship. Exactly what I needed.'],['Leila','The AI prompts make iteration dramatically faster.']];return <div className="grid gap-4 md:grid-cols-3">{quotes.map(([name,quote])=><figure key={name} className="rounded-2xl border p-5"><blockquote className="text-sm leading-6">“{quote}”</blockquote><figcaption className="mt-6 text-sm font-medium">{name}<span className="block text-xs font-normal text-zinc-500">Product designer</span></figcaption></figure>)}</div>}`,
    prompt: ''
  },
  {
    slug: 'team-dashboard', name: 'Team Dashboard', category: 'Dashboard', style: 'SaaS', responsive: true,
    description: 'Light dashboard panel combining workspace overview, progress and team task states.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function TeamDashboard(){return <div className="rounded-3xl border bg-zinc-50 p-5 dark:bg-zinc-950"><div className="flex justify-between"><div><p className="text-sm text-zinc-500">Workspace</p><h3 className="text-xl font-semibold">Design system</h3></div><button className="rounded-xl border bg-white px-3 py-2 text-sm dark:bg-zinc-900">New task</button></div><div className="mt-6 grid gap-4 md:grid-cols-3">{[['Backlog','12'],['In progress','5'],['Done','28']].map(([a,b])=><div key={a} className="rounded-2xl border bg-white p-4 dark:bg-zinc-900"><p className="text-xs text-zinc-500">{a}</p><p className="mt-2 text-3xl font-semibold">{b}</p></div>)}</div></div>}`,
    prompt: ''
  },
  {
    slug: 'link-footer', name: 'Link Footer', category: 'Footer', style: 'Dark', responsive: true,
    description: 'Dark multi-column footer optimized for compact product navigation.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function LinkFooter(){return <footer className="rounded-3xl bg-zinc-950 p-8 text-white"><div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4"><div className="sm:col-span-2"><strong>PromptUI</strong><p className="mt-3 max-w-sm text-sm text-zinc-400">Open UI building blocks with source and AI prompts.</p></div>{[['Build','Components','Prompts'],['Learn','Docs','Examples']].map(group=><div key={group[0]}><p className="text-sm font-medium">{group[0]}</p>{group.slice(1).map(x=><a key={x} className="mt-3 block text-sm text-zinc-400">{x}</a>)}</div>)}</div></footer>}`,
    prompt: ''
  },
  {
    slug: 'newsletter-cta', name: 'Newsletter CTA', category: 'CTA', style: 'Editorial', recent: true, responsive: true,
    description: 'Editorial newsletter callout with inline email field and restrained layout.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function NewsletterCTA(){return <section className="rounded-3xl border p-7 md:p-10"><div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><p className="text-sm text-zinc-500">Weekly component drop</p><h2 className="mt-2 max-w-lg text-3xl font-semibold tracking-tight">One useful interface pattern, every Friday.</h2></div><form className="flex w-full gap-2 md:w-auto"><input aria-label="Email" type="email" placeholder="you@example.com" className="min-w-0 flex-1 rounded-xl border bg-transparent px-4 py-3 md:w-64"/><button className="rounded-xl bg-zinc-950 px-4 py-3 text-sm font-medium text-white dark:bg-white dark:text-zinc-950">Subscribe</button></form></div></section>}`,
    prompt: ''
  },
  {
    slug: 'revenue-chart', name: 'Revenue Chart', category: 'Charts', style: 'SaaS', featured: true, recent: true, responsive: true,
    description: 'Carte analytique avec courbe, barres secondaires et indicateurs de tendance pour dashboard SaaS.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function RevenueChart(){const data=[['Jan',38],['Fev',52],['Mar',45],['Avr',72],['Mai',64],['Juin',88],['Juil',76],['Aou',94]] as const;return <section className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-zinc-950"><div className="flex items-start justify-between"><div><p className="text-sm text-zinc-500">Revenus</p><h3 className="mt-1 text-3xl font-semibold">128.4k euros</h3></div><span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600">+18.2%</span></div><div className="mt-8 rounded-2xl border border-zinc-100 bg-zinc-50/70 px-4 pb-3 pt-5 dark:border-zinc-800 dark:bg-zinc-900/40"><div className="flex h-40 items-end gap-3 border-b border-zinc-200/80 dark:border-zinc-800">{data.map(([month,bar])=><div key={month} className="flex flex-1 justify-center"><span className="w-full max-w-9 rounded-t-lg bg-teal-600/85" style={{height:bar}}/></div>)}</div><div className="mt-2 grid grid-cols-8 gap-3 text-center text-[10px] font-medium text-zinc-400">{data.map(([month])=><span key={month}>{month}</span>)}</div></div><div className="mt-5 rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-600 dark:bg-zinc-900">Objectif mensuel atteint a 82%.</div></section>}`,
    prompt: ''
  },
  {
    slug: 'data-table', name: 'Data Table', category: 'Tables', style: 'Minimal', featured: true, recent: true, responsive: true,
    description: 'Tableau de donnees compact avec statut, montant, proprietaire et lignes faciles a scanner.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function DataTable(){const rows=[['Acme Corp','Enterprise','12 400 euros','Actif'],['Northstar','Startup','4 800 euros','Essai'],['Orbit Labs','Scale-up','8 200 euros','Actif']];return <div className="overflow-hidden rounded-3xl border bg-white shadow-sm dark:bg-zinc-950"><div className="flex items-center justify-between border-b p-4"><h3 className="font-semibold">Comptes clients</h3><button className="rounded-xl bg-zinc-950 px-3 py-2 text-xs font-medium text-white dark:bg-white dark:text-zinc-950">Exporter</button></div><div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-zinc-50 text-xs uppercase text-zinc-500 dark:bg-zinc-900"><tr>{['Client','Plan','MRR','Statut'].map(h=><th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr></thead><tbody>{rows.map(row=><tr key={row[0]} className="border-t"><td className="px-4 py-4 font-medium">{row[0]}</td><td className="px-4 py-4 text-zinc-500">{row[1]}</td><td className="px-4 py-4">{row[2]}</td><td className="px-4 py-4"><span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-600">{row[3]}</span></td></tr>)}</tbody></table></div></div>}`,
    prompt: ''
  },
  {
    slug: 'kanban-board', name: 'Kanban Board', category: 'Boards', style: 'SaaS', featured: true, recent: true, responsive: true,
    description: 'Board Kanban en colonnes pour suivre les taches produit, priorites et responsables.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function KanbanBoard(){const cols=[['A faire',['Audit UX','Maquettes mobile']],['En cours',['Filtres avancees','Nouvelle sidebar']],['Pret',['Export CSV','Empty state']]];return <div className="grid gap-4 rounded-3xl border bg-zinc-50 p-4 dark:bg-zinc-950 md:grid-cols-3">{cols.map(([title,cards])=><section key={title as string} className="rounded-2xl border bg-white p-3 dark:bg-zinc-900"><div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-semibold">{title as string}</h3><span className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-500 dark:bg-zinc-800">{(cards as string[]).length}</span></div><div className="space-y-3">{(cards as string[]).map(card=><article key={card} className="rounded-xl border bg-white p-3 shadow-sm dark:bg-zinc-950"><p className="text-sm font-medium">{card}</p><div className="mt-4 flex items-center justify-between text-xs text-zinc-500"><span>Produit</span><span className="size-6 rounded-full bg-teal-600"/></div></article>)}</div></section>)}</div>}`,
    prompt: ''
  },
  {
    slug: 'roadmap-board', name: 'Roadmap Board', category: 'Boards', style: 'Editorial', recent: true, responsive: true,
    description: 'Vue roadmap par trimestre avec jalons, progression et priorites de livraison.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function RoadmapBoard(){const items=[['Q1','Design system','70%'],['Q2','Billing v2','45%'],['Q3','Team analytics','20%']];return <section className="rounded-3xl border bg-white p-6 dark:bg-zinc-950"><div className="flex items-end justify-between"><div><p className="text-sm text-zinc-500">Roadmap</p><h3 className="text-2xl font-semibold">Livraisons produit</h3></div><span className="text-xs text-zinc-500">2026</span></div><div className="mt-6 grid gap-3 md:grid-cols-3">{items.map(([q,title,progress])=><article key={q} className="rounded-2xl border p-4"><p className="text-xs font-medium text-teal-600">{q}</p><h4 className="mt-3 font-semibold">{title}</h4><div className="mt-6 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className="h-full rounded-full bg-teal-600" style={{width:progress}}/></div><p className="mt-2 text-xs text-zinc-500">{progress} complete</p></article>)}</div></section>}`,
    prompt: ''
  },
  {
    slug: 'radial-action-menu', name: 'Radial Action Menu', category: 'Menu', style: 'SaaS', recent: true, responsive: true,
    description: 'Menu radial flottant : un bouton daction se deploie en eventail courbe dicones avec degrades, ombres et animation ressort.', technologies: ['React','TypeScript','Tailwind','Lucide'],
    code: `'use client';
import { useState } from 'react';
import { Bell, BarChart3, Bike, Code2, Home, LayoutGrid, Menu, Package, Settings, Store, TriangleAlert, Users, X } from 'lucide-react';

export function RadialActionMenu() {
  const [open, setOpen] = useState(false);
  const items = [
    { icon: LayoutGrid, label: 'Dashboard', active: true },
    { icon: Package, label: 'Colis' },
    { icon: TriangleAlert, label: 'Incidents' },
    { icon: Store, label: 'Points relais' },
    { icon: Users, label: 'Equipe' },
    { icon: Bike, label: 'Coursiers' },
    { icon: Code2, label: 'API' },
    { icon: Home, label: 'Zones' },
    { icon: BarChart3, label: 'Rapports' },
    { icon: Bell, label: 'Alertes' },
    { icon: Settings, label: 'Reglages' },
  ];

  return (
    <div className="relative h-96 w-full overflow-hidden rounded-3xl border bg-[#faf9f6] bg-[radial-gradient(circle_at_1px_1px,rgba(21,21,18,.14)_1px,transparent_0)] bg-size-[22px_22px] dark:bg-zinc-950 dark:bg-[radial-gradient(circle_at_1px_1px,rgba(247,242,232,.12)_1px,transparent_0)]">
      {items.map((item, i) => {
        const t = i / (items.length - 1);
        const angle = -Math.PI / 2 + t * Math.PI;
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            aria-label={item.label}
            style={{
              top: \`calc(50% + \${Math.sin(angle) * 150}px)\`,
              right: \`calc(8% + \${Math.cos(angle) * 150}px)\`,
              transitionDelay: \`\${open ? i * 30 : 0}ms\`,
            }}
            className={\`absolute grid size-10 -translate-y-1/2 place-items-center rounded-full shadow-lg ring-1 transition-all duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] \${
              open ? 'scale-100 opacity-100' : 'pointer-events-none scale-0 opacity-0'
            } \${
              item.active
                ? 'bg-amber-400 text-zinc-950 shadow-amber-500/30 ring-amber-200/60'
                : 'bg-zinc-900 text-white shadow-black/20 ring-white/10 hover:scale-110 hover:bg-zinc-800'
            }\`}
          >
            <Icon size={15} />
          </button>
        );
      })}

      <button
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        className={\`absolute right-[8%] top-1/2 grid size-13 -translate-y-1/2 place-items-center rounded-full shadow-xl ring-4 ring-white/50 transition-all duration-300 dark:ring-zinc-950/60 \${
          open
            ? 'rotate-90 bg-red-500 text-white shadow-red-500/30'
            : 'bg-amber-400 text-zinc-950 shadow-amber-500/30 hover:scale-105'
        }\`}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>
    </div>
  );
}`,
    prompt: ''
  },
  {
    slug: 'dark-dashboard-sidebar', name: 'Dark Dashboard Sidebar', category: 'Sidebar', style: 'Dark', featured: true, recent: true, responsive: true,
    description: 'Sidebar dadministration sombre avec navigation groupee, badge de notification et carte utilisateur en pied de page.', technologies: ['React','TypeScript','Tailwind','Lucide'],
    code: `import { BarChart3, FolderKanban, Inbox, LayoutDashboard, LogOut, Settings, Users } from 'lucide-react';

export function DarkDashboardSidebar() {
  const nav = [
    { icon: LayoutDashboard, label: 'Overview', active: true },
    { icon: Inbox, label: 'Inbox', count: 4 },
    { icon: FolderKanban, label: 'Projects' },
    { icon: Users, label: 'Team' },
    { icon: BarChart3, label: 'Reports' },
  ];

  return (
    <aside className="flex h-130 w-64 flex-col justify-between rounded-3xl border border-white/10 bg-zinc-950 p-4 text-zinc-300">
      <div>
        <div className="flex items-center gap-2 px-2">
          <div className="grid size-8 place-items-center rounded-lg bg-white text-sm font-bold text-zinc-950">P</div>
          <span className="text-sm font-semibold text-white">PromptUI</span>
        </div>

        <nav className="mt-8 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href="#"
                className={\`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition \${
                  item.active ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                }\`}
              >
                <span className="flex items-center gap-3"><Icon size={17} />{item.label}</span>
                {item.count && <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-400">{item.count}</span>}
              </a>
            );
          })}
        </nav>
      </div>

      <div>
        <a href="#" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-400 transition hover:bg-white/5 hover:text-white">
          <Settings size={17} />Settings
        </a>
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="grid size-9 place-items-center rounded-full bg-violet-500 text-xs font-semibold text-white">AM</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">Amina Mensah</p>
            <p className="truncate text-xs text-zinc-500">amina@promptui.dev</p>
          </div>
          <LogOut size={16} className="shrink-0 text-zinc-500" />
        </div>
      </div>
    </aside>
  );
}`,
    prompt: ''
  },
  {
    slug: 'icon-rail-sidebar', name: 'Icon Rail Sidebar', category: 'Sidebar', style: 'Minimal', recent: true, responsive: true,
    description: 'Rail de navigation compact avec icones actives et infobulles au survol, inspire des barres dactivite doutils dev.', technologies: ['React','TypeScript','Tailwind','Lucide'],
    code: `import { useState } from 'react';
import { BarChart3, Bell, FolderKanban, Home, Menu, MessageSquare, Settings, Users, X } from 'lucide-react';

export function IconRailSidebar() {
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const items = [
    { key: 'home', icon: Home, label: 'Accueil' },
    { key: 'projects', icon: FolderKanban, label: 'Projets' },
    { key: 'team', icon: Users, label: 'Equipe' },
    { key: 'chat', icon: MessageSquare, label: 'Messages' },
    { key: 'reports', icon: BarChart3, label: 'Rapports' },
    { key: 'alerts', icon: Bell, label: 'Alertes' },
  ];

  return (
    <div className="relative min-h-120">
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="icon-rail" aria-label={open ? 'Masquer la navigation' : 'Afficher la navigation'} className="absolute left-3 top-3 z-30 grid size-10 place-items-center rounded-xl border bg-white shadow-lg sm:hidden dark:bg-zinc-950">
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>
      <aside id="icon-rail" className={\`\${open ? 'flex' : 'hidden'} absolute left-3 top-14 z-20 h-120 w-18 flex-col items-center justify-between rounded-3xl border bg-white py-4 shadow-2xl sm:static sm:flex sm:shadow-none dark:bg-zinc-950\`}>
      <div className="grid size-9 place-items-center rounded-xl bg-zinc-950 text-sm font-bold text-white dark:bg-white dark:text-zinc-950">P</div>

      <nav className="flex flex-1 flex-col items-center justify-center gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              aria-label={item.label}
              className={\`group relative flex size-11 items-center justify-center rounded-xl transition \${
                isActive ? 'bg-teal-600 text-white' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900'
              }\`}
            >
              <Icon size={18} />
              <span className="pointer-events-none absolute left-[calc(100%+10px)] z-10 whitespace-nowrap rounded-lg bg-zinc-950 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition group-hover:opacity-100 dark:bg-white dark:text-zinc-950">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <button aria-label="Reglages" className="grid size-9 place-items-center rounded-xl text-zinc-500 transition hover:bg-zinc-100 dark:hover:bg-zinc-900">
        <Settings size={17} />
      </button>
      </aside>
    </div>
  );
}`,
    prompt: ''
  },
  {
    slug: 'workspace-sidebar', name: 'Workspace Sidebar', category: 'Sidebar', style: 'SaaS', featured: true, responsive: true,
    description: 'Sidebar SaaS claire avec selecteur despace de travail, recherche rapide et groupe de projets repliable.', technologies: ['React','TypeScript','Tailwind','Lucide'],
    code: `import { useState } from 'react';
import { ChevronDown, ChevronsUpDown, Hash, LayoutDashboard, Plus, Search } from 'lucide-react';

export function WorkspaceSidebar() {
  const [projectsOpen, setProjectsOpen] = useState(true);
  const projects = ['Design system', 'Marketing site', 'Mobile app'];

  return (
    <aside className="flex h-130 w-72 flex-col rounded-3xl border bg-white p-4 dark:bg-zinc-950">
      <button className="flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left">
        <div className="grid size-7 place-items-center rounded-lg bg-teal-600 text-xs font-bold text-white">N</div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">Northstar Labs</p>
          <p className="text-xs text-zinc-500">Plan Pro</p>
        </div>
        <ChevronsUpDown size={15} className="shrink-0 text-zinc-400" />
      </button>

      <button className="mt-3 flex items-center gap-2 rounded-xl border border-dashed px-3 py-2.5 text-sm text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
        <Search size={15} />Rechercher
        <kbd className="ml-auto rounded-md bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium dark:bg-zinc-900">⌘K</kbd>
      </button>

      <nav className="mt-5 space-y-1">
        <a href="#" className="flex items-center gap-3 rounded-xl bg-teal-600/10 px-3 py-2.5 text-sm font-medium text-teal-700 dark:text-teal-400">
          <LayoutDashboard size={16} />Vue densemble
        </a>
      </nav>

      <div className="mt-6">
        <button onClick={() => setProjectsOpen((value) => !value)} className="flex w-full items-center justify-between px-2 text-xs font-semibold uppercase text-zinc-400">
          Projets
          <ChevronDown size={14} className={\`transition \${projectsOpen ? '' : '-rotate-90'}\`} />
        </button>
        {projectsOpen && (
          <div className="mt-2 space-y-1">
            {projects.map((project) => (
              <a key={project} href="#" className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900">
                <Hash size={15} className="text-zinc-400" />{project}
              </a>
            ))}
            <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-100 dark:hover:bg-zinc-900">
              <Plus size={15} />Nouveau projet
            </button>
          </div>
        )}
      </div>

      <div className="mt-auto flex items-center gap-3 border-t pt-4">
        <div className="grid size-8 place-items-center rounded-full bg-violet-500 text-xs font-semibold text-white">AM</div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">Amina Mensah</p>
          <p className="truncate text-xs text-zinc-500">Founder</p>
        </div>
      </div>
    </aside>
  );
}`,
    prompt: ''
  },
  {
    slug: 'course-histogram', name: 'Histogramme des courses', category: 'Charts', style: 'SaaS', featured: true, recent: true, responsive: true,
    description: 'Histogramme mobile-first avec barres cliquables et changement detat visuel.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function CourseHistogram() {
  const [active, setActive] = useState('Total');
  const items = [
    { key: 'Aujourd hui', label: 'Auj.', value: 18, color: 'bg-yellow-400' },
    { key: '7 jours', label: '7j', value: 22, color: 'bg-yellow-400' },
    { key: '30 jours', label: '30j', value: 44, color: 'bg-yellow-400' },
    { key: 'Total', label: 'Tout', value: 100, color: 'bg-emerald-500' },
  ];

  return (
    <div className="grid h-64 w-full max-w-md grid-cols-4 gap-1.5 rounded-3xl bg-[#1c1815] p-3 sm:gap-3 sm:p-5">
      <style>{'@keyframes barGrow{from{transform:scaleY(.08)}to{transform:scaleY(1)}}'}</style>
      {items.map((item) => (
        <button key={item.key} aria-label={item.key} onClick={() => setActive(item.key)} className={\`flex min-w-0 flex-col items-center justify-end rounded-2xl px-0.5 pb-3 transition \${active === item.key ? 'bg-white/10' : 'bg-white/[.06] hover:bg-white/10'}\`}>
          <span className={\`w-8 origin-bottom rounded-full sm:w-12 \${item.color} transition-all\`} style={{ height: \`\${Math.max(item.value, 18)}%\`, animation: 'barGrow .65s cubic-bezier(.2,.8,.2,1) both' }} />
          <span className="mt-3 block w-full text-center text-[9px] font-black leading-none text-zinc-200 sm:text-xs">{item.label}</span>
        </button>
      ))}
    </div>
  );
}`,
    prompt: ''
  },
  {
    slug: 'gains-curve', name: 'Courbe des gains', category: 'Charts', style: 'SaaS', featured: true, recent: true, responsive: true,
    description: 'Courbe SVG responsive avec points cliquables et focus dynamique.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function GainsCurve() {
  const [active, setActive] = useState('Total');
  const points = [
    { key: 'Aujourd hui', label: 'J', value: 0, y: 138 },
    { key: '7 jours', label: '7j', value: 0, y: 138 },
    { key: '30 jours', label: '30j', value: 4, y: 92 },
    { key: 'Total', label: 'Tout', value: 13, y: 34 },
  ];

  return (
    <svg viewBox="0 0 390 210" className="h-72 w-full max-w-md overflow-visible">
      <style>{'@keyframes lineDraw{from{stroke-dashoffset:720}to{stroke-dashoffset:0}}@keyframes pointPop{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:scale(1)}}'}</style>
      <path d="M42 24V166H372" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-300 dark:text-zinc-700" />
      <path d="M42 45H372M42 95H372M42 145H372" stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" />
      {['13k','4k','0'].map((label, index) => <text key={label} x="4" y={[42,100,154][index]} className="fill-zinc-500 text-xs font-bold">{label}</text>)}
      <path d="M66 145 H166 M174 184 C220 158 260 151 288 132 M292 196 C334 148 366 118 384 92" fill="none" stroke="#facc15" strokeWidth="6" strokeLinecap="round" strokeDasharray="720" style={{ animation: 'lineDraw 1.1s ease-out both' }} />
      {points.map((point, index) => (
        <g key={point.key} role="button" tabIndex={0} onClick={() => setActive(point.key)} className="origin-center cursor-pointer outline-none transition-all" style={{ animation: 'pointPop .35s ease-out both' }}>
          <circle cx={66 + index * 104} cy={point.y + 7} r={active === point.key ? 10 : 8} fill="#facc15" stroke="#18181b" strokeWidth="3" />
          <text x={56 + index * 104} y="190" className="fill-zinc-500 text-xs font-bold">{point.label}</text>
        </g>
      ))}
    </svg>
  );
}`,
    prompt: ''
  },
  {
    slug: 'acceptance-donut', name: 'Diagramme acceptees / refusees', category: 'Charts', style: 'SaaS', featured: true, recent: true, responsive: true,
    description: 'Donut segmente avec taux ajustable par slider.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function AcceptanceDonut() {
  const [rate, setRate] = useState(56);
  const acceptedTicks = Math.round((rate / 100) * 56);

  return (
    <div className="grid w-full max-w-md place-items-center gap-5" data-acceptance-donut>
      <style>{'@keyframes tickIn{from{opacity:0;scale:1 .1}to{opacity:1;scale:1 1}}'}</style>
      <div className="relative size-56">
        {Array.from({ length: 56 }).map((_, index) => (
          <span key={index} data-acceptance-tick={index} className={\`absolute left-1/2 top-1/2 h-10 w-2 origin-[50%_120px] rounded-full \${index < acceptedTicks ? 'bg-yellow-400' : 'bg-red-600'}\`} style={{ transform: \`translate(-50%,-120px) rotate(\${index * 6.43}deg)\`, animation: 'tickIn .32s ease-out both' }} />
        ))}
        <div className="absolute inset-12 grid place-items-center rounded-full border bg-[var(--background)] text-center">
          <p data-rate-text className="text-4xl font-black">{rate}%</p>
        </div>
      </div>
      <input aria-label="Ajuster le taux" type="range" min="20" max="90" value={rate} onChange={(event) => setRate(Number(event.target.value))} className="w-56 accent-yellow-400" />
    </div>
  );
}`,
    prompt: ''
  },
  {
    slug: 'progress-rings', name: 'Anneaux de progression', category: 'Charts', style: 'SaaS', featured: true, recent: true, responsive: true,
    description: 'Graphique en anneaux concentriques avec focus cliquable et animation de trace.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function ProgressRings() {
  const [active, setActive] = useState(1);
  const rings = [
    { label: 'Vues', value: 72, color: '#14b8a6', radius: 88 },
    { label: 'Copies', value: 54, color: '#facc15', radius: 66 },
    { label: 'Retours', value: 38, color: '#ef4444', radius: 44 },
  ];

  return (
    <svg viewBox="0 0 220 220" className="h-72 w-full max-w-sm overflow-visible">
      <style>{'@keyframes ringDraw{from{stroke-dashoffset:560}to{stroke-dashoffset:var(--offset)}}'}</style>
      {rings.map((item, index) => {
        const circumference = 2 * Math.PI * item.radius;
        const offset = circumference * (1 - item.value / 100);
        return (
          <g key={item.label} role="button" tabIndex={0} onClick={() => setActive(index)} className="cursor-pointer outline-none">
            <circle cx="110" cy="110" r={item.radius} fill="none" stroke="currentColor" strokeWidth={active === index ? 14 : 10} className="text-zinc-200 transition-all dark:text-zinc-800" />
            <circle cx="110" cy="110" r={item.radius} fill="none" stroke={item.color} strokeWidth={active === index ? 14 : 10} strokeLinecap="round" strokeDasharray={circumference} transform="rotate(-90 110 110)" style={{ '--offset': String(offset), strokeDashoffset: offset, animation: 'ringDraw .9s ease-out both' }} />
          </g>
        );
      })}
      <text x="110" y="103" textAnchor="middle" className="fill-zinc-950 text-3xl font-black dark:fill-white">{rings[active].value}%</text>
      <text x="110" y="128" textAnchor="middle" className="fill-zinc-500 text-[10px] font-black uppercase">{rings[active].label}</text>
    </svg>
  );
}`,
    prompt: ''
  },
  {
    slug: 'animated-area-chart', name: 'Courbe en aire animee', category: 'Charts', style: 'SaaS', featured: true, recent: true, responsive: true,
    description: 'Graphique en aire responsive avec ligne animee et points interactifs.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function AnimatedAreaChart() {
  const [active, setActive] = useState(3);
  const points = [
    { label: 'Lun', x: 34, y: 134 },
    { label: 'Mar', x: 88, y: 112 },
    { label: 'Mer', x: 142, y: 124 },
    { label: 'Jeu', x: 196, y: 72 },
    { label: 'Ven', x: 250, y: 92 },
    { label: 'Sam', x: 304, y: 46 },
  ];

  return (
    <svg viewBox="0 0 360 220" className="h-72 w-full max-w-md overflow-visible">
      <style>{'@keyframes areaFade{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}@keyframes lineDraw{from{stroke-dashoffset:620}to{stroke-dashoffset:0}}'}</style>
      <defs><linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#14b8a6" stopOpacity=".45" /><stop offset="100%" stopColor="#14b8a6" stopOpacity=".04" /></linearGradient></defs>
      <path d="M34 28V178H330" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-300 dark:text-zinc-700" />
      <path d="M34 58H330M34 98H330M34 138H330" stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" />
      <path d="M34 134 C64 120 70 114 88 112 C112 110 122 130 142 124 C170 114 176 78 196 72 C220 64 232 101 250 92 C276 80 284 56 304 46 L304 178 L34 178Z" fill="url(#areaFill)" style={{ animation: 'areaFade .8s ease-out both' }} />
      <path d="M34 134 C64 120 70 114 88 112 C112 110 122 130 142 124 C170 114 176 78 196 72 C220 64 232 101 250 92 C276 80 284 56 304 46" fill="none" stroke="#14b8a6" strokeWidth="5" strokeLinecap="round" strokeDasharray="620" style={{ animation: 'lineDraw 1.1s ease-out both' }} />
      {points.map((point, index) => (
        <g key={index} role="button" tabIndex={0} onClick={() => setActive(index)} className="cursor-pointer outline-none">
          <circle cx={point.x} cy={point.y} r={active === index ? 8 : 5} fill={active === index ? '#facc15' : '#14b8a6'} stroke="#18181b" strokeWidth="2" />
          <text x={point.x} y="200" textAnchor="middle" className="fill-zinc-500 text-[10px] font-bold">{point.label}</text>
        </g>
      ))}
    </svg>
  );
}`,
    prompt: ''
  },
  {
    slug: 'signal-bars', name: 'Barres de signal', category: 'Charts', style: 'Minimal', recent: true, responsive: true,
    description: 'Barres verticales pulseees pour visualiser une activite en temps reel.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function SignalBars() {
  const values = [34, 58, 42, 76, 50, 92, 64, 84, 46, 70, 96, 60];

  return (
    <div className="flex h-72 w-full max-w-md items-end justify-center gap-2 px-3">
      <style>{'@keyframes signalRise{0%,100%{transform:scaleY(.72);opacity:.65}50%{transform:scaleY(1);opacity:1}}'}</style>
      {values.map((height, index) => (
        <span key={index} className="w-full max-w-6 origin-bottom rounded-t-full bg-zinc-950 shadow-sm dark:bg-white" style={{ height: height + '%', animation: \`signalRise \${900 + index * 35}ms \${index * 80}ms ease-in-out infinite\` }} />
      ))}
    </div>
  );
}`,
    prompt: ''
  },
  {
    slug: 'conversion-funnel', name: 'Funnel conversion', category: 'Charts', style: 'SaaS', featured: true, recent: true, responsive: true,
    description: 'Funnel horizontal anime pour comparer les etapes de conversion.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function ConversionFunnel() {
  const [active, setActive] = useState(0);
  const steps = [
    { label: 'Vues', value: 100, color: 'bg-teal-500' },
    { label: 'Clics', value: 74, color: 'bg-yellow-400' },
    { label: 'Copies', value: 52, color: 'bg-violet-500' },
    { label: 'Retours', value: 31, color: 'bg-rose-500' },
  ];

  return (
    <div className="grid w-full max-w-md gap-3">
      <style>{'@keyframes widthIn{from{width:0}to{width:var(--target)}}'}</style>
      {steps.map((item, index) => (
        <button key={item.label} onClick={() => setActive(index)} className="group grid grid-cols-[3.25rem_minmax(0,1fr)_2.75rem] items-center gap-2 text-left sm:grid-cols-[4rem_minmax(0,1fr)_3rem] sm:gap-3">
          <span className="truncate text-[10px] font-black text-zinc-500 sm:text-xs">{item.label}</span>
          <span className="h-9 rounded-full bg-zinc-100 p-1 dark:bg-zinc-800">
            <span className={'block h-full rounded-full transition-all group-hover:brightness-105 ' + item.color} style={{ '--target': item.value + '%', width: item.value + '%', animation: 'widthIn .7s ease-out both', opacity: active === index ? 1 : .72 }} />
          </span>
          <span className="text-right text-[10px] font-black sm:text-xs">{item.value}%</span>
        </button>
      ))}
    </div>
  );
}`,
    prompt: ''
  },
  {
    slug: 'gradient-metric-card', name: 'Gradient Metric Card', category: 'Cards', style: 'Gradient', featured: true, recent: true, responsive: true,
    description: 'Carte metrique avec bordure degradee animee et mini bar chart pulse.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function GradientMetricCard() {
  const bars = [42, 70, 52, 88, 64, 96, 76];

  return (
    <article className="w-full max-w-sm overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0f766e,#7c3aed,#f59e0b)] p-px shadow-2xl shadow-teal-900/15" style={{ backgroundSize: '220% 220%', animation: 'gradientFlow 5s ease infinite' }}>
      <style>{'@keyframes gradientFlow{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}@keyframes barPulse{0%,100%{transform:scaleY(.65)}50%{transform:scaleY(1)}}'}</style>
      <div className="rounded-[1.45rem] bg-zinc-950 p-5 text-white">
        <p className="text-xs font-semibold text-teal-100">Croissance</p>
        <div className="mt-3 flex items-end justify-between gap-3">
          <strong className="text-4xl tracking-tight">+42%</strong>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold text-amber-200">live</span>
        </div>
        <div className="mt-7 flex h-24 items-end gap-1.5 rounded-2xl bg-white/[.03] p-2">
          {bars.map((height, index) => <span key={index} className="block flex-1 origin-bottom rounded-t-lg shadow-[0_0_18px_rgba(20,184,166,.28)]" style={{ height: height + '%', minHeight: 18, background: 'linear-gradient(180deg,#fde047 0%,#2dd4bf 100%)', animation: \`barPulse \${1100 + index * 80}ms \${index * 90}ms ease-in-out infinite\` }} />)}
        </div>
      </div>
    </article>
  );
}`,
    prompt: ''
  },
  {
    slug: 'gradient-segmented-tabs', name: 'Gradient Segmented Tabs', category: 'Buttons', style: 'Gradient', recent: true, responsive: true,
    description: 'Controle segmente avec onglet actif en degrade et contenu qui change au clic.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function GradientSegmentedTabs() {
  const [active, setActive] = useState('Design');
  const copy = {
    Design: 'Ajuste la direction visuelle.',
    Code: 'Prepare un composant propre.',
    Ship: 'Passe au build plus vite.',
  };

  return (
    <div className="w-full max-w-md rounded-3xl border bg-white p-3 shadow-sm dark:bg-zinc-950" data-gradient-tabs>
      <div className="grid grid-cols-3 gap-2 rounded-2xl bg-zinc-100 p-1.5 dark:bg-zinc-900">
        {['Design', 'Code', 'Ship'].map((item) => (
          <button key={item} data-gradient-tab={item} onClick={() => setActive(item)} className={active === item ? 'rounded-xl bg-gradient-to-r from-teal-500 via-sky-500 to-violet-500 px-3 py-2.5 text-xs font-black text-white shadow-lg shadow-sky-900/15' : 'rounded-xl px-3 py-2.5 text-xs font-black text-zinc-500 transition hover:text-zinc-950 dark:hover:text-white'}>
            {item}
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-2xl bg-gradient-to-br from-teal-500/15 via-sky-500/10 to-violet-500/15 p-5">
        <p className="text-xs font-semibold text-zinc-500">Mode actif</p>
        <p data-gradient-title className="mt-2 text-3xl font-black tracking-tight">{active}</p>
        <p data-gradient-desc className="mt-2 text-sm text-zinc-500">{copy[active]}</p>
      </div>
    </div>
  );
}`,
    prompt: ''
  },
  {
    slug: 'gradient-progress-slider', name: 'Gradient Progress Slider', category: 'Forms', style: 'Gradient', featured: true, recent: true, responsive: true,
    description: 'Barre de progression degradee avec slider pour voir le changement en direct.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function GradientProgressSlider() {
  const [progress, setProgress] = useState(68);

  return (
    <div className="grid w-full max-w-md gap-5 rounded-3xl border bg-white p-6 shadow-sm dark:bg-zinc-950" data-gradient-progress>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase text-zinc-500">Progression</p>
          <p data-progress-value className="mt-1 text-3xl font-black">{progress}%</p>
        </div>
        <span className="rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 px-3 py-1 text-xs font-black text-white">sync</span>
      </div>
      <div className="h-5 rounded-full bg-zinc-100 p-1 dark:bg-zinc-800">
        <div data-progress-fill className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-500 to-violet-500 transition-all duration-300" style={{ width: progress + '%' }} />
      </div>
      <input aria-label="Ajuster la progression" type="range" min="10" max="100" value={progress} onChange={(event) => setProgress(Number(event.target.value))} className="w-full accent-sky-500" />
    </div>
  );
}`,
    prompt: ''
  },
  {
    slug: 'pulse-loader', name: 'Pulse Loader', category: 'Loader', style: 'Minimal', recent: true, responsive: true,
    description: 'Loader compact avec trois points animes et libelle court.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function PulseLoader(){return <div className="flex w-fit items-center gap-3 rounded-full border bg-white px-5 py-4 shadow-sm dark:bg-zinc-950"><style>{'@keyframes pulseDot{0%,80%,100%{transform:scale(.65);opacity:.45}40%{transform:scale(1);opacity:1}}'}</style>{[0,1,2].map(index=><span key={index} className="size-4 rounded-full bg-teal-500" style={{animation:\`pulseDot 1.1s \${index*160}ms ease-in-out infinite\`}}/>)}<span className="ml-2 text-sm font-semibold text-zinc-500">Chargement</span></div>}`,
    prompt: ''
  },
  {
    slug: 'orbit-loader', name: 'Orbit Loader', category: 'Loader', style: 'SaaS', featured: true, recent: true, responsive: true,
    description: 'Loader orbital avec anneau rotatif, point lumineux et etat sync.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function OrbitLoader(){return <div className="relative size-32 rounded-full border border-zinc-200 dark:border-zinc-800"><style>{'@keyframes orbitSpin{to{transform:rotate(360deg)}}@keyframes orbitGlow{0%,100%{opacity:.45}50%{opacity:1}}'}</style><span className="absolute inset-3 rounded-full border border-dashed border-teal-500/40" style={{animation:'orbitSpin 2.2s linear infinite'}}/><span className="absolute left-1/2 top-0 size-5 -translate-x-1/2 rounded-full bg-teal-400 shadow-[0_0_24px_rgba(45,212,191,.8)]" style={{animation:'orbitGlow 1.2s ease-in-out infinite'}}/><span className="absolute inset-0 grid place-items-center text-xs font-black uppercase text-zinc-500">sync</span></div>}`,
    prompt: ''
  },
  {
    slug: 'dock-menu', name: 'Dock Menu', category: 'Menu', style: 'Minimal', recent: true, responsive: true,
    description: 'Menu dock horizontal avec onglet actif et interactions simples.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function DockMenu(){const [active,setActive]=useState('Build');return <div className="flex flex-wrap items-center justify-center gap-2 rounded-3xl border bg-white p-3 shadow-sm dark:bg-zinc-950">{['Plan','Build','Review','Ship'].map(item=><button key={item} onClick={()=>setActive(item)} className={active===item?'rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-bold text-white shadow-lg dark:bg-white dark:text-zinc-950':'rounded-2xl px-4 py-3 text-sm font-bold text-zinc-500 transition hover:bg-zinc-100 dark:hover:bg-zinc-900'}>{item}</button>)}</div>}`,
    prompt: ''
  },
  {
    slug: 'spotlight-button', name: 'Spotlight Button', category: 'Buttons', style: 'Dark', recent: true, responsive: true,
    description: 'Bouton sombre avec balayage lumineux au survol.', technologies: ['React','TypeScript','Tailwind','Lucide'],
    code: `import { ArrowUpRight } from 'lucide-react';

export function SpotlightButton(){return <button className="group relative overflow-hidden rounded-2xl bg-zinc-950 px-7 py-4 text-sm font-black text-white shadow-2xl shadow-black/15"><span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition duration-700 group-hover:translate-x-full"/><span className="relative inline-flex items-center gap-2">Generer <ArrowUpRight size={16}/></span></button>}`,
    prompt: ''
  },
  {
    slug: 'studio-hero', name: 'Studio Hero', category: 'Hero', style: 'SaaS', featured: true, recent: true, responsive: true,
    description: 'Hero produit sobre avec panneau de blocs UI et CTA principal.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function StudioHero(){return <section className="overflow-hidden rounded-3xl border bg-white p-6 shadow-sm dark:bg-zinc-950"><div className="grid gap-6 md:grid-cols-[1fr_.8fr] md:items-center"><div><span className="text-xs font-black uppercase text-teal-600">PromptUI Studio</span><h1 className="mt-3 text-3xl font-semibold tracking-tight">Compose des interfaces plus vite.</h1><p className="mt-3 text-sm leading-6 text-zinc-500">Choisis un bloc, teste le rendu responsive puis copie le code propre.</p><button className="mt-5 rounded-xl bg-zinc-950 px-4 py-3 text-xs font-bold text-white dark:bg-white dark:text-zinc-950">Explorer</button></div><div className="rounded-3xl bg-gradient-to-br from-teal-400/20 via-sky-400/15 to-violet-500/20 p-4"><div className="grid gap-3">{['Hero','Board','Loader'].map(label=><div key={label} className="rounded-2xl border bg-white/80 p-4 text-sm font-bold shadow-sm dark:bg-zinc-900/80">{label}</div>)}</div></div></div></section>}`,
    prompt: ''
  },
  {
    slug: 'sprint-board', name: 'Sprint Board', category: 'Boards', style: 'SaaS', featured: true, recent: true, responsive: true,
    description: 'Board de sprint avec colonnes cliquables et focus visuel.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function SprintBoard(){const [active,setActive]=useState('Review');return <div className="grid gap-3 rounded-3xl border bg-zinc-50 p-4 dark:bg-zinc-950 md:grid-cols-3">{['Todo','Review','Done'].map((column,index)=><section key={column} onClick={()=>setActive(column)} className={(active===column?'ring-2 ring-teal-500 ':'')+'rounded-2xl border bg-white p-3 transition dark:bg-zinc-900'}><div className="flex items-center justify-between"><h3 className="text-xs font-black uppercase text-zinc-500">{column}</h3><span className="rounded-full bg-zinc-100 px-2 py-1 text-[10px] dark:bg-zinc-800">{index+2}</span></div><div className="mt-3 space-y-2">{['UI pass','Copy update','QA'].slice(0,index+1).map(card=><div key={card} className="rounded-xl border bg-white p-3 text-xs font-semibold shadow-sm dark:bg-zinc-950">{card}</div>)}</div></section>)}</div>}`,
    prompt: ''
  },
  {
    slug: 'neon-toggle', name: 'Neon Toggle', category: 'Toggle', style: 'Dark', featured: true, recent: true, responsive: true,
    description: 'Switch neon avec glow cyan et animation de knob.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function NeonToggle(){const [on,setOn]=useState(true);return <button onClick={()=>setOn(!on)} className={(on?'border-cyan-300 bg-cyan-400/20 shadow-[0_0_28px_rgba(34,211,238,.55)]':'border-zinc-700 bg-zinc-950')+' relative h-12 w-24 rounded-full border p-1 transition'}><span className={(on?'translate-x-12 bg-cyan-300 shadow-[0_0_22px_rgba(103,232,249,.9)]':'bg-zinc-600')+' block size-10 rounded-full transition'}/></button>}`,
    prompt: ''
  },
  {
    slug: 'glass-toggle', name: 'Glass Toggle', category: 'Toggle', style: 'Glass', recent: true, responsive: true,
    description: 'Toggle glassmorphism avec capsule translucide et etat textuel.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function GlassToggle(){const [on,setOn]=useState(false);return <button onClick={()=>setOn(!on)} className={(on?'justify-end':'justify-start')+' flex h-14 w-28 items-center rounded-2xl border border-white/25 bg-white/20 p-1.5 shadow-xl backdrop-blur transition dark:bg-white/10'}><span className={(on?'bg-white text-teal-700':'bg-zinc-900 text-white')+' grid size-11 place-items-center rounded-xl text-xs font-black transition'}>{on?'ON':'OFF'}</span></button>}`,
    prompt: ''
  },
  {
    slug: 'soft-toggle', name: 'Soft Toggle', category: 'Toggle', style: 'Minimal', recent: true, responsive: true,
    description: 'Switch doux avec effet neumorphism leger et libelle yes/no.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function SoftToggle(){const [on,setOn]=useState(true);return <button onClick={()=>setOn(!on)} className="relative h-14 w-28 rounded-full bg-zinc-100 p-1 shadow-inner dark:bg-zinc-800"><span className={(on?'left-14':'left-1')+' absolute top-1 size-12 rounded-full bg-white shadow-lg transition dark:bg-zinc-950'}/><span className={(on?'left-0 text-teal-600':'left-14 text-zinc-400')+' absolute inset-y-0 grid w-14 place-items-center text-xs font-black transition'}>{on?'YES':'NO'}</span></button>}`,
    prompt: ''
  },
  {
    slug: 'power-toggle', name: 'Power Toggle', category: 'Toggle', style: 'Dark', featured: true, recent: true, responsive: true,
    description: 'Bouton power circulaire avec glow vert quand il est actif.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function PowerToggle(){const [on,setOn]=useState(false);return <button onClick={()=>setOn(!on)} className={(on?'border-emerald-300 bg-emerald-400 text-zinc-950 shadow-[0_0_28px_rgba(52,211,153,.65)]':'border-zinc-700 bg-zinc-950 text-zinc-500')+' grid size-20 place-items-center rounded-full border text-sm font-black transition'}>Power</button>}`,
    prompt: ''
  },
  {
    slug: 'privacy-toggle', name: 'Privacy Toggle', category: 'Toggle', style: 'SaaS', recent: true, responsive: true,
    description: 'Switch privacy public/private avec icone et libelle clair.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function PrivacyToggle(){const [on,setOn]=useState(true);return <button onClick={()=>setOn(!on)} className={(on?'bg-zinc-950 text-white':'bg-white dark:bg-zinc-950')+' flex w-44 items-center justify-between rounded-2xl border p-2 transition'}><span className="pl-2 text-xs font-black">{on?'Private':'Public'}</span><span className={(on?'bg-teal-400 text-zinc-950':'bg-zinc-100 text-zinc-500 dark:bg-zinc-800')+' grid size-10 place-items-center rounded-xl text-xs font-black'}>{on?'Lock':'Web'}</span></button>}`,
    prompt: ''
  },
  {
    slug: 'sound-toggle', name: 'Sound Toggle', category: 'Toggle', style: 'Minimal', recent: true, responsive: true,
    description: 'Toggle audio avec pastille coloree et texte dynamique.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function SoundToggle(){const [on,setOn]=useState(false);return <button onClick={()=>setOn(!on)} className="flex items-center gap-3 rounded-full border bg-white px-4 py-3 shadow-sm dark:bg-zinc-950"><span className={(on?'bg-violet-500 text-white':'bg-zinc-100 text-zinc-500 dark:bg-zinc-800')+' grid size-10 place-items-center rounded-full'}>{on?'♪':'x'}</span><span className="text-sm font-black">{on?'Sound on':'Muted'}</span></button>}`,
    prompt: ''
  },
  {
    slug: 'battery-toggle', name: 'Battery Toggle', category: 'Toggle', style: 'SaaS', recent: true, responsive: true,
    description: 'Toggle batterie avec niveau visuel full/low.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function BatteryToggle(){const [on,setOn]=useState(true);return <button onClick={()=>setOn(!on)} className="flex items-center gap-2 rounded-2xl border bg-white p-3 shadow-sm dark:bg-zinc-950"><span className="relative h-8 w-16 rounded-lg border-2 border-zinc-800 p-1 dark:border-white"><span className={(on?'w-full bg-emerald-400':'w-1/3 bg-rose-500')+' block h-full rounded'}/></span><span className="h-4 w-1 rounded-r bg-zinc-800 dark:bg-white"/><span className="ml-2 text-xs font-black">{on?'Full':'Low'}</span></button>}`,
    prompt: ''
  },
  {
    slug: 'rocket-toggle', name: 'Rocket Toggle', category: 'Toggle', style: 'Gradient', featured: true, recent: true, responsive: true,
    description: 'Switch boost en degrade avec knob fleche anime.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function RocketToggle(){const [on,setOn]=useState(false);return <button onClick={()=>setOn(!on)} className={(on?'bg-gradient-to-r from-orange-400 to-fuchsia-500':'bg-zinc-950')+' relative h-16 w-36 overflow-hidden rounded-full border transition'}><span className={(on?'left-20 rotate-45':'left-2')+' absolute top-2 grid size-12 place-items-center rounded-full bg-white text-lg transition'}>↗</span><span className="absolute inset-y-0 left-5 flex items-center text-xs font-black text-white">{on?'BOOST':''}</span></button>}`,
    prompt: ''
  },
  {
    slug: 'check-toggle', name: 'Check Toggle', category: 'Toggle', style: 'Minimal', recent: true, responsive: true,
    description: 'Toggle simple avec check et croix, ideal pour reglages rapides.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function CheckToggle(){const [on,setOn]=useState(true);return <button onClick={()=>setOn(!on)} className={(on?'bg-emerald-500':'bg-zinc-200 dark:bg-zinc-800')+' flex h-12 w-24 items-center rounded-xl border p-1 transition'}><span className={(on?'translate-x-12 text-emerald-600':'text-zinc-500')+' grid size-10 place-items-center rounded-lg bg-white text-sm font-black transition'}>{on?'✓':'x'}</span></button>}`,
    prompt: ''
  },
  {
    slug: 'theme-toggle-card', name: 'Theme Toggle Card', category: 'Toggle', style: 'SaaS', featured: true, recent: true, responsive: true,
    description: 'Carte toggle pour basculer entre light et dark avec indicateur.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function ThemeToggleCard(){const [dark,setDark]=useState(false);return <button onClick={()=>setDark(!dark)} className={(dark?'bg-zinc-950 text-white':'bg-white dark:bg-zinc-950')+' w-full max-w-xs rounded-3xl border p-5 text-left transition'}><div className="flex items-center justify-between"><span className="text-sm font-black">{dark?'Dark mode':'Light mode'}</span><span className="text-2xl">{dark?'☾':'☀'}</span></div><div className="mt-5 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800"><div className={(dark?'w-full bg-violet-400':'w-1/2 bg-amber-400')+' h-full rounded-full transition'}/></div></button>}`,
    prompt: ''
  },
  {
    slug: 'segmented-toggle', name: 'Segmented Toggle', category: 'Toggle', style: 'SaaS', recent: true, responsive: true,
    description: 'Toggle segmente Basic/Pro pour pricing ou modes produit.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function SegmentedToggle(){const [pro,setPro]=useState(true);return <div className="grid max-w-sm grid-cols-2 rounded-2xl border bg-zinc-100 p-1 dark:bg-zinc-900"><button onClick={()=>setPro(false)} className={!pro?'rounded-xl bg-white px-5 py-3 text-sm font-black shadow-sm dark:bg-zinc-950':'rounded-xl px-5 py-3 text-sm font-black text-zinc-500'}>Basic</button><button onClick={()=>setPro(true)} className={pro?'rounded-xl bg-zinc-950 px-5 py-3 text-sm font-black text-white shadow-sm dark:bg-white dark:text-zinc-950':'rounded-xl px-5 py-3 text-sm font-black text-zinc-500'}>Pro</button></div>}`,
    prompt: ''
  },
  {
    slug: 'pixel-toggle', name: 'Pixel Toggle', category: 'Toggle', style: 'Editorial', recent: true, responsive: true,
    description: 'Switch pixel art avec bord dur et ombre marquee.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function PixelToggle(){const [on,setOn]=useState(false);return <button onClick={()=>setOn(!on)} className={(on?'':'opacity-80')+' relative h-14 w-28 border-4 border-zinc-950 bg-white p-1 shadow-[6px_6px_0_#18181b] dark:border-white dark:bg-zinc-950'}><span className={(on?'translate-x-12':'')+' block h-full w-12 bg-zinc-950 transition dark:bg-white'}/></button>}`,
    prompt: ''
  },
  {
    slug: 'holographic-card', name: 'Holographic Card', category: 'Cards', style: 'Gradient', featured: true, recent: true, responsive: true,
    description: 'Carte premium avec fond holographique anime et identite forte.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function HolographicCard(){return <article className="relative max-w-sm overflow-hidden rounded-3xl border bg-zinc-950 p-5 text-white shadow-2xl"><style>{'@keyframes holoShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}'}</style><div className="absolute inset-0 opacity-60" style={{background:'linear-gradient(120deg,rgba(20,184,166,.45),rgba(124,58,237,.35),rgba(250,204,21,.35))',backgroundSize:'220% 220%',animation:'holoShift 4s ease infinite'}}/><div className="relative"><span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase">Holo</span><h3 className="mt-16 text-2xl font-black">Aurora Pass</h3><p className="mt-2 text-xs text-white/70">Premium component access</p><div className="mt-7 flex items-end justify-between"><span className="font-mono text-xs">PX-2048</span><span className="text-3xl font-black">P</span></div></div></article>}`,
    prompt: ''
  },
  {
    slug: 'neumorphic-profile-card', name: 'Neumorphic Profile Card', category: 'Cards', style: 'Minimal', recent: true, responsive: true,
    description: 'Carte profil douce avec relief neumorphism et statistiques compactes.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function NeumorphicProfileCard(){return <article className="max-w-sm rounded-[2rem] bg-[#eef0f4] p-6 text-zinc-800 shadow-[12px_12px_28px_#c9ccd3,-12px_-12px_28px_#ffffff]"><div className="mx-auto grid size-20 place-items-center rounded-full bg-[#eef0f4] text-2xl font-black shadow-[inset_6px_6px_12px_#c9ccd3,inset_-6px_-6px_12px_#ffffff]">AM</div><h3 className="mt-5 text-center text-xl font-black">Amina Studio</h3><p className="mt-1 text-center text-xs font-semibold text-zinc-500">Interface designer</p><div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs"><span className="rounded-2xl bg-[#eef0f4] p-3 shadow-[6px_6px_12px_#c9ccd3,-6px_-6px_12px_#ffffff]">42 UI</span><span className="rounded-2xl bg-[#eef0f4] p-3 shadow-[6px_6px_12px_#c9ccd3,-6px_-6px_12px_#ffffff]">18k</span><span className="rounded-2xl bg-[#eef0f4] p-3 shadow-[6px_6px_12px_#c9ccd3,-6px_-6px_12px_#ffffff]">Pro</span></div></article>}`,
    prompt: ''
  },
  {
    slug: 'cyber-stats-card', name: 'Cyber Stats Card', category: 'Cards', style: 'Dark', featured: true, recent: true, responsive: true,
    description: 'Carte stats sombre avec glow cyber et jauges de performance.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function CyberStatsCard(){return <article className="max-w-sm rounded-3xl border border-teal-400/40 bg-[#071311] p-5 text-teal-100 shadow-[0_0_32px_rgba(20,184,166,.18)]"><div className="flex items-center justify-between"><span className="font-mono text-xs uppercase text-teal-300">node status</span><span className="size-3 rounded-full bg-teal-300 shadow-[0_0_16px_rgba(94,234,212,.9)]"/></div><p className="mt-6 font-mono text-5xl font-black">98.7%</p><div className="mt-6 grid gap-2">{[74,86,52].map((value,index)=><div key={index} className="h-2 rounded-full bg-teal-950"><div className="h-full rounded-full bg-teal-300" style={{width:value+'%'}}/></div>)}</div><p className="mt-5 text-xs text-teal-500">Realtime edge health monitor.</p></article>}`,
    prompt: ''
  },
  {
    slug: 'glass-product-card', name: 'Glass Product Card', category: 'Cards', style: 'Glass', recent: true, responsive: true,
    description: 'Carte produit glassmorphism avec visuel degrade et prix compact.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function GlassProductCard(){return <article className="max-w-sm rounded-3xl border border-white/30 bg-white/35 p-5 shadow-2xl backdrop-blur dark:bg-white/10"><div className="aspect-square rounded-3xl bg-gradient-to-br from-teal-300 via-sky-300 to-violet-400 p-4"><div className="grid h-full place-items-center rounded-2xl bg-white/30 text-5xl font-black text-white">P</div></div><div className="mt-5 flex items-start justify-between gap-3"><div><h3 className="font-black">PromptUI Kit</h3><p className="mt-1 text-xs text-zinc-500">Glass component pack</p></div><span className="rounded-full bg-zinc-950 px-3 py-1 text-xs font-black text-white">$29</span></div></article>}`,
    prompt: ''
  },
  {
    slug: 'flip-info-card', name: 'Flip Info Card', category: 'Cards', style: 'SaaS', featured: true, recent: true, responsive: true,
    description: 'Carte cliquable qui bascule entre overview et details.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function FlipInfoCard(){const [open,setOpen]=useState(false);return <button onClick={()=>setOpen(!open)} className={(open?'bg-zinc-950 text-white rotate-1':'bg-white dark:bg-zinc-950')+' h-56 w-80 max-w-full rounded-3xl border p-6 text-left shadow-sm transition duration-500'}><span className="text-xs font-black uppercase text-teal-500">{open?'Details':'Overview'}</span><h3 className="mt-8 text-3xl font-black">{open?'Copy ready':'Design card'}</h3><p className="mt-3 text-sm text-zinc-500">{open?'Includes responsive states, hover polish and accessible labels.':'Click the card to reveal the secondary side.'}</p></button>}`,
    prompt: ''
  },
  {
    slug: 'stacked-layers-card', name: 'Stacked Layers Card', category: 'Cards', style: 'Editorial', recent: true, responsive: true,
    description: 'Carte a couches decalees pour une presentation visuelle plus marquee.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function StackedLayersCard(){return <div className="relative h-56 w-80 max-w-full"><div className="absolute inset-0 rotate-6 rounded-3xl bg-violet-400/40"/><div className="absolute inset-0 -rotate-3 rounded-3xl bg-teal-400/50"/><article className="absolute inset-0 rounded-3xl border bg-white p-6 shadow-xl dark:bg-zinc-950"><span className="text-xs font-black uppercase text-teal-600">Layers</span><h3 className="mt-16 text-3xl font-black">Stacked UI</h3><p className="mt-2 text-sm text-zinc-500">Depth effect without heavy decoration.</p></article></div>}`,
    prompt: ''
  },
  {
    slug: 'terminal-card', name: 'Terminal Card', category: 'Cards', style: 'Dark', recent: true, responsive: true,
    description: 'Carte style terminal pour presenter du code ou un etat technique.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function TerminalCard(){return <article className="max-w-md overflow-hidden rounded-3xl border bg-[#10100e] text-zinc-100 shadow-2xl"><div className="flex h-9 items-center gap-1.5 border-b border-white/10 px-4"><span className="size-2.5 rounded-full bg-red-400"/><span className="size-2.5 rounded-full bg-amber-400"/><span className="size-2.5 rounded-full bg-emerald-400"/><span className="ml-3 text-xs text-zinc-500">promptui/card.tsx</span></div><div className="p-5 font-mono text-xs leading-6"><p><span className="text-teal-300">const</span> card = <span className="text-amber-300">"ready"</span></p><p className="text-zinc-500">// copy, adapt, ship</p><p><span className="text-violet-300">render</span>(card)</p></div></article>}`,
    prompt: ''
  },
  {
    slug: 'noise-gradient-card', name: 'Noise Gradient Card', category: 'Cards', style: 'Gradient', recent: true, responsive: true,
    description: 'Carte degradee avec texture subtile pour mise en avant.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function NoiseGradientCard(){return <article className="relative max-w-sm overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 via-violet-600 to-sky-500 p-6 text-white shadow-2xl"><div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,.25)_1px,transparent_0)] bg-size-[18px_18px] opacity-30"/><div className="relative"><span className="rounded-full bg-white/20 px-3 py-1 text-xs font-black">New</span><h3 className="mt-20 text-3xl font-black">Gradient Core</h3><p className="mt-2 text-sm text-white/75">A vibrant card for featured content.</p></div></article>}`,
    prompt: ''
  },
  {
    slug: 'gradient-checkbox', name: 'Gradient Checkbox', category: 'Checkboxes', style: 'Gradient', featured: true, recent: true, responsive: true,
    description: 'Checkbox coloree avec coche visible et etat actif lisible.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function GradientCheckbox(){const [checked,setChecked]=useState(true);return <button type="button" onClick={()=>setChecked(!checked)} className="flex items-center gap-4 rounded-3xl border bg-white p-4 shadow-sm dark:bg-zinc-950"><span className={(checked?'border-transparent bg-gradient-to-br from-teal-400 via-sky-500 to-violet-500 text-white shadow-lg shadow-sky-500/25':'border-zinc-300 bg-transparent text-transparent dark:border-zinc-700')+' grid size-10 place-items-center rounded-2xl border transition'}>✓</span><span className="text-left"><span className="block text-sm font-black">Gradient accept</span><span className="text-xs text-zinc-500">{checked?'Selection active':'Click to select'}</span></span></button>}`,
    prompt: ''
  },
  {
    slug: 'neumorphic-checkbox', name: 'Neumorphic Checkbox', category: 'Checkboxes', style: 'Minimal', recent: true, responsive: true,
    description: 'Checkbox doux avec relief neumorphism et pression visuelle.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function NeumorphicCheckbox(){const [checked,setChecked]=useState(false);return <button type="button" onClick={()=>setChecked(!checked)} className="flex items-center gap-4 rounded-[2rem] bg-[#eef0f4] p-5 text-zinc-800 shadow-[10px_10px_24px_#c9ccd3,-10px_-10px_24px_#ffffff]"><span className={(checked?'text-teal-600 shadow-[inset_6px_6px_12px_#c9ccd3,inset_-6px_-6px_12px_#ffffff]':'text-transparent shadow-[6px_6px_12px_#c9ccd3,-6px_-6px_12px_#ffffff]')+' grid size-12 place-items-center rounded-2xl bg-[#eef0f4] transition'}>✓</span><span className="text-sm font-black">{checked?'Done':'Soft check'}</span></button>}`,
    prompt: ''
  },
  {
    slug: 'cyber-checkbox', name: 'Cyber Checkbox', category: 'Checkboxes', style: 'Dark', featured: true, recent: true, responsive: true,
    description: 'Checkbox sombre avec glow cyber et etat security.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function CyberCheckbox(){const [checked,setChecked]=useState(true);return <button type="button" onClick={()=>setChecked(!checked)} className={(checked?'border-teal-300 text-teal-200 shadow-[0_0_30px_rgba(45,212,191,.25)]':'border-zinc-800 text-zinc-500')+' flex items-center gap-4 rounded-2xl border bg-[#071311] p-4 font-mono text-xs uppercase transition'}><span className={(checked?'border-teal-300 bg-teal-300/15':'border-zinc-700')+' relative grid size-8 place-items-center border'}><span className={(checked?'bg-teal-300 shadow-[0_0_18px_rgba(94,234,212,.9)]':'bg-transparent')+' size-3 transition'}/></span>Security enabled</button>}`,
    prompt: ''
  },
  {
    slug: 'task-list-checkbox', name: 'Task List Checkbox', category: 'Checkboxes', style: 'SaaS', featured: true, recent: true, responsive: true,
    description: 'Checklist dynamique avec compteur et lignes cochees.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function TaskListCheckbox(){const [items,setItems]=useState({brief:true,design:true,ship:false});const entries=[['brief','Brief produit'],['design','Design system'],['ship','Mise en ligne']] as const;const done=entries.filter(([key])=>items[key]).length;return <div className="max-w-sm rounded-3xl border bg-white p-4 shadow-sm dark:bg-zinc-950"><div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-black">Launch checklist</h3><span className="text-xs text-zinc-500">{done}/3</span></div>{entries.map(([key,label])=><button key={key} type="button" onClick={()=>setItems({...items,[key]:!items[key]})} className="flex w-full items-center gap-3 rounded-2xl px-2 py-2 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900"><span className={(items[key]?'border-teal-500 bg-teal-500 text-white':'border-zinc-300 bg-transparent text-transparent dark:border-zinc-700')+' grid size-6 place-items-center rounded-lg border'}>✓</span><span className={(items[key]?'text-zinc-400 line-through':'text-zinc-900 dark:text-zinc-100')+' text-sm font-semibold'}>{label}</span></button>)}</div>}`,
    prompt: ''
  },
  {
    slug: 'pill-checkbox', name: 'Pill Checkbox', category: 'Checkboxes', style: 'SaaS', recent: true, responsive: true,
    description: 'Checkbox sous forme de pill pour filtres et plans.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function PillCheckbox(){const [checked,setChecked]=useState(false);return <button type="button" onClick={()=>setChecked(!checked)} className={(checked?'border-violet-500 bg-violet-500 text-white shadow-lg shadow-violet-500/25':'bg-white text-zinc-500 dark:bg-zinc-950')+' rounded-full border px-5 py-3 text-sm font-black transition'}>{checked?'Selected':'Select plan'}</button>}`,
    prompt: ''
  },
  {
    slug: 'card-checkbox', name: 'Card Checkbox', category: 'Checkboxes', style: 'SaaS', featured: true, recent: true, responsive: true,
    description: 'Carte selectionnable avec checkbox integree et barre de progression.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function CardCheckbox(){const [checked,setChecked]=useState(true);return <button type="button" onClick={()=>setChecked(!checked)} className={(checked?'border-teal-500 bg-teal-500/10 ring-4 ring-teal-500/10':'bg-white dark:bg-zinc-950')+' w-80 max-w-full rounded-3xl border p-5 text-left transition'}><div className="flex items-start justify-between"><div><p className="text-sm font-black">Team workspace</p><p className="mt-1 text-xs text-zinc-500">Invite, review and ship components.</p></div><span className={(checked?'border-teal-500 bg-teal-500 text-white':'border-zinc-300 text-transparent')+' grid size-7 place-items-center rounded-full border'}>✓</span></div><div className="mt-5 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className={(checked?'w-4/5':'w-1/3')+' h-full rounded-full bg-teal-500 transition-all'}/></div></button>}`,
    prompt: ''
  },
  {
    slug: 'ripple-checkbox', name: 'Ripple Checkbox', category: 'Checkboxes', style: 'Minimal', recent: true, responsive: true,
    description: 'Checkbox circulaire avec effet ripple concentrique.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function RippleCheckbox(){const [checked,setChecked]=useState(false);return <button type="button" onClick={()=>setChecked(!checked)} className="group relative grid size-24 place-items-center rounded-full"><span className={(checked?'scale-100 bg-sky-500/15':'scale-50 bg-zinc-200/60 dark:bg-zinc-800')+' absolute inset-0 rounded-full transition'}/><span className={(checked?'scale-100 bg-sky-500/20':'scale-75 bg-zinc-100 dark:bg-zinc-900')+' absolute inset-3 rounded-full transition'}/><span className={(checked?'border-sky-500 bg-sky-500 text-white':'border-zinc-300 bg-white text-transparent dark:bg-zinc-950 dark:border-zinc-700')+' relative grid size-11 place-items-center rounded-full border transition'}>✓</span></button>}`,
    prompt: ''
  },
  {
    slug: 'consent-checkbox', name: 'Consent Checkbox', category: 'Checkboxes', style: 'Minimal', recent: true, responsive: true,
    description: 'Checkbox de consentement clair pour formulaires et onboarding.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function ConsentCheckbox(){const [checked,setChecked]=useState(false);return <button type="button" onClick={()=>setChecked(!checked)} className="flex w-full max-w-md items-start gap-3 rounded-3xl border bg-white p-5 text-left shadow-sm dark:bg-zinc-950"><span className={(checked?'border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950':'border-zinc-300 text-transparent dark:border-zinc-700')+' mt-0.5 grid size-7 shrink-0 place-items-center rounded-xl border'}>✓</span><span><span className="block text-sm font-black">J accepte les conditions</span><span className="mt-1 block text-xs leading-5 text-zinc-500">{checked?'Merci, preference enregistree.':'Selection requise avant de continuer.'}</span></span></button>}`,
    prompt: ''
  },
  {
    slug: 'tilt-pricing-card', name: 'Tilt Pricing Card', category: 'Cards', style: 'SaaS', featured: true, recent: true, responsive: true,
    description: 'Carte pricing interactive avec switch mensuel annuel et effet tilt au hover.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function TiltPricingCard(){const [yearly,setYearly]=useState(false);return <button type="button" onClick={()=>setYearly(!yearly)} className={(yearly?'bg-zinc-950 text-white':'bg-white dark:bg-zinc-950')+' group w-80 max-w-full rounded-3xl border p-6 text-left shadow-xl transition duration-500 hover:-translate-y-2 hover:rotate-1'}><span className="rounded-full bg-teal-500/15 px-3 py-1 text-xs font-black text-teal-500">{yearly?'Yearly':'Monthly'}</span><h3 className="mt-8 text-4xl font-black">{yearly?'$190':'$19'}</h3><p className="mt-2 text-sm text-zinc-500">Click to switch billing mode.</p><div className="mt-6 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className={(yearly?'w-full':'w-2/3')+' h-full rounded-full bg-teal-500 transition-all'}/></div></button>}`,
    prompt: ''
  },
  {
    slug: 'credit-wallet-card', name: 'Credit Wallet Card', category: 'Cards', style: 'Dark', featured: true, recent: true, responsive: true,
    description: 'Carte bancaire sombre avec halo radial et reflet anime.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function CreditWalletCard(){return <article className="relative h-52 w-80 max-w-full overflow-hidden rounded-3xl bg-zinc-950 p-6 text-white shadow-2xl"><style>{'@keyframes cardShine{0%{transform:translateX(-120%) rotate(18deg)}100%{transform:translateX(220%) rotate(18deg)}}'}</style><div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(45,212,191,.45),transparent_32%),radial-gradient(circle_at_90%_80%,rgba(168,85,247,.38),transparent_34%)]"/><span className="absolute inset-y-0 left-0 w-16 bg-white/15 blur-xl" style={{animation:'cardShine 3.2s ease-in-out infinite'}}/><div className="relative flex h-full flex-col justify-between"><div className="flex items-center justify-between"><span className="text-xs font-black uppercase text-white/70">Prompt Bank</span><span className="grid size-10 place-items-center rounded-full bg-white text-sm font-black text-zinc-950">P</span></div><p className="font-mono text-lg tracking-widest">4820 1184 2048</p><div className="flex justify-between text-xs text-white/60"><span>A. Mensah</span><span>09/29</span></div></div></article>}`,
    prompt: ''
  },
  {
    slug: 'spotlight-profile-card', name: 'Spotlight Profile Card', category: 'Cards', style: 'Minimal', recent: true, responsive: true,
    description: 'Carte profil avec halo au hover et stats compactes.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function SpotlightProfileCard(){return <article className="group relative max-w-sm overflow-hidden rounded-3xl border bg-white p-6 shadow-sm dark:bg-zinc-950"><div className="absolute -right-12 -top-12 size-36 rounded-full bg-teal-400/20 blur-2xl transition group-hover:scale-150"/><div className="relative"><div className="grid size-16 place-items-center rounded-2xl bg-zinc-950 text-xl font-black text-white dark:bg-white dark:text-zinc-950">JL</div><h3 className="mt-6 text-2xl font-black">Jordan Lee</h3><p className="mt-1 text-sm text-zinc-500">Frontend engineer</p><div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs"><span className="rounded-2xl bg-zinc-100 p-3 dark:bg-zinc-900">128</span><span className="rounded-2xl bg-zinc-100 p-3 dark:bg-zinc-900">42k</span><span className="rounded-2xl bg-zinc-100 p-3 dark:bg-zinc-900">Pro</span></div></div></article>}`,
    prompt: ''
  },
  {
    slug: 'notification-stack-card', name: 'Notification Stack Card', category: 'Cards', style: 'Glass', featured: true, recent: true, responsive: true,
    description: 'Carte empilee cliquable qui change la tension visuelle des alertes.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function NotificationStackCard(){const [active,setActive]=useState(true);return <button type="button" onClick={()=>setActive(!active)} className="relative h-60 w-80 max-w-full text-left"><div className={(active?'rotate-6':'rotate-2')+' absolute inset-x-8 top-0 h-40 rounded-3xl bg-violet-300/40 transition'}/><div className={(active?'-rotate-3':'rotate-3')+' absolute inset-x-4 top-6 h-40 rounded-3xl bg-teal-300/50 transition'}/><article className="absolute inset-x-0 bottom-0 rounded-3xl border bg-white p-5 shadow-xl dark:bg-zinc-950"><span className="text-xs font-black uppercase text-teal-600">{active?'3 alerts':'All clear'}</span><h3 className="mt-4 text-2xl font-black">Notifications</h3><p className="mt-2 text-sm text-zinc-500">{active?'Click to calm the stack.':'Inbox is clean now.'}</p></article></button>}`,
    prompt: ''
  },
  {
    slug: 'expandable-feature-card', name: 'Expandable Feature Card', category: 'Cards', style: 'SaaS', recent: true, responsive: true,
    description: 'Carte feature qui se deploie au clic sans quitter le contexte.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function ExpandableFeatureCard(){const [open,setOpen]=useState(false);return <button type="button" onClick={()=>setOpen(!open)} className="w-full max-w-md overflow-hidden rounded-3xl border bg-white p-5 text-left shadow-sm transition dark:bg-zinc-950"><div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase text-teal-600">Feature</p><h3 className="mt-1 text-xl font-black">Smart preview</h3></div><span className="grid size-10 place-items-center rounded-full bg-zinc-100 text-lg dark:bg-zinc-900">{open?'-':'+'}</span></div><div className={(open?'mt-5 grid-rows-[1fr] opacity-100':'grid-rows-[0fr] opacity-0')+' grid transition-all duration-300'}><p className="overflow-hidden text-sm leading-6 text-zinc-500">Responsive states, live controls and copy-ready code stay in the same component card.</p></div></button>}`,
    prompt: ''
  },
  {
    slug: 'folder-card', name: 'Folder Card', category: 'Cards', style: 'Editorial', recent: true, responsive: true,
    description: 'Carte dossier avec onglet et mouvement subtil au hover.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function FolderCard(){return <article className="group relative w-80 max-w-full pt-8"><div className="absolute left-5 top-0 h-12 w-32 rounded-t-2xl bg-amber-300 transition group-hover:-translate-y-1"/><div className="relative rounded-3xl border bg-amber-200 p-5 shadow-xl transition group-hover:-translate-y-1"><div className="rounded-2xl bg-white/65 p-4"><p className="text-xs font-black uppercase text-amber-700">Assets</p><h3 className="mt-8 text-2xl font-black text-zinc-950">UI Files</h3><p className="mt-2 text-sm text-zinc-600">24 components saved</p></div></div></article>}`,
    prompt: ''
  },
  {
    slug: 'social-reaction-card', name: 'Social Reaction Card', category: 'Cards', style: 'Minimal', recent: true, responsive: true,
    description: 'Carte post sociale avec bouton like interactif.', technologies: ['React','TypeScript','Tailwind'],
    code: `import { useState } from 'react';

export function SocialReactionCard(){const [liked,setLiked]=useState(false);return <article className="max-w-sm rounded-3xl border bg-white p-5 shadow-sm dark:bg-zinc-950"><div className="flex items-center gap-3"><div className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-teal-400 to-violet-500 text-sm font-black text-white">P</div><div><p className="text-sm font-black">PromptUI</p><p className="text-xs text-zinc-500">2 min ago</p></div></div><p className="mt-5 text-sm leading-6 text-zinc-600 dark:text-zinc-300">New animated card component added to the library.</p><button type="button" onClick={()=>setLiked(!liked)} className={(liked?'border-rose-500 bg-rose-500 text-white':'text-zinc-500')+' mt-5 rounded-full border px-4 py-2 text-sm font-black transition'}>{liked?'Liked':'Like'}</button></article>}`,
    prompt: ''
  },
  {
    slug: 'timeline-card', name: 'Timeline Card', category: 'Cards', style: 'SaaS', recent: true, responsive: true,
    description: 'Carte timeline verticale pour etapes de livraison.', technologies: ['React','TypeScript','Tailwind'],
    code: `export function TimelineCard(){return <article className="max-w-sm rounded-3xl border bg-white p-5 shadow-sm dark:bg-zinc-950"><p className="text-xs font-black uppercase text-teal-600">Release flow</p><div className="mt-5 space-y-4">{[['Design','Done'],['Code','Review'],['Ship','Next']].map(([title,status],index)=><div key={title} className="flex gap-3"><span className="mt-1 grid size-7 place-items-center rounded-full bg-zinc-950 text-xs font-black text-white dark:bg-white dark:text-zinc-950">{index+1}</span><div><p className="text-sm font-black">{title}</p><p className="text-xs text-zinc-500">{status}</p></div></div>)}</div></article>}`,
    prompt: ''
  }
].map((item) => ({
  ...item,
  responsiveModes: ['Mobile', 'Tablette', 'Desktop'],
  safetyNotes: ['HTML semantique', 'Focus visible', 'Sans dependance externe', 'Responsive verifie'],
  prompt: item.prompt || makePrompt(item.name, item.category, item.style, item.description),
})) as LibraryComponent[];

export const categories = ['All','Hero','Navbar','Cards','Buttons','Checkboxes','Forms','Pricing','Testimonials','Dashboard','Tables','Boards','Charts','Footer','CTA','Loader','Menu','Toggle','Sidebar'] as const;
export const styles = ['All','Minimal','Gradient','Glass','Dark','Editorial','SaaS'] as const;

export function getComponentBySlug(slug: string) {
  return components.find((item) => item.slug === slug);
}
