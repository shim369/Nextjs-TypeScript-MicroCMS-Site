import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";


export default function Header() {
	const title = "Vercel deploy test"
	const ref = React.useRef(null);
	useEffect(() => {
	  gsap.to(ref.current, {
		backgroundImage: "linear-gradient(to left, #30CFD0, #330867)",
		duration: 8,
		repeat: -1,
		ease: "power4.easeInOut"
	  });
	}, [ref]);
	return (
		<>
			<header ref={ref} className={styles.header}>
			<nav className={styles.nav}>
				<h2 className={styles.logo}><a href="./">{ title }</a></h2>
				<ul className={styles.menu}>
					<li><a href="">PYTHON</a></li>
					<li><a href="">JS</a></li>
					<li><a href="">TOOL</a></li>
					<li><a href="./about">ABOUT</a></li>
				</ul>
			</nav>
			<section className={styles.section}>
				<div className={styles.hero}>
					<Image src="/images/3.jpg" alt="" width={800} height={500} />
					<h1 className={styles.headline}>WEB DEVELOPMENT <br />AND LIFE BLOG</h1>
				</div>
			</section>
			</header>
			<div className={styles.slider}>

			</div>
		</>
	)
}
