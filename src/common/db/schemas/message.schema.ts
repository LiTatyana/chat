import { Schema, model } from 'mongoose';

export const MessageSchema = new Schema(
	{
		data: { type: String, required: true },
		from_user_id: { type: String, required: true },
		to_user_id: { type: String, required: true },
	},
	{ timestamps: true },
);
export const MessageModel = model('Message', MessageSchema);
