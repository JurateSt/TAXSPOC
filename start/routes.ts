/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router';

import UsersController from '#controllers/users_controller';
import ArticlesController from '#controllers/articles_controller';

router.get('/', async () => 'It works!');

// use User controller
router.get('/test', [UsersController, 'index']);

router
	.group(() => {
		router.resource('articles', ArticlesController);
	})
	.prefix('api');
