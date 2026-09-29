const fields = [
  { id: 'fl-email', label: 'Email address', type: 'email', hint: 'We never share it.' },
  { id: 'fl-workspace', label: 'Workspace name', type: 'text', hint: 'You can change it later.' },
];

export function FloatingLabelInput() {
  return (
    <form className="grid w-full max-w-sm gap-4" onSubmit={(event) => event.preventDefault()}>
      {fields.map((field) => (
        <div key={field.id}>
          <div className="relative">
            {/* placeholder=" " lets :placeholder-shown tell us whether the field is empty. */}
            <input
              id={field.id}
              type={field.type}
              placeholder=" "
              aria-describedby={`${field.id}-hint`}
              className="peer h-14 w-full rounded-2xl border border-zinc-300 bg-white px-4 pt-5 text-sm text-zinc-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-teal-400"
            />
            <label
              htmlFor={field.id}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500 transition-all peer-focus:top-4 peer-focus:text-xs peer-focus:text-teal-700 peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:text-xs dark:text-zinc-400 dark:peer-focus:text-teal-400"
            >
              {field.label}
            </label>
          </div>
          <p id={`${field.id}-hint`} className="mt-1.5 pl-1 text-xs text-zinc-500 dark:text-zinc-400">{field.hint}</p>
        </div>
      ))}
    </form>
  );
}
