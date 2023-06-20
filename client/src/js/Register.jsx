import { useState } from "react";
import "../css/Register.css";
import axios from "axios";

const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	/**
	 *  @param {Event} e
	 */
	const handleRegister = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post("/register", { username, password });
			console.log(response.data);
			//
		} catch (error) {
			const response = error.response;
			if (response.status === 400) {
				console.log(response.data.message);
			}
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
