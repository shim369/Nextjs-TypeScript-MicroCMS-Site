import styles from '../../styles/Home.module.css'
type Props = {
	title?: string
}
export default function Header({ title }: Props) {
	return (
		<>
			<header>
				<h1 className={ styles.title__test }>{ title }</h1>
			</header>
		</>
	)
}
