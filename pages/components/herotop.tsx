import Image from 'next/image'
import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function Header() {
    // const ref = React.useRef(null)
	const heroRef = useRef<HTMLDivElement | null >(null)
	useEffect(() => {
		gsap.from(heroRef.current, {
			height: "0vh",
		})
		gsap.to(heroRef.current, {
			height: "80vh",
			duration: 3,
			ease: "Power3.easeOut"
		})
	})
    return (
        <div className="container">
            <div className="hero-area">
                <div className="catch1">
                    <h1>WEB<br />DEVLOPMENT</h1>
                    <p>Next.js & TypeScript & Newt</p>
                </div>
                <div ref={heroRef} className="hero">
                    <Image
                    src="/img/index-hero.webp"
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