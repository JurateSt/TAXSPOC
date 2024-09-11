import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';

export default class DynamicMetaTagsMiddleware {
	async handle({ request, response }: HttpContext, next: NextFn) {
		/**
		 * Middleware logic goes here (before the next call)
		 */
		const article = request.article;
		console.log('DynamicMetaTagsMiddleware', article);

		/**
		 * Call next method in the pipeline and return its output
		 */
		await next();
	}
}
