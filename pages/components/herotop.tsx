import Image from 'next/image'
import { useEffect } from "react"
import { gsap } from "gsap"
export default function Header() {
	useEffect(() => {
        gsap.fromTo('.hero', {height: "0vh"},{
            height: "80vh",
            ease: "power2.easeInOut",
            duration: .8,
        })
        gsap.fromTo('.catch1',{x: -50, opacity: 0,},{
            x: 0,
            opacity: 1,
            ease: "power2.easeInOut",
            delay: .8,
            duration: .8,
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