import Image from 'next/image'
import Layout from './components/layout'
import Header from './components/header'
import Contact from './components/contact'
import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
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
				trigger: '.horizontal',
				start: 'top top',
				end: () => `+=${pagesElement.clientWidth - pagesWrapperElement.clientWidth}`,
				scrub: true,
				pin: true,
				anticipatePin: 1,
				invalidateOnRefresh: true,
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
				<h2>About</h2>
				<div className="flex-box fb2">
					<div className="fb-image">
					<Image
						src="/img/image5.webp"
						alt="NEXT BASE"
						width={672}
						height={504}
					/>
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
						<Image
							src="/img/image1.webp"
							alt="NEXT BASE"
							width={672}
							height={504}
						/>
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
				<div className="horizontal">
				<div>
				<h2>Blog</h2>
				<p className="read">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				<div className="pagesWrapper" ref={pagesWrapperRef}>
				<div className="pages" ref={pagesRef} id="pages">
				{articles.map((article) => {
					if(article.category.name == "Next"){
						return (
							<Link key={article._id} href={`articles/${article.slug}`}>
								<div className="page">
								<img
									src={article.coverImage.src}
									alt="NEXT BASE"
								/>
								<p>{article.title}</p>
								</div>
							</Link>
						)
					}
				})}
				</div>
				</div>
				</div>
				</div>
			</section>
			<section className="contact" id="a04">
				<h2>Contact</h2>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				<Contact />
				<div className="btn-area">
					<a href="" target="_blank" rel="noreferrer" className="btn-b">
						<div className="link-name">
							<span>NUXT BASE</span>
						</div>
					</a>
					<a href="https://astro-blog-test-neon.vercel.app/" target="_blank" rel="noreferrer" className="btn-b">
						<div className="link-name">
							<span>ASTRO BASE</span>
						</div>
					</a>
				</div>
				<p>Lorem ipsum dolor sit amet consectetur.</p>
				<div className="contact-logo">
					NEXT BASE
				</div>
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