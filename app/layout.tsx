import type { Metadata } from 'next';
import './globals.css';
import { SiteLayout } from '@/layouts/SiteLayout';
import { AnalyticsTracker } from '@/components/analytics/AnalyticsTracker';
import { FeedbackWidget } from '@/components/analytics/FeedbackWidget';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://prompt-ui-steel.vercel.app';

export const metadata: Metadata = {
  title: { default: 'PromptUI - composants UI + prompts IA', template: '%s | PromptUI' },
  metadataBase: new URL(siteUrl),
  description: 'Bibliotheque gratuite de composants React, TypeScript et Tailwind avec code source, apercu responsive et prompts IA.',
  applicationName: 'PromptUI',
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
  return <html lang="fr" suppressHydrationWarning><body><AnalyticsTracker/><SiteLayout>{children}</SiteLayout><FeedbackWidget/></body></html>;
}
