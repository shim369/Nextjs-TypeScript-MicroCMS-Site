import Head from 'next/head'
import Layout from '../components/layout'
import Headerblog from '../components/headerblog'
import Heroblog from '../components/heroblog'
import { getArticles, getArticleBySlug } from '../../lib/newt'
import type { Article } from '../../types/article'
import React, { useEffect } from 'react'
import AOS from 'aos'

export default function Article({ article }: { article: Article }) {

	useEffect(() => {
    AOS.init({});
  })
  return (
    <>
      <Head>
        <title>{article.title + " | NEXT BASE"}</title>
      </Head>
			<div className="wrapper">
			<Headerblog />
			<Heroblog />
			<Layout>
				<section className="detail-sec" data-aos="fade-up">
				<hr />
				<div className="blog-content">
          <h1>{article.title}</h1>
          <div className="date"><span className="material-icons">schedule</span>
									{ new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(article.date))}</div>
          <div dangerouslySetInnerHTML={{ __html: article.body }} />  
				</div>
				<hr />
				</section>
			</Layout>
			</div>
    </>
  )
}

export const getStaticPaths = async () => {
  const articles = await getArticles()
  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const { slug } = params
  const article = await getArticleBySlug(slug)
  return {
    props: {
      article,
    },
  }
}