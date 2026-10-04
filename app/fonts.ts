import localFont from 'next/font/local';

// Fontshare fonts (ITF Free Font License), self-hosted from app/fonts.
const satoshi = localFont({
  variable: '--font-satoshi',
  display: 'swap',
  src: [
    { path: './fonts/satoshi-400.woff2', weight: '400' },
    { path: './fonts/satoshi-500.woff2', weight: '500' },
    { path: './fonts/satoshi-700.woff2', weight: '700' },
    { path: './fonts/satoshi-900.woff2', weight: '900' },
  ],
});

const chillax = localFont({
  variable: '--font-chillax',
  display: 'swap',
  src: [
    { path: './fonts/chillax-500.woff2', weight: '500' },
    { path: './fonts/chillax-600.woff2', weight: '600' },
    { path: './fonts/chillax-700.woff2', weight: '700' },
  ],
});

const telma = localFont({
  variable: '--font-telma',
  display: 'swap',
  src: [
    { path: './fonts/telma-500.woff2', weight: '500' },
    { path: './fonts/telma-700.woff2', weight: '700' },
  ],
});

const pally = localFont({
  variable: '--font-pally',
  display: 'swap',
  src: [
    { path: './fonts/pally-400.woff2', weight: '400' },
    { path: './fonts/pally-500.woff2', weight: '500' },
    { path: './fonts/pally-700.woff2', weight: '700' },
  ],
});

export const fontVariables = [satoshi, chillax, telma, pally]
  .map((font) => font.variable)
  .join(' ');
