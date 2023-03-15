import Link from 'next/link'
import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Inter } from '@next/font/google'
const inter = Inter({ 
	variable: "--inter-font",
	subsets: ['latin'] 
})
export default function Header() {
	// const title = "Vercel deploy test"
	// const ref = React.useRef(null)
	// const heroRef = useRef<HTMLDivElement | null >(null)
	// const textRef = useRef<HTMLDivElement | null >(null)
	// useEffect(() => {
	// 	gsap.to(ref.current, {
	// 		backgroundImage: "linear-gradient(to left, #30CFD0, #330867)",
	// 		duration: 3,
	// 	})
	// 	gsap.from(heroRef.current, {
	// 		height: "0%",
	// 		width: "100%",
	// 	})
	// 	gsap.to(heroRef.current, {
	// 		height: "90%",
	// 		width: "80%",
	// 		duration: 2,
	// 		ease: "Power3.easeOut"
	// 	})
	// 	gsap.from(textRef.current, {
	// 		opacity: 0,
	// 		color: "transparent",
	// 	})
	// 	gsap.to(textRef.current, {
	// 		opacity: 1,
	// 		color: "#fde804",
	// 		duration: 3,
	// 	})
	// })

	let headerInner: HTMLElement
	let nav: HTMLElement
	let spNav: HTMLElement
	let body: HTMLElement
	let menuBtn: HTMLElement
	
	useEffect(() => {
		headerInner = document.querySelector(".header-inner")!;
		window.addEventListener("scroll", () => {
			if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
				headerInner.classList.add("active");
			} else {
				headerInner.classList.remove("active");
			}
		})

		nav = document.querySelector('.header-lists')!;
		spNav = document.querySelector('.sp-nav')!;
		spNav.appendChild(nav.cloneNode(true));

		body = document.querySelector('body')!;
		menuBtn = document.querySelector('.sp-nav-btn')!;
		menuBtn.addEventListener('click', () => {
			body.classList.toggle('side-open');
		})
	})
	return (
		<>
		<header>
			<div className="header-inner">
				<div className="logo"><Link href="/">NEXT<br />BASE</Link></div>
				<nav className="pc-nav">
					<ul className="header-lists">
						<li><Link href="/#a01">About</Link></li>
						<li><Link href="/#a02">Skills</Link></li>
						<li><Link href="/#a03">Blog</Link></li>
						<li><Link href="/#a04">Contact</Link></li>
					</ul>
				</nav>
				<div className="sp-nav-area">
					<div className="sp-nav-btn">
						<span className="material-icons menu-icon">menu</span>
						<span className="material-icons close-icon">close</span>
					</div>
					<nav className="sp-nav">
					</nav>
				</div>
			</div>
		</header>
		</>
	)
}
