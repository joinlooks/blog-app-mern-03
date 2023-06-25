import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
	{
		author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		title: String,
		summary: String,
		content: String,
		cover: String,
	},
	{ timestamps: true }
);

export const Post = mongoose.model("Post", PostSchema);
