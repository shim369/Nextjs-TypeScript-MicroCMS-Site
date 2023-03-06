import Layout from './components/layout'
import Header from './components/header'
import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { getArticles } from '../lib/newt'
import type { Article } from '../types/article'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

export default function Home({ articles }: { articles: Article[] }) {
	gsap.registerPlugin(ScrollTrigger)

	const pagesWrapperRef = useRef<HTMLDivElement | null >(null);
	const pagesRef = useRef<HTMLDivElement | null >(null);
	const didEffect = React.useRef(false);
  
	const setupGsap = (pagesElement: HTMLDivElement, pagesWrapperElement: HTMLDivElement) => {
		gsap.to(pagesElement, {
			x: () => -(pagesElement.clientWidth - pagesWrapperElement.clientWidth),
			ease: 'none',
			scrollTrigger: {
				trigger: '.horizontal-scroll-section',
				start: 'top top',
				end: () => `+=${pagesElement.clientWidth - pagesWrapperElement.clientWidth}`,
				scrub: true,
				pin: true,
				anticipatePin: 1,
				invalidateOnRefresh: true,
			},
		})
		gsap.to('#a03', {
			scrollTrigger: {
				trigger: '.horizontal-scroll-section',
				start: 'top center',
				end: () => `+=${pagesElement.clientWidth - pagesWrapperElement.clientWidth + 50}`,
				scrub: true, 
				onEnter: () => gsap.to('#a03', {
					backgroundColor: '#bbb',
					duration: 1.2
				}),
				onLeave: () => gsap.to('#a03', {
					backgroundColor: '#30CFD0',
					duration: 1.2
				}),
				onEnterBack: () => gsap.to('#a03', {
					backgroundColor: '#bbb',
					duration: 1.2
				}),
				onLeaveBack: () => gsap.to('#a03', {
					backgroundColor: '#30CFD0',
					duration: 1.2
				}),
			},
		})
	}
  

	useEffect(() => {
		if (didEffect.current) return 
		didEffect.current = true;
		const pagesElement = pagesRef?.current;
		if(!pagesElement) return
		
		const pagesWrapperElement = pagesWrapperRef?.current;
		if(!pagesWrapperElement) return
		setupGsap(pagesElement, pagesWrapperElement)
	}, [])

	return (
		<>
			<div className="wrapper">
			<Header />
			<Layout>
			<section id="a01">
				<h2>Profile</h2>
				<div className="flex-box fb2">
					<div className="fb-image">
						<img src="img/image5.jpg" alt="" />
					</div>
					<div className="fb-text">
						<p>Lorem ipsum dolor</p>
						<h3>TITLE</h3>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio adipisci sed repudiandae, sequi minus eligendi alias quod, vero tempore aperiam in omnis unde obcaecati consequuntur suscipit, id quas ut accusamus.</p>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio adipisci sed repudiandae, sequi minus eligendi alias quod, vero tempore aperiam in omnis unde obcaecati consequuntur suscipit, id quas ut accusamus.</p>
						<a href="" className="btn-s">Read more</a>
					</div>
				</div>
			</section>

			<section id="a02">
				<h2>Skills</h2>
				<div className="flex-box fb1">
					<div className="fb-image">
						<img src="img/image1.jpg" alt="" />
					</div>
					<div className="fb-text">
						<p>Lorem ipsum dolor</p>
						<h3>TITLE</h3>
						<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi odit quia dicta, exercitationem alias, dolor numquam impedit, soluta a totam fuga enim architecto officiis repellendus itaque culpa laboriosam tenetur blanditiis.</p>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio adipisci sed repudiandae, sequi minus eligendi alias quod, vero tempore aperiam in omnis unde obcaecati consequuntur suscipit, id quas ut accusamus.</p>
						<a href="" className="btn-s">Read more</a>
					</div>
				</div>
			</section>
			<section id="a03">
				<div className={`${styles.section} ${styles["horizontal-scroll-section"]}`}>
				<div className={styles.container}>
				<div className={styles.pagesWrapper} ref={pagesWrapperRef}>
				<div className={styles.pages} ref={pagesRef} id="pages">
				{articles.map((article) => {
					return (
						<div key={article._id} className={styles.page}>
						<Link href={`articles/${article.slug}`}>{article.title}</Link>
						</div>
					)
				})}
					<div className={styles.page}>
						<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos maxime dicta necessitatibus nulla, quos numquam quae. Maiores ex, deserunt tempore harum non similique. Praesentium perferendis iste saepe et, doloribus consequatur?</p>
					</div>
					<div className={styles.page}>
						<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos maxime dicta necessitatibus nulla, quos numquam quae. Maiores ex, deserunt tempore harum non similique. Praesentium perferendis iste saepe et, doloribus consequatur?</p>
					</div>
					<div className={styles.page}>
						<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos maxime dicta necessitatibus nulla, quos numquam quae. Maiores ex, deserunt tempore harum non similique. Praesentium perferendis iste saepe et, doloribus consequatur?</p>
					</div>
					<div className={styles.page}>
						<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos maxime dicta necessitatibus nulla, quos numquam quae. Maiores ex, deserunt tempore harum non similique. Praesentium perferendis iste saepe et, doloribus consequatur?</p>
					</div>
				</div>
				</div>
				</div>
				</div>
			</section>
			<section className="contact" id="a04">
				<h2>Contact</h2>
				<div className="btn-area">
					<a href="" className="btn-b">
						<div className="link-name">
							<span>LINK1</span>
						</div>
					</a>
					<a href="" className="btn-b">
						<div className="link-name">
							<span>LINK2</span>
						</div>
					</a>
				</div>
				<div className="contact-logo">
					NEXT BASE
				</div>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
			</section>
			</Layout>
			</div>
		</>
	)
}

export const getStaticProps = async () => {
	const articles = await getArticles()
	return {
	  props: {
		articles,
	  },
	}
}