'use client';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocale } from '@/i18n/LocaleProvider';

export function ThemeToggle() {
  const { t } = useLocale();
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.dataset.theme === 'dark');
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    try { localStorage.setItem('promptui-theme', next ? 'dark' : 'light'); } catch {}
  };
  return <button onClick={toggle} aria-label={dark ? t.theme.toLight : t.theme.toDark} className="grid size-9 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] shadow-sm transition hover:-translate-y-0.5 hover:text-[var(--foreground)]">{dark ? <Sun size={16}/> : <Moon size={16}/>}</button>;
}
