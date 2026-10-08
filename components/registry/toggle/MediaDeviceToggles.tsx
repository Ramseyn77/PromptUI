/**
 * @registry
 * name: Media Device Toggles
 * category: Toggle
 * style: Dark
 * tags: featured, recent
 * description: Barre d'appel vidéo : micro, caméra, partage d'écran et main levée, avec niveau sonore animé et menus de périphériques.
 * prompt: Create a video-call control bar on a dark surface: round toggle buttons for Microphone (with an animated input level ring when on, red slashed icon when muted), Camera, Screen share (green when active) and Raise hand; each has aria-pressed and a tooltip-like label; small chevrons open an in-flow device picker (radio list of microphones/cameras); a red Leave button; keyboard shortcuts hint (⌘D mute, ⌘E camera). Dark in both themes.
 */
'use client';
import { ChevronUp, Hand, Mic, MicOff, MonitorUp, PhoneOff, Video, VideoOff } from 'lucide-react';
import { useEffect, useId, useState } from 'react';

const devices = { mic: ['MacBook Pro Microphone', 'AirPods Pro', 'Shure MV7'], cam: ['FaceTime HD Camera', 'Logitech Brio'] };

export function MediaDeviceToggles() {
  const uid = useId();
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);
  const [share, setShare] = useState(false);
  const [hand, setHand] = useState(false);
  const [picker, setPicker] = useState<'mic' | 'cam' | null>('mic');
  const [chosen, setChosen] = useState({ mic: 1, cam: 0 });
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (!mic || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setLevel(0); return; }
    let step = 0;
    const timer = window.setInterval(() => { step += 1; setLevel([2, 5, 3, 7, 4, 6, 1, 5][step % 8]); }, 140);
    return () => window.clearInterval(timer);
  }, [mic]);

  const round = (on: boolean, danger = false) => `grid size-12 place-items-center rounded-full transition ${on ? 'bg-white/10 text-white hover:bg-white/15' : danger ? 'bg-rose-500 text-white hover:bg-rose-400' : 'bg-white/10 text-white'}`;

  return (
    <div className="w-full max-w-lg rounded-3xl bg-zinc-950 p-4 text-white ring-1 ring-white/10">
      {picker && (
        <fieldset className="mb-3 rounded-2xl bg-zinc-900 p-3 ring-1 ring-white/10">
          <legend className="sr-only">{picker === 'mic' ? 'Microphone' : 'Camera'}</legend>
          <p className="px-1 text-xs font-semibold text-zinc-400">{picker === 'mic' ? 'Microphone' : 'Camera'}</p>
          {devices[picker].map((device, index) => <label key={device} className="mt-1 flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-white/5"><input type="radio" name={`${uid}-${picker}`} checked={chosen[picker] === index} onChange={() => setChosen((value) => ({ ...value, [picker]: index }))} className="accent-sky-400" />{device}</label>)}
        </fieldset>
      )}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <div className="flex items-center rounded-full bg-white/5 pr-1">
          <button type="button" aria-pressed={!mic} aria-label={mic ? 'Mute microphone' : 'Unmute microphone'} aria-keyshortcuts="Meta+D" onClick={() => setMic(!mic)} className={`relative ${round(mic, true)}`} style={mic ? { boxShadow: `0 0 0 ${level}px rgba(56,189,248,0.35)` } : undefined}>{mic ? <Mic aria-hidden className="size-5" /> : <MicOff aria-hidden className="size-5" />}</button>
          <button type="button" aria-label="Choose microphone" aria-expanded={picker === 'mic'} onClick={() => setPicker(picker === 'mic' ? null : 'mic')} className="grid size-7 place-items-center rounded-full text-zinc-400 hover:bg-white/10 hover:text-white"><ChevronUp aria-hidden className="size-4" /></button>
        </div>
        <div className="flex items-center rounded-full bg-white/5 pr-1">
          <button type="button" aria-pressed={!cam} aria-label={cam ? 'Turn camera off' : 'Turn camera on'} aria-keyshortcuts="Meta+E" onClick={() => setCam(!cam)} className={round(cam, true)}>{cam ? <Video aria-hidden className="size-5" /> : <VideoOff aria-hidden className="size-5" />}</button>
          <button type="button" aria-label="Choose camera" aria-expanded={picker === 'cam'} onClick={() => setPicker(picker === 'cam' ? null : 'cam')} className="grid size-7 place-items-center rounded-full text-zinc-400 hover:bg-white/10 hover:text-white"><ChevronUp aria-hidden className="size-4" /></button>
        </div>
        <button type="button" aria-pressed={share} aria-label="Share screen" onClick={() => setShare(!share)} className={`grid size-12 place-items-center rounded-full transition ${share ? 'bg-emerald-500 text-white' : 'bg-white/10 hover:bg-white/15'}`}><MonitorUp aria-hidden className="size-5" /></button>
        <button type="button" aria-pressed={hand} aria-label="Raise hand" onClick={() => setHand(!hand)} className={`grid size-12 place-items-center rounded-full transition ${hand ? 'bg-amber-400 text-zinc-900' : 'bg-white/10 hover:bg-white/15'}`}><Hand aria-hidden className={`size-5 ${hand ? 'motion-safe:animate-bounce' : ''}`} /></button>
        <button type="button" aria-label="Leave call" className="grid h-12 w-16 place-items-center rounded-full bg-rose-600 hover:bg-rose-500"><PhoneOff aria-hidden className="size-5" /></button>
      </div>
      <p className="mt-3 text-center text-[11px] text-zinc-500"><kbd className="font-mono">⌘D</kbd> mute · <kbd className="font-mono">⌘E</kbd> camera</p>
    </div>
  );
}
