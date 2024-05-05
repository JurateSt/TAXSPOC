import mongoose, { Schema } from 'mongoose';

const ArticleSchema = new Schema(
	{
		dateTag: { type: Date },
		articleDate: { type: Date },
		photoUrl: { type: String },
		featured: { type: Boolean },
		subHeader: { type: String },
		header: { type: String },
		supportingText: { type: String },
		content: { type: String },
		tags: { type: [String] },
		categories: { type: [String] },
		source: { type: String },
	},
	{ timestamps: true }
);

const Article = mongoose.model('Article', ArticleSchema);

export default Article;
