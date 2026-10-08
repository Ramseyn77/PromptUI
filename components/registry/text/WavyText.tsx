/**
 * @registry
 * name: Wavy Text
 * category: Text
 * style: Gradient
 * tags: recent
 * description: Titre dont chaque lettre ondule en vague continue, avec dégradé animé et accessible (texte complet pour lecteurs d'écran).
 * prompt: Create a wavy text headline: each letter is an inline-block span animated with a translateY sine-like keyframe and a staggered animation-delay so a wave travels through the word; the letters share a moving gradient fill; spaces are preserved; the visual letters are aria-hidden with the full string in an sr-only span; static with reduced motion; a "Replay"-free continuous effect. Light and dark mode.
 */
export function WavyText({ text = 'Ride the wave' }: { text?: string }) {
  return (
    <h2 className="text-center text-5xl font-black tracking-tight sm:text-6xl">
      <style>{`
        @keyframes pui-wavy { 0%, 100% { transform: translateY(0) } 25% { transform: translateY(-0.18em) } 75% { transform: translateY(0.12em) } }
        @keyframes pui-wavy-hue { to { background-position: 200% 0 } }
      `}</style>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.split('').map((char, index) => (
          <span key={index} className="inline-block bg-[linear-gradient(90deg,#06b6d4,#8b5cf6,#ec4899,#06b6d4)] bg-[length:200%_100%] bg-clip-text text-transparent motion-safe:animate-[pui-wavy_1.6s_ease-in-out_infinite,pui-wavy-hue_4s_linear_infinite]" style={{ animationDelay: `${index * 0.08}s, 0s` }}>
            {char === ' ' ? ' ' : char}
          </span>
        ))}
      </span>
    </h2>
  );
}
