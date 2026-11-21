const decode = (s: string) =>
  s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')

export type TocItem = { id: string; text: string }

/**
 * 本文の h2 に id を振り、目次を作る。
 * microCMS のリッチエディタは h2 に id を付けるが、無い場合も補う。
 */
export const buildToc = (html: string): { html: string; toc: TocItem[] } => {
  const toc: TocItem[] = []
  const out = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (_m, attrs: string, inner: string) => {
    const existing = attrs.match(/\sid="([^"]+)"/)?.[1]
    const id = existing ?? `section-${toc.length + 1}`
    toc.push({ id, text: decode(inner.replace(/<[^>]+>/g, '')).trim() })
    return `<h2${existing ? attrs : `${attrs} id="${id}"`}>${inner}</h2>`
  })
  return { html: out, toc }
}
