import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, min: 3, unique: true },
		password: { type: String, required: true, min: 3 },
	},
	{ timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
