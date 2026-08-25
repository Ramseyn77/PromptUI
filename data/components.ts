import type { LibraryComponent } from '@/types/component';

const makePrompt = (name: string, category: string, style: string, description: string) =>
  `Create a production-ready ${category.toLowerCase()} component named "${name}" using React, TypeScript and Tailwind CSS. Visual direction: ${style.toLowerCase()}, modern developer-tool aesthetic. ${description} Make it responsive from mobile to desktop, accessible with semantic HTML, keyboard-friendly interactions, visible focus states, strong contrast, no external images required, and no unnecessary dependencies. Keep the component self-contained and easy to customize through props.`;

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
    code: `export function RevenueChart(){const bars=[38,52,45,72,64,88,76,94];return <section className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-zinc-950"><div className="flex items-start justify-between"><div><p className="text-sm text-zinc-500">Revenus</p><h3 className="mt-1 text-3xl font-semibold">128.4k euros</h3></div><span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600">+18.2%</span></div><div className="mt-8 flex h-40 items-end gap-2">{bars.map((bar,i)=><div key={i} className="flex flex-1 flex-col items-center gap-2"><span className="w-full rounded-t-xl bg-teal-600/80" style={{height:bar}}/><span className="text-[10px] text-zinc-400">S{i+1}</span></div>)}</div><div className="mt-5 rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-600 dark:bg-zinc-900">Objectif mensuel atteint a 82%.</div></section>}`,
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
  }
].map((item) => ({ ...item, prompt: item.prompt || makePrompt(item.name, item.category, item.style, item.description) })) as LibraryComponent[];

export const categories = ['All','Hero','Navbar','Cards','Buttons','Forms','Pricing','Testimonials','Dashboard','Tables','Boards','Charts','Footer','CTA'] as const;
export const styles = ['All','Minimal','Gradient','Glass','Dark','Editorial','SaaS'] as const;

export function getComponentBySlug(slug: string) {
  return components.find((item) => item.slug === slug);
}
