/**
 * @registry
 * name: Polaroid Testimonials
 * category: Testimonials
 * style: Minimal
 * tags: featured, recent
 * description: Témoignages en polaroïds éparpillés et inclinés, punaisés au mur ; survol ou focus redresse et agrandit la photo choisie.
 * prompt: Create a polaroid testimonials wall: four polaroid cards scattered with fixed rotations (−6°, 4°, −2°, 7°) and slight offsets, each with a colored "photo" area showing the person's initials, a handwritten-style caption quote and the name; a pin at the top; hovering or focusing a card straightens it, scales it up and brings it to the front with a shadow; on mobile they stack in a 2-column grid with smaller rotations. Light and dark mode.
 */
const items = [
  { name: 'Kofi, Accra', quote: 'Finally a tool my whole family can use.', tone: 'from-amber-200 to-orange-300', rotate: -6, y: 0 },
  { name: 'Inès, Lyon', quote: 'Set up our shop in one evening.', tone: 'from-sky-200 to-indigo-300', rotate: 4, y: 18 },
  { name: 'Ravi, Pune', quote: 'Support replied in four minutes. Four!', tone: 'from-emerald-200 to-teal-300', rotate: -2, y: -6 },
  { name: 'Lena, Berlin', quote: 'It just feels calm to use.', tone: 'from-rose-200 to-fuchsia-300', rotate: 7, y: 12 },
];

export function PolaroidTestimonials() {
  return (
    <section className="w-full bg-[#efe9df] px-6 py-12 dark:bg-zinc-900">
      <h3 className="text-center font-serif text-3xl text-zinc-900 dark:text-white">Notes from our customers</h3>
      <ul className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
        {items.map((item) => (
          <li key={item.name} className="flex justify-center" style={{ transform: `translateY(${item.y}px)` }}>
            <figure tabIndex={0} className="relative w-full max-w-[12rem] bg-white p-3 pb-4 shadow-md outline-none transition duration-300 hover:z-10 hover:!rotate-0 hover:scale-110 hover:shadow-2xl focus-visible:z-10 focus-visible:!rotate-0 focus-visible:scale-110 focus-visible:ring-2 focus-visible:ring-zinc-900 motion-reduce:transition-none dark:bg-zinc-100" style={{ rotate: `${item.rotate}deg` }}>
              <span aria-hidden className="absolute -top-2 left-1/2 size-4 -translate-x-1/2 rounded-full bg-rose-500 shadow ring-2 ring-rose-700/30" />
              <div aria-hidden className={`grid aspect-square place-items-center bg-gradient-to-br text-3xl font-bold text-white/90 ${item.tone}`}>{item.name[0]}</div>
              <blockquote className="mt-3 font-[cursive] text-sm leading-snug text-zinc-800">“{item.quote}”</blockquote>
              <figcaption className="mt-1 text-xs text-zinc-500">— {item.name}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
