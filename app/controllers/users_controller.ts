import type { HttpContext } from '@adonisjs/core/http';

export default class UsersController {
	public async index({ response }: HttpContext) {
		return response.json({ message: 'Hello, world!' });
	}
}
