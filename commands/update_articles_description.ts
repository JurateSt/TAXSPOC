import { BaseCommand } from '@adonisjs/core/ace';
import type { CommandOptions } from '@adonisjs/core/types/ace';
// db
import mongoose from 'mongoose';
// env
import env from '#start/env';
// models
import Article from '#models/Article';

export default class ArticlesDescription extends BaseCommand {
	static commandName = 'update:articles-description';
	static description = 'Update all articles to insert description field with supportingText value';

	static options: CommandOptions = {};

	async run() {
		this.logger.info('Starting description update for all articles...');
		try {
			await mongoose.connect(env.get('MONGO_CONNECTION_STRING'));
			console.log(
				`UpdateArticlesSlugs: Connected to MongoDB.${env.get('MONGO_CONNECTION_STRING')}`
			);
			const articles = await Article.find();
			this.logger.info(`Found ${articles.length} articles`);

			for (const article of articles) {
				this.logger.info(`Processing article ID: ${article.slug}`);

				article.description = article.supportingText;
				await article.save();

				this.logger.info(
					`Updated article ID: ${article.slug} with slug: ${article.supportingText}`
				);
			}

			this.logger.info('Description update completed for all articles.');
		} catch (error) {
			this.logger.error('Error updating articles', error);
		} finally {
			await mongoose.connection.close();
			this.logger.info('Disconnected from MongoDB');
		}
	}
}
