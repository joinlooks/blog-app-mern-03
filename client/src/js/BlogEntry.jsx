import { Link } from "react-router-dom";
import "../css/BlogEntry.css";
import { format } from "date-fns";

const BlogEntry = ({ _id, title, summary, cover, createdAt, author }) => {
	return (
		<Link to={`/post/${_id}`} className="main">
			<div className="left">
				<img
					src={`${import.meta.env.VITE_SERVER_URL}/${cover}`}
					alt="Author didn't uploaded"
				/>
			</div>
			<div className="right">
				<h1>{title}</h1>
				<div className="info">
					<span>@{author.username}</span>
					<span>
						{format(new Date(createdAt), "EEE, MMM dd, yyyy, hh:mm aaa")}
					</span>
				</div>
				<div className="summary">{summary}</div>
			</div>
		</Link>
	);
};

export default BlogEntry;
