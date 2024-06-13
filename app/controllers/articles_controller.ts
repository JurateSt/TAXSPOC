import type { HttpContext } from '@adonisjs/core/http';

import Article from '#models/Article';
import { log } from 'console';
import FileService from '#services/FileService';

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
		const { images: _images, tags, categories, ...articleData } = request.all();
		const images = request.files('images');
		console.log('IMAGES', images);
		// return;

		if (typeof tags === 'string') {
			articleData.tags = tags.split(',').map((item) => item.trim());
		}
		if (typeof categories === 'string') {
			articleData.categories = categories.split(',').map((item) => item.trim());
		}

		const article = new Article(articleData);

		// save images in S3
		let articleImages: any[] = [];
		if (images.length > 0) {
			articleImages = await FileService.upload(images, article);
		}
		log('ARTICLE STORE', request.body(), 'IMAGES', images, 'articleImages', articleImages);
		article.images = articleImages;

		await article.save();
		return response.json(article);
	}

	public async update({ request, response }: HttpContext) {
		const { id } = request.params();
		const { images: _images, tags, categories, ...articleData } = request.all();
		const images = request.files('images');

		if (typeof tags === 'string') {
			articleData.tags = tags.split(',').map((item) => item.trim());
			log('TAGS', articleData.tags);
		}
		if (typeof categories === 'string') {
			articleData.categories = categories.split(',').map((item) => item.trim());
		}

		// log('UPDATE', id, articleData);

		if (articleData.action === 'deleteFile') {
			const article = await Article.findById(id);
			const updatedArticle = await FileService.deleteImage(article, articleData.url);
			response.json(updatedArticle);
		}

		const article = await Article.findByIdAndUpdate(id, articleData);

		// save images in public folder
		let articleImages: any[] = article?.images || [];
		if (images.length > 0) {
			articleImages = await FileService.upload(images, article);
		}
		article!.images = articleImages;
		await article?.save();
		response.json(article);
	}

	public async destroy({ request, response }: HttpContext) {
		const { id } = request.params();
		//find image and delete it in public folder
		const article = await Article.findByIdAndDelete(id);
		if (article) {
			// for (const image of article?.images) {
			// 	if (fs.existsSync(app.publicPath(image.url))) {
			// 		fs.unlinkSync(app.publicPath(image.url));
			// 	}
			// }
			await FileService.deleteAllImages(article);
		}

		return response.json(204);
	}
}
