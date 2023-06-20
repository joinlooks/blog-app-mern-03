import dotenv from "dotenv";
import express from "express";
import mongoConnect from "./db.js";
import cors from "cors";
import { User } from "./models/User.js";
import bcrypt from "bcryptjs";

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

// Routes
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
		response.status(201).json({ message: "User created successfully" });

		//
	} catch (error) {
		console.log(error.message);
	}
});

app.listen(process.env.PORT, () => {
	console.log(`Server on : http://localhost:${process.env.PORT}`);
});
