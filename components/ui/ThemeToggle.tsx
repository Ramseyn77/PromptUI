'use client';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem('promptui-theme');
    const isDark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('promptui-theme', next ? 'dark' : 'light');
  };
  return <button onClick={toggle} aria-label="Toggle dark mode" className="grid size-9 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] shadow-sm transition hover:-translate-y-0.5 hover:text-[var(--foreground)]">{dark ? <Sun size={16}/> : <Moon size={16}/>}</button>;
}
