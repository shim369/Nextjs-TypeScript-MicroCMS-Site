import { createHmac, timingSafeEqual } from 'node:crypto'
import { revalidateTag } from 'next/cache'
import { BLOG_TAG } from '@/lib/microcms'

/**
 * microCMS の Webhook（コンテンツ公開・更新・削除）で記事キャッシュを即時に無効化する。
 * microCMS 管理画面 > API設定 > Webhook > カスタム通知 に
 *   URL: https://<your-domain>/api/revalidate
 *   シークレット: MICROCMS_WEBHOOK_SECRET と同じ値
 * を設定する。
 */
export async function POST(request: Request) {
  const secret = process.env.MICROCMS_WEBHOOK_SECRET
  if (!secret) return Response.json({ error: 'Webhook is not configured' }, { status: 501 })

  const body = await request.text()
  const signature = request.headers.get('x-microcms-signature') ?? ''
  const expected = createHmac('sha256', secret).update(body).digest('hex')
  const valid =
    signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  if (!valid) return Response.json({ error: 'Invalid signature' }, { status: 401 })

  let id: string | undefined
  try {
    id = (JSON.parse(body) as { id?: string }).id
  } catch {
    // body が JSON でなくても一覧は更新する
  }

  revalidateTag(BLOG_TAG, { expire: 0 })
  if (id) revalidateTag(`${BLOG_TAG}:${id}`, { expire: 0 })

  return Response.json({ revalidated: true, id: id ?? null })
}
