import type { HttpContext } from '@adonisjs/core/http';
// libraries
import slug from 'slug';
// import { format } from 'date-fns';
// models
import Article from '#models/Article';
import FileService from '#services/FileService';

export default class ArticlesController {
	async index({ response }: HttpContext) {
		const articles = await Article.find().populate('authors').sort({ createdAt: -1 });

		return response.json(articles);
	}

	async getLatest({ request, response }: HttpContext) {
		const limit = Number.parseInt(request.input('limit'), 10);

		let articles = await Article.find({ status: 'Published' }).limit(limit).sort({ dateTag: -1 });
		const shortArticles = articles.map((item) => {
			const {
				_id,
				slug,
				dateTag,
				subHeader,
				header,
				supportingText,
				tags,
				categories,
				images,
				description,
			} = item;
			return {
				_id,
				slug,
				dateTag,
				subHeader,
				header,
				supportingText,
				tags,
				categories,
				images,
				description,
			};
		});
		return response.json(shortArticles);
	}

	async getByCategory({ request, response }: HttpContext) {
		const type = request.input('type');
		const category = request.input('category');
		const limit = Number.parseInt(request.input('limit'), 10);

		let articles = await Article.find({
			status: 'Published',
			categories: {
				$elemMatch: {
					type: type,
					name: category,
				},
			},
		})
			.limit(limit)
			.sort({ dateTag: -1 });

		const shortArticles = articles.map((item) => {
			const {
				_id,
				slug,
				dateTag,
				subHeader,
				header,
				supportingText,
				tags,
				categories,
				images,
				description,
			} = item;
			return {
				_id,
				slug,
				dateTag,
				subHeader,
				header,
				supportingText,
				tags,
				categories,
				images,
				description,
			};
		});
		return response.json(shortArticles);
	}

	async showMain({ response }: HttpContext) {
		const articles = await Article.find({ status: 'Published' });
		const latestArticle = articles.sort((a, b) =>
			(a.dateTag ?? 0) > (b.dateTag ?? 0) ? -1 : 1
		)[0];
		const {
			_id,
			slug,
			dateTag,
			subHeader,
			header,
			supportingText,
			tags,
			categories,
			images,
			description,
		} = latestArticle;
		return response.json({
			_id,
			slug,
			dateTag,
			subHeader,
			header,
			supportingText,
			tags,
			categories,
			images,
			description,
		});
	}

	async show({ request, response }: HttpContext) {
		const { id } = request.params();
		const article = await Article.findById(id).populate('authors');
		return response.json(article);
	}

	async showBySlug({ request, response }: HttpContext) {
		const { slug } = request.params();
		const article = await Article.findOne({ slug, status: 'Published' }).populate('authors');
		return response.json(article);
	}

	async store({ request, response }: HttpContext) {
		const article = new Article(request.all());
		await article.save();
		return response.json(article);
	}

	async update({ request, response }: HttpContext) {
		const { id } = request.params();
		const updateData = request.all();
		// const {
		// 	header,
		// 	croppedImage,
		// 	originalImage,
		// 	// images: _images,
		// 	// authors,
		// 	tags,
		// 	// categories,
		// 	regions,
		// 	countries,
		// 	otherCategories,
		// 	__v,
		// 	...articleData
		// } = request.all();
		// const images = request.files('images');
		const croppedImageFile = request.file('croppedImage');
		const originalImageFile = request.file('originalImage');

		const article = await Article.findById(id);
		if (!article) {
			return response.status(404).json({ message: 'Article not found' });
		}

		if (updateData.header) {
			const slugHeader = slug(updateData.header);
			const existingArticles = await Article.countDocuments({ slug: slugHeader });
			updateData.slug = existingArticles > 0 ? `${slugHeader}-${existingArticles + 1}` : slugHeader;
		}

		if (updateData.action === 'delete-image') {
			const updatedArticle = await FileService.deleteArticleImage(article);
			response.json(updatedArticle);
		}

		if (updateData.action === 'update-image') {
			if (article?.images?.length > 0) {
				await FileService.deleteArticleImage(article);
			}

			let urlCropped;
			let urlOriginal;
			if (croppedImageFile) {
				urlCropped = await FileService.uploadArticle(croppedImageFile);
			}
			if (originalImageFile) {
				urlOriginal = await FileService.uploadArticle(originalImageFile);
			}
			article.images.push({
				url: urlCropped,
				urlOriginal,
				order: 1,
				alt: updateData.alt,
				caption: updateData.caption,
				captionHtml: updateData.captionHtml,
				linkOriginal: updateData.linkOriginal,
			});
		}

		if (updateData.action === 'deleteFile') {
			const updatedArticle = await FileService.deleteImage(article, updateData.url);
			response.json(updatedArticle);
		}

		if (typeof updateData.tags === 'string') {
			updateData.tags = updateData.split(',').map((item) => item.trim());
		}

		if (updateData.regions || updateData.countries || updateData.otherCategories) {
			const mappedRegions = (updateData.regions || []).map((item: any) => ({
				_id: item._id,
				name: item.name,
				type: 'region',
			}));

			const mappedCountries = (updateData.countries || []).map((item: any) => ({
				_id: item._id,
				name: item.name,
				code: item.code,
				region: item.region,
				type: 'country',
			}));
			const mappedOtherCategories = (updateData.otherCategories || []).map((item: any) => ({
				_id: item._id,
				name: item.name,
				type: 'other',
			}));

			updateData.categories = [...mappedRegions, ...mappedCountries, ...mappedOtherCategories];
		}

		article.set(updateData);
		await article.save();
		response.json(article);
	}

	async destroy({ request, response }: HttpContext) {
		const { id } = request.params();
		//find image and delete it in S3 folder
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
