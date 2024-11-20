import mongoose, { Schema } from 'mongoose';

const ArticleSchema = new Schema(
	{
		slug: { type: String },
		dateTag: { type: Date },
		articleDate: { type: Date },
		photoUrl: { type: String },
		featured: { type: Boolean },
		subHeader: { type: String },
		header: { type: String },
		supportingText: { type: String },
		content: { type: String },
		tags: { type: [String] },
		categories: { type: [Object] },
		source: { type: String },
		images: { type: Array },
		authors: [{ type: Schema.Types.ObjectId, ref: 'Author' }],
		description: { type: String },
	},
	{ timestamps: true }
);

const Article = mongoose.model('Article', ArticleSchema);

export default Article;
