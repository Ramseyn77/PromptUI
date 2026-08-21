import { CopyButton } from './CopyButton';

function tokenize(code: string) {
  const escaped = code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return escaped
    .replace(/("[^"\n]*"|'[^'\n]*')/g, '<span class="text-emerald-300">$1</span>')
    .replace(/\b(export|function|return|import|from|const|let|as)\b/g, '<span class="text-amber-300">$1</span>')
    .replace(/\b(className|aria-label|type|key)\b/g, '<span class="text-cyan-300">$1</span>');
}

export function CodeBlock({ code, componentSlug, componentName }: { code: string; componentSlug?: string; componentName?: string }) {
  return <div className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-white/10 bg-[#10100e] text-zinc-200 shadow-2xl shadow-black/10"><div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[.03] px-4 py-3"><span className="rounded-full bg-white/[.06] px-2.5 py-1 text-xs text-zinc-400">tsx</span><CopyButton value={code} label="Copier le code" analyticsType="code_copied" componentSlug={componentSlug} componentName={componentName}/></div><pre className="max-h-[560px] w-full max-w-full overflow-auto p-5 text-[13px] leading-6"><code dangerouslySetInnerHTML={{__html: tokenize(code)}}/></pre></div>;
}
