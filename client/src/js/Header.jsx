import { Link } from "react-router-dom";
import "../css/Header.css";

const Header = () => {
	return (
		<header>
			<Link to="/" className="logo">
				<div>Scribble</div>
			</Link>
			<nav>
				<Link to="/login">Login</Link>/<Link to="/register">Register</Link>
			</nav>
		</header>
	);
};

export default Header;
