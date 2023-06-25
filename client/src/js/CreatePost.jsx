import { useState } from "react";
import "../css/CreatePost.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const CreatePost = () => {
	const [title, setTitle] = useState("");
	const [summary, setSummary] = useState("");
	const [content, setContent] = useState("");
	const [files, setFiles] = useState("");
	const navigate = useNavigate();

	/** @param {Event} e */
	const handleCreateNewPost = async (e) => {
		e.preventDefault();

		const data = new FormData();
		data.set("title", title);
		data.set("summary", summary);
		data.set("content", content);
		data.set("file", files[0]);

		try {
			const response = await axios.post("/post", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			if (response.status === 201) {
				navigate("/");
			}

			//
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<form className="create" onSubmit={handleCreateNewPost}>
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
			<button>Create</button>
		</form>
	);
};

export default CreatePost;
