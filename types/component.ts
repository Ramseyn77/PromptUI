export type ComponentCategory =
  | 'Hero'
  | 'Navbar'
  | 'Cards'
  | 'Buttons'
  | 'Forms'
  | 'Pricing'
  | 'Testimonials'
  | 'Dashboard'
  | 'Tables'
  | 'Boards'
  | 'Charts'
  | 'Footer'
  | 'CTA';

export type ComponentStyle = 'Minimal' | 'Gradient' | 'Glass' | 'Dark' | 'Editorial' | 'SaaS';

export interface LibraryComponent {
  slug: string;
  name: string;
  description: string;
  category: ComponentCategory;
  style: ComponentStyle;
  technologies: string[];
  responsive: boolean;
  featured?: boolean;
  recent?: boolean;
  code: string;
  prompt: string;
}
