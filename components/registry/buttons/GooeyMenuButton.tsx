/**
 * @registry
 * name: Gooey Menu Button
 * category: Buttons
 * style: Gradient
 * tags: recent
 * description: Bouton rond à effet « gooey » (filtre SVG) qui fait jaillir quatre actions en arc, liées par une matière liquide, avec retour clavier.
 * prompt: Create a gooey menu button: a round gradient + button; when opened (aria-expanded) four action buttons (Camera, Image, Mic, File) shoot out along an upward arc with staggered transitions, and an SVG goo filter (feGaussianBlur + feColorMatrix) applied to the blob layer makes them look connected like liquid; the icons sit on a separate unfiltered layer so they stay sharp; Escape closes and returns focus; filter id from useId; reduced motion removes the stagger. Light and dark mode.
 */
'use client';
import { Camera, FileText, Image as ImageIcon, Mic, Plus } from 'lucide-react';
import { useId, useRef, useState } from 'react';

const actions = [{ label: 'Camera', icon: Camera, x: -84, y: -18 }, { label: 'Image', icon: ImageIcon, x: -50, y: -72 }, { label: 'Voice note', icon: Mic, x: 10, y: -88 }, { label: 'File', icon: FileText, x: 62, y: -58 }];

export function GooeyMenuButton() {
  const filterId = `pui-goo-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const position = (index: number) => (open ? `translate(${actions[index].x}px, ${actions[index].y}px)` : 'translate(0, 0)');

  return (
    <div className="grid h-56 w-full max-w-xs place-items-end justify-center pb-8" onKeyDown={(event) => { if (event.key === 'Escape') { setOpen(false); triggerRef.current?.focus(); } }}>
      <svg aria-hidden className="absolute size-0"><defs><filter id={filterId}><feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" /></filter></defs></svg>
      <div className="relative size-14">
        <div aria-hidden className="absolute inset-0" style={{ filter: `url(#${filterId})` }}>
          {actions.map((action, index) => <span key={action.label} className="absolute left-1 top-1 size-12 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 transition-transform duration-500 ease-[cubic-bezier(.3,1.5,.5,1)] motion-reduce:duration-0" style={{ transform: position(index), transitionDelay: open ? `${index * 50}ms` : '0ms' }} />)}
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500" />
        </div>
        {actions.map((action, index) => <button key={action.label} type="button" tabIndex={open ? 0 : -1} aria-hidden={!open} aria-label={action.label} onClick={() => setOpen(false)} className={`absolute left-1 top-1 grid size-12 place-items-center rounded-full text-white transition duration-500 ease-[cubic-bezier(.3,1.5,.5,1)] hover:bg-white/15 motion-reduce:duration-0 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`} style={{ transform: position(index), transitionDelay: open ? `${index * 50}ms` : '0ms' }}><action.icon aria-hidden className="size-5" /></button>)}
        <button ref={triggerRef} type="button" aria-label={open ? 'Close actions' : 'Open actions'} aria-expanded={open} onClick={() => setOpen(!open)} className="absolute inset-0 grid place-items-center rounded-full text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500"><Plus aria-hidden className={`size-6 transition-transform duration-300 ${open ? 'rotate-45' : ''}`} /></button>
      </div>
    </div>
  );
}
