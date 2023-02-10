import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { gsap } from 'gsap'

type Props = {
	title?: string
	document?: Document
}
export default function Header({ title }: Props) {
	if (typeof window === 'object') {
	const hero = document.querySelector(".hero");
	const slider = document.querySelector(".slider");
	const logo = document.querySelector(".logo");
	const menu = document.querySelector(".menu");
	const headline = document.querySelector(".headline");

	const tl = gsap.timeline();

	tl.fromTo(hero, 1, { height: "0%" }, { height: "80%" })
	.fromTo(
		hero,
		1.2,
		{ width: "100%" },
		{ width: "80%" }
	)
	.fromTo(
		slider,
		1.2,
		{ y: "-100%" },
		{ y: "0%" },
		"-=1.2"
	)
	.fromTo(logo, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5")
	.fromTo(menu, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5")
	.fromTo(headline, 0.5, { opacity: 0, x: 0 }, { opacity: 1, x: 30 }, "-=0.5");
	}
	return (
		<>
			<header>
			<nav>
				<h2 className={styles.logo}>{ title }</h2>
				<ul className={styles.menu}>
					<li><a href="">PYTHON</a></li>
					<li><a href="">JS</a></li>
					<li><a href="">TOOL</a></li>
				</ul>
			</nav>
			<section>
				<div className={styles.hero}>
					<Image src="/images/3.jpg" alt="" width={800} height={500} />
					<h1 className={styles.headline}>WEB DEVELOPMENT AND LIFE BLOG</h1>
				</div>
			</section>
			</header>
			<div className={styles.slider}>

			</div>
		</>
	)
}
