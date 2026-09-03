export function formatHtml(html: string) {
  return html.trim().replace(/>\s*</g, '>\n<');
}
