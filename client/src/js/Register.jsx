import { useContext, useState } from "react";
import "../css/Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

const Register = () => {
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
	const handleRegister = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post("/register", { username, password });

			// If user created successfully, navigate to homepage
			if (response.status === 201) {
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
		<form className="register" onSubmit={handleRegister}>
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
			<button>Register</button>
		</form>
	);
};

export default Register;
