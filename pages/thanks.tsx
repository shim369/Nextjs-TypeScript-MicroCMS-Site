import Head from 'next/head'
import Link from 'next/link'

export default function Thanks() {
  return (
    <>
      <Head>
        <title>Thank you</title>
        <meta name="description" content="Thank you" />
      </Head>
      <div>
        <h1>Thank you!</h1>
        <div>
          <Link href="/">Back to Top Page</Link>
        </div>
      </div>
    </>
  )
}