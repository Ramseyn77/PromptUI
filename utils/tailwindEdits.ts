const COLOR_NAME = '(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)';

export const bgColorPattern = new RegExp(`^bg-(${COLOR_NAME}-\\d{2,3}|white|black|transparent)$`);
export const textColorPattern = new RegExp(`^text-(${COLOR_NAME}-\\d{2,3}|white|black)$`);
export const radiusPattern = /^rounded(-(none|sm|md|lg|xl|2xl|3xl|full))?$/;
export const paddingPattern = /^p-\d+(\.\d+)?$/;
export const fontSizePattern = /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl)$/;
export const alignPattern = /^text-(left|center|right)$/;
export const fontWeightPattern = /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/;

export function getMatchingClass(el: Element, pattern: RegExp) {
  return [...el.classList].find((cls) => pattern.test(cls));
}

function replaceClass(el: Element, pattern: RegExp, next: string) {
  const kept = [...el.classList].filter((cls) => !pattern.test(cls));
  el.className = [...kept, next].join(' ');
}

export function setBackgroundColor(el: Element, className: string) { replaceClass(el, bgColorPattern, className); }
export function setTextColor(el: Element, className: string) { replaceClass(el, textColorPattern, className); }
export function setRadius(el: Element, className: string) { replaceClass(el, radiusPattern, className); }
export function setPadding(el: Element, className: string) { replaceClass(el, paddingPattern, className); }
export function setFontSize(el: Element, className: string) { replaceClass(el, fontSizePattern, className); }
export function setTextAlign(el: Element, className: string) { replaceClass(el, alignPattern, className); }
export function setFontWeight(el: Element, className: string) { replaceClass(el, fontWeightPattern, className); }

export const backgroundSwatches = [
  { label: 'White', className: 'bg-white' },
  { label: 'Light zinc', className: 'bg-zinc-100' },
  { label: 'Dark zinc', className: 'bg-zinc-950' },
  { label: 'Teal', className: 'bg-teal-600' },
  { label: 'Emerald', className: 'bg-emerald-500' },
  { label: 'Violet', className: 'bg-violet-600' },
  { label: 'Rose', className: 'bg-rose-500' },
  { label: 'Amber', className: 'bg-amber-500' },
  { label: 'Transparent', className: 'bg-transparent' },
];

export const textColorSwatches = [
  { label: 'Black', className: 'text-black' },
  { label: 'White', className: 'text-white' },
  { label: 'Zinc', className: 'text-zinc-500' },
  { label: 'Teal', className: 'text-teal-600' },
  { label: 'Emerald', className: 'text-emerald-600' },
  { label: 'Violet', className: 'text-violet-600' },
  { label: 'Rose', className: 'text-rose-600' },
  { label: 'Amber', className: 'text-amber-600' },
];

export const radiusOptions = [
  { label: 'None', className: 'rounded-none' },
  { label: 'Small', className: 'rounded-md' },
  { label: 'Medium', className: 'rounded-xl' },
  { label: 'Large', className: 'rounded-2xl' },
  { label: 'Full', className: 'rounded-full' },
];

export const paddingOptions = [
  { label: 'None', className: 'p-0' },
  { label: 'S', className: 'p-2' },
  { label: 'M', className: 'p-4' },
  { label: 'L', className: 'p-6' },
  { label: 'XL', className: 'p-10' },
];

export const fontSizeOptions = [
  { label: 'XS', className: 'text-xs' },
  { label: 'S', className: 'text-sm' },
  { label: 'M', className: 'text-base' },
  { label: 'L', className: 'text-lg' },
  { label: 'XL', className: 'text-2xl' },
  { label: 'XXL', className: 'text-4xl' },
];

export const alignOptions = [
  { label: 'Left', className: 'text-left' },
  { label: 'Center', className: 'text-center' },
  { label: 'Right', className: 'text-right' },
];

export const fontWeightOptions = [
  { label: 'Normal', className: 'font-normal' },
  { label: 'Medium', className: 'font-medium' },
  { label: 'Semi', className: 'font-semibold' },
  { label: 'Bold', className: 'font-bold' },
];
