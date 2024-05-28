import type { HttpContext } from '@adonisjs/core/http';

import Article from '#models/Article';
import { log } from 'console';
import app from '@adonisjs/core/services/app';
import fs from 'fs';

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
		const { images: _images, ...articleData } = request.all();
		const images = request.files('images');

		const article = new Article(articleData);

		// save images in public folder
		const articleImages = [];
		if (images) {
			for (const image of images) {
				const fileName = `${article._id}-${image.clientName}`;
				await image.move(app.publicPath('images'), {
					name: fileName,
				});

				articleImages.push({
					url: `images/${fileName}`,
					originalName: image.clientName,
				});
			}
		}
		log('STORE', request.body(), images, articleImages);
		article.images = articleImages;

		await article.save();
		return response.json(article);
	}

	public async update({ request, response }: HttpContext) {
		const { id } = request.params();
		const { images: _images, tags, categories, ...articleData } = request.all();
		const images = request.files('images');

		if (typeof tags === 'string') {
			articleData.tags = tags.split(',');
			log('TAGS', articleData.tags);
		}
		if (typeof categories === 'string') {
			articleData.categories = categories.split(',');
		}

		// log('UPDATE', id, articleData);

		if (articleData.action === 'deleteFile') {
			const article = await Article.findById(id);
			const articleImages = article?.images || [];
			const imageIndex = articleImages.findIndex((image) => image.url === articleData.url);

			if (imageIndex !== -1) {
				const image = articleImages[imageIndex];
				if (fs.existsSync(app.publicPath(image.url))) {
					fs.unlinkSync(app.publicPath(image.url));
				}
				articleImages.splice(imageIndex, 1);
				article!.images = articleImages;
				await article?.save();
			}
			response.json(article);
		}

		const article = await Article.findByIdAndUpdate(id, articleData);

		// save images in public folder
		const articleImages = article?.images || [];
		// log('UPDATE:', article, images, articleImages);
		if (images) {
			for (const image of images) {
				const fileName = `${article?._id}-${image.clientName}`;
				await image.move(app.publicPath('images'), {
					name: fileName,
				});

				articleImages.push({
					url: `images/${fileName}`,
					originalName: image.clientName,
				});
			}
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
			for (const image of article?.images) {
				if (fs.existsSync(app.publicPath(image.url))) {
					fs.unlinkSync(app.publicPath(image.url));
				}
			}
		}

		return response.json(204);
	}
}
