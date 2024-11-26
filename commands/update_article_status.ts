import { BaseCommand } from '@adonisjs/core/ace';
import type { CommandOptions } from '@adonisjs/core/types/ace';
// db
import mongoose from 'mongoose';
// env
import env from '#start/env';
// models
import Article from '#models/Article';

export default class UpdateArticleStatus extends BaseCommand {
	static commandName = 'update:article-status';
	static description = 'Update all articles to include a status field set to Published';
	static options: CommandOptions = {};

	async run() {
		this.logger.info('Starting status update for all articles...');
		try {
			await mongoose.connect(env.get('MONGO_CONNECTION_STRING'));
			console.log(
				`UpdateArticlesStatus: Connected to MongoDB.${env.get('MONGO_CONNECTION_STRING')}`
			);

			const articles = await Article.find();
			this.logger.info(`Found ${articles.length} articles with undefined status`);

			for (const article of articles) {
				this.logger.info(`Processing article ID: ${article.id}`);

				article.status = 'Published';
				await article.save();

				this.logger.info(`Updated article ID: ${article.id} with status: Published`);
			}

			this.logger.success('Status update completed for all articles.');
		} catch (error) {
			this.logger.error('Error updating articles status', error);
		} finally {
			await mongoose.connection.close();
			this.logger.info('Disconnected from MongoDB');
		}
	}
}
