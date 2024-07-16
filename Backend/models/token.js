import mongoose from "mongoose";
const { Schema } = mongoose; // Import Schema from mongoose

const tokenSchema = new Schema({
	userId: {
		type: String,
		required: true,
		ref: "User", // Assuming your user model is named 'User'
		unique: true,
	},
	token: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: 3600 },
});

const Token = mongoose.model("Token", tokenSchema); // Capitalize the model name

export default Token;




