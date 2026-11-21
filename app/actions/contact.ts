'use server'

import nodemailer from 'nodemailer'

export type ContactState = {
  status: 'idle' | 'success' | 'invalid' | 'error'
  /** 送信後にフォームを初期化するためのキー */
  submittedAt?: number
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const verifyRecaptcha = async (secret: string, token: string) => {
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    body: new URLSearchParams({ secret, response: token }),
  })
  const result: { success: boolean; score?: number; action?: string; 'error-codes'?: string[] } = await res.json()
  const ok = result.success && result.action === 'submit' && (result.score ?? 0) >= 0.5
  if (!ok) console.warn(`reCAPTCHA verification failed: ${JSON.stringify(result)}`)
  return ok
}

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()
  const token = String(formData.get('token') ?? '')

  if (!name || !email || !message || !EMAIL_RE.test(email) || name.length > 200 || message.length > 5000) {
    return { status: 'invalid' }
  }

  const { RECAPTCHA_SECRET_KEY, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env

  if (!SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
    const missing = ['SMTP_USER', 'SMTP_PASS', 'CONTACT_TO_EMAIL'].filter((k) => !process.env[k])
    console.error(`Missing env: ${missing.join(', ')}`)
    return { status: 'error' }
  }

  if (RECAPTCHA_SECRET_KEY) {
    if (!token) console.warn('reCAPTCHA token is missing')
    if (!token || !(await verifyRecaptcha(RECAPTCHA_SECRET_KEY, token))) return { status: 'error' }
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
    return { status: 'error' }
  }

  return { status: 'success', submittedAt: Date.now() }
}
