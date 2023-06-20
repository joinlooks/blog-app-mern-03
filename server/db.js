import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const mongoConnect = async () => {
	await mongoose.connect(process.env.MONGO_URL);
	console.log("MongoDB connected");
};

export default mongoConnect;
