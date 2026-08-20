import { CopyButton } from './CopyButton';

function tokenize(code: string) {
  const escaped = code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return escaped
    .replace(/("[^"\n]*"|'[^'\n]*')/g, '<span class="text-emerald-300">$1</span>')
    .replace(/\b(export|function|return|import|from|const|let|as)\b/g, '<span class="text-amber-300">$1</span>')
    .replace(/\b(className|aria-label|type|key)\b/g, '<span class="text-cyan-300">$1</span>');
}

export function CodeBlock({ code }: { code: string }) {
  return <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#10100e] text-zinc-200 shadow-2xl shadow-black/10"><div className="flex items-center justify-between border-b border-white/10 bg-white/[.03] px-4 py-3"><span className="rounded-full bg-white/[.06] px-2.5 py-1 text-xs text-zinc-400">tsx</span><CopyButton value={code} label="Copier le code"/></div><pre className="max-h-[560px] overflow-auto p-5 text-[13px] leading-6"><code dangerouslySetInnerHTML={{__html: tokenize(code)}}/></pre></div>;
}
