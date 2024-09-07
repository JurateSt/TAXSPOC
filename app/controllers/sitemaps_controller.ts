import type { HttpContext } from '@adonisjs/core/http';

import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
// models
import Article from '#models/Article';

export default class SitemapsController {
	async generate({ response }: HttpContext): Promise<void> {
		try {
			const smStream = new SitemapStream({ hostname: 'https://wwww.taxspoc.com' });
			smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
			smStream.write({ url: '/home', changefreq: 'daily', priority: 1.0 });
			smStream.write({ url: '/about-us', changefreq: 'weekly', priority: 0.8 });
			smStream.write({
				url: '/articles/category?type=other&category=OECD+BEPS',
				changefreq: 'daily',
				priority: 0.9,
			});
			smStream.write({
				url: '/articles/category?type=other&category=E-Invoicing+and+E-Reporting',
				changefreq: 'daily',
				priority: 0.9,
			});
			smStream.write({
				url: '/articles/category?type=other&category=Brazil+Tax+Reform',
				changefreq: 'daily',
				priority: 0.9,
			});
			smStream.write({
				url: '/articles/category?type=other&category=UAE+CIT',
				changefreq: 'daily',
				priority: 0.9,
			});
			smStream.write({
				url: '/articles/category?type=other&category=Indirect+Tax',
				changefreq: 'daily',
				priority: 0.9,
			});
			smStream.write({
				url: '/articles/category?type=other&category=Direct+Tax',
				changefreq: 'daily',
				priority: 0.9,
			});
			smStream.write({
				url: '/articles/category?type=other&category=Transfer+Pricing',
				changefreq: 'daily',
				priority: 0.9,
			});
			smStream.write({
				url: '/articles/category?type=other&category=Tax+Technology',
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
