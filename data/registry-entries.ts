import type { LibraryComponent } from '@/types/component';
import { registrySources } from './registry-sources';

type RegistryEntry = Omit<LibraryComponent, 'code' | 'responsiveModes' | 'safetyNotes' | 'responsive'>;

// Metadata for components/registry. Their code comes from the generated registry-sources.ts.
const entries: RegistryEntry[] = [
  {
    slug: 'shimmer-button', name: 'Shimmer Button', category: 'Buttons', style: 'Dark', featured: true, recent: true,
    description: 'Bouton CTA avec un reflet lumineux qui balaie la surface a intervalle regulier.',
    technologies: ['React', 'TypeScript', 'Tailwind', 'Lucide'],
    prompt: 'Create a pill CTA button in React + Tailwind: solid zinc-950 (white in dark mode), a skewed translucent highlight that sweeps across every ~3s via a CSS keyframe, an arrow icon that nudges right on hover, press scale .97, visible focus ring, animation disabled with prefers-reduced-motion.',
  },
  {
    slug: 'border-beam-button', name: 'Border Beam Button', category: 'Buttons', style: 'Gradient', featured: true, recent: true,
    description: 'Bouton IA dont la bordure est parcourue par un faisceau teal et violet.',
    technologies: ['React', 'TypeScript', 'Tailwind', 'Lucide'],
    prompt: 'Create a "Generate with AI" pill button whose 1px border shows a light beam running around it: an oversized conic-gradient (transparent to teal to violet) spins behind an inner pill, overflow hidden. Light and dark variants, focus ring, reduced-motion safe.',
  },
  {
    slug: 'push-button', name: 'Push Button 3D', category: 'Buttons', style: 'Minimal', recent: true,
    description: 'Boutons en relief qui s enfoncent physiquement au clic.',
    technologies: ['React', 'TypeScript', 'Tailwind'],
    prompt: 'Create tactile 3D push buttons: a darker base layer and a raised face translated up 6px that rises on hover and sinks to 0 on :active. Provide a primary teal and a neutral variant, both with dark mode colors and a focus ring.',
  },
  {
    slug: 'spotlight-card', name: 'Spotlight Card', category: 'Cards', style: 'SaaS', featured: true, recent: true,
    description: 'Carte feature dont le halo lumineux suit le curseur.',
    technologies: ['React', 'TypeScript', 'Tailwind', 'Lucide'],
    prompt: 'Create a feature card where a soft teal radial-gradient spotlight follows the pointer (pointermove sets x/y, fades out on leave). Include an icon tile, title, description and two stat tiles. Light and dark mode borders and surfaces.',
  },
  {
    slug: 'stat-card', name: 'Stat Card Sparkline', category: 'Cards', style: 'Minimal', recent: true,
    description: 'Carte KPI avec tendance, badge de progression et sparkline en degrade.',
    technologies: ['React', 'TypeScript', 'Tailwind', 'Lucide'],
    prompt: 'Create a KPI card: label, large value, green trend badge, and an SVG sparkline (polyline + gradient area, non-scaling stroke) with an accessible label. Works in light and dark mode.',
  },
  {
    slug: 'bento-features', name: 'Bento Features', category: 'Cards', style: 'Editorial', featured: true, recent: true,
    description: 'Grille bento de fonctionnalites avec tuiles mises en avant, chiffre cle et tags.',
    technologies: ['React', 'TypeScript', 'Tailwind', 'Lucide'],
    prompt: 'Create a responsive bento feature grid (1 column on mobile, 3 from sm): a wide inverted hero tile with a glow, a stat tile, an accessibility tile and a wide gradient tile with tags. Inverted tile flips colors in dark mode.',
  },
  {
    slug: 'text-rotate', name: 'Text Rotate', category: 'Text', style: 'Gradient', featured: true, recent: true,
    description: 'Titre dont le mot final change en boucle avec une entree floue.',
    technologies: ['React', 'TypeScript', 'Tailwind'],
    prompt: 'Create a headline "Build beautiful ___" where the last word cycles every 2.2s through a list, each word entering with a rise + blur keyframe and a teal-to-violet gradient. Provide the full sentence as sr-only text and stop cycling with prefers-reduced-motion.',
  },
  {
    slug: 'gradient-text', name: 'Gradient Text', category: 'Text', style: 'Gradient', recent: true,
    description: 'Titre en degrade anime qui derive lentement, lisible sur fond clair et sombre.',
    technologies: ['React', 'TypeScript', 'Tailwind'],
    prompt: 'Create a hero headline with background-clip text and a teal/violet/amber gradient at 200% size that pans slowly with a keyframe. Add an eyebrow and subtitle with light and dark text colors.',
  },
  {
    slug: 'floating-label-input', name: 'Floating Label Input', category: 'Forms', style: 'Minimal', recent: true,
    description: 'Champs dont le label remonte au focus ou a la saisie, avec texte d aide.',
    technologies: ['React', 'TypeScript', 'Tailwind'],
    prompt: 'Create floating label inputs using placeholder=" " and the peer/:placeholder-shown trick: the label sits centered, then moves up and shrinks on focus or when filled. Real <label htmlFor>, hint text via aria-describedby, teal focus ring, dark mode.',
  },
  {
    slug: 'otp-input', name: 'OTP Input', category: 'Forms', style: 'SaaS', featured: true, recent: true,
    description: 'Saisie de code a 6 chiffres avec avance auto, collage et validation.',
    technologies: ['React', 'TypeScript', 'Tailwind', 'Lucide'],
    prompt: 'Create a 6-digit OTP input: digits only, auto-advance, Backspace goes back, arrow keys move, pasting a code fills every box, inputMode numeric and autocomplete one-time-code. Borders turn green with a status message when complete. Light and dark mode.',
  },
  {
    slug: 'animated-checklist', name: 'Animated Checklist', category: 'Checkboxes', style: 'Minimal', recent: true,
    description: 'Liste de taches ou la coche se dessine et le texte se barre.',
    technologies: ['React', 'TypeScript', 'Tailwind'],
    prompt: 'Create a task checklist with native sr-only checkboxes and custom boxes: the SVG check is drawn by animating stroke-dashoffset, the label strikes through with a growing line, and a counter shows done/total. Keyboard focus visible, dark mode.',
  },
  {
    slug: 'orbit-loader', name: 'Orbit Loader', category: 'Loader', style: 'Gradient', recent: true,
    description: 'Loader avec trois points en orbite autour d un noyau qui respire.',
    technologies: ['React', 'TypeScript', 'Tailwind'],
    prompt: 'Create a loader: three colored dots orbiting a ring with offset animation delays around a breathing gradient core, role="status" with a visible label. Neutral ring color in light and dark mode, reduced-motion safe.',
  },
  {
    slug: 'marquee-testimonials', name: 'Marquee Testimonials', category: 'Testimonials', style: 'SaaS', featured: true, recent: true,
    description: 'Deux rangees de temoignages qui defilent en sens inverse et se mettent en pause au survol.',
    technologies: ['React', 'TypeScript', 'Tailwind'],
    prompt: 'Create two infinite marquee rows of testimonial cards moving in opposite directions (list duplicated, translateX -50%), paused on hover, edges faded with a mask. Duplicates are aria-hidden. Light and dark card styles.',
  },
  {
    slug: 'pricing-toggle', name: 'Pricing Toggle', category: 'Pricing', style: 'SaaS', featured: true, recent: true,
    description: 'Tarifs avec bascule mensuel ou annuel et prix qui s anime au changement.',
    technologies: ['React', 'TypeScript', 'Tailwind', 'Lucide'],
    prompt: 'Create a pricing section with a Monthly/Yearly segmented radiogroup (yearly shows a -20% badge) and two plan cards; the price re-animates on change. The highlighted plan is inverted and flips in dark mode. Stack on mobile, 2 columns from sm.',
  },
  {
    slug: 'theme-switch', name: 'Theme Switch', category: 'Toggle', style: 'Gradient', featured: true, recent: true,
    description: 'Interrupteur jour et nuit avec soleil, lune, etoiles et nuage animes.',
    technologies: ['React', 'TypeScript', 'Tailwind', 'Lucide'],
    prompt: 'Create a day/night switch (role="switch", aria-checked): sky background turns indigo, the knob springs across and swaps sun for moon, stars fade in and a cloud drifts out. Focus ring and smooth 500ms transitions.',
  },
];

export const registryEntries = entries.map((entry) => ({
  ...entry,
  responsive: true,
  code: registrySources[entry.slug] ?? '',
}));
