import mongoose from 'mongoose';
import env from '#start/env';

import Article from '#models/Article';

async function clearArticleCategories() {
	try {
		await mongoose.connect(env.get('MONGO_CONNECTION_STRING'));
		console.log('clearArticleCategories: Connected to MongoDB.');
		// clear article categories
		const articles = await Article.find();
		for (const article of articles) {
			article.set('categories', []);
			await article.save();
		}
	} catch (error) {
		console.error('clearArticleCategories: Failed to connect to MongoDB:', error);
	} finally {
		mongoose.disconnect();
		console.log('clearArticleCategories: MongoDB connection closed.');
	}
}

clearArticleCategories()
	.then(() => console.log('clearArticleCategories completed!'))
	.catch((err) => console.error('clearArticleCategories failed:', err));
