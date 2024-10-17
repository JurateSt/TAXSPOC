import type { HttpContext } from '@adonisjs/core/http';
// models
import Author from '#models/Author';

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

		return response.json(authors);
	}
	async store({ request, response }: HttpContext) {
		const { photo, ...authorData } = request.all();
		const authorPhoto = request.file('photo');

		const author = new Author(authorData);

		// save images in S3
		// let articleImages: any[] = [];
		// if (images.length > 0) {
		// 	articleImages = await FileService.upload(images, article);
		// }

		// article.images = articleImages;

		await author.save();
		return response.json(author);
	}
}
