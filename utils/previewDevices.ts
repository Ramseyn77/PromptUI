export const tailwindBreakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export const previewDevices = {
  mobile: { width: 360, height: 640, frameWidth: 376, frameHeight: 656 },
  tablet: { width: 768, height: 600, frameWidth: 788, frameHeight: 620 },
  desktop: { width: 1280, height: 720, frameWidth: 1282, frameHeight: 754 },
} as const;

// Keep emulated devices on the intended Tailwind side of every breakpoint.
// Scaling the frame must never change these internal viewport dimensions.
export function validatePreviewDevices() {
  if (previewDevices.mobile.width >= tailwindBreakpoints.sm) {
    throw new Error('The mobile preview must stay below the Tailwind sm breakpoint.');
  }
  if (previewDevices.tablet.width < tailwindBreakpoints.md || previewDevices.tablet.width >= tailwindBreakpoints.lg) {
    throw new Error('The tablet preview must stay between the Tailwind md and lg breakpoints.');
  }
  if (previewDevices.desktop.width < tailwindBreakpoints.xl) {
    throw new Error('The desktop preview must reach the Tailwind xl breakpoint.');
  }
}
