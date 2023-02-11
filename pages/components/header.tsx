import Image from 'next/image'
import styles from '../../styles/Home.module.css'
// import { gsap } from 'gsap'


export default function Header() {
	const title = "Vercel deploy test"
	return (
		<>
			<header className={styles.header}>
			<nav>
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
					<h1 className={styles.headline}>WEB DEVELOPMENT AND LIFE BLOG</h1>
				</div>
			</section>
			</header>
			<div className={styles.slider}>

			</div>
		</>
	)
}
