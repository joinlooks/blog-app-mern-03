import "../css/Header.css";

const Header = () => {
	return (
		<header>
			<a href="/" className="logo">
				<div>Scribble</div>
			</a>
			<nav>
				<a href="/login">Login</a>/<a href="/register">Register</a>
			</nav>
		</header>
	);
};

export default Header;
