import { FormEvent, useState } from 'react'
import SplitText from './SplitText'
import { ArrowRight } from './Icons'

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void
      execute: (key: string, opts: { action: string }) => Promise<string>
    }
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

type Status = 'idle' | 'sending' | 'success' | 'invalid' | 'error'

const MESSAGES: Record<Status, string> = {
  idle: '',
  sending: '送信しています…',
  success: '送信ありがとうございます。内容を確認のうえ、折り返しご連絡いたします。',
  invalid: '未入力の項目、またはメールアドレスの形式をご確認ください。',
  error: '送信に失敗しました。お手数ですが、時間をおいて再度お試しください。',
}

/** reCAPTCHA v3 のスクリプトを送信時に読み込んでトークンを取得 */
const getRecaptchaToken = (): Promise<string | undefined> => {
  if (!SITE_KEY) return Promise.resolve(undefined)
  return new Promise((resolve) => {
    const run = () =>
      window.grecaptcha!.ready(() =>
        window
          .grecaptcha!.execute(SITE_KEY, { action: 'submit' })
          .then(resolve)
          .catch(() => resolve(undefined)),
      )
    if (window.grecaptcha) return run()
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`
    script.onload = run
    script.onerror = () => resolve(undefined)
    document.head.appendChild(script)
  })
}

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      setStatus('invalid')
      form.querySelector<HTMLElement>(':invalid')?.focus()
      return
    }

    const data = new FormData(form)
    const values = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
    }

    setStatus('sending')
    try {
      const googleReCaptchaToken = await getRecaptchaToken()
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, googleReCaptchaToken }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const isWarn = status === 'invalid' || status === 'error'

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="sec-head">
          <span className="sec-head__num">04</span>
          <SplitText as="h2" className="sec-head__title" text="Contact" />
          <p className="sec-head__lead" data-reveal>
            制作のご依頼・ご相談はこちらからお気軽にどうぞ。
          </p>
        </div>
        <div className="contact__box" data-reveal>
          <form className="form" onSubmit={onSubmit} noValidate>
            <div className="form__row">
              <div className="field">
                <input type="text" id="name" name="name" placeholder=" " required autoComplete="name" />
                <label htmlFor="name">
                  Name<span className="req">*</span>
                </label>
              </div>
              <div className="field">
                <input type="email" id="email" name="email" placeholder=" " required autoComplete="email" />
                <label htmlFor="email">
                  Email<span className="req">*</span>
                </label>
              </div>
            </div>
            <div className="field">
              <textarea id="message" name="message" placeholder=" " required />
              <label htmlFor="message">
                Message<span className="req">*</span>
              </label>
            </div>
            <div className="form__foot">
              <button type="submit" className="btn btn--fill" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending' : 'Submit'}
                <ArrowRight />
              </button>
              <p
                className="form__msg"
                role="status"
                aria-live="polite"
                style={isWarn ? { color: 'var(--orange)' } : undefined}
              >
                {MESSAGES[status]}
              </p>
              {SITE_KEY && (
                <p className="form__note">
                  This site is protected by reCAPTCHA and the Google
                  <br />
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
                    Terms of Service
                  </a>{' '}
                  apply.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
