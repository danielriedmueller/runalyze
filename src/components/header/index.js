import { Link } from 'preact-router/match';
import style from './style.scss';

const Header = () => (
	<header class={style.header}>
		<h1>Runalyze</h1>
		<nav>
			<Link activeClassName={style.active} href="/">Home</Link>
			<Link activeClassName={style.active} href="/list">Liste</Link>
		</nav>
	</header>
);

export default Header;
