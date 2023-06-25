import { useContext, useEffect, useState } from "react";
import "../css/PostPage.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { UserContext } from "./contexts/UserContext";

const PostPage = () => {
	const { id } = useParams();
	const [postInfo, setPostInfo] = useState(null);
	const { id: userId, setId: setUserId } = useContext(UserContext);

	const fetchPost = async () => {
		const response = await axios.get(`/post/${id}`);
		setPostInfo(response.data.post);
	};

	useEffect(() => {
		fetchPost();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			{postInfo && (
				<div className="main-post">
					{userId === postInfo.author._id && (
						<div className="edit-post">
							<Link to={`/edit/${postInfo._id}`}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
									/>
								</svg>
								Edit
							</Link>
						</div>
					)}
					<div className="left">
						<img
							src={`${import.meta.env.VITE_SERVER_URL}/${postInfo.cover}`}
							alt="Post related"
						/>
					</div>
					<div className="right">
						<h1>{postInfo.title}</h1>
						<div className="info">
							<span>@{postInfo.author.username}</span>
							<span>
								{format(
									new Date(postInfo.createdAt),
									"EEE, MMM dd, yyyy, hh:mm aaa"
								)}
							</span>
						</div>
						<div className="summary">{postInfo.summary}</div>

						<div
							className="content"
							dangerouslySetInnerHTML={{ __html: postInfo.content }}
						></div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PostPage;
