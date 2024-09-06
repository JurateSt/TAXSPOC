import { BaseCommand } from '@adonisjs/core/ace';
import type { CommandOptions } from '@adonisjs/core/types/ace';
// db
import mongoose from 'mongoose';
// env
import env from '#start/env';
// libraries
import slug from 'slug';
import { format } from 'date-fns';
// models
import Article from '#models/Article';

export default class UpdateArticlesSlugs extends BaseCommand {
	static commandName = 'update:articles-slugs';
	static description = 'Update all articles to include a slug field';

	static options: CommandOptions = {};

	async run() {
		this.logger.info('Starting slug update for all articles...');
		try {
			await mongoose.connect(env.get('MONGO_CONNECTION_STRING'));
			console.log(
				`UpdateArticlesSlugs: Connected to MongoDB.${env.get('MONGO_CONNECTION_STRING')}`
			);
			const articles = await Article.find();
			this.logger.info(`Found ${articles.length} articles`);
			for (const article of articles) {
				this.logger.info(`Processing article ID: ${article.id}`);
				const { header, dateTag } = article;

				const slugHeader =
					slug(header ?? 'untitled') +
					(dateTag ? `-${format(new Date(dateTag), 'yyyy-MM-dd')}` : '');

				article.slug = slugHeader;
				await article.save();

				this.logger.info(`Updated article ID: ${article.id} with slug: ${slugHeader}`);
			}

			this.logger.info('Slug update completed for all articles.');
		} catch (error) {
			this.logger.error('Error updating articles', error);
		} finally {
			await mongoose.connection.close();
			this.logger.info('Disconnected from MongoDB');
		}
	}
}
