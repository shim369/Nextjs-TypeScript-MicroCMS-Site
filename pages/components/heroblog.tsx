import Image from 'next/image'
import { useEffect } from "react"
import { gsap } from "gsap"
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
        gsap.fromTo('.heroImage', {opacity: 0},{
            opacity: 1,
            duration: 1,
            ease: "power2.easeInOut",
        })
        gsap.fromTo('.catch1',{y: -30, opacity: 0,},{
            y: 0,
            opacity: 1,
            ease: "power2.easeInOut",
            delay: .8,
            duration: .5,
        })
	})
    return (
        <div className="hero-area">
            <div className="catch1">
                <h1>TECH BLOG</h1>
                <p>テックブログ</p>
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