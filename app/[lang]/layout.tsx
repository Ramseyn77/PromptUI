import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import '../globals.css';
import { fontVariables } from '../fonts';
import { SiteLayout } from '@/layouts/SiteLayout';
import { AnalyticsTracker } from '@/components/analytics/AnalyticsTracker';
import { FeedbackWidget } from '@/components/analytics/FeedbackWidget';
import { isLocale, languageAlternates, locales, localizePath } from '@/i18n/config';
import { dictionaries } from '@/i18n/dictionaries';
import { LocaleProvider } from '@/i18n/LocaleProvider';

// Runs before first paint so a saved (or system) dark theme never flashes light.
const themeScript = `(function(){try{var t=localStorage.getItem('promptui-theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://prompt-ui-steel.vercel.app';

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type LangParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = dictionaries[lang].meta;
  return {
    title: { default: t.title, template: '%s | PromptUI' },
    metadataBase: new URL(siteUrl),
    description: t.description,
    applicationName: 'PromptUI',
    verification: {
      google: 'P7gelZitlDAhkwWzkgYJbC9fxcgnBS5NP3mkH4XcBV0',
    },
    keywords: t.keywords,
    alternates: { canonical: localizePath(lang, '/'), ...languageAlternates('/') },
    openGraph: {
      title: t.title,
      description: t.shortDescription,
      url: localizePath(lang, '/'),
      siteName: 'PromptUI',
      locale: t.ogLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: t.title,
      description: t.shortDescription,
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children, params }: LangParams & { children: ReactNode }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang} data-theme="light" data-scroll-behavior="smooth" className={fontVariables} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }}/></head>
      <body>
        <LocaleProvider locale={lang}>
          <AnalyticsTracker/>
          <SiteLayout>{children}</SiteLayout>
          <FeedbackWidget/>
        </LocaleProvider>
      </body>
    </html>
  );
}
