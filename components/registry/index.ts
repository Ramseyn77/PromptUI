import type { ComponentType } from 'react';
import { AnimatedChecklist } from './AnimatedChecklist';
import { BentoFeatures } from './BentoFeatures';
import { BorderBeamButton } from './BorderBeamButton';
import { FloatingLabelInput } from './FloatingLabelInput';
import { GradientText } from './GradientText';
import { MarqueeTestimonials } from './MarqueeTestimonials';
import { OrbitLoader } from './OrbitLoader';
import { OtpInput } from './OtpInput';
import { PricingToggle } from './PricingToggle';
import { PushButton } from './PushButton';
import { ShimmerButton } from './ShimmerButton';
import { SpotlightCard } from './SpotlightCard';
import { StatCard } from './StatCard';
import { TextRotate } from './TextRotate';
import { ThemeSwitch } from './ThemeSwitch';

/**
 * Components written as real files: the preview renders them directly and their
 * displayed source is generated from the same file (npm run registry:sync).
 * They support light and dark mode through `dark:` classes and follow the site theme.
 */
export const registryComponents: Record<string, ComponentType> = {
  'animated-checklist': AnimatedChecklist,
  'bento-features': BentoFeatures,
  'border-beam-button': BorderBeamButton,
  'floating-label-input': FloatingLabelInput,
  'gradient-text': GradientText,
  'marquee-testimonials': MarqueeTestimonials,
  'orbit-loader': OrbitLoader,
  'otp-input': OtpInput,
  'pricing-toggle': PricingToggle,
  'push-button': PushButton,
  'shimmer-button': ShimmerButton,
  'spotlight-card': SpotlightCard,
  'stat-card': StatCard,
  'text-rotate': TextRotate,
  'theme-switch': ThemeSwitch,
};
