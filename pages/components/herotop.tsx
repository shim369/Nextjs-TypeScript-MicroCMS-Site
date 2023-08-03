import Image from 'next/image'
import { useEffect } from "react"
import { gsap } from "gsap"
import Link from 'next/link'
export default function Header() {
	useEffect(() => {
        gsap.fromTo('.logo', {opacity: 0},{
            opacity: 1,
            duration: .5,
            ease: "power2.easeInOut",
        })
        gsap.fromTo('.pc-nav', {opacity: 0},{
            opacity: 1,
            duration: .5,
            ease: "power2.easeInOut",
        })
        gsap.fromTo('.sp-nav-btn', {opacity: 0},{
            opacity: 1,
            duration: .5,
            ease: "power2.easeInOut",
        })
        gsap.fromTo('.catch2', {opacity: 0},{
            opacity: 1,
            duration: .5,
            ease: "power2.easeInOut",
        })
        gsap.fromTo('.catch1',{y: -30, opacity: 0,},{
            y: 0,
            opacity: 1,
            ease: "power2.easeInOut",
            delay: .5,
            duration: .5,
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
                <h2><Link href="#a04">制作依頼について</Link></h2>
                <p>Contactから制作のご依頼を受け付けておりますので、詳細はお問い合わせください。</p>
            </div>
        </div>
    )
}