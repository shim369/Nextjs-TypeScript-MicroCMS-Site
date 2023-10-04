import Head from 'next/head'
import Link from 'next/link'

export default function Error() {
  return (
    <>
      <Head>
        <title>Error</title>
        <meta name="description" content="Error" />
      </Head>
      <div>
        <h1>Error!</h1>
        <div>
          <Link href="/">Back to Top Page</Link>
        </div>
      </div>
    </>
  )
}