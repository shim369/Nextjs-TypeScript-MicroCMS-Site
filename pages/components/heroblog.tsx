import Image from 'next/image'
import { useEffect } from "react"
import { gsap } from "gsap"
export default function Header() {
	useEffect(() => {
        gsap.fromTo('.heroImage', {width: "0%"},{
            width: "100%",
            ease: "power3.ease",
            duration: 1.2,
        })
        gsap.fromTo('.catch1',{y: -50, opacity: 0,},{
            y: 0,
            opacity: 1,
            ease: "power3.inOut",
            delay: .5,
            duration: 1.5,
        })
	})
    return (
        <div className="container">
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
        </div>
    )
}