import { BaseCommand } from '@adonisjs/core/ace';
import type { CommandOptions } from '@adonisjs/core/types/ace';
// db
import mongoose from 'mongoose';
// env
import env from '#start/env';
// libraries
import slug from 'slug';
// models
import Country from '#models/Country';
import OtherCategory from '#models/OtherCategory';
import Region from '#models/Region';

export default class AddCategoriesSlugs extends BaseCommand {
	static commandName = 'add:categories-slugs';
	static description = 'Add slugs to all categories';

	static options: CommandOptions = {};

	async run() {
		this.logger.info('Starting to add slugs for all categories...');
		try {
			await mongoose.connect(env.get('MONGO_CONNECTION_STRING'));
			console.log(`AddCategoriesSlugs: Connected to MongoDB.${env.get('MONGO_CONNECTION_STRING')}`);

			const countries = await Country.find();
			this.logger.info(`Found ${countries.length} countries`);
			for (const country of countries) {
				this.logger.info(`Processing country ID: ${country.id}`);
				const { name } = country;
				const slugName = slug(name ?? 'untitled');
				country.slug = slugName;

				await country.save();

				this.logger.info(`Updated country ID: ${country.id} with slug: ${slugName}`);
			}
			this.logger.info('Slug update completed for all countries.');

			const otherCategories = await OtherCategory.find();
			this.logger.info(`Found ${otherCategories.length} other categories`);
			for (const otherCategory of otherCategories) {
				this.logger.info(`Processing other category ID: ${otherCategory.id}`);
				const { name } = otherCategory;
				const slugName = slug(name ?? 'untitled');
				otherCategory.slug = slugName;

				await otherCategory.save();

				this.logger.info(`Updated other category ID: ${otherCategory.id} with slug: ${slugName}`);
			}
			this.logger.info('Slug update completed for all other categories.');

			const regions = await Region.find();
			this.logger.info(`Found ${regions.length} regions`);
			for (const region of regions) {
				this.logger.info(`Processing region ID: ${region.id}`);
				const { name } = region;
				const slugName = slug(name ?? 'untitled');
				region.slug = slugName;

				await region.save();

				this.logger.info(`Updated region ID: ${region.id} with slug: ${slugName}`);
			}
			this.logger.info('Slug update completed for all regions.');
		} catch (error) {
			this.logger.error('Error updating categories', error);
		} finally {
			await mongoose.connection.close();
			this.logger.info('Disconnected from MongoDB');
		}
	}
}
