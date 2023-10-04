import '../styles/css/style.css'
import type { AppProps } from 'next/app'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import 'aos/dist/aos.css'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<GoogleReCaptchaProvider reCaptchaKey="reCAPTCHA_site_key" language="ja">
			<Component {...pageProps} />
		</GoogleReCaptchaProvider>
	)
}
