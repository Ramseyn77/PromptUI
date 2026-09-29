import Link from 'next/link';
import { ArrowRight, BarChart3, Bot, Code2, Copy, LayoutTemplate, MousePointer2, Search, Sparkles, Wand2 } from 'lucide-react';
import { categories, components, styles } from '@/data/components';
import { ComponentPreview } from '@/components/library/ComponentPreview';
import { RecentComponentSlider } from '@/components/home/RecentComponentSlider';
import { ComponentCard, ComponentGrid } from '@/components/library/ComponentCard';
import type { LibraryComponent } from '@/types/component';

const pickComponents = (slugs: string[]) =>
  slugs
    .map((slug) => components.find((item) => item.slug === slug))
    .filter((item): item is LibraryComponent => Boolean(item));

const categoryCount = (category: string) => components.filter((item) => item.category === category).length;
const categoryHref = (category: string) => `/library?category=${encodeURIComponent(category)}`;

const launcherGroups = [
  { title: 'Marketing blocks', tags: ['Hero', 'CTA', 'Shaders', 'Footer', 'Text', 'Navbar', 'Pricing', 'Testimonials'] },
  { title: 'UI components', tags: ['Buttons', 'Cards', 'AI Chat', 'Boards', 'Charts', 'Menu', 'Toggle', 'Tooltips', 'Checkboxes', 'Forms'] },
];

const buildingGroups = [
  { icon: LayoutTemplate, title: 'Une landing page', text: 'Heroes, CTA, footers et navigations pour lancer vite.', tags: ['Hero', 'CTA', 'Navbar', 'Footer', 'Pricing', 'Testimonials'] },
  { icon: BarChart3, title: 'Un dashboard', text: 'Graphes, tableaux, boards et sidebars lisibles.', tags: ['Dashboard', 'Charts', 'Tables', 'Boards', 'Sidebar'] },
  { icon: MousePointer2, title: 'Des micro-interactions', text: 'Boutons, toggles, menus et tooltips qui réagissent.', tags: ['Buttons', 'Toggle', 'Checkboxes', 'Menu', 'Tooltips'] },
  { icon: Bot, title: 'Une app IA', text: 'Chats, formulaires, loaders et effets de texte.', tags: ['AI Chat', 'Forms', 'Loader', 'Text', 'Cards', 'Shaders'] },
];

