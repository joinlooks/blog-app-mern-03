import dotenv from "dotenv";
import express from "express";
import mongoConnect from "./db.js";
import cors from "cors";
import { User } from "./models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer";
import fs from "fs";
import { Post } from "./models/Post.js";

// Middleware to upload files to upload/ folder
const uploadMiddleware = multer({ dest: "uploads/" });

dotenv.config();
mongoConnect();
const app = express();
app.use(express.json());
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	})
);
app.use(cookieParser());

// To load static files stored in uploads directory
app.use("/uploads", express.static("uploads"));

// ROUTE 5: User create a post
app.post(
	"/post",
	uploadMiddleware.single("file"),
	async (request, response) => {
		let newPath = "";
		if (request.file) {
			const { originalname, path } = request.file;
			const parts = originalname.split(".");
			const ext = parts[parts.length - 1];
			newPath = path + "." + ext;
			fs.renameSync(path, newPath);
		}

		const { title, summary, content } = request.body;
		const token = request.cookies?.token;

		try {
			const data = jwt.verify(token, process.env.JWT_SECRET);

			const post = await Post.create({
				author: data.id,
				title,
				summary,
				content,
				cover: newPath,
			});

			response.status(201).json({ message: "Post created successfully" });

			//
		} catch (error) {
			console.log(error.message);
		}
	}
);

// ROUTE 8: Updating post
app.put("/post", uploadMiddleware.single("file"), async (request, response) => {
	let newPath = null;
	if (request.file) {
		const { originalname, path } = request.file;
		const parts = originalname.split(".");
		const ext = parts[parts.length - 1];
		newPath = path + "." + ext;
		fs.renameSync(path, newPath);
	}

	const { title, summary, content, id } = request.body;
	const token = request.cookies?.token;

	try {
		const data = jwt.verify(token, process.env.JWT_SECRET);

		let post = await Post.findById(id);
		const isAuthor = JSON.stringify(post?.author) === JSON.stringify(data.id);

		if (!isAuthor) {
			return response.status(401).json({ message: "Unauthorized" });
		}

		await post.updateOne({
			title,
			summary,
			content,
			cover: newPath ? newPath : post.cover,
		});

		response.status(200).json({ message: "Post updated" });

		//
	} catch (error) {
		console.log(error);
	}
});

// ROUTE 6: Get all posts
app.get("/posts", async (request, response) => {
	try {
		const posts = await Post.find()
			.populate("author", ["username"])
			.sort({ createdAt: -1 })
			.limit(20);
		response.status(200).json(posts);
	} catch (error) {
		console.log(error.message);
	}
});

// ROUTE 7: Get single post
app.get("/post/:id", async (request, response) => {
	const { id } = request.params;
	const post = await Post.findById(id).populate("author", ["username"]);
	response.status(200).json({ post });
});

// ROUTE 1: For registration of user
app.post("/register", async (request, response) => {
	const { username, password } = request.body;
	try {
		let user = await User.findOne({ username });
		if (user) {
			return response
				.status(400)
				.json({ message: "Try using a different username" });
		}

		const securePassword = bcrypt.hashSync(password, 10);
		user = await User.create({ username, password: securePassword });

		const payload = { username, id: user._id };
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "30d",
		});

		response
			.status(201)
			.cookie("token", token, { sameSite: "none", secure: true })
			.json({ message: "User created successfully", id: user._id, username });

		//
	} catch (error) {
		console.log(error.message);
	}
});

// ROUTE 2: For user login
app.post("/login", async (request, response) => {
	const { username, password } = request.body;
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return response
				.status(400)
				.json({ message: "Please register before logging in" });
		}

		const isValidPassword = bcrypt.compareSync(password, user.password);
		if (!isValidPassword) {
			return response
				.status(401)
				.json({ message: "Please check your credentials" });
		}

		const payload = { username, id: user._id };
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "30d",
		});

		// Keep in mind to add these options in cookie()
		response
			.status(200)
			.cookie("token", token, { sameSite: "none", secure: true })
			.json({ message: "Welcome back", id: user._id, username });

		//
	} catch (error) {
		console.log(error.message);
	}
});

// ROUTE 3: For profile page of user
app.get("/profile", async (request, response) => {
	const token = request.cookies?.token;
	if (token) {
		const data = jwt.verify(token, process.env.JWT_SECRET);
		response.status(202).json({ message: "User verified", data });

		//
	} else {
		response.status(401).json({ message: "Login to continue" });
	}
});

// ROUTE 4: Logout functionality
app.post("/logout", async (request, response) => {
	response
		.status(200)
		.cookie("token", "", { sameSite: "none", secure: true })
		.json({ message: "User logged out" });
});

app.listen(process.env.PORT, () => {
	console.log(`Server on : http://localhost:${process.env.PORT}`);
});
