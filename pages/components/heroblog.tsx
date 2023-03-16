import Image from 'next/image'
import { Montserrat } from '@next/font/google'
const montserrat = Montserrat({
  subsets: ['latin'] 
})

export default function Header() {
    return (
        <div className="container">
            <div className="hero-area">
                <div className="catch1">
                    <h1 className={montserrat.className}>Tech Blog</h1>
                    <p>技術について記録するブログ</p>
                </div>
                <div className="hero">
                    <Image
                    src="/img/detail-hero.webp"
                    alt="NEXT BASE"
                    width={1135}
                    height={550}
                    priority={true}
                    />
                </div>
                <div className="catch2">
                    <h2>制作依頼について</h2>
                    <p>Contactから制作のご依頼を受け付けておりますので、詳細はお問い合わせください。</p>
                </div>
            </div>
        </div>
    )
}