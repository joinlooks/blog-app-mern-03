import { useEffect, useState } from "react";
import "../css/EditPost.css";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import axios from "axios";

const modules = {
	toolbar: [
		[{ header: [1, 2, false] }],
		["bold", "italic", "underline", "strike", "blockquote"],
		[
			{ list: "ordered" },
			{ list: "bullet" },
			{ indent: "-1" },
			{ indent: "+1" },
		],
		["link"],
		["clean"],
	],
};

const formats = [
	"header",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"indent",
	"link",
];

const EditPost = () => {
	const { id } = useParams();
	const [title, setTitle] = useState("");
	const [summary, setSummary] = useState("");
	const [content, setContent] = useState("");
	const [files, setFiles] = useState("");
	const [cover, setCover] = useState("");
	const navigate = useNavigate();

	const fetchPost = async () => {
		const response = (await axios.get(`/post/${id}`)).data.post;

		setTitle(response.title);
		setSummary(response.summary);
		setContent(response.content);
	};

	useEffect(() => {
		fetchPost();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/** @param {Event} e */
	const handleEditPost = async (e) => {
		e.preventDefault();

		const data = new FormData();
		data.set("title", title);
		data.set("summary", summary);
		data.set("content", content);
		data.set("id", id);
		if (files?.[0]) data.set("file", files?.[0]);

		try {
			const response = await axios.put("/post", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			if (response.status === 200) {
				navigate(`/post/${id}`);
			}

			//
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<form className="edit-post" onSubmit={handleEditPost}>
			<input
				type="text"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Summary"
				value={summary}
				onChange={(e) => setSummary(e.target.value)}
			/>
			<input
				type="file"
				placeholder="Add image"
				id="files"
				onChange={(e) => setFiles(e.target.files)}
			/>

			<ReactQuill
				className="quill"
				value={content}
				onChange={(e) => setContent(e)}
				modules={modules}
				formats={formats}
			/>
			<button>Save</button>
		</form>
	);
};

export default EditPost;
