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