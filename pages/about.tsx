import Layout from './components/layout'
import Link from 'next/link'

export default function About() {
	return (
		<Layout>
			<div>text about</div>
			<Link href="./">Top</Link>
		</Layout>
	)
}
