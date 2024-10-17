import type { HttpContext } from '@adonisjs/core/http';
// libraries
import slug from 'slug';
// import { format } from 'date-fns';
// models
import Article from '#models/Article';
import { log } from 'console';
import FileService from '#services/FileService';

export default class ArticlesController {
	async index({ response }: HttpContext) {
		const articles = await Article.find();

		articles.sort((a, b) => ((a.dateTag ?? 0) > (b.dateTag ?? 0) ? -1 : 1));
		// console.log(articles, articles);
		const shortArticles = articles.map((item) => {
			const { _id, slug, dateTag, subHeader, header, supportingText, tags, categories, images } =
				item;
			return { _id, slug, dateTag, subHeader, header, supportingText, tags, categories, images };
		});

		return response.json(shortArticles);
	}

	public async getLatest({ request, response }: HttpContext) {
		const limit = parseInt(request.input('limit'), 10);

		let articles = await Article.find().sort({ dateTag: -1 });
		if (!isNaN(limit)) {
			articles = articles.slice(0, limit);
		}
		// const latestArticles = articles
		// 	.sort((a, b) => ((a.dateTag ?? 0) > (b.dateTag ?? 0) ? -1 : 1))
		// 	.slice(0, 8);
		const shortArticles = articles.map((item) => {
			const { _id, slug, dateTag, subHeader, header, supportingText, tags, categories, images } =
				item;
			return { _id, slug, dateTag, subHeader, header, supportingText, tags, categories, images };
		});
		return response.json(shortArticles);
	}

	public async getByCategory({ request, response }: HttpContext) {
		const type = request.input('type');
		const category = request.input('category');
		const limit = parseInt(request.input('limit'), 10);

		let articles = await Article.find({
			categories: {
				$elemMatch: {
					type: type,
					name: category,
				},
			},
		}).sort({ dateTag: -1 });
		// articles.sort((a, b) => ((a.dateTag ?? 0) > (b.dateTag ?? 0) ? -1 : 1));

		if (!isNaN(limit)) {
			articles = articles.slice(0, limit);
		}
		const shortArticles = articles.map((item) => {
			const { _id, slug, dateTag, subHeader, header, supportingText, tags, categories, images } =
				item;
			return { _id, slug, dateTag, subHeader, header, supportingText, tags, categories, images };
		});
		return response.json(shortArticles);
	}

	public async showMain({ response }: HttpContext) {
		const articles = await Article.find();
		const latestArticle = articles.sort((a, b) =>
			(a.dateTag ?? 0) > (b.dateTag ?? 0) ? -1 : 1
		)[0];
		const { _id, slug, dateTag, subHeader, header, supportingText, tags, categories, images } =
			latestArticle;
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
		});
	}

	public async show({ request, response }: HttpContext) {
		const { id } = request.params();
		const article = await Article.findById(id);
		return response.json(article);
	}

	public async showBySlug({ request, response }: HttpContext) {
		const { slug } = request.params();
		const article = await Article.findOne({ slug });
		return response.json(article);
	}

	async store({ request, response }: HttpContext) {
		const {
			images: _images,
			tags,
			categories,
			regions,
			countries,
			otherCategories,
			header,
			dateTag,
			...articleData
		} = request.all();
		const images = request.files('images');

		const parsedRegions = JSON.parse(regions || '[]');
		const parsedCountries = JSON.parse(countries || '[]');
		const parsedOtherCategories = JSON.parse(otherCategories || '[]');

		const mappedRegions = parsedRegions?.map((item: any) => ({
			_id: item._id,
			name: item.name,
			type: 'region',
		}));

		const mappedCountries = parsedCountries?.map((item: any) => ({
			_id: item._id,
			name: item.name,
			code: item.code,
			region: item.region,
			type: 'country',
		}));
		const mappedOtherCategories = parsedOtherCategories?.map((item: any) => ({
			_id: item._id,
			name: item.name,
			type: 'other',
		}));

		if (typeof tags === 'string') {
			articleData.tags = tags.split(',').map((item) => item.trim());
		}
		articleData.categories = [...mappedRegions, ...mappedCountries, ...mappedOtherCategories];

		const slugHeader = slug(header);
		const existingArticles = await Article.countDocuments({ slug: slugHeader });
		if (existingArticles > 0) {
			articleData.slug = `${slugHeader}-${existingArticles + 1}`;
		} else {
			articleData.slug = slugHeader;
		}

		articleData.dateTag = dateTag ? dateTag : null;
		articleData.header = header;
		const article = new Article(articleData);

		// save images in S3
		let articleImages: any[] = [];
		if (images.length > 0) {
			articleImages = await FileService.upload(images, article);
		}

		article.images = articleImages;

		await article.save();
		return response.json(article);
	}

	public async update({ request, response }: HttpContext) {
		const { id } = request.params();
		const {
			images: _images,
			tags,
			categories,
			regions,
			countries,
			otherCategories,
			...articleData
		} = request.all();
		const images = request.files('images');

		if (typeof tags === 'string') {
			articleData.tags = tags.split(',').map((item) => item.trim());
			log('TAGS', articleData.tags);
		}
		const parsedRegions = JSON.parse(regions || '[]');
		const parsedCountries = JSON.parse(countries || '[]');
		const parsedOtherCategories = JSON.parse(otherCategories || '[]');

		const mappedRegions = parsedRegions?.map((item: any) => ({
			_id: item._id,
			name: item.name,
			type: 'region',
		}));

		const mappedCountries = parsedCountries?.map((item: any) => ({
			_id: item._id,
			name: item.name,
			code: item.code,
			region: item.region,
			type: 'country',
		}));
		const mappedOtherCategories = parsedOtherCategories?.map((item: any) => ({
			_id: item._id,
			name: item.name,
			type: 'other',
		}));

		articleData.categories = [...mappedRegions, ...mappedCountries, ...mappedOtherCategories];

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
