import type { HttpContext } from '@adonisjs/core/http';

import Article from '#models/Article';

export default class ArticlesController {
	public async index({ response }: HttpContext) {
		const articles = await Article.find();
		return response.json(articles);
	}

	public async show({ request, response }: HttpContext) {
		const { id } = request.params();
		const article = await Article.findById(id);
		return response.json(article);
	}

	public async store({ request, response }: HttpContext) {
		const article = new Article(request.body());
		await article.save();
		return response.json(article);
	}
}
