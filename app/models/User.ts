import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
	{
		role: String,
		name: String,
		email: { type: String, unique: true, required: true },
		avatar: String,
	},
	{ timestamps: true }
);

const User = mongoose.model('User', UserSchema);

export default User;
