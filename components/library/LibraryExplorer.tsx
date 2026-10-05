'use client';
import Link from 'next/link';
import {
  ArrowUpRight,
  Bell,
  ChevronRight,
  Clock3,
  FolderKanban,
  Layers3,
  Megaphone,
  MousePointer2,
  PanelBottom,
  PanelTop,
  Search,
  Sparkles,
  Square,
  Star,
  Table2,
  ToggleLeft,
  Users,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { categories, components, localizedDescription, styles } from '@/data/components';
import { LanguageSwitcher } from '@/i18n/LanguageSwitcher';
import type { LibraryComponent } from '@/types/component';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { ComponentCard, ComponentGrid } from './ComponentCard';
import { useLocale } from '@/i18n/LocaleProvider';

type Collection = 'all' | 'newest' | 'popular';

const mixComponents = (items: LibraryComponent[]) => {
  const groups = new Map<string, LibraryComponent[]>();

  items.forEach((item) => {
    const group = groups.get(item.category) ?? [];
    group.push(item);
    groups.set(item.category, group);
  });

  const mixed: LibraryComponent[] = [];
  const orderedGroups = [...groups.values()];
  let index = 0;

  while (mixed.length < items.length) {
    orderedGroups.forEach((group) => {
      if (group[index]) mixed.push(group[index]);
    });
    index += 1;
  }

  return mixed;
};

const recentFirst = (items: LibraryComponent[]) => {
  const recent = items.filter((item) => item.recent).slice(-10).reverse();
  const recentSlugs = new Set(recent.map((item) => item.slug));
  const rest = mixComponents(items.filter((item) => !recentSlugs.has(item.slug)));
  return [...recent, ...rest];
};

// Section titles come from the dictionary at render time (newest, popular, category titles).
const sectionDefinitions: Array<{ type?: 'newest' | 'popular'; category?: LibraryComponent['category'] }> = [
  { type: 'newest' },
  { type: 'popular' },
];

const sidebarCategories = categories.filter((item) => item !== 'All');
const librarySections: Array<{ type?: 'newest' | 'popular'; category?: LibraryComponent['category'] }> = [
  ...sectionDefinitions,
  ...sidebarCategories.map((category) => ({ category })),
];
const categoryIcons: Partial<Record<LibraryComponent['category'], typeof Layers3>> = {
  Hero: PanelTop,
  Navbar: PanelTop,
  Cards: Square,
  Buttons: MousePointer2,
  Checkboxes: Square,
  'AI Chat': Sparkles,
  Forms: Table2,
  Pricing: Star,
  Testimonials: Users,
  Dashboard: Layers3,
  Tables: Table2,
  Boards: FolderKanban,
  Charts: Layers3,
  Shaders: Sparkles,
  Footer: PanelBottom,
  CTA: Megaphone,
  Loader: Clock3,
  Menu: PanelBottom,
  Toggle: ToggleLeft,
  Tooltips: Bell,
  Text: Layers3,
  Sidebar: PanelBottom,
};

function ComponentRow({
  title,
  items,
  onViewAll,
}: {
  title: string;
  items: LibraryComponent[];
  onViewAll: () => void;
}) {
  const { t } = useLocale();
  if (!items.length) return null;

  return (
    <section className="py-6">
      <div className="mb-4 flex items-end justify-between gap-4 px-4 md:px-6">
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight md:text-2xl">{title}</h2>
        </div>
        <button type="button" onClick={onViewAll} className="inline-flex items-center gap-1 font-ui text-sm font-medium text-[var(--muted)] transition hover:text-[var(--accent)]">
          {t.common.viewAll} <ChevronRight size={16}/>
        </button>
      </div>
      <div className="no-scrollbar flex snap-x overflow-x-auto border-y-[0.5px] border-[var(--line-soft)]">
        {items.slice(0, 8).map((item) => (
          <ComponentCard key={item.slug} item={item} className="w-[82vw] shrink-0 snap-start border-r-[0.5px] border-[var(--line-soft)] sm:w-[320px]"/>
        ))}
      </div>
    </section>
  );
}

export function LibraryExplorer({ initialQuery = '', initialCategory = 'All' }: { initialQuery?: string; initialCategory?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<(typeof categories)[number]>((categories.includes(initialCategory as any) ? initialCategory : 'All') as (typeof categories)[number]);
  const [style, setStyle] = useState<(typeof styles)[number]>('All');
  const [collection, setCollection] = useState<Collection>('all');
  const [mobileCatsOpen, setMobileCatsOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const { t, locale } = useLocale();
  // Search the description in the language the visitor reads.
  const searchText = (item: LibraryComponent) => `${item.name} ${localizedDescription(item, locale)} ${item.category} ${item.style} ${item.technologies.join(' ')}`.toLowerCase();
  const sectionTitle = (section: (typeof librarySections)[number]) =>
    section.type === 'newest' ? t.library.newest
      : section.type === 'popular' ? t.library.popular
      : (section.category && t.library.categoryTitles[section.category]) || section.category || '';

  const counts = useMemo(() => new Map(sidebarCategories.map((cat) => [cat, components.filter((item) => item.category === cat).length])), []);
  const filtered = useMemo(() => components.filter((item) => {
    const text = searchText(item);
    const matchesCollection = collection === 'all' || (collection === 'newest' && item.recent) || (collection === 'popular' && item.featured);
    return text.includes(query.toLowerCase()) && (category === 'All' || item.category === category) && (style === 'All' || item.style === style) && matchesCollection;
  }), [query, category, style, collection, locale]);
  const mixed = useMemo(() => recentFirst(filtered), [filtered]);
  const browsing = !query && category === 'All' && style === 'All' && collection === 'all';

  const browseSource = useMemo(() => recentFirst(components.filter((item) => {
    const text = searchText(item);
    return text.includes(query.toLowerCase()) && (style === 'All' || item.style === style);
  })), [query, style, locale]);

  const sections = useMemo(() => librarySections.map((section) => {
    if (section.type === 'newest') return { title: sectionTitle(section), items: browseSource.filter((item) => item.recent), onViewAll: () => { setCollection('newest'); setCategory('All'); } };
    if (section.type === 'popular') return { title: sectionTitle(section), items: browseSource.filter((item) => item.featured), onViewAll: () => { setCollection('popular'); setCategory('All'); } };
    return { title: sectionTitle(section), items: browseSource.filter((item) => item.category === section.category), onViewAll: () => { setCollection('all'); setCategory(section.category ?? 'All'); } };
  }).filter((section) => section.items.length), [browseSource, t]);

  const heading = collection === 'newest' ? t.library.newest : collection === 'popular' ? t.library.popular : category === 'All' ? t.library.library : category;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;
      event.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const resetFilters = () => {
    setQuery('');
    setCategory('All');
    setStyle('All');
    setCollection('all');
  };

  const navButton = (active: boolean) =>
    `flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold transition ${
      active ? 'bg-[var(--foreground)] text-[var(--background)]' : 'text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]'
    }`;

  const categoryButton = (active: boolean) =>
    `flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${
      active ? 'bg-[var(--accent)] text-[var(--on-accent)]' : 'text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]'
    }`;

  return (
    <div className="min-h-screen bg-[var(--background)] lg:pl-[248px]">
      <aside className="border-b border-[var(--line)] bg-[var(--surface)] lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:flex lg:h-dvh lg:w-[248px] lg:flex-col lg:overflow-hidden lg:border-b-0 lg:border-r">
        <div className="flex shrink-0 items-center justify-between gap-3 px-4 py-4">
          <Logo />
          <ThemeToggle />
        </div>

        <div className="px-3 pb-6 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
          <label className="flex h-10 items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--background)] px-3 text-[var(--muted)]">
            <Search size={16}/>
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.library.searchPlaceholder}
              className="min-w-0 flex-1 bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
            />
            {query ? (
              <button type="button" onClick={() => setQuery('')} aria-label={t.library.clearSearch}><X size={14}/></button>
            ) : (
              <kbd className="rounded-md border border-[var(--line)] px-1.5 py-0.5 text-[10px] font-semibold">/</kbd>
            )}
          </label>

          <nav className="mt-4 space-y-0.5">
            <button type="button" onClick={resetFilters} className={navButton(browsing)}>
              <Sparkles size={16}/> {t.common.all}
            </button>
            <button type="button" onClick={() => { setCollection('newest'); setCategory('All'); }} className={navButton(collection === 'newest')}>
              <Clock3 size={16}/> {t.library.newest}
            </button>
            <button type="button" onClick={() => { setCollection('popular'); setCategory('All'); }} className={navButton(collection === 'popular')}>
              <Star size={16}/> {t.library.popular}
            </button>
          </nav>

          <div className="mt-6">
            <div className="flex items-center justify-between px-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{t.library.categories}</p>
              <button type="button" onClick={() => setMobileCatsOpen((value) => !value)} aria-expanded={mobileCatsOpen} aria-controls="library-categories" className="text-xs font-semibold text-[var(--accent)] lg:hidden">
                {mobileCatsOpen ? t.library.hide : t.library.show}
              </button>
            </div>
            <div id="library-categories" className={`mt-2 space-y-0.5 ${mobileCatsOpen ? 'block' : 'hidden lg:block'}`}>
              {sidebarCategories.map((cat) => {
                const Icon = categoryIcons[cat] ?? Layers3;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => { setCollection('all'); setCategory(cat); setMobileCatsOpen(false); }}
                    className={categoryButton(category === cat)}
                  >
                    <span className="inline-flex min-w-0 items-center gap-3">
                      <Icon size={15} className="shrink-0"/>
                      <span className="truncate">{cat}</span>
                    </span>
                    <span className={`font-mono text-[10px] ${category === cat ? 'text-[var(--on-accent)]/80' : 'text-[var(--muted)]'}`}>{counts.get(cat) ?? 0}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 px-1">
            <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{t.library.style}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {styles.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setStyle(item)}
                  className={`rounded-full px-3 py-1.5 font-pill text-xs font-medium transition ${
                    style === item
                      ? 'bg-[var(--foreground)] text-[var(--background)]'
                      : 'border border-[var(--line)] text-[var(--muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {item === 'All' ? t.common.all : item}
                </button>
              ))}
            </div>
            {(query || category !== 'All' || style !== 'All' || collection !== 'all') && (
              <button type="button" onClick={resetFilters} className="mt-3 px-2 text-xs font-semibold text-[var(--accent)]">
                {t.common.reset}
              </button>
            )}
          </div>
        </div>
      </aside>

      <section className="min-w-0">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-4 border-b border-[var(--line)] bg-[var(--background)]/88 px-4 backdrop-blur md:px-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">{t.library.explorer}</p>
            <h1 className="font-display text-base font-semibold tracking-tight">{heading}</h1>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-sm text-[var(--muted)]">{t.library.count(filtered.length)}</p>
            <LanguageSwitcher />
          </div>
        </header>

        {filtered.length ? (
          browsing ? (
            <div className="pb-12 pt-2">
              {sections.map((section) => (
                <ComponentRow key={section.title} title={section.title} items={section.items} onViewAll={section.onViewAll}/>
              ))}
            </div>
          ) : (
            <section className="p-4 md:p-8">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <h2 className="font-display text-lg font-semibold tracking-tight">{t.library.results}</h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">{t.library.found(filtered.length)}</p>
                </div>
                <button type="button" onClick={resetFilters} className="rounded-full border border-[var(--line)] px-3 py-1.5 text-xs font-semibold text-[var(--muted)] transition hover:text-[var(--foreground)]">
                  {t.common.clear}
                </button>
              </div>
              <ComponentGrid className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {mixed.map((item) => <ComponentCard key={item.slug} item={item}/>)}
              </ComponentGrid>
            </section>
          )
        ) : (
          <div className="grid min-h-[60vh] place-items-center p-6 text-center">
            <div>
              <Star className="mx-auto text-[var(--muted)]" size={32}/>
              <p className="mt-4 font-black">{t.library.emptyTitle}</p>
              <p className="mt-2 text-sm text-[var(--muted)]">{t.library.emptyText}</p>
              <button type="button" onClick={resetFilters} className="mt-5 rounded-full bg-[var(--foreground)] px-4 py-2 text-sm font-semibold text-[var(--background)]">
                {t.common.reset}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
