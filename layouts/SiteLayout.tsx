import { BookOpen, Code2 } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--background)]/82 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--surface)]/72 p-1 text-sm text-[var(--muted)] shadow-sm md:flex">
            <Link href="/library" className="rounded-full px-4 py-2 transition hover:bg-black/[.04] hover:text-[var(--foreground)] dark:hover:bg-white/[.07]">
              Bibliotheque
            </Link>
            <a href="/#categories" className="rounded-full px-4 py-2 transition hover:bg-black/[.04] hover:text-[var(--foreground)] dark:hover:bg-white/[.07]">
              Categories
            </a>
            <a href="https://example.com" aria-label="Documentation" className="grid size-9 place-items-center rounded-full transition hover:bg-black/[.04] hover:text-[var(--foreground)] dark:hover:bg-white/[.07]">
              <BookOpen size={17} />
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/library"
              className="hidden items-center gap-2 rounded-full bg-[var(--foreground)] px-4 py-2 text-sm font-semibold text-[var(--background)] shadow-sm transition hover:-translate-y-0.5 sm:inline-flex"
            >
              Explorer
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>
      {children}
      <footer className="border-t border-[var(--line)] bg-[var(--surface)]/48">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-4 py-8 text-sm text-[var(--muted)] sm:px-6 md:flex-row md:items-center">
          <span>© 2026 PromptUI. Composants UI gratuits pour developpeurs.</span>
          <div className="flex items-center gap-4">
            <span>Concu pour valider vite, sans complexite.</span>
            <a href="https://example.com" aria-label="Source" className="transition hover:text-[var(--foreground)]">
              <Code2 size={17} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
