import type { Metadata } from 'next';
import './globals.css';
import { fontVariables } from './fonts';
import { SiteLayout } from '@/layouts/SiteLayout';
import { AnalyticsTracker } from '@/components/analytics/AnalyticsTracker';
import { FeedbackWidget } from '@/components/analytics/FeedbackWidget';

// Runs before first paint so a saved (or system) dark theme never flashes light.
const themeScript = `(function(){try{var t=localStorage.getItem('promptui-theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://prompt-ui-steel.vercel.app';

export const metadata: Metadata = {
  title: { default: 'PromptUI - composants UI + prompts IA', template: '%s | PromptUI' },
  metadataBase: new URL(siteUrl),
  description: 'Bibliotheque gratuite de composants React, TypeScript et Tailwind avec code source, apercu responsive et prompts IA.',
  applicationName: 'PromptUI',
  verification: {
    google: 'P7gelZitlDAhkwWzkgYJbC9fxcgnBS5NP3mkH4XcBV0',
  },
  keywords: ['composants React', 'bibliotheque UI', 'Tailwind CSS', 'prompts IA', 'TypeScript'],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'PromptUI - composants UI + prompts IA',
    description: 'Composants React gratuits avec code source, apercu responsive et prompts IA.',
    url: siteUrl,
    siteName: 'PromptUI',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'PromptUI - composants UI + prompts IA',
    description: 'Composants React gratuits avec code source, apercu responsive et prompts IA.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr" data-theme="light" className={fontVariables} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }}/></head><body><AnalyticsTracker/><SiteLayout>{children}</SiteLayout><FeedbackWidget/></body></html>;
}
