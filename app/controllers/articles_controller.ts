import type { HttpContext } from '@adonisjs/core/http';
// libraries
import slug from 'slug';
// import { format } from 'date-fns';
// models
import Article from '#models/Article';
import FileService from '#services/FileService';
import { addListener } from 'process';

export default class ArticlesController {
	async index({ response }: HttpContext) {
		const articles = await Article.find().populate('authors').sort({ createdAt: -1 });

		return response.json(articles);
	}

	async getLatest({ request, response }: HttpContext) {
		const limit = parseInt(request.input('limit'), 10);

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
		const limit = parseInt(request.input('limit'), 10);

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
		// articles.sort((a, b) => ((a.dateTag ?? 0) > (b.dateTag ?? 0) ? -1 : 1));

		// if (!isNaN(limit)) {
		// 	articles = articles.slice(0, limit);
		// }
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
		const articles = await Article.find();
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
		console.log('SHOW ARTICLE', article);
		return response.json(article);
	}

	async showBySlug({ request, response }: HttpContext) {
		const { slug } = request.params();
		const article = await Article.findOne({ slug }).populate('authors');
		return response.json(article);
	}

	async store({ request, response }: HttpContext) {
		// const {
		// 	images: _images,
		// 	tags,
		// 	authors,
		// 	categories,
		// 	regions,
		// 	countries,
		// 	otherCategories,
		// 	header,
		// 	dateTag,
		// 	...articleData
		// } = request.all();
		console.log('STORE ARTICLE', request.all());

		const images = request.files('images');

		// const parsedAuthors = JSON.parse(authors || '[]');
		// const parsedRegions = JSON.parse(regions || '[]');
		// const parsedCountries = JSON.parse(countries || '[]');
		// const parsedOtherCategories = JSON.parse(otherCategories || '[]');

		// const mappedAuthors = authors?.map((item: any) => ({
		// 	_id: item._id,
		// }));

		// const mappedRegions = regions?.map((item: any) => ({
		// 	_id: item._id,
		// 	name: item.name,
		// 	type: 'region',
		// }));

		// const mappedCountries = countries?.map((item: any) => ({
		// 	_id: item._id,
		// 	name: item.name,
		// 	code: item.code,
		// 	region: item.region,
		// 	type: 'country',
		// }));
		// const mappedOtherCategories = otherCategories?.map((item: any) => ({
		// 	_id: item._id,
		// 	name: item.name,
		// 	type: 'other',
		// }));

		// if (typeof tags === 'string') {
		// 	articleData.tags = tags.split(',').map((item) => item.trim());
		// }
		// articleData.categories = [...mappedRegions, ...mappedCountries, ...mappedOtherCategories];
		// articleData.authors = mappedAuthors;

		// const slugHeader = slug(header);
		// const existingArticles = await Article.countDocuments({ slug: slugHeader });
		// if (existingArticles > 0) {
		// 	articleData.slug = `${slugHeader}-${existingArticles + 1}`;
		// } else {
		// 	articleData.slug = slugHeader;
		// }

		// articleData.dateTag = dateTag ? dateTag : null;
		// articleData.header = header;
		const article = new Article(request.all());

		// save images in S3
		// let articleImages: any[] = [];
		// if (images.length > 0) {
		// 	articleImages = await FileService.upload(images, article);
		// }

		// article.images = articleImages;

		await article.save();
		return response.json(article);
	}

	async update({ request, response }: HttpContext) {
		const { id } = request.params();
		const {
			header,
			croppedImage,
			originalImage,
			// images: _images,
			// authors,
			tags,
			// categories,
			regions,
			countries,
			otherCategories,
			__v,
			...articleData
		} = request.all();
		// const images = request.files('images');
		const croppedImageFile = request.file('croppedImage');
		const originalImageFile = request.file('originalImage');

		if (header) {
			const slugHeader = slug(header);
			const existingArticles = await Article.countDocuments({ slug: slugHeader });
			if (existingArticles > 0) {
				articleData.slug = `${slugHeader}-${existingArticles + 1}`;
			} else {
				articleData.slug = slugHeader;
			}
			articleData.header = header;
		}

		const article = await Article.findById(id);
		if (!article) {
			return response.status(404).json({ message: 'Article not found' });
		}

		if (articleData.action === 'delete-image') {
			const updatedArticle = await FileService.deleteArticleImage(article);
			response.json(updatedArticle);
		}

		if (articleData.action === 'update-image') {
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
				alt: articleData.alt,
				caption: articleData.caption,
				captionHtml: articleData.captionHtml,
				linkOriginal: articleData.linkOriginal,
			});
		}

		if (typeof tags === 'string') {
			articleData.tags = tags.split(',').map((item) => item.trim());
		}

		const mappedRegions = (regions || []).map((item: any) => ({
			_id: item._id,
			name: item.name,
			type: 'region',
		}));

		const mappedCountries = (countries || []).map((item: any) => ({
			_id: item._id,
			name: item.name,
			code: item.code,
			region: item.region,
			type: 'country',
		}));
		const mappedOtherCategories = (otherCategories || []).map((item: any) => ({
			_id: item._id,
			name: item.name,
			type: 'other',
		}));

		articleData.categories = [...mappedRegions, ...mappedCountries, ...mappedOtherCategories];

		if (articleData.action === 'deleteFile') {
			const updatedArticle = await FileService.deleteImage(article, articleData.url);
			response.json(updatedArticle);
		}

		article.set(articleData);
		await article.save();
		response.json(article);
	}

	async destroy({ request, response }: HttpContext) {
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
