'use client'

import { useActionState, useState, useTransition, type FormEvent } from 'react'
import SplitText from './SplitText'
import { ArrowRight } from './Icons'
import { sendContact, type ContactState } from '@/app/actions/contact'

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void
      execute: (key: string, opts: { action: string }) => Promise<string>
    }
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

const MESSAGES = {
  idle: '',
  sending: '送信しています…',
  success: '送信ありがとうございます。内容を確認のうえ、折り返しご連絡いたします。',
  invalid: '未入力の項目、またはメールアドレスの形式をご確認ください。',
  error: '送信に失敗しました。お手数ですが、時間をおいて再度お試しください。',
} as const

/** reCAPTCHA v3 のスクリプトを送信時に読み込んでトークンを取得 */
const getRecaptchaToken = (): Promise<string> => {
  if (!SITE_KEY) return Promise.resolve('')
  return new Promise((resolve) => {
    const run = () =>
      window.grecaptcha!.ready(() =>
        window
          .grecaptcha!.execute(SITE_KEY, { action: 'submit' })
          .then(resolve)
          .catch(() => resolve(''))
      )
    if (window.grecaptcha) return run()
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`
    script.onload = run
    script.onerror = () => resolve('')
    document.head.appendChild(script)
  })
}

const initialState: ContactState = { status: 'idle' }

/** id はトップページのみ付与（ナビの #contact の飛び先） */
export default function Contact({ id }: { id?: string }) {
  const [state, formAction, pending] = useActionState(sendContact, initialState)
  const [clientInvalid, setClientInvalid] = useState(false)
  const [preparing, startTransition] = useTransition()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      setClientInvalid(true)
      form.querySelector<HTMLElement>(':invalid')?.focus()
      return
    }
    setClientInvalid(false)
    const data = new FormData(form)
    startTransition(async () => {
      data.set('token', await getRecaptchaToken())
      // await の後は transition の外になるため、もう一度包んでから dispatch する
      startTransition(() => formAction(data))
    })
  }

  const busy = pending || preparing
  const status = busy ? 'sending' : clientInvalid ? 'invalid' : state.status
  const isWarn = status === 'invalid' || status === 'error'

  return (
    <section className="section contact" id={id}>
      <div className="container">
        <div className="sec-head">
          {id && <span className="sec-head__num">04</span>}
          <SplitText as="h2" className="sec-head__title" text="Contact" />
          <p className="sec-head__lead" data-reveal>
            制作のご依頼・ご相談はこちらからお気軽にどうぞ。
          </p>
        </div>
        <div className="contact__box" data-reveal>
          {/* 送信成功時に key を変えて入力内容をリセット */}
          <form key={state.submittedAt ?? 0} className="form" onSubmit={onSubmit} noValidate>
            <div className="form__row">
              <div className="field">
                <input type="text" id={`${id ?? 'c'}-name`} name="name" placeholder=" " required autoComplete="name" />
                <label htmlFor={`${id ?? 'c'}-name`}>
                  Name<span className="field__req">*</span>
                </label>
              </div>
              <div className="field">
                <input
                  type="email"
                  id={`${id ?? 'c'}-email`}
                  name="email"
                  placeholder=" "
                  required
                  autoComplete="email"
                />
                <label htmlFor={`${id ?? 'c'}-email`}>
                  Email<span className="field__req">*</span>
                </label>
              </div>
            </div>
            <div className="field">
              <textarea id={`${id ?? 'c'}-message`} name="message" placeholder=" " required />
              <label htmlFor={`${id ?? 'c'}-message`}>
                Message<span className="field__req">*</span>
              </label>
            </div>
            <div className="form__foot">
              <button type="submit" className="btn btn--fill" disabled={busy}>
                {busy ? 'Sending' : 'Submit'}
                <ArrowRight />
              </button>
              <p className={`form__msg${isWarn ? ' is-warn' : ''}`} role="status" aria-live="polite">
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
