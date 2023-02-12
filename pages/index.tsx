import Layout from './components/layout'
import Header from './components/header'
import React, { useRef, useEffect } from 'react'
// import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

export default function Home() {

	gsap.registerPlugin(ScrollTrigger)

	const pagesWrapperRef = useRef<HTMLDivElement | null >(null);
	const pagesRef = useRef<HTMLDivElement | null >(null);
	const didEffect = React.useRef(false);
  
	const setupGsap = (pagesElement: HTMLDivElement, pagesWrapperElement: HTMLDivElement) => {
	  gsap.to(pagesElement, {
		x: () => -(pagesElement.clientWidth - pagesWrapperElement.clientWidth),
		ease: 'none',
		scrollTrigger: {
		  trigger: '#horizontal-scroll-section',
		  start: 'top top',
		  end: () => `+=${pagesElement.clientWidth - pagesWrapperElement.clientWidth}`,
		  scrub: true,
		  pin: true,
		  anticipatePin: 1,
		  invalidateOnRefresh: true,
		},
	  })
	  gsap.to('main', {
		scrollTrigger: {
		  trigger: '#horizontal-scroll-section',
		  start: 'top center',
		  end: () => `+=${pagesElement.clientWidth - pagesWrapperElement.clientWidth + 200}`,
		  scrub: true, 
		  onEnter: () => gsap.to('main', {
			backgroundColor: '#bbb',
			duration: 1.2
		  }),
		  onLeave: () => gsap.to('main', {
			backgroundColor: '#30CFD0',
			duration: 1.2
		  }),
		  onEnterBack: () => gsap.to('main', {
			backgroundColor: '#bbb',
			duration: 1.2
		  }),
		  onLeaveBack: () => gsap.to('main', {
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
			<div className={styles.wrapper}>
			<Header />
			<Layout>
			<section className={styles.section} id="horizontal-scroll-section">
				<div className={styles.container}>
				<div className={styles.pagesWrapper} ref={pagesWrapperRef}>
				<div className={styles.pages} ref={pagesRef} id="pages">
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
					<div className={styles.page}>
						<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos maxime dicta necessitatibus nulla, quos numquam quae. Maiores ex, deserunt tempore harum non similique. Praesentium perferendis iste saepe et, doloribus consequatur?</p>
					</div>
				</div>
				</div>
				</div>
			</section>
			<section>
				<div className={styles.contact}>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam aspernatur, quod mollitia voluptates esse ullam. Corrupti ullam adipisci enim nisi dolore voluptatum, praesentium amet dolores odio aliquam possimus itaque consequuntur!</p>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam aspernatur, quod mollitia voluptates esse ullam. Corrupti ullam adipisci enim nisi dolore voluptatum, praesentium amet dolores odio aliquam possimus itaque consequuntur!</p>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam aspernatur, quod mollitia voluptates esse ullam. Corrupti ullam adipisci enim nisi dolore voluptatum, praesentium amet dolores odio aliquam possimus itaque consequuntur!</p>
				</div>
			</section>
			</Layout>
			</div>
		</>
	)
}
