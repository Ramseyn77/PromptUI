function escapeHtml(source: string) {
  return source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function highlightHtml(source: string) {
  const escaped = escapeHtml(source);

  return escaped.replace(/(&lt;\/?)([a-zA-Z][\w:-]*)([^&]*?)(\/?&gt;)/g, (_match, open, tag, attrs, close) => {
    const coloredAttrs = attrs.replace(
      /([\w:-]+)(=)("[^"]*"|'[^']*')/g,
      (_attrMatch: string, name: string, eq: string, value: string) =>
        `<span class="text-sky-400">${name}</span><span class="text-zinc-500">${eq}</span><span class="text-emerald-400">${value}</span>`,
    );
    return `<span class="text-zinc-500">${open}</span><span class="text-rose-400">${tag}</span>${coloredAttrs}<span class="text-zinc-500">${close}</span>`;
  });
}
