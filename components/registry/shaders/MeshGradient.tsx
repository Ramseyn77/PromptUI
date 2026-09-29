/**
 * @registry
 * name: Mesh Gradient
 * category: Shaders
 * style: Gradient
 * tags: featured, recent
 * description: Degrade maille anime fait de plusieurs taches de couleur qui se deplacent lentement.
 * prompt: Create an animated mesh-gradient background: four radial-gradient color spots layered on one element with an oversized background-size and a slow background-position keyframe, plus a centered label. Softer palette in dark mode, reduced-motion safe.
 */
export function MeshGradient() {
  return (
    <>
      <style>{`@keyframes pui-mesh{0%,100%{background-position:0% 0%,100% 0%,100% 100%,0% 100%}50%{background-position:60% 30%,30% 60%,40% 20%,70% 80%}}`}</style>
      <div className="relative grid h-64 w-full max-w-xl place-items-center overflow-hidden rounded-3xl bg-[radial-gradient(at_20%_20%,#5eead4_0,transparent_45%),radial-gradient(at_80%_10%,#c4b5fd_0,transparent_45%),radial-gradient(at_80%_90%,#fcd34d_0,transparent_45%),radial-gradient(at_10%_90%,#f9a8d4_0,transparent_45%)] bg-white bg-[length:200%_200%] motion-safe:animate-[pui-mesh_14s_ease-in-out_infinite] dark:bg-[radial-gradient(at_20%_20%,#0f766e_0,transparent_45%),radial-gradient(at_80%_10%,#5b21b6_0,transparent_45%),radial-gradient(at_80%_90%,#b45309_0,transparent_45%),radial-gradient(at_10%_90%,#9d174d_0,transparent_45%)] dark:bg-zinc-950">
        <p className="rounded-full bg-white/60 px-4 py-2 text-sm font-semibold text-zinc-900 backdrop-blur dark:bg-black/30 dark:text-white">Mesh gradient</p>
      </div>
    </>
  );
}
