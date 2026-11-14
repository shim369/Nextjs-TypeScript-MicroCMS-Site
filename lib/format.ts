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

/** microCMS の画像APIで WebP・指定幅に変換 */
export const cmsImage = (url: string, width: number) => `${url}?fm=webp&w=${width}&q=80`
