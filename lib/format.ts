/** 2023-09-17T04:36:22.810Z → 2023.09.17（日本時間） */
export const formatDate = (iso?: string | null) => {
  if (!iso) return ''
  const parts = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date(iso))
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  return `${get('year')}.${get('month')}.${get('day')}`
}

/** HTML からタグを除いたプレーンテキスト */
export const toPlainText = (html: string) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

/** 日本語 500 文字/分を目安にした読了時間（分） */
export const readingMinutes = (html: string) => Math.max(1, Math.round(toPlainText(html).length / 500))
