import Layout from './components/layout'
import Link from 'next/link'
import useSWR from 'swr'
import styles from '../styles/Home.module.css'

const fetcher = (data:string) => fetch(data).then(res => res.json())

export default function Home() {
	const {data, error} = useSWR('/api/message', fetcher)
	if (error) return <div>failed to load</div>
	if (!data) return <div>loading...</div>
	return (
		<Layout>
			<div className={styles.message}>{data.message}</div>
			<Link href="./about">About</Link>
		</Layout>
	)
}
