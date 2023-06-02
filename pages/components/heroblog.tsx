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
                <h1>TECH BLOG</h1>
                <p>技術について記録するブログ</p>
            </div>
            <div className="hero">
                <Image
                src="/img/detail-hero.webp"
                alt="NEXT BASE"
                width={1135}
                height={550}
                priority={true}
                className="heroImage"
                />
            </div>
        </div>
    )
}