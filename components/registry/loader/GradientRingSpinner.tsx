/**
 * @registry
 * name: Gradient Ring Spinner
 * category: Loader
 * style: Gradient
 * tags: featured, recent
 * description: Anneau en degrade conique qui tourne, masque au centre, en trois tailles.
 * prompt: Create a spinner ring using a conic-gradient (transparent to teal to violet) masked into a ring with a radial-gradient mask, rotating infinitely; show small/medium/large sizes. role="status" with sr-only "Loading". Works on light and dark, reduced-motion slows it down.
 */
export function GradientRingSpinner() {
  return (
    <>
      <style>{`@keyframes pui-ring-spin{to{transform:rotate(360deg)}}@media (prefers-reduced-motion:reduce){.pui-ring{animation-duration:3s!important}}`}</style>
      <div role="status" className="flex items-center gap-6">
        {['size-6', 'size-10', 'size-14'].map((size) => (
          <span key={size} aria-hidden className={`pui-ring ${size} rounded-full bg-[conic-gradient(from_0deg,transparent_0%,#14b8a6_60%,#8b5cf6_100%)] [mask:radial-gradient(farthest-side,transparent_calc(100%-4px),#000_calc(100%-3px))] animate-[pui-ring-spin_.9s_linear_infinite]`} />
        ))}
        <span className="sr-only">Loading</span>
      </div>
    </>
  );
}
