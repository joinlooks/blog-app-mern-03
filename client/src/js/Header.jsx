import { Link, useNavigate } from "react-router-dom";
import "../css/Header.css";
import { useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "./contexts/UserContext";

const Header = () => {
	const { username, setUsername, id, setId } = useContext(UserContext);
	const navigate = useNavigate();

	const fetchProfile = async () => {
		try {
			const response = (await axios.get("/profile"))?.data;
			setUsername(response.data.username);
			setId(response.data.id);

			//
		} catch (error) {
			console.log(error.message);
			navigate("/login");
		}
	};

	useEffect(() => {
		fetchProfile();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleLogout = async () => {
		try {
			const response = (await axios.post("/logout"))?.data;
			setUsername(null);
			setId(null);
			navigate("/");
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<header className="header">
			<Link to="/" className="logo">
				<div>Scribble</div>
			</Link>

			{username ? (
				<nav>
					<Link to="/create-post" className="create-post">
						Create
					</Link>
					<Link onClick={handleLogout}>Logout</Link>
					<span className="username-display">@{username}</span>
				</nav>
			) : (
				<nav>
					<Link to="/login">Login</Link>
					<Link to="/register">Register</Link>
				</nav>
			)}
		</header>
	);
};

export default Header;
