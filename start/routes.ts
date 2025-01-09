/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router';

import AuthController from '#controllers/auth_controller';
import UsersController from '#controllers/users_controller';
import ArticlesController from '#controllers/articles_controller';
import RegionsController from '#controllers/regions_controller';
import CountriesController from '#controllers/countries_controller';
import OtherCategoriesController from '#controllers/other_categories_controller';
import SitemapsController from '#controllers/sitemaps_controller';
import AuthorsController from '#controllers/authors_controller';

router.get('/', async () => 'It works!');

router.get('/test', [UsersController, 'index']);

router.get('/sitemap.xml', [SitemapsController, 'generate']);

router
	.group(() => {
		router
			.group(() => {
				router.get('google/redirect', [AuthController, 'redirect']);
				router.get('google/callback', [AuthController, 'callback']);
				// router.get('/articles/:id', [ArticlesController, 'show']);
			})
			.prefix('cms/auth');
		router.resource('authors', AuthorsController);
		router.resource('articles', ArticlesController);

		router.get('/articles-latest', [ArticlesController, 'getLatest']);
		router.get('/articles/category', [ArticlesController, 'getByCategory']);

		router.get('/articles/:slug', [ArticlesController, 'showBySlug']);

		// router.get('articles/main', [ArticlesController, 'showMain']);
		router.resource('regions', RegionsController);
		router.resource('countries', CountriesController);
		router.resource('other-categories', OtherCategoriesController);
	})
	.prefix('api');
