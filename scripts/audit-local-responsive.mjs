import { chromium } from 'playwright-core';
import { writeFileSync } from 'node:fs';

let slugs = [
  'elastic-send-button','holographic-event-pass','layered-project-card','decision-path-cta',
  'scanline-launch-hero','signal-constellation-loader','expandable-search-dock','prism-sweep',
  'kinetic-letter-wave','liquid-fill-switch','focus-timer-card','voice-note-composer',
  'audio-quote-testimonial','signature-pad','seller-trust-card','auction-bid-panel',
  'matchday-scoreboard','ticket-tier-selector','availability-slot-picker','specialist-picker',
  'booking-checkout-summary','appointment-manager','notification-navbar','barrel-roll-navigation',
  'mini-cart-drawer','product-variant-picker','shipping-method-selector','order-success-card',
  'job-opportunity-card','quick-apply-form','application-tracker','candidate-pipeline-board',
  'interactive-product-inspector',
];
if (process.env.PROMPTUI_SLUGS) slugs = process.env.PROMPTUI_SLUGS.split(',').filter(Boolean);
const devices = { Mobile: [360,640], Tablette: [768,600], Desktop: [1280,720] };
const baseUrl = process.env.PROMPTUI_URL || 'http://localhost:3000';
const executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browser = await chromium.launch({ executablePath, headless: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
const runtimeErrors = [];
page.on('pageerror', error => runtimeErrors.push(error.message));
page.on('console', message => { if (message.type() === 'error') runtimeErrors.push(message.text()); });
const failures = [];

for (const slug of slugs) {
  runtimeErrors.length = 0;
  const response = await page.goto(`${baseUrl}/playground/${slug}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(700);
  if (!response?.ok()) { failures.push({ slug, device: 'route', problems: [`HTTP ${response?.status() ?? 'none'}`] }); continue; }
  for (const [device, [width, height]] of Object.entries(devices)) {
    await page.getByRole('button', { name: device, exact: true }).click();
    await page.waitForTimeout(350);
    const result = await page.evaluate(({ width, height }) => {
      const viewport = [...document.querySelectorAll('div')].find(node => node.style.width === `${width}px` && node.style.height === `${height}px`);
      if (!viewport) return { missing: true };
      const meaningful = viewport.querySelectorAll('article,section,nav,form,aside,svg,img,canvas,button').length;
      const overflow = getComputedStyle(viewport).overflow;
      return {
        missing: false,
        empty: meaningful === 0 && !(viewport.textContent || '').trim(),
        overflowX: viewport.scrollWidth > viewport.clientWidth + 2,
        overflowY: viewport.scrollHeight > viewport.clientHeight + 2,
        scrollable: overflow === 'auto' || overflow === 'scroll',
        size: `${viewport.scrollWidth}x${viewport.scrollHeight} / ${viewport.clientWidth}x${viewport.clientHeight}`,
      };
    }, { width, height });
    const problems = [];
    if (result.missing) problems.push('viewport introuvable');
    if (result.empty) problems.push('rendu vide');
    if (result.overflowX && !result.scrollable) problems.push(`debordement horizontal non scrollable ${result.size}`);
    if (result.overflowY && !result.scrollable) problems.push(`contenu coupe verticalement ${result.size}`);
    if (problems.length) failures.push({ slug, device, problems });
  }
  if (runtimeErrors.length) failures.push({ slug, device: 'runtime', problems: [...new Set(runtimeErrors)] });
  process.stdout.write('.');
}

await browser.close();
writeFileSync('responsive-audit-report.json', JSON.stringify({ tested: slugs.length * 3, components: slugs.length, failures }, null, 2));
console.log(`\n${slugs.length * 3} rendus testes (${slugs.length} composants).`);
if (failures.length) {
  console.log(JSON.stringify(failures, null, 2));
  process.exitCode = 1;
} else console.log('Aucune regression responsive detectee.');
