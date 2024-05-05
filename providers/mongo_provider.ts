import type { ApplicationService } from '@adonisjs/core/types';

import mongoose from 'mongoose';
import env from '#start/env';

export default class MongoProvider {
	constructor(protected app: ApplicationService) {}

	/**
	 * Register bindings to the container
	 */
	register() {
		// this.app.container.bind('Adonis/Addons/Mongoose', () => mongoose);
	}

	/**
	 * The container bindings have booted
	 */
	async boot() {
		// const mongoose = this.app.container.use('Adonis/Addons/Mongoose');
	}

	/**
	 * The application has been booted
	 */
	async start() {}

	/**
	 * The process has been started
	 */
	async ready() {
		try {
			await mongoose.connect(env.get('MONGO_CONNECTION_STRING'));
			console.log('Connected to MongoDB.');
		} catch (error) {
			console.error('Failed to connect to MongoDB:', error);
		}
	}

	/**
	 * Preparing to shutdown the app
	 */
	async shutdown() {
		try {
			await mongoose.connection.close();
			console.log('MongoDB connection closed.');
		} catch (error) {
			console.error('Error closing MongoDB connection:', error);
		}
	}
}
