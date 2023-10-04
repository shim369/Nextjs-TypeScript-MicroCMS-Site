import Link from 'next/link'
import { useForm } from 'react-hook-form'

type FormValues = {
	name: string
	email: string
	message: string
}

export default function Contact() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({ mode: 'onChange' })
	
	const onSubmit = handleSubmit(async (data) => {
		const formData = new FormData()
		Object.entries(data).forEach(([key, value]) => {
		  formData.append(key, value)
		})
	
		await fetch('https://shim.form.newt.so/v1/SE-pHf46E', {
		  method: 'POST',
		  body: formData,
		  headers: {
			Accept: 'application/json',
		  },
		})  
	})
	return (
	<section className="contact" id="a04">
		<h1>Contact</h1>
		<div data-aos="fade-up">
		<form onSubmit={onSubmit} className="form-box">
			<div className="form-item">
			<input id="name" placeholder="Name" autoComplete="name"
				{...register('name', { required: 'Name is required' })}
				aria-describedby="error-name-required"
			/>
			{errors?.name && (
			  <span id="error-name-required" aria-live="assertive">
				{errors.name.message}
			  </span>
			)}
			<input id="email" placeholder="Email" type="email" autoComplete="email"
				{...register('email', { required: 'Email is required' })}
				aria-describedby="error-email-required"
			/>
			{errors?.email && (
			  <span id="error-email-required" aria-live="assertive">
				{errors.email.message}
			  </span>
			)}
			<textarea id="message" placeholder="Message"
				{...register('message', { required: 'Message is required' })}
				aria-describedby="error-message-required"
			/>
			{errors?.message && (
			  <span id="error-message-required" aria-live="assertive">
				{errors.message.message}
			  </span>
			)}
			<button type="submit">Submit</button>
			</div>
		</form>
		</div>
		<div className="btn-area" data-aos="fade-up">
			<Link href="https://nuxtbase-gsap.vercel.app/" target="_blank" rel="noreferrer" className="btn-b">
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