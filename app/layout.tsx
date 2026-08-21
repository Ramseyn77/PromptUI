import type { Metadata } from 'next';
import './globals.css';
import { SiteLayout } from '@/layouts/SiteLayout';
import { AnalyticsTracker } from '@/components/analytics/AnalyticsTracker';
import { FeedbackWidget } from '@/components/analytics/FeedbackWidget';

export const metadata: Metadata = {
  title: { default: 'PromptUI - composants UI + prompts IA', template: '%s | PromptUI' },
  description: 'Une bibliotheque gratuite de composants React avec code source et prompts IA.',
  keywords: ['React components','UI library','Tailwind CSS','AI prompts','TypeScript'],
  openGraph: { title: 'PromptUI', description: 'Composants UI avec code et prompts IA.', type: 'website' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr" suppressHydrationWarning><body><AnalyticsTracker/><SiteLayout>{children}</SiteLayout><FeedbackWidget/></body></html>;
}
