export type ComponentCategory =
  | 'Hero'
  | 'Navbar'
  | 'Cards'
  | 'Buttons'
  | 'Checkboxes'
  | 'AI Chat'
  | 'Forms'
  | 'Pricing'
  | 'Testimonials'
  | 'Dashboard'
  | 'Tables'
  | 'Boards'
  | 'Charts'
  | 'Shaders'
  | 'Footer'
  | 'CTA'
  | 'Loader'
  | 'Menu'
  | 'Toggle'
  | 'Tooltips'
  | 'Text'
  | 'Sidebar';

export type ComponentStyle = 'Minimal' | 'Gradient' | 'Glass' | 'Dark' | 'Editorial' | 'SaaS';

export interface LibraryComponent {
  slug: string;
  name: string;
  description: string;
  category: ComponentCategory;
  style: ComponentStyle;
  technologies: string[];
  responsive: boolean;
  responsiveModes: string[];
  safetyNotes: string[];
  featured?: boolean;
  recent?: boolean;
  code: string;
  prompt: string;
}
