/**
 * @registry
 * name: Stretchy Switch
 * category: Toggle
 * style: Gradient
 * tags: featured, recent
 * description: Interrupteur elastique dont le bouton s etire pendant l appui avant de glisser, facon iOS.
 * prompt: Create an iOS-style stretchy switch: while pressed (pointer down or Space held) the knob widens toward the direction of travel, then on release it slides and the track fills with a teal-to-violet gradient; springy easing, role="switch", aria-checked, keyboard support. Light and dark mode.
 */
'use client';
import { useState } from 'react';

export function StretchySwitch() {
  const [on, setOn] = useState(true);
  const [pressed, setPressed] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <span id="stretchy-label" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Auto-save</span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-labelledby="stretchy-label"
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
        onKeyDown={(event) => { if (event.key === ' ') setPressed(true); }}
        onKeyUp={() => setPressed(false)}
        onClick={() => setOn((value) => !value)}
        className={`relative h-9 w-16 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 ${on ? 'bg-gradient-to-r from-teal-500 to-violet-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}
      >
        <span
          className="absolute top-1 h-7 rounded-full bg-white shadow-md transition-all duration-300 ease-[cubic-bezier(.34,1.56,.64,1)]"
          style={{ width: pressed ? 36 : 28, left: on ? (pressed ? 24 : 32) : 4 }}
        />
      </button>
    </div>
  );
}
