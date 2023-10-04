import Head from 'next/head'
import Link from 'next/link'
import Headerblog from './components/headerblog'
import Herocontact from './components/herocontact'
import Layout from './components/layout'
import React, { useEffect } from 'react'
import AOS from 'aos'

export default function Error() {
    useEffect(() => {
        AOS.init({});
    })
  return (
    <>
      <Head>
        <title>Error</title>
        <meta name="description" content="Error" />
      </Head>
        <div className="wrapper">
        <Headerblog />
		<Herocontact />
		<Layout>
		<section className="detail-sec" data-aos="fade-up">
            <hr />
            <h1>Error!</h1>
            <div className='contact-message'>
            <Link href="/">Back to Top Page</Link>
            </div>
			<hr />
		</section>
		</Layout>
      </div>
    </>
  )
}