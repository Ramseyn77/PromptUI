'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ComponentPreview } from './ComponentPreview';

export function EmulatedComponentPreview({
  slug,
  device,
  width,
  height,
  padding,
  scale,
  theme,
  showBounds,
}: {
  slug: string;
  device: 'mobile' | 'tablet' | 'desktop';
  width: number;
  height: number;
  padding: number;
  scale: number;
  theme: 'auto' | 'light' | 'dark';
  showBounds: boolean;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const prepareFrame = () => {
      const frameDocument = iframe.contentDocument;
      if (!frameDocument) return;

      frameDocument.head.replaceChildren();
      document.querySelectorAll('link[rel="stylesheet"], style').forEach((node) => {
        frameDocument.head.appendChild(node.cloneNode(true));
      });

      const reset = frameDocument.createElement('style');
      reset.textContent = `
        html, body { width: 100%; min-height: 100%; margin: 0; background: transparent !important; }
        body { overflow: hidden; color: var(--foreground); }
        #component-preview-root { display: grid; width: 100%; min-height: 100vh; place-items: center; box-sizing: border-box; }
        .show-preview-bounds * { outline: 1px solid rgba(20, 184, 166, .28); outline-offset: -1px; }
      `;
      frameDocument.head.appendChild(reset);
      frameDocument.documentElement.className = theme === 'auto' ? document.documentElement.className : theme;

      let root = frameDocument.getElementById('component-preview-root');
      if (!root) {
        root = frameDocument.createElement('div');
        root.id = 'component-preview-root';
        frameDocument.body.appendChild(root);
      }
      setMountNode(root);
    };

    prepareFrame();
    iframe.addEventListener('load', prepareFrame);

    const themeObserver = new MutationObserver(() => {
      const frameDocument = iframe.contentDocument;
      if (frameDocument && theme === 'auto') frameDocument.documentElement.className = document.documentElement.className;
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      iframe.removeEventListener('load', prepareFrame);
      themeObserver.disconnect();
    };
  }, [device, theme]);

  useEffect(() => {
    const frameDocument = iframeRef.current?.contentDocument;
    if (!frameDocument) return;
    frameDocument.documentElement.className = theme === 'auto' ? document.documentElement.className : theme;
  }, [theme]);

  const viewport = (
    <iframe
      ref={iframeRef}
      title={`Apercu responsive de ${slug}`}
      className="block border-0 bg-transparent"
      style={{ width, height }}
    />
  );

  return (
    <div
      className="relative shrink-0 transition-transform duration-300"
      style={{ transform: `scale(${scale})` }}
    >
      {device === 'mobile' && (
        <div className="relative overflow-hidden rounded-[2.4rem] border-[8px] border-zinc-950 bg-zinc-900 shadow-2xl dark:border-zinc-800">
          {viewport}
          <div className="pointer-events-none absolute left-1/2 top-1.5 h-5 w-24 -translate-x-1/2 rounded-full bg-zinc-950 dark:bg-zinc-800"/>
        </div>
      )}

      {device === 'tablet' && (
        <div className="relative overflow-hidden rounded-[1.8rem] border-[10px] border-zinc-950 bg-zinc-900 shadow-2xl dark:border-zinc-800">
          {viewport}
          <div className="pointer-events-none absolute left-1/2 top-[-7px] size-1.5 -translate-x-1/2 rounded-full bg-zinc-500"/>
        </div>
      )}

      {device === 'desktop' && (
        <div className="overflow-hidden rounded-xl border border-zinc-400/60 bg-zinc-900 shadow-2xl dark:border-zinc-700">
          <div className="flex h-8 items-center gap-1.5 border-b border-zinc-300/70 bg-zinc-100 px-3 dark:border-zinc-700 dark:bg-zinc-900">
            <span className="size-2.5 rounded-full bg-red-400"/>
            <span className="size-2.5 rounded-full bg-amber-400"/>
            <span className="size-2.5 rounded-full bg-emerald-400"/>
            <span className="ml-3 h-4 flex-1 rounded-full bg-white dark:bg-zinc-800"/>
          </div>
          {viewport}
        </div>
      )}

      {mountNode && createPortal(
        <div className={showBounds ? 'show-preview-bounds' : ''} style={{ padding }}>
          <ComponentPreview slug={slug}/>
        </div>,
        mountNode,
      )}
    </div>
  );
}
