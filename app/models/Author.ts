import mongoose, { Schema } from 'mongoose';

const AuthorSchema = new Schema(
	{
		firstName: { type: String },
		lastName: { type: String },
		email: { type: String },
		phone: { type: String },
		company: { type: String },
		role: { type: String },
		photoUrl: { type: String },
		linkedInUrl: { type: String },
		twitterUrl: { type: String },
		description: { type: String },
		articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
		image: { type: Object },
	},
	{ timestamps: true }
);

const Author = mongoose.model('Author', AuthorSchema);

export default Author;
