import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";


export default function Header() {
	const title = "Vercel deploy test"
	const ref = React.useRef(null)
	const heroRef = useRef<HTMLDivElement | null >(null)
	const textRef = useRef<HTMLDivElement | null >(null)
	useEffect(() => {
		gsap.to(ref.current, {
			backgroundImage: "linear-gradient(to left, #30CFD0, #330867)",
			duration: 3,
		})
		gsap.from(heroRef.current, {
			height: "0%",
			width: "100%",
		})
		gsap.to(heroRef.current, {
			height: "90%",
			width: "80%",
			duration: 2,
			ease: "Power3.easeOut"
		})
		gsap.from(textRef.current, {
			opacity: 0,
			color: "transparent",
		})
		gsap.to(textRef.current, {
			opacity: 1,
			color: "#fde804",
			duration: 3,
		})
	})
	return (
		<>
			<header ref={ref} className={styles.header}>
			<nav className={styles.nav}>
				<h2 className={styles.logo}><a href="./">{ title }</a></h2>
				<ul className={styles.menu}>
					<li><a href="">PYTHON</a></li>
					<li><a href="">JS</a></li>
					<li><a href="">TOOL</a></li>
				</ul>
			</nav>
			<section className={styles.section}>
				<div ref={heroRef} className={styles.hero}>
					<Image src="/images/3.jpg" alt="" width={800} height={500} />
					<h1 ref={textRef} className={styles.headline}>WEB DEVELOPMENT <br />AND LIFE BLOG</h1>
				</div>
			</section>
			</header>
			<div className={styles.slider}></div>
		</>
	)
}
