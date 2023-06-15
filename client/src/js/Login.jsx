import "../css/Login.css";

const Login = () => {
	return (
		<div className="login">
			<input type="text" placeholder="username" />
			<input type="password" placeholder="password" />
			<button>Login</button>
		</div>
	);
};

export default Login;
