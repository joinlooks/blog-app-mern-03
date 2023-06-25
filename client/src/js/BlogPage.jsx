import { useEffect, useState } from "react";
import "../css/BlogPage.css";
import BlogEntry from "./BlogEntry.jsx";
import axios from "axios";

const BlogPage = () => {
	const [posts, setPosts] = useState([]);

	const fetchPosts = async () => {
		const response = await axios.get("/posts");
		setPosts(response.data);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<div className="blog-page">
			{posts.length > 0 ? (
				posts.map((post) => {
					return <BlogEntry {...post} key={post._id} />;
				})
			) : (
				<div className="nothing-to-display">Nothing to display</div>
			)}
		</div>
	);
};

export default BlogPage;
