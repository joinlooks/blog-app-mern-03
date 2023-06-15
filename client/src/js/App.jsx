import "../css/App.css";
import BlogPage from "./BlogPage";
import Header from "./Header.jsx";
import { Route, Routes } from "react-router-dom";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

const App = () => {
	return (
		<div className="app">
			<Header />
			<main className="app-content">
				<Routes>
					<Route index element={<BlogPage />} exact path="/" />
					<Route element={<Login />} exact path="/login" />
					<Route element={<Register />} exact path="/register" />
				</Routes>
			</main>
		</div>
	);
};

export default App;
