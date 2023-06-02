import Image from 'next/image'
import { useEffect } from "react"
import { gsap } from "gsap"
export default function Header() {
	useEffect(() => {
        gsap.fromTo('.heroImage', {height: "0%"},{
            height: "100%",
            ease: "power3.inOut",
            duration: .6,
        })
        gsap.fromTo('.catch1',{y: -50, opacity: 0,},{
            y: 0,
            opacity: 1,
            ease: "power3.inOut",
            delay: .6,
            duration: 1,
        })
	})
    return (
        <div className="hero-area">
            <div className="catch1">
                <h1>WEB<br />DEVLOPMENT</h1>
                <p>Next.js & TypeScript & Newt</p>
            </div>
            <div className="hero">
                <Image
                src="/img/index-hero.webp"
                alt="NEXT BASE"
                width={1135}
                height={550}
                priority={true}
                className="heroImage"
                />
            </div>
            <div className="catch2">
                <h2>制作依頼について</h2>
                <p>Contactから制作のご依頼を受け付けておりますので、詳細はお問い合わせください。</p>
            </div>
        </div>
    )
}