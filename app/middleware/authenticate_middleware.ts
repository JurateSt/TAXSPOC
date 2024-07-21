import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';
import jwt from 'jsonwebtoken';
import env from '#start/env';
// models
// import User from '#models/User';

export default class AuthenticateMiddleware {
	async handle({ request, response }: HttpContext, next: NextFn) {
		try {
			const token = request.cookie('taxspoc_token');

			const decodedToken = jwt.verify(token, env.get('JWT_SECRET'));
			console.log('decodedToken', decodedToken);
			// const user = await User.findById(decodedToken.id);
			// request.user = user;
			await next();
		} catch (error) {
			console.error('AUTH ERROR', error);
			response.status(401).send('Authentication Failed');
		}
	}
}
