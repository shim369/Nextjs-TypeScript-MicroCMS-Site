import Image from 'next/image'
import styles from '../../styles/Home.module.css'
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
	return (
			<header>
			<div className="header-inner">
				<div className="logo"><a href="./">NEXT<br />BASE</a></div>
				<nav>
					<ul>
						<li><a href="./#top">Home</a></li>
						<li><a href="./#a01">Profile</a></li>
						<li><a href="./#a02">Skills</a></li>
						<li><a href="./#a03">Blog</a></li>
						<li><a href="./#a04">Contact</a></li>
					</ul>
				</nav>
			</div>
			<div className="hero-area">
				<div className="catch1">
					<h1>WEB<br />DEVLOPMENT</h1>
					<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
				</div>
				<div className="hero">
					<Image
					src="/img/index-hero.jpg"
					alt="NEXT BASE"
					width={1300}
					height={500}
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
