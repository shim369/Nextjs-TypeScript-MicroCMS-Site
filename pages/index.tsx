import Head from 'next/head'
import Image from 'next/image'
import Layout from './components/layout'
import Header from './components/header'
import Herotop from './components/herotop'
import Contact from './components/contact'
import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import { getArticles } from '../lib/newt'
import type { Article } from '../types/article'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import AOS from 'aos'

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
  
	const skills = [
		{ name: 'Astro', image: '/img/astro.webp' },
		{ name: 'JavaScript', image: '/img/js.webp' },
		{ name: 'Next.js', image: '/img/next.webp' },
		{ name: 'Nuxt.js', image: '/img/nuxt.webp' },
		{ name: 'Python', image: '/img/py.webp' },
		{ name: 'Django', image: '/img/django.webp' },
		{ name: 'Newt', image: '/img/newt.webp' },
		{ name: 'Figma', image: '/img/figma.webp' },
	];
	  

	useEffect(() => {
		if (didEffect.current) return 
		didEffect.current = true;
		const pagesElement = pagesRef?.current;
		if(!pagesElement) return
		
		const pagesWrapperElement = pagesWrapperRef?.current;
		if(!pagesWrapperElement) return
		setupGsap(pagesElement, pagesWrapperElement)

		AOS.init({});
	}, [])

	return (
		<>
			<Head>
			<title>NEXT BASE</title>
			</Head>
			<div className="wrapper">
			<Header />
			<Herotop />
			<Layout>
			<section id="a01">
				<h1>About</h1>
				<div className="flex-box fb2">
					<div className="fb-image" data-aos="fade-up">
					<Image
						src="/img/image5.webp"
						alt="NEXT BASE"
						width={750}
						height={563}
					/>
					</div>
					<div className="fb-text" data-aos="fade-right">
						<h2>NEXT BASEについて</h2>
						<p>このサイトはNext.jsとTypeScriptをメインに制作しています。<br />さらにヘッドレスCMS「Newt」を利用し、ブログとお問合せフォームを組み込んでいます。</p>
						<Link href="https://github.com/shim369/Nextjs-TypeScript-Newt-Blog" target="_blank" rel="noreferrer" className="btn-s">Github</Link>
					</div>
				</div>
			</section>

			<section id="a02">
				<h1>Skills</h1>
				<div className="skills-box">
				{skills.map((skill, index) => (
					<div
					className="skills-item"
					key={skill.name}
					data-aos="fade-up"
					data-aos-delay={index * 50}
					>
					<Image src={skill.image} alt={skill.name} width={225} height={225} />
					<h2>{skill.name}</h2>
					</div>
				))}
				</div>
			</section>
			<section className="blog" id="a03">
					<div className="horizontal">
						<div>
							<h1>Blog</h1>
							<p className="read">ヘッドレスCMS「Newt」のブログ機能を組み込み、「Next.js」カテゴリーのみを表示しています。</p>
							<div className="pagesWrapper" ref={pagesWrapperRef}>
								<div className="pages" ref={pagesRef} id="pages">
								{articles.map((article) => {
									if(article.category.name == "Next"){
										return (
											<Link key={article._id} href={`articles/${article.slug}`}>
												<div className="page">
												<img
													src={article.coverImage.src}
													alt={article.title}
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
					<h1>Contact</h1>
					<div data-aos="fade-up">
						<p>お問い合わせから遅くても数日以内には返信させていただきます。</p>
						<p>ヘッドレスCMS「Newt」のお問い合わせ機能を利用しています。</p>
						<Contact />
					</div>
					<div className="btn-area" data-aos="fade-up">
						<Link href="https://nuxtbase.vercel.app/" target="_blank" rel="noreferrer" className="btn-b">
							<div className="link-name">
								<span>NUXT BASE</span>
							</div>
						</Link>
						<Link href="https://astrobase.vercel.app/" target="_blank" rel="noreferrer" className="btn-b">
							<div className="link-name">
								<span>ASTRO BASE</span>
							</div>
						</Link>
					</div>
					<p className="contact-catch">Next.js & TypeScript & Newt</p>
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