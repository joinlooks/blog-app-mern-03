import { useContext, useState } from "react";
import "../css/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const {
		username: loggedInUsername,
		setUsername: setLoggedInUsername,
		id,
		setId,
	} = useContext(UserContext);

	/** @param {Event} e */
	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post("/login", { username, password });

			if (response.status === 200) {
				setLoggedInUsername(username);
				setId(response.data.id);
				navigate("/");
			}

			//
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<form className="login" onSubmit={handleLogin}>
			<input
				type="text"
				placeholder="username"
				onChange={(e) => setUsername(e.target.value)}
				value={username}
			/>
			<input
				type="password"
				placeholder="password"
				onChange={(e) => setPassword(e.target.value)}
				value={password}
			/>
			<button>Login</button>
		</form>
	);
};

export default Login;
