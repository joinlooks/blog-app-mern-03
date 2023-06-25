import "../css/App.css";
import BlogPage from "./BlogPage";
import Header from "./Header.jsx";
import { Route, Routes } from "react-router-dom";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import axios from "axios";
import CreatePost from "./CreatePost";
import PostPage from "./PostPage";
import EditPost from "./EditPost";

const App = () => {
	axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
	axios.defaults.withCredentials = true;
	axios.defaults.headers.post["Content-Type"] = "application/json";

	return (
		<div className="app">
			<Header />
			<main className="app-content">
				<Routes>
					<Route index element={<BlogPage />} exact path="/" />
					<Route element={<Login />} exact path="/login" />
					<Route element={<Register />} exact path="/register" />
					<Route element={<CreatePost />} exact path="/create-post" />
					<Route element={<PostPage />} exact path="/post/:id" />
					<Route element={<EditPost />} exact path="/edit/:id" />
				</Routes>
			</main>
		</div>
	);
};

export default App;
