import '../styles/css/style.css'
import type { AppProps } from 'next/app'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import 'aos/dist/aos.css'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<GoogleReCaptchaProvider reCaptchaKey="6Lc7CnUoAAAAAIxuMWwlknDHuVusZpiTB-ezUBua" language="ja">
			<Component {...pageProps} />
		</GoogleReCaptchaProvider>
	)
}
