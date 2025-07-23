import { UserModel } from '@schemas/user.schema';
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chatdb';

let isMongooseConnected = false;

export async function connectDB() {
	if (isMongooseConnected) return mongoose;

	try {
		await mongoose.connect(MONGO_URI);
		isMongooseConnected = true;
		console.log('MongoDB connected');

		void UserModel;

		return mongoose;
	} catch (err) {
		console.error('MongoDB connection error:', err);
		throw err;
	}
}
