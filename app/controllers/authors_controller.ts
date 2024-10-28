import type { HttpContext } from '@adonisjs/core/http';
// models
import Author from '#models/Author';
// services
import FileService from '#services/FileService';

export default class AuthorsController {
	async index({ response }: HttpContext) {
		const authors = await Author.find();

		// authors.sort((a, b) => ((a.dateTag ?? 0) > (b.dateTag ?? 0) ? -1 : 1));
		// console.log(articles, articles);
		// const shortArticles = articles.map((item) => {
		// 	const { _id, slug, dateTag, subHeader, header, supportingText, tags, categories, images } =
		// 		item;
		// 	return { _id, slug, dateTag, subHeader, header, supportingText, tags, categories, images };
		// });

		console.log('API authors', authors);

		return response.json(authors);
	}
	async store({ request, response }: HttpContext) {
		const { image, ...authorData } = request.all();
		const authorImage = request.file('image');
		console.log('authorData', authorImage, authorData);

		const author = new Author(authorData);

		// save images in S3
		// let articleImages: any[] = [];
		if (authorImage) {
			const savedImage = await FileService.uploadAuthor(authorImage, author);
			author.image = savedImage;
		}

		await author.save();
		return response.json(author);
	}
}