export default function HomePage() {
  const categoryList = categories.filter((x) => x !== 'All');
  const styleList = styles.filter((x) => x !== 'All');
  const recentComponents = pickComponents([
    'liquid-metal-upgrade-cta',
    'responsive-banner-cta',
    'image-fan-cta',
    'team-dashboard',
    'dithered-shader-cta',
    'floating-gallery-cta',
  ]);
  const promptReadyComponents = pickComponents([
    'macos-dock',
    'magnetic-dock',
    'expanding-search-dock',
    'holographic-card',
    'pipeline-sankey-chart',
    'gradient-glow-tooltip',
  ]);
  const stats = [
    [components.length.toLocaleString('fr-FR'), 'composants'],
    [categoryList.length.toLocaleString('fr-FR'), 'categories'],
    [styleList.length.toLocaleString('fr-FR'), 'styles'],
    ['100%', 'copiable'],
  ];

  return (
    <main className="overflow-hidden">
      <section className="relative border-b border-[var(--line-soft)]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,var(--accent-soft),transparent_34rem)]"/>
        <div className="hero-scroll-out mx-auto max-w-7xl px-4 pb-16 pt-12 text-center sm:px-6 md:pb-24 md:pt-20">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)]/80 px-3 py-1.5 font-pill text-xs font-bold text-[var(--muted)] shadow-sm backdrop-blur">
            <Sparkles size={13} className="text-[var(--accent)]"/>
            Registry UI avec prompts IA
          </div>

          <h1 className="mx-auto mt-7 max-w-5xl font-display text-5xl font-semibold leading-[.95] tracking-[-0.03em] sm:text-7xl md:text-8xl">
            The living library <span className="mt-1 block font-accent font-bold tracking-normal text-[var(--accent)]">for PromptUI.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">
            Parcours des composants React, teste leur rendu, copie le code ou colle le prompt dans ton agent IA. Chaque composant garde son propre style, clair ou sombre.
          </p>

          <form action="/library" className="mx-auto mt-8 flex max-w-2xl items-center gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-2 text-left shadow-2xl shadow-black/[.06]">
            <Search size={19} className="ml-2 shrink-0 text-[var(--muted)]"/>
            <input name="q" placeholder="Chercher dock, chart, tooltip, CTA..." className="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"/>
            <button className="rounded-xl bg-[var(--foreground)] px-4 py-3 font-ui text-sm font-semibold text-[var(--background)] transition hover:-translate-y-0.5">Search</button>
          </form>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/library" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 font-ui text-sm font-semibold text-[var(--background)] shadow-lg shadow-black/10 transition hover:-translate-y-0.5">
              Browse components <ArrowRight size={16}/>
            </Link>
            <Link href="/components/liquid-metal-upgrade-cta" className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-3 font-ui text-sm font-semibold shadow-sm transition hover:-translate-y-0.5">
              Voir un composant <MousePointer2 size={16}/>
            </Link>
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)]/80 p-4 shadow-sm backdrop-blur">
                <p className="font-numeric text-3xl font-extrabold tracking-tight">{value}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[var(--muted)]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="scroll-mt-20 border-b border-[var(--line-soft)] bg-[var(--surface)]/35">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2">
          {launcherGroups.map((group) => {
            const tags = group.tags.filter((tag) => categoryCount(tag) > 0);
            const total = tags.reduce((sum, tag) => sum + categoryCount(tag), 0);
            return (
              <div key={group.title} className="reveal">
                <div className="flex items-baseline gap-2">
                  <p className="font-numeric text-3xl font-extrabold tracking-tight">{total}</p>
                  <p className="font-hand text-lg font-bold text-[var(--accent)]">{group.title}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link key={tag} href={categoryHref(tag)} className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--background)] px-4 py-2 font-pill text-sm font-medium text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]">
                      {tag}
                      <span className="font-mono text-[10px] opacity-60">{categoryCount(tag)}</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="reveal grid gap-8 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
          <div className="preview-grid overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface-2)] p-5 shadow-2xl shadow-black/[.08]">
            <div className="mb-4 flex items-center justify-between rounded-2xl border border-[var(--line)] bg-[var(--surface)]/80 px-4 py-3 backdrop-blur">
              <span className="font-display text-sm font-semibold text-[var(--foreground)]">Liquid Metal Upgrade CTA</span>
              <span className="rounded-full bg-[var(--foreground)] px-3 py-1 font-mono text-[11px] text-[var(--background)]">preview</span>
            </div>
            <ComponentPreview slug="liquid-metal-upgrade-cta"/>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 font-mono text-xs font-medium text-[var(--muted)]">
              <Copy size={13}/> Prompt + code
            </div>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-5xl">Copy the prompt. Paste it anywhere.</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              Le code sert a shipper maintenant. Le prompt sert a reconstruire le pattern dans Cursor, Codex, Claude, v0 ou Lovable sans perdre l’intention visuelle.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                [Code2, 'Code', 'React + Tailwind pret a adapter.'],
                [Bot, 'Prompt', 'Instructions IA propres et reutilisables.'],
                [Wand2, 'Preview', 'Teste avant de copier.'],
              ].map(([Icon, title, text]: any) => (
                <div key={title} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
                  <div className="grid size-9 place-items-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]"><Icon size={17}/></div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="reveal flex items-end justify-between gap-4">
          <div>
            <p className="font-hand text-lg font-bold text-[var(--accent)]">Nouveaux</p>
            <h2 className="mt-1 font-display text-4xl font-semibold tracking-tight">Des blocs prets a copier.</h2>
          </div>
          <Link href="/library" className="hidden items-center gap-1 font-ui text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--foreground)] sm:flex">Tout voir <ArrowRight size={15}/></Link>
        </div>
        <div className="reveal mt-7">
          <RecentComponentSlider items={recentComponents}/>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="reveal">
          <p className="font-hand text-lg font-bold text-[var(--accent)]">Par usage</p>
          <h2 className="mt-1 font-display text-4xl font-semibold tracking-tight">Que construis-tu ?</h2>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {buildingGroups.map(({ icon: Icon, title, text, tags }) => (
            <div key={title} className="reveal flex flex-col rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 transition hover:border-[var(--accent)]/40">
              <div className="grid size-10 place-items-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]"><Icon size={18}/></div>
              <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{text}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {tags.filter((tag) => categoryCount(tag) > 0).map((tag) => (
                  <Link key={tag} href={categoryHref(tag)} className="rounded-full border border-[var(--line)] px-3 py-1 font-pill text-xs font-medium text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]">
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="reveal flex items-end justify-between gap-4">
          <div>
            <p className="font-hand text-lg font-bold text-[var(--accent)]">Prompt-ready</p>
            <h2 className="mt-1 font-display text-4xl font-semibold tracking-tight">Des interactions qui donnent envie de tester.</h2>
          </div>
          <Link href="/library" className="hidden items-center gap-1 font-ui text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--foreground)] sm:flex">Tout voir <ArrowRight size={15}/></Link>
        </div>
        <div className="mt-7">
          <ComponentGrid className="reveal grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {promptReadyComponents.map((item) => <ComponentCard key={item.slug} item={item}/>)}
          </ComponentGrid>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="reveal overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--inverse)] p-8 text-[var(--on-inverse)] shadow-2xl shadow-black/10 md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="font-hand text-lg font-bold text-[var(--inverse-accent)]">Built by humans. Ready for agents.</p>
              <h2 className="mt-2 max-w-2xl font-display text-4xl font-semibold tracking-tight">Une bibliotheque, plusieurs styles, zero dependance visuelle imposee.</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--inverse-muted)]">PromptUI est un registry : tu copies le composant dans ton projet, tu le possedes, tu l’adaptes.</p>
            </div>
            <Link href="/library" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--on-inverse)] px-5 py-3 font-ui text-sm font-semibold text-[var(--inverse)] transition hover:-translate-y-0.5">
              Browse components <ArrowRight size={16}/>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
