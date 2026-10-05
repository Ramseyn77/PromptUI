'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ComponentPreview } from './ComponentPreview';
import { useLocale } from '@/i18n/LocaleProvider';

export type EmulatedComponentPreviewHandle = {
  getHtml: () => string;
};

export const EmulatedComponentPreview = forwardRef<EmulatedComponentPreviewHandle, {
  slug: string;
  device: 'mobile' | 'tablet' | 'desktop';
  width: number;
  height: number;
  padding: number;
  scale: number;
  theme: 'auto' | 'light' | 'dark';
  showBounds: boolean;
  editableHtml?: string;
  interactive?: boolean;
  onSelectElement?: (element: HTMLElement | null) => void;
}>(function EmulatedComponentPreview({
  slug,
  device,
  width,
  height,
  padding,
  scale,
  theme,
  showBounds,
  editableHtml,
  interactive = false,
  onSelectElement,
}, ref) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const hasBuiltRef = useRef(false);
  const onSelectRef = useRef(onSelectElement);
  onSelectRef.current = onSelectElement;
  const isHtmlPreview = editableHtml !== undefined;
  const { t } = useLocale();
  // Horizontal overflow of the rendered component, in CSS pixels (0 when it fits the device width).
  const [overflowX, setOverflowX] = useState(0);

  useImperativeHandle(ref, () => ({
    getHtml: () => {
      if (!mountNode) return '';
      const clone = mountNode.cloneNode(true) as HTMLElement;
      clone.querySelectorAll('.viz-hover, .viz-selected').forEach((node) => {
        node.classList.remove('viz-hover', 'viz-selected');
        if (!node.className) node.removeAttribute('class');
      });
      return clone.innerHTML;
    },
  }), [mountNode]);

  // Every preview renders inside an iframe: its media queries then follow the emulated device width,
  // not the browser window, so Mobile/Tablette/Desktop trigger the real Tailwind breakpoints.
  useEffect(() => {
    hasBuiltRef.current = false;
    const iframe = iframeRef.current;
    if (!iframe) return;
    let headObserver: MutationObserver | null = null;

    const prepareFrame = () => {
      const frameDocument = iframe.contentDocument;
      if (!frameDocument) return;

      frameDocument.head.replaceChildren();
      document.querySelectorAll('link[rel="stylesheet"], style').forEach((node) => {
        frameDocument.head.appendChild(node.cloneNode(true));
      });
      // Stylesheets injected later (dev hot reload, lazily loaded chunks) must reach the frame too.
      headObserver?.disconnect();
      headObserver = new MutationObserver((records) => {
        records.forEach((record) => record.addedNodes.forEach((node) => {
          if (node instanceof HTMLStyleElement || (node instanceof HTMLLinkElement && node.rel === 'stylesheet')) {
            frameDocument.head.insertBefore(node.cloneNode(true), frameDocument.getElementById('preview-reset'));
          }
        }));
      });
      headObserver.observe(document.head, { childList: true });

      if (editableHtml !== undefined) {
        const cdnScript = frameDocument.createElement('script');
        cdnScript.src = 'https://cdn.tailwindcss.com';
        cdnScript.onload = () => {
          const frameWindow = frameDocument.defaultView as (Window & { tailwind?: { config: unknown } }) | null;
          if (frameWindow?.tailwind) frameWindow.tailwind.config = { darkMode: 'class' };
        };
        frameDocument.head.appendChild(cdnScript);
      }

      const reset = frameDocument.createElement('style');
      reset.id = 'preview-reset';
      // Like a real device: the page may scroll vertically, never horizontally.
      reset.textContent = `
        html, body { width: 100%; height: 100%; margin: 0; background: transparent !important; scroll-behavior: auto; }
        html { overflow: hidden; }
        body { overflow-x: hidden; overflow-y: auto; overscroll-behavior: contain; color: var(--foreground); }
        #component-preview-root { display: grid; width: 100%; min-height: 100%; place-items: safe center; box-sizing: border-box; }
        #component-preview-root > * { width: 100%; box-sizing: border-box; }
        .show-preview-bounds * { outline: 1px solid rgba(20, 184, 166, .28); outline-offset: -1px; }
        .viz-hover { outline: 1.5px dashed rgba(13, 148, 136, .7); outline-offset: 1px; cursor: pointer; }
        .viz-selected { outline: 2px solid #0d9488 !important; outline-offset: 1px; }
      `;
      frameDocument.head.appendChild(reset);
      frameDocument.documentElement.className = theme === 'dark' ? 'dark' : '';
      // Site tokens (--surface-2, --foreground...) depend on data-theme.
      if (document.documentElement.dataset.theme) frameDocument.documentElement.dataset.theme = document.documentElement.dataset.theme;

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

    return () => {
      iframe.removeEventListener('load', prepareFrame);
      headObserver?.disconnect();
    };
  }, [device, theme, isHtmlPreview]);

  // Report horizontal overflow instead of letting it hide behind a scrollbar.
  useEffect(() => {
    const frameDocument = iframeRef.current?.contentDocument;
    if (!mountNode || !frameDocument) return;
    const measure = () => setOverflowX(Math.max(0, frameDocument.body.scrollWidth - frameDocument.body.clientWidth));
    const observer = new ResizeObserver(measure);
    observer.observe(mountNode);
    observer.observe(frameDocument.body);
    const mutations = new MutationObserver(measure);
    mutations.observe(mountNode, { childList: true, subtree: true, attributes: true });
    measure();
    return () => { observer.disconnect(); mutations.disconnect(); };
  }, [mountNode]);

  useEffect(() => {
    const frameDocument = iframeRef.current?.contentDocument;
    if (!frameDocument) return;
    frameDocument.documentElement.className = theme === 'dark' ? 'dark' : '';
  }, [theme, isHtmlPreview]);

  useEffect(() => {
    if (!mountNode) return;
    const isEditable = editableHtml !== undefined;
    mountNode.className = showBounds ? 'show-preview-bounds' : '';
    mountNode.style.padding = `${padding}px`;

    if (!isEditable) {
      hasBuiltRef.current = false;
      return;
    }
    if (interactive && hasBuiltRef.current) return;

    const template = document.createElement('template');
    template.innerHTML = editableHtml;
    template.content.querySelectorAll('script').forEach((node) => node.remove());
    template.content.querySelectorAll('*').forEach((node) => {
      [...node.attributes].forEach((attribute) => {
        if (attribute.name.toLowerCase().startsWith('on')) node.removeAttribute(attribute.name);
      });
    });
    mountNode.replaceChildren(template.content.cloneNode(true));
    hasBuiltRef.current = true;
  }, [editableHtml, mountNode, padding, showBounds, interactive]);

  useEffect(() => {
    if (!mountNode || !interactive) return;
    let hovered: HTMLElement | null = null;
    let selected: HTMLElement | null = null;

    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target === mountNode) return;
      if (hovered && hovered !== target) hovered.classList.remove('viz-hover');
      target.classList.add('viz-hover');
      hovered = target;
    };

    const handleOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      target.classList.remove('viz-hover');
      if (hovered === target) hovered = null;
    };

    const handleClick = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const target = event.target as HTMLElement;
      if (selected) selected.classList.remove('viz-selected');
      if (target === mountNode) {
        selected = null;
        onSelectRef.current?.(null);
        return;
      }
      target.classList.add('viz-selected');
      selected = target;
      onSelectRef.current?.(target);
    };

    mountNode.addEventListener('mouseover', handleOver);
    mountNode.addEventListener('mouseout', handleOut);
    mountNode.addEventListener('click', handleClick, true);

    return () => {
      mountNode.removeEventListener('mouseover', handleOver);
      mountNode.removeEventListener('mouseout', handleOut);
      mountNode.removeEventListener('click', handleClick, true);
      hovered?.classList.remove('viz-hover');
      selected?.classList.remove('viz-selected');
    };
  }, [mountNode, interactive]);

  useEffect(() => {
    if (!mountNode || slug !== 'acceptance-donut') return;

    const input = mountNode.querySelector<HTMLInputElement>('input[type="range"][aria-label="Ajuster le taux"]');
    const ticks = [...mountNode.querySelectorAll<HTMLElement>('[data-acceptance-tick]')];
    const rateText = mountNode.querySelector<HTMLElement>('[data-rate-text]');
    if (!input || !ticks.length) return;

    const updateDonut = () => {
      const rate = Number(input.value);
      const acceptedTicks = Math.round((rate / 100) * ticks.length);
      ticks.forEach((tick, index) => {
        tick.classList.toggle('bg-yellow-400', index < acceptedTicks);
        tick.classList.toggle('bg-red-600', index >= acceptedTicks);
      });
      if (rateText) rateText.textContent = `${rate}%`;
    };

    updateDonut();
    input.addEventListener('input', updateDonut);

    return () => {
      input.removeEventListener('input', updateDonut);
    };
  }, [mountNode, slug, editableHtml]);

  useEffect(() => {
    if (!mountNode || slug !== 'course-histogram') return;

    const buttons = [...mountNode.querySelectorAll<HTMLButtonElement>('button')];
    if (!buttons.length) return;

    const selectButton = (activeButton: HTMLButtonElement) => {
      buttons.forEach((button) => {
        button.classList.toggle('bg-white/10', button === activeButton);
        button.classList.toggle('bg-white/[.06]', button !== activeButton);
      });
    };

    const cleanups = buttons.map((button) => {
      const handler = () => selectButton(button);
      button.addEventListener('click', handler);
      return () => button.removeEventListener('click', handler);
    });

    selectButton(buttons[buttons.length - 1]);
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [mountNode, slug, editableHtml]);

  useEffect(() => {
    if (!mountNode || slug !== 'gains-curve') return;

    const circles = [...mountNode.querySelectorAll<SVGCircleElement>('circle')];
    if (!circles.length) return;

    const selectCircle = (activeCircle: SVGCircleElement) => {
      circles.forEach((circle) => circle.setAttribute('r', circle === activeCircle ? '10' : '8'));
    };

    const cleanups = circles.map((circle) => {
      const handler = () => selectCircle(circle);
      circle.addEventListener('click', handler);
      return () => circle.removeEventListener('click', handler);
    });

    selectCircle(circles[circles.length - 1]);
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [mountNode, slug, editableHtml]);

  useEffect(() => {
    if (!mountNode || slug !== 'gradient-segmented-tabs') return;

    const buttons = [...mountNode.querySelectorAll<HTMLButtonElement>('[data-gradient-tab]')];
    const title = mountNode.querySelector<HTMLElement>('[data-gradient-title]');
    const description = mountNode.querySelector<HTMLElement>('[data-gradient-desc]');
    if (!buttons.length || !title || !description) return;

    const copy: Record<string, string> = {
      Design: 'Ajuste la direction visuelle.',
      Code: 'Prepare un composant propre.',
      Ship: 'Passe au build plus vite.',
    };
    const activeClass = 'bg-gradient-to-r from-teal-500 via-sky-500 to-violet-500 text-white shadow-lg shadow-sky-900/15';
    const idleClass = 'text-zinc-500 hover:text-zinc-950 dark:hover:text-white';

    const selectTab = (activeButton: HTMLButtonElement) => {
      const value = activeButton.dataset.gradientTab ?? 'Design';
      buttons.forEach((button) => {
        const isActive = button === activeButton;
        button.className = `rounded-xl px-3 py-2.5 text-xs font-black transition ${isActive ? activeClass : idleClass}`;
      });
      title.textContent = value;
      description.textContent = copy[value] ?? copy.Design;
    };

    const cleanups = buttons.map((button) => {
      const handler = () => selectTab(button);
      button.addEventListener('click', handler);
      return () => button.removeEventListener('click', handler);
    });

    selectTab(buttons[0]);
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [mountNode, slug, editableHtml]);

  useEffect(() => {
    if (!mountNode || slug !== 'gradient-progress-slider') return;

    const input = mountNode.querySelector<HTMLInputElement>('input[type="range"][aria-label="Ajuster la progression"]');
    const value = mountNode.querySelector<HTMLElement>('[data-progress-value]');
    const fill = mountNode.querySelector<HTMLElement>('[data-progress-fill]');
    if (!input || !value || !fill) return;

    const updateProgress = () => {
      value.textContent = `${input.value}%`;
      fill.style.width = `${input.value}%`;
    };

    updateProgress();
    input.addEventListener('input', updateProgress);

    return () => input.removeEventListener('input', updateProgress);
  }, [mountNode, slug, editableHtml]);

  const viewport = (
    <>
      <iframe
        ref={iframeRef}
        title={t.playground.frameTitle(slug)}
        className="block border-0 bg-transparent"
        style={{ width, height }}
      />
      {/* Library components are React: they render into the frame through a portal and keep their state and events. */}
      {!isHtmlPreview && mountNode && createPortal(<ComponentPreview slug={slug}/>, mountNode)}
    </>
  );

  return (
    <div
      className="relative shrink-0 transition-transform duration-300"
      style={{ transform: `scale(${scale})` }}
    >
      {overflowX > 0 && (
        <p
          role="status"
          className="pointer-events-none absolute right-3 top-3 z-10 origin-top-right rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white shadow-lg"
          // Counter the frame scale so the warning stays readable at any zoom.
          style={{ transform: `scale(${1 / scale})` }}
        >
          {t.playground.overflow(overflowX)}
        </p>
      )}
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
    </div>
  );
});
