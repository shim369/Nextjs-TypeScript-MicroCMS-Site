import Layout from '../components/layout'
import Header from '../components/header'
import Heroblog from '../components/heroblog'
import { getArticles, getArticleBySlug } from '../../lib/newt'
import type { Article } from '../../types/article'

export default function Article({ article }: { article: Article }) {

  return (
    <>
			<div className="wrapper">
			<Header />
			<Heroblog />
			<Layout>
				<section className="detail-sec">
				<h1>Next.js Blog</h1>
				<hr />
				<div className="blog-content">
          <h1>{article.title}</h1>
					{/* <div className="date"><span className="material-symbols-outlined">schedule</span>{article.date}</div> */}
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