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
				<h1>About</h1>
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
						<p className='sub-title'>NEXT BASEについて</p>
						<h2>About NEXT BASE</h2>
						<p>このサイトはNext.jsとTypeScriptをメインに制作しています。<br />さらにヘッドレスCMS「Newt」を利用し、ブログとお問合せフォームを組み込みしています。<br />ブログの横スクロールはGsapを利用しています。</p>
						<Link href="https://github.com/shim369/Nextjs-TypeScript-Newt-Blog" target="_blank" rel="noreferrer" className="btn-s">Github</Link>
					</div>
				</div>
			</section>

			<section id="a02">
				<h1>Skills</h1>
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
						<p className='sub-title'>スキルについて</p>
						<h2>My skills</h2>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio adipisci sed repudiandae, sequi minus eligendi alias quod, vero tempore aperiam in omnis unde obcaecati consequuntur suscipit, id quas ut accusamus.</p>
						<Link href="https://github.com/shim369" target="_blank" rel="noreferrer" className="btn-s">Github</Link>
					</div>
				</div>
			</section>
			<section id="a03">
				<div className="horizontal">
				<div>
				<h1>Blog</h1>
				<p className="read">ヘッドレスCMS「Newt」のブログ機能を組み込み、「Next.js」カテゴリーのみを表示しています。<br />ブログの横スクロールはGsapを利用しています。</p>
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
				<h1>Contact</h1>
				<p>お問い合わせから遅くても数日以内には返信させていただきます。</p>
				<p>ヘッドレスCMS「Newt」のお問い合わせ機能を利用しています。</p>
				<Contact />
				<div className="btn-area">
					<a href="https://nuxtjs-type-script-newt.vercel.app/" target="_blank" rel="noreferrer" className="btn-b">
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
				<p>Next.js・TypeScript・Newtによるポートフォリオサイト</p>
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