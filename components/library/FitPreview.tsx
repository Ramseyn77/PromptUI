'use client';
import { useLayoutEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react';

// Widest layout we allow (box width / MIN_LAYOUT_SCALE) when reflowing a tall component.
const MIN_LAYOUT_SCALE = 0.35;
// Below this the preview becomes unreadable: show the top at this scale and pan on hover instead.
const MIN_READABLE_SCALE = 0.55;

type Fit = { scale: number; width: number; pan: number };

/**
 * Fits a preview inside its box without squeezing it: when the content is too tall,
 * it gets a wider layout width (reflowing like on a larger screen) and is then scaled
 * down visually. Small components keep their real size. Components that would end up
 * unreadable are shown from the top and pan down when the card is hovered.
 */
export function FitPreview({ children }: { children: ReactNode }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<Fit | null>(null);
  // While the pointer is inside, the component may grow (menus, expanding inputs): keep the fit frozen.
  const interactingRef = useRef(false);
  const measureRef = useRef<() => void>(() => {});

  useLayoutEffect(() => {
    const box = boxRef.current;
    const content = contentRef.current;
    if (!box || !content) return;

    const measure = () => {
      if (interactingRef.current) return;
      // clientWidth/offsetHeight ignore transforms, so card hover or reveal animations don't skew the fit.
      const boxWidth = box.clientWidth;
      const boxHeight = box.clientHeight;
      if (!boxWidth || !boxHeight) return;

      // scrollHeight also counts children that overflow the preview (absolute layers, shadows).
      const heightAt = (width: number) => {
        content.style.width = `${width}px`;
        return Math.max(content.offsetHeight, content.scrollHeight);
      };

      // Height depends on width, so pick a layout width in a few passes (it can oscillate)...
      let layoutScale = 1;
      for (let pass = 0; pass < 4; pass += 1) {
        const next = Math.max(MIN_LAYOUT_SCALE, Math.min(1, boxHeight / heightAt(boxWidth / layoutScale)));
        const settled = Math.abs(next - layoutScale) < 0.01;
        layoutScale = next;
        if (settled) break;
      }

      // Fixed-width components (docks, toolbars) overflow sideways: give them the room they need.
      const widen = (width: number) => {
        content.style.width = `${width}px`;
        return Math.max(width, content.scrollWidth);
      };

      // ...then measure that width once more and scale to fit both dimensions, so nothing is ever cut.
      let width = widen(boxWidth / layoutScale);
      let height = heightAt(width);
      let scale = Math.min(1, boxWidth / width, boxHeight / height);
      let pan = 0;

      if (scale < MIN_READABLE_SCALE) {
        width = widen(boxWidth / MIN_READABLE_SCALE);
        height = heightAt(width);
        scale = Math.min(MIN_READABLE_SCALE, boxWidth / width);
        pan = Math.max(0, height * scale - boxHeight);
      }

      setFit((current) => (current && current.scale === scale && current.width === width && current.pan === pan ? current : { scale, width, pan }));
    };

    measureRef.current = measure;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(box);
    // Late fonts/images change the content height; re-fitting converges, so no loop.
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  const tall = Boolean(fit?.pan);

  return (
    <div
      ref={boxRef}
      className={`relative h-full w-full overflow-hidden ${tall ? 'fit-preview-tall' : ''}`}
      onPointerEnter={() => { interactingRef.current = true; }}
      onPointerLeave={() => { interactingRef.current = false; measureRef.current(); }}
      // Demo links and forms inside a preview must not navigate away from the library.
      onClickCapture={(event: MouseEvent) => { if ((event.target as HTMLElement).closest('a[href]')) event.preventDefault(); }}
      onSubmitCapture={(event) => event.preventDefault()}
    >
      <div
        className={tall ? 'fit-preview-pan absolute inset-x-0 top-0' : 'absolute inset-0'}
        // Constant pan speed (~140px/s), capped so long pages don't crawl.
        style={tall ? ({ '--fit-pan': `-${fit!.pan}px`, '--fit-pan-duration': `${Math.min(6, Math.max(1.2, fit!.pan / 140))}s` } as CSSProperties) : undefined}
      >
        <div
          ref={contentRef}
          className={`absolute left-1/2 transition-opacity duration-300 ${tall ? 'top-0 origin-top' : 'top-1/2'}`}
          style={{
            width: fit ? fit.width : '100%',
            transform: tall ? `translateX(-50%) scale(${fit!.scale})` : `translate(-50%, -50%) scale(${fit?.scale ?? 1})`,
            opacity: fit ? 1 : 0,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
