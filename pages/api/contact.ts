import nodemailer from 'nodemailer'
import type { NextApiRequest, NextApiResponse } from 'next'

type ContactBody = {
  name?: string
  email?: string
  message?: string
  googleReCaptchaToken?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const verifyRecaptcha = async (secret: string, token: string) => {
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    body: new URLSearchParams({ secret, response: token }),
  })
  const result: {
    success: boolean
    score?: number
    action?: string
    hostname?: string
    'error-codes'?: string[]
  } = await res.json()
  const ok = result.success && result.action === 'submit' && (result.score ?? 0) >= 0.5
  if (!ok) console.warn(`reCAPTCHA verification failed: ${JSON.stringify(result)}`)
  return ok
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const body: ContactBody = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body ?? {})
  const name = body.name?.trim()
  const email = body.email?.trim()
  const message = body.message?.trim()

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  if (!EMAIL_RE.test(email) || name.length > 200 || message.length > 5000) {
    return res.status(400).json({ error: 'Invalid input' })
  }

  const { RECAPTCHA_SECRET_KEY, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env

  if (!SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
    const missing = ['SMTP_USER', 'SMTP_PASS', 'CONTACT_TO_EMAIL'].filter((k) => !process.env[k])
    console.error(`Missing env: ${missing.join(', ')}`)
    return res.status(500).json({ error: 'Mail is not configured' })
  }

  if (RECAPTCHA_SECRET_KEY) {
    const token = body.googleReCaptchaToken
    if (!token) console.warn('reCAPTCHA token is missing')
    if (!token || !(await verifyRecaptcha(RECAPTCHA_SECRET_KEY, token))) {
      return res.status(403).json({ error: 'reCAPTCHA verification failed' })
    }
  }

  const port = Number(SMTP_PORT || '465')
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST || 'smtp.gmail.com',
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  try {
    await transporter.sendMail({
      from: SMTP_USER,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `【NEXT BASE】お問い合わせ: ${name.replace(/[\r\n]/g, ' ')}`,
      text: `お名前: ${name}\nメールアドレス: ${email}\n\nメッセージ:\n${message}`,
    })
  } catch (err) {
    console.error('Failed to send contact mail', err)
    return res.status(500).json({ error: 'Failed to send mail' })
  }

  return res.status(200).json({ ok: true })
}
