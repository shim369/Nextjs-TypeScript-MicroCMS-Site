import Link from 'next/link'

export default function Contact() {
  return (
        <section className="contact" id="a04">
          <h1>Contact</h1>
          <div data-aos="fade-up">
            <p>お問い合わせから遅くても数日以内には返信させていただきます。</p>
            <p>ヘッドレスCMS「Newt」のお問い合わせ機能を利用しています。</p>
            <form className="form-box" action="https://shim.form.newt.so/v1/vUf_6rML6" method="post">
              <div className="form-item">
                <input id="name" placeholder="Name" name="name" autoComplete="name" required />
                <input id="email" name="email" placeholder="Email" type="email" autoComplete="email" required />
                <textarea id="message" name="message" placeholder="Message" required></textarea>
                <button type="submit">Submit</button>
              </div>
            </form>
					</div>
					<div className="btn-area" data-aos="fade-up">
						<Link href="https://nuxtbase.vercel.app/" target="_blank" rel="noreferrer" className="btn-b">
							<div className="link-name">
								<span>NUXT BASE</span>
							</div>
						</Link>
						<Link href="https://astrobase.vercel.app/" target="_blank" rel="noreferrer" className="btn-b">
							<div className="link-name">
								<span>ASTRO BASE</span>
							</div>
						</Link>
					</div>
					<div className="contact-logo">
						NEXT BASE
					</div>
					<p className="contact-catch">Next.js & TypeScript & Newt</p>
			  </section>
  )
}