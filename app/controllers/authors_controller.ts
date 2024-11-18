import type { HttpContext } from '@adonisjs/core/http';
// models
import Author from '#models/Author';
// services
import FileService from '#services/FileService';

export default class AuthorsController {
	async index({ response }: HttpContext) {
		const authors = await Author.find().sort({ createdAt: -1 });

		return response.json(authors);
	}

	async show({ response, params }: HttpContext) {
		const author = await Author.findById(params.id);

		if (!author) {
			return response.status(404).json({ message: 'Author not found' });
		}

		return response.json(author);
	}

	async store({ request, response }: HttpContext) {
		const { image, ...authorData } = request.all();
		const authorImage = request.file('image');
		console.log('authorData', authorImage, authorData);

		const author = new Author(authorData);

		await author.save();
		return response.json(author);
	}

	async update({ request, response, params }: HttpContext) {
		const { croppedImage, originalImage, image, ...authorData } = request.all();
		const croppedImageFile = request.file('croppedImage');
		const originalImageFile = request.file('originalImage');
		const author = await Author.findById(params.id);

		if (!author) {
			return response.status(404).json({ message: 'Author not found' });
		}

		if (authorData.action === 'delete-image') {
			const updatedArticle = await FileService.deleteAuthorImage(author);
			response.json(updatedArticle);
		}

		author.set(authorData);

		if (authorData.action === 'update-image') {
			if (author.image) {
				await FileService.deleteAuthorImage(author);
			}

			let croppedUrl;
			let originalUrl;
			if (croppedImageFile) {
				croppedUrl = await FileService.uploadAuthor(croppedImageFile);
			}
			if (originalImageFile) {
				originalUrl = await FileService.uploadAuthor(originalImageFile);
			}
			author.image = { url: croppedUrl, originalUrl };
		}

		await author.save();
		return response.json(author);
	}

	async destroy({ response, params }: HttpContext) {
		const id = params.id;
		const author = await Author.findByIdAndDelete(id);

		if (author?.image) {
			await FileService.deleteAllAuthor(author);
		}

		return response.json(204);
	}
}
