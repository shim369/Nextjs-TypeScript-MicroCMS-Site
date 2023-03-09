import Image from 'next/image'
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
			<header>
			<div className="header-inner">
				<div className="logo"><Link href="/">NEXT<br />BASE</Link></div>
				<nav className="pc-nav">
					<ul className="header-lists">
						<li><Link href="/#a01">Profile</Link></li>
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
			<div className="hero-area">
				<div className="catch1">
					<h1>WEB<br />DEVLOPMENT</h1>
					<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
				</div>
				<div className="hero">
					<Image
					src="/img/index-hero.webp"
					alt="NEXT BASE"
					width={1135}
					height={550}
					priority={true}
					/>
				</div>
				<div className="catch2">
					<h2>Lorem ipsum dolor sit.</h2>
					<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, hic!Lorem ipsum dolor sit amet consectetur.</p>
				</div>
			</div>
		</header>
	)
}
