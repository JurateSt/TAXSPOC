import type { HttpContext } from '@adonisjs/core/http';

import { SitemapStream, streamToPromise } from 'sitemap';
// import { createWriteStream } from 'fs';
// models
import Article from '#models/Article';

export default class SitemapsController {
	async generate({ response }: HttpContext): Promise<void> {
		try {
			const smStream = new SitemapStream({ hostname: 'https://www.taxspoc.com' });
			smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
			smStream.write({ url: '/home', changefreq: 'daily', priority: 1.0 });
			smStream.write({ url: '/about', changefreq: 'weekly', priority: 0.8 });
			smStream.write({ url: '/contact', changefreq: 'weekly', priority: 0.8 });
			smStream.write({ url: '/terms-of-use', changefreq: 'weekly', priority: 0.8 });
			smStream.write({ url: '/cookies-policy', changefreq: 'weekly', priority: 0.8 });
			smStream.write({ url: '/privacy-policy', changefreq: 'weekly', priority: 0.8 });
			smStream.write({
				url: '/category/oecd-beps',
				changefreq: 'daily',
				priority: 0.9,
			});
			smStream.write({
				url: '/category/e-invoicing-and-e-reporting',
				changefreq: 'daily',
				priority: 0.9,
			});
			smStream.write({
				url: '/category/brazil-tax-reform',
				changefreq: 'daily',
				priority: 0.9,
			});
			smStream.write({
				url: '/category/uae-cit',
				changefreq: 'daily',
				priority: 0.9,
			});
			smStream.write({
				url: '/category/indirect-tax',
				changefreq: 'daily',
				priority: 0.9,
			});
			smStream.write({
				url: '/category/direct-tax',
				changefreq: 'daily',
				priority: 0.9,
			});
			smStream.write({
				url: '/category/transfer-pricing',
				changefreq: 'daily',
				priority: 0.9,
			});
			smStream.write({
				url: '/category/tax-technology',
				changefreq: 'daily',
				priority: 0.9,
			});
			smStream.write({
				url: '/category/customs',
				changefreq: 'daily',
				priority: 0.9,
			});

			const articles = await Article.find();

			articles.forEach((article) => {
				smStream.write({
					url: `/articles/${article.slug}`,
					changefreq: 'daily',
					priority: 1.0,
				});
			});

			smStream.end();

			const sitemap = await streamToPromise(smStream).then((sm) => sm.toString());

			response.header('Content-Type', 'application/xml');
			return response.send(sitemap);
		} catch (error) {
			console.error('Error generating sitemap:', error);
			return response.status(500).send('Unable to generate sitemap', error);
		}
	}
}
