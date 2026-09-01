import Link from 'next/link';
import { ArrowRight, Bot, Braces, Code2, Layers3, MousePointer2, Search, Sparkles, Zap } from 'lucide-react';
import { categories, components } from '@/data/components';
import { ComponentCard } from '@/components/library/ComponentCard';
import { ComponentPreview } from '@/components/library/ComponentPreview';

export default function HomePage() {
  const featured = components.filter((x) => x.featured).slice(0, 6);
  const categoryList = categories.filter((x) => x !== 'All');
  const stats = [
    ['24', 'composants'],
    ['7', 'styles'],
    ['0', 'compte requis'],
  ];

  return (
    <main>
      <section className="relative overflow-hidden border-b border-[var(--line)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(460px,.82fr)] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)]/80 px-3 py-1.5 text-xs font-medium text-[var(--muted)] shadow-sm backdrop-blur">
              <Sparkles size={13} className="text-[var(--accent)]"/>
              Source, apercu et prompt IA au meme endroit
            </div>
            <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[.95] tracking-tight sm:text-6xl md:text-7xl">
              Des composants UI qui donnent deja envie de les copier.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">
              PromptUI rassemble des patterns React propres. Choisis un composant, teste son rendu responsive, copie le code ou recupere le prompt IA pour le modifier.
            </p>
            <form action="/library" className="mt-8 flex max-w-2xl items-center gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-2 shadow-xl shadow-black/[.04]">
              <Search size={19} className="ml-2 text-[var(--muted)]"/>
              <input name="q" placeholder="Chercher hero, navbar, pricing..." className="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"/>
              <button className="rounded-xl bg-[var(--foreground)] px-4 py-3 text-sm font-semibold text-[var(--background)] transition hover:-translate-y-0.5">Chercher</button>
            </form>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/library" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-800/15 transition hover:-translate-y-0.5 dark:text-zinc-950">
                Voir la bibliotheque <ArrowRight size={16}/>
              </Link>
              <Link href="/components/aurora-hero" className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5">
                Voir un composant
              </Link>
            </div>
            <div className="mt-10 grid max-w-lg grid-cols-3 border-y border-[var(--line)] py-5">
              {stats.map(([value, label]) => (
                <div key={label}>
                  <p className="text-3xl font-semibold tracking-tight">{value}</p>
                  <p className="mt-1 text-xs uppercase text-[var(--muted)]">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-5 -top-5 hidden rounded-full bg-[var(--gold)] px-4 py-2 text-xs font-semibold text-zinc-950 shadow-xl shadow-black/10 lg:block">
              MVP library
            </div>
            <div className="overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-3 shadow-2xl shadow-black/[.08]">
              <div className="flex items-center justify-between border-b border-[var(--line)] px-2 pb-3">
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-red-400"/>
                  <span className="size-2.5 rounded-full bg-amber-400"/>
                  <span className="size-2.5 rounded-full bg-emerald-400"/>
                </div>
                <span className="text-xs text-[var(--muted)]">components/aurora-hero.tsx</span>
              </div>
              <div className="preview-grid mt-3 rounded-2xl bg-[#f1eee5] p-5 dark:bg-black/20">
                <ComponentPreview slug="activity-dashboard" compact/>
              </div>
              <div className="grid gap-3 pt-3 sm:grid-cols-3">
                {[
                  [Braces, 'TypeScript'],
                  [Layers3, 'Composable'],
                  [Zap, 'Copie rapide'],
                ].map(([Icon, label]: any) => (
                  <div key={label} className="rounded-xl border border-[var(--line)] bg-[var(--background)] px-3 py-3 text-xs font-medium text-[var(--muted)]">
                    <Icon size={15} className="mb-2 text-[var(--accent)]"/>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            [Code2, 'Copier du code pret a l emploi', 'Des composants TypeScript et Tailwind propres, pensés pour de vrais projets.'],
            [Bot, 'Garder l intention design', 'Chaque composant inclut un prompt pour recreer ou modifier le meme pattern avec IA.'],
            [Zap, 'Passer vite de l idee au build', 'Apercus rapides, filtres utiles et copie en un clic gardent le flux leger.'],
          ].map(([Icon, title, desc]: any) => (
            <div key={title} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
              <div className="grid size-10 place-items-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]"><Icon size={19}/></div>
              <h2 className="mt-5 font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm md:p-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--accent)]"><MousePointer2 size={16}/>Comment utiliser PromptUI</div>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              ['1', 'Parcourir', 'Filtre par categorie : boards, tables, charts, dashboard.'],
              ['2', 'Tester', 'Verifie mobile, tablette, desktop et theme sombre.'],
              ['3', 'Copier', 'Recupere le code React/Tailwind ou le prompt IA.'],
              ['4', 'Adapter', 'Colle dans ton projet puis ajuste le contenu et les props.'],
            ].map(([step, title, text]) => (
              <div key={step} className="rounded-2xl border border-[var(--line)] bg-[var(--background)] p-4">
                <span className="grid size-8 place-items-center rounded-full bg-[var(--foreground)] text-xs font-semibold text-[var(--background)]">{step}</span>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[var(--accent)]">Explorer par categorie</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Trouver le bon pattern.</h2>
          </div>
          <Link href="/library" className="hidden items-center gap-1 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)] sm:flex">Tout voir <ArrowRight size={15}/></Link>
        </div>
        <div className="mt-7 flex flex-wrap gap-2">
          {categoryList.map((cat) => (
            <Link href={`/library?category=${encodeURIComponent(cat)}`} key={cat} className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]">{cat}</Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[var(--accent)]">Populaires</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Bons points de depart.</h2>
          </div>
          <Link href="/library" className="inline-flex items-center gap-1 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]">Tout voir <ArrowRight size={15}/></Link>
        </div>
        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((item) => <ComponentCard key={item.slug} item={item}/>)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[#151512] px-6 py-12 text-white shadow-2xl shadow-black/10 md:px-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-sm text-teal-200">24 composants inclus dans le MVP</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">Previsualiser. Copier. Prompter. Livrer.</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-400">Pas de compte, pas de paiement, pas de labyrinthe de configuration. PromptUI reste simple pour valider l idee avec des developpeurs.</p>
            </div>
            <Link href="/library" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:-translate-y-0.5">Explorer PromptUI <ArrowRight size={16}/></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
