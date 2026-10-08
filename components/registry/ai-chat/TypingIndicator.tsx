/**
 * @registry
 * name: Typing Indicator
 * category: AI Chat
 * style: Minimal
 * tags: recent
 * description: Bulle de chat avec trois points qui rebondissent pendant que l'assistant réfléchit.
 * prompt: Create a chat typing indicator: an assistant avatar and a bubble with three dots bouncing in sequence (staggered keyframe delays), role="status" with sr-only "Assistant is typing". Include a variant row with "Thinking…" shimmer text. Light and dark mode.
 */
export function TypingIndicator() {
  return (
    <>
      <style>{`@keyframes pui-dot{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-5px);opacity:1}}@keyframes pui-shine{to{background-position:-200% 0}}`}</style>
      <div className="flex w-full max-w-sm flex-col gap-4">
        <div role="status" className="flex items-end gap-2">
          <span className="size-8 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-teal-400" />
          <div className="flex gap-1 rounded-2xl rounded-bl-md bg-zinc-100 px-4 py-3.5 dark:bg-zinc-800">
            {[0, 1, 2].map((dot) => <span key={dot} className="size-2 rounded-full bg-zinc-500 motion-safe:animate-[pui-dot_1.2s_ease-in-out_infinite] dark:bg-zinc-300" style={{ animationDelay: `${dot * 0.15}s` }} />)}
          </div>
          <span className="sr-only">Assistant is typing</span>
        </div>
        <p className="w-fit bg-[linear-gradient(90deg,#71717a_40%,#e4e4e7_50%,#71717a_60%)] bg-[length:200%_100%] bg-clip-text text-sm font-medium text-transparent motion-safe:animate-[pui-shine_1.8s_linear_infinite] dark:bg-[linear-gradient(90deg,#a1a1aa_40%,#fafafa_50%,#a1a1aa_60%)]">
          Thinking…
        </p>
      </div>
    </>
  );
}
