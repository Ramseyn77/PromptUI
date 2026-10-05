'use client';
import { ArrowRight, Code2, GitBranch, Menu, Sparkles, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { SmoothScroll } from '@/components/ui/SmoothScroll';
import { splitLocale } from '@/i18n/config';
import { LanguageSwitcher } from '@/i18n/LanguageSwitcher';
import { useLocale } from '@/i18n/LocaleProvider';

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t, href } = useLocale();
  const isLibrary = splitLocale(pathname).path === '/library';
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <div className={`min-h-screen ${isLibrary ? '' : 'pb-14'}`}>
      {!isLibrary && <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--background)]/82 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--surface)]/72 p-1 text-sm text-[var(--muted)] shadow-sm md:flex font-ui">
            <Link href={href('/library')} className="rounded-full px-4 py-2 transition hover:bg-[var(--hover)] hover:text-[var(--foreground)]">
              {t.nav.library}
            </Link>
            <Link href={`${href('/')}#categories`} className="rounded-full px-4 py-2 transition hover:bg-[var(--hover)] hover:text-[var(--foreground)]">
              {t.nav.categories}
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href={href('/library')}
              className="hidden items-center gap-2 rounded-full bg-[var(--foreground)] px-4 py-2 font-ui text-sm font-semibold text-[var(--background)] shadow-sm transition hover:-translate-y-0.5 sm:inline-flex"
            >
              {t.nav.explore}
            </Link>
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              className="grid size-10 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)] md:hidden"
            >
              {menuOpen ? <X size={18}/> : <Menu size={18}/>}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="mobile-nav" className="border-t border-[var(--line)] px-4 py-3 font-ui md:hidden">
            <Link href={href('/library')} onClick={() => setMenuOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-semibold transition hover:bg-[var(--hover)]">{t.nav.library}</Link>
            <Link href={`${href('/')}#categories`} onClick={() => setMenuOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-semibold transition hover:bg-[var(--hover)]">{t.nav.categories}</Link>
          </nav>
        )}
      </header>}
      <SmoothScroll/>
      <div key={pathname} className="page-enter">{children}</div>
      {/* {!isLibrary && <footer className="fixed inset-x-0 bottom-0 z-40 h-14 border-t border-white/10 bg-zinc-950 text-white">
        <div className="flex h-full items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="hidden items-center gap-1.5 text-xs font-semibold text-teal-200 sm:inline-flex">
              <Sparkles size={13}/> PromptUI
            </span>
            <span className="truncate text-xs text-zinc-500 sm:text-sm">© 2026 PromptUI. Composants UI gratuits pour développeurs.</span>
          </div>
          <div className="flex shrink-0 items-center gap-3 text-zinc-500">
            <Link href="/library" className="hidden items-center gap-1 text-xs font-semibold text-white/80 transition hover:text-white sm:inline-flex">
              Explorer <ArrowRight size={14}/>
            </Link>
            <a href="https://example.com" aria-label="Source" className="transition hover:text-white"><GitBranch size={17}/></a>
            <a href="https://example.com" aria-label="Code" className="transition hover:text-white"><Code2 size={17}/></a>
          </div>
        </div>
      </footer>} */}
    </div>
  );
}
